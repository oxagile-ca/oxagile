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
