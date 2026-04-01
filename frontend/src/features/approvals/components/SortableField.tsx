import CSelectOptions from "@/components/etc/CSelectOptions"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSortable } from "@dnd-kit/sortable"
import { Copy, FileUpIcon, Trash2 } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"
import type { Field } from "@/types/form-template"
import { Textarea } from "@/components/ui/textarea"

export function SortableField({ field, isActive, onClick, onRemove, onCopy }: { field: Field; isActive: boolean; onClick: () => void; onRemove: () => void; onCopy?: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: field.id,
        data: { type: field.type, isField: true, field },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

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
            className={`space-y-2 p-6 rounded-xl relative group transition-all ${
                isActive ? "bg-primary/5 border-2 border-primary/30 ring-4 ring-primary/10" : "hover:bg-neutral-50 border-2 border-transparent  cursor-grab"
            } ${isDragging ? "opacity-30" : ""}`}
        >
            {isActive && <div className="absolute -left-2 -top-2 bg-primary text-white px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase">Active Component</div>}

            {isActive && (
                <div className="absolute cursor-grab -right-14 inset-y-0 flex flex-col items-center justify-center gap-2">
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

            <div className="space-y-2 pointer-events-none">
                <Label>
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === "text" && <Input placeholder={field.placeholder || "Text input"} readOnly className="h-12 w-full" />}
                {field.type === "number" && <Input type="number" placeholder={field.placeholder || "Number input"} readOnly className="h-12 w-full" />}
                {field.type === "date" && <DatePicker className="" />}
                {field.type === "textarea" && <Textarea placeholder={field.placeholder || "Text area"} readOnly className="h-24 w-full" />}
                {field.type === "select" && <CSelectOptions data={field.options || []} placeholder={field.placeholder || "Select option"} valueKey="value" />}
                {field.type === "radio" && <div className="text-sm text-neutral-500">Radio group ({field.options?.length || 0} options)</div>}
                {field.type === "checkbox" && <div className="text-sm text-neutral-500">Checkbox group ({field.options?.length || 0} options)</div>}
                {field.type === "file" && (
                    <div className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2">
                        <FileUpIcon />
                        <p className="text-sm font-medium">File upload area</p>
                    </div>
                )}
            </div>
        </div>
    )
}
