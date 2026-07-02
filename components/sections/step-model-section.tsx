'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ClipboardCheck, Map, Laptop, MessageCircle, Award } from 'lucide-react'

const steps = [
  { number: 1, titleKey: 'assessment', descKey: 'assessmentDesc', icon: ClipboardCheck, color: '#3A53A3', bgColor: 'rgb(230, 236, 255)' },
  { number: 2, titleKey: 'pathway', descKey: 'pathwayDesc', icon: Map, color: '#8BC53F', bgColor: 'rgb(243, 250, 224)' },
  { number: 3, titleKey: 'blended', descKey: 'blendedDesc', icon: Laptop, color: '#F05A28', bgColor: 'rgb(255, 243, 237)' },
  { number: 4, titleKey: 'advising', descKey: 'advisingDesc', icon: MessageCircle, color: '#3A53A3', bgColor: 'rgb(230, 236, 255)' },
  { number: 5, titleKey: 'achievement', descKey: 'achievementDesc', icon: Award, color: '#8BC53F', bgColor: 'rgb(243, 250, 224)' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.3, type: 'spring', stiffness: 200 },
  },
}

export function StepModelSection() {
  const t = useTranslations('steps')

  return (
    <section className="py-20 bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Animated Timeline Bar */}
            <motion.div
              className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#3A53A3] via-[#8BC53F] to-[#F05A28]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-5 gap-4"
            >
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative pt-16"
                >
                  {/* Icon Circle */}
                  <motion.div
                    variants={iconVariants}
                    className="relative z-10 flex justify-center mb-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="rounded-xl p-6 text-center transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                      className="text-4xl font-bold mb-2"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </motion.div>
                    <div className="font-bold text-lg mb-1" style={{ color: step.color }}>
                      {t(step.titleKey)}
                    </div>
                    <p className="text-sm" style={{ color: step.color }}>
                      {t(step.descKey)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            {/* Animated Vertical Line */}
            <motion.div
              className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3A53A3] via-[#8BC53F] to-[#F05A28] rounded-full"
              initial={{ scaleY: 0, height: 0 }}
              whileInView={{ scaleY: 1, height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative pl-8"
            >
              <div className="space-y-6">
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={stepVariants}
                    className="relative"
                  >
                    {/* Icon Circle */}
                    <motion.div
                      variants={iconVariants}
                      className="absolute -left-5 top-2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="ml-4 rounded-xl p-4 transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: step.bgColor }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold" style={{ color: step.color }}>
                          {step.number}
                        </span>
                        <div>
                          <div className="font-bold" style={{ color: step.color }}>
                            {t(step.titleKey)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: step.color }}>
                        {t(step.descKey)}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-4 bg-white rounded-xl p-6"
          >
            <div className="text-right">
              <p className="text-[#231F20] font-medium">
                {t('ctaText')}
              </p>
              <p className="text-sm text-[#6B6B6B]">
                {t('ctaSubtext')}
              </p>
            </div>
            <motion.a
              href="/admissions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F05A28] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E04D1A] transition-colors duration-150 whitespace-nowrap"
            >
              {t('register')}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
