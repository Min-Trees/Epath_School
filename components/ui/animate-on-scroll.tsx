'use client'

/**
 * AnimateOnScroll Component
 * Wrapper component for scroll-triggered animations
 */

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale'
type AnimationPreset = 'fade' | 'slide' | 'scale' | 'bounce'

interface AnimateOnScrollProps {
  children: ReactNode
  direction?: AnimationDirection
  preset?: AnimationPreset
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  margin?: string
  threshold?: number
  as?: keyof JSX.IntrinsicElements
}

const directionVariants = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
  scale: { x: 0, y: 0 },
}

const presetVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 15 }
    },
  },
}

export function AnimateOnScroll({
  children,
  direction = 'up',
  preset = 'slide',
  delay = 0,
  duration = 0.4,
  className,
  once = true,
  margin = '-50px',
  threshold = 0.2,
  as: Tag = 'div',
}: AnimateOnScrollProps) {
  const directionOffset = directionVariants[direction]
  const presetConfig = presetVariants[preset]
  
  // For scale direction
  const hiddenState = direction === 'scale'
    ? { opacity: 0, scale: 0.8 }
    : { opacity: 0, ...directionOffset }
  
  const visibleState = direction === 'scale'
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin, amount: threshold }}
      transition={{ duration, delay, ease: [0, 0, 0.2, 1] }}
      variants={{
        hidden: hiddenState,
        visible: visibleState,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer Component
 * Container for staggered child animations
 */

interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
  as: Tag = 'div',
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem Component
 * Individual item in a stagger container
 * Must be used inside StaggerContainer
 */

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  direction?: AnimationDirection
  delay?: number
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  delay = 0,
}: StaggerItemProps) {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
    scale: { scale: 0.9 },
  }

  const offset = directionOffset[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimateInView Component
 * Simple component for fade-in on scroll
 */

interface AnimateInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
}

export function AnimateInView({
  children,
  className,
  delay = 0,
  duration = 0.4,
  y = 20,
}: AnimateInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
