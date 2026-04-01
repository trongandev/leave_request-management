import axiosInstance from "@/api/axiosInstance"
import { type APIResponse } from "../types/etc"
import { type User, type UserResponse } from "../types/user"

type GetAllUsersParams = {
    page?: number
    limit?: number
    search?: string
    departmentCode?: string
    roleName?: string
    leaveType?: string
    location?: string
}

class UserService {
    async getAllUsers({ page = 1, limit = 10, search, departmentCode, roleName, leaveType, location }: GetAllUsersParams) {
        const params = new URLSearchParams()
        params.set("page", String(page))
        params.set("limit", String(limit))

        if (search && search.trim()) params.set("search", search.trim())
        if (departmentCode && departmentCode !== "all") params.set("departmentCode", departmentCode)
        if (roleName && roleName !== "all") params.set("roleName", roleName)
        if (leaveType && leaveType !== "all") params.set("leaveType", leaveType)
        if (location && location !== "all") params.set("location", location)

        const response = await axiosInstance.get<APIResponse<UserResponse>>(`/users?${params.toString()}`)
        return response.data.data
    }

    async getUserById(userId: string) {
        const response = await axiosInstance.get<APIResponse<User>>(`/users/${userId}`)
        return response.data.data
    }

    async getTeamMembers() {
        const response = await axiosInstance.get<APIResponse<User[]>>(`/users/teams`)
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
