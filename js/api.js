// Gemini AI Integration Service
// Uses gemini-2.5-flash REST endpoint

const GeminiService = {
  getApiKey() {
    const settings = window.StorageService ? window.StorageService.getSettings() : {};
    return settings.apiKey ? settings.apiKey.trim() : "";
  },

  async callGemini(promptText, systemInstruction = "") {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Chưa nhập Gemini API Key. Vui lòng vào mục 'Cài đặt' để nhập API Key để kích hoạt tính năng AI thực tế!");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const bodyPayload = {
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95
      }
    };

    if (systemInstruction) {
      bodyPayload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const message = errData.error?.message || `Lỗi API HTTP: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error("Không nhận được phản hồi hợp lệ từ Gemini API.");
    }

    return candidate.content.parts[0].text;
  },

  // Helper to extract JSON from markdown formatted AI response (```json ... ```)
  cleanJson(text) {
    let cleaned = text.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
    }
    return JSON.parse(cleaned);
  },

  // 1. Dictionary Smart Lookup Fallback
  async lookupWordAI(query) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      // Offline fallback generator for smooth demo
      return {
        hanzi: query,
        pinyin: "pīn yīn",
        meaning: `Nghĩa tra cứu mẫu cho "${query}" (Hãy cấu hình Gemini API Key để nhận phân tích chi tiết thời gian thực)`,
        hsk: 3,
        radical: "Bộ thủ mẫu",
        strokes: 8,
        collocations: [`${query}常用`, `学习${query}`],
        example: {
          zh: `这是一个关于${query}的例句。`,
          pinyin: `Zhè shì yí gè guānyú ${query} de lìjù.`,
          vi: `Đây là câu ví dụ minh họa cho từ ${query}.`
        },
        source: "offline_mock"
      };
    }

    const systemInstruction = `Bạn là một chuyên gia ngôn ngữ học tiếng Trung và từ điển Hán-Việt. Hãy phân tích từ/cụm từ tiếng Trung được cung cấp và trả về DUY NHẤT một chuỗi JSON chuẩn (không chứa văn bản phụ).`;
    const prompt = `Phân tích từ/cụm từ: "${query}".
Trả về cấu trúc JSON đúng chuẩn sau:
{
  "hanzi": "Chữ Hán chuẩn",
  "pinyin": "phiên âm pinyin chuẩn có dấu thanh",
  "meaning": "nghĩa tiếng Việt súc tích, chính xác",
  "hsk": 1-6 (số nguyên tương ứng cấp độ HSK),
  "radical": "Bộ thủ chính và tên tiếng Việt",
  "strokes": số nét (số nguyên),
  "collocations": ["từ ghép 1 (nghĩa)", "từ ghép 2 (nghĩa)"],
  "example": {
    "zh": "Câu ví dụ thực tế chữ Hán",
    "pinyin": "Pinyin câu ví dụ",
    "vi": "Dịch nghĩa tiếng Việt câu ví dụ"
  }
}`;

    const raw = await this.callGemini(prompt, systemInstruction);
    const parsed = this.cleanJson(raw);
    parsed.source = "gemini_ai";
    return parsed;
  },

  // 2. Speaking Evaluation & Reflex Response
  async evaluateSpeakingAI(scenario, userSpeechText) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return {
        score: 8.5,
        fluencyComment: "Phát âm và cấu trúc câu tương đối rõ ràng (Mô phỏng - hãy nhập API key để nhận chấm điểm AI thực).",
        grammarCorrection: userSpeechText || "Chưa ghi nhận câu trả lời.",
        naturalSuggestion: "建议使用更地道的口语表达。",
        aiReplyZh: "你的中文说得很好，继续加油！我们再练习下一个话题吧。",
        aiReplyVi: "Tiếng Trung của bạn khá tốt, tiếp tục cố gắng nhé! Chúng ta cùng luyện chủ đề tiếp theo nào."
      };
    }

    const systemInstruction = `Bạn là một giám khảo thi khẩu ngữ HSKK và giáo viên tiếng Trung bản xứ thân thiện. Hãy lắng nghe và đánh giá câu trả lời của học viên một cách ân cần, chi tiết và chuyên nghiệp. Trả về DUY NHẤT định dạng JSON.`;
    const prompt = `Tình huống / Đề bài: "${scenario.promptZh}" (${scenario.promptVi})
Câu trả lời của học viên (ghi nhận qua nhận diện giọng nói): "${userSpeechText}"

Hãy phân tích và trả về JSON:
{
  "score": Điểm số trên thang 10 (số thực),
  "fluencyComment": "Nhận xét chi tiết bằng tiếng Việt về độ lưu loát, từ vựng và ngữ pháp",
  "grammarCorrection": "Sửa lại câu của học viên cho chuẩn xác nhất (chữ Hán)",
  "naturalSuggestion": "Gợi ý cách diễn đạt tự nhiên chuẩn người bản xứ (kèm Pinyin & tiếng Việt)",
  "aiReplyZh": "Câu phản hồi đối thoại tiếp theo của bạn với học viên bằng tiếng Trung ngắn gọn để tiếp tục phản xạ",
  "aiReplyVi": "Dịch nghĩa câu phản hồi đối thoại sang tiếng Việt"
}`;

    const raw = await this.callGemini(prompt, systemInstruction);
    return this.cleanJson(raw);
  },

  // 3. Exam Question Generator
  async generateExamQuestionsAI(curriculum, level, count = 3) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Vui lòng nhập Gemini API Key trong Cài đặt để sinh đề thi mới bằng AI!");
    }

    const systemInstruction = `Bạn là chuyên gia khảo thí biên soạn đề thi HSK Hanban và Giáo trình Hán ngữ. Trả về DUY NHẤT một mảng JSON các câu hỏi.`;
    const prompt = `Hãy tạo ${count} câu hỏi trắc nghiệm mới theo giáo trình "${curriculum}", cấp độ "${level}".
Mỗi câu hỏi có thể thuộc dạng Nghe (listening), Ngữ pháp (grammar) hoặc Đọc hiểu (reading).
Cấu trúc JSON mong muốn:
[
  {
    "id": "gen_q1",
    "type": "grammar" hoặc "listening" hoặc "reading",
    "passage": "Đoạn văn đọc hiểu nếu có (hoặc rỗng)",
    "audioText": "Nội dung phát âm để nghe nếu là dạng listening (hoặc rỗng)",
    "question": "Câu hỏi chi tiết (tiếng Việt hoặc Hán ngữ)",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": 0-3 (vị trí đáp án đúng),
    "explanation": "Giải thích chi tiết vì sao chọn đáp án đó bằng tiếng Việt"
  }
]`;

    const raw = await this.callGemini(prompt, systemInstruction);
    return this.cleanJson(raw);
  },

  // 4. Chengyu & Proverb Generator
  async generateChengyuAI(theme = "bất kỳ") {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Vui lòng nhập Gemini API Key để tạo thành ngữ mới cùng điển tích!");
    }

    const systemInstruction = `Bạn là một nhà nghiên cứu văn hóa văn học cổ điển Trung Hoa. Trả về DUY NHẤT JSON.`;
    const prompt = `Hãy giới thiệu một câu thành ngữ (Chengyu) hoặc tục ngữ Trung Hoa nổi tiếng và giàu ý nghĩa về chủ đề: "${theme}".
Định dạng JSON chuẩn:
{
  "hanzi": "4 chữ Hán thành ngữ (hoặc câu tục ngữ)",
  "pinyin": "Pinyin đầy đủ có dấu thanh",
  "literal": "Dịch nghĩa đen từng chữ",
  "figurative": "Nghĩa bóng, bài học triết lý sâu xa",
  "story": "Kể lại câu chuyện / điển tích lịch sử hoặc ngụ ngôn xuất xứ (khoảng 3-4 câu tiếng Việt hấp dẫn)",
  "example": {
    "zh": "Câu ví dụ áp dụng trong giao tiếp hiện đại",
    "pinyin": "Pinyin câu ví dụ",
    "vi": "Dịch tiếng Việt câu ví dụ"
  },
  "tags": ["Chủ đề 1", "Chủ đề 2"]
}`;

    const raw = await this.callGemini(prompt, systemInstruction);
    return this.cleanJson(raw);
  },

  // 5. Flashcard Auto Fill
  async autoFillFlashcardAI(hanzi) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return {
        pinyin: "hàn zì",
        meaning: "Nghĩa của từ " + hanzi,
        hsk: 3,
        wordType: "Từ vựng",
        exampleZh: `学习${hanzi}很有用。`,
        exampleVi: `Học từ ${hanzi} rất có ích.`,
        notes: `Mẹo ghi nhớ: Luyện viết và đọc phát âm nhiều lần từ ${hanzi}.`
      };
    }

    const prompt = `Từ/Cụm từ tiếng Trung: "${hanzi}". Hãy phân tích sâu và tự động bổ sung thông tin tạo Flashcard học tập. Trả về DUY NHẤT định dạng JSON chuẩn:
{
  "pinyin": "phiên âm pinyin có dấu thanh điệu chuẩn",
  "meaning": "nghĩa tiếng Việt ngắn gọn, xúc tích",
  "hsk": 1-6 (số nguyên cấp độ HSK ước lượng),
  "wordType": "Danh từ / Động từ / Tính từ / Thành ngữ...",
  "exampleZh": "câu ví dụ chữ Hán ngắn gọn, thực tế đời sống",
  "exampleVi": "dịch nghĩa câu ví dụ sang tiếng Việt",
  "notes": "Mẹo ghi nhớ hoặc chiết tự chữ Hán (giải thích bộ thủ hoặc cách nhớ ngắn gọn)"
}`;

    const raw = await this.callGemini(prompt);
    return this.cleanJson(raw);
  }
};

window.GeminiService = GeminiService;
