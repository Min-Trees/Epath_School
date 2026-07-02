'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, Route, Award, Laptop, Shield, FileText, Network, BookOpen } from 'lucide-react'
import { useParams } from 'next/navigation'

const coreValues = [
  {
    number: '01',
    key: 'continuousPath',
    icon: Route,
  },
  {
    number: '02',
    key: 'usStandard',
    icon: Award,
  },
  {
    number: '03',
    key: 'blended',
    icon: Laptop,
  },
  {
    number: '04',
    key: 'parentsRelax',
    icon: Shield,
  },
  {
    number: '05',
    key: 'portfolio',
    icon: FileText,
  },
  {
    number: '06',
    key: 'ecosystem',
    icon: Network,
  },
]

const colors = ['#3A53A3', '#8BC53F', '#F05A28', '#3A53A3', '#8BC53F', '#F05A28']
const bgColors = ['rgb(230, 236, 255)', 'rgb(243, 250, 224)', 'rgb(255, 243, 237)', 'rgb(230, 236, 255)', 'rgb(243, 250, 224)', 'rgb(255, 243, 237)']

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
    transition: {
      duration: 0.3,
    },
  },
}

export function CoreValuesSection() {
  const t = useTranslations('values')
  const params = useParams()
  const locale = params.locale as string || 'vi'

  return (
    <section className="py-20 bg-[#F8F9FA]">
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

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={value.number}
              variants={itemVariants}
              className="group p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              style={{
                backgroundColor: bgColors[index],
                borderColor: colors[index],
              }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: colors[index] }}
                >
                  <value.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div
                    className="text-sm font-semibold mb-1"
                    style={{ color: colors[index] }}
                  >
                    {value.number}
                  </div>
                  <h3 className="text-xl font-semibold text-[#231F20] mb-2">
                    {t(`${value.key}`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors[index] }}>
                    {t(`${value.key}Desc`)}
                  </p>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-sm font-medium" style={{ color: colors[index] }}>
                  {t('learnMore')}
                </span>
                <ArrowRight className="w-4 h-4" style={{ color: colors[index] }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href={`/${locale}/programs`}
            className="inline-flex items-center gap-2 text-[#3A53A3] font-semibold hover:text-[#2E4389] transition-colors duration-150"
          >
            <BookOpen className="w-5 h-5" />
            {t('viewAll')}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
