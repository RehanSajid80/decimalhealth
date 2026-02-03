import {
  Navigation,
  Hero,
  WhoWeHelp,
  WhatWeOffer,
  CTABanner,
  OurImpact,
  Footer,
} from '@/components'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhoWeHelp />
        <WhatWeOffer />
        <CTABanner />
        <OurImpact />
      </main>
      <Footer />
    </>
  )
}
