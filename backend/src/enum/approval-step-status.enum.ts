export enum ApprovalStepStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DELEGATED = 'delegated',
  RETURNED = 'returned',
}

export const APPROVAL_STEP_STATUS_ARRAY = Object.values(
  ApprovalStepStatus,
) as string[];
