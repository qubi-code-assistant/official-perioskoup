'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    // TODO: POST to API route
    console.log('Contact submission:', data)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-lime-400/20 flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-8 h-8 text-lime-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-heading text-[2.5rem] text-lime-50 mb-2">
          Message Sent!
        </h3>
        <p className="text-navy-300">
          We&rsquo;ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm text-navy-300 mb-2">
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className="w-full bg-[#050c10] border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
            placeholder="Dr. Jane Smith"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm text-navy-300 mb-2">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className="w-full bg-[#050c10] border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
            placeholder="jane@dentalclinic.com"
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm text-navy-300 mb-2">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          {...register('subject', { required: 'Subject is required' })}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className="w-full bg-[#050c10] border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
          placeholder="Question about Perioskoup"
        />
        {errors.subject && (
          <p id="contact-subject-error" role="alert" className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm text-navy-300 mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register('message', { required: 'Message is required' })}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="w-full bg-[#050c10] border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors resize-none"
          placeholder="Tell us how we can help..."
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-red-400 text-xs mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-lime-400 text-navy-950 py-4 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
