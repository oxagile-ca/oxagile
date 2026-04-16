# OxAgile Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a complete, production-ready 4-page marketing website for OxAgile Inc using Next.js 14 App Router with TypeScript and Tailwind CSS, deployed to Vercel via GitHub.

**Architecture:** Next.js 14 App Router with server components as the default, "use client" only where interactivity is needed (Navbar mobile menu, stats counter, scroll animations). Pages are static — no backend or database. Contact form uses mailto fallback.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS (custom theme), Google Fonts (DM Serif Display + DM Sans), Vercel Analytics, Formspree/mailto contact form, Vercel for deployment.

---

## File Structure

```
oxagile-website/           ← Next.js project root (created by create-next-app)
├── app/
│   ├── layout.tsx         ← Root layout: fonts, Navbar, Footer, Analytics
│   ├── globals.css        ← Base styles, smooth scroll, glow line utility
│   ├── page.tsx           ← Home page (/)
│   ├── services/
│   │   └── page.tsx       ← Services page (/services)
│   ├── about/
│   │   └── page.tsx       ← About page (/about)
│   └── contact/
│       └── page.tsx       ← Contact page (/contact)
├── components/
│   ├── Navbar.tsx         ← Sticky navbar with mobile hamburger (client)
│   ├── Footer.tsx         ← Footer with links + copyright
│   ├── SectionWrapper.tsx ← Fade-in on scroll wrapper (client)
│   ├── StatsBar.tsx       ← Animated count-up stats (client)
│   └── ServiceCard.tsx    ← Reusable card for services grid
├── tailwind.config.ts     ← Custom color palette + font config
└── next.config.ts         ← Standard Next.js config
```

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `oxagile-website/` (entire project via CLI)
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Scaffold the Next.js project**

Run from `/c/Users/ankit/OneDrive/Documents/oxagile/`:
```bash
npx create-next-app@latest oxagile-website --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"
cd oxagile-website
```

- [ ] **Step 2: Install Vercel Analytics**

```bash
npm install @vercel/analytics
```

- [ ] **Step 3: Replace tailwind.config.ts with custom theme**

Replace the entire file `oxagile-website/tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A0F1E',
        surface: '#111827',
        accent: '#00D4FF',
        'accent-blue': '#3B82F6',
        'text-primary': '#F1F5F9',
        'text-muted': '#94A3B8',
        border: '#1E293B',
      },
      fontFamily: {
        display: ['var(--font-dm-serif)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Replace globals.css**

Replace the entire file `oxagile-website/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0A0F1E;
  color: #F1F5F9;
  font-family: var(--font-dm-sans), sans-serif;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.glow-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #00D4FF, transparent);
  box-shadow: 0 0 8px #00D4FF;
}

