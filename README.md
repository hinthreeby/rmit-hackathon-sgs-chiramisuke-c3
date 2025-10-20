# 🌍 Climate Match

## 🧭 Overview
**Climate Match** là một trò chơi web 2D được phát triển nhằm **nâng cao nhận thức về biến đổi khí hậu** thông qua cơ chế **ghép thẻ bài (matching cards)**.  
Người chơi cần ghép **vấn đề môi trường** với **giải pháp bền vững tương ứng**, từ đó học được những hành động cụ thể để bảo vệ Trái Đất.

### 🎯 Mục tiêu
- Giúp người chơi hiểu rõ hơn về các vấn đề khí hậu và biện pháp ứng phó.  
- Kết hợp học và chơi, mang lại trải nghiệm “vừa học vừa vui”.  
- Khuyến khích lối sống xanh và hành động tích cực vì môi trường.

---

## 🧩 Instructions to Run the Game

### 📦 Cài đặt & chạy trò chơi
**Yêu cầu:**  
- Node.js (phiên bản >= 16)  
- Trình duyệt web hiện đại (Chrome, Edge, Firefox, …)

**Cách chạy:**

```bash
# Cài đặt dependencies
npm i --force

# Chạy game ở chế độ phát triển
npm run dev
```
## 📁 Project Directory Structure

<pre>
game_submission
│   README.md                → Project documentation and setup guide
│   project_report.pdf       → Detailed project report
│   youtube_link.txt         → Link to gameplay video demonstration
│
├───prompts
│     concept_prompts.txt → Prompts for idea generation
│     code_generation_prompts.txt → Prompts used for code creation
│     asset_generation_prompts.txt → Prompts for visual/asset generation
│     refinement_prompts.txt → Prompts used for debugging and polishing
│
├───game_app
│   ├───app          → Main application logic and routing
│   ├───components   → Reusable UI elements (cards, buttons, etc.)
│   ├───hooks        → Custom React hooks for game functionality
│   ├───lib          → Utility and helper functions
│   ├───public       → Static assets (images, icons, etc.)
│   └───styles       → Global and component-specific CSS styles
│
└───screenshots
      menu_screen.png → Main menu interface
      play_screen1.png → First in-game play screen
      play_screen2.png → Second in-game play screen
      play_screen3.png → Third in-game play screen
      result_screen.png → Final result summary screen

