import CAvatarProfile from "@/components/etc/CAvatarProfile";
import CRenderStatus from "@/components/etc/CRenderStatus";
import CTable from "@/components/etc/CTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import approvalService from "@/services/approvalService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Search, Sparkles, Settings2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { runRuleEngine } from "../rule-engine/astParser";
import { analyzeRejectedRequests } from "../rule-engine/aiUnionLeader";

export default function TeamRequests() {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [isShow, setIsShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<
		"matching" | "notMatching" | "humanitarian"
	>("matching");
	const [dataMatching, setDataMatching] = useState<any[]>([]);
	const [dataNotMatching, setDataNotMatching] = useState<any[]>([]);
	const [aiAlerts, setAiAlerts] = useState<any>(null);
	const [isAiProcessing, setIsAiProcessing] = useState(false);
	const [ruleInput, setRuleInput] = useState(
		'(SoNgay <= 2 AND NghiPhep == true) OR (ChucVu == "VIP")'
	);

	// Upstream states
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
		setDataMatching([]);
		setDataNotMatching([]);
		setAiAlerts(null);
		setActiveTab("matching");
	};

	const handleRunAnalysis = async () => {
		setIsAiProcessing(true);
		setAiAlerts(null);

		const matching: any[] = [];
		const notMatching: any[] = [];

		try {
			// Lấy toàn bộ 100% đơn chờ thay vì chỉ trang hiện tại
			const allPendingRes = await approvalService.getAllPending();
			const allItems = allPendingRes?.data || [];

			allItems.forEach((item: any) => {
				const startDate = new Date(
					item.requestId?.values?.startDate || new Date()
				);
				const endDate = new Date(item.requestId?.values?.endDate || new Date());
				const soNgay =
					Math.ceil(
						(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
					) + 1;

				const context = {
					_id: item._id,
					id: String(item._id).substring(String(item._id).length - 4),
					creatorName: item.requestId?.creatorId?.fullName || "Không rõ",
					EmployeeName: item.requestId?.creatorId?.fullName || "Không rõ",
					creatorId: item.requestId?.creatorId?._id,
					reason: item.requestId?.values?.reason || "Không có lý do",
					startDate:
						item.requestId?.values?.startDate || new Date().toISOString(),
					endDate: item.requestId?.values?.endDate || new Date().toISOString(),
					SoNgay: soNgay,
					ChucVu: item.requestId?.creatorId?.positionId?.fullName || "Staff",
					NghiPhep: true,
					LyDo: item.requestId?.values?.reason || "",
				};

				const isMatchAst = runRuleEngine(ruleInput, context);
				if (isMatchAst) {
					matching.push(context);
				} else {
					notMatching.push(context);
				}
			});

			setDataMatching(matching);
			setDataNotMatching(notMatching);
			setActiveTab("notMatching");

			if (notMatching.length > 0) {
				const reasonRule = [
					"Đi khám bệnh",
					"Về quê",
					"đám giỗ",
					"cưới",
					"ốm",
					"đặc biệt",
					"cấp cứu",
					"tai nạn",
				];

				const keywordMatched = notMatching.filter((item) => {
					const normalizedReason = String(item.reason).toLowerCase();
					return reasonRule.some((keyword) =>
						normalizedReason.includes(keyword.toLowerCase())
					);
				});

				try {
					const aiResult = await analyzeRejectedRequests(notMatching);
					setAiAlerts({
						summary:
							aiResult.summary ||
							"Đã chạy kết hợp AST và AI trên các đơn bị từ chối.",
						recommendedExceptions: aiResult.recommendedExceptions || [],
						keywordMatches: keywordMatched,
					});
					setActiveTab("humanitarian");
				} catch (err) {
					console.error("AI Error:", err);
				}
			}
		} catch (error) {
			console.error("Error fetching all pending requests:", error);
			toast.error("Không thể lấy toàn bộ đơn chờ. Vui lòng thử lại.");
		}
		setIsAiProcessing(false);
	};

	const handleApproveItem = async (itemId: string) => {
		const targetId = itemId.length > 10 ? itemId : dataNotMatching.find(i => i.id === itemId || i._id === itemId)?._id || itemId;
		
		setIsApproveLoading(targetId);
		try {
			await approvalService.approve(targetId, { comment: "Duyệt theo đánh giá (AI / Rule)" });
			toast.success("Đã duyệt đơn");
			setDataNotMatching((prev) => prev.filter((item) => item._id !== targetId && item.id !== targetId));
			if (aiAlerts?.recommendedExceptions) {
				setAiAlerts((prev: any) => ({
					...prev,
					recommendedExceptions: prev.recommendedExceptions.filter((item: any) => item.id !== targetId && item._id !== targetId)
				}));
			}
			window.location.reload();
		} catch (error: any) {
			console.error("Lỗi khi duyệt đơn:", error);
			toast.error(error?.response?.data?.message || "Có lỗi khi duyệt đơn");
		} finally {
			setIsApproveLoading(null);
		}
	};

	const handleRejectClick = (itemId: string) => {
		const targetId = itemId.length > 10 ? itemId : dataNotMatching.find(i => i.id === itemId || i._id === itemId)?._id || itemId;
		setRejectingId(targetId);
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
			setDataNotMatching((prev) => prev.filter((item) => item._id !== rejectingId && item.id !== rejectingId));
			if (aiAlerts?.recommendedExceptions) {
				setAiAlerts((prev: any) => ({
					...prev,
					recommendedExceptions: prev.recommendedExceptions.filter((item: any) => item.id !== rejectingId && item._id !== rejectingId)
				}));
			}
			setRejectingId(null);
			setRejectReason("");
			window.location.reload();
		} catch (error: any) {
			console.error("Lỗi khi từ chối đơn:", error);
			toast.error(error?.response?.data?.message || "Có lỗi khi từ chối đơn");
		} finally {
			setIsRejectLoading(false);
		}
	};

	const handleApprovalAll = async () => {
		if (dataMatching.length === 0) {
			toast.error("Không có đơn nào để duyệt");
			return;
		}

		setIsLoading(true);
		try {
			const promises = dataMatching.map((item) =>
				approvalService.approve(item._id, {
					comment: "Duyệt Tự Động bởi AST Rule Engine",
				})
			);
			await Promise.all(promises);

			setIsShow(false);
			toast.success(`Đã duyệt tự động ${dataMatching.length} đơn hợp lệ!`);
			window.location.reload();
		} catch (error: any) {
			console.error("Lỗi khi duyệt đơn:", error);
			toast.error(error?.response?.data?.message || "Có lỗi khi duyệt đơn");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRejectAll = async () => {
		if (dataNotMatching.length === 0) {
			toast.error("Không có đơn nào để từ chối");
			return;
		}

		setIsLoading(true);
		try {
			const promises = dataNotMatching.map((item) =>
				approvalService.reject(item._id, {
					comment: "Từ chối hàng loạt (Không thỏa Rule)",
				})
			);
			await Promise.all(promises);

			setIsShow(false);
			toast.success(`Đã từ chối ${dataNotMatching.length} đơn!`);
			window.location.reload();
		} catch (error: any) {
			console.error("Lỗi khi từ chối đơn:", error);
			toast.error(error?.response?.data?.message || "Có lỗi khi từ chối");
		} finally {
			setIsLoading(false);
		}
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
									to={`/profile/${creatorId?._id}`}
									className="flex items-center gap-3"
								>
									<CAvatarProfile user={creatorId} className="w-9 h-9" />
									<div>
										<div className="font-medium text-neutral-900 dark:text-white">
											{creatorId?.fullName}
										</div>
										<div className="text-xs text-neutral-500">
											{creatorId?.positionId?.fullName}
										</div>
									</div>
								</Link>
							</td>
							<td className="py-4 px-6 text-center">{requestId?.code}</td>
							<td className="py-4 px-6 text-center">
								{format(new Date(requestId?.values?.startDate || new Date()), "MMM d")} -{" "}
								{format(new Date(requestId?.values?.endDate || new Date()), "MMM d")}
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
				<DialogContent className="w-[85vw] min-w-[60vw] max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col resize-x transition-all">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2 text-primary">
							<Settings2 className="w-5 h-5" />
							Batch Approve Assistant (AST Rule Engine & AI)
						</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-3 border-b pb-4 mt-2">
						<label className="text-xs font-bold text-slate-500 uppercase">
							Luật Phân Loại Động (AST Parser - An toàn tuyệt đối):
						</label>
						<div className="flex gap-2">
							<Input
								className="font-mono text-sm bg-slate-50"
								value={ruleInput}
								onChange={(e) => setRuleInput(e.target.value)}
							/>
							<Button
								onClick={handleRunAnalysis}
								disabled={isAiProcessing}
								className="bg-indigo-600 hover:bg-indigo-700 min-w-[140px]"
							>
								{isAiProcessing ? (
									"Đang xử lý AI..."
								) : (
									<>
										<Sparkles className="w-4 h-4 mr-2" /> Chạy Bộ Lọc
									</>
								)}
							</Button>
						</div>
					</div>

					<div className="flex items-center gap-2 border-b pb-3 pt-3">
						<Button
							variant={activeTab === "matching" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("matching")}
						>
							✅ Đủ điều kiện Rule ({dataMatching.length})
						</Button>
						<Button
							variant={activeTab === "notMatching" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("notMatching")}
						>
							❌ Bị Rule từ chối ({dataNotMatching.length})
						</Button>
						<Button
							variant={activeTab === "humanitarian" ? "default" : "outline"}
							size="sm"
							className={
								activeTab === "humanitarian"
									? "bg-rose-500 hover:bg-rose-600 text-white"
									: "text-rose-500 border-rose-200"
							}
							onClick={() => setActiveTab("humanitarian")}
						>
							❤️ Cần HR Cứu xét ({aiAlerts?.recommendedExceptions?.length || 0})
						</Button>
					</div>

					<div className="overflow-y-auto pr-1 space-y-3 min-h-[200px]">
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
											{item.SoNgay} ngày (Từ{" "}
											{format(new Date(item.startDate), "MMM d, yyyy")} đến{" "}
											{format(new Date(item.endDate), "MMM d, yyyy")})
										</div>
									</div>
								))
							) : (
								<div className="text-sm text-neutral-500 py-8 text-center">
									{isAiProcessing
										? "Đang quét..."
										: "Chưa có dữ liệu. Vui lòng bấm 'Chạy Bộ Lọc'."}
								</div>
							))}

						{activeTab === "notMatching" &&
							(dataNotMatching.length > 0 ? (
								dataNotMatching.map((item) => (
									<div
										key={item._id}
										className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-90"
									>
										<div className="font-medium text-slate-800">
											{item.creatorName}
										</div>
										<div className="text-sm text-slate-600 mt-1">
											Lý do: {item.reason}
										</div>
										<div className="text-xs text-slate-500 mt-1">
											{item.SoNgay} ngày - Chức vụ: {item.ChucVu}
										</div>
										<div className="mt-3 flex justify-end gap-2">
											<Button
												size="sm"
												variant="outline"
												className="h-8 text-rose-600 hover:bg-rose-50 border-rose-200"
												onClick={() => handleRejectClick(item.id || item._id)}
												disabled={isRejectLoading || rejectingId === (item.id || item._id)}
											>
												Từ chối
											</Button>
											<Button
												size="sm"
												className="bg-emerald-600 hover:bg-emerald-700 h-8"
												onClick={() => handleApproveItem(item.id || item._id)}
												disabled={isApproveLoading === (item.id || item._id)}
											>
												{isApproveLoading === (item.id || item._id) ? "Đang xử lý..." : "Đồng ý Duyệt Tay"}
											</Button>
										</div>
										{rejectingId === (item.id || item._id) && (
											<div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
												<textarea
													placeholder="Nhập lý do từ chối..."
													className="w-full p-2 text-sm border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
													rows={2}
													value={rejectReason}
													onChange={(e) => setRejectReason(e.target.value)}
													disabled={isRejectLoading}
												/>
												<div className="flex gap-2">
													<Button size={"xs"} className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleRejectSubmit} disabled={isRejectLoading}>
														{isRejectLoading ? "Đang gửi..." : "Xác nhận từ chối"}
													</Button>
													<Button size={"xs"} variant={"outline"} className="flex-1" onClick={() => { setRejectingId(null); setRejectReason(""); }} disabled={isRejectLoading}>
														Hủy
													</Button>
												</div>
											</div>
										)}
									</div>
								))
							) : (
								<div className="text-sm text-neutral-500 py-8 text-center">
									Không có đơn nào bị từ chối.
								</div>
							))}

						{activeTab === "humanitarian" && (
							<div className="space-y-4">
								{isAiProcessing && (
									<p className="animate-pulse text-rose-500 font-medium text-center py-8">
										Chủ tịch công đoàn AI đang đọc từng tờ đơn bị từ chối để tìm
										hoàn cảnh khó khăn...
									</p>
								)}

								{aiAlerts && (
									<>
										<div className="p-3 bg-rose-100/50 border border-rose-200 rounded-lg">
											<p className="text-sm font-bold text-rose-800">
												💡 Phân tích từ AI:
											</p>
											<p className="text-sm text-rose-700 mt-1">
												{aiAlerts.summary}
											</p>
										</div>

										{aiAlerts.recommendedExceptions?.map((item: any) => (
											<div
												key={item.id}
												className="rounded-lg border-2 border-rose-200 bg-white p-4 shadow-sm relative overflow-hidden"
											>
												<div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
												<div className="flex justify-between">
													<div className="font-bold text-slate-800">
														{item.employeeName}
													</div>
													<span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-700 px-2 py-1 rounded">
														Đề xuất ngoại lệ
													</span>
												</div>
												<div className="text-sm text-slate-700 mt-2 bg-slate-50 p-2 rounded border border-slate-100">
													<span className="font-semibold">Lý do gốc:</span>{" "}
													{item.lyDo}
												</div>
												<div className="text-sm text-rose-700 mt-2 italic flex gap-2 items-start">
													<Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
													<p>
														<span className="font-bold">AI đánh giá:</span>{" "}
														{item.analysis}
													</p>
												</div>
												<div className="mt-3 flex justify-end gap-2">
													<Button
														size="sm"
														variant="outline"
														className="h-8 border-rose-200 text-rose-700 hover:bg-rose-50"
														onClick={() => handleRejectClick(item.id || item._id)}
														disabled={isRejectLoading || rejectingId === (item.id || item._id)}
													>
														Từ chối
													</Button>
													<Button
														size="sm"
														className="bg-rose-600 hover:bg-rose-700 h-8"
														onClick={() => handleApproveItem(item.id || item._id)}
														disabled={isApproveLoading === (item.id || item._id)}
													>
														{isApproveLoading === (item.id || item._id) ? "Đang xử lý..." : "Đồng ý Duyệt Tay"}
													</Button>
												</div>
												{rejectingId === (item.id || item._id) && (
													<div className="mt-3 pt-3 border-t border-rose-200 space-y-2">
														<textarea
															placeholder="Nhập lý do từ chối..."
															className="w-full p-2 text-sm border border-rose-300 rounded bg-white text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
															rows={2}
															value={rejectReason}
															onChange={(e) => setRejectReason(e.target.value)}
															disabled={isRejectLoading}
														/>
														<div className="flex gap-2">
															<Button size={"xs"} className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleRejectSubmit} disabled={isRejectLoading}>
																{isRejectLoading ? "Đang gửi..." : "Xác nhận từ chối"}
															</Button>
															<Button size={"xs"} variant={"outline"} className="flex-1" onClick={() => { setRejectingId(null); setRejectReason(""); }} disabled={isRejectLoading}>
																Hủy
															</Button>
														</div>
													</div>
												)}
											</div>
										))}

										{aiAlerts.keywordMatches?.length > 0 && (
											<div className="mt-6 pt-4 border-t">
												<p className="text-xs font-bold text-amber-700 uppercase mb-3">
													Phát hiện theo Keywords truyền thống (Gợi ý thêm từ
													System):
												</p>
												{aiAlerts.keywordMatches.map((item: any) => (
													<div
														key={item._id}
														className="text-sm border-l-2 border-amber-400 pl-3 py-1 mb-2"
													>
														<span className="font-semibold">
															{item.creatorName}
														</span>
														: {item.reason}
													</div>
												))}
											</div>
										)}
									</>
								)}
							</div>
						)}
					</div>

					<div className="flex gap-2 border-t pt-4 justify-between items-center">
						<div>
							{activeTab === "matching" && (
								<Button
									className="bg-emerald-600 hover:bg-emerald-700"
									onClick={handleApprovalAll}
									disabled={isLoading || dataMatching.length === 0}
								>
									{isLoading
										? "Đang xử lý..."
										: `✓ Duyệt Tự Động (${dataMatching.length})`}
								</Button>
							)}
							{activeTab === "notMatching" && (
								<Button
									className="bg-rose-600 hover:bg-rose-700 text-white"
									onClick={handleRejectAll}
									disabled={isLoading || dataNotMatching.length === 0}
								>
									{isLoading
										? "Đang xử lý..."
										: `🗑️ Từ chối Tất cả (${dataNotMatching.length})`}
								</Button>
							)}
						</div>
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
