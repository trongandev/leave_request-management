import axiosInstance from "@/api/axiosInstance"
import { type APIResponsePagination, type ErrorLogs, type Notification } from "@/types/etc"

class EtcService {
    async getErrorLogs({ page = 1 }: { page?: number }) {
        const response = await axiosInstance.get<APIResponsePagination<ErrorLogs[]>>("/error-log", {
            params: { page },
        })
        return response.data.data
    }

    async getNotifications() {
        const response = await axiosInstance.get<APIResponsePagination<Notification[]>>("/notifications")
        return response.data.data
    }
}

export default new EtcService()
