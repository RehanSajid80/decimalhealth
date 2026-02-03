import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Decimal Health | From Bold Ideas to Impact',
  description: 'Decimal Health accelerates digital transformation that shifts care forward. We partner with life sciences, health systems, and health tech innovators to turn bold ideas into digital health solutions that make care more effective, more connected, and more human.',
  keywords: 'digital health consulting, healthcare innovation, health tech strategy, FDA clearance, clinical validation, digital therapeutics, remote patient monitoring, health system transformation, pharma digital health, life sciences consulting, advisory services, regulatory strategy, market adoption',
  authors: [{ name: 'Decimal Health' }],
  openGraph: {
    title: 'Decimal Health | From Bold Ideas to Impact',
    description: 'Accelerating digital transformation that shifts care forward. Advisory, partnering, regulatory strategy, and market adoption services for healthcare innovators.',
    url: 'https://decimal.health',
    siteName: 'Decimal Health',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Decimal Health - From Bold Ideas to Impact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decimal Health | From Bold Ideas to Impact',
    description: 'Accelerating digital transformation that shifts care forward.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD Structured Data for LLM indexing
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Decimal Health',
  description: 'Decimal Health accelerates digital transformation that shifts care forward. We partner with organizations across the healthcare ecosystem to turn innovation into measurable impact.',
  url: 'https://decimal.health',
  logo: 'https://decimal.health/logo.png',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '50 Milk Street, 16th Floor',
    addressLocality: 'Boston',
    addressRegion: 'MA',
    postalCode: '02109',
    addressCountry: 'US',
  },
  founders: [
    {
      '@type': 'Person',
      name: 'Kamal Jethwani',
      jobTitle: 'CEO & Co-Founder',
    },
    {
      '@type': 'Person',
      name: 'Sunita Patolia',
      jobTitle: 'COO & Co-Founder',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/decimal-health',
  ],
  knowsAbout: [
    'Digital Health',
    'Healthcare Innovation',
    'FDA Clearance',
    'Clinical Validation',
    'Digital Therapeutics',
    'Remote Patient Monitoring',
    'Health System Strategy',
    'Go-to-Market Strategy',
    'Evidence Generation',
    'Regulatory Strategy',
    'Market Adoption',
    'Life Sciences Consulting',
    'Health Tech Advisory',
  ],
  areaServed: 'Worldwide',
  serviceType: [
    'Advisory Services',
    'Partnering Services',
    'Regulatory Strategy',
    'Market Adoption',
    'Ecosystem Solutions',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3D3D6B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
