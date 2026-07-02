'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch for the label - the server doesn't know
  // which locale is active until the client hydrates.
  useEffect(() => setMounted(true), [])

  const switchTo = locale === 'vi' ? 'en' : 'vi'

  const toggleLocale = () => {
    const segments = pathname.split('/')
    segments[1] = switchTo
    router.push(segments.join('/'), { scroll: false })
  }

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium',
        'transition-colors duration-200',
        'text-white/90 hover:text-white hover:bg-white/10'
      )}
      aria-label="Toggle language"
      type="button"
    >
      <Globe className="w-4 h-4" />
      <span
        // Use a CSS transition on the label so the text cross-fades
        // instead of abruptly snapping when the locale changes.
        key={mounted ? locale : 'placeholder'}
        className="uppercase font-semibold inline-block animate-fade-in"
      >
        {mounted ? locale : '—'}
      </span>
      <span className="text-white/60 text-xs">/ {switchTo.toUpperCase()}</span>
    </button>
  )
}
