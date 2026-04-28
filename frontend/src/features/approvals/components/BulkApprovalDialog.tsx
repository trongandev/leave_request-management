import * as React from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxValue, ComboboxEmpty, useComboboxAnchor } from "@/components/ui/combobox"
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Eye, Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { appConfig } from "@/config/appConfig"
import formTemplateService from "@/services/formTemplateService"

const logDebug = (...args: any[]) => {
    if (appConfig.debug) {
        console.log("[BulkApprovalDebug]", ...args)
    }
}

interface BulkApprovalDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    selectedCount: number
    onSubmit: (data: { reasons: string[]; manualReason: string }) => Promise<void | any> | void | any
}

export function BulkApprovalDialog({ isOpen, onOpenChange, selectedCount, onSubmit }: BulkApprovalDialogProps) {
    const { t, i18n } = useTranslation()
    const [selectedReasons, setSelectedReasons] = React.useState<string[]>([])
    const [manualReason, setManualReason] = React.useState("")
    const [reasonOptions, setReasonOptions] = React.useState<{ value: string; label: string }[]>([])
    const [phase, setPhase] = React.useState<"input" | "processing" | "result">("input")
    const [expandedSection, setExpandedSection] = React.useState<"ready" | "review" | null>(null)
    const [results, setResults] = React.useState<{
        ready: any[]
        needsReview: any[]
    }>({ ready: [], needsReview: [] })
    const anchor = useComboboxAnchor()

    React.useEffect(() => {
        if (isOpen) {
            formTemplateService.getReasons().then((data) => {
                const options = data.map((item: any) => ({
                    value: item.code,
                    label: i18n.language === 'vi' ? item.vieName : item.engName
                }))
                setReasonOptions(options)
            })
        }
    }, [isOpen, i18n.language])

    const handleSubmit = async () => {
        setPhase("processing")
        logDebug("Processing bulk approval with AI", { selectedReasons, manualReason, selectedCount })

        try {
            // Here we would call the real API
            // For now, we call the onSubmit prop which will handle the integration
            const result = await onSubmit({ reasons: selectedReasons, manualReason }) as any
            
            if (result && result.ready && result.needsReview) {
                setResults(result)
                setPhase("result")
            } else {
                // If no result returned from onSubmit yet (parent not updated), 
                // we stay in processing or show empty state
                setPhase("result")
            }
        } catch (error) {
            console.error("AI Analysis failed:", error)
            setPhase("input")
        }
    }

    const handleFinalApprove = () => {
        onSubmit({ reasons: selectedReasons, manualReason })
        onOpenChange(false)
        resetState()
    }

    const resetState = () => {
        setPhase("input")
        setSelectedReasons([])
        setManualReason("")
        setResults({ ready: [], needsReview: [] })
        setExpandedSection(null)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) resetState()
            onOpenChange(open)
        }}>
            <DialogContent className={`${phase === "result" ? "sm:max-w-[700px]" : "sm:max-w-[500px]"} transition-all duration-300 overflow-hidden flex flex-col max-h-[90vh]`}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {phase === "result" && <span className="material-icons text-primary">auto_awesome</span>}
                        {phase === "result" ? t("approvals.bulkApproval.resultTitle", "Kết quả phân tích AI") : t("approvals.bulkApproval.title", "Duyệt nhiều đơn tự động")}
                    </DialogTitle>
                    <DialogDescription>
                        {phase === "result" 
                            ? t("approvals.bulkApproval.resultDesc", "AI đã phân tích các đơn bạn chọn. Vui lòng xem xét kết quả bên dưới.") 
                            : t("approvals.bulkApproval.desc", "Hệ thống sẽ sử dụng AI để duyệt các đơn đã chọn dựa trên lý do được cung cấp.")}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto py-4 px-1">
                    {phase === "input" && (
                        <div className="grid gap-6">
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {t("approvals.bulkApproval.totalSelected", "Tổng số đơn hiện tại")}
                                    </span>
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCount}</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-icons text-primary text-2xl">description</span>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {t("approvals.bulkApproval.reasonLabel", "Lý do nghỉ")}
                                </Label>
                                <Combobox
                                    multiple
                                    autoHighlight
                                    items={reasonOptions.map((o) => o.value)}
                                    value={selectedReasons}
                                    onValueChange={(val) => setSelectedReasons(val as string[])}
                                >
                                    <ComboboxChips ref={anchor} className="min-h-12! cursor-text w-full bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
                                        <ComboboxValue>
                                            {(values: string[]) => (
                                                <React.Fragment>
                                                    {values.map((val) => {
                                                        const option = reasonOptions.find((opt) => opt.value === val)
                                                        return (
                                                            <ComboboxChip key={val}>
                                                                {option?.label || val}
                                                            </ComboboxChip>
                                                        )
                                                    })}
                                                    <ComboboxChipsInput placeholder={selectedReasons.length === 0 ? t("approvals.bulkApproval.reasonPlaceholder", "Chọn lý do...") : ""} />
                                                </React.Fragment>
                                            )}
                                        </ComboboxValue>
                                    </ComboboxChips>
                                    <ComboboxContent anchor={anchor}>
                                        <ComboboxEmpty>{t("common.noResults", "Không tìm thấy kết quả")}</ComboboxEmpty>
                                        <ComboboxList>
                                            {(value: string) => {
                                                const opt = reasonOptions.find((o) => o.value === value)
                                                return (
                                                    <ComboboxItem key={value} value={value}>
                                                        {opt?.label || value}
                                                    </ComboboxItem>
                                                )
                                            }}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {t("approvals.bulkApproval.manualReasonLabel", "Lý do khác (Nhập tay)")}
                                </Label>
                                <Textarea
                                    placeholder={t("approvals.bulkApproval.manualReasonPlaceholder", "Nhập lý do...")}
                                    value={manualReason}
                                    onChange={(e) => setManualReason(e.target.value)}
                                    className="min-h-[120px] resize-none bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
                                />
                            </div>
                        </div>
                    )}

                    {phase === "processing" && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="material-icons text-primary animate-pulse">auto_awesome</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Đang phân tích bằng AI...</h3>
                                <p className="text-sm text-slate-500 max-w-[280px] mx-auto mt-2">
                                    Hệ thống đang đối soát dữ liệu và kiểm tra các chính sách nghỉ phép của công ty.
                                </p>
                            </div>
                        </div>
                    )}

                    {phase === "result" && (
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20 dark:border-emerald-800 flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200 border-emerald-200">Duyệt ngay</Badge>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{results.ready.length}</span>
                                        <p className="text-xs font-medium text-emerald-600/80 uppercase">Đơn hợp lệ</p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => setExpandedSection(expandedSection === "ready" ? null : "ready")}
                                        className="mt-3 w-full justify-between h-8 text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-800"
                                    >
                                        <span className="text-xs font-bold">Xem chi tiết</span>
                                        {expandedSection === "ready" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </Button>
                                </div>

                                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-900/20 dark:border-amber-800 flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <AlertCircle className="w-5 h-5 text-amber-600" />
                                        <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-200 border-amber-200">Cần xem xét</Badge>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-3xl font-black text-amber-700 dark:text-amber-400">{results.needsReview.length}</span>
                                        <p className="text-xs font-medium text-amber-600/80 uppercase">Đơn nghi vấn</p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => setExpandedSection(expandedSection === "review" ? null : "review")}
                                        className="mt-3 w-full justify-between h-8 text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800"
                                    >
                                        <span className="text-xs font-bold">Xem chi tiết</span>
                                        {expandedSection === "review" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>

                            {expandedSection === "ready" && (
                                <div className="border rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 border-b flex items-center justify-between">
                                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase">Danh sách đơn hợp lệ</span>
                                        <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">{results.ready.length}</span>
                                    </div>
                                    <ScrollArea className="h-[250px]">
                                        <div className="divide-y">
                                            {results.ready.map((req) => (
                                                <div key={req.id} className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{req.employee}</span>
                                                        <span className="text-[10px] text-slate-500 uppercase font-medium">{req.id} • {req.type} • {req.days} ngày</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-1 rounded">
                                                            <Check className="w-3 h-3" />
                                                            {req.confidence}% AI
                                                        </div>
                                                        <Button size="icon-xs" variant="ghost" className="text-slate-400"><Eye className="w-4 h-4" /></Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}

                            {expandedSection === "review" && (
                                <div className="border rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="bg-amber-50 dark:bg-amber-900/30 px-4 py-2 border-b flex items-center justify-between">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase">Danh sách đơn cần xem xét</span>
                                        <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full">{results.needsReview.length}</span>
                                    </div>
                                    <ScrollArea className="h-[250px]">
                                        <div className="divide-y">
                                            {results.needsReview.map((req) => (
                                                <div key={req.id} className="p-4 flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{req.employee}</span>
                                                            <span className="text-[10px] text-slate-500 uppercase font-medium">{req.id} • {req.type}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button size="xs" variant="outline" className="h-7 text-[10px] border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                                                                <Check className="w-3 h-3 mr-1" /> Chấp nhận
                                                            </Button>
                                                            <Button size="xs" variant="outline" className="h-7 text-[10px] border-rose-200 text-rose-600 hover:bg-rose-50">
                                                                <X className="w-3 h-3 mr-1" /> Từ chối
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded border border-amber-200/50 flex items-start gap-2">
                                                        <AlertCircle className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                                                        <span className="text-[10px] text-amber-800 dark:text-amber-300 leading-tight">
                                                            <span className="font-bold">Gợi ý AI:</span> {req.reason}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter className="border-t pt-4 bg-slate-50/50 dark:bg-slate-900/50 px-6 pb-6">
                    {phase === "input" ? (
                        <>
                            <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-slate-500">
                                {t("approvals.bulkApproval.cancelBtn", "Hủy")}
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="bg-primary hover:bg-primary-dark shadow-md shadow-primary/20"
                            >
                                <span className="material-icons text-sm mr-2">auto_awesome</span>
                                {t("approvals.bulkApproval.submitBtn", "Xác nhận duyệt bằng AI")}
                            </Button>
                        </>
                    ) : phase === "result" ? (
                        <>
                            <Button variant="outline" onClick={() => setPhase("input")} className="text-slate-500 border-slate-200">
                                Quay lại
                            </Button>
                            <Button
                                onClick={handleFinalApprove}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Phê duyệt tất cả đơn hợp lệ ({results.ready.length})
                            </Button>
                        </>
                    ) : null}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
