'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Author() {
  return (
    <section id="author" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/assets/author.jpg"
              alt="Ifemade Kunat"
              width={300}
              height={400}
              className="shadow-book mx-auto w-full rounded-2xl"
            />
          </div>

          <div className="space-y-5">
            <div className="eyebrow">Meet the Author</div>

            <h2 className="section-subtitle text-balance">Ifemade Kunat</h2>

            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Ifemade Kunat is a personal finance educator, business coach, and bestselling author dedicated to helping people build wealth without sacrificing their peace.
            </p>

            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              With over a decade of experience in financial coaching and business mentorship, she has helped thousands of entrepreneurs and professionals create sustainable money systems that align with their values.
            </p>

            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              <strong className="font-semibold text-white">The Soft Life Investor</strong> represents her mission: to democratize wealth-building and prove that financial freedom doesn&apos;t require hustle culture, burnout, or sacrificing your joy.
            </p>

            <a href="https://housetops.selar.com/softlifeinvestor" target="_blank" rel="noopener noreferrer" className="inline-flex button-primary !min-h-[2.75rem] !px-6 text-sm">
              Get The Book
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
