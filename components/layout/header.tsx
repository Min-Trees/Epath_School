'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from '@/components/language-switcher'

export function Header() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('about'), href: `/${locale}/about`, children: [
      { label: t('aboutUs'), href: `/${locale}/about#about` },
      { label: t('vision'), href: `/${locale}/about#vision` },
      { label: t('mission'), href: `/${locale}/about#mission` },
      { label: t('values'), href: `/${locale}/about#values` },
    ]},
    { label: t('programs'), href: `/${locale}/programs`, children: [
      { label: t('kindergarten'), href: `/${locale}/programs?level=kindergarten` },
      { label: t('elementary'), href: `/${locale}/programs?level=elementary` },
      { label: t('middle'), href: `/${locale}/programs?level=middle` },
      { label: t('high'), href: `/${locale}/programs?level=high` },
    ]},
    { label: t('partners'), href: `/${locale}/partners` },
    { label: t('admissions'), href: `/${locale}/admissions`, children: [
      { label: t('tuition'), href: `/${locale}/admissions#tuition` },
      { label: t('faq'), href: `/${locale}/admissions#faq` },
      { label: t('contact'), href: `/${locale}/admissions#contact` },
    ]},
    { label: t('events'), href: `/${locale}/events` },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-[#3A53A3]/95 backdrop-blur-md py-3'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className={cn(
              "px-2 py-1 rounded-lg transition-colors duration-200",
              isScrolled ? "bg-transparent" : "bg-white/95"
            )}>
              <Image
                src="/epath_logo.png"
                alt="EPath Education"
                width={120}
                height={35}
                className="h-7 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => item.children && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                    isScrolled 
                      ? 'text-[#231F20] hover:bg-[#3A53A3] hover:text-white'
                      : 'text-white hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
                
                {item.children && activeDropdown === item.label && (
                  <div 
                    className="absolute top-full left-0 mt-1 min-w-48 bg-white shadow-xl rounded-xl py-1.5 border border-[#3A53A3]/10 animate-scale-in"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#231F20] hover:bg-[#3A53A3] hover:text-white transition-all duration-150"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <ChevronRight className="w-3 h-3 text-[#8BC53F]" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/admissions#contact`}
              className="px-5 py-2.5 bg-[#F05A28] text-white text-sm font-medium rounded-full hover:bg-[#E04D1A] transition-all duration-150 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('register')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className={cn(
                'p-2 rounded-lg transition-colors duration-150 flex items-center gap-2',
                isScrolled ? 'text-[#3A53A3] hover:bg-[#3A53A3]/10' : 'text-white hover:bg-white/10'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'lg:hidden overflow-hidden transition-all duration-200',
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4 pb-4 border-t border-white/20 pt-4' : 'max-h-0 opacity-0'
        )}>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 font-medium rounded-lg transition-colors duration-150',
                    isScrolled ? 'text-[#231F20] hover:bg-[#3A53A3] hover:text-white' : 'text-white hover:bg-white/10'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 flex flex-col gap-0.5 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors duration-150',
                          isScrolled ? 'text-[#231F20]/70 hover:bg-[#3A53A3] hover:text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ChevronRight className="w-4 h-4 text-[#8BC53F]" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 px-4">
              <Link
                href={`/${locale}/admissions#contact`}
                className="block w-full py-3 text-center bg-[#F05A28] text-white font-medium rounded-full transition-all duration-150 hover:bg-[#E04D1A]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('register')}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
