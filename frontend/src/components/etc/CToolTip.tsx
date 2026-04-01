import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function CToolTip({ children, content }: { children: React.ReactNode; content: string }) {
    return (
        <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    )
}
