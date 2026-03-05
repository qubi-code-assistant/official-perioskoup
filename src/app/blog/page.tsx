import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createMetadata } from '@/lib/metadata'
import { getAllPosts, getAllCategories, type BlogCategory } from '@/lib/blog'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description:
    'Insights on dental patient engagement, AI in dentistry, and building healthier oral care habits. Written by the Perioskoup team.',
  path: '/blog',
})

const POSTS_PER_PAGE = 9

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const activeCategory = params.category as BlogCategory | undefined

  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.frontmatter.category === activeCategory)
    : allPosts

  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10))
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
            ])
          ),
        }}
      />

      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-tight text-lime-50">
            Blog
          </h1>
          <p className="mt-4 text-navy-400 text-lg max-w-2xl">
            Insights on patient engagement, AI in dentistry, and building healthier
            habits between visits.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 md:px-12 lg:px-20 pb-12">
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-3">
          <Link
            href="/blog"
            className={`px-5 py-2 rounded-xl text-sm transition-colors ${
              !activeCategory
                ? 'bg-lime-400 text-navy-950'
                : 'bg-navy-800 text-navy-300 hover:text-lime-50 border border-white/5'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`px-5 py-2 rounded-xl text-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-lime-400 text-navy-950'
                  : 'bg-navy-800 text-navy-300 hover:text-lime-50 border border-white/5'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24 md:pb-40">
        <div className="max-w-[1200px] mx-auto">
          {paginatedPosts.length === 0 ? (
            <p className="text-navy-400 text-center py-16">
              No posts found in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-navy-800 border border-white/5 rounded-[2rem] p-8 hover:border-lime-400/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-lime-400 text-xs uppercase tracking-widest">
                      {post.frontmatter.category}
                    </span>
                    <span aria-hidden="true" className="text-navy-600 text-xs">&middot;</span>
                    <span className="text-navy-300 text-xs">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] text-lime-50 mb-3 leading-tight group-hover:text-lime-400 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-navy-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.frontmatter.authorImage}
                      alt={post.frontmatter.author}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-lime-50 text-xs">
                        {post.frontmatter.author}
                      </p>
                      <p className="text-navy-300 text-xs">
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          'en-GB',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-16">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  const params = new URLSearchParams()
                  if (activeCategory) params.set('category', activeCategory)
                  if (page > 1) params.set('page', String(page))
                  const href = `/blog${params.toString() ? `?${params}` : ''}`

                  return (
                    <Link
                      key={page}
                      href={href}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-colors ${
                        page === currentPage
                          ? 'bg-lime-400 text-navy-950'
                          : 'bg-navy-800 text-navy-300 hover:text-lime-50 border border-white/5'
                      }`}
                    >
                      {page}
                    </Link>
                  )
                }
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
