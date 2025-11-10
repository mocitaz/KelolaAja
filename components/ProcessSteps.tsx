'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function ProcessSteps() {
  const { t } = useLanguage()

  const steps = [
    {
      title: t.processSteps?.steps?.analysis?.title || 'Analisa Proses Bisnis',
      description: t.processSteps?.steps?.analysis?.description || 'Tim konsultan kami akan mengidentifikasi masalah dan kebutuhan bisnismu',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v7H3v-7zm4-4h2v11H7V9zm4-3h2v14h-2V6zm4 2h2v12h-2V8zm4 4h2v8h-2v-8z" />
        </svg>
      ),
    },
    {
      title: t.processSteps?.steps?.planning?.title || 'Perencanaan',
      description: t.processSteps?.steps?.planning?.description || 'Kami pastikan sistem bekerja sesuai dengan proses bisnismu.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: t.processSteps?.steps?.training?.title || 'Pelatihan',
      description: t.processSteps?.steps?.training?.description || 'Membantu user lewat pelatihan khusus untuk setiap divisi.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: t.processSteps?.steps?.goingLive?.title || 'Going Live',
      description: t.processSteps?.steps?.goingLive?.description || 'Memastikan semua proses berjalan baik setelah going live.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Image - Compact 16:9, Centered between step 1 and 3 */}
          <ScrollAnimation direction="right" delay={0} duration={700}>
            <div className="relative order-2 lg:order-1">
              {/* Invisible spacer: Title (~100px) + Step 1 (~90px) = ~190px to position image higher, centered between step 1 and 3 */}
              <div className="hidden lg:block h-[190px]"></div>
              {/* Image positioned to center between step 1 and 3 */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 group">
                <Image
                  src="/images/process-steps-image.jpg"
                  alt="Kelola Usahamu"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-xl blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            {/* Title */}
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-primary-600 mb-6 lg:mb-8 leading-tight">
                {t.processSteps?.title || 'Kelola Usahamu,'}
                <br />
                <span className="text-gray-900">Gak Pake Ribet</span>
              </h2>
            </ScrollAnimation>

            {/* Steps */}
            <div className="space-y-3 lg:space-y-4">
              {steps.map((step, index) => (
                <ScrollAnimation
                  key={index}
                  direction="left"
                  delay={index * 100}
                  duration={500}
                >
                  <div className="group relative bg-white rounded-xl p-4 lg:p-5 border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start gap-3 lg:gap-4">
                      {/* Step Number - Green Circle */}
                      <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-md group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>

                      {/* Icon Box - Gradient like Benefits section */}
                      <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md p-2.5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {step.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

