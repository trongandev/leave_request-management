/* eslint-disable react-hooks/set-state-in-effect */
import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import approvalService from "@/services/approvalService"

import type { User } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { format, formatDistance } from "date-fns"
import { Calendar, CircleCheck, Download, FileSpreadsheet, FileText, Headset, Loader2Icon, PhoneCall } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ViewDetailRequestPage() {
    const { i18n } = useTranslation()
    const location = useLocation()
    const id = location.pathname.split("/")[3]
    const { data, isLoading } = useQuery({
        queryKey: ["approval-step/request", id],
        queryFn: () => approvalService.getById(id),
    })
    console.log(data)
    const valueRequest: any = data?.requestId?.values || ({} as any)
    const formTemplate = data?.requestId?.formTemplateId
    const creatorId: User = data?.requestId?.creatorId || ({} as User)
    const originalApprover: User = data?.originalApproverId || ({} as User)
    if (isLoading) {
        return <LoadingUI />
    }

    const handleDistanceDate = (start: string, end: string) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        return formatDistance(startDate, endDate)
    }

    return (
        <div className="space-y-5">
            <Card>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase    px-2 py-1 rounded">REQUEST ID</span>
                                <h2 className="text-lg font-bold text-primary tracking-tight">#{data?.apsDisplayId}</h2>
                            </div>
                            <h1 className="text-3xl font-bold  mb-2">{formTemplate?.engName}</h1>
                            <p className=" text-sm font-medium flex items-center gap-2">
                                <Calendar size={16} />
                                {format(new Date(valueRequest?.startDate), "MMM dd, yyyy")} - {format(new Date(valueRequest?.endDate), "MMM dd, yyyy")} (
                                {handleDistanceDate(valueRequest?.startDate, valueRequest?.endDate)})
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase  ">CURRENT STATUS</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`w-2 h-2 rounded-full ${data?.status === "approved" ? "bg-green-500" : data?.status === "rejected" ? "bg-red-500" : "bg-yellow-500"}  relative`}>
                                        <span
                                            className={`absolute inset-0 rounded-full animate-ping ${data?.status === "approved" ? "bg-green-500" : data?.status === "rejected" ? "bg-red-500" : "bg-yellow-500"}`}
                                        ></span>
                                    </span>
                                    <span className={`font-bold ${data?.status === "approved" ? "text-green-500" : data?.status === "rejected" ? "text-red-500" : "text-yellow-500"} uppercase`}>
                                        {data?.status}
                                    </span>
                                </div>
                            </div>
                            <Button variant={"outline-primary"} className="h-12">
                                View Details
                            </Button>
                            <Button className="h-12">Take Action</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col lg:flex-row gap-5 items-start">
                <Card className="flex-1">
                    <CardContent>
                        <div className="mb-10">
                            <h3 className="text-sm font-bold uppercase   mb-2">Approval Lifecycle</h3>
                            <p className="text-xs ">Detailed audit trail and workflow progression.</p>
                        </div>
                        <div className="space-y-0">
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600  z-10">
                                        <CircleCheck />
                                    </div>
                                </div>
                                <div className="pb-10">
                                    <p className="text-[11px] font-bold text-neutral-500  uppercase  mb-1">{format(data?.requestId?.createdAt || new Date(), "MMM dd, yyyy • hh:mm a")}</p>
                                    <h4 className="text-lg font-bold  mb-1">Register Request</h4>
                                    <div className="flex items-center gap-2">
                                        <img
                                            alt="User"
                                            className="w-6 h-6 rounded-full"
                                            data-alt="Portrait of HUA NGUYEN PHUC, a focused Asian professional in a light grey business shirt."
                                            src={creatorId?.avatar}
                                        />
                                        <span className="text-sm font-medium ">
                                            {creatorId.fullName} /{" "}
                                            <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded ">{i18n.language === 'en' ? (creatorId.positionId?.originName || creatorId.positionId?.name) : (creatorId.positionId?.name || creatorId.positionId?.originName) || "Position not specified"}</span>
                                        </span>
                                    </div>
                                    <div className="mt-3 bg-surface-container-low px-4 py-2 rounded-lg inline-block border border-outline/20">
                                        <p className="text-xs  italic">{valueRequest?.reason || "No reason provided."}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500  z-10">
                                        <Loader2Icon className="animate-spin" />
                                    </div>
                                </div>
                                <div className="pb-10 pt-1">
                                    <p className="text-[11px] font-bold text-neutral-500 uppercase  mb-1">In Progress</p>
                                    <h4 className="text-lg font-bold  mb-1">Dept {i18n.language === 'en' ? (originalApprover?.departmentId?.originName || originalApprover?.departmentId?.name) : (originalApprover?.departmentId?.name || originalApprover?.departmentId?.originName) || "Department not specified"}</h4>
                                    <div className="flex items-center gap-2">
                                        <img
                                            alt="Manager"
                                            className="w-6 h-6 rounded-full"
                                            data-alt="Portrait of Sarah Miller, a senior manager with professional demeanor and warm lighting."
                                            src={originalApprover?.avatar}
                                        />
                                        <Link to={`/profile/${originalApprover._id}`} className="text-sm font-medium hover:underline">
                                            {originalApprover?.fullName || "Manager"} /{" "}
                                            <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded ">{i18n.language === 'en' ? (originalApprover?.positionId?.originName || originalApprover?.positionId?.name) : (originalApprover?.positionId?.name || originalApprover?.positionId?.originName) || "Position not specified"}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 border-2 border-blue-700 z-10 shadow-[0_0_15px_rgba(0,82,204,0.3)]">
                                        <span className="material-symbols-outlined text-xl" data-icon="pending">
                                            pending
                                        </span>
                                    </div>
                                    <div className="w-0.5 h-20 timeline-line-dashed"></div>
                                </div>
                                <div className="pb-10 pt-1">
                                    <p className="text-[11px] font-bold text-blue-700 uppercase  mb-1">In Progress (Expected by June 04)</p>
                                    <h4 className="text-lg font-bold  mb-1">HR Compliance</h4>
                                    <div className="flex items-center gap-2">
                                        <img
                                            alt="HR"
                                            className="w-6 h-6 rounded-full"
                                            data-alt="Portrait of Robert Chen, HR Compliance officer, friendly and professional."
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsU9oh8wXGGpo6T71RvNaZjEzPzDXszCxc7ye8IOrpnVl4pjaGnu9cpVp3qGzYN_em0Y9-kyVbP8K2EPx9EduUQ0ujcZthsvcHPmI1HXQiX_-b5UdWnfPbX9qcqn3BIB3mGsLb12S9juutlfKpAfesTw0XtDCrJ3qLm6_SqoAhjw_zr3FmRQ3alRle1uYGLYCyW_mzN_VyedF0HJ5av50-qMQB2d2363KtaPgfifzK9IZzfDMbbsL2LNA5ZibC8WdB7eVvAcOFOh4"
                                        />
                                        <span className="text-sm font-medium ">
                                            ROBERT CHEN / <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded ">Global HR</span>
                                        </span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]" data-icon="forward_to_inbox">
                                                forward_to_inbox
                                            </span>{" "}
                                            Send Reminder
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full  flex items-center justify-center text-slate-400 border-2 border-slate-300 z-10">
                                        <span className="material-symbols-outlined text-xl" data-icon="lock">
                                            lock
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase  mb-1">Scheduled Step</p>
                                    <h4 className="text-lg font-bold text-slate-400 mb-1">Executive Final Sign-off</h4>
                                    <div className="flex items-center gap-2 opacity-50">
                                        <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                                        <span className="text-sm font-medium text-slate-400">
                                            TBD / <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">Board Admin</span>
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </CardContent>
                </Card>

                <aside className="space-y-5 w-100">
                    <Card>
                        <CardContent>
                            <h3 className="text-xs font-bold uppercase   mb-6 flex items-center justify-between">
                                Request Details
                                <span className="material-symbols-outlined text-lg" data-icon="info">
                                    info
                                </span>
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-outline/10">
                                    <span className="text-xs  font-medium">Policy</span>
                                    <span className="text-xs font-bold ">{formTemplate?.engName}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-outline/10">
                                    <span className="text-xs  font-medium">Remaining Bal.</span>
                                    <span className="text-xs font-bold ">{formTemplate?.maxDays} days</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-outline/10">
                                    <span className="text-xs  font-medium">Auto Approval</span>
                                    <span className="text-xs font-bold ">{formTemplate?.autoApprove ? "Yes" : "No"}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-outline/10">
                                    <span className="text-xs  font-medium">Require Attachment</span>
                                    <span className="text-xs font-bold ">{formTemplate?.requireAttachment ? "Yes" : "No"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className="text-xs font-bold uppercase   mb-6">Attached Files</h3>
                            {formTemplate?.requireAttachment ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg group hover: transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center text-red-600">
                                                <FileSpreadsheet size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-xs font-bold  truncate">Handover_Plan.pdf</p>
                                                <p className="text-[10px] ">1.2 MB</p>
                                            </div>
                                        </div>
                                        <Button variant={"ghost"}>
                                            <Download />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg group hover: transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                                                <FileText size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-xs font-bold  truncate">Flight_Itinerary.doc</p>
                                                <p className="text-[10px] ">45 KB</p>
                                            </div>
                                        </div>
                                        <Button variant={"ghost"}>
                                            <Download />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-32 flex items-center justify-center text-xs text-neutral-500">No attached files.</div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="relative  overflow-hidden">
                        <CardContent className="">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 dark:bg-white/30 rounded-full blur-3xl"></div>
                            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/20 dark:bg-white/30 rounded-full blur-3xl"></div>
                            <div className="flex gap-5">
                                <div className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center rounded-md">
                                    <Headset />
                                </div>
                                <div className="flex-1 mb-6">
                                    <h4 className="text-lg font-bold mb-1">Need assistance?</h4>
                                    <p className="text-xs  leading-relaxed ">Our HR support team is available 24/7 for urgent approval inquiries and policy clarifications.</p>
                                </div>
                            </div>
                            <Button className="h-12 w-full">
                                <PhoneCall /> Contact Support
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    )
}
