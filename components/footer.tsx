'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border pt-14 text-sm text-muted-foreground" style={{
      background: 'linear-gradient(180deg, var(--surface-alt), var(--deep))'
    }}>
      <div className="section-shell grid grid-cols-2 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        {/* Brand Column */}
        <div className="space-y-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid shrink-0 place-items-center overflow-hidden rounded-xl" style={{
              width: '48px',
              height: '48px',
              background: 'oklch(0.14 0.025 260)',
              overflow: 'hidden'
            }}>
              <Image src="/assets/logo.jpg" alt="Ifemade Kunat Consults logo" width={48} height={48} className="object-contain" style={{ mixBlendMode: 'multiply' }} />
            </span>
            <div>
              <p className="text-base font-extrabold text-white">The Soft Life Investor</p>
              <p className="text-xs text-accent uppercase tracking-[0.18em]">by Ifemade Kunat</p>
            </div>
          </div>

          <p className="max-w-md leading-7">
            A practical, premium guide to building wealth without sacrificing your peace — written for the reader who wants money to support a softer, fuller life.
          </p>

          <a href="https://housetops.selar.com/softlifeinvestor" target="_blank" rel="noopener noreferrer" className="button-primary !min-h-[2.75rem] !px-5 text-sm justify-center">
            Get the book — ₦5,000
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Explore Column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Explore</p>
          <ul className="mt-4 space-y-2">
            <li><a href="#about" className="text-foreground/85 transition-colors hover:text-accent">About</a></li>
            <li><a href="#learn" className="text-foreground/85 transition-colors hover:text-accent">Inside</a></li>
            <li><a href="#testimonials" className="text-foreground/85 transition-colors hover:text-accent">Proof</a></li>
            <li><a href="#author" className="text-foreground/85 transition-colors hover:text-accent">Author</a></li>
            <li><a href="#faq" className="text-foreground/85 transition-colors hover:text-accent">FAQ</a></li>
          </ul>
        </div>

        {/* Connect Column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Connect</p>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-foreground/85 transition-colors hover:text-accent">Twitter</a></li>
            <li><a href="#" className="text-foreground/85 transition-colors hover:text-accent">Instagram</a></li>
            <li><a href="#" className="text-foreground/85 transition-colors hover:text-accent">LinkedIn</a></li>
            <li><a href="mailto:hello@example.com" className="text-foreground/85 transition-colors hover:text-accent">Email</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-border/60 py-6">
        <div className="section-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Soft Life Investor. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-muted-foreground transition hover:text-accent">Privacy Policy</a>
            <a href="#" className="text-muted-foreground transition hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
