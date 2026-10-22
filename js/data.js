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
      figurative: "Làm những điều thừa thãi không cần thiết, chẳng những không mang lại lợi ích mà còn làm hỏng việc đã hoàn thành.",
      story: "Thời Chiến Quốc tại nước Sở, có mấy người cùng thi vẽ rắn trên mặt đất, ai vẽ xong trước sẽ được bình rượu ngon. Một người vẽ xong nhanh nhất, thấy mọi người vẫn cặm cụi, bèn đắc chí cầm bút vẽ thêm 4 cái chân cho con rắn. Người thứ hai vẽ xong liền giật lấy bình rượu nói: 'Rắn làm gì có chân mà ngươi vẽ?'. Người vẽ chân rắn đành ngậm ngùi chịu thua.",
      example: {
        zh: "这篇文章本已非常精练，你再加这两段反而是画蛇添足了。",
        pinyin: "Zhè piān wénzhāng běn yǐ fēicháng jīngliàn, nǐ zài jiā zhè liǎng duàn fǎn'ér shì huà shé tiān zú le.",
        vi: "Bài viết này vốn đã rất súc tích cô đọng, bạn thêm hai đoạn này vào ngược lại chỉ là vẽ rắn thêm chân."
      },
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Vừa đủ", "Chiến Quốc Sách"]
    },
    {
      id: "cy_04",
      category: "chengyu",
      hanzi: "愚公移山",
      pinyin: "yú gōng yí shān",
      literal: "Ông già ngốc dời núi (Ngu Công di sơn)",
      figurative: "Ý chí kiên định, bền bỉ không ngừng nghỉ vượt qua muôn vàn gian khó; dốc lòng dời non lấp bể sẽ đạt được mục tiêu.",
      story: "Ông Ngu Công đã 90 tuổi, trước cửa nhà bị hai ngọn núi lớn Thái Hành và Vương Ốc chắn lối. Ông quyết tâm cùng con cháu đục núi chuyển đất ra biển. Một người tên Trí Sưu cười nhạo ông già yếu không biết tự lượng sức. Ngu Công đáp: 'Ta chết thì còn con ta, con ta sinh cháu, cháu lại sinh con, đời đời không dứt, mà núi thì chẳng thể cao thêm, lo gì không bạt bằng?'. Tinh thần đó làm cảm động Ngọc Hoàng, phái thần hạ giới dời hai ngọn núi đi nơi khác.",
      example: {
        zh: "只要发扬愚公移山的精神，再艰巨的科学难题我们也能攻克。",
        pinyin: "Zhǐyào fāyáng yú gōng yí shān de jīngshén, zài jiānjù de kēxué nántí wǒmen yě néng gōngkè.",
        vi: "Chỉ cần phát huy tinh thần Ngu Công dời núi, dù bài toán khoa học có gian khổ đến đâu chúng ta cũng sẽ chinh phục được."
      },
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      tags: ["Kiên trì", "Ý chí", "Liệt Tử"]
    },
    {
      id: "cy_05",
      category: "chengyu",
      hanzi: "卧薪尝胆",
      pinyin: "wò xīn cháng dǎn",
      literal: "Nằm gai nếm mật (Nằm trên củi gai, nếm mật đắng)",
      figurative: "Khắc cốt ghi tâm mối thù hoặc mục tiêu lớn, tự rèn luyện gian khổ, kiên nhẫn chịu đựng đợi thời cơ phục hưng vươn lên.",
      story: "Vua nước Việt là Câu Tiễn bị vua Ngô Phù Sai đánh bại, phải sang nước Ngô làm nô lệ chăn ngựa nhẫn nhục suốt 3 năm. Sau khi được tha về nước, để không quên nỗi nhục bại trận, Câu Tiễn tối nằm ngủ trên đống củi gai sắc nhọn, trước chỗ ngồi treo một bọng mật đắng, mỗi bữa ăn đều nếm thử. Sau 10 năm mài giũa sức mạnh, nước Việt đã đánh bại nước Ngô, lập lại nghiệp lớn.",
      example: {
        zh: "经过十年卧薪尝胆的努力，这家濒临破产的企业终于跃居行业第一。",
        pinyin: "Jīngguò shí nián wò xīn cháng dǎn de nǔlì, zhè jiā bīnlín pòchǎn de qǐyè zhōngyú yuèjū hángyè dì-yī.",
        vi: "Trải qua 10 năm nếm mật nằm gai nỗ lực, doanh nghiệp bên bờ vực phá sản này cuối cùng đã vươn lên đứng đầu ngành."
      },
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      tags: ["Ý chí", "Nhẫn nại", "Sử Ký"]
    },
    {
      id: "cy_06",
      category: "chengyu",
      hanzi: "守株待兔",
      pinyin: "shǒu zhū dài tù",
      literal: "Ôm gốc cây đợi thỏ",
      figurative: "Trông chờ vào may mắn ngẫu nhiên mà không chịu chủ động nỗ lực; bảo thủ, máy móc trong tư duy.",
      story: "Thời Chiến Quốc, một người nông dân nước Tống đang cày ruộng thì bỗng thấy một con thỏ chạy thục mạng đâm đầu vào gốc cây chết tươi. Anh ta không tốn chút sức nào mà có được bữa thịt ngon, bèn vứt bỏ cày cuốc, ngày ngày ngồi ôm gốc cây chờ đợi thỏ chạy đến đâm đầu vào tiếp. Kết quả chẳng con thỏ nào đến nữa, còn ruộng đồng thì cỏ dại mọc um tùm, trở thành trò cười cho thiên hạ.",
      example: {
        zh: "找工作不能守株待兔，必须积极投递简历和准备面试。",
        pinyin: "Zhǎo gōngzuò bù néng shǒu zhū dài tù, bìxū jījí tóudì jiǎnlì hé zhǔnbèi miànshì.",
        vi: "Tìm việc làm không thể ôm cây đợi thỏ, nhất định phải chủ động rải CV và chuẩn bị phỏng vấn."
      },
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Cần cù", "Hàn Phi Tử"]
    },
    {
      id: "cy_07",
      category: "chengyu",
      hanzi: "井底之蛙",
      pinyin: "jǐng dǐ zhī wā",
      literal: "Ếch ngồi đáy giếng",
      figurative: "Người có tầm nhìn nông cạn, hiểu biết hạn hẹp nhưng lại tự phụ, không biết trời cao đất rộng bên ngoài.",
      story: "Một con ếch sống dưới giếng cạn lâu năm, nghĩ rằng cả bầu trời chỉ to bằng miệng giếng và nó là chúa tể nơi đó. Một hôm, một con rùa biển Đông tình cờ ghé qua. Ếch khoe khoang cuộc sống sung sướng dưới đáy giếng và mời rùa nhảy xuống chơi. Rùa biển liền kể cho ếch nghe về sự mênh mông vô tận nghìn dặm của biển Đông. Con ếch nghe xong chết lặng, xấu hổ nhận ra sự nhỏ bé và ngu muội của mình.",
      example: {
        zh: "我们要多走出去开阔视野，切莫做自以为是的井底之蛙。",
        pinyin: "Wǒmen yào duō zǒu chūqù kāikuò shìyě, qièmò zuò zì yǐ wéi shì de jǐng dǐ zhī wā.",
        vi: "Chúng ta phải đi ra ngoài nhiều để mở rộng tầm mắt, chớ làm chú ếch ngồi đáy giếng tự cho mình là đúng."
      },
      image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
      tags: ["Tầm nhìn", "Khiêm tốn", "Trang Tử"]
    },
    {
      id: "cy_08",
      category: "chengyu",
      hanzi: "破釜沉舟",
      pinyin: "pò fǔ chén zhōu",
      literal: "Đập vỡ nồi gang, dìm đắm thuyền bè",
      figurative: "Hạ quyết tâm đến cùng, cắt đứt mọi đường lui để quyết chiến thắng lợi, dũng cảm tiến lên phía trước.",
      story: "Trong trận Cự Lộc nổi tiếng thời Tần mạt, danh tướng Sở Bá Vương Hạng Vũ dẫn quân qua sông Hoàng Hà. Sau khi qua sông, ông ra lệnh đập vỡ toàn bộ nồi nấu cơm và đục chìm hết thuyền bè, mỗi binh sĩ chỉ mang lương thực đủ dùng trong 3 ngày để tỏ rõ ý chí: Một là đánh thắng kẻ thù, hai là tử trận chứ không có đường sống quay về. Quân sĩ cảm kích liều chết chiến đấu mãnh liệt, một người địch mười người, đại phá quân Tần.",
      example: {
        zh: "既然决定创业，就要有破釜沉舟的勇气，全力以赴向前冲。",
        pinyin: "Jìrán juédìng chuàngyè, jiù yào yǒu pò fǔ chén zhōu de yǒngqì, quánlì yǐ fù xiàng qián chōng.",
        vi: "Đã quyết định khởi nghiệp thì phải có dũng khí đập nồi dìm thuyền, dốc toàn tâm toàn lực tiến về phía trước."
      },
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      tags: ["Dũng khí", "Quyết tâm", "Sử Ký Hạng Vũ Bản Kỷ"]
    },
    {
      id: "cy_09",
      category: "chengyu",
      hanzi: "望梅止渴",
      pinyin: "wàng méi zhǐ kě",
      literal: "Nhìn thấy rừng mơ đỡ khát",
      figurative: "Dùng ảo tưởng, hy vọng tươi sáng phía trước để tự an ủi, cổ vũ tinh thần vượt qua khó khăn hiện tại.",
      story: "Thời Tam Quốc, Tào Tháo dẫn đại quân hành quân qua vùng đồi núi khô cằn vào giữa trưa hè oi ả. Binh sĩ cổ họng khô rát, kiệt sức vì thiếu nước không đi nổi. Tào Tháo cưỡi ngựa lên đỉnh đồi cao, rút roi chỉ về phía trước hô to: 'Phía trước có một rừng mơ sai trĩu quả, quả mơ vừa chua vừa ngọt, nước nhiều lắm!'. Quân sĩ nghe thấy chữ 'mơ' lập tức ứa nước miếng trong miệng, tinh thần phấn chấn rảo bước nhanh, cuối cùng tìm thấy nguồn nước thật.",
      example: {
        zh: "光看网上的美食图片不过是望梅止渴，下班后我们去大吃一顿吧！",
        pinyin: "Guāng kàn wǎngshàng de měishí túpiàn bùguò shì wàng méi zhǐ kě, xiàbān hòu wǒmen qù dà chī yí dùn ba!",
        vi: "Chỉ xem ảnh đồ ăn ngon trên mạng chẳng qua là nhìn mơ đỡ khát, tan làm chúng mình đi ăn một bữa thịnh soạn đi!"
      },
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Tào Tháo", "Tâm lý học", "Thế Thuyết Tân Ngữ"]
    },
    {
      id: "cy_10",
      category: "chengyu",
      hanzi: "班门弄斧",
      pinyin: "bān mén nòng fǔ",
      literal: "Múa búa trước cửa Lỗ Ban (Múa rìu qua mắt thợ)",
      figurative: "Khoe khoang tài nghệ vụng về, sơ sài trước mặt bậc thầy, chuyên gia lão luyện trong nghề.",
      story: "Lỗ Ban là vị sư tổ của nghề mộc thời cổ đại Trung Hoa, có tài nghệ đục đẽo tinh xảo xuất thần nhập hóa. Nhà thơ thời Đường là Mai Chi Hoán đến viếng mộ Lý Bạch tại Thái Thạch Cơ, thấy trên bia mộ đầy những bài thơ viết bậy dở tệ của người qua đường, liền cảm khái viết câu thơ: 'Thái Thạch giang đầu nhất đôi thổ, Lý Bạch danh cao giang tự lưu. Lai lai vãng vãng nhất giang phu, Lỗ Ban môn tiền lộng đại phủ' (ý chỉ làm thơ trước mộ Lý Bạch giống như múa rìu trước cửa Lỗ Ban).",
      example: {
        zh: "您是国际汉语教学专家，我在您面前谈语法简直是班门弄斧了。",
        pinyin: "Nín shì guójì hànyǔ jiàoxué zhuānjiā, wǒ zài nín miànqián tán yǔfǎ jiǎnzhí shì bān mén nòng fǔ le.",
        vi: "Thầy là chuyên gia giảng dạy Hán ngữ quốc tế, em bàn về ngữ pháp trước mặt thầy quả thật là múa rìu qua mắt thợ."
      },
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
      tags: ["Khiêm tốn", "Chuyên môn", "Văn hóa Trung Hoa"]
    },
    {
      id: "cy_11",
      category: "chengyu",
      hanzi: "狐假虎威",
      pinyin: "hú jiǎ hǔ wēi",
      literal: "Cáo mượn oai hổ (Cáo mượn oai hùm)",
      figurative: "Dựa dẫm vào quyền thế, uy danh của người khác để thị uy, hống hách bắt nạt người xung quanh.",
      story: "Một con hổ đói bắt được một con cáo định ăn thịt. Cáo nhanh trí nói: 'Ngươi không dám ăn thịt ta đâu! Trời phái ta xuống làm thủ lĩnh muôn loài thú, ngươi ăn ta là chống lại mệnh trời. Không tin, hãy đi sau lưng ta xem muôn thú có sợ ta không!'. Hổ đồng ý theo sau. Quả nhiên hươu nai rừng rú thấy hổ theo sau cáo đều hoảng hốt tháo chạy. Hổ tưởng muôn thú sợ cáo thật, đành cúi đầu thả cáo đi.",
      example: {
        zh: "他仗着叔叔是董事长就在公司里狐假虎威，大家都很反感他。",
        pinyin: "Tā zhàngzhe shūshu shì dǒngshìzhǎng jiù zài gōngsī lǐ hú jiǎ hǔ wēi, dàjiā dōu hěn fǎngǎn tā.",
        vi: "Hắn cậy có chú là Chủ tịch HĐQT mà ở công ty cáo mượn oai hùm, ai nấy đều rất phản cảm ghét bỏ."
      },
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80",
      tags: ["Điển tích", "Cảnh tỉnh", "Chiến Quốc Sách"]
    },
    {
      id: "cy_12",
      category: "chengyu",
      hanzi: "拔苗助长",
      pinyin: "bá miáo zhù zhǎng",
      literal: "Kéo mạ lên để giúp cây mau lớn",
      figurative: "Nóng vội cầu thành công mà làm trái quy luật tự nhiên, kết quả chẳng những không đạt được mà còn hủy hoại mọi sự.",
      story: "Người nước Tống nóng lòng muốn lúa ruộng nhà mình nhanh lớn, ngày nào cũng ra ngắm rồi than thở sao lúa lớn chậm quá. Nghĩ ra một kế, anh ta ra đồng dùng tay kéo từng ngọn lúa nhích lên một đoạn. Trở về nhà kiệt sức nhưng hớn hở khoe: 'Hôm nay ta mệt quá nhưng đã giúp toàn bộ mạ ruộng nhà mình cao thêm một tấc!'. Con trai chạy vội ra xem thì toàn bộ mạ trên đồng đã đứt rễ héo úa chết khô.",
      example: {
        zh: "教育孩子要遵循成长规律，强迫三岁幼儿学微积分无异于拔苗助长。",
        pinyin: "Jiàoyù háizi yào zūnxún chéngzhǎng guīlǜ, qiǎngpò sān suì yòu'ér xué wēijīfēn wúyì yú bá miáo zhù zhǎng.",
        vi: "Dạy con cần thuận theo quy luật phát triển, ép đứa trẻ 3 tuổi học giải tích chẳng khác nào kéo mạ giúp lớn hại chết con."
      },
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      tags: ["Quy luật", "Giáo dục", "Mạnh Tử"]
    },
    {
      id: "cy_13",
      category: "chengyu",
      hanzi: "盲人摸象",
      pinyin: "máng rén mō xiàng",
      literal: "Người mù sờ voi (Thầy bói xem voi)",
      figurative: "Chỉ nhìn nhận sự việc qua một khía cạnh cục bộ, phiến diện mà vội vàng quy chụp thành bản chất toàn thể.",
      story: "Có 4 người mù cùng sờ một con voi lớn để biết hình dáng voi ra sao. Người sờ vòi voi phán: 'Voi giống như một con rắn lớn'. Người sờ chân voi cãi: 'Không phải, voi rõ ràng là một cây cột đình!'. Người sờ bụng voi quả quyết: 'Voi phẳng lì và to lớn như một bức tường'. Người nắm lấy đuôi voi khẳng định: 'Các ngươi sai hết, voi rõ ràng như cái chổi xể!'. Cả 4 người tranh cãi không dứt vì ai cũng tưởng phần mình sờ là toàn bộ con voi.",
      example: {
        zh: "看问题要全面客观，只凭零碎信息就下结论往往是盲人摸象。",
        pinyin: "Kàn wèntí yào quánmiàn kèguān, zhǐ píng língsuì xìnxī jiù xià jiélùn wǎngwǎng shì máng rén mō xiàng.",
        vi: "Nhìn nhận vấn đề phải toàn diện khách quan, chỉ dựa vào vài mẩu tin rời rạc mà vội kết luận thì khác gì thầy bói xem voi."
      },
      image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80",
      tags: ["Nhận thức", "Toàn diện", "Kinh Phật"]
    },
    {
      id: "cy_14",
      category: "chengyu",
      hanzi: "亡羊补牢",
      pinyin: "wáng yáng bǔ láo",
      literal: "Mất cừu rồi mới sửa chuồng",
      figurative: "Dù đã chịu tổn thất nhưng nếu biết kịp thời rút kinh nghiệm và áp dụng biện pháp khắc phục thì vẫn chưa quá muộn.",
      story: "Trang Tân nước Sở khuyên Sở Tương Vương chớ mê đắm hoang lạc kẻo mất nước. Tương Vương không nghe, sau đó quả nhiên bị quân Tần đánh chiếm kinh đô. Tương Vương hối hận cho gọi Trang Tân hỏi kế. Trang Tân nói: 'Thấy thỏ chạy mới quay đầu gọi chó săn thì chưa muộn; cừu mất rồi mới lo sửa chuồng vẫn còn kịp thời'. Tương Vương tỉnh ngộ, chấn hưng binh sĩ, cuối cùng giành lại được đất đai.",
      example: {
        zh: "系统出现安全漏洞后立即修复，亡羊补牢，犹未为晚。",
        pinyin: "Xìtǒng chūxiàn ānquán lòudòng hòu lìjí xiūfù, wáng yáng bǔ láo, yóu wèi wéi wǎn.",
        vi: "Hệ thống xuất hiện lỗ hổng bảo mật lập tức vá lại ngay, mất bò làm chuồng, vẫn còn chưa muộn."
      },
      image: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=600&q=80",
      tags: ["Khắc phục", "Kinh nghiệm", "Chiến Quốc Sách"]
    },
    {
      id: "cy_15",
      category: "chengyu",
      hanzi: "画龙点睛",
      pinyin: "huà lóng diǎn jīng",
      literal: "Vẽ rồng chấm thêm mắt",
      figurative: "Thêm một chi tiết hoặc một lời đắt giá vào thời điểm quyết định, làm cho tác phẩm hoặc ý kiến trở nên sống động, xuất thần.",
      story: "Họa sĩ Trương Tăng Do thời Lương vẽ 4 con rồng trên tường chùa An Lạc ở Kim Lăng, nét vẽ sống động nhưng kỳ lạ là không vẽ con ngươi mắt. Mọi người tò mò hỏi lý do, ông đáp: 'Nếu điểm mắt, rồng sẽ bay đi mất'. Mọi người không tin, ép ông vẽ thử. Vừa điểm mắt cho hai con rồng, bỗng sấm chớp đùng đùng, hai con rồng phá tường bay thẳng lên mây, hai con rồng chưa điểm mắt vẫn ở nguyên trên vách.",
      example: {
        zh: "他在演讲结尾引用的这句诗，起到了画龙点睛的妙用。",
        pinyin: "Tā zài yǎnjiǎng jiéwěi yǐnyòng de zhè jù shī, qǐ dào le huà lóng diǎn jīng de miàoyòng.",
        vi: "Câu thơ anh ấy trích dẫn ở cuối bài phát biểu đã đóng vai trò điểm nhãn vẽ rồng vô cùng kỳ diệu."
      },
      image: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=600&q=80",
      tags: ["Nghệ thuật", "Sáng tạo", "Lịch Đại Danh Họa Ký"]
    },
    {
      id: "cy_16",
      category: "chengyu",
      hanzi: "对牛弹琴",
      pinyin: "duì niú tán qín",
      literal: "Gảy đàn cầm cho trâu nghe (Đàn gảy tai trâu)",
      figurative: "Nói những điều cao sâu đạo lý với người không có khả năng hiểu; hoặc dùng lời lẽ không phù hợp với đối tượng.",
      story: "Nhạc sư Công Minh Nghi thời cổ đại gảy đàn Thất huyền cầm rất hay. Một hôm thấy một con trâu đang gặm cỏ bên bãi, ông liền cao hứng đàn khúc nhạc thanh tao cổ điển. Nhưng con trâu vẫn thản nhiên cúi đầu nhai cỏ như không nghe thấy. Ông liền đổi điệu đàn mô phỏng tiếng muỗi vo ve và tiếng bê con gọi mẹ, lập tức con trâu vểnh tai vẫy đuôi lắng nghe. Câu chuyện ngụ ý nói chuyện phải biết tùy người tiếp nhận.",
      example: {
        zh: "跟一个蛮不讲理的人讲逻辑，简直就是对牛弹琴。",
        pinyin: "Gēn yí gè mán bù jiǎnglǐ de rén jiǎng luóji, jiǎnzhí jiùshì duì niú tán qín.",
        vi: "Nói logic với một kẻ ngang ngược vô lý thì chẳng khác nào đàn gảy tai trâu."
      },
      image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80",
      tags: ["Giao tiếp", "Điển tích", "Hoằng Minh Tập"]
    },
    {
      id: "cy_17",
      category: "chengyu",
      hanzi: "自相矛盾",
      pinyin: "zì xiāng máo dùn",
      literal: "Tự lấy mác mình đâm thuẫn mình (Tự mâu thuẫn)",
      figurative: "Lời nói hoặc hành động trước sau không ăn khớp, tự phủ nhận lẫn nhau, không có cơ sở xác thực.",
      story: "Có một người nước Sở bán khiên (thuẫn) và giáo (mác). Hắn nâng khiên lên khen: 'Khiên của ta vững chắc nhất trần đời, không mũi giáo nào đâm thủng được!'. Một lát sau hắn lại cầm ngọn giáo lên hét lớn: 'Giáo của ta sắc bén vô song, vật gì cũng đâm thủng được!'. Một người trong đám đông hỏi: 'Vậy nếu lấy mũi giáo của anh đâm vào tấm khiên của anh thì sao?'. Người bán hàng á khẩu không trả lời được.",
      example: {
        zh: "他刚才还说没去过现场，现在又描述那里的细节，显然是自相矛盾。",
        pinyin: "Tā gāngcái hái shuō méi qù guò xiànchǎng, xiànzài yòu miáoshù nàlǐ de xìjié, xiǎnrán shì zì xiāng máo dùn.",
        vi: "Vừa nãy anh ta còn bảo chưa từng tới hiện trường, giờ lại miêu tả chi tiết ở đó, rõ ràng là tự mâu thuẫn."
      },
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
      tags: ["Logic", "Hàn Phi Tử", "Triết học"]
    },
    {
      id: "cy_18",
      category: "chengyu",
      hanzi: "杯弓蛇影",
      pinyin: "bēi gōng shé yǐng",
      literal: "Bóng cây cung trong chén rượu hóa thành bóng rắn",
      figurative: "Thần hồn nát thần tính; tự mình dọa mình vì những nỗi sợ hãi hoang đường vô căn cứ.",
      story: "Nhạc Quảng mời một người bạn đến nhà uống rượu. Người bạn nhìn thấy trong chén rượu có con rắn nhỏ uốn lượn, trong lòng kinh hãi nhưng vì nể bạn vẫn uống cạn. Về nhà ông ta ngã bệnh nặng. Nhạc Quảng đến thăm hỏi han, rồi về xem lại chỗ ngồi uống rượu, thấy trên tường có treo một cây cung sơn màu, bóng cây cung in vào chén rượu trông hệt con rắn. Nhạc Quảng mời bạn tới chỉ rõ sự thật, người bạn hiểu ra liền khỏi hẳn bệnh.",
      example: {
        zh: "事情还没有查清楚，大家千万别杯弓蛇影、互相猜疑。",
        pinyin: "Shìqíng hái méiyǒu chá qīngchǔ, dàjiā qiānwàn bié bēi gōng shé yǐng, hùxiāng cāiyí.",
        vi: "Sự việc còn chưa điều tra sáng tỏ, mọi người chớ có thần hồn nát thần tính, nghi ngờ lẫn nhau."
      },
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
      tags: ["Tâm lý", "Điển tích", "Tấn Thư"]
    },
    {
      id: "cy_19",
      category: "chengyu",
      hanzi: "滥竽充数",
      pinyin: "làn yú chōng shù",
      literal: "Thổi sênh vu dởm trà trộn vào cho đủ số",
      figurative: "Người không có năng lực thực sự trà trộn vào tập thể giả vờ có tài; hoặc dùng hàng kém chất lượng bù cho đủ số lượng.",
      story: "Tề Tuyên Vương rất thích nghe thổi kèn sênh vu, mỗi lần đều cho ban nhạc 300 người thổi đồng thanh. Nam Quách tiên sinh không hề biết thổi sênh vu nhưng cũng xin gia nhập dàn nhạc, giả bộ phùng má lắc lư theo điệu nhạc, nhận bổng lộc hậu hĩnh suốt nhiều năm. Đến khi Tề Mẫn Vương lên ngôi, vua mới lại thích nghe từng người một thổi solo. Nam Quách tiên sinh sợ hãi vội gói ghém đồ đạc bỏ trốn trong đêm.",
      example: {
        zh: "我们招聘的是核心技术人才，绝不容许滥竽充数的人混进来。",
        pinyin: "Wǒmen zhāopìn de shì héxīn jìshù réncái, jué bù róngxǔ làn yú chōng shù de rén hùn jìn lái.",
        vi: "Chúng ta tuyển dụng nhân tài kỹ thuật nòng cốt, tuyệt đối không cho phép kẻ bất tài trà trộn vào cho đủ số."
      },
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
      tags: ["Năng lực", "Thực chất", "Hàn Phi Tử"]
    },
    {
      id: "cy_20",
      category: "chengyu",
      hanzi: "刻舟求剑",
      pinyin: "kè zhōu qiú jiàn",
      literal: "Khắc dấu lên mạn thuyền để tìm kiếm",
      figurative: "Bảo thủ, cứng nhắc, dùng tư duy cũ kỹ đứng yên để đối phó với thế giới và hoàn cảnh luôn luôn biến đổi.",
      story: "Một người nước Sở đi thuyền qua sông, sơ ý làm rơi thanh bảo kiếm xuống nước. Hắn không nhảy xuống lặn tìm ngay mà bình tĩnh rút dao khắc một vạch lên mạn thuyền, nói: 'Bảo kiếm của ta rơi từ chỗ này xuống'. Khi thuyền cập bến đỗ bên kia bờ, hắn mới lần theo vạch khắc nhảy xuống mò kiếm. Thuyền đã trôi đi hàng dặm mà kiếm nằm lại giữa dòng sông, làm sao tìm thấy được nữa!",
      example: {
        zh: "时代在飞速发展，用几十年前的老经验解决今天的问题是刻舟求剑。",
        pinyin: "Shídài zài fēisù fāzhǎn, yòng jǐshí nián qián de lǎo jīngyàn jiějué jīntiān de wèntí shì kè zhōu qiú jiàn.",
        vi: "Thời đại đang phát triển thần tốc, dùng kinh nghiệm cũ từ mấy chục năm trước để giải quyết vấn đề hôm nay là khắc thuyền tìm kiếm."
      },
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      tags: ["Linh hoạt", "Đổi mới", "Lã Thị Xuân Thu"]
    },
    {
      id: "cy_21",
      category: "chengyu",
      hanzi: "叶公好龙",
      pinyin: "yè gōng hào lóng",
      literal: "Diệp Công thích rồng",
      figurative: "Miệng nói yêu thích say đắm một điều gì đó bên ngoài vẻ hào nhoáng, nhưng khi đối diện với thực chất thì lại hoảng sợ lẩn tránh.",
      story: "Diệp Công thời xưa nổi tiếng thích rồng, trên cột nhà, xà ngang, chén đĩa, quần áo đều chạm khắc và thêu hình rồng. Thần rồng trên trời nghe tiếng cảm động, bay xuống hạ giới ghé thăm. Khi rồng thật thò đầu vào cửa sổ, vắt đuôi vào đại sảnh, Diệp Công nhìn thấy kinh hồn bạt vía, mặt cắt không còn giọt máu, la hét bỏ chạy tán loạn. Hóa ra ông ta chỉ thích những thứ hình rồng giả tạo chứ không hề yêu rồng thật.",
      example: {
        zh: "他嘴上总说热爱冒险，真要去野外露营又百般推脱，真是叶公好龙。",
        pinyin: "Tā zuǐshàng zǒng shuō rè'ài màoxiǎn, zhēn yào qù yěwài lùyíng yòu bǎibān tuītuō, zhēn shì yè gōng hào lóng.",
        vi: "Cậu ta mở miệng ra là bảo thích phiêu lưu mạo hiểm, đến khi rủ đi cắm trại dã ngoại thật thì lại đủ cớ từ chối, đúng là Diệp Công thích rồng."
      },
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      tags: ["Chân thực", "Điển tích", "Tân Tự"]
    },
    {
      id: "cy_22",
      category: "chengyu",
      hanzi: "胸有成竹",
      pinyin: "xiōng yǒu chéng zhú",
      literal: "Trong lồng ngực đã có sẵn cây tre hoàn chỉnh",
      figurative: "Đã có kế hoạch tính toán chu toàn và nắm chắc phần thắng trong tay trước khi bắt tay vào hành động.",
      story: "Họa sĩ Văn Đồng thời Bắc Tống nổi tiếng với tài vẽ trúc. Để vẽ tre thật sống động, ông trồng tre quanh nhà, bất kể nắng mưa gió tuyết đều quan sát từng cành tre, lá tre thay đổi. Nhờ vậy trước khi cầm cọ vẽ, hình dáng hoàn chỉnh của cây tre đã hiện rõ mồn một trong tâm trí ông, hạ bút là thành kiệt tác. Nhà thơ Tô Đông Pha khen ngợi: 'Họa trúc tất tiên đắc thành trúc ư hung trung' (Vẽ tre ắt phải có tre thành hình trong ngực trước).",
      example: {
        zh: "走进考场前他早已胸有成竹，所以答卷时显得从容不迫。",
        pinyin: "Zǒujìn kǎochǎng qián tā zǎoyǐ xiōng yǒu chéng zhú, suǒyǐ dájuàn shí xiǎnde cóngróng bù pò.",
        vi: "Trước khi bước vào phòng thi bạn ấy đã nắm chắc mọi kiến thức trong tay, cho nên lúc làm bài vô cùng điềm tĩnh ung dung."
      },
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      tags: ["Tự tin", "Chuẩn bị", "Tô Thức"]
    },
    {
      id: "cy_23",
      category: "chengyu",
      hanzi: "笨鸟先飞",
      pinyin: "bèn niǎo xiān fēi",
      literal: "Chim vụng cất cánh bay trước",
      figurative: "Người biết mình năng khiếu có hạn hoặc xuất phát điểm thấp thì cần chăm chỉ, khởi hành sớm hơn người khác để bù đắp.",
      story: "Thành ngữ xuất phát từ quan sát dân gian: Những chú chim chậm chạp vụng về thường phải vỗ cánh bay sớm hơn đàn chim nhanh nhẹn thì mới mong kịp đến nơi kiếm mồi. Trong học tập và sự nghiệp, câu nói tượng trưng cho đức tính khiêm tốn, lấy sự cần cù bù thông minh (cần năng bổ chuyết), không quản gian nan dậy sớm rèn luyện mỗi ngày.",
      example: {
        zh: "我底子薄，只能笨鸟先飞，每天比别人多学习两个小时。",
        pinyin: "Wǒ dǐzi báo, zhǐ néng bèn niǎo xiān fēi, měitiān bǐ biérén duō xuéxí liǎng gè xiǎoshí.",
        vi: "Nền tảng của em còn yếu, chỉ có thể làm chú chim vụng bay trước, mỗi ngày chăm chỉ học nhiều hơn người khác hai tiếng."
      },
      image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=600&q=80",
      tags: ["Cần cù", "Khiêm nhường", "Nghị lực"]
    },
    {
      id: "cy_24",
      category: "chengyu",
      hanzi: "爱屋及乌",
      pinyin: "ài wū jí wū",
      literal: "Yêu ngôi nhà yêu cả con quạ đậu trên nóc nhà",
      figurative: "Yêu ai yêu cả đường đi lối về; vì yêu quý một người mà có thiện cảm với tất cả những gì gắn liền với người đó.",
      story: "Sau khi Chu Vũ Vương diệt nhà Thương, bàn cách xử lý tàn dư quân thần nước Thương. Khương Thái Công nói: 'Thần nghe rằng yêu người thì yêu luôn cả con quạ đậu trên nóc nhà người đó; ghét người thì ghét luôn cả hàng rào góc tường nhà người đó'. Ý chỉ tình cảm của con người thường có xu hướng lan tỏa bao trùm đến mọi thứ xung quanh đối tượng mà mình thương mến.",
      example: {
        zh: "她非常崇拜那位歌手，爱屋及乌，连那位歌手推荐的书也全部买来阅读。",
        pinyin: "Tā fēicháng chóngbài nà wèi gēshǒu, ài wū jí wū, lián nà wèi gēshǒu tuījiàn de shū yě quánbù mǎi lái yuèdú.",
        vi: "Cô ấy vô cùng thần tượng ca sĩ đó, yêu nhau yêu cả đường đi, đến cả những cuốn sách ca sĩ ấy giới thiệu cô cũng mua bằng hết về đọc."
      },
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
      tags: ["Tình cảm", "Tâm lý", "Thượng Thư Đại Truyện"]
    },
    {
      id: "cy_25",
      category: "chengyu",
      hanzi: "糖衣炮弹",
      pinyin: "táng yī pào dàn",
      literal: "Viên đạn bọc đường",
      figurative: "Những lời tán tụng, quà cáp nịnh bợ ngọt ngào quyến rũ bên ngoài nhưng bên trong chứa đựng cạm bẫy hãm hại, làm lung lay ý chí.",
      story: "Hình tượng viên đạn được bao phủ bởi lớp đường ngọt ngào lừa người nếm thử. Khi lớp đường tan ra thì thuốc độc và hỏa lực bên trong mới bộc phát phá hủy mục tiêu. Thường dùng để cảnh tỉnh cán bộ, người lãnh đạo trước những cám dỗ vật chất, hối lộ tinh vi và lời ngon tiếng ngọt nơi công sở và thương trường.",
      example: {
        zh: "在职场交往中要保持清醒头脑，警惕糖衣炮弹的诱惑。",
        pinyin: "Zài zhíchǎng jiāowǎng zhōng yào bǎochí qīngxǐng tóunǎo, jǐngtì táng yī pào dàn de yòuhuò.",
        vi: "Trong giao tế chốn công sở cần giữ cái đầu tỉnh táo, cảnh giác trước sự cám dỗ của những viên đạn bọc đường."
      },
      image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80",
      tags: ["Cảnh giác", "Bản lĩnh", "Ứng xử"]
    },
    {
      id: "cy_26",
      category: "chengyu",
      hanzi: "水滴石穿",
      pinyin: "shuǐ dī shí chuān",
      literal: "Nước chảy nhỏ giọt mãi đá cũng phải mòn",
      figurative: "Sức mạnh phi thường của sự kiên trì; việc dù nhỏ bé nhưng tích lũy bền bỉ ngày qua ngày sẽ tạo nên kỳ tích vĩ đại.",
      story: "Thời Bắc Tống, quan huyện Trương Quai Nhai phát hiện một viên lại ty lén giấu một đồng tiền kho mang về nhà. Quan ra lệnh trừng phạt đánh trượng. Viên lại ty ấm ức cãi: 'Tôi chỉ lấy có một đồng tiền cỏn con, sao ngài lại đánh tôi nặng thế?'. Trương Quai Nhai nghiêm nghị viết phán quyết: 'Một ngày một đồng, ngàn ngày ngàn đồng; dây cưa gỗ đứt, nước giọt đá mòn'. Câu nói khẳng định sự tích tụ vi mô lâu ngày có thể thay đổi cục diện vĩ mô.",
      example: {
        zh: "学外语没有捷径，靠的是每天水滴石穿的积累。",
        pinyin: "Xué wàiyǔ méiyǒu jiéjìng, kào de shì měitiān shuǐ dī shí chuān de jīlěi.",
        vi: "Học ngoại ngữ không có đường tắt, mà phải dựa vào sự tích lũy bền bỉ nước chảy đá mòn mỗi ngày."
      },
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      tags: ["Kiên trì", "Tích lũy", "Hán Thư"]
    },
    {
      id: "cy_27",
      category: "chengyu",
      hanzi: "虎头蛇尾",
      pinyin: "hǔ tóu shé wěi",
      literal: "Đầu hổ đuôi rắn (Đầu voi đuôi chuột)",
      figurative: "Lúc khởi đầu thì rầm rộ phô trương nhưng về sau lại uể oải, cẩu thả rồi bỏ dở giữa chừng không đến nơi đến chốn.",
      story: "Hình tượng một con quái vật có cái đầu hổ to lớn oai phong lẫm liệt khiến ai nhìn cũng sợ, nhưng cái thân và đuôi lại nhỏ xíu yếu ớt như đuôi rắn. Trong văn hóa Trung Hoa, câu này thường dùng để phê phán thói làm việc chỉ hăng hái phong trào lúc đầu nhưng thiếu sức bền và tính kỷ luật để theo đuổi tới đích cuối cùng.",
      example: {
        zh: "做事最忌讳虎头蛇尾，既然立下了目标就要善始善终。",
        pinyin: "Zuòshì zuì jìhuì hǔ tóu shé wěi, jìrán lì xià le mùbiāo jiù yào shàn shǐ shàn zhōng.",
        vi: "Làm việc kiêng kỵ nhất là thói đầu voi đuôi chuột, một khi đã lập mục tiêu thì phải làm cho trọn vẹn từ đầu đến cuối."
      },
      image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&w=600&q=80",
      tags: ["Kỷ luật", "Bền bỉ", "Cảnh tỉnh"]
    },
    {
      id: "cy_28",
      category: "chengyu",
      hanzi: "同甘共苦",
      pinyin: "tóng gān gòng kǔ",
      literal: "Cùng chia ngọt sẻ bùi cay đắng",
      figurative: "Cùng nhau chung vai sát cánh qua mọi gian nan hoạn nạn cũng như hưởng vinh hoa phú quý; tình cảm son sắt thủy chung.",
      story: "Thời Chiến Quốc, vua nước Yên là Yên Chiêu Vương sau khi nước bị giặc tàn phá, đã hạ mình đối đãi với hiền tài, mặc áo vải thô, ăn cơm thanh đạm, tự mình thăm hỏi gia quyến binh lính nghèo khổ. Bất kể gian truân hay sung túc, ông đều cùng nhân dân chia ngọt sẻ bùi. Nhờ vậy tướng sĩ hết lòng phò tá, chiêu mộ được danh tướng Nhạc Nghị chấn hưng nước Yên hùng mạnh.",
      example: {
        zh: "真正的好朋友不是酒肉之交，而是能与你同甘共苦的人。",
        pinyin: "Zhēnzhèng de hǎo péngyǒu bú shì jiǔ ròu zhī jiāo, ér shì néng yǔ nǐ tóng gān gòng kǔ de rén.",
        vi: "Bạn tốt thực sự không phải bạn rượu thịt xả giao, mà là người có thể đồng cam cộng khổ cùng bạn qua mọi thăng trầm."
      },
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
      tags: ["Tình bạn", "Nghĩa tình", "Chiến Quốc Sách"]
    },
    {
      id: "cy_29",
      category: "chengyu",
      hanzi: "坐井观天",
      pinyin: "zuò jǐng guān tiān",
      literal: "Ngồi dưới đáy giếng ngắm nhìn bầu trời",
      figurative: "Tầm nhìn hạn hẹp, kiến thức nông cạn nhưng lại tự mãn và ngộ nhận rằng thế giới chỉ có bấy nhiêu.",
      story: "Trích từ bài ngụ ngôn kinh điển của nhà tư tưởng Hàn Dũ thời Đường: 'Tọa giếng nhi quan thiên, viết thiên tiểu giả, phi thiên tiểu dã' (Ngồi dưới giếng mà ngắm trời rồi bảo trời nhỏ, không phải vì trời nhỏ mà là vì bản thân đứng ở vị trí quá hẹp hòi). Lời nhắc nhở phải không ngừng học hỏi và bước ra biển lớn để nâng cao nhận thức.",
      example: {
        zh: "不了解国际市场就盲目自嗨，完全是坐井观天。",
        pinyin: "Bù liǎojiě guójì shìchǎng jiù mángmù zì hāi, wánquán shì zuò jǐng guān tiān.",
        vi: "Không tìm hiểu thị trường quốc tế mà đã vội tự mãn, hoàn toàn là ngồi đáy giếng nhìn trời."
      },
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      tags: ["Khiêm tốn", "Hàn Dũ", "Nhận thức"]
    },
    {
      id: "cy_30",
      category: "chengyu",
      hanzi: "闻鸡起舞",
      pinyin: "wén jī qǐ wǔ",
      literal: "Nghe tiếng gà gáy thức dậy múa kiếm",
      figurative: "Người có chí lớn, tự giác kỷ luật thức khuya dậy sớm rèn luyện học tập để đền nợ nước, lập nên sự nghiệp huy hoàng.",
      story: "Thời Đông Tấn, hai người bạn thân Tổ Địch và Lưu Côn có chí hướng phục hưng giang sơn bị ngoại tộc xâm lấn. Nửa đêm nằm ngủ nghe thấy tiếng gà rừng gáy canh tư, Tổ Địch liền đạp thức Lưu Côn dậy nói: 'Tiếng gà gáy không phải điềm xấu, đây là tiếng chuông thúc giục chúng ta rèn luyện!'. Hai người lập tức cầm gươm ra sân múa kiếm luyện võ dưới ánh trăng. Về sau cả hai đều trở thành danh tướng văn võ song toàn phụng sự đất nước.",
      example: {
        zh: "青年人要有闻鸡起舞的奋斗志向，珍惜青春时光苦练本领。",
        pinyin: "Qīngnián rén yào yǒu wén jī qǐ wǔ de fèndòu zhìxiàng, zhēnxī qīngchūn shíguāng kǔ liàn běnlǐng.",
        vi: "Thế hệ trẻ phải nuôi chí lớn nghe gà gáy múa gươm rèn tài, trân trọng thanh xuân để khổ luyện bản lĩnh."
      },
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      tags: ["Chí khí", "Khổ luyện", "Tấn Thư"]
    },
    {
      id: "pv_01",
      category: "proverb",
      hanzi: "千里之行，始于足下",
      pinyin: "qiān lǐ zhī xíng, shǐ yú zú xià",
      literal: "Hành trình ngàn dặm bắt đầu từ một bước chân",
      figurative: "Mọi thành công vĩ đại hay kế hoạch to lớn đều phải bắt đầu từ những việc nhỏ bé, cụ thể và thực tế trước mắt.",
      story: "Trích từ chương 64 của tác phẩm kinh điển 'Đạo Đức Kinh' của Lão Tử: 'Cây to ngút trời ôm không xuể mọc lên từ mầm nhỏ li ti; đài cao chín tầng xây đắp từ từng sọt đất vụn; đường đi ngàn dặm bắt đầu từ bước chân đầu tiên'. Lão Tử dạy rằng chớ coi thường việc nhỏ mà không chịu hành động ngay từ hôm nay.",
      example: {
        zh: "想掌握一门外语就要每天背诵词汇，千里之行始于足下。",
        pinyin: "Xiǎng zhǎngwò yì mén wàiyǔ jiù yào měitiān bèisòng cíhuì, qiān lǐ zhī xíng shǐ yú zú xià.",
        vi: "Muốn thành thạo một ngoại ngữ thì phải tích lũy từ vựng mỗi ngày, hành trình ngàn dặm bắt đầu từ một bước chân."
      },
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
      tags: ["Triết lý", "Bắt đầu", "Lão Tử Đạo Đức Kinh"]
    },
    {
      id: "pv_02",
      category: "proverb",
      hanzi: "一寸光阴一寸金，寸金难买寸光阴",
      pinyin: "yí cùn guāng yīn yí cùn jīn, cùn jīn nán mǎi cùn guāng yīn",
      literal: "Một tấc thời gian quý như một tấc vàng, một tấc vàng khó mua được một tấc thời gian",
      figurative: "Thời gian là thứ tài sản quý báu và vô giá nhất của đời người, một khi đã trôi qua thì dẫu có núi vàng biển bạc cũng không thể nào mua lại được.",
      story: "Xuất hiện trong cuốn 'Bạch Mã Đạo Nhân Thi' thời Đường và được phổ biến sâu rộng qua tác phẩm 'Tăng Quảng Hiền Văn'. Thời xưa dùng đồng hồ hoa mai bóng nắng (nhật khuê) để đo thời gian, bóng nắng dịch chuyển một tấc tượng trưng cho một khắc trôi qua, nhắc nhở con người phải quý từng phút từng giây.",
      example: {
        zh: "年轻时要抓紧时间求知，一寸光阴一寸金，寸金难买寸光阴啊。",
        pinyin: "Niánqīng shí yào zhuājǐn shíjiān qiúzhī, yí cùn guāngyīn yí cùn jīn, cùn jīn nán mǎi cùn guāngyīn a.",
        vi: "Tuổi trẻ phải biết tranh thủ thời gian học hỏi, tấc bóng tấc vàng, một tấc vàng khó mua được một tấc thời gian."
      },
      image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80",
      tags: ["Thời gian", "Quý trọng", "Tăng Quảng Hiền Văn"]
    },
    {
      id: "pv_03",
      category: "proverb",
      hanzi: "吃水不忘挖井人",
      pinyin: "chī shuǐ bù wàng wā jǐng rén",
      literal: "Uống nước không quên người đã đào giếng",
      figurative: "Ăn quả nhớ kẻ trồng cây, uống nước nhớ nguồn; phải luôn ghi nhớ và biết ơn công lao những người đi trước đã hy sinh tạo dựng thành quả cho ta hôm nay.",
      story: "Năm 1933 tại làng Sa Châu Bá (Thụy Kim, Giang Tây), nhân dân trong làng bị thiếu nước ngọt trầm trọng phải uống nước ao tù đục ngầu bẩn thỉu. Cán bộ đã trực tiếp dẫn đầu đội công tác cùng bà con đào một giếng nước sâu sạch trong vắt. Sau này dân làng dựng bên giếng một bia đá khắc dòng chữ: 'Uống nước không quên người đào giếng' để đời đời ghi ơn người khai sinh dòng nước mát.",
      example: {
        zh: "我们能有今天幸福平安的生活，要懂得吃水不忘挖井人，感激前辈的付出。",
        pinyin: "Wǒmen néng yǒu jīntiān xìngfú píng'ān de shēnghuó, yào dǒngdé chī shuǐ bù wàng wā jǐng rén, gǎnjī qiánbèi de fùchū.",
        vi: "Chúng ta có được cuộc sống hạnh phúc bình yên hôm nay phải biết uống nước nhớ nguồn, biết ơn sự hy sinh cống hiến của thế hệ đi trước."
      },
      image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
      tags: ["Tri ân", "Biết ơn", "Đạo đức"]
    },
    {
      id: "pv_04",
      category: "proverb",
      hanzi: "活到老，学到老",
      pinyin: "huó dào lǎo, xué dào lǎo",
      literal: "Sống đến già thì phải học đến già",
      figurative: "Học tập là việc cả đời không có điểm dừng; tri thức nhân loại là vô tận, tuổi tác càng cao càng phải không ngừng trau dồi hiểu biết và tư duy.",
      story: "Câu danh ngôn nổi tiếng của Trang Tử: 'Đời ta có hạn mà tri thức thì vô cùng tận'. Nhà triết học Tuân Tử cũng khẳng định: 'Học bất khả dĩ dĩ' (Việc học tập không thể dừng lại). Đây là phương châm giáo dục cốt lõi của nền văn minh Nho gia suốt mấy ngàn năm lịch sử, thôi thúc con người giữ tâm thế học trò dù ở bất kỳ lứa tuổi nào.",
      example: {
        zh: "七十岁的李爷爷学会了使用智能手机在网上看书，真是活到老学到老。",
        pinyin: "Qīshí suì de Lǐ yéye xuéhuì le shǐyòng zhìnéng shǒujī zài wǎngshàng kànshū, zhēn shì huó dào lǎo xué dào lǎo.",
        vi: "Cụ Lý 70 tuổi đã học được cách dùng điện thoại thông minh để đọc sách mạng, đúng là sống đến già học đến già."
      },
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80",
      tags: ["Học tập", "Cả đời", "Tư duy"]
    },
    {
      id: "pv_05",
      category: "proverb",
      hanzi: "失败乃成功之母",
      pinyin: "shī bài nǎi chéng gōng zhī mǔ",
      literal: "Thất bại chính là mẹ của thành công",
      figurative: "Thất bại không phải là dấu chấm hết mà là người thầy vĩ đại; mỗi lần vấp ngã là một bài học đắt giá mở lối dẫn tới thành quả rực rỡ sau này.",
      story: "Câu nói đúc kết từ triết lý biến chứng mâu thuẫn của cổ nhân: Họa và phúc nương tựa nhau. Mọi phát minh khoa học từ bóng đèn của Edison cho đến các chiến lược gia vĩ đại đều trải qua hàng trăm lần thử nghiệm thất bại mới đúc rút ra công thức đúng đắn cuối cùng.",
      example: {
        zh: "这次实验虽然没有得到预期结果，但失败乃成功之母，大家不要灰心。",
        pinyin: "Zhè cì shíyàn suīrán méiyǒu dédào yùqī jiéguǒ, dàn shībài nǎi chénggōng zhī mǔ, dàjiā bú yào huīxīn.",
        vi: "Lần thử nghiệm này tuy chưa đạt kết quả dự kiến, nhưng thất bại là mẹ thành công, mọi người chớ nản lòng."
      },
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      tags: ["Lạc quan", "Nghị lực", "Khởi nghiệp"]
    },
    {
      id: "pv_06",
      category: "proverb",
      hanzi: "熟能生巧",
      pinyin: "shú néng shēng qiǎo",
      literal: "Rèn luyện thuần thục thì sẽ sinh ra sự tinh xảo, khéo léo (Trăm hay không bằng tay quen)",
      figurative: "Bất kỳ kỹ năng nào chỉ cần được lặp đi lặp lại nhiều lần với sự tập trung cao độ sẽ biến thành phản xạ thuần thục điêu luyện tuyệt đỉnh.",
      story: "Thời Bắc Tống, quan đại phu Trần Nghiêu Tư có tài bắn cung bách phát bách trúng, tự đắc cho rằng mình vô địch. Một ông lão bán dầu đứng xem chỉ gật đầu nhẹ. Trần Nghiêu Tư giận hỏi: 'Ngươi cũng biết bắn cung à? Sao dám coi thường tài ta?'. Ông lão thản nhiên đáp: 'Không có gì lạ, chẳng qua là tay quen mà thôi'. Nói rồi ông đặt một đồng xu có lỗ vuông lên miệng hồ lô, múc gáo dầu đổ từ trên cao xuống, dòng dầu rót thẳng qua lỗ đồng xu vào bình mà không hề dính một giọt nào vào mép đồng tiền.",
      example: {
        zh: "打字一开始很慢，但只要每天练习，熟能生巧，很快就能盲打。",
        pinyin: "Dǎzì yì kāishǐ hěn màn, dàn zhǐyào měitiān liànxí, shú néng shēng qiǎo, hěn kuài jiù néng mángdǎ.",
        vi: "Lúc đầu gõ phím còn chậm, nhưng chỉ cần tập luyện mỗi ngày, trăm hay không bằng tay quen, chẳng mấy chốc sẽ gõ phím 10 ngón thành thạo."
      },
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
      tags: ["Kỹ năng", "Luyện tập", "Âu Dương Tu"]
    },
    {
      id: "pv_07",
      category: "proverb",
      hanzi: "近朱者赤，近墨者黑",
      pinyin: "jìn zhū zhě chì, jìn mò zhě hēi",
      literal: "Gần chu sa thì đỏ, gần mực tàu thì đen (Gần mực thì đen, gần đèn thì rạng)",
      figurative: "Môi trường sống, bạn bè và những người xung quanh có sức ảnh hưởng cực kỳ sâu sắc và trực tiếp đến nhân cách, tính cách của một người.",
      story: "Phó Huyền thời Tây Tấn trong bài 'Thái Tử Thiếu Phó Châm' đã viết: 'Cố cận chu giả xích, cận mặc giả hắc; thanh thính giả thông, thông tư giả duệ'. Điển tích nổi tiếng nhất minh chứng cho triết lý này là mẹ của Mạnh Tử 3 lần dọn nhà (Mạnh mẫu tam thiên) để tìm cho con môi trường học tập mẫu mực nhất.",
      example: {
        zh: "交朋友必须谨慎，近朱者赤近墨者黑，好伙伴能激励你向上。",
        pinyin: "Jiāo péngyǒu bìxū jǐnshèn, jìn zhū zhě chì jìn mò zhě hēi, hǎo huǒbàn néng jīlì nǐ xiàngshàng.",
        vi: "Kết bạn nhất định phải thận trọng, gần mực thì đen gần đèn thì rạng, bạn bè tốt sẽ thôi thúc bạn tiến bộ vươn lên."
      },
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      tags: ["Môi trường", "Bạn bè", "Mạnh Mẫu"]
    },
    {
      id: "pv_08",
      category: "proverb",
      hanzi: "知己知彼，百战百胜",
      pinyin: "zhī jǐ zhī bǐ, bǎi zhàn bǎi shèng",
      literal: "Biết rõ bản thân, hiểu rõ đối phương thì trăm trận trăm thắng",
      figurative: "Trong mọi cuộc đàm phán, thi đấu hay kinh doanh, nếu nắm vững cả điểm mạnh yếu của mình lẫn đối thủ thì chắc chắn sẽ nắm chắc phần thắng.",
      story: "Xuất phát từ thiên 'Mưu Công' trong tác phẩm kinh điển 'Tôn Tử Binh Pháp' của Tôn Vũ: 'Tri bỉ tri kỷ giả, bách chiến bất đãi; bất tri bỉ nhi tri kỷ, nhất thắng nhất phụ; bất tri bỉ bất tri kỷ, mỗi chiến tất đãi' (Biết người biết ta trăm trận không nguy; không biết người mà chỉ biết mình thì một thắng một thua; không biết cả người lẫn mình thì trận nào cũng bại vong).",
      example: {
        zh: "进入新市场前要做透竞品分析，做到知己知彼，百战百胜。",
        pinyin: "Jìnrù xīn shìchǎng qián yào zuò tòu jìngpǐn fēnxī, zuò dào zhī jǐ zhī bǐ, bǎi zhàn bǎi shèng.",
        vi: "Trước khi bước vào thị trường mới cần phân tích thấu đáo đối thủ cạnh tranh, đạt đến mức biết người biết ta, trăm trận trăm thắng."
      },
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80",
      tags: ["Chiến lược", "Binh pháp", "Tôn Tử"]
    },
    {
      id: "pv_09",
      category: "proverb",
      hanzi: "谋事在人，成事在天",
      pinyin: "móu shì zài rén, chéng shì zài tiān",
      literal: "Mưu tính việc do ở con người, thành bại nên việc do ở trời đất",
      figurative: "Bản thân phải dốc toàn tâm toàn lực để chuẩn bị và nỗ lực hết mình, còn kết quả cuối cùng phải thuận theo thời vận, không nên quá cưỡng cầu.",
      story: "Trong tác phẩm Tam Quốc Diễn Nghĩa, Gia Cát Lượng lập kế dụ cha con Tư Mã Ý vào hẻm Thượng Phương Cốc rồi phóng hỏa thiêu đốt. Khi lửa bốc cháy dữ dội ngút trời, tưởng chừng quân Ngụy sắp bị tiêu diệt sạch thì bất ngờ một cơn mưa rào đổ ập xuống dập tắt ngọn lửa cứu thoát Tư Mã Ý. Gia Cát Lượng nhìn trời thở dài cảm thán: 'Mưu sự tại nhân, thành sự tại thiên, không thể cưỡng cầu được vậy!'.",
      example: {
        zh: "我们已经做了最充分的准备，谋事在人成事在天，放平心态去迎接结果吧。",
        pinyin: "Wǒmen yǐjīng zuò le zuì chōngfèn de zhǔnbèi, móu shì zài rén chéng shì zài tiān, fàng píng xīntài qù yíngjiē jiéguǒ ba.",
        vi: "Chúng ta đã chuẩn bị chu đáo nhất có thể, mưu sự tại nhân thành sự tại thiên, hãy giữ tâm thế bình thản đón nhận kết quả."
      },
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      tags: ["Tâm thế", "Gia Cát Lượng", "Tam Quốc Diễn Nghĩa"]
    },
    {
      id: "pv_10",
      category: "proverb",
      hanzi: "树欲静而风不止",
      pinyin: "shù yù jìng ér fēng bù zhǐ",
      literal: "Cây muốn đứng yên lặng mà gió chẳng chịu ngừng thổi",
      figurative: "Con cái khi muốn phụng dưỡng báo hiếu thì cha mẹ đã qua đời; hoàn cảnh khách quan bên ngoài luôn thay đổi không theo ý muốn chủ quan của con người.",
      story: "Khổng Tử đi du ngoạn nghe thấy tiếng khóc thảm thiết của Khâu Ngô Tử. Hỏi duyên cớ, Khâu Ngô Tử khóc đáp rằng thời trẻ mải mê ngao du học đạo mưu cầu công danh, đến khi công thành danh toại trở về quê hương thì cha mẹ già đều đã mất cả, không còn cơ hội báo đáp. Ông thốt lên câu ca xót xa: 'Thụ dục tĩnh nhi phong bất chỉ, tử dục dưỡng nhi thân bất đãi' (Cây muốn lặng mà gió chẳng đừng, con muốn nuôi mà cha mẹ chẳng còn).",
      example: {
        zh: "树欲静而风不止，子欲养而亲不待。趁父母健在，常回家看看他们。",
        pinyin: "Shù yù jìng ér fēng bù zhǐ, zǐ yù yǎng ér qīn bù dài. Chèn fùmǔ jiànzài, cháng huí jiā kànkan tāmen.",
        vi: "Cây muốn lặng mà gió chẳng dừng, con muốn phụng dưỡng mà cha mẹ chẳng còn đợi. Hãy tranh thủ lúc cha mẹ còn mạnh khỏe, thường xuyên về thăm họ."
      },
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tags: ["Hiếu đạo", "Gia đình", "Khổng Tử Gia Ngữ"]
    },
    {
      id: "pv_11",
      category: "proverb",
      hanzi: "万事开头难",
      pinyin: "wàn shì kāi tóu nán",
      literal: "Muôn vạn sự việc lúc bắt đầu đều luôn khó khăn nhất (Vạn sự khởi đầu nan)",
      figurative: "Bất kỳ dự án mới, kỹ năng mới hay hành trình nào, giai đoạn chập chững bước đầu bao giờ cũng vất vả chông gai nhất; vượt qua được bước đầu này thì mọi sự sẽ hanh thông.",
      story: "Câu tục ngữ dân gian truyền khẩu ngàn đời của Trung Quốc, động viên con người khi gặp bỡ ngỡ trở ngại trong những ngày đầu bắt tay vào việc mới. Cũng như gieo hạt xuống đất cằn, lúc phá vỏ đâm chồi cần nội lực mạnh mẽ nhất, một khi mầm cây đã bén rễ thì sẽ vươn lên xanh tốt mỗi ngày.",
      example: {
        zh: "学编程第一周总是容易让人困惑，万事开头难，坚持下去就会柳暗花明。",
        pinyin: "Xué biānchéng dì-yī zhōu zǒng shì róngyì ràng rén kùnhuò, wàn shì kāi tóu nán, jiānchí xiàqù jiù huì liǔ àn huā míng.",
        vi: "Tuần đầu học lập trình bao giờ cũng dễ làm người ta hoang mang, vạn sự khởi đầu nan, kiên trì theo đuổi ắt sẽ thấy ánh sáng rực rỡ."
      },
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      tags: ["Khởi đầu", "Động lực", "Kiên nhẫn"]
    },
    {
      id: "pv_12",
      category: "proverb",
      hanzi: "水至清则无鱼，人至察则无徒",
      pinyin: "shuǐ zhì qīng zé wú yú, rén zhì chá zé wú tú",
      literal: "Nước trong quá thì không có cá, người xét nét quá thì không có bạn bè đồ đệ",
      figurative: "Đối nhân xử thế cần có lòng bao dung, độ lượng; quá khắt khe, cầu toàn và soi mói lỗi lầm nhỏ nhặt của người khác sẽ khiến mình cô độc không ai dám gần gũi.",
      story: "Đông Phương Sóc thời Tây Hán trong bài 'Đáp Khách Nan' đã mượn lời này để giảng giải về thuật đối nhân xử thế và trị quốc: Nước trong vắt nhìn thấy tận đáy thì cá không có nơi ẩn nấp sinh sôi; người làm việc mà quá khắt khe chấp nhặt từng li từng tí thì sẽ khiến người khác xa lánh, không chiêu mộ được bằng hữu và hiền tài.",
      example: {
        zh: "作为团队管理者要懂得容人之短，水至清则无鱼，苛责反而让大家不敢创新。",
        pinyin: "Zuòwéi tuánduì guǎnlǐzhě yào dǒngdé róng rén zhī duǎn, shuǐ zhì qīng zé wú yú, kēzé fǎn'ér ràng dàjiā bù gǎn chuàngxīn.",
        vi: "Là người quản lý nhóm phải biết bao dung khiếm khuyết của người khác, nước trong quá không có cá, quá khắt khe ngược lại chỉ khiến cấp dưới không dám sáng tạo."
      },
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      tags: ["Bao dung", "Quản trị", "Đại Đới Lễ Ký"]
    },
    {
      id: "pv_13",
      category: "proverb",
      hanzi: "良药苦口利于病，忠言逆耳利于行",
      pinyin: "liáng yào kǔ kǒu lì yú bìng, zhōng yán nì ěr lì yú xíng",
      literal: "Thuốc tốt đắng miệng nhưng lợi cho chữa bệnh, lời nói ngay thật chói tai nhưng lợi cho hành động tu thân (Thuốc đắng dã tật, lời thật mất lòng)",
      figurative: "Những lời phê bình đóng góp chân thành dù nghe khó chịu xót tai nhưng chính là phương thuốc quý giúp ta sửa sai và tiến bộ.",
      story: "Sau khi Lưu Bang đánh chiếm kinh đô Hàm Dương nhà Tần, thấy cung điện xa hoa mỹ nữ đầy rẫy liền muốn ở lại hưởng lạc. Dũng tướng Phàn Khoái và mưu thần Trương Lương kịch liệt can ngăn, nhắc Lưu Bang bài học của Tần vương. Trương Lương nói: 'Thuốc tốt đắng miệng lợi cho bệnh, lời ngay trái tai lợi cho việc làm, mong Bái Công nghe theo lời Phàn Khoái'. Lưu Bang bèn đóng dấu kho tàng rút quân ra cắm trại bên ngoài, nhờ đó thu phục được trọn vẹn lòng dân Tam Tần.",
      example: {
        zh: "导师对你的论文批注意见虽然严厉，但良药苦口利于病，照着改水平定会大增。",
        pinyin: "Dǎoshī duì nǐ de lùnwén pīzhù yìjiàn suīrán yánlì, dàn liáng yào kǔ kǒu lì yú bìng, zhàozhe gǎi shuǐpíng dìng huì dà zēng.",
        vi: "Ý kiến nhận xét của thầy hướng dẫn về luận văn của bạn tuy nghiêm khắc, nhưng thuốc đắng dã tật, sửa theo đó trình độ chắc chắn sẽ tăng vượt bậc."
      },
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      tags: ["Lắng nghe", "Sửa mình", "Sử Ký Lưu Hầu Thế Gia"]
    },
    {
      id: "pv_14",
      category: "proverb",
      hanzi: "千里送鹅毛，礼轻情意重",
      pinyin: "qiān lǐ sòng é máo, lǐ qīng qíng yì zhòng",
      literal: "Ngàn dặm xa xôi gửi một chiếc lông ngỗng, lễ vật tuy nhẹ nhưng tấm lòng nặng tựa thái sơn",
      figurative: "Giá trị của quà tặng không nằm ở giá tiền vật chất đắt đỏ, mà nằm ở tình cảm chân thành sâu nặng và sự quan tâm của người trao gửi.",
      story: "Thời Đường, thứ sử Miện Châu phái một sứ giả tên Miễn Bá Cao mang một con thiên nga trắng quý hiếm đi cống nạp cho Đường Thái Tông. Khi qua hồ Miện Trì, sứ giả mở lồng tắm rửa cho thiên nga, không may thiên nga tung cánh bay vút lên trời mất hút, chỉ rụng lại một chiếc lông vũ trên mặt nước. Sứ giả đành nhặt chiếc lông ngỗng bọc trong gấm quý mang đến kinh đô dâng vua kèm bài thơ trần tình chân thành. Vua Đường cảm động trước lòng trung thực không dối lừa, ban thưởng hậu hĩnh cho ông.",
      example: {
        zh: "这份亲手编织的围巾千里送鹅毛礼轻情意重，是我收到最温暖的礼物。",
        pinyin: "Zhè fèn qīnshǒu biānzhī de wéijīn qiān lǐ sòng é máo lǐ qīng qíngyì zhòng, shì wǒ shōudào zuì wēnnuǎn de lǐwù.",
        vi: "Chiếc khăn len tự tay bạn đan này ngàn dặm gửi lông ngỗng của tuy mọn nghĩa nặng nghìn cân, là món quà ấm áp nhất mình từng nhận được."
      },
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=600&q=80",
      tags: ["Tình cảm", "Chân thành", "Điển tích"]
    },
    {
      id: "pv_15",
      category: "proverb",
      hanzi: "知人知面不知心",
      pinyin: "zhī rén zhī miàn bù zhī xīn",
      literal: "Biết người biết vẻ mặt nhưng khó biết được bụng dạ lòng người",
      figurative: "Lòng người sâu hiểm khó dò; không thể chỉ nhìn vẻ bề ngoài tươi cười thân thiện hay tướng mạo lịch thiệp mà vội tin tưởng hoàn toàn.",
      story: "Trích từ danh tác 'Tây Du Ký' của Ngô Thừa Ân và truyện cổ tích dân gian: Bọn yêu quái thường biến hóa thành những cô gái trẻ đẹp, cụ già hiền lành để đánh lừa lòng trắc ẩn của con người. Tôn Ngộ Không có hỏa nhãn kim tinh nhìn thấu bản chất thật, trong khi người đời thường dễ bị che mắt bởi lớp vỏ bọc bề ngoài giả nhân giả nghĩa.",
      example: {
        zh: "害人之心不可有，防人之心不可无，毕竟知人知面不知心。",
        pinyin: "Hài rén zhī xīn bù kě yǒu, fáng rén zhī xīn bù kě wú, bìjìng zhī rén zhī miàn bù zhī xīn.",
        vi: "Tâm hại người không được có, nhưng tâm phòng người không thể thiếu, bởi lẽ biết người biết mặt khó biết lòng."
      },
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      tags: ["Cảnh giác", "Đối nhân", "Tây Du Ký"]
    },
    {
      id: "pv_16",
      category: "proverb",
      hanzi: "冰冻三尺，非一日之寒",
      pinyin: "bīng dòng sān chǐ, fēi yí rì zhī hán",
      literal: "Băng đóng dày ba thước không phải do cái lạnh của một ngày đơn lẻ tạo thành",
      figurative: "Bất kỳ mâu thuẫn sâu sắc, thói hư tật xấu hay thành tựu phi thường nào cũng là kết quả tích tụ lâu ngày; giải quyết việc cần kiên nhẫn lần gỡ từ gốc rễ.",
      story: "Vương Sung thời Đông Hán trong luận thư 'Luận Hoành': 'Băng đống tam xích, phi nhất nhật chi hàn; tích thổ thành sơn, phi tư tu chi ích'. Khẳng định quy luật chuyển hóa từ lượng thành chất trong triết học phương Đông: Mọi sự vật trên đời từ tình cảm rạn nứt đến thể lực cường tráng đều là hệ quả của chuỗi ngày dài hun đúc.",
      example: {
        zh: "他们夫妻间的矛盾是多年积累造成的，冰冻三尺非一日之寒啊。",
        pinyin: "Tāmen fūqī jiān de máodùn shì duō nián jīlěi zàochéng de, bīng dòng sān chǐ fēi yí rì zhī hán a.",
        vi: "Mâu thuẫn giữa hai vợ chồng họ là do nhiều năm dồn nén tích tụ tạo thành, băng dày ba thước không phải bởi cái lạnh một ngày."
      },
      image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=600&q=80",
      tags: ["Quy luật", "Tích tụ", "Luận Hoành"]
    },
    {
      id: "pv_17",
      category: "proverb",
      hanzi: "世上无难事，只怕有心人",
      pinyin: "shì shàng wú nán shì, zhǐ pà yǒu xīn rén",
      literal: "Trên đời không có việc gì khó, chỉ sợ người có tâm quyết chí",
      figurative: "Chẳng có trở ngại hay khó khăn nào không thể vượt qua, miễn là con người có ý chí sắt đá, lòng quyết tâm và sự kiên trì bền bỉ đến cùng.",
      story: "Xuất hiện trong tác phẩm kinh điển 'Hồng Lâu Mộng' (Hồi thứ 48), khi Hương Lăng muốn học làm thơ, Đại Ngọc khích lệ nàng: 'Thế thượng vô nan sự, chỉ phạ hữu tâm nhân'. Nhờ khổ công đọc thuộc 300 bài thơ Đường, Hương Lăng đã sáng tác được những vần thơ thanh nhã tuyệt trần làm kinh ngạc chốn Đại Quan Viên.",
      example: {
        zh: "哪怕零基础学汉语也不用怕，世上无难事只怕有心人！",
        pinyin: "Nǎpà líng jīchǔ xué hànyǔ yě bú yòng pà, shì shàng wú nán shì zhǐ pà yǒu xīn rén!",
        vi: "Dù cho học tiếng Trung từ con số 0 cũng đừng sợ, trên đời không có việc gì khó, chỉ sợ lòng không bền!"
      },
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=600&q=80",
      tags: ["Quyết tâm", "Khích lệ", "Hồng Lâu Mộng"]
    },
    {
      id: "pv_18",
      category: "proverb",
      hanzi: "留得青山在，不怕没柴烧",
      pinyin: "liú dé qīng shān zài, bù pà méi chái shāo",
      literal: "Giữ được ngọn núi xanh thì lo gì không có củi để đốt",
      figurative: "Chỉ cần bảo toàn được sinh mệnh, sức khỏe và ý chí cốt lõi thì dù trước mắt có thất bại trắng tay cũng vẫn còn cơ hội gầy dựng lại từ đầu.",
      story: "Truyền thuyết dân gian về một người thợ tiều phu đốn củi: Người thợ dại dột chặt sạch cả cây non lẫn rễ khiến núi biến thành đồi trọc, sang năm sau không còn một mẩu củi để đun. Người thợ thông minh chỉ tỉa cành khô, chăm sóc cho núi rừng luôn xanh tốt, nhờ vậy suốt đời không bao giờ thiếu củi đốt. Về sau câu nói trở thành triết lý bảo toàn sinh lực quý giá nhất của con người.",
      example: {
        zh: "工作再忙也要按时吃饭休息，留得青山在不怕没柴烧，身体才是第一位的。",
        pinyin: "Gōngzuò zài máng yě yào ànshí chīfàn xiūxi, liú dé qīng shān zài bù pà méi chái shāo, shēntǐ cái shì dì-yī wèi de.",
        vi: "Công việc bận rộn đến đâu cũng phải ăn ngủ đúng giờ, còn rừng xanh lo gì không có củi đốt, sức khỏe mới là số một."
      },
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
      tags: ["Sức khỏe", "Bảo toàn", "Triết lý sống"]
    },
    {
      id: "pv_19",
      category: "proverb",
      hanzi: "路遥知马力，日久见人心",
      pinyin: "lù yáo zhī mǎ lì, rì jiǔ jiàn rén xīn",
      literal: "Đường đi xa ngàn dặm mới biết sức ngựa dẻo dai, ngày tháng dài lâu mới thấu tỏ lòng dạ con người",
      figurative: "Bản chất thật sự, sự thủy chung và lòng chân thành của một con người cần phải qua thời gian dài thử thách trong thực tế mới bộc lộ sáng tỏ.",
      story: "Xuất hiện trong tác phẩm 'Tranh Báo Ân' thời Nguyên và 'Phong Thần Diễn Nghĩa'. Muốn biết một con chiến mã có phải tuấn mã hảo hạng hay không thì phải cưỡi qua vạn dặm đường trường; kết bạn muốn biết có phải tri kỷ trung thành hay không phải đợi qua lúc hoạn nạn thử thách thời gian.",
      example: {
        zh: "合作初期不用急着下定论，路遥知马力日久见人心，时间会证明诚信。",
        pinyin: "Hézuò chūqī bú yòng jízhe xià dìnglùn, lù yáo zhī mǎ lì rì jiǔ jiàn rén xīn, shíjiān huì zhèngmíng chéngxìn.",
        vi: "Giai đoạn đầu hợp tác không cần vội kết luận, đường dài mới biết ngựa hay ở lâu mới hay lòng người, thời gian sẽ chứng minh sự uy tín chân thành."
      },
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80",
      tags: ["Chân thành", "Thời gian", "Thử thách"]
    },
    {
      id: "pv_20",
      category: "proverb",
      hanzi: "吃得苦中苦，方为人上人",
      pinyin: "chī dé kǔ zhōng kǔ, fāng wéi rén shàng rén",
      literal: "Ăn được nỗi khổ cực cay đắng nhất trong muôn vàn cái khổ, mới có thể trở thành người đứng đầu thiên hạ",
      figurative: "Muốn đạt được đỉnh cao thành tựu và sự kính trọng vượt bậc của xã hội thì phải sẵn sàng chịu đựng những gian truân, thử thách mà người bình thường không kham nổi.",
      story: "Câu châm ngôn nổi tiếng trong bộ sách luân lý cổ 'Cảnh Thế Hiền Văn' của Trung Hoa, thường dùng làm câu đối treo trong các thư phòng để nhắc nhở học trò văn nhân mài đắp chí khí khoa cử, dù đèn sách lạnh lẽo mười năm vẫn không được sờn lòng nản chí.",
      example: {
        zh: "运动员为了站上奥运领奖台每天挥汗如雨，正是吃得苦中苦方为人上人。",
        pinyin: "Yùndòngyuán wèile zhàn shàng àoyùn lǐngjiǎngtái měitiān huīhàn rúyǔ, zhèng shì chī dé kǔ zhōng kǔ fāng wéi rén shàng rén.",
        vi: "Vận động viên để bước lên bục vinh quang Olympic mỗi ngày đều đổ mồ hôi sôi nước mắt, đúng là chịu được nỗi khổ cùng cực mới đứng trên đỉnh cao."
      },
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      tags: ["Khổ luyện", "Vươn lên", "Cảnh Thế Hiền Văn"]
    },
    {
      id: "pv_21",
      category: "proverb",
      hanzi: "种瓜得瓜，种豆得豆",
      pinyin: "zhòng guā dé guā, zhòng dòu dé dòu",
      literal: "Trồng dưa thì được quả dưa, trồng đậu thì được hạt đậu (Gieo nhân nào gặt quả nấy)",
      figurative: "Luật nhân quả phổ quát; gieo hạt giống thiện lương nỗ lực sẽ gặt hái quả ngọt hạnh phúc, làm điều sai trái lười biếng ắt phải nhận hậu quả cay đắng.",
      story: "Xuất phát từ kinh điển nhà Phật và được ghi nhận trong 'Niết Bàn Kinh': 'Chủng qua đắc qua, chủng đậu đắc đậu; quả tùy nhân chuyển, như ảnh tùy hình'. Đạo lý giản dị từ đồng ruộng của người nông dân nhắc nhở con người luôn phải ý thức từng hành vi và lời nói hàng ngày của mình.",
      example: {
        zh: "你在学习上付出的每一分汗水都会化作优异成绩，种瓜得瓜种豆得豆。",
        pinyin: "Nǐ zài xuéxí shàng fùchū de měi yì fēn hànshuǐ dōu huì huà zuò yōuyì chéngjì, zhòng guā dé guā zhòng dòu dé dòu.",
        vi: "Mỗi giọt mồ hôi bạn bỏ ra cho việc học tập đều sẽ hóa thành điểm số xuất sắc, gieo nhân nào gặt quả nấy."
      },
      image: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80",
      tags: ["Nhân quả", "Quy luật", "Nỗ lực"]
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
