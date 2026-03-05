import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="titanium-card group p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold">
                {post.frontmatter.category}
              </span>
              <span aria-hidden="true" className="text-navy-600 text-xs">&middot;</span>
              <span className="text-navy-400 text-xs">{post.readingTime}</span>
            </div>
            <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 leading-tight mb-3 group-hover:text-lime-400 transition-colors">
              {post.frontmatter.title}
            </h3>
            <p className="text-navy-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {post.frontmatter.description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <Image
                src={post.frontmatter.authorImage}
                alt={post.frontmatter.author}
                width={24}
                height={24}
                className="rounded-full"
              />
              <p className="text-navy-500 text-xs">
                {new Date(post.frontmatter.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <svg aria-hidden="true" className="w-5 h-5 text-lime-50 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  )
}
