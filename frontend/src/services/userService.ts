import axiosInstance from "@/api/axiosInstance"
import { type APIResponse } from "../types/etc"
import { type User, type UserResponse } from "../types/user"

class UserService {
    async getAllUsers() {
        const response = await axiosInstance.get<APIResponse<UserResponse>>("/users")
        return response.data.data
    }

    async getUserById(userId: string) {
        const response = await axiosInstance.get<APIResponse<User>>(`/users/${userId}`)
        return response.data.data
    }
}

export default new UserService()
