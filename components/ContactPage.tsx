'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function ContactPage() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()
  
  // Fallback data dengan konten lengkap
  const defaultContactData = {
    testimonial: {
      name: 'Ayu Panduwinata',
      quote: 'Proses bisnis sekarang jadi dua kali lebih efisien. Selain itu, pelayanan juga salah satu kelebihan KelolaAja. Setiap kali kami ada kendala, tim KelolaAja sangat responsif.',
      image: '/images/ayu.png',
    },
    title: 'Dapatkan Konsultasi Gratis Untuk Masalah Proses Bisnis Anda',
    benefits: [
      'Dilayani tim konsultan spesialis di berbagai industri',
      'Identifikasi berbagai masalah dalam proses bisnis Anda beserta solusinya',
      'Konsultasi gratis dilakukan online via Zoom',
      'Jadwalkan konsultasi sesuai keinginan Anda',
    ],
    form: {
      fullName: 'Nama Lengkap',
      companyName: 'Nama Perusahaan',
      demoDate: 'Tanggal Demo',
      demoSession: 'Sesi Demo',
      morning: 'Pagi',
      afternoon: 'Siang',
      companyEmail: 'Email Perusahaan',
      companyPhone: 'Nomer Perusahaan',
      message: 'Pesan',
      submitButton: 'Daftar Sekarang',
    },
    notes: [
      'Harap lengkapi data diri Anda dengan benar untuk memudahkan komunikasi dan konfirmasi dengan tim KelolaAja',
      'Setelah Anda menjadwalkan sesi demo dan konsultasi gratis, kami akan segera mengonfirmasi melalui WhatsApp atau email.',
      'Pastikan Anda memilih waktu yang sesuai agar sesi demo berjalan lancar dan Anda bisa memperoleh informasi yang diperlukan.',
      'Anda dapat mengikuti sesi demo atau konsultasi melalui smartphone, laptop, atau PC, pastikan juga koneksi internet Anda stabil.',
    ],
  }

  const contactData = t.contactPage?.testimonial?.name ? t.contactPage : defaultContactData

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    demoDate: '',
    demoSession: '',
    companyEmail: '',
    companyPhone: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi'
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Nama perusahaan wajib diisi'
    }
    if (!formData.demoDate) {
      newErrors.demoDate = 'Tanggal demo wajib diisi'
    }
    if (!formData.demoSession) {
      newErrors.demoSession = 'Sesi demo wajib dipilih'
    }
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Email perusahaan wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Format email tidak valid'
    }
    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone = 'Nomor perusahaan wajib diisi'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.companyEmail,
          phone: formData.companyPhone,
          message: `Nama Perusahaan: ${formData.companyName}\nTanggal Demo: ${formData.demoDate}\nSesi Demo: ${formData.demoSession}\n\nPesan:\n${formData.message}`,
        }),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          fullName: '',
          companyName: '',
          demoDate: '',
          demoSession: '',
          companyEmail: '',
          companyPhone: '',
          message: '',
        })
        alert('Terima kasih! Kami akan segera menghubungi Anda.')
      } else {
        alert('Terjadi kesalahan. Silakan coba lagi.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Testimonial Section - Centered */}
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <div className="text-center mb-10 lg:mb-12">
                {/* Profile Image - Larger */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary-200 shadow-xl">
                    <Image
                      src={contactData.testimonial.image}
                      alt={contactData.testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 192px, 224px"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {contactData.testimonial.name}
                </h3>

                {/* Quote */}
                <div className="relative max-w-3xl mx-auto">
                  <svg
                    className="absolute -top-4 -left-4 w-12 h-12 text-primary-200 opacity-40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed pl-8 pr-4">
                    {contactData.testimonial.quote}
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            {/* Title Section - Outside Form */}
            <ScrollAnimation direction="up" delay={100} duration={600}>
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                  {contactData.title}
                </h2>

                {/* Benefits List */}
                <div className="max-w-3xl mx-auto">
                  <ul className="space-y-2.5">
                    {contactData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
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
                        <p className="text-sm text-gray-600 leading-relaxed flex-1">
                          {benefit}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollAnimation>

            {/* Form Section */}
            <ScrollAnimation direction="up" delay={150} duration={600}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-gray-100">
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.fullName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nama"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-primary-200'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.companyName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="PT.XXX"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.companyName ? 'border-red-500' : 'border-primary-200'
                        }`}
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                      )}
                    </div>

                    {/* Demo Date */}
                    <div>
                      <label htmlFor="demoDate" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.demoDate} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="demoDate"
                        name="demoDate"
                        value={formData.demoDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.demoDate ? 'border-red-500' : 'border-primary-200'
                        }`}
                      />
                      {errors.demoDate && (
                        <p className="mt-1 text-xs text-red-500">{errors.demoDate}</p>
                      )}
                    </div>

                    {/* Demo Session */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.demoSession} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="demoSession"
                            value="morning"
                            checked={formData.demoSession === 'morning'}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm lg:text-base text-gray-700">{contactData.form.morning}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="demoSession"
                            value="afternoon"
                            checked={formData.demoSession === 'afternoon'}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm lg:text-base text-gray-700">{contactData.form.afternoon}</span>
                        </label>
                      </div>
                      {errors.demoSession && (
                        <p className="mt-1 text-xs text-red-500">{errors.demoSession}</p>
                      )}
                    </div>

                    {/* Company Email */}
                    <div>
                      <label htmlFor="companyEmail" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.companyEmail} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        placeholder="admin@gmail.com"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.companyEmail ? 'border-red-500' : 'border-primary-200'
                        }`}
                      />
                      {errors.companyEmail && (
                        <p className="mt-1 text-xs text-red-500">{errors.companyEmail}</p>
                      )}
                    </div>

                    {/* Company Phone */}
                    <div>
                      <label htmlFor="companyPhone" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.companyPhone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="companyPhone"
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleChange}
                        placeholder="0812xxxx"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.companyPhone ? 'border-red-500' : 'border-primary-200'
                        }`}
                      />
                      {errors.companyPhone && (
                        <p className="mt-1 text-xs text-red-500">{errors.companyPhone}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        {contactData.form.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis Kebutuhanmu"
                        rows={4}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none ${
                          errors.message ? 'border-red-500' : 'border-primary-200'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {contactData.form.submitButton}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </ScrollAnimation>

                {/* Notes Section */}
                <ScrollAnimation direction="up" delay={250} duration={600}>
                  <div className="mt-8 lg:mt-10">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Catatan:</h3>
                    <div className="space-y-3">
                      {contactData.notes.map((note, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3 lg:p-4"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium mt-0.5">
                            {index + 1}
                          </span>
                          <p className="text-sm text-gray-600 leading-relaxed flex-1">
                            {note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={0} duration={600}>
              {/* Title */}
              <div className="text-center mb-10 lg:mb-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-900 leading-relaxed">
                  Untuk kendala produk dan layanan,
                  <br />
                  silakan menghubungi tim dukungan pelanggan kami
                </h2>
              </div>

              {/* Contact Options - 2 Columns */}
              <div className="flex flex-col md:flex-row max-w-3xl mx-auto">
                {/* WhatsApp Column */}
                <div className="flex flex-col items-center flex-1 md:pr-4 lg:pr-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp</h3>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>WhatsApp sekarang</span>
                  </a>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-gray-200 mx-4 lg:mx-6"></div>

                {/* Email Column */}
                <div className="flex flex-col items-center flex-1 md:pl-4 lg:pl-6 mt-6 md:mt-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Email</h3>
                  <a
                    href="mailto:support@kelolaaja.com"
                    className="w-full px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Email sekarang</span>
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}

