import { beforeEach, describe, expect, it } from '@jest/globals';
import { ApproverResolutionPolicy } from './approver-resolution.policy';
import { UserProfile } from './types';

describe('ApproverResolutionPolicy', () => {
  let policy: ApproverResolutionPolicy;

  beforeEach(() => {
    policy = new ApproverResolutionPolicy();
  });

  describe('resolveApprovalSteps', () => {
    it('should auto-approve for level 8 (executive)', () => {
      const executive: UserProfile = {
        _id: 'exec-1',
        empId: 'EXE001',
        fullName: 'CTO Officer',
        positionId: {
          _id: 'pos-8',
          level: 8,
          name: 'CTO',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const allUsers = [executive];
      const result = policy.resolveApprovalSteps(executive, allUsers);

      expect(result.autoApprove).toBe(true);
      expect(result.steps).toEqual([]);
      expect(result.reason).toContain('Executive level auto-approve');
    });

    it('should find direct manager for requester without manager', () => {
      const manager: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        managerId: manager._id,
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.resolveApprovalSteps(staff, [staff, manager]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(manager._id);
      expect(result.steps[0].stepLabel).toBe('MANAGER');
    });

    it('should find same-department manager when direct manager not available', () => {
      const manager: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Dept Manager',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.resolveApprovalSteps(staff, [staff, manager]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(manager._id);
    });

    it('should find cross-department manager when same-dept manager not available', () => {
      const crossDeptManager: UserProfile = {
        _id: 'mgr-2',
        empId: 'MGR002',
        fullName: 'HR Manager',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'HRM',
          departmentId: 'dept-hr',
        },
        departmentId: 'dept-hr',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.resolveApprovalSteps(staff, [
        staff,
        crossDeptManager,
      ]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(crossDeptManager._id);
    });

    it('should create timeout-return holding step when no eligible approver found', () => {
      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.resolveApprovalSteps(staff, [staff]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].stepLabel).toBe('UNASSIGNED_TIMEOUT_RETURN');
      expect(result.steps[0].originalApproverId).toBe(
        '000000000000000000000000',
      );
      expect(result.reason).toContain('deadline then return');
    });

    it('should create parallel manager and HR steps for resignation requests', () => {
      const manager: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Engineering Manager',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const hrManager: UserProfile = {
        _id: 'hr-1',
        empId: 'HR001',
        fullName: 'HR Manager',
        positionId: {
          _id: 'pos-5',
          level: 5,
          name: 'HRBP',
          departmentId: 'dept-hr',
        },
        departmentId: 'dept-hr',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        managerId: manager._id,
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.resolveApprovalSteps(
        staff,
        [staff, manager, hrManager],
        { formType: 'RESIGNATION' },
      );

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(2);
      expect(result.steps.every((step) => step.stepOrder === 1)).toBe(true);
      expect(result.steps.every((step) => step.requiredAll)).toBe(true);
      expect(result.steps.every((step) => step.groupId.length === 2)).toBe(true);
      expect(result.steps.map((step) => step.stepLabel)).toEqual(
        expect.arrayContaining(['MANAGER', 'HR_REVIEW']),
      );
    });

    it('should keep resignation in parallel flow even when HR approver is missing', () => {
      const manager: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Engineering Manager',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        managerId: manager._id,
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.resolveApprovalSteps(
        staff,
        [staff, manager],
        { formType: 'RESIGNATION' },
      );

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(2);
      expect(result.steps.every((step) => step.requiredAll)).toBe(true);
      expect(result.steps.map((step) => step.stepLabel)).toEqual(
        expect.arrayContaining(['MANAGER', 'UNASSIGNED_HR_REVIEW']),
      );
      expect(
        result.steps.some(
          (step) => step.originalApproverId === '000000000000000000000000',
        ),
      ).toBe(true);
    });

    it('should handle level 7 - prioritize same level in same department', () => {
      const level7Manager: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Factory Manager',
        positionId: {
          _id: 'pos-7',
          level: 7,
          name: 'FM',
          departmentId: 'dept-prod',
        },
        departmentId: 'dept-prod',
        roleId: { name: 'MANAGER' },
      };

      const requesterLevel7: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Another Manager',
        positionId: {
          _id: 'pos-7',
          level: 7,
          name: 'FM',
          departmentId: 'dept-prod',
        },
        departmentId: 'dept-prod',
        roleId: { name: 'MANAGER' },
      };

      const result = policy.resolveApprovalSteps(requesterLevel7, [
        requesterLevel7,
        level7Manager,
      ]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(level7Manager._id);
      expect(result.reason).toContain('intra-department level-7');
    });

    it('should handle level 7 - fallback to cross-department level 7 if same-dept unavailable', () => {
      const crossDeptLevel7: UserProfile = {
        _id: 'mgr-2',
        empId: 'MGR002',
        fullName: 'RnD Manager',
        positionId: {
          _id: 'pos-7',
          level: 7,
          name: 'RM',
          departmentId: 'dept-rnd',
        },
        departmentId: 'dept-rnd',
        roleId: { name: 'MANAGER' },
      };

      const requesterLevel7: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Factory Manager',
        positionId: {
          _id: 'pos-7',
          level: 7,
          name: 'FM',
          departmentId: 'dept-prod',
        },
        departmentId: 'dept-prod',
        roleId: { name: 'MANAGER' },
      };

      const result = policy.resolveApprovalSteps(requesterLevel7, [
        requesterLevel7,
        crossDeptLevel7,
      ]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(crossDeptLevel7._id);
      expect(result.reason).toContain('cross-department level-7');
    });

    it('should handle level 7 - escalate to level 8 as last resort', () => {
      const level8Executive: UserProfile = {
        _id: 'exec-1',
        empId: 'EXE001',
        fullName: 'CTO Officer',
        positionId: {
          _id: 'pos-8',
          level: 8,
          name: 'CTO',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const requesterLevel7: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Factory Manager',
        positionId: {
          _id: 'pos-7',
          level: 7,
          name: 'FM',
          departmentId: 'dept-prod',
        },
        departmentId: 'dept-prod',
        roleId: { name: 'MANAGER' },
      };

      const result = policy.resolveApprovalSteps(requesterLevel7, [
        requesterLevel7,
        level8Executive,
      ]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(level8Executive._id);
      expect(result.steps[0].stepLabel).toBe('DIRECTOR');
      expect(result.reason).toContain('level-8 executive (last resort)');
    });
  });

  describe('canDelegate', () => {
    it('should allow delegation by assigned approver', () => {
      const approver: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const result = policy.canDelegate(approver, approver);

      expect(result.canDelegate).toBe(true);
    });

    it('should deny delegation by unauthorized user', () => {
      const approver: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const otherUser: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.canDelegate(approver, otherUser);

      expect(result.canDelegate).toBe(false);
    });

    it('should allow delegation by ADMIN', () => {
      const approver: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const admin: UserProfile = {
        _id: 'admin-1',
        empId: 'ADM001',
        fullName: 'Admin User',
        positionId: {
          _id: 'pos-1',
          level: 1,
          name: 'ADM',
          departmentId: 'dept-admin',
        },
        departmentId: 'dept-admin',
        roleId: { name: 'ADMIN' },
      };

      const result = policy.canDelegate(approver, admin);

      expect(result.canDelegate).toBe(true);
    });
  });

  describe('canApproveOrReject', () => {
    it('should allow approval by assigned approver with MANAGER role', () => {
      const approver: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const result = policy.canApproveOrReject(approver, approver);

      expect(result.canApprove).toBe(true);
    });

    it('should deny approval by non-manager user', () => {
      const approver: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'EMPLOYEE' },
      };

      const result = policy.canApproveOrReject(approver, staff);

      expect(result.canApprove).toBe(false);
    });

    it('should allow approval by ADMIN', () => {
      const approver: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const admin: UserProfile = {
        _id: 'admin-1',
        empId: 'ADM001',
        fullName: 'Admin User',
        positionId: {
          _id: 'pos-1',
          level: 1,
          name: 'ADM',
          departmentId: 'dept-admin',
        },
        departmentId: 'dept-admin',
        roleId: { name: 'ADMIN' },
      };

      const result = policy.canApproveOrReject(approver, admin);

      expect(result.canApprove).toBe(true);
    });
  });

  describe('evaluateParallelConsensus', () => {
    it('should reject immediately when any approver rejects', () => {
      const result = policy.evaluateParallelConsensus(['approved', 'rejected']);

      expect(result).toBe('rejected');
    });

    it('should approve only when all approvers approved', () => {
      const result = policy.evaluateParallelConsensus(['approved', 'approved']);

      expect(result).toBe('approved');
    });

    it('should stay pending when no one rejected but not all approved', () => {
      const result = policy.evaluateParallelConsensus(['approved', 'pending']);

      expect(result).toBe('pending');
    });
  });
});
