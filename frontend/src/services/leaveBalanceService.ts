import axiosInstance from "@/api/axiosInstance"
import { type APIResponse, type APIResponsePagination } from "../types/etc"
import type { CreateLeaveBalanceDto, LeaveBalance, LeaveBalanceLog, AdjustLeaveBalanceDto } from "../types/leave-balances"

class LeaveBalanceService {
    async getAll(params: any = { page: 1, limit: 10 }) {
        const response = await axiosInstance.get<APIResponsePagination<LeaveBalance[]>>(`/leave-balances`, { params })
        return response.data.data
    }

    async create(data: CreateLeaveBalanceDto) {
        const response = await axiosInstance.post<APIResponse<LeaveBalance>>(`/leave-balances`, data)
        return response.data.data
    }

    async getLogs(id: string) {
        const response = await axiosInstance.get<APIResponsePagination<LeaveBalanceLog[]>>(`/leave-balances/${id}/logs`)
        return response.data.data
    }

    async adjust(id: string, data: AdjustLeaveBalanceDto) {
        const response = await axiosInstance.patch<APIResponse<LeaveBalance>>(`/leave-balances/${id}/adjust`, data)
        return response.data.data
    }

    async manualUpdate(id: string, data: { adjustedDays: number; usedDays: number }) {
        const response = await axiosInstance.patch<APIResponse<LeaveBalance>>(`/leave-balances/${id}`, data)
        return response.data.data
    }
}

export default new LeaveBalanceService()
