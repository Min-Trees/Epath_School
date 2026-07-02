'use client'

/**
 * AnimatedCounter Component
 * Counter with smooth number animation
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { COUNTER_CONFIG } from '@/lib/animations/config'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  steps?: number
  className?: string
  style?: React.CSSProperties
  startOnView?: boolean
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = COUNTER_CONFIG.duration,
  steps = COUNTER_CONFIG.steps,
  className,
  style,
  startOnView = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if ((isInView || !startOnView) && !hasAnimated) {
      setHasAnimated(true)
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
  }, [isInView, value, hasAnimated, duration, steps, startOnView])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={className}
      style={style}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

/**
 * AnimatedNumber Component
 * Alternative counter with more customization
 */

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
}

export function AnimatedNumber({
  value,
  duration = 2000,
  decimals = 0,
  separator = '',
  prefix = '',
  suffix = '',
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      const startTime = Date.now()
      const endTime = startTime + duration

      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = value * easeOut

        setDisplayValue(decimals > 0 ? current : Math.floor(current))

        if (now < endTime) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value, hasAnimated, duration, decimals])

  const formatNumber = (num: number) => {
    if (separator && num >= 1000) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    }
    return num.toFixed(decimals)
  }

  return (
    <span ref={ref}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  )
}
