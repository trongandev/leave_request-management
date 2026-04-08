import type { User } from "@/types/user"
import CAvatarProfile from "./CAvatarProfile"
import { Link } from "react-router-dom"

export default function CAvatarName({ user, className, isDisabledLink, isLinkActiveAnother }: { user?: User | null; className?: string; isDisabledLink?: boolean; isLinkActiveAnother?: boolean }) {
    return (
        <Link to={isLinkActiveAnother ? `/profile/${user?._id}` : "/profile"} className={`flex items-center gap-3 ${className}`} onClick={(e) => isDisabledLink && e.preventDefault()}>
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
