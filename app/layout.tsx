import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Soft Life Investor — Discover The Soft Life Investor Blueprint",
  description: "A premium personal finance book by Ifemade Kunat that helps you build wealth, peace, and financial freedom through practical, sustainable money systems.",
  keywords: "personal finance book, women and money, wealth building, investing for beginners, financial freedom book",
  authors: [{ name: "Ifemade Kunat" }],
  openGraph: {
    title: "The Soft Life Investor — Discover The Soft Life Investor Blueprint",
    description: "A premium personal finance book by Ifemade Kunat that helps you build wealth, peace, and financial freedom through practical, sustainable money systems.",
    url: "/",
    images: [{ url: "assets/soft-life-mock-2.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Soft Life Investor — Discover The Soft Life Investor Blueprint",
    description: "A premium personal finance book by Ifemade Kunat that helps you build wealth, peace, and financial freedom through practical, sustainable money systems.",
    images: ["assets/soft-life-mock-2.png"],
  },
  canonical: "/",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1020",
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              name: "The Soft Life Investor",
              author: {
                "@type": "Person",
                name: "Ifemade Kunat",
              },
              description: "A practical guide to building wealth without sacrificing your peace",
              image: "/assets/soft-life-mock-2.png",
              offers: {
                "@type": "Offer",
                price: "5000",
                priceCurrency: "NGN",
              },
            }),
          }}
        />
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script async src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
      </head>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
