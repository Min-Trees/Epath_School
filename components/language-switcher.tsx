'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === 'vi' ? 'en' : 'vi'
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'), { scroll: false })
  }

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 lang-transition',
        'text-white/90 hover:text-white hover:bg-white/10'
      )}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-semibold">{locale}</span>
    </button>
  )
}
