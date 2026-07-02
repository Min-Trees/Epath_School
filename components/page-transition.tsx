'use client'

/**
 * EPath Page Transition System
 * Smooth, seamless page transitions without language-switch flicker.
 *
 * IMPORTANT: This component is keyed on `pathname` so that *true*
 * route changes (e.g. /about -> /programs) animate, but switching
 * locale from `/en/...` to `/vi/...` triggers a key change while
 * still in the same component tree, so we deliberately keep the
 * transition as a tiny opacity fade only — no exit animation, no
 * translateY, so users never see a "fading Vietnamese" footer
 * (the previous bug).
 */

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { pageVariants } from '@/lib/motion-presets'

interface PageTransitionProps {
  children: React.ReactNode
  mode?: 'wait' | 'sync' | 'popLayout'
}

/**
 * SmoothPageTransition
 * - Tiny opacity fade on route change.
 * - No exit animation, so the previous page's content is not visible
 *   while unmounting (this is what caused the language flicker on the
 *   footer).
 */
export function SmoothPageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      variants={pageVariants}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * FadePageTransition
 * Alias kept for backwards compatibility.
 */
export function FadePageTransition({ children }: PageTransitionProps) {
  return <SmoothPageTransition>{children}</SmoothPageTransition>
}

/**
 * SlidePageTransition
 * Horizontal slide transition - kept for pages that explicitly need
 * a stronger effect (e.g. modals). Use with care.
 */
interface SlidePageTransitionProps {
  children: React.ReactNode
  direction?: 'left' | 'right'
}

export function SlidePageTransition({ children, direction = 'left' }: SlidePageTransitionProps) {
  const pathname = usePathname()
  const slideX = direction === 'left' ? 30 : -30

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: slideX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScalePageTransition
 * Subtle scale transition.
 */
export function ScalePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * CrossFadePageTransition
 * Smooth cross-fade without any movement. Best for content-heavy pages.
 */
export function CrossFadePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.6, 1] }}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  )
}

// Default export - smooth transition
export { SmoothPageTransition as default }

/**
 * MountedGuard
 * Returns null until the component has mounted on the client.
 * Use to prevent hydration mismatches for components that
 * depend on the current locale (e.g. language switcher button).
 */
export function MountedGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <>{children}</>
}
