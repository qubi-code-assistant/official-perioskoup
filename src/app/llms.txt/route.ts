export async function GET() {
  const content = `# Perioskoup

## Overview
Perioskoup is an AI dental companion application designed for dentists and dental clinics. It supports patient engagement between dental visits through habit tracking, educational content, and smart reminders.

## Company
- Founded: 2024
- Headquarters: Romania
- Stage: Pre-revenue, beta phase
- Market: B2B SaaS for dental clinics
- Waitlist: 30+ clinics

## Product
- Patient-facing mobile app (iOS, Android)
- Dentist dashboard for engagement visibility
- AI companion for personalized oral care routines
- Habit tracking and routine building
- Smart reminders for daily care

## Team
- Dr. Anca Laura Constantin — Periodontist & CEO, EFP Digital Innovation Award Winner 2025
- Eduard Ciugulea — CGO & Technical Co-Founder
- Petrica Nancu — CTO & Head of AI

## Pricing (Beta)
- Starter: EUR 49/month — up to 50 patients
- Professional: EUR 99/month — up to 200 patients
- Enterprise: Custom pricing — unlimited patients

## Key Pages
- /features — Product features overview
- /for-dentists — Benefits for dental practices
- /pricing — Pricing tiers (beta)
- /about — Team and company story
- /blog — Articles on dental engagement
- /contact — Contact form
- /waitlist — Beta waitlist signup

## Contact
- Website: https://perioskoup.com
- LinkedIn: https://linkedin.com/company/perioskoup
- Instagram: https://instagram.com/perioskoup
- X: https://x.com/perioskoup
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
