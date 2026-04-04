import { storage } from "@/utils/storage"
import axios from "axios"
import type { AxiosInstance, AxiosResponse } from "axios"

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 2 * 60 * 1000, // 2 minutes timeout
})

// Flag để tránh multiple refresh token calls
let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (error?: any) => void
}> = []

const processQueue = (error: any = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve()
        }
    })
    failedQueue = []
}

// Request Interceptor - Thêm access token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = storage.getCookieToken("accessToken")
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Response Interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        // Nếu lỗi 401 và chưa thử refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh, thêm request vào queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(() => {
                        return axiosInstance(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = storage.getCookieToken("refreshToken")

                if (!refreshToken) {
                    // Không có refresh token, logout user
                    throw new Error("No refresh token available")
                }

                // Call refresh token API
                const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
                    refreshToken: refreshToken,
                })

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data
                console.log(response.data.data)

                // Lưu access token mới
                storage.setCookieToken({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken || refreshToken,
                })

                // Cập nhật authorization header
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                }

                // Process queued requests
                processQueue()

                return axiosInstance(originalRequest)
            } catch (refreshError) {
                // Refresh token failed, clear all tokens và logout
                processQueue(refreshError)
                storage.removeAllToken()
                // Redirect to login page
                // Redirect to login page
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login?redirect=" + window.location.pathname
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    },
)

export default axiosInstance
