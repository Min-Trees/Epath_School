'use client'

/**
 * AnimatedCounter Component
 * Counter with smooth number animation.
 * Uses requestAnimationFrame for buttery-smooth updates (no setInterval jitter).
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { COUNTER_CONFIG } from '@/lib/animations/config'
import { duration, easeOut } from '@/lib/motion-presets'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
  startOnView?: boolean
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration: dur = COUNTER_CONFIG.duration,
  className,
  style,
  startOnView = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -10% 0px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if ((!isInView && startOnView) || value === 0) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / dur, 1)
      // easeOut cubic for smooth landing
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, dur, startOnView])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: duration.normal, ease: easeOut }}
      className={className}
      style={style}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

/**
 * AnimatedNumber Component
 * Alternative counter with more formatting options.
 */

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedNumber({
  value,
  duration: dur = 1500,
  decimals = 0,
  separator = '',
  prefix = '',
  suffix = '',
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -10% 0px' })

  useEffect(() => {
    if (!isInView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / dur, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(decimals > 0 ? value * eased : Math.floor(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, dur, decimals])

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
    <span ref={ref} className={className}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  )
}
