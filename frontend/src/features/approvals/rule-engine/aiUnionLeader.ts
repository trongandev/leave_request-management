// VỊ TRÍ GẮN FILE: frontend/src/features/approvals/rule-engine/aiUnionLeader.ts

import { GoogleGenAI } from "@google/genai";

// Khởi tạo Gemini API (Dùng biến môi trường giống cách dự án đang làm)
const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_AI_KEY });

export async function analyzeRejectedRequests(rejectedRequests: any[]) {
    // 1. Tối ưu Token: Chỉ gửi những trường dữ liệu cần thiết của các đơn bị từ chối
    const compressedData = rejectedRequests
        .map(r => `Đơn #${r.id} (${r.EmployeeName}) - Nghỉ ${r.SoNgay} ngày - Lý do: ${r.LyDo}`)
        .join('\n');

    // 2. Viết System Prompt "Chủ tịch Công đoàn"
    const prompt = `
Bạn là Chủ tịch Công đoàn (Union Leader) của công ty, người luôn bảo vệ quyền lợi chính đáng và có sự cảm thông, nhân đạo với người lao động.
Dưới đây là danh sách các đơn xin nghỉ phép đã bị "Bộ lọc tự động" từ chối do vi phạm quy tắc cứng (ví dụ: xin nghỉ nhiều hơn 2 ngày).
Nhiệm vụ của bạn:
- Đọc phân tích tình cảm (Sentiment Analysis) từng lý do. 
- "Cứu" lại những tờ đơn có hoàn cảnh khẩn cấp, đau buồn, nguy hiểm đến tính mạng (như tai nạn, sinh đẻ, tang gia, bệnh nặng).
- Bỏ qua các lý do thông thường (nghỉ mát, ốm nhẹ, việc cá nhân...).

Danh sách đơn từ chối:
${compressedData}

YÊU CẦU ĐẦU RA:
Trả về CHỈ một chuỗi JSON hợp lệ theo format sau:
{
  "summary": "Câu tóm tắt tổng quan về số ca khẩn cấp phát hiện được (Ví dụ: Lọc từ danh sách bị từ chối, AI phát hiện 2 trường hợp khẩn cấp cần HR can thiệp thủ công...)",
  "recommendedExceptions": [
    {
      "id": "Mã short id",
      "employeeName": "Tên nhân viên",
      "soNgay": 3,
      "lyDo": "Lý do...",
      "analysis": "Lời biện luận nhân đạo tại sao nên duyệt ngoại lệ"
    }
  ]
}`;

    try {
        // 3. Gọi model Gemini
        const response = await genAI.models.generateContent({
            model: "gemini-3-flash-preview", // Model dự án đang dùng
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.1, // Độ sáng tạo thấp, đảm bảo tính chính xác
            },
        });

        const responseText = response.text?.trim() || "{}";
        return JSON.parse(responseText);
    } catch (error) {
        console.error("Lỗi khi AI phân tích:", error);
        return { summary: "AI gặp lỗi trong quá trình phân tích.", recommendedExceptions: [] };
    }
}
