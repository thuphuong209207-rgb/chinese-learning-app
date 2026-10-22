# 华语星 (ChinesePro AI) - Ứng Dụng Học Tiếng Trung Toàn Diện & Phản Xạ AI

Ứng dụng web Single Page Application (SPA) học tiếng Trung hiện đại, tích hợp Trí tuệ Nhân tạo Google Gemini 2.5 Flash, Web Speech API và phương pháp lặp lại ngắt quãng (Spaced Repetition).

---

## 🚀 Cách Khởi Chạy Ứng Dụng
1. Mở thư mục dự án tại đường dẫn:
   `C:\Users\PC\.gemini\antigravity\scratch\chinese-learning-app`
2. **Khởi chạy trực tiếp:** Mở tệp `index.html` bằng bất kỳ trình duyệt hiện đại nào (Google Chrome, Microsoft Edge, Brave, Cốc Cốc, Firefox...).
3. *(Khuyên dùng)* Bạn có thể đặt thư mục này làm **Active Workspace** trong môi trường làm việc của bạn để dễ dàng quản lý mã nguồn.

---

## 🛠️ Công Nghệ & Kiến Trúc (Tech Stack)
- **Giao diện & Trải nghiệm (UI/UX):** HTML5, Tailwind CSS, Lucide Icons, Google Fonts (Noto Sans SC, Noto Serif SC, Plus Jakarta Sans), hiệu ứng lật thẻ 3D Perspective và lưới ô chữ Hán Điền Tự Cách (田字格 Tianzige).
- **Hỗ trợ Dark/Light Mode:** Chuyển đổi giao diện sáng/tối mượt mà và lưu trạng thái vào `localStorage`.
- **Trạng thái & Lưu trữ (State Management):** Vanilla JavaScript (ES6+), dịch vụ lưu trữ `StorageService` quản lý dữ liệu người dùng, chuỗi học liên tiếp (Streak), Hộp phạt từ chưa thuộc, Flashcard và tiến độ hàng ngày.
- **Âm thanh & Giọng nói (Speech Technologies):**
  - **Text-to-Speech (TTS):** Tích hợp Web Speech API `SpeechSynthesis` phát âm chuẩn giọng phổ thông tiếng Trung (`zh-CN`), cho phép điều chỉnh tốc độ đọc từ 0.6x đến 1.3x.
  - **Speech-to-Text (STT):** Tích hợp Web Speech API `SpeechRecognition` (`zh-CN`) thu âm giọng nói trực tiếp qua Microphone và chuyển thành văn bản chữ Hán thời gian thực.
- **Tích hợp Gemini AI:** Sử dụng REST endpoint chính thức của model `gemini-2.5-flash` xử lý phân tích ngữ nghĩa, chấm điểm phản xạ khẩu ngữ HSKK, sinh đề thi trắc nghiệm và sáng tác câu chuyện thành ngữ.

---

## 📚 7 Phân Hệ Chức Năng Cốt Lõi

### 1. Quản Lý Cài Đặt & Tích Hợp Gemini AI
- Cho phép người dùng nhập **Gemini API Key** và lưu an toàn vào `localStorage`.
- Nút **"Kiểm tra kết nối AI"** ping trực tiếp đến model `gemini-2.5-flash`.
- Tự động chuyển đổi mượt mà: nếu chưa có API Key, ứng dụng vẫn hoạt động với ngân hàng dữ liệu mẫu (Mock Data phong phú). Khi đã nhập Key, toàn bộ tính năng thông minh của AI sẽ được kích hoạt tức thì.

### 2. Từ Điển & Tra Cứu Thông Minh
- Tra cứu đa năng: Tìm theo **Chữ Hán**, **Pinyin** hoặc **Nghĩa tiếng Việt**.
- Hiển thị chi tiết: Chữ Hán lớn trong ô điền tự cách, Pinyin chuẩn thanh điệu, Cấp độ HSK, Bộ thủ, Số nét, Từ ghép liên quan và Câu ví dụ thực tế kèm âm thanh phát âm.
- Cơ chế **AI Fallback**: Nếu từ vựng không có sẵn trong cơ sở dữ liệu mẫu, ứng dụng tự động gọi Gemini API để phân tích chuyên sâu và trả về JSON chuẩn.
- Nút bấm nhanh cho phép lưu từ vừa tra vào Flashcard cá nhân chỉ với 1 click.

