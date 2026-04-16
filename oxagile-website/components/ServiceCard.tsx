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
