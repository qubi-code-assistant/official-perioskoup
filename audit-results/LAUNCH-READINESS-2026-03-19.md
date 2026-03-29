# PERIOSKOUP LAUNCH READINESS AUDIT
**Date:** 2026-03-19  
**Auditor:** Mozi subagent  
**Prior baseline:** FINAL-AUDIT.md, 2026-03-06, score 68/100  
**Days to launch:** 11 (March 30 target)  
**Build status:** ✅ Clean — 887ms, 0 errors  

---

## EXECUTIVE SUMMARY

Since the March 6 audit, the major P0 feature-accuracy violations have been addressed:
Secure Messaging is gone, Streak Rewards is gone, Analytics are marked "coming soon",
AI Chatbot has a Beta badge, ForDentists at-risk-flagging is removed. Good work.

**However: one critical blocker remains that will make the launch meaningless.**

> **The waitlist form saves zero data.** Every signup is silently discarded.
> This is the single most important fix before March 30.

The rest of this report details what remains, priority-ordered.

---

## P0 — BLOCKS LAUNCH (fix before deploying)

### P0-1: Waitlist form saves NOTHING
**File:** `client/src/pages/Waitlist.tsx:39-45`

```tsx
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    capture("waitlist_signup_completed", { source: "waitlist_page" });
    setSubmitted(true);  // ← shows "You're on the list!" 
    // ← NO fetch(), NO API call, NO database write, NO email
  }
}
```

The form collects first name, email, role (dentist/patient), and clinic name — 
then throws it all away. Only a PostHog analytics event fires (if VITE_POSTHOG_KEY 
is set in Vercel env). The user sees "You're on the list!" but they are not on any list.

**Fix options (pick one, under 2 hours each):**
- **Formspree** (easiest, free tier 50/mo): set `<form action="https://formspree.io/f/YOUR_ID">` — no backend needed
- **Supabase insert** (best long-term): add `supabase.from('waitlist').insert({...})` in handleSubmit
- **Resend / EmailJS**: fire an email to hello@perioskoup.com on each submit

**Impact:** Without this, the March 30 launch generates zero captured leads. All 
marketing effort — paid or organic — produces nothing traceable.

---

### P0-2: Dr. Anca's title is inconsistent across the codebase
**Files:**  
- `CLAUDE.md` line ~40: `"Dr. Anca Constantin (CDO/Periodontist)"`  
- `client/src/pages/About.tsx:33`: `"jobTitle": "CEO"`  
- `client/src/pages/About.tsx:261`: `"Periodontist & Co-founder, CEO"`  
- `client/src/pages/About.tsx:303`: `"Periodontist & Co-founder, CEO"`  
- `client/src/pages/About.tsx:87` (FAQ schema): `"CEO"`  
- `client/src/pages/About.tsx:95` (FAQ schema): `"CEO"`  

CLAUDE.md defines her as CDO. The website says CEO everywhere. Google's FAQ rich 
results surface the schema text verbatim. Pick one title and make it consistent 
in both the code AND CLAUDE.md. Based on her clinical role (chief dental/clinical 
officer makes more sense than CEO for a clinician founder), but this is Eduard's call.
Decide, then update `About.tsx` lines 33, 87, 95, 261, 303 all at once.

---

### P0-3: Eduard Ciugulea listed as CTO in ForDentists schema
**File:** `client/src/pages/ForDentists.tsx` — Service schema `founder` array

In the minified bundle (`ForDentists-Do7yRnFJ.js`) the Service schema lists:
```json
{"@type":"Person","name":"Eduard Ciugulea","jobTitle":"CTO"}
```
Eduard is CGO, not CTO. Petrica is CTO. Google indexes this schema. Fix in 
`ForDentists.tsx` Service schema `provider.founder` array.

---

## P1 — SHOULD FIX BEFORE LAUNCH

### P1-1: Progress Tracking card has no Beta/Coming Soon badge
**File:** `client/src/pages/Features.tsx:19`

```tsx
{ icon: "📊", title: "Progress Tracking", 
  bullets: ["Daily habit logging", "Visual progress dashboards", "Habit streaks", "Routine consistency tools"], 
  tag: "Patients" 
  // ← NO badge
}
```

Per FEATURE_TRUTH_TABLE.md: "Track habits page / Mark as done / 90s timer" = **In Progress**.
"Streak tracking" = **In Progress**. This card should carry a `badge: "Beta"` like 
Smart Reminders does. It's showing habit streaks as if they're live. Small fix but 
accurate per your own truth table.

---

### P1-2: FAQ schema on Features.tsx describes Progress Tracking as fully working
**File:** `client/src/pages/Features.tsx:40`

