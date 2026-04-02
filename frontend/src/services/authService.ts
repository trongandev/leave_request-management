import axiosInstance from "@/api/axiosInstance"
import type { APIResponse } from "@/types/etc"
import type { LeaveBalance, User } from "@/types/user"

// Types for auth requests
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    displayName: string
    email: string
    password: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ChangePasswordRequest {
    password: string
    confirmPassword: string
}

export interface DefaultResponse {
    statusCode: number
    timestamp: string
    path: string
    method: string
    message: string
    stack: string
}
// Response types
export interface AuthResponse {
    user: User
    lb: LeaveBalance
    accessToken: string
}

class AuthService {
    // Login user
    async login(data: LoginRequest): Promise<APIResponse<AuthResponse>> {
        const response = await axiosInstance.post<APIResponse<AuthResponse>>("/auth/login", data)
        return response.data
    }

    // Register user
    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await axiosInstance.post<APIResponse<AuthResponse>>("/auth/register", data)
        return response.data.data
    }

    // Forgot password
    async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
        const response = await axiosInstance.post<APIResponse<{ message: string }>>("/auth/forget-password", data)
        return response.data.data
    }

    // Change password (requires authentication)
    async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
        const response = await axiosInstance.post<APIResponse<{ message: string }>>("/auth/change-password", data)
        return response.data.data
    }

    // Logout user
    async logout(): Promise<{ message: string }> {
        const response = await axiosInstance.post<APIResponse<{ message: string }>>("/auth/logout")
        return response.data.data
    }

    // Get current user profile (requires authentication)
    async getProfile(): Promise<User> {
        const response = await axiosInstance.get<APIResponse<User>>("/auth/profile")
        return response.data.data
    }
}

export default new AuthService()
