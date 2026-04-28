import { Button } from "@/components/ui/button";
import requestService from "@/services/requestService";
import userService from "@/services/userService";
import { promptChatAI } from "@/features/general/components/promptChatAI";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { GoogleGenAI } from "@google/genai";
import { FoldHorizontal, Loader2, SendHorizonal, Sparkles, Trash2, UnfoldHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { markdownToHtml } from "@/utils/markdown";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

type ChatRole = "EMPLOYEE" | "MANAGER" | "HR" | "ADMIN" | "UNKNOWN";

const resolveRole = (roleName?: string): ChatRole => {
    if (!roleName) return "UNKNOWN";
    const normalized = String(roleName).toUpperCase();
    if (normalized === "EMPLOYEE" || normalized === "MANAGER" || normalized === "HR" || normalized === "ADMIN") {
        return normalized;
    }
    return "UNKNOWN";
};

const fetchAllRequests = async (fetchPage: (page: number) => Promise<any>, maxPages = 20) => {
    const all: any[] = [];
    let page = 1;

    while (page <= maxPages) {
        const result = await fetchPage(page);
        const pageData = Array.isArray(result?.data) ? result.data : [];
        all.push(...pageData);

        const hasNext = Boolean(result?.meta?.has_next);
        if (!hasNext || pageData.length === 0) {
            break;
        }

        page += 1;
    }

    return all;
};

export default function ChatAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isExpand, setIsExpand] = useState(false);
    const { user, lb } = useAuthStore();

    const role = resolveRole(user?.roleId?.name);
    const isManager = role === "MANAGER";
    const isFullAccessRole = role === "HR" || role === "ADMIN";
    const defaultSuggestionChat = [
        "Các đơn của tôi",
        "Các đơn đang chờ tôi duyệt",
        "Lịch nghỉ của team tôi trong tháng này?",
        "Tình hình chung về các đơn nghỉ phép trong hệ thống?",
        "Tôi còn bao nhiêu ngày nghỉ phép còn lại?",
    ];
    const genAI = useMemo(() => new GoogleGenAI({ apiKey: import.meta.env.VITE_AI_KEY || "" }), []);

    const { data: teamData } = useQuery({
        queryKey: ["chat-ai-team-members", user?._id],
        queryFn: () => userService.getTeamMembers(),
        enabled: Boolean(user?._id) && isManager,
        staleTime: 60 * 1000,
    });

    const { data: myRequests = [] } = useQuery({
        queryKey: ["chat-ai-my-requests", user?._id],
        queryFn: () => fetchAllRequests((page) => requestService.getRequestProfile({ page })),
        enabled: Boolean(user?._id),
        staleTime: 60 * 1000,
    });

    const { data: systemRequests = [] } = useQuery({
        queryKey: ["chat-ai-system-requests", user?._id],
        queryFn: () => fetchAllRequests((page) => requestService.getAll({ page })),
        enabled: Boolean(user?._id) && isFullAccessRole,
        staleTime: 60 * 1000,
    });
    const requestAllTeamMembers = Array.isArray(teamData?.getRequestAllTeamMembers) ? teamData.getRequestAllTeamMembers : [];

    const handleSendMessage = async () => {
        const userMessage = input.trim();
        if (!userMessage || isLoading) return;

        if (!import.meta.env.VITE_AI_KEY) {
            setChat((prev) => [
                ...prev,
                { role: "user", content: userMessage },
                { role: "assistant", content: "### Chua cau hinh AI\nVui long thiet lap bien moi truong VITE_AI_KEY de su dung tro ly AI." },
            ]);
            setInput("");
            return;
        }

        setChat((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setIsLoading(true);

        try {
            const prompt = promptChatAI(userMessage, {
                role,
                user: user || {},
                lb: lb || {},
                history: chat,
                myRequests,
                teamRequests: isManager ? requestAllTeamMembers : [],
                systemRequests: isFullAccessRole ? systemRequests : [],
            });
            const response = await genAI.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    temperature: 0.3,
                },
            });

            const answer = response.text?.trim() || "### AI không trả lời được\nMinh chưa thể xử lý yêu cầu lúc này. Bạn vui lòng thử lại sau ít phút.";
            setChat((prev) => [...prev, { role: "assistant", content: answer }]);
        } catch {
            setChat((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "### Lỗi khi kết nối đến AI\nMinh không thể liên kết đến dịch vụ AI để trả lời câu hỏi. Bạn vui lòng thử lại sau ít phút hoặc liên hệ IT để được hỗ trợ.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className={`fixed ${isOpen ? "bottom-5 right-5 z-50" : "bottom-5 -right-full"} transition-all duration-300 ease-in-out  ${isExpand ? "w-full md:max-w-4xl" : "w-full md:max-w-sm"} p-5 rounded-xl shadow-lg border bg-card flex flex-col z-50`}>
                <div className="flex-1 flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-lg text-neutral-600 dark:text-neutral-400">Ask AI</h3>
                    <div className="">
                        <Button variant={"ghost"} className="mr-2" onClick={() => setIsExpand((prev) => !prev)}>
                            {!isExpand ? <UnfoldHorizontal size={18} /> : <FoldHorizontal size={18} />}
                        </Button>
                        <Button onClick={() => setChat([])} variant={"ghost"} className="mr-2 text-red-500">
                            <Trash2 />
                        </Button>
                        <Button onClick={() => setIsOpen(false)} variant={"ghost"}>
                            <X />
                        </Button>
                    </div>
                </div>
                <div className={`flex-1 py-4 ${isExpand ? "max-h-[70vh]" : "max-h-[58vh]"} overflow-y-auto space-y-3`}>
                    {chat.length === 0 && <p className="text-sm text-muted-foreground py-20">Hỏi AI về đơn của bạn, lịch nghỉ team, hoặc tổng quan về hệ thống (theo quyền)</p>}

                    {chat.map((item, index) => (
                        <div key={`${item.role}-${index}`} className={`rounded-xl px-3 py-2 text-sm ${item.role === "user" ? "ml-8 bg-primary text-primary-foreground" : "mr-8 bg-muted"}`}>
                            {item.role === "assistant" ? (
                                <div
                                    className="space-y-2 text-sm leading-relaxed [&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-sm [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-black/10 [&_pre]:p-2 [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1 [&_code]:py-0.5 [&_a]:underline [&_table]:border-collapse [&_table]:w-full [&_table]:mt-2 [&_table]:mb-2 [&_th]:border [&_th]:border-slate-300 [&_th]:dark:border-slate-600 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-slate-100 [&_th]:dark:bg-slate-800 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-slate-300 [&_td]:dark:border-slate-600 [&_td]:px-3 [&_td]:py-2"
                                    dangerouslySetInnerHTML={{ __html: markdownToHtml(item.content) }}
                                />
                            ) : (
                                <p>{item.content}</p>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <p className="text-xs text-muted-foreground px-1 py-3 flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" /> AI đang phân tích dữ liệu
                        </p>
                    )}
                </div>
                <div className="flex-1 ">
                    {chat.length === 0 && (
                        <div className="flex flex-wrap gap-2 py-3">
                            {defaultSuggestionChat.map((suggestion, index) => (
                                <Button key={index} variant="outline" size="sm" className="text-xs" onClick={() => setInput(suggestion)}>
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t pt-3">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi hoặc yêu cầu của bạn..."
                            autoFocus
                            className="flex-1 focus-within:outline-0 text-sm"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    void handleSendMessage();
                                }
                            }}
                        />
                        <Button className="ml-3" variant={"ghost"} onClick={handleSendMessage} disabled={isLoading}>
                            <SendHorizonal size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <div
                className={`fixed ${isOpen ? "opacity-0 hidden -z-10" : "opacity-100"} transition-all ease-in-out duration-200 bottom-5 right-5 px-5 h-12 bg-primary rounded-full shadow-lg shadow-primary/50 flex gap-2 items-center justify-center text-white cursor-pointer z-50 active:scale-[0.97] hover:scale-[0.99] select-none`}
                onClick={() => setIsOpen(true)}>
                <p>Ask AI</p>
                <Sparkles size={18} />
            </div>
        </>
    );
}
