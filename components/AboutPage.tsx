'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import Link from 'next/link'

export default function AboutPage() {
  const { t, locale } = useLanguage()
  
  // Data untuk cards
  const aboutCards = [
    {
      title: locale === 'id' ? 'Profil Perusahaan' : 'Company Profile',
      description: locale === 'id' 
        ? 'Komitmen KelolaAja menghadirkan solusi ERP yang berkelanjutan untuk bisnis Indonesia.'
        : 'KelolaAja\'s commitment to delivering sustainable ERP solutions for Indonesian businesses.',
      image: '/images/home/about-profile.jpg',
      link: '/company/profile',
    },
    {
      title: locale === 'id' ? 'Sejarah Perusahaan' : 'Company History',
      description: locale === 'id'
        ? 'Perjalanan KelolaAja dalam mengembangkan solusi ERP untuk berbagai industri di Indonesia.'
        : 'KelolaAja\'s journey in developing ERP solutions for various industries in Indonesia.',
      image: '/images/home/about-history.jpg',
      link: '/company/history',
    },
    {
      title: locale === 'id' ? 'Tata Kelola' : 'Governance',
      description: locale === 'id'
        ? 'Menjalankan perusahaan dengan integritas, pengalaman, dan dedikasi untuk memberikan yang terbaik.'
        : 'Running the company with integrity, experience, and dedication to deliver the best.',
      image: '/images/home/about-governance.jpg',
      link: '/company/governance',
    },
    {
      title: locale === 'id' ? 'Pencapaian Perusahaan' : 'Company Achievements',
      description: locale === 'id'
        ? 'Setiap capaian nyata KelolaAja untuk membantu bisnis Indonesia berkembang lebih baik.'
        : 'Every real achievement of KelolaAja to help Indonesian businesses grow better.',
      image: '/images/home/about-achievements.jpg',
      link: '/company/achievements',
    },
  ]

  const headerTitle = locale === 'id' 
    ? 'Mengenal Lebih Dekat, Memahami Lebih Dalam'
    : 'Get to Know Closer, Understand Deeper'
  
  const headerDescription = locale === 'id'
    ? 'KelolaAja bukan sekadar software ERP. Kami adalah bagian dari perjalanan bisnis Indonesia menuju efisiensi dan pertumbuhan berkelanjutan. Menorehkan sejarah, membangun sistem yang tangguh, dan meraih pencapaian yang berarti bagi para pengusaha di seluruh negeri.'
    : 'KelolaAja is not just an ERP software. We are part of Indonesia\'s business journey towards efficiency and sustainable growth. Making history, building robust systems, and achieving meaningful accomplishments for entrepreneurs across the nation.'

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      {/* Header Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br from-[#0498da]/5 via-white to-[#0498da]/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#0498da]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#10b981]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-[#0498da]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="fade" delay={0} duration={800}>
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0498da]/10 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#0498da] rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-[#0498da]">
                  {locale === 'id' ? 'Tentang KelolaAja' : 'About KelolaAja'}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
                {headerTitle}
              </h1>
              <p className="text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
                {headerDescription}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="py-16 lg:py-24 bg-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {aboutCards.map((card, index) => (
                <ScrollAnimation
                  key={index}
                  direction="up"
                  delay={index * 100}
                  duration={700}
                >
                  <Link href={card.link} className="block h-full group">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#0498da]/40 transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-3 hover:scale-[1.02]">
                      {/* Image Container */}
                      <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-[#0498da]/5 to-[#10b981]/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0498da]/10 to-transparent z-10"></div>
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover group-hover:scale-115 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            if (target.parentElement) {
                              target.parentElement.className += ' bg-gradient-to-br from-[#0498da]/20 to-[#10b981]/20'
                            }
                          }}
                        />
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 flex flex-col flex-grow relative">
                        {/* Decorative accent */}
                        <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-[#0498da] to-[#10b981] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0498da] transition-colors duration-300 relative z-10">
                          {card.title}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-6 flex-grow relative z-10">
                          {card.description}
                        </p>
                        
                        {/* Link with enhanced styling */}
                        <div className="inline-flex items-center text-sm lg:text-base font-semibold text-[#0498da] group-hover:text-[#0388c2] transition-all duration-300 relative z-10">
                          <span className="mr-2">{locale === 'id' ? 'Pelajari lebih lanjut' : 'Learn more'}</span>
                          <div className="w-6 h-6 rounded-full bg-[#0498da]/10 group-hover:bg-[#0498da]/20 flex items-center justify-center transition-all duration-300">
                            <svg
                              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
