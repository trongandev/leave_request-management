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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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
	const [activeTab, setActiveTab] = useState<"matching" | "notMatching">(
		"matching",
	);
	const [dataMatching, setDataMatching] = useState<BatchReviewItem[]>([]);
	const [dataNotMatching, setDataNotMatching] = useState<BatchReviewItem[]>([]);
	const { data, isLoading: isQueryLoading } = useQuery({
		queryKey: ["approval-steps/pending", page, searchTerm],
		queryFn: () => approvalService.getPending(),
	});
	const handlePageChange = (page: number) => {
		setPage(page);
	};

	const columns = [
		"EMPLOYEE",
		"REQUEST TYPE",
		"DATE RANGE",
		"REQUESTED ON",
		"STATUS",
		"ACTIONS",
	];

	const handleShowBatchApproveDialog = () => {
		setIsShow(true);

		const reasonRule = [
			"Đi khám bệnh định kỳ",
			"Về quê có việc gấp",
			"Nhà có đám giỗ",
			"Con gái cưới chồng",
			"nghỉ phép năm",
			"nghỉ phép ốm",
			"nghỉ phép đặc biệt",
		];

		const matching: BatchReviewItem[] = [];
		const notMatching: BatchReviewItem[] = [];

		(data?.data || []).forEach((item: any) => {
			// kiểm tra xem reason có chứa bất kỳ từ khóa nào trong reasonRule không
			const reason = item.requestId?.values.reason || "";
			const normalizedReason = String(reason).toLowerCase();
			const isMatch = reasonRule.some((keyword) =>
				normalizedReason.includes(keyword.toLowerCase()),
			);
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
			const result = await approvalService.batchHumanApprove(idsToApprove);
			setIsShow(false);
			toast.success(
				`Đã duyệt ${result.approved?.length || 0} đơn! ${result.needReview?.length > 0 ? `${result.needReview.length} đơn cần cân nhắc.` : ""}`,
			);
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

		toast.info(
			`${dataNotMatching.length} đơn cần được xem xét kỹ. Vui lòng kiểm tra từng đơn chi tiết.`,
		);
	};
	return (
		<div className="space-y-6">
			<Card>
				<CardContent>
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div>
							<h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
								Team Request Management
							</h1>
							<p className="text-sm text-neutral-500 mt-1">
								Manage and review leave requests from your team members
							</p>
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
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 "
								size={20}
							/>
							<Input
								className="w-full h-full pl-10"
								placeholder={"Search by employee name, ID, or leave type..."}
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="flex flex-wrap sm:flex-nowrap gap-3">
							<Button
								variant={"outline-primary"}
								size={"sm"}
								onClick={handleShowBatchApproveDialog}
							>
								Batch Approve/Reject
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<CTable
				data={data}
				columns={columns}
				handlePageChange={handlePageChange}
				isLoading={isQueryLoading}
			>
				{data?.data.map((item, index) => {
					const requestId = item.requestId;
					const creatorId = requestId?.creatorId;
					return (
						<tr
							key={index}
							className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors border-b border-neutral-100 dark:border-neutral-800/50 last:border-0"
						>
							<td className="py-4 px-6">
								<Link
									to={`/profile/${creatorId._id}`}
									className="flex items-center gap-3"
								>
									<CAvatarProfile user={creatorId} className="w-9 h-9" />
									<div>
										<div className="font-medium text-neutral-900 dark:text-white">
											{creatorId?.fullName}
										</div>
										<div className="text-xs text-neutral-500">
											{creatorId?.positionId.fullName}
										</div>
									</div>
								</Link>
							</td>
							<td className="py-4 px-6 text-center">{requestId?.code}</td>
							<td className="py-4 px-6 text-center">
								{format(new Date(requestId?.values.startDate), "MMM d")} -{" "}
								{format(new Date(requestId?.values.endDate), "MMM d")}
							</td>
							<td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400  font-medium">
								{format(new Date(item.createdAt), "MMM d, yyyy, h:mm a")}
							</td>
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

					<div className="flex items-center gap-2 border-b pb-3">
						<Button
							variant={activeTab === "matching" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("matching")}
						>
							Có thể duyệt ngay ({dataMatching.length})
						</Button>
						<Button
							variant={activeTab === "notMatching" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("notMatching")}
						>
							Cần cân nhắc ({dataNotMatching.length})
						</Button>
					</div>

					<div className="overflow-y-auto pr-1 space-y-3">
						{activeTab === "matching" &&
							(dataMatching.length > 0 ? (
								dataMatching.map((item) => (
									<div
										key={item._id}
										className="rounded-lg border border-emerald-200 bg-emerald-50 p-3"
									>
										<div className="font-medium text-emerald-800">
											{item.creatorName}
										</div>
										<div className="text-sm text-emerald-700 mt-1">
											Lý do: {item.reason}
										</div>
										<div className="text-xs text-emerald-700 mt-1">
											{format(new Date(item.startDate), "MMM d, yyyy")} -{" "}
											{format(new Date(item.endDate), "MMM d, yyyy")}
										</div>
									</div>
								))
							) : (
								<div className="text-sm text-neutral-500 py-8 text-center">
									Không có đơn nào đủ điều kiện duyệt ngay.
								</div>
							))}

						{activeTab === "notMatching" &&
							(dataNotMatching.length > 0 ? (
								dataNotMatching.map((item) => (
									<div
										key={item._id}
										className="rounded-lg border border-amber-200 bg-amber-50 p-3"
									>
										<div className="font-medium text-amber-800">
											{item.creatorName}
										</div>
										<div className="text-sm text-amber-700 mt-1">
											Lý do: {item.reason}
										</div>
										<div className="text-xs text-amber-700 mt-1">
											{format(new Date(item.startDate), "MMM d, yyyy")} -{" "}
											{format(new Date(item.endDate), "MMM d, yyyy")}
										</div>
									</div>
								))
							) : (
								<div className="text-sm text-neutral-500 py-8 text-center">
									Không có đơn nào cần cân nhắc thêm.
								</div>
							))}

						{activeTab === "matching" && (
							<Button
								className="bg-emerald-600 hover:bg-emerald-700"
								onClick={handleApprovalAll}
								disabled={isLoading || dataMatching.length === 0}
							>
								{isLoading ? "Đang xử lý..." : "✓ Duyệt tất cả đơn"}
							</Button>
						)}
						{activeTab === "notMatching" && (
							<Button
								className="bg-amber-600 hover:bg-amber-700"
								onClick={handleReviewAll}
								disabled={dataNotMatching.length === 0}
							>
								⚠️ Cần xem xét kỹ ({dataNotMatching.length})
							</Button>
						)}
					</div>

					<div className="flex gap-2 border-t pt-4 justify-end">
						<Button
							variant="outline"
							onClick={() => setIsShow(false)}
							disabled={isLoading}
						>
							Đóng
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
