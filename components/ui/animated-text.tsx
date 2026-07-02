'use client'

/**
 * AnimatedText Component
 * Text reveal animations
 */

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  type?: 'fade' | 'slide' | 'blur' | 'wave'
  staggerChars?: boolean
}

/**
 * TextReveal Component
 * Reveals text character by character or word by word
 */
export function AnimatedText({
  children,
  className,
  delay = 0,
  duration = 0.05,
  type = 'fade',
  staggerChars = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const text = staggerChars ? children.split('') : children.split(' ')

  const getVariant = (index: number) => {
    const baseDelay = delay + index * duration

    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { delay: baseDelay, duration: 0.3 }
          }
        }
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1,
            y: 0,
            transition: { delay: baseDelay, duration: 0.4, ease: [0, 0, 0.2, 1] }
          }
        }
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { 
            opacity: 1,
            filter: 'blur(0px)',
            transition: { delay: baseDelay, duration: 0.5 }
          }
        }
      case 'wave':
        return {
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({ 
            opacity: 1,
            y: 0,
            transition: { delay: delay + i * 0.04, duration: 0.3 }
          })
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { delay: baseDelay }
          }
        }
    }
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      }
    }
  }

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={container}
      className={className}
    >
      {text.map((char, index) => (
        <motion.span
          key={index}
          variants={getVariant(index)}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {staggerChars ? char : char + '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * SplitText Component
 * Splits text into words for individual animation
 */
interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  animation?: 'fade' | 'slide' | 'scale' | 'bounce'
}

export function SplitText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.05,
  animation = 'slide',
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const words = text.split(' ')

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: { delay: delay + i * staggerDelay, duration: 0.3 }
      })
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: delay + i * staggerDelay, duration: 0.4, ease: [0, 0, 0.2, 1] }
      })
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: delay + i * staggerDelay, duration: 0.3, ease: [0, 0, 0.2, 1] }
      })
    },
    bounce: {
      hidden: { opacity: 0, y: 20, scale: 0.9 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { 
          delay: delay + i * staggerDelay, 
          duration: 0.4,
          type: 'spring',
          stiffness: 400,
          damping: 15
        }
      })
    }
  }

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={variants[animation]}
          custom={i}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * TypewriterText Component
 * Typewriter animation effect
 */
interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  showCursor?: boolean
}

export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 50,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView && displayText.length === 0) {
      const timeout = setTimeout(() => {
        let currentIndex = 0
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText(text.slice(0, currentIndex + 1))
            currentIndex++
          } else {
            clearInterval(interval)
            setIsComplete(true)
          }
        }, speed)
        return () => clearInterval(interval)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [isInView, text, delay, speed, displayText.length])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  )
}

import { useState, useEffect } from 'react'
