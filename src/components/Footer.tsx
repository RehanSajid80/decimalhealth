'use client'

import Link from 'next/link'
import { Linkedin } from 'lucide-react'

const footerLinks = {
  whoWeHelp: [
    { name: 'Pharma & Life Sciences', href: '#life-sciences' },
    { name: 'Health Systems', href: '#health-systems' },
    { name: 'Health Tech & MedTech Innovators', href: '#health-tech' },
  ],
  services: [
    { name: 'Advisory Services', href: '#advisory' },
    { name: 'Partnering Services', href: '#partnering' },
    { name: 'Regulatory Strategy', href: '#regulatory' },
    { name: 'Market Adoption', href: '#market-adoption' },
    { name: 'Ecosystem Solutions', href: '#ecosystem' },
  ],
  insightsImpact: [
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Blog', href: '#blog' },
  ],
  communityConnect: [
    { name: 'Community Connect', href: '#community' },
  ],
  aboutUs: [
    { name: 'Leadership Team', href: '#leadership' },
    { name: 'Our Story', href: '#story' },
    { name: 'News', href: '#news' },
    { name: 'Community', href: '#community' },
    { name: 'Events', href: '#events' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-decimal-cream-dark text-decimal-navy">
      <div className="container-lg py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-12">
          {/* Brand & Address */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* d shape */}
                <path
                  d="M24 0H28V40H24C10.7452 40 0 29.2548 0 16V16C0 7.16344 7.16344 0 16 0H24Z"
                  fill="#3D3D6B"
                />
                <circle cx="16" cy="20" r="8" fill="#F5F3F0" />
                {/* dot */}
                <circle cx="34" cy="48" r="6" fill="#7B7BAD" />
              </svg>
              <div>
                <span className="text-xl font-bold text-decimal-navy block leading-tight">decimal</span>
                <span className="text-sm font-medium text-decimal-purple leading-tight">health</span>
              </div>
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

          {/* Who We Help */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">Who We Help</h4>
            <ul className="space-y-2">
              {footerLinks.whoWeHelp.map((link) => (
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

          {/* Services */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
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

          {/* Insights + Impact */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">Insights + Impact</h4>
            <ul className="space-y-2">
              {footerLinks.insightsImpact.map((link) => (
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

          {/* Community Connect */}
          <div>
            <h4 className="font-semibold text-decimal-navy text-sm mb-3">Community Connect</h4>
            <ul className="space-y-2">
              {footerLinks.communityConnect.map((link) => (
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
