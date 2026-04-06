import LoadingUI from "@/components/etc/LoadingUI"
import formTemplateService from "@/services/formTemplateService"
import { useQuery } from "@tanstack/react-query"
import { ChevronRight, FileTextIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function CreateNewRequestFormPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["form-template"],
        queryFn: () => formTemplateService.getAll({}),
    })
    if (isLoading) {
        return <LoadingUI />
    }

    return (
        <div className="p-10 flex-1 bg-surface">
            <div className="mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tight text-on-surface mb-2">Form Templates</h2>
                <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed">
                    Select a blueprint to begin drafting your institutional documents. Each template is architecturally structured for global compliance.
                </p>
                <section className="relative mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 space-y-30">
                        {data &&
                            data?.data?.map((form) => (
                                <Link to={`/approvals/form-manager/${form._id}`} key={form._id} className="relative group cursor-pointer">
                                    <div className="relative transition-all duration-300 group-hover:-translate-y-4">
                                        <div className="w-1/2 h-6 bg-blue-700/10 folder-tab ml-2"></div>
                                        <div className="bg-card h-64 shadow-xl flex flex-col border ">
                                            <div className="p-6 flex-1">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                                    <FileTextIcon />
                                                </div>
                                                <h3 className="text-lg font-bold text-foreground mb-1">{form.code}</h3>
                                                <p className="text-xs font-semibold text-blue-700 tracking-wider uppercase mb-4">{form.vieName}</p>
                                                <div className="space-y-2 opacity-40">
                                                    <div className="h-1.5 w-full bg-slate-200 rounded-full"></div>
                                                    <div className="h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="p-4 border-t bg-gray-50 dark:bg-neutral-700 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{form.code}</span>
                                                <ChevronRight className="text-gray-500" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        {data?.data?.length == 0 && (
                            <div className="h-100 col-span-full">
                                <div className="flex items-center justify-center text-gray-600 h-full">No data available...</div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <div className="mt-24 p-8 bg-surface-container-low rounded-2xl flex items-center justify-between border border-outline-variant/10">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-700"></span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Time Off</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Medical</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Payroll Impact</span>
                    </div>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">All templates are verified for Decree No. 145/2020/ND-CP compliance.</p>
            </div>
        </div>
    )
}
