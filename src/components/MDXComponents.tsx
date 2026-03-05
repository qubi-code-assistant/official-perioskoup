import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image from 'next/image'

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  img: ({ src, alt, ...props }) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="rounded-xl my-8"
        {...props}
      />
    )
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-lime-400 pl-6 my-8 italic text-navy-200"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="text-left px-4 py-3 border-b border-navy-700 text-lime-400 text-xs uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 border-b border-navy-800 text-navy-200" {...props}>
      {children}
    </td>
  ),
}
