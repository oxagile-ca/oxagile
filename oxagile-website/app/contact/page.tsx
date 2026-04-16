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
