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
