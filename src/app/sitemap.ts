import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const SITE_URL = 'https://perioskoup.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const staticPages = [
    { url: SITE_URL, priority: 1, changeFrequency: 'weekly' as const },
    { url: `${SITE_URL}/features`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/for-dentists`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/pricing`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${SITE_URL}/contact`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${SITE_URL}/waitlist`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }))

  return [...staticPages, ...blogEntries]
}
