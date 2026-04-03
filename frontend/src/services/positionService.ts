import axiosInstance from "@/api/axiosInstance"
import type { APIResponse, APIResponsePagination } from "@/types/etc"
import type { Position, PositionPayload } from "@/types/organization"

class PositionService {
    async getAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
        const response = await axiosInstance.get<APIResponsePagination<Position[]>>(`/positions?page=${page}&limit=${limit}`)
        return response.data.data
    }

    async create(payload: PositionPayload) {
        const response = await axiosInstance.post<APIResponse<Position>>("/positions", payload)
        return response.data.data
    }

    async update(id: string, payload: Partial<PositionPayload>) {
        const response = await axiosInstance.patch<APIResponse<Position>>(`/positions/${id}`, payload)
        return response.data.data
    }

    async remove(id: string) {
        const response = await axiosInstance.delete<APIResponse<Position>>(`/positions/${id}`)
        return response.data.data
    }
}

export default new PositionService()
