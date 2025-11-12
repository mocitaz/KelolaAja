import Navbar from '@/components/Navbar'
import InventoryPage from '@/components/InventoryPage'
import Footer from '@/components/Footer'

export default function InventoryFeaturePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <InventoryPage />
      <Footer />
    </main>
  )
}

