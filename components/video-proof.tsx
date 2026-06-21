'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const videos = [
  '/assets/testimonial-video-1.mp4',
  '/assets/testimonial-video-2.mp4',
  '/assets/testimonial-video-3.mp4',
]

export default function VideoProof() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleScroll = () => {
      const center = scroller.scrollLeft + scroller.clientWidth / 2
      let best = 0
      let bestDist = Infinity

      Array.from(scroller.children).forEach((child, i) => {
        const c = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2
        const d = Math.abs(c - center)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })

      if (best !== activeIndex) {
        setActiveIndex(best)
        videoRefs.current.forEach((video, i) => {
          if (i === best) {
            video?.play().catch(() => {})
          } else {
            video?.pause()
          }
        })
      }
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  const scrollToIndex = (i: number) => {
    if (!scrollerRef.current) return
    const children = Array.from(scrollerRef.current.children)
    const child = children[i] as HTMLElement
    if (!child) return

    const target = child.offsetLeft - (scrollerRef.current.clientWidth - child.offsetWidth) / 2
    scrollerRef.current.scrollTo({ left: target, behavior: 'smooth' })
  }

  return (
    <section id="video-proof" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mx-auto">
            <Play className="h-3.5 w-3.5" />
            Video Proof
          </div>
          <h2 className="section-subtitle mt-5 text-balance">Real People, Real Results</h2>
        </div>

        <div className="mt-12 relative">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {videos.map((video, i) => (
              <div key={i} className="w-full shrink-0 snap-center sm:w-1/2 lg:w-1/3">
                <div className="mx-auto overflow-hidden rounded-2xl bg-black/50 aspect-video">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el
                    }}
                    src={video}
                    controls
                    className="w-full h-full object-cover"
                    style={{
                      opacity: i === activeIndex ? 1 : 0.7,
                      transition: 'opacity 0.3s',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              aria-label="Previous video"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to video ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-foreground/30'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(videos.length - 1, activeIndex + 1))}
              aria-label="Next video"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
