'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import Hero from '@/components/hero'
import ByTheNumbers from '@/components/by-the-numbers'
import ProblemCarousel from '@/components/problem-carousel'
import About from '@/components/about'
import Learn from '@/components/learn'
import VideoProof from '@/components/video-proof'
import Testimonials from '@/components/testimonials'
import Author from '@/components/author'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import ScrollCta from '@/components/scroll-cta'
import BackToTop from '@/components/back-to-top'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ByTheNumbers />
        <ProblemCarousel />
        <About />
        <Learn />
        <VideoProof />
        <Testimonials />
        <Author />
        <FAQ />
      </main>
      <Footer />
      <ScrollCta />
      <BackToTop />
    </div>
  )
}
