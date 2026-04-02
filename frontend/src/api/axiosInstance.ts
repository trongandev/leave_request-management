import { logoutClient } from "@/utils/authSession"
import { isJwtExpired } from "@/utils/jwt"
import { storage } from "@/utils/storage"
import axios from "axios"
import type { AxiosInstance, AxiosResponse } from "axios"

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
})

// Request Interceptor - Thêm access token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = storage.getCookieToken()

        if (accessToken && isJwtExpired(accessToken)) {
            logoutClient({ reason: "expired" })
            return Promise.reject(new axios.Cancel("Access token expired"))
        }

        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest?.url?.includes("/auth/login")) {
            logoutClient({ reason: "unauthorized" })
        }

        return Promise.reject(error)
    },
)

export default axiosInstance
