# 🌟 Modern Full-Stack MERN Portfolio with Secret Inline Owner Mode

A state-of-the-art, glassmorphism-themed personal developer portfolio built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. 

Featuring an innovative **Zero-Public-Login "Owner Mode"**, allowing you to live-edit your entire portfolio directly on the page without cluttering your public showcase with login screens.

---

## ✨ Features & Highlights

- ⚡ **Full MERN Architecture**: Express.js REST API + MongoDB Mongoose backend paired with a blazing-fast React (Vite) client.
- 🔐 **Secret Owner Editing Mode (No Public Login)**:
  - Press **`Ctrl + Shift + E`** anywhere on the page, or click the discreet lock emblem in the footer.
  - Enter your secret PIN (Default: `1234`) to unlock live editing.
  - Instantly reveals **`[+ Add]`**, **`[✎ Edit]`**, and **`[🗑 Delete]`** buttons on every section.
  - Floating Owner Dock allows toggling between **"Owner Mode"** and **"Visitor Preview"** to see how public visitors view the site.
- 🚀 **Comprehensive Portfolio Sections**:
  - **Hero & Intro**: Dynamic typing role effect, profile photo upload, download CV/Resume button, social channels, and live experience/project statistics.
  - **About Me**: Highlighting core competencies, developer strengths, and direct contact badges.
  - **Skills & Arsenal**: Categorized interactive skills (Frontend, Backend, Database, Tools & DevOps) with proficiency percentages and glowing progress bars.
  - **Work Experience**: Vertical neon timeline with role, company, dates, and bulleted achievements.
  - **Education**: Academic degrees, institutions, graduation dates, and GPA/distinction honors.
  - **Projects Showcase**: Filterable grid (All, Fullstack, Frontend, Backend, Featured) with live preview buttons, GitHub repository links, and tech stack chips.
  - **Certifications & Awards**: Verified credentials with direct verification links and skill tags.
  - **Direct Contact**: Interactive contact inquiry form delivering messages to your database, accompanied by one-click email copy.
- 💾 **Dual-Mode Persistence (MongoDB + JSON Fallback)**:
  - Connects out of the box with MongoDB.
  - Automatically falls back to resilient local JSON database (`server/data/portfolioData.json`) if MongoDB service is offline, ensuring 100% zero-configuration startup.

---

## 🛠️ Quick Start

### 1. Run Backend & Frontend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
- **Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

### 2. Or Run Separately

#### Backend Server:
```bash
cd server
npm install
npm run dev
```

#### Frontend Client:
```bash
cd client
npm install
npm run dev
```

---

## 🔑 How to Use Secret Owner Mode

1. Open the portfolio at `http://localhost:5173`.
2. Press **`Ctrl + Shift + E`** on your keyboard (or click the subtle lock icon at the bottom of the footer).
3. Enter PIN: **`1234`** (or your custom PIN).
4. You now have full inline control:
   - Click **`+ Add New Project`**, **`+ Add Experience`**, **`+ Add Education`**, etc.
   - Hover any card to **Edit** or **Delete**.
   - Click **"Edit Profile"** in the floating bottom dock or hover your avatar to upload a new profile photo or PDF resume.
5. Click **"Preview as Visitor"** anytime to check how guests view your portfolio.
