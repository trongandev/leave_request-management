import type { User } from "@/types/user"
import CAvatarProfile from "./CAvatarProfile"
import { Link } from "react-router-dom"

export default function CAvatarName({ user, className }: { user?: User | null; className?: string }) {
    return (
        <Link to={"/profile"} className={`flex items-center gap-3 ${className}`}>
            {user && <CAvatarProfile user={user} />}
            <div className=" min-w-0 ">
                <p className={`text-sm font-medium text-foreground truncate ${className !== "flex-row-reverse" && "max-w-32.5"}  line-clamp-1`} title={user?.fullName}>
                    {user?.fullName}
                </p>
                <p className={`text-xs text-foreground/70 truncate ${className !== "flex-row-reverse" && "max-w-32.5"} line-clamp-1`} title={user?.positionId?.fullName}>
                    {user?.positionId?.fullName}
                </p>
            </div>
        </Link>
    )
}
