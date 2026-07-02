'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { duration, easeOut } from '@/lib/motion-presets'
import { accentCycle } from '@/lib/design-tokens'

const stats = [
  { value: 10, suffix: '+', statKey: 'years' },
  { value: 4, suffix: '', statKey: 'levels' },
  { value: 60, suffix: '+', statKey: 'edmentum' },
  { value: 3, suffix: '+', statKey: 'partners' },
  { value: 100, suffix: '%', statKey: 'personalized' },
]

interface CounterProps {
  value: number
  suffix: string
  label: string
  color: string
  bgColor: string
}

function Counter({ value, suffix, label, color, bgColor }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -10% 0px' })

  useEffect(() => {
    if (!isInView || value === 0) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / 1500, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: duration.normal, ease: easeOut }}
      className="text-center"
    >
      <div
        className="inline-flex items-baseline justify-center px-6 py-4 rounded-xl"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-4xl md:text-5xl font-bold" style={{ color }}>
          {count}
        </span>
        <span className="text-3xl md:text-4xl font-bold" style={{ color }}>
          {suffix}
        </span>
      </div>
      <p className="mt-3 text-sm md:text-base font-medium" style={{ color }}>
        {label}
      </p>
    </motion.div>
  )
}

export function StatisticsSection() {
  const t = useTranslations('stats')

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
            const accent = accentCycle[index % accentCycle.length]
            return (
              <Counter
                key={stat.statKey}
                value={stat.value}
                suffix={stat.suffix}
                label={t(stat.statKey)}
                color={accent.color}
                bgColor={accent.bg}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
