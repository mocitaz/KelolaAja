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
import { loadContent } from '@/lib/content'

export default async function Home() {
  const content = await loadContent()

  return (
    <main className="min-h-screen">
      <VisitorTracker />
      <Navbar />
      <Hero content={content.hero} />
      <Benefits />
      <ProcessSteps />
      <CTASection />
      <ERPBenefits />
      <LaptopShowcase />
      <AdvancedFeatures />
      <Testimonials />
      <FinalCTA />
      <AboutAndFAQ />
      <Footer />
    </main>
  )
}

