import axiosInstance from "@/api/axiosInstance"
import type { APIResponse } from "@/types/etc"
import type { RoleId } from "@/types/user"

class RoleService {
    async getAll() {
        const response = await axiosInstance.get<APIResponse<RoleId[]>>("/roles")
        return response.data.data
    }
}

export default new RoleService()
