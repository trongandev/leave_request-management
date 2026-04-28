import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotiApprovalRequest({ open, onOpenChange, data }: { open: boolean; onOpenChange: (open: boolean) => void; data: any }) {
    const navigate = useNavigate();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="bg-surface-container-low rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-4">
                        <img
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                            data-alt="professional corporate headshot of Sarah Jenkins, a friendly young woman with a warm smile, neutral professional background"
                            src={data?.avatar}
                        />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Nhân viên</p>
                            <p className="text-base font-semibold text-on-surface">{data?.title || "Sarah Jenkins"}</p>
                        </div>
                    </div>
                    <div className="h-[1px] bg-outline-variant/20"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border rounded-lg p-3 flex items-start flex-col gap-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Loại đơn</p>
                            <p className="text-sm font-medium text-on-surface">Nghỉ phép năm</p>
                        </div>
                        <div className="bg-white border rounded-lg p-3 flex items-start flex-col gap-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Thời gian</p>
                            {data?.values?.startDate && (
                                <p className="text-sm font-medium text-on-surface">
                                    {format(data?.values?.startDate, "dd/MM")} - {format(data?.values?.endDate, "dd/MM")} ({data?.values?.totalDays} ngày)
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Button
                        className="h-12 w-full flex-1  "
                        onClick={() => {
                            navigate(data?.link || "#");
                            onOpenChange(false);
                        }}>
                        Duyệt ngay <CheckCircle />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12 w-full flex-1"
                        onClick={() => {
                            navigate(data?.link || "#");
                            onOpenChange(false);
                        }}>
                        Xem chi tiết
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
