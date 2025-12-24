'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'

export default function Footer() {
  const { t } = useLanguage()
  const [showComingSoon, setShowComingSoon] = useState(false)

  return (
    <footer className="bg-gray-100 border-t-2 border-gray-200 text-gray-700 py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-8">
          {/* Column 1: Hubungi Kami */}
          <div>
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">
              {t.footer?.contactUs || 'Hubungi Kami'}
            </h4>
            <div className="space-y-3 text-sm lg:text-base">
              <p className="text-gray-600 leading-relaxed">
                Jl. Pramuka No.12 Sepanjang Jaya, Kec. Rawalumbu, Kota Bekasi, Jawa Barat 17114
              </p>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 text-primary-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:08128296789"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  08128296789
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 text-primary-600 flex-shrink-0"
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
                <a
                  href="mailto:info@kelolaaja.id"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  info@kelolaaja.id
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Fitur */}
          <div>
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">
              {t.footer?.features || 'Fitur'}
            </h4>
            <ul className="space-y-2.5 text-sm lg:text-base">
              <li>
                <Link
                  href="/features/finance"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.features?.finance}
                </Link>
              </li>
              <li>
                <Link
                  href="/features/project"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.features?.project}
                </Link>
              </li>
              <li>
                <Link
                  href="/features/manufacturing"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.features?.manufacturing}
                </Link>
              </li>
              <li>
                <Link
                  href="/features/sales"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.features?.sales}
                </Link>
              </li>
              <li>
                <Link
                  href="/features/inventory"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.features?.inventory}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowComingSoon(true)
                  }}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
                >
                  {t.navDropdown?.features?.hr}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Industri */}
          <div>
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">
              {t.footer?.industries || 'Industri'}
            </h4>
            <ul className="space-y-2.5 text-sm lg:text-base">
              <li>
                <Link
                  href="/industries/fnb"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.industries?.fnb}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/contractor"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.industries?.contractor}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/manufaktur"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.industries?.manufacturing}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/retail"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {t.navDropdown?.industries?.retail}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 lg:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/common/logo.png"
                  alt="KelolaAja"
                  width={120}
                  height={35}
                  className="h-7 w-auto"
                />
              </Link>
              <p className="text-xs lg:text-sm text-gray-500 text-center md:text-left">
                © 2025 PT Tiga Inspirasi Bersama
              </p>
              <p className="text-xs lg:text-sm text-gray-500 text-center md:text-left">
                All rights reserved
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 lg:gap-6">
              <Link
                href="/terms"
                className="text-xs lg:text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 underline"
              >
                {t.footer?.terms || 'Syarat & Ketentuan'}
              </Link>
              <Link
                href="/privacy"
                className="text-xs lg:text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 underline"
              >
                {t.footer?.privacy || 'Kebijakan Privasi'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowComingSoon(false)}
            ></div>

            {/* Modal panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {t.comingSoon?.title || 'Coming Soon'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {t.comingSoon?.message || 'Modul HR & Payroll sedang dalam tahap pengembangan.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  onClick={() => setShowComingSoon(false)}
                >
                  {t.comingSoon?.close || 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
