import LoadingUI from "@/components/etc/LoadingUI"
import userService from "@/services/userService"
import { useQuery } from "@tanstack/react-query"

export default function TeamManagement() {
    const { data, isLoading } = useQuery({
        queryKey: ["team-management"],
        queryFn: () => userService.getTeamMembers(),
    })
    console.log(data)

    if (isLoading) {
        return <LoadingUI />
    }
    return <div>TeamManagement</div>
}
