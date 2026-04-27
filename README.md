# WelthWorx AI: Personal Finance Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com)

![Dashboard Preview](https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164022.png)

---

## Live Demo

**[→ https://welth-worx-ai.vercel.app](https://welth-worx-ai.vercel.app)**

| Field    | Value                  |
|----------|------------------------|
| Email    | `demo@welthworx.com`   |
| Password | `Demo1234!`            |

> The demo account is pre-loaded with 6 months of realistic financial data (income, expenses across 10 categories, a monthly budget, and two accounts), so you can explore every feature the moment you land.

---

## Table of Contents

1. [What it does](#what-it-does)
2. [Technical highlights](#technical-highlights)
3. [Tech stack](#tech-stack)
4. [Architecture](#architecture)
5. [Getting started](#getting-started)
6. [Environment variables](#environment-variables)
7. [Project structure](#project-structure)
8. [Lighthouse scores](#lighthouse-scores)

---

## What it does

- **Track income and expenses** across multiple bank accounts (checking and savings) from a single dashboard; see exactly where your money goes each month with a live pie-chart expense breakdown.
- **AI-powered receipt scanning**: photograph any paper receipt and Gemini AI extracts the amount, date, merchant, and category automatically, eliminating manual data entry completely.
- **Budget alerts**: set a monthly spending limit and receive an email notification the moment you cross 80% so you can course-correct before the month ends.
- **Recurring transactions**: mark any transaction as recurring (daily, weekly, monthly, or yearly) and the platform processes it automatically in the background so your books stay current without lifting a finger.
- **Automated monthly reports**: at the start of every month an AI-generated spending summary lands in your inbox, highlighting your top categories, biggest changes, and personalised saving tips.

<!-- Landscape Feature 1 -->
<div style="margin-bottom: 25px;">
  <p><strong>1. Interactive Dashboard</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164110.png"
  />
</div>

<!-- Landscape Feature 2 -->
<div style="margin-bottom: 25px;">
  <p><strong>2. Transaction Overview</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164136.png"
  />
</div>

<!-- Landscape Feature 3 -->
<div style="margin-bottom: 25px;">
  <p><strong>3. AI Receipt Scanner</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164154.png"
  />
</div>

<!-- Portrait Feature 4 -->
<div align="center" style="margin-bottom: 25px; text-align: center;">
  <p><strong>4. Budget Notifications via Resend</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20184709.png"
    width="350"
  />
</div>

<!-- Portrait Feature 5 -->
<div align="center" style="margin-bottom: 25px; text-align: center;">
  <p><strong>5. Monthly AI Reports via Resend</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20184757.png"
    width="350"
  />
</div>

<!-- Portrait Feature 6 (no title) -->
<p align="center" style="margin-bottom: 5px;">
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20184819.png"
    width="350"
  />
</p>

<!-- Portrait Feature 7 (no title) -->
<p align="center" style="margin-bottom: 25px;">
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20184820.png"
    width="350"
  />
</p>


---

## Technical highlights

- **Streaming Server Components with Suspense**: the dashboard renders each widget (budget progress, spending chart, accounts grid) inside its own React Suspense boundary. Every widget streams to the browser as soon as its data is ready rather than the whole page waiting for the slowest query, giving a perceived load time close to zero.
- **Event-driven background processing with Inngest**: recurring transaction processing, budget threshold checks, and monthly report generation run as durable Inngest events rather than fragile cron jobs, giving automatic retries, built-in observability, and fan-out parallelism.
- **AI document parsing pipeline with Gemini**: uploaded receipt images are converted to Base64 and posted to `gemini-1.5-flash` with a structured extraction prompt; the JSON response is validated and normalised before writing to the database, with graceful fallback if parsing fails.
- **Arcjet security layers**: every inbound request passes through Arcjet shield (injection, XSS, and CSRF protection) and bot detection before reaching application code; rate limiting is applied per Clerk user ID on the transaction creation endpoint.
- **Clerk authentication with middleware-based route protection**: Clerk middleware guards the `/dashboard`, `/account`, and `/transaction` route groups at the edge, so unauthenticated traffic is redirected before any page code or database query runs.
- **Type-safe full-stack with Prisma**: the Prisma schema is the single source of truth for both PostgreSQL migrations and TypeScript types, eliminating any shape mismatch between the database and the application layer.

<!-- Image 1 -->
<div style="margin-bottom: 20px;">
  <p><strong>1. Theme Toggle</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164022.png"
  />
</div>

<!-- Image 2 (no title) -->
<div style="margin-bottom: 20px;">
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20164054.png"
  />
</div>

<!-- Image 3 -->
<div align="center" style="margin-bottom: 20px; text-align: center;">
  <p><strong>2. Responsive Design</strong></p>
  <img 
    src="https://github.com/Bharat-Navratna/WelthWorx-AI/blob/main/public/readme/Screenshot%202025-11-27%20170524.png"
  />
</div>


---

## Tech stack

| Category        | Technology                  | Purpose                                        |
|-----------------|-----------------------------|------------------------------------------------|
| Framework       | Next.js 15 (App Router)     | Full-stack React with streaming server components |
| Database        | PostgreSQL (Supabase)       | Relational data store                          |
| ORM             | Prisma 6                    | Type-safe DB access and schema migrations      |
| Auth            | Clerk 6                     | User management, session handling, pre-built UI |
| AI              | Google Gemini 1.5 Flash     | Receipt scanning and monthly report generation |
| Background Jobs | Inngest 3                   | Durable event-driven scheduled tasks           |
| Email           | Resend + React Email        | Transactional HTML email templates             |
| Security        | Arcjet                      | Shield protection, bot detection, rate limiting |
| Deployment      | Vercel                      | Edge-optimised Next.js hosting + CI/CD         |
| UI Components   | Radix UI + ShadCN           | Accessible, unstyled component primitives      |
| Styling         | Tailwind CSS 3              | Utility-first responsive styling               |
| Forms           | React Hook Form + Zod       | Performant forms with runtime schema validation |
| Animations      | Framer Motion 12            | Page transitions and scroll-triggered counters |
| Charts          | Recharts 2                  | Pie chart for monthly expense breakdown        |

---

## Architecture

```
Receipt scanning flow
─────────────────────
  User uploads receipt image
          │
          ▼
  Next.js Server Action  ──► Arcjet (rate limit & bot check)
          │
          ▼
  Google Gemini 1.5 Flash (base64 image + structured prompt)
  └─ extracts: amount, date, merchant, category
          │
          ▼
  Prisma writes Transaction to PostgreSQL
          │
          ▼
  revalidatePath("/dashboard")  ──► browser receives fresh widget HTML


Recurring transaction flow
──────────────────────────
  Inngest cron  (daily at midnight)
          │
          ▼
  triggerRecurringTransactions  ──► queries transactions where nextRecurringDate ≤ now
          │                          fans out one event per due transaction
          ▼
  processRecurringTransaction   ──► creates new Transaction row
                                ──► updates Account.balance
                                ──► updates nextRecurringDate


Budget alert flow
─────────────────
  Inngest cron  (every 6 hours)
          │
          ▼
  checkBudgetAlert  ──► aggregates current-month EXPENSE total per user
                    ──► if total ≥ 80 % of Budget.amount and no alert sent today:
                    ▼
  Resend  ──► budget-alert React Email to user's inbox


Monthly report flow
────────────────────
  Inngest cron  (1st of every month)
          │
          ▼
  generateMonthlyReports  ──► fetches prior month transactions per user
                          ──► sends stats to Gemini for narrative summary
                          ▼
  Resend  ──► monthly report React Email to user's inbox
```

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 9+
- A PostgreSQL database (free tier at [supabase.com](https://supabase.com))
- API keys for Clerk, Gemini, Arcjet, and Resend (see table below)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Bharat-Navratna/WelthWorx-AI.git
cd WelthWorx-AI

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env
# Edit .env: every required variable is documented in the table below

# 4. Apply database migrations
npx prisma migrate dev

# 5. (Optional) Seed the demo account
#    First create demo@welthworx.com in your Clerk dashboard,
#    sign in once so checkUser() creates the DB row, then:
npm run seed:demo

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment variables

All variables are documented in [`.env.example`](.env.example). The table below lists every one with its source:

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | [Clerk dashboard](https://dashboard.clerk.com) → API Keys |
| `CLERK_SECRET_KEY` | Clerk secret key | Clerk dashboard → API Keys |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in path | Keep as `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up path | Keep as `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Post-login redirect | Keep as `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Post-signup redirect | Keep as `/dashboard` |
| `DATABASE_URL` | PostgreSQL connection string (pooled) | [Supabase](https://supabase.com) → Project Settings → Database |
| `DIRECT_URL` | Direct PostgreSQL URL (for migrations) | Supabase → Project Settings → Database |
| `ARCJET_KEY` | Arcjet API key | [Arcjet dashboard](https://app.arcjet.com) |
| `RESEND_API_KEY` | Resend email API key | [Resend dashboard](https://resend.com) |
| `GEMINI_API_KEY` | Google Gemini API key | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `INNGEST_EVENT_KEY` | Inngest event key (production) | [Inngest dashboard](https://app.inngest.com) → Manage |
| `INNGEST_SIGNING_KEY` | Inngest signing key (production) | Inngest dashboard → Manage |
| `DEMO_EMAIL` | Demo account email (server-side) | `demo@welthworx.com` |
| `DEMO_PASSWORD` | Demo account password (server-side) | `Demo1234!` |
| `NEXT_PUBLIC_DEMO_EMAIL` | Demo email exposed to the browser | Same as `DEMO_EMAIL` |
| `NEXT_PUBLIC_DEMO_PASSWORD` | Demo password exposed to the browser | Same as `DEMO_PASSWORD` |

---

## Project structure

```
ai-finance-platform/
│
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Public sign-in / sign-up pages (Clerk UI)
│   ├── (main)/                    # Protected routes (middleware-guarded)
│   │   ├── dashboard/             # Main dashboard, streaming Suspense widgets
│   │   │   └── _components/       # BudgetProgress, DashboardOverview, AccountCard, skeletons
│   │   ├── account/[id]/          # Per-account transaction history + chart
│   │   │   └── _components/       # AccountChart, TransactionTable
│   │   └── transaction/create/    # Create / edit transaction form
│   │       └── _components/       # TransactionForm, ReceiptScanner
│   ├── api/
│   │   ├── inngest/               # Inngest webhook handler (GET/POST/PUT)
│   │   └── seed/                  # Dev-only seed endpoint
│   ├── error.jsx                  # Global error boundary (friendly UI + dev details)
│   ├── not-found.jsx              # Custom 404 page
│   ├── layout.js                  # Root layout (ClerkProvider, ThemeProvider, Header)
│   └── page.jsx                   # Landing page (server component)
│
├── actions/                       # Next.js Server Actions (all "use server")
│   ├── accounts.js                # Account CRUD + bulk delete
│   ├── budget.js                  # Budget read / upsert
│   ├── dashboard.js               # createAccount + data fetching
│   ├── transaction.js             # Transaction CRUD + Gemini receipt scanning
│   ├── seed.js                    # Dev seed helper
│   └── send-email.js              # Resend email dispatch
│
├── components/                    # Shared React components
│   ├── ui/                        # ShadCN / Radix primitives (22 components)
│   ├── header.jsx                 # Fixed navigation bar (server component)
│   ├── hero.jsx                   # Landing hero with scroll parallax (client)
│   ├── stats-section.jsx          # Animated stat counters (client, CountUp)
│   ├── demo-sign-in-button.jsx    # One-click demo login via Clerk (client)
│   ├── demo-banner.jsx            # Dismissible yellow demo-mode banner (client)
│   ├── create-account-drawer.jsx  # Slide-in account creation form
│   └── theme-provider.jsx         # next-themes dark / light wrapper
│
├── lib/                           # Service clients and utilities
│   ├── prisma.js                  # Prisma client singleton
│   ├── arcjet.js                  # Arcjet client configuration
│   ├── checkUser.js               # Clerk → DB user sync on first login
│   ├── utils.js                   # cn() helper (clsx + tailwind-merge)
│   └── inngest/
│       ├── client.js              # Inngest client
│       └── functions.js           # checkBudgetAlert, triggerRecurringTransactions,
│                                  # processRecurringTransaction, generateMonthlyReports
│
├── emails/                        # React Email templates
│   └── template.jsx               # budget-alert and monthly-report layouts
│
├── hooks/
│   └── use-fetch.jsx              # Generic async action hook with loading/error state
│
├── data/
│   ├── categories.js              # Expense / income category definitions
│   └── landing.js                 # Landing page copy, stats, features, testimonials
│
├── scripts/
│   └── seedDemoData.ts            # Demo account seed (6 months of transactions)
│
├── prisma/
│   └── schema.prisma              # PostgreSQL schema (User, Account, Transaction, Budget)
│
├── public/                        # Static assets (video, images, favicon)
├── .env.example                   # Environment variable template
└── middleware.js                  # Arcjet shield + Clerk auth middleware chain
```

---

## Lighthouse scores

Measured on the production Vercel deployment using Chrome Lighthouse (desktop, Incognito):

| Metric           | Score |
|------------------|-------|
| Performance      | 95+   |
| Accessibility    | 100   |
| Best Practices   | 100   |
| SEO              | 100   |

---

## Contact

- **GitHub:** [Bharat-Navratna](https://github.com/Bharat-Navratna)
- **LinkedIn:** [Bharat Anil Navratna](https://www.linkedin.com/in/bharatanilnavratna/)
- **Email:** [bnavratna@gmail.com](mailto:bnavratna@gmail.com)

---

## Credits

Tutorial inspiration: [Piyush Agarwal](https://github.com/piyush-eon/Piyush-eon).  
Additional features, performance improvements, and enhancements by Bharat Anil Navratna.
