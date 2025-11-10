'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const { t } = useLanguage()
  const faqItems: FAQItem[] = t.faq?.items || [
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

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="h-full">
      {/* Title */}
      <ScrollAnimation direction="fade" delay={0} duration={600}>
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
            {t.faq?.title || 'Pertanyaan Umum'}
          </h2>
          <p className="text-sm lg:text-base text-gray-600">
            {t.faq?.subtitle || 'Temukan jawaban atas pertanyaan umum tentang KelolaAja'}
          </p>
        </div>
      </ScrollAnimation>

      {/* FAQ Accordion */}
      <div className="space-y-3 lg:space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <ScrollAnimation
              key={index}
              direction="up"
              delay={index * 100}
              duration={500}
            >
              <div
                className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden group ${
                  isOpen
                    ? 'border-primary-300 shadow-xl ring-4 ring-primary-50 scale-[1.01]'
                    : 'border-gray-200 hover:border-primary-200 hover:shadow-lg'
                }`}
              >
                <button
                  className="flex justify-between items-center w-full p-4 lg:p-5 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-3 flex-1 pr-3">
                    {/* Question Number Badge */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center font-bold text-xs lg:text-sm transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-primary-50 group-hover:to-primary-100 group-hover:text-primary-600'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Question Text */}
                    <h3
                      className={`text-sm lg:text-base font-bold transition-colors duration-300 ${
                        isOpen
                          ? 'text-primary-700'
                          : 'text-gray-900 group-hover:text-primary-600'
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  {/* Arrow Icon */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-primary-100 text-primary-600 rotate-180'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${index}`}
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 lg:w-10">
                        {/* Spacer to align with question number */}
                      </div>
                      <div className="flex-1">
                        <div className="pl-0 lg:pl-3 border-l-4 border-primary-300 bg-gradient-to-r from-primary-50/50 to-transparent rounded-r-lg p-3 lg:p-4">
                          <p className="text-gray-700 leading-relaxed text-xs lg:text-sm">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          )
        })}
      </div>
    </div>
  )
}
