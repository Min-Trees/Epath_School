import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Header } from './header'
import { Footer } from './footer'
import { Chatbot } from '@/components/chatbot-simple'
import { SmoothPageTransition } from '@/components/page-transition'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <SmoothPageTransition>
              <main className="flex-1">{children}</main>
            </SmoothPageTransition>
            <Footer />
            <Chatbot />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
