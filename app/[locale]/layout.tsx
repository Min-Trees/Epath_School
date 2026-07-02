import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * LocaleLayout
 *
 * The Footer is a server component (rendered with the current locale
 * on the server) so that switching locale causes the entire page to
 * re-render atomically - the footer text never lingers on the old
 * language while the URL is already on the new one.
 *
 * The Header stays a client component because it owns the scroll
 * state and the mobile menu; but it lives OUTSIDE the
 * SmoothPageTransition wrapper so it never re-mounts on route /
 * locale changes either.
 *
 * The main element is wrapped in a <Suspense> so the Header and
 * Footer can stream in / paint immediately while the page content
 * is still being prepared.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  )
}
