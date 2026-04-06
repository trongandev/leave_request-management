import type { Request } from "./request"
import type { User } from "./user"

export interface ApprovalStep {
    _id: string
    requestId: Request
    originalApproverId: User
    stepOrder: number
    stepLabel: string
    groupId: any[]
    status: string
    isFinalStep: boolean
    requiredAll: boolean
    deadlineAt: string
    createdAt: string
    updatedAt: string
}