```tsx
{ "@type": "Question", 
  "name": "What features does Perioskoup offer for patients?", 
  "acceptedAnswer": { "text": "...progress tracking with streaks and charts..." } 
}
```

This FAQ schema (the one Google surfaces in search) says "streaks and charts" without 
any beta/coming soon qualifier. Risk: a patient reads this in Google search, signs up 
expecting streaks, sees nothing, churns immediately. Add "(in development)" to the 
schema text.

---

### P1-3: "EU MDR and FDA SaMD guidance in mind" in FAQ schemas
**Files:**  
- `client/src/pages/Home.tsx:71`  
- `client/src/pages/ForDentists.tsx:47`

Both FAQ schemas answer "Is Perioskoup a medical device?" with:
> "The app is built with EU MDR and FDA SaMD guidance in mind."

This is borderline regulatory language. "Built with...guidance in mind" implies 
regulatory design intent without formal compliance. You haven't filed with any notified 
body. If a competitor or journalist reads this schema (Google surfaces it), they could 
challenge it. Safer alternative:
> "Perioskoup is a wellness companion app, not a regulated medical device. It does not 
> provide diagnoses or clinical advice. All patient programmes are set by their clinician."

Remove the EU MDR / FDA SaMD line entirely. The first two sentences are all you need 
and they're legally cleaner.

---

### P1-4: Features FAQ schema references missing/unlaunched features
**File:** `client/src/pages/Features.tsx:41`

```tsx
{ "name": "What features does Perioskoup offer for dentists?",
  "text": "...patient progress visibility between appointments...pre-visit summaries 
   that reduce chair time..." }
```

"Care plan follow-through (in development)" and "Practice-wide summaries (coming Q2 2026)" 
per FEATURE_TRUTH_TABLE. The FAQ schema text doesn't caveat these. Low risk because it's 
schema not visible UI, but schema content should match reality.

---

### P1-5: Sitemap lastmod dates are stale (2026-03-06)
**File:** `client/public/sitemap.xml`

