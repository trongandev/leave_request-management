import type { User } from "./user";

export interface LeaveBalance {
    _id: string;
    userId: User;
    year: number;
    baseDays: number;
    seniorityDays: number;
    adjustedDays: number;
    totalDays: number;
    usedDays: number;
    remainingDays: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLeaveBalanceDto {
    userId: string;
    year: number;
    adjustedDays: number;
    usedDays: number;
}

export interface LeaveBalanceLog {
    id: string;
    userId: string;
    requestId: string;
    changeAmount: number;
    reason: string;
    createdAt: string;
}

export interface AdjustLeaveBalanceDto {
    changeAmount: number;
    reason: string;
    requestId: string;
}
