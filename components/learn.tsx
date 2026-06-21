'use client'

import { BookOpen, Lightbulb, Zap, Heart, TrendingUp, Target } from 'lucide-react'

const lessons = [
  {
    icon: BookOpen,
    title: "Module 1: Wealth Foundations",
    description: "Understanding money mindsets, your financial starting point, and building a sustainable money culture."
  },
  {
    icon: Lightbulb,
    title: "Module 2: The Income Revolution",
    description: "Strategies to increase your income streams, negotiate better, and create multiple revenue sources."
  },
  {
    icon: Zap,
    title: "Module 3: Smart Money Systems",
    description: "Practical budgeting methods, automation strategies, and tracking systems that work."
  },
  {
    icon: Heart,
    title: "Module 4: Intentional Spending",
    description: "Aligning your spending with your values and learning to say no to what doesn't serve you."
  },
  {
    icon: TrendingUp,
    title: "Module 5: Investing Made Simple",
    description: "Demystifying investments, understanding your options, and starting your wealth-building journey."
  },
  {
    icon: Target,
    title: "Module 6: Long-Term Wealth",
    description: "Building generational wealth, protecting your assets, and creating lasting financial freedom."
  },
]

export default function Learn() {
  return (
    <section id="learn" className="relative overflow-hidden py-16 sm:py-20">
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src="/assets/testimonial-video-1.mp4" type="video/mp4" />
      </video>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom,rgba(7,10,22,0.88) 0%,rgba(7,10,22,0.96) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <div className="section-shell relative" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mx-auto">What you will learn</div>
          <h2 className="section-subtitle mt-5 text-balance">Inside This Book You&apos;ll Discover...</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, i) => {
            const Icon = lesson.icon
            return (
              <div key={i} className="premium-card rounded-2xl p-6 hover:border-accent/50 transition-colors">
                <div className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{
                  background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-green))'
                }}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-white leading-tight">{lesson.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">{lesson.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
