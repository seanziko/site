'use client'

import { useEffect, useState } from 'react'
import { Heart, Zap, TrendingUp, Lightbulb } from 'lucide-react'

const StatCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.25 })

    if (elementRef) observer.observe(elementRef)
    return () => observer.disconnect()
  }, [elementRef])

  useEffect(() => {
    if (!isVisible) return

    const start = Date.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.floor(eased * target)
      setCount(value)

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isVisible, target])

  return (
    <div ref={setElementRef} className="stat-counter text-5xl font-extrabold text-white" style={{ fontSize: '2.5rem' }}>
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function ByTheNumbers() {
  return (
    <section id="by-the-numbers" className="alt-band py-14 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            By the numbers
          </div>
          <h2 className="section-subtitle mt-5 text-balance">A Movement of Soft Life Investors</h2>
        </div>

        <div className="mt-10 mx-auto max-w-2xl overflow-hidden rounded-2xl" style={{
          border: '1px solid color-mix(in oklab, var(--brand-blue) 25%, var(--border))',
          background: 'linear-gradient(160deg, color-mix(in oklab, var(--brand-blue) 8%, var(--card)) 0%, var(--card) 60%)',
          boxShadow: '0 30px 70px -42px color-mix(in oklab, var(--brand-blue) 50%, transparent)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* Stat 1 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.25rem',
              textAlign: 'center',
              borderRight: '1px solid color-mix(in oklab, var(--brand-blue) 20%, var(--border))',
              borderBottom: '1px solid color-mix(in oklab, var(--brand-blue) 20%, var(--border))',
            }}>
              <div style={{
                marginBottom: '1rem',
                display: 'grid',
                placeItems: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg,var(--brand-blue),var(--brand-green))',
                color: 'white',
              }}>
                <Heart className="h-5 w-5" />
              </div>
              <StatCounter target={5000} suffix="+" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                Happy Readers
              </p>
            </div>

            {/* Stat 2 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.25rem',
              textAlign: 'center',
              borderBottom: '1px solid color-mix(in oklab, var(--brand-blue) 20%, var(--border))',
            }}>
              <div style={{
                marginBottom: '1rem',
                display: 'grid',
                placeItems: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg,var(--brand-blue),var(--brand-green))',
                color: 'white',
              }}>
                <TrendingUp className="h-5 w-5" />
              </div>
              <StatCounter target={10000000} suffix="+" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                Naira Invested
              </p>
            </div>

            {/* Stat 3 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.25rem',
              textAlign: 'center',
              borderRight: '1px solid color-mix(in oklab, var(--brand-blue) 20%, var(--border))',
            }}>
              <div style={{
                marginBottom: '1rem',
                display: 'grid',
                placeItems: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg,var(--brand-blue),var(--brand-green))',
                color: 'white',
              }}>
                <Zap className="h-5 w-5" />
              </div>
              <StatCounter target={173} suffix=" pages" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                Of Practical Wealth Guidance
              </p>
            </div>

            {/* Stat 4 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.25rem',
              textAlign: 'center',
            }}>
              <div style={{
                marginBottom: '1rem',
                display: 'grid',
                placeItems: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg,var(--brand-blue),var(--brand-green))',
                color: 'white',
              }}>
                <Lightbulb className="h-5 w-5" />
              </div>
              <StatCounter target={6} suffix=" modules" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                To Master Your Money
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
