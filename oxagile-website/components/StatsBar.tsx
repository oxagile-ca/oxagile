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

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setCount(target)
      return
    }

    const duration = 1500
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
  }, [active, target])

  return count
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, active)
  return (
    <div className="text-center">
      <p className="text-4xl font-display text-accent" aria-live="off" aria-atomic="true">
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
