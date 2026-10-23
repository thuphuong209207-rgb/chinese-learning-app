// Gemini AI Integration Service
// Uses gemini-2.0-flash REST endpoint with automatic smart fallback & ultra-fast response

const GeminiService = {
  lastUsedModel: "gemini-2.0-flash",

  getApiKey() {
    const settings = window.StorageService ? window.StorageService.getSettings() : {};
    return settings.apiKey ? settings.apiKey.trim() : "";
  },

  getModel() {
    const settings = window.StorageService ? window.StorageService.getSettings() : {};
    let m = settings.model;
    if (!m || m === "gemini-3.8-flash" || m === "gemini-2.5-flash" || m === "gemini-1.5-flash-8b") {
      m = "gemini-2.0-flash";
    }
    return m;
  },

  async callGemini(promptText, systemInstruction = "", options = {}) {
    return this.callGeminiMultimodal([{ text: promptText }], systemInstruction, options);
  },

  async callGeminiMultimodal(parts, systemInstruction = "", options = {}) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Chưa nhập Gemini API Key. Vui lòng vào mục 'Cài đặt' để nhập API Key để kích hoạt tính năng AI thực tế!");
    }

    const preferredModel = this.getModel();
    // Candidate models in low-latency priority order:
    // 1. gemini-2.0-flash (fastest, state-of-the-art token generation)
    // 2. gemini-1.5-flash (reliable, high quota)
    // 3. gemini-1.5-pro (deep reasoning)
    const candidateModels = [
      preferredModel,
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
    ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

    let lastError = null;

    for (const model of candidateModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const genConfig = {
          temperature: typeof options.temperature === "number" ? options.temperature : 0.2,
          maxOutputTokens: options.maxOutputTokens || 650,
          topK: 20,
          topP: 0.9
        };

        if (options.isJson === true) {
          genConfig.responseMimeType = "application/json";
        }

        const bodyPayload = {
          contents: [{ parts: parts }],
          generationConfig: genConfig
        };

        if (systemInstruction) {
          bodyPayload.systemInstruction = {
            parts: [{ text: systemInstruction }]
          };
        }

        // AbortController timeout to guarantee quick failover if any model hangs
        const controller = new AbortController();
        const timeoutMs = options.timeoutMs || 8000;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyPayload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `Lỗi API HTTP: ${response.status} ${response.statusText}`;

          if (response.status === 404 || errMsg.includes("not found") || errMsg.includes("not supported") || errMsg.includes("no longer available") || errMsg.includes("Resource has been exhausted") || response.status === 429) {
            console.warn(`Model ${model} không khả dụng (${errMsg}), đang chuyển sang model dự phòng...`);
            lastError = new Error(errMsg);
            continue;
          }
          throw new Error(errMsg);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        if (!candidate || !candidate.content?.parts?.[0]?.text) {
          throw new Error("Không nhận được phản hồi hợp lệ từ Gemini API.");
        }

        this.lastUsedModel = model;
        // If preferred model was deprecated, update settings with the working model
        if (model !== preferredModel && window.StorageService) {
          window.StorageService.saveSettings({ model });
        }

        return candidate.content.parts[0].text;
      } catch (err) {
        lastError = err;
        if (err.name === "AbortError" || err.message.includes("not found") || err.message.includes("not supported")) {
          console.warn(`Model ${model} thất bại (${err.message}), thử model tiếp theo...`);
          continue;
        }
        if (err.message.includes("API key not valid") || err.message.includes("PERMISSION_DENIED") || err.message.includes("Chưa nhập")) {
          throw err;
        }
      }
    }

    throw lastError || new Error("Không thể kết nối đến các model Gemini khả dụng.");
  },

  // Helper to extract JSON from markdown formatted AI response (```json ... ```) or pure JSON
  cleanJson(text) {
    let cleaned = (text || "").trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
    }
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      const match = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (match) return JSON.parse(match[0]);
      throw e;
    }
  },

  removeVietnameseTones(str) {
    if (!str) return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  },

  // Instant local dictionary mapping for instantaneous response (< 10ms)
  findInstantWord(query) {
    if (!query) return null;
    const q = query.trim().toLowerCase();
    const qNoTone = this.removeVietnameseTones(q);

    // Instant Map for high-frequency queries
    const instantDB = [
      {
        keys: ["cố định", "co dinh", "固定", "guding", "gùdìng"],
        data: {
          hanzi: "固定",
          traditional: "固定",
          pinyin: "gùdìng",
          wordType: "Tính từ / Động từ",
          meaning: "Cố định, giữ nguyên, ổn định, bất biến",
          detailedMeanings: [
            "1. Làm cho chắc chắn không xê dịch (vd: cố định giá đỡ)",
            "2. Ổn định, không thay đổi (vd: thời gian cố định, thu nhập cố định)"
          ],
          hsk: "HSK 4",
          radical: "囗 (Vi / Khẩu)",
          strokes: 8,
          strokeOrderRules: "Chữ 固: Ngoài trước trong sau, vào trước đóng sau. Chữ 定: Trên trước dưới sau.",
          mnemonics: "Chữ 固 gồm bộ Vi 囗 bao bọc chữ Cổ 古 (xưa cũ), thể hiện sự vững chắc muôn đời. Chữ 定 dưới mái nhà 宀 lòng an định.",
          synonyms: ["稳定", "不变", "确立"],
          antonyms: ["变动", "流动", "活络"],
          collocations: ["固定资产 (Tài sản cố định)", "固定电话 (Điện thoại cố định)", "固定收入 (Thu nhập cố định)", "固定时间 (Thời gian cố định)"],
          grammarNotes: "Thường làm định ngữ (固定工作), vị ngữ hoặc kết hợp làm bổ ngữ trong câu.",
          example: {
            zh: "我们的工作时间是固定的。",
            pinyin: "Wǒmen de gōngzuò shíjiān shì gùdìng de.",
            vi: "Thời gian làm việc của chúng tôi là cố định."
          },
          additionalExamples: [
            {
              zh: "请把这个架子固定在墙上。",
              pinyin: "Qǐng bǎ zhè gè jiàzi gùdìng zài qiáng shàng.",
              vi: "Xin hãy cố định chiếc giá này lên tường."
            }
          ]
        }
      },
      {
        keys: ["bắt đầu", "bat dau", "开始", "kaishi", "kāishǐ"],
        data: {
          hanzi: "开始",
          traditional: "開始",
          pinyin: "kāishǐ",
          wordType: "Động từ / Danh từ",
          meaning: "Bắt đầu, khởi đầu",
          detailedMeanings: ["1. Mở đầu một hành động hoặc giai đoạn", "2. Thời điểm khởi đầu"],
          hsk: "HSK 2",
          radical: "女 (Nữ) / 开 (Khai)",
          strokes: 9,
          strokeOrderRules: "Ngang trước sổ sau, phẩy trước mác sau",
          mnemonics: "Chữ 开 mở cổng hai cánh, chữ 始 người phụ nữ mang thai bắt đầu một sinh mệnh mới.",
          synonyms: ["起步", "着手"],
          antonyms: ["结束", "停止", "完成"],
          collocations: ["开始学习", "重新开始", "比赛开始"],
          grammarNotes: "Có thể mang động từ khác làm tân ngữ: 开始工作, 开始下雨.",
          example: {
            zh: "会议马上就要开始了。",
            pinyin: "Huìyì mǎshàng jiù yào kāishǐ le.",
            vi: "Cuộc họp sắp sửa bắt đầu rồi."
          }
        }
      },
      {
        keys: ["kết thúc", "ket thuc", "结束", "jieshu", "jiéshù"],
        data: {
          hanzi: "结束",
          traditional: "結束",
          pinyin: "jiéshù",
          wordType: "Động từ",
          meaning: "Kết thúc, hoàn thành, chấm dứt",
          detailedMeanings: ["1. Dừng lại, kết thúc một công việc hay cuộc họp", "2. Đi đến hồi kết"],
          hsk: "HSK 3",
          radical: "纟 (Mịch)",
          strokes: 11,
          strokeOrderRules: "Trái trước phải sau, trên trước dưới sau",
          mnemonics: "Chữ 结 thắt nút sợi tơ, chữ 束 bó chặt gỗ lại thành một mối tròn trĩnh.",
          synonyms: ["完毕", "停止", "告终"],
          antonyms: ["开始", "起步", "开展"],
          collocations: ["结束工作", "顺利结束", "结束语"],
          grammarNotes: "Thường đứng cuối câu hoặc mang trạng ngữ thời gian.",
          example: {
            zh: "考试终于结束了。",
            pinyin: "Kǎoshì zhōngyú jiéshù le.",
            vi: "Kỳ thi cuối cùng cũng đã kết thúc rồi."
          }
        }
      },
      {
        keys: ["thành công", "thanh cong", "成功", "chenggong", "chénggōng"],
        data: {
          hanzi: "成功",
          traditional: "成功",
          pinyin: "chénggōng",
          wordType: "Tính từ / Động từ / Danh từ",
          meaning: "Thành công, đạt được kết quả mong đợi",
          detailedMeanings: ["1. Đạt được mục tiêu đã đề ra", "2. Sự thành công viên mãn"],
          hsk: "HSK 3",
          radical: "戈 (Qua) / 工 (Công)",
          strokes: 6,
          strokeOrderRules: "Trái trước phải sau, ngoài trước trong sau",
          mnemonics: "Chữ 成 là dùng vũ khí (Qua 戈) lập công, chữ 功 là công sức và sức lực cộng lại.",
          synonyms: ["胜利", "圆满"],
          antonyms: ["失败", "挫折"],
          collocations: ["祝你成功", "获得成功", "取得成功"],
          grammarNotes: "Có thể làm định ngữ (成功的经验) hoặc vị ngữ (实验成功了).",
          example: {
            zh: "只要坚持，你一定会成功的。",
            pinyin: "Zhǐyào jiānchí, nǐ yídìng huì chénggōng de.",
            vi: "Chỉ cần kiên trì, bạn nhất định sẽ thành công."
          }
        }
      },
      {
        keys: ["hạnh phúc", "hanh phuc", "幸福", "xingfu", "xìngfú"],
        data: {
          hanzi: "幸福",
          traditional: "幸福",
          pinyin: "xìngfú",
          wordType: "Tính từ / Danh từ",
          meaning: "Hạnh phúc, sung sướng",
          detailedMeanings: ["1. Trạng thái vui vẻ, mãn nguyện trong cuộc sống", "2. Niềm hạnh phúc"],
          hsk: "HSK 4",
          radical: "干 (Can) / 礻 (Thị)",
          strokes: 8,
          strokeOrderRules: "Trên trước dưới sau, trái trước phải sau",
          mnemonics: "Chữ 幸 thoát khỏi gông cùm, chữ 福 có áo mặc (礻) có ruộng đất (田) ấm no.",
          synonyms: ["快乐", "美满", "甜蜜"],
          antonyms: ["痛苦", "不幸", "悲哀"],
          collocations: ["生活幸福", "祝你幸福", "感到幸福"],
          grammarNotes: "Thường kết hợp với các phó từ chỉ mức độ: 很幸福, 非常幸福.",
          example: {
            zh: "他们一家人生活得非常幸福。",
            pinyin: "Tāmen yì jiā rén shēnghuó de fēicháng xìngfú.",
            vi: "Cả gia đình họ sống rất hạnh phúc."
          }
        }
      }
    ];

    for (const item of instantDB) {
      if (item.keys.some((k) => k === q || k === qNoTone)) {
        return {
          ...item.data,
          query: query,
          source: "instant_dict"
        };
      }
    }

    // Also check APP_DATA.vocabList
    if (window.APP_DATA && Array.isArray(window.APP_DATA.vocabList)) {
      const match = window.APP_DATA.vocabList.find((w) => {
        const h = (w.hanzi || "").toLowerCase();
        const p = (w.pinyin || "").toLowerCase();
        const m = (w.meaning || "").toLowerCase();
        return h === q || p === q || m.includes(q) || (qNoTone && this.removeVietnameseTones(m).includes(qNoTone));
      });
      if (match) {
        return {
          query: query,
          hanzi: match.hanzi,
          traditional: match.traditional || match.hanzi,
          pinyin: match.pinyin,
          wordType: match.wordType || "Từ vựng HSK",
          meaning: match.meaning,
          detailedMeanings: match.detailedMeanings || [match.meaning],
          hsk: match.hsk ? (typeof match.hsk === "number" ? `HSK ${match.hsk}` : match.hsk) : "HSK",
          radical: match.radical || "Đang cập nhật",
          strokes: match.strokes || 8,
          strokeOrderRules: match.strokeOrderRules || "Quy tắc: Ngang trước sổ sau, trên trước dưới sau",
          mnemonics: match.mnemonics || `Ghi nhớ chữ "${match.hanzi}" (${match.pinyin}) có nghĩa là "${match.meaning}".`,
          synonyms: match.synonyms || [match.hanzi],
          antonyms: match.antonyms || [],
          collocations: match.collocations || [`${match.hanzi}常用`, `学习${match.hanzi}`],
          grammarNotes: match.grammarNotes || `Từ "${match.hanzi}" thường dùng trong giao tiếp và đề thi HSK.`,
          example: match.example || {
            zh: `这是一个关于${match.hanzi}的实用例句。`,
            pinyin: `Zhè shì yí gè guānyú ${match.hanzi} de shíyòng lìjù.`,
            vi: `Đây là câu ví dụ ứng dụng thực tế cho từ "${match.hanzi}".`
          },
          additionalExamples: match.additionalExamples || [],
          source: "instant_dict"
        };
      }
    }

    return null;
  },

  // 1. Dictionary Smart Lookup: Ultra-fast AI Analysis (1 - 2 seconds)
  async lookupWordAI(query) {
    const qTrim = (query || "").trim();
    if (!qTrim) throw new Error("Vui lòng nhập từ hoặc câu cần tra cứu!");

    // 1. Check cached lookup first (0ms)
    if (window.StorageService) {
      const cached = window.StorageService.getAiLookupCache(qTrim);
      if (cached && (cached.source === "gemini_ai" || cached.source === "instant_dict")) {
        return cached;
      }
    }

    // 2. Check instant dictionary mapping (0ms)
    const instant = this.findInstantWord(qTrim);
    if (instant) {
      if (window.StorageService) {
        window.StorageService.saveAiLookupItem(instant);
      }
      return instant;
    }

    // 3. Fallback generator if no API key
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return {
        query: qTrim,
        hanzi: qTrim,
        traditional: qTrim,
        pinyin: "pīn yīn",
        wordType: "Từ vựng / Cụm từ",
        meaning: `Nghĩa tra cứu mẫu cho "${qTrim}" (Hãy cấu hình Gemini API Key trong Cài đặt để nhận phân tích chi tiết thời gian thực)`,
        detailedMeanings: [
          `Nghĩa thông dụng trong giao tiếp hàng ngày`,
          `Ứng dụng trong văn cảnh thực tế và thương mại`
        ],
        hsk: "HSK 3",
        radical: "Đang cập nhật",
        strokes: 8,
        strokeOrderRules: "Quy tắc: Ngang trước sổ sau, trên trước dưới sau, ngoài trước trong sau",
        mnemonics: `Mẹo ghi nhớ: Nhớ kỹ cấu trúc âm Pinyin và luyện viết chữ "${qTrim}" nhiều lần để hình thành phản xạ tự nhiên.`,
        synonyms: [`Tương đồng với ${qTrim}`],
        antonyms: [`Trái nghĩa với ${qTrim}`],
        collocations: [`${qTrim}常用`, `学习${qTrim}`, `掌握${qTrim}`],
        grammarNotes: `Từ "${qTrim}" thường được dùng linh hoạt làm định ngữ hoặc vị ngữ trong câu.`,
        example: {
          zh: `这是一个关于${qTrim}的实用例句。`,
          pinyin: `Zhè shì yí gè guānyú ${qTrim} de shíyòng lìjù.`,
          vi: `Đây là câu ví dụ ứng dụng thực tế cho từ "${qTrim}".`
        },
        additionalExamples: [
          {
            zh: `在日常汉语交流中，这个词语非常地道常见。`,
            pinyin: `Zài rìcháng hànyǔ jiāoliú zhōng, zhè gè cíyǔ fēicháng dìdao chángjiàn.`,
            vi: `Trong giao tiếp tiếng Trung hàng ngày, từ ngữ này rất tự nhiên và thường gặp.`
          }
        ],
        source: "offline_mock"
      };
    }

    // 4. Ultra-fast AI Prompt (1 - 2s response target)
    const systemInstruction = `Bạn là đại từ điển Hán-Việt siêu tốc. Phân tích ngôn ngữ học chính xác và trả về DUY NHẤT 1 JSON object cô đọng, không kèm giải thích ngoài JSON.`;

    const prompt = `Phân tích từ/cụm từ: "${qTrim}".
Trả về JSON chuẩn 100%:
{
  "query": "${qTrim}",
  "hanzi": "Chữ Hán giản thể chuẩn (hoặc chữ Hán chuẩn tương ứng nếu người dùng nhập bằng Pinyin hoặc tiếng Việt)",
  "traditional": "Chữ Hán phồn thể",
  "pinyin": "Pinyin chuẩn có dấu thanh",
  "wordType": "Từ loại (Danh từ/Động từ/Tính từ...)",
  "meaning": "Nghĩa tiếng Việt chuẩn xác, súc tích",
  "detailedMeanings": ["Nghĩa thông dụng 1", "Nghĩa mở rộng 2"],
  "hsk": "HSK 1 - HSK 6",
  "radical": "Bộ thủ kèm tên Hán Việt",
  "strokes": 8,
  "strokeOrderRules": "Quy tắc bút thuận",
  "mnemonics": "Mẹo chiết tự nhớ chữ ngắn gọn",
  "synonyms": ["Từ đồng nghĩa 1", "Từ đồng nghĩa 2"],
  "antonyms": ["Từ trái nghĩa 1", "Từ trái nghĩa 2"],
  "collocations": ["Từ ghép hay gặp 1", "Từ ghép 2", "Từ ghép 3"],
  "grammarNotes": "Vị trí trong câu và cách dùng súc tích",
  "example": {
    "zh": "Câu ví dụ giao tiếp thực tế ngắn",
    "pinyin": "Pinyin câu ví dụ",
    "vi": "Dịch tiếng Việt tự nhiên"
  },
  "additionalExamples": [
    {
      "zh": "Câu ví dụ thực tế thứ hai ngắn",
      "pinyin": "Pinyin ví dụ 2",
      "vi": "Dịch tiếng Việt ví dụ 2"
    }
  ]
}`;

    const raw = await this.callGemini(prompt, systemInstruction, {
      temperature: 0.1,
      maxOutputTokens: 600,
      isJson: true,
      timeoutMs: 5000
    });
    const parsed = this.cleanJson(raw);
    parsed.query = qTrim;
    parsed.source = "gemini_ai";

    if (window.StorageService) {
      window.StorageService.saveAiLookupItem(parsed);
    }
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
  async generateChengyuAI(theme = "bất kỳ", category = "chengyu") {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Vui lòng nhập Gemini API Key để tạo thành ngữ / tục ngữ mới cùng điển tích!");
    }

    const typeDesc = category === "proverb" 
      ? "một câu CA DAO hoặc TỤC NGỮ NHÂN SINH (Suyu / Yanyu 俗语・谚语)" 
      : "một câu THÀNH NGỮ ĐIỂN TÍCH 4 CHỮ (Chengyu 成语)";

    const systemInstruction = `Bạn là một nhà nghiên cứu văn hóa văn học cổ điển Trung Hoa. Trả về DUY NHẤT JSON.`;
    const prompt = `Hãy giới thiệu ${typeDesc} của Trung Hoa thật chuẩn mực, nổi tiếng và sâu sắc về chủ đề: "${theme}".
Định dạng JSON chuẩn:
{
  "category": "${category}",
  "hanzi": "${category === "proverb" ? "Câu ca dao / tục ngữ chữ Hán" : "Chính xác 4 chữ Hán thành ngữ"}",
  "pinyin": "Pinyin đầy đủ có dấu thanh điệu",
  "literal": "Dịch nghĩa đen từng chữ",
  "figurative": "Nghĩa bóng, bài học triết lý nhân sinh sâu xa",
  "story": "Kể lại nguồn gốc xuất xứ, câu chuyện / điển tích lịch sử hoặc bối cảnh ngụ ngôn (khoảng 3-4 câu tiếng Việt cuốn hút)",
  "example": {
    "zh": "Câu ví dụ áp dụng trong ngữ cảnh giao tiếp thực tế",
    "pinyin": "Pinyin câu ví dụ",
    "vi": "Dịch tiếng Việt câu ví dụ"
  },
  "tags": ["Chủ đề 1", "Chủ đề 2", "${category === "proverb" ? "Tục ngữ" : "Thành ngữ"}"]
}`;

    const raw = await this.callGemini(prompt, systemInstruction);
    const parsed = this.cleanJson(raw);
    parsed.category = parsed.category || category;
    return parsed;
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
