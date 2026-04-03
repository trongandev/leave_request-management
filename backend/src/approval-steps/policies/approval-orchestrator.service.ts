/**
 * ApprovalOrchestrator Service
 * Orchestrates approval steps creation during request lifecycle
 * DB-agnostic layer that can be remapped when schema changes
 */

import { Injectable } from '@nestjs/common';
import { ApproverResolutionPolicy } from './approver-resolution.policy';
import {
  ApprovalStepResolution,
  UserProfile,
  ApprovalStepInput,
} from './types';

@Injectable()
export class ApprovalOrchestratorService {
  constructor(private readonly policy: ApproverResolutionPolicy) {}

  /**
   * Plan approval steps for a new rlequest
   * Returns resolution containing:
   * - steps: array of steps to create (if any)
   * - autoApprove: whether request auto-approves
   * - reason: explanation for decision
   */
  planApprovalSteps(
    requester: UserProfile,
    allUsers: UserProfile[],
    requestContext?: { amount?: number; formType?: string },
  ): ApprovalStepResolution {
    return this.policy.resolveApprovalSteps(
      requester,
      allUsers,
      requestContext,
    );
  }

  /**
   * Transform resolution into persistable approval step objects
   * Adds requestId and other fields needed for actual creation
   */
  transformToPersistableSteps(
    resolution: ApprovalStepResolution,
    requestId: string,
  ): ApprovalStepInput[] {
    if (resolution.autoApprove || resolution.steps.length === 0) {
      return [];
    }

    return resolution.steps.map((step) => ({
      ...step,
      requestId,
    }));
  }

  /**
   * Validate delegation candidate
   */
  validateDelegationCandidate(
    originalApprover: UserProfile,
    delegateToApprover: UserProfile,
    allUsers: UserProfile[],
  ): { isValid: boolean; reason: string } {
    // Use policy to check if delegatee is qualified
    const candidate = this.policy.resolveDelegationCandidate(
      originalApprover,
      allUsers,
    );

    if (!candidate) {
      return {
        isValid: false,
        reason: 'No qualified delegation candidate found',
      };
    }

    if (candidate._id !== delegateToApprover._id) {
      return {
        isValid: false,
        reason: `Delegation candidate must be at same or higher level. Suggested: ${candidate.fullName}`,
      };
    }

    return {
      isValid: true,
      reason: 'Delegation candidate is valid',
    };
  }
}
