import { Loader } from "lucide-react"

export default function LoadingUI({ className }: { className?: string }) {
    return (
        <div className={`h-125 flex items-center justify-center bg-white rounded-xl shadow-sm ${className || ""}`}>
            <Loader className="animate-spin" />
        </div>
    )
}
