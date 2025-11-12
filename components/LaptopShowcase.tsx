'use client'

import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function LaptopShowcase() {
  return (
    <section className="pt-4 lg:pt-6 pb-8 lg:pb-12 bg-white">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        {/* Large Laptop Image - Almost Full Width */}
        <ScrollAnimation direction="fade" delay={0} duration={700}>
          <div className="relative w-full max-w-[98%] mx-auto">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/home/laptop-besar.png"
                alt="KelolaAja - Bisa diakses dari Android, Windows, iOS, Mac atau gadget apapun"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

