import { Dongle, Gabarito } from 'next/font/google'

export const dongle = Dongle({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-dongle',
  display: 'swap',
})

export const gabarito = Gabarito({
  subsets: ['latin'],
  variable: '--font-gabarito',
  display: 'swap',
})
