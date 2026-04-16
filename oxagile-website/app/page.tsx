import type { Metadata } from 'next'
import Link from 'next/link'
import StatsBar from '@/components/StatsBar'
import SectionWrapper from '@/components/SectionWrapper'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'OxAgile — Engineering Quality. Automating Excellence.',
  description:
    'OxAgile is a premier custom software development and QA firm — trusted by clients who demand precision, scalability, and intelligence in every release.',
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
