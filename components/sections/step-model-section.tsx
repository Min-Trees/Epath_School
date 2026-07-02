'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ClipboardCheck, Map, Laptop, MessageCircle, Award } from 'lucide-react'
import { duration, easeOut, inViewViewport, staggerContainer } from '@/lib/motion-presets'
import { accentCycle } from '@/lib/design-tokens'

const steps = [
  { number: 1, titleKey: 'assessment', descKey: 'assessmentDesc', icon: ClipboardCheck },
  { number: 2, titleKey: 'pathway', descKey: 'pathwayDesc', icon: Map },
  { number: 3, titleKey: 'blended', descKey: 'blendedDesc', icon: Laptop },
  { number: 4, titleKey: 'advising', descKey: 'advisingDesc', icon: MessageCircle },
  { number: 5, titleKey: 'achievement', descKey: 'achievementDesc', icon: Award },
]

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
}

export function StepModelSection() {
  const t = useTranslations('steps')

  return (
    <section className="py-20 surface-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={{ duration: duration.normal, ease: easeOut }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <motion.div
              className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#3A53A3] via-[#8BC53F] to-[#F05A28]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inViewViewport}
              transition={{ duration: duration.slower, ease: easeOut }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              className="grid grid-cols-5 gap-4"
            >
              {steps.map((step, idx) => {
                const accent = accentCycle[idx % accentCycle.length]
                return (
                  <motion.div
                    key={step.number}
                    variants={stepVariants}
                    className="relative pt-16"
                  >
                    <motion.div
                      variants={iconVariants}
                      className="relative z-10 flex justify-center mb-6"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: duration.fast, ease: easeOut }}
                        className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                        style={{ backgroundColor: accent.color }}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: duration.fast, ease: easeOut }}
                      className="rounded-xl p-6 text-center transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: accent.bg }}
                    >
                      <div className="text-4xl font-bold mb-2" style={{ color: accent.color }}>
                        {step.number}
                      </div>
                      <div
                        className="font-bold text-lg mb-1"
                        style={{ color: accent.color }}
                      >
                        {t(step.titleKey)}
                      </div>
                      <p className="text-sm" style={{ color: accent.color }}>
                        {t(step.descKey)}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <motion.div
              className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3A53A3] via-[#8BC53F] to-[#F05A28] rounded-full"
              initial={{ scaleY: 0, height: 0 }}
              whileInView={{ scaleY: 1, height: '100%' }}
              viewport={inViewViewport}
              transition={{ duration: duration.slower, ease: easeOut }}
              style={{ transformOrigin: 'top' }}
            />

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              className="relative pl-8"
            >
              <div className="space-y-6">
                {steps.map((step, idx) => {
                  const accent = accentCycle[idx % accentCycle.length]
                  return (
                    <motion.div
                      key={step.number}
                      variants={stepVariants}
                      className="relative"
                    >
                      <motion.div
                        variants={iconVariants}
                        className="absolute -left-5 top-2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                        style={{ backgroundColor: accent.color }}
                      >
                        <step.icon className="w-5 h-5 text-white" />
                      </motion.div>

                      <div
                        className="ml-4 rounded-xl p-4 transition-all duration-200 hover:shadow-lg"
                        style={{ backgroundColor: accent.bg }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-2xl font-bold"
                            style={{ color: accent.color }}
                          >
                            {step.number}
                          </span>
                          <div
                            className="font-bold"
                            style={{ color: accent.color }}
                          >
                            {t(step.titleKey)}
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: accent.color }}>
                          {t(step.descKey)}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={{ duration: duration.normal, delay: 0.3, ease: easeOut }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm">
            <div className="text-right">
              <p className="text-[#231F20] font-medium">{t('ctaText')}</p>
              <p className="text-sm text-[#6B6B6B]">{t('ctaSubtext')}</p>
            </div>
            <a
              href="/admissions"
              className="bg-[#F05A28] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E04D1A] transition-colors duration-200 whitespace-nowrap"
            >
              {t('register')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
