import CAvatarProfile from "@/components/etc/CAvatarProfile";
import CRenderStatus from "@/components/etc/CRenderStatus";
import CTable from "@/components/etc/CTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import approvalService from "@/services/approvalService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance";

type BatchReviewItem = {
    _id: string;
    creatorName: string;
    creatorId: string;
    reason: string;
    startDate: string;
    endDate: string;
};

export default function TeamRequests() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"matching" | "notMatching">("matching");
    const [dataMatching, setDataMatching] = useState<BatchReviewItem[]>([]);
    const [dataNotMatching, setDataNotMatching] = useState<BatchReviewItem[]>([]);
    const [allData, setAllData] = useState<any[]>([]);
    const [inputFilter, setInputFilter] = useState("");
    const [rejectingId, setRejectingId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [isRejectLoading, setIsRejectLoading] = useState(false);
    const [isApproveLoading, setIsApproveLoading] = useState<string | null>(null);
    const { data, isLoading: isQueryLoading } = useQuery({
        queryKey: ["approval-steps/pending", page, searchTerm],
        queryFn: () => approvalService.getPending({ page, limit: 10 }),
    });
    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const columns = ["EMPLOYEE", "REQUEST TYPE", "DATE RANGE", "REQUESTED ON", "STATUS", "ACTIONS"];

    const handleShowBatchApproveDialog = async () => {
        setIsShow(true);

        const reasonGroups = {
            // Sức khỏe khẩn cấp
            emergencyHealth: ["Bị bệnh", "Ốm đột xuất", "Sốt cao", "Đau đầu nặng", "Nhập viện"],

            // Tang chế
            bereavement: ["Gia đình có đám tang", "Ba mất", "Mẹ mất", "Ông mất", "Bà mất", "Người thân qua đời"],

            // Sự cố bất ngờ
            unexpectedIncident: ["Tai nạn giao thông", "Hỏa hoạn", "Thiên tai", "Ngập lụt", "Việc khẩn cấp"],

            // Gia đình
            family: ["Con bị ốm", "Chăm sóc người thân nhập viện", "Việc gấp gia đình"],
        };

        const reasonRule = Object.values(reasonGroups).flat();
        const matching: BatchReviewItem[] = [];
        const notMatching: BatchReviewItem[] = [];
        if (allData.length === 0) {
            const newAllData: any = await axiosInstance.get(`/approval-steps/my-pending?limit=1000`);
            console.log(newAllData);
            setAllData(newAllData.data.data.data);
        }
        allData.forEach((item: any) => {
            // kiểm tra xem reason có chứa bất kỳ từ khóa nào trong reasonRule không
            const reason = item.requestId?.values.reason || "";
            const normalizedReason = String(reason).toLowerCase();
            const isMatch = reasonRule.some((keyword) => normalizedReason.includes(keyword.toLowerCase()));
            const matchResult = {
                _id: item._id,
                creatorName: item.requestId?.creatorId.fullName,
                creatorId: item.requestId?.creatorId._id,
                reason: item.requestId?.values.reason || "Không có lý do",
                startDate: item.requestId?.values.startDate,
                endDate: item.requestId?.values.endDate,
            };
            if (!isMatch) {
                notMatching.push(matchResult);
            } else {
                matching.push(matchResult);
            }
        });

        setDataMatching(matching);
        setDataNotMatching(notMatching);
        setActiveTab("matching");
    };

    const handleApprovalAll = async () => {
        if (dataMatching.length === 0) {
            toast.error("Không có đơn nào để duyệt");
            return;
        }

        setIsLoading(true);
        try {
            const idsToApprove = dataMatching.map((item) => item._id);
            await approvalService.batchHumanApprove(idsToApprove);
            setIsShow(false);
            toast.success(`Đã duyệt hết đơn`);
            // Refresh the table data
            window.location.reload();
        } catch (error: any) {
            console.error("Lỗi khi duyệt đơn:", error);
            toast.error(error?.response?.data?.message || "Có lỗi khi duyệt đơn");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReviewAll = async () => {
        if (dataNotMatching.length === 0) {
            toast.error("Không có đơn nào cần cân nhắc");
            return;
        }

        toast.info(`${dataNotMatching.length} đơn cần được xem xét kỹ. Vui lòng kiểm tra từng đơn chi tiết.`);
    };

    const handleApproveItem = async (itemId: string) => {
        setIsApproveLoading(itemId);
        try {
            await approvalService.approve(itemId, { comment: "" });
            toast.success("Đã duyệt đơn");
            setDataNotMatching((prev) => prev.filter((item) => item._id !== itemId));
        } catch (error: any) {
            console.error("Lỗi khi duyệt đơn:", error);
            toast.error(error?.response?.data?.message || "Có lỗi khi duyệt đơn");
        } finally {
            setIsApproveLoading(null);
        }
    };

    const handleRejectClick = (itemId: string) => {
        setRejectingId(itemId);
        setRejectReason("");
    };

    const handleRejectSubmit = async () => {
        if (!rejectReason.trim()) {
            toast.error("Vui lòng nhập lý do từ chối");
            return;
        }

        if (!rejectingId) return;

        setIsRejectLoading(true);
        try {
            await approvalService.reject(rejectingId, { comment: rejectReason });
            toast.success("Đã từ chối đơn");
            setDataNotMatching((prev) => prev.filter((item) => item._id !== rejectingId));
            setRejectingId(null);
            setRejectReason("");
        } catch (error: any) {
            console.error("Lỗi khi từ chối đơn:", error);
            toast.error(error?.response?.data?.message || "Có lỗi khi từ chối đơn");
        } finally {
            setIsRejectLoading(false);
        }
    };
    return (
        <div className="space-y-6">
            <Card>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Team Request Management</h1>
                            <p className="text-sm text-neutral-500 mt-1">Manage and review leave requests from your team members</p>
                        </div>
                        {/* <div className="flex gap-3">
                                    <Button className="h-10" variant={"outline"} onClick={handleExportClick}>
                                        <Download /> {t("admin.employees.exportReport")}
                                    </Button>
                                    <Button className="h-10" onClick={() => navigate("/approvals/adjust-leave-balances")}>
                                        <CirclePlus /> {t("admin.employees.newAdjustment")}
                                    </Button>
                                </div> */}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative h-12">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 " size={20} />
                            <Input
                                className="w-full h-full pl-10"
                                placeholder={"Search by employee name, ID, or leave type..."}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap gap-3">
                            <Button variant={"outline-primary"} size={"sm"} onClick={handleShowBatchApproveDialog}>
                                Batch Approve/Reject
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CTable data={data} columns={columns} handlePageChange={handlePageChange} isLoading={isQueryLoading}>
                {data?.data.map((item, index) => {
                    const requestId = item.requestId;
                    const creatorId = requestId?.creatorId;
                    return (
                        <tr key={index} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors border-b border-neutral-100 dark:border-neutral-800/50 last:border-0">
                            <td className="py-4 px-6">
                                <Link to={`/profile/${creatorId._id}`} className="flex items-center gap-3">
                                    <CAvatarProfile user={creatorId} className="w-9 h-9" />
                                    <div>
                                        <div className="font-medium text-neutral-900 dark:text-white">{creatorId?.fullName}</div>
                                        <div className="text-xs text-neutral-500">{creatorId?.positionId.fullName}</div>
                                    </div>
                                </Link>
                            </td>
                            <td className="py-4 px-6 text-center">{requestId?.code}</td>
                            <td className="py-4 px-6 text-center">
                                {format(new Date(requestId?.values.startDate), "MMM d")} - {format(new Date(requestId?.values.endDate), "MMM d")}
                            </td>
                            <td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400  font-medium">{format(new Date(item.createdAt), "MMM d, yyyy, h:mm a")}</td>
                            <td className="py-4 px-6 text-center">{CRenderStatus(item)}</td>
                            <td className="py-4 px-6 text-center">
                                <Link to={`/approvals/team-requests/${item._id}`}>
                                    <Button variant={"outline-primary"} size={"xs"}>
                                        <Eye /> Preview
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </CTable>
            <Dialog open={isShow} onOpenChange={setIsShow}>
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Batch Approve Assistant</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-5">
                        <Input placeholder="Nhập logic" value={inputFilter} onChange={(e) => setInputFilter(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 border-b pb-3">
                        <Button variant={activeTab === "matching" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("matching")}>
                            Có thể duyệt ngay ({dataMatching.length})
                        </Button>
                        <Button variant={activeTab === "notMatching" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("notMatching")}>
                            Cần cân nhắc ({dataNotMatching.length})
                        </Button>
                    </div>

                    <div className="overflow-y-auto pr-1 space-y-3">
                        {activeTab === "matching" &&
                            (dataMatching.length > 0 ? (
                                dataMatching.map((item) => (
                                    <div key={item._id} className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                                        <div className="font-medium text-emerald-800">{item.creatorName}</div>
                                        <div className="text-sm text-emerald-700 mt-1">Lý do: {item.reason}</div>
                                        <div className="text-xs text-emerald-700 mt-1">
                                            {format(new Date(item.startDate), "MMM d, yyyy")} - {format(new Date(item.endDate), "MMM d, yyyy")}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-neutral-500 py-8 text-center">
                                    <p>Không có đơn nào đủ điều kiện duyệt ngay.</p>
                                    <div className="mt-5 border rounded-lg border-emerald-200 bg-emerald-50 text-emerald-800 p-3 text-left">
                                        <p className="font-medium">Điều kiện để được duyệt ngay:</p>
                                        <ul className="mt-2 space-y-1 text-left list-disc list-inside">
                                            <li>Lý do thuộc nhóm khẩn cấp về sức khỏe: bị bệnh, ốm đột xuất, sốt cao, đau đầu nặng, nhập viện.</li>
                                            <li>Lý do thuộc nhóm tang chế: gia đình có đám tang, ba mất, mẹ mất, ông mất, bà mất, người thân qua đời.</li>
                                            <li>Lý do thuộc nhóm sự cố bất ngờ: tai nạn giao thông, hỏa hoạn, thiên tai, ngập lụt, việc khẩn cấp.</li>
                                            <li>Lý do thuộc nhóm gia đình: con bị ốm, chăm sóc người thân nhập viện, việc gấp gia đình.</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}

                        {activeTab === "notMatching" &&
                            (dataNotMatching.length > 0 ? (
                                dataNotMatching.map((item) => (
                                    <div key={item._id} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="font-medium text-amber-800">{item.creatorName}</div>
                                                <div className="text-sm text-amber-700 mt-1">Lý do: {item.reason}</div>
                                                <div className="text-xs text-amber-700 mt-1">
                                                    {format(new Date(item.startDate), "MMM d, yyyy")} - {format(new Date(item.endDate), "MMM d, yyyy")}
                                                </div>
                                            </div>
                                            <div className="space-y-2 ml-4 shrink-0">
                                                <Button
                                                    size={"xs"}
                                                    variant={"destructive"}
                                                    className="mr-2 w-full"
                                                    onClick={() => handleRejectClick(item._id)}
                                                    disabled={isRejectLoading || isApproveLoading === item._id || rejectingId === item._id}>
                                                    Từ chối
                                                </Button>
                                                <Button
                                                    size={"xs"}
                                                    className="w-full"
                                                    onClick={() => handleApproveItem(item._id)}
                                                    disabled={isRejectLoading || isApproveLoading === item._id || rejectingId === item._id}>
                                                    {isApproveLoading === item._id ? "Đang xử lý..." : "Duyệt"}
                                                </Button>
                                            </div>
                                        </div>

                                        {rejectingId === item._id && (
                                            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
                                                <textarea
                                                    placeholder="Nhập lý do từ chối..."
                                                    className="w-full p-2 text-sm border border-amber-300 rounded bg-white text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    rows={3}
                                                    value={rejectReason}
                                                    onChange={(e) => setRejectReason(e.target.value)}
                                                    disabled={isRejectLoading}
                                                />
                                                <div className="flex gap-2">
                                                    <Button size={"xs"} className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleRejectSubmit} disabled={isRejectLoading}>
                                                        {isRejectLoading ? "Đang gửi..." : "Xác nhận từ chối"}
                                                    </Button>
                                                    <Button
                                                        size={"xs"}
                                                        variant={"outline"}
                                                        className="flex-1"
                                                        onClick={() => {
                                                            setRejectingId(null);
                                                            setRejectReason("");
                                                        }}
                                                        disabled={isRejectLoading}>
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-neutral-500 py-8 text-center">Không có đơn nào cần cân nhắc thêm.</div>
                            ))}

                        {activeTab === "matching" && dataMatching.length > 0 && (
                            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleApprovalAll} disabled={isLoading || dataMatching.length === 0}>
                                {isLoading ? "Đang xử lý..." : "✓ Duyệt tất cả đơn"}
                            </Button>
                        )}
                    </div>

                    <div className="flex gap-2 border-t pt-4 justify-end">
                        <Button variant="outline" onClick={() => setIsShow(false)} disabled={isLoading}>
                            Đóng
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
