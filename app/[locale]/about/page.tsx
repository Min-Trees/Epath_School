'use client'

import { Target, Eye, Heart, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const milestones = [
  { year: '2014', titleKey: 'Thành lập Little People', descKey: 'Khởi đầu với chương trình mầm non Little People tại Bình Dương.' },
  { year: '2018', titleKey: 'Hợp tác Edmentum', descKey: 'Trở thành đối tác chính thức của Edmentum International.' },
  { year: '2020', titleKey: 'Kiểm định Cognia', descKey: 'Đạt chứng nhận kiểm định chất lượng Cognia quốc tế.' },
  { year: '2022', titleKey: 'Mở rộng cấp THPT', descKey: 'Ra mắt chương trình Dual Diploma cho học sinh THPT.' },
  { year: '2024', titleKey: 'Hệ sinh thái hoàn chỉnh', descKey: 'Hoàn thiện lộ trình học tập liên tục từ Mầm non đến THPT.' },
]

const values = [
  { icon: Target, key: 'objective' },
  { icon: Eye, key: 'vision' },
  { icon: Heart, key: 'mission' },
  { icon: Users, key: 'team' },
]

export default function AboutPage() {
  const t = useTranslations('about')
  const params = useParams()
  const locale = params.locale as string || 'vi'

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#3A53A3] via-[#3A53A3] to-[#2E4389]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
            <p className="text-xl text-white/90">{t('hero.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#231F20] mb-6">{t('who.title')}</h2>
              <p className="text-[#6B6B6B] mb-4 leading-relaxed">{t('who.p1')}</p>
              <p className="text-[#6B6B6B] mb-6 leading-relaxed">{t('who.p2')}</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-[#F8F9FA] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#3A53A3]">10+</div>
                  <div className="text-sm text-[#6B6B6B]">{t('stats.years')}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#8BC53F]">4</div>
                  <div className="text-sm text-[#6B6B6B]">{t('stats.levels')}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#F05A28]">60+</div>
                  <div className="text-sm text-[#6B6B6B]">{t('stats.edmentum')}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#3A53A3]/10 to-[#8BC53F]/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-32 h-32 text-[#3A53A3]/20" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#F05A28] text-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl font-bold">60+</div>
                <div className="text-sm">{t('stats.edmentum')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-[#3A53A3]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#3A53A3]" />
              </div>
              <h3 className="text-2xl font-bold text-[#231F20] mb-4">{t('vision')}</h3>
              <p className="text-[#6B6B6B] leading-relaxed">{t('visionText')}</p>
            </div>
            <div id="mission" className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-[#8BC53F]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#8BC53F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#231F20] mb-4">{t('mission')}</h3>
              <p className="text-[#6B6B6B] leading-relaxed">{t('missionText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">{t('coreValues.title')}</h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">{t('coreValues.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.key} className="bg-[#F8F9FA] rounded-xl p-6">
                <div className="w-12 h-12 bg-[#3A53A3]/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#3A53A3]" />
                </div>
                <h3 className="text-xl font-bold text-[#231F20] mb-2">{t(`${value.key}.title`)}</h3>
                <p className="text-sm text-[#6B6B6B]">{t(`${value.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#3A53A3] to-[#2E4389]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('milestones.title')}</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">{t('milestones.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="text-center">
                <div className="w-16 h-16 bg-[#8BC53F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
                <h4 className="font-bold text-white mb-2">{milestone.titleKey}</h4>
                <p className="text-sm text-white/70">{milestone.descKey}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F05A28]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-white text-[#F05A28] hover:bg-white/90">{t('cta.button')}</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
