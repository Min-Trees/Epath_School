'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Sprout, Book, GraduationCap, Trophy } from 'lucide-react'
import { useParams } from 'next/navigation'

const pathways = [
  {
    id: 'kindergarten',
    levelKey: 'kindergarten',
    icon: Sprout,
    color: '#3A53A3',
    bgColor: 'rgb(230, 236, 255)',
  },
  {
    id: 'elementary',
    levelKey: 'elementary',
    icon: Book,
    color: '#8BC53F',
    bgColor: 'rgb(243, 250, 224)',
  },
  {
    id: 'middle',
    levelKey: 'middle',
    icon: GraduationCap,
    color: '#F05A28',
    bgColor: 'rgb(255, 243, 237)',
  },
  {
    id: 'high',
    levelKey: 'high',
    icon: Trophy,
    color: '#3A53A3',
    bgColor: 'rgb(230, 236, 255)',
  },
]

const programData: Record<string, { programs: string[], curriculum: string, description: string }> = {
  kindergarten: {
    programs: ['Little People', 'SpeedUp English'],
    curriculum: 'Base Path',
    description: 'Khởi đầu hoàn hảo cho hành trình học tập',
  },
  elementary: {
    programs: ['Base Path', 'Prime Path'],
    curriculum: 'US Curriculum',
    description: 'Nền tảng vững chắc với chương trình chuẩn Mỹ',
  },
  middle: {
    programs: ['Base Path', 'Prime Path', 'SpeedUp English'],
    curriculum: 'US Middle School',
    description: 'Phát triển kỹ năng và tư duy học thuật',
  },
  high: {
    programs: ['Dual Diploma', 'US High School Diploma'],
    curriculum: 'EdOptions Academy',
    description: 'Song bằng quốc tế, mở cánh cửa du học',
  },
}

export function LearningPathwaysSection() {
  const t = useTranslations('pathways')
  const tNav = useTranslations('nav')
  const params = useParams()
  const locale = params.locale as string || 'vi'

  return (
    <section className="py-20 bg-white">
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

        {/* Pathways Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/${locale}/programs?level=${pathway.id}`}
                className="block h-full group"
              >
                <div
                  className="h-full rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden"
                  style={{
                    backgroundColor: pathway.bgColor,
                    borderColor: pathway.color,
                  }}
                >
                  {/* Background Icon */}
                  <div
                    className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-200"
                  >
                    <pathway.icon className="w-24 h-24" style={{ color: pathway.color }} />
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: pathway.color }}
                  >
                    <pathway.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Level */}
                  <div className="mb-2">
                    <span className="text-2xl font-bold" style={{ color: pathway.color }}>
                      {tNav(`${pathway.levelKey}`)}
                    </span>
                    <span className="block text-sm opacity-70">{pathway.levelKey}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#6B6B6B] mb-4">{programData[pathway.id].description}</p>

                  {/* Programs */}
                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
                      {t('curriculum')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {programData[pathway.id].programs.map((program) => (
                        <span
                          key={program}
                          className="text-xs px-2 py-1 rounded-full bg-white/50"
                          style={{ color: pathway.color }}
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum */}
                  <div className="pt-4 border-t border-current/20">
                    <div className="text-xs opacity-70">Chương trình</div>
                    <div className="font-semibold text-sm" style={{ color: pathway.color }}>
                      {programData[pathway.id].curriculum}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <ArrowRight
                      className="w-6 h-6"
                      style={{ color: pathway.color }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/programs`}
            className="inline-flex items-center gap-2 bg-[#F05A28] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#E04D1A] transition-colors duration-150"
          >
            {t('viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
