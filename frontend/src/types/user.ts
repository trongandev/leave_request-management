export interface UserResponse {
    data: User[]
    meta: IMetaTag
}

export interface IMetaTag {
    total: number
    page: number
    limit: number
    last_page: number
    has_next: boolean
    has_prev: boolean
}
export interface User {
    _id: string
    empId: string
    phone: string
    fullName: string
    email: string
    avatar: string
    roleId: RoleId
    departmentId: DepartmentId
    positionId: PositionId
    managerId: User
    gender: string
    birthDate: string
    status: boolean
    createdAt: string
    updatedAt: string
}

export interface PositionId {
    _id: string
    name: string
    departmentId: DepartmentId
    __v: number
    createdAt: string
    description: string
    fullName: string
    level: number
    updatedAt: string
}

export interface DepartmentId {
    _id: string
    code: string
    __v: number
    createdAt: string
    name: string
    originName: string
    updatedAt: string
}

export interface RoleId {
    _id: string
    name: string
    __v: number
    createdAt: string
    permissions: Permission[]
    updatedAt: string
}

export interface Permission {
    _id: string
    code: string
    __v: number
    createdAt: string
    description: string
    updatedAt: string
}
