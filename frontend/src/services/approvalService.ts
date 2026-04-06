import axiosInstance from "@/api/axiosInstance"
import { type APIResponse } from "../types/etc"
import type { ApprovalStep } from "@/types/approval-step"

class ApprovalService {
    async getById(id: string) {
        const response = await axiosInstance.get<APIResponse<ApprovalStep>>(`/approval-steps/request/${id}`)
        return response.data.data
    }
}

export default new ApprovalService()
