import axiosInstance from "@/api/axiosInstance"
import { type APIResponse, type APIResponsePagination } from "../types/etc"
import type { FormTemplate } from "@/types/form-template"

class FormTemplateService {
    async getAll({ page = 1 }: { page?: number }) {
        const response = await axiosInstance.get<APIResponsePagination<FormTemplate[]>>(`/form-template?page=${page}`)
        return response.data.data
    }

    async getById(id: string) {
        const response = await axiosInstance.get<APIResponse<FormTemplate>>(`/form-template/${id}`)
        return response.data.data
    }
}

export default new FormTemplateService()
