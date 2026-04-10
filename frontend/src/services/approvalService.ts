import axiosInstance from "@/api/axiosInstance"
import { type APIResponse, type APIResponsePagination } from "../types/etc"
import type { ApprovalStep, ApprovalStepDetail } from "@/types/approval-step"

class ApprovalService {
    async getById(id: string) {
        const response = await axiosInstance.get<APIResponse<ApprovalStep>>(`/approval-steps/request/${id}`)
        return response.data.data
    }

    async notiBoss(requestId: string, id: string) {
        const response = await axiosInstance.post(`/approval-steps/${id}/notify-boss`, {
            requestId: requestId,
        })
        return response.data
    }

    async getPending() {
        const response = await axiosInstance.get<APIResponsePagination<ApprovalStep[]>>(`/approval-steps/my-pending`)
        return response.data.data
    }

    async getDetailPending(id: string) {
        const response = await axiosInstance.get<APIResponse<ApprovalStepDetail>>(`/approval-steps/${id}`)
        return response.data.data
    }

    async approve(id: string, data: { comment: string }) {
        const response = await axiosInstance.patch(`/approval-steps/${id}/approve`, data)
        return response.data
    }

    async reject(id: string, data: { comment: string }) {
        const response = await axiosInstance.patch(`/approval-steps/${id}/reject`, data)
        return response.data
    }
}

export default new ApprovalService()
