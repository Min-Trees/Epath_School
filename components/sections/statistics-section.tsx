'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const stats = [
  { value: 10, suffix: '+', statKey: 'years', color: '#3A53A3', bgColor: 'rgb(230, 236, 255)' },
  { value: 4, suffix: '', statKey: 'levels', color: '#8BC53F', bgColor: 'rgb(243, 250, 224)' },
  { value: 60, suffix: '+', statKey: 'edmentum', color: '#F05A28', bgColor: 'rgb(255, 243, 237)' },
  { value: 3, suffix: '+', statKey: 'partners', color: '#3A53A3', bgColor: 'rgb(230, 236, 255)' },
  { value: 100, suffix: '%', statKey: 'personalized', color: '#8BC53F', bgColor: 'rgb(243, 250, 224)' },
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      const duration = 1500
      const steps = 50
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div
        className="inline-flex items-baseline justify-center px-6 py-4 rounded-xl"
        style={{ backgroundColor: bgColor }}
      >
        <span
          className="text-4xl md:text-5xl font-bold"
          style={{ color }}
        >
          {count}
        </span>
        <span
          className="text-3xl md:text-4xl font-bold"
          style={{ color }}
        >
          {suffix}
        </span>
      </div>
      <p
        className="mt-3 text-sm md:text-base font-medium"
        style={{ color }}
      >
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
          {stats.map((stat) => (
            <Counter
              key={stat.statKey}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.statKey)}
              color={stat.color}
              bgColor={stat.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
