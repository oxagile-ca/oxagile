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
