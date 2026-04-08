import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import type { User, UserResponse } from "@/types/user"
import { useState } from "react"
import userService from "@/services/userService"
import { Input } from "../ui/input"
import CAvatarName from "./CAvatarName"
export default function CSelectSpecificUser({ handleAssignSpecificUser }: { handleAssignSpecificUser: (userId: string) => void }) {
    const [userChoice, setUserChoice] = useState<User | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const { data, isLoading } = useQuery<UserResponse>({
        queryKey: ["employees", search],
        queryFn: () =>
            userService.getAllUsers({
                search,
            }),
    })
    return (
        <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full ">
                    {userChoice ? <p>{userChoice.fullName}</p> : "Select specific user"}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="">
                    <Input placeholder="Tìm kiếm người dùng..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-2" />
                    {isLoading ? (
                        <div className="h-32 flex items-center justify-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto">
                            {data?.data?.map((user) => (
                                <div
                                    key={user._id}
                                    className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setUserChoice(user)
                                        handleAssignSpecificUser(user._id)
                                        setIsOpen(false)
                                    }}
                                >
                                    <CAvatarName user={user} isDisabledLink />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
