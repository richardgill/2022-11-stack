import { Footer } from './footer'
import { Header } from './header'
import { Hero } from './hero'
import { Pricing } from './pricing'
import { PrimaryFeatures } from './primaryFeatures'
import { Waitlist } from './waitlist'

export const MarketingLanding = () => (
  <>
    <Header />
    <main>
      <Hero />
      <PrimaryFeatures />
      <Waitlist />
      <Pricing />
    </main>
    <Footer />
  </>
)

export const documentProps = { title: 'Home' }
