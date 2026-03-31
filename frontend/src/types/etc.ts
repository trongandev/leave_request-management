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
