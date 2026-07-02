'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react'
import { semanticColors } from '@/lib/design-tokens'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  const footerLinks = {
    programs: [
      { labelKey: 'kindergarten' as const, href: `/${locale}/programs?level=kindergarten` },
      { labelKey: 'elementary' as const, href: `/${locale}/programs?level=elementary` },
      { labelKey: 'middle' as const, href: `/${locale}/programs?level=middle` },
      { labelKey: 'high' as const, href: `/${locale}/programs?level=high` },
    ],
    about: [
      { labelKey: 'aboutUs' as const, href: `/${locale}/about` },
      { labelKey: 'vision' as const, href: `/${locale}/about#vision` },
      { labelKey: 'mission' as const, href: `/${locale}/about#mission` },
      { labelKey: 'values' as const, href: `/${locale}/about#values` },
    ],
    admissions: [
      { labelKey: 'tuition' as const, href: `/${locale}/admissions#tuition` },
      { labelKey: 'faq' as const, href: `/${locale}/admissions#faq` },
      { labelKey: 'contact' as const, href: `/${locale}/admissions#contact` },
    ],
  }

  const partners = t.rich('partners', {
    item: (name) => name,
  }) as unknown as string[]
  const partnerList = Array.isArray(partners) && partners.length > 0
    ? partners
    : ['Edmentum International', 'Cambridge Assessment', 'Cognia & WASC', 'FabLab EIU']

  return (
    <footer className="text-white" style={{ backgroundColor: semanticColors.primary }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="bg-white/95 rounded-lg inline-block p-2 mb-4">
              <Image
                src="/epath_logo.png"
                alt="EPath Education"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#3A53A3] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#3A53A3] transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#3A53A3] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t('programsTitle')}</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t('quickLinksTitle')}</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/partners`}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  {tNav('partners')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/events`}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  {tNav('events')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t('contactTitle')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  {t('contact.address')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <a
                  href="tel:0912345678"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t('contact.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <a
                  href="mailto:info@epatheducation.edu.vn"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm break-all"
                >
                  {t('contact.email')}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="font-medium text-sm mb-3 text-white/70">{t('partnersTitle')}</h4>
              <ul className="space-y-2">
                {partnerList.map((partner) => (
                  <li key={partner} className="text-white/60 text-xs">
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
