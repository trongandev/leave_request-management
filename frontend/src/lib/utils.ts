import { clsx, type ClassValue } from "clsx"
import { formatDistance } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const convertBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

export const handleDistanceDate = (start: string, end: string) => {
    const startDate = new Date(start || new Date())
    const endDate = new Date(end || new Date())
    return formatDistance(startDate, endDate)
}
