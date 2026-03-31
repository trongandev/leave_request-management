import { useDroppable } from "@dnd-kit/core"
import { PlusIcon } from "lucide-react"
import React from "react"

export default function DroppableArea({ children, isEmpty }: { children: React.ReactNode; isEmpty: boolean }) {
    const { setNodeRef, isOver } = useDroppable({
        id: "form-droppable-area",
    })

    return (
        <div ref={setNodeRef} className={`w-full min-h-[400px] transition-colors ${isOver ? "bg-primary/5 rounded-xl border-primary/20 border-2" : ""}`}>
            {children}
            {isEmpty && (
                <div className="py-12 mt-4 border-2 border-dashed border-outline/30 rounded-xl flex flex-col items-center justify-center text-outline hover:border-primary/40 hover:text-primary/40 transition-all">
                    <span className="material-symbols-outlined text-4xl mb-2" data-icon="add_circle">
                        <PlusIcon size={40} />
                    </span>
                    <p className="text-sm font-medium">Drag and drop components here</p>
                </div>
            )}
        </div>
    )
}
