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

    init() {
      this.applyTheme(this.settings.theme);
      this.bindNavigation();
      this.updateHeaderProgress();
      this.setupGlobalEvents();

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
      const todayWord = window.APP_DATA.vocabList[1]; // '学习'
      const penaltyCount = this.penaltyWords.length;
      const wordsPercent = Math.min(100, Math.round(((this.stats.wordsLearnedToday || 0) / (this.goals.dailyWordsTarget || 10)) * 100));
      const chengyuPercent = Math.min(100, Math.round(((this.stats.chengyuLearnedToday || 0) / (this.goals.dailyChengyuTarget || 2)) * 100));

      container.innerHTML = `
        <div class="space-y-6">
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
                你好！Hôm nay bạn đã sẵn sàng bứt phá HSK chưa?
              </h2>
              <p class="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                Chinh phục Giáo trình Hán Ngữ, chuẩn hóa phát âm HSKK cùng Gemini AI và rèn luyện phản xạ ngôn ngữ siêu tốc.
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
              </div>
            </div>
          </div>
        </div>
      `;
    },

    /* =====================================================================
       MODULE 2: DICTIONARY & SMART LOOKUP (WITH GEMINI AI FALLBACK)
       ===================================================================== */
    renderDictionary(container) {
      container.innerHTML = `
        <div class="space-y-6 max-w-4xl mx-auto">
          <div class="text-center max-w-xl mx-auto">
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <i data-lucide="book-open" class="w-7 h-7 text-red-600"></i>
              Từ Điển & Tra Cứu Thông Minh
            </h2>
            <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tra cứu theo chữ Hán, Pinyin hoặc nghĩa tiếng Việt. Tự động gọi Gemini AI phân tích sâu khi từ chưa có sẵn.
            </p>
          </div>

          <!-- Search Bar -->
          <div class="relative">
            <div class="relative flex items-center">
              <input
                type="text"
                id="dictSearchInput"
                placeholder="Nhập chữ Hán (vd: 坚持), Pinyin (jiān chí) hoặc nghĩa tiếng Việt..."
                class="w-full px-5 py-4 pl-12 pr-32 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-md text-base"
              />
              <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-4"></i>
              <button
                id="dictSearchBtn"
                class="absolute right-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <span>Tra cứu</span>
              </button>
            </div>
          </div>

          <!-- Quick Suggestion Tags -->
          <div class="flex items-center gap-2 flex-wrap text-xs">
            <span class="text-slate-400 font-medium">Gợi ý từ hay:</span>
            ${["你好", "坚持", "解决", "积累", "潜移默化", "精益求精"]
              .map(
                (w) => `
              <button onclick="document.getElementById('dictSearchInput').value='${w}'; App.handleDictSearch('${w}');" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 transition font-hanzi">
                ${w}
              </button>
            `
              )
              .join("")}
          </div>

          <!-- Search Results Container -->
          <div id="dictResultContainer" class="space-y-4">
            <!-- Default initial view: List of featured HSK words -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <i data-lucide="layers" class="w-4 h-4 text-red-500"></i> Từ vựng tiêu biểu trong ngân hàng HSK
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${window.APP_DATA.vocabList.slice(0, 6).map((item) => this.renderSmallWordCard(item)).join("")}
              </div>
            </div>
          </div>
        </div>
      `;

      // Bind search event
      const input = document.getElementById("dictSearchInput");
      const btn = document.getElementById("dictSearchBtn");

      btn.addEventListener("click", () => this.handleDictSearch(input.value));
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.handleDictSearch(input.value);
      });
    },

    renderSmallWordCard(word) {
      return `
        <div onclick="App.handleDictSearch('${word.hanzi}')" class="p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 bg-slate-50/50 dark:bg-slate-750 cursor-pointer transition flex items-center justify-between group">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl tianzige-box flex items-center justify-center font-hanzi font-bold text-2xl text-slate-800 dark:text-white shadow-inner">
              ${word.hanzi}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-red-600 dark:text-red-400 text-sm">${word.pinyin}</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">HSK ${word.hsk}</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">${word.meaning}</p>
            </div>
          </div>
          <i data-lucide="arrow-right" class="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition"></i>
        </div>
      `;
    },

    async handleDictSearch(query) {
      if (!query || !query.trim()) {
        this.showToast("Vui lòng nhập từ cần tra cứu!", "warning");
        return;
      }
      query = query.trim().toLowerCase();
      const resultContainer = document.getElementById("dictResultContainer");
      if (!resultContainer) return;

      // 1. Search in local mock database
      const found = window.APP_DATA.vocabList.filter(
        (w) =>
          w.hanzi.includes(query) ||
          w.pinyin.toLowerCase().includes(query) ||
          w.meaning.toLowerCase().includes(query)
      );

      if (found.length > 0) {
        resultContainer.innerHTML = found.map((w) => this.renderDetailedWordCard(w, "Cơ sở dữ liệu HSK")).join("");
        this.refreshIcons();
        return;
      }

      // 2. Fallback to Gemini AI Lookup
      resultContainer.innerHTML = `
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md text-center">
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center mx-auto mb-3 animate-pulse">
            <i data-lucide="sparkles" class="w-6 h-6"></i>
          </div>
          <h4 class="font-bold text-base text-slate-800 dark:text-white mb-1">
            Đang kích hoạt Gemini AI phân tích từ "${query}"...
          </h4>
          <p class="text-xs text-slate-400">
            Hệ thống đang bóc tách ngữ nghĩa, bộ thủ, phiên âm và ví dụ thực tế.
          </p>
        </div>
      `;
      this.refreshIcons();

      try {
        const aiResult = await window.GeminiService.lookupWordAI(query);
        resultContainer.innerHTML = this.renderDetailedWordCard(aiResult, "Phân tích bởi Gemini 2.5 Flash");
        this.refreshIcons();
      } catch (err) {
        resultContainer.innerHTML = `
          <div class="bg-red-50 dark:bg-red-950/40 p-6 rounded-2xl border border-red-200 dark:border-red-900/60 text-center">
            <i data-lucide="alert-circle" class="w-8 h-8 text-red-500 mx-auto mb-2"></i>
            <h4 class="font-bold text-red-700 dark:text-red-400 text-sm">Không thể hoàn tất tra cứu AI</h4>
            <p class="text-xs text-red-600/80 mt-1 mb-4">${err.message}</p>
            <a href="#settings" class="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5">
              <i data-lucide="key" class="w-3.5 h-3.5"></i> Cấu hình Gemini API Key
            </a>
          </div>
        `;
        this.refreshIcons();
      }
    },

    renderDetailedWordCard(word, sourceTag = "Dữ liệu chuẩn") {
      const collocationsHtml = (word.collocations || [])
        .map((c) => `<span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 font-hanzi">${c}</span>`)
        .join("");

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-lg">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4 mb-6">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300">
                HSK ${word.hsk || 1}
              </span>
              <span class="text-xs text-slate-400 font-medium">Nguồn: ${sourceTag}</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="AudioService.speak('${word.hanzi}')" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-600 transition" title="Nghe phát âm từ">
                <i data-lucide="volume-2" class="w-5 h-5"></i>
              </button>
              <button onclick="App.addCurrentToFlashcard('${word.hanzi}', '${word.pinyin}', '${word.meaning}', '${word.example?.zh || ""}', '${word.example?.vi || ""}')" class="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold text-xs flex items-center gap-1.5 transition">
                <i data-lucide="plus-circle" class="w-4 h-4"></i> Thêm vào Flashcard
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <!-- Big Hanzi in Tianzige -->
            <div class="flex flex-col items-center justify-center p-6 rounded-2xl tianzige-box border border-red-200 dark:border-red-900/50 shadow-inner">
              <span class="font-hanzi font-bold text-7xl md:text-8xl text-slate-900 dark:text-white leading-none">
                ${word.hanzi}
              </span>
              <span class="mt-3 text-xl font-bold text-red-600 dark:text-red-400 font-mono tracking-wide">
                ${word.pinyin}
              </span>
            </div>

            <!-- Details: Meaning, Radical, Strokes -->
            <div class="md:col-span-2 space-y-4">
              <div>
                <span class="text-xs uppercase font-bold text-slate-400">Định nghĩa tiếng Việt</span>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mt-0.5">
                  ${word.meaning}
                </h3>
              </div>

              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                  <span class="text-slate-400 block mb-0.5">Bộ thủ (Radical):</span>
                  <span class="font-bold text-slate-700 dark:text-slate-200">${word.radical || "Đang cập nhật"}</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                  <span class="text-slate-400 block mb-0.5">Số nét vẽ (Strokes):</span>
                  <span class="font-bold text-slate-700 dark:text-slate-200">${word.strokes || 8} nét</span>
                </div>
              </div>

              ${word.collocations && word.collocations.length > 0 ? `
                <div>
                  <span class="text-xs uppercase font-bold text-slate-400 block mb-2">Từ ghép thường gặp:</span>
                  <div class="flex flex-wrap gap-2">
                    ${collocationsHtml}
                  </div>
                </div>
              ` : ""}
            </div>
          </div>

          <!-- Example sentence -->
          ${word.example ? `
            <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs uppercase font-bold text-slate-400">Ví dụ ngữ cảnh thực tế</span>
                <button onclick="AudioService.speak('${word.example.zh}')" class="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                  <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe câu ví dụ
                </button>
              </div>
              <div class="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <div class="font-hanzi font-bold text-base text-slate-900 dark:text-slate-100 mb-1">
                  ${word.example.zh}
                </div>
                <div class="text-xs text-amber-700 dark:text-amber-400 font-mono mb-1">
                  ${word.example.pinyin}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-400 italic">
                  ${word.example.vi}
                </div>
              </div>
            </div>
          ` : ""}
        </div>
      `;
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
    renderChengyu(container) {
      container.innerHTML = `
        <div class="space-y-6 max-w-5xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="scroll" class="w-6 h-6 text-red-600"></i>
                Kho Tàng Thành Ngữ & Ca Dao Tục Ngữ
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hiểu tường tận điển tích lịch sử, nghĩa đen nghĩa bóng và ứng dụng giao tiếp văn minh.
              </p>
            </div>

            <button id="chengyuAiGenBtn" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
              Tạo câu mới bằng Gemini AI
            </button>
          </div>

          <!-- Chengyu Cards Grid -->
          <div id="chengyuGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${window.APP_DATA.chengyuList.map((item) => this.renderChengyuCard(item)).join("")}
          </div>
        </div>
      `;

      document.getElementById("chengyuAiGenBtn").addEventListener("click", () => this.openAiChengyuModal());
    },

    renderChengyuCard(item) {
      const tagsHtml = (item.tags || [])
        .map((t) => `<span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300">${t}</span>`)
        .join("");

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <!-- Header with illustration -->
            <div class="relative h-44 bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <img
                src="${item.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"}"
                alt="${item.hanzi}"
                class="w-full h-full object-cover"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-5">
                <div>
                  <h3 class="font-hanzi-serif font-black text-3xl text-white tracking-wide">
                    ${item.hanzi}
                  </h3>
                  <p class="text-amber-300 font-mono text-xs font-semibold mt-0.5">
                    ${item.pinyin}
                  </p>
                </div>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-6 space-y-4">
              <!-- Meaning -->
              <div class="space-y-1">
                <div class="text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span class="text-red-600 dark:text-red-400">Nghĩa đen:</span> ${item.literal}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span class="font-bold text-amber-600 dark:text-amber-400">Nghĩa bóng:</span> ${item.figurative}
                </div>
              </div>

              <!-- Fable / Story -->
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700 text-xs">
                <span class="font-bold text-slate-800 dark:text-white block mb-1 flex items-center gap-1.5">
                  <i data-lucide="book" class="w-3.5 h-3.5 text-red-500"></i> Điển tích nguồn gốc:
                </span>
                <p class="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  ${item.story}
                </p>
              </div>

              <!-- Communication Example -->
              ${item.example ? `
                <div class="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 text-xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-amber-800 dark:text-amber-400">Ví dụ ứng dụng:</span>
                    <button onclick="AudioService.speak('${item.example.zh}')" class="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold">
                      <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Nghe
                    </button>
                  </div>
                  <div class="font-hanzi font-semibold text-slate-800 dark:text-white mb-0.5">${item.example.zh}</div>
                  <div class="text-slate-500 text-[11px]">${item.example.vi}</div>
                </div>
              ` : ""}

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${tagsHtml}
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <button onclick="AudioService.speak('${item.hanzi}')" class="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 flex items-center gap-1.5">
              <i data-lucide="volume-2" class="w-4 h-4 text-red-500"></i> Phát âm 4 chữ
            </button>
            <button onclick="App.markChengyuLearned('${item.hanzi}')" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/50 font-bold text-xs flex items-center gap-1 transition">
              <i data-lucide="check" class="w-3.5 h-3.5"></i> Đã thuộc câu này
            </button>
          </div>
        </div>
      `;
    },

    markChengyuLearned(hanzi) {
      window.StorageService.incrementStat("chengyuLearnedToday", 1);
      this.updateHeaderProgress();
      this.showToast(`Tuyệt vời! Bạn đã tích lũy thêm thành ngữ "${hanzi}"!`, "success");
    },

    openAiChengyuModal() {
      const html = `
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="sparkles" class="w-5 h-5 text-amber-500"></i>
              Tạo Thành Ngữ / Tục Ngữ Mới Bằng AI
            </h3>
            <button onclick="App.closeModal()" class="text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-3 text-xs">
            <label class="block font-bold text-slate-700 dark:text-slate-300">Nhập chủ đề bạn quan tâm (Ví dụ: Kiên trì, Lòng hiếu thảo, Trí tuệ, Tình bạn):</label>
            <input
              type="text"
              id="modalChengyuThemeInput"
              placeholder="VD: Kiên trì vượt khó"
              class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs"
            />
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <button onclick="App.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">Hủy</button>
            <button id="modalChengyuSubmitBtn" onclick="App.handleGenerateAiChengyu()" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5">
              <i data-lucide="cpu" class="w-4 h-4"></i> Tạo thành ngữ
            </button>
          </div>
        </div>
      `;
      this.openModal(html);
    },

    async handleGenerateAiChengyu() {
      const theme = document.getElementById("modalChengyuThemeInput").value || "Học tập kiên trì";
      const btn = document.getElementById("modalChengyuSubmitBtn");

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang tra cứu điển tích...`;
        this.refreshIcons();
      }

      try {
        const item = await window.GeminiService.generateChengyuAI(theme);
        item.id = "cy_ai_" + Date.now();
        item.image = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80";
        window.APP_DATA.chengyuList.unshift(item);

        this.closeModal();
        this.showToast(`Đã thêm thành ngữ "${item.hanzi}"!`, "success");
        const grid = document.getElementById("chengyuGrid");
        if (grid) grid.innerHTML = window.APP_DATA.chengyuList.map((i) => this.renderChengyuCard(i)).join("");
        this.refreshIcons();
      } catch (err) {
        this.showToast(`Lỗi tạo thành ngữ: ${err.message}`, "error");
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i> Thử lại`;
          this.refreshIcons();
        }
      }
    },

    /* =====================================================================
       MODULE 5: GAMES & SPACED REPETITION PENALTY BOX
       ===================================================================== */
    renderGames(container) {
      container.innerHTML = `
        <div class="space-y-6 max-w-5xl mx-auto">
          <!-- Game Tabs -->
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="gamepad-2" class="w-6 h-6 text-red-600"></i>
                Trò Chơi Phản Xạ Từ Vựng (HSK 1 - 6)
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                3 chế độ chơi phản xạ cực nhanh. Từ sai hoặc hết giờ sẽ rơi vào Hộp Phạt (yêu cầu đúng 3 lần liên tiếp).
              </p>
            </div>

            <!-- Mode Selector Buttons -->
            <div class="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 gap-1 text-xs font-bold">
              <button id="gameTabSpeed" onclick="App.switchGameTab('speed')" class="px-3.5 py-2 rounded-xl transition bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm flex items-center gap-1">
                <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500"></i> Nối từ siêu tốc
              </button>
              <button id="gameTabQuiz" onclick="App.switchGameTab('quiz')" class="px-3.5 py-2 rounded-xl transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1">
                <i data-lucide="timer" class="w-3.5 h-3.5 text-red-500"></i> Phản xạ 5s
              </button>
              <button id="gameTabAudio" onclick="App.switchGameTab('audio')" class="px-3.5 py-2 rounded-xl transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1">
                <i data-lucide="volume-2" class="w-3.5 h-3.5 text-purple-500"></i> Nghe âm đoán chữ
              </button>
              <button id="gameTabPenalty" onclick="App.switchGameTab('penalty')" class="px-3.5 py-2 rounded-xl transition text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1">
                <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Hộp phạt (${this.penaltyWords.length})
              </button>
            </div>
          </div>

          <!-- Dynamic Game Arena -->
          <div id="gameArenaContainer" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-lg min-h-[420px] flex flex-col justify-center">
            <!-- Active Game Mode Renders Here -->
          </div>
        </div>
      `;

      // Start default game
      this.switchGameTab("speed");
    },

    switchGameTab(mode) {
      const tabs = ["speed", "quiz", "audio", "penalty"];
      tabs.forEach((t) => {
        const btn = document.getElementById(`gameTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
        if (btn) {
          if (t === mode) {
            btn.className = "px-3.5 py-2 rounded-xl transition bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-sm flex items-center gap-1 font-bold";
          } else {
            btn.className = "px-3.5 py-2 rounded-xl transition text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1 font-bold";
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

    // 1. Game: Speed Matching (Nối từ)
    initSpeedMatchingGame(arena) {
      // Pick 4 random words
      const words = [...window.APP_DATA.vocabList].sort(() => 0.5 - Math.random()).slice(0, 4);
      const hanziCards = words.map((w) => ({ id: w.id, text: w.hanzi, type: "hanzi" })).sort(() => 0.5 - Math.random());
      const meaningCards = words.map((w) => ({ id: w.id, text: `${w.pinyin} - ${w.meaning}`, type: "meaning" })).sort(() => 0.5 - Math.random());

      this.gameState = {
        mode: "speed",
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
              <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i> Nối chữ Hán với Pinyin & Nghĩa tương ứng
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

      arena.innerHTML = `
        <div class="text-center py-8 space-y-4 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full ${isWin ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"} flex items-center justify-center mx-auto text-2xl shadow-lg">
            <i data-lucide="${isWin ? "trophy" : "clock-alert"}" class="w-8 h-8"></i>
          </div>
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            ${isWin ? "Chiến Thắng Xuất Sắc!" : "Hết Giờ Phản Xạ!"}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            ${isWin ? "Bạn đã hoàn thành nối 4 cặp từ cực nhanh và chuẩn xác." : "Các từ chưa hoàn thành đã được thêm vào danh sách Cần Ôn Gấp."}
          </p>
          <div class="flex items-center justify-center gap-3 pt-3">
            <button onclick="App.initSpeedMatchingGame(document.getElementById('gameArenaContainer'))" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Chơi Lại Màn Mới
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
      const words = [...window.APP_DATA.vocabList].sort(() => 0.5 - Math.random());
      this.gameState = {
        mode: "quiz",
        words,
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
      // Generate 3 wrong options
      const otherWords = window.APP_DATA.vocabList.filter((w) => w.id !== currentWord.id);
      const wrongOptions = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3).map((w) => w.meaning);
      const allOptions = [currentWord.meaning, ...wrongOptions].sort(() => 0.5 - Math.random());

      this.gameState.secondsLeft = 5;

      arena.innerHTML = `
        <div class="space-y-6 max-w-xl mx-auto w-full">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span class="text-xs font-bold text-slate-500 uppercase">
              Câu ${this.gameState.currentIndex + 1} / ${Math.min(10, this.gameState.words.length)}
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
        const word = window.APP_DATA.vocabList.find((w) => w.id === wordId);
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

      arena.innerHTML = `
        <div class="text-center py-8 space-y-4 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
          <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">
            Hoàn Thành Chuỗi Phản Xạ 5s!
          </h3>
          <p class="text-sm font-bold text-red-600 dark:text-red-400">
            Tổng điểm của bạn: ${this.gameState.score} điểm
          </p>
          <div class="flex items-center justify-center gap-3 pt-3">
            <button onclick="App.initTimeAttackQuiz(document.getElementById('gameArenaContainer'))" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Thử Lại Màn Mới
            </button>
          </div>
        </div>
      `;
      this.refreshIcons();
    },

    // 3. Game: Audio Reflex (Nghe âm đoán chữ)
    initAudioReflexGame(arena) {
      const words = [...window.APP_DATA.vocabList].sort(() => 0.5 - Math.random());
      this.gameState = {
        mode: "audio",
        words,
        currentIndex: 0,
        score: 0
      };
      this.renderNextAudioQuestion(arena);
    },

    renderNextAudioQuestion(arena) {
      if (this.gameState.currentIndex >= Math.min(8, this.gameState.words.length)) {
        arena.innerHTML = `
          <div class="text-center py-8 space-y-4 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-2xl shadow-lg">
              <i data-lucide="headphones" class="w-8 h-8"></i>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white">Thính Giác Tuyệt Vời!</h3>
            <p class="text-sm text-purple-600 font-bold">Điểm số nghe âm: ${this.gameState.score} điểm</p>
            <button onclick="App.initAudioReflexGame(document.getElementById('gameArenaContainer'))" class="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md">
              Chơi Lại
            </button>
          </div>
        `;
        this.refreshIcons();
        return;
      }

      const targetWord = this.gameState.words[this.gameState.currentIndex];
      const others = window.APP_DATA.vocabList.filter((w) => w.id !== targetWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [targetWord, ...others].sort(() => 0.5 - Math.random());

      arena.innerHTML = `
        <div class="space-y-6 max-w-lg mx-auto w-full text-center">
          <span class="text-xs font-bold text-slate-400 uppercase">
            Nghe âm thanh và chọn Chữ Hán tương ứng
          </span>

          <div class="py-4">
            <button
              id="audioPlayBtn"
              onclick="AudioService.speak('${targetWord.hanzi}')"
              class="w-24 h-24 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-500/30 transition transform hover:scale-105 active:scale-95"
            >
              <i data-lucide="volume-2" class="w-10 h-10"></i>
            </button>
            <p class="text-xs text-slate-500 mt-2">Bấm loa để nghe lại phát âm</p>
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
        const wrong = window.APP_DATA.vocabList.find((w) => w.id === targetId);
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
       MODULE 6: PERSONALIZED 3D FLASHCARDS (WITH AI AUTO-FILL)
       ===================================================================== */
    renderFlashcards(container) {
      this.flashcards = window.StorageService.getFlashcards();
      const current = this.flashcards[this.flashcardIndex] || this.flashcards[0];

      container.innerHTML = `
        <div class="space-y-6 max-w-4xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="layers" class="w-6 h-6 text-red-600"></i>
                Flashcard 3D Cá Nhân Hóa
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Giao diện lật thẻ 3D trực quan, hỗ trợ Gemini AI tự động điền Pinyin & Ví dụ ngữ cảnh.
              </p>
            </div>

            <button onclick="App.openAddFlashcardModal()" class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition">
              <i data-lucide="plus" class="w-4 h-4"></i> Tạo Thẻ Mới (Hỗ trợ AI)
            </button>
          </div>

          <!-- Flashcard 3D Viewer Area -->
          <div id="flashcardViewerContainer" class="space-y-6">
            ${current ? this.renderFlashcardCard(current) : `
              <div class="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border p-8">
                <p class="text-slate-500 text-sm mb-3">Chưa có flashcard nào trong bộ sưu tập.</p>
                <button onclick="App.openAddFlashcardModal()" class="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold">Thêm Thẻ Đầu Tiên</button>
              </div>
            `}
          </div>
        </div>
      `;
    },

    renderFlashcardCard(card) {
      const total = this.flashcards.length;
      const currentNum = this.flashcardIndex + 1;

      return `
        <!-- Counter & Navigation Toolbar -->
        <div class="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <span>Thẻ ${currentNum} / ${total}</span>
          <div class="flex items-center gap-2">
            <button onclick="App.prevFlashcard()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300">
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
            </button>
            <button onclick="App.nextFlashcard()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300">
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- 3D Perspective Card Wrapper -->
        <div class="perspective-1000 w-full h-80 md:h-96 cursor-pointer select-none" onclick="App.flipFlashcard()">
          <div id="flashcardInner" class="transform-style-3d relative w-full h-full duration-500 transition-transform ${this.isCardFlipped ? "rotate-y-180" : ""}">
            
            <!-- FRONT SIDE -->
            <div class="backface-hidden absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 p-8 shadow-xl flex flex-col justify-between items-center text-center">
              <div class="w-full flex items-center justify-between text-xs text-slate-400">
                <span class="font-bold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">HSK ${card.hsk || 1}</span>
                <span class="flex items-center gap-1 text-[11px]"><i data-lucide="rotate-cw" class="w-3 h-3"></i> Nhấn để lật</span>
              </div>

              <div class="my-auto">
                <div class="font-hanzi font-bold text-7xl md:text-8xl text-slate-900 dark:text-white tracking-wider mb-2">
                  ${card.hanzi}
                </div>
                <p class="text-xs text-slate-400">Mặt trước: Chữ Hán</p>
              </div>

              <button onclick="event.stopPropagation(); AudioService.speak('${card.hanzi}')" class="p-3 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 transition" title="Nghe phát âm">
                <i data-lucide="volume-2" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- BACK SIDE -->
            <div class="backface-hidden rotate-y-180 absolute inset-0 w-full h-full bg-gradient-to-br from-red-50 to-amber-50 dark:from-slate-850 dark:to-slate-800 rounded-3xl border-2 border-red-300 dark:border-red-900/60 p-8 shadow-xl flex flex-col justify-between items-center text-center">
              <div class="w-full flex items-center justify-between text-xs text-slate-400">
                <span class="font-bold text-red-600 dark:text-red-400 font-mono text-base">${card.pinyin}</span>
                <button onclick="event.stopPropagation(); AudioService.speak('${card.hanzi}')" class="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-red-600">
                  <i data-lucide="volume-2" class="w-4 h-4"></i>
                </button>
              </div>

              <div class="my-auto space-y-3">
                <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ${card.meaning}
                </h3>
                ${card.example ? `
                  <div class="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-red-100 dark:border-slate-700 text-xs">
                    <div class="font-hanzi font-semibold text-slate-800 dark:text-white mb-0.5">${card.example}</div>
                    <div class="text-slate-500 italic">${card.exampleVi || ""}</div>
                  </div>
                ` : ""}
              </div>

              <span class="text-[11px] text-slate-400">Đánh giá mức độ nhớ bên dưới để tối ưu ôn tập</span>
            </div>

          </div>
        </div>

        <!-- Rating Buttons (Spaced Repetition Feedback) -->
        <div class="grid grid-cols-3 gap-3 pt-2">
          <button onclick="App.rateFlashcard('${card.id}', 'forgot')" class="py-3 px-4 rounded-2xl bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/80 text-red-700 dark:text-red-300 font-bold text-xs flex items-center justify-center gap-1.5 transition">
            <i data-lucide="x-circle" class="w-4 h-4 text-red-600"></i> Quên (Vào Hộp Phạt)
          </button>
          <button onclick="App.rateFlashcard('${card.id}', 'vague')" class="py-3 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/80 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition">
            <i data-lucide="help-circle" class="w-4 h-4 text-amber-600"></i> Nhớ mang máng
          </button>
          <button onclick="App.rateFlashcard('${card.id}', 'mastered')" class="py-3 px-4 rounded-2xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i> Đã thuộc làu làu
          </button>
        </div>
      `;
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
      const container = document.getElementById("flashcardViewerContainer");
      if (container) container.innerHTML = this.renderFlashcardCard(this.flashcards[this.flashcardIndex]);
      this.refreshIcons();
    },

    prevFlashcard() {
      if (this.flashcards.length === 0) return;
      this.isCardFlipped = false;
      this.flashcardIndex = (this.flashcardIndex - 1 + this.flashcards.length) % this.flashcards.length;
      const container = document.getElementById("flashcardViewerContainer");
      if (container) container.innerHTML = this.renderFlashcardCard(this.flashcards[this.flashcardIndex]);
      this.refreshIcons();
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

    openAddFlashcardModal() {
      const html = `
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="layers" class="w-5 h-5 text-red-600"></i>
              Tạo Thẻ Flashcard Mới
            </h3>
            <button onclick="App.closeModal()" class="text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chữ Hán (*):</label>
              <div class="flex gap-2">
                <input type="text" id="fcHanziInput" placeholder="VD: 克服" class="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm font-hanzi" />
                <button type="button" id="fcAiFillBtn" onclick="App.handleFlashcardAiAutoFill()" class="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm">
                  <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Điền bằng AI
                </button>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phiên âm Pinyin:</label>
              <input type="text" id="fcPinyinInput" placeholder="VD: kè fú" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nghĩa tiếng Việt (*):</label>
              <input type="text" id="fcMeaningInput" placeholder="VD: Khắc phục, vượt qua khó khăn" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ví dụ chữ Hán:</label>
              <input type="text" id="fcExampleInput" placeholder="VD: 我们要克服一切困难。" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-hanzi" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dịch nghĩa câu ví dụ:</label>
              <input type="text" id="fcExampleViInput" placeholder="VD: Chúng ta phải khắc phục mọi khó khăn." class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white" />
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <button onclick="App.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">Hủy</button>
            <button onclick="App.handleSaveFlashcard()" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md">
              Lưu Flashcard
            </button>
          </div>
        </div>
      `;
      this.openModal(html);
    },

    async handleFlashcardAiAutoFill() {
      const hanzi = document.getElementById("fcHanziInput")?.value?.trim();
      const btn = document.getElementById("fcAiFillBtn");
      if (!hanzi) {
        this.showToast("Vui lòng nhập chữ Hán trước!", "warning");
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> AI đang điền...`;
        this.refreshIcons();
      }

      try {
        const res = await window.GeminiService.autoFillFlashcardAI(hanzi);
        if (document.getElementById("fcPinyinInput")) document.getElementById("fcPinyinInput").value = res.pinyin || "";
        if (document.getElementById("fcMeaningInput")) document.getElementById("fcMeaningInput").value = res.meaning || "";
        if (document.getElementById("fcExampleInput")) document.getElementById("fcExampleInput").value = res.exampleZh || "";
        if (document.getElementById("fcExampleViInput")) document.getElementById("fcExampleViInput").value = res.exampleVi || "";
        this.showToast("AI đã tự động hoàn thiện thông tin thẻ!", "success");
      } catch (err) {
        this.showToast("Lỗi tự động điền AI: " + err.message, "error");
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Điền bằng AI`;
          this.refreshIcons();
        }
      }
    },

    handleSaveFlashcard() {
      const hanzi = document.getElementById("fcHanziInput")?.value?.trim();
      const pinyin = document.getElementById("fcPinyinInput")?.value?.trim();
      const meaning = document.getElementById("fcMeaningInput")?.value?.trim();
      const example = document.getElementById("fcExampleInput")?.value?.trim();
      const exampleVi = document.getElementById("fcExampleViInput")?.value?.trim();

      if (!hanzi || !meaning) {
        this.showToast("Vui lòng nhập chữ Hán và nghĩa tiếng Việt!", "warning");
        return;
      }

      window.StorageService.saveFlashcard({
        hanzi,
        pinyin: pinyin || "pīn yīn",
        meaning,
        example,
        exampleVi,
        status: "learning"
      });

      this.closeModal();
      this.showToast(`Đã tạo flashcard cho "${hanzi}"!`, "success");
      this.renderFlashcards(document.getElementById("viewContainer"));
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
                Gemini API Key (gemini-2.5-flash)
              </h3>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Lưu an toàn ở LocalStorage
              </span>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Nhập API Key từ Google AI Studio để kích hoạt tính năng phân tích từ vựng thời gian thực, giám khảo chấm điểm khẩu ngữ HSKK và tự động sinh đề thi mới.
            </p>

            <div class="space-y-2">
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
        const text = await window.GeminiService.callGemini("Hãy chào ngắn gọn bằng tiếng Trung (dưới 5 từ).");
        this.showToast(`Kết nối Gemini 2.5 Flash thành công! Phản hồi: "${text.trim()}"`, "success");
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
