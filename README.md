# 💰 WelthWorx AI (AI-Powered Finance Platform)

![Dashboard Preview](https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164022.png)

A full-stack, AI-enhanced personal finance app that helps users manage bank accounts, scan receipts using AI, track expenses, and receive insightful reports — all in one elegant dashboard.

> Built as a portfolio project to showcase my front-end and full-stack development skills, with a focus on real-world functionality, clean UI/UX, and modern tooling with additional enhancements like Dark mode and responsive layout refinements. Targeted for entry-level, graduate, or internship roles.

---

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🧩 Additional Enhancements](#-additional-enhancements)
- [🌐 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#-tech-stack)
- [🖼️ Screenshots](#-screenshots)
- [📂 Project Structure](#-project-structure)
- [🧑‍💻 Getting Started](#-getting-started)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-dependencies)
  - [Set Up Environment Variables](#3-set-up-environment-variables)
  - [Push Prisma Schema to the Database](#4-push-prisma-schema-to-the-database)
  - [Start the Development Server](#5-start-the-development-server)
- [🎯 My Learning Outcomes](#-my-learning-outcomes)
- [📬 Contact](#-contact)
- [⭐ Credits](#-credits)

---

## 🚀 Features

- 📥 **Multi-Account Management** – Track balances across accounts
- 🧠 **AI Receipt Scanner** – Extract data from uploaded receipts (Google Gemini API)
- 💸 **Transaction Categorization** – Auto-classify expenses and income
- 🔁 **Recurring Transactions** – Schedule regular bills/income
- 📊 **Interactive Dashboards** – Visualize trends using charts
- 🧾 **Monthly AI Reports** – Summarized reports sent via email
- 🔔 **Budget Notifications** – Alerts when spending nears limits
- 🔐 **Authentication** – Google/Email login with Clerk
- ⚙️ **Background Jobs** – Handled via Inngest for recurring logic
- 🛡️ **Rate Limiting & Security** – Powered by Arcjet
- 📧 **Email Integration** – Notifications and reports via Resend

---

## 🧩 Additional Enhancements

- 🌗 **Theme Toggle** – Light and dark mode support with smooth transitions  
- 📱 **Responsive Design Fixes (WIP)** – Identified layout bugs (e.g. misaligned text) on small screens and plan to polish UI further  

> These features were added on top of the original tutorial to practice real-world UI/UX enhancements and front-end refinement.

---

## 🌐 Live Demo

The project is deployed on Vercel:
 https://welth-worx-ai.vercel.app

---

## 🛠️ Tech Stack

| Frontend      | Backend               | Tools & APIs              | Styling          |
|---------------|-----------------------|---------------------------|------------------|
| Next.js 15.2  | Prisma ORM            | Google Gemini API         | Tailwind CSS     |
| React 18.2    | Supabase (PostgreSQL) | Inngest (Background Jobs) | ShadCN UI        |
| Clerk Auth    |                       | Resend (Email)            | Tailwind Animate |
| Arcjet        |                       | Zod + React Hook Form     | Lucide Icons     |
| Recharts      |                       |                           | Sonner Toasts    |

---

## 📂 Project Structure

```text
📦 WelthWorx-AI
├── actions/                  # Server actions (accounts, budget, dashboard, etc.)
├── app/                      # App Router structure
│   ├── (auth)/               # Sign-in & Sign-up pages
│   ├── (main)/               # Main app views (account, dashboard, transaction)
│   └── api/                  # API route handlers (e.g. Inngest, Seed)
├── components/               # Reusable components
│   ├── ui/                   # UI kit elements (buttons, inputs, drawer, etc.)
│   ├── create-account-drawer.jsx
│   ├── header.jsx
│   ├── hero.jsx
│   └── theme-provider.jsx
├── data/                     # Static data files (e.g. categories, landing page)
├── emails/                   # Email templates (React Email)
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities (prisma client, auth, Arcjet, etc.)
│   └── inngest/              # Background job handlers
├── prisma/                   # Prisma schema and DB migrations
│   └── schema.prisma
├── public/                   # Static assets
├── .env                      # Environment variables
├── middleware.js             # Middleware logic
├── tailwind.config.js        # Tailwind CSS config
├── next.config.mjs           # Next.js config
├── package.json              # Project metadata & scripts
├── README.md                 # Project overview (you’re reading it!)
└── LICENSE                   # Project license
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Bharat-Navratna/WelthWorx-AI.git
cd WelthWorx-AI
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:
```
DATABASE_URL=your_postgres_url
DIRECT_URL=your_postgres_direct_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
ARCJET_API_KEY=your_arcjet_key
```
💡 Tip: You can get a free PostgreSQL database by using [Supabase](https://supabase.com/)

### 4. Push Prisma Schema to the Database

```bash
npx prisma db push
```

### 5. Start the Development Server

```bash
npm run dev
```
Your app will be running locally at: http://localhost:3000

---

## 🎯 My Learning Outcomes

- Gain experience with full-stack architecture using Next.js 15 App Router.

- Build real-world AI integrations (Google Gemini API).

- Learn authentication flows using Clerk and secure route access.

- Use Prisma ORM + Supabase for production-ready DB handling.

- Implement background job scheduling using Inngest.

- Create styled, accessible UI with Tailwind CSS and ShadCN UI.

- Automate email workflows with Resend.

- Add dark/light theme support with persistent state

- Debug and fix layout bugs for improved mobile responsiveness

---

## 📬 Contact

If you're hiring or collaborating, I’d love to connect:

- **GitHub:** [Bharat-Navratna](https://github.com/Bharat-Navratna)

- **LinkedIn:** [Bharat Anil Navratna](https://www.linkedin.com/in/bharatanilnavratna/)

- **Email:** [bnavratna@gmail.com](mailto:bnavratna@gmail.com)

---

## ⭐ Credits

- Huge thanks to [Piyush Agarwal](https://github.com/piyush-eon/Piyush-eon) for the tutorial that inspired this project.

---
