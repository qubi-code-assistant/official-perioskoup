import type { Metadata } from 'next'

const SITE_URL = 'https://perioskoup.com'
const SITE_NAME = 'Perioskoup'
const DEFAULT_DESCRIPTION =
  'AI dental companion that helps dentists build stronger patient engagement and healthier habits between visits.'

export function createMetadata(options: {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const title =
    options.title === 'Home'
      ? `${SITE_NAME} — AI Dental Companion`
      : `${options.title} | ${SITE_NAME}`
  const description = options.description ?? DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${options.path ?? ''}`
  const image = options.image ?? `${SITE_URL}/og-default.jpg`

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        'en-GB': url,
        en: url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@perioskoup',
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    ...(options.noIndex && { robots: { index: false, follow: false } }),
  }
}
