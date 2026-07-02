'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'

const partners = [
  { name: 'Edmentum International', description: 'Chương trình học chuẩn Mỹ với hơn 60 năm kinh nghiệm' },
  { name: 'Cambridge Assessment', description: 'Bài thi và chứng chỉ tiếng Anh quốc tế' },
  { name: 'Cognia', description: 'Kiểm định chất lượng giáo dục toàn cầu' },
  { name: 'WASC', description: 'Kiểm định trường học Mỹ uy tín' },
  { name: 'FabLab EIU', description: 'Phòng lab STEM hiện đại tại EIU' },
  { name: 'EdOptions Academy', description: 'Chương trình THPT trực tuyến chuẩn Mỹ' },
]

const certifications = [
  { name: 'Cognia Certified', descriptionKey: 'cognia' },
  { name: 'WASC Accredited', descriptionKey: 'wasc' },
  { name: 'Edmentum Partner', descriptionKey: 'edmentumPartner' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

const certVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
}

export function PartnersSection() {
  const t = useTranslations('partners')

  return (
    <section className="py-20 bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl p-4 text-center hover:shadow-xl transition-shadow duration-200 cursor-pointer group border border-transparent hover:border-[#3A53A3]/30"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-3 bg-[#3A53A3]/10 rounded-lg flex items-center justify-center group-hover:bg-[#3A53A3]/20 transition-colors duration-150"
                whileHover={{ rotate: 5 }}
              >
                <span className="text-[#3A53A3] font-bold text-xs">
                  {partner.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                </span>
              </motion.div>
              <h3 className="font-semibold text-sm text-[#231F20] mb-1">
                {partner.name}
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={certVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer"
            >
              <motion.div
                className="w-6 h-6 bg-[#8BC53F] rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <div>
                <div className="font-semibold text-sm text-[#231F20]">{cert.name}</div>
                <div className="text-xs text-[#6B6B6B]">{t(cert.descriptionKey)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/partners"
            className="inline-flex items-center gap-2 text-[#3A53A3] font-semibold hover:text-[#2E4389] transition-colors duration-150"
            whileHover={{ x: 5 }}
          >
            {t('learnMore')}
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
