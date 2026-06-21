'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonialData = [
  {
    quote: "We used to range 250–300k in monthly sales before then. I just did account and realised we did 606k in sales this July.",
    name: "Ope Bello",
    outcome: "Business owner who crossed a major monthly revenue goal"
  },
  {
    quote: "Truly grateful for your help in my financial growth and development over the years.",
    name: "OluwaPelumi Bamijoko",
    outcome: "Long-term mentee sharing gratitude"
  },
  {
    quote: "What I initially thought will be a simple 30 page guide has turned into a 173 pages detailed guide. Thank you for helping me think big.",
    name: "Onose",
    outcome: "Author who grew a small idea into a fully published book"
  },
  {
    quote: "Special thanks to Ifemade Kunat for coaching me at the beginning stages of my book project.",
    name: "Onose",
    outcome: "Published author acknowledgement"
  },
  {
    quote: "I've been following all the budgeting principles you taught and I'm now debt free finally! I had $13,000 debt from schooling — now it's paid off!",
    name: "Fenose Osedeme",
    outcome: "Cleared $13,000 of school debt"
  },
  {
    quote: "In this quarter, I bought 2 lands, started my mutual funds & another investment. Thank you, Ife.",
    name: "Sandra GLA",
    outcome: "Bought 2 lands and started investing"
  },
  {
    quote: "The clarity I got from your teachings completely changed how I see and handle money.",
    name: "Verified reader",
    outcome: "Renewed money mindset and clarity"
  },
  {
    quote: "Practical, encouraging, and easy to apply. I started seeing results almost immediately.",
    name: "Verified reader",
    outcome: "Immediate, practical money wins"
  }
]

const testimonialImages = [
  '/assets/testimonial-1.jpg',
  '/assets/testimonial-2.jpg',
  '/assets/testimonial-3.jpg',
  '/assets/testimonial-4.jpg',
  '/assets/testimonial-5.jpg',
  '/assets/testimonial-6.jpg',
  '/assets/testimonial-7.jpg',
  '/assets/testimonial-8.jpg',
]

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveSlide = () => {
    if (!scrollerRef.current) return

    const center = scrollerRef.current.scrollLeft + scrollerRef.current.clientWidth / 2
    let best = 0
    let bestDist = Infinity

    Array.from(scrollerRef.current.children).forEach((child, i) => {
      const c = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2
      const d = Math.abs(c - center)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })

    if (best !== activeIndex) {
      setActiveIndex(best)
    }
  }

  const scrollToIndex = (i: number) => {
    if (!scrollerRef.current) return
    const children = Array.from(scrollerRef.current.children)
    const child = children[i] as HTMLElement
    if (!child) return

    const target = child.offsetLeft - (scrollerRef.current.clientWidth - child.offsetWidth) / 2
    scrollerRef.current.scrollTo({ left: target, behavior: 'smooth' })
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    scroller.addEventListener('scroll', updateActiveSlide, { passive: true })
    return () => scroller.removeEventListener('scroll', updateActiveSlide)
  }, [activeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonialData.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    scrollToIndex(activeIndex)
  }, [activeIndex])

  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Social Proof
          </div>
          <h2 className="section-subtitle mt-5 text-balance">Trusted by Thousands</h2>
        </div>

        <div className="mt-12">
          {/* Images Carousel */}
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {testimonialImages.map((img, i) => (
              <div key={i} className="w-32 h-32 shrink-0 snap-center sm:w-40 sm:h-40">
                <button
                  className="relative w-full h-full rounded-xl overflow-hidden group"
                  aria-label={`View testimonial from ${testimonialData[i]?.name || 'user'}`}
                >
                  <Image
                    src={img}
                    alt={`Testimonial from ${testimonialData[i]?.name || 'user'}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonialData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-foreground/30'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(testimonialData.length - 1, activeIndex + 1))}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Quote Section */}
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <p className="text-base font-medium leading-7 text-foreground sm:text-lg">
              &quot;{testimonialData[activeIndex]?.quote}&quot;
            </p>
            <p className="mt-3 text-sm font-semibold text-foreground">{testimonialData[activeIndex]?.name}</p>
            <p className="text-xs text-muted-foreground">{testimonialData[activeIndex]?.outcome}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
