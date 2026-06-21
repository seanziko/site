'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Countdown from './countdown'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Countdown Banner */}
      <div className="sticky top-0 z-50 shimmer-bg text-white">
        <div className="section-shell flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs font-semibold sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame h-4 w-4 text-yellow-300" aria-hidden="true">
              <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
            </svg>
            Launch offer:
          </span>
          <span>
            <span className="line-through opacity-70">₦10,000</span> <span className="text-yellow-300">₦5,000</span>
          </span>
          <span className="hidden sm:inline opacity-80">— ends in</span>
          <span className="sm:hidden opacity-80">ends in</span>
          <Countdown />
          <a href="https://housetops.selar.com/softlifeinvestor" target="_blank" rel="noopener noreferrer" className="ml-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-white/30 hover:bg-white/25 sm:text-xs">
            Claim 50% off
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-[36px] z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl sm:top-[40px]">
        <div className="section-shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 sm:flex sm:flex-wrap sm:justify-between">
          <a href="#hero" className="min-w-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid shrink-0 place-items-center overflow-hidden rounded-xl" style={{ width: '44px', height: '44px', background: 'oklch(0.14 0.025 260)', overflow: 'hidden' }}>
                <Image src="/assets/logo.jpg" alt="Ifemade Kunat Consults logo" width={44} height={44} className="object-contain" style={{ mixBlendMode: 'multiply' }} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold tracking-[0.18em] text-accent uppercase sm:text-xs">Ifemade Kunat</p>
                <p className="truncate text-xs font-semibold text-foreground/85">The Soft Life Investor</p>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#about" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">About</a>
            <a href="#learn" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">Inside</a>
            <a href="#testimonials" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">Proof</a>
            <a href="#author" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">Author</a>
            <a href="#faq" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">FAQ</a>
          </nav>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a href="https://housetops.selar.com/softlifeinvestor" target="_blank" rel="noopener noreferrer" className="hidden button-primary !min-h-[2.5rem] !px-4 text-sm sm:inline-flex">
              Get Your Copy
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition sm:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="section-shell pb-4 sm:hidden">
            <div className="premium-card space-y-2 p-3">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-muted">About</a>
              <a href="#learn" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-muted">Inside</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-muted">Proof</a>
              <a href="#author" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-muted">Author</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-muted">FAQ</a>
              <a href="https://housetops.selar.com/softlifeinvestor" target="_blank" rel="noopener noreferrer" className="button-primary mt-2 w-full justify-center">Get Your Copy Now</a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
