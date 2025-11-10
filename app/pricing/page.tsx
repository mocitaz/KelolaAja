import Navbar from '@/components/Navbar'
import PricingSection from '@/components/PricingSection'
import KelolaAjaFeatures from '@/components/KelolaAjaFeatures'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PricingSection />
      <KelolaAjaFeatures />
      <Footer />
    </main>
  )
}
