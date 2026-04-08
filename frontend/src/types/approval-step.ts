import type { Request } from "./request"
import type { LeaveBalance, User } from "./user"

export interface ApprovalStep {
    _id: string
    apsDisplayId: string
    requestId: Request
    originalApproverId: User
    stepOrder: number
    stepLabel: string
    groupId: any[]
    status: string
    isFinalStep: boolean
    requiredAll: boolean
    deadlineAt: string
    signedAt?: string
    createdAt: string
    updatedAt: string
}

export interface ApprovalStepDetail {
    appStep: ApprovalStep
    lb: LeaveBalance
}
