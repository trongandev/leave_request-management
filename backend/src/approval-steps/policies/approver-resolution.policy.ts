/**
 * ApproverResolutionPolicy
 * Pure business logic for selecting appropriate approvers based on organizational hierarchy
 * Implements rules without DB dependencies - can be tested in isolation
 */

import { ApprovalStepResolution, UserProfile } from './types';

export class ApproverResolutionPolicy {
  private readonly LEVEL_8_AUTO_APPROVE = 8;
  private readonly MANAGER_MIN_LEVEL = 3;
  private readonly LEVEL_7_MIN = 7;
  private readonly HR_DEPARTMENT_NAME = 'HR';
  private readonly RESIGNATION_FORM_KEYWORD = 'RESIGNATION';
  private readonly UNASSIGNED_APPROVER_ID = '000000000000000000000000';
  private readonly UNASSIGNED_STEP_LABEL = 'UNASSIGNED_TIMEOUT_RETURN';
  private readonly UNASSIGNED_RESIGNATION_HR_LABEL = 'UNASSIGNED_HR_REVIEW';

  evaluateParallelConsensus(
    decisions: Array<'approved' | 'rejected' | 'pending'>,
  ): 'approved' | 'rejected' | 'pending' {
    if (decisions.includes('rejected')) {
      return 'rejected';
    }

    if (decisions.every((decision) => decision === 'approved')) {
      return 'approved';
    }

    return 'pending';
  }

  /**
   * Resolve approval steps for a new request
   * Rules (in priority order):
   * 1. If requester is level 8 -> auto-approve (no steps)
   * 2. If requester is level 7 -> find same-level in same dept, if not found try cross-dept, last resort level 8
   * 3. Otherwise -> prioritize manager -> same dept level >= 3 -> cross-dept level >= 3 -> HR queue
   *
   * @param requester User submitting the request
   * @param allUsers All available users for resolution
   * @param requestContext Additional context (amount, form type, etc.)
   * @returns Steps to create or auto-approve flag
   */
  resolveApprovalSteps(
    requester: UserProfile,
    allUsers: UserProfile[],
    requestContext?: { amount?: number; formType?: string },
  ): ApprovalStepResolution {
    const requesterLevel = requester.positionId?.level || 0;
    const requestType = this.normalizeRequestType(requestContext?.formType);

    // Rule 1: Level 8 always auto-approves (CTO/CFO/etc - executives)
    if (requesterLevel === this.LEVEL_8_AUTO_APPROVE) {
      return {
        steps: [],
        autoApprove: true,
        reason: 'Executive level auto-approve',
      };
    }

    if (requestType.includes(this.RESIGNATION_FORM_KEYWORD)) {
      return this.resolveResignationApprovers(requester, allUsers);
    }

    // Rule 2: Level 7 special logic - find same-level intra-dept first, then cross-dept, avoid level 8 if possible
    if (requesterLevel === this.LEVEL_7_MIN) {
      return this.resolveLevel7Approvers(requester, allUsers);
    }

    // Rule 3: Standard logic - manager > same dept > cross dept
    return this.resolveStandardApprovers(requester, allUsers);
  }

  /**
   * Level 7 special resolution: prioritize same-level cross-dept over level 8
   */
  private resolveLevel7Approvers(
    requester: UserProfile,
    allUsers: UserProfile[],
  ): ApprovalStepResolution {
    const managerCandidates = this.filterManagerUsers(allUsers);

    // Step 1: Try to find level 7 in same department (intra-dept manager)
    const intraDeptLevel7 = managerCandidates.find(
      (u) =>
        u.positionId?.level === 7 &&
        u.departmentId === requester.departmentId &&
        u._id !== requester._id,
    );

    if (intraDeptLevel7) {
      return {
        steps: [this.createApprovalStep(intraDeptLevel7, 1, 'MANAGER')],
        autoApprove: false,
        reason: `Assigned to intra-department level-7 manager: ${intraDeptLevel7.fullName}`,
      };
    }

    // Step 2: Try to find any level 7 in other departments (cross-dept, but same capped level)
    const crossDeptLevel7 = managerCandidates.find(
      (u) =>
        u.positionId?.level === 7 &&
        u.departmentId !== requester.departmentId &&
        u._id !== requester._id,
    );

    if (crossDeptLevel7) {
      return {
        steps: [this.createApprovalStep(crossDeptLevel7, 1, 'MANAGER')],
        autoApprove: false,
        reason: `Assigned to cross-department level-7 manager: ${crossDeptLevel7.fullName}`,
      };
    }

    // Step 3: Last resort - find level 8 (CTO/CFO) if no level 7 available
    const level8Approver = managerCandidates.find(
      (u) =>
        u.positionId?.level === this.LEVEL_8_AUTO_APPROVE &&
        u._id !== requester._id,
    );

    if (level8Approver) {
      return {
        steps: [this.createApprovalStep(level8Approver, 1, 'DIRECTOR')],
        autoApprove: false,
        reason: `Assigned to level-8 executive (last resort): ${level8Approver.fullName}`,
      };
    }

    // Step 4: HR fallback queue (PRE-CHECK)
    return this.fallbackToHRQueue(requester, allUsers);
  }

