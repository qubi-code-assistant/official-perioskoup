'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface WaitlistFormData {
  name: string
  email: string
  clinic: string
  country: string
  role: string
}

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>()

  const onSubmit = async (data: WaitlistFormData) => {
    // TODO: POST to API route
    console.log('Waitlist submission:', data)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
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
          You&rsquo;re on the list!
        </h3>
        <p className="text-navy-300">
          We&rsquo;ll be in touch soon with early access details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="wl-name" className="block text-sm text-navy-300 mb-2">
            Full Name
          </label>
          <input
            id="wl-name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            aria-describedby={errors.name ? 'wl-name-error' : undefined}
            className="w-full bg-navy-800/60 border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
            placeholder="Dr. Jane Smith"
          />
          {errors.name && (
            <p id="wl-name-error" role="alert" className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="wl-email" className="block text-sm text-navy-300 mb-2">
            Email
          </label>
          <input
            id="wl-email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })}
            aria-describedby={errors.email ? 'wl-email-error' : undefined}
            className="w-full bg-navy-800/60 border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
            placeholder="jane@dentalclinic.com"
          />
          {errors.email && (
            <p id="wl-email-error" role="alert" className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="wl-clinic" className="block text-sm text-navy-300 mb-2">
            Clinic Name
          </label>
          <input
            id="wl-clinic"
            type="text"
            {...register('clinic', { required: 'Clinic name is required' })}
            aria-describedby={errors.clinic ? 'wl-clinic-error' : undefined}
            className="w-full bg-navy-800/60 border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
            placeholder="Smile Dental Care"
          />
          {errors.clinic && (
            <p id="wl-clinic-error" role="alert" className="text-red-400 text-xs mt-1">
              {errors.clinic.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="wl-country" className="block text-sm text-navy-300 mb-2">
            Country
          </label>
          <input
            id="wl-country"
            type="text"
            {...register('country', { required: 'Country is required' })}
            aria-describedby={errors.country ? 'wl-country-error' : undefined}
            className="w-full bg-navy-800/60 border border-navy-700 rounded-xl px-4 py-3 text-lime-50 placeholder:text-navy-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors"
            placeholder="Romania"
          />
          {errors.country && (
            <p id="wl-country-error" role="alert" className="text-red-400 text-xs mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="wl-role" className="block text-sm text-navy-300 mb-2">
          Your Role
        </label>
        <select
          id="wl-role"
          {...register('role', { required: 'Please select your role' })}
          defaultValue=""
          aria-describedby={errors.role ? 'wl-role-error' : undefined}
          className="w-full bg-navy-800/60 border border-navy-700 rounded-xl px-4 py-3 text-lime-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus:border-lime-400 transition-colors appearance-none"
        >
          <option value="" disabled className="text-navy-500">
            Select your role
          </option>
          <option value="dentist">Dentist</option>
          <option value="hygienist">Dental Hygienist</option>
          <option value="periodontist">Periodontist</option>
          <option value="practice-manager">Practice Manager</option>
          <option value="other">Other</option>
        </select>
        {errors.role && (
          <p id="wl-role-error" role="alert" className="text-red-400 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-lime-400 text-navy-950 py-4 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
      </button>
    </form>
  )
}
