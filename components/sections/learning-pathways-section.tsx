'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Sprout, Book, GraduationCap, Trophy } from 'lucide-react'
import { useParams } from 'next/navigation'
import { duration, easeOut, inViewViewport } from '@/lib/motion-presets'
import { accentCycle } from '@/lib/design-tokens'

const pathways = [
  { id: 'kindergarten', levelKey: 'kindergarten', icon: Sprout },
  { id: 'elementary', levelKey: 'elementary', icon: Book },
  { id: 'middle', levelKey: 'middle', icon: GraduationCap },
  { id: 'high', levelKey: 'high', icon: Trophy },
]

const programData: Record<
  string,
  { programs: string[]; curriculum: string; descriptionKey: 'kindergartenDesc' | 'elementaryDesc' | 'middleDesc' | 'highDesc' }
> = {
  kindergarten: {
    programs: ['Little People', 'SpeedUp English'],
    curriculum: 'Base Path',
    descriptionKey: 'kindergartenDesc',
  },
  elementary: {
    programs: ['Base Path', 'Prime Path'],
    curriculum: 'US Curriculum',
    descriptionKey: 'elementaryDesc',
  },
  middle: {
    programs: ['Base Path', 'Prime Path', 'SpeedUp English'],
    curriculum: 'US Middle School',
    descriptionKey: 'middleDesc',
  },
  high: {
    programs: ['Dual Diploma', 'US High School Diploma'],
    curriculum: 'EdOptions Academy',
    descriptionKey: 'highDesc',
  },
}

export function LearningPathwaysSection() {
  const t = useTranslations('pathways')
  const tNav = useTranslations('nav')
  const tLevels = useTranslations('programs.levels')
  const params = useParams()
  const locale = (params.locale as string) || 'vi'

  return (
    <section className="py-20 bg-white">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((pathway, index) => {
            const accent = accentCycle[index % accentCycle.length]
            return (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewViewport}
                transition={{ duration: duration.normal, delay: index * 0.08, ease: easeOut }}
              >
                <Link
                  href={`/${locale}/programs?level=${pathway.id}`}
                  className="block h-full group"
                >
                  <div
                    className="h-full rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden"
                    style={{ backgroundColor: accent.bg, borderColor: accent.color }}
                  >
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-200">
                      <pathway.icon className="w-24 h-24" style={{ color: accent.color }} />
                    </div>

                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: accent.color }}
                    >
                      <pathway.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="mb-2">
                      <span className="text-2xl font-bold" style={{ color: accent.color }}>
                        {tLevels(pathway.levelKey as 'kindergarten' | 'elementary' | 'middle' | 'high')}
                      </span>
                      <span className="block text-sm opacity-70">
                        {tNav(pathway.levelKey as 'kindergarten' | 'elementary' | 'middle' | 'high')}
                      </span>
                    </div>

                    <p className="text-sm text-[#6B6B6B] mb-4">
                      {t(programData[pathway.id].descriptionKey)}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
                        {t('curriculum')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {programData[pathway.id].programs.map((program) => (
                          <span
                            key={program}
                            className="text-xs px-2 py-1 rounded-full bg-white/60"
                            style={{ color: accent.color }}
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-current/20">
                      <div className="text-xs opacity-70">{t('curriculum')}</div>
                      <div className="font-semibold text-sm" style={{ color: accent.color }}>
                        {programData[pathway.id].curriculum}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowRight className="w-6 h-6" style={{ color: accent.color }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={{ duration: duration.normal, delay: 0.3, ease: easeOut }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/programs`}
            className="inline-flex items-center gap-2 bg-[#F05A28] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#E04D1A] transition-colors duration-200"
          >
            {t('viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
