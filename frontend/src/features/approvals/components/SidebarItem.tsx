import { useDraggable } from "@dnd-kit/core"
import { GripVerticalIcon } from "lucide-react"
import { createElement } from "react"

export function SidebarItem({ item }: { item: any }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `sidebar-${item.type}`,
        data: { type: item.type, isSidebarItem: true },
    })

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`flex items-center gap-3 p-2 rounded-md border transition-all cursor-grab group select-none ${
                isDragging ? "opacity-50" : "hover:bg-card hover:shadow-sm border-transparent hover:border-outline/30"
            }`}
        >
            <GripVerticalIcon />
            <span className="material-symbols-outlined text-neutral-600 text-xl">{createElement(item.icon, { size: 20 })}</span>
            <span className="text-sm font-medium">{item.name}</span>
        </div>
    )
}
