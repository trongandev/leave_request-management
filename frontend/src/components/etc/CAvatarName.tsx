import type { User } from "@/types/user"
import CAvatarProfile from "./CAvatarProfile"

export default function CAvatarName({ user, className }: { user?: User | null; className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {user && <CAvatarProfile user={user} />}
            <div className=" min-w-0 ">
                <p className="text-sm font-medium text-slate-900 truncate max-w-[130px] line-clamp-1" title={user?.fullName}>
                    {user?.fullName}
                </p>
                <p className="text-xs text-neutral-500 truncate max-w-[130px] line-clamp-1" title={user?.positionId?.fullName}>
                    {user?.positionId?.fullName}
                </p>
            </div>
        </div>
    )
}
