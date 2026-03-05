import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8 hover:border-lime-400/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lime-400 text-xs uppercase tracking-widest">
              {post.frontmatter.category}
            </span>
            <span aria-hidden="true" className="text-navy-600 text-xs">&middot;</span>
            <span className="text-navy-300 text-xs">{post.readingTime}</span>
          </div>
          <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] text-lime-50 mb-3 leading-tight group-hover:text-lime-400 transition-colors">
            {post.frontmatter.title}
          </h3>
          <p className="text-navy-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.frontmatter.description}
          </p>
          <div className="flex items-center gap-3">
            <Image
              src={post.frontmatter.authorImage}
              alt={post.frontmatter.author}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-navy-300 text-xs">
              {new Date(post.frontmatter.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
