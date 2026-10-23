// Main Application Logic for 华语星 (ChinesePro AI)
// Single Page Application Router, State Synchronization, and Interactive Modules

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Application Global State
  const App = {
    currentRoute: "dashboard",
    settings: window.StorageService.getSettings(),
    stats: window.StorageService.getStats(),
    goals: window.StorageService.getGoals(),
    penaltyWords: window.StorageService.getPenaltyWords(),
    flashcards: window.StorageService.getFlashcards(),
    examState: null,
    gameState: null,
    speakingState: null,
    flashcardIndex: 0,
    isCardFlipped: false,
    userLevel: window.StorageService.getUserLevel(),
    dictHskFilter: "all",
    dictSearchDirection: "vi",
    activeDictTab: "vocab",
    dictRecentExpanded: false,
    currentDictWord: null,
    lastDictQuery: "",
    chengyuCategoryFilter: "all",
    writers: {},

    init() {
      this.applyTheme(this.settings.theme);
      this.bindNavigation();
      this.updateHeaderProgress();
      this.updateLevelDisplay();
      this.setupGlobalEvents();

      // Check if user has chosen their starting level, if not prompt onboarding modal!
      if (!window.StorageService.isLevelChosen()) {
        setTimeout(() => this.openLevelSelectorModal(true), 350);
      }

      // Listen to hash change
      window.addEventListener("hashchange", () => {
        const route = window.location.hash.replace("#", "") || "dashboard";
        this.navigate(route);
      });

      // Default route
      const initialRoute = window.location.hash.replace("#", "") || "dashboard";
      this.navigate(initialRoute);

      // Refresh icons
      this.refreshIcons();
    },

    updateLevelDisplay() {
      const topText = document.getElementById("topBarLevelText");
      const mobileText = document.getElementById("mobileBarLevelText");
      const level = this.userLevel || "HSK 1";

      const labels = {
        "HSK 1": "HSK 1 (Sơ cấp)",
        "HSK 2": "HSK 2 (Sơ cấp 2)",
        "HSK 3": "HSK 3 (Trung cấp)",
        "HSK 4": "HSK 4 (Trung cấp 2)",
        "HSK 5": "HSK 5 (Cao cấp)",
        "HSK 6": "HSK 6 (Thành thạo)",
        "Hán Ngữ 1-6": "Giáo trình Hán Ngữ"
      };

      const displayText = labels[level] || level;
      if (topText) topText.textContent = displayText;
      if (mobileText) mobileText.textContent = level;
    },

    openLevelSelectorModal(isInitial = false) {
      const levels = [
        {
          id: "HSK 1",
          name: "HSK 1 (Sơ cấp 1)",
          tag: "Người Mới Bắt Đầu",
          desc: "150 từ vựng cơ bản, phát âm Pinyin chuẩn, các câu chào hỏi và giao tiếp đời sống đơn giản nhất.",
          color: "border-emerald-500 bg-emerald-50/30 text-emerald-700"
        },
        {
          id: "HSK 2",
          name: "HSK 2 (Sơ cấp 2)",
          tag: "Giao Tiếp Hàng Ngày",
          desc: "300 từ vựng, diễn đạt sở thích, mua sắm, gọi món, thời tiết và cuộc sống thường nhật.",
          color: "border-teal-500 bg-teal-50/30 text-teal-700"
        },
        {
          id: "HSK 3",
          name: "HSK 3 (Trung cấp sơ)",
          tag: "Tự Tin Du Lịch",
          desc: "600 từ vựng, giao tiếp tự tin khi đi du lịch, công tác, diễn đạt quan điểm cá nhân.",
          color: "border-blue-500 bg-blue-50/30 text-blue-700"
        },
        {
          id: "HSK 4",
          name: "HSK 4 (Trung cấp vững)",
          tag: "Làm Việc & Du Học",
          desc: "1200 từ vựng, thảo luận sâu về công việc, đọc báo chí và xem phim tiếng Trung cơ bản.",
          color: "border-amber-500 bg-amber-50/30 text-amber-700"
        },
        {
          id: "HSK 5",
          name: "HSK 5 (Cao cấp)",
          tag: "Học Thuật & Chuyên Nghiệp",
          desc: "2500 từ vựng, đọc hiểu văn bản phức tạp, thuyết trình và làm việc chuyên nghiệp chuẩn bản xứ.",
          color: "border-purple-500 bg-purple-50/30 text-purple-700"
        },
        {
          id: "HSK 6",
          name: "HSK 6 (Thành thạo)",
          tag: "Bậc Thầy Tiếng Hán",
          desc: "5000+ từ vựng, thành ngữ điển tích cổ điển, biên phiên dịch và nắm bắt mọi sắc thái ngôn ngữ.",
          color: "border-rose-500 bg-rose-50/30 text-rose-700"
        },
        {
          id: "Hán Ngữ 1-6",
          name: "Giáo Trình Hán Ngữ (6 Quyển)",
          tag: "Giáo Trình Đại Học",
          desc: "Học chuẩn bài bản theo bộ 6 quyển xanh lá kinh điển của Đại học Ngôn ngữ Bắc Kinh.",
          color: "border-red-500 bg-red-50/30 text-red-700"
        }
      ];

      const html = `
        <div class="p-6 md:p-8 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <span class="text-xs font-bold text-red-600 uppercase tracking-wider">Lộ trình học tập cá nhân</span>
              <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                ${isInitial ? "Chào mừng bạn! Hãy chọn cấp độ bắt đầu của bạn" : "Đổi Cấp Độ Học Tập"}
              </h3>
            </div>
            ${!isInitial ? `
              <button onclick="App.closeModal()" class="text-slate-400 hover:text-slate-600">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            ` : ""}
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Hệ thống sẽ cá nhân hóa Từ điển, Flashcard, Đề thi và Từ vựng hôm nay phù hợp nhất với cấp độ bạn chọn. Bạn có thể đổi lại bất cứ lúc nào!
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            ${levels
              .map(
                (lvl) => `
              <div
                onclick="App.selectUserLevel('${lvl.id}')"
                class="p-4 rounded-2xl border-2 ${this.userLevel === lvl.id ? "border-red-600 bg-red-50/40 dark:bg-red-950/40 shadow-md ring-2 ring-red-500/30" : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-750 hover:border-red-400"} cursor-pointer transition flex flex-col justify-between group"
              >
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition">${lvl.name}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${lvl.color}">${lvl.tag}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${lvl.desc}</p>
                </div>

                <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold ${this.userLevel === lvl.id ? "text-red-600" : "text-slate-400 group-hover:text-red-600"}">
                  <span>${this.userLevel === lvl.id ? "✓ Đang học cấp độ này" : "Chọn cấp độ này"}</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;

      this.openModal(html);
      this.refreshIcons();
    },

    selectUserLevel(level) {
      window.StorageService.saveUserLevel(level);
      this.userLevel = level;
      this.updateLevelDisplay();
      this.closeModal();
      this.showToast(`Tuyệt vời! Đã thiết lập cấp độ mục tiêu: ${level}`, "success");
      
      // Refresh current active view to adapt to the new level
      this.navigate(this.currentRoute);
    },

    refreshIcons() {
      if (window.lucide) {
        setTimeout(() => window.lucide.createIcons(), 50);
      }
    },

    // Toast Notification Utility
    showToast(message, type = "info") {
      const container = document.getElementById("toastContainer");
      if (!container) return;

      const toast = document.createElement("div");
      const bgMap = {
        success: "bg-emerald-600 text-white border-emerald-500",
        error: "bg-red-600 text-white border-red-500",
        warning: "bg-amber-600 text-white border-amber-500",
        info: "bg-slate-800 text-white border-slate-700"
      };

      toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300 ${bgMap[type] || bgMap.info}`;
      toast.innerHTML = `
        <span class="font-medium">${message}</span>
        <button class="text-white/70 hover:text-white" onclick="this.parentElement.remove()">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      `;

      container.appendChild(toast);
      this.refreshIcons();

      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
      });

      setTimeout(() => {
        toast.classList.add("translate-y-2", "opacity-0");
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    },

    // Theme Management
    applyTheme(theme) {
      this.settings.theme = theme;
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.StorageService.saveSettings({ theme });
    },

    toggleTheme() {
      const next = this.settings.theme === "dark" ? "light" : "dark";
      this.applyTheme(next);
      this.showToast(`Đã chuyển sang chế độ ${next === "dark" ? "tối" : "sáng"}`, "info");
    },

    // Top Header & Sidebar Status Counters
    updateHeaderProgress() {
      const wordsCountEl = document.getElementById("topBarWordsCount");
      const wordsTargetEl = document.getElementById("topBarWordsTarget");
      const chengyuCountEl = document.getElementById("topBarChengyuCount");
      const chengyuTargetEl = document.getElementById("topBarChengyuTarget");
      const streakEl = document.getElementById("sidebarStreakCount");
      const penaltyBadge = document.getElementById("sidebarPenaltyBadge");
      const topBarPenaltyBtn = document.getElementById("topBarPenaltyBtn");
      const topBarPenaltyCount = document.getElementById("topBarPenaltyCount");
      const aiIndicator = document.getElementById("aiActiveIndicator");

      if (wordsCountEl) wordsCountEl.textContent = this.stats.wordsLearnedToday || 0;
      if (wordsTargetEl) wordsTargetEl.textContent = this.goals.dailyWordsTarget || 10;
      if (chengyuCountEl) chengyuCountEl.textContent = this.stats.chengyuLearnedToday || 0;
      if (chengyuTargetEl) chengyuTargetEl.textContent = this.goals.dailyChengyuTarget || 2;
      if (streakEl) streakEl.textContent = this.stats.streak || 1;

      this.penaltyWords = window.StorageService.getPenaltyWords();
      const penaltyTotal = this.penaltyWords.length;
      if (penaltyBadge) penaltyBadge.textContent = penaltyTotal;
      if (topBarPenaltyCount) topBarPenaltyCount.textContent = penaltyTotal;

      if (topBarPenaltyBtn) {
        if (penaltyTotal > 0) {
          topBarPenaltyBtn.classList.remove("hidden");
          topBarPenaltyBtn.classList.add("flex");
        } else {
          topBarPenaltyBtn.classList.add("hidden");
          topBarPenaltyBtn.classList.remove("flex");
        }
      }

      if (aiIndicator) {
        if (this.settings.apiKey) {
          aiIndicator.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/40";
          aiIndicator.textContent = "AI 2.5 Sẵn Sàng";
        } else {
          aiIndicator.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
          aiIndicator.textContent = "AI Chế độ Chờ";
        }
      }
    },

    // Navigation setup
    bindNavigation() {
      // Sidebar mobile drawer toggles
      const menuBtn = document.getElementById("menuToggleMobile");
      const closeBtn = document.getElementById("sidebarCloseMobile");
      const sidebar = document.getElementById("sidebar");

      if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => sidebar.classList.remove("-translate-x-full"));
      }
      if (closeBtn && sidebar) {
        closeBtn.addEventListener("click", () => sidebar.classList.add("-translate-x-full"));
      }

      // Theme toggle buttons
      document.getElementById("themeToggleMobile")?.addEventListener("click", () => this.toggleTheme());
      document.getElementById("themeToggleSidebar")?.addEventListener("click", () => this.toggleTheme());

      // Audio test button
      document.getElementById("testAudioSidebarBtn")?.addEventListener("click", () => {
        window.AudioService.speak("你好！欢迎使用华语星智能学习平台。");
        this.showToast("Đang phát âm giọng đọc tiếng Trung mẫu...", "info");
      });

      // Penalty quick click buttons
      document.getElementById("sidebarPenaltyBtn")?.addEventListener("click", () => {
        window.location.hash = "#games";
        setTimeout(() => this.switchGameTab("penalty"), 100);
      });
      document.getElementById("topBarPenaltyBtn")?.addEventListener("click", () => {
        window.location.hash = "#games";
        setTimeout(() => this.switchGameTab("penalty"), 100);
      });
    },

    navigate(route) {
      this.currentRoute = route;
      const navLinks = document.querySelectorAll(".nav-item");
      navLinks.forEach((link) => {
        if (link.getAttribute("data-nav") === route) {
          link.classList.add("bg-red-50", "text-red-600", "dark:bg-red-950/50", "dark:text-red-400", "font-bold");
          link.classList.remove("text-slate-600", "dark:text-slate-300");
        } else {
          link.classList.remove("bg-red-50", "text-red-600", "dark:bg-red-950/50", "dark:text-red-400", "font-bold");
          link.classList.add("text-slate-600", "dark:text-slate-300");
        }
      });

      // Close mobile sidebar if open
      document.getElementById("sidebar")?.classList.add("-translate-x-full");

      const container = document.getElementById("viewContainer");
      if (!container) return;

      switch (route) {
        case "dashboard":
          this.renderDashboard(container);
          break;
        case "dictionary":
          this.renderDictionary(container);
          break;
        case "exams":
          this.renderExams(container);
          break;
        case "chengyu":
          this.chengyuCategoryFilter = "chengyu";
          this.renderChengyu(container);
          break;
        case "proverbs":
          this.chengyuCategoryFilter = "proverb";
          this.renderChengyu(container);
          break;
        case "games":
          this.renderGames(container);
          break;
        case "flashcards":
          this.renderFlashcards(container);
          break;
        case "planner":
          this.renderPlanner(container);
          break;
        case "settings":
          this.renderSettings(container);
          break;
        default:
          this.renderDashboard(container);
      }

      this.updateHeaderProgress();
      this.refreshIcons();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    setupGlobalEvents() {
      // Modal backdrop click
      const modal = document.getElementById("appModalBackdrop");
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) this.closeModal();
        });
      }
    },

    openModal(contentHtml) {
      const modal = document.getElementById("appModalBackdrop");
      const content = document.getElementById("appModalContent");
      if (modal && content) {
        content.innerHTML = contentHtml;
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        this.refreshIcons();
      }
    },

    closeModal() {
      const modal = document.getElementById("appModalBackdrop");
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
    },

    /* =====================================================================
       MODULE 1: DASHBOARD
       ===================================================================== */
    renderDashboard(container) {
      let targetHsk = 1;
      if (this.userLevel && this.userLevel.startsWith("HSK")) {
        const num = parseInt(this.userLevel.replace("HSK", "").trim());
        if (!isNaN(num)) targetHsk = num;
      }
      const matchWords = (window.APP_DATA.vocabList || []).filter((w) => w.hsk === targetHsk);
      const todayWord = matchWords.length > 0 ? matchWords[0] : (window.APP_DATA.vocabList[1] || window.APP_DATA.vocabList[0]);

      const penaltyCount = this.penaltyWords.length;
      const wordsPercent = Math.min(100, Math.round(((this.stats.wordsLearnedToday || 0) / (this.goals.dailyWordsTarget || 10)) * 100));
      const chengyuPercent = Math.min(100, Math.round(((this.stats.chengyuLearnedToday || 0) / (this.goals.dailyChengyuTarget || 2)) * 100));

      container.innerHTML = `
        <div class="space-y-6">
          <!-- Active Target Level Bar -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-lg">
                <i data-lucide="award" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="text-xs text-slate-400 font-semibold">Cấp độ học tập đang chọn</div>
                <div class="text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                  <span>${this.userLevel || "HSK 1"}</span>
                  <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Đang hoạt động</span>
                </div>
              </div>
            </div>
            <button onclick="App.openLevelSelectorModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-2 transition">
              <i data-lucide="sliders-horizontal" class="w-4 h-4 text-red-600"></i>
              Đổi cấp độ mục tiêu
            </button>
          </div>

          <!-- Hero Banner with Streak & Greetings -->
          <div class="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div class="absolute -right-8 -bottom-10 opacity-10 font-hanzi font-black text-9xl pointer-events-none">
              华语
            </div>
            <div class="relative z-10 max-w-2xl">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
                Học Tiếng Trung Tương Tác Cùng Trí Tuệ Nhân Tạo
              </span>
              <h2 class="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
                你好！Hôm nay bạn đã sẵn sàng bứt phá ${this.userLevel || "HSK 1"} chưa?
              </h2>
              <p class="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                Chinh phục Giáo trình Hán Ngữ & HSK chuẩn Hanban, chuẩn hóa phát âm HSKK cùng Gemini AI và rèn luyện phản xạ ngôn ngữ siêu tốc.
              </p>
              <div class="flex flex-wrap items-center gap-3">
                <a href="#games" class="px-5 py-2.5 rounded-xl bg-white text-red-700 font-bold text-sm shadow-md hover:bg-slate-100 transition flex items-center gap-2">
                  <i data-lucide="play" class="w-4 h-4 fill-red-600"></i>
                  Luyện Game Phản Xạ
                </a>
                <a href="#exams" class="px-5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-md font-semibold text-sm transition flex items-center gap-2">
                  <i data-lucide="mic" class="w-4 h-4"></i>
                  Nói Phản Xạ Cùng AI
                </a>
              </div>
            </div>
          </div>

          <!-- Daily Goals & Streaks Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Goal 1: Words -->
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase font-bold text-slate-400">Từ vựng mục tiêu</span>
                  <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                    ${wordsPercent}%
                  </span>
                </div>
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="text-3xl font-extrabold text-slate-800 dark:text-white">${this.stats.wordsLearnedToday || 0}</span>
                  <span class="text-sm text-slate-400">/ ${this.goals.dailyWordsTarget || 10} từ</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-emerald-500 h-full rounded-full transition-all duration-500" style="width: ${wordsPercent}%"></div>
                </div>
              </div>
              <a href="#dictionary" class="mt-4 inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                Tra cứu từ mới ngay <i data-lucide="chevron-right" class="w-3.5 h-3.5 ml-1"></i>
              </a>
            </div>

            <!-- Goal 2: Chengyu -->
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase font-bold text-slate-400">Thành ngữ & Tục ngữ</span>
                  <span class="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400 px-2 py-0.5 rounded-md">
                    ${chengyuPercent}%
                  </span>
                </div>
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="text-3xl font-extrabold text-slate-800 dark:text-white">${this.stats.chengyuLearnedToday || 0}</span>
                  <span class="text-sm text-slate-400">/ ${this.goals.dailyChengyuTarget || 2} câu</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-amber-500 h-full rounded-full transition-all duration-500" style="width: ${chengyuPercent}%"></div>
                </div>
              </div>
              <a href="#chengyu" class="mt-4 inline-flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
                Đọc điển tích thành ngữ <i data-lucide="chevron-right" class="w-3.5 h-3.5 ml-1"></i>
              </a>
            </div>

            <!-- Goal 3: Penalty Box Alert -->
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border ${penaltyCount > 0 ? "border-red-300 dark:border-red-900/60 bg-red-50/20" : "border-slate-200 dark:border-slate-700"} shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase font-bold text-red-500">Từ chưa thuộc (Phạt)</span>
                  <span class="px-2 py-0.5 rounded-full text-xs font-bold ${penaltyCount > 0 ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" : "bg-slate-100 text-slate-600 dark:bg-slate-700"}">
                    ${penaltyCount} từ
                  </span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  ${penaltyCount > 0 ? "Bạn cần trả lời đúng liên tiếp 3 lần trong bài kiểm tra phạt để gỡ bỏ từ khỏi danh sách." : "Rất tuyệt! Bạn chưa có từ nào bị phạt. Hãy tiếp tục duy trì!"}
                </p>
              </div>
              ${penaltyCount > 0 ? `
                <button onclick="window.location.hash='#games'; setTimeout(()=>App.switchGameTab('penalty'),150)" class="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                  <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Ôn Tập Gỡ Phạt Ngay
                </button>
              ` : `
                <a href="#games" class="inline-flex items-center text-xs font-bold text-slate-500 hover:underline">
                  Vào thử thách game <i data-lucide="chevron-right" class="w-3.5 h-3.5 ml-1"></i>
                </a>
              `}
            </div>
          </div>

          <!-- Word of the Day & Quick Modules -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Word of the day card -->
            <div class="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <i data-lucide="sun" class="w-4 h-4"></i> Từ vựng trong ngày
                  </span>
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                    HSK ${todayWord.hsk}
                  </span>
                </div>

                <div class="text-center py-4">
                  <div class="font-hanzi font-bold text-6xl text-slate-800 dark:text-white tracking-wide mb-2">
                    ${todayWord.hanzi}
                  </div>
                  <div class="text-lg text-red-600 dark:text-red-400 font-semibold mb-1">
                    ${todayWord.pinyin}
                  </div>
                  <p class="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    ${todayWord.meaning}
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mb-4">
                  <div class="font-hanzi font-semibold text-sm mb-1">${todayWord.example.zh}</div>
                  <div class="text-slate-400 mb-1">${todayWord.example.pinyin}</div>
                  <div class="italic text-slate-500 dark:text-slate-400">${todayWord.example.vi}</div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="AudioService.speak('${todayWord.example.zh}')" class="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition">
                  <i data-lucide="volume-2" class="w-4 h-4 text-red-600"></i> Nghe phát âm
                </button>
                <button onclick="App.addCurrentToFlashcard('${todayWord.hanzi}', '${todayWord.pinyin}', '${todayWord.meaning}')" class="py-2 px-3 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 font-semibold text-xs flex items-center justify-center gap-1 transition" title="Lưu vào Flashcard">
                  <i data-lucide="bookmark-plus" class="w-4 h-4"></i> Lưu
                </button>
              </div>
            </div>

            <!-- Quick Access Modules & Curriculums -->
            <div class="lg:col-span-2 space-y-4">
              <h3 class="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <i data-lucide="compass" class="w-4 h-4 text-red-600"></i> Khám phá lộ trình học tập
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="#exams" class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 transition shadow-sm group">
                  <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <i data-lucide="book-marked" class="w-5 h-5"></i>
                  </div>
                  <h4 class="font-bold text-sm text-slate-800 dark:text-white mb-1">Giáo trình Hán Ngữ 6 Quyển</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Hệ thống bài tập Nghe - Đọc - Ngữ pháp theo từng bài từ Quyển 1 đến 6.</p>
                </a>

                <a href="#exams" class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 transition shadow-sm group">
                  <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <i data-lucide="award" class="w-5 h-5"></i>
                  </div>
                  <h4 class="font-bold text-sm text-slate-800 dark:text-white mb-1">Luyện đề chuẩn HSK Hanban</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Đề thi mô phỏng từ HSK 1 đến HSK 6 có bấm giờ và giải thích chi tiết.</p>
                </a>

                <a href="#exams" class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 transition shadow-sm group">
                  <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <i data-lucide="mic" class="w-5 h-5"></i>
                  </div>
                  <h4 class="font-bold text-sm text-slate-800 dark:text-white mb-1">AI Luyện Phản Xạ Nói (HSKK)</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Bấm micro nói tiếng Trung, Gemini AI nhận diện giọng và sửa câu trực tiếp.</p>
                </a>

                <a href="#chengyu" class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 transition shadow-sm group">
                  <div class="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <i data-lucide="sparkle" class="w-5 h-5"></i>
                  </div>
                  <h4 class="font-bold text-sm text-slate-800 dark:text-white mb-1">Thành ngữ & Điển tích xưa</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Hiểu sâu ý nghĩa ngụ ngôn qua câu chuyện lịch sử và ứng dụng giao tiếp.</p>
                </a>

                <a href="#flashcards" onclick="setTimeout(()=>App.switchFlashcardTab('create'),100)" class="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-950/30 dark:to-amber-950/30 border border-red-200 dark:border-red-900/60 hover:border-red-500 transition shadow-sm group">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center group-hover:scale-105 transition shadow-md shadow-red-500/30">
                        <i data-lucide="layers" class="w-5 h-5"></i>
                      </div>
                      <div>
                        <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-0.5 flex items-center gap-2">
                          Xưởng Tự Tạo Flashcard
                        </h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400">Tự tạo bộ từ vựng riêng, phân loại bộ thẻ và dùng AI điền tự động.</p>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" class="w-5 h-5 text-red-600 group-hover:translate-x-1 transition"></i>
                  </div>
                </a>

                <a href="#flashcards" onclick="setTimeout(()=>App.switchFlashcardTab('scan'),100)" class="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-500 transition shadow-sm group">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition shadow-md shadow-emerald-500/30">
                        <i data-lucide="scan-line" class="w-5 h-5"></i>
                      </div>
                      <div>
                        <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-0.5 flex items-center gap-2">
                          Quét Sách Bằng AI <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Vision OCR</span>
                        </h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400">Chụp ảnh trang sách, AI tự bóc tách toàn bộ từ vựng và thêm vào Flashcard.</p>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" class="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    /* =====================================================================
       MODULE 2: MODERN SMART DICTIONARY & AI LOOKUP (PLECO / HANPING STYLE)
       Integrated with:
       - Language Direction Switch [ cn | vi ]
       - 4 Quick Action Pills: Camera OCR, Voice Mic, Handwriting, 214 Radicals
       - 5 Underlined Category Tabs: Từ vựng, Hán tự, Ngữ pháp, Mẫu câu, Kết hợp
       - Sleek Dark "Tra cứu gần đây" Recent Search Card with individual delete [x]
       - Full HanziWriter Stroke Animation, Quiz & Gemini AI Linguistic Engine
       ===================================================================== */
    toggleDictDirection(dir) {
      this.dictSearchDirection = dir;
      const input = document.getElementById("dictSearchInput");
      if (input) {
        input.placeholder = dir === "vi"
          ? "Nhập tiếng Việt (vd: học tập, tình yêu, làm việc...)"
          : "Nhập tiếng Trung hoặc Pinyin (vd: 学习, ài, zuò, dǐngzhuàng...)";
      }
      const container = document.getElementById("viewContainer");
      if (container) this.renderDictionary(container);
    },

    switchDictTab(tabId) {
      this.activeDictTab = tabId;
      const container = document.getElementById("viewContainer");
      if (container) this.renderDictionary(container);
    },

    handleDictBack() {
      this.currentDictWord = null;
      this.lastDictQuery = "";
      this.dictRelatedMatches = [];
      const container = document.getElementById("viewContainer");
      if (container) this.renderDictionary(container);
    },

    toggleRecentHistoryExpand() {
      this.dictRecentExpanded = !this.dictRecentExpanded;
      const container = document.getElementById("viewContainer");
      if (container) this.renderDictionary(container);
    },

    deleteRecentSearchItem(query) {
      if (window.StorageService) {
        window.StorageService.deleteAiLookupItem(query);
      }
      const container = document.getElementById("viewContainer");
      if (container) this.renderDictionary(container);
    },

    clearAiHistory() {
      if (window.StorageService) {
        window.StorageService.clearAiLookupHistory();
        this.showToast("Đã xóa toàn bộ lịch sử tra cứu gần đây", "info");
        const container = document.getElementById("viewContainer");
        if (container) this.renderDictionary(container);
      }
    },

    renderDictionary(container) {
      const history = window.StorageService ? window.StorageService.getAiLookupHistory() : [];
      const isExpanded = this.dictRecentExpanded;
      const displayedHistory = isExpanded ? history : history.slice(0, 3);

      const tabs = [
        { id: "vocab", label: "Từ vựng" },
        { id: "hanzi", label: "Hán tự" },
        { id: "grammar", label: "Ngữ pháp" },
        { id: "sentence", label: "Mẫu câu" },
        { id: "collocation", label: "Kết hợp" }
      ];

      container.innerHTML = `
        <div class="space-y-5 max-w-4xl mx-auto">
          <!-- Sleek Dark Container (Designed exactly as modern dictionary UI) -->
          <div class="bg-[#111622] text-white p-4 md:p-6 rounded-3xl shadow-2xl border border-slate-800 space-y-4">
            
            <!-- Row 1: Back + Search Box + Direction Switch [cn | vi] -->
            <div class="flex items-center gap-2.5">
              <button
                onclick="App.handleDictBack()"
                class="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-center shrink-0"
                title="Quay lại danh sách / Đặt lại"
              >
                <i data-lucide="chevron-left" class="w-6 h-6"></i>
              </button>

              <div class="flex-1 relative flex items-center">
                <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none"></i>
                <input
                  type="text"
                  id="dictSearchInput"
                  value="${this.lastDictQuery || ""}"
                  placeholder="${this.dictSearchDirection === "vi" ? "Nhập tiếng Việt" : "Nhập tiếng Trung / Pinyin"}"
                  class="w-full bg-[#1b2234] text-white placeholder-slate-400 rounded-2xl pl-12 pr-10 py-3 text-sm md:text-base border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
                  onkeydown="if(event.key==='Enter') App.handleDictSearch(this.value)"
                />
                ${this.lastDictQuery ? `
                  <button
                    onclick="document.getElementById('dictSearchInput').value=''; App.handleDictBack();"
                    class="absolute right-3 p-1 text-slate-400 hover:text-white"
                    title="Xóa nội dung"
                  >
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                ` : ""}
              </div>

              <!-- Switch direction pill [cn | vi] -->
              <div class="flex items-center bg-[#1c2438] p-1 rounded-2xl border border-slate-700/90 shrink-0 select-none">
                <button
                  onclick="App.toggleDictDirection('cn')"
                  class="px-2.5 py-1 rounded-xl text-xs font-bold transition ${this.dictSearchDirection === "cn" ? "bg-[#3862b5] text-white shadow-sm" : "text-slate-400 hover:text-white"}"
                >
                  cn
                </button>
                <button
                  onclick="App.toggleDictDirection('vi')"
                  class="px-2.5 py-1 rounded-xl text-xs font-bold transition ${this.dictSearchDirection === "vi" ? "bg-[#3862b5] text-white shadow-sm" : "text-slate-400 hover:text-white"}"
                >
                  vi
                </button>
              </div>
            </div>

            <!-- Row 2: 4 Rounded Quick Action Pills (Camera, Mic, Pencil, Puzzle) -->
            <div class="grid grid-cols-4 gap-2.5 sm:gap-3.5 pt-1">
              <button
                onclick="App.openDictCameraModal()"
                class="h-12 sm:h-14 rounded-2xl bg-[#2e3e60] hover:bg-[#3b507d] text-white flex items-center justify-center transition shadow-md active:scale-95 group"
                title="Quét ảnh / Nhận diện chữ qua Camera & Sách"
              >
                <i data-lucide="camera" class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition"></i>
              </button>

              <button
                id="dictVoiceBtn"
                onclick="App.startDictVoiceSearch()"
                class="h-12 sm:h-14 rounded-2xl bg-[#2e3e60] hover:bg-[#3b507d] text-white flex items-center justify-center transition shadow-md active:scale-95 group relative"
                title="Tra cứu bằng giọng nói Microphone"
              >
                <i data-lucide="mic" class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition"></i>
              </button>

              <button
                onclick="App.openDictHandwritingModal()"
                class="h-12 sm:h-14 rounded-2xl bg-[#2e3e60] hover:bg-[#3b507d] text-white flex items-center justify-center transition shadow-md active:scale-95 group"
                title="Vẽ tay / Bút viết chữ Hán"
              >
                <i data-lucide="pen-tool" class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition"></i>
              </button>

              <button
                onclick="App.openDictRadicalModal()"
                class="h-12 sm:h-14 rounded-2xl bg-[#2e3e60] hover:bg-[#3b507d] text-white flex items-center justify-center transition shadow-md active:scale-95 group"
                title="Chiết tự & Tra theo 214 Bộ thủ"
              >
                <i data-lucide="puzzle" class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition"></i>
              </button>
            </div>

            <!-- Row 3: 5 Category Tabs with active underline indicator -->
            <div class="flex items-center justify-between border-b border-slate-800 pt-3 px-1 text-sm md:text-base font-bold overflow-x-auto no-scrollbar">
              ${tabs
                .map(
                  (t) => `
                <button
                  onclick="App.switchDictTab('${t.id}')"
                  class="pb-2.5 px-3 md:px-4 transition relative whitespace-nowrap ${
                    this.activeDictTab === t.id
                      ? "text-white font-extrabold border-b-2 border-white"
                      : "text-slate-400 hover:text-slate-200"
                  }"
                >
                  ${t.label}
                </button>
              `
                )
                .join("")}
            </div>

          </div>

          <!-- Active Content Display -->
          <div id="dictDynamicContainer" class="space-y-4">
            ${
              this.currentDictWord
                ? this.renderWordResultByTab(this.currentDictWord)
                : ""
            }

            ${
              this.dictRelatedMatches && this.dictRelatedMatches.length > 0
                ? this.renderRelatedMatchesCard(this.dictRelatedMatches)
                : ""
            }

            <!-- Recent Search History Card (Tra cứu gần đây) -->
            ${this.renderRecentSearchCard(displayedHistory, history.length)}

            <!-- Explorer Content (When no word is actively selected or user browses tabs) -->
            ${
              !this.currentDictWord
                ? this.renderTabExplorer(this.activeDictTab)
                : ""
            }
          </div>
        </div>
      `;

      this.refreshIcons();
    },

    renderRelatedMatchesCard(words) {
      if (!words || words.length === 0) return "";
      return `
        <div class="bg-[#121622] text-white rounded-3xl p-4 md:p-5 shadow-xl border border-slate-800/90 space-y-3">
          <div class="flex items-center justify-between px-1">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <i data-lucide="layers" class="w-4 h-4 text-blue-400"></i> Các từ vựng liên quan khác (${words.length})
            </h4>
            <span class="text-[11px] text-slate-400">Bấm để xem chi tiết</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${words.map(w => `
              <div
                onclick="App.handleDictSearch('${w.hanzi}')"
                class="p-3 rounded-2xl bg-[#1a2234] hover:bg-[#232e46] border border-slate-700/60 hover:border-blue-400 cursor-pointer transition flex items-center justify-between group"
              >
                <div class="min-w-0 pr-2">
                  <div class="font-hanzi font-bold text-lg text-white group-hover:text-blue-400 transition">${w.hanzi}</div>
                  <div class="text-xs text-red-400 font-semibold truncate">${w.pinyin}</div>
                  <div class="text-[11px] text-slate-400 truncate" title="${w.meaning}">${w.meaning}</div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 shrink-0">
                  ${typeof w.hsk === "number" ? "HSK " + w.hsk : (w.hsk || "HSK")}
                </span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    renderRecentSearchCard(displayedList, totalCount) {
      if (!displayedList || displayedList.length === 0) return "";

      return `
        <div class="bg-[#121622] text-white rounded-3xl p-4 md:p-5 shadow-xl border border-slate-800/90 space-y-2.5">
          <div class="flex items-center justify-between px-1">
            <h3 class="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span>Tra cứu gần đây</span>
            </h3>
            <button
              onclick="App.clearAiHistory()"
              class="text-[11px] text-slate-400 hover:text-rose-400 transition"
              title="Xóa tất cả"
            >
              Xóa lịch sử
            </button>
          </div>

          <div class="space-y-1">
            ${displayedList
              .map(
                (item) => `
              <div
                onclick="App.handleDictSearch('${item.hanzi || item.query}')"
                class="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-[#1a2234] cursor-pointer transition group"
              >
                <div class="flex items-center gap-3 min-w-0 pr-2">
                  <i data-lucide="search" class="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition shrink-0"></i>
                  <span class="font-hanzi font-semibold text-sm text-slate-200 group-hover:text-white truncate">
                    ${item.hanzi || item.query}
                  </span>
                  ${item.pinyin ? `<span class="text-xs text-slate-400 font-mono">(${item.pinyin})</span>` : ""}
                  ${item.meaning ? `<span class="text-xs text-slate-400 truncate hidden sm:inline">- ${item.meaning}</span>` : ""}
                </div>

                <button
                  onclick="event.stopPropagation(); App.deleteRecentSearchItem('${item.hanzi || item.query}')"
                  class="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-700/60 transition shrink-0"
                  title="Xóa mục này"
                >
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
            `
              )
              .join("")}
          </div>

          ${
            totalCount > 3
              ? `
            <div class="text-center pt-1 border-t border-slate-800/80">
              <button
                onclick="App.toggleRecentHistoryExpand()"
                class="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 font-semibold py-1 px-3 rounded-xl hover:bg-slate-800 transition"
              >
                <span>${this.dictRecentExpanded ? "Thu gọn" : "Xem thêm"}</span>
                <i data-lucide="${this.dictRecentExpanded ? "chevron-up" : "chevron-down"}" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          `
              : ""
          }
        </div>
      `;
    },

    renderWordResultByTab(word) {
      const tab = this.activeDictTab || "vocab";

      // Setup HanziWriter if hanzi tab is active or vocab tab has hanzi
      const hanziChars = Array.from(word.hanzi || "").filter((c) => /[\u4e00-\u9fa5]/.test(c));
      const writerConfigs = hanziChars.map((char) => ({
        char,
        containerId: "hw_" + Math.random().toString(36).substring(2, 9)
      }));

      setTimeout(() => {
        writerConfigs.forEach((cfg) => {
          this.createHanziWriter(cfg.containerId, cfg.char);
        });
        this.refreshIcons();
      }, 100);

      const hasTraditional = word.traditional && word.traditional !== word.hanzi;

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-7 shadow-xl space-y-6">
          
          <!-- Result Card Top Info -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-extrabold px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300">
                ${word.hsk ? (typeof word.hsk === "number" ? `HSK ${word.hsk}` : word.hsk) : "HSK"}
              </span>
              ${word.wordType ? `<span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">${word.wordType}</span>` : ""}
              <span class="text-xs text-slate-400 font-medium flex items-center gap-1">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i>
                ${word.source === "gemini_ai" ? "Gemini Flash AI Phân Tích" : "Từ điển tiêu chuẩn"}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                onclick="AudioService.speak('${word.hanzi}')"
                class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 transition"
                title="Nghe phát âm chuẩn giọng phổ thông"
              >
                <i data-lucide="volume-2" class="w-5 h-5"></i>
              </button>
              <button
                onclick="App.addCurrentToFlashcard('${word.hanzi}', '${word.pinyin}', '${word.meaning}', '${word.example?.zh || ""}', '${word.example?.vi || ""}')"
                class="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <i data-lucide="plus-circle" class="w-4 h-4"></i> Thêm vào Flashcard
              </button>
            </div>
          </div>

          <!-- TAB CONTENT SWITCHER -->
          ${(() => {
            switch (tab) {
              case "hanzi":
                return `
                  <!-- TAB 2: HÁN TỰ & BÚT THUẬN TẬP VIẾT -->
                  <div class="space-y-6">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 class="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <i data-lucide="edit-3" class="w-5 h-5 text-red-600"></i>
                          Chi Tiết Hán Tự & Bút Thuận
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                          Xem thứ tự từng nét viết chuẩn Hanban và luyện tập viết trực tiếp bằng chuột hoặc màn hình cảm ứng.
                        </p>
                      </div>
                      <span class="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        ${word.strokes || 8} Nét bút
                      </span>
                    </div>

                    <!-- HanziWriter Boxes -->
                    <div class="flex flex-wrap items-center justify-center gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700">
                      ${writerConfigs
                        .map(
                          (cfg) => `
                        <div class="flex flex-col items-center space-y-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                          <div id="${cfg.containerId}" class="w-[130px] h-[130px] tianzige-box rounded-xl border-2 border-red-200 dark:border-red-900/50 shadow-inner flex items-center justify-center">
                            <span class="font-hanzi text-5xl font-bold text-slate-300">${cfg.char}</span>
                          </div>
                          <span class="font-hanzi font-bold text-lg text-slate-800 dark:text-white">${cfg.char}</span>
                          <div class="flex items-center gap-1.5">
                            <button
                              onclick="App.animateHanzi('${cfg.containerId}')"
                              class="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                              title="Xem thứ tự vẽ nét"
                            >
                              <i data-lucide="play" class="w-3.5 h-3.5 fill-white"></i>
                              <span>Vẽ nét</span>
                            </button>
                            <button
                              onclick="App.quizHanzi('${cfg.containerId}', '${cfg.char}')"
                              class="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                              title="Tập viết trực tiếp"
                            >
                              <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                              <span>Tập viết</span>
                            </button>
                            <button
                              onclick="App.resetHanzi('${cfg.containerId}')"
                              class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
                              title="Đặt lại nét"
                            >
                              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                            </button>
                          </div>
                        </div>
                      `
                        )
                        .join("")}
                    </div>

                    <!-- Linguistic Anatomy: Radical, Rules, Mnemonics -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1.5">
                        <span class="text-slate-400 font-bold uppercase tracking-wider block">Bộ thủ (Radical):</span>
                        <div class="font-bold text-slate-800 dark:text-white text-base">${word.radical || "Đang cập nhật"}</div>
                        <p class="text-slate-500 dark:text-slate-400 text-[11px]">
                          ${word.strokeOrderRules || "Quy tắc: Ngang trước sổ sau, trên trước dưới sau, ngoài trước trong sau."}
                        </p>
                      </div>

                      <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                        <span class="text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <i data-lucide="lightbulb" class="w-4 h-4 text-amber-500"></i> Mẹo Chiết Tự Nhớ Chữ:
                        </span>
                        <p class="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                          ${word.mnemonics || `Ghi nhớ chữ "${word.hanzi}" qua các bộ phận cấu thành và liên hệ với ý nghĩa "${word.meaning}".`}
                        </p>
                      </div>
                    </div>
                  </div>
                `;

              case "grammar":
                return `
                  <!-- TAB 3: NGỮ PHÁP & TỪ LOẠI -->
                  <div class="space-y-5">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                      <div>
                        <h3 class="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <i data-lucide="bookmark" class="w-5 h-5 text-indigo-600"></i>
                          Phân Tích Ngữ Pháp & Cấu Trúc
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                          Vị trí của từ trong câu, từ loại và quy tắc ngữ pháp đặc thù trong giao tiếp và thi cử HSK.
                        </p>
                      </div>
                      <span class="text-xs font-bold px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        ${word.wordType || "Từ vựng / Cụm từ"}
                      </span>
                    </div>

                    <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
                      <h4 class="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500"></i>
                        Quy Tắc Sử Dụng & Vị Trí Trong Câu:
                      </h4>
                      <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        ${word.grammarNotes || `Từ "<b>${word.hanzi}</b>" (${word.pinyin}) đóng vai trò là <b>${word.wordType || "từ vựng cốt lõi"}</b> trong ngữ pháp tiếng Trung. Thường đứng làm vị ngữ, bổ ngữ hoặc kết hợp với các phó từ chỉ mức độ (很, 非常, 太) và trợ từ cấu trúc (的, 得, 了).`}
                      </p>
                    </div>

                    <!-- Common Grammar Structure -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div class="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
                        <span class="font-bold text-blue-800 dark:text-blue-300 block mb-1">Cấu trúc khẳng định:</span>
                        <div class="font-mono text-slate-700 dark:text-slate-300">Chủ ngữ + ${word.hanzi} + Tân ngữ / Bổ ngữ</div>
                      </div>
                      <div class="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                        <span class="font-bold text-rose-800 dark:text-rose-300 block mb-1">Cấu trúc phủ định:</span>
                        <div class="font-mono text-slate-700 dark:text-slate-300">Chủ ngữ + 不 / 没 + ${word.hanzi}</div>
                      </div>
                    </div>
                  </div>
                `;

              case "sentence":
                return `
                  <!-- TAB 4: MẪU CÂU & GIAO TIẾP THỰC TẾ -->
                  <div class="space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                      <div>
                        <h3 class="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <i data-lucide="message-square" class="w-5 h-5 text-amber-500"></i>
                          Mẫu Câu Ví Dụ Ứng Dụng
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                          Các câu giao tiếp sinh động có chứa từ "${word.hanzi}", kèm phiên âm Pinyin và giọng đọc bản xứ.
                        </p>
                      </div>
                    </div>

                    ${word.example ? `
                      <div class="p-4 md:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                        <div class="flex items-center justify-between">
                          <span class="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Ví dụ chuẩn Hanban:</span>
                          <button onclick="AudioService.speak('${word.example.zh}')" class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-red-50 transition">
                            <i data-lucide="volume-2" class="w-4 h-4"></i> Nghe đọc
                          </button>
                        </div>
                        <div class="font-hanzi font-bold text-lg md:text-xl text-slate-900 dark:text-white">
                          ${word.example.zh}
                        </div>
                        <div class="text-xs md:text-sm text-amber-700 dark:text-amber-400 font-mono">
                          ${word.example.pinyin}
                        </div>
                        <div class="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic">
                          ${word.example.vi}
                        </div>
                      </div>
                    ` : ""}

                    ${(word.additionalExamples || []).map((ex, idx) => `
                      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">Ví dụ mở rộng ${idx + 2}:</span>
                          <button onclick="AudioService.speak('${ex.zh}')" class="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold">
                            <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe
                          </button>
                        </div>
                        <div class="font-hanzi font-bold text-base text-slate-800 dark:text-white">${ex.zh}</div>
                        <div class="text-xs text-amber-600 dark:text-amber-400 font-mono">${ex.pinyin}</div>
                        <div class="text-xs text-slate-600 dark:text-slate-300 italic">${ex.vi}</div>
                      </div>
                    `).join("")}
                  </div>
                `;

              case "collocation":
                return `
                  <!-- TAB 5: KẾT HỢP TỪ, ĐỒNG NGHĨA & TRÁI NGHĨA -->
                  <div class="space-y-5">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                      <div>
                        <h3 class="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <i data-lucide="link" class="w-5 h-5 text-teal-600"></i>
                          Từ Ghép Kết Hợp, Đồng Nghĩa & Trái Nghĩa
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                          Bấm vào bất kỳ từ nào để tra cứu ngay ý nghĩa và ví dụ chi tiết.
                        </p>
                      </div>
                    </div>

                    <!-- Collocations -->
                    <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
                      <span class="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block">
                        Các Cụm Từ Ghép Phổ Biến (Collocations):
                      </span>
                      <div class="flex flex-wrap gap-2.5">
                        ${(word.collocations || ["爱好", "爱情", "可爱", "爱心"])
                          .map((c) => `
                            <button
                              onclick="App.handleDictSearch('${c}')"
                              class="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-hanzi font-bold text-sm border border-slate-200 dark:border-slate-600 hover:border-red-500 hover:text-red-600 transition shadow-sm"
                            >
                              ${c}
                            </button>
                          `).join("")}
                      </div>
                    </div>

                    <!-- Synonyms & Antonyms -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                        <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                          <i data-lucide="plus" class="w-4 h-4"></i> Từ Đồng Nghĩa (近义词):
                        </span>
                        <div class="flex flex-wrap gap-2">
                          ${(word.synonyms || ["喜欢", "疼爱", "热衷"])
                            .map((s) => `
                              <button
                                onclick="App.handleDictSearch('${s}')"
                                class="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-hanzi font-medium text-xs border border-emerald-200 hover:border-emerald-500 transition shadow-sm"
                              >
                                ${s}
                              </button>
                            `).join("")}
                        </div>
                      </div>

                      <div class="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                        <span class="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                          <i data-lucide="minus" class="w-4 h-4"></i> Từ Trái Nghĩa (反义词):
                        </span>
                        <div class="flex flex-wrap gap-2">
                          ${(word.antonyms || ["恨", "讨厌", "反感"])
                            .map((a) => `
                              <button
                                onclick="App.handleDictSearch('${a}')"
                                class="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 font-hanzi font-medium text-xs border border-rose-200 hover:border-rose-500 transition shadow-sm"
                              >
                                ${a}
                              </button>
                            `).join("")}
                        </div>
                      </div>
                    </div>
                  </div>
                `;

              case "vocab":
              default:
                return `
                  <!-- TAB 1: TỔNG QUAN TỪ VỰNG & NGHĨA TIẾNG VIỆT -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <!-- Big Hanzi in Tianzige with Ruby Pinyin -->
                    <div class="flex flex-col items-center justify-center p-6 rounded-3xl tianzige-box border border-red-200 dark:border-red-900/50 shadow-inner bg-red-50/20 dark:bg-red-950/10">
                      <span class="font-hanzi font-bold text-5xl md:text-6xl text-slate-900 dark:text-white leading-none text-center">
                        ${word.hanzi}
                      </span>
                      <span class="mt-3 text-base md:text-lg font-bold text-red-600 dark:text-red-400 font-mono tracking-wide text-center">
                        ${word.pinyin}
                      </span>
                      ${hasTraditional ? `
                        <span class="mt-1 text-xs text-slate-400 font-medium font-hanzi">
                          Phồn thể: <strong class="text-slate-600 dark:text-slate-300">${word.traditional}</strong>
                        </span>
                      ` : ""}
                    </div>

                    <!-- Meanings, Radical, Strokes -->
                    <div class="md:col-span-2 space-y-4">
                      <div>
                        <span class="text-xs uppercase font-bold text-slate-400">Định nghĩa tiếng Việt</span>
                        <h3 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-0.5 leading-snug">
                          ${word.meaning}
                        </h3>
                      </div>

                      ${word.detailedMeanings && word.detailedMeanings.length > 0 ? `
                        <div class="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750/70 border border-slate-100 dark:border-slate-700/60 text-xs">
                          <span class="font-bold text-slate-700 dark:text-slate-300 block">Các tầng nghĩa chi tiết:</span>
                          <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                            ${word.detailedMeanings.map((m) => `<li>${m}</li>`).join("")}
                          </ul>
                        </div>
                      ` : ""}

                      <div class="grid grid-cols-2 gap-3 text-xs">
                        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750/50 border border-slate-100 dark:border-slate-700">
                          <span class="text-slate-400 block mb-0.5 font-medium">Bộ thủ (Radical):</span>
                          <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">${word.radical || "Đang cập nhật"}</span>
                        </div>
                        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750/50 border border-slate-100 dark:border-slate-700">
                          <span class="text-slate-400 block mb-0.5 font-medium">Số nét (Strokes):</span>
                          <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">${word.strokes || 8} nét</span>
                        </div>
                      </div>

                      <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <button onclick="App.switchDictTab('hanzi')" class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-red-50 hover:text-red-600 transition flex items-center gap-1.5">
                          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Tập viết nét
                        </button>
                        <button onclick="App.switchDictTab('sentence')" class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-amber-50 hover:text-amber-600 transition flex items-center gap-1.5">
                          <i data-lucide="message-square" class="w-3.5 h-3.5"></i> Mẫu câu ví dụ
                        </button>
                        <button onclick="App.switchDictTab('collocation')" class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-teal-50 hover:text-teal-600 transition flex items-center gap-1.5">
                          <i data-lucide="link" class="w-3.5 h-3.5"></i> Từ ghép liên quan
                        </button>
                      </div>
                    </div>
                  </div>
                `;
            }
          })()}
        </div>
      `;
    },

    renderTabExplorer(tab) {
      switch (tab) {
        case "hanzi":
          return `
            <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div>
                  <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <i data-lucide="edit-3" class="w-4 h-4 text-red-500"></i>
                    Bảng Chữ Hán Cốt Lõi (Luyện Viết Bút Thuận)
                  </h3>
                  <p class="text-xs text-slate-400 mt-0.5">Bấm vào bất kỳ chữ Hán nào để xem hoạt ảnh nét vẽ và tập viết tương tác.</p>
                </div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                ${["爱", "好", "学", "习", "作", "顶", "撞", "人", "天", "大", "中", "国"]
                  .map(
                    (char) => `
                  <button
                    onclick="App.handleDictSearch('${char}')"
                    class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:scale-105 transition flex flex-col items-center space-y-1 shadow-sm"
                  >
                    <span class="font-hanzi font-bold text-3xl text-slate-900 dark:text-white">${char}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">Tập viết nét</span>
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>
          `;

        case "grammar":
          return `
            <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
              <div class="border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <i data-lucide="bookmark" class="w-4 h-4 text-indigo-500"></i>
                  6 Cấu Trúc Ngữ Pháp Tiếng Trung Cốt Lõi (HSK 1 - 4)
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">1. Câu chữ 把 (Bǎ):</span>
                  <p class="font-mono text-slate-800 dark:text-slate-200">Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác</p>
                  <p class="text-slate-500 dark:text-slate-400 italic">VD: 我把作业做完了。(Tôi đã làm xong bài tập rồi.)</p>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">2. Câu so sánh 比 (Bǐ):</span>
                  <p class="font-mono text-slate-800 dark:text-slate-200">A + 比 + B + Tính từ / Phó từ</p>
                  <p class="text-slate-500 dark:text-slate-400 italic">VD: 今天比昨天冷。(Hôm nay lạnh hơn hôm qua.)</p>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">3. Ba trợ từ 的, 得, 地:</span>
                  <p class="font-mono text-slate-800 dark:text-slate-200">Định ngữ + 的 + N | V + 得 + Bổ ngữ | Phó từ + 地 + V</p>
                  <p class="text-slate-500 dark:text-slate-400 italic">VD: 漂亮的衣服 / 跑得快 / 高兴地说</p>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">4. Câu chữ 被 (Bèi - Bị động):</span>
                  <p class="font-mono text-slate-800 dark:text-slate-200">Chủ ngữ (bị tác động) + 被 + Tân ngữ + Động từ</p>
                  <p class="text-slate-500 dark:text-slate-400 italic">VD: 苹果被他吃了。(Quả táo đã bị anh ấy ăn rồi.)</p>
                </div>
              </div>
            </div>
          `;

        case "sentence":
          return `
            <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
              <div class="border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <i data-lucide="message-square" class="w-4 h-4 text-amber-500"></i>
                  Mẫu Câu Giao Tiếp Thông Dụng Hàng Ngày
                </h3>
              </div>
              <div class="space-y-3">
                ${[
                  { zh: "你好！很高兴认识你。", py: "Nǐ hǎo! Hěn gāoxìng rènshí nǐ.", vi: "Xin chào! Rất vui được làm quen với bạn." },
                  { zh: "请问，这个多少钱？", py: "Qǐngwèn, zhège duōshǎo qián?", vi: "Xin hỏi, cái này bao nhiêu tiền?" },
                  { zh: "你可以帮我一个忙吗？", py: "Nǐ kěyǐ bāng wǒ yí ge máng ma?", vi: "Bạn có thể giúp tôi một việc được không?" },
                  { zh: "今天天气很好，我们去旅游吧。", py: "Jīntiān tiānqì hěn hǎo, wǒmen qù lǚyóu ba.", vi: "Hôm nay thời tiết rất đẹp, chúng ta đi du lịch nhé." }
                ].map((s) => `
                  <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div>
                      <div class="font-hanzi font-bold text-base text-slate-900 dark:text-white">${s.zh}</div>
                      <div class="text-xs text-amber-600 dark:text-amber-400 font-mono">${s.py}</div>
                      <div class="text-xs text-slate-600 dark:text-slate-300 italic">${s.vi}</div>
                    </div>
                    <button onclick="AudioService.speak('${s.zh}')" class="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 shadow-sm transition" title="Nghe câu này">
                      <i data-lucide="volume-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>
          `;

        case "collocation":
          return `
            <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
              <div class="border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <i data-lucide="link" class="w-4 h-4 text-teal-500"></i>
                  Quán Dụng Ngữ & Cụm Từ Cố Định
                </h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                ${[
                  { zh: "提高水平", py: "tígāo shuǐpíng", vi: "Nâng cao trình độ" },
                  { zh: "解决问题", py: "jiějué wèntí", vi: "Giải quyết vấn đề" },
                  { zh: "交流经验", py: "jiāoliú jīngyàn", vi: "Giao lưu kinh nghiệm" },
                  { zh: "签订合同", py: "qiāndìng hétóng", vi: "Ký kết hợp đồng" },
                  { zh: "保护环境", py: "bǎohù huánjìng", vi: "Bảo vệ môi trường" },
                  { zh: "打交道", py: "dǎ jiāodào", vi: "Tiếp xúc, giao thiệp" }
                ].map((c) => `
                  <button
                    onclick="App.handleDictSearch('${c.zh}')"
                    class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-left hover:border-teal-500 hover:scale-[1.02] transition shadow-sm"
                  >
                    <div class="font-hanzi font-bold text-base text-slate-900 dark:text-white">${c.zh}</div>
                    <div class="text-xs text-teal-600 dark:text-teal-400 font-mono">${c.py}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">${c.vi}</div>
                  </button>
                `).join("")}
              </div>
            </div>
          `;

        case "vocab":
        default:
          return `
            <!-- Filter Pills (All, HSK 1 - 6, Business, Custom) -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onclick="App.filterDictByHsk('all')"
                class="dict-hsk-pill px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.dictHskFilter === "all" ? "bg-red-600 text-white shadow-sm" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-400"}"
              >
                Tất cả (${(window.APP_DATA.vocabList || []).length})
              </button>
              ${[1, 2, 3, 4, 5, 6].map((l) => `
                <button
                  onclick="App.filterDictByHsk('${l}')"
                  class="dict-hsk-pill px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.dictHskFilter === String(l) ? "bg-red-600 text-white shadow-sm" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-400"}"
                >
                  HSK ${l} (${(window.APP_DATA.vocabList || []).filter((w) => w.hsk === l).length})
                </button>
              `).join("")}
              <button
                onclick="App.filterDictByHsk('business')"
                class="dict-hsk-pill px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.dictHskFilter === "business" ? "bg-red-600 text-white shadow-sm" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-400"}"
              >
                💼 Thương Mại (${(window.APP_DATA.vocabList || []).filter((w) => w.category === "business" || w.hsk === "Thương Mại" || w.deck === "business").length})
              </button>
              <button
                onclick="App.filterDictByHsk('custom')"
                class="dict-hsk-pill px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.dictHskFilter === "custom" ? "bg-red-600 text-white shadow-sm" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-400"}"
              >
                ⭐ Thẻ tự tạo (${(window.StorageService ? window.StorageService.getFlashcards() : []).length})
              </button>
            </div>

            <!-- Vocabulary Grid -->
            ${this.renderDictWordListHtml()}
          `;
      }
    },

    filterDictByHsk(lvl) {
      this.dictHskFilter = lvl;
      const container = document.getElementById("viewContainer");
      if (container) this.renderDictionary(container);
    },

    renderDictWordListHtml() {
      let words = window.APP_DATA.vocabList || [];
      let label = "toàn bộ HSK 1 - 6 & Chuyên ngành";

      if (this.dictHskFilter !== "all") {
        if (this.dictHskFilter === "business") {
          words = words.filter((w) => w.category === "business" || w.hsk === "Thương Mại" || w.deck === "business");
          label = "Chuyên ngành Tiếng Trung Thương Mại";
        } else if (this.dictHskFilter === "custom") {
          const cards = window.StorageService ? window.StorageService.getFlashcards() : [];
          words = cards.map((c) => ({
            id: c.id,
            hanzi: c.hanzi,
            pinyin: c.pinyin,
            meaning: c.meaning,
            hsk: c.hsk || "Tự tạo",
            radical: "Thẻ cá nhân",
            strokes: 8,
            example: { zh: c.example || c.hanzi, pinyin: "", vi: c.exampleVi || c.meaning }
          }));
          label = "Flashcard người dùng tự tạo";
        } else {
          const lvlNum = parseInt(this.dictHskFilter);
          words = words.filter((w) => w.hsk === lvlNum);
          label = `cấp độ HSK ${this.dictHskFilter}`;
        }
      }

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <i data-lucide="layers" class="w-4 h-4 text-red-500"></i>
              Danh sách từ vựng ${label} (${words.length} từ)
            </h3>
            <span class="text-xs text-slate-400">Bấm vào từ để xem cách viết nét & chi tiết</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${words.map((item) => this.renderSmallWordCard(item)).join("")}
          </div>
        </div>
      `;
    },

    renderSmallWordCard(word) {
      return `
        <div onclick="App.handleDictSearch('${word.hanzi}')" class="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 bg-slate-50/50 dark:bg-slate-750 cursor-pointer transition flex items-center justify-between group shadow-sm">
          <div class="flex items-center space-x-3.5">
            <div class="w-13 h-13 p-2 rounded-xl tianzige-box flex items-center justify-center font-hanzi font-bold text-2xl text-slate-900 dark:text-white shadow-inner">
              ${word.hanzi}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-red-600 dark:text-red-400 text-sm font-mono">${word.pinyin}</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">HSK ${word.hsk}</span>
              </div>
              <p class="text-xs font-medium text-slate-700 dark:text-slate-200 line-clamp-1 mt-0.5">${word.meaning}</p>
              <span class="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <i data-lucide="edit-3" class="w-3 h-3 text-emerald-500"></i> Có hoạt ảnh vẽ nét (${word.strokes || 8} nét)
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="event.stopPropagation(); AudioService.speak('${word.hanzi}')" class="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-500 hover:text-red-600 transition shadow-sm" title="Nghe phát âm">
              <i data-lucide="volume-2" class="w-4 h-4"></i>
            </button>
            <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition"></i>
          </div>
        </div>
      `;
    },

    async handleDictSearch(query, forceAi = false) {
      if (!query || !query.trim()) {
        this.showToast("Vui lòng nhập từ hoặc câu cần tra cứu!", "warning");
        return;
      }
      query = query.trim();
      this.lastDictQuery = query;
      const qLower = query.toLowerCase();

      // 1. Instant check from cached history first (0ms)
      if (!forceAi && window.StorageService) {
        const cached = window.StorageService.getAiLookupCache(query);
        if (cached) {
          this.currentDictWord = cached;
          const container = document.getElementById("viewContainer");
          if (container) this.renderDictionary(container);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      // 2. Instant high-frequency dictionary check (0ms)
      if (!forceAi && window.GeminiService && window.GeminiService.findInstantWord) {
        const instantMatch = window.GeminiService.findInstantWord(query);
        if (instantMatch) {
          this.currentDictWord = instantMatch;
          if (window.StorageService) {
            window.StorageService.saveAiLookupItem(instantMatch);
          }
          const container = document.getElementById("viewContainer");
          if (container) this.renderDictionary(container);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      // 3. Search in local database with intelligent relevance scoring
      let localMatch = null;
      let relatedMatches = [];
      if (!forceAi) {
        const vocab = window.APP_DATA.vocabList || [];
        const scored = [];
        const qNoTone = window.GeminiService ? window.GeminiService.removeVietnameseTones(qLower) : qLower;

        for (const w of vocab) {
          let score = 0;
          const hz = (w.hanzi || "").toLowerCase();
          const py = (w.pinyin || "").toLowerCase();
          const pyNoTone = window.GeminiService ? window.GeminiService.removeVietnameseTones(py) : py;
          const mn = (w.meaning || "").toLowerCase();
          const mnNoTone = window.GeminiService ? window.GeminiService.removeVietnameseTones(mn) : mn;

          // 1. Exact Hanzi (1000)
          if (hz === qLower) {
            score = 1000;
          }
          // 2. Exact Pinyin (800)
          else if (py === qLower || pyNoTone === qNoTone) {
            score = 800;
          }
          // 3. Exact meaning in separated parts (600)
          else {
            const parts = mn.split(/[,;\/()]/).map((s) => s.trim().toLowerCase()).filter(Boolean);
            const partsNoTone = mnNoTone.split(/[,;\/()]/).map((s) => s.trim().toLowerCase()).filter(Boolean);

            if (parts.includes(qLower) || partsNoTone.includes(qNoTone)) {
              score = 600;
            } else if (parts.some((p) => p.startsWith(qLower) || p.startsWith(qNoTone))) {
              score = 400;
            } else {
              const regex = new RegExp(`(^|[\\s,;()/])${qNoTone}([\\s,;()/]|$)`, "i");
              if (regex.test(mnNoTone)) {
                score = 300;
              } else if (hz.includes(qLower)) {
                score = 200;
              } else if (mnNoTone.includes(qNoTone)) {
                score = 60;
              }
            }
          }

          if (score > 0) {
            score += Math.max(0, 30 - mn.length);
            scored.push({ word: w, score });
          }
        }

        scored.sort((a, b) => b.score - a.score);
        if (scored.length > 0 && scored[0].score >= 80) {
          localMatch = scored[0].word;
          relatedMatches = scored.slice(1, 7).map((s) => s.word);
        }
      }
      this.dictRelatedMatches = relatedMatches;

      if (localMatch && !forceAi) {
        const enriched = {
          query: query,
          hanzi: localMatch.hanzi,
          traditional: localMatch.traditional || localMatch.hanzi,
          pinyin: localMatch.pinyin,
          wordType: localMatch.wordType || "Từ vựng HSK",
          meaning: localMatch.meaning,
          detailedMeanings: localMatch.detailedMeanings || [localMatch.meaning],
          hsk: localMatch.hsk ? (typeof localMatch.hsk === "number" ? `HSK ${localMatch.hsk}` : localMatch.hsk) : "HSK",
          radical: localMatch.radical || "Đang cập nhật",
          strokes: localMatch.strokes || 8,
          strokeOrderRules: localMatch.strokeOrderRules || "Quy tắc: Ngang trước sổ sau, trên trước dưới sau",
          mnemonics: localMatch.mnemonics || `Ghi nhớ chữ "${localMatch.hanzi}" (${localMatch.pinyin}) có nghĩa là "${localMatch.meaning}".`,
          synonyms: localMatch.synonyms || [localMatch.hanzi],
          antonyms: localMatch.antonyms || [],
          collocations: localMatch.collocations || [`${localMatch.hanzi}常用`, `学习${localMatch.hanzi}`],
          grammarNotes: localMatch.grammarNotes || `Từ "${localMatch.hanzi}" thường dùng trong giao tiếp và đề thi HSK.`,
          example: localMatch.example || {
            zh: `这是一个关于${localMatch.hanzi}的实用例句。`,
            pinyin: `Zhè shì yí gè guānyú ${localMatch.hanzi} de shíyòng lìjù.`,
            vi: `Đây là câu ví dụ ứng dụng thực tế cho từ "${localMatch.hanzi}".`
          },
          additionalExamples: localMatch.additionalExamples || [],
          source: "instant_dict"
        };
        this.currentDictWord = enriched;
        if (window.StorageService) {
          window.StorageService.saveAiLookupItem(enriched);
        }
        const container = document.getElementById("viewContainer");
        if (container) this.renderDictionary(container);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // 4. Ultra-fast AI lookup (1 - 2s)
      await this.executeAiDictLookup(query, !forceAi);
    },

    async executeAiDictLookup(query, isFallback = false) {
      const startTime = Date.now();
      this.openModal(`
        <div class="p-7 text-center space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md animate-pulse">
            <i data-lucide="zap" class="w-7 h-7 text-amber-300"></i>
          </div>
          <h4 class="font-extrabold text-base text-slate-900 dark:text-white">
            Đang phân tích siêu tốc từ "${query}"...
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Kết nối trực tiếp Gemini 2.0 Flash phân tích Hán tự, Pinyin, bộ thủ và ngữ nghĩa trong 1-2 giây.
          </p>
          <div class="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-2/3 animate-[pulse_1s_infinite]"></div>
          </div>
          <div class="flex items-center justify-center gap-2 pt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
            <span id="dictLookupTimer">Thời gian xử lý: 0.8s...</span>
          </div>
        </div>
      `);
      this.refreshIcons();

      const timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const timerEl = document.getElementById("dictLookupTimer");
        if (timerEl) {
          timerEl.textContent = `Thời gian xử lý: ${elapsed}s...`;
        }
      }, 200);

      try {
        const aiResult = await window.GeminiService.lookupWordAI(query);
        clearInterval(timerInterval);
        this.closeModal();
        this.currentDictWord = aiResult;
        if (window.StorageService) {
          window.StorageService.saveAiLookupItem({
            ...aiResult,
            query: query
          });
        }
        const container = document.getElementById("viewContainer");
        if (container) this.renderDictionary(container);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        clearInterval(timerInterval);
        this.closeModal();
        this.showToast(`Lỗi tra cứu AI: ${err.message}`, "error");
      }
    },

    /* Quick Action 1: Camera & Book OCR Modal */
    openDictCameraModal() {
      this.openModal(`
        <div class="p-6 md:p-8 space-y-5">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold">
                <i data-lucide="camera" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white">Tra Cứu Qua Camera & Ảnh Chụp</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">Tải ảnh hoặc chụp trang sách tiếng Trung để AI quét chữ Hán.</p>
              </div>
            </div>
            <button onclick="App.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div id="dictScanDropzone" class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl p-6 text-center hover:border-red-500 transition cursor-pointer bg-slate-50 dark:bg-slate-750">
              <input type="file" id="dictCameraFileInput" accept="image/*" class="hidden" />
              <i data-lucide="image-plus" class="w-10 h-10 text-slate-400 mx-auto mb-2"></i>
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">Bấm để chọn ảnh từ máy hoặc chụp ảnh</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Hỗ trợ JPG, PNG, WEBP (Trang sách, menu, biển hiệu...)</p>
            </div>

            <div class="flex items-center justify-center gap-3">
              <button
                onclick="App.useSampleImageForDict()"
                class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i> Dùng ảnh mẫu trang sách HSK
              </button>
            </div>

            <div id="dictScanResultArea" class="hidden space-y-3"></div>
          </div>
        </div>
      `);
      this.refreshIcons();

      const dropzone = document.getElementById("dictScanDropzone");
      const fileInput = document.getElementById("dictCameraFileInput");
      if (dropzone && fileInput) {
        dropzone.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => this.processDictImage(event.target.result);
            reader.readAsDataURL(file);
          }
        });
      }
    },

    useSampleImageForDict() {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 360;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fffdfa";
      ctx.fillRect(0, 0, 600, 360);
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 28px 'Noto Serif SC', serif";
      ctx.fillText("HSK 汉语水平考试", 160, 60);
      ctx.font = "24px 'Noto Sans SC', sans-serif";
      ctx.fillText("1. 坚持 (jiānchí) - Kiên trì", 80, 130);
      ctx.fillText("2. 顶撞 (dǐngzhuàng) - Cãi lại", 80, 180);
      ctx.fillText("3. 商业 (shāngyè) - Thương mại", 80, 230);
      ctx.fillText("4. 合作 (hézuò) - Hợp tác", 80, 280);
      const dataUrl = canvas.toDataURL("image/png");
      this.processDictImage(dataUrl);
    },

    async processDictImage(dataUrl) {
      const area = document.getElementById("dictScanResultArea");
      if (!area) return;
      area.classList.remove("hidden");
      area.innerHTML = `
        <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 flex items-center justify-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
          <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
          <span>Gemini Vision đang quét nhận diện chữ Hán trong ảnh...</span>
        </div>
      `;
      this.refreshIcons();

      try {
        const words = await window.GeminiService.scanTextbookImage(dataUrl);
        area.innerHTML = `
          <div class="space-y-2">
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300 block">Chữ Hán được AI trích xuất:</span>
            <div class="flex flex-wrap gap-2">
              ${words.map((w) => `
                <button
                  onclick="App.closeModal(); App.handleDictSearch('${w.hanzi}')"
                  class="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-hanzi font-bold text-sm shadow-sm transition flex items-center gap-1.5"
                >
                  <span>${w.hanzi}</span>
                  <span class="text-[10px] text-red-200">(${w.pinyin})</span>
                </button>
              `).join("")}
            </div>
            <p class="text-[11px] text-slate-400 italic">Bấm vào bất kỳ từ nào để mở tra cứu tức thì.</p>
          </div>
        `;
        this.refreshIcons();
      } catch (err) {
        area.innerHTML = `
          <div class="p-4 rounded-2xl bg-red-50 text-red-600 text-xs">
            Lỗi nhận diện: ${err.message}. Hãy nhập từ bằng bàn phím.
          </div>
        `;
      }
    },

    /* Quick Action 2: Voice Recognition Microphone */
    startDictVoiceSearch() {
      const btn = document.getElementById("dictVoiceBtn");
      if (!window.AudioService) return;

      if (btn) {
        btn.classList.add("ring-4", "ring-red-500", "bg-red-600");
      }
      this.showToast(
        this.dictSearchDirection === "vi"
          ? "Đang lắng nghe... Hãy nói tiếng Việt (ví dụ: học tập, bạn bè, thành công)"
          : "正在聆听... 请说普通话 (例如: 学习, 朋友, 成功)",
        "info"
      );

      const recognition = AudioService.initRecognition({
        onStart: () => {},
        onResult: (text) => {
          if (btn) btn.classList.remove("ring-4", "ring-red-500", "bg-red-600");
          const input = document.getElementById("dictSearchInput");
          if (input) input.value = text;
          this.showToast(`Đã nhận diện: "${text}"`, "success");
          this.handleDictSearch(text);
        },
        onError: (err) => {
          if (btn) btn.classList.remove("ring-4", "ring-red-500", "bg-red-600");
          this.showToast(`Chưa nhận diện được giọng nói: ${err}`, "warning");
        },
        onEnd: () => {
          if (btn) btn.classList.remove("ring-4", "ring-red-500", "bg-red-600");
        }
      });

      if (recognition) {
        recognition.lang = this.dictSearchDirection === "vi" ? "vi-VN" : "zh-CN";
        try {
          recognition.start();
        } catch (e) {
          console.warn("Recognition already started", e);
        }
      }
    },

    /* Quick Action 3: Handwriting Canvas Modal */
    openDictHandwritingModal() {
      this.openModal(`
        <div class="p-6 md:p-8 space-y-4 max-w-md mx-auto">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center gap-2">
              <i data-lucide="pen-tool" class="w-5 h-5 text-red-600"></i>
              <h3 class="font-extrabold text-base text-slate-900 dark:text-white">Bảng Vẽ Tay Chữ Hán</h3>
            </div>
            <button onclick="App.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="flex flex-col items-center space-y-3">
            <!-- Canvas with Tianzige Grid -->
            <div class="relative w-[280px] h-[280px] tianzige-box rounded-2xl border-2 border-red-300 dark:border-red-900 shadow-inner bg-white dark:bg-slate-900 overflow-hidden">
              <canvas id="handwritingCanvas" width="280" height="280" class="touch-none cursor-crosshair"></canvas>
            </div>

            <!-- Controls -->
            <div class="flex items-center gap-2 w-full">
              <button
                id="hwClearBtn"
                class="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Xóa nét
              </button>
              <button
                id="hwRecognizeBtn"
                class="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
              >
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Nhận diện bằng AI
              </button>
            </div>

            <!-- Quick Candidate Hanzi -->
            <div class="w-full space-y-1 pt-1">
              <span class="text-[11px] text-slate-400 font-semibold block">Gợi ý chữ phổ biến:</span>
              <div class="flex flex-wrap gap-1.5">
                ${["好", "学", "爱", "你", "我", "作", "顶", "撞", "国", "家", "人", "天"]
                  .map(
                    (c) => `
                  <button
                    onclick="App.closeModal(); App.handleDictSearch('${c}')"
                    class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 text-slate-700 dark:text-slate-200 font-hanzi font-bold text-sm transition"
                  >
                    ${c}
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      `);
      this.refreshIcons();

      const canvas = document.getElementById("handwritingCanvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let isDrawing = false;
      let strokes = [];

      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#1e293b";

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      }

      function startDraw(e) {
        e.preventDefault();
        isDrawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }

      function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      function stopDraw() {
        if (isDrawing) {
          isDrawing = false;
          strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
      }

      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDraw);
      canvas.addEventListener("touchstart", startDraw);
      canvas.addEventListener("touchmove", draw);
      canvas.addEventListener("touchend", stopDraw);

      document.getElementById("hwClearBtn")?.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = [];
      });

      document.getElementById("hwRecognizeBtn")?.addEventListener("click", async () => {
        this.closeModal();
        await this.executeAiDictLookup("Chữ Hán vừa vẽ tay");
      });
    },

    /* Quick Action 4: Radicals 214 Bộ Thủ Modal */
    openDictRadicalModal() {
      const radicalsByStrokes = [
        { strokes: "1 Nét", items: ["一 (Nhất)", "丨 (Cổn)", "丶 (Điểm)", "丿 (Phiệt)", "乙 (Ất)", "亅 (Quyết)"] },
        { strokes: "2 Nét", items: ["亻 (Nhân đứng)", "冫 (Băng)", "刂 (Đao)", "力 (Lực)", "十 (Thập)", "卜 (Bốc)", "厂 (Hán)", "又 (Hựu)", "口 (Khẩu)", "囗 (Vi)"] },
        { strokes: "3 Nét", items: ["氵 (Thủy)", "忄 (Tâm đứng)", "扌 (Thủ)", "艹 (Thảo)", "辶 (Xước)", "宀 (Miên)", "女 (Nữ)", "子 (Tử)", "巾 (Cân)", "山 (Sơn)", "犭 (Khuyển)"] },
        { strokes: "4 Nét", items: ["木 (Mộc)", "欠 (Khiếm)", "止 (Chỉ)", "火 (Hỏa)", "爪 (Trảo)", "父 (Phụ)", "牛 (Ngưu)", "王 (Vương)", "日 (Nhật)", "月 (Nguyệt)", "心 (Tâm)"] },
        { strokes: "5 Nét+", items: ["目 (Mục)", "石 (Thạch)", "示 (Thị)", "禾 (Hòa)", "竹 (Trúc)", "米 (Mễ)", "糸 (Mịch)", "肉 (Nhục)", "舟 (Chu)", "言 (Ngôn)", "贝 (Bối)", "车 (Xa)", "走 (Tẩu)", "足 (Túc)", "身 (Thân)", "门 (Môn)", "雨 (Vũ)", "食 (Thực)", "鸟 (Điểu)"] }
      ];

      this.openModal(`
        <div class="p-6 md:p-8 space-y-5 max-w-2xl mx-auto">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-bold">
                <i data-lucide="puzzle" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white">Bảng Tra Cứu 214 Bộ Thủ Kinh Điển</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">Bấm vào bất kỳ bộ thủ nào để lọc các từ vựng tương ứng.</p>
              </div>
            </div>
            <button onclick="App.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            ${radicalsByStrokes
              .map(
                (group) => `
              <div class="space-y-2">
                <span class="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  ${group.strokes}:
                </span>
                <div class="flex flex-wrap gap-2">
                  ${group.items
                    .map((item) => {
                      const char = item.split(" ")[0];
                      return `
                      <button
                        onclick="App.closeModal(); App.handleDictSearch('${char}')"
                        class="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                      >
                        <span class="font-hanzi text-base text-teal-600 dark:text-teal-400">${char}</span>
                        <span class="text-[11px] text-slate-500">${item.split(" ")[1] || ""}</span>
                      </button>
                    `;
                    })
                    .join("")}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `);
      this.refreshIcons();
    },

    createHanziWriter(containerId, char) {
      const el = document.getElementById(containerId);
      if (!el || !window.HanziWriter) return;
      el.innerHTML = "";
      try {
        const isDark = document.documentElement.classList.contains("dark");
        const writer = HanziWriter.create(containerId, char, {
          width: 125,
          height: 125,
          padding: 8,
          showOutline: true,
          strokeAnimationSpeed: 1.2,
          delayBetweenStrokes: 140,
          strokeColor: isDark ? "#f87171" : "#dc2626",
          outlineColor: isDark ? "#475569" : "#cbd5e1",
          drawingColor: "#2563eb",
          highlightColor: "#eab308"
        });
        this.writers[containerId] = writer;
      } catch (e) {
        console.warn("HanziWriter init error for " + char, e);
      }
    },

    animateHanzi(containerId) {
      const writer = this.writers[containerId];
      if (writer) {
        writer.animateCharacter();
      }
    },

    quizHanzi(containerId, char) {
      const writer = this.writers[containerId];
      if (writer) {
        this.showToast(`Bắt đầu tập viết chữ "${char}": Hãy dùng chuột hoặc ngón tay vẽ theo từng nét trong ô nhé!`, "info");
        writer.quiz({
          onComplete: () => {
            this.showToast(`Xuất sắc! Bạn đã viết đúng toàn bộ nét của chữ "${char}"!`, "success");
          }
        });
      }
    },

    resetHanzi(containerId) {
      const writer = this.writers[containerId];
      if (writer) {
        writer.showOutline();
        writer.showCharacter();
      }
    },

    addCurrentToFlashcard(hanzi, pinyin, meaning, exampleZh = "", exampleVi = "") {
      window.StorageService.saveFlashcard({
        hanzi,
        pinyin,
        meaning,
        example: exampleZh || `用${hanzi}造一个句子。`,
        exampleVi: exampleVi || `Đặt câu với từ ${hanzi}.`,
        status: "learning"
      });
      window.StorageService.incrementStat("wordsLearnedToday", 1);
      this.updateHeaderProgress();
      this.showToast(`Đã thêm "${hanzi}" vào bộ Flashcard thành công!`, "success");
    },


    /* =====================================================================
       MODULE 3: EXAM PRACTICE (HANYU & HSK) + AI SPEAKING REFLEX (HSKK)
       ===================================================================== */
    renderExams(container) {
      container.innerHTML = `
        <div class="space-y-6 max-w-5xl mx-auto">
          <!-- Main Tab Switcher -->
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="graduation-cap" class="w-6 h-6 text-red-600"></i>
                Luyện Đề Thi & Phản Xạ Nói AI
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ôn luyện Giáo trình Hán Ngữ 6 quyển, Đề chuẩn HSK và phòng luyện nói phản xạ HSKK cùng Gemini AI.
              </p>
            </div>

            <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button id="examTabTests" class="px-4 py-2 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm flex items-center gap-1.5">
                <i data-lucide="file-text" class="w-4 h-4"></i> Đề Thi Trắc Nghiệm
              </button>
              <button id="examTabSpeaking" class="px-4 py-2 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1.5">
                <i data-lucide="mic" class="w-4 h-4 text-red-500"></i> Luyện Phản Xạ Nói (AI)
              </button>
            </div>
          </div>

          <!-- Sub-view 1: Exam Test Bank -->
          <div id="examTestsSubView" class="space-y-6">
            <!-- Filter Bar & AI Generate Button -->
            <div class="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-slate-400">Giáo trình:</span>
                <select id="examCurriculumFilter" class="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <option value="all">Tất cả đề thi</option>
                  <option value="hanyu">Giáo trình Hán Ngữ (6 Quyển)</option>
                  <option value="hsk">Giáo trình Chuẩn HSK (1 - 6)</option>
                </select>
              </div>

              <button id="examGenerateAiBtn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                Sinh đề thi mới bằng Gemini AI
              </button>
            </div>

            <!-- Exam List Cards -->
            <div id="examCardsGrid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Dynamically populated -->
            </div>

            <!-- Active Exam Session Container (Initially hidden) -->
            <div id="activeExamContainer" class="hidden"></div>
          </div>

          <!-- Sub-view 2: AI Speaking Reflex / HSKK -->
          <div id="examSpeakingSubView" class="hidden space-y-6">
            <!-- Dynamically populated -->
          </div>
        </div>
      `;

      // Bind Sub-tab switching
      const tabTestsBtn = document.getElementById("examTabTests");
      const tabSpeakingBtn = document.getElementById("examTabSpeaking");
      const subTests = document.getElementById("examTestsSubView");
      const subSpeaking = document.getElementById("examSpeakingSubView");

      tabTestsBtn.addEventListener("click", () => {
        tabTestsBtn.className = "px-4 py-2 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm flex items-center gap-1.5";
        tabSpeakingBtn.className = "px-4 py-2 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1.5";
        subTests.classList.remove("hidden");
        subSpeaking.classList.add("hidden");
      });

      tabSpeakingBtn.addEventListener("click", () => {
        tabSpeakingBtn.className = "px-4 py-2 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm flex items-center gap-1.5";
        tabTestsBtn.className = "px-4 py-2 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1.5";
        subTests.classList.add("hidden");
        subSpeaking.classList.remove("hidden");
        this.renderSpeakingSubView();
      });

      // Filter exams
      const curriculumSelect = document.getElementById("examCurriculumFilter");
      curriculumSelect.addEventListener("change", (e) => this.renderExamCards(e.target.value));

      // AI Generate Exam button
      document.getElementById("examGenerateAiBtn").addEventListener("click", () => this.openAiExamModal());

      // Initial render of exam cards
      this.renderExamCards("all");
    },

    renderExamCards(filter = "all") {
      const grid = document.getElementById("examCardsGrid");
      if (!grid) return;

      let exams = [];
      if (filter === "all" || filter === "hanyu") {
        exams = exams.concat(window.APP_DATA.examBank.hanyu.map((e) => ({ ...e, typeTag: "Hán Ngữ" })));
      }
      if (filter === "all" || filter === "hsk") {
        exams = exams.concat(window.APP_DATA.examBank.hsk.map((e) => ({ ...e, typeTag: "HSK Hanban" })));
      }

      grid.innerHTML = exams
        .map(
          (ex) => `
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-red-400 dark:hover:border-red-500 transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${ex.typeTag === "Hán Ngữ" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}">
                ${ex.level}
              </span>
              <span class="text-xs text-slate-400 flex items-center gap-1">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${ex.durationMinutes} phút
              </span>
            </div>
            <h3 class="font-bold text-base text-slate-800 dark:text-white mb-2">${ex.title}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Bao gồm ${ex.questions.length} câu hỏi trắc nghiệm (Nghe, Ngữ pháp, Đọc hiểu) có bấm giờ và giải thích chi tiết.
            </p>
          </div>
          <button onclick="App.startExamSession('${ex.id}')" class="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition">
            <i data-lucide="play" class="w-4 h-4 fill-white"></i> Bắt đầu làm bài thi
          </button>
        </div>
      `
        )
        .join("");

      this.refreshIcons();
    },

    startExamSession(examId) {
      let targetExam = window.APP_DATA.examBank.hanyu.find((e) => e.id === examId);
      if (!targetExam) {
        targetExam = window.APP_DATA.examBank.hsk.find((e) => e.id === examId);
      }
      if (!targetExam) {
        this.showToast("Không tìm thấy đề thi!", "error");
        return;
      }

      const activeContainer = document.getElementById("activeExamContainer");
      const cardsGrid = document.getElementById("examCardsGrid");
      if (!activeContainer || !cardsGrid) return;

      cardsGrid.classList.add("hidden");
      activeContainer.classList.remove("hidden");

      this.examState = {
        exam: targetExam,
        answers: {},
        timeRemainingSeconds: targetExam.durationMinutes * 60,
        timerInterval: null,
        isSubmitted: false
      };

      this.renderExamInterface();

      // Start countdown
      this.examState.timerInterval = setInterval(() => {
        if (this.examState.timeRemainingSeconds <= 0) {
          clearInterval(this.examState.timerInterval);
          this.submitExam();
          this.showToast("Hết giờ làm bài!", "warning");
        } else {
          this.examState.timeRemainingSeconds -= 1;
          const timerEl = document.getElementById("examTimerCount");
          if (timerEl) {
            const mins = Math.floor(this.examState.timeRemainingSeconds / 60);
            const secs = this.examState.timeRemainingSeconds % 60;
            timerEl.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
          }
        }
      }, 1000);
    },

    renderExamInterface() {
      const { exam, answers, isSubmitted } = this.examState;
      const activeContainer = document.getElementById("activeExamContainer");
      if (!activeContainer) return;

      const mins = Math.floor(this.examState.timeRemainingSeconds / 60);
      const secs = this.examState.timeRemainingSeconds % 60;
      const timeStr = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

      activeContainer.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-xl space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <span class="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">${exam.level}</span>
              <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${exam.title}</h3>
            </div>
            <div class="flex items-center gap-3">
              <div class="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 text-amber-700 dark:text-amber-400 font-mono font-bold text-sm flex items-center gap-1.5">
                <i data-lucide="clock" class="w-4 h-4"></i>
                <span id="examTimerCount">${timeStr}</span>
              </div>
              <button onclick="App.exitExamSession()" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200">
                Thoát bài thi
              </button>
            </div>
          </div>

          <!-- Question List -->
          <div class="space-y-6">
            ${exam.questions
              .map((q, idx) => {
                const userChoice = answers[q.id];
                const isCorrect = isSubmitted && userChoice === q.answer;
                const isWrong = isSubmitted && userChoice !== undefined && userChoice !== q.answer;

                return `
                <div class="p-5 rounded-2xl border ${isSubmitted ? (isCorrect ? "border-emerald-500 bg-emerald-50/20" : isWrong ? "border-red-500 bg-red-50/20" : "border-slate-200 dark:border-slate-700") : "border-slate-200 dark:border-slate-700"} bg-slate-50/50 dark:bg-slate-750 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Câu ${idx + 1} (${q.type === "listening" ? "Nghe" : q.type === "reading" ? "Đọc hiểu" : "Ngữ pháp"})
                    </span>
                    ${isSubmitted ? (isCorrect ? `<span class="text-xs font-bold text-emerald-600 flex items-center gap-1"><i data-lucide="check" class="w-4 h-4"></i> Chính xác</span>` : `<span class="text-xs font-bold text-red-600 flex items-center gap-1"><i data-lucide="x" class="w-4 h-4"></i> Sai</span>`) : ""}
                  </div>

                  ${q.audioText ? `
                    <div class="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs">
                      <button onclick="AudioService.speak('${q.audioText}')" class="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-bold flex items-center gap-1">
                        <i data-lucide="volume-2" class="w-4 h-4"></i> Nghe âm thanh
                      </button>
                      <span class="text-slate-500 italic">Bấm nút để nghe câu phát âm tiếng Trung</span>
                    </div>
                  ` : ""}

                  ${q.passage ? `
                    <div class="p-3.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-hanzi leading-relaxed text-slate-700 dark:text-slate-200">
                      ${q.passage}
                    </div>
                  ` : ""}

                  <p class="font-semibold text-sm text-slate-800 dark:text-white">
                    ${q.question}
                  </p>

                  <!-- Options -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    ${q.options
                      .map((opt, oIdx) => {
                        const isSelected = userChoice === oIdx;
                        let optStyle = "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200";

                        if (isSubmitted) {
                          if (oIdx === q.answer) optStyle = "bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold";
                          else if (isSelected && oIdx !== q.answer) optStyle = "bg-red-100 border-red-500 text-red-800 dark:bg-red-950 dark:text-red-300";
                        } else if (isSelected) {
                          optStyle = "bg-red-50 border-red-500 text-red-700 dark:bg-red-950/60 dark:text-red-300 font-bold shadow-sm";
                        }

                        return `
                        <button
                          type="button"
                          ${isSubmitted ? "disabled" : ""}
                          onclick="App.selectExamOption('${q.id}', ${oIdx})"
                          class="p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${optStyle}"
                        >
                          <span>${opt}</span>
                          ${isSelected ? `<i data-lucide="check" class="w-4 h-4 text-red-600 dark:text-red-400"></i>` : ""}
                        </button>
                      `;
                      })
                      .join("")}
                  </div>

                  ${isSubmitted ? `
                    <div class="mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <span class="font-bold text-slate-800 dark:text-white block mb-0.5">Giải thích đáp án:</span>
                      ${q.explanation}
                    </div>
                  ` : ""}
                </div>
              `;
              })
              .join("")}
          </div>

          <!-- Bottom Action Bar -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <span class="text-xs text-slate-500">
              Đã làm: ${Object.keys(answers).length} / ${exam.questions.length} câu
            </span>
            ${!isSubmitted ? `
              <button onclick="App.submitExam()" class="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
                <i data-lucide="send" class="w-4 h-4"></i> Nộp bài & Chấm điểm
              </button>
            ` : `
              <button onclick="App.exitExamSession()" class="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition flex items-center gap-2">
                <i data-lucide="check-circle" class="w-4 h-4"></i> Hoàn tất ôn tập
              </button>
            `}
          </div>
        </div>
      `;

      this.refreshIcons();
    },

    selectExamOption(questionId, optionIndex) {
      if (this.examState.isSubmitted) return;
      this.examState.answers[questionId] = optionIndex;
      this.renderExamInterface();
    },

    submitExam() {
      if (!this.examState) return;
      clearInterval(this.examState.timerInterval);
      this.examState.isSubmitted = true;

      const { exam, answers } = this.examState;
      let correctCount = 0;

      exam.questions.forEach((q) => {
        if (answers[q.id] === q.answer) {
          correctCount++;
        } else {
          // Push wrong question concepts to penalty box
          window.StorageService.addPenaltyWord({
            id: q.id,
            hanzi: q.options[q.answer] || "Sai ngữ pháp",
            pinyin: "kǎoshì",
            meaning: `Câu sai trong đề ${exam.level}: ${q.question}`,
            hsk: 3
          });
        }
      });

      const score = Math.round((correctCount / exam.questions.length) * 100);
      window.StorageService.incrementStat("quizzesCompletedToday", 1);
      window.StorageService.incrementStat("totalPoints", score);
      this.updateHeaderProgress();

      this.renderExamInterface();
      this.showToast(`Bạn đạt ${score}/100 điểm (${correctCount}/${exam.questions.length} câu đúng)!`, score >= 70 ? "success" : "warning");
    },

    exitExamSession() {
      if (this.examState?.timerInterval) clearInterval(this.examState.timerInterval);
      this.examState = null;
      const activeContainer = document.getElementById("activeExamContainer");
      const cardsGrid = document.getElementById("examCardsGrid");
      if (activeContainer) activeContainer.classList.add("hidden");
      if (cardsGrid) cardsGrid.classList.remove("hidden");
    },

    openAiExamModal() {
      const html = `
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="sparkles" class="w-5 h-5 text-amber-500"></i>
              Sinh Đề Thi Mới Bằng Gemini AI
            </h3>
            <button onclick="App.closeModal()" class="text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chọn giáo trình & cấp độ:</label>
              <select id="modalAiExamCurriculum" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white">
                <option value="Giáo trình Hán ngữ Quyển 2">Giáo trình Hán ngữ Quyển 2 (Sơ cấp)</option>
                <option value="Giáo trình Hán ngữ Quyển 4">Giáo trình Hán ngữ Quyển 4 (Trung cấp)</option>
                <option value="HSK 3 Hanban">Giáo trình Chuẩn HSK 3</option>
                <option value="HSK 4 Hanban">Giáo trình Chuẩn HSK 4</option>
                <option value="HSK 5 Hanban">Giáo trình Chuẩn HSK 5 (Nâng cao)</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Số lượng câu hỏi:</label>
              <input type="number" id="modalAiExamCount" value="3" min="2" max="6" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white" />
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <button onclick="App.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">Hủy</button>
            <button id="modalAiExamSubmitBtn" onclick="App.handleGenerateAiExam()" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5">
              <i data-lucide="cpu" class="w-4 h-4"></i> Tạo đề ngay
            </button>
          </div>
        </div>
      `;
      this.openModal(html);
    },

    async handleGenerateAiExam() {
      const curriculum = document.getElementById("modalAiExamCurriculum").value;
      const count = parseInt(document.getElementById("modalAiExamCount").value) || 3;
      const btn = document.getElementById("modalAiExamSubmitBtn");

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang biên soạn...`;
        this.refreshIcons();
      }

      try {
        const questions = await window.GeminiService.generateExamQuestionsAI(curriculum, curriculum, count);
        const newExam = {
          id: "ai_exam_" + Date.now(),
          title: `Đề thi AI: ${curriculum} (${count} câu)`,
          level: curriculum,
          durationMinutes: count * 4,
          questions: questions
        };

        window.APP_DATA.examBank.hsk.unshift(newExam);
        this.closeModal();
        this.showToast(`Đã sinh thành công đề thi ${curriculum}!`, "success");
        this.renderExamCards("all");
        this.startExamSession(newExam.id);
      } catch (err) {
        this.showToast(`Lỗi tạo đề AI: ${err.message}`, "error");
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i> Thử lại`;
          this.refreshIcons();
        }
      }
    },

    // Sub-view 2: Speaking Reflex / HSKK
    renderSpeakingSubView() {
      const container = document.getElementById("examSpeakingSubView");
      if (!container) return;

      const scenarios = window.APP_DATA.speakingScenarios;
      const current = this.speakingState?.currentScenario || scenarios[0];

      container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left: Scenarios List -->
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Chọn chủ đề phản xạ HSKK</span>
            ${scenarios
              .map(
                (sc) => `
              <div onclick="App.selectSpeakingScenario('${sc.id}')" class="p-4 rounded-2xl border ${sc.id === current.id ? "border-red-500 bg-red-50/40 dark:bg-red-950/40 shadow-sm" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"} cursor-pointer transition">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">${sc.level}</span>
                <h4 class="font-bold text-sm text-slate-800 dark:text-white mt-1.5 mb-1">${sc.title}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${sc.promptVi}</p>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Right: Interactive Speaking Room -->
          <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-md space-y-6">
            <!-- Scenario Prompt Card -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-750 dark:to-slate-700 border border-amber-200 dark:border-slate-600">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <i data-lucide="help-circle" class="w-4 h-4"></i> Đề bài khảo sát khẩu ngữ
                </span>
                <button onclick="AudioService.speak('${current.promptZh}')" class="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline">
                  <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe câu hỏi
                </button>
              </div>
              <div class="font-hanzi font-bold text-lg text-slate-900 dark:text-white mb-1">
                ${current.promptZh}
              </div>
              <div class="text-xs text-amber-800 dark:text-amber-300 font-mono mb-2">
                ${current.promptPinyin}
              </div>
              <div class="text-xs text-slate-600 dark:text-slate-300 italic mb-3">
                ${current.promptVi}
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span class="text-[11px] text-slate-400 mr-1">Gợi ý từ:</span>
                ${current.hints.map((h) => `<span class="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[11px] font-hanzi text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">${h}</span>`).join("")}
              </div>
            </div>

            <!-- Voice Recording Station -->
            <div class="text-center py-4 space-y-4">
              <div class="flex items-center justify-center">
                <button
                  id="speakingMicBtn"
                  onclick="App.toggleSpeakingRecord()"
                  class="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl shadow-red-500/30 transition transform active:scale-95"
                >
                  <i data-lucide="mic" class="w-8 h-8" id="speakingMicIcon"></i>
                </button>
              </div>
              <p id="speakingStatusText" class="text-xs font-medium text-slate-500 dark:text-slate-400">
                Bấm vào Micro và nói tiếng Trung để AI phân tích
              </p>
            </div>

            <!-- Speech Transcript Input/Edit -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Câu trả lời của bạn (Văn bản ghi nhận từ giọng nói):
                </label>
                <span class="text-[11px] text-slate-400">Có thể chỉnh sửa nếu nhận diện chưa đúng</span>
              </div>
              <textarea
                id="speakingTranscriptText"
                rows="3"
                placeholder="Câu nói tiếng Trung của bạn sẽ hiển thị ở đây..."
                class="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-hanzi text-sm focus:outline-none focus:border-red-500"
              ></textarea>
            </div>

            <!-- Send to AI button -->
            <button
              id="speakingEvaluateBtn"
              onclick="App.evaluateSpeakingWithAi()"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
            >
              <i data-lucide="cpu" class="w-4 h-4"></i>
              Gửi cho Gemini AI Đánh Giá & Phản Hồi Đối Thoại
            </button>

            <!-- AI Evaluation Result Container -->
            <div id="speakingAiFeedbackContainer" class="hidden"></div>
          </div>
        </div>
      `;

      this.speakingState = {
        currentScenario: current,
        isRecording: false
      };
      this.refreshIcons();
    },

    selectSpeakingScenario(scId) {
      const sc = window.APP_DATA.speakingScenarios.find((s) => s.id === scId);
      if (sc) {
        if (!this.speakingState) this.speakingState = {};
        this.speakingState.currentScenario = sc;
        this.renderSpeakingSubView();
      }
    },

    toggleSpeakingRecord() {
      const micBtn = document.getElementById("speakingMicBtn");
      const statusText = document.getElementById("speakingStatusText");
      const transcriptBox = document.getElementById("speakingTranscriptText");

      if (window.AudioService.isRecording) {
        // Stop
        window.AudioService.stopListening();
        micBtn.classList.remove("recording-pulse", "bg-emerald-600");
        micBtn.classList.add("bg-red-600");
        statusText.textContent = "Đã dừng ghi âm. Bạn có thể bấm gửi cho AI.";
        return;
      }

      // Start
      const success = window.AudioService.startListening({
        onStart: () => {
          micBtn.classList.add("recording-pulse", "bg-emerald-600");
          micBtn.classList.remove("bg-red-600");
          statusText.textContent = "🎙️ Đang lắng nghe bạn nói tiếng Trung (zh-CN)...";
        },
        onResult: ({ final, interim }) => {
          transcriptBox.value = final || interim;
        },
        onError: (err) => {
          micBtn.classList.remove("recording-pulse", "bg-emerald-600");
          micBtn.classList.add("bg-red-600");
          statusText.textContent = "Lỗi nhận diện âm thanh: " + err;
          this.showToast("Không thể nhận diện mic: " + err, "warning");
        },
        onEnd: () => {
          micBtn.classList.remove("recording-pulse", "bg-emerald-600");
          micBtn.classList.add("bg-red-600");
          statusText.textContent = "Đã dừng thu âm. Hãy kiểm tra lại văn bản.";
        }
      });

      if (!success) {
        statusText.textContent = "Trình duyệt chưa cấp quyền Micro. Bạn có thể gõ văn bản trực tiếp.";
      }
    },

    async evaluateSpeakingWithAi() {
      const transcript = document.getElementById("speakingTranscriptText")?.value?.trim();
      const feedbackContainer = document.getElementById("speakingAiFeedbackContainer");
      const btn = document.getElementById("speakingEvaluateBtn");

      if (!transcript) {
        this.showToast("Vui lòng ghi âm hoặc gõ câu trả lời tiếng Trung!", "warning");
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Giám khảo AI đang chấm điểm...`;
        this.refreshIcons();
      }

      try {
        const result = await window.GeminiService.evaluateSpeakingAI(this.speakingState.currentScenario, transcript);
        feedbackContainer.classList.remove("hidden");
        feedbackContainer.innerHTML = `
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-600 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-600 pb-3">
              <span class="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                <i data-lucide="award" class="w-5 h-5 text-amber-500"></i> Kết Quả Chấm Điểm Khẩu Ngữ
              </span>
              <span class="text-xl font-extrabold text-red-600 dark:text-red-400">
                ${result.score}/10 Điểm
              </span>
            </div>

            <!-- Fluency comment -->
            <div class="text-xs space-y-1">
              <span class="font-bold text-slate-700 dark:text-slate-300">Nhận xét chi tiết:</span>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${result.fluencyComment}</p>
            </div>

            <!-- Grammar correction -->
            <div class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs">
              <span class="font-bold text-red-700 dark:text-red-400 block mb-1">Câu sửa chuẩn ngữ pháp:</span>
              <div class="font-hanzi text-sm text-slate-800 dark:text-white font-semibold">${result.grammarCorrection}</div>
            </div>

            <!-- Natural native expression -->
            <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs">
              <span class="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Cách nói tự nhiên như người bản xứ:</span>
              <div class="font-hanzi text-sm text-slate-800 dark:text-white font-semibold">${result.naturalSuggestion}</div>
            </div>

            <!-- AI Reflex dialogue response -->
            <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <i data-lucide="message-square" class="w-4 h-4"></i> Phản xạ đối thoại từ AI:
                </span>
                <button onclick="AudioService.speak('${result.aiReplyZh}')" class="px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-white font-bold text-[11px] flex items-center gap-1">
                  <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe AI nói
                </button>
              </div>
              <div class="font-hanzi text-sm text-slate-800 dark:text-white font-medium">${result.aiReplyZh}</div>
              <div class="text-slate-500 italic">${result.aiReplyVi}</div>
            </div>
          </div>
        `;

        // Automatically speak AI reply
        if (result.aiReplyZh) {
          window.AudioService.speak(result.aiReplyZh);
        }

        this.showToast("AI đã hoàn thành đánh giá khẩu ngữ!", "success");
      } catch (err) {
        this.showToast(`Lỗi đánh giá AI: ${err.message}`, "error");
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i> Gửi cho Gemini AI Đánh Giá & Phản Hồi Đối Thoại`;
          this.refreshIcons();
        }
      }
    },

    /* =====================================================================
       MODULE 4: CHENGYU & PROVERBS (WITH FABLES & AI GENERATOR)
       ===================================================================== */
    chengyuCategoryFilter: "chengyu",
    chengyuSearchQuery: "",

    renderChengyu(container) {
      this.chengyuCategoryFilter = this.chengyuCategoryFilter || "chengyu";
      this.chengyuSearchQuery = this.chengyuSearchQuery || "";

      const allCount = (window.APP_DATA.chengyuList || []).length;
      const cyCount = (window.APP_DATA.chengyuList || []).filter((c) => c.category === "chengyu" || !c.category).length;
      const pvCount = (window.APP_DATA.chengyuList || []).filter((c) => c.category === "proverb").length;

      let bannerHtml = "";
      if (this.chengyuCategoryFilter === "chengyu") {
        bannerHtml = `
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-900/90 via-amber-900/80 to-slate-900 text-white p-6 md:p-8 shadow-lg border border-red-500/20">
            <div class="relative z-10 max-w-3xl space-y-2">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-amber-300 text-xs font-bold tracking-wide">
                <i data-lucide="scroll" class="w-3.5 h-3.5"></i>
                KHO TÀNG THÀNH NGỮ ĐIỂN TÍCH (成语)
              </div>
              <h3 class="text-2xl md:text-3xl font-extrabold font-hanzi-serif tracking-wide text-white">
                🐉 Thành Ngữ Điển Tích 4 Chữ Kinh Điển
              </h3>
              <p class="text-xs md:text-sm text-slate-200 leading-relaxed">
                Thành ngữ (成语) là tinh hoa 4 chữ đúc kết từ thi thư, sử ký Xuân Thu - Chiến Quốc, Tam Quốc và các danh tác ngàn năm. Mỗi câu là một điển tích hàm súc, giúp bạn nói và viết tiếng Trung uyên bác, tự nhiên như người bản xứ.
              </p>
              <div class="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-amber-200">
                <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"><i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i> ${cyCount} câu tinh tuyển</span>
                <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"><i data-lucide="book-open" class="w-3.5 h-3.5 text-amber-400"></i> Cốt truyện điển tích chi tiết</span>
                <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"><i data-lucide="volume-2" class="w-3.5 h-3.5 text-amber-400"></i> Phát âm chuẩn Web Speech</span>
              </div>
            </div>
          </div>
        `;
      } else if (this.chengyuCategoryFilter === "proverb") {
        bannerHtml = `
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900/90 to-slate-900 text-white p-6 md:p-8 shadow-lg border border-emerald-500/20">
            <div class="relative z-10 max-w-3xl space-y-2">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
                <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
                KHO TÀNG CA DAO & TỤC NGỮ (俗语・谚语)
              </div>
              <h3 class="text-2xl md:text-3xl font-extrabold font-hanzi-serif tracking-wide text-white">
                🏮 Ca Dao & Tục Ngữ Nhân Sinh Trung Hoa
              </h3>
              <p class="text-xs md:text-sm text-slate-200 leading-relaxed">
                Tục ngữ (谚语) và Quán dụng ngữ (俗语) là kết tinh kinh nghiệm dân gian, bài học đối nhân xử thế, luật nhân quả và triết lý sống bình dị mà thâm sâu ngàn đời. Giúp bạn thấu hiểu nhân tình thế thái và giao tiếp giàu chiều sâu văn hóa.
              </p>
              <div class="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-emerald-200">
                <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i> ${pvCount} câu ngạn ngữ thâm thúy</span>
                <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"><i data-lucide="lightbulb" class="w-3.5 h-3.5 text-emerald-400"></i> Nghĩa đen & Nghĩa bóng rõ ràng</span>
                <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"><i data-lucide="message-square" class="w-3.5 h-3.5 text-emerald-400"></i> Ứng dụng giao tiếp đời thường</span>
              </div>
            </div>
          </div>
        `;
      } else {
        bannerHtml = `
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-900 via-purple-950 to-slate-900 text-white p-6 md:p-8 shadow-lg border border-purple-500/20">
            <div class="relative z-10 max-w-3xl space-y-2">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold tracking-wide">
                <i data-lucide="library" class="w-3.5 h-3.5"></i>
                ĐẠI KHO TÀNG VĂN HÓA TRUNG HOA TOÀN TẬP
              </div>
              <h3 class="text-2xl md:text-3xl font-extrabold font-hanzi-serif tracking-wide text-white">
                📚 Thành Ngữ & Ca Dao Tục Ngữ Toàn Tập
              </h3>
              <p class="text-xs md:text-sm text-slate-200 leading-relaxed">
                Khám phá trọn vẹn hơn ${allCount} câu thành ngữ 4 chữ và ca dao tục ngữ kinh điển, đầy đủ chữ Hán, Pinyin, phân tích nghĩa đen nghĩa bóng, nguồn gốc điển tích và hội thoại ví dụ thực tế.
              </p>
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="space-y-6 max-w-5xl mx-auto">
          <!-- Top Action Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="scroll" class="w-6 h-6 text-red-600"></i>
                Kho Tàng Thành Ngữ & Ca Dao Tục Ngữ
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Phân chia rõ ràng thành 2 phân hệ chuyên sâu: Thành Ngữ Điển Tích 4 chữ & Ca Dao Tục Ngữ Nhân Sinh.
              </p>
            </div>

            <button id="chengyuAiGenBtn" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
              Tạo câu mới bằng Gemini AI
            </button>
          </div>

          <!-- Dynamic Thematic Banner -->
          ${bannerHtml}

          <!-- Filter & Search Controls -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <!-- Filter Tabs (Separated Clear Categories) -->
              <div class="flex flex-wrap gap-2 text-xs font-semibold" id="chengyuTabs">
                <button onclick="App.setChengyuFilter('chengyu')" class="px-4 py-2 rounded-xl transition flex items-center gap-2 ${this.chengyuCategoryFilter === 'chengyu' ? 'bg-red-600 text-white shadow-md font-bold' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}">
                  <span>🐉 Thành Ngữ 4 Chữ Điển Tích</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] ${this.chengyuCategoryFilter === 'chengyu' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300'}">${cyCount}</span>
                </button>
                <button onclick="App.setChengyuFilter('proverb')" class="px-4 py-2 rounded-xl transition flex items-center gap-2 ${this.chengyuCategoryFilter === 'proverb' ? 'bg-emerald-600 text-white shadow-md font-bold' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}">
                  <span>🏮 Ca Dao & Tục Ngữ Nhân Sinh</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] ${this.chengyuCategoryFilter === 'proverb' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300'}">${pvCount}</span>
                </button>
                <button onclick="App.setChengyuFilter('all')" class="px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${this.chengyuCategoryFilter === 'all' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-sm font-bold' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}">
                  <span>✨ Tất Cả (${allCount})</span>
                </button>
              </div>

              <!-- Search Bar -->
              <div class="relative w-full sm:w-72">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
                <input
                  type="text"
                  id="chengyuSearchInput"
                  value="${this.chengyuSearchQuery || ''}"
                  placeholder="Tìm chữ Hán, Pinyin, nghĩa..."
                  class="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Chengyu Cards Grid -->
          <div id="chengyuGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Dynamic Content -->
          </div>
        </div>
      `;

      document.getElementById("chengyuAiGenBtn").addEventListener("click", () => this.openAiChengyuModal());

      const searchInput = document.getElementById("chengyuSearchInput");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.chengyuSearchQuery = e.target.value.trim().toLowerCase();
          this.filterAndRenderChengyu();
        });
      }

      this.filterAndRenderChengyu();
    },

    setChengyuFilter(cat) {
      this.chengyuCategoryFilter = cat;
      if (cat === "chengyu") {
        window.location.hash = "#chengyu";
      } else if (cat === "proverb") {
        window.location.hash = "#proverbs";
      }
      const container = document.getElementById("viewContainer");
      if (container) this.renderChengyu(container);
    },

    filterAndRenderChengyu() {
      const grid = document.getElementById("chengyuGrid");
      if (!grid) return;

      const list = window.APP_DATA.chengyuList || [];
      const query = (this.chengyuSearchQuery || "").toLowerCase();
      const cat = this.chengyuCategoryFilter || "all";

      const filtered = list.filter((item) => {
        // category match
        if (cat === "chengyu" && item.category === "proverb") return false;
        if (cat === "proverb" && item.category !== "proverb") return false;

        // search query match
        if (query) {
          const matchHanzi = (item.hanzi || "").toLowerCase().includes(query);
          const matchPinyin = (item.pinyin || "").toLowerCase().includes(query);
          const matchLiteral = (item.literal || "").toLowerCase().includes(query);
          const matchFigurative = (item.figurative || "").toLowerCase().includes(query);
          const matchStory = (item.story || "").toLowerCase().includes(query);
          const matchTags = (item.tags || []).some((t) => t.toLowerCase().includes(query));
          return matchHanzi || matchPinyin || matchLiteral || matchFigurative || matchStory || matchTags;
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <i data-lucide="search-x" class="w-12 h-12 text-slate-400 mx-auto mb-3"></i>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200">Không tìm thấy câu thành ngữ / ca dao tục ngữ phù hợp</h4>
            <p class="text-xs text-slate-500 mt-1">Hãy thử tìm từ khóa khác hoặc bấm "Tạo câu mới bằng Gemini AI" ở trên!</p>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map((item) => this.renderChengyuCard(item)).join("");
      }

      this.refreshIcons();
    },

    renderChengyuCard(item) {
      const isProverb = item.category === "proverb";
      const tagsHtml = (item.tags || [])
        .map((t) => `<span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300">${t}</span>`)
        .join("");

      const categoryBadge = isProverb
        ? `<span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-700/90 text-white backdrop-blur-md shadow flex items-center gap-1"><i data-lucide="book-open" class="w-3 h-3"></i> TỤC NGỮ・CA DAO</span>`
        : `<span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-700/90 text-white backdrop-blur-md shadow flex items-center gap-1"><i data-lucide="scroll" class="w-3 h-3"></i> THÀNH NGỮ 4 CHỮ</span>`;

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <!-- Header with illustration -->
            <div class="relative h-48 bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <img
                src="${item.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"}"
                alt="${item.hanzi}"
                class="w-full h-full object-cover"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 flex flex-col justify-between p-4">
                <div class="flex items-center justify-between">
                  ${categoryBadge}
                  <button onclick="AudioService.speak('${item.hanzi}')" class="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-amber-300 flex items-center justify-center backdrop-blur-sm transition shadow hover:scale-110" title="Nghe phát âm chuẩn">
                    <i data-lucide="volume-2" class="w-4 h-4"></i>
                  </button>
                </div>
                <div>
                  <h3 class="font-hanzi-serif font-black text-2xl md:text-3xl text-white tracking-wide">
                    ${item.hanzi}
                  </h3>
                  <p class="text-amber-300 font-mono text-xs font-semibold mt-1">
                    ${item.pinyin}
                  </p>
                </div>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-5 md:p-6 space-y-4">
              <!-- Meaning -->
              <div class="space-y-1.5 bg-slate-50 dark:bg-slate-750/70 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/80">
                <div class="text-xs font-bold text-slate-800 dark:text-slate-100">
                  <span class="${isProverb ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} font-extrabold">Nghĩa đen:</span> ${item.literal}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span class="font-bold text-amber-600 dark:text-amber-400">Nghĩa bóng & Triết lý:</span> ${item.figurative}
                </div>
              </div>

              <!-- Fable / Story -->
              <div class="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs">
                <span class="font-bold text-amber-900 dark:text-amber-300 block mb-1 flex items-center gap-1.5">
                  <i data-lucide="book" class="w-3.5 h-3.5 text-amber-600"></i> ${isProverb ? "Nguồn gốc & Hoàn cảnh ra đời:" : "Cốt truyện & Điển tích lịch sử:"}
                </span>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  ${item.story}
                </p>
              </div>

              <!-- Communication Example -->
              ${item.example ? `
                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <i data-lucide="message-circle" class="w-3.5 h-3.5 text-indigo-500"></i> Ví dụ giao tiếp:
                    </span>
                    <button onclick="AudioService.speak('${item.example.zh}')" class="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold text-[11px]">
                      <i data-lucide="volume-2" class="w-3 h-3"></i> Nghe câu
                    </button>
                  </div>
                  <div class="font-hanzi font-semibold text-slate-900 dark:text-white mb-0.5 text-sm">${item.example.zh}</div>
                  <div class="text-amber-600 dark:text-amber-400 font-mono text-[11px] mb-0.5">${item.example.pinyin || ""}</div>
                  <div class="text-slate-500 dark:text-slate-400 text-[11px]">${item.example.vi}</div>
                </div>
              ` : ""}

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${tagsHtml}
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-5 md:px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <button onclick="AudioService.speak('${item.hanzi}')" class="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 flex items-center gap-1.5">
              <i data-lucide="volume-2" class="w-4 h-4 text-red-500"></i> ${isProverb ? "Phát âm câu tục ngữ" : "Phát âm thành ngữ"}
            </button>
            <button onclick="App.markChengyuLearned('${item.hanzi}')" class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/50 font-bold text-xs flex items-center gap-1.5 transition">
              <i data-lucide="check" class="w-3.5 h-3.5"></i> Đã thuộc câu này
            </button>
          </div>
        </div>
      `;
    },

    markChengyuLearned(hanzi) {
      window.StorageService.incrementStat("chengyuLearnedToday", 1);
      this.updateHeaderProgress();
      this.showToast(`Tuyệt vời! Bạn đã tích lũy thêm câu "${hanzi}"!`, "success");
    },

    openAiChengyuModal() {
      const isProverb = this.chengyuCategoryFilter === "proverb";
      const html = `
        <div class="p-6 space-y-4 max-w-lg">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="sparkles" class="w-5 h-5 text-amber-500"></i>
              Tạo Thành Ngữ / Ca Dao Tục Ngữ Mới Bằng AI
            </h3>
            <button onclick="App.closeModal()" class="text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-2">Chọn thể loại muốn tạo:</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <input type="radio" name="aiChengyuType" value="chengyu" ${!isProverb ? "checked" : ""} class="text-red-600" />
                  <span class="font-semibold text-slate-800 dark:text-slate-200">🐉 Thành ngữ 4 chữ (成语)</span>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <input type="radio" name="aiChengyuType" value="proverb" ${isProverb ? "checked" : ""} class="text-emerald-600" />
                  <span class="font-semibold text-slate-800 dark:text-slate-200">🏮 Ca dao & Tục ngữ (俗语)</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nhập chủ đề bạn quan tâm (Ví dụ: Kiên trì, Lòng hiếu thảo, Tình bạn, Sự nghiệp, Trí tuệ):</label>
              <input
                type="text"
                id="modalChengyuThemeInput"
                placeholder="VD: Ý chí vượt khó, lòng hiếu thuận..."
                class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <button onclick="App.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">Hủy</button>
            <button id="modalChengyuSubmitBtn" onclick="App.handleGenerateAiChengyu()" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition">
              <i data-lucide="cpu" class="w-4 h-4"></i> Bắt đầu tạo bằng AI
            </button>
          </div>
        </div>
      `;
      this.openModal(html);
    },

    async handleGenerateAiChengyu() {
      const theme = document.getElementById("modalChengyuThemeInput").value.trim() || "Kiên trì và nỗ lực";
      const selectedTypeEl = document.querySelector('input[name="aiChengyuType"]:checked');
      const category = selectedTypeEl ? selectedTypeEl.value : "chengyu";
      const btn = document.getElementById("modalChengyuSubmitBtn");

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang tra cứu điển tích văn học...`;
        this.refreshIcons();
      }

      try {
        const item = await window.GeminiService.generateChengyuAI(theme, category);
        item.id = (category === "proverb" ? "pv_ai_" : "cy_ai_") + Date.now();
        item.category = category;
        item.image = category === "proverb"
          ? "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
          : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80";
        window.APP_DATA.chengyuList.unshift(item);

        this.closeModal();
        this.showToast(`Đã thêm thành công câu "${item.hanzi}"!`, "success");
        this.filterAndRenderChengyu();
      } catch (err) {
        this.showToast(`Lỗi tạo bằng AI: ${err.message}`, "error");
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i> Thử lại`;
          this.refreshIcons();
        }
      }
    },

    /* =====================================================================
       MODULE 5: GAMES & SPACED REPETITION PENALTY BOX
       (Categorized Decks: HSK 1 - 6, Business Chinese & Custom Flashcards)
       ===================================================================== */
    selectedGameDeck: "hsk1",
    selectedGameMode: "speed",

    getDeckWords(deckKey = this.selectedGameDeck || "hsk1") {
      const vocab = window.APP_DATA.vocabList || [];
      switch (deckKey) {
        case "hsk1":
          return vocab.filter((w) => w.hsk === 1);
        case "hsk2":
          return vocab.filter((w) => w.hsk === 2);
        case "hsk3":
          return vocab.filter((w) => w.hsk === 3);
        case "hsk4":
          return vocab.filter((w) => w.hsk === 4);
        case "hsk5":
          return vocab.filter((w) => w.hsk === 5);
        case "hsk6":
          return vocab.filter((w) => w.hsk === 6);
        case "business":
          return vocab.filter((w) => w.category === "business" || w.hsk === "Thương Mại" || w.deck === "business");
        case "custom": {
          const cards = window.StorageService ? window.StorageService.getFlashcards() : [];
          return cards.map((c) => ({
            id: c.id,
            hanzi: c.hanzi,
            pinyin: c.pinyin,
            meaning: c.meaning,
            example: {
              zh: c.example || c.hanzi,
              vi: c.exampleVi || c.meaning
            },
            hsk: c.hsk || "Tự tạo",
            category: "custom"
          }));
        }
        case "penalty":
          return this.penaltyWords || [];
        default:
          return vocab.filter((w) => w.hsk === 1);
      }
    },

    getDeckDefinition(deckKey = this.selectedGameDeck || "hsk1") {
      const defs = {
        hsk1: { id: "hsk1", label: "HSK 1 (Sơ cấp 1)", shortLabel: "HSK 1", icon: "sparkles", desc: "150 từ vựng nền tảng, chào hỏi và sinh hoạt cơ bản." },
        hsk2: { id: "hsk2", label: "HSK 2 (Sơ cấp 2)", shortLabel: "HSK 2", icon: "book-open", desc: "150 từ vựng mở rộng (tích lũy 300 từ chuẩn HSK 2), du lịch, mua sắm và thể thao." },
        hsk3: { id: "hsk3", label: "HSK 3 (Trung cấp sơ)", shortLabel: "HSK 3", icon: "award", desc: "100 từ vựng cốt lõi đàm thoại, môi trường và giải quyết vấn đề." },
        hsk4: { id: "hsk4", label: "HSK 4 (Trung cấp)", shortLabel: "HSK 4", icon: "flame", desc: "61 từ vựng thảo luận, kinh nghiệm và thái độ sống." },
        hsk5: { id: "hsk5", label: "HSK 5 (Cao cấp)", shortLabel: "HSK 5", icon: "trending-up", desc: "50 từ vựng chuyên sâu, triết lý, đọc báo và phân tích." },
        hsk6: { id: "hsk6", label: "HSK 6 (Thành thạo)", shortLabel: "HSK 6", icon: "crown", desc: "40 từ vựng học thuật, thành ngữ cổ và văn phong đĩnh đạc." },
        business: { id: "business", label: "💼 Tiếng Trung Thương Mại", shortLabel: "💼 Thương Mại", icon: "briefcase", desc: "40 từ vựng chuyên ngành: Hợp đồng, đàm phán, thư tín dụng L/C, tỷ giá, xuất nhập khẩu, chuỗi cung ứng." },
        custom: { id: "custom", label: "⭐ Flashcard Tự Tạo Của Tôi", shortLabel: "⭐ Tự Tạo", icon: "layers", desc: "Toàn bộ thẻ từ vựng do bạn tự thêm hoặc dùng AI quét ảnh trang sách giáo trình." }
      };
      return defs[deckKey] || defs.hsk1;
    },

    selectGameDeck(deckKey) {
      this.selectedGameDeck = deckKey;
      const container = document.getElementById("viewContainer");
      if (container) {
        this.renderGames(container);
        this.showToast(`Đã chuyển sang bộ từ vựng: ${this.getDeckDefinition(deckKey).shortLabel}`, "info");
        setTimeout(() => {
          document.getElementById("gameModeSelectorBar")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    },

    setDeckFilter(category) {
      this.deckFilterCategory = category;
      const container = document.getElementById("viewContainer");
      if (container) {
        this.renderGames(container);
      }
    },

    toggleDeckBookmark(deckId) {
      this.deckBookmarks = this.deckBookmarks || [];
      if (this.deckBookmarks.includes(deckId)) {
        this.deckBookmarks = this.deckBookmarks.filter((id) => id !== deckId);
        this.showToast(`Đã bỏ lưu ${this.getDeckDefinition(deckId).shortLabel}`, "info");
      } else {
        this.deckBookmarks.push(deckId);
        this.showToast(`Đã lưu ${this.getDeckDefinition(deckId).shortLabel} vào danh sách yêu thích!`, "success");
      }
      const container = document.getElementById("viewContainer");
      if (container) this.renderGames(container);
    },

    playGameWithCustomDeck() {
      this.selectedGameDeck = "custom";
      this.selectedGameMode = "speed";
      window.location.hash = "#games";
    },

    renderGames(container) {
      if (!this.selectedGameDeck) {
        this.selectedGameDeck = "hsk1";
      }
      this.selectedGameMode = this.selectedGameMode || "speed";
      this.penaltyWords = window.StorageService.getPenaltyWords();
      this.deckFilterCategory = this.deckFilterCategory || "all";
      this.deckBookmarks = this.deckBookmarks || [];

      const activeDeckDef = this.getDeckDefinition(this.selectedGameDeck);
      const activeWords = this.getDeckWords(this.selectedGameDeck);

      // Full showcase list of decks formatted identically to modern Chinese educational portal
      const allDecks = [
        {
          id: "hsk1",
          category: "hsk",
          title: "Trình Độ HSK 1 - Cơ Bản",
          subtitle: "Tiếng Trung Trình Độ HSK 1",
          levelTag: "HSK1 - Cơ bản",
          categoryLabel: "Trình Độ",
          count: this.getDeckWords("hsk1").length,
          image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
          desc: "150 từ vựng nền tảng, đại từ xưng hô, chào hỏi và sinh hoạt cơ bản nhất.",
          sampleChips: ["一", "在", "有", "个", "爱", "好"]
        },
        {
          id: "hsk2",
          category: "hsk",
          title: "Trình Độ HSK 2 - Sơ Cấp",
          subtitle: "Tiếng Trung Trình Độ HSK 2",
          levelTag: "HSK2 - Sơ cấp",
          categoryLabel: "Trình Độ",
          count: this.getDeckWords("hsk2").length,
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80",
          desc: "150 từ vựng mở rộng tích lũy 300 từ chuẩn: Du lịch, mua sắm, thời gian & vận động.",
          sampleChips: ["为", "以", "时", "要是", "两", "旅游"]
        },
        {
          id: "hsk3",
          category: "hsk",
          title: "Trình Độ HSK 3 - Trung Cấp Thấp",
          subtitle: "Tiếng Trung Trình Độ HSK 3",
          levelTag: "HSK3 - Trung cấp",
          categoryLabel: "Trình Độ",
          count: this.getDeckWords("hsk3").length,
          image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80",
          desc: "100 từ vựng cốt lõi: Đàm thoại đời sống, giải quyết tình huống và môi trường.",
          sampleChips: ["地", "应该", "假", "羊肉", "环境", "决定"]
        },
        {
          id: "hsk4",
          category: "hsk",
          title: "Trình Độ HSK 4 - Trung Cấp",
          subtitle: "Tiếng Trung Trình Độ HSK 4",
          levelTag: "HSK4 - Trung cấp 2",
          categoryLabel: "Trình Độ",
          count: this.getDeckWords("hsk4").length,
          image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=80",
          desc: "61 từ vựng giao tiếp tự tin, thảo luận phong phú, phỏng vấn và công sở.",
          sampleChips: ["经历", "态度", "坚持", "积累", "成功", "丰富"]
        },
        {
          id: "hsk5",
          category: "hsk",
          title: "Trình Độ HSK 5 - Cao Cấp",
          subtitle: "Tiếng Trung Trình Độ HSK 5",
          levelTag: "HSK5 - Cao cấp",
          categoryLabel: "Trình Độ",
          count: this.getDeckWords("hsk5").length,
          image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80",
          desc: "50 từ vựng chuyên sâu: Đọc hiểu báo chí, nghị luận xã hội và phân tích văn bản.",
          sampleChips: ["投资", "效率", "趋势", "逻辑", "哲学", "掌握"]
        },
        {
          id: "hsk6",
          category: "hsk",
          title: "Trình Độ HSK 6 - Thành Thạo",
          subtitle: "Tiếng Trung Trình Độ HSK 6",
          levelTag: "HSK6 - Tinh hoa",
          categoryLabel: "Trình Độ",
          count: this.getDeckWords("hsk6").length,
          image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=700&q=80",
          desc: "40 từ vựng đỉnh cao học thuật, thành ngữ cổ và văn phong bác học chuẩn mực.",
          sampleChips: ["潜移默化", "渊博", "精益求精", "络绎不绝"]
        },
        {
          id: "business",
          category: "business",
          title: "Tiếng Trung Thương Mại - Giao Dịch",
          subtitle: "Hợp Đồng, Thanh Toán L/C, Incoterms",
          levelTag: "Thương Mại Quốc Tế",
          categoryLabel: "Chuyên Ngành",
          count: this.getDeckWords("business").length,
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
          desc: "40 từ vựng đàm phán, thư tín dụng L/C, tỷ giá, xuất nhập khẩu và chuỗi cung ứng.",
          sampleChips: ["合同", "报价", "汇率", "信用证", "FOB", "供应链"]
        },
        {
          id: "custom",
          category: "custom",
          title: "Flashcard Tự Tạo Của Tôi",
          subtitle: "Bộ Thẻ Cá Nhân & AI Vision OCR",
          levelTag: "Spaced Repetition",
          categoryLabel: "Cá Nhân",
          count: this.getDeckWords("custom").length,
          image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=80",
          desc: "Toàn bộ thẻ từ vựng do bạn tự thêm hoặc dùng Gemini AI quét trực tiếp từ trang sách giáo trình.",
          sampleChips: ["坚持不懈", "温故知新", "千里之行"]
        }
      ];

      // Filter decks based on active category
      const filteredDecks = allDecks.filter((d) => {
        if (!this.deckFilterCategory || this.deckFilterCategory === "all") return true;
        if (this.deckFilterCategory === "hsk") return d.category === "hsk";
        if (this.deckFilterCategory === "business") return d.category === "business";
        if (this.deckFilterCategory === "custom") return d.category === "custom";
        return true;
      });

      container.innerHTML = `
        <div class="space-y-8 max-w-5xl mx-auto">
          
          <!-- ========================================== -->
          <!-- 1. BỘ TỪ VỰNG HỌC TIẾNG TRUNG (CARD GRID) -->
          <!-- ========================================== -->
          <div class="space-y-5">
            <!-- Header Row -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <h2 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold text-base shadow-sm">
                    <i data-lucide="book-marked" class="w-5 h-5"></i>
                  </span>
                  Bộ từ vựng Học Tiếng Trung
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Chọn một bộ đề bên dưới để luyện tập phản xạ thần tốc, nối từ hoặc ôn tập Spaced Repetition.
                </p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  onclick="App.switchGameTab('penalty')"
                  class="px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-red-100 transition"
                >
                  <i data-lucide="shield-alert" class="w-4 h-4"></i> Hộp phạt (${this.penaltyWords.length} từ)
                </button>
              </div>
            </div>

            <!-- Filter Pills (Exact styling as reference image) -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
              <button
                onclick="App.setDeckFilter('all')"
                class="px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
                  (!this.deckFilterCategory || this.deckFilterCategory === "all")
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400"
                }"
              >
                <span>Bộ câu</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>

              <button
                onclick="App.setDeckFilter('hsk')"
                class="px-4 py-2 rounded-xl transition whitespace-nowrap ${
                  this.deckFilterCategory === "hsk"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400"
                }"
              >
                Trình Độ HSK
              </button>

              <button
                onclick="App.setDeckFilter('business')"
                class="px-4 py-2 rounded-xl transition whitespace-nowrap ${
                  this.deckFilterCategory === "business"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400"
                }"
              >
                Mục Đích / Thương Mại
              </button>

              <button
                onclick="App.setDeckFilter('custom')"
                class="px-4 py-2 rounded-xl transition whitespace-nowrap ${
                  this.deckFilterCategory === "custom"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400"
                }"
              >
                Flashcard Tự Tạo (${this.getDeckWords("custom").length})
              </button>
            </div>

            <!-- Card Grid: 3 columns on desktop (Exact match to reference image) -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${filteredDecks
                .map((d) => {
                  const isSelected = this.selectedGameDeck === d.id;
                  const isBookmarked = this.deckBookmarks && this.deckBookmarks.includes(d.id);
                  return `
                <div
                  onclick="App.selectGameDeck('${d.id}')"
                  class="bg-white dark:bg-slate-800 rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? "border-orange-500 ring-4 ring-orange-500/20 shadow-orange-500/15"
                      : "border-slate-200 dark:border-slate-700 hover:border-orange-300"
                  }"
                >
                  <!-- Cover Image with Overlays -->
                  <div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <img
                      src="${d.image}"
                      alt="${d.title}"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onerror="this.src='https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/35"></div>

                    <!-- Bookmark Icon Button (Top-Left) -->
                    <button
                      onclick="event.stopPropagation(); App.toggleDeckBookmark('${d.id}')"
                      class="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition shadow"
                      title="Lưu vào danh sách yêu thích"
                    >
                      <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? "fill-orange-400 text-orange-400" : ""}"></i>
                    </button>

                    <!-- Language Tag (Top-Right) -->
                    <span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-black/45 backdrop-blur-md text-white text-[11px] font-bold tracking-wide">
                      Tiếng Trung
                    </span>

                    <!-- Floating Word Count Badge (Bottom-Left) -->
                    <div class="absolute bottom-3 left-3 flex items-center gap-2">
                      <span class="px-3.5 py-1 rounded-xl bg-orange-500 text-white font-black text-xs shadow-md tracking-wider">
                        ${d.count} từ
                      </span>
                      ${
                        isSelected
                          ? `<span class="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5"></i> Đang chọn</span>`
                          : ""
                      }
                    </div>
                  </div>

                  <!-- Card Body -->
                  <div class="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div class="space-y-1">
                      <h3 class="font-black text-base md:text-lg text-slate-900 dark:text-white group-hover:text-orange-500 transition line-clamp-1">
                        ${d.title}
                      </h3>
                      <p class="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                        ${d.subtitle}
                      </p>
                    </div>

                    <!-- Sample Hanzi Chips -->
                    <div class="space-y-1.5">
                      <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Từ vựng tiêu biểu:</span>
                      <div class="flex flex-wrap gap-1.5">
                        ${d.sampleChips
                          .map(
                            (c) => `
                          <span class="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border border-orange-200/70 dark:border-orange-900/50 font-hanzi font-bold text-xs">
                            ${c}
                          </span>
                        `
                          )
                          .join("")}
                      </div>
                    </div>

                    <!-- Description -->
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      ${d.desc}
                    </p>

                    <!-- Footer Meta -->
                    <div class="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                      <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <i data-lucide="book-open" class="w-3.5 h-3.5 text-orange-500"></i>
                        <span class="font-semibold">${d.count} từ vựng</span>
                      </div>
                      <span class="font-bold text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[11px]">
                        ${d.levelTag}
                      </span>
                    </div>

                    <!-- Bottom Action Button -->
                    <div class="pt-2">
                      <button
                        onclick="event.stopPropagation(); App.selectGameDeck('${d.id}')"
                        class="w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm ${
                          isSelected
                            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25"
                            : "bg-slate-100 dark:bg-slate-700 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 border border-slate-200 dark:border-slate-600"
                        }"
                      >
                        <i data-lucide="${isSelected ? "play-circle" : "mouse-pointer-click"}" class="w-4 h-4"></i>
                        <span>${isSelected ? "Đang chơi bộ này" : "Chọn bộ từ này"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
                })
                .join("")}
            </div>
          </div>

          <!-- ========================================== -->
          <!-- 2. GAME MODE SELECTOR & ARENA              -->
          <!-- ========================================== -->
          <div id="gameModeSelectorBar" class="pt-4 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="flex flex-wrap items-center gap-1 text-xs font-bold">
                <button id="gameTabSpeed" onclick="App.switchGameTab('speed')" class="px-4 py-2.5 rounded-xl transition ${this.selectedGameMode === "speed" ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-white shadow-sm font-black" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5">
                  <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i> Nối từ siêu tốc
                </button>
                <button id="gameTabQuiz" onclick="App.switchGameTab('quiz')" class="px-4 py-2.5 rounded-xl transition ${this.selectedGameMode === "quiz" ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-white shadow-sm font-black" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5">
                  <i data-lucide="timer" class="w-4 h-4 text-red-500"></i> Phản xạ 5s
                </button>
                <button id="gameTabAudio" onclick="App.switchGameTab('audio')" class="px-4 py-2.5 rounded-xl transition ${this.selectedGameMode === "audio" ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-white shadow-sm font-black" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5">
                  <i data-lucide="volume-2" class="w-4 h-4 text-purple-500"></i> Nghe âm đoán chữ
                </button>
                <button id="gameTabPenalty" onclick="App.switchGameTab('penalty')" class="px-4 py-2.5 rounded-xl transition ${this.selectedGameMode === "penalty" ? "bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm font-black" : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"} flex items-center gap-1.5">
                  <i data-lucide="shield-alert" class="w-4 h-4"></i> Hộp phạt (${this.penaltyWords.length})
                </button>
              </div>

              <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 hidden sm:block">
                Đang chơi: <span class="text-orange-600 dark:text-orange-400 font-extrabold">${activeDeckDef.shortLabel}</span>
              </div>
            </div>
          </div>
                <i data-lucide="timer" class="w-4 h-4 text-red-500"></i> Phản xạ 5s
              </button>
              <button id="gameTabAudio" onclick="App.switchGameTab('audio')" class="px-4 py-2 rounded-xl transition ${this.selectedGameMode === "audio" ? "bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5">
                <i data-lucide="volume-2" class="w-4 h-4 text-purple-500"></i> Nghe âm đoán chữ
              </button>
              <button id="gameTabPenalty" onclick="App.switchGameTab('penalty')" class="px-4 py-2 rounded-xl transition ${this.selectedGameMode === "penalty" ? "bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm" : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"} flex items-center gap-1.5">
                <i data-lucide="shield-alert" class="w-4 h-4"></i> Hộp phạt (${this.penaltyWords.length})
              </button>
            </div>

            <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-3 hidden sm:block">
              Áp dụng cho: <span class="text-red-600 dark:text-red-400 font-bold">${activeDeckDef.shortLabel}</span>
            </div>
          </div>

          <!-- 3. DYNAMIC GAME ARENA -->
          <div id="gameArenaContainer" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-lg min-h-[420px] flex flex-col justify-center">
            <!-- Active Game Mode Renders Here -->
          </div>

          <!-- 4. ACTIVE DECK VOCABULARY EXPLORER -->
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold">
                  <i data-lucide="${activeDeckDef.icon}" class="w-4 h-4"></i>
                </div>
                <div>
                  <h3 class="font-extrabold text-sm text-slate-800 dark:text-white">
                    Kho Từ Vựng Của Mục: ${activeDeckDef.label}
                  </h3>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    Toàn bộ câu hỏi của các trò chơi ở trên được trích xuất trực tiếp từ danh sách này.
                  </p>
                </div>
              </div>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                ${activeWords.length} Từ vựng
              </span>
            </div>

            ${
              activeWords.length === 0
                ? `
              <div class="text-center py-10 text-slate-400">
                <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
                <p class="text-xs font-semibold">Chưa có từ vựng nào trong mục này.</p>
                ${
                  this.selectedGameDeck === "custom"
                    ? `
                  <a href="#flashcards" class="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition shadow-sm">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tạo Flashcard Của Bạn Ngay
                  </a>
                `
                    : ""
                }
              </div>
            `
                : `
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto pr-1">
                ${activeWords
                  .map(
                    (w) => `
                  <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between hover:border-red-400 transition">
                    <div class="min-w-0 pr-2">
                      <div class="font-hanzi font-bold text-xl text-slate-800 dark:text-white leading-tight">
                        ${w.hanzi}
                      </div>
                      <div class="text-xs text-red-600 dark:text-red-400 font-semibold truncate">
                        ${w.pinyin}
                      </div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate" title="${w.meaning}">
                        ${w.meaning}
                      </div>
                    </div>
                    <button onclick="AudioService.speak('${w.hanzi}')" class="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 shadow-sm shrink-0 transition" title="Nghe phát âm">
                      <i data-lucide="volume-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
            }
          </div>
        </div>
      `;

      // Start current game mode
      this.switchGameTab(this.selectedGameMode);
    },

    switchGameTab(mode) {
      this.selectedGameMode = mode;
      const tabs = ["speed", "quiz", "audio", "penalty"];
      tabs.forEach((t) => {
        const btn = document.getElementById(`gameTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
        if (btn) {
          if (t === mode) {
            btn.className = "px-4 py-2 rounded-xl transition bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm flex items-center gap-1.5 font-bold";
          } else {
            btn.className = "px-4 py-2 rounded-xl transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1.5 font-bold";
          }
        }
      });

      const arena = document.getElementById("gameArenaContainer");
      if (!arena) return;

      if (this.gameState?.timerInterval) {
        clearInterval(this.gameState.timerInterval);
      }

      switch (mode) {
        case "speed":
          this.initSpeedMatchingGame(arena);
          break;
        case "quiz":
          this.initTimeAttackQuiz(arena);
          break;
        case "audio":
          this.initAudioReflexGame(arena);
          break;
        case "penalty":
          this.initPenaltyBoxReview(arena);
          break;
      }
      this.refreshIcons();
    },

    // 1. Game: Speed Matching (Nối từ siêu tốc)
    initSpeedMatchingGame(arena) {
      const deckWords = this.getDeckWords(this.selectedGameDeck);
      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      if (deckWords.length < 4) {
        arena.innerHTML = `
          <div class="text-center py-10 space-y-4 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
              <i data-lucide="alert-triangle" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-extrabold text-slate-800 dark:text-white">Cần tối thiểu 4 từ vựng để chơi!</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Trò chơi Nối từ siêu tốc cần ít nhất 4 từ để ghép đôi. Mục <b>${deckDef.label}</b> hiện đang có <b>${deckWords.length}</b> từ.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
              ${
                this.selectedGameDeck === "custom"
                  ? `
                <a href="#flashcards" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
                  <i data-lucide="plus" class="w-4 h-4"></i> Tạo thêm Flashcard ngay
                </a>
              `
                  : `
                <button onclick="App.selectGameDeck('business')" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition">
                  Chơi với Tiếng Trung Thương Mại
                </button>
              `
              }
              <button onclick="App.selectGameDeck('hsk1')" class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs">
                Chuyển sang HSK 1
              </button>
            </div>
          </div>
        `;
        this.refreshIcons();
        return;
      }

      // Pick 4 random words strictly from this deck
      const words = [...deckWords].sort(() => 0.5 - Math.random()).slice(0, 4);
      const hanziCards = words.map((w) => ({ id: w.id, text: w.hanzi, type: "hanzi" })).sort(() => 0.5 - Math.random());
      const meaningCards = words.map((w) => ({ id: w.id, text: `${w.pinyin} - ${w.meaning}`, type: "meaning" })).sort(() => 0.5 - Math.random());

      this.gameState = {
        mode: "speed",
        deck: this.selectedGameDeck,
        words,
        selectedHanzi: null,
        selectedMeaning: null,
        matchedCount: 0,
        score: 0,
        secondsLeft: 25,
        timerInterval: null
      };

      arena.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span class="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i> Nối chữ Hán với Pinyin & Nghĩa tương ứng [${deckDef.shortLabel}]
            </span>
            <div class="flex items-center gap-4 text-xs font-bold">
              <span class="text-amber-600 flex items-center gap-1 font-mono">
                <i data-lucide="clock" class="w-4 h-4"></i> Còn: <span id="gameTimerSecs" class="text-sm">25</span>s
              </span>
              <span class="text-emerald-600">Điểm: <span id="gameScoreVal">0</span></span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 md:gap-6">
            <!-- Left column: Hanzi -->
            <div class="space-y-3" id="speedHanziCol">
              ${hanziCards
                .map(
                  (c) => `
                <button
                  data-id="${c.id}"
                  onclick="App.handleSpeedCardClick('${c.id}', 'hanzi')"
                  class="speed-card w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 font-hanzi font-bold text-2xl text-slate-800 dark:text-white hover:border-red-400 transition"
                >
                  ${c.text}
                </button>
              `
                )
                .join("")}
            </div>

            <!-- Right column: Pinyin & Meaning -->
            <div class="space-y-3" id="speedMeaningCol">
              ${meaningCards
                .map(
                  (c) => `
                <button
                  data-id="${c.id}"
                  onclick="App.handleSpeedCardClick('${c.id}', 'meaning')"
                  class="speed-card w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-red-400 transition text-left"
                >
                  ${c.text}
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

      // Start timer
      this.gameState.timerInterval = setInterval(() => {
        if (!this.gameState || this.gameState.mode !== "speed") return;
        this.gameState.secondsLeft -= 1;
        const timerEl = document.getElementById("gameTimerSecs");
        if (timerEl) timerEl.textContent = this.gameState.secondsLeft;

        if (this.gameState.secondsLeft <= 0) {
          clearInterval(this.gameState.timerInterval);
          this.finishSpeedGame(false);
        }
      }, 1000);
    },

    handleSpeedCardClick(id, type) {
      if (!this.gameState || this.gameState.mode !== "speed") return;

      const col = type === "hanzi" ? "speedHanziCol" : "speedMeaningCol";
      const cards = document.getElementById(col)?.querySelectorAll(".speed-card");
      cards?.forEach((btn) => {
        if (btn.getAttribute("data-id") === id) {
          btn.classList.add("border-amber-500", "bg-amber-50", "dark:bg-amber-950/60");
        } else {
          btn.classList.remove("border-amber-500", "bg-amber-50", "dark:bg-amber-950/60");
        }
      });

      if (type === "hanzi") this.gameState.selectedHanzi = id;
      if (type === "meaning") this.gameState.selectedMeaning = id;

      // Both selected: Check match
      if (this.gameState.selectedHanzi && this.gameState.selectedMeaning) {
        if (this.gameState.selectedHanzi === this.gameState.selectedMeaning) {
          // Correct match!
          this.gameState.matchedCount += 1;
          this.gameState.score += 25;
          document.getElementById("gameScoreVal").textContent = this.gameState.score;

          // Disable matched cards
          const hCard = document.querySelector(`#speedHanziCol [data-id="${id}"]`);
          const mCard = document.querySelector(`#speedMeaningCol [data-id="${id}"]`);
          if (hCard) {
            hCard.classList.add("opacity-40", "pointer-events-none", "border-emerald-500", "bg-emerald-50");
          }
          if (mCard) {
            mCard.classList.add("opacity-40", "pointer-events-none", "border-emerald-500", "bg-emerald-50");
          }

          // Audio pronounce
          const matchedWord = this.gameState.words.find((w) => w.id === id);
          if (matchedWord) window.AudioService.speak(matchedWord.hanzi);

          this.gameState.selectedHanzi = null;
          this.gameState.selectedMeaning = null;

          if (this.gameState.matchedCount === 4) {
            clearInterval(this.gameState.timerInterval);
            this.finishSpeedGame(true);
          }
        } else {
          // Wrong match! Push to Penalty list
          const wrongWord = this.gameState.words.find((w) => w.id === this.gameState.selectedHanzi);
          if (wrongWord) {
            window.StorageService.addPenaltyWord(wrongWord);
            this.updateHeaderProgress();
          }

          this.showToast("Nối sai! Từ này đã bị đưa vào Hộp Phạt để ôn lại.", "warning");

          // Reset selection
          setTimeout(() => {
            document.querySelectorAll(".speed-card").forEach((btn) => {
              btn.classList.remove("border-amber-500", "bg-amber-50", "dark:bg-amber-950/60");
            });
            if (this.gameState) {
              this.gameState.selectedHanzi = null;
              this.gameState.selectedMeaning = null;
            }
          }, 400);
        }
      }
    },

    finishSpeedGame(isWin) {
      const arena = document.getElementById("gameArenaContainer");
      if (!arena) return;

      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      arena.innerHTML = `
        <div class="text-center py-8 space-y-4 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full ${isWin ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"} flex items-center justify-center mx-auto text-2xl shadow-lg">
            <i data-lucide="${isWin ? "trophy" : "clock-alert"}" class="w-8 h-8"></i>
          </div>
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            ${isWin ? "Chiến Thắng Xuất Sắc!" : "Hết Giờ Phản Xạ!"}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            ${isWin ? `Bạn đã hoàn thành nối 4 cặp từ mục "${deckDef.shortLabel}" cực nhanh và chuẩn xác.` : "Các từ chưa hoàn thành đã được thêm vào danh sách Cần Ôn Gấp."}
          </p>
          <div class="flex items-center justify-center gap-3 pt-3">
            <button onclick="App.initSpeedMatchingGame(document.getElementById('gameArenaContainer'))" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Chơi Lại Màn Mới (${deckDef.shortLabel})
            </button>
            <button onclick="App.switchGameTab('penalty')" class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200">
              Xem Hộp Phạt
            </button>
          </div>
        </div>
      `;
      this.refreshIcons();
    },

    // 2. Game: Time Attack Quiz (5s per question)
    initTimeAttackQuiz(arena) {
      const deckWords = this.getDeckWords(this.selectedGameDeck);
      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      if (deckWords.length === 0) {
        arena.innerHTML = `
          <div class="text-center py-10 space-y-4 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
              <i data-lucide="inbox" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-extrabold text-slate-800 dark:text-white">Mục này chưa có từ vựng!</h3>
            <p class="text-xs text-slate-500">Vui lòng chọn mục khác hoặc tạo thêm Flashcard.</p>
            <button onclick="App.selectGameDeck('business')" class="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md">
              Chơi với Tiếng Trung Thương Mại
            </button>
          </div>
        `;
        this.refreshIcons();
        return;
      }

      const words = [...deckWords].sort(() => 0.5 - Math.random());
      this.gameState = {
        mode: "quiz",
        deck: this.selectedGameDeck,
        words,
        deckWords,
        currentIndex: 0,
        score: 0,
        secondsLeft: 5,
        timerInterval: null
      };

      this.renderNextQuizQuestion(arena);
    },

    renderNextQuizQuestion(arena) {
      if (this.gameState.currentIndex >= this.gameState.words.length) {
        this.finishTimeAttackQuiz();
        return;
      }

      const currentWord = this.gameState.words[this.gameState.currentIndex];
      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      // Generate 3 wrong options from the same deck (or fallback if deck < 4 words)
      let otherPool = this.gameState.deckWords.filter((w) => w.id !== currentWord.id);
      if (otherPool.length < 3) {
        otherPool = (window.APP_DATA.vocabList || []).filter((w) => w.id !== currentWord.id);
      }
      const wrongOptions = otherPool
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.meaning);
      const allOptions = [currentWord.meaning, ...wrongOptions].sort(() => 0.5 - Math.random());

      this.gameState.secondsLeft = 5;

      arena.innerHTML = `
        <div class="space-y-6 max-w-xl mx-auto w-full">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span class="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <span>${deckDef.shortLabel}:</span>
              <span>Câu ${this.gameState.currentIndex + 1} / ${Math.min(10, this.gameState.words.length)}</span>
            </span>
            <div class="flex items-center gap-3 text-xs font-bold">
              <span class="text-red-600 flex items-center gap-1 font-mono text-sm">
                <i data-lucide="timer" class="w-4 h-4"></i> <span id="quizTimerText">5</span>s
              </span>
              <span class="text-emerald-600">Điểm: ${this.gameState.score}</span>
            </div>
          </div>

          <div class="text-center py-4">
            <div class="font-hanzi font-bold text-6xl text-slate-900 dark:text-white mb-2">
              ${currentWord.hanzi}
            </div>
            <div class="text-base text-red-600 dark:text-red-400 font-mono font-semibold">
              ${currentWord.pinyin}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${allOptions
              .map(
                (opt) => `
              <button
                onclick="App.handleQuizChoice('${opt.replace(/'/g, "\\'")}', '${currentWord.meaning.replace(/'/g, "\\'")}', '${currentWord.id}')"
                class="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 hover:border-red-500 text-xs font-bold text-slate-700 dark:text-slate-200 transition text-left"
              >
                ${opt}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      `;
      this.refreshIcons();

      // Countdown
      if (this.gameState.timerInterval) clearInterval(this.gameState.timerInterval);
      this.gameState.timerInterval = setInterval(() => {
        if (!this.gameState || this.gameState.mode !== "quiz") return;
        this.gameState.secondsLeft -= 1;
        const tEl = document.getElementById("quizTimerText");
        if (tEl) tEl.textContent = this.gameState.secondsLeft;

        if (this.gameState.secondsLeft <= 0) {
          clearInterval(this.gameState.timerInterval);
          // Timeout penalty
          window.StorageService.addPenaltyWord(currentWord);
          this.updateHeaderProgress();
          this.showToast(`Hết 5 giây! "${currentWord.hanzi}" đã bị đưa vào Hộp Phạt.`, "warning");
          this.gameState.currentIndex += 1;
          this.renderNextQuizQuestion(arena);
        }
      }, 1000);
    },

    handleQuizChoice(chosen, correct, wordId) {
      if (this.gameState.timerInterval) clearInterval(this.gameState.timerInterval);

      if (chosen === correct) {
        this.gameState.score += 10;
        this.showToast("Chính xác! +10 Điểm", "success");
      } else {
        const pool = this.gameState.words || window.APP_DATA.vocabList;
        const word = pool.find((w) => w.id === wordId) || window.APP_DATA.vocabList.find((w) => w.id === wordId);
        if (word) {
          window.StorageService.addPenaltyWord(word);
          this.updateHeaderProgress();
        }
        this.showToast(`Sai rồi! "${word?.hanzi || ""}" đã vào Hộp Phạt.`, "error");
      }

      this.gameState.currentIndex += 1;
      const arena = document.getElementById("gameArenaContainer");
      if (arena) this.renderNextQuizQuestion(arena);
    },

    finishTimeAttackQuiz() {
      const arena = document.getElementById("gameArenaContainer");
      if (!arena) return;

      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      arena.innerHTML = `
        <div class="text-center py-8 space-y-4 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            Hoàn Thành Chuỗi Phản Xạ 5s!
          </h3>
          <p class="text-xs text-slate-500">Mục: <b>${deckDef.label}</b></p>
          <p class="text-sm font-bold text-red-600 dark:text-red-400">
            Tổng điểm của bạn: ${this.gameState.score} điểm
          </p>
          <div class="flex items-center justify-center gap-3 pt-3">
            <button onclick="App.initTimeAttackQuiz(document.getElementById('gameArenaContainer'))" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Thử Lại Màn Mới (${deckDef.shortLabel})
            </button>
          </div>
        </div>
      `;
      this.refreshIcons();
    },

    // 3. Game: Audio Reflex (Nghe âm đoán chữ)
    initAudioReflexGame(arena) {
      const deckWords = this.getDeckWords(this.selectedGameDeck);
      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      if (deckWords.length === 0) {
        arena.innerHTML = `
          <div class="text-center py-10 space-y-4 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
              <i data-lucide="inbox" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-extrabold text-slate-800 dark:text-white">Mục này chưa có từ vựng!</h3>
            <p class="text-xs text-slate-500">Vui lòng chọn mục khác để luyện nghe.</p>
          </div>
        `;
        this.refreshIcons();
        return;
      }

      const words = [...deckWords].sort(() => 0.5 - Math.random());
      this.gameState = {
        mode: "audio",
        deck: this.selectedGameDeck,
        words,
        deckWords,
        currentIndex: 0,
        score: 0
      };
      this.renderNextAudioQuestion(arena);
    },

    renderNextAudioQuestion(arena) {
      const maxQ = Math.min(8, this.gameState.words.length);
      const deckDef = this.getDeckDefinition(this.selectedGameDeck);

      if (this.gameState.currentIndex >= maxQ) {
        arena.innerHTML = `
          <div class="text-center py-8 space-y-4 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
              <i data-lucide="headphones" class="w-8 h-8"></i>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">Thính Giác Tuyệt Vời!</h3>
            <p class="text-xs text-slate-500">Mục: <b>${deckDef.label}</b></p>
            <p class="text-sm text-purple-600 font-bold">Điểm số nghe âm: ${this.gameState.score} điểm</p>
            <button onclick="App.initAudioReflexGame(document.getElementById('gameArenaContainer'))" class="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md">
              Chơi Lại (${deckDef.shortLabel})
            </button>
          </div>
        `;
        this.refreshIcons();
        return;
      }

      const targetWord = this.gameState.words[this.gameState.currentIndex];
      let otherPool = this.gameState.deckWords.filter((w) => w.id !== targetWord.id);
      if (otherPool.length < 3) {
        otherPool = (window.APP_DATA.vocabList || []).filter((w) => w.id !== targetWord.id);
      }
      const others = [...otherPool].sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [targetWord, ...others].sort(() => 0.5 - Math.random());

      arena.innerHTML = `
        <div class="space-y-6 max-w-lg mx-auto w-full text-center">
          <div class="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>${deckDef.shortLabel}</span>
            <span>Câu ${this.gameState.currentIndex + 1} / ${maxQ}</span>
            <span class="text-purple-600">Điểm: ${this.gameState.score}</span>
          </div>

          <div class="py-4">
            <button
              id="audioPlayBtn"
              onclick="AudioService.speak('${targetWord.hanzi}')"
              class="w-24 h-24 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-500/30 transition transform hover:scale-105 active:scale-95"
            >
              <i data-lucide="volume-2" class="w-10 h-10"></i>
            </button>
            <p class="text-xs text-slate-500 mt-2">Bấm loa để nghe lại phát âm chữ Hán</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            ${options
              .map(
                (opt) => `
              <button
                onclick="App.handleAudioChoice('${opt.id}', '${targetWord.id}')"
                class="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 hover:border-purple-500 font-hanzi font-bold text-3xl text-slate-800 dark:text-white transition"
              >
                ${opt.hanzi}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      `;
      this.refreshIcons();

      // Play sound automatically
      setTimeout(() => window.AudioService.speak(targetWord.hanzi), 300);
    },

    handleAudioChoice(chosenId, targetId) {
      if (chosenId === targetId) {
        this.gameState.score += 15;
        this.showToast("Rất chuẩn xác! +15 Điểm", "success");
      } else {
        const pool = this.gameState.words || window.APP_DATA.vocabList;
        const wrong = pool.find((w) => w.id === targetId) || window.APP_DATA.vocabList.find((w) => w.id === targetId);
        if (wrong) {
          window.StorageService.addPenaltyWord(wrong);
          this.updateHeaderProgress();
        }
        this.showToast("Sai rồi! Từ này đã bị đưa vào Hộp Phạt.", "error");
      }

      this.gameState.currentIndex += 1;
      const arena = document.getElementById("gameArenaContainer");
      if (arena) this.renderNextAudioQuestion(arena);
    },

    // 4. Special Penalty Box (Spaced Repetition Review - 3 Streaks rule)
    initPenaltyBoxReview(arena) {
      this.penaltyWords = window.StorageService.getPenaltyWords();

      if (this.penaltyWords.length === 0) {
        arena.innerHTML = `
          <div class="text-center py-12 space-y-3 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-sm">
              <i data-lucide="smile" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 dark:text-white">Hộp Phạt Trống!</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tuyệt vời, bạn không có từ vựng nào bị nợ phạt. Hãy tiếp tục thử thách với các chế độ game phản xạ!
            </p>
            <button onclick="App.switchGameTab('speed')" class="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md">
              Chơi Nối Từ Siêu Tốc
            </button>
          </div>
        `;
        this.refreshIcons();
        return;
      }

      arena.innerHTML = `
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <span class="text-xs font-bold text-red-600 uppercase flex items-center gap-1.5">
                <i data-lucide="shield-alert" class="w-4 h-4"></i> Danh sách từ chưa thuộc (Cần ôn gấp)
              </span>
              <p class="text-xs text-slate-400 mt-0.5">
                Cơ chế Spaced Repetition: Phải trả lời đúng <strong>3 lần liên tiếp</strong> mới được gỡ khỏi danh sách phạt!
              </p>
            </div>
            <button onclick="App.startPenaltyExamSession()" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5">
              <i data-lucide="play" class="w-4 h-4 fill-white"></i> Bắt đầu bài kiểm tra gỡ phạt
            </button>
          </div>

          <!-- Penalty Words Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.penaltyWords
              .map((w) => {
                const streak = w.consecutiveCorrect || 0;
                return `
                <div class="p-4 rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/20 flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-xl tianzige-box flex items-center justify-center font-hanzi font-bold text-2xl text-slate-800 dark:text-white shadow-inner">
                      ${w.hanzi}
                    </div>
                    <div>
                      <div class="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                        <span>${w.pinyin}</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">HSK ${w.hsk || 1}</span>
                      </div>
                      <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">${w.meaning}</p>
                    </div>
                  </div>

                  <!-- 3-streak status dots -->
                  <div class="text-right">
                    <span class="text-[10px] text-slate-400 block mb-1">Chuỗi đúng:</span>
                    <div class="flex items-center gap-1">
                      <span class="w-3 h-3 rounded-full ${streak >= 1 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}"></span>
                      <span class="w-3 h-3 rounded-full ${streak >= 2 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}"></span>
                      <span class="w-3 h-3 rounded-full ${streak >= 3 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}"></span>
                    </div>
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
      this.refreshIcons();
    },

    startPenaltyExamSession() {
      const arena = document.getElementById("gameArenaContainer");
      if (!arena || this.penaltyWords.length === 0) return;

      const currentWord = this.penaltyWords[0];
      const otherWords = window.APP_DATA.vocabList.filter((w) => w.id !== currentWord.id);
      const wrongOptions = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3).map((w) => w.meaning);
      const allOptions = [currentWord.meaning, ...wrongOptions].sort(() => 0.5 - Math.random());

      arena.innerHTML = `
        <div class="space-y-6 max-w-xl mx-auto w-full text-center">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span class="text-xs font-bold text-red-600 uppercase flex items-center gap-1.5">
              <i data-lucide="shield-alert" class="w-4 h-4"></i> Kiểm tra gỡ phạt
            </span>
            <span class="text-xs font-semibold text-slate-400">
              Đã đúng liên tiếp: ${currentWord.consecutiveCorrect || 0} / 3 lần
            </span>
          </div>

          <div class="py-4">
            <div class="font-hanzi font-bold text-6xl text-slate-800 dark:text-white mb-2">
              ${currentWord.hanzi}
            </div>
            <div class="text-sm font-semibold text-red-600 dark:text-red-400 font-mono">
              ${currentWord.pinyin}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${allOptions
              .map(
                (opt) => `
              <button
                onclick="App.handlePenaltyChoice('${opt.replace(/'/g, "\\'")}', '${currentWord.meaning.replace(/'/g, "\\'")}', '${currentWord.id}')"
                class="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 hover:border-red-500 text-xs font-bold text-slate-700 dark:text-slate-200 transition text-left"
              >
                ${opt}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      `;
      this.refreshIcons();
    },

    handlePenaltyChoice(chosen, correct, wordId) {
      const isCorrect = chosen === correct;
      const res = window.StorageService.recordPenaltyAnswer(wordId, isCorrect);
      this.updateHeaderProgress();

      if (isCorrect) {
        if (res.cleared) {
          this.showToast("Chúc mừng! Bạn đã đạt 3 lần đúng liên tiếp và xóa từ này khỏi danh sách phạt!", "success");
        } else {
          this.showToast("Chính xác! Cần tiếp tục duy trì thêm lượt đúng.", "success");
        }
      } else {
        this.showToast("Rất tiếc! Chuỗi đúng bị reset về 0.", "error");
      }

      const arena = document.getElementById("gameArenaContainer");
      if (arena) this.initPenaltyBoxReview(arena);
    },

    /* =====================================================================
       MODULE 6: PERSONALIZED FLASHCARD STUDIO & 3D LEARNER
       ===================================================================== */
    flashcardTab: "practice", // 'practice', 'create', 'scan', 'manage'
    selectedDeck: "all",
    flashcardFilterStatus: "all",
    editingCardId: null,
    scannerState: {
      imageBase64: null,
      mimeType: "image/jpeg",
      imagePreviewUrl: null,
      isScanning: false,
      scannedCards: [],
      selectedIndexes: new Set()
    },

    renderFlashcards(container) {
      this.flashcards = window.StorageService.getFlashcards();
      const decks = window.StorageService.getDecks();

      container.innerHTML = `
        <div class="space-y-6 max-w-5xl mx-auto">
          <!-- Top Header & Tab Navigation -->
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="layers" class="w-6 h-6 text-red-600"></i>
                Flashcard 3D & Xưởng Tạo Thẻ Cá Nhân
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tự tạo bộ thẻ từ vựng riêng biệt, quét từ vựng trong trang sách bằng AI và lật thẻ 3D Spaced Repetition.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button
                onclick="App.playGameWithCustomDeck()"
                class="px-4 py-2 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                title="Chơi các trò chơi phản xạ trực tiếp bằng các thẻ từ vựng tự tạo này"
              >
                <i data-lucide="gamepad-2" class="w-4 h-4"></i>
                <span>Chơi Game Với Flashcard (${this.flashcards.length})</span>
              </button>

              <!-- Sub Tabs -->
              <div class="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 gap-1 text-xs font-bold">
                <button
                  id="fcTabPracticeBtn"
                  onclick="App.switchFlashcardTab('practice')"
                  class="px-3.5 py-2 rounded-xl transition ${this.flashcardTab === "practice" ? "bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5"
                >
                  <i data-lucide="play-circle" class="w-4 h-4"></i> Luyện Thẻ 3D
                </button>
                <button
                  id="fcTabCreateBtn"
                  onclick="App.switchFlashcardTab('create')"
                  class="px-3.5 py-2 rounded-xl transition ${this.flashcardTab === "create" ? "bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5"
                >
                  <i data-lucide="plus-circle" class="w-4 h-4 text-amber-500"></i> Tạo Thẻ Mới (AI)
                </button>
                <button
                  id="fcTabScanBtn"
                  onclick="App.switchFlashcardTab('scan')"
                  class="px-3.5 py-2 rounded-xl transition ${this.flashcardTab === "scan" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5"
                >
                  <i data-lucide="scan-line" class="w-4 h-4 text-emerald-500"></i> Quét Trang Sách (AI)
                </button>
                <button
                  id="fcTabManageBtn"
                  onclick="App.switchFlashcardTab('manage')"
                  class="px-3.5 py-2 rounded-xl transition ${this.flashcardTab === "manage" ? "bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"} flex items-center gap-1.5"
                >
                  <i data-lucide="folder-cog" class="w-4 h-4"></i> Quản Lý Bộ Thẻ (${this.flashcards.length})
                </button>
              </div>
            </div>
          </div>

          <!-- Dynamic Tab Content -->
          <div id="flashcardSubViewContainer">
            <!-- Injected dynamically -->
          </div>
        </div>
      `;

      this.renderCurrentFlashcardTab();
    },

    switchFlashcardTab(tab) {
      this.flashcardTab = tab;
      const tabs = ["practice", "create", "scan", "manage"];
      tabs.forEach((t) => {
        const btn = document.getElementById(`fcTab${t.charAt(0).toUpperCase() + t.slice(1)}Btn`);
        if (btn) {
          if (t === tab) {
            btn.className = `px-3.5 py-2 rounded-xl transition bg-white dark:bg-slate-700 ${t === "scan" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-white"} shadow-sm flex items-center gap-1.5 font-bold`;
          } else {
            btn.className = "px-3.5 py-2 rounded-xl transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1.5 font-bold";
          }
        }
      });
      this.renderCurrentFlashcardTab();
    },

    renderCurrentFlashcardTab() {
      const container = document.getElementById("flashcardSubViewContainer");
      if (!container) return;

      if (this.flashcardTab === "practice") {
        this.renderFlashcardPracticeView(container);
      } else if (this.flashcardTab === "create") {
        this.renderFlashcardCreateView(container);
      } else if (this.flashcardTab === "scan") {
        this.renderFlashcardScanView(container);
      } else if (this.flashcardTab === "manage") {
        this.renderFlashcardManageView(container);
      }
      this.refreshIcons();
    },

    // 1. Practice 3D View
    renderFlashcardPracticeView(container) {
      this.flashcards = window.StorageService.getFlashcards();
      const decks = window.StorageService.getDecks();

      // Filter cards
      let filtered = this.flashcards;
      if (this.selectedDeck !== "all") {
        filtered = filtered.filter((c) => (c.deck || "Bộ mặc định") === this.selectedDeck);
      }
      if (this.flashcardFilterStatus !== "all") {
        filtered = filtered.filter((c) => (c.status || "learning") === this.flashcardFilterStatus);
      }

      if (this.flashcardIndex >= filtered.length) {
        this.flashcardIndex = 0;
      }
      const current = filtered[this.flashcardIndex] || filtered[0];

      container.innerHTML = `
        <div class="space-y-6">
          <!-- Filter Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-semibold text-slate-400">Bộ thẻ:</span>
                <select id="fcDeckFilter" onchange="App.selectedDeck = this.value; App.flashcardIndex = 0; App.renderCurrentFlashcardTab();" class="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <option value="all" ${this.selectedDeck === "all" ? "selected" : ""}>Tất cả bộ thẻ (${this.flashcards.length})</option>
                  ${decks.map((d) => `<option value="${d}" ${this.selectedDeck === d ? "selected" : ""}>${d}</option>`).join("")}
                </select>
              </div>

              <div class="flex items-center gap-1.5">
                <span class="text-xs font-semibold text-slate-400">Trạng thái:</span>
                <select id="fcStatusFilter" onchange="App.flashcardFilterStatus = this.value; App.flashcardIndex = 0; App.renderCurrentFlashcardTab();" class="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <option value="all" ${this.flashcardFilterStatus === "all" ? "selected" : ""}>Tất cả trạng thái</option>
                  <option value="forgot" ${this.flashcardFilterStatus === "forgot" ? "selected" : ""}>🔴 Cần ôn gấp (Quên)</option>
                  <option value="vague" ${this.flashcardFilterStatus === "vague" ? "selected" : ""}>🟡 Nhớ mang máng</option>
                  <option value="mastered" ${this.flashcardFilterStatus === "mastered" ? "selected" : ""}>🟢 Đã thuộc</option>
                </select>
              </div>
            </div>

            <button onclick="App.switchFlashcardTab('create')" class="px-3.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 font-bold text-xs flex items-center gap-1 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Thêm từ vào bộ này
            </button>
          </div>

          <!-- Flashcard 3D Card Area -->
          <div id="flashcardViewerContainer" class="space-y-6">
            ${current ? this.renderFlashcardCard(current, filtered) : `
              <div class="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm space-y-3">
                <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  <i data-lucide="inbox" class="w-8 h-8"></i>
                </div>
                <h4 class="font-bold text-base text-slate-800 dark:text-white">Không tìm thấy thẻ nào phù hợp</h4>
                <p class="text-xs text-slate-400 max-w-sm mx-auto">Bạn chưa có từ vựng nào trong bộ lọc này. Hãy bấm tạo thẻ mới để bắt đầu học tập!</p>
                <button onclick="App.switchFlashcardTab('create')" class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition inline-flex items-center gap-1.5">
                  <i data-lucide="plus-circle" class="w-4 h-4"></i> Tạo Flashcard Mới Ngay
                </button>
              </div>
            `}
          </div>
        </div>
      `;
    },

    renderFlashcardCard(card, currentList = null) {
      const list = currentList || this.flashcards;
      const total = list.length;
      const currentNum = this.flashcardIndex + 1;

      return `
        <!-- Counter & Navigation Toolbar -->
        <div class="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 dark:text-white">Thẻ ${currentNum} / ${total}</span>
            <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
              ${card.deck || "Bộ mặc định"}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="App.prevFlashcard()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition" title="Thẻ trước (Phím mũi tên trái)">
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
            </button>
            <button onclick="App.nextFlashcard()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition" title="Thẻ tiếp (Phím mũi tên phải)">
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- 3D Perspective Card Wrapper -->
        <div class="perspective-1000 w-full h-84 md:h-96 cursor-pointer select-none" onclick="App.flipFlashcard()">
          <div id="flashcardInner" class="transform-style-3d relative w-full h-full duration-500 transition-transform ${this.isCardFlipped ? "rotate-y-180" : ""}">
            
            <!-- FRONT SIDE -->
            <div class="backface-hidden absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 p-8 shadow-xl flex flex-col justify-between items-center text-center">
              <div class="w-full flex items-center justify-between text-xs text-slate-400">
                <span class="font-bold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">HSK ${card.hsk || 1}</span>
                <span class="flex items-center gap-1 text-[11px]"><i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-amber-500"></i> Bấm để lật xem nghĩa</span>
              </div>

              <div class="my-auto py-2">
                <div class="font-hanzi font-bold text-7xl md:text-8xl text-slate-900 dark:text-white tracking-wider mb-2">
                  ${card.hanzi}
                </div>
                <p class="text-xs text-slate-400">Chữ Hán</p>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="event.stopPropagation(); AudioService.speak('${card.hanzi}')" class="p-3 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 transition shadow-sm" title="Nghe phát âm chữ">
                  <i data-lucide="volume-2" class="w-5 h-5"></i>
                </button>
                <button onclick="event.stopPropagation(); App.openEditFlashcardModal('${card.id}')" class="p-3 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-amber-50 hover:text-amber-600 transition shadow-sm" title="Chỉnh sửa thẻ này">
                  <i data-lucide="pencil" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- BACK SIDE -->
            <div class="backface-hidden rotate-y-180 absolute inset-0 w-full h-full bg-gradient-to-br from-red-50 via-amber-50 to-orange-50 dark:from-slate-850 dark:to-slate-800 rounded-3xl border-2 border-red-300 dark:border-red-900/60 p-8 shadow-xl flex flex-col justify-between items-center text-center overflow-y-auto">
              <div class="w-full flex items-center justify-between text-xs text-slate-400">
                <span class="font-bold text-red-600 dark:text-red-400 font-mono text-lg">${card.pinyin}</span>
                <button onclick="event.stopPropagation(); AudioService.speak('${card.hanzi}')" class="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-red-600 shadow-sm">
                  <i data-lucide="volume-2" class="w-4 h-4"></i>
                </button>
              </div>

              <div class="my-auto space-y-3 py-2 w-full max-w-md">
                <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  ${card.meaning}
                </h3>
                
                ${card.example ? `
                  <div class="p-3.5 rounded-2xl bg-white/85 dark:bg-slate-800/85 border border-red-100 dark:border-slate-700 text-xs shadow-sm text-left">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-bold text-amber-800 dark:text-amber-400">Ví dụ:</span>
                      <button onclick="event.stopPropagation(); AudioService.speak('${card.example}')" class="text-red-600 hover:underline flex items-center gap-1 font-semibold text-[11px]">
                        <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe
                      </button>
                    </div>
                    <div class="font-hanzi font-semibold text-slate-800 dark:text-white mb-0.5 text-sm">${card.example}</div>
                    <div class="text-slate-500 italic text-[11px]">${card.exampleVi || ""}</div>
                  </div>
                ` : ""}

                ${card.notes ? `
                  <div class="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 text-[11px] text-amber-900 dark:text-amber-300 text-left flex items-start gap-1.5">
                    <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Mẹo nhớ:</strong> ${card.notes}</span>
                  </div>
                ` : ""}
              </div>

              <span class="text-[11px] text-slate-400">Đánh giá mức độ nhớ bên dưới để hệ thống tối ưu ôn tập</span>
            </div>

          </div>
        </div>

        <!-- Rating Buttons (Spaced Repetition Feedback) -->
        <div class="grid grid-cols-3 gap-3 pt-2">
          <button onclick="App.rateFlashcard('${card.id}', 'forgot')" class="py-3 px-4 rounded-2xl bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/80 text-red-700 dark:text-red-300 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm">
            <i data-lucide="x-circle" class="w-4 h-4 text-red-600"></i> Quên (Vào Hộp Phạt)
          </button>
          <button onclick="App.rateFlashcard('${card.id}', 'vague')" class="py-3 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/80 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm">
            <i data-lucide="help-circle" class="w-4 h-4 text-amber-600"></i> Nhớ mang máng
          </button>
          <button onclick="App.rateFlashcard('${card.id}', 'mastered')" class="py-3 px-4 rounded-2xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i> Đã thuộc làu làu
          </button>
        </div>
      `;
    },

    // 2. Flashcard Creator Studio View
    renderFlashcardCreateView(container) {
      const decks = window.StorageService.getDecks();

      container.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h3 class="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <i data-lucide="sparkles" class="w-5 h-5 text-amber-500"></i>
                Xưởng Tự Tạo Flashcard Riêng
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Nhập chữ Hán của bạn, bấm <strong>Điền bằng Gemini AI</strong> để tự động bổ sung Pinyin, cấp độ HSK, câu ví dụ và mẹo nhớ chiết tự.
              </p>
            </div>
          </div>

          <form id="customFlashcardStudioForm" onsubmit="event.preventDefault(); App.submitStudioFlashcard();" class="space-y-4">
            <!-- Row 1: Hanzi & AI Autofill Button -->
            <div>
              <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                Chữ Hán hoặc Từ Vựng Muốn Học (*) :
              </label>
              <div class="flex gap-2">
                <input
                  type="text"
                  id="studioHanziInput"
                  placeholder="VD: 克服, 坚持, 潜移默化..."
                  required
                  class="flex-1 p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-base font-hanzi font-bold focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  id="studioAiFillBtn"
                  onclick="App.handleStudioAiAutoFill()"
                  class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition whitespace-nowrap"
                >
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                  <span>Điền Bằng Gemini AI</span>
                </button>
              </div>
            </div>

            <!-- Row 2: Deck & HSK Level -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                  Chọn Bộ Thẻ (Deck) :
                </label>
                <div class="flex gap-2">
                  <select id="studioDeckSelect" class="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold">
                    ${decks.map((d) => `<option value="${d}">${d}</option>`).join("")}
                  </select>
                  <button type="button" onclick="App.promptCreateNewDeck()" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold" title="Tạo bộ thẻ mới">
                    + Bộ Mới
                  </button>
                </div>
              </div>

              <div>
                <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                  Cấp Độ HSK :
                </label>
                <select id="studioHskSelect" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold">
                  <option value="1">HSK 1 (Sơ cấp)</option>
                  <option value="2">HSK 2 (Sơ cấp)</option>
                  <option value="3" selected>HSK 3 (Trung cấp sơ)</option>
                  <option value="4">HSK 4 (Trung cấp)</option>
                  <option value="5">HSK 5 (Cao cấp)</option>
                  <option value="6">HSK 6 (Thành thạo)</option>
                </select>
              </div>
            </div>

            <!-- Row 3: Pinyin & Meaning -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                  Phiên Âm Pinyin (Kèm dấu thanh) :
                </label>
                <input
                  type="text"
                  id="studioPinyinInput"
                  placeholder="VD: kè fú"
                  class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                  Nghĩa Tiếng Việt (*) :
                </label>
                <input
                  type="text"
                  id="studioMeaningInput"
                  placeholder="VD: Khắc phục, vượt qua khó khăn"
                  required
                  class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold"
                />
              </div>
            </div>

            <!-- Row 4: Example Sentence & Translation -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-xs text-slate-700 dark:text-slate-300">
                    Câu Ví Dụ Chữ Hán :
                  </label>
                  <button type="button" onclick="AudioService.speak(document.getElementById('studioExampleInput')?.value || '')" class="text-[11px] text-red-600 hover:underline flex items-center gap-1">
                    <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe thử
                  </button>
                </div>
                <input
                  type="text"
                  id="studioExampleInput"
                  placeholder="VD: 我们要努力克服一切困难。"
                  class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-hanzi"
                />
              </div>

              <div>
                <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                  Dịch Nghĩa Câu Ví Dụ :
                </label>
                <input
                  type="text"
                  id="studioExampleViInput"
                  placeholder="VD: Chúng ta cần nỗ lực khắc phục mọi khó khăn."
                  class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs"
                />
              </div>
            </div>

            <!-- Row 5: Notes & Mnemonics (Chiết tự) -->
            <div>
              <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                Ghi Chú Cá Nhân & Mẹo Nhớ Chiết Tự (Mnemonics) :
              </label>
              <input
                type="text"
                id="studioNotesInput"
                placeholder="VD: Chữ 克 (khắc) gồm bộ Thập 十 và Huynh 兄..."
                class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs"
              />
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onclick="AudioService.speak(document.getElementById('studioHanziInput')?.value || '你好')"
                class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5 transition"
              >
                <i data-lucide="volume-2" class="w-4 h-4 text-red-600"></i> Nghe Thử Từ Vựng
              </button>

              <div class="flex items-center gap-2">
                <button
                  type="reset"
                  class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
                >
                  Nhập Lại
                </button>
                <button
                  type="submit"
                  class="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <i data-lucide="save" class="w-4 h-4"></i> Lưu Flashcard Vào Bộ Thẻ
                </button>
              </div>
            </div>
          </form>
        </div>
      `;
    },

    promptCreateNewDeck() {
      const name = prompt("Nhập tên bộ thẻ mới của bạn (Ví dụ: Từ vựng Du lịch, Giao tiếp công ty...):");
      if (name && name.trim()) {
        window.StorageService.saveDeck(name.trim());
        this.renderCurrentFlashcardTab();
        this.showToast(`Đã tạo bộ thẻ "${name.trim()}"!`, "success");
      }
    },

    async handleStudioAiAutoFill() {
      const hanzi = document.getElementById("studioHanziInput")?.value?.trim();
      const btn = document.getElementById("studioAiFillBtn");
      if (!hanzi) {
        this.showToast("Vui lòng nhập chữ Hán trước!", "warning");
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang phân tích...`;
        this.refreshIcons();
      }

      try {
        const res = await window.GeminiService.autoFillFlashcardAI(hanzi);
        if (document.getElementById("studioPinyinInput")) document.getElementById("studioPinyinInput").value = res.pinyin || "";
        if (document.getElementById("studioMeaningInput")) document.getElementById("studioMeaningInput").value = res.meaning || "";
        if (document.getElementById("studioHskSelect") && res.hsk) document.getElementById("studioHskSelect").value = res.hsk;
        if (document.getElementById("studioExampleInput")) document.getElementById("studioExampleInput").value = res.exampleZh || "";
        if (document.getElementById("studioExampleViInput")) document.getElementById("studioExampleViInput").value = res.exampleVi || "";
        if (document.getElementById("studioNotesInput")) document.getElementById("studioNotesInput").value = res.notes || "";

        // Speak word
        window.AudioService.speak(hanzi);
        this.showToast(`Gemini AI đã hoàn tất thông tin cho "${hanzi}"!`, "success");
      } catch (err) {
        this.showToast("Lỗi tự động điền AI: " + err.message, "error");
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i> Điền Bằng Gemini AI`;
          this.refreshIcons();
        }
      }
    },

    submitStudioFlashcard() {
      const hanzi = document.getElementById("studioHanziInput")?.value?.trim();
      const pinyin = document.getElementById("studioPinyinInput")?.value?.trim();
      const meaning = document.getElementById("studioMeaningInput")?.value?.trim();
      const deck = document.getElementById("studioDeckSelect")?.value || "Bộ mặc định";
      const hsk = parseInt(document.getElementById("studioHskSelect")?.value) || 3;
      const example = document.getElementById("studioExampleInput")?.value?.trim();
      const exampleVi = document.getElementById("studioExampleViInput")?.value?.trim();
      const notes = document.getElementById("studioNotesInput")?.value?.trim();

      if (!hanzi || !meaning) {
        this.showToast("Vui lòng nhập đầy đủ chữ Hán và nghĩa!", "warning");
        return;
      }

      window.StorageService.saveFlashcard({
        hanzi,
        pinyin: pinyin || "pīn yīn",
        meaning,
        deck,
        hsk,
        example,
        exampleVi,
        notes,
        status: "learning"
      });

      window.StorageService.incrementStat("wordsLearnedToday", 1);
      this.updateHeaderProgress();
      this.showToast(`Đã thêm thành công thẻ "${hanzi}" vào "${deck}"!`, "success");

      // Switch to practice or library
      this.switchFlashcardTab("practice");
    },

    // 2.5 AI Book Page Scanner View
    renderFlashcardScanView(container) {
      const decks = window.StorageService.getDecks();
      const state = this.scannerState;

      container.innerHTML = `
        <div class="space-y-6">
          <!-- Banner Intro -->
          <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div class="absolute -right-6 -bottom-8 opacity-10 font-hanzi font-black text-9xl pointer-events-none">
              书页
            </div>
            <div class="relative z-10 max-w-2xl">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
                <i data-lucide="scan-line" class="w-3.5 h-3.5 text-emerald-200"></i>
                Gemini 2.5 Flash Vision OCR
              </span>
              <h3 class="text-2xl md:text-3xl font-extrabold mb-2">
                Quét Từ Vựng Trong Trang Sách Bằng AI
              </h3>
              <p class="text-white/80 text-xs md:text-sm leading-relaxed mb-4">
                Chụp hoặc tải lên một trang sách giáo trình tiếng Trung. Trí tuệ nhân tạo sẽ tự động nhận diện mặt chữ, bóc tách các từ vựng cốt lõi, phiên âm Pinyin, nghĩa và câu ví dụ để lưu trực tiếp vào Flashcard của bạn.
              </p>
            </div>
          </div>

          <!-- Upload / Camera Station -->
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-sm space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- Left 1/3: Configuration & Trigger Actions -->
              <div class="space-y-4">
                <h4 class="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <i data-lucide="settings-2" class="w-4 h-4 text-emerald-600"></i> Tùy chọn lưu trữ
                </h4>

                <div>
                  <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                    Lưu vào Bộ Thẻ (Deck) :
                  </label>
                  <div class="flex gap-2">
                    <select id="scanTargetDeckSelect" class="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold">
                      ${decks.map((d) => `<option value="${d}">${d}</option>`).join("")}
                    </select>
                    <button type="button" onclick="App.promptCreateNewDeck()" class="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200" title="Tạo bộ thẻ mới">
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">
                    Ghi chú / Yêu cầu thêm (Tùy chọn) :
                  </label>
                  <input
                    type="text"
                    id="scanCustomPromptInput"
                    placeholder="VD: Chỉ quét từ HSK 3 trở lên, hoặc từ khó..."
                    class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-xs"
                  />
                </div>

                <!-- Input Action Buttons -->
                <div class="space-y-2 pt-2">
                  <label class="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm">
                    <i data-lucide="image" class="w-4 h-4 text-emerald-600"></i>
                    <span>Tải Ảnh Từ Máy Tính / Điện Thoại</span>
                    <input type="file" id="bookScanFileInput" accept="image/*" onchange="App.handleBookScanImageUpload(event)" class="hidden" />
                  </label>

                  <label class="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm">
                    <i data-lucide="camera" class="w-4 h-4 text-cyan-600"></i>
                    <span>Chụp Ảnh Trực Tiếp Bằng Camera</span>
                    <input type="file" id="bookScanCameraInput" accept="image/*" capture="environment" onchange="App.handleBookScanImageUpload(event)" class="hidden" />
                  </label>

                  <button
                    type="button"
                    onclick="App.loadSampleBookPageDemo()"
                    class="w-full py-2.5 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-2 transition border border-amber-200 dark:border-amber-900/40"
                  >
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                    <span>Dùng Ảnh Mẫu Trang Sách HSK</span>
                  </button>
                </div>
              </div>

              <!-- Right 2/3: Image Preview Box & Scanner Ray -->
              <div class="md:col-span-2 flex flex-col justify-between">
                <div class="relative w-full min-h-[280px] max-h-[380px] rounded-2xl border-2 border-dashed ${state.imagePreviewUrl ? "border-emerald-500 bg-slate-900" : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-750"} flex items-center justify-center overflow-hidden">
                  
                  ${state.imagePreviewUrl ? `
                    <img
                      src="${state.imagePreviewUrl}"
                      alt="Trang sách đã chọn"
                      class="w-full h-full object-contain max-h-[380px]"
                    />
                    ${state.isScanning ? `
                      <!-- Laser Scanning Line -->
                      <div class="laser-scanner-line"></div>
                      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-900/90 text-white font-bold text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md">
                        <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-emerald-400"></i>
                        <span>AI đang đọc quét chữ Hán trong trang sách...</span>
                      </div>
                    ` : `
                      <button
                        onclick="App.clearBookScanImage()"
                        class="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 transition"
                        title="Xóa ảnh chọn lại"
                      >
                        <i data-lucide="x" class="w-4 h-4"></i>
                      </button>
                    `}
                  ` : `
                    <div class="text-center p-6 space-y-2">
                      <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                        <i data-lucide="file-text" class="w-8 h-8"></i>
                      </div>
                      <h4 class="font-bold text-sm text-slate-800 dark:text-white">Chưa có ảnh trang sách nào được chọn</h4>
                      <p class="text-xs text-slate-400 max-w-sm mx-auto">
                        Hãy tải ảnh lên, chụp từ camera, hoặc bấm nút <strong>"Dùng Ảnh Mẫu Trang Sách HSK"</strong> bên trái để trải nghiệm ngay.
                      </p>
                    </div>
                  `}
                </div>

                <!-- Primary Trigger Button -->
                <div class="pt-4 flex items-center justify-end">
                  <button
                    id="startScanBtn"
                    onclick="App.startAiBookScan()"
                    ${!state.imagePreviewUrl || state.isScanning ? "disabled" : ""}
                    class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2"
                  >
                    <i data-lucide="scan" class="w-4 h-4"></i>
                    <span>Bắt Đầu AI Quét Từ Vựng & Tạo Flashcard</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Scanned Results Review Section -->
          <div id="scannedResultsSection">
            ${this.renderScannedResultsHtml()}
          </div>
        </div>
      `;
    },

    handleBookScanImageUpload(event) {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const fullBase64 = e.target.result;
        // Extract raw base64 data without prefix (data:image/jpeg;base64,...)
        const commaIndex = fullBase64.indexOf(",");
        const rawBase64 = commaIndex >= 0 ? fullBase64.substring(commaIndex + 1) : fullBase64;

        this.scannerState.imageBase64 = rawBase64;
        this.scannerState.mimeType = file.type || "image/jpeg";
        this.scannerState.imagePreviewUrl = fullBase64;
        this.scannerState.scannedCards = [];
        this.scannerState.selectedIndexes = new Set();

        this.renderCurrentFlashcardTab();
        this.showToast("Đã tải ảnh trang sách thành công! Bấm nút quét để phân tích.", "info");
      };
      reader.readAsDataURL(file);
    },

    clearBookScanImage() {
      this.scannerState.imageBase64 = null;
      this.scannerState.imagePreviewUrl = null;
      this.scannerState.scannedCards = [];
      this.scannerState.selectedIndexes = new Set();
      this.renderCurrentFlashcardTab();
    },

    loadSampleBookPageDemo() {
      // High resolution Chinese textbook page demo illustration (SVG / Canvas DataURL)
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");

      // Draw textbook background
      ctx.fillStyle = "#faf6ed";
      ctx.fillRect(0, 0, 800, 1000);

      // Book border & header
      ctx.fillStyle = "#991b1b";
      ctx.fillRect(40, 40, 720, 8);

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 34px sans-serif";
      ctx.fillText("第十二课：在图书馆阅读与学习", 50, 100);

      ctx.font = "20px monospace";
      ctx.fillStyle = "#dc2626";
      ctx.fillText("Dì shí'èr kè: Zài túshūguǎn yuèdú yǔ xuéxí", 50, 135);

      // Paragraph lines
      ctx.fillStyle = "#334155";
      ctx.font = "24px sans-serif";
      ctx.fillText("每天下午，很多留学生都会来到大学图书馆。", 50, 200);
      ctx.fillText("坚持阅读中文课文和报刊，不仅能加深对语法", 50, 250);
      ctx.fillText("结构的理解，还能在潜移默化中积累丰富的词汇。", 50, 300);
      ctx.fillText("遇到不懂的生词时，要善于掌握部首查字法。", 50, 350);
      ctx.fillText("只要持之以恒，你一定能说一口流利的汉语。", 50, 400);

      // Vocabulary Box at bottom
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 470, 700, 470);

      ctx.fillStyle = "#b91c1c";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("【 生词表 / Từ Mới Cần Nhớ 】", 70, 520);

      const words = [
        "1. 阅读 (yuèdú) : Đọc hiểu, đọc sách",
        "2. 理解 (lǐjiě) : Lĩnh hội, thấu hiểu",
        "3. 词汇 (cíhuì) : Từ vựng, vốn từ",
        "4. 掌握 (zhǎngwò) : Nắm vững, làm chủ",
        "5. 流利 (liúlì) : Lưu loát, trôi chảy",
        "6. 积累 (jīlěi) : Tích lũy dồn lại"
      ];

      ctx.fillStyle = "#1e293b";
      ctx.font = "22px sans-serif";
      words.forEach((w, i) => {
        ctx.fillText(w, 70, 580 + i * 55);
      });

      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const rawBase64 = dataUrl.substring(dataUrl.indexOf(",") + 1);

      this.scannerState.imageBase64 = rawBase64;
      this.scannerState.mimeType = "image/jpeg";
      this.scannerState.imagePreviewUrl = dataUrl;
      this.scannerState.scannedCards = [];
      this.scannerState.selectedIndexes = new Set();

      this.renderCurrentFlashcardTab();
      this.showToast("Đã nạp trang sách mẫu tiếng Trung! Bấm nút để AI bắt đầu quét.", "success");
    },

    async startAiBookScan() {
      if (!this.scannerState.imageBase64) {
        this.showToast("Vui lòng tải hoặc chụp ảnh trang sách trước!", "warning");
        return;
      }

      this.scannerState.isScanning = true;
      this.renderCurrentFlashcardTab();

      const customPrompt = document.getElementById("scanCustomPromptInput")?.value?.trim() || "";

      try {
        const results = await window.GeminiService.scanBookPageAI(
          this.scannerState.imageBase64,
          this.scannerState.mimeType,
          customPrompt
        );

        if (!Array.isArray(results) || results.length === 0) {
          throw new Error("Không nhận diện được từ vựng tiếng Trung rõ ràng trong trang sách này. Vui lòng thử ảnh rõ nét hơn.");
        }

        this.scannerState.scannedCards = results;
        // Select all by default
        this.scannerState.selectedIndexes = new Set(results.map((_, i) => i));
        this.showToast(`Quét thành công! Đã phát hiện ${results.length} từ vựng trong trang sách.`, "success");
      } catch (err) {
        this.showToast(`Lỗi quét trang sách: ${err.message}`, "error");
      } finally {
        this.scannerState.isScanning = false;
        this.renderCurrentFlashcardTab();
      }
    },

    renderScannedResultsHtml() {
      const { scannedCards, selectedIndexes } = this.scannerState;
      if (!scannedCards || scannedCards.length === 0) return "";

      const selectedCount = selectedIndexes.size;
      const targetDeck = document.getElementById("scanTargetDeckSelect")?.value || "Bộ mặc định";

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-sm space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h4 class="font-extrabold text-base text-slate-800 dark:text-white">
                  Danh Sách Từ Vựng Quét Được Từ Trang Sách (${scannedCards.length} từ)
                </h4>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">
                Đánh dấu các từ bạn muốn lưu vào bộ Flashcard <strong>${targetDeck}</strong>.
              </p>
            </div>

            <!-- Bulk Select Actions -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                onclick="App.toggleSelectAllScanCards(true)"
                class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
              >
                Chọn tất cả
              </button>
              <button
                type="button"
                onclick="App.toggleSelectAllScanCards(false)"
                class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
              >
                Bỏ chọn
              </button>
            </div>
          </div>

          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${scannedCards
              .map((card, idx) => {
                const isChecked = selectedIndexes.has(idx);
                return `
                <div
                  onclick="App.toggleScanCardSelection(${idx})"
                  class="p-4 rounded-2xl border-2 ${isChecked ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 opacity-60"} cursor-pointer transition flex items-start gap-3 relative select-none"
                >
                  <input
                    type="checkbox"
                    ${isChecked ? "checked" : ""}
                    onclick="event.stopPropagation(); App.toggleScanCardSelection(${idx})"
                    class="mt-1 w-4 h-4 text-emerald-600 rounded accent-emerald-600 cursor-pointer"
                  />
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <div class="flex items-baseline gap-2">
                        <span class="font-hanzi font-bold text-2xl text-slate-900 dark:text-white">${card.hanzi}</span>
                        <span class="font-mono text-xs font-bold text-red-600 dark:text-red-400">${card.pinyin}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span class="px-1.5 py-0.2 rounded font-bold text-[10px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">HSK ${card.hsk || 3}</span>
                        <button
                          type="button"
                          onclick="event.stopPropagation(); AudioService.speak('${card.hanzi}')"
                          class="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600"
                          title="Nghe phát âm"
                        >
                          <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>

                    <div class="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      ${card.meaning}
                    </div>

                    ${card.exampleZh ? `
                      <div class="p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                        <div class="font-hanzi font-medium text-slate-800 dark:text-slate-200">${card.exampleZh}</div>
                        <div class="italic text-[10px] text-slate-400">${card.exampleVi || ""}</div>
                      </div>
                    ` : ""}

                    ${card.notes ? `
                      <div class="text-[10px] text-amber-700 dark:text-amber-400 flex items-center gap-1">
                        <i data-lucide="lightbulb" class="w-3 h-3"></i> ${card.notes}
                      </div>
                    ` : ""}
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>

          <!-- Final Save Button -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <span class="text-xs font-bold text-slate-500">
              Đã chọn: <span class="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold">${selectedCount}</span> / ${scannedCards.length} từ
            </span>

            <button
              type="button"
              onclick="App.saveBatchScannedFlashcards()"
              ${selectedCount === 0 ? "disabled" : ""}
              class="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
            >
              <i data-lucide="bookmark-check" class="w-4 h-4"></i>
              <span>Thêm ${selectedCount} Từ Này Vào Flashcard Ngay</span>
            </button>
          </div>
        </div>
      `;
    },

    toggleScanCardSelection(index) {
      if (this.scannerState.selectedIndexes.has(index)) {
        this.scannerState.selectedIndexes.delete(index);
      } else {
        this.scannerState.selectedIndexes.add(index);
      }
      const section = document.getElementById("scannedResultsSection");
      if (section) section.innerHTML = this.renderScannedResultsHtml();
      this.refreshIcons();
    },

    toggleSelectAllScanCards(selectAll) {
      if (selectAll) {
        this.scannerState.selectedIndexes = new Set(this.scannerState.scannedCards.map((_, i) => i));
      } else {
        this.scannerState.selectedIndexes.clear();
      }
      const section = document.getElementById("scannedResultsSection");
      if (section) section.innerHTML = this.renderScannedResultsHtml();
      this.refreshIcons();
    },

    saveBatchScannedFlashcards() {
      const { scannedCards, selectedIndexes } = this.scannerState;
      const targetDeck = document.getElementById("scanTargetDeckSelect")?.value || "Bộ mặc định";

      let addedCount = 0;
      selectedIndexes.forEach((idx) => {
        const item = scannedCards[idx];
        if (item && item.hanzi) {
          window.StorageService.saveFlashcard({
            hanzi: item.hanzi,
            pinyin: item.pinyin || "pīn yīn",
            meaning: item.meaning || "Từ quét từ sách",
            deck: targetDeck,
            hsk: item.hsk || 3,
            example: item.exampleZh || "",
            exampleVi: item.exampleVi || "",
            notes: item.notes || "Trích xuất từ trang sách qua Gemini OCR",
            status: "learning"
          });
          addedCount++;
        }
      });

      window.StorageService.incrementStat("wordsLearnedToday", addedCount);
      this.updateHeaderProgress();
      this.showToast(`Tuyệt vời! Đã thêm thành công ${addedCount} từ vựng vào bộ "${targetDeck}"!`, "success");

      // Set current deck filter to targetDeck and switch to practice 3D view
      this.selectedDeck = targetDeck;
      this.flashcardIndex = 0;
      this.switchFlashcardTab("practice");
    },

    // 3. Flashcard Manage View (CRUD, Search, Export/Import)
    renderFlashcardManageView(container) {
      this.flashcards = window.StorageService.getFlashcards();
      const decks = window.StorageService.getDecks();

      container.innerHTML = `
        <div class="space-y-6">
          <!-- Top Management Action Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <!-- Search input -->
            <div class="relative flex-1 min-w-[240px]">
              <input
                type="text"
                id="manageSearchInput"
                oninput="App.filterManageTable()"
                placeholder="Tìm kiếm theo chữ Hán, Pinyin hoặc nghĩa..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-xs text-slate-800 dark:text-white"
              />
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap items-center gap-2">
              <button onclick="App.exportFlashcardsJson()" class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition">
                <i data-lucide="download" class="w-3.5 h-3.5"></i> Xuất JSON
              </button>
              <label class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer">
                <i data-lucide="upload" class="w-3.5 h-3.5"></i> Nhập JSON
                <input type="file" id="fcImportFileInput" accept=".json" onchange="App.handleImportFlashcards(event)" class="hidden" />
              </label>
              <button onclick="App.switchFlashcardTab('create')" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tạo Thẻ Mới
              </button>
            </div>
          </div>

          <!-- Cards Table / Grid -->
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead class="bg-slate-50 dark:bg-slate-750 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th class="p-4">Chữ Hán</th>
                    <th class="p-4">Phiên Âm</th>
                    <th class="p-4">Nghĩa Tiếng Việt</th>
                    <th class="p-4">Bộ Thẻ / Cấp Độ</th>
                    <th class="p-4">Trạng Thái</th>
                    <th class="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody id="manageCardsTbody" class="divide-y divide-slate-100 dark:divide-slate-700">
                  ${this.renderManageCardsRows(this.flashcards)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    renderManageCardsRows(cards) {
      if (cards.length === 0) {
        return `
          <tr>
            <td colspan="6" class="p-8 text-center text-slate-400 text-xs">
              Chưa có thẻ nào trong danh sách.
            </td>
          </tr>
        `;
      }

      return cards
        .map((card) => {
          let statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">Đang học</span>`;
          if (card.status === "forgot") {
            statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">Cần ôn gấp</span>`;
          } else if (card.status === "mastered") {
            statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Đã thuộc</span>`;
          }

          return `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-750 transition">
            <td class="p-4">
              <div class="flex items-center gap-2.5">
                <span class="font-hanzi font-bold text-xl text-slate-900 dark:text-white">${card.hanzi}</span>
                <button onclick="AudioService.speak('${card.hanzi}')" class="p-1 rounded-lg text-slate-400 hover:text-red-600 transition" title="Nghe phát âm">
                  <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
            <td class="p-4 font-mono font-semibold text-red-600 dark:text-red-400">${card.pinyin || ""}</td>
            <td class="p-4 font-medium text-slate-800 dark:text-slate-200 max-w-xs">${card.meaning || ""}</td>
            <td class="p-4">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[11px] font-medium">${card.deck || "Bộ mặc định"}</span>
                <span class="px-1.5 py-0.5 rounded font-bold text-[10px] bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">HSK ${card.hsk || 1}</span>
              </div>
            </td>
            <td class="p-4">${statusBadge}</td>
            <td class="p-4 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button onclick="App.openEditFlashcardModal('${card.id}')" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 transition" title="Chỉnh sửa">
                  <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
                <button onclick="App.deleteCustomFlashcard('${card.id}')" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 transition" title="Xóa thẻ">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
        })
        .join("");
    },

    filterManageTable() {
      const q = document.getElementById("manageSearchInput")?.value?.toLowerCase()?.trim() || "";
      const tbody = document.getElementById("manageCardsTbody");
      if (!tbody) return;

      const filtered = this.flashcards.filter(
        (c) =>
          c.hanzi.toLowerCase().includes(q) ||
          (c.pinyin && c.pinyin.toLowerCase().includes(q)) ||
          (c.meaning && c.meaning.toLowerCase().includes(q))
      );
      tbody.innerHTML = this.renderManageCardsRows(filtered);
      this.refreshIcons();
    },

    deleteCustomFlashcard(id) {
      if (confirm("Bạn có chắc chắn muốn xóa flashcard này khỏi bộ sưu tập?")) {
        window.StorageService.deleteFlashcard(id);
        this.flashcards = window.StorageService.getFlashcards();
        this.showToast("Đã xóa thẻ thành công!", "info");
        this.renderCurrentFlashcardTab();
      }
    },

    openEditFlashcardModal(id) {
      const card = this.flashcards.find((c) => c.id === id);
      if (!card) return;

      const decks = window.StorageService.getDecks();

      const html = `
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="pencil" class="w-5 h-5 text-amber-500"></i>
              Chỉnh Sửa Flashcard: ${card.hanzi}
            </h3>
            <button onclick="App.closeModal()" class="text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chữ Hán (*):</label>
              <input type="text" id="editFcHanzi" value="${card.hanzi}" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-hanzi font-bold text-sm" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bộ Thẻ:</label>
                <select id="editFcDeck" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold">
                  ${decks.map((d) => `<option value="${d}" ${card.deck === d ? "selected" : ""}>${d}</option>`).join("")}
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cấp độ HSK:</label>
                <select id="editFcHsk" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold">
                  ${[1, 2, 3, 4, 5, 6].map((l) => `<option value="${l}" ${card.hsk === l ? "selected" : ""}>HSK ${l}</option>`).join("")}
                </select>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phiên âm Pinyin:</label>
              <input type="text" id="editFcPinyin" value="${card.pinyin || ""}" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-mono" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nghĩa tiếng Việt (*):</label>
              <input type="text" id="editFcMeaning" value="${card.meaning || ""}" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ví dụ chữ Hán:</label>
              <input type="text" id="editFcExample" value="${card.example || ""}" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-hanzi" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dịch nghĩa câu ví dụ:</label>
              <input type="text" id="editFcExampleVi" value="${card.exampleVi || ""}" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mẹo nhớ / Ghi chú:</label>
              <input type="text" id="editFcNotes" value="${card.notes || ""}" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white" />
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <button onclick="App.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">Hủy</button>
            <button onclick="App.saveEditedFlashcard('${card.id}')" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md">
              Cập Nhật Thẻ
            </button>
          </div>
        </div>
      `;
      this.openModal(html);
    },

    saveEditedFlashcard(id) {
      const hanzi = document.getElementById("editFcHanzi")?.value?.trim();
      const pinyin = document.getElementById("editFcPinyin")?.value?.trim();
      const meaning = document.getElementById("editFcMeaning")?.value?.trim();
      const deck = document.getElementById("editFcDeck")?.value;
      const hsk = parseInt(document.getElementById("editFcHsk")?.value) || 3;
      const example = document.getElementById("editFcExample")?.value?.trim();
      const exampleVi = document.getElementById("editFcExampleVi")?.value?.trim();
      const notes = document.getElementById("editFcNotes")?.value?.trim();

      if (!hanzi || !meaning) {
        this.showToast("Chữ Hán và nghĩa không được để trống!", "warning");
        return;
      }

      window.StorageService.saveFlashcard({
        id,
        hanzi,
        pinyin,
        meaning,
        deck,
        hsk,
        example,
        exampleVi,
        notes
      });

      this.closeModal();
      this.showToast(`Đã cập nhật flashcard "${hanzi}"!`, "success");
      this.renderCurrentFlashcardTab();
    },

    exportFlashcardsJson() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.flashcards, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `chinese_flashcards_${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      this.showToast("Đã tải xuống tệp dữ liệu bộ thẻ thành công!", "success");
    },

    handleImportFlashcards(event) {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            window.StorageService.importFlashcards(imported);
            this.showToast(`Đã nhập thành công ${imported.length} thẻ flashcard!`, "success");
            this.renderCurrentFlashcardTab();
          } else {
            this.showToast("Định dạng file JSON không hợp lệ!", "error");
          }
        } catch (err) {
          this.showToast("Lỗi đọc file JSON: " + err.message, "error");
        }
      };
      reader.readAsText(file);
    },

    flipFlashcard() {
      this.isCardFlipped = !this.isCardFlipped;
      const inner = document.getElementById("flashcardInner");
      if (inner) {
        if (this.isCardFlipped) inner.classList.add("rotate-y-180");
        else inner.classList.remove("rotate-y-180");
      }
    },

    nextFlashcard() {
      if (this.flashcards.length === 0) return;
      this.isCardFlipped = false;
      this.flashcardIndex = (this.flashcardIndex + 1) % this.flashcards.length;
      this.renderCurrentFlashcardTab();
    },

    prevFlashcard() {
      if (this.flashcards.length === 0) return;
      this.isCardFlipped = false;
      this.flashcardIndex = (this.flashcardIndex - 1 + this.flashcards.length) % this.flashcards.length;
      this.renderCurrentFlashcardTab();
    },

    rateFlashcard(cardId, status) {
      window.StorageService.updateFlashcardStatus(cardId, status);
      const card = this.flashcards.find((c) => c.id === cardId);

      if (status === "forgot" && card) {
        // Automatically put into penalty box!
        window.StorageService.addPenaltyWord(card);
        this.updateHeaderProgress();
        this.showToast(`Đã đưa "${card.hanzi}" vào Hộp Phạt để bắt buộc ôn lại 3 lần!`, "warning");
      } else if (status === "mastered") {
        window.StorageService.incrementStat("wordsLearnedToday", 1);
        this.updateHeaderProgress();
        this.showToast("Tuyệt vời! Ghi nhận từ đã thuộc.", "success");
      } else {
        this.showToast("Đã lưu trạng thái ôn tập.", "info");
      }

      this.nextFlashcard();
    },

    /* =====================================================================
       MODULE 7: SCHEDULE & REMINDERS
       ===================================================================== */
    renderPlanner(container) {
      this.goals = window.StorageService.getGoals();

      container.innerHTML = `
        <div class="space-y-6 max-w-4xl mx-auto">
          <div class="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="calendar-clock" class="w-6 h-6 text-red-600"></i>
              Lịch Trình & Hệ Thống Nhắc Nhở Học Tập
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Thiết lập mục tiêu từ vựng mỗi ngày, chuỗi ngày học (Streak) và bật thông báo ôn tập.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Goal Settings Form -->
            <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <h3 class="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                <i data-lucide="target" class="w-4 h-4 text-red-500"></i> Thiết lập mục tiêu hàng ngày
              </h3>

              <div class="space-y-3 text-xs">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Số lượng từ vựng mới mỗi ngày (từ/ngày):
                  </label>
                  <input
                    type="number"
                    id="plannerWordsTarget"
                    value="${this.goals.dailyWordsTarget || 10}"
                    min="3"
                    max="50"
                    class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Số lượng câu thành ngữ/tục ngữ mỗi ngày (câu/ngày):
                  </label>
                  <input
                    type="number"
                    id="plannerChengyuTarget"
                    value="${this.goals.dailyChengyuTarget || 2}"
                    min="1"
                    max="10"
                    class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                  />
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ nhắc:</label>
                    <input
                      type="number"
                      id="plannerReminderHour"
                      value="${this.goals.reminderHour || 20}"
                      min="0"
                      max="23"
                      class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phút nhắc:</label>
                    <input
                      type="number"
                      id="plannerReminderMinute"
                      value="${this.goals.reminderMinute || 30}"
                      min="0"
                      max="59"
                      class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <button onclick="App.savePlannerGoals()" class="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition">
                Lưu Cấu Hình Mục Tiêu
              </button>
            </div>

            <!-- Notifications & Streak Banner -->
            <div class="space-y-6">
              <!-- Streak Box -->
              <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-3xl shadow-md">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase font-bold tracking-wider text-amber-100">Chuỗi chuyên cần</span>
                  <i data-lucide="flame" class="w-6 h-6 fill-white"></i>
                </div>
                <div class="text-4xl font-black mb-1">${this.stats.streak || 1} Ngày Liên Tiếp</div>
                <p class="text-xs text-amber-100 leading-relaxed">
                  Học đều đặn mỗi ngày giúp duy trì phản xạ và chuyển từ vựng vào trí nhớ dài hạn.
                </p>
              </div>

              <!-- Browser Notification Trigger -->
              <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <h4 class="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <i data-lucide="bell" class="w-4 h-4 text-amber-500"></i> Thông Báo Trình Duyệt (Browser Notification)
                </h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Nhận nhắc nhở ôn từ vựng nợ phạt ngay cả khi bạn đang mở tab khác trên máy tính.
                </p>
                <div class="flex flex-wrap gap-2 pt-1">
                  <button onclick="App.requestBrowserNotification()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold text-xs text-slate-700 dark:text-slate-200">
                    Kích hoạt quyền thông báo
                  </button>
                  <button onclick="App.sendTestNotification()" class="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 font-bold text-xs text-amber-700 dark:text-amber-400">
                    Bắn thử thông báo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    savePlannerGoals() {
      const dailyWordsTarget = parseInt(document.getElementById("plannerWordsTarget").value) || 10;
      const dailyChengyuTarget = parseInt(document.getElementById("plannerChengyuTarget").value) || 2;
      const reminderHour = parseInt(document.getElementById("plannerReminderHour").value) || 20;
      const reminderMinute = parseInt(document.getElementById("plannerReminderMinute").value) || 30;

      this.goals = window.StorageService.saveGoals({
        dailyWordsTarget,
        dailyChengyuTarget,
        reminderHour,
        reminderMinute
      });

      this.updateHeaderProgress();
      this.showToast("Đã lưu mục tiêu học tập thành công!", "success");
    },

    requestBrowserNotification() {
      if (!("Notification" in window)) {
        this.showToast("Trình duyệt này không hỗ trợ Notification API.", "warning");
        return;
      }
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          this.showToast("Đã cấp quyền thông báo thành công!", "success");
        } else {
          this.showToast("Quyền thông báo bị từ chối.", "warning");
        }
      });
    },

    sendTestNotification() {
      if (!("Notification" in window) || Notification.permission !== "granted") {
        this.showToast("Vui lòng kích hoạt quyền thông báo trước!", "warning");
        return;
      }
      new Notification("华语星 - Đã Đến Giờ Ôn Tập Tiếng Trung!", {
        body: `Bạn đang có ${this.penaltyWords.length} từ trong Hộp Phạt cần ôn gấp!`,
        icon: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png"
      });
      this.showToast("Đã gửi thông báo kiểm tra!", "info");
    },

    /* =====================================================================
       MODULE 8: SETTINGS & GEMINI API
       ===================================================================== */
    renderSettings(container) {
      this.settings = window.StorageService.getSettings();

      container.innerHTML = `
        <div class="space-y-6 max-w-3xl mx-auto">
          <div class="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="settings" class="w-6 h-6 text-red-600"></i>
              Cài Đặt & Cấu Hình Gemini AI
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Quản lý Gemini API Key, giọng đọc Web Speech API và dữ liệu lưu trữ trên trình duyệt.
            </p>
          </div>

          <!-- API Key Box -->
          <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                <i data-lucide="key" class="w-5 h-5 text-amber-500"></i>
                Gemini API Key (Tối ưu phản hồi siêu tốc 1-2s)
              </h3>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Lưu an toàn ở LocalStorage
              </span>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Nhập API Key từ Google AI Studio để kích hoạt tính năng phân tích từ vựng thời gian thực siêu tốc 1-2 giây, giám khảo chấm điểm khẩu ngữ HSKK và tự động sinh đề thi mới.
            </p>

            <div class="space-y-3">
              <div class="relative flex items-center">
                <input
                  type="password"
                  id="settingsApiKeyInput"
                  value="${this.settings.apiKey || ""}"
                  placeholder="AIzaSy..."
                  class="w-full px-4 py-3 pr-24 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-red-500 font-mono"
                />
                <button
                  type="button"
                  id="settingsToggleKeyVisBtn"
                  onclick="App.toggleKeyVisibility()"
                  class="absolute right-3 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Hiện
                </button>
              </div>

              <!-- Model Selector -->
              <div class="space-y-1.5 pt-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300 text-xs">Model Gemini AI sử dụng:</label>
                <select
                  id="settingsModelSelect"
                  onchange="App.handleModelChange(this.value)"
                  class="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-800 dark:text-white font-semibold focus:outline-none focus:border-red-500"
                >
                  <option value="gemini-2.0-flash" ${(!this.settings.model || this.settings.model === "gemini-2.0-flash" || this.settings.model === "gemini-3.8-flash" || this.settings.model === "gemini-2.5-flash" || this.settings.model === "gemini-1.5-flash-8b") ? "selected" : ""}>gemini-2.0-flash (Siêu tốc 1-2s, phản hồi tức thì - Khuyên dùng)</option>
                  <option value="gemini-1.5-flash" ${this.settings.model === "gemini-1.5-flash" ? "selected" : ""}>gemini-1.5-flash (Tốc độ cao, ổn định)</option>
                  <option value="gemini-1.5-pro" ${this.settings.model === "gemini-1.5-pro" ? "selected" : ""}>gemini-1.5-pro (Suy luận sâu)</option>
                </select>
                <p class="text-[11px] text-slate-400">Hệ thống trang bị cơ chế tự động chuyển sang model dự phòng (Fallback) nếu model chính quá tải.</p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="App.saveApiKey()" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
                <i data-lucide="save" class="w-4 h-4"></i> Lưu API Key
              </button>
              <button id="settingsTestApiBtn" onclick="App.testGeminiConnection()" class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition">
                <i data-lucide="wifi" class="w-4 h-4"></i> Kiểm tra kết nối AI
              </button>
            </div>
          </div>

          <!-- Speech & Voice Settings -->
          <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 class="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
              <i data-lucide="volume-2" class="w-5 h-5 text-red-500"></i> Cấu hình phát âm (SpeechSynthesis)
            </h3>

            <div class="space-y-3 text-xs">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Tốc độ phát âm:</label>
                  <span id="speechRateDisplay" class="font-mono text-red-600 font-bold">${this.settings.speechRate || 0.9}x</span>
                </div>
                <input
                  type="range"
                  id="settingsSpeechRate"
                  min="0.6"
                  max="1.3"
                  step="0.05"
                  value="${this.settings.speechRate || 0.9}"
                  oninput="document.getElementById('speechRateDisplay').textContent = this.value + 'x'; App.saveSpeechRate(this.value);"
                  class="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div class="pt-2">
                <button onclick="AudioService.speak('你好，祝您学习愉快！')" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5">
                  <i data-lucide="play" class="w-3.5 h-3.5 text-red-600"></i> Nghe thử giọng phát âm
                </button>
              </div>
            </div>
          </div>

          <!-- Data Reset Box -->
          <div class="bg-red-50/50 dark:bg-red-950/20 p-6 rounded-3xl border border-red-200 dark:border-red-900/40 flex items-center justify-between">
            <div>
              <h4 class="font-bold text-sm text-red-700 dark:text-red-400">Khởi tạo lại dữ liệu mẫu</h4>
              <p class="text-xs text-red-600/80">Xóa trắng tiến độ và đặt lại các danh sách về mặc định.</p>
            </div>
            <button onclick="App.resetAppData()" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm">
              Đặt Lại Tất Cả
            </button>
          </div>
        </div>
      `;
    },

    toggleKeyVisibility() {
      const input = document.getElementById("settingsApiKeyInput");
      const btn = document.getElementById("settingsToggleKeyVisBtn");
      if (input && btn) {
        if (input.type === "password") {
          input.type = "text";
          btn.textContent = "Ẩn";
        } else {
          input.type = "password";
          btn.textContent = "Hiện";
        }
      }
    },

    saveApiKey() {
      const apiKey = document.getElementById("settingsApiKeyInput")?.value?.trim() || "";
      this.settings = window.StorageService.saveSettings({ apiKey });
      this.updateHeaderProgress();
      this.showToast(apiKey ? "Đã lưu Gemini API Key thành công!" : "Đã xóa API Key.", "success");
    },

    handleModelChange(val) {
      this.settings = window.StorageService.saveSettings({ model: val });
      this.showToast(`Đã thiết lập model: ${val}`, "info");
    },

    saveSpeechRate(val) {
      const rate = parseFloat(val) || 0.9;
      this.settings = window.StorageService.saveSettings({ speechRate: rate });
    },

    async testGeminiConnection() {
      const btn = document.getElementById("settingsTestApiBtn");
      const apiKey = document.getElementById("settingsApiKeyInput")?.value?.trim();

      if (!apiKey) {
        this.showToast("Vui lòng nhập API Key trước khi kiểm tra!", "warning");
        return;
      }

      this.settings = window.StorageService.saveSettings({ apiKey });

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang ping...`;
        this.refreshIcons();
      }

      try {
        const text = await window.GeminiService.callGemini("Hãy chào ngắn gọn bằng tiếng Trung (dưới 5 từ).", "", { isJson: false, timeoutMs: 6500 });
        const activeModel = window.GeminiService.lastUsedModel || this.settings.model || "gemini-2.0-flash";
        this.showToast(`Kết nối Gemini (${activeModel}) thành công! Phản hồi: "${text.trim()}"`, "success");
        this.updateHeaderProgress();
      } catch (err) {
        this.showToast(`Kiểm tra thất bại: ${err.message}`, "error");
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="wifi" class="w-4 h-4"></i> Kiểm tra kết nối AI`;
          this.refreshIcons();
        }
      }
    },

    resetAppData() {
      if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học và nợ phạt về mặc định không?")) {
        localStorage.clear();
        this.showToast("Đã thiết lập lại ứng dụng về trạng thái ban đầu!", "info");
        setTimeout(() => window.location.reload(), 600);
      }
    }
  };

  // Expose App to window
  window.App = App;
  App.init();
});
