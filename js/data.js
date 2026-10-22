// Mock Data Repository for Chinese EdTech Application
// HSK 1 - 6 Vocabulary, Chengyu, Exam Questions, Speaking Scenarios

window.APP_DATA = {
  // 1. Comprehensive Vocabulary Bank (HSK 1 - 6)
  vocabList: [
    // HSK 1
    {
      id: "v1_01",
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      meaning: "Xin chào (lời chào phổ biến)",
      hsk: 1,
      radical: "亻 (Nhân đứng) & 女 (Nữ)",
      strokes: 7,
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
      radical: "讠 (Ngôn)",
      strokes: 12,
      collocations: ["不客气 (Không có chi)", "多谢 (Đa tạ)"],
      example: {
        zh: "谢谢老师的耐心帮助。",
        pinyin: "Xièxie lǎoshī de nàixīn bāngzhù.",
        vi: "Cảm ơn sự giúp đỡ kiên nhẫn của thầy cô."
      }
    },

    // HSK 2
    {
      id: "v2_01",
      hanzi: "旅游",
      pinyin: "lǚ yóu",
      meaning: "Du lịch, đi tham quan",
      hsk: 2,
      radical: "方 (Phương) & 氵 (Thủy)",
      strokes: 10,
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
      collocations: ["晨跑 (Chạy bộ buổi sáng)", "每天跑步 (Chạy bộ mỗi ngày)"],
      example: {
        zh: "他每天早晨六点去公园跑步。",
        pinyin: "Tā měitiān zǎochén liù diǎn qù gōngyuán pǎobù.",
        vi: "Anh ấy mỗi sáng 6 giờ đều đến công viên chạy bộ."
      }
    },

    // HSK 3
    {
      id: "v3_01",
      hanzi: "解决",
      pinyin: "jiě jué",
      meaning: "Giải quyết, dàn xếp",
      hsk: 3,
      radical: "角 (Giác) & 冫 (Băng)",
      strokes: 13,
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
      collocations: ["抓住机会 (Nắm bắt cơ hội)", "难得的机会 (Cơ hội hiếm có)"],
      example: {
        zh: "这是一个很难得的工作机会，你一定要把握住。",
        pinyin: "Zhè shì yí gè hěn nándé de gōngzuò jīhuì, nǐ yídìng yào bǎwò zhù.",
        vi: "Đây là một cơ hội việc làm rất hiếm có, bạn nhất định phải nắm bắt lấy."
      }
    },

    // HSK 4
    {
      id: "v4_01",
      hanzi: "坚持",
      pinyin: "jiān chí",
      meaning: "Kiên trì, giữ vững",
      hsk: 4,
      radical: "土 (Thổ) & 扌 (Thủ)",
      strokes: 9,
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
      collocations: ["积累经验 (Tích lũy kinh nghiệm)", "积累知识 (Tích lũy kiến thức)"],
      example: {
        zh: "在工作中，我们要不断积累经验。",
        pinyin: "Zài gōngzuò zhōng, wǒmen yào bùduàn jīlěi jīngyàn.",
        vi: "Trong công việc, chúng ta cần không ngừng tích lũy kinh nghiệm."
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
      collocations: ["文化交流 (Giao lưu văn hóa)", "相互交流 (Trao đổi lẫn nhau)"],
      example: {
        zh: "多和中国朋友交流能快速提高口语水平。",
        pinyin: "Duō hé zhōngguó péngyou jiāoliú néng kuàisù tígāo kǒuyǔ shuǐpíng.",
        vi: "Giao lưu nhiều với bạn bè Trung Quốc có thể nâng cao trình độ khẩu ngữ nhanh chóng."
      }
    },

    // HSK 5
    {
      id: "v5_01",
      hanzi: "掌握",
      pinyin: "zhǎng wò",
      meaning: "Nắm vững, làm chủ",
      hsk: 5,
      radical: "扌 (Thủ) & 扌 (Thủ)",
      strokes: 11,
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
      collocations: ["逻辑思维 (Tư duy logic)", "符合逻辑 (Phù hợp logic)"],
      example: {
        zh: "这篇文章论点鲜明，逻辑十分严谨。",
        pinyin: "Zhè piān wénzhāng lùndiǎn xiānmíng, luójí shífēn yánjǐn.",
        vi: "Bài viết này luận điểm rõ ràng, tư duy logic rất chặt chẽ."
      }
    },

    // HSK 6
    {
      id: "v6_01",
      hanzi: "潜移默化",
      pinyin: "qián yí mò huà",
      meaning: "Thấm dần, ngấm dần từng chút một (ảnh hưởng ngấm ngầm)",
      hsk: 6,
      radical: "氵 (Thủy) & 匕 (Chủy)",
      strokes: 15,
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
      collocations: ["精益求精的精神 (Tinh thần không ngừng hoàn thiện)", "追求卓越 (Theo đuổi sự xuất sắc)"],
      example: {
        zh: "大国工匠在工艺上始终坚持精益求精的态度。",
        pinyin: "Dàguó gōngjiàng zài gōngyì shàng shǐzhōng jiānchí jīngyì-qiújīng de tàidù.",
        vi: "Những nghệ nhân bậc thầy luôn giữ vững thái độ tinh hoa cầu tinh túy trong từng đường nét thủ công."
      }
    }
  ],

  // 2. Chengyu & Proverbs Bank (With Fables & Explanations)
  chengyuList: [
    {
      id: "cy_01",
      hanzi: "掩耳盗铃",
      pinyin: "yǎn ěr dào líng",
      literal: "Bịt tai trộm chuông",
      figurative: "Tự dối lòng mình; hành động lừa mình dối người, tưởng mình giấu được nhưng ai cũng biết.",
      story: "Thời Xuân Thu, một kẻ trộm muốn lấy trộm chiếc chuông đồng lớn của nhà họ Phạm. Vì chuông quá nặng không vác nổi, hắn định dùng búa đập vỡ để vác từng mảnh. Khi gõ, chuông phát ra tiếng 'keng' lớn vang khắp làng. Sợ người khác nghe thấy đến bắt, hắn liền nghĩ ra kế lấy bông nhét chặt hai tai mình lại, tự nhủ: 'Mình không nghe thấy thì người khác cũng sẽ không nghe thấy!'.",
      example: {
        zh: "在考试前不复习而抱侥幸心理，完全是掩耳盗铃的做法。",
        pinyin: "Zài kǎoshì qián bù fùxí ér bào jiǎoxìng xīnlǐ, wánquán shì yǎn ěr dào líng de zuòfǎ.",
        vi: "Trước kì thi không chịu ôn tập mà cứ ôm tâm lý cầu may, hoàn toàn là hành vi bịt tai trộm chuông tự lừa dối mình."
      },
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      tags: ["Tự lừa dối", "Xuân Thu", "Bài học sâu sắc"]
    },
    {
      id: "cy_02",
      hanzi: "塞翁失马",
      pinyin: "sài wēng shī mǎ",
      literal: "Ông lão ở biên ải mất ngựa (Tái ông thất mã)",
      figurative: "Họa là chỗ dựa của phúc, phúc là mầm mống của họa. Chuyện đời được mất khó lường, nên giữ tâm thế bình thản.",
      story: "Một ông lão ở biên ải bỗng bị mất con ngựa tốt, hàng xóm đến chia buồn, ông bình thản nói: 'Biết đâu lại là điều may?'. Mấy tháng sau, ngựa cũ trở về dắt theo đàn tuấn mã. Hàng xóm chúc mừng, ông lại nói: 'Biết đâu là điềm họa?'. Con trai ông vì thích cưỡi ngựa mới mà ngã gãy chân. Hàng xóm lại tiếc thương, ông đáp: 'Chưa biết chừng là phúc!'. Năm sau giặc xâm lược, mọi thanh niên đều tòng quân tử trận, riêng con trai ông vì tàn tật nên được sống sót.",
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
      hanzi: "画蛇添足",
      pinyin: "huà shé tiān zú",
      literal: "Vẽ rắn thêm chân",
      figurative: "Làm những việc thừa thãi không cần thiết, tự rước lấy thất bại hoặc làm hỏng việc vốn đã tốt đẹp.",
      story: "Nước Sở có người cúng tế ban một bình rượu cho những người giữ đền. Bình rượu quá ít, không đủ chia cho mọi người, nên họ giao hẹn: 'Ai vẽ xong con rắn trên mặt đất trước thì người đó được uống rượu'. Một người vẽ xong nhanh nhất, tay trái cầm bình rượu định uống, nhưng thấy người khác chưa xong bèn kiêu ngạo bảo: 'Ta còn thừa sức vẽ thêm chân cho nó!'. Đang lúc vẽ chân, một người khác vẽ xong rắn liền giật lấy bình rượu nói: 'Rắn vốn làm gì có chân, cớ sao phải vẽ thêm?'.",
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
      hanzi: "愚公移山",
      pinyin: "yú gōng yí shān",
      literal: "Ông già ngu dời núi (Ngu Công dời núi)",
      figurative: "Chỉ ý chí sắt đá, quyết tâm bền bỉ kiên trì vượt qua mọi khó khăn gian khổ khổng lồ.",
      story: "Cụ già Ngu Công tuổi gần 90, trước cửa nhà có hai ngọn núi lớn Thái Hành và Vương Ốc chắn lối đi. Cụ họp gia đình quyết tâm đào núi san bằng đường. Một ông trí thức tên Trí Ngõa cười nhạo: 'Ông già yếu sắp chết, làm sao dời nổi núi?'. Ngu Công thong thả đáp: 'Tôi chết thì còn con tôi, con tôi sinh cháu, cháu lại sinh con, đời đời con cháu vô tận, mà núi thì không mọc thêm, lo gì không bằng phẳng?'. Lòng thành cảm động Trời cao, Thượng đế sai hai vị thần xuống cõng núi đi chỗ khác.",
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
      tags: ["Lão Tử", "Đạo Đức Kinh", "Học tập"]
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
