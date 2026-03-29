import axiosInstance from "@/api/axiosInstance"
import { type APIResponse } from "../types/etc"
import { type User, type UserResponse } from "../types/user"

class UserService {
    async getAllUsers({ page = 1 }: { page?: number }) {
        const response = await axiosInstance.get<APIResponse<UserResponse>>(`/users?page=${page}`)
        return response.data.data
    }

    async getUserById(userId: string) {
        const response = await axiosInstance.get<APIResponse<User>>(`/users/${userId}`)
        return response.data.data
    }

    async assignManager(empId: string, managerId: string) {
        const response = await axiosInstance.patch<APIResponse<User>>(`/users/manager`, { empId, managerId })
        return response.data
    }

    async removeManager(empId: string) {
        const response = await axiosInstance.delete<APIResponse<User>>(`/users/manager`, { data: { empId } })
        return response.data
    }
}

export default new UserService()
