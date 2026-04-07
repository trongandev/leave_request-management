import type { User } from "./user"

export interface FormTemplate {
    _id: string
    userId: User
    code: string
    vieName: string
    engName: string
    fields: Field[]
    version: number
    isActive: boolean
    submitButtonText: string
    autoApprove: boolean
    maxDays: number
    requireAttachment: boolean
    isReductible: boolean
    createdAt: string
    updatedAt: string
}

export interface Settings {
    submitButtonText: string
    allowAttachment: boolean
}

export interface Field {
    id: string
    type: string
    label: string
    name: string
    note: string
    placeholder: string
    required: boolean
    readOnly: boolean
    order: number
    parentId: null | string
    layout: Layout | undefined
    options?: Array<{ label: string; value: string }>
    validation?: any
}

export interface Layout {
    direction: string
}
