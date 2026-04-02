export const PositionBadge = ({ name, children }: { name: string; children?: React.ReactNode }) => {
    const nomalized = name.toLowerCase()
    const colorMap: Record<string, string> = {
        IT: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        HR: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        Finance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        Manager: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    }
    const bgColor = colorMap[nomalized] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    return <span className={`tracking-wide text-xs px-2 py-0.5 rounded-full ${bgColor}`}>{children || name}</span>
}

export const RoleBadge = ({ name }: { name: string }) => {
    const nomalized = name.toLowerCase()
    const colorMap: Record<string, string> = {
        admin: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        manager: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        employee: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        hr: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    }
    const bgColor = colorMap[nomalized] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    return <span className={`tracking-wide text-xs px-2 py-0.5 rounded-full ${bgColor}`}>{name}</span>
}

export const CBadge = ({ name, className, children }: { name?: string; className?: string; children?: React.ReactNode }) => {
    return <span className={`tracking-wide text-xs px-2 py-0.5 rounded-full bg-secondary ${className || ""}`}>{children || name}</span>
}
