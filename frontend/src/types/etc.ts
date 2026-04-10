import type { IMetaTag } from "./user"

export interface APIResponse<T> {
    success: boolean
    statusCode: number
    message: string
    data: T
}

export interface APIResponsePagination<T> {
    success: boolean
    statusCode: number
    message: string
    data: ResponsePagination<T>
}

export interface ResponsePagination<T> {
    data: T
    meta: IMetaTag
}

export interface ErrorLogs {
    _id: string
    path: string
    method: string
    statusCode: number
    message: string
    stack: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Notification {
    _id: string
    recipientId: string
    senderId: string
    type: string
    title: string
    content: string
    link: string
    isRead: boolean
    metadata: Metadata
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Metadata {
    [key: string]: any
}

export interface AuditLogs {
    _id: string
    userId: string
    action: string
    module: string
    newValue: NewValue
    ipAddress: string
    userAgent: string
    description: string
    createdAt: string
    updatedAt: string
    __v: number
}

interface NewValue {
    [key: string]: any
}
