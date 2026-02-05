'use client'

import Link from 'next/link'
import { Linkedin } from 'lucide-react'

const footerLinks = {
  ourClients: [
    { name: 'Pharma & Life Sciences', href: '#life-sciences' },
    { name: 'Health Systems', href: '#health-systems' },
    { name: 'Health Tech & Med Innovators', href: '#health-tech' },
  ],
  whatWeOffer: [
    { name: 'Advisory Services', href: '#advisory' },
    { name: 'Partnering Services', href: '#partnering' },
    { name: 'Regulatory Strategy', href: '#regulatory' },
    { name: 'Market Adoption', href: '#market-adoption' },
    { name: 'Ecosystem Solutions', href: '#ecosystem' },
  ],
  insights: [
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Blog', href: '#blog' },
    { name: 'White Papers', href: '#white-papers' },
  ],
  aboutUs: [
    { name: 'Leadership', href: '#leadership' },
    { name: 'The Decimal Ecosystem', href: '#ecosystem' },
    { name: 'Careers', href: '#careers' },
    { name: 'Events', href: '#events' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-decimal-cream-dark text-decimal-navy">
      <div className="container-lg py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand & Address */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/decimalhealth/logo.png"
                alt="Decimal Health"
                className="h-14 w-auto"
              />
            </Link>
            <address className="not-italic text-sm text-decimal-navy/60 mb-4 leading-relaxed">
              50 Milk Street<br />
              16th Floor<br />
              Boston, MA 02109
            </address>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/decimal-health"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-decimal-navy/10 flex items-center justify-center
                           hover:bg-decimal-purple hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-decimal-navy/10 flex items-center justify-center
                           hover:bg-decimal-purple hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Our Clients */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">Our Clients</h4>
            <ul className="space-y-2">
              {footerLinks.ourClients.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-decimal-navy/60 hover:text-decimal-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Offer */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">What We Offer</h4>
            <ul className="space-y-2">
              {footerLinks.whatWeOffer.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-decimal-navy/60 hover:text-decimal-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Insights */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">Insights</h4>
            <ul className="space-y-2">
              {footerLinks.insights.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-decimal-navy/60 hover:text-decimal-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">About Us</h4>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-decimal-navy/60 hover:text-decimal-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="#contact"
                  className="text-sm font-semibold text-decimal-purple underline underline-offset-2 hover:text-decimal-navy transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-decimal-navy/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-decimal-navy/40 text-xs">
            All rights reserved Decimal Health | Terms | Privacy
          </p>
        </div>
      </div>
    </footer>
  )
}
