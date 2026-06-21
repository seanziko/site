'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Wallet, CircleDollarSign, AlertCircle, Brain, Target, Zap } from 'lucide-react'

const problems = [
  {
    icon: Wallet,
    title: "You earn money but still feel behind",
    description: "Income is coming in, but it still feels like peace and progress are slipping through your fingers."
  },
  {
    icon: CircleDollarSign,
    title: "You want financial freedom but don't know where to start",
    description: "The advice online is noisy, conflicting, and exhausting to sort through on your own."
  },
  {
    icon: AlertCircle,
    title: "You're tired of paycheck-to-paycheck living",
    description: "Building wealth feels impossible when everything you earn is already spoken for."
  },
  {
    icon: Brain,
    title: "Money stress is weighing on you",
    description: "The guilt, shame, and anxiety around finances is affecting your peace and relationships."
  },
  {
    icon: Target,
    title: "You want to invest but don't have a clear strategy",
    description: "Without a roadmap, investing feels risky and complicated for someone just starting out."
  },
  {
    icon: Zap,
    title: "You're ready for a different approach",
    description: "Traditional money advice doesn't align with your values of sustainability and peace."
  },
]

export default function ProblemCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const goTo = (index: number) => {
    if (!scrollerRef.current) return
    const slides = Array.from(scrollerRef.current.children)
    const normalizedIndex = (index + slides.length) % slides.length
    setCurrent(normalizedIndex)

    const slide = slides[normalizedIndex] as HTMLElement
    const targetX = slide.offsetLeft - (scrollerRef.current.clientWidth - slide.offsetWidth) / 2
    scrollerRef.current.scrollTo({ left: targetX, behavior: 'smooth' })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % problems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!scrollerRef.current) return
    const slides = Array.from(scrollerRef.current.children)
    const slide = slides[current] as HTMLElement
    const targetX = slide.offsetLeft - (scrollerRef.current.clientWidth - slide.offsetWidth) / 2
    scrollerRef.current.scrollTo({ left: targetX, behavior: 'smooth' })
  }, [current])

  return (
    <section className="alt-band py-16 sm:py-20">
      <div className="section-shell">
        <div id="problem-carousel" className="mt-10 relative">
          {/* Slides */}
          <div
            id="problem-scroller"
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {problems.map((problem, i) => {
              const Icon = problem.icon
              return (
                <div key={i} className="w-full shrink-0 snap-center px-1">
                  <article className="premium-card h-full p-5 sm:p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{
                      background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-green))'
                    }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold leading-tight text-white">{problem.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{problem.description}</p>
                  </article>
                </div>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              id="problem-prev"
              onClick={() => goTo(current - 1)}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div id="problem-dots" className="flex items-center gap-2">
              {problems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-accent' : 'w-2 bg-foreground/30'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              id="problem-next"
              onClick={() => goTo(current + 1)}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold text-accent">
          You are not alone. And it doesn&apos;t have to stay this way.
        </p>
      </div>
    </section>
  )
}