  /**
   * Standard approver resolution for levels < 7
   */
  private resolveStandardApprovers(
    requester: UserProfile,
    allUsers: UserProfile[],
  ): ApprovalStepResolution {
    const managerCandidates = this.filterManagerUsers(allUsers);
    const requesterLevel = requester.positionId?.level ?? 0;
    const requiredManagerLevel = Math.max(
      this.MANAGER_MIN_LEVEL,
      requesterLevel,
    );

    // Step 1: Direct manager if exists
    if (requester.managerId) {
      const directManager = allUsers.find((u) => u._id === requester.managerId);
      if (
        directManager &&
        (directManager.positionId?.level ?? 0) >= requiredManagerLevel
      ) {
        return {
          steps: [this.createApprovalStep(directManager, 1, 'MANAGER')],
          autoApprove: false,
          reason: `Assigned to direct manager: ${directManager.fullName}`,
        };
      }
    }

    // Step 2: Find manager level >= 3 in same department
    const sameDeptManager = managerCandidates.find(
      (u) =>
        u.positionId?.level >= requiredManagerLevel &&
        u.departmentId === requester.departmentId &&
        u._id !== requester._id,
    );

    if (sameDeptManager) {
      return {
        steps: [this.createApprovalStep(sameDeptManager, 1, 'MANAGER')],
        autoApprove: false,
        reason: `Assigned to same-department manager: ${sameDeptManager.fullName}`,
      };
    }

    // Step 3: Find manager in different department
    const crossDeptManager = managerCandidates.find(
      (u) =>
        u.positionId?.level >= requiredManagerLevel &&
        u.departmentId !== requester.departmentId &&
        u._id !== requester._id,
    );

    if (crossDeptManager) {
      return {
        steps: [this.createApprovalStep(crossDeptManager, 1, 'MANAGER')],
        autoApprove: false,
        reason: `Assigned to cross-department manager: ${crossDeptManager.fullName}`,
      };
    }

    // Step 4: Fallback when no suitable manager found
    return this.fallbackToHRQueue(requester, allUsers);
  }

  private resolveResignationApprovers(
    requester: UserProfile,
    allUsers: UserProfile[],
  ): ApprovalStepResolution {
    const baseResolution = this.resolveStandardApprovers(requester, allUsers);

    if (baseResolution.autoApprove || baseResolution.steps.length === 0) {
      return baseResolution;
    }

    const managerStep = baseResolution.steps[0];
    const hrApprover = this.findHrApprover(allUsers, requester, managerStep);
    const parallelMembers = [managerStep.originalApproverId];

    if (!hrApprover) {
      return {
        steps: [
          {
            ...managerStep,
            stepLabel: 'MANAGER',
            groupId: parallelMembers,
            requiredAll: true,
            isFinalStep: true,
          },
          {
            requestId: '',
            originalApproverId: this.UNASSIGNED_APPROVER_ID,
            stepLabel: this.UNASSIGNED_RESIGNATION_HR_LABEL,
            stepOrder: managerStep.stepOrder,
            groupId: parallelMembers,
            requiredAll: true,
            isFinalStep: true,
            deadlineAt: managerStep.deadlineAt,
          },
        ],
        autoApprove: false,
        reason:
          'Parallel resignation approval: HR approver unavailable, waiting until deadline then return to requester',
      };
    }

    parallelMembers.push(hrApprover._id);

    return {
      steps: [
        {
          ...managerStep,
          stepLabel: 'MANAGER',
          groupId: parallelMembers,
          requiredAll: true,
          isFinalStep: true,
        },
        {
          requestId: '',
          originalApproverId: hrApprover._id,
          stepLabel: 'HR_REVIEW',
          stepOrder: managerStep.stepOrder,
          groupId: parallelMembers,
          requiredAll: true,
          isFinalStep: true,
          deadlineAt: managerStep.deadlineAt,
        },
      ],
      autoApprove: false,
      reason: `Parallel resignation approval: ${managerStep.originalApproverId} + HR (${hrApprover.fullName})`,
    };
  }

  /**
   * Fallback to HR department queue for manual review
   */
  private fallbackToHRQueue(
    requester: UserProfile,
    allUsers: UserProfile[],
  ): ApprovalStepResolution {
    const fallbackApprover = this.resolveFallbackApprover(requester, allUsers);

    if (!fallbackApprover) {
      return {
        steps: [
          {
            requestId: '',
            originalApproverId: this.UNASSIGNED_APPROVER_ID,
            stepLabel: this.UNASSIGNED_STEP_LABEL,
            stepOrder: 1,
            groupId: [],
            isFinalStep: true,
            requiredAll: true,
            deadlineAt: this.addBusinessDays(new Date(), 2),
          },
        ],
        autoApprove: false,
        reason:
          'No suitable manager/HR approver found; waiting until deadline then return to requester',
      };
    }

    return {
      steps: [
        {
          requestId: '', // Will be set by caller
          originalApproverId: fallbackApprover._id,
          stepLabel: 'HR kiểm tra',
          stepOrder: 1,
          groupId: [],
          isFinalStep: false,
          requiredAll: true,
          deadlineAt: this.addBusinessDays(new Date(), 3),
        },
      ],
      autoApprove: false,
      reason: `No suitable direct manager found - escalated to fallback approver: ${fallbackApprover.fullName}`,
    };
  }

