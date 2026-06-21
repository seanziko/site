'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "What format is the book?",
    a: "The Soft Life Investor is available as a physical book and digital PDF. You can purchase it directly through our partner platform and have it delivered to you."
  },
  {
    q: "Is this book just for Nigerians?",
    a: "While the book uses Nigerian currency examples and speaks to the Nigerian context, the principles of wealth-building, budgeting, and investing are universal. Anyone can benefit from the lessons regardless of their location."
  },
  {
    q: "Do I need to have investment experience?",
    a: "No! This book is designed for complete beginners. It starts with foundational money principles and gradually builds up to more advanced concepts. No prior experience needed."
  },
  {
    q: "Can I get a refund if I don't like the book?",
    a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the book, you can request a full refund within 30 days of purchase."
  },
  {
    q: "Is there any bonus content or community?",
    a: "Yes! Purchasers get access to exclusive bonus materials, templates, worksheets, and a private community of Soft Life Investors where you can share your journey and ask questions."
  },
  {
    q: "How long is the book?",
    a: "The Soft Life Investor is 173 pages of practical, actionable content. It's designed to be a comprehensive guide that you'll want to reference again and again."
  },
]

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left"
    >
      <div className="premium-card rounded-lg p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-white text-base sm:text-lg leading-tight">{item.q}</h3>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-accent transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {isOpen && (
          <p className="mt-4 text-sm text-muted-foreground leading-6">
            {item.a}
          </p>
        )}
      </div>
    </button>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="alt-band py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <div className="eyebrow mx-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
              </svg>
              Questions
            </div>
            <h2 className="section-subtitle mt-5 text-balance">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                item={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
