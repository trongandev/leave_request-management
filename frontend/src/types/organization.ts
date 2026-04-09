import type { IMetaTag } from "./user"

export interface Department {
    _id: string
    originName: string
    name?: string
    code: string
    description?: string
    createdAt: string
    updatedAt: string
}

export interface DepartmentPayload {
    originName: string
    name: string
    code: string
    description?: string
}

export interface Position {
    _id: string
    name: string
    originName?: string
    fullName: string
    level: number
    description: string
    departmentId: Department
    createdAt: string
    updatedAt: string
}

export interface PositionPayload {
    name: string
    fullName: string
    level: number
    description?: string
    departmentId: string
}

export interface DepartmentResponse {
    data: Department[]
    meta: IMetaTag
}

export interface PositionResponse {
    data: Position[]
    meta: IMetaTag
}
