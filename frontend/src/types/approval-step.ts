import type { Request } from "./request"
import type { LeaveBalance, User } from "./user"

export interface ApprovalStep {
    _id: string
    apsDisplayId: string
    requestId: Request
    flowLogId: FlowLogId
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

export interface FlowLogId {
    _id: string
    requestId: string
    __v: number
    createdAt: string
    currentStepOrder: number
    status: string
    steps: Step[]
    updatedAt: string
}

export interface Step {
    order: number
    label: string
    postition: string
    status: string
    userId: string
    avatar: string
    reason: string
    performer: string
    signedAt: string
}
