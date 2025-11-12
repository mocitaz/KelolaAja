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
    <section className="py-8 lg:py-12 bg-gradient-to-b from-white via-primary-50/20 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-48 h-48 bg-primary-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-5 w-64 h-64 bg-secondary-200/15 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Image */}
          <ScrollAnimation direction="right" delay={0} duration={700}>
            <div className="relative order-2 lg:order-1">
              {/* Spacer to position image centered between step 1 and 3 */}
              <div className="hidden lg:block h-[140px]"></div>
              {/* Image */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 group">
                <Image
                  src="/images/home/process-steps-image.jpg"
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6 lg:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  {t.processSteps?.title || 'Kelola Usahamu,'}
                </span>
                <br />
                <span className="text-gray-900">Gak Pake Ribet</span>
              </h2>
            </ScrollAnimation>

            {/* Steps with Timeline */}
            <div className="relative">
              {/* Vertical Timeline Line - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-secondary-400 to-primary-400"></div>

              {/* Steps */}
              <div className="space-y-4 lg:space-y-5">
                {steps.map((step, index) => (
                  <ScrollAnimation
                    key={index}
                    direction="left"
                    delay={index * 100}
                    duration={500}
                  >
                    <div className="relative">
                      {/* Timeline Node - Desktop */}
                      <div className="hidden lg:block absolute left-0 top-4 w-12 h-12 -translate-x-1/2">
                        <div className="relative w-full h-full">
                          {/* Outer glow ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 opacity-25 blur-sm animate-pulse"></div>
                          {/* Step number circle */}
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-base shadow-lg border-2 border-white transform group-hover:scale-110 transition-all duration-300">
                            {index + 1}
                          </div>
                          {/* Inner glow */}
                          <div className="absolute inset-1.5 rounded-full bg-white/20"></div>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="lg:ml-16">
                        <div className="group relative bg-white rounded-xl p-4 lg:p-5 shadow-md border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-secondary-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-start gap-3 lg:gap-4">
                              {/* Icon */}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 flex items-center justify-center text-white shadow-md p-2.5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                                  {/* Shimmer effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                  <div className="relative z-10 w-7 h-7 lg:w-8 lg:h-8">
                                    {step.icon}
                                  </div>
                                </div>
                              </div>

                              {/* Text Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  {/* Step number badge - Mobile */}
                                  <div className="lg:hidden w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                                    {index + 1}
                                  </div>
                                  <h3 className="text-base lg:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                                    {step.title}
                                  </h3>
                                </div>
                                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary-100/40 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>

                      {/* Connecting Line - Between steps (Desktop only) */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute left-6 top-16 w-0.5 h-5 bg-gradient-to-b from-primary-300 to-secondary-300"></div>
                      )}
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

