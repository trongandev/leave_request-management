import type { FormTemplate } from "./form-template"
import type { User } from "./user"

export interface Request {
    _id: string
    creatorId: User
    formTemplateId: FormTemplate
    code: string
    title: string
    values: any
    status: string
    currentStepOrder: number
    createdAt: string
    updatedAt: string
}

export interface Values {
    startDate: string
    endDate: string
    reason: string
}