  /**
   * Resolve delegation candidate
   * Uses same rules as approver selection to ensure delegatee is qualified
   */
  resolveDelegationCandidate(
    originalApprover: UserProfile,
    allUsers: UserProfile[],
  ): UserProfile | null {
    const managerCandidates = this.filterManagerUsers(allUsers);

    // Same logic as approver resolution, find someone at same or higher level
    const sameLevel = managerCandidates.find(
      (u) =>
        u.positionId?.level === originalApprover.positionId?.level &&
        u.departmentId === originalApprover.departmentId &&
        u._id !== originalApprover._id,
    );

    if (sameLevel) return sameLevel;

    // Try cross-dept same level
    const crossDeptSameLevel = managerCandidates.find(
      (u) =>
        u.positionId?.level === originalApprover.positionId?.level &&
        u.departmentId !== originalApprover.departmentId &&
        u._id !== originalApprover._id,
    );

    if (crossDeptSameLevel) return crossDeptSameLevel;

    // Try higher level same dept
    const higherLevelSameDept = managerCandidates.find(
      (u) =>
        u.positionId?.level > originalApprover.positionId?.level &&
        u.departmentId === originalApprover.departmentId &&
        u._id !== originalApprover._id,
    );

    if (higherLevelSameDept) return higherLevelSameDept;

    return null;
  }

  /**
   * Helper: filter users with MANAGER role
   */
  private filterManagerUsers(allUsers: UserProfile[]): UserProfile[] {
    return allUsers.filter((u) => u.roleId?.name === 'MANAGER');
  }

  private normalizeRequestType(formType?: string): string {
    return String(formType ?? '').toUpperCase();
  }

  private isHrManager(user: UserProfile): boolean {
    const positionName = String(user.positionId?.name ?? '').toUpperCase();
    return (
      user.roleId?.name === 'MANAGER' &&
      positionName.includes(this.HR_DEPARTMENT_NAME)
    );
  }

  private findHrApprover(
    allUsers: UserProfile[],
    requester: UserProfile,
    existingStep: { originalApproverId: string },
  ): UserProfile | null {
    return (
      allUsers.find(
        (user) =>
          this.isHrManager(user) &&
          user._id !== requester._id &&
          user._id !== existingStep.originalApproverId,
      ) ?? null
    );
  }

  private resolveFallbackApprover(
    requester: UserProfile,
    allUsers: UserProfile[],
  ): UserProfile | null {
    const hrManager = allUsers.find(
      (user) => this.isHrManager(user) && user._id !== requester._id,
    );

    if (hrManager) {
      return hrManager;
    }

    const managerCandidates = this.filterManagerUsers(allUsers)
      .filter((user) => user._id !== requester._id)
      .sort((a, b) => b.positionId.level - a.positionId.level);

    return managerCandidates[0] ?? null;
  }

  /**
   * Helper: create approval step object
   */
  private createApprovalStep(
    approver: UserProfile,
    stepOrder: number,
    stepType: string,
  ) {
    return {
      requestId: '', // Set by caller
      originalApproverId: approver._id,
      stepLabel: stepType,
      stepOrder,
      groupId: [],
      isFinalStep: false,
      requiredAll: true,
      deadlineAt: this.addBusinessDays(new Date(), 2),
    };
  }

  /**
   * Helper: add business days to date (simple version - ignore weekends)
   */
  private addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Validate if an actor can perform delegation on a given approval step
   */
  canDelegate(
    currentApprover: UserProfile,
    actor: UserProfile,
  ): { canDelegate: boolean; reason: string } {
    if (actor._id !== currentApprover._id && actor.roleId?.name !== 'ADMIN') {
      return {
        canDelegate: false,
        reason: 'Only the assigned approver or ADMIN can delegate',
      };
    }

    return {
      canDelegate: true,
      reason: 'Delegation allowed',
    };
  }

  /**
   * Validate if an actor can approve/reject a given approval step
   */
  canApproveOrReject(
    assignedApprover: UserProfile,
    actor: UserProfile,
  ): { canApprove: boolean; reason: string } {
    // Check if actor is the assigned approver or delegated handler
    if (actor._id !== assignedApprover._id && actor.roleId?.name !== 'ADMIN') {
      return {
        canApprove: false,
        reason: 'Only assigned approver or ADMIN can approve',
      };
    }

    // Check if actor has MANAGER or higher role
    if (actor.roleId?.name !== 'MANAGER' && actor.roleId?.name !== 'ADMIN') {
      return {
        canApprove: false,
        reason: 'Only MANAGER or ADMIN can approve leave requests',
      };
    }

    return {
      canApprove: true,
      reason: 'Approval allowed',
    };
  }
}
