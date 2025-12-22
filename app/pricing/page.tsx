import Navbar from '@/components/Navbar'
import PricingSection from '@/components/PricingSection'
import KelolaAjaFeatures from '@/components/KelolaAjaFeatures'
import Footer from '@/components/Footer'
import { fetchKelolaAjaFeatures } from '@/lib/fetch-pages'

export default async function PricingPage() {
  // Fetch KelolaAja features data
  const kelolaAjaFeatures = await fetchKelolaAjaFeatures()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PricingSection />
      <KelolaAjaFeatures data={kelolaAjaFeatures} />
      <Footer />
    </main>
  )
}
