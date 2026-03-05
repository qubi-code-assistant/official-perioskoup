import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { compileMDX } from 'next-mdx-remote/rsc'
import { createMetadata } from '@/lib/metadata'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { articleSchema, faqPageSchema, breadcrumbSchema } from '@/lib/schema'
import { mdxComponents } from '@/components/MDXComponents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return createMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${slug}`,
  })
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const headingRegex = /^## (.+)$/gm
  const headings: { id: string; text: string }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    headings.push({ id, text })
  }
  return headings
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://perioskoup.com/blog/${slug}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex items-center gap-3">
      <span className="text-navy-300 text-sm">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="text-navy-300 hover:text-lime-400 transition-colors"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="text-navy-300 hover:text-lime-400 transition-colors"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        aria-label="Share via email"
        className="text-navy-300 hover:text-lime-400 transition-colors"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      </a>
    </div>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [],
      },
    },
  })

  const headings = extractHeadings(post.content)
  const related = getRelatedPosts(slug, post.frontmatter.category)
  const { frontmatter } = post

  const schemas: Record<string, unknown>[] = [
    articleSchema({
      title: frontmatter.title,
      description: frontmatter.description,
      datePublished: frontmatter.date,
      author: frontmatter.author,
      slug,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: frontmatter.title, url: `/blog/${slug}` },
    ]),
  ]

  if (frontmatter.faqs?.length) {
    schemas.push(faqPageSchema(frontmatter.faqs))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <article className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-navy-400">
              <li>
                <Link href="/" className="hover:text-lime-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-lime-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-navy-400 truncate max-w-[200px]">
                {frontmatter.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            {/* Main Content */}
            <div>
              {/* Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Link
                    href={`/blog?category=${frontmatter.category}`}
                    className="text-lime-400 text-xs uppercase tracking-widest hover:text-lime-300 transition-colors"
                  >
                    {frontmatter.category}
                  </Link>
                  <span aria-hidden="true" className="text-navy-600 text-xs">&middot;</span>
                  <span className="text-navy-300 text-xs">{post.readingTime}</span>
                </div>

                <h1 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-lime-50 mb-8">
                  {frontmatter.title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={frontmatter.authorImage}
                      alt={frontmatter.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <a
                        href={frontmatter.authorLinkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-50 text-sm hover:text-lime-400 transition-colors"
                      >
                        {frontmatter.author}
                      </a>
                      <p className="text-navy-300 text-xs">
                        {frontmatter.authorRole} &middot;{' '}
                        {new Date(frontmatter.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <ShareButtons title={frontmatter.title} slug={slug} />
                </div>
              </header>

              {/* Article Body */}
              <div className="prose prose-invert prose-lime max-w-none prose-headings:font-heading prose-headings:text-lime-50 prose-h2:text-[clamp(2rem,3.5vw,3rem)] prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-[clamp(1.5rem,2.5vw,2.2rem)] prose-h3:mt-8 prose-h3:mb-4 prose-p:text-navy-300 prose-p:leading-relaxed prose-li:text-navy-300 prose-strong:text-lime-50 prose-a:text-lime-400 prose-a:no-underline hover:prose-a:text-lime-300 prose-blockquote:border-lime-400 prose-blockquote:text-navy-300">
                {content}
              </div>

              {/* FAQ Section */}
              {frontmatter.faqs?.length > 0 && (
                <section className="mt-16 pt-12 border-t border-white/5">
                  <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] text-lime-50 mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-8">
                    {frontmatter.faqs.map((faq, i) => (
                      <div key={i}>
                        <h3 className="text-lime-50 text-lg mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-navy-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Card */}
              <section className="mt-16 pt-12 border-t border-white/5">
                <div className="flex items-start gap-6 bg-navy-800 border border-white/5 rounded-[2rem] p-8">
                  <Image
                    src={frontmatter.authorImage}
                    alt={frontmatter.author}
                    width={80}
                    height={80}
                    className="rounded-full shrink-0"
                  />
                  <div>
                    <p className="text-lime-50 text-lg mb-1">
                      {frontmatter.author}
                    </p>
                    <p className="text-navy-300 text-sm mb-3">
                      {frontmatter.authorRole} at Perioskoup
                    </p>
                    <p className="text-navy-300 text-sm leading-relaxed mb-4">
                      {frontmatter.author === 'Dr. Anca Constantin'
                        ? 'Periodontist and CEO of Perioskoup. Winner of the EFP Digital Innovation Award 2025. Passionate about transforming how dental practices connect with patients between visits.'
                        : 'CGO and Technical Co-Founder of Perioskoup. Building the technology that helps dental practices strengthen patient engagement and build healthier habits.'}
                    </p>
                    <a
                      href={frontmatter.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 text-sm hover:text-lime-300 transition-colors"
                    >
                      Connect on LinkedIn &rarr;
                    </a>
                  </div>
                </div>
              </section>

              {/* Share bottom */}
              <section className="mt-12 flex items-center justify-between">
                <ShareButtons title={frontmatter.title} slug={slug} />
                <Link
                  href="/blog"
                  className="text-lime-400 text-sm hover:text-lime-300 transition-colors"
                >
                  &larr; Back to Blog
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div>
                    <p className="text-lime-400 text-xs uppercase tracking-widest mb-4">
                      On this page
                    </p>
                    <nav aria-label="Table of contents">
                      <ul className="space-y-2">
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className="text-navy-300 text-sm hover:text-lime-400 transition-colors block leading-snug"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Related Posts */}
                {related.length > 0 && (
                  <div>
                    <p className="text-lime-400 text-xs uppercase tracking-widest mb-4">
                      Related Posts
                    </p>
                    <div className="space-y-4">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/blog/${r.slug}`}
                          className="block group"
                        >
                          <p className="text-lime-50 text-sm group-hover:text-lime-400 transition-colors leading-snug mb-1">
                            {r.frontmatter.title}
                          </p>
                          <p className="text-navy-300 text-xs">
                            {r.readingTime}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-navy-800 border border-white/5 rounded-[2rem] p-8">
                  <p className="text-lime-50 text-sm mb-2">
                    Ready to transform your practice?
                  </p>
                  <p className="text-navy-300 text-xs mb-4 leading-relaxed">
                    Join 30+ clinics on the waitlist for early access.
                  </p>
                  <Link
                    href="/waitlist"
                    className="block text-center bg-lime-400 text-navy-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-lime-300 transition-colors"
                  >
                    Join Waitlist
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
