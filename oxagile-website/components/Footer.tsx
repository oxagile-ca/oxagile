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
