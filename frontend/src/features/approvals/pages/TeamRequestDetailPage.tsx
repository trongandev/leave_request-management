import LoadingUI from "@/components/etc/LoadingUI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { handleDistanceDate } from "@/lib/utils"
import approvalService from "@/services/approvalService"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Calendar1, Check, Download, FileSpreadsheet, Gavel, Info, Loader2, Printer, Share2, X } from "lucide-react"
import { useLocation } from "react-router-dom"

export default function TeamRequestDetailPage() {
    const location = useLocation()
    const id = location.pathname.split("/").slice(-1)[0]
    const { data, isLoading } = useQuery({
        queryKey: ["approval-steps/pending-detail", id],
        queryFn: () => approvalService.getDetailPending(id),
    })
    console.log(data)
    const approvalStep = data?.appStep
    const lb = data?.lb
    const creatorId = approvalStep?.requestId?.creatorId
    const requestId = approvalStep?.requestId
    const timeline = [
        {
            title: "Request Submitted",
            status: "submitted",
            description: `By ${creatorId?.fullName}`,
            datetime: approvalStep?.createdAt || "",
        },
        {
            title: "Review Started",
            status: "pending",
            description: "System Auto-Assign",
            datetime: "waiting",
        },
    ]
    const colors: any = {
        submitted: "bg-blue-100 text-blue-500",
        pending: "bg-yellow-100 text-yellow-500",
        approved: "bg-green-100 text-green-500",
    }

    if (isLoading) {
        return <LoadingUI />
    }
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Request Details</h1>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                            Pending Approval
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Submitted on {approvalStep?.createdAt ? format(approvalStep.createdAt, "MMM dd, yyyy 'at' h:mm a") : "N/A"}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="h-12 w-28" variant={"outline"}>
                        <Printer /> Print
                    </Button>
                    <Button className="h-12 w-28" variant={"outline"}>
                        <Share2 /> Share
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-600 shadow-sm flex-shrink-0">
                                    <img alt="Employee Avatar" className="h-full w-full object-cover" src={creatorId?.avatar} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{creatorId?.fullName}</h2>
                                    <p className="text-sm text-primary font-medium">{creatorId?.positionId.fullName}</p>
                                    <div className="flex items-center gap-1 text-neutral-500 mt-1 text-xs tracking-widest">ID: {creatorId?.empId}</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between gap-5 pb-5 ">
                                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-1">Current Balance</p>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {lb?.totalDays ?? 0} <span className="text-sm font-medium text-slate-500">days</span>
                                    </div>
                                </div>
                                <div className="border-t  pt-5 flex gap-5 justify-between">
                                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-1">After Approval </p>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {lb?.totalDays !== undefined ? lb.totalDays - 1 : 0} <span className="text-sm font-medium text-slate-500">days</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="pb-5 px-1 border-b  flex justify-between items-center">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Request Information</h3>
                                <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Calendar1 size={18} /> {handleDistanceDate(requestId?.values?.startDate, requestId?.values?.endDate)} total
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">Leave Type</p>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                            <span className="text-slate-900 dark:text-white font-medium">Personal Leave</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">Date Range</p>
                                        <div className="text-slate-900 dark:text-white font-medium">
                                            {format(new Date(requestId?.values?.startDate), "MMM dd, yyyy")} - {format(new Date(requestId?.values?.endDate), "MMM dd, yyyy")} (
                                            {handleDistanceDate(requestId?.values?.startDate, requestId?.values?.endDate)})
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Reason</p>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-100 dark:border-slate-700 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                            {requestId?.values.reason || "No reason provided"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="pb-5 px-1 border-b ">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Attachments</h3>
                            </div>
                            {requestId?.values?.attachments ? (
                                <div className="p-6">
                                    <div className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer w-full sm:w-auto sm:inline-flex pr-6">
                                        <div className="h-10 w-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded flex items-center justify-center mr-3">
                                            <FileSpreadsheet size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0 mr-4">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">wedding_invite.pdf</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">2.4 MB</p>
                                        </div>
                                        <Download size={18} className="text-neutral-600" />
                                    </div>
                                </div>
                            ) : (
                                <div className="h-32 flex items-center justify-center text-xs text-neutral-500">No attachments available</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardContent>
                            <div className="pb-5 px-1 border-b">
                                <h3 className="font-semibold  flex items-center gap-2">
                                    <Gavel size={20} />
                                    Approval Action
                                </h3>
                            </div>
                            <div className="pt-5 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="comment">
                                        Manager's Comments <span className="text-slate-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <Textarea placeholder="Add a note explaining your decision..." className="h-32" />
                                        <div className="absolute bottom-2 right-2 text-xs text-slate-400">0/500</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="destructive" className="w-full">
                                        <X /> Reject
                                    </Button>
                                    <Button className="w-full">
                                        <Check /> Approve
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Request Timeline</h3>
                            {timeline.map((item, index) => (
                                <div key={index} className="relative pb-8">
                                    {index !== timeline.length - 1 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"></span>}

                                    <div className="relative flex space-x-3">
                                        <div className={`h-10 w-10 rounded-full ${colors[item.status]} flex items-center justify-center `}>
                                            {item.status === "submitted" ? <Check /> : <Loader2 className="animate-spin" />}
                                        </div>
                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                            <div>
                                                <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">{item.title}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                                            </div>
                                            <div className="whitespace-nowrap text-right text-xs text-slate-500 dark:text-slate-400">
                                                <time dateTime={item.datetime}>{item.datetime !== "waiting" ? format(item.datetime, "MMM dd") : "Waiting"}</time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center ">
                                <Info size={18} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-primary dark:text-primary-100 mb-1">Company Policy</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Personal leave requests exceeding 3 days require at least 1 week notice. This request meets the notice period criteria.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
