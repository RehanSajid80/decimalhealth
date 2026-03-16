'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Swords,
  FileText,
  TrendingUp,
  Bell,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'

const navItems = [
  { href: '/ci', label: 'Command Center', icon: LayoutDashboard },
  { href: '/ci/competitors', label: 'Competitors', icon: Users },
  { href: '/ci/battlecards', label: 'Battlecards', icon: Swords },
  { href: '/ci/briefings', label: 'Weekly Briefing', icon: FileText },
  { href: '/ci/trends', label: 'Trend Analytics', icon: TrendingUp },
  { href: '/ci/alerts', label: 'Alert Center', icon: Bell },
]

export default function CILayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const basePath = '/decimalhealth'

  const isActive = (href: string) => {
    const full = basePath + href
    if (href === '/ci') return pathname === full
    return pathname?.startsWith(full)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-decimal-navy text-white transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/ci" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-decimal-teal rounded-lg flex items-center justify-center text-sm font-bold">
              D
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight">Decimal.Health</div>
              <div className="text-[10px] text-white/60 leading-tight">
                Competitive Intelligence
              </div>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-decimal-navy">
            {navItems.find((n) => isActive(n.href))?.label || 'CI Dashboard'}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
