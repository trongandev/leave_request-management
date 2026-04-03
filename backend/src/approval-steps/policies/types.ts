/**
 * Policy layer type definitions for approver resolution engine
 * These types are DB-agnostic and can be reused when schema migrates
 */

export interface UserProfile {
  _id: string;
  empId: string;
  fullName: string;
  positionId: {
    _id: string;
    level: number;
    name: string;
    departmentId: string;
  };
  departmentId: string;
  managerId?: string;
  roleId: {
    _id?: string;
    name: string;
  };
}

export interface RequestContext {
  requestId: string;
  creatorId: string;
  formTemplateId: string;
  status: string;
  amount?: number;
}

export interface ApprovalStepInput {
  requestId: string;
  originalApproverId: string;
  actualApproverId?: string;
  delegationId?: string;
  stepOrder: number;
  stepLabel: string;
  groupId: string[];
  isFinalStep: boolean;
  requiredAll: boolean;
  status?: string;
  comment?: string;
  signatureUrl?: string;
  notifiedAt?: Date;
  deadlineAt?: Date;
  signedAt?: Date;
}

export enum ApprovalDecision {
  APPROVE = 'approve',
  REJECT = 'reject',
  DELEGATE = 'delegate',
}

export interface ApprovalActionInput {
  approvalStepId: string;
  decision: ApprovalDecision;
  actorId: string;
  comment?: string;
  delegateToUserId?: string;
  deadlineAt?: Date;
}

export interface ApprovalStepResolution {
  steps: ApprovalStepInput[];
  autoApprove: boolean;
  reason: string;
}

export interface ApprovalValidationResult {
  isValid: boolean;
  errors: string[];
}