/* Dot grid background */
.dot-grid {
  background-image: radial-gradient(circle, #1E293B 1px, transparent 1px);
  background-size: 32px 32px;
}
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: Server starts on http://localhost:3000 with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 14 project with custom Tailwind theme"
```

---

### Task 2: Root Layout — Fonts, Navbar, Footer scaffolds

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Navbar component**

Create `oxagile-website/components/Navbar.tsx`:
```tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-navy/80 border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl text-text-primary">
          Ox<span className="text-accent">.</span>Agile
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text-muted hover:text-accent transition-colors text-sm font-body"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-muted focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-text-muted hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Create Footer component**

Create `oxagile-website/components/Footer.tsx`:
```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl text-text-primary mb-2">
            Ox<span className="text-accent">.</span>Agile
          </p>
          <p className="text-text-muted text-sm">Engineering Quality. Automating Excellence.</p>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-text-primary font-semibold mb-4 text-sm">Quick Links</p>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/services', label: 'Services' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-text-muted hover:text-accent transition-colors text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-text-primary font-semibold mb-4 text-sm">Connect</p>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border text-center py-4 text-text-muted text-xs">
        © 2024 OxAgile Inc. All rights reserved.
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Update root layout with fonts, Navbar, Footer, Analytics**

Replace the entire `oxagile-website/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'OxAgile — Engineering Quality. Automating Excellence.',
  description:
    'OxAgile is a premier custom software development and QA firm — trusted by clients who demand precision, scalability, and intelligence in every release.',
  openGraph: {
    title: 'OxAgile — Engineering Quality. Automating Excellence.',
    description:
      'Custom software development, QA & test automation, and AI workflow automation.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="bg-navy text-text-primary font-body flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build compiles**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript or ESLint errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add root layout with DM fonts, Navbar, Footer, Analytics"
```

---

### Task 3: SectionWrapper and StatsBar shared components

**Files:**
- Create: `components/SectionWrapper.tsx`
- Create: `components/StatsBar.tsx`

- [ ] **Step 1: Create SectionWrapper (fade-in on scroll)**

Create `oxagile-website/components/SectionWrapper.tsx`:
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ children, className = '' }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create StatsBar (count-up animation)**

Create `oxagile-website/components/StatsBar.tsx`:
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: 'Years Experience', value: 10, suffix: '+' },
  { label: 'Projects Delivered', value: 200, suffix: '+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
  { label: 'Continents Served', value: 3, suffix: '' },
]

function useCountUp(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 1500, active)
  return (
    <div className="text-center">
      <p className="text-4xl font-display text-accent">
        {count}
        {stat.suffix}
      </p>
      <p className="text-text-muted text-sm mt-1">{stat.label}</p>
    </div>
  )
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-surface border border-border rounded-xl px-8 py-10"
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={active} />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SectionWrapper fade-in and StatsBar count-up components"
```

---

### Task 4: ServiceCard shared component

**Files:**
- Create: `components/ServiceCard.tsx`

- [ ] **Step 1: Create ServiceCard**

Create `oxagile-website/components/ServiceCard.tsx`:
```tsx
import Link from 'next/link'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  href: string
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-accent transition-colors duration-300">
      <span className="text-4xl">{icon}</span>
      <h3 className="text-text-primary font-display text-xl">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      <Link
        href={href}
        className="text-accent text-sm hover:underline mt-auto"
      >
        Learn More →
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ServiceCard.tsx
git commit -m "feat: add reusable ServiceCard component"
```

---

### Task 5: Home Page (`/`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the Home page**

Replace the entire `oxagile-website/app/page.tsx`:
```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import StatsBar from '@/components/StatsBar'
import SectionWrapper from '@/components/SectionWrapper'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'OxAgile — Engineering Quality. Automating Excellence.',
  description:
    'OxAgile is a premier custom software development and QA firm trusted by clients who demand precision, scalability, and intelligence.',
  openGraph: {
    title: 'OxAgile — Home',
    description:
      'Custom software development, QA automation, and AI workflow automation.',
  },
}

const services = [
  {
    icon: '⚙️',
    title: 'Custom Software Development',
    description:
      'Full-cycle product development — web apps, APIs, microservices, and cloud-native systems built to scale.',
    href: '/services#software',
  },
  {
    icon: '🔬',
    title: 'QA & Test Automation',
    description:
      'Manual testing, automated regression, performance and security testing across all architecture types.',
    href: '/services#qa',
  },
  {
    icon: '🤖',
    title: 'AI Workflow Automation',
    description:
      'AI-assisted test generation, CI/CD pipeline intelligence, and automated QA flows using LLMs and agents.',
    href: '/services#ai',
  },
]

const whyItems = [
  'Decade+ of QA expertise',
  'Handles all architecture types: web, standalone, client-server',
  'Dedicated maintenance & mentoring team',
  'AI-powered workflow automation',
  'Custom tooling for every engagement',
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          <h1 className="font-display text-5xl md:text-7xl text-text-primary leading-tight mb-6">
            Engineering Quality.<br />
            <span className="text-accent">Automating Excellence.</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            OxAgile is a premier custom software development and QA firm — trusted by clients
            who demand precision, scalability, and intelligence in every release.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-accent text-navy font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="border border-accent text-accent px-8 py-3 rounded-lg hover:bg-accent/10 transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* Glow separator */}
      <div className="glow-line" />

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <StatsBar />
      </section>

      {/* Services Overview */}
      <SectionWrapper>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-display text-4xl text-text-primary text-center mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc) => (
              <ServiceCard key={svc.title} {...svc} />
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Who We Are */}
      <SectionWrapper>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex gap-6 items-start">
            <div className="w-1 flex-shrink-0 bg-accent rounded-full self-stretch" />
            <div>
              <h2 className="font-display text-4xl text-text-primary mb-6">
                One Size Never Fits All
              </h2>
              <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
                We cover all aspects of testing and development to ensure clients are confident
                delivering software to their users. Our experienced professionals begin every
                engagement by thoroughly understanding your needs — then craft a customized
                solution that fits like a glove.
              </p>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Why OxAgile */}
      <SectionWrapper>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-display text-4xl text-text-primary text-center mb-12">
            Why OxAgile
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <span className="text-accent mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </SectionWrapper>

      {/* CTA Banner */}
      <section className="bg-surface border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-text-primary mb-6">
            Ready to Ship Better Software?
          </h2>
          <Link
            href="/contact"
            className="bg-accent text-navy font-semibold px-10 py-4 rounded-lg hover:bg-accent/90 transition-colors inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```
Open http://localhost:3000. Verify: hero text, stats bar, 3 service cards, who we are section, why oxagile list, CTA banner. Check mobile layout (resize browser to 375px).

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build home page with hero, stats, services, and CTA sections"
```

---

### Task 6: Services Page (`/services`)

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Write the Services page**

Create `oxagile-website/app/services/page.tsx`:
```tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper'

export const metadata: Metadata = {
  title: 'Services — OxAgile',
  description:
    'Custom software development, QA & test automation, AI workflow automation, and maintenance & mentoring services from OxAgile.',
  openGraph: {
    title: 'Services — OxAgile',
    description: 'Full-cycle software development, QA, and AI automation services.',
  },
}

const services = [
  {
    id: 'software',
    icon: '⚙️',
    title: 'Custom Software Development',
    description:
      'Full-cycle product development for businesses that need reliable, scalable software. We handle everything from architecture design to deployment.',
    capabilities: [
      'Web application development (React, Next.js, Node.js)',
      'RESTful API and microservices design',
      'Cloud-native architecture on AWS, GCP, or Azure',
      'Database design and optimization',
      'Third-party integrations and payment systems',
    ],
  },
  {
    id: 'qa',
    icon: '🔬',
    title: 'Quality Assurance & Testing',
    description:
      'Manual and automated testing across all architecture types — web, standalone, and client-server. We ensure your software ships without surprises.',
    capabilities: [
      'Manual exploratory and regression testing',
      'Automated test suite development (Playwright, Cypress, Selenium)',
      'Performance and load testing',
      'Security and penetration testing',
      'Web, standalone, and client-server application support',
    ],
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI Workflow Automation',
    description:
      'Intelligent automation that makes your development pipeline faster and smarter — using LLMs, agent-based tools, and CI/CD intelligence.',
    capabilities: [
      'AI-assisted test case generation',
      'CI/CD pipeline intelligence and optimization',
      'Automated QA flows using LLM agents',
      'Intelligent bug triage and root cause analysis',
      'Custom AI tooling for your engineering workflow',
    ],
  },
  {
    id: 'maintenance',
    icon: '🛠️',
    title: 'Maintenance & Mentoring',
    description:
      'Long-term partnership after delivery — keeping your software healthy and your team sharp on testing best practices.',
    capabilities: [
      'Post-delivery monitoring and bug fixes',
      'Knowledge transfer sessions',
      'QA best-practice training for your team',
      'Documentation and process improvement',
      'On-demand technical support',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl text-text-primary mb-4">Our Services</h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            End-to-end software engineering and quality assurance — tailored to your stack,
            your team, and your release cadence.
          </p>
        </div>

        {/* Service blocks */}
        <div className="flex flex-col gap-8">
          {services.map((svc) => (
            <SectionWrapper key={svc.id}>
              <div
                id={svc.id}
                className="border-l-4 border-accent bg-surface rounded-r-xl px-8 py-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{svc.icon}</span>
                  <h2 className="font-display text-3xl text-text-primary">{svc.title}</h2>
                </div>
                <p className="text-text-muted text-base leading-relaxed mb-6">
                  {svc.description}
                </p>
                <ul className="space-y-2">
                  {svc.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3 text-text-muted text-sm">
                      <span className="text-accent mt-0.5">▸</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000/services. Verify: 4 service cards with left cyan border, icon, description, bullet list. Check mobile.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: build services page with 4 service sections"
```

---

### Task 7: About Page (`/about`)

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write the About page**

Create `oxagile-website/app/about/page.tsx`:
```tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper'

export const metadata: Metadata = {
  title: 'About — OxAgile',
  description:
    'Learn about OxAgile — our history, mission, and the values that drive every client engagement.',
  openGraph: {
    title: 'About — OxAgile',
    description: 'A decade of QA expertise, global reach, and a commitment to tailored solutions.',
  },
}

const timeline = [
  { year: '2013', event: 'Founded with a focus on quality-first software delivery.' },
  { year: '2016', event: 'Expanded QA services globally across North America and Europe.' },
  { year: '2020', event: 'Launched AI automation division — LLM-powered testing and CI/CD intelligence.' },
  { year: '2024', event: 'Reached the 200+ projects milestone, serving clients on 3 continents.' },
]

const values = [
  {
    title: 'Quality First',
    description: 'Every line of code and every test case is held to the highest standard before it ships.',
  },
  {
    title: 'Tailored Solutions',
    description: 'We start by understanding your exact needs — never a cookie-cutter approach.',
  },
  {
    title: 'Long-term Partnership',
    description: 'We invest in relationships that outlast individual projects.',
  },
  {
    title: 'Continuous Innovation',
    description: 'We adopt new tools — including AI — when they genuinely make you ship better software.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl text-text-primary mb-4">About OxAgile</h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
              We are a premier custom software development and QA firm with over a decade of
              experience helping clients ship reliable, scalable, and intelligent software.
            </p>
          </div>
        </SectionWrapper>

        {/* Timeline */}
        <SectionWrapper>
          <section className="mb-20">
            <h2 className="font-display text-3xl text-text-primary mb-10">Our Journey</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
              <div className="flex flex-col gap-10">
                {timeline.map((item) => (
                  <div key={item.year} className="flex items-start gap-6 pl-14 relative">
                    {/* Dot */}
                    <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-accent bg-navy" />
                    <div>
                      <p className="text-accent font-semibold font-display text-xl mb-1">
                        {item.year}
                      </p>
                      <p className="text-text-muted">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* Team Values */}
        <SectionWrapper>
          <section>
            <h2 className="font-display text-3xl text-text-primary mb-10">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="text-accent font-semibold mb-2">{v.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionWrapper>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000/about. Verify: intro paragraph, vertical timeline with 4 entries, 4 value cards. Check mobile layout.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: build about page with timeline and team values"
```

---

### Task 8: Contact Page (`/contact`)

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Write the Contact page**

Create `oxagile-website/app/contact/page.tsx`:
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — OxAgile',
  description: 'Get in touch with OxAgile — tell us about your project and we will respond within one business day.',
  openGraph: {
    title: 'Contact — OxAgile',
    description: 'Reach out to start your engagement with OxAgile.',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl text-text-primary mb-4">Get in Touch</h1>
          <p className="text-text-muted text-lg">
            Tell us about your project. We respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <form
            action="https://formspree.io/f/oxagile"
            method="POST"
            className="flex flex-col gap-5"
          >
            <div>
              <label htmlFor="name" className="block text-text-muted text-sm mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors text-sm"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-text-muted text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors text-sm"
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-text-muted text-sm mb-1">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors text-sm"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-text-muted text-sm mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors text-sm resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="bg-accent text-navy font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Company info */}
          <div className="flex flex-col gap-6 text-text-muted text-sm">
            <div>
              <p className="text-text-primary font-semibold mb-1">Email</p>
              <a
                href="mailto:contact@oxagile.com"
                className="text-accent hover:underline"
              >
                contact@oxagile.com
              </a>
            </div>
            <div>
              <p className="text-text-primary font-semibold mb-1">Phone</p>
              <p>+1 (555) 000-0000</p>
            </div>
            <div>
              <p className="text-text-primary font-semibold mb-1">Location</p>
              <p>Based in North America</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000/contact. Verify: form with 4 fields + submit button, company info panel. Check mobile (form should stack to full width).

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: build contact page with form and company info"
```

---

### Task 9: Production Build, GitHub Push, Vercel Deploy

**Files:** No code changes — CI/deployment only.

- [ ] **Step 1: Run production build**

```bash
cd oxagile-website
npm run build
```
Expected: `✓ Compiled successfully` with no TypeScript or ESLint errors.

- [ ] **Step 2: Create GitHub repository and push**

```bash
gh repo create oxagile-website --public --source=. --remote=origin --push
```
Expected: Repository created at `https://github.com/<username>/oxagile-website` and all commits pushed.

- [ ] **Step 3: Install Vercel CLI and deploy**

```bash
npm i -g vercel
vercel --yes
```
When prompted: link to a new project named `oxagile-website`, set to auto-deploy from `main`.

- [ ] **Step 4: Deploy to production**

```bash
vercel --prod
```
Expected: Output ends with a production URL like `https://oxagile-website.vercel.app`.

- [ ] **Step 5: Smoke-test production URL**

Open the production URL. Verify:
- Home page loads with hero text and navy background
- `/services`, `/about`, `/contact` all render
- Navbar is visible and mobile hamburger works
- No console errors

---

## Self-Review

### Spec Coverage Checklist

| Spec Requirement | Task |
|---|---|
| Next.js 14 App Router + TypeScript + Tailwind | Task 1 |
| Custom color palette in tailwind.config.ts | Task 1 |
| DM Serif Display + DM Sans via next/font | Task 2 |
| Sticky Navbar with blur + mobile hamburger | Task 2 |
| Footer with logo, links, social, copyright | Task 2 |
| Vercel Analytics | Task 2 |
| Dot-grid animated background (CSS) | Task 5 |
| Glow line separator | Task 5 |
| Hero with headline + two CTAs | Task 5 |
| Stats bar with count-up animation | Task 3 + 5 |
| Services overview (3-col cards) | Task 4 + 5 |
| Who We Are section with cyan left line | Task 5 |
| Why OxAgile list (2 cols) | Task 5 |
| CTA Banner | Task 5 |
| Services page (4 services, left cyan border) | Task 6 |
| About page with timeline + values | Task 7 |
| Contact page with form + company info | Task 8 |
| SEO metadata on all pages | Tasks 2, 5, 6, 7, 8 |
| Mobile-first responsive | All tasks |
| No external UI libraries | All tasks |
| npm run build passes | Task 9 |
| Pushed to GitHub | Task 9 |
| Deployed to Vercel | Task 9 |

All spec requirements covered. No gaps found.
