import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: 'EPath Education - Lộ trình học thuật quốc tế',
  description:
    'EPath Education cung cấp lộ trình học thuật quốc tế xuyên suốt từ Tiểu học đến Trung học Phổ thông. Blended Learning - Edmentum International (Cognia & WASC) - Cá nhân hóa lộ trình.',
  keywords: [
    'EPath Education',
    'giáo dục quốc tế',
    'blended learning',
    'Edmentum',
    'Cognia',
    'WASC',
    'du học',
    'chương trình học Mỹ',
    'Little People',
    'Cambridge',
  ],
  authors: [{ name: 'EPath Education' }],
  openGraph: {
    title: 'EPath Education - Lộ trình học thuật quốc tế',
    description:
      'Lộ trình học thuật quốc tế xuyên suốt từ Tiểu học đến Trung học Phổ thông.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'EPath Education',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
