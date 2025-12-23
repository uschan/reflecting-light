# 回光 | Reflecting Light

> “神像背坐，叹众生不肯回头。”
>
> "The God sits with his back turned, sighing that sentient beings refuse to turn back."

![Project Status](https://img.shields.io/badge/Status-Beta-c5a059?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-2d2d2d?style=flat-square)
![Tech](https://img.shields.io/badge/Stack-React%20%7C%20Gemini%202.5-8a3324?style=flat-square)

**Reflecting Light** 是一个基于生成式 AI 的哲学冥想应用。它不仅仅是一个问答工具，更是一个数字化的修心道场。它利用 Google Gemini 的多模态能力（文本、图像、语音），将用户的执念具象化，并通过独特的交互仪式帮助用户“看见”并“放下”。

---

## 🎐 核心体验 | The Experience

项目围绕“**观、显、解、判、空**”五个阶段构建：

1.  **观照 (Diagnose)**: 通过抽取“心相牌”与自我陈述，剖析内心深处的痛苦根源（Loss, Desire, Self, etc.）。
2.  **显化 (Visualize)**: 调用 `gemini-2.5-flash-image`，将抽象的痛苦生成为一副超现实主义的竖版画作——这是你的“心魔”。
3.  **解脱 (Release)**: 独特的交互仪式。用户必须长按画面，通过视觉特效将“心魔”烧毁/消融，寓意“看见即是解脱的开始”。
4.  **解惑 (Interpret)**: 
    *   **空谷回响**: 调用 `gemini-2.5-flash-preview-tts`，以神性低沉的嗓音朗读核心偈语。
    *   **三镜照心**: 自性、境遇、回首，三维解析执念。
5.  **枯荣 (Enlighten)**: 类似枯山水的历史档案页，记录每一次的叩问与觉醒。

---

## 🛠 技术栈 | Tech Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS (Custom Zen Color Palette)
*   **Icons**: Lucide React
*   **AI Engine**: Google Gemini API (`@google/genai` SDK)
    *   Logic/Reasoning: `gemini-2.5-flash`
    *   Art Generation: `gemini-2.5-flash-image`
    *   Voice Synthesis: `gemini-2.5-flash-preview-tts`

---

## 🚀 快速开始 | Quick Start

### 前置要求

1.  Node.js (v18+)
2.  Google Cloud Project API Key (需开通 Gemini API 权限，且该 Key 需支持付费/Tier-1 以使用 Image 和 TTS 模型)。

### 本地开发

1.  **克隆项目**
    ```bash
    git clone https://github.com/your-username/reflecting-light.git
    cd reflecting-light
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **配置环境变量**
    在根目录创建 `.env` 文件（或直接在启动命令中注入）：
    ```env
    # 注意：本项目代码中使用 process.env.API_KEY
    # 如果使用 Vite 默认配置，请确保通过 define 注入或修改代码适配 import.meta.env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **启动开发服务器**
    ```bash
    # Linux/Mac
    export API_KEY=your_key_here && npm run dev
    
    # Windows (PowerShell)
    $env:API_KEY="your_key_here"; npm run dev
    ```

---

## ☁️ 部署到 VPS | Deploy to VPS

本项目为静态单页应用 (SPA)，推荐使用 Nginx 进行托管。

### 1. 准备环境
确保你的 VPS 已安装 Node.js 和 Nginx。

### 2. 构建项目
在服务器上拉取代码后，执行构建。**注意：API Key 会被打包进前端代码中，请确保不要将构建后的代码发布到公共且不可控的环境，或者限制 API Key 的 HTTP Referrer 来源。**

```bash
# 替换为你的真实 Key
export API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxx
npm install
npm run build
```

构建完成后，会生成 `dist` 目录。

### 3. 配置 Nginx
编辑 Nginx 配置文件 (例如 `/etc/nginx/sites-available/reflecting-light`)：

```nginx
server {
    listen 80;
    server_name your-domain.com; # 替换为你的域名或 IP

    root /path/to/reflecting-light/dist; # 替换为实际 dist 路径
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript image/jpeg image/gif image/png;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

### 4. 启动服务
```bash
sudo ln -s /etc/nginx/sites-available/reflecting-light /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🛡️ 安全提示 | Security Note

由于本项目是纯前端应用，Gemini API Key 需要在构建时注入。
1.  **限制来源**: 请务必在 Google Cloud Console 中，限制 API Key 的 **HTTP Referrer** 为你的部署域名。
2.  **用量限额**: 建议设置 API 配额上限，防止意外消耗。

---

## 🎨 设计哲学 | Design Philosophy

*   **极简 (Minimalism)**: 界面无多余元素，留白即是思考空间。
*   **沉浸 (Immersion)**: 声音、动画、文字的节奏经过精心调校（Vibe Engineering）。
*   **非线性 (Non-linear)**: 救赎不是一条直线，而是一次次回头的尝试。

---

## 📄 License

MIT License. 

---

*Built with ❤️ and ☕ by [Your Name]*
