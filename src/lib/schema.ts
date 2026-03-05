const SITE_URL = 'https://perioskoup.com'

export function medicalOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Perioskoup',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-brand.svg`,
    description:
      'AI-powered dental companion that helps dentists build stronger patient engagement between visits.',
    foundingDate: '2024',
    sameAs: [
      'https://linkedin.com/company/perioskoup',
      'https://instagram.com/perioskoup',
      'https://x.com/perioskoup',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
    },
  }
}

export function physicianSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Anca Laura Constantin',
    jobTitle: 'Periodontist & CEO',
    worksFor: {
      '@type': 'MedicalOrganization',
      name: 'Perioskoup',
    },
    url: `${SITE_URL}/about`,
    sameAs: ['https://linkedin.com/in/anca-constantin-99800633b/'],
    award: 'EFP Digital Innovation Award Winner 2025',
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Perioskoup',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    description:
      'AI dental companion that helps patients build healthy oral care habits between dental visits.',
    offers: {
      '@type': 'Offer',
      price: '49',
      priceCurrency: 'EUR',
      description: 'Starting price per month',
    },
    author: {
      '@type': 'Organization',
      name: 'Perioskoup',
    },
  }
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function articleSchema(article: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Perioskoup',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-brand.svg`,
      },
    },
    image: article.image ?? `${SITE_URL}/og-default.jpg`,
    url: `${SITE_URL}/blog/${article.slug}`,
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}
