'use client'

import { useEffect, useState } from 'react'

export default function Countdown() {
  const [time, setTime] = useState('24:00:00')

  useEffect(() => {
    const getEndTime = () => {
      const key = 'sli_discount_end'
      const existing = localStorage?.getItem(key)
      if (existing) {
        const t = Number(existing)
        if (!isNaN(t) && t > Date.now()) return t
      }
      const end = Date.now() + 24 * 3600 * 1000
      localStorage?.setItem(key, String(end))
      return end
    }

    let endTime = getEndTime()

    const updateCountdown = () => {
      const now = Date.now()
      if (now >= endTime) {
        endTime = Date.now() + 24 * 3600 * 1000
        localStorage?.setItem('sli_discount_end', String(endTime))
      }
      const remaining = Math.max(0, endTime - now)
      const h = Math.floor(remaining / 3600000)
      const m = Math.floor((remaining % 3600000) / 60000)
      const s = Math.floor((remaining % 60000) / 1000)

      const pad = (n: number) => String(n).padStart(2, '0')
      setTime(`${pad(h)}:${pad(m)}:${pad(s)}`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span className="font-mono tabular-nums tracking-wider">{time}</span>
}