### 3. Luyện Đề Thi (Giáo Trình Hán Ngữ & HSK) + AI Luyện Phản Xạ Nói
- **Luyện đề thi trắc nghiệm:**
  - Giáo trình Hán Ngữ (6 Quyển xanh lá) và Giáo trình Chuẩn HSK (HSK 1 - 6 Hanban).
  - Phân loại kỹ năng: Nghe (Listening kèm nút phát âm câu hỏi), Đọc hiểu (Reading), Ngữ pháp (Grammar).
  - Có đồng hồ bấm giờ đếm ngược, chấm điểm tự động và hiển thị giải thích chi tiết đáp án.
  - Nút **"Sinh đề thi mới bằng Gemini AI"**: Tự động biên soạn đề thi theo cấp độ tùy chọn.
- **AI Luyện phản xạ nói (HSKK / Speaking Reflex):**
  - Đưa ra đề bài và tình huống giao tiếp theo cấp độ Sơ cấp, Trung cấp, Cao cấp.
  - Người dùng bấm nút Micro nói tiếng Trung, hệ thống nhận diện giọng nói và hiển thị văn bản thời gian thực.
  - Gemini AI đóng vai giám khảo khẩu ngữ: Chấm điểm thang 10, nhận xét độ lưu loát, sửa lỗi ngữ pháp, gợi ý diễn đạt tự nhiên như người bản xứ và **phát âm câu đối thoại phản hồi lại** để người học tiếp tục tương tác.

### 4. Kho Tàng Thành Ngữ & Ca Dao Tục Ngữ (Chengyu / Điển Tích)
- Mỗi thành ngữ/tục ngữ bao gồm:
  1. Chữ Hán + Pinyin + Nghĩa đen & Nghĩa bóng.
  2. Hình ảnh minh họa trực quan.
  3. **Câu chuyện/Điển tích lịch sử nguồn gốc** (Ví dụ: 掩耳盗铃 Bịt tai trộm chuông, 塞翁失马 Tái ông thất mã, 画蛇添足 Vẽ rắn thêm chân, 愚公移山 Ngu công dời núi...).
  4. Câu ví dụ ứng dụng trong giao tiếp hiện đại (kèm nút nghe phát âm).
- Nút **"Tạo câu mới bằng Gemini AI"**: Người dùng nhập chủ đề (Kiên trì, Học tập, Tình bạn...), AI sẽ tự động sáng tạo thành ngữ cùng điển tích hoàn chỉnh.

### 5. Game Phản Xạ Từ Vựng & Hộp Phạt Bắt Buộc Ôn Lại (Spaced Repetition)
- **3 Chế độ game tính điểm & bấm giờ:**
  1. **Nối từ siêu tốc (Speed Matching):** Nối Chữ Hán với Pinyin & Nghĩa tương ứng trước khi hết 25 giây.
  2. **Phản xạ 5 giây (Time Attack Quiz):** Chọn nhanh đáp án đúng trong vòng 5 giây đếm ngược.
  3. **Nghe âm đoán chữ (Audio Reflex):** Nghe phát âm tiếng Trung tự động và chọn nhanh chữ Hán tương ứng.
- **Cơ chế Hộp Phạt (Penalty Box - Spaced Repetition):**
  - Mọi từ người dùng trả lời sai hoặc để hết giờ sẽ tự động bị đẩy vào **"Danh sách từ chưa thuộc (Cần ôn gấp)"**.
  - Người học phải tham gia bài kiểm tra phạt và trả lời đúng **3 lần liên tiếp** thì từ đó mới được giải phóng khỏi danh sách phạt.

### 6. Xưởng Tự Tạo Flashcard Cá Nhân Hóa (Custom Flashcard Studio & 3D Decks)
- **Tự tạo bộ thẻ riêng biệt (Custom Decks):**
  - Người dùng có thể tạo các bộ thẻ tùy chỉnh (vd: *Từ vựng HSK của tôi*, *Giao tiếp nhà hàng*, *Du lịch Bắc Kinh*...).
  - Quản lý, lọc và luyện tập theo từng bộ thẻ riêng hoặc tất cả.
