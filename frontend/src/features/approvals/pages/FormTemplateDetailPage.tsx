import CSelectOptions from "@/components/etc/CSelectOptions"
import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DatePicker from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import formTemplateService from "@/services/formTemplateService"
import type { Field } from "@/types/form-template"
import { useQuery } from "@tanstack/react-query"
import { FileUpIcon } from "lucide-react"
import { useLocation } from "react-router-dom"

export default function FormTemplateDetailPage() {
    const location = useLocation()
    const { data, isLoading } = useQuery({
        queryKey: ["form-template-detail" + location.pathname.split("/")[3]],
        queryFn: () => formTemplateService.getById(location.pathname.split("/")[3]),
    })
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
                            {data?.fields?.map((field: Field) => {
                                if (field.type === "container") {
                                    const childFields = data?.fields.filter((f: any) => f.parentId === field.id).sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                                    return (
                                        <div key={field.id} className={`flex gap-4 ${field.layout?.direction === "row" ? "flex-row" : "flex-col"}`}>
                                            {childFields.map((child: any) => (
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
                                                                {(child.options || []).map((opt: any, i: number) => (
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
            </div>
        </div>
    )
}
