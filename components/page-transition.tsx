'use client'

/**
 * EPath Page Transition System
 * Smooth, seamless page transitions
 */

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
  mode?: 'wait' | 'sync' | 'popLayout'
}

// Smooth cubic-bezier easing
const SMOOTH_EASE = [0.4, 0, 0.2, 1] as const
const QUICK_EASE = [0.25, 0.1, 0.25, 1] as const

/**
 * SmoothPageTransition
 * Page transition mượt mà với fade + subtle slide
 * Sử dụng cả enter và exit animation đồng thời
 */
export function SmoothPageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.2,
            ease: SMOOTH_EASE,
          }
        }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.15,
            ease: SMOOTH_EASE,
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * FadePageTransition
 * Simple fade page transition
 */
export function FadePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: SMOOTH_EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * SlidePageTransition
 * Horizontal slide transition
 */
interface SlidePageTransitionProps {
  children: React.ReactNode
  direction?: 'left' | 'right'
}

export function SlidePageTransition({ children, direction = 'left' }: SlidePageTransitionProps) {
  const pathname = usePathname()
  const slideX = direction === 'left' ? 30 : -30

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: slideX }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -slideX }}
        transition={{
          duration: 0.25,
          ease: QUICK_EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * ScalePageTransition
 * Subtle scale transition
 */
export function ScalePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.01 }}
        transition={{
          duration: 0.2,
          ease: SMOOTH_EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * CrossFadePageTransition
 * Smooth cross-fade without any movement
 * Best for content-heavy pages
 */
export function CrossFadePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.18,
          ease: [0.4, 0, 0.6, 1],
        }}
        style={{ willChange: 'opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Default export - smooth transition
export { SmoothPageTransition as default }
