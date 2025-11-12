import Navbar from '@/components/Navbar'
import FinancePage from '@/components/FinancePage'
import Footer from '@/components/Footer'

export default function FinanceFeaturePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <FinancePage />
      <Footer />
    </main>
  )
}
