import {
  Navigation,
  Hero,
  HowWereDifferent,
  WhoWeHelp,
  Newsletter,
  WhatClientsComeFor,
  Events,
  CTABanner,
  Footer,
} from '@/components'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <HowWereDifferent />
        <WhoWeHelp />
        <Newsletter />
        <WhatClientsComeFor />
        <Events />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