Every URL has `<lastmod>2026-03-06</lastmod>`. Google uses lastmod as a crawl freshness 
signal. Update to 2026-03-19 (or today's date) before launch. 15-second fix.

---

### P1-6: feed.xml lastBuildDate is stale (2026-03-06)
**File:** `client/public/feed.xml:11`

```xml
<lastBuildDate>Thu, 06 Mar 2026 00:00:00 +0000</lastBuildDate>
```

Update to current date. Feed readers and AI content aggregators use this date.

---

### P1-7: No confirmation email after waitlist signup
Even after fixing P0-1, the submission flow shows "You're on the list!" with no 
email confirmation to the user. With Formspree or Resend you can auto-reply. 
Without this, users forget they signed up, open rate on your eventual launch email 
will be lower, and spam complaints higher. Add a simple auto-reply.

---

### P1-8: Home page CTA goes to /waitlist — which is noindex
**Files:**  
- `client/src/pages/Home.tsx:154` — navigates to /waitlist  
- `client/src/pages/Waitlist.tsx:64` — `<meta name="robots" content="noindex, follow" />`

The waitlist page is intentionally noindex (fine for SEO). But there's no waitlist 
widget on the home page itself. If a user bounces before clicking the CTA, you've 
captured nothing. Consider adding an inline email capture to the home page hero 
(name + email, no full form) so conversions happen without a page navigation.

---

## P2 — NICE TO HAVE BEFORE LAUNCH

### P2-1: Main JS bundle is 283KB (86KB gzip)
**Build output:** `assets/index-Bf1xf86V.js: 283.11 kB │ gzip: 86.56 kB`

Not alarming, but this is the initial bundle that blocks all React rendering. 
The previous audit recommended removing unused Radix UI packages. radix-ui chunk 
is 46KB gzip. Check which Radix primitives are actually used:

```bash
grep -r "from.*@radix-ui" client/src/ | awk -F'"' '{print $2}' | sort -u
```

Removing 3-4 unused packages could drop 10-15KB from this chunk.

**BlogPost chunk is 66KB (21KB gzip)** — this is large for a page. The blog 
component includes all post content inline (hardcoded articles). As the blog grows 
this will get worse. Worth flagging for post-launch refactor.

### P2-2: sonner toast library is 33KB (9.5KB gzip) for zero visible toasts
**Build output:** `assets/sonner-DVuH2Ulx.js: 33.65 kB │ gzip: 9.58 kB`

The Toaster component from sonner appears to be imported somewhere in the app 
but no toasts are triggered in the current user flows. Verify if it's actually 
used. If not, remove it — that's a free 9.5KB gzip saving on every page load.

### P2-3: About page has no Person schema for Eduard or Petrica
**File:** `client/src/pages/About.tsx`

Only Dr. Anca has a full Person/Physician JSON-LD schema. Eduard and Petrica 
are referenced as plain `{"@type":"Person","name":"..."}` in the Organization 
schema but have no individual Person schemas. Google uses Person schemas for 
knowledge panels. Low priority but worth adding after launch.

### P2-4: Waitlist FAQ schema has stale launch date language
**File:** `client/src/pages/Waitlist.tsx:53`

```tsx
{ "text": "...planned for March 2026. Founding waitlist members receive priority 
   access before the public launch date." }
```

If launch actually happens March 30, this becomes inaccurate immediately after. 
Plan to update post-launch.

### P2-5: Contact page ForDentists service schema lists wrong founder title
Already covered in P0-3 but repeated in the Contact page JSON-LD (if any). Verify.

---

## WHAT WAS FIXED SINCE MARCH 6 (confirmed ✅)

| Issue from prior audit | Status |
|------------------------|--------|
| Secure Messaging feature card | ✅ Removed |
| Streak rewards bullet | ✅ Removed |
| AI Chatbot shown as fully working | ✅ Has "Beta" badge now |
| At-risk patient flagging in ForDentists | ✅ Removed |
| Analytics & engagement reports (Pricing) | ✅ Now "(coming soon)" |
| BlogPost og:image relative URL | ✅ Fixed — absolute URL |
| feed.xml relative image URL | ✅ Fixed — absolute URL |
| Medical evidence stats missing | ✅ Added to ForDentists (€90B, 30%, €1→€50) |
| Pricing meta description leaking pricing | ✅ "Coming soon" on Clinic plan |
| CEO→CDO schema fix | ⚠️ PARTIAL — CLAUDE.md says CDO but code says CEO everywhere. Unresolved. |
| dot-grid-breathe reduced-motion | ✅ ParallaxHeroBg uses `prefers-reduced-motion` check |

---

## BUILD OUTPUT SUMMARY

```
✓ Built in 887ms — 0 errors, 0 warnings
Main chunk:  283KB (86KB gzip)  ← acceptable, room to trim
CSS:         106KB (18KB gzip)
radix-ui:    46KB  (17KB gzip)
sonner:      34KB  (10KB gzip)  ← possibly unused
BlogPost:    66KB  (21KB gzip)  ← large, monitor as blog grows
Total assets: 712KB
```

No TypeScript errors. Build is production-ready from a compilation standpoint.

---

## PRIORITY ACTION LIST FOR MARCH 30

| Priority | Fix | Time | Owner |
|----------|-----|------|-------|
| **P0-1** | Wire waitlist form to real backend (Formspree/Supabase/Resend) | 2h | Eduard |
| **P0-2** | Decide Dr. Anca title (CEO or CDO), update About.tsx lines 33, 87, 95, 261, 303 AND CLAUDE.md | 15min | Eduard |
| **P0-3** | Fix Eduard's title in ForDentists.tsx Service schema (CGO not CTO) | 5min | Eduard |
| **P1-1** | Add `badge: "Beta"` to Progress Tracking card in Features.tsx:19 | 2min | Eduard |
| **P1-2** | Add "(in development)" to Progress Tracking in Features FAQ schema:40 | 2min | Eduard |
| **P1-3** | Remove "EU MDR and FDA SaMD guidance in mind" from both FAQ schemas | 3min | Eduard |
| **P1-5** | Update sitemap.xml lastmod to 2026-03-19 | 1min | Eduard |
| **P1-6** | Update feed.xml lastBuildDate to today | 1min | Eduard |
| **P2-1** | Audit and remove unused Radix UI packages | 30min | Eduard |
| **P2-2** | Check if sonner is actually used; remove if not | 10min | Eduard |

**Total time for all P0+P1 fixes: ~3 hours**  
**Total time including P2: ~4 hours**

---

## THE ONE THING

Fix the waitlist form first. Everything else is polish. Right now, launching means
sending people to a form that feels like it works but captures nothing. 
That's worse than not launching.

```bash
# Fastest fix: Formspree (free, no backend, 2 minutes)
# 1. Go to formspree.io, create account, get form ID
# 2. In Waitlist.tsx handleSubmit, replace setSubmitted(true) with:
const res = await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  body: new FormData(e.currentTarget),
  headers: { Accept: "application/json" }
});
if (res.ok) setSubmitted(true);
else setErrors({ form: "Something went wrong. Please email hello@perioskoup.com" });
```

Launch-ready score estimate after all P0+P1 fixes: **~78/100**
(+10 points from 68, primarily from conversion and feature-accuracy fixes)
