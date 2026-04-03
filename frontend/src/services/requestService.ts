import axiosInstance from "@/api/axiosInstance"
import { type APIResponse, type APIResponsePagination } from "../types/etc"
import type { FormTemplate } from "@/types/form-template"
import type { Request } from "@/types/request"

class RequestService {
    async getAll({ page = 1 }: { page?: number }) {
        const response = await axiosInstance.get<APIResponsePagination<FormTemplate[]>>(`/form-template?page=${page}`)
        return response.data.data
    }

    async getRequestId(id: string) {
        const response = await axiosInstance.get<APIResponse<Request>>(`/requests/${id}`)
        return response.data.data
    }

    async getRequestProfile({ page = 1 }: { page?: number }) {
        const response = await axiosInstance.get<APIResponsePagination<Request[]>>(`/requests/self?page=${page}`)
        return response.data.data
    }

    async create(data: any) {
        const response = await axiosInstance.post<APIResponse<any>>(`/requests`, data)
        return response.data.data
    }

    async update(data: any) {
        console.log(data)
        const response = await axiosInstance.patch<APIResponse<any>>(`/requests/${data._id}`, data)
        return response.data.data
    }
}

export default new RequestService()
