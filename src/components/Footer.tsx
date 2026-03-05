import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-navy-800/30 bg-[#050c10]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-white.svg"
              alt="Perioskoup"
              width={120}
              height={28}
            />
          </div>
          <p className="text-navy-500 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Perioskoup. Designed in Europe.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-navy-500 hover:text-lime-400 transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-navy-500 hover:text-lime-400 transition-colors text-sm">
              Terms
            </Link>
            <Link href="/contact" className="text-navy-500 hover:text-lime-400 transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
