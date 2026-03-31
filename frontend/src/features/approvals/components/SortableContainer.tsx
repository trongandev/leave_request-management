import { useDroppable } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { SortableField } from "./SortableField"
import { Trash2, Copy, Container } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Field } from "@/types/form-template"

interface SortableContainerProps {
    container: Field
    fields: Field[]
    isActive: boolean
    onClick: () => void
    onRemove: () => void
    onCopy?: () => void
    onChildClick: (id: string) => void
    onChildRemove: (id: string) => void
    onChildCopy?: (id: string) => void
    activeFieldId: string | null
}

export function SortableContainer({ container, fields, isActive, onClick, onRemove, onCopy, onChildClick, onChildRemove, onChildCopy, activeFieldId }: SortableContainerProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: container.id,
        data: { type: container.type, isField: true, isContainer: true, field: container },
    })

    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id: container.id,
        data: { isContainerDroppable: true, containerId: container.id },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const containerFields = fields.filter((f) => f.parentId === container.id).sort((a, b) => (a.order || 0) - (b.order || 0))

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
            {...attributes}
            {...listeners}
            className={`p-4 rounded-xl cursor-grab relative group transition-all  mb-4 ${
                isActive ? "bg-primary/5 border-2 border-primary/30 ring-4 ring-primary/10" : "bg-neutral-50/50 border-2 border-dashed border-neutral-300"
            } ${isDragging ? "opacity-30" : ""} ${isOver ? "bg-primary/10 border-primary" : ""}`}
        >
            <div className="absolute top-0 right-4 -translate-y-1/2 bg-white px-2 text-xs font-bold text-neutral-400 border rounded flex items-center gap-1">
                <Container size={12} /> {container.label}
            </div>

            {isActive && (
                <div className="absolute -right-14 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 z-10">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation()
                            onRemove()
                        }}
                    >
                        <Trash2 size={16} />
                    </Button>
                    {onCopy && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation()
                                onCopy()
                            }}
                        >
                            <Copy size={16} />
                        </Button>
                    )}
                </div>
            )}

            <div
                ref={setDroppableNodeRef}
                className={`min-h-[100px] w-full mt-2 rounded transition-colors ${container.layout?.direction === "row" ? "flex flex-row gap-4 items-center" : "flex flex-col gap-4"}`}
            >
                <SortableContext items={containerFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                    {containerFields.map((field) => (
                        <div key={field.id} className={container.layout?.direction === "row" ? "flex-1" : ""}>
                            <SortableField
                                field={field}
                                isActive={activeFieldId === field.id}
                                onClick={() => onChildClick(field.id)}
                                onRemove={() => onChildRemove(field.id)}
                                onCopy={onChildCopy ? () => onChildCopy(field.id) : undefined}
                            />
                        </div>
                    ))}
                    {containerFields.length === 0 && <div className="w-full text-center text-sm text-neutral-400 py-8 italic pointer-events-none">Drop items here</div>}
                </SortableContext>
            </div>
        </div>
    )
}
