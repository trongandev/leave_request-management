/**
 * ApprovalOrchestrator
 * Service-level orchestration for request --> approval steps flow
 * Stays DB-agnostic by accepting and returning service contracts, not persistence models
 * Can be called during request creation to automatically generate and persist approval steps
 */

import { ApprovalStepResolution, UserProfile } from './types';

export interface IApprovalOrchestrator {
  /**
   * Orchestrate approval steps for a new request
   * Given requester and request context, compute which steps are needed
   * Returns the resolution plan (steps or auto-approve flag)
   */
  orchestrateApprovalSteps(
    requester: UserProfile,
    allUsers: UserProfile[],
    requestContext?: { amount?: number; formType?: string },
  ): ApprovalStepResolution;
}
