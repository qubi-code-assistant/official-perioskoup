import type { Metadata } from 'next'
import { dongle, gabarito } from '@/lib/fonts'
import { createMetadata } from '@/lib/metadata'
import { medicalOrganizationSchema, physicianSchema, softwareApplicationSchema } from '@/lib/schema'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = createMetadata({
  title: 'Home',
  path: '/',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={`${dongle.variable} ${gabarito.variable}`}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Perioskoup Blog"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              medicalOrganizationSchema(),
              physicianSchema(),
              softwareApplicationSchema(),
            ]),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
