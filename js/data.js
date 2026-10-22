// Comprehensive Data Repository for Chinese EdTech Application
// HSK 1 - 6 Vocabulary Bank, Chengyu & Proverbs, Exam Questions, Speaking Scenarios

window.APP_DATA = {
  // 1. Comprehensive Vocabulary Bank (Covering HSK 1 - 6 and Hanyu Jiaocheng)
  vocabList: [
    // ==================== HSK 1 (Sơ cấp 1) ====================
    {
      id: "v1_01",
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      meaning: "Xin chào (lời chào phổ biến)",
      hsk: 1,
      radical: "亻 (Nhân đứng) & 女 (Nữ)",
      strokes: 7,
      strokeOrderRules: "Nét phẩy và sổ đứng trước, bao ngoài trước trong sau",
      collocations: ["你好吗 (Bạn khỏe không)", "你们好 (Chào các bạn)"],
      example: {
        zh: "你好，很高兴认识你！",
        pinyin: "Nǐ hǎo, hěn gāoxìng rènshí nǐ!",
        vi: "Xin chào, rất vui được làm quen với bạn!"
      }
    },
    {
      id: "v1_02",
      hanzi: "学习",
      pinyin: "xué xí",
      meaning: "Học tập, học hỏi",
      hsk: 1,
      radical: "子 (Tử) & 习 (Tập)",
      strokes: 8,
      strokeOrderRules: "Chấm trước phẩy sau, trên trước dưới sau",
      collocations: ["学习汉语 (Học tiếng Trung)", "努力学习 (Chăm chỉ học)"],
      example: {
        zh: "我每天都在努力学习汉语。",
        pinyin: "Wǒ měitiān dōu zài nǔlì xuéxí hànyǔ.",
        vi: "Mỗi ngày tôi đều nỗ lực học tiếng Hán."
      }
    },
    {
      id: "v1_03",
      hanzi: "喜欢",
      pinyin: "xǐ huan",
      meaning: "Thích, yêu thích",
      hsk: 1,
      radical: "口 (Khẩu) & 欠 (Khiếm)",
      strokes: 12,
      strokeOrderRules: "Trên trước dưới sau, trái trước phải sau",
      collocations: ["喜欢喝茶 (Thích uống trà)", "很喜欢 (Rất thích)"],
      example: {
        zh: "你喜欢喝中国茶吗？",
        pinyin: "Nǐ xǐhuan hē zhōngguó chá ma?",
        vi: "Bạn có thích uống trà Trung Quốc không?"
      }
    },
    {
      id: "v1_04",
      hanzi: "谢谢",
      pinyin: "xiè xie",
      meaning: "Cảm ơn",
      hsk: 1,
      radical: "讠 (Ngôn) & 身 (Thân)",
      strokes: 12,
      strokeOrderRules: "Trái trước phải sau: Bộ ngôn viết trước",
      collocations: ["不客气 (Không có chi)", "多谢 (Đa tạ)"],
      example: {
        zh: "谢谢老师的耐心帮助。",
        pinyin: "Xièxie lǎoshī de nàixīn bāngzhù.",
        vi: "Cảm ơn sự giúp đỡ kiên nhẫn của thầy cô."
      }
    },
    {
      id: "v1_05",
      hanzi: "看书",
      pinyin: "kàn shū",
      meaning: "Đọc sách, xem sách",
      hsk: 1,
      radical: "目 (Mục) & ⺕ (Kế)",
      strokes: 9,
      strokeOrderRules: "Phẩy trước ngang sau, trên che dưới",
      collocations: ["看书学习 (Đọc sách học tập)", "爱看书 (Thích đọc sách)"],
      example: {
        zh: "我周末经常在图书馆看书。",
        pinyin: "Wǒ zhōumò jīngcháng zài túshūguǎn kàn shū.",
        vi: "Cuối tuần tôi thường đọc sách ở thư viện."
      }
    },
    {
      id: "v1_06",
      hanzi: "喝茶",
      pinyin: "hē chá",
      meaning: "Uống trà",
      hsk: 1,
      radical: "口 (Khẩu) & 艹 (Thảo)",
      strokes: 12,
      strokeOrderRules: "Bộ Khẩu bên trái trước, bộ Thảo trên đầu trước",
      collocations: ["喝绿茶 (Uống trà xanh)", "喝热茶 (Uống trà nóng)"],
      example: {
        zh: "请坐，我们一边喝茶一边聊。",
        pinyin: "Qǐng zuò, wǒmen yìbiān hē chá yìbiān liáo.",
        vi: "Mời ngồi, chúng ta vừa uống trà vừa trò chuyện."
      }
    },
    {
      id: "v1_07",
      hanzi: "家",
      pinyin: "jiā",
      meaning: "Nhà, gia đình",
      hsk: 1,
      radical: "宀 (Miên - Mái nhà)",
      strokes: 10,
      strokeOrderRules: "Mái nhà (bộ Miên) trên cùng viết trước",
      collocations: ["回家 (Về nhà)", "大家 (Mọi người)", "家里人 (Người trong nhà)"],
      example: {
        zh: "我的家在北京，欢迎来做客。",
        pinyin: "Wǒ de jiā zài běijīng, huānyíng lái zuòkè.",
        vi: "Nhà tôi ở Bắc Kinh, hoan nghênh đến chơi."
      }
    },
    {
      id: "v1_08",
      hanzi: "谢谢",
      pinyin: "xiè xie",
      meaning: "Cảm ơn, tạ ơn",
      hsk: 1,
      radical: "讠 (Ngôn) & 身 (Thân)",
      strokes: 12,
      strokeOrderRules: "Bộ Ngôn bên trái viết trước, chữ Thân ở giữa, chữ Thốn bên phải",
      collocations: ["非常感谢 (Vô cùng cảm ơn)", "不用谢 (Không cần cảm ơn/Đừng khách sáo)"],
      example: {
        zh: "太谢谢你了，帮了我这么大一个忙！",
        pinyin: "Tài xièxie nǐ le, bāng le wǒ zhème dà yí gè máng!",
        vi: "Cảm ơn bạn nhiều lắm, đã giúp tôi một việc lớn như vậy!"
      }
    },
    {
      id: "v1_09",
      hanzi: "再见",
      pinyin: "zài jiàn",
      meaning: "Tạm biệt, hẹn gặp lại",
      hsk: 1,
      radical: "冂 (Quynh) & 见 (Kiến)",
      strokes: 6,
      strokeOrderRules: "Ngang trên cùng viết trước, bao ngoài trước trong sau",
      collocations: ["明天见 (Ngày mai gặp lại)", "再见朋友 (Tạm biệt bạn bè)"],
      example: {
        zh: "时间不早了，我们明天学校再见吧！",
        pinyin: "Shíjiān bù zǎo le, wǒmen míngtiān xuéxiào zàijiàn ba!",
        vi: "Thời gian không còn sớm nữa, ngày mai hẹn gặp lại ở trường nhé!"
      }
    },
    {
      id: "v1_10",
      hanzi: "苹果",
      pinyin: "píng guǒ",
      meaning: "Quả táo",
      hsk: 1,
      radical: "艹 (Thảo) & 木 (Mộc)",
      strokes: 8,
      strokeOrderRules: "Bộ Thảo đầu viết trước, phần chữ dưới viết sau",
      collocations: ["吃苹果 (Ăn táo)", "红苹果 (Táo đỏ)"],
      example: {
        zh: "每天吃一个红苹果对身体非常有益。",
        pinyin: "Měitiān chī yí gè hóng píngguǒ duì shēntǐ fēicháng yǒuyì.",
        vi: "Mỗi ngày ăn một quả táo đỏ rất có lợi cho sức khỏe."
      }
    },
    {
      id: "v1_11",
      hanzi: "医生",
      pinyin: "yī shēng",
      meaning: "Bác sĩ, thầy thuốc",
      hsk: 1,
      radical: "匚 (Phương) & 生 (Sinh)",
      strokes: 7,
      strokeOrderRules: "Nét ngang trên trước, phần bên trong, nét gập đáy sau cùng",
      collocations: ["看医生 (Đi khám bác sĩ)", "当医生 (Làm bác sĩ)"],
      example: {
        zh: "我身体有些不舒服，想去医院看医生。",
        pinyin: "Wǒ shēntǐ yǒuxiē bù shūfu, xiǎng qù yīyuàn kàn yīshēng.",
        vi: "Trong người tôi hơi khó chịu, muốn đến bệnh viện khám bác sĩ."
      }
    },
    {
      id: "v1_12",
      hanzi: "朋友",
      pinyin: "péng you",
      meaning: "Bạn bè, bằng hữu",
      hsk: 1,
      radical: "月 (Nguyệt) & 又 (Hựu)",
      strokes: 8,
      strokeOrderRules: "Trái trước phải sau: Bộ Nguyệt trái trước, bộ Nguyệt phải sau",
      collocations: ["好朋友 (Bạn thân)", "老朋友 (Bạn cũ)"],
      example: {
        zh: "我们在北京结识了很多热情的中国朋友。",
        pinyin: "Wǒmen zài běijīng jiéshí le hěn duō rèqíng de zhōngguó péngyou.",
        vi: "Chúng tôi đã quen biết rất nhiều người bạn Trung Quốc nhiệt tình tại Bắc Kinh."
      }
    },

    // ==================== HSK 2 (Sơ cấp 2) ====================
    {
      id: "v2_01",
      hanzi: "旅游",
      pinyin: "lǚ yóu",
      meaning: "Du lịch, đi tham quan",
      hsk: 2,
      radical: "方 (Phương) & 氵 (Thủy)",
      strokes: 10,
      strokeOrderRules: "Bộ Phương viết trước, bộ Thủy bên trái viết trước",
      collocations: ["去旅游 (Đi du lịch)", "旅游景点 (Điểm du lịch)"],
      example: {
        zh: "我和家人打算去北京旅游。",
        pinyin: "Wǒ hé jiārén dǎsuàn qù běijīng lǚyóu.",
        vi: "Tôi cùng gia đình dự định đi Bắc Kinh du lịch."
      }
    },
    {
      id: "v2_02",
      hanzi: "准备",
      pinyin: "zhǔn bèi",
      meaning: "Chuẩn bị, dự định",
      hsk: 2,
      radical: "冫 (Băng) & 夂 (Tuy)",
      strokes: 10,
      strokeOrderRules: "Trái trước phải sau: Bộ băng viết trước",
      collocations: ["准备考试 (Chuẩn bị thi)", "准备好 (Chuẩn bị xong)"],
      example: {
        zh: "你准备好明天的汉语考试了吗？",
        pinyin: "Nǐ zhǔnbèi hǎo míngtiān de hànyǔ kǎoshì le ma?",
        vi: "Bạn đã chuẩn bị xong cho bài thi tiếng Hán ngày mai chưa?"
      }
    },
    {
      id: "v2_03",
      hanzi: "跑步",
      pinyin: "pǎo bù",
      meaning: "Chạy bộ",
      hsk: 2,
      radical: "足 (Túc) & 止 (Chỉ)",
      strokes: 12,
      strokeOrderRules: "Bộ Túc bên trái chỉ đôi chân viết trước",
      collocations: ["晨跑 (Chạy bộ buổi sáng)", "每天跑步 (Chạy bộ mỗi ngày)"],
      example: {
        zh: "他每天早晨六点去公园跑步。",
        pinyin: "Tā měitiān zǎochén liù diǎn qù gōngyuán pǎobù.",
        vi: "Anh ấy mỗi sáng 6 giờ đều đến công viên chạy bộ."
      }
    },
    {
      id: "v2_04",
      hanzi: "运动",
      pinyin: "yùn dòng",
      meaning: "Vận động, thể thao",
      hsk: 2,
      radical: "辶 (Xước) & 力 (Lực)",
      strokes: 7,
      strokeOrderRules: "Viết phần thân chữ bên trong trước, bộ Xước bao ngoài sau",
      collocations: ["参加运动 (Tham gia thể thao)", "体育运动 (Môn thể thao)"],
      example: {
        zh: "经常运动有利于身体健康。",
        pinyin: "Jīngcháng yùndòng yǒulì yú shēntǐ jiànkāng.",
        vi: "Thường xuyên vận động rất có lợi cho sức khỏe."
      }
    },
    {
      id: "v2_05",
      hanzi: "帮助",
      pinyin: "bāng zhù",
      meaning: "Giúp đỡ, tương trợ",
      hsk: 2,
      radical: "巾 (Cân) & 力 (Lực)",
      strokes: 9,
      strokeOrderRules: "Trên trước dưới sau, trái trước phải sau",
      collocations: ["互相帮助 (Tương trợ lẫn nhau)", "热情帮助 (Nhiệt tình giúp)"],
      example: {
        zh: "在学习中，同学们应该互相帮助。",
        pinyin: "Zài xuéxí zhōng, tóngxuémen yīnggāi hùxiāng bāngzhù.",
        vi: "Trong học tập, các bạn học nên giúp đỡ lẫn nhau."
      }
    },
    {
      id: "v2_06",
      hanzi: "已经",
      pinyin: "yǐ jīng",
      meaning: "Đã, rồi (biểu thị hoàn thành)",
      hsk: 2,
      radical: "巳 (Tị) & 纟 (Mịch)",
      strokes: 3,
      strokeOrderRules: "Nét gập ngang sổ hất trước, nét phẩy sau",
      collocations: ["已经好了 (Đã xong rồi)", "已经到了 (Đã đến nơi)"],
      example: {
        zh: "我已经完成了今天的汉语学习任务。",
        pinyin: "Wǒ yǐjīng wánchéng le jīntiān de hànyǔ xuéxí rènwù.",
        vi: "Tôi đã hoàn thành xong nhiệm vụ học tiếng Hán của ngày hôm nay."
      }
    },
    {
      id: "v2_07",
      hanzi: "便宜",
      pinyin: "pián yi",
      meaning: "Rẻ, giá cả hợp lý",
      hsk: 2,
      radical: "亻 (Nhân đứng) & 宀 (Miên)",
      strokes: 9,
      strokeOrderRules: "Bộ Nhân đứng bên trái viết trước",
      collocations: ["太便宜了 (Rẻ quá)", "便宜一点 (Rẻ hơn một chút)"],
      example: {
        zh: "这件衣服不仅质量好，而且价格很便宜。",
        pinyin: "Zhè jiàn yīfu bùjǐn zhìliàng hǎo, érqiě jiàgé hěn piányi.",
        vi: "Bộ quần áo này không chỉ chất lượng tốt mà giá cả lại rất rẻ."
      }
    },
    {
      id: "v2_08",
      hanzi: "晴天",
      pinyin: "qíng tiān",
      meaning: "Trời nắng, trời quang đãng",
      hsk: 2,
      radical: "日 (Nhật) & 大 (Đại)",
      strokes: 12,
      strokeOrderRules: "Bộ Nhật (mặt trời) bên trái viết trước",
      collocations: ["明天是晴天 (Ngày mai trời nắng)", "晴朗的天气 (Thời tiết nắng ráo)"],
      example: {
        zh: "今天是个大晴天，我们一起去公园散步吧。",
        pinyin: "Jīntiān shì gè dà qíngtiān, wǒmen yìqǐ qù gōngyuán sànbù ba.",
        vi: "Hôm nay là một ngày nắng đẹp trời, chúng ta cùng nhau đi công viên dạo bộ nhé."
      }
    },
    {
      id: "v2_09",
      hanzi: "唱歌",
      pinyin: "chàng gē",
      meaning: "Ca hát, hát",
      hsk: 2,
      radical: "口 (Khẩu) & 欠 (Khiếm)",
      strokes: 11,
      strokeOrderRules: "Bộ Khẩu (miệng) bên trái chữ Xướng viết trước",
      collocations: ["喜欢唱歌 (Thích hát)", "唱中文歌 (Hát bài hát tiếng Trung)"],
      example: {
        zh: "她不仅普通话说得好，中文歌也唱得非常动听。",
        pinyin: "Tā bùjǐn pǔtōnghuà shuō de hǎo, zhōngwén gē yě chàng de fēicháng dòngtīng.",
        vi: "Cô ấy không chỉ nói tiếng phổ thông giỏi mà hát nhạc Trung cũng rất hay."
      }
    },
    {
      id: "v2_10",
      hanzi: "穿衣服",
      pinyin: "chuān yī fu",
      meaning: "Mặc quần áo",
      hsk: 2,
      radical: "穴 (Huyệt) & 衣 (Y)",
      strokes: 9,
      strokeOrderRules: "Bộ Huyệt trên đầu viết trước",
      collocations: ["穿新衣服 (Mặc đồ mới)", "快穿衣服 (Mau mặc áo quần vào)"],
      example: {
        zh: "外边天气转凉了，出门记得多穿衣服。",
        pinyin: "Wàibiān tiānqì zhuǎn liáng le, chūmén jìde duō chuān yīfu.",
        vi: "Thời tiết ngoài trời trở lạnh rồi, ra ngoài nhớ mặc thêm nhiều áo ấm nhé."
      }
    },

    // ==================== HSK 3 (Trung cấp sơ) ====================
    {
      id: "v3_01",
      hanzi: "解决",
      pinyin: "jiě jué",
      meaning: "Giải quyết, dàn xếp",
      hsk: 3,
      radical: "角 (Giác) & 冫 (Băng)",
      strokes: 13,
      strokeOrderRules: "Trái trước phải sau: Bộ Giác bên trái viết trước",
      collocations: ["解决问题 (Giải quyết vấn đề)", "圆满解决 (Giải quyết ổn thỏa)"],
      example: {
        zh: "我们必须尽快找到解决这个问题的办法。",
        pinyin: "Wǒmen bìxū jǐnkuài zhǎodào jiějué zhège wèntí de bànfǎ.",
        vi: "Chúng ta phải nhanh chóng tìm ra cách giải quyết vấn đề này."
      }
    },
    {
      id: "v3_02",
      hanzi: "环境",
      pinyin: "huán jìng",
      meaning: "Môi trường, hoàn cảnh",
      hsk: 3,
      radical: "王 (Vương/Ngọc) & 土 (Thổ)",
      strokes: 8,
      strokeOrderRules: "Bộ Ngọc bên trái, bộ Thổ bên trái chữ Cảnh",
      collocations: ["保护环境 (Bảo vệ môi trường)", "工作环境 (Môi trường làm việc)"],
      example: {
        zh: "为了下一代，我们应该保护自然环境。",
        pinyin: "Wèile xià yī dài, wǒmen yīnggāi bǎohù zìrán huánjìng.",
        vi: "Vì thế hệ tương lai, chúng ta nên bảo vệ môi trường tự nhiên."
      }
    },
    {
      id: "v3_03",
      hanzi: "机会",
      pinyin: "jī huì",
      meaning: "Cơ hội, dịp may",
      hsk: 3,
      radical: "木 (Mộc) & 人 (Nhân)",
      strokes: 4,
      strokeOrderRules: "Bộ Mộc viết trước: Ngang, sổ, phẩy, chấm",
      collocations: ["抓住机会 (Nắm bắt cơ hội)", "难得的机会 (Cơ hội hiếm có)"],
      example: {
        zh: "这是一个很难得的工作机会，你一定要把握住。",
        pinyin: "Zhè shì yí gè hěn nándé de gōngzuò jīhuì, nǐ yídìng yào bǎwò zhù.",
        vi: "Đây là một cơ hội việc làm rất hiếm có, bạn nhất định phải nắm bắt lấy."
      }
    },
    {
      id: "v3_04",
      hanzi: "习惯",
      pinyin: "xí guàn",
      meaning: "Thói quen, tập quán, quen với",
      hsk: 3,
      radical: "习 (Tập) & 忄 (Tâm đứng)",
      strokes: 11,
      strokeOrderRules: "Bộ Tâm đứng bên trái chữ Quán viết trước",
      collocations: ["养成习惯 (Nuôi dưỡng thói quen)", "生活习惯 (Thói quen sinh hoạt)"],
      example: {
        zh: "早睡早起是一个非常好的生活习惯。",
        pinyin: "Zǎoshuì zǎoqǐ shì yí gè fēicháng hǎo de shēnghuó xíguàn.",
        vi: "Ngủ sớm dậy sớm là một thói quen sinh hoạt rất tốt."
      }
    },
    {
      id: "v3_05",
      hanzi: "提高",
      pinyin: "tí gāo",
      meaning: "Nâng cao, cải thiện",
      hsk: 3,
      radical: "扌 (Thủ) & 高 (Cao)",
      strokes: 12,
      strokeOrderRules: "Bộ Thủ (tay) viết trước: Ngang, móc đứng, hất",
      collocations: ["提高水平 (Nâng cao trình độ)", "提高效率 (Tăng hiệu suất)"],
      example: {
        zh: "多看中文电影可以有效提高听力水平。",
        pinyin: "Duō kàn zhōngwén diànyǐng kěyǐ yǒuxiào tígāo tīnglì shuǐpíng.",
        vi: "Xem nhiều phim tiếng Trung có thể nâng cao trình độ nghe hiệu quả."
      }
    },
    {
      id: "v3_06",
      hanzi: "热情",
      pinyin: "rè qíng",
      meaning: "Nhiệt tình, niềm nở, hiếu khách",
      hsk: 3,
      radical: "灬 (Hỏa) & 忄 (Tâm đứng)",
      strokes: 10,
      strokeOrderRules: "Bốn chấm hỏa ở đáy chữ Nhiệt viết sau cùng",
      collocations: ["热情待客 (Niềm nở đón khách)", "非常热情 (Rất nhiệt tình)"],
      example: {
        zh: "中国人非常热情好客，给我们留下了深刻印象。",
        pinyin: "Zhōngguó rén fēicháng rèqíng hàokè, gěi wǒmen liú xià le shēnkè yìnxiàng.",
        vi: "Người Trung Quốc rất nhiệt tình và hiếu khách, để lại ấn tượng sâu sắc cho chúng tôi."
      }
    },
    {
      id: "v3_07",
      hanzi: "经理",
      pinyin: "jīng lǐ",
      meaning: "Giám đốc, người quản lý",
      hsk: 3,
      radical: "纟 (Mịch) & 王 (Vương)",
      strokes: 8,
      strokeOrderRules: "Bộ Mịch bên trái chữ Kinh viết trước",
      collocations: ["部门经理 (Giám đốc bộ phận)", "总公司经理 (Tổng giám đốc công ty)"],
      example: {
        zh: "张经理正在会议室和外宾洽谈业务。",
        pinyin: "Zhāng jīnglǐ zhèngzài huìyìshì hé wàibīn qiàtán yèwù.",
        vi: "Giám đốc Trương đang ở trong phòng họp thảo luận công việc với khách nước ngoài."
      }
    },
    {
      id: "v3_08",
      hanzi: "愿意",
      pinyin: "yuàn yì",
      meaning: "Bằng lòng, sẵn lòng, nguyện ý",
      hsk: 3,
      radical: "心 (Tâm) & 音 (Âm)",
      strokes: 14,
      strokeOrderRules: "Bộ Tâm ở đáy chữ Nguyện viết sau",
      collocations: ["非常愿意 (Rất sẵn lòng)", "愿意帮忙 (Sẵn lòng giúp đỡ)"],
      example: {
        zh: "如果需要，我很愿意为你提供力所能及的帮助。",
        pinyin: "Rúguǒ xūyào, wǒ hěn yuànyì wèi nǐ tígōng lìsuǒnéngjí de bāngzhù.",
        vi: "Nếu cần thiết, tôi rất sẵn lòng cung cấp sự giúp đỡ trong khả năng của mình."
      }
    },
    {
      id: "v3_09",
      hanzi: "简单",
      pinyin: "jiǎn dān",
      meaning: "Đơn giản, dễ hiểu",
      hsk: 3,
      radical: "竹 (Trúc) & 十 (Thập)",
      strokes: 11,
      strokeOrderRules: "Bộ Trúc trên đầu viết trước",
      collocations: ["简单明了 (Đơn giản rõ ràng)", "生活简单 (Cuộc sống giản dị)"],
      example: {
        zh: "这个问题其实很简单，只要用心就能想明白。",
        pinyin: "Zhège wèntí qíshí hěn jiǎndān, zhǐyào yòngxīn jiù néng xiǎng míngbai.",
        vi: "Vấn đề này thực ra rất đơn giản, chỉ cần để tâm là có thể hiểu ra."
      }
    },
    {
      id: "v3_10",
      hanzi: "聪明",
      pinyin: "cōng ming",
      meaning: "Thông minh, lanh lợi",
      hsk: 3,
      radical: "耳 (Nhĩ) & 日 (Nhật)",
      strokes: 14,
      strokeOrderRules: "Bộ Nhĩ (tai) bên trái viết trước",
      collocations: ["聪明伶俐 (Thông minh lanh lợi)", "聪明能干 (Thông minh tháo vát)"],
      example: {
        zh: "这个小女孩非常聪明，学什么都特别快。",
        pinyin: "Zhège xiǎo nǚhái fēicháng cōngming, xué shénme dōu tèbié kuài.",
        vi: "Cô bé này rất thông minh, học cái gì cũng đều đặc biệt nhanh."
      }
    },

    // ==================== HSK 4 (Trung cấp) ====================
    {
      id: "v4_01",
      hanzi: "坚持",
      pinyin: "jiān chí",
      meaning: "Kiên trì, giữ vững",
      hsk: 4,
      radical: "土 (Thổ) & 扌 (Thủ)",
      strokes: 9,
      strokeOrderRules: "Ngang trước sổ sau, bộ Thổ viết trước",
      collocations: ["坚持到底 (Kiên trì đến cùng)", "坚持不懈 (Kiên trì không nản)"],
      example: {
        zh: "只要坚持努力，你就一定会取得成功。",
        pinyin: "Zhǐyào jiānchí nǔlì, nǐ jiù yídìng huì qǔdé chénggōng.",
        vi: "Chỉ cần kiên trì nỗ lực, bạn nhất định sẽ đạt được thành công."
      }
    },
    {
      id: "v4_02",
      hanzi: "积累",
      pinyin: "jī lěi",
      meaning: "Tích lũy, dồn lại",
      hsk: 4,
      radical: "禾 (Hòa) & 糸 (Mịch)",
      strokes: 16,
      strokeOrderRules: "Bộ Hòa bên trái chữ Tích viết trước",
      collocations: ["积累经验 (Tích lũy kinh nghiệm)", "积累知识 (Tích lũy kiến thức)"],
      example: {
        zh: "在工作中，我们要不断积累宝贵的实践经验。",
        pinyin: "Zài gōngzuò zhōng, wǒmen yào búduàn jīlěi bǎoguì de shíjiàn jīngyàn.",
        vi: "Trong công việc, chúng ta cần không ngừng tích lũy kinh nghiệm thực tiễn quý báu."
      }
    },
    {
      id: "v4_03",
      hanzi: "交流",
      pinyin: "jiāo liú",
      meaning: "Giao lưu, trao đổi",
      hsk: 4,
      radical: "亠 (Đầu) & 氵 (Thủy)",
      strokes: 6,
      strokeOrderRules: "Bộ Đầu viết trước: Chấm, ngang dài, phẩy, mác",
      collocations: ["文化交流 (Giao lưu văn hóa)", "相互交流 (Trao đổi lẫn nhau)"],
      example: {
        zh: "多和中国朋友交流能快速提高口语水平。",
        pinyin: "Duō hé zhōngguó péngyou jiāoliú néng kuàisù tígāo kǒuyǔ shuǐpíng.",
        vi: "Giao lưu nhiều với bạn bè Trung Quốc có thể nâng cao trình độ khẩu ngữ nhanh chóng."
      }
    },
    {
      id: "v4_04",
      hanzi: "负责",
      pinyin: "fù zé",
      meaning: "Chịu trách nhiệm, phụ trách",
      hsk: 4,
      radical: "亻 (Nhân đứng) & 贝 (Bối)",
      strokes: 9,
      strokeOrderRules: "Bộ Nhân đứng bên trái viết trước",
      collocations: ["认真负责 (Nghiêm túc trách nhiệm)", "对工作负责 (Chịu trách nhiệm với công việc)"],
      example: {
        zh: "他对工作认真负责，赢得了大家的好评。",
        pinyin: "Tā duì gōngzuò rènzhēn fùzé, yíngdé le dàjiā de hǎopíng.",
        vi: "Anh ấy làm việc nghiêm túc và có trách nhiệm, nhận được đánh giá cao từ mọi người."
      }
    },
    {
      id: "v4_05",
      hanzi: "流利",
      pinyin: "liú lì",
      meaning: "Lưu loát, trôi chảy",
      hsk: 4,
      radical: "氵 (Thủy) & 刂 (Đao đứng)",
      strokes: 10,
      strokeOrderRules: "Ba chấm thủy bên trái viết trước",
      collocations: ["口语流利 (Khẩu ngữ trôi chảy)", "表达流利 (Diễn đạt lưu loát)"],
      example: {
        zh: "经过长期的刻苦练习，他能说一口流利的普通话。",
        pinyin: "Jīngguò chángqī de kèkǔ liànxí, tā néng shuō yì kǒu liúlì de pǔtōnghuà.",
        vi: "Trải qua thời gian dài khổ luyện, anh ấy đã nói được tiếng phổ thông lưu loát."
      }
    },
    {
      id: "v4_06",
      hanzi: "无论",
      pinyin: "wú lùn",
      meaning: "Bất luận, dù cho, cho dù",
      hsk: 4,
      radical: "一 (Nhất) & 讠 (Ngôn)",
      strokes: 4,
      strokeOrderRules: "Ngang trên cùng viết trước",
      collocations: ["无论如何 (Bất luận thế nào/Bằng mọi giá)", "无论多难 (Cho dù khó khăn đến đâu)"],
      example: {
        zh: "无论遇到多么大的困难，我们都决不能轻言放弃。",
        pinyin: "Wúlùn yù dào duōme dà de kùnnán, wǒmen dōu jué bù néng qīng yán fàngqì.",
        vi: "Bất luận gặp phải khó khăn lớn đến đâu, chúng ta cũng quyết không được dễ dàng từ bỏ."
      }
    },
    {
      id: "v4_07",
      hanzi: "关键",
      pinyin: "guān jiàn",
      meaning: "Then chốt, mấu chốt, điểm cốt lõi",
      hsk: 4,
      radical: "门 (Môn) & 钅 (Kim)",
      strokes: 6,
      strokeOrderRules: "Bộ Môn viết ngoài trước trong sau",
      collocations: ["关键时刻 (Giờ phút then chốt)", "起关键作用 (Đóng vai trò mấu chốt)"],
      example: {
        zh: "学好语言的关键在于日常坚持不懈地多听多说。",
        pinyin: "Xué hǎo yǔyán de guānjiàn zàiyú rìcháng jiānchíbúxiè de duō tīng duō shuō.",
        vi: "Mấu chốt để học giỏi một ngôn ngữ nằm ở việc kiên trì nghe nhiều nói nhiều mỗi ngày."
      }
    },
    {
      id: "v4_08",
      hanzi: "压力",
      pinyin: "yā lì",
      meaning: "Áp lực, sự căng thẳng",
      hsk: 4,
      radical: "厂 (Hán) & 力 (Lực)",
      strokes: 6,
      strokeOrderRules: "Ngang trên cùng của chữ Áp trước, phẩy sau",
      collocations: ["缓解压力 (Giải tỏa áp lực)", "工作压力 (Áp lực công việc)"],
      example: {
        zh: "适度的压力可以成为推动我们不断前进的动力。",
        pinyin: "Shìdù de yālì kěyǐ chéngwéi tuīdòng wǒmen búduàn qiánjìn de dònglì.",
        vi: "Áp lực vừa phải có thể trở thành động lực thúc đẩy chúng ta không ngừng tiến về phía trước."
      }
    },
    {
      id: "v4_09",
      hanzi: "成功",
      pinyin: "chéng gōng",
      meaning: "Thành công, thắng lợi",
      hsk: 4,
      radical: "戈 (Qua) & 力 (Lực)",
      strokes: 6,
      strokeOrderRules: "Phẩy trước, ngang gập móc, nét móc dài qua sau cùng",
      collocations: ["取得成功 (Đạt được thành công)", "祝你成功 (Chúc bạn thành công)"],
      example: {
        zh: "每一个成功的背后，都凝聚着无数默默付出的汗水。",
        pinyin: "Měi yí gè chénggōng de bèihòu, dōu níngjù zhe wúshù mòmò fùchū de hànshuǐ.",
        vi: "Đằng sau mỗi thành công đều kết tinh từ vô số mồ hôi thầm lặng cống hiến."
      }
    },
    {
      id: "v4_10",
      hanzi: "态度",
      pinyin: "tài du",
      meaning: "Thái độ, cách nhìn nhận",
      hsk: 4,
      radical: "心 (Tâm) & 广 (Quảng)",
      strokes: 8,
      strokeOrderRules: "Bộ Tâm ở đáy chữ Thái viết sau cùng",
      collocations: ["工作态度 (Thái độ làm việc)", "积极的态度 (Thái độ tích cực)"],
      example: {
        zh: "积极乐观的生活态度能帮助我们战胜一切困难。",
        pinyin: "Jījí lèguān de shēnghuó tàidù néng bāngzhù wǒmen zhànshèng yíqiè kùnnán.",
        vi: "Thái độ sống tích cực lạc quan có thể giúp chúng ta chiến thắng mọi gian khó."
      }
    },

    // ==================== HSK 5 (Cao cấp) ====================
    {
      id: "v5_01",
      hanzi: "掌握",
      pinyin: "zhǎng wò",
      meaning: "Nắm vững, làm chủ",
      hsk: 5,
      radical: "扌 (Thủ) & 扌 (Thủ)",
      strokes: 11,
      strokeOrderRules: "Bộ Thủ (tay) viết trước cả hai chữ",
      collocations: ["掌握知识 (Nắm vững kiến thức)", "掌握主动权 (Nắm quyền chủ động)"],
      example: {
        zh: "熟练掌握一门外语需要付出长期的时间与精力。",
        pinyin: "Shúliàn zhǎngwò yī mén wàiyǔ xūyào fùchū chángqī de shíjiān yǔ jīnglì.",
        vi: "Nắm vững thành thạo một ngoại ngữ đòi hỏi phải bỏ ra nhiều thời gian và công sức."
      }
    },
    {
      id: "v5_02",
      hanzi: "挑战",
      pinyin: "tiǎo zhàn",
      meaning: "Thử thách, thách thức",
      hsk: 5,
      radical: "扌 (Thủ) & 戈 (Qua)",
      strokes: 9,
      strokeOrderRules: "Trái trước phải sau, phẩy trước mác sau",
      collocations: ["迎接挑战 (Đón nhận thử thách)", "充满挑战 (Tràn đầy thách thức)"],
      example: {
        zh: "面对新环境的挑战，我们要保持乐观的心态。",
        pinyin: "Miànduì xīn huánjìng de tiǎozhàn, wǒmen yào bǎochí lèguān de xīntài.",
        vi: "Đối mặt với thử thách của môi trường mới, chúng ta cần duy trì tâm thế lạc quan."
      }
    },
    {
      id: "v5_03",
      hanzi: "逻辑",
      pinyin: "luó ji",
      meaning: "Logic, tính mạch lạc",
      hsk: 5,
      radical: "纟 (Mịch) & 禾 (Hòa)",
      strokes: 11,
      strokeOrderRules: "Bộ Mịch bên trái viết trước",
      collocations: ["逻辑思维 (Tư duy logic)", "符合逻辑 (Phù hợp logic)"],
      example: {
        zh: "这篇文章论点鲜明，逻辑十分严谨。",
        pinyin: "Zhè piān wénzhāng lùndiǎn xiānmíng, luójí shífēn yánjǐn.",
        vi: "Bài viết này luận điểm rõ ràng, tư duy logic rất chặt chẽ."
      }
    },
    {
      id: "v5_04",
      hanzi: "深刻",
      pinyin: "shēn kè",
      meaning: "Sâu sắc, sâu đậm",
      hsk: 5,
      radical: "氵 (Thủy) & 刂 (Đao đứng)",
      strokes: 11,
      strokeOrderRules: "Bộ Thủy bên trái viết trước, bộ Đao đứng bên phải viết sau",
      collocations: ["印象深刻 (Ấn tượng sâu sắc)", "深刻的教训 (Bài học sâu sắc)"],
      example: {
        zh: "这次旅行给我留下了极其深刻美好的印象。",
        pinyin: "Zhè cì lǚxíng gěi wǒ liú xià le jíqí shēnkè měihǎo de yìnxiàng.",
        vi: "Chuyến đi lần này để lại cho tôi ấn tượng vô cùng sâu sắc và tốt đẹp."
      }
    },
    {
      id: "v5_05",
      hanzi: "独特",
      pinyin: "dú tè",
      meaning: "Độc đáo, đặc sắc riêng biệt",
      hsk: 5,
      radical: "犭 (Khuyển) & 牛 (Ngưu)",
      strokes: 9,
      strokeOrderRules: "Bộ Khuyển bên trái viết trước",
      collocations: ["独特的风格 (Phong cách độc đáo)", "独特见解 (Quan điểm độc đáo)"],
      example: {
        zh: "这位画家的作品展现出独特的艺术魅力。",
        pinyin: "Zhè wèi huàjiā de zuòpǐn zhǎnxiàn chū dútè de yìshù mèilì.",
        vi: "Tác phẩm của họa sĩ này thể hiện sức hút nghệ thuật độc đáo."
      }
    },
    {
      id: "v5_06",
      hanzi: "甚至",
      pinyin: "shèn zhì",
      meaning: "Thậm chí, ngay cả",
      hsk: 5,
      radical: "甘 (Cam) & 至 (Chí)",
      strokes: 9,
      strokeOrderRules: "Bộ Cam bên trái viết trước",
      collocations: ["甚至连...也 (Thậm chí ngay cả... cũng)", "不仅如此甚至 (Không những vậy thậm chí)"],
      example: {
        zh: "他不仅熟悉中国文化，甚至能背诵很多经典古诗。",
        pinyin: "Tā bùjǐn shúxī zhōngguó wénhuà, shènzhì néng bèisòng hěn duō jīngdiǎn gǔshī.",
        vi: "Anh ấy không chỉ am hiểu văn hóa Trung Hoa, thậm chí còn có thể ngâm thuộc lòng nhiều bài thơ cổ kinh điển."
      }
    },
    {
      id: "v5_07",
      hanzi: "挑战",
      pinyin: "tiǎo zhàn",
      meaning: "Thách thức, thử thách",
      hsk: 5,
      radical: "扌 (Thủ) & 戈 (Qua)",
      strokes: 9,
      strokeOrderRules: "Bộ Thủ (tay) bên trái chữ Khiêu viết trước",
      collocations: ["迎接挑战 (Đón nhận thử thách)", "充满挑战 (Tràn đầy thách thức)"],
      example: {
        zh: "面对未知的困难，我们要敢于迎接各种崭新的挑战。",
        pinyin: "Miànduì wèizhī de kùnnán, wǒmen yào gǎnyú yíngjiē gè zhǒng zhǎnxīn de tiǎozhàn.",
        vi: "Đối mặt với những gian khó phía trước, chúng ta phải dám đón nhận muôn vàn thử thách mới mẻ."
      }
    },
    {
      id: "v5_08",
      hanzi: "珍惜",
      pinyin: "zhēn xī",
      meaning: "Trân trọng, quý trọng, giữ gìn",
      hsk: 5,
      radical: "王 (Ngọc) & 忄 (Tâm đứng)",
      strokes: 10,
      strokeOrderRules: "Bộ Ngọc bên trái chữ Trân viết trước",
      collocations: ["珍惜时间 (Trân quý thời gian)", "珍惜友谊 (Trân trọng tình bạn)"],
      example: {
        zh: "青春一去不复返，我们应当加倍珍惜宝贵的光阴。",
        pinyin: "Qīngchūn yí qù bú fù fǎn, wǒmen yīngdāng jiābèi zhēnxī bǎoguì de guāngyīn.",
        vi: "Thanh xuân một đi không trở lại, chúng ta phải trân trọng gấp bội từng tấc thời gian quý giá."
      }
    },
    {
      id: "v5_09",
      hanzi: "启发",
      pinyin: "qǐ fā",
      meaning: "Gợi mở, truyền cảm hứng, gợi ý",
      hsk: 5,
      radical: "户 (Hộ) & 癶 (Bát)",
      strokes: 7,
      strokeOrderRules: "Bộ Hộ bên ngoài chữ Khải viết trước",
      collocations: ["深受启发 (Nhận được sự gợi mở sâu sắc)", "得到启发 (Được truyền cảm hứng)"],
      example: {
        zh: "导师的一番深刻话语给了我们极大的智慧启发。",
        pinyin: "Dǎoshī de yì fān shēnkè huàyǔ gěi le wǒmen jí dà de zhìhuì qǐfā.",
        vi: "Lời chia sẻ sâu sắc của người thầy đã đem lại cho chúng tôi nguồn cảm hứng trí tuệ to lớn."
      }
    },
    {
      id: "v5_10",
      hanzi: "把握",
      pinyin: "bǎ wò",
      meaning: "Nắm bắt (cơ hội), nắm chắc",
      hsk: 5,
      radical: "扌 (Thủ) & 扌 (Thủ)",
      strokes: 7,
      strokeOrderRules: "Bộ Thủ bên trái chữ Bả viết trước",
      collocations: ["把握机遇 (Nắm bắt thời cơ)", "很有把握 (Rất nắm chắc)"],
      example: {
        zh: "时代在飞速发展，只有敏锐把握机遇的人才能脱颖而出。",
        pinyin: "Shídài zài fēisù fāzhǎn, zhǐyǒu mǐnruì bǎwò jīyù de rén cáinéng tuōyǐng-érchū.",
        vi: "Thời đại đang phát triển thần tốc, chỉ người nhạy bén nắm bắt cơ hội mới có thể bứt phá vươn lên."
      }
    },

    // ==================== HSK 6 (Thành thạo) ====================
    {
      id: "v6_01",
      hanzi: "潜移默化",
      pinyin: "qián yí mò huà",
      meaning: "Thấm dần, ngấm dần từng chút một (ảnh hưởng ngấm ngầm)",
      hsk: 6,
      radical: "氵 (Thủy) & 匕 (Chủy)",
      strokes: 15,
      strokeOrderRules: "Trái trước phải sau, trên trước dưới sau",
      collocations: ["潜移默化的影响 (Tác động ngấm ngầm)", "受到熏陶 (Được hun đúc)"],
      example: {
        zh: "家庭文化氛围对孩子的性格起着潜移默化的塑造作用。",
        pinyin: "Jiātíng wénhuà fēnwéi duì háizi de xìnggé qǐ zhe qiányí-mòhuà de sùzào zuòyòng.",
        vi: "Bầu không khí văn hóa gia đình có tác dụng thẩm thấu âm thầm định hình tính cách đứa trẻ."
      }
    },
    {
      id: "v6_02",
      hanzi: "渊博",
      pinyin: "yuān bó",
      meaning: "Uyên bác, sâu rộng (học vấn)",
      hsk: 6,
      radical: "氵 (Thủy) & 十 (Thập)",
      strokes: 11,
      strokeOrderRules: "Bộ Thủy bên trái viết trước",
      collocations: ["学识渊博 (Học thức uyên bác)", "见闻渊博 (Hiểu biết sâu rộng)"],
      example: {
        zh: "李教授学识渊博，深受全体师生的爱戴与钦佩。",
        pinyin: "Lǐ jiàoshòu xuéshì yuānbó, shēn shòu quántǐ shīshēng de àidài yǔ qīnpèi.",
        vi: "Giáo sư Lý học thức uyên bác, nhận được sự kính trọng và ngưỡng mộ sâu sắc từ toàn thể giảng viên sinh viên."
      }
    },
    {
      id: "v6_03",
      hanzi: "精益求精",
      pinyin: "jīng yì qiú jīng",
      meaning: "Đã tinh xảo lại muốn tinh xảo hơn, luôn cầu tiến hoàn hảo",
      hsk: 6,
      radical: "米 (Mễ) & 皿 (Mãnh)",
      strokes: 14,
      strokeOrderRules: "Bộ Mễ bên trái chữ Tinh viết trước",
      collocations: ["精益求精的精神 (Tinh thần không ngừng hoàn thiện)", "追求卓越 (Theo đuổi sự xuất sắc)"],
      example: {
        zh: "大国工匠在工艺上始终坚持精益求精的态度。",
        pinyin: "Dàguó gōngjiàng zài gōngyì shàng shǐzhōng jiānchí jīngyì-qiújīng de tàidù.",
        vi: "Những nghệ nhân bậc thầy luôn giữ vững thái độ tinh hoa cầu tinh túy trong từng đường nét thủ công."
      }
    },
    {
      id: "v6_04",
      hanzi: "络绎不绝",
      pinyin: "luò yì bù jué",
      meaning: "Nườm nượp không ngớt, liên miên liên tục",
      hsk: 6,
      radical: "纟 (Mịch) & 纟 (Mịch)",
      strokes: 9,
      strokeOrderRules: "Bộ Mịch bên trái viết trước cả hai chữ Lạc và Dịch",
      collocations: ["游人络绎不绝 (Du khách nườm nượp)", "车马络绎不绝 (Xe cộ dập dìu)"],
      example: {
        zh: "节假日的故宫博物院前，中外游客络绎不绝。",
        pinyin: "Jiéjiàrì de gùgōng bówùyuàn qián, zhōngwài yóukè luòyì-bùjué.",
        vi: "Trước Bảo tàng Cố Cung vào ngày lễ tết, du khách trong và ngoài nước nườm nượp không ngớt."
      }
    },
    {
      id: "v6_05",
      hanzi: "脍炙人口",
      pinyin: "kuài zhì rén kǒu",
      meaning: "Nức tiếng muôn nơi, miệng truyền miệng tấm tắc ngợi khen",
      hsk: 6,
      radical: "月 (Nguyệt / Nhục) & 口 (Khẩu)",
      strokes: 10,
      strokeOrderRules: "Bộ Nguyệt bên trái chữ Khoái viết trước",
      collocations: ["脍炙人口的名篇 (Tác phẩm nức tiếng)", "广泛流传 (Lưu truyền rộng rãi)"],
      example: {
        zh: "李白的这首古诗千百年来一直是脍炙人口的名篇佳作。",
        pinyin: "Lǐ bái de zhè shǒu gǔshī qiān bǎi nián lái yìzhí shì kuàizhì-rénkǒu de míngpiān jiāzuò.",
        vi: "Bài thơ cổ này của Lý Bạch suốt hàng nghìn năm qua luôn là áng thơ nức tiếng được người đời tấm tắc ngâm vịnh."
      }
    },
    {
      id: "v6_06",
      hanzi: "审时度势",
      pinyin: "shěn shí duó shì",
      meaning: "Xem xét thời thế, liệu bề ứng biến, suy xét tình thế",
      hsk: 6,
      radical: "宀 (Miên) & 日 (Nhật)",
      strokes: 9,
      strokeOrderRules: "Bộ Miên trên cùng viết trước",
      collocations: ["善于审时度势 (Khéo nhìn nhận thời thế)", "科学决策 (Ra quyết định khoa học)"],
      example: {
        zh: "优秀的战略决策者总能审时度势，抓住瞬息万变的市场先机。",
        pinyin: "Yōuxiù de zhànlüè juécèzhě zǒng néng shěnshí-duóshì, zhuāzhù shùnxī-wànbiàn de shìchǎng xiānjī.",
        vi: "Nhà hoạch định chiến lược xuất sắc luôn biết nhìn nhận thời thế để nắm bắt thời cơ thị trường biến ảo khôn lường."
      }
    },
    {
      id: "v6_07",
      hanzi: "侃侃而谈",
      pinyin: "kǎn kǎn ér tán",
      meaning: "Nói năng lưu loát, tự tin đĩnh đạc, hùng hồn",
      hsk: 6,
      radical: "亻 (Nhân đứng) & 讠 (Ngôn)",
      strokes: 8,
      strokeOrderRules: "Bộ Nhân đứng bên trái chữ Khản viết trước",
      collocations: ["在台上侃侃而谈 (Tự tin thuyết trình trên bục)", "谈吐自如 (Nói năng thoải mái)"],
      example: {
        zh: "他在国际高峰论坛上侃侃而谈，赢得了各国代表的热烈掌声。",
        pinyin: "Tā zài guójì gāofēng lùntán shàng kǎnkǎn-értán, yíngdé le gè guó dàibiǎo de rèliè zhǎngshēng.",
        vi: "Anh ấy đĩnh đạc thuyết trình tại diễn đàn thượng đỉnh quốc tế, nhận được tràng pháo tay nhiệt liệt từ đại biểu các nước."
      }
    },
    {
      id: "v6_08",
      hanzi: "根深蒂固",
      pinyin: "gēn shēn dì gù",
      meaning: "Ăn sâu bén rễ, thâm căn cố đế, khó bề lay chuyển",
      hsk: 6,
      radical: "木 (Mộc) & 氵 (Thủy)",
      strokes: 10,
      strokeOrderRules: "Bộ Mộc bên trái chữ Căn viết trước",
      collocations: ["根深蒂固的观念 (Quan niệm thâm căn cố đế)", "传统习俗 (Phong tục truyền thống)"],
      example: {
        zh: "有些陈旧落后的观念虽然根深蒂固，但终将被时代淘汰。",
        pinyin: "Yǒuxiē chénjiù luòhòu de guānniàn suīrán gēnshēn-dìgù, dàn zhōng jiāng bèi shídài táotài.",
        vi: "Một số quan niệm lạc hậu tuy đã ăn sâu bén rễ, nhưng cuối cùng cũng sẽ bị thời đại đào thải."
      }
    },
    {
      id: "v6_09",
      hanzi: "循序渐进",
      pinyin: "xún xù jiàn jìn",
      meaning: "Từng bước một tiến lên, theo trình tự mà tiến bước",
      hsk: 6,
      radical: "彳 (Xích) & 广 (Quảng)",
      strokes: 12,
      strokeOrderRules: "Bộ Xích (bước chân trái) viết trước",
      collocations: ["循序渐进地学习 (Học tập theo từng bước)", "科学规划 (Quy hoạch khoa học)"],
      example: {
        zh: "学习外语切忌急于求成，必须遵循循序渐进的客观规律。",
        pinyin: "Xuéxí wàiyǔ qièjì jíyúqiúchéng, bìxū zūnxún xúnxù-jiànjìn de kèguān guīlǜ.",
        vi: "Học ngoại ngữ tối kỵ nóng vội đốt cháy giai đoạn, phải tuân thủ quy luật khách quan tiến bước tuần tự."
      }
    },
    {
      id: "v6_10",
      hanzi: "见多识广",
      pinyin: "jiàn duō shí guǎng",
      meaning: "Thấy nhiều biết rộng, từng trải lịch thiệp, kiến thức uyên thâm",
      hsk: 6,
      radical: "见 (Kiến) & 讠 (Ngôn)",
      strokes: 4,
      strokeOrderRules: "Chữ Kiến viết trước: Sổ dọc, ngang gập, phẩy, móc đứng cong",
      collocations: ["阅历丰富 (Vốn sống phong phú)", "见多识广的长者 (Bậc trưởng bối thấy nhiều biết rộng)"],
      example: {
        zh: "他游历过世界上几十个国家，是个见多识广、谈吐幽默的学者。",
        pinyin: "Tā yóulì guò shìjiè shàng jǐ shí gè guójiā, shì gè jiànduō-shíguǎng, tántù yōumò de xuézhě.",
        vi: "Ông ấy đã du hành qua hàng chục quốc gia trên thế giới, là một học giả thấy nhiều biết rộng và trò chuyện rất hóm hỉnh."
      }
    },

    // ==================== TIẾNG TRUNG THƯƠNG MẠI (商务汉语 - Business Chinese) ====================
    {
      id: "vb_01",
      hanzi: "合同",
      pinyin: "hé tong",
      meaning: "Hợp đồng thương mại, khế ước giao thương",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "人 (Nhân) & 口 (Khẩu)",
      strokes: 6,
      strokeOrderRules: "Phẩy trước mác sau, ngang viết tiếp theo, bộ Khẩu đáy viết sau cùng",
      collocations: ["签订合同 (Ký kết hợp đồng)", "履行合同 (Thực hiện hợp đồng)", "起草合同 (Soạn thảo hợp đồng)"],
      example: {
        zh: "双方代表在人民大会堂正式签署了战略合作商业合同。",
        pinyin: "Shuāngfāng dàibiǎo zài rénmín dàhuìtáng zhèngshì qiānshǔ le zhànlüè hézuò shāngyè hétong.",
        vi: "Đại diện hai bên đã chính thức ký kết hợp đồng thương mại hợp tác chiến lược tại Đại lễ đường Nhân dân."
      }
    },
    {
      id: "vb_02",
      hanzi: "谈判",
      pinyin: "tán pàn",
      meaning: "Đàm phán, thương thuyết, thương thảo kinh doanh",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "讠 (Ngôn) & 刂 (Đao đứng)",
      strokes: 11,
      strokeOrderRules: "Bộ Ngôn bên trái chữ Đàm viết trước",
      collocations: ["商业谈判 (Đàm phán kinh doanh)", "价格谈判 (Thương lượng giá cả)", "陷入僵局 (Rơi vào bế tắc)"],
      example: {
        zh: "经过三轮艰苦谈判，双方最终在核心价格条款上达成共识。",
        pinyin: "Jīngguò sān lún jiānkǔ tánpàn, shuāngfāng zuìzhōng zài héxīn jiàgé tiáokuǎn shàng dáchéng gòngshí.",
        vi: "Trải qua 3 vòng đàm phán cam go, hai bên cuối cùng đã đạt được đồng thuận về các điều khoản giá cả cốt lõi."
      }
    },
    {
      id: "vb_03",
      hanzi: "报价",
      pinyin: "bào jià",
      meaning: "Báo giá, bảng báo giá chào hàng (Quotation)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "扌 (Thủ) & 亻 (Nhân đứng)",
      strokes: 7,
      strokeOrderRules: "Bộ Thủ (tay) bên trái chữ Báo viết trước",
      collocations: ["正式报价 (Báo giá chính thức)", "接受报价 (Chấp nhận báo giá)", "最终报价 (Báo giá cuối cùng)"],
      example: {
        zh: "请贵公司在下周五之前向我们发送该批设备的详细书面报价。",
        pinyin: "Qǐng guì gōngsī zài xià zhōuwǔ zhīqián xiàng wǒmen fāsòng gāi pī shèbèi de xiángxì shūmiàn bàojià.",
        vi: "Xin quý công ty gửi cho chúng tôi bảng báo giá chi tiết bằng văn bản của lô thiết bị này trước thứ Sáu tuần sau."
      }
    },
    {
      id: "vb_04",
      hanzi: "发票",
      pinyin: "fā piào",
      meaning: "Hóa đơn tài chính, hóa đơn đỏ VAT (Invoice)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "癶 (Bát) & 示 (Thị)",
      strokes: 5,
      strokeOrderRules: "Phẩy trước, ngang phẩy gập, mác dài",
      collocations: ["开具增值税发票 (Xuất hóa đơn VAT)", "发票抬头 (Tên đơn vị trên hóa đơn)"],
      example: {
        zh: "收到款项确认无误后，财务部会立即为您开具正规增值税专用发票。",
        pinyin: "Shōudào kuǎnxiàng quèrèn wúwù hòu, cáiwùbù huì lìjí wèi nǐ kāijù zhèngguī zēngzhíshuì zhuānyòng fāpiào.",
        vi: "Sau khi xác nhận nhận tiền chính xác, phòng tài vụ sẽ lập tức xuất hóa đơn đỏ VAT chuyên dụng cho quý khách."
      }
    },
    {
      id: "vb_05",
      hanzi: "汇率",
      pinyin: "huì lǜ",
      meaning: "Tỷ giá hối đoái tiền tệ (Exchange Rate)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "氵 (Thủy) & 玄 (Huyền)",
      strokes: 13,
      strokeOrderRules: "Ba chấm thủy bên trái viết trước",
      collocations: ["汇率波动 (Biến động tỷ giá)", "人民币对美元汇率 (Tỷ giá RMB/USD)", "外汇风险 (Rủi ro ngoại hối)"],
      example: {
        zh: "近期国际外汇汇率波动剧烈，对外贸出口企业带来了汇兑损益挑战。",
        pinyin: "Jìnqī guójì wàihuì huìlǜ bōdòng jùliè, duì wàimào chūkǒu qǐyè dài lái le huìduì sǔnyì tiǎozhàn.",
        vi: "Gần đây tỷ giá ngoại hối quốc tế biến động dữ dội, đem lại thách thức lỗ lãi tỷ giá cho các doanh nghiệp xuất khẩu ngoại thương."
      }
    },
    {
      id: "vb_06",
      hanzi: "违约金",
      pinyin: "wéi yuē jīn",
      meaning: "Tiền phạt vi phạm hợp đồng (Liquidated Damages / Penalty)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "辶 (Xước) & 纟 (Mịch)",
      strokes: 7,
      strokeOrderRules: "Viết thân chữ Vi bên trong trước, bộ Xước bao ngoài sau",
      collocations: ["支付违约金 (Chi trả tiền phạt vi phạm)", "合同违约责任 (Trách nhiệm vi phạm hợp đồng)"],
      example: {
        zh: "如任何一方未能按时交货，需按合同约定支付货款总额百分之五的违约金。",
        pinyin: "Rú rènhé yì fāng wèinéng ànshí jiāohuò, xū àn hétong yuēdìng zhīfù huòkuǎn zǒng'é bǎifēnzhīwǔ de wéiyuējīn.",
        vi: "Nếu bất kỳ bên nào không giao hàng đúng hạn, cần chi trả khoản tiền phạt vi phạm hợp đồng bằng 5% tổng giá trị lô hàng."
      }
    },
    {
      id: "vb_07",
      hanzi: "信用证",
      pinyin: "xìn yòng zhèng",
      meaning: "Thư tín dụng thanh toán quốc tế (Letter of Credit - L/C)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "亻 (Nhân) & 讠 (Ngôn)",
      strokes: 9,
      strokeOrderRules: "Bộ Nhân đứng bên trái chữ Tín viết trước",
      collocations: ["不可撤销信用证 (L/C không thể hủy ngang)", "开立信用证 (Mở thư tín dụng L/C)"],
      example: {
        zh: "我们要求买方在装运前一个月通过指定国际银行开立不可撤销即期信用证。",
        pinyin: "Wǒmen yāoqiú mǎifāng zài zhuāngyùn qián yí gè yuè tōngguò zhǐdìng guójì yínháng kāilì bùkěchèxiāo jíqī xìnyòngzhèng.",
        vi: "Chúng tôi yêu cầu bên mua mở thư tín dụng trả ngay không thể hủy ngang qua ngân hàng quốc tế chỉ định 1 tháng trước khi bốc hàng."
      }
    },
    {
      id: "vb_08",
      hanzi: "定金",
      pinyin: "dìng jīn",
      meaning: "Tiền đặt cọc, tiền trả trước (Deposit)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "宀 (Miên) & 金 (Kim)",
      strokes: 8,
      strokeOrderRules: "Bộ Miên trên đỉnh chữ Định viết trước",
      collocations: ["交付定金 (Giao tiền cọc)", "没收定金 (Tịch thu tiền cọc)", "定金收据 (Biên nhận tiền cọc)"],
      example: {
        zh: "买方需在签署订货协议后三个工作日内电汇百分之三十作为生产定金。",
        pinyin: "Mǎifāng xū zài qiānshǔ dìnghuò xiéyì hòu sān gè gōngzuòrì nèi diànhuì bǎifēnzhīsānshí zuòwéi shēngchǎn dìngjīn.",
        vi: "Bên mua cần chuyển khoản 30% làm tiền cọc sản xuất trong vòng 3 ngày làm việc sau khi ký thỏa thuận đặt hàng."
      }
    },
    {
      id: "vb_09",
      hanzi: "索赔",
      pinyin: "suǒ péi",
      meaning: "Khiếu nại bồi thường, đòi bồi thường bảo hiểm (Claim for Damages)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "十 (Thập) & 贝 (Bối)",
      strokes: 10,
      strokeOrderRules: "Bộ Thập trên đỉnh chữ Tác viết trước",
      collocations: ["提出索赔 (Đưa ra yêu cầu bồi thường)", "索赔期限 (Thời hạn khiếu nại bồi thường)"],
      example: {
        zh: "经第三方公证检验货物存在严重破损，我方正式向保险公司提出索赔。",
        pinyin: "Jīng dì-sān fāng gōngzhèng jiǎnyàn huòwù cúnzài yánzhòng pòsǔn, wǒfāng zhèngshì xiàng bǎoxiǎn gōngsī tíchū suǒpéi.",
        vi: "Qua giám định của bên thứ 3 xác nhận hàng hóa hư hỏng nghiêm trọng, bên tôi chính thức yêu cầu công ty bảo hiểm bồi thường."
      }
    },
    {
      id: "vb_10",
      hanzi: "利润",
      pinyin: "lì rùn",
      meaning: "Lợi nhuận ròng, tiền lãi doanh nghiệp (Profit)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "禾 (Hòa) & 氵 (Thủy)",
      strokes: 7,
      strokeOrderRules: "Bộ Hòa bên trái chữ Lợi viết trước",
      collocations: ["净利润 (Lợi nhuận ròng)", "利润率 (Tỷ suất lợi nhuận)", "实现利润 (Đạt mức lợi nhuận)"],
      example: {
        zh: "得益于成本优化和技术创新，本季度公司净利润实现了百分之二十五的强劲增长。",
        pinyin: "Déyì yú chéngběn yōuhuà hé jìshù chuàngxīn, běn jìdù gōngsī jìnglìrùn shíxiàn le bǎifēnzhī'èrshíwǔ de qiángjìng zēngzhǎng.",
        vi: "Nhờ tối ưu chi phí và đổi mới công nghệ, lợi nhuận ròng của công ty quý này đã tăng trưởng mạnh mẽ 25%."
      }
    },
    {
      id: "vb_11",
      hanzi: "关税",
      pinyin: "guān shuì",
      meaning: "Thuế hải quan, thuế quan xuất nhập khẩu (Tariff / Customs Duty)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "门 (Môn) & 禾 (Hòa)",
      strokes: 6,
      strokeOrderRules: "Chấm trước phẩy sau, bộ Môn bao quanh",
      collocations: ["海关关税 (Thuế quan hải quan)", "关税优惠 (Ưu đãi thuế quan)", "零关税 (Thuế quan 0%)"],
      example: {
        zh: "根据自贸协定规定，自明年起两国进出口大部分机械设备将享受零关税待遇。",
        pinyin: "Gēnjù zìmào xiédìng guīdìng, zì míngnián qǐ liǎng guó jìn-chūkǒu dà bùfen jīxiè shèbèi jiāng xiǎngshòu líng guānshuì dàiyù.",
        vi: "Theo hiệp định thương mại tự do, từ năm tới phần lớn thiết bị máy móc xuất nhập khẩu giữa hai nước sẽ được hưởng thuế quan 0%."
      }
    },
    {
      id: "vb_12",
      hanzi: "供应链",
      pinyin: "gōng yìng liàn",
      meaning: "Chuỗi cung ứng hàng hóa sản xuất (Supply Chain)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "亻 (Nhân) & 钅 (Kim)",
      strokes: 8,
      strokeOrderRules: "Bộ Nhân đứng bên trái chữ Cung viết trước",
      collocations: ["供应链管理 (Quản trị chuỗi cung ứng SCM)", "全球供应链 (Chuỗi cung ứng toàn cầu)"],
      example: {
        zh: "构建韧性强大且高效透明的供应链体系是制造业保持长期竞争力的基石。",
        pinyin: "Gòujiàn rènxìng qiángdà qiě gāoxiào tòumíng de gōngyìngliàn tǐxì shì zhìzàoyè bǎochí chángqī jìngzhēnglì de jīshí.",
        vi: "Xây dựng hệ thống chuỗi cung ứng bền bỉ dẻo dai và minh bạch hiệu quả là nền tảng để ngành chế tạo duy trì sức cạnh tranh dài lâu."
      }
    },
    {
      id: "vb_13",
      hanzi: "签署",
      pinyin: "qiān shǔ",
      meaning: "Ký kết văn kiện, đặt bút ký hợp đồng (Sign / Execute Contract)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "竹 (Trúc) & 罒 (Võng)",
      strokes: 13,
      strokeOrderRules: "Bộ Trúc trên đầu chữ Thiêm viết trước",
      collocations: ["签署协议 (Ký kết thỏa thuận)", "正式签署 (Chính thức ký kết)"],
      example: {
        zh: "两国商务部长在隆重的仪式上共同签署了双边投资保护备忘录。",
        pinyin: "Liǎng guó shāngwù bùzhǎng zài lóngzhòng de yíshì shàng gòngtóng qiānshǔ le shuāngbiān tóuzī bǎohù bèiwànglù.",
        vi: "Bộ trưởng thương mại hai nước đã cùng nhau ký kết biên bản ghi nhớ bảo hộ đầu tư song phương trong buổi lễ long trọng."
      }
    },
    {
      id: "vb_14",
      hanzi: "市场份额",
      pinyin: "shì chǎng fèn 'é",
      meaning: "Thị phần, tỷ lệ chiếm lĩnh thị trường (Market Share)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "巾 (Cân) & 土 (Thổ)",
      strokes: 5,
      strokeOrderRules: "Bộ Cân bên dưới chữ Thị viết sau",
      collocations: ["扩大市场份额 (Mở rộng thị phần)", "市场占有率 (Tỷ lệ chiếm lĩnh thị trường)"],
      example: {
        zh: "凭借卓越的性价比与完善的售后服务，我们品牌在东南亚的市场份额稳步上升。",
        pinyin: "Píngjiè zhuóyuè de xìngjiàbǐ yǔ wánshàn de shòuhòu fúwù, wǒmen pǐnpái zài dōngnányà de shìchǎng fèn'é wěnbù shàngshēng.",
        vi: "Nhờ tỷ lệ hiệu năng trên giá thành vượt trội và hậu mãi hoàn thiện, thị phần của thương hiệu chúng tôi tại Đông Nam Á liên tục thăng tiến vững chắc."
      }
    },
    {
      id: "vb_15",
      hanzi: "投资回报率",
      pinyin: "tóu zī huí bào lǜ",
      meaning: "Tỷ suất hoàn vốn đầu tư (ROI - Return on Investment)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "扌 (Thủ) & 贝 (Bối)",
      strokes: 7,
      strokeOrderRules: "Bộ Thủ bên trái chữ Đầu viết trước",
      collocations: ["高投资回报率 (Tỷ suất ROI cao)", "评估投资风险 (Đánh giá rủi ro đầu tư)"],
      example: {
        zh: "财务分析师测算，该新建智能仓储物流项目的预期投资回报率高达百分之十八。",
        pinyin: "Cáiwù fēnxīshī cèsuàn, gāi xīnjiàn zhìnéng cāngchǔ wùliú xiàngmù de yùqī tóuzī huíbàolǜ gāodá bǎifēnzhīshíbā.",
        vi: "Chuyên viên phân tích tài chính tính toán rằng tỷ suất ROI kỳ vọng của dự án kho bãi thông minh xây mới này đạt tới 18%."
      }
    },
    {
      id: "vb_16",
      hanzi: "质量保证",
      pinyin: "zhì liàng bǎo zhèng",
      meaning: "Đảm bảo chất lượng sản phẩm (Quality Assurance - QA)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "贝 (Bối) & 里 (Lý)",
      strokes: 6,
      strokeOrderRules: "Bộ Bối bên trái chữ Chất viết trước",
      collocations: ["质量保证期 (Thời hạn bảo hành chất lượng)", "ISO认证 (Chứng nhận ISO)"],
      example: {
        zh: "我们所有出口产品出厂前均通过严格检验，提供长达两年的全方位质量保证。",
        pinyin: "Wǒmen suǒyǒu chūkǒu chǎnpǐn chūchǎng qián jūn tōngguò yángé jiǎnyàn, tígōng chángdá liǎng nián de quánfāngwèi zhìliàng bǎozhèng.",
        vi: "Tất cả sản phẩm xuất khẩu của chúng tôi trước khi xuất xưởng đều qua kiểm nghiệm nghiêm ngặt và được bảo hành chất lượng toàn diện 2 năm."
      }
    },
    {
      id: "vb_17",
      hanzi: "进出口",
      pinyin: "jìn chū kǒu",
      meaning: "Xuất nhập khẩu, mậu dịch đối ngoại (Import & Export)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "辶 (Xước) & 凵 (Khảm)",
      strokes: 7,
      strokeOrderRules: "Chữ Tỉnh viết trước, bộ Xước bao ngoài chữ Tiến sau cùng",
      collocations: ["进出口总额 (Tổng kim ngạch xuất nhập khẩu)", "外贸进出口公司 (Công ty XNK ngoại thương)"],
      example: {
        zh: "中越双边进出口贸易额今年再创历史新高，经贸合作前景十分广阔。",
        pinyin: "Zhōng Yuè shuāngbiān jìn-chūkǒu màoyì'é jǐnnián zài chuàng lìshǐ xīngāo, jīngmào hézuò qiánjǐng shífēn guǎngkuò.",
        vi: "Kim ngạch thương mại xuất nhập khẩu song phương Trung - Việt năm nay tiếp tục lập đỉnh lịch sử mới, triển vọng hợp tác kinh tế mậu dịch vô cùng rộng mở."
      }
    },
    {
      id: "vb_18",
      hanzi: "客户维护",
      pinyin: "kè hù wéi hù",
      meaning: "Chăm sóc và duy trì quan hệ khách hàng (Client Relationship Management)",
      hsk: "Thương Mại",
      category: "business",
      deck: "business",
      radical: "宀 (Miên) & 纟 (Mịch)",
      strokes: 9,
      strokeOrderRules: "Bộ Miên trên đầu chữ Khách viết trước",
      collocations: ["大客户维护 (Chăm sóc khách hàng VIP)", "定期回访 (Định kỳ thăm hỏi khách hàng)"],
      example: {
        zh: "做好老客户维护与及时售后响应，能够显著降低企业的获客成本并建立良好口碑。",
        pinyin: "Zuò hǎo lǎo kèhù wéihù yǔ jíshí shòuhòu xiǎngyìng, nénggòu xiǎozhù jiàngdī qǐyè de huòkè chéngběn bìng jiànlì liánghǎo kǒubēi.",
        vi: "Làm tốt công tác chăm sóc duy trì khách hàng cũ và phản hồi hậu mãi kịp thời có thể giảm thiểu chi phí tìm kiếm khách hàng mới và xây dựng uy tín truyền miệng tuyệt vời."
      }
    }
  ],

  // 2. Comprehensive Chengyu & Proverbs Bank (With Fables & Explanations)
  chengyuList: [
    {
      id: "cy_01",
      category: "chengyu",
      hanzi: "掩耳盗铃",
      pinyin: "yǎn ěr dào líng",
      literal: "Bịt tai trộm chuông",
      figurative: "Tự dối lòng mình; hành động lừa mình dối người, tưởng mình giấu được nhưng ai cũng biết.",
      story: "Thời Xuân Thu, một kẻ trộm muốn lấy chiếc chuông đồng lớn của nhà họ Phạm. Vì chuông quá nặng không vác nổi, hắn định dùng búa đập vỡ để vác từng mảnh. Khi gõ, chuông phát ra tiếng 'keng' lớn vang khắp làng. Sợ người khác nghe thấy đến bắt, hắn liền nghĩ ra kế lấy bông nhét chặt hai tai mình lại, tự nhủ: 'Mình không nghe thấy thì người khác cũng sẽ không nghe thấy!'.",
      example: {
        zh: "在考试前不复习而抱侥幸心理，完全是掩耳盗铃的做法。",
        pinyin: "Zài kǎoshì qián bù fùxí ér bào jiǎoxìng xīnlǐ, wánquán shì yǎn ěr dào líng de zuòfǎ.",
        vi: "Trước kì thi không chịu ôn tập mà cứ ôm tâm lý cầu may, hoàn toàn là hành vi bịt tai trộm chuông tự lừa dối mình."
      },
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Tự lừa dối", "Xuân Thu"]
    },
    {
      id: "cy_02",
      category: "chengyu",
      hanzi: "塞翁失马",
      pinyin: "sài wēng shī mǎ",
      literal: "Ông lão ở biên ải mất ngựa (Tái ông thất mã)",
      figurative: "Họa là chỗ dựa của phúc, phúc là mầm mống của họa. Chuyện đời được mất khó lường, nên giữ tâm thế bình thản.",
      story: "Một ông lão ở biên ải bị mất ngựa quý, hàng xóm đến chia buồn, ông bình thản: 'Biết đâu lại là điều may?'. Mấy tháng sau, ngựa cũ trở về dắt theo đàn tuấn mã. Hàng xóm chúc mừng, ông lại nói: 'Biết đâu là điềm họa?'. Con trai ông vì thích cưỡi ngựa mới mà ngã gãy chân. Hàng xóm lại tiếc thương, ông đáp: 'Chưa biết chừng là phúc!'. Năm sau giặc xâm lược, mọi thanh niên đều tòng quân tử trận, riêng con trai ông vì tàn tật nên được sống sót bình yên.",
      example: {
        zh: "塞翁失马，焉知非福。这次丢了工作，说不定能让你找到更合适的发展机会。",
        pinyin: "Sài wēng shī mǎ, yān zhī fēi fú. Zhè cì diū le gōngzuò, shuōbudìng néng ràng nǐ zhǎodào gèng héshì de fāzhǎn jīhuì.",
        vi: "Tái ông thất mã, biết đâu lại là phúc. Lần này mất việc, biết đâu lại mở ra cơ hội phát triển phù hợp hơn cho bạn."
      },
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80",
      tags: ["Triết lý nhân sinh", "Lạc quan", "Hoài Nam Tử"]
    },
    {
      id: "cy_03",
      category: "chengyu",
      hanzi: "画蛇添足",
      pinyin: "huà shé tiān zú",
      literal: "Vẽ rắn thêm chân",
      figurative: "Làm những việc thừa thãi không cần thiết, tự rước lấy thất bại hoặc làm hỏng việc vốn đã tốt đẹp.",
      story: "Nước Sở có người ban bình rượu quý cho những người giữ đền. Bình rượu quá ít, không đủ chia đều, họ giao hẹn: 'Ai vẽ xong con rắn trên mặt đất trước thì được uống'. Một người vẽ xong sớm nhất, tay trái cầm bình rượu định uống, nhưng thấy người khác chưa xong bèn kiêu ngạo bảo: 'Ta còn thừa sức vẽ thêm chân cho nó!'. Đang lúc vẽ chân, một người khác vẽ xong rắn liền giật lấy bình rượu nói: 'Rắn vốn không có chân, cớ sao phải vẽ thêm?'.",
      example: {
        zh: "这篇文章本来已经写得很完整了，你又加了这段结尾，简直是画蛇添足。",
        pinyin: "Zhè piān wénzhāng běnlái yǐjīng xiě de hěn wánzhěng le, nǐ yòu jiā le zhè duàn jiéwěi, jiǎnzhí shì huà shé tiān zú.",
        vi: "Bài viết này vốn đã rất hoàn chỉnh rồi, bạn lại thêm đoạn kết này vào, đúng là vẽ rắn thêm chân."
      },
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
      tags: ["Chiến Quốc Sách", "Thừa thãi", "Cẩn trọng"]
    },
    {
      id: "cy_04",
      category: "chengyu",
      hanzi: "愚公移山",
      pinyin: "yú gōng yí shān",
      literal: "Ông già ngu dời núi (Ngu Công dời núi)",
      figurative: "Chỉ ý chí sắt đá, quyết tâm bền bỉ kiên trì vượt qua mọi khó khăn gian khổ khổng lồ.",
      story: "Cụ già Ngu Công tuổi gần 90, trước cửa nhà có hai ngọn núi lớn Thái Hành và Vương Ốc chắn lối đi. Cụ họp gia đình quyết tâm đào núi san bằng đường. Một ông trí thức cười nhạo: 'Ông già yếu sắp chết, làm sao dời nổi núi?'. Ngu Công thong thả đáp: 'Tôi chết thì còn con tôi, con tôi sinh cháu, cháu lại sinh con, đời đời con cháu vô tận, mà núi thì không mọc thêm, lo gì không bằng phẳng?'. Lòng thành cảm động Trời cao, Thượng đế sai hai vị thần xuống cõng núi đi chỗ khác.",
      example: {
        zh: "只要发扬愚公移山的精神，无论多么艰巨的技术难关我们都能攻克。",
        pinyin: "Zhǐyào fāyáng yú gōng yí shān de jīngshén, wúlùn duōme jiānjù de jìshù nánguān wǒmen dōu néng gōngkè.",
        vi: "Chỉ cần phát huy tinh thần Ngu Công dời núi, bất kể ải khó công nghệ gian khổ đến đâu chúng ta cũng sẽ chinh phục được."
      },
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      tags: ["Liệt Tử", "Kiên trì", "Ý chí phi thường"]
    },
    {
      id: "cy_05",
      category: "proverb",
      hanzi: "千里之行，始于足下",
      pinyin: "qiān lǐ zhī xíng, shǐ yú zú xià",
      literal: "Chuyến đi ngàn dặm bắt đầu từ một bước chân",
      figurative: "Mọi việc lớn lao vĩ đại trong thiên hạ đều phải khởi đầu từ những hành động nhỏ bé thiết thực mỗi ngày.",
      story: "Trích từ Đạo Đức Kinh của triết gia Lão Tử: 'Cây lớn ôm một vòng nảy sinh từ một mầm non bé nhỏ; đài cao chín tầng khởi dựng từ một đống đất con; chuyến đi ngàn dặm bắt đầu từ bước chân ngay dưới chân mình'. Khuyên bảo người đời không được nản lòng trước mục tiêu dài hạn, mà hãy bắt tay hành động ngay.",
      example: {
        zh: "学好一门外语不是一朝一夕的事，千里之行始于足下，坚持背单词吧！",
        pinyin: "Xué hǎo yī mén wàiyǔ bú shì yī zhāo yī xī de shì, qiān lǐ zhī xíng shǐ yú zú xià, jiānchí bèi dāncí ba!",
        vi: "Học giỏi một ngoại ngữ không phải chuyện ngày một ngày hai, ngàn dặm khởi nguồn từ bước chân, hãy kiên trì học từ vựng mỗi ngày!"
      },
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
      tags: ["Tục ngữ", "Lão Tử", "Đạo Đức Kinh", "Học tập"]
    },
    {
      id: "cy_06",
      category: "chengyu",
      hanzi: "卧薪尝胆",
      pinyin: "wò xīn cháng dǎn",
      literal: "Nằm gai nếm mật (Nằm trên củi gai, nếm mật đắng)",
      figurative: "Chịu đựng gian khổ, nung nấu ý chí tự cường để rửa hận và đạt được thắng lợi vẻ vang.",
      story: "Thời Xuân Thu, Việt Vương Câu Tiễn bị Ngô Vương Phù Sai đánh bại và bắt làm tù binh nhục nhã. Khi được thả về nước, để nhắc nhở bản thân không bao giờ quên nỗi nhục mất nước, Câu Tiễn đêm đêm nằm ngủ trên đống củi gai góc, trước chỗ ngồi treo một túi mật đắng, mỗi bữa ăn đều nếm vị mật đắng ngắt. Sau mười năm nung nấu lực lượng, Câu Tiễn đã tiêu diệt nước Ngô, xưng bá thiên hạ.",
      example: {
        zh: "经过几年的卧薪尝胆，这家初创企业终于在全球市场上站稳了脚跟。",
        pinyin: "Jīngguò jǐ nián de wò xīn cháng dǎn, zhè jiā chūchuàng qǐyè zhōngyú zài quánqiú shìchǎng shàng zhàn wěn le jiǎogēn.",
        vi: "Trải qua vài năm nằm gai nếm mật, doanh nghiệp khởi nghiệp này cuối cùng đã đứng vững trên thị trường toàn cầu."
      },
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Ý chí", "Sử ký Tư Mã Thiên"]
    },
    {
      id: "cy_07",
      category: "chengyu",
      hanzi: "守株待兔",
      pinyin: "shǒu zhū dài tù",
      literal: "Ôm cây đợi thỏ",
      figurative: "Không chịu chủ động nỗ lực mà cứ ôm tâm lý cầu may, rập khuôn mù quáng trông chờ điều may mắn bất ngờ.",
      story: "Thời Chiến Quốc, một người nông dân nước Tống đang cày ruộng thì thấy một con thỏ chạy hoảng hốt đâm đầu vào gốc cây to gãy cổ chết. Người đó sung sướng vác thỏ về làm thịt, từ hôm đó vứt bỏ cày cuốc, ngày ngày ngồi bên gốc cây chờ đợi con thỏ khác đâm vào. Ruộng đồng bỏ hoang cỏ mọc um tùm, thỏ thì chẳng thấy đâu, anh ta trở thành trò cười cho cả thiên hạ.",
      example: {
        zh: "要想提高中文水平就得踏踏实实练习，不能守株待兔妄想一夜暴富。",
        pinyin: "Yào xiǎng tígāo zhōngwén shuǐpíng jiù děi tātā-shíshí liànxí, bù néng shǒu zhū dài tù wàngxiǎng yíyè-bàofù.",
        vi: "Muốn nâng cao trình độ tiếng Trung thì phải luyện tập vững vàng từng bước, không thể ôm cây đợi thỏ trông chờ phép màu."
      },
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Hàn Phi Tử", "Ảo tưởng", "Nỗ lực"]
    },
    {
      id: "cy_08",
      category: "chengyu",
      hanzi: "井底之蛙",
      pinyin: "jǐng dǐ zhī wā",
      literal: "Ếch ngồi đáy giếng",
      figurative: "Chỉ người có tầm nhìn thiển cận, hiểu biết nông cạn hạn hẹp nhưng lại tự cao tự đại huênh hoang.",
      story: "Có con ếch sống ở đáy một cái giếng cạn hoang phế, nó tự mãn bảo con rùa biển Đông rằng: 'Ta là chúa tể nơi đây, sung sướng nhất đời!'. Rùa biển mỉm cười kể cho ếch nghe về sự bao la bát ngát của biển cả ngàn dặm không thấy bờ, sâu vạn trượng không đo tới đáy, lũ lụt hạn hán đều không làm suy chuyển biển rộng. Nghe xong, ếch đáy giếng sững sờ, xấu hổ không biết giấu mặt vào đâu.",
      example: {
        zh: "我们必须放眼世界，多学习新科技，绝不能做孤陋寡闻的井底之蛙。",
        pinyin: "Wǒmen bìxū fàngyǎn shìjiè, duō xuéxí xīn kējì, jué bù néng zuò gūlòu-guǎwén de jǐng dǐ zhī wā.",
        vi: "Chúng ta phải nhìn rộng ra thế giới, học hỏi công nghệ mới, tuyệt đối không thể làm chú ếch ngồi đáy giếng hẹp hòi."
      },
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Trang Tử", "Hiểu biết", "Mở rộng tầm nhìn"]
    },
    {
      id: "cy_09",
      category: "proverb",
      hanzi: "一寸光阴一寸金，寸金难买寸光阴",
      pinyin: "yí cùn guāng yīn yí cùn jīn, cùn jīn nán mǎi cùn guāng yīn",
      literal: "Một tấc thời gian đáng giá một tấc vàng, nhưng một tấc vàng khó mua được một tấc thời gian",
      figurative: "Thời gian là thứ tài sản quý giá vô giá nhất của đời người, một khi trôi qua không bao giờ lấy lại được, cần trân quý từng phút từng giây.",
      story: "Câu ngạn ngữ nổi tiếng xuất hiện trong thi ca cổ Trung Hoa, khuyên răn sĩ tử và thanh niên không được lãng phí thanh xuân vào những chuyện phù phiếm, mà hãy tận dụng thời giờ quý báu để trau dồi học vấn và đức hạnh.",
      example: {
        zh: "一寸光阴一寸金，趁年轻我们要抓紧时间学好本领。",
        pinyin: "Yí cùn guāngyīn yí cùn jīn, chèn niánqīng wǒmen yào zhuājǐn shíjiān xué hǎo běnlǐng.",
        vi: "Một tấc thời gian một tấc vàng, nhân lúc còn trẻ chúng ta phải tranh thủ thời gian học cho giỏi bản lĩnh."
      },
      image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=600&q=80",
      tags: ["Tục ngữ", "Thời gian", "Quý trọng thanh xuân"]
    },
    {
      id: "cy_10",
      category: "proverb",
      hanzi: "熟能生巧",
      pinyin: "shú néng shēng qiǎo",
      literal: "Làm quen tay thì sinh ra khéo léo (Trăm hay không bằng tay quen)",
      figurative: "Bất kể công việc hay kỹ năng nào, chỉ cần kiên trì luyện tập thường xuyên nhiều lần thì sẽ đạt đến cảnh giới thuần thục tinh diệu.",
      story: "Thời Bắc Tống, Trần Nghiêu Tư bắn cung bách phát bách trúng nên vô cùng đắc ý. Một hôm, một ông lão bán dầu đứng xem chỉ gật đầu khẽ. Trần tức giận hỏi: 'Ngươi cũng biết bắn cung à?'. Ông lão thong thả đặt một đồng tiền có lỗ vuông lên miệng bầu rượu, rồi múc gáo dầu rót từ trên cao xuống, dòng dầu chảy qua lỗ đồng xu rơi vào bầu mà không dính một giọt nào vào mép xu. Ông cười bảo: 'Ta chẳng có tài gì lạ, chỉ là tay quen mà thôi!'.",
      example: {
        zh: "写汉字一开始觉得很难，但熟能生巧，每天练几遍就会越来越熟练。",
        pinyin: "Xiě hànzì yì kāishǐ juéde hěn nán, dàn shú néng shēng qiǎo, měitiān liàn jǐ biàn jiù huì yuè lái yuè shúliàn.",
        vi: "Viết chữ Hán ban đầu thấy rất khó, nhưng trăm hay không bằng tay quen, mỗi ngày luyện vài lần sẽ ngày càng thành thạo."
      },
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
      tags: ["Tục ngữ", "Âu Dương Tu", "Rèn luyện", "Kỹ năng"]
    },
    {
      id: "cy_11",
      category: "proverb",
      hanzi: "吃水不忘挖井人",
      pinyin: "chī shuǐ bù wàng wā jǐng rén",
      literal: "Uống nước không quên người đào giếng (Uống nước nhớ nguồn)",
      figurative: "Sống trên đời phải có lòng biết ơn, ghi nhớ công lao của những người đi trước đã hy sinh tạo dựng thành quả cho ta hôm nay.",
      story: "Câu tục ngữ nhắc nhở truyền thống đạo lý nhân nghĩa ngàn đời của văn hóa Á Đông, dạy con người khi hưởng thụ ấm no hạnh phúc thì không được vong ân bội nghĩa, mà phải luôn tri ân tổ tiên, thầy cô và thế hệ đi trước.",
      example: {
        zh: "我们取得今天的成绩离不开老师的悉心培养，吃水不忘挖井人，我们要懂得感恩。",
        pinyin: "Wǒmen qǔdé jīntiān de chéngjì lì bù kāi lǎoshī de xīxīn péiyǎng, chī shuǐ bù wàng wā jǐng rén, wǒmen yào dǒngdé gǎn'ēn.",
        vi: "Chúng ta có được thành tích hôm nay không thể tách rời sự dìu dắt của thầy cô, uống nước nhớ nguồn, chúng ta phải biết tri ân."
      },
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      tags: ["Tục ngữ", "Lòng biết ơn", "Đạo đức"]
    },
    {
      id: "cy_12",
      category: "proverb",
      hanzi: "活到老，学到老",
      pinyin: "huó dào lǎo, xué dào lǎo",
      literal: "Sống đến già, học đến già (Học, học nữa, học mãi)",
      figurative: "Tri thức nhân loại là vô tận, việc học tập rèn luyện bản thân là hành trình suốt đời không bao giờ có điểm dừng.",
      story: "Khuyên bảo con người giữ vững tinh thần cầu thị khiêm tốn, bất kể tuổi tác bao nhiêu hay địa vị thế nào, vẫn luôn luôn mở lòng học hỏi điều mới mẻ mỗi ngày.",
      example: {
        zh: "爷爷今年七十岁了还在学习使用智能手机和电脑，真是活到老学到老。",
        pinyin: "Yéye jǐnnián qīshí suì le hái zài xuéxí shǐyòng zhìnéng shǒujī hé diànnǎo, zhēn shì huó dào lǎo xué dào lǎo.",
        vi: "Ông nội năm nay 70 tuổi rồi mà vẫn học cách sử dụng điện thoại thông minh và máy tính, đúng là sống đến già học đến già."
      },
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      tags: ["Tục ngữ", "Học tập suốt đời", "Khiêm tốn"]
    },
    {
      id: "cy_13",
      category: "chengyu",
      hanzi: "破釜沉舟",
      pinyin: "pò fǔ chén zhōu",
      literal: "Đập vỡ nồi niêu, dìm chìm thuyền bè",
      figurative: "Quyết tâm dồn hết sức lực, không để lại đường lui cho mình để chiến đấu giành lấy thắng lợi cuối cùng.",
      story: "Thời Tần mạt, Hạng Vũ đem quân vượt sông Cự Lộc đánh quân Tần. Sau khi toàn bộ quân lính qua sông, Hạng Vũ ra lệnh dìm chìm tất cả thuyền bè, đập vỡ tất cả nồi niêu nấu ăn, đốt rụi lều trại, chỉ cho mỗi người mang theo ba ngày lương khô. Bằng cách chặn đứt mọi đường lui, quân sĩ đều liều chết xung phong, một người địch mười người, đại phá quân Tần giành chiến thắng chấn động lịch sử.",
      example: {
        zh: "面对考研的高压，他拿出了破釜沉舟的勇气，每天苦读十几个小时。",
        pinyin: "Miànduì kǎoyán de gāoyā, tā ná chū le pò fǔ chén zhōu de yǒngqì, měitiān kǔdú shí jǐ gè xiǎoshí.",
        vi: "Đối mặt áp lực thi thạc sĩ, anh ấy thể hiện dũng khí đập nồi dìm thuyền, mỗi ngày miệt mài học hơn mười tiếng đồng hồ."
      },
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Hạng Vũ", "Dũng khí", "Quyết tâm"]
    },
    {
      id: "cy_14",
      category: "chengyu",
      hanzi: "望梅止渴",
      pinyin: "wàng méi zhǐ kě",
      literal: "Trông thấy quả mơ mà đỡ khát",
      figurative: "Dùng ảo tưởng hoặc lời động viên tinh thần để an ủi bản thân vượt qua cơn khát khao hay hoàn cảnh gian nan lúc cấp bách.",
      story: "Thời Tam Quốc, Tào Tháo dẫn đại quân hành quân giữa trưa hè nắng gắt. Binh lính khát khô cổ họng, mệt lả không thể bước tiếp mà xung quanh không có giọt nước nào. Tào Tháo cưỡi ngựa lên cao, chỉ roi về phía trước dõng dạc bảo: 'Phía trước có một rừng mơ bạt ngàn, quả mơ to tròn chua ngọt mọng nước!'. Nghe nhắc đến vị chua quả mơ, binh lính ai nấy đều ứa nước miếng trong miệng, đỡ khát tức thì và hăng hái tiến nhanh tới nguồn nước thật.",
      example: {
        zh: "光在家里空想未来只是望梅止渴，只有付诸行动才能改变现状。",
        pinyin: "Guāng zài jiālǐ kōngxiǎng wèilái zhǐ shì wàng méi zhǐ kě, zhǐyǒu fùzhū xíngdòng cáinéng gǎibiàn xiànzhuàng.",
        vi: "Chỉ ngồi nhà mơ mộng tương lai chỉ là trông mơ đỡ khát, chỉ khi hành động thực tế mới thay đổi được hiện tại."
      },
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Tào Tháo", "Tam Quốc", "Tâm lý học"]
    },
    {
      id: "cy_15",
      category: "proverb",
      hanzi: "失败乃成功之母",
      pinyin: "shī bài nǎi chéng gōng zhī mǔ",
      literal: "Thất bại là mẹ của thành công",
      figurative: "Thất bại không phải là dấu chấm hết mà là cơ hội quý giá để rút ra bài học kinh nghiệm, làm tiền đề dẫn tới thắng lợi sau này.",
      story: "Câu tục ngữ cổ vũ tinh thần kiên cường bất khuất trước nghịch cảnh, nhắc nhở chúng ta đừng bao giờ sụp đổ trước những vấp ngã ban đầu.",
      example: {
        zh: "这次比赛虽然没拿到名次，但失败乃成功之母，总结经验下次再来！",
        pinyin: "Zhè cì bǐsài suīrán méi ná dào míngcì, dàn shībài nǎi chénggōng zhī mǔ, zǒngjié jīngyàn xià cì zài lái!",
        vi: "Lần thi này tuy chưa đạt giải, nhưng thất bại là mẹ thành công, đúc kết kinh nghiệm lần sau lại thi tiếp!"
      },
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      tags: ["Tục ngữ", "Ý chí", "Lạc quan"]
    }
  ],

  // 3. Mock Exams categorized by Curriculum
  examBank: {
    // Giáo trình Hán ngữ (6 Quyển xanh lá)
    hanyu: [
      {
        id: "hn_q1",
        title: "Giáo trình Hán Ngữ - Quyển 1 (Bài 1 - 15 Tổng hợp)",
        level: "Quyển 1 (Sơ cấp 1)",
        durationMinutes: 15,
        questions: [
          {
            id: "hn1_1",
            type: "listening",
            audioText: "这是我们学校的图书馆，那儿有很多书。",
            question: "[Nghe phát âm] Đoạn băng miêu tả địa điểm nào?",
            options: [
              "A. Bệnh viện (医院)",
              "B. Thư viện trường học (学校的图书馆)",
              "C. Ngân hàng Trung Quốc (中国银行)",
              "D. Nhà ăn sinh viên (食堂)"
            ],
            answer: 1,
            explanation: "Trong câu có nhắc rõ: '这是我们学校的图书馆' (Đây là thư viện của trường chúng tôi)."
          },
          {
            id: "hn1_2",
            type: "grammar",
            question: "Chọn trợ từ nghi vấn phù hợp để hoàn thành câu: '你妈妈是老师___？'",
            options: ["A. 的", "B. 吗", "C. 呢", "D. 吧"],
            answer: 1,
            explanation: "Trợ từ ngữ khí '吗' đứng ở cuối câu trần thuật để biến câu thành câu hỏi Yes/No ('Mẹ bạn là giáo viên phải không?')."
          },
          {
            id: "hn1_3",
            type: "reading",
            passage: "我叫大卫，我是美国留学生。我学习汉语，汉语很有意思，但是汉字有点儿难。",
            question: "Theo đoạn văn, David cảm thấy tiếng Trung như thế nào?",
            options: [
              "A. Rất dễ và không có gì thú vị",
              "B. Tiếng Trung thú vị nhưng chữ Hán hơi khó",
              "C. David không thích học chữ Hán",
              "D. Phát âm khó nhưng chữ Hán dễ"
            ],
            answer: 1,
            explanation: "Câu cuối nói rõ: '汉语很有意思，但是汉字有点儿难' (Tiếng Hán rất thú vị, nhưng chữ Hán có chút khó)."
          }
        ]
      },
      {
        id: "hn_q2",
        title: "Giáo trình Hán Ngữ - Quyển 2 (Ngữ pháp Bổ ngữ & So sánh)",
        level: "Quyển 2 (Sơ cấp 2)",
        durationMinutes: 20,
        questions: [
          {
            id: "hn2_1",
            type: "grammar",
            question: "Chọn câu có cấu trúc so sánh chữ '比' chính xác nhất:",
            options: [
              "A. 今天比昨天很冷。",
              "B. 他比我跑得快一点儿。",
              "C. 我比他非常喜欢中国菜。",
              "D. 这个苹果比那个很甜。"
            ],
            answer: 1,
            explanation: "Trong câu so sánh với '比', vị ngữ tính từ không được kết hợp với các phó từ chỉ mức độ như '很', '非常', '太'. Bổ ngữ số lượng/mức độ như '一点儿', '得多' đặt sau tính từ. Do đó câu B đúng."
          },
          {
            id: "hn2_2",
            type: "reading",
            passage: "北京的冬天比较冷，有时候会下雪。很多南方人喜欢冬天下雪的时候去故宫拍照，非常漂亮。",
            question: "Tại sao nhiều người miền Nam thích đến Cố Cung vào mùa đông?",
            options: [
              "A. Vì vé vào cửa miễn phí",
              "B. Vì thời tiết mùa đông ấm áp",
              "C. Vì thích chụp ảnh lúc tuyết rơi rất đẹp",
              "D. Vì ít khách du lịch"
            ],
            answer: 2,
            explanation: "Đoạn văn viết: '很多南方人喜欢冬天下雪的时候去故宫拍照，非常漂亮'."
          }
        ]
      },
      {
        id: "hn_q3",
        title: "Giáo trình Hán Ngữ - Quyển 3 & 4 (Trung cấp ngữ pháp)",
        level: "Quyển 3-4 (Trung cấp)",
        durationMinutes: 25,
        questions: [
          {
            id: "hn3_1",
            type: "grammar",
            question: "Điền kết cấu câu chữ 把: '请你把桌子上的书______。'",
            options: [
              "A. 拿",
              "B. 拿走",
              "C. 看",
              "D. 在"
            ],
            answer: 1,
            explanation: "Trong câu chữ 把, động từ không được đứng đơn độc mà phải mang theo thành phần khác (bổ ngữ xu hướng, kết quả, lặp lại...). '拿走' (cầm đi) là bổ ngữ kết quả thỏa mãn điều kiện."
          }
        ]
      }
    ],

    // Giáo trình Chuẩn HSK (HSK 1 - 6 Hanban)
    hsk: [
      {
        id: "hsk_1",
        title: "Đề thi Chuẩn HSK 1 - Bộ đề số 01",
        level: "HSK 1",
        durationMinutes: 15,
        questions: [
          {
            id: "hsk1_q1",
            type: "listening",
            audioText: "桌子上有一本书和一个苹果。",
            question: "[Nghe] Trên bàn có những đồ vật gì?",
            options: [
              "A. Một ly trà và một cái bút",
              "B. Một quyển sách và một quả táo",
              "C. Hai con mèo nhỏ",
              "D. Một chiếc máy tính"
            ],
            answer: 1,
            explanation: "Từ khóa nghe được: '一本书' (1 cuốn sách) và '一个苹果' (1 quả táo)."
          },
          {
            id: "hsk1_q2",
            type: "reading",
            question: "Chọn từ điền vào chỗ trống: '他_____是我的汉语老师。'",
            options: ["A. 不", "B. 没", "C. 么", "D. 呢"],
            answer: 0,
            explanation: "Phủ định của động từ '是' bắt buộc dùng '不' -> '不是' (không phải là)."
          }
        ]
      },
      {
        id: "hsk_2",
        title: "Đề thi Chuẩn HSK 2 - Ngữ âm & Từ vựng hội thoại",
        level: "HSK 2",
        durationMinutes: 20,
        questions: [
          {
            id: "hsk2_q1",
            type: "listening",
            audioText: "外面下雨了，你出门别忘了带伞。",
            question: "[Nghe] Câu nói nhắc nhở điều gì khi ra ngoài?",
            options: [
              "A. Đừng quên mang ô / dù vì trời mưa",
              "B. Đừng quên mang áo khoác",
              "C. Hãy đi tàu điện ngầm",
              "D. Nhớ khóa cửa cẩn thận"
            ],
            answer: 0,
            explanation: "Từ khóa: '外面下雨' (ngoài trời mưa) và '别忘了带伞' (đừng quên mang ô)."
          }
        ]
      },
      {
        id: "hsk_3",
        title: "Đề thi Chuẩn HSK 3 - Kỹ năng Đọc & Điền từ",
        level: "HSK 3",
        durationMinutes: 20,
        questions: [
          {
            id: "hsk3_q1",
            type: "grammar",
            question: "Chọn đáp án đúng: '虽然工作很累，______他依然坚持每天去健身。'",
            options: ["A. 但是", "B. 所以", "C. 因为", "D. 如果"],
            answer: 0,
            explanation: "Cặp liên từ biểu thị quan hệ chuyển ngoặt: '虽然...但是...' (Mặc dù... nhưng...)."
          },
          {
            id: "hsk3_q2",
            type: "reading",
            passage: "随着智能手机的普及，人们的阅读习惯发生了很大变化。很多人习惯利用坐地铁、等公交车的碎片时间来看新闻或者电子书。",
            question: "Đoạn văn trên chủ yếu thảo luận về vấn đề gì?",
            options: [
              "A. Giá thành của điện thoại thông minh",
              "B. Thói quen đọc sách trong thời gian vụn vặt thay đổi do smartphone",
              "C. Cách đi tàu điện ngầm an toàn",
              "D. Khó khăn khi mua sách giấy"
            ],
            answer: 1,
            explanation: "Đoạn văn nói về: '智能手机普及...阅读习惯发生了很大变化...碎片时间' (Đọc vào thời gian rảnh vụn vặt do smartphone)."
          }
        ]
      },
      {
        id: "hsk_4",
        title: "Đề thi Chuẩn HSK 4 - Đọc hiểu & Diễn đạt mạch lạc",
        level: "HSK 4",
        durationMinutes: 25,
        questions: [
          {
            id: "hsk4_q1",
            type: "grammar",
            question: "Điền liên từ phù hợp: '______遇到多大的困难，我们______不能放弃希望。'",
            options: [
              "A. 不管...也...",
              "B. 只要...就...",
              "C. 即使...也...",
              "D. 既然...就..."
            ],
            answer: 0,
            explanation: "'不管...也/都...' biểu thị điều kiện vô điều kiện: Cho dù gặp khó khăn lớn thế nào cũng không được từ bỏ."
          }
        ]
      },
      {
        id: "hsk_5",
        title: "Đề thi Chuẩn HSK 5 - Phân tích logic & Đọc hiểu nâng cao",
        level: "HSK 5",
        durationMinutes: 30,
        questions: [
          {
            id: "hsk5_q1",
            type: "grammar",
            question: "Chọn từ gần nghĩa thích hợp nhất: '这部电影之所以受欢迎，主要是因为其剧情紧凑，______引人入胜。'",
            options: ["A. 从而", "B. 进而", "C. 况且", "D. 极其"],
            answer: 3,
            explanation: "'极其' là phó từ chỉ mức độ (cực kỳ), bổ nghĩa trực tiếp cho tính từ/thành ngữ '引人入胜' (cực kỳ lôi cuốn)."
          }
        ]
      },
      {
        id: "hsk_6",
        title: "Đề thi Chuẩn HSK 6 - Văn phong học thuật & Biên dịch cao cấp",
        level: "HSK 6",
        durationMinutes: 35,
        questions: [
          {
            id: "hsk6_q1",
            type: "grammar",
            question: "Chọn câu KHÔNG có lỗi ngữ pháp (Bệnh cú 病句):",
            options: [
              "A. 通过这次深入基层的调研，使大家对乡村振兴有了更清晰的认识。",
              "B. 面对激烈的行业竞争，我们唯有不断创新，才能立于不败之地。",
              "C. 他能否顺利通过这次高级考核，关键在于平时是否努力程度。",
              "D. 随着科技的飞速发展，使得现代人的生活方式发生了巨大改变。"
            ],
            answer: 1,
            explanation: "Câu A và D đều mắc lỗi thiếu chủ ngữ do '通过...' và '随着...' che mất chủ ngữ. Câu C mắc lỗi bất đối xứng 1 bên (能否) với 1 bên. Câu B có cấu trúc '唯有...才...' hoàn toàn chuẩn xác."
          }
        ]
      }
    ]
  },

  // 4. Speaking Reflex Scenarios (HSKK / Reflex Situations)
  speakingScenarios: [
    {
      id: "spk_01",
      title: "Tự giới thiệu bản thân & Lý do học tiếng Trung",
      level: "Sơ cấp (HSKK Sơ cấp / HSK 1-2)",
      promptZh: "请简单介绍一下你自己（姓名、国籍、爱好），并说说你为什么学习中文？",
      promptPinyin: "Qǐng jiǎndān jièshào yíxià nǐ zìjǐ (xìngmíng, guójí, àihào), bìng shuōshuō nǐ wèishénme xuéxí zhōngwén?",
      promptVi: "Hãy giới thiệu ngắn gọn về bản thân (họ tên, quốc tịch, sở thích) và chia sẻ tại sao bạn lại học tiếng Trung?",
      hints: ["我叫...", "我是越南人...", "我非常喜欢...", "因为我想去中国旅游/留学..."]
    },
    {
      id: "spk_02",
      title: "Hỏi đường & Gọi món tại nhà hàng Trung Hoa",
      level: "Sơ cấp - Trung cấp (HSK 2-3)",
      promptZh: "你在北京的一家餐馆，请用中文向服务员点两个菜并询问洗手间在哪里。",
      promptPinyin: "Nǐ zài běijīng de yì jiā cānguǎn, qǐng yòng zhōngwén xiàng fúwùyuán diǎn liǎng gè cài bìng xūnwèn xǐshǒujiān zài nǎlǐ.",
      promptVi: "Bạn đang ở một quán ăn tại Bắc Kinh. Hãy gọi 2 món ăn và hỏi nhân viên nhà vệ sinh ở đâu bằng tiếng Trung.",
      hints: ["服务员，请给我们一份宫保鸡丁...", "请问洗手间在几楼？", "不要太辣..."]
    },
    {
      id: "spk_03",
      title: "Trình bày quan điểm về Làm việc từ xa (Remote Work)",
      level: "Trung cấp - Cao cấp (HSKK Trung/Cao / HSK 4-5)",
      promptZh: "现在越来越多的人选择居家远程办公。你认为远程办公有哪些利与弊？谈谈你的看法。",
      promptPinyin: "Xiànzài yuèláiyuè duō de rén xuǎnzé jūjiā yuǎnchéng bàngōng. Nǐ rènwéi yuǎnchéng bàngōng yǒu nǎxiē lì yǔ bì? Tántan nǐ de kànfǎ.",
      promptVi: "Hiện nay ngày càng nhiều người chọn làm việc từ xa tại nhà. Theo bạn làm việc từ xa có những ưu và nhược điểm gì? Hãy bày tỏ quan điểm.",
      hints: ["一方面...另一方面...", "节约上下班通勤时间...", "但缺乏面对面的沟通交流..."]
    }
  ]
};
