/* eslint-disable react-hooks/set-state-in-effect */
import CSelectOptions from "@/components/etc/CSelectOptions"
import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DatePicker from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { convertBase64 } from "@/lib/utils"
import requestService from "@/services/requestService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChevronLeft, FileUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function EditDetailRequestPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const id = location.pathname.split("/")[3]
    const { data, isLoading } = useQuery({
        queryKey: ["request-detail", id],
        queryFn: () => requestService.getRequestId(id),
    })
    const [valueFields, setValueFields] = useState<any>()

    useEffect(() => {
        if (data) {
            setValueFields(data.values)
        }
    }, [data])
    const handleChangeValue = (fieldId: string, value: any) => {
        setValueFields((prev: any) => ({
            ...prev,
            [fieldId]: value,
        }))
    }

    const mutation = useMutation({
        mutationFn: (data: any) => requestService.update(data),
        onSuccess: () => {
            toast.success("Request updated successfully!")
        },
    })

    const rootFields = data?.formTemplateId.fields.filter((f) => !f.parentId).sort((a, b) => (a.order || 0) - (b.order || 0))
    if (isLoading) {
        return <LoadingUI />
    }

    const handleUpdate = () => {
        // update base64 file
        const updatedValues = { ...valueFields }
        data?.formTemplateId.fields.forEach((field: any) => {
            if (field.type === "file" && valueFields[field.id] instanceof File) {
                convertBase64(valueFields[field.id]).then((base64: any) => {
                    updatedValues[field.id] = base64
                })
            }
        })

        const newForm = {
            _id: data?._id,
            formTemplateId: data?.formTemplateId._id,
            values: updatedValues,
        }

        mutation.mutate(newForm)
    }
    return (
        <div>
            <div>
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Form Preview</h2>
                    <Card className="shadow-md">
                        <CardContent className="">
                            <div className="space-y-5">
                                <h1 className="text-xl font-bold text-center">{data?.formTemplateId?.vieName}</h1>
                                {valueFields &&
                                    rootFields &&
                                    rootFields?.map((field) => {
                                        if (field.type === "container") {
                                            const childFields = data?.formTemplateId.fields.filter((f) => f.parentId === field.id).sort((a, b) => (a.order || 0) - (b.order || 0))
                                            return (
                                                <div key={field.id} className={`flex gap-4 ${field.layout?.direction === "row" ? "flex-row" : "flex-col"}`}>
                                                    {childFields &&
                                                        childFields.map((child) => (
                                                            <div key={child.id} className={field.layout?.direction === "row" ? "flex-1" : ""}>
                                                                <div className="space-y-1 mb-4">
                                                                    <Label>
                                                                        {child.label} {child.required && <span className="text-red-500">*</span>}
                                                                    </Label>
                                                                    {child.type === "text" && (
                                                                        <Input
                                                                            placeholder={child.placeholder}
                                                                            readOnly={child.readOnly}
                                                                            value={valueFields[child.id]}
                                                                            onChange={(e) => handleChangeValue(child.id, e.target.value)}
                                                                        />
                                                                    )}
                                                                    {child.type === "number" && (
                                                                        <Input
                                                                            type="number"
                                                                            placeholder={child.placeholder}
                                                                            readOnly={child.readOnly}
                                                                            value={valueFields[child.id]}
                                                                            onChange={(e) => handleChangeValue(child.id, e.target.value)}
                                                                        />
                                                                    )}
                                                                    {child.type === "textarea" && (
                                                                        <Textarea
                                                                            placeholder={child.placeholder}
                                                                            readOnly={child.readOnly}
                                                                            value={valueFields[child.id]}
                                                                            onChange={(e) => handleChangeValue(child.id, e.target.value)}
                                                                        />
                                                                    )}
                                                                    {child.type === "select" && (
                                                                        <CSelectOptions
                                                                            data={child.options || []}
                                                                            placeholder={child.placeholder}
                                                                            valueKey="value"
                                                                            readOnly={child.readOnly}
                                                                            value={valueFields[child.id]}
                                                                            onChange={(value) => handleChangeValue(child.id, value)}
                                                                        />
                                                                    )}
                                                                    {child.type === "date" && (
                                                                        <DatePicker
                                                                            className=""
                                                                            onChangeValue={(value) => handleChangeValue(child.id, value?.toISOString())}
                                                                            value={valueFields[child.id] || ""}
                                                                        />
                                                                    )}
                                                                    {child.type === "file" && (
                                                                        <div className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2">
                                                                            <input type="file" onChange={(e) => handleChangeValue(child.id, e.target.files?.[0])} hidden />
                                                                            <FileUpIcon />
                                                                            <p className="text-sm font-medium">File upload area</p>
                                                                        </div>
                                                                    )}
                                                                    {child.type === "checkbox" && (
                                                                        <div className="space-y-2">
                                                                            {(child.options || []).map((opt, i) => (
                                                                                <div key={i} className="flex items-center gap-2">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={`${child.id}_opt_${i}`}
                                                                                        name={child.id}
                                                                                        value={opt.value}
                                                                                        disabled={child.readOnly}
                                                                                        checked={valueFields[child.id]?.includes(opt.value)}
                                                                                        onChange={(e) => {
                                                                                            const values = valueFields[child.id] || []
                                                                                            if (e.target.checked) {
                                                                                                handleChangeValue(child.id, [...values, opt.value])
                                                                                            } else {
                                                                                                handleChangeValue(
                                                                                                    child.id,
                                                                                                    values.filter((v: any) => v !== opt.value),
                                                                                                )
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <label htmlFor={`${child.id}_opt_${i}`} className="text-sm text-neutral-500">
                                                                                        {opt.label}
                                                                                    </label>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    {child.type === "radio" && (
                                                                        <div className="space-y-2">
                                                                            {(child.options || []).map((opt, i) => (
                                                                                <div key={i} className="flex items-center gap-2">
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={`${child.id}_opt_${i}`}
                                                                                        name={child.id}
                                                                                        value={opt.value}
                                                                                        disabled={child.readOnly}
                                                                                        checked={valueFields[child.id] === opt.value}
                                                                                        onChange={(e) => {
                                                                                            if (e.target.checked) {
                                                                                                handleChangeValue(child.id, opt.value)
                                                                                            }
                                                                                        }}
                                                                                    />
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
                                                {field.type === "text" && (
                                                    <Input
                                                        placeholder={field.placeholder}
                                                        readOnly={field.readOnly}
                                                        onChange={(e) => handleChangeValue(field.id, e.target.value)}
                                                        value={valueFields[field.id] || ""}
                                                    />
                                                )}
                                                {field.type === "number" && (
                                                    <Input
                                                        type="number"
                                                        placeholder={field.placeholder}
                                                        readOnly={field.readOnly}
                                                        onChange={(e) => handleChangeValue(field.id, e.target.value)}
                                                        value={valueFields[field.id] || ""}
                                                    />
                                                )}
                                                {field.type === "select" && (
                                                    <CSelectOptions
                                                        data={field.options || []}
                                                        placeholder={field.placeholder}
                                                        valueKey="value"
                                                        readOnly={field.readOnly}
                                                        onChange={(value: any) => handleChangeValue(field.id, value)}
                                                    />
                                                )}
                                                {field.type === "radio" && (
                                                    <div className="space-y-2">
                                                        {(field.options || []).map((opt, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    id={`${field.id}_opt_${i}`}
                                                                    name={field.id}
                                                                    value={opt.value}
                                                                    disabled={field.readOnly}
                                                                    checked={valueFields[field.id] === opt.value}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            handleChangeValue(field.id, opt.value)
                                                                        }
                                                                    }}
                                                                />
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
                                                                <input
                                                                    type="checkbox"
                                                                    id={`${field.id}_opt_${i}`}
                                                                    name={field.id}
                                                                    value={opt.value}
                                                                    disabled={field.readOnly}
                                                                    checked={valueFields[field.id]?.includes(opt.value)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            handleChangeValue(field.id, [...(valueFields[field.id] || []), opt.value])
                                                                        } else {
                                                                            handleChangeValue(
                                                                                field.id,
                                                                                (valueFields[field.id] || []).filter((v: any) => v !== opt.value),
                                                                            )
                                                                        }
                                                                    }}
                                                                />
                                                                <label htmlFor={`${field.id}_opt_${i}`} className="text-sm text-neutral-500">
                                                                    {opt.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {field.type === "date" && <DatePicker className="" onChangeValue={(value) => handleChangeValue(field.id, value?.toISOString())} />}
                                                {field.type === "textarea" && (
                                                    <Textarea
                                                        className="h-32"
                                                        placeholder={field.placeholder}
                                                        readOnly={field.readOnly}
                                                        value={valueFields[field.id] || ""}
                                                        onChange={(e) => handleChangeValue(field.id, e.target.value)}
                                                    />
                                                )}
                                                {field.type === "file" && (
                                                    <label
                                                        htmlFor={`${field.id}_file`}
                                                        className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2"
                                                    >
                                                        <input id={`${field.id}_file`} type="file" onChange={(e) => handleChangeValue(field.id, e.target.files?.[0])} hidden />
                                                        <FileUpIcon />
                                                        <p className="text-sm font-medium">{valueFields[field.id]?.name || "No file chosen"}</p>
                                                    </label>
                                                )}
                                            </div>
                                        )
                                    })}
                                <div className="flex justify-between">
                                    <Button onClick={() => navigate(-1)} className="h-12" variant={"outline-primary"}>
                                        <ChevronLeft /> Quay về
                                    </Button>
                                    <Button className="h-12" onClick={handleUpdate}>
                                        Cập nhật thông tin
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
