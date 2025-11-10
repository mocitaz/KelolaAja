'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function AboutPage() {
  const { t } = useLanguage()
  
  // Fallback data dengan konten lengkap
  const defaultData = {
    subtitle: 'Tentang KelolaAja',
    title: 'Kelola Usahamu, Gak Pake Ribet',
    content1: 'KelolaAja hadir sebagai solusi digital untuk membantu bisnis berkembang lebih cepat, lebih rapi, dan lebih profesional. Dengan semangat "Kelola Usahamu, Gak Pake Ribet", KelolaAja menghadirkan sistem yang modern, mudah digunakan, serta relevan dengan kebutuhan pengusaha di era digital.',
    content2Part1: 'Kami percaya bahwa setiap usaha, sekecil apa pun, berhak dikelola dengan sistem yang rapi agar bisa bertumbuh, berkembang, dan bersaing di pasar.',
    content2Part2: 'Mulailah KelolaAja membantu keuangan bisnis tumbuh pesat lewat otomatisasi. Mengurangi 80% proses manual, mempercepat pembukuan, dan memberikan real-time business intelligence. KelolaAja adalah pilihan terbaik untuk bisnis yang ingin sukses di era digital. Dibuktikan oleh perusahaan di Indonesia, KelolaAja adalah solusi yang terpercaya dan efektif untuk mengelola operasi bisnis.',
    vision: {
      title: 'VISI',
      description: 'Terwujudnya kesejahteraan dan keberkahan pada umat manusia melalui solusi digital.',
    },
    mission: {
      title: 'MISI',
      items: [
        'Menyediakan solusi digital yang memudahkan dalam pengelolaan bisnis.',
        'Membantu usaha tumbuh dengan produktif, efisien, dan berkelanjutan.',
        'Menghadirkan teknologi yang terjangkau untuk semua skala usaha.',
        'Menjaga nilai keberkahan dalam setiap inovasi dan layanan.',
      ],
    },
  }
  
  // Menggunakan data dari translations jika ada dan lengkap, jika tidak gunakan defaultData
  const aboutData = t.aboutPage?.title ? t.aboutPage : defaultData

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-16 bg-gradient-to-b from-primary-50 via-white to-white overflow-hidden">
        {/* Enhanced gradient overlay untuk efek biru yang lebih jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-sm lg:text-base font-semibold text-primary-600 mb-3 lg:mb-4">
              {aboutData.subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-0">
              {aboutData.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="pt-6 lg:pt-8 pb-12 lg:pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Image 1 */}
            <ScrollAnimation direction="right" delay={0} duration={600}>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200 group">
                <Image
                  src="/images/about-image-1.jpg"
                  alt="About KelolaAja"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    if (target.parentElement) {
                      target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
              </div>
            </ScrollAnimation>

            {/* Content 1 */}
            <ScrollAnimation direction="left" delay={100} duration={600}>
              <div>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {aboutData.content1}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="py-12 lg:py-16 relative overflow-hidden">
        {/* Green gradient background on the left side */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-1/2 bg-gradient-to-r from-secondary-50 via-secondary-100/50 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Content 2 */}
            <ScrollAnimation direction="right" delay={0} duration={600}>
              <div>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  {aboutData.content2Part1}
                </p>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {aboutData.content2Part2}
                </p>
              </div>
            </ScrollAnimation>

            {/* Image 2 */}
            <ScrollAnimation direction="left" delay={100} duration={600}>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200 group">
                <Image
                  src="/images/about-image-2.jpg"
                  alt="About KelolaAja"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    if (target.parentElement) {
                      target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Vision Card */}
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  {aboutData.vision.title}
                </h2>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {aboutData.vision.description}
                </p>
              </div>
            </ScrollAnimation>

            {/* Mission Card */}
            <ScrollAnimation direction="up" delay={150} duration={600}>
              <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  {aboutData.mission.title}
                </h2>
                <ul className="space-y-3">
                  {aboutData.mission.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed flex-1">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}

