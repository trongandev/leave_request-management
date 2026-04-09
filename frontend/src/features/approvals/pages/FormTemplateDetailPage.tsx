import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import axiosInstance from "@/api/axiosInstance"
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
    const { data: leaveBalance } = useQuery({
        queryKey: ["leave-balance/mine"],
        queryFn: async () => {
            const response = await axiosInstance.get("/leave-balances/profile")
            return response.data.data
        },
    })

    const parseDate = (value: unknown) => {
        if (!value) {
            return null
        }

        const date = new Date(value as string)
        return Number.isNaN(date.getTime()) ? null : date
    }

    const calculateTotalDays = (startValue: unknown, endValue: unknown) => {
        const startDate = parseDate(startValue)
        const endDate = parseDate(endValue)

        if (!startDate || !endDate) {
            return null
        }

        if (endDate.getTime() < startDate.getTime()) {
            return null
        }

        const diff = endDate.getTime() - startDate.getTime()
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1
    }

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

    const liveTotalDays = calculateTotalDays(stateValueData.startDate, stateValueData.endDate)
    const liveStartDate = parseDate(stateValueData.startDate)
    const liveBalanceYear = liveStartDate?.getFullYear()
    const remainingDays = Number(leaveBalance?.remainingDays ?? 0)
    const hasBalanceMatch =
        typeof liveTotalDays === "number" &&
        leaveBalance &&
        typeof liveBalanceYear === "number" &&
        leaveBalance.year === liveBalanceYear
    const exceedsBalance = hasBalanceMatch && liveTotalDays > remainingDays

    const handleSubmit = async () => {
        const totalDays = calculateTotalDays(stateValueData.startDate, stateValueData.endDate)

        if (stateValueData.startDate && stateValueData.endDate && totalDays === null) {
            toast.error("Ngày bắt đầu/kết thúc không hợp lệ")
            return
        }

        if (typeof totalDays === "number" && leaveBalance && liveBalanceYear && leaveBalance.year === liveBalanceYear) {
            if (totalDays > remainingDays) {
                toast.error(`Số ngày nghỉ (${totalDays}) vượt quá số dư còn lại (${remainingDays}).`)
                return
            }
        }

        const submitEntries = await Promise.all(
            Object.entries(stateValueData).map(async ([key, value]) => {
                const field = data?.fields.find((f) => f.name === key)
                if (field?.type === "file" && value instanceof File) {
                    return [key, await convertBase64(value)] as const
                }

                return [key, value] as const
            }),
        )

        const submitData = Object.fromEntries(submitEntries)

        if (typeof totalDays === "number") {
            submitData.totalDays = totalDays
        }

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
                            {typeof liveTotalDays === "number" && leaveBalance && typeof liveBalanceYear === "number" && leaveBalance.year === liveBalanceYear && (
                                <div className={`rounded-lg border px-4 py-3 text-sm ${exceedsBalance ? "border-red-300 bg-red-50 text-red-700" : "border-green-300 bg-green-50 text-green-700"}`}>
                                    {exceedsBalance
                                        ? `Tổng ngày nghỉ ${liveTotalDays} vượt quá số dư còn lại ${remainingDays}.`
                                        : `Tổng ngày nghỉ ${liveTotalDays} nằm trong số dư còn lại ${remainingDays}.`}
                                </div>
                            )}
                            <div className="text-right">
                                <Button className="w-32 h-12" onClick={handleSubmit} disabled={isView || exceedsBalance}>
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
