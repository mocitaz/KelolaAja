'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function CareersPage() {
  const { locale } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    resume: null as File | null,
    photo: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = locale === 'id' ? 'Bergabung dengan Tim Kami' : 'Join Our Team'
  const description = locale === 'id'
    ? 'Kami mencari talenta berbakat untuk bergabung dalam perjalanan inovasi KelolaAja. Dapatkan kesempatan untuk bekerja di lingkungan yang dinamis dan berkembang.'
    : 'We are looking for talented individuals to join KelolaAja\'s innovation journey. Get the opportunity to work in a dynamic and growing environment.'

  const benefits = locale === 'id'
    ? ['Kompensasi Kompetitif', 'Fleksibilitas Waktu Kerja', 'Program Pelatihan Berkala', 'Kesempatan Berkarir Global']
    : ['Competitive Compensation', 'Flexible Working Hours', 'Regular Training Programs', 'Global Career Opportunities']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'photo') => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, [field]: file }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = locale === 'id' ? 'Nama wajib diisi' : 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = locale === 'id' ? 'Email wajib diisi' : 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'id' ? 'Format email tidak valid' : 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = locale === 'id' ? 'Nomor telepon wajib diisi' : 'Phone number is required'
    }
    if (!formData.address.trim()) {
      newErrors.address = locale === 'id' ? 'Alamat wajib diisi' : 'Address is required'
    }
    if (!formData.resume) {
      newErrors.resume = locale === 'id' ? 'Resume/CV wajib diupload' : 'Resume/CV is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert(locale === 'id' ? 'Form berhasil dikirim!' : 'Form submitted successfully!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        resume: null,
        photo: null,
      })
    }, 1000)
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Compact & Modern */}
      <section className="relative pt-20 lg:pt-24 pb-6 lg:pb-8 bg-gradient-to-br from-[#0498da]/5 via-white to-[#71bf44]/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#0498da]/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#71bf44]/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="fade" delay={0} duration={800}>
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0498da]/10 rounded-full mb-4">
                <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-[#0498da]">
                  {locale === 'id' ? 'Karir di KelolaAja' : 'Careers at KelolaAja'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-gray-900 mb-4 leading-tight">
                {locale === 'id' ? (
                  <>
                    Bangun Karir Bersama{' '}
                    <span className="bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                      KelolaAja
                    </span>
                  </>
                ) : (
                  <>
                    Build Your Career with{' '}
                    <span className="bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                      KelolaAja
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {locale === 'id'
                  ? 'Bergabunglah dengan tim inovatif yang membentuk masa depan teknologi ERP di Indonesia. Di KelolaAja, setiap talenta memiliki kesempatan untuk berkembang, berinovasi, dan memberikan dampak nyata bagi bisnis Indonesia.'
                  : 'Join an innovative team shaping the future of ERP technology in Indonesia. At KelolaAja, every talent has the opportunity to grow, innovate, and make a real impact on Indonesian businesses.'}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Process Section - Compact */}
      <section className="py-6 lg:py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="fade" delay={100} duration={600}>
              <div className="text-center mb-6">
                <h2 className="text-lg lg:text-xl font-display font-bold text-gray-900 mb-2">
                  {locale === 'id' ? 'Proses Rekrutmen' : 'Recruitment Process'}
                </h2>
                <p className="text-xs lg:text-sm text-gray-600">
                  {locale === 'id' ? 'Proses yang sederhana dan transparan' : 'Simple and transparent process'}
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="fade" delay={150} duration={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { 
                    step: locale === 'id' ? '1' : '1', 
                    title: locale === 'id' ? 'Kirim Aplikasi' : 'Submit Application',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  },
                  { 
                    step: locale === 'id' ? '2' : '2', 
                    title: locale === 'id' ? 'Review CV' : 'CV Review',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )
                  },
                  { 
                    step: locale === 'id' ? '3' : '3', 
                    title: locale === 'id' ? 'Interview' : 'Interview',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )
                  },
                  { 
                    step: locale === 'id' ? '4' : '4', 
                    title: locale === 'id' ? 'Onboarding' : 'Onboarding',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-[#0498da]/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center mb-2 w-10 h-10 mx-auto bg-gradient-to-br from-[#0498da]/10 to-[#71bf44]/10 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="text-xs font-semibold text-[#0498da] mb-1">STEP {item.step}</div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Main Content - Application Form */}
      <section className="py-8 lg:py-10 bg-gradient-to-b from-gray-50 via-white to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Application Form */}
            <ScrollAnimation direction="fade" delay={150} duration={600}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <div className="mb-6">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#0498da] to-[#71bf44] rounded-xl mb-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h2 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-2">
                          {locale === 'id' ? 'Formulir Aplikasi' : 'Application Form'}
                        </h2>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {locale === 'id'
                            ? 'Lengkapi data diri Anda untuk melamar posisi di KelolaAja'
                            : 'Complete your information to apply for a position at KelolaAja'}
                        </p>
                      </div>
                      <div className="h-0.5 w-16 bg-gradient-to-r from-[#0498da] to-[#71bf44] rounded-full mx-auto"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Nama Lengkap' : 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 01 8 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={locale === 'id' ? 'Masukkan nama lengkap' : 'Enter your full name'}
                            className={`w-full pl-12 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Email' : 'Email'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={locale === 'id' ? 'nama@email.com' : 'name@email.com'}
                            className={`w-full pl-12 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Nomor Telepon' : 'Phone Number'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={locale === 'id' ? '08xxxxxxxxxx' : '08xxxxxxxxxx'}
                            className={`w-full pl-12 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Alamat Lengkap' : 'Full Address'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            placeholder={locale === 'id' ? 'Masukkan alamat lengkap' : 'Enter your full address'}
                            className={`w-full pl-12 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all resize-none ${
                              errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Resume/CV Upload */}
                      <div>
                        <label htmlFor="resume" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Upload Resume/CV' : 'Upload Resume/CV'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, 'resume')}
                            className="hidden"
                          />
                          <label
                            htmlFor="resume"
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm border-2 border-dashed rounded-lg cursor-pointer transition-all group ${
                              errors.resume
                                ? 'border-red-500 bg-red-50 hover:bg-red-100'
                                : formData.resume
                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                : 'border-gray-300 bg-gray-50 hover:border-[#0498da] hover:bg-[#0498da]/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                errors.resume
                                  ? 'bg-red-100'
                                  : formData.resume
                                  ? 'bg-green-100'
                                  : 'bg-gray-200 group-hover:bg-[#0498da]/10'
                              }`}>
                                <svg className={`w-5 h-5 ${
                                  errors.resume
                                    ? 'text-red-600'
                                    : formData.resume
                                    ? 'text-green-600'
                                    : 'text-gray-500 group-hover:text-[#0498da]'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <span className={`font-medium ${
                                errors.resume
                                  ? 'text-red-700'
                                  : formData.resume
                                  ? 'text-green-700'
                                  : 'text-gray-700'
                              }`}>
                                {formData.resume
                                  ? formData.resume.name
                                  : locale === 'id'
                                  ? 'Pilih file Resume/CV (PDF, DOC, DOCX)'
                                  : 'Choose Resume/CV file (PDF, DOC, DOCX)'}
                              </span>
                            </div>
                            <svg className={`w-5 h-5 ${
                              errors.resume
                                ? 'text-red-500'
                                : formData.resume
                                ? 'text-green-500'
                                : 'text-gray-400 group-hover:text-[#0498da]'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </label>
                        </div>
                        {errors.resume && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.resume}
                          </p>
                        )}
                        {formData.resume && !errors.resume && (
                          <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {locale === 'id' ? 'File berhasil diupload' : 'File uploaded successfully'}
                          </p>
                        )}
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label htmlFor="photo" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Upload Foto' : 'Upload Photo'} <span className="text-gray-500 text-xs font-normal">({locale === 'id' ? 'Opsional' : 'Optional'})</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="photo"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, 'photo')}
                            className="hidden"
                          />
                          <label
                            htmlFor="photo"
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm border-2 border-dashed rounded-lg cursor-pointer transition-all group ${
                              formData.photo
                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                : 'border-gray-300 bg-gray-50 hover:border-[#0498da] hover:bg-[#0498da]/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                formData.photo
                                  ? 'bg-green-100'
                                  : 'bg-gray-200 group-hover:bg-[#0498da]/10'
                              }`}>
                                <svg className={`w-5 h-5 ${
                                  formData.photo
                                    ? 'text-green-600'
                                    : 'text-gray-500 group-hover:text-[#0498da]'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className={`font-medium ${
                                formData.photo
                                  ? 'text-green-700'
                                  : 'text-gray-700'
                              }`}>
                                {formData.photo
                                  ? formData.photo.name
                                  : locale === 'id'
                                  ? 'Pilih file Foto (JPG, PNG)'
                                  : 'Choose Photo file (JPG, PNG)'}
                              </span>
                            </div>
                            <svg className={`w-5 h-5 ${
                              formData.photo
                                ? 'text-green-500'
                                : 'text-gray-400 group-hover:text-[#0498da]'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </label>
                        </div>
                        {formData.photo && (
                          <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {locale === 'id' ? 'File berhasil diupload' : 'File uploaded successfully'}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full group relative px-6 py-3 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.01] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#0498da] to-[#71bf44] hover:from-[#0388c2] hover:to-[#5fa836]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {locale === 'id' ? 'Mengirim...' : 'Submitting...'}
                              </>
                            ) : (
                              <>
                                {locale === 'id' ? 'Kirim Aplikasi' : 'Submit Application'}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                        <p className="mt-3 text-xs text-gray-500 text-center">
                          {locale === 'id'
                            ? 'Dengan mengirim formulir ini, Anda menyetujui kebijakan privasi kami'
                            : 'By submitting this form, you agree to our privacy policy'}
                        </p>
                      </div>
                    </form>
                  </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}

