import axiosInstance from '@/services/axiosInstance'
import { type APIResponse } from '../types/etc'
import { type User } from '../types/user'

class ProfileService {
    async getAllProfile() {
        const response = await axiosInstance.get<APIResponse<User[]>>('/profile/all')
        return response.data.data
    }

    async getProfile() {
        const response = await axiosInstance.get<APIResponse<User>>('/profile')
        return response.data.data
    }

    async getProfileByUsername(username: string) {
        const response = await axiosInstance.get<APIResponse<User>>(`/profile/${username}`)
        return response.data.data
    }

    async updateProfile(userId: string, data: Partial<User>, files?: { avatar?: File; projects?: { [key: number]: File } }) {
        const formData = new FormData()

        // Thêm avatar file nếu có
        if (files?.avatar) {
            formData.append('avatar', files.avatar)
        }

        // Thêm project files nếu có
        if (files?.projects) {
            Object.entries(files.projects).forEach(([index, file]) => {
                formData.append(`project_${index}`, file)
            })
        }

        // Append các fields khác (loại bỏ những field có base64 image)
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Skip avatar nếu là base64 string (sẽ gửi qua file)
                if (key === 'avatar' && typeof value === 'string' && value.startsWith('data:image/')) {
                    return
                }

                // Skip project imageUrl nếu là base64 (sẽ gửi qua file)
                if (key === 'project' && Array.isArray(value)) {
                    const cleanedProjects = value.map((proj) => {
                        const cleanProj = { ...proj }
                        // Chỉ xử lý nếu có imageUrl property (project object)
                        if ('imageUrl' in cleanProj && cleanProj.imageUrl && typeof cleanProj.imageUrl === 'string' && cleanProj.imageUrl.startsWith('data:image/')) {
                            cleanProj.imageUrl = '' // Clear base64, sẽ được thay thế bằng Cloudinary URL
                        }
                        return cleanProj
                    })
                    formData.append(key, JSON.stringify(cleanedProjects))
                    return
                }

                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value))
                } else {
                    formData.append(key, String(value))
                }
            }
        })

        const response = await axiosInstance.patch<APIResponse<User>>(`/profile/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data
    }
}

export default new ProfileService()
