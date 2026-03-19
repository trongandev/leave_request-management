import type { User } from "@/types/user"

export default function CAvatarProfile({ user, className }: { user: User; className?: string }) {
    return (
        <div className={`w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full  ring-2 ring-blue-500/30 ${className || ""}`}>
            {user?.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover rounded-full" />
            ) : (
                <>
                    {" "}
                    {user?.fullName
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .slice(0, 2)
                        .join("") || "N/A"}
                </>
            )}
        </div>
    )
}
