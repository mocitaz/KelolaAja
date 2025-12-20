import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import ProcessSteps from '@/components/ProcessSteps'
import CTASection from '@/components/CTASection'
import LaptopShowcase from '@/components/LaptopShowcase'
import ERPBenefits from '@/components/ERPBenefits'
import AdvancedFeatures from '@/components/AdvancedFeatures'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import AboutAndFAQ from '@/components/AboutAndFAQ'
import Footer from '@/components/Footer'
import VisitorTracker from '@/components/VisitorTracker'
import KelolaAjaFeatures from '@/components/KelolaAjaFeatures'
import { loadContent } from '@/lib/content'
import {
  fetchTestimonials,
  fetchProcessSteps,
  fetchERPBenefits,
  fetchBenefitStats,
  fetchKelolaAjaFeatures,
  fetchAdvancedFeatures
} from '@/lib/fetch-pages'

export default async function Home() {
  const content = await loadContent()

  // Parallel data fetching
  const [
    testimonials,
    processSteps,
    erpBenefits,
    benefitStats,
    kelolaAjaFeatures,
    advancedFeatures
  ] = await Promise.all([
    fetchTestimonials(),
    fetchProcessSteps(),
    fetchERPBenefits(),
    fetchBenefitStats(),
    fetchKelolaAjaFeatures(),
    fetchAdvancedFeatures()
  ])

  return (
    <main className="min-h-screen">
      <VisitorTracker />
      <Navbar />
      <Hero content={content.hero} />
      <Benefits />
      <ProcessSteps data={processSteps} />
      <CTASection />
      <ERPBenefits benefits={erpBenefits} stats={benefitStats} />
      <LaptopShowcase />
      <AdvancedFeatures data={advancedFeatures} />
      <KelolaAjaFeatures data={kelolaAjaFeatures} />
      <Testimonials data={testimonials} />
      <FinalCTA />
      <AboutAndFAQ />
      <Footer />
    </main>
  )
}


