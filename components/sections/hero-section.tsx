'use client'

/**
 * HeroSection - EPath Landing Hero
 * Smooth text animations with staggered entrance
 * Unified with motion-presets for consistent timing.
 */

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useParams } from 'next/navigation'
import { duration, easeOut, easeStandard } from '@/lib/motion-presets'

const TIMING = {
  titleStart: 0.2,
  titleWordDelay: 0.1,
  subtitleDelay: 0.9,
  descriptionDelay: 1.2,
  ctaDelay: 1.5,
  scrollDelay: 1.8,
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: TIMING.titleStart + i * TIMING.titleWordDelay,
      duration: duration.slow,
      ease: easeOut,
    },
  }),
}

export function HeroSection() {
  const t = useTranslations('hero')
  const params = useParams()
  const locale = (params.locale as string) || 'vi'

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

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          <motion.h1
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {welcomeText.split(' ').map((word, i) => (
              <motion.span
                key={`${welcomeText}-${i}`}
                custom={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h1
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8BC53F] mb-8"
          >
            {titleText.split(' ').map((word, i) => (
              <motion.span
                key={`${titleText}-${i}`}
                custom={welcomeText.split(' ').length + i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: TIMING.subtitleDelay,
              duration: duration.normal,
              ease: easeOut,
            }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed mb-4"
          >
            {subtitleText}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: TIMING.descriptionDelay,
              duration: duration.normal,
              ease: easeOut,
            }}
            className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            {descriptionText}
          </motion.p>

          <motion.a
            href={`/${locale}/about`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: TIMING.ctaDelay,
              duration: duration.normal,
              ease: easeOut,
            }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-[#F05A28] hover:bg-[#E04D1A] text-white px-10 py-4 rounded-full text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl mt-10"
          >
            {t('cta')}
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.5,
              }}
              className="inline-flex"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: TIMING.scrollDelay,
          duration: duration.normal,
          ease: easeStandard,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
