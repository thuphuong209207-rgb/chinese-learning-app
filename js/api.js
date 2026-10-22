// Gemini AI Integration Service
// Uses gemini-2.5-flash REST endpoint

const GeminiService = {
  getApiKey() {
    const settings = window.StorageService ? window.StorageService.getSettings() : {};
    return settings.apiKey ? settings.apiKey.trim() : "";
  },

  async callGemini(promptText, systemInstruction = "") {
    return this.callGeminiMultimodal([{ text: promptText }], systemInstruction);
  },

  async callGeminiMultimodal(parts, systemInstruction = "") {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Chưa nhập Gemini API Key. Vui lòng vào mục 'Cài đặt' để nhập API Key để kích hoạt tính năng AI thực tế!");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const bodyPayload = {
      contents: [
        {
          parts: parts
        }
      ],
      generationConfig: {
        temperature: 0.3,
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
  },

  // 6. Scan Book Page / Image AI to extract Vocabulary
  async scanBookPageAI(base64Data, mimeType = "image/jpeg", customPrompt = "") {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      // Offline fallback mock data representing words scanned from a Chinese textbook page
      return [
        {
          hanzi: "阅读",
          pinyin: "yuè dú",
          meaning: "Đọc sách, đọc hiểu văn bản",
          hsk: 3,
          wordType: "Động từ",
          exampleZh: "每天坚持阅读中文书籍能快速提高语感。",
          exampleVi: "Mỗi ngày kiên trì đọc sách tiếng Trung giúp nâng cao ngữ cảm nhanh chóng.",
          notes: "Gồm bộ Ngôn (讠) và Duyệt (阅)"
        },
        {
          hanzi: "理解",
          pinyin: "lǐ jiě",
          meaning: "Thấu hiểu, lĩnh hội ý nghĩa",
          hsk: 3,
          wordType: "Động từ",
          exampleZh: "请仔细阅读并理解这篇课文的主要内容。",
          exampleVi: "Xin hãy đọc kỹ và hiểu nội dung chính của bài khóa này.",
          notes: "Gồm bộ Ngọc (王/玉) và Giác (角)"
        },
        {
          hanzi: "词汇",
          pinyin: "cí huì",
          meaning: "Từ vựng, vốn từ",
          hsk: 4,
          wordType: "Danh từ",
          exampleZh: "积累丰富的词汇量对口语表达至关重要。",
          exampleVi: "Tích lũy vốn từ vựng phong phú rất quan trọng đối với diễn đạt khẩu ngữ.",
          notes: "Từ ghép chỉ toàn bộ hệ thống từ ngữ"
        },
        {
          hanzi: "掌握",
          pinyin: "zhǎng wò",
          meaning: "Nắm vững, làm chủ kiến thức",
          hsk: 5,
          wordType: "Động từ",
          exampleZh: "通过反复练习，我们可以牢牢掌握这些重点生词。",
          exampleVi: "Thông qua luyện tập lặp lại, chúng ta có thể nắm vững những từ mới trọng điểm này.",
          notes: "Đều có bộ Thủ (扌) chỉ hành động cầm nắm điều khiển"
        },
        {
          hanzi: "流利",
          pinyin: "liú lì",
          meaning: "Lưu loát, trôi chảy",
          hsk: 4,
          wordType: "Tính từ",
          exampleZh: "经过半年的努力，他能说一口流利的汉语。",
          exampleVi: "Sau nửa năm nỗ lực, anh ấy có thể nói một thứ tiếng Trung trôi chảy.",
          notes: "Gồm chữ 流 (lưu chuyển) và 利 (thuận lợi)"
        }
      ];
    }

    const systemInstruction = `Bạn là chuyên gia ngôn ngữ học tiếng Trung và chuyên gia OCR trích xuất tài liệu giáo trình HSK / Hán Ngữ. Nhiệm vụ của bạn là nhận diện chữ Hán trong bức ảnh chụp trang sách, trích xuất danh sách các từ vựng mới, từ vựng cốt lõi hoặc câu quan trọng trong trang sách đó. Trả về DUY NHẤT một mảng JSON chuẩn (không chứa bất kỳ chữ nào ngoài JSON).`;

    const defaultPrompt = `Hãy quét bức ảnh chụp trang sách tiếng Trung này:
1. Nhận diện các chữ Hán và các từ vựng tiếng Trung xuất hiện trong văn bản.
2. Trích xuất khoảng 4 đến 10 từ vựng cốt lõi, quan trọng hoặc từ mới xuất hiện trong trang sách để người học tạo Flashcard.
3. Cung cấp đầy đủ phiên âm Pinyin chuẩn thanh điệu, dịch nghĩa tiếng Việt chính xác, cấp độ HSK (1-6), từ loại, câu ví dụ trích từ sách (hoặc tự tạo ví dụ tự nhiên kèm dịch nghĩa) và mẹo nhớ chiết tự chữ Hán.
4. Trả về cấu trúc JSON đúng chuẩn sau:
[
  {
    "hanzi": "Từ vựng chữ Hán trích xuất từ trang sách",
    "pinyin": "phiên âm pinyin chuẩn có dấu thanh",
    "meaning": "nghĩa tiếng Việt chính xác, súc tích",
    "hsk": 1-6 (số nguyên),
    "wordType": "Danh từ / Động từ / Tính từ / Thành ngữ...",
    "exampleZh": "Câu ví dụ thực tế sử dụng từ này",
    "exampleVi": "Dịch nghĩa tiếng Việt của câu ví dụ",
    "notes": "Mẹo nhớ chiết tự hoặc ngữ cảnh xuất hiện trong sách"
  }
]`;

    const parts = [
      {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: base64Data
        }
      },
      {
        text: customPrompt ? `${defaultPrompt}\n\nYêu cầu bổ sung: ${customPrompt}` : defaultPrompt
      }
    ];

    const raw = await this.callGeminiMultimodal(parts, systemInstruction);
    return this.cleanJson(raw);
  }
};

window.GeminiService = GeminiService;
