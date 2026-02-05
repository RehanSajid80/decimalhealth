'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const navigation = [
  {
    name: 'Our Clients',
    href: '#who-we-help',
    children: [
      { name: 'Pharma & Life Sciences', href: '#life-sciences' },
      { name: 'Health Systems', href: '#health-systems' },
      { name: 'Health Tech & Med Innovators', href: '#health-tech' },
    ],
  },
  {
    name: 'What We Offer',
    href: '#services',
    children: [
      { name: 'Advisory Services', href: '#advisory' },
      { name: 'Partnering Services', href: '#partnering' },
      { name: 'Regulatory Strategy', href: '#regulatory' },
      { name: 'Market Adoption', href: '#market-adoption' },
      { name: 'Ecosystem Solutions', href: '#ecosystem' },
    ],
  },
  {
    name: 'Insights',
    href: '#insights',
    children: [
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Blog', href: '#blog' },
      { name: 'White Papers', href: '#white-papers' },
    ],
  },
  {
    name: 'About Us',
    href: '#about',
    children: [
      { name: 'Leadership', href: '#leadership' },
      { name: 'The Decimal Ecosystem', href: '#ecosystem' },
      { name: 'Careers', href: '#careers' },
      { name: 'Events', href: '#events' },
    ],
  },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-white py-4'
      }`}
    >
      <nav className="container-lg flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/decimalhealth/logo.png"
            alt="Decimal Health"
            className="h-14 md:h-16 lg:h-[4.5rem] w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="nav-link flex items-center gap-1 py-2"
              >
                {item.name}
                {item.children && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-decimal-cream-dark p-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 rounded-lg text-sm text-decimal-navy hover:bg-decimal-cream hover:text-decimal-purple transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link href="#contact" className="btn-primary text-sm">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-decimal-navy" />
          ) : (
            <Menu className="w-6 h-6 text-decimal-navy" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-decimal-cream-dark"
          >
            <div className="container-lg py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-medium text-decimal-navy"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-1.5 text-sm text-decimal-navy/70"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="#contact"
                className="btn-primary w-full text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
