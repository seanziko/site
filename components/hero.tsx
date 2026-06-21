'use client'

import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="hero-wash relative overflow-hidden py-10 sm:py-16 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Content */}
          <div className="space-y-6 animate-fade-up">
            {/* Label */}
            <div className="eyebrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
              </svg>
              New Release - By Ifemade Kunat
            </div>

            {/* Heading */}
            <h1 className="section-title text-balance leading-tight">
              Discover The <span className="text-accent">Soft Life Investor</span> Blueprint
            </h1>

            {/* Description */}
            <p className="max-w-md text-base leading-8 text-muted-foreground sm:text-lg">
              Practical wealth-building principles, mindset strategies, and proven systems that create financial confidence — without killing your vibe.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="https://housetops.selar.com/softlifeinvestor" target="_blank" rel="noopener noreferrer" className="button-primary justify-center rounded-full px-6 py-3 text-base font-bold uppercase tracking-wide sm:w-auto">
                Get Your Copy — ₦5,000
                <ArrowRight className="h-5 w-5" />
              </a>
              <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-base font-semibold text-foreground transition hover:bg-foreground/5 sm:w-auto">
                <Play className="h-5 w-5 fill-current" />
                Watch Stories
              </button>
            </div>
          </div>

          {/* Right Column: Book Image */}
          <div className="flex justify-center lg:justify-end">
            <button type="button" className="hero-book-trigger relative flex h-[280px] w-full max-w-sm items-center justify-center bg-transparent p-0 outline-none transition-opacity hover:opacity-90 sm:h-[380px]" aria-label="View 3D book">
              <div
                className="absolute inset-x-6 top-4 h-48 rounded-full opacity-60 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, color-mix(in oklab, var(--brand-blue) 55%, transparent), transparent 70%)',
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-12 bottom-4 h-28 rounded-full opacity-50 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, color-mix(in oklab, var(--brand-green) 50%, transparent), transparent 70%)',
                }}
                aria-hidden="true"
              />
              <Image
                src="/assets/soft-life-mock-2.png"
                alt="The Soft Life Investor book cover"
                width={300}
                height={400}
                priority
                className="shadow-book animate-float-book relative z-10 h-full w-auto object-contain drop-shadow-2xl"
              />
              <div
                className="animate-book-shadow absolute bottom-2 left-1/2 h-5 w-2/3 rounded-[50%] -translate-x-1/2"
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.65), transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
