import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KelolaAja - Solusi Terbaik untuk Bisnis Anda',
  description: 'Platform modern yang membantu Anda mengelola bisnis dengan lebih efisien dan efektif.',
  keywords: 'landing page, bisnis, solusi, kelola aja',
  icons: {
    icon: '/images/common/iconweb.png',
    shortcut: '/images/common/iconweb.png',
    apple: '/images/common/iconweb.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

