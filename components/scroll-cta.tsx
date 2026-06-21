'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function ScrollCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return

      const doc = document.documentElement
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1)

      if (scrolled > 0.25) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className={`pointer-events-none fixed left-1/2 z-40 w-[min(94vw,460px)] -translate-x-1/2 opacity-0 translate-y-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : ''
      }`}
      style={{
        bottom: `calc(env(safe-area-inset-bottom, 0px) + 92px)`,
      }}
    >
      <div className="relative rounded-2xl border border-border bg-card/95 p-3 pl-4 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setDismissed(true)}
          type="button"
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-card text-foreground/80 ring-1 ring-border hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-foreground">Save ₦5,000 today</p>
            <p className="truncate text-xs text-muted-foreground">Launch offer — grab your copy before it ends.</p>
          </div>
          <a
            href="https://housetops.selar.com/softlifeinvestor"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary !min-h-[2.25rem] !px-3 !py-2 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
          >
            Claim
          </a>
        </div>
      </div>
    </div>
  )
}
