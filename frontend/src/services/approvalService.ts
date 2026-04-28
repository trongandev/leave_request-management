import axiosInstance from "@/api/axiosInstance";
import { type APIResponse, type APIResponsePagination } from "../types/etc";
import type { ApprovalStep, ApprovalStepDetail } from "@/types/approval-step";

class ApprovalService {
    async getById(id: string) {
        const response = await axiosInstance.get<APIResponse<ApprovalStep>>(`/approval-steps/request/${id}`);
        return response.data.data;
    }

    async notiBoss(id: string) {
        const response = await axiosInstance.get(`/approval-steps/${id}/notify-boss`);
        return response.data;
    }

    async getPending({ page }: { page: number; limit: number }) {
        const response = await axiosInstance.get<APIResponsePagination<ApprovalStep[]>>(`/approval-steps/my-pending?page=${page}&limit=10`);
        return response.data.data;
    }

    async getDetailPending(id: string) {
        const response = await axiosInstance.get<APIResponse<ApprovalStepDetail>>(`/approval-steps/${id}`);
        return response.data.data;
    }

    async approve(id: string, data: { comment: string }) {
        const response = await axiosInstance.patch(`/approval-steps/${id}/approve`, data);
        return response.data;
    }

    async reject(id: string, data: { comment: string }) {
        const response = await axiosInstance.patch(`/approval-steps/${id}/reject`, data);
        return response.data;
    }

    async batchHumanApprove(arrRequest: string[]) {
        const response = await axiosInstance.post(`/approval-steps/batch-human-approve`, { arrRequest });
        return response.data.data;
    }
}

export default new ApprovalService();
