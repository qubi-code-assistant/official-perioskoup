'use client'

import { useState } from 'react'

export default function InlineWaitlistForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    // TODO: POST to API route
    console.log('Waitlist submission:', email)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 py-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-lime-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <span className="text-lime-400 font-medium">You&rsquo;re on the list! We&rsquo;ll be in touch soon.</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-xl mx-auto rounded-full border border-navy-700 bg-navy-950/50 p-1.5 sm:p-2"
    >
      <label htmlFor="cta-email" className="sr-only">
        Email address
      </label>
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-navy-500 ml-3 sm:ml-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
      <input
        id="cta-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="doctor@clinic.com"
        required
        className="flex-1 bg-transparent text-lime-50 placeholder:text-navy-500 outline-none text-sm sm:text-base px-2 sm:px-3 py-2 min-w-0"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 bg-lime-400 hover:bg-lime-300 text-navy-950 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm transition-colors disabled:opacity-60 flex items-center gap-2"
      >
        <span className="hidden sm:inline">{submitting ? 'Joining...' : 'Request Access'}</span>
        <span className="sm:hidden">{submitting ? '...' : 'Join'}</span>
        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  )
}
