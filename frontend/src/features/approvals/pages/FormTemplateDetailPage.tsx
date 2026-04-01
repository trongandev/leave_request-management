import CSelectOptions from "@/components/etc/CSelectOptions"
import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DatePicker from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { convertBase64 } from "@/lib/utils"
import formTemplateService from "@/services/formTemplateService"
import { useQuery } from "@tanstack/react-query"
import { FileUpIcon } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"

export default function FormTemplateDetailPage() {
    const location = useLocation()
    const [stateValueData, setStateValueData] = useState<{ [key: string]: any }>({})
    const { data, isLoading } = useQuery({
        queryKey: ["form-template-detail" + location.pathname.split("/")[3]],
        queryFn: () => formTemplateService.getById(location.pathname.split("/")[3]),
    })

    const handleChangeValue = (fieldId: string, value: any) => {
        setStateValueData((prev) => ({
            ...prev,
            [fieldId]: value,
        }))
    }

    const rootFields = data?.fields.filter((f) => !f.parentId).sort((a, b) => (a.order || 0) - (b.order || 0))

    const handleSubmit = () => {
        const submitData = Object.entries(stateValueData).reduce((acc, [key, value]) => {
            const field = data?.fields.find((f) => f.id === key)
            if (field?.type === "file" && value instanceof File) {
                return {
                    ...acc,
                    [key]: convertBase64(value),
                }
            }
            return {
                ...acc,
                [key]: value,
            }
        }, {})
        console.log(submitData)
    }
    if (isLoading) {
        return <LoadingUI />
    }
    return (
        <div>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Form Preview</h2>
                <Card className="shadow-md">
                    <CardContent className="">
                        <div className="space-y-5">
                            <h1 className="text-xl font-bold text-center">{data?.vieName}</h1>
                            {rootFields &&
                                rootFields.map((field) => {
                                    if (field.type === "container") {
                                        const childFields = data?.fields.filter((f) => f.parentId === field.id).sort((a, b) => (a.order || 0) - (b.order || 0))
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
                                                                        value={stateValueData[child.id]}
                                                                        onChange={(e) => handleChangeValue(child.id, e.target.value)}
                                                                    />
                                                                )}
                                                                {child.type === "number" && (
                                                                    <Input
                                                                        type="number"
                                                                        placeholder={child.placeholder}
                                                                        readOnly={child.readOnly}
                                                                        value={stateValueData[child.id]}
                                                                        onChange={(e) => handleChangeValue(child.id, e.target.value)}
                                                                    />
                                                                )}
                                                                {child.type === "textarea" && (
                                                                    <Textarea
                                                                        placeholder={child.placeholder}
                                                                        readOnly={child.readOnly}
                                                                        value={stateValueData[child.id]}
                                                                        onChange={(e) => handleChangeValue(child.id, e.target.value)}
                                                                    />
                                                                )}
                                                                {child.type === "select" && (
                                                                    <CSelectOptions
                                                                        data={child.options || []}
                                                                        placeholder={child.placeholder}
                                                                        valueKey="value"
                                                                        readOnly={child.readOnly}
                                                                        value={stateValueData[child.id]}
                                                                        onChange={(value) => handleChangeValue(child.id, value)}
                                                                    />
                                                                )}
                                                                {child.type === "date" && <DatePicker className="" onChangeValue={(value) => handleChangeValue(child.id, value?.toISOString())} />}
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
                                                                                    checked={stateValueData[child.id]?.includes(opt.value)}
                                                                                    onChange={(e) => {
                                                                                        const values = stateValueData[child.id] || []
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
                                                                                    checked={stateValueData[child.id] === opt.value}
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
                                            {field.type === "text" && <Input placeholder={field.placeholder} readOnly={field.readOnly} onChange={(e) => handleChangeValue(field.id, e.target.value)} />}
                                            {field.type === "number" && (
                                                <Input type="number" placeholder={field.placeholder} readOnly={field.readOnly} onChange={(e) => handleChangeValue(field.id, e.target.value)} />
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
                                                                checked={stateValueData[field.id] === opt.value}
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
                                                                checked={stateValueData[field.id]?.includes(opt.value)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        handleChangeValue(field.id, [...(stateValueData[field.id] || []), opt.value])
                                                                    } else {
                                                                        handleChangeValue(
                                                                            field.id,
                                                                            (stateValueData[field.id] || []).filter((v: any) => v !== opt.value),
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
                                                <Textarea className="h-32" placeholder={field.placeholder} readOnly={field.readOnly} onChange={(e) => handleChangeValue(field.id, e.target.value)} />
                                            )}
                                            {field.type === "file" && (
                                                <label
                                                    htmlFor={`${field.id}_file`}
                                                    className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2"
                                                >
                                                    <input id={`${field.id}_file`} type="file" onChange={(e) => handleChangeValue(field.id, e.target.files?.[0])} hidden />
                                                    <FileUpIcon />
                                                    <p className="text-sm font-medium">{stateValueData[field.id]?.name || "No file chosen"}</p>
                                                </label>
                                            )}
                                        </div>
                                    )
                                })}
                            <div className="text-right">
                                <Button className="w-32 h-12" onClick={handleSubmit}>
                                    {data?.submitButtonText || "Gửi"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
