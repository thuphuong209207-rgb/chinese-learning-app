// LocalStorage State Management
// Handles persistence for API Key, Progress, Streaks, Penalty Words, Flashcards & Goals

const STORAGE_KEYS = {
  SETTINGS: "ch_app_settings",
  STATS: "ch_app_stats",
  PENALTY: "ch_app_penalty_list",
  FLASHCARDS: "ch_app_flashcards",
  GOALS: "ch_app_goals",
  DECKS: "ch_app_decks"
};

const StorageService = {
  // Settings
  getSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const defaults = {
      apiKey: "",
      model: "gemini-2.5-flash",
      theme: "light",
      speechRate: 0.9,
      speechVoice: ""
    };
    if (!raw) return defaults;
    try {
      return { ...defaults, ...JSON.parse(raw) };
    } catch (e) {
      return defaults;
    }
  },

  saveSettings(settings) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },

  // Daily Stats & Streak
  getStats() {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    const today = new Date().toISOString().split("T")[0];
    const defaults = {
      streak: 1,
      lastActiveDate: today,
      wordsLearnedToday: 0,
      chengyuLearnedToday: 0,
      quizzesCompletedToday: 0,
      totalPoints: 120
    };

    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(defaults));
      return defaults;
    }

    try {
      const stats = JSON.parse(raw);
      // Check day rollover for streak
      if (stats.lastActiveDate !== today) {
        const lastDate = new Date(stats.lastActiveDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          stats.streak += 1;
        } else if (diffDays > 1) {
          stats.streak = 1;
        }
        stats.lastActiveDate = today;
        stats.wordsLearnedToday = 0;
        stats.chengyuLearnedToday = 0;
        stats.quizzesCompletedToday = 0;
        this.saveStats(stats);
      }
      return stats;
    } catch (e) {
      return defaults;
    }
  },

  saveStats(stats) {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  },

  incrementStat(key, amount = 1) {
    const stats = this.getStats();
    if (typeof stats[key] === "number") {
      stats[key] += amount;
      this.saveStats(stats);
    }
    return stats;
  },

  // Goals & Planner
  getGoals() {
    const raw = localStorage.getItem(STORAGE_KEYS.GOALS);
    const defaults = {
      dailyWordsTarget: 10,
      dailyChengyuTarget: 2,
      reminderHour: 20,
      reminderMinute: 30,
      notificationsEnabled: false
    };
    if (!raw) return defaults;
    try {
      return { ...defaults, ...JSON.parse(raw) };
    } catch (e) {
      return defaults;
    }
  },

  saveGoals(goals) {
    const current = this.getGoals();
    const updated = { ...current, ...goals };
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
    return updated;
  },

  // Penalty Box (Danh sách từ chưa thuộc - cần ôn lại 3 lần đúng liên tiếp)
  getPenaltyWords() {
    const raw = localStorage.getItem(STORAGE_KEYS.PENALTY);
    if (!raw) {
      // Seed with 2 words so user sees the feature right away
      const initial = [
        {
          id: "v4_02",
          hanzi: "积累",
          pinyin: "jī lěi",
          meaning: "Tích lũy, dồn lại",
          hsk: 4,
          consecutiveCorrect: 1,
          addedDate: new Date().toISOString()
        },
        {
          id: "v5_01",
          hanzi: "掌握",
          pinyin: "zhǎng wò",
          meaning: "Nắm vững, làm chủ",
          hsk: 5,
          consecutiveCorrect: 0,
          addedDate: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.PENALTY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  },

  addPenaltyWord(word) {
    const list = this.getPenaltyWords();
    const existing = list.find((item) => item.hanzi === word.hanzi);
    if (existing) {
      // Reset streak back to 0 on failure
      existing.consecutiveCorrect = 0;
      existing.lastFailed = new Date().toISOString();
    } else {
      list.push({
        id: word.id || "word_" + Date.now(),
        hanzi: word.hanzi,
        pinyin: word.pinyin,
        meaning: word.meaning,
        hsk: word.hsk || 1,
        consecutiveCorrect: 0,
        addedDate: new Date().toISOString()
      });
    }
    localStorage.setItem(STORAGE_KEYS.PENALTY, JSON.stringify(list));
    return list;
  },

  recordPenaltyAnswer(wordId, isCorrect) {
    let list = this.getPenaltyWords();
    let cleared = false;
    list = list.map((item) => {
      if (item.id === wordId || item.hanzi === wordId) {
        if (isCorrect) {
          item.consecutiveCorrect = (item.consecutiveCorrect || 0) + 1;
        } else {
          item.consecutiveCorrect = 0;
        }
      }
      return item;
    });

    // Remove if consecutive correct is 3 or more
    const beforeCount = list.length;
    list = list.filter((item) => {
      const keep = (item.consecutiveCorrect || 0) < 3;
      if (!keep) cleared = true;
      return keep;
    });

    localStorage.setItem(STORAGE_KEYS.PENALTY, JSON.stringify(list));
    return { list, cleared };
  },

  // Custom Decks
  getDecks() {
    const raw = localStorage.getItem(STORAGE_KEYS.DECKS);
    const defaults = ["Bộ mặc định", "HSK Từ vựng của tôi", "Giao tiếp hàng ngày", "Từ khó ghi nhớ"];
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(defaults));
      return defaults;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return defaults;
    }
  },

  saveDeck(deckName) {
    if (!deckName || !deckName.trim()) return this.getDecks();
    const decks = this.getDecks();
    const clean = deckName.trim();
    if (!decks.includes(clean)) {
      decks.push(clean);
      localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(decks));
    }
    return decks;
  },

  // Custom Flashcards
  getFlashcards() {
    const raw = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
    if (!raw) {
      const initialCards = [
        {
          id: "fc_1",
          hanzi: "坚持不懈",
          pinyin: "jiān chí bú xiè",
          meaning: "Kiên trì không nản lòng, bền bỉ đến cùng",
          example: "只要坚持不懈，就一定能学会中文。",
          exampleVi: "Chỉ cần kiên trì không nản, nhất định sẽ học được tiếng Trung.",
          hsk: 4,
          deck: "Bộ mặc định",
          notes: "Gồm chữ 坚持 (kiên trì) và 不懈 (không lơ là)",
          status: "learning", // 'forgot', 'learning', 'mastered'
          lastReview: new Date().toISOString()
        },
        {
          id: "fc_2",
          hanzi: "温故知新",
          pinyin: "wēn gù zhī xīn",
          meaning: "Ôn lại cái cũ biết thêm điều mới (Học lại điều cũ để hiểu điều mới)",
          example: "学习要经常温故知新，才能真正掌握。",
          exampleVi: "Học tập cần thường xuyên ôn cố tri tân thì mới thực sự nắm vững.",
          hsk: 5,
          deck: "Bộ mặc định",
          notes: "Thành ngữ Khổng Tử trong Luận Ngữ",
          status: "vague",
          lastReview: new Date().toISOString()
        },
        {
          id: "fc_3",
          hanzi: "千里之行",
          pinyin: "qiān lǐ zhī xíng",
          meaning: "Chuyến đi ngàn dặm (bắt đầu từ bước chân đầu tiên)",
          example: "千里之行，始于足下。",
          exampleVi: "Chuyến đi ngàn dặm bắt đầu từ một bước chân.",
          hsk: 3,
          deck: "HSK Từ vựng của tôi",
          notes: "Lão Tử - Đạo Đức Kinh",
          status: "mastered",
          lastReview: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(initialCards));
      return initialCards;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  },

  saveFlashcard(card) {
    const cards = this.getFlashcards();
    if (card.id) {
      const index = cards.findIndex((c) => c.id === card.id);
      if (index >= 0) {
        cards[index] = { ...cards[index], ...card, lastReview: new Date().toISOString() };
      } else {
        cards.unshift(card);
      }
    } else {
      card.id = "fc_" + Date.now();
      card.status = card.status || "learning";
      card.deck = card.deck || "Bộ mặc định";
      card.lastReview = new Date().toISOString();
      cards.unshift(card);
    }
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(cards));
    return cards;
  },

  deleteFlashcard(cardId) {
    const cards = this.getFlashcards().filter((c) => c.id !== cardId);
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(cards));
    return cards;
  },

  updateFlashcardStatus(cardId, status) {
    const cards = this.getFlashcards().map((c) => {
      if (c.id === cardId) {
        c.status = status;
        c.lastReview = new Date().toISOString();
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(cards));
    return cards;
  },

  importFlashcards(newCards) {
    if (!Array.isArray(newCards)) return this.getFlashcards();
    const current = this.getFlashcards();
    newCards.forEach((c) => {
      if (c.hanzi && c.meaning) {
        c.id = "fc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
        current.unshift(c);
      }
    });
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(current));
    return current;
  }
};

window.StorageService = StorageService;
