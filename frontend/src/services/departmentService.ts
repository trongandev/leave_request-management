import axiosInstance from "@/api/axiosInstance"
import type { APIResponse } from "@/types/etc"
import type { Department, DepartmentPayload, DepartmentResponse } from "@/types/organization"

class DepartmentService {
    async getAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
        const response = await axiosInstance.get<APIResponse<DepartmentResponse>>(`/departments?page=${page}&limit=${limit}`)
        return response.data.data
    }

    async create(payload: DepartmentPayload) {
        const response = await axiosInstance.post<APIResponse<Department>>("/departments", payload)
        return response.data.data
    }

    async update(id: string, payload: Partial<DepartmentPayload>) {
        const response = await axiosInstance.patch<APIResponse<Department>>(`/departments/${id}`, payload)
        return response.data.data
    }

    async remove(id: string) {
        const response = await axiosInstance.delete<APIResponse<Department>>(`/departments/${id}`)
        return response.data.data
    }
}

export default new DepartmentService()
