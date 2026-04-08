import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFormBuilder } from "@/hooks/useFormBuilder"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
import { GripVerticalIcon, PlusIcon, SlidersHorizontalIcon, XIcon, ChevronLeft, Eye, Save, Send, Workflow, Plus, Clock, Trash2 } from "lucide-react"
import CToolTip from "@/components/etc/CToolTip"
import CSelectOptionsTable from "@/components/etc/CSelectOptionsTable"
import { useNavigate } from "react-router-dom"
import FormPreviewField from "../components/FormPreviewField"
import formTemplateService from "@/services/formTemplateService"
import LoadingUI from "@/components/etc/LoadingUI"
import CSelectSpecificUser from "@/components/etc/CSelectSpecificUser"

interface Step {
    id: string
    idx: number
    label: string
    name: string
    specificUserId?: string
    timeExpected: string
}

export default function CreateFormBuilderPage() {
    const { fields, setFields, activeFieldId, setActiveFieldId, addField, updateField, removeField, moveField, copyField } = useFormBuilder()
    const navigate = useNavigate()
    const id = location.pathname.split("/")[3]
    const { data, isLoading } = useQuery({
        queryKey: ["form-template-detail" + id],
        queryFn: () => formTemplateService.getById(id),
        enabled: !!id,
    })
    useEffect(() => {
        if (id && data?.fields) {
            setFields(data.fields)
        }
    }, [data?.fields, setFields, id])

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
    const [isShowAddStep, setIsShowAddStep] = useState(false)
    const [tab, setTab] = useState<"properties" | "workflow">("properties")

    const defaultWorkflow = [
        { id: `step_1`, idx: 1, label: "Quản lí trực tiếp", name: "Line Manager", specificUserId: "", timeExpected: "Within 24 hours" },
        { id: `step_2`, idx: 2, label: "Sếp của quản lí trực tiếp", name: "Upper Manager", specificUserId: "", timeExpected: "Within 24 hours" },
        { id: `step_3`, idx: 3, label: "Trưởng phòng", name: "Department Head", specificUserId: "", timeExpected: "Within 32 hours" },
        { id: `step_4`, idx: 4, label: "Chọn đích danh người cố định", name: "Specific Person", specificUserId: "", timeExpected: "Within 48 hours" },
    ]
    const [steps, setSteps] = useState<Step[]>([defaultWorkflow[0]])

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
            let res = null
            if (id) {
                delete data.code
                res = await axiosInstance.patch("/form-template/" + location.pathname.split("/")[3], data)
            } else {
                res = await axiosInstance.post("/form-template", data)
            }
            return res.data
        },
        onSuccess: (res: any) => {
            toast.success("Form template created successfully")
            setFields([])
            navigate("/approvals/form-manager/" + res.data._id)
        },
    })

    const handlePublish = () => {
        if (!stateData.engName || fields.length === 0) {
            toast.error("Fill in all required fields and add at least one input")
            return
        }

        createTemplateMutation.mutate({
            fields: [...fields].sort((a, b) => (a.order || 0) - (b.order || 0)),
            ...stateData,
            ruleWorkflowSequences: steps,
        })
    }

    const handleChangeField = (key: string, value: any) => {
        setStateData((prev) => ({
            ...prev,
            [key]: value,
        }))
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
                                                <FormPreviewField key={child.id} child={child} field={field} />
                                            ))}
                                        </div>
                                    )
                                }

                                return <FormPreviewField child={field} />
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

    const dataFieldName = [
        // date
        { label: "Ngày bắt đầu nghỉ", value: "startDate", desc: "Ngày bắt đầu nghỉ", fieldType: "date" },
        { label: "Ngày kết thúc nghỉ", value: "endDate", desc: "Ngày kết thúc nghỉ", fieldType: "date" },

        //text
        { label: "Vị trí", value: "location", desc: "Áp dụng cho form đăng ký làm việc tại nhà hoặc đăng ký chấm công ngoài văn phòng", fieldType: "text" },
        { label: "Địa điểm đến", value: "destination", desc: "Áp dụng cho form đăng ký công tác, đi công tác cần điền địa điểm đến", fieldType: "text" },
        { label: "Người được phân công làm thay", value: "replacementId", desc: "Người được phân công làm thay trong thời gian đi nghỉ phép", fieldType: "text" },
        { label: "Đơn vị tiền tệ", value: "currency", desc: "Đơn vị tiền tệ cho chi phí dự kiến", fieldType: "text" },
        { label: "Ca làm việc", value: "shiftId", desc: "Ca làm việc (sáng, chiều, tối) - áp dụng cho form xin nghỉ phép theo ca hoặc đăng ký làm thêm theo ca", fieldType: "text" },

        // textarea
        { label: "Lý do xin nghỉ", value: "reason", desc: "Lý do xin nghỉ", fieldType: "textarea" },
        { label: "Chi tiết lý do", value: "detailReason", desc: "Chi tiết lý do xin nghỉ", fieldType: "textarea" },
        { label: "Thông tin bàn giao", value: "handoverDetail", desc: "Thông tin bàn giao công việc khi đi nghỉ phép", fieldType: "textarea" },

        // number
        { label: "Chi phí dự kiến", value: "estimatedCost", desc: "Chi phí dự kiến cho form đăng ký công tác", fieldType: "number" },
        { label: "Tổng số giờ", value: "totalHours", desc: "Áp dụng cho form đăng ký làm thêm theo giờ hoặc đăng ký chấm công ngoài văn phòng theo giờ", fieldType: "number" },

        // combobox
        { label: "Phân loại lý do", value: "reasonCategory", desc: "Phân loại lý do xin nghỉ", fieldType: "select" },
        { label: "Nghỉ phép năm còn lại", value: "remainingAnnualLeave", desc: "Số ngày nghỉ phép năm còn lại của nhân viên", fieldType: "checkbox" },
        { label: "Đồng ý điều khoản", value: "termsAccepted", desc: "Đồng ý với các điều khoản và điều kiện", fieldType: "confirm" },
        { label: "Tệp đính kèm", value: "attachment", desc: "Tệp đính kèm", fieldType: "file" },
    ]

    const handleChangeValueOption = (value: string) => {
        if (value === "startDate" && activeField?.type !== "date") {
            updateField(activeFieldId!, {
                name: "startDate",
                label: "Start Date",
                placeholder: "Chọn ngày bắt đầu",
                required: true,
            })
        } else if (value === "endDate" && activeField?.type !== "date") {
            updateField(activeFieldId!, {
                name: "endDate",
                label: "End Date",
                placeholder: "Chọn ngày kết thúc",
                required: true,
            })
        } else if (value === "reason" && activeField?.type !== "textarea") {
            updateField(activeFieldId!, {
                name: "reason",
                label: "Reason",
                placeholder: "Nhập lý do",
                required: true,
            })
        } else if (value === "attachment" && activeField?.type !== "file") {
            updateField(activeFieldId!, {
                name: "attachment",
                label: "Đính kèm file",
                required: true,
            })
        } else if (value === "reasonCategory" && activeField?.type !== "comboboxOption") {
            updateField(activeFieldId!, {
                name: "reasonCategory",
                label: "Lý do xin nghỉ",
                placeholder: "Chọn lý do xin nghỉ",
                required: true,
                options: [
                    { label: "Ốm đau", value: "sick" },
                    { label: "Việc riêng", value: "personal" },
                    { label: "Khác", value: "other" },
                ],
            })
        } else {
            const selectedOption = dataFieldName.find((opt) => opt.value === value)
            if (selectedOption) {
                updateField(activeFieldId!, {
                    name: selectedOption.value,
                    label: selectedOption.label,
                    placeholder: `Nhập ${selectedOption.label.toLowerCase()}`,
                    required: false,
                })
            }
        }
    }

    const sortSteps = (stepsToSort: Step[]) => {
        return stepsToSort.sort((a, b) => a.idx - b.idx)
    }

    const handleAddStep = (step: any) => {
        const sortStepsnewStep = sortSteps([...steps, step])
        setSteps(sortStepsnewStep)
        setIsShowAddStep(false)
    }

    const handleAssignSpecificUser = (userId: string) => {
        setSteps((prevSteps) => {
            const updatedSteps = prevSteps.map((step) => {
                if (step.id === "step_4") {
                    return { ...step, specificUserId: userId }
                }
                return step
            })
            return updatedSteps
        })
    }

    const handleDeleteStep = (id: string) => {
        setSteps((prev) => prev.filter((step) => step.id !== id))
    }

    return (
        <div className="">
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

                    <main className="flex-1 bg-card rounded-xl shadow-xl p-5 overflow-auto flex flex-col items-center">
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
                                                            onChildCopy={() => copyField(field.id)}
                                                            activeFieldId={activeFieldId}
                                                        />
                                                    ) : (
                                                        <SortableField
                                                            key={field.id}
                                                            field={field}
                                                            isActive={activeFieldId === field.id}
                                                            onClick={() => setActiveFieldId(field.id)}
                                                            onRemove={() => removeField(field.id)}
                                                            onCopy={() => copyField(field.id)}
                                                        />
                                                    ),
                                                )}
                                            </SortableContext>
                                        </div>
                                    </DroppableArea>
                                    <div className="text-right">
                                        <Button className="" variant={"outline-primary"}>
                                            <Send className="mr-2 h-4 w-4" /> {stateData.submitButtonText || "Submit Button"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </main>

                    <aside className="w-96 bg-card flex flex-col shadow-xl rounded-md transition-all duration-300 overflow-y-auto">
                        <div className="border-b flex items-center">
                            <div
                                className={`p-5 flex gap-2 items-center h-full w-full text-center cursor-pointer text-sm flex-1 ${tab === "properties" ? " border-b-2 border-primary text-primary font-medium " : "hover:bg-muted"}`}
                                onClick={() => setTab("properties")}
                            >
                                <SlidersHorizontalIcon />
                                <h2 className="font-bold">PROPERTIES</h2>
                            </div>
                            <div
                                className={`p-5 flex gap-2 items-center h-full w-full text-center cursor-pointer text-sm flex-1 ${tab === "workflow" ? " border-b-2 border-primary text-primary font-medium " : "hover:bg-muted"}`}
                                onClick={() => setTab("workflow")}
                            >
                                <SlidersHorizontalIcon />
                                <h2 className="font-bold">WORKFLOW</h2>
                            </div>
                        </div>
                        {tab === "properties" && (
                            <div>
                                {activeField && (
                                    <div className="p-5 space-y-6 overflow-y-auto  m-1.5 border-2 border-dashed border-primary/30 transition-all duration-300">
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
                                                <div className="space-y-2">
                                                    <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Field Name</Label>
                                                    <CSelectOptionsTable
                                                        data={dataFieldName.filter((f) => f.fieldType === activeField.type)}
                                                        valueKey="value"
                                                        displayKey="label"
                                                        descKey="desc"
                                                        placeholder={
                                                            dataFieldName.filter((f) => f.fieldType === activeField.type).length > 0 ? "Select a predefined field" : "No predefined field for this type"
                                                        }
                                                        onChange={(value) => handleChangeValueOption(value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="font-bold uppercase tracking-wider text-[11px] text-neutral-500">Note</Label>
                                                    <Input
                                                        value={activeField.note || ""}
                                                        placeholder="Enter note..."
                                                        onChange={(e) => updateField(activeField.id, { note: e.target.value })}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="space-y-4 pt-4 border-t">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="required-field" className="cursor-pointer font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                                                            Required Field
                                                        </Label>
                                                        <Switch id="required-field" checked={activeField.required} onCheckedChange={(c) => updateField(activeField.id, { required: c })} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="read-only-field" className="cursor-pointer font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                                                            Read-only Mode
                                                        </Label>
                                                        <Switch id="read-only-field" checked={activeField.readOnly} onCheckedChange={(c) => updateField(activeField.id, { readOnly: c })} />
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
                                        <Switch
                                            id="require-attachment"
                                            checked={stateData.requireAttachment}
                                            onCheckedChange={() => handleChangeField("requireAttachment", !stateData.requireAttachment)}
                                        />
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
                            </div>
                        )}
                        {tab === "workflow" && (
                            <div className="flex flex-col justify-between flex-1 overflow-auto  p-5">
                                <div className="flex h-10 justify-between items-center">
                                    <h1 className="flex gap-2 font-medium">
                                        <Workflow size={20} /> Workflow sequence
                                    </h1>
                                    <Popover open={isShowAddStep} onOpenChange={setIsShowAddStep}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Plus /> Add Step
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            {defaultWorkflow.map((step) => (
                                                <div key={step.id} className="p-3 rounded-md hover:bg-muted cursor-pointer flex items-center gap-2" onClick={() => handleAddStep(step)}>
                                                    {step.label}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="mt-10 space-y-7 overflow-y-auto  flex-1">
                                    {steps.map((step, index) => (
                                        <div key={step.id} className="transition-all duration-300 flex items-start gap-3 relative">
                                            <Button variant="destructive" className="absolute top-2 right-2" size="sm" onClick={() => handleDeleteStep(step.id)}>
                                                <Trash2 size={16} />
                                            </Button>
                                            <div className="flex items-center flex-col">
                                                <div className="bg-primary/80 font-bold text-white rounded-lg h-8 w-8 text-xs flex items-center justify-center">{index + 1}</div>
                                                <div className="w-1 h-12 bg-border"></div>
                                            </div>
                                            <div className="p-5 border flex-1 rounded-lg shadow-xs">
                                                <p className="uppercase tracking-widest font-bold text-neutral-500 text-xs mb-2">responsible</p>

                                                {step.id == "step_4" ? (
                                                    <CSelectSpecificUser handleAssignSpecificUser={handleAssignSpecificUser} />
                                                ) : (
                                                    <h1 className="font-bold text-lg">{step.label}</h1>
                                                )}
                                                <p className="uppercase tracking-widest font-bold text-neutral-500 text-xs mt-4 mb-2 ">sla/deadline</p>
                                                <div className="flex gap-2 items-center rounded-sm px-3 py-2 bg-background text-sm">
                                                    <Clock size={18} /> {step.timeExpected}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
        </div>
    )
}
