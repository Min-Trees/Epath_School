'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EventsPage() {
  const t = useTranslations('events')
  const params = { locale: 'vi' }

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

      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-video bg-gradient-to-br from-[#3A53A3]/10 to-[#8BC53F]/10 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-[#3A53A3]/30" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-[#3A53A3]/10 text-[#3A53A3] text-xs font-medium px-3 py-1 rounded-full mb-3">Event {i}</span>
                  <h3 className="text-xl font-bold text-[#231F20] mb-3">Event Title {i}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]"><Calendar className="w-4 h-4 text-[#8BC53F]" /><span>15/08/2024</span></div>
                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]"><MapPin className="w-4 h-4 text-[#F05A28]" /><span>EPath Center</span></div>
                  </div>
                  <Button className="w-full bg-[#F05A28] hover:bg-[#E04D1A]">{t('register')}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#231F20] mb-4">{t('cta.title')}</h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
          <Link href="/contact"><Button size="lg" className="bg-[#3A53A3] hover:bg-[#2E4389]">{t('cta.button')}<ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
        </div>
      </section>
    </>
  )
}