- **Xưởng tạo thẻ thông minh (Flashcard Creator Studio):**
  - Nhập Chữ Hán -> Bấm nút **"Điền Bằng Gemini AI"** để tự động hoàn thiện Pinyin chuẩn thanh điệu, Cấp độ HSK, Nghĩa tiếng Việt, Câu ví dụ thực tế và **Mẹo chiết tự ghi nhớ chữ**.
  - Tích hợp nút phát âm nghe thử từ vựng và câu ví dụ ngay trong lúc tạo.
- **📸 Quét Từ Vựng Trang Sách Bằng AI (Gemini 2.5 Flash Vision OCR):**
  - Chụp ảnh trực tiếp từ Camera điện thoại / máy tính hoặc tải ảnh trang sách giáo trình tiếng Trung.
  - Hỗ trợ nút **"Dùng ảnh mẫu trang sách HSK"** để trải nghiệm tính năng tức thì không cần chuẩn bị ảnh.
  - Hiệu ứng quét tia Laser Scanner trực quan trên hình ảnh trang sách.
  - Gemini 2.5 Flash tự động nhận diện chữ Hán, bóc tách danh sách các từ vựng cốt lõi, cung cấp Pinyin, nghĩa tiếng Việt, cấp độ HSK, câu ví dụ và mẹo nhớ chiết tự.
  - Cho phép người dùng duyệt danh sách, chọn lọc từ vựng và bấm **"Thêm Hàng Loạt Vào Bộ Flashcard"** chỉ trong vài giây.
- **Giao diện thẻ lật 3D không gian 3 chiều mượt mà:**
  - Mặt trước: Chữ Hán to rõ, cấp độ HSK, tên bộ thẻ, nút nghe phát âm.
  - Mặt sau: Pinyin, Nghĩa tiếng Việt, Câu ví dụ, Mẹo chiết tự nhớ chữ.
- **Đánh giá Spaced Repetition sau mỗi lần lật:**
  - 🔴 **Quên (Học lại ngay):** Tự động đẩy từ này vào Hộp Phạt để rèn luyện 3 lần đúng liên tiếp.
  - 🟡 **Nhớ mang máng**
  - 🟢 **Đã thuộc làu làu**
- **Quản lý thư viện thẻ (CRUD & Backup):**
  - Tìm kiếm thẻ theo Hán tự, Pinyin hoặc nghĩa.
  - Chỉnh sửa (Edit) trực tiếp từng trường dữ liệu hoặc Xóa thẻ.
  - **Xuất dữ liệu (Export JSON)** và **Nhập dữ liệu (Import JSON)** giúp sao lưu và chia sẻ bộ thẻ dễ dàng.

### 7. Lịch Trình & Hệ Thống Nhắc Nhở Học Tập
- Thiết lập mục tiêu hàng ngày: Số từ vựng cần học (VD: 10 từ/ngày), Số thành ngữ cần học (VD: 2 câu/ngày).
- Thanh tiến độ (Progress Bar) hiển thị thời gian thực ở thanh điều hướng trên cùng.
- Theo dõi chuỗi ngày học liên tục (Streak).
- Tích hợp **Browser Notification API**: Cho phép bật thông báo đẩy trên trình duyệt để nhắc nhở học viên khi có từ vựng đến hạn cần ôn lại trong Hộp Phạt.

---

## 📂 Cấu Trúc Thư Mục
```
chinese-learning-app/
├── index.html          # Bộ khung SPA hoàn chỉnh, thanh điều hướng, modal & toast
├── css/
│   └── style.css       # Hiệu ứng 3D perspective lật thẻ, ô điền tự cách, font tiếng Trung
└── js/
    ├── data.js         # Ngân hàng dữ liệu phong phú (HSK 1-6, Thành ngữ, Đề thi, Khẩu ngữ)
    ├── storage.js      # Quản lý localStorage (Streak, Hộp phạt 3-lần-đúng, Flashcard, Settings)
    ├── audio.js        # Web Speech API (SpeechSynthesis TTS zh-CN & SpeechRecognition STT)
    ├── api.js          # REST Client tích hợp Gemini 2.5 Flash API
    └── app.js          # Điều hướng SPA, logic 7 phân hệ, game engine, chấm điểm
```
