import axiosInstance from "@/api/axiosInstance"
import type { APIResponse } from "@/types/etc"
import type { LeaveBalance, ProfileResponse, User } from "@/types/user"

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

export interface RefreshTokenRequest {
    refreshToken: string
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
    refreshToken: string
}

export interface RefreshTokenResponse {
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

    // Refresh token
    async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        const response = await axiosInstance.post<APIResponse<RefreshTokenResponse>>("/auth/refresh-token", data)
        return response.data.data
    }

    // Logout user
    async logout(refreshToken: string): Promise<{ message: string }> {
        const response = await axiosInstance.post<APIResponse<{ message: string }>>("/auth/logout", {
            refreshToken,
        })
        return response.data.data
    }

    // Get current user profile (requires authentication)
    async getProfile(): Promise<ProfileResponse> {
        const response = await axiosInstance.get<APIResponse<ProfileResponse>>("/profile")
        return response.data.data
    }
}

export default new AuthService()
