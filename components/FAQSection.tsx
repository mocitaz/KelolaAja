'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useEffect, useState } from 'react'

interface FAQ {
  faqId: number
  question: string
  answer: string
  categoryId?: number
  displayOrder: number
  isActive: boolean
}

export default function FAQSection() {
  const { t } = useLanguage()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
      const response = await fetch(`${baseUrl}/api/v1/faqs`)
      const data = await response.json()
      
      if (data.success && Array.isArray(data.data)) {
        // Only get active FAQs and limit to 4 items
        setFaqs(data.data.filter((faq: FAQ) => faq.isActive).slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  // Fallback FAQs
  const fallbackFaqItems = t.faq?.items || [
    {
      question: 'Apakah ada pelatihan untuk menggunakan KelolaAja?',
      answer: 'Ada, pelatihan baik secara online maupun langsung, termasuk tutorial, webinar, dan dukungan teknis, agar tim Anda dapat memanfaatkan software tersebut secara optimal.',
    },
    {
      question: 'Apa yang dibutuhkan untuk menggunakan KelolaAja?',
      answer: 'Tidak ada. Anda hanya memerlukan komputer beserta koneksi internet.',
    },
    {
      question: 'Apa manfaat software ERP akuntansi untuk bisnis?',
      answer: 'Akuntansi ERP KelolaAja mampu menghemat waktu pekerjaan perusahaan. Selain itu sistem akuntansi ini juga mampu menghindarkan perusahaan Anda dari kesalahan atau kekeliruan dalam perhitungan akuntansi, membuat laporan bisnis pun menjadi lebih aman, cepat dan mudah.',
    },
    {
      question: 'Apakah Aman Menggunakan KelolaAja?',
      answer: 'KelolaAja bertanggung jawab secara serius atas keamanan yang diperoleh pelanggan. Selain itu, keunggulan dari software, sistem, dan data menjadi prioritas utama kami. Keamanan juga menjadi kunci dari penawaran yang kami berikan. Untuk itu semua informasi yang Anda berikan telah ter-encrypt dan terjaga dengan teknologi dan keamanan yang terkemuka.',
    },
  ]

  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqItems

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0498da]"></div>
      </div>
    )
  }

  if (displayFaqs.length === 0) {
    return null
  }

  return (
    <div className="h-full">
      <ScrollAnimation direction="left" delay={200} duration={600}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            {t.faq?.title || 'Pertanyaan Umum'}
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mb-4">
            {t.faq?.subtitle || 'Temukan jawaban atas pertanyaan umum tentang KelolaAja'}
          </p>
          <div className="space-y-3">
            {displayFaqs.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200">
                    <span className="font-semibold text-sm text-gray-900 pr-4">
                      {index + 1}. {item.question}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-500 flex-shrink-0 transform transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}
