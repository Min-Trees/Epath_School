'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { duration, easeOut, inViewViewport, staggerContainer } from '@/lib/motion-presets'

const partners = [
  { name: 'Edmentum International', descriptionKey: 'edmentumDesc' as const },
  { name: 'Cambridge Assessment', descriptionKey: 'cambridgeDesc' as const },
  { name: 'Cognia', descriptionKey: 'cogniaDesc' as const },
  { name: 'WASC', descriptionKey: 'wascDesc' as const },
  { name: 'FabLab EIU', descriptionKey: 'fablabDesc' as const },
  { name: 'EdOptions Academy', descriptionKey: 'edoptionsDesc' as const },
]

const certifications = [
  { name: 'Cognia Certified', descriptionKey: 'cognia' as const },
  { name: 'WASC Accredited', descriptionKey: 'wasc' as const },
  { name: 'Edmentum Partner', descriptionKey: 'edmentumPartner' as const },
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easeOut },
  },
}

const certVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easeOut },
  },
}

export function PartnersSection() {
  const t = useTranslations('partners')

  return (
    <section className="py-20 surface-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={{ duration: duration.normal, ease: easeOut }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: duration.fast, ease: easeOut }}
              className="bg-white rounded-xl p-4 text-center hover:shadow-xl transition-shadow duration-200 cursor-pointer group border border-transparent hover:border-[#3A53A3]/30"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-[#3A53A3]/10 rounded-lg flex items-center justify-center group-hover:bg-[#3A53A3]/20 transition-colors duration-200">
                <span className="text-[#3A53A3] font-bold text-xs">
                  {partner.name.split(' ').map((w) => w[0]).join('').slice(0, 3)}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-[#231F20] mb-1">{partner.name}</h3>
              <p className="text-xs text-[#6B6B6B]">{t(partner.descriptionKey)}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          className="flex flex-wrap justify-center gap-4"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={certVariants}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: duration.fast, ease: easeOut }}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="w-6 h-6 bg-[#8BC53F] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm text-[#231F20]">{cert.name}</div>
                <div className="text-xs text-[#6B6B6B]">{t(cert.descriptionKey)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={{ duration: duration.normal, delay: 0.2, ease: easeOut }}
          className="text-center mt-12"
        >
          <a
            href="/partners"
            className="inline-flex items-center gap-2 text-[#3A53A3] font-semibold hover:text-[#2E4389] transition-colors duration-200"
          >
            {t('learnMore')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
