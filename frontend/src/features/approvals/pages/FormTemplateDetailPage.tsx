import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { convertBase64 } from "@/lib/utils"
import formTemplateService from "@/services/formTemplateService"
import requestService from "@/services/requestService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import FormPreviewFieldWithValue from "../components/FormPreviewFieldWithValue"

export default function FormTemplateDetailPage() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const isView = searchParams.get("is_view") === "true"
    const navigate = useNavigate()
    const [stateValueData, setStateValueData] = useState<{ [key: string]: any }>({})
    const id = location.pathname.split("/")[3]
    console.log(id)
    const { data, isLoading } = useQuery({
        queryKey: ["form-template-detail" + id],
        queryFn: () => formTemplateService.getById(id),
    })

    const mutation = useMutation({
        mutationFn: (data: any) => requestService.create(data),
        onSuccess: () => {
            toast.success("Request submitted successfully!")
            navigate("/employee/my-request-history-list")
        },
    })

    const handleChangeValue = (fieldName: string, value: any) => {
        setStateValueData((prev) => ({
            ...prev,
            [fieldName]: value,
        }))
    }

    const rootFields = data?.fields.filter((f) => !f.parentId).sort((a, b) => (a.order || 0) - (b.order || 0))

    const handleSubmit = async () => {
        const submitData = Object.entries(stateValueData).reduce((acc, [key, value]) => {
            const field = data?.fields.find((f) => f.name === key)
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
        const newFormData = {
            title: data?.vieName || "Untitled Form",
            formTemplateId: data?._id || "",
            values: submitData,
            code: data?.code || "",
        }
        mutation.mutate(newFormData)
        console.log(newFormData)
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
                            {rootFields?.map((field) => {
                                if (field.type === "container") {
                                    const childFields = data?.fields.filter((f) => f.parentId === field.id).sort((a, b) => (a.order || 0) - (b.order || 0))
                                    return (
                                        <div key={field.id} className={`flex gap-4 ${field.layout?.direction === "row" ? "flex-row" : "flex-col"}`}>
                                            {childFields?.map((child) => (
                                                <FormPreviewFieldWithValue key={child.id} child={child} field={field} stateValueData={stateValueData} handleChangeValue={handleChangeValue} />
                                            ))}
                                        </div>
                                    )
                                }

                                return <FormPreviewFieldWithValue child={field} stateValueData={stateValueData} handleChangeValue={handleChangeValue} />
                            })}
                            <div className="text-right">
                                <Button className="w-32 h-12" onClick={handleSubmit} disabled={isView}>
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
