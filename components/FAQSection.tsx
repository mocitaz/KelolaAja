'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

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
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
      const response = await fetch(`${baseUrl}/api/v1/faqs`, {
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success && Array.isArray(data.data)) {
        // Only get active FAQs and limit to 9 items (or show all if less than 9)
        setFaqs(data.data.filter((faq: FAQ) => faq.isActive).slice(0, 9))
      }
    } catch (error: any) {
      // Silently fail - only log in development
      if (process.env.NODE_ENV === 'development' && error.name !== 'AbortError') {
        console.error('Error fetching FAQs:', error)
      }
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  // Fallback FAQs - Updated with new FAQ content
  const fallbackFaqItems = t.faq?.items || [
    {
      question: 'Apa itu KelolaAja?',
      answer: 'KelolaAja adalah software ERP terintegrasi yang dikembangkan khusus untuk menjawab kebutuhan small to growing businesses di Indonesia. Dirancang untuk menyederhanakan proses manajemen keuangan, pembukuan, pelaporan, hingga operasional bisnis lainnya secara menyeluruh, KelolaAja memungkinkan perusahaan untuk mengelola dan memantau aktivitas bisnis secara real-time, dari mana saja, dengan efisiensi tinggi dan akurasi yang konsisten.\n\nMeski dioptimalkan untuk bisnis yang sedang tumbuh, KelolaAja dibangun dengan standar dan kapabilitas enterprise-class. Ini memastikan bahwa perusahaan skala besar sekalipun tetap dapat mengandalkan KelolaAja dalam memenuhi kompleksitas kebutuhan internal mereka.',
    },
    {
      question: 'Apa yang membedakan KelolaAja dari software ERP lain di pasaran?',
      answer: 'KelolaAja menghadirkan keseimbangan antara kualitas sistem, kedalaman fitur, dan keterjangkauan biaya. Dibanding ERP lokal maupun global, KelolaAja menawarkan solusi yang komprehensif dan efisien secara biaya, tanpa mengorbankan fungsionalitas inti.',
    },
    {
      question: 'Apakah pengguna perlu memiliki pengalaman teknis untuk menggunakan KelolaAja?',
      answer: 'Tidak. KelolaAja dirancang dengan antarmuka yang intuitif dan alur kerja yang disederhanakan berdasarkan riset langsung terhadap kebutuhan pengguna bisnis di berbagai level. Sistem ini dapat digunakan tanpa pengalaman teknis sebelumnya.',
    },
    {
      question: 'Berapa lama proses implementasi KelolaAja?',
      answer: 'Proses implementasi KelolaAja umumnya memakan waktu antara 1 hingga 3 bulan, tergantung pada kompleksitas struktur bisnis, jumlah modul yang digunakan, dan kesiapan data internal perusahaan. Rentang waktu ini mencakup seluruh tahapan penting seperti analisis kebutuhan, konfigurasi sistem, migrasi data, pelatihan pengguna, hingga pendampingan saat go-live.',
    },
    {
      question: 'Apakah KelolaAja bisa disesuaikan dengan kebutuhan bisnis saya?',
      answer: 'KelolaAja telah dirancang untuk langsung mendukung proses bisnis umum tanpa perlu kustomisasi. Jika ada kebutuhan sangat spesifik, kustomisasi dimungkinkan dengan biaya tambahan sesuai kompleksitas. Namun, kami tidak merekomendasikan kustomisasi kecuali benar-benar diperlukan, agar sistem tetap efisien, stabil, dan scalable.',
    },
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
  const initialDisplayCount = 5
  const visibleFaqs = showAll ? displayFaqs : displayFaqs.slice(0, initialDisplayCount)
  const hasMore = displayFaqs.length > initialDisplayCount

  // Don't show loading spinner - directly use fallback data

  if (displayFaqs.length === 0) {
    return null
  }

  return (
    <div className="h-full">
      <ScrollAnimation direction="left" delay={200} duration={600}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-3">
            {t.faq?.title || 'Pertanyaan Umum'}
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mb-4">
            {t.faq?.subtitle || 'Temukan jawaban atas pertanyaan umum tentang KelolaAja'}
          </p>
          <div className="space-y-2">
            {visibleFaqs.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="px-3 py-2.5 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200">
                    <span className="font-semibold text-xs sm:text-sm text-gray-900 pr-3 leading-snug">
                      {item.question}
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
                  <div className="px-3 py-2.5 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          {/* Show More / Show Less Button */}
          {hasMore && (
            <div className="mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm font-medium text-[#039edb] hover:text-[#0280af] transition-colors flex items-center gap-1.5"
              >
                {showAll ? (
                  <>
                    <span>Tampilkan Lebih Sedikit</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Lihat Semua FAQ ({displayFaqs.length})</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </ScrollAnimation>
    </div>
  )
}
