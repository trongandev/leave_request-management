type ChatRole = "EMPLOYEE" | "MANAGER" | "HR" | "ADMIN" | "UNKNOWN";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

type PromptInput = {
    role: ChatRole;
    user: Record<string, any>;
    lb: Record<string, any>;
    history: ChatMessage[];
    myRequests: any[];
    teamRequests: any[];
    systemRequests: any[];
};

const normalizeRequest = (request: any) => ({
    reqDisplayId: request?.reqDisplayId || request?._id || "N/A",
    title: request?.title || request?.code || "Yeu cau",
    status: request?.status || "UNKNOWN",
    startDate: request?.values?.startDate || null,
    endDate: request?.values?.endDate || request?.values?.startDate || null,
    reason: request?.values?.reason || null,
    createdAt: request?.createdAt || null,
    updatedAt: request?.updatedAt || null,
    creator: request?.creatorId
        ? {
              fullName: request.creatorId?.fullName || "Unknown member",
              empId: request.creatorId?.empId || "N/A",
              email: request.creatorId?.email || "N/A",
              department: request.creatorId?.departmentId?.originName || request.creatorId?.departmentId?.name || "N/A",
          }
        : null,
});

const capRequests = (requests: any[], cap: number) => {
    if (!Array.isArray(requests)) return [];
    return requests.slice(0, cap).map(normalizeRequest);
};

export const promptChatAI = (userMessage: string, data: PromptInput) => {
    const role = data?.role || "UNKNOWN";
    const myRequests = capRequests(data?.myRequests || [], 120);
    const teamRequests = data?.teamRequests || [];
    const systemRequests = capRequests(data?.systemRequests || [], 300);
    const history = (data?.history || []).slice(-8);
    console.log(data);
    const allowedData = {
        role,
        currentUser: { user: data.user, leaveBalance: data.lb },
        history,
        myRequests,
        teamRequests: role === "MANAGER" ? teamRequests : [],
        systemRequests: role === "HR" || role === "ADMIN" ? systemRequests : [],
    };

    return `
Bạn là trợ lý AI cho hệ thống quản lý nghỉ phép nội bộ.

QUY ĐỊNH QUYỀN TRUY CẬP (BẮT BUỘC):
- EMPLOYEE: chỉ được dựa trên thông tin cá nhân và các đơn của chính họ.
- MANAGER: được như EMPLOYEE và thêm thông tin lịch nghỉ của thành viên trong nhóm.
- HR và ADMIN: được phép trả lời dựa trên toàn bộ dữ liệu hệ thống được cung cấp.

YÊU CẦU TRẢ LỜI:
- Luôn trả lời bằng TIẾNG VIỆT.
- Hỗ trợ markdown đẹp, rõ ràng, dễ đọc.
- Nếu phù hợp, sử dụng tiêu đề, bullet list, bảng markdown.
- Không được tự bóc dữ liệu không có trong ngữ cảnh.
- Nếu người dùng hỏi vượt quyền, cần từ chối lịch sử và giải thích ngắn gọn là không đủ quyền.
- Nếu không đủ dữ liệu để kết luận, hãy nêu rõ phần thiếu và đề xuất thông tin cần bổ sung.

DỮ LIỆU ĐÃ ĐƯỢC PHÉP SỬ DỤNG (JSON):
${JSON.stringify(allowedData, null, 2)}

CÂU HỎI MỚI CỦA NGƯỜI DÙNG:
${userMessage}

Hãy trả lời trực tiếp, ngắn gọn, đúng trong tầm, và dùng markdown.
`;
};
