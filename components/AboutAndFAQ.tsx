'use client'

import AboutKelolaAja from './AboutKelolaAja'
import FAQSection from './FAQSection'

export default function AboutAndFAQ() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: About KelolaAja */}
          <div>
            <AboutKelolaAja />
          </div>
          
          {/* Right: FAQ Section */}
          <div>
            <FAQSection />
          </div>
        </div>
      </div>
    </section>
  )
}

