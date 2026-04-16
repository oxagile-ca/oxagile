Build a complete, production-ready website for OxAgile Inc — a premier custom software development, QA, and AI workflow automation company. Deploy it via GitHub + Vercel.

---

## PROJECT SETUP

1. Initialize a Next.js 14 project (App Router) with TypeScript and Tailwind CSS:
   npx create-next-app@latest oxagile-website --typescript --tailwind --app --eslint

2. Initialize a git repo, create a GitHub repository called `oxagile-website`, push the initial commit.

3. Connect to Vercel:
   - Install Vercel CLI: npm i -g vercel
   - Run: vercel --yes
   - Link to a new Vercel project named `oxagile-website`
   - Set up auto-deploy from the main branch

---

## DESIGN DIRECTION

Aesthetic: Refined dark-mode corporate tech — think deep navy/slate backgrounds, crisp white typography, electric blue/cyan accent lines. Authoritative but modern. Inspired by Bloomberg Terminal meets Stripe's documentation precision.

Fonts (via Google Fonts):
- Display: "DM Serif Display" — for large headings
- Body: "DM Sans" — clean, readable

Color palette (Tailwind custom config):
- Background: #0A0F1E (deep navy)
- Surface: #111827 (dark card)
- Accent: #00D4FF (electric cyan)
- Accent secondary: #3B82F6 (blue)
- Text primary: #F1F5F9
- Text muted: #94A3B8
- Border: #1E293B

---

## PAGES & CONTENT

### 1. `/` — Home Page

**Hero Section:**
- Large headline: "Engineering Quality. Automating Excellence."
- Subtext: "OxAgile is a premier custom software development and QA firm — trusted by clients who demand precision, scalability, and intelligence in every release."
- Two CTA buttons: "Explore Our Services" (primary) + "Talk to Us" (ghost/outline)
- Animated background: subtle grid pattern or dot matrix in the background using CSS (no canvas)
- A thin horizontal glowing line (cyan) separating hero from next section

**Stats Bar** (animated count-up on scroll):
- 10+ Years Experience
- 200+ Projects Delivered
- 98% Client Satisfaction
- 3 Continents Served

**Services Overview** (cards grid, 3 columns):
- Custom Software Development
- QA & Test Automation
- AI Workflow Automation
Each card: icon + title + 2-line description + "Learn More →" link

**Who We Are Section:**
- Headline: "One Size Never Fits All"
- Body copy:
  "We cover all aspects of testing and development to ensure clients are confident delivering software to their users. Our experienced professionals begin every engagement by thoroughly understanding your needs — then craft a customized solution that fits like a glove."
- Small decorative element: vertical cyan line on left of paragraph block

**Why OxAgile** (icon list, 2 columns):
- Decade+ of QA expertise
- Handles all architecture types: web, standalone, client-server
- Dedicated maintenance & mentoring team
- AI-powered workflow automation
- Custom tooling for every engagement

**CTA Banner:**
- Dark section with: "Ready to Ship Better Software?" + "Get in Touch" button

---

### 2. `/services` — Services Page

Sections for each service:

**1. Custom Software Development**
Full-cycle product development. Web apps, APIs, microservices, cloud-native systems.

**2. Quality Assurance & Testing**
Manual testing, automated regression, performance testing, security testing. Supports web, standalone, and client-server architectures.

**3. AI Workflow Automation**
AI-assisted test generation, CI/CD pipeline intelligence, automated QA flows using LLMs and agent-based tools.

**4. Maintenance & Mentoring**
Post-delivery support, knowledge transfer, and client mentoring on testing best practices.

Each service: full-width card with left accent border (cyan), icon, title, description paragraph, and a list of 4–5 bullet capabilities.

---

### 3. `/about` — About Page

- Company overview using the provided content
- Timeline section (vertical, with years): 
  - 2013: Founded
  - 2016: Expanded QA services globally
  - 2020: Launched AI automation division
  - 2024: 200+ projects milestone
- Team values section: Quality First, Tailored Solutions, Long-term Partnership, Continuous Innovation

---

### 4. `/contact` — Contact Page

Simple contact form:
- Name, Email, Company, Message fields
- Submit button (no backend needed — use Formspree or just a styled static form with mailto fallback: contact@oxagile.com)
- Company info: contact@oxagile.com | +1 (555) 000-0000 | Based in North America

---

## COMPONENTS TO BUILD

### Navbar (`components/Navbar.tsx`)
- Logo: "OxAgile" in DM Serif Display with a small cyan dot or accent
- Links: Home, Services, About, Contact
- Sticky, with blur backdrop on scroll (`backdrop-blur-md bg-navy/80`)
- Mobile hamburger menu

### Footer (`components/Footer.tsx`)
- Logo + tagline: "Engineering Quality. Automating Excellence."
- Quick links
- Social icons (LinkedIn, GitHub — placeholder hrefs)
- Copyright: © 2024 OxAgile Inc. All rights reserved.

### Section wrapper with fade-in animation on scroll (use Intersection Observer or CSS `@keyframes` with class toggling)

---

## TECHNICAL REQUIREMENTS

- Next.js 14 App Router with TypeScript
- Tailwind CSS with custom theme extension in `tailwind.config.ts`
- Google Fonts loaded via `next/font/google`
- All pages server components (no "use client" unless needed for interactivity)
- Fully responsive (mobile-first)
- SEO: `metadata` export on every page with title, description, OG tags
- No external UI libraries (shadcn, MUI, etc.) — hand-crafted components only
- Smooth scroll behavior in globals.css
- Vercel Analytics: add `@vercel/analytics` and include `<Analytics />` in root layout

---

## DEPLOYMENT

1. After building, run: `npm run build` to verify no errors
2. Commit everything: `git add . && git commit -m "feat: initial OxAgile website"`
3. Push to GitHub: `git push origin main`
4. Run: `vercel --prod` to deploy to production
5. Output the final Vercel production URL

---

## FINAL CHECKLIST

- [ ] All 4 pages render without errors
- [ ] Mobile responsive
- [ ] Build passes (`npm run build`)
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel with production URL returned