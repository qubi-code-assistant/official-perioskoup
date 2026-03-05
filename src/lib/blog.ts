import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog')

export type BlogCategory = 'Clinical' | 'Product' | 'Industry'

export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  author: string
  authorRole: string
  authorImage: string
  authorLinkedin: string
  category: BlogCategory
  tags: string[]
  image?: string
  faqs: { question: string; answer: string }[]
}

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  content: string
  readingTime: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const stats = readingTime(content)

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      readingTime: stats.text,
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: stats.text,
  }
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category)
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.frontmatter.category === category)
    .slice(0, limit)
}

export function getAllCategories(): BlogCategory[] {
  return ['Clinical', 'Product', 'Industry']
}
