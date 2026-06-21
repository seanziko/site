import Image from 'next/image'
import Link from 'next/link'
import coverSrc from '../assets/soft-life-mock-2.png'
import logoSrc from '../assets/logo.jpg'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="py-3">
        <div className="section-shell flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={logoSrc} alt="logo" width={44} height={44} />
            <div className="text-xs font-bold uppercase text-accent">The Soft Life Investor</div>
          </div>
          <Link href="#buy"><a className="button-primary">Get the Book</a></Link>
        </div>
      </header>

      <section id="hero" className="hero-wash relative overflow-hidden py-20">
        <div className="section-shell grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">New Release — By Ifemade Kunat</div>
            <h1 className="section-title text-balance mt-6">Discover The <span className="text-accent">Soft Life Investor</span> Blueprint</h1>
            <p className="mt-4 max-w-md text-muted-foreground">Practical wealth-building principles, mindset strategies, and proven systems that create financial confidence — without killing your vibe.</p>
            <div className="mt-6 flex gap-4">
              <a href="https://housetops.selar.com/softlifeinvestor" className="button-primary">Get Your Copy — ₦5,000</a>
              <button className="border rounded-full px-5 py-3">Watch Stories</button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <button className="hero-book-trigger" aria-label="View 3D book" onClick={() => {
              const el = document.getElementById('book-3d-modal')
              if (el) { el.style.display = 'flex' }
            }}>
              <Image src={coverSrc} alt="book cover" width={320} height={480} className="shadow-book" />
            </button>
          </div>
        </div>
      </section>

      {/* 3D modal placeholder (rendered by app.js script) */}
      <div id="book-3d-modal" style={{display: 'none'}} className="fixed inset-0 z-50 items-center justify-center bg-black/80">
        <button id="close-book-3d-modal" aria-label="Close" onClick={() => { document.getElementById('book-3d-modal').style.display = 'none' }} className="absolute top-4 right-4">✕</button>
        <div id="modal-book-viewer" style={{width: '90vw', height: '90vh', maxWidth: 900, maxHeight: 800}}></div>
      </div>
    </main>
  )
}
