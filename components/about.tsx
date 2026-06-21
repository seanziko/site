'use client'

import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="alt-band py-16 sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <div className="relative mx-auto w-full max-w-sm order-2 lg:order-1">
          <Image
            src="/assets/soft-life-mock-1.png"
            alt="Angled mockup of The Soft Life Investor"
            width={300}
            height={400}
            className="shadow-book mx-auto w-full"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        <div className="space-y-5 order-1 lg:order-2">
          <div className="eyebrow">About the book</div>

          <h2 className="section-subtitle text-balance">Introducing The Soft Life Investor</h2>

          <div className="space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>You deserve a soft life. But a soft life is not built by wishing. It is built by becoming intentional with your money.</p>

            <p>For years, we have been told that the only way to become wealthy is to work harder, sacrifice more, chase more, and constantly stay busy.</p>

            <p>But what if building wealth does not have to cost you your peace?</p>

            <p>
              <strong className="font-semibold text-white">The Soft Life Investor</strong> is a practical guide for anyone who wants to build real wealth without the pressure, anxiety, and burnout that often comes with chasing money.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
