import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFormBuilder } from "@/hooks/useFormBuilder"
import { useMutation, useQuery } from "@tanstack/react-query"
import CSelectOptions from "@/components/etc/CSelectOptions"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"

import axiosInstance from "@/api/axiosInstance"
import { navDefault } from "../components/NavDefaultConfig"
import { SidebarItem } from "../components/SidebarItem"
import DroppableArea from "../components/DroppableAreaFormBuilder"
import { SortableField } from "../components/SortableField"
import { SortableContainer } from "../components/SortableContainer"
import { GripVerticalIcon, PlusIcon, SlidersHorizontalIcon, XIcon, ChevronLeft, Eye, Save, FileUpIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "@/components/ui/date-picker"
import LoadingUI from "@/components/etc/LoadingUI"
import formTemplateService from "@/services/formTemplateService"
import { useLocation } from "react-router-dom"
import CToolTip from "@/components/etc/CToolTip"

export default function EditFormBuilderPage() {
    const location = useLocation()
    const { data, isLoading } = useQuery({
        queryKey: ["form-template-detail" + location.pathname.split("/")[3]],
        queryFn: () => formTemplateService.getById(location.pathname.split("/")[3]),
    })

    const { fields, setFields, activeFieldId, setActiveFieldId, addField, updateField, removeField, moveField } = useFormBuilder()
    useEffect(() => {
        setFields(data?.fields || [])
    }, [data?.fields, setFields])
    const [stateData, setStateData] = useState({
        vieName: "Đơn Xin Nghỉ Bệnh",
        engName: "Sick Leave Application Form",
        code: "SICK_LEAVE",
        submitButtonText: "Gửi yêu cầu",
        maxDays: 1,
        requireAttachment: true,
        autoApprove: false,
        isActive: true,
        isReductible: false,
    })
    const [activeDragItem, setActiveDragItem] = useState<any>(null)
    const [isPreviewShow, setIsPreviewShow] = useState(false)

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

    // Handle Delete key press to remove selected field
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Delete" && activeFieldId) {
                e.preventDefault()
                removeField(activeFieldId)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [activeFieldId, removeField])

    const createTemplateMutation = useMutation({
        mutationFn: async (data: any) => {
            console.log(data)
            const res = await axiosInstance.patch("/form-template/" + location.pathname.split("/")[3], data)
            console.log(res)
            return res.data
        },
        onSuccess: () => {
            toast.success("Form template updated successfully")
            setFields([])
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update template")
        },
    })

    const handlePublish = () => {
        if (!stateData.vieName || fields.length === 0) {
            toast.error("Fill in all required fields and add at least one input")
            return
        }

        createTemplateMutation.mutate({
            fields: [...fields].sort((a, b) => (a.order || 0) - (b.order || 0)),
            ...stateData,
        })
    }

    const handleDragStart = (event: any) => {
        const { active } = event
        setActiveDragItem(active.data.current)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        setActiveDragItem(null)

        if (!over) return

        const isSidebarItem = active.data.current?.isSidebarItem
        const isField = active.data.current?.isField

        let targetParentId = null
        let targetIndex = undefined

        if (over.id === "form-droppable-area") {
            // Drop to root
            targetParentId = null
        } else if (over.data.current?.isContainerDroppable) {
            // Drop directly into a container
            targetParentId = over.data.current.containerId
        } else if (over.data.current?.isField) {
            // Drop over a specific field
            targetParentId = over.data.current.field.parentId
            targetIndex = fields.findIndex((f) => f.id === over.id)
        }

        if (isSidebarItem) {
            addField(active.data.current.type, { parentId: targetParentId, index: targetIndex })
        } else if (isField && active.id !== over.id) {
            moveField(active.id, over.id, targetParentId, targetIndex)
        }
    }

    const activeField = fields.find((f) => f.id === activeFieldId)
    const rootFields = fields.filter((f) => !f.parentId).sort((a, b) => (a.order || 0) - (b.order || 0))

    const handleChangeField = (key: string, value: any) => {
        setStateData((prev) => ({
            ...prev,
            [key]: value,
        }))
    }
    if (isLoading) {
        return <LoadingUI />
    }
    if (isPreviewShow) {
        return (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Form Preview</h2>
                <Card className="shadow-md">
                    <CardContent className="">
                        <div className="space-y-5">
                            {rootFields.map((field) => {
                                if (field.type === "container") {
                                    const childFields = fields.filter((f) => f.parentId === field.id).sort((a, b) => (a.order || 0) - (b.order || 0))
                                    return (
                                        <div key={field.id} className={`flex gap-4 ${field.layout?.direction === "row" ? "flex-row" : "flex-col"}`}>
                                            {childFields.map((child) => (
                                                <div key={child.id} className={field.layout?.direction === "row" ? "flex-1" : ""}>
                                                    <div className="space-y-1 mb-4">
                                                        <Label>
                                                            {child.label} {child.required && <span className="text-red-500">*</span>}
                                                        </Label>
                                                        {child.type === "text" && <Input placeholder={child.placeholder} readOnly={child.readOnly} />}
                                                        {child.type === "number" && <Input type="number" placeholder={child.placeholder} readOnly={child.readOnly} />}
                                                        {child.type === "textarea" && <Textarea placeholder={child.placeholder} readOnly={child.readOnly} />}
                                                        {child.type === "select" && (
                                                            <CSelectOptions data={child.options || []} placeholder={child.placeholder} valueKey="value" readOnly={child.readOnly} />
                                                        )}
                                                        {child.type === "date" && <DatePicker className="" />}
                                                        {child.type === "file" && (
                                                            <div className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2">
                                                                <FileUpIcon />
                                                                <p className="text-sm font-medium">File upload area</p>
                                                            </div>
                                                        )}
                                                        {child.type === "checkbox" && (
                                                            <div className="space-y-2">
                                                                {(child.options || []).map((opt, i) => (
                                                                    <div key={i} className="flex items-center gap-2">
                                                                        <input type="checkbox" id={`${child.id}_opt_${i}`} name={child.id} value={opt.value} disabled={child.readOnly} />
                                                                        <label htmlFor={`${child.id}_opt_${i}`} className="text-sm text-neutral-500">
                                                                            {opt.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }

                                return (
                                    <div key={field.id} className="space-y-1">
                                        <Label>
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </Label>
                                        {field.type === "text" && <Input placeholder={field.placeholder} readOnly={field.readOnly} />}
                                        {field.type === "number" && <Input type="number" placeholder={field.placeholder} readOnly={field.readOnly} />}
                                        {field.type === "select" && <CSelectOptions data={field.options || []} placeholder={field.placeholder} valueKey="value" readOnly={field.readOnly} />}
                                        {field.type === "radio" && (
                                            <div className="space-y-2">
                                                {(field.options || []).map((opt, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <input type="radio" id={`${field.id}_opt_${i}`} name={field.id} value={opt.value} disabled={field.readOnly} />
                                                        <label htmlFor={`${field.id}_opt_${i}`} className="text-sm text-neutral-500">
                                                            {opt.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {field.type === "checkbox" && (
                                            <div className="space-y-2">
                                                {(field.options || []).map((opt, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <input type="checkbox" id={`${field.id}_opt_${i}`} name={field.id} value={opt.value} disabled={field.readOnly} />
                                                        <label htmlFor={`${field.id}_opt_${i}`} className="text-sm text-neutral-500">
                                                            {opt.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {field.type === "date" && <DatePicker className="" />}
                                        {field.type === "textarea" && <Textarea className="h-32" placeholder={field.placeholder} readOnly={field.readOnly} />}
                                        {field.type === "file" && (
                                            <div className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2">
                                                <FileUpIcon />
                                                <p className="text-sm font-medium">File upload area</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                            <div className="text-right">
                                <Button className="w-32 h-12">Gửi</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Button variant={"outline"} className="mt-6" onClick={() => setIsPreviewShow(false)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Edit
                </Button>
            </div>
        )
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex overflow-hidden gap-3 h-[calc(100vh-6rem)] select-none">
                <aside className="w-75 bg-card rounded-md shadow-xl flex flex-col p-4 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="font-medium text-lg tracking-tight mb-1">Form Builder</h2>
                        <p className="text-xs font-medium text-neutral-500">Drag items to build form</p>
                    </div>
                    <div className="space-y-6">
                        {navDefault.map((section) => (
                            <div key={section.name}>
                                <h3 className="text-[10px] uppercase tracking-widest font-bold text-outline mb-3 px-2 text-neutral-500">{section.name}</h3>
                                <div className="grid grid-cols-1 gap-1">
                                    {section.child.map((item) => (
                                        <SidebarItem key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 bg-card rounded-xl shadow-xl p-5 overflow-y-auto flex flex-col items-center">
                    <div className="w-full max-w-4xl space-y-8">
                        <div className="space-y-4">
                            <div className="flex gap-5">
                                <div className="space-y-1 flex-1">
                                    <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Vie Name</Label>
                                    <Input value={stateData.vieName} onChange={(e) => handleChangeField("vieName", e.target.value)} className="" placeholder="Form Name" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Eng Name</Label>
                                    <Input value={stateData.engName} onChange={(e) => handleChangeField("engName", e.target.value)} className="" placeholder="Form Name" />
                                </div>
                            </div>
                            <div className="space-y-4 flex-1 flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Form Code (VD:SICK_LEAVE)</Label>
                                    <Input value={stateData.code} onChange={(e) => handleChangeField("code", e.target.value)} className="" placeholder="Form Code" />
                                </div>
                                <div className="flex gap-2">
                                    <Button variant={"outline"} onClick={() => setIsPreviewShow(true)}>
                                        <Eye className="mr-2 h-4 w-4" /> Preview
                                    </Button>
                                    <Button onClick={handlePublish} disabled={createTemplateMutation.isPending}>
                                        <Save className="mr-2 h-4 w-4" /> {createTemplateMutation.isPending ? "Saving..." : "Publish"}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Card className="shadow-md">
                            <CardContent className="">
                                <DroppableArea isEmpty={rootFields.length === 0}>
                                    <div className="space-y-4">
                                        <SortableContext items={rootFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                                            {rootFields.map((field) =>
                                                field.type === "container" ? (
                                                    <SortableContainer
                                                        key={field.id}
                                                        container={field}
                                                        fields={fields}
                                                        isActive={activeFieldId === field.id}
                                                        onClick={() => setActiveFieldId(field.id)}
                                                        onRemove={() => removeField(field.id)}
                                                        onChildClick={(id) => setActiveFieldId(id)}
                                                        onChildRemove={(id) => removeField(id)}
                                                        activeFieldId={activeFieldId}
                                                    />
                                                ) : (
                                                    <SortableField
                                                        key={field.id}
                                                        field={field}
                                                        isActive={activeFieldId === field.id}
                                                        onClick={() => setActiveFieldId(field.id)}
                                                        onRemove={() => removeField(field.id)}
                                                    />
                                                ),
                                            )}
                                        </SortableContext>
                                    </div>
                                </DroppableArea>
                            </CardContent>
                        </Card>
                    </div>
                </main>

                <aside className="w-75 bg-card flex flex-col shadow-xl rounded-md">
                    <div className="p-5 border-b flex items-center gap-4">
                        <SlidersHorizontalIcon className="text-neutral-500" />
                        <h2 className="font-bold">Settings</h2>
                    </div>

                    {activeField ? (
                        <div className="p-6 space-y-6 overflow-y-auto flex-1">
                            {activeField.type === "container" ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Container Label</Label>
                                        <Input value={activeField.label} onChange={(e) => updateField(activeField.id, { label: e.target.value })} className="w-full" />
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Layout Direction</Label>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={activeField.layout?.direction === "row" ? "default" : "outline"}
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => updateField(activeField.id, { layout: { direction: "row" } })}
                                            >
                                                Row
                                            </Button>
                                            <Button
                                                variant={activeField.layout?.direction !== "row" ? "default" : "outline"}
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => updateField(activeField.id, { layout: { direction: "col" } })}
                                            >
                                                Column
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Field Label</Label>
                                        <Input value={activeField.label} onChange={(e) => updateField(activeField.id, { label: e.target.value })} className="w-full" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Placeholder Text</Label>
                                        <Input value={activeField.placeholder || ""} onChange={(e) => updateField(activeField.id, { placeholder: e.target.value })} className="w-full" />
                                    </div>

                                    <div className="space-y-4 pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Required Field</span>
                                            <Switch checked={activeField.required} onCheckedChange={(c) => updateField(activeField.id, { required: c })} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Read-only Mode</span>
                                            <Switch checked={activeField.readOnly} onCheckedChange={(c) => updateField(activeField.id, { readOnly: c })} />
                                        </div>
                                    </div>

                                    {(activeField.type === "select" || activeField.type === "radio" || activeField.type === "checkbox") && (
                                        <div className="space-y-3 pt-4 border-t">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Options</label>
                                                <Button
                                                    variant={"outline"}
                                                    size="sm"
                                                    className="h-8 shadow-sm"
                                                    onClick={() => {
                                                        const opts = [...(activeField.options || [])]
                                                        opts.push({ label: `Option ${opts.length + 1}`, value: `opt_${Date.now()}` })
                                                        updateField(activeField.id, { options: opts })
                                                    }}
                                                >
                                                    <PlusIcon size={14} className="mr-1" /> Add
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                {(activeField.options || []).map((opt, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <Input
                                                            value={opt.label}
                                                            onChange={(e) => {
                                                                const opts = [...(activeField.options || [])]
                                                                opts[i] = { ...opts[i], label: e.target.value }
                                                                updateField(activeField.id, { options: opts })
                                                            }}
                                                            className="h-8 text-xs"
                                                        />
                                                        <Button
                                                            variant={"ghost"}
                                                            size={"icon"}
                                                            className="h-8 w-8 text-neutral-400 hover:text-red-500 flex-shrink-0"
                                                            onClick={() => {
                                                                const opts = activeField.options?.filter((_, index) => index !== i)
                                                                updateField(activeField.id, { options: opts })
                                                            }}
                                                        >
                                                            <XIcon size={14} />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 flex-1 flex items-center justify-center text-center text-neutral-400 text-sm">Select a field to edit its settings</div>
                    )}
                    <div className="p-5 space-y-6 overflow-y-auto  m-1.5 border-2 border-dashed  transition-all duration-300">
                        <div className="space-y-1">
                            <CToolTip content="Thay đổi text hiển thị trên nút submit của form. Mặc định là 'Gửi yêu cầu'">
                                <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Submit Button Text</Label>
                            </CToolTip>
                            <Input value={stateData.submitButtonText} onChange={(e) => handleChangeField("submitButtonText", e.target.value)} className="" placeholder="Form Code" />
                        </div>{" "}
                        <div className="space-y-1">
                            <CToolTip content="Thời gian nghỉ tối đa">
                                <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Max Days</Label>
                            </CToolTip>
                            <Input value={stateData.maxDays} onChange={(e) => handleChangeField("maxDays", e.target.value)} className="" placeholder="Form Code" />
                        </div>
                        <div className="flex items-center justify-between">
                            <CToolTip content="Bật tính năng này nếu bạn muốn form này không trừ vào phép năm của nhân viên khi được duyệt.">
                                <Label htmlFor="is-reductible" className="cursor-pointer font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                                    Reductible
                                </Label>
                            </CToolTip>
                            <Switch id="is-reductible" checked={stateData.isReductible} onCheckedChange={() => handleChangeField("isReductible", !stateData.isReductible)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <CToolTip content="Bật tính năng này nếu bạn yêu cầu nhân viên phải đính kèm file khi gửi form.">
                                <Label htmlFor="require-attachment" className="cursor-pointer font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                                    Require Attachment
                                </Label>
                            </CToolTip>
                            <Switch id="require-attachment" checked={stateData.requireAttachment} onCheckedChange={() => handleChangeField("requireAttachment", !stateData.requireAttachment)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <CToolTip content="Bật tính năng này nếu bạn muốn form này được duyệt tự động khi được gửi.">
                                <Label htmlFor="auto-approve" className="cursor-pointer font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                                    Auto Approve
                                </Label>
                            </CToolTip>
                            <Switch id="auto-approve" checked={stateData.autoApprove} onCheckedChange={() => handleChangeField("autoApprove", !stateData.autoApprove)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <CToolTip content="Bật tính năng này khi bạn tạo form thì form sẽ luôn ở trạng thái active và có thể sử dụng được ngay mà không cần phải kích hoạt thủ công.">
                                <Label htmlFor="active" className="cursor-pointer font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                                    Active
                                </Label>
                            </CToolTip>
                            <Switch id="active" checked={true} />
                        </div>
                    </div>
                </aside>
            </div>
            <DragOverlay>
                {activeDragItem ? (
                    <div className="bg-card p-3 rounded-md shadow-lg border border-primary/20 flex items-center gap-2 text-primary opacity-80">
                        <GripVerticalIcon size={16} />
                        <span className="text-sm font-medium">{activeDragItem.isSidebarItem ? "Drop to add field" : "Moving field..."}</span>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
