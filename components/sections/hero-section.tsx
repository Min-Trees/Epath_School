'use client'

/**
 * HeroSection - EPath Landing Hero
 * Smooth text animations with staggered entrance
 */

import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRef } from 'react'

// Smooth ease curve
const SMOOTH_EASE = [0.4, 0, 0.2, 1] as const

// Animation timing
const TIMING = {
  titleStart: 0.3,
  titleWordDelay: 0.12,
  subtitleDelay: 1.2,
  descriptionDelay: 1.6,
  ctaDelay: 2.0,
  scrollDelay: 2.4,
}

// Word-by-word animation for title
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: TIMING.titleStart + i * TIMING.titleWordDelay,
      duration: 0.4,
      ease: SMOOTH_EASE,
    },
  }),
}

export function HeroSection() {
  const t = useTranslations('hero')
  const params = useParams()
  const locale = params.locale as string || 'vi'

  // Split title into words
  const welcomeText = t('welcome')
  const titleText = t('title')
  const subtitleText = t('subtitle')
  const descriptionText = t('description')

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background - Simple, no delay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source 
            src="https://www.littlepeople.edu.vn/wp-content/uploads/2024/08/Slider-169-rev.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Title Line 1: Chào mừng đến với */}
          <motion.h1
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {welcomeText.split(' ').map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Title Line 2: EPath Education - Accent Color */}
          <motion.h1
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8BC53F] mb-8"
          >
            {titleText.split(' ').map((word, i) => (
              <motion.span
                key={i}
                custom={welcomeText.split(' ').length + i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: TIMING.subtitleDelay, 
              duration: 0.5, 
              ease: SMOOTH_EASE 
            }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed mb-4"
          >
            {subtitleText}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: TIMING.descriptionDelay, 
              duration: 0.5, 
              ease: SMOOTH_EASE 
            }}
            className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            {descriptionText}
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href={`/${locale}/about`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: TIMING.ctaDelay, 
              duration: 0.4, 
              ease: SMOOTH_EASE 
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-[#F05A28] hover:bg-[#E04D1A] text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-10"
          >
            {t('cta')}
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut',
                repeatDelay: 0.5
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay: TIMING.scrollDelay, 
          duration: 0.4 
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
