import type { User } from "@/types/user"

export default function CAvatarName({ user, className }: { user?: User | null; className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full  ring-2 ring-blue-500/30">
                {user?.fullName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("") || "N/A"}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{user?.fullName}</p>
                <p className="text-xs text-neutral-500 truncate">{user?.positionId.fullName}</p>
            </div>
        </div>
    )
}
