export interface APIResponse<T> {
    success: boolean
    statusCode: number
    message: string
    data: T
}
