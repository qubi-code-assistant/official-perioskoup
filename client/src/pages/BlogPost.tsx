/*
 * PERIOSKOUP BLOG POST DETAIL PAGE
 * Design: Clinical Precision, Human Warmth — Dark Tech-Medical Premium
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 * SEO: Article JSON-LD, BreadcrumbList, per-page meta, og:image
 */

import { useEffect } from "react";
import type { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";

const OG_IMAGE = "/images/og-image.jpg";
const ANCA_IMG = "/images/anca-headshot.jpg";
const EDI_IMG = "/images/eduard-headshot.jpg";

interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: string;
  authorImg: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string;
  answerCapsules: Record<string, string>;
  faqs: { q: string; a: string }[];
}

const ARTICLES: Record<string, Article> = {
  "what-is-periodontal-disease": {
    slug: "what-is-periodontal-disease",
    title: "What Is Periodontal Disease? A Patient's Complete Guide",
    metaTitle: "What Is Periodontal Disease? | Perioskoup",
    metaDescription: "Periodontal disease affects 1 in 2 adults. Learn what it is, how it progresses, and what you can do about it — from a practising periodontist.",
    category: "Patient Education",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & Co-founder, Perioskoup",
    date: "2025-11-12",
    readTime: "8 min read",
    excerpt: "Periodontal disease affects more than half of adults over 30, yet most people have never heard the word 'periodontist'. Here's everything you need to know.",
    body: `
## The Silent Epidemic in Your Mouth

Periodontal disease — commonly called gum disease — is one of the most prevalent chronic conditions in the world. According to the European Federation of Periodontology, approximately 50% of adults have some form of gum disease, and roughly 10% have the severe form that can lead to tooth loss. Yet it remains one of the most under-discussed health conditions in primary care.

As a practising periodontist, I see patients every week who have been living with gum disease for years without knowing it. The reason is simple: periodontal disease is largely painless in its early stages. By the time patients notice symptoms — bleeding gums, loose teeth, or receding gum lines — the disease has often been progressing silently for months or years.

This guide is designed to change that. Understanding periodontal disease is the first step to preventing it.

## What Exactly Is Periodontal Disease?

Your teeth are held in place by a complex support system: the gums (gingiva), the periodontal ligament, and the alveolar bone. Periodontal disease is a bacterial infection that destroys this support system.

It begins with **gingivitis** — inflammation of the gums caused by bacterial plaque accumulating at the gum line. At this stage, the damage is entirely reversible. With proper brushing, flossing, and a professional clean, your gums can return to full health.

If gingivitis is left untreated, it can progress to **periodontitis** — a more serious infection where the bacteria move below the gum line, forming "pockets" between the teeth and gums. The body's immune response to this infection causes the destruction of the bone and tissue that hold your teeth in place. This damage is irreversible.

The most severe form, **advanced periodontitis**, can result in teeth becoming loose, shifting, or needing to be extracted.

## The Stages of Gum Disease

**Stage 1 — Gingivitis:**
- Gums appear red, swollen, or puffy
- Gums bleed when you brush or floss
- No bone loss has occurred yet
- Fully reversible with treatment

**Stage 2 — Mild Periodontitis:**
- Pockets of 4–5mm form between teeth and gums
- Early bone loss begins
- Bacteria are now below the gum line
- Requires professional treatment but manageable

**Stage 3 — Moderate Periodontitis:**
- Pockets of 5–7mm
- Significant bone loss
- Teeth may begin to shift
- More intensive treatment required

**Stage 4 — Severe Periodontitis:**
- Pockets deeper than 7mm
- Severe bone loss
- Teeth may be loose or require extraction
- Complex, multi-phase treatment needed

## What Causes Periodontal Disease?

The primary cause is bacterial plaque — the sticky film that forms on your teeth throughout the day. If plaque is not removed through regular brushing and flossing, it hardens into **tartar** (calculus), which can only be removed by a dental professional.

However, several factors significantly increase your risk:

**Smoking and tobacco use** — Smokers are 3–6 times more likely to develop periodontal disease. Smoking impairs the immune response and reduces blood flow to the gums, masking early symptoms.

**Diabetes** — The relationship between diabetes and periodontal disease is bidirectional. Diabetes increases the risk of gum disease, and severe gum disease makes blood sugar harder to control.

**Genetics** — Some people are genetically predisposed to periodontal disease. If your parents lost teeth to gum disease, your risk is higher.

**Stress** — Chronic stress impairs the immune system's ability to fight infection, including the bacteria responsible for gum disease.

**Medications** — Certain medications, including some antihypertensives, antidepressants, and immunosuppressants, can affect gum health.

**Hormonal changes** — Pregnancy, puberty, and menopause can make gums more sensitive and susceptible to inflammation.

## The Systemic Connection

One of the most important — and least discussed — aspects of periodontal disease is its connection to systemic health. The mouth is not separate from the body. Bacteria from periodontal pockets can enter the bloodstream and contribute to inflammation throughout the body.

Research has established associations between periodontal disease and:

- **Cardiovascular disease** — People with gum disease have a significantly higher risk of heart attack and stroke
- **Type 2 diabetes** — Periodontal inflammation worsens insulin resistance
- **Adverse pregnancy outcomes** — Including preterm birth and low birth weight
- **Respiratory disease** — Periodontal bacteria can be aspirated into the lungs
- **Alzheimer's disease** — Emerging research suggests a link between periodontal bacteria and cognitive decline

This is why periodontal health is not just a dental issue — it is a whole-body health issue.

## How Is Periodontal Disease Diagnosed?

Diagnosis requires a clinical examination by a dentist or periodontist. The key diagnostic tool is **periodontal probing** — using a small instrument to measure the depth of the pockets around each tooth. Healthy pockets are 1–3mm. Pockets of 4mm or more indicate disease.

Your dentist will also take X-rays to assess bone levels, and examine your gums for signs of inflammation, recession, and bleeding.

## Treatment Options

**For gingivitis:** A thorough professional clean (scale and polish) combined with improved home care is usually sufficient to reverse gingivitis.

**For periodontitis:** Treatment involves **scaling and root planing** (also called a "deep clean") — a procedure where the dental hygienist or periodontist removes bacteria and calculus from below the gum line and smooths the root surfaces to discourage bacterial reattachment.

In more advanced cases, surgical intervention may be required to access deeper pockets, regenerate lost bone, or cover exposed roots.

**Maintenance:** After active treatment, regular periodontal maintenance appointments (typically every 3–4 months) are essential to prevent recurrence.

## What You Can Do at Home

The most powerful thing you can do is establish a consistent daily routine:

1. **Brush twice daily** for two full minutes, using a soft-bristled brush at a 45-degree angle to the gum line
2. **Clean between your teeth daily** — floss, interdental brushes, or a water flosser
3. **Use a fluoride toothpaste** — fluoride strengthens enamel and helps prevent decay
4. **Avoid smoking** — this single change has the largest impact on periodontal health
5. **Manage systemic conditions** — keep diabetes well-controlled, eat a balanced diet, manage stress

## The Role of Technology in Periodontal Care

One of the biggest challenges in periodontal care is the gap between the dental chair and the patient's daily life. A periodontist can perform excellent treatment, but if the patient doesn't maintain their home care routine, the disease will recur.

This is precisely why I co-founded Perioskoup. The app translates clinical recommendations into personalised daily habits, sends gentle reminders, and helps patients track their progress between appointments. It gives clinicians visibility into patient engagement and allows them to send targeted guidance without requiring an additional appointment.

Periodontal disease is manageable. With the right knowledge, the right professional support, and the right daily habits, most patients can maintain their teeth for life. The key is catching it early — and staying consistent.

*Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, and co-founder of Perioskoup. She holds a specialisation in periodontology and has treated hundreds of patients with periodontal disease.*
    `,
    answerCapsules: {
      "The Silent Epidemic in Your Mouth": "Periodontal disease is one of the most common chronic conditions worldwide, affecting roughly 50% of adults. It progresses silently and painlessly in its early stages, which is why most people do not know they have it until significant damage has occurred.",
      "What Exactly Is Periodontal Disease?": "Periodontal disease is a bacterial infection that destroys the tissues supporting the teeth — the gums, periodontal ligament, and alveolar bone. It begins as gingivitis (reversible gum inflammation) and can progress to periodontitis (irreversible bone loss) if untreated.",
      "The Stages of Gum Disease": "Gum disease progresses through four stages: gingivitis (reversible inflammation), mild periodontitis (early bone loss, 4–5mm pockets), moderate periodontitis (significant bone loss, 6–7mm pockets), and advanced periodontitis (severe destruction, tooth mobility, possible tooth loss).",
      "What Causes Periodontal Disease?": "The primary cause is bacterial plaque that accumulates on teeth and below the gum line. Risk factors include smoking, diabetes, genetic predisposition, hormonal changes, certain medications, and poor oral hygiene.",
      "The Systemic Connection": "Periodontal disease is linked to systemic conditions including cardiovascular disease, diabetes, respiratory infections, and adverse pregnancy outcomes. The chronic inflammation in the mouth can affect the entire body.",
      "How Is Periodontal Disease Diagnosed?": "Diagnosis involves measuring the depth of gum pockets with a periodontal probe and taking X-rays to assess bone levels. Pockets deeper than 3mm and evidence of bone loss indicate periodontitis.",
      "Treatment Options": "Treatment ranges from professional cleaning and scaling/root planing for early stages, to surgical interventions such as flap surgery and bone grafting for advanced cases. All treatment requires ongoing maintenance.",
      "What You Can Do at Home": "Effective home care includes brushing twice daily with a soft-bristled or electric toothbrush, daily interdental cleaning with the correct size brushes, and attending regular professional check-ups every 3–6 months.",
      "The Role of Technology in Periodontal Care": "Technology bridges the gap between dental appointments by translating clinical recommendations into personalised daily habits, providing reminders, and tracking patient progress — giving clinicians visibility into patient engagement.",
    },
    faqs: [
      { q: "What is periodontal disease?", a: "Periodontal disease is a chronic bacterial infection that destroys the gums, periodontal ligament, and bone that support your teeth. It affects approximately 50% of adults and is the leading cause of tooth loss in adults." },
      { q: "Can periodontal disease be reversed?", a: "Gingivitis (the earliest stage) is fully reversible with proper oral hygiene and professional cleaning. However, once it progresses to periodontitis with bone loss, the damage is irreversible — though the disease can be managed and stabilised." },
      { q: "What are the warning signs of gum disease?", a: "Common warning signs include bleeding gums when brushing or flossing, red or swollen gums, persistent bad breath, receding gum lines, and loose or shifting teeth. However, early-stage gum disease is often painless." },
    ],
  },

  "how-ai-is-changing-dental-monitoring": {
    slug: "how-ai-is-changing-dental-monitoring",
    title: "How AI Is Changing Dental Monitoring — And Why It Matters",
    metaTitle: "How AI Is Changing Dental Monitoring | Perioskoup",
    metaDescription: "AI is transforming how dentists monitor patient health between appointments. Here's what the technology actually does — and what it doesn't.",
    category: "Technology",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    authorRole: "Co-founder & CGO, Perioskoup",
    date: "2025-12-03",
    readTime: "7 min read",
    excerpt: "From pattern recognition in X-rays to personalised habit coaching, AI is beginning to close the gap between clinical visits. Here's what's real and what's hype.",
    body: `
## The Problem With Annual Check-Ups

The traditional model of dental care is built around periodic appointments — typically every six months to a year. The dentist examines the patient, identifies problems, provides treatment, and sends the patient home with instructions. The patient then has to maintain their oral health for the next six months largely on their own, with minimal support or feedback.

This model has a fundamental flaw: **the gap between appointments is where most of the damage happens**.

Periodontal disease, tooth decay, and other oral health conditions are not static. They progress continuously, influenced by daily habits, diet, stress, and systemic health. A patient who leaves a dental appointment in good health can develop significant problems before their next visit — and by the time those problems are detected, they may require much more intensive treatment.

Artificial intelligence is beginning to address this gap. Not by replacing dentists — that's not what AI does — but by extending the reach of clinical expertise into the spaces between appointments.

## What AI Actually Does in Dental Care

Let's be precise about what AI means in this context, because the term is often used loosely.

**Pattern recognition in diagnostic imaging** is the most mature application of AI in dentistry. Machine learning models trained on millions of dental X-rays can detect caries, bone loss, and other pathologies with accuracy that rivals experienced clinicians. Companies like Overjet, Denti.AI, and Pearl have developed FDA-cleared diagnostic AI tools that assist dentists in identifying problems they might otherwise miss.

**Predictive risk modelling** uses patient data — medical history, lifestyle factors, genetic markers, previous treatment outcomes — to predict which patients are at highest risk of developing specific conditions. This allows clinicians to allocate their time and resources more effectively, focusing intensive monitoring on high-risk patients.

**Natural language processing** enables AI systems to extract structured clinical data from unstructured notes, improving documentation efficiency and enabling better data analysis across patient populations.

**Personalised coaching and habit formation** — this is where Perioskoup operates. Using patient-specific data (dental history, current habits, risk factors, clinician recommendations), AI can generate personalised daily routines, reminders, and educational content that is far more relevant and actionable than generic advice.

## The Behaviour Change Problem

Here's a truth that every dentist knows but rarely says out loud: **most patients don't follow instructions**.

Not because they don't care about their health. But because generic instructions — "brush twice a day, floss daily, avoid sugar" — don't account for individual circumstances, don't provide feedback, and don't adapt to the patient's progress.

Behaviour change research is clear on what works: specificity, feedback loops, social accountability, and progressive difficulty. Generic dental advice provides none of these.

AI-powered coaching can provide all of them. Instead of "brush twice a day," a patient might receive: "Your periodontist has flagged your lower molars as a high-risk area. Here's a 90-second technique specifically for that region, with a reminder at 8pm when your engagement data shows you're most likely to brush."

That level of personalisation was previously only possible in a clinical setting, with a hygienist standing next to the patient. AI makes it scalable.

## What AI Cannot Do

It's important to be equally clear about the limitations.

AI cannot diagnose. In the context of a consumer-facing dental app, AI can provide information, flag potential concerns, and recommend professional consultation — but it cannot replace clinical examination and diagnosis by a qualified dental professional. This is both a regulatory reality and a clinical one.

AI cannot replace the patient-clinician relationship. Trust, empathy, and clinical judgment are human qualities that AI augments, not replaces.

AI is only as good as its data. A model trained on biased or incomplete data will produce biased or incomplete outputs. In healthcare, this is not just a technical problem — it is an ethical one.

## The Perioskoup Approach

When we built Perioskoup, we made a deliberate decision about where AI should and should not operate.

The AI in Perioskoup does not diagnose. It does not tell patients what is wrong with their teeth. It does not interpret X-rays or clinical measurements.

What it does is take the clinical recommendations made by a qualified periodontist or dentist — during a real appointment, based on a real examination — and translate them into a personalised daily programme that the patient can actually follow.

The clinician remains in control. The AI is the bridge between the chair and the home.

We built it this way because we believe the most valuable thing technology can do in healthcare is not to replace clinical expertise, but to extend its reach. A periodontist can see a patient for 45 minutes every three months. Perioskoup can support that patient every single day.

## The Data Infrastructure Challenge

Building AI for healthcare is not just a machine learning problem. It is a data infrastructure problem, a regulatory problem, and a trust problem.

Patient health data is among the most sensitive data that exists. In Europe, it is protected by GDPR and, specifically, by Article 9, which imposes strict conditions on the processing of health data. Any AI system that handles dental health data must be built with privacy by design — not as an afterthought.

At Perioskoup, we store all patient data in EU-based servers, encrypted at rest and in transit. We do not sell health data. We do not use patient data to train models without explicit consent. These are not just legal requirements — they are ethical commitments.

## Where This Is Going

The next five years will see significant advances in AI-assisted dental care. Intraoral cameras with real-time AI analysis will become standard. Predictive models will identify patients at risk of periodontal disease before clinical signs appear. Personalised coaching will become more sophisticated as models learn from larger datasets.

But the fundamental dynamic will remain the same: AI is a tool that extends human capability. The most effective dental care will always combine clinical expertise with intelligent technology — and the most important relationship in that system will always be the one between a patient and their dentist.

*Eduard Ciugulea is the CGO and co-founder of Perioskoup. He has a background in full-stack engineering and AI systems, with a focus on building technology that changes health behaviour.*
    `,
    answerCapsules: {
      "The Problem With Annual Check-Ups": "Traditional dental care relies on periodic appointments spaced months apart, leaving patients unsupported between visits. This gap is where most chronic dental conditions deteriorate, because patients lack feedback and guidance during their daily routines.",
      "What AI Actually Does in Dental Care": "AI in dental care analyses patterns in patient behaviour data to personalise recommendations, optimise reminder timing, and flag patients who may be struggling with their home care routines. It extends clinical expertise into the patient's daily life.",
      "The Behaviour Change Problem": "Generic dental advice fails because it lacks specificity, feedback loops, social accountability, and progressive difficulty. AI-powered coaching provides all of these by personalising instructions to individual risk profiles and daily patterns.",
      "What AI Cannot Do": "AI cannot replace clinical diagnosis, perform dental procedures, or substitute the relationship between a patient and their dentist. It is a support tool that extends the reach of clinical expertise, not a replacement for it.",
      "The Perioskoup Approach": "Perioskoup uses AI to personalise the delivery and timing of clinician-set recommendations. The clinician remains in control of all clinical decisions; the AI optimises how and when those recommendations reach the patient.",
      "The Data Infrastructure Challenge": "Building AI for healthcare requires solving data infrastructure, regulatory, and trust challenges simultaneously. Patient health data must be stored securely in EU-based servers with GDPR protection, encryption, and explicit consent mechanisms.",
      "Where This Is Going": "The next five years will bring real-time AI analysis via intraoral cameras, predictive models for early disease detection, and more sophisticated personalised coaching. The fundamental principle remains: AI extends human capability rather than replacing it.",
    },
    faqs: [
      { q: "How does AI help with dental monitoring?", a: "AI analyses patient behaviour patterns to personalise oral care recommendations, optimise reminder timing, and alert clinicians when patients may be struggling with their home care routines between appointments." },
      { q: "Can AI replace my dentist?", a: "No. AI in dental care is a support tool that extends clinical expertise into daily life. It cannot diagnose conditions, perform procedures, or replace the patient-dentist relationship. All clinical decisions remain with the dentist." },
      { q: "Is my dental data safe with AI apps?", a: "Responsible dental AI platforms store data in EU-based servers with encryption at rest and in transit, comply with GDPR, and never sell health data or use it for model training without explicit consent." },
    ],
  },

  "3-minute-routine-save-teeth": {
    slug: "3-minute-routine-save-teeth",
    title: "The 3-Minute Daily Routine That Could Save Your Teeth",
    metaTitle: "3-Minute Daily Dental Routine | Perioskoup",
    metaDescription: "A periodontist's exact 3-minute daily routine for preventing gum disease and tooth loss. Simple, evidence-based, and takes less time than making coffee.",
    category: "Patient Habits",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & Co-founder, Perioskoup",
    date: "2026-01-08",
    readTime: "5 min read",
    excerpt: "Most people spend more time choosing what to watch on Netflix than caring for their teeth. Here's a clinically-backed 3-minute routine that actually works.",
    body: `
## Why Most People's Dental Routine Isn't Working

I've been a practising periodontist for over a decade. In that time, I've seen thousands of patients — and I've noticed a pattern. Most people who come to me with advanced gum disease were not neglecting their teeth entirely. They were brushing. They thought they were doing the right things.

The problem wasn't effort. It was technique, consistency, and completeness.

The average person spends 45 seconds brushing their teeth. The recommended minimum is two minutes. They brush the surfaces they can see — the fronts of their teeth — and miss the areas where disease actually starts: the gum line, the spaces between teeth, and the backs of the molars.

This guide is the routine I give my own patients. It takes three minutes. It is evidence-based. And if you do it consistently, it will make a measurable difference to your periodontal health.

## The 3-Minute Routine

### Minute 1: Interdental Cleaning First

The single most impactful change most people can make is to clean between their teeth — and to do it **before** brushing, not after.

Why before? Because cleaning between your teeth dislodges bacteria and food debris from the spaces your toothbrush can't reach. When you brush afterwards, the fluoride in your toothpaste can penetrate those spaces more effectively.

**Choose your tool:**
- **Floss** — most effective for tight contacts between teeth, but requires good technique
- **Interdental brushes** — easier to use, more effective for wider spaces, preferred by many periodontists
- **Water flosser** — excellent for patients with bridges, implants, or orthodontic appliances

**The technique:**
- Work systematically around the mouth — don't skip teeth
- For floss: curve it into a C-shape around each tooth, slide gently below the gum line, and move up and down against the tooth surface
- For interdental brushes: insert gently, move back and forth several times, and don't force if there's resistance

This takes approximately 60 seconds if you're thorough.

### Minute 2: Brushing — The Right Way

Most people brush incorrectly. The most common mistakes are:
1. Brushing too hard (damages enamel and gum tissue)
2. Brushing in horizontal strokes (misses the gum line)
3. Not spending enough time on each area

**The modified Bass technique** is the gold standard recommended by the EFP:

1. Hold your toothbrush at a 45-degree angle to the gum line
2. Use small, circular or vibratory motions — not scrubbing
3. Apply light pressure — you should be able to feel the bristles, not force them
4. Spend 30 seconds on each quadrant (upper right, upper left, lower right, lower left)
5. Don't forget the backs of your last molars and the inside surfaces of your front teeth

**Electric vs manual:** A good electric toothbrush (oscillating-rotating type, like Oral-B) is clinically superior to manual brushing for most people. The built-in timer and pressure sensor remove two of the most common errors. If you use manual, set a timer.

**Toothpaste:** Use a fluoride toothpaste with at least 1,450ppm fluoride. Don't rinse with water after brushing — spit and leave the residue. This allows the fluoride to continue working.

### Minute 3: Targeted Attention

The final minute is for the areas your dentist or periodontist has flagged as high-risk — and for a quick check of your own gum health.

**If you have active periodontal disease or a history of it:**
- Spend extra time on the areas your periodontist has identified as problem zones
- Use a chlorhexidine mouthwash if prescribed (not as a permanent substitute for mechanical cleaning)
- Consider a tongue scraper — the tongue harbours significant bacterial load

**The 30-second self-check:**
Look in the mirror. Are your gums pink and firm, or red and puffy? Do they bleed when you press gently? Is there any recession — can you see more of the tooth root than before? These are early warning signs. Note them. Mention them at your next appointment.

## The Habit Stack

The hardest part of any dental routine is not the technique — it's the consistency. Here's how to make it automatic:

**Habit stacking:** Attach your dental routine to an existing habit. Most people already have a morning and evening routine. Link your dental care to something you already do without thinking — making coffee, showering, or getting into bed.

**Environment design:** Keep your interdental tools visible and accessible. If your floss is buried in a drawer, you won't use it. Put it next to your toothbrush.

**Track it:** Research on habit formation consistently shows that tracking increases engagement. Even a simple tick on a calendar works. Apps like Perioskoup are designed specifically for this — they send reminders, track streaks, and adapt to your specific risk profile.

**The two-day rule:** Never miss two days in a row. One missed day is a slip. Two missed days is the start of a new (bad) habit.

## What This Routine Prevents

Done consistently, this three-minute routine prevents:

- **Gingivitis** — the reversible early stage of gum disease
- **Progression to periodontitis** — the irreversible, bone-destroying stage
- **Tooth decay** — fluoride and mechanical plaque removal are the two most evidence-based caries prevention strategies
- **Bad breath** — 85% of persistent bad breath originates from bacterial activity in the mouth
- **Systemic health complications** — by reducing the bacterial load in your mouth, you reduce the risk of bacteria entering your bloodstream

## A Note on Professional Care

This routine is not a substitute for professional dental care. You should still see a dentist or hygienist regularly — the frequency depends on your individual risk profile, but for most adults, every six months is appropriate. For patients with a history of periodontal disease, every three to four months is typically recommended.

What this routine does is maximise the time between those appointments. It keeps your mouth in the best possible condition, so that when you do see your dentist, there is less to treat and more to celebrate.

Three minutes a day. That's the investment. The return is a lifetime of healthy teeth.

*Dr. Anca Laura Constantin is a practising periodontist and co-founder of Perioskoup. She sees patients daily and has developed this routine based on the latest EFP clinical guidelines and her own clinical experience.*
    `,
    answerCapsules: {
      "Why Most People's Dental Routine Isn't Working": "Most adults brush their teeth but skip interdental cleaning entirely. Brushing alone only reaches about 60% of tooth surfaces, leaving the areas between teeth — where periodontal disease most commonly starts — completely unclean.",
      "The 3-Minute Routine": "The evidence-based 3-minute routine consists of: (1) 30 seconds interdental cleaning with correctly sized brushes, (2) 2 minutes brushing with fluoride toothpaste using a soft-bristled or electric brush, and (3) 30 seconds tongue cleaning. Interdental cleaning comes first to dislodge bacteria before brushing.",
      "The Habit Stack": "Successful habit formation relies on four principles: habit stacking (linking dental care to existing routines), environment design (keeping tools visible), tracking progress (using apps or calendars), and the two-day rule (never missing two consecutive days).",
      "What This Routine Prevents": "Consistent daily oral care prevents gingivitis, progression to periodontitis, tooth decay, persistent bad breath, and systemic health complications by reducing the bacterial load that can enter the bloodstream.",
      "A Note on Professional Care": "This home care routine supplements but does not replace professional dental care. Most adults should see a dentist every six months; patients with periodontal disease history should visit every three to four months.",
    },
    faqs: [
      { q: "What is the best daily dental routine?", a: "The evidence-based routine takes 3 minutes: 30 seconds of interdental cleaning, 2 minutes of brushing with fluoride toothpaste, and 30 seconds of tongue cleaning. Interdental cleaning should always come before brushing." },
      { q: "Why should I floss before brushing?", a: "Interdental cleaning before brushing dislodges bacteria and food debris from between teeth, allowing the fluoride in toothpaste to reach those surfaces during brushing for better protection." },
      { q: "How often should I see a dentist?", a: "Most adults should see a dentist or hygienist every six months. Patients with a history of periodontal disease typically need appointments every three to four months, depending on their individual risk profile." },
    ],
  },

  "efp-digital-innovation-award-2025": {
    slug: "efp-digital-innovation-award-2025",
    title: "Perioskoup Wins EFP Digital Innovation Award 2025",
    metaTitle: "EFP Digital Innovation Award 2025 | Perioskoup",
    metaDescription: "Perioskoup was awarded 3rd Prize at the EFP Digital Innovation Awards 2025 in Vienna, selected from 20 submissions across 17 national societies.",
    category: "Company News",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    authorRole: "Co-founder & CGO, Perioskoup",
    date: "2025-05-17",
    readTime: "4 min read",
    excerpt: "At EuroPerio11 in Vienna, Perioskoup was awarded 3rd Prize at the EFP Digital Innovation Awards — selected from 20 submissions across 17 national societies.",
    body: `
## Vienna, May 2025

On the 16th of May 2025, at EuroPerio11 in Vienna — the world's largest periodontology congress — Perioskoup was awarded **3rd Prize at the EFP Digital Innovation Awards**.

The award is presented annually by the European Federation of Periodontology (EFP), sponsored by Haleon, to recognise the most innovative digital projects advancing periodontal health across Europe.

This year, 20 submissions were received from 17 national societies. Perioskoup was selected by an international expert jury that included Professors James Deschner, David Herrera, and Andreas Stavropoulos — three of the most respected names in European periodontology.

## What the EFP Said

In their official announcement, the EFP described Perioskoup as:

> *"An innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health."*

You can read the full announcement on the [EFP website](https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/).

## What This Means to Us

When Dr. Anca Constantin first described the problem she wanted to solve — the gap between the dental chair and the patient's daily life — it was a clinical observation born from years of practice. She had seen too many patients who understood their diagnosis but couldn't translate it into consistent daily behaviour.

Building Perioskoup was our attempt to bridge that gap. The EFP award is validation that the problem we identified is real, that our approach is credible, and that the European periodontology community sees value in what we're building.

But more than the award itself, what mattered was the conversation it started. At EuroPerio11, we spoke with periodontists from across Europe who described the exact same challenge: patients who leave appointments with good intentions but no effective support system for maintaining their habits between visits.

Every one of those conversations confirmed that we are building something genuinely needed.

## The Road to Vienna

Perioskoup was founded in 2024 by three people: Dr. Anca Laura Constantin (Periodontist & CDO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The idea emerged from Dr. Anca's clinical practice — specifically from the frustration of watching patients with manageable conditions deteriorate between appointments because they lacked the tools to maintain their care at home.

The first version of the app was built in three months. The EFP submission was prepared in parallel with ongoing development. Winning the award at our first major international submission was beyond what we had expected.

## What's Next

The award accelerates our timeline. We are currently in a private beta with a small group of founding clinics across Romania and the UK. We are onboarding new clinics on a rolling basis, with priority given to periodontology practices.

For patients, the app will be available on iOS and Android. We are building the waitlist now — founding members will receive priority access, founding pricing, and a direct line to the team.

If you are a periodontist, dental hygienist, or clinic owner interested in piloting Perioskoup with your patients, we would love to hear from you. If you are a patient who wants to take control of your periodontal health between appointments, join the waitlist.

We are just getting started.

*Eduard Ciugulea is the CGO and co-founder of Perioskoup. He led the technical development of the platform and represented the team at EuroPerio11.*
    `,
    answerCapsules: {
      "Vienna, May 2025": "At EuroPerio11 in Vienna, Perioskoup was awarded 3rd Prize at the EFP Digital Innovation Awards 2025, selected from 20 submissions across 17 national periodontal societies. It was the team's first major international submission.",
      "What the EFP Said": "The European Federation of Periodontology described Perioskoup as 'an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health.' The jury included leading European periodontists.",
      "What This Means to Us": "The EFP award validates that the gap between clinical treatment and daily patient behaviour is a real and recognised problem, and that Perioskoup's approach to bridging it has credibility within the European periodontology community.",
      "The Road to Vienna": "Perioskoup was founded in 2024 by Dr. Anca Laura Constantin (Periodontist & CDO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The first version was built in three months, with the EFP submission prepared in parallel.",
      "What's Next": "Perioskoup is currently in private beta with founding clinics across Romania and the UK, with priority onboarding for periodontology practices. The consumer app will launch on iOS and Android with a founding member waitlist.",
    },
    faqs: [
      { q: "What is the EFP Digital Innovation Award?", a: "The EFP Digital Innovation Award is presented by the European Federation of Periodontology at EuroPerio, recognising innovative digital tools that advance periodontal care. In 2025, 20 submissions from 17 national societies were evaluated." },
      { q: "What award did Perioskoup win?", a: "Perioskoup won 3rd Prize at the EFP Digital Innovation Awards 2025, presented at EuroPerio11 in Vienna. The jury described it as an innovative AI tool supporting both patients and clinicians in managing oral health." },
    ],
  },

  "why-patients-forget-instructions": {
    slug: "why-patients-forget-instructions",
    title: "Why Patients Forget Dental Instructions (And What to Do About It)",
    metaTitle: "Why Patients Forget Dental Instructions | Perioskoup",
    metaDescription: "Research shows patients forget up to 80% of clinical instructions within 24 hours. A periodontist explains why — and how technology is changing this.",
    category: "Clinical Insight",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & Co-founder, Perioskoup",
    date: "2025-10-05",
    readTime: "6 min read",
    excerpt: "Research consistently shows that patients forget up to 80% of what they are told in a clinical consultation within 24 hours. This is not a patient failure — it is a systems failure.",
    body: `
## The Forgetting Curve in Dental Care

In 1885, the German psychologist Hermann Ebbinghaus described what he called the "forgetting curve" — the rate at which newly learned information is lost over time without reinforcement. His research showed that people forget approximately 50% of new information within an hour, 70% within 24 hours, and up to 90% within a week.

More than a century later, this phenomenon is as relevant as ever — and nowhere more consequentially than in healthcare.

Research published in the *Journal of the American Dental Association* found that patients recall only 20–40% of the information provided during a dental consultation. A study in the *British Dental Journal* found that patients who were given oral hygiene instructions during an appointment could recall fewer than half of those instructions when surveyed 24 hours later.

This is not a patient intelligence problem. It is a human memory problem — and it has profound implications for how we deliver dental care.

## Why Clinical Consultations Are Poor Learning Environments

A dental appointment is, from a cognitive science perspective, a terrible place to learn new habits.

**Anxiety impairs memory consolidation.** Dental anxiety affects a significant proportion of the population. Even mild anxiety activates the stress response, which interferes with the hippocampus — the brain structure responsible for converting short-term memories into long-term ones. Patients who are anxious during an appointment are physiologically less able to retain information.

**Information overload.** A typical periodontal consultation involves a diagnosis, an explanation of the condition, a treatment plan, post-procedure instructions, and home care recommendations — all delivered in 30–45 minutes. The human brain can only process a limited amount of new information at once. When that limit is exceeded, retention drops sharply.

**The absence of context.** Instructions given in a clinical setting are disconnected from the environment where they need to be applied. Telling a patient to "use a 0.4mm interdental brush on the lower left quadrant" in a dental chair does not help them remember what to do when they are standing in their bathroom at 10pm.

**No feedback loop.** Traditional dental care provides no mechanism for patients to report on their engagement, ask questions between appointments, or receive reinforcement when they are doing well. Without feedback, motivation and habit formation are much harder to sustain.

## The Consequences of Forgetting

The consequences of poor instruction retention are not trivial. For patients with periodontal disease, the period between appointments is critical. Periodontal disease is a chronic condition that requires consistent daily management. A patient who forgets their home care instructions — or who understands them but cannot maintain them without support — will experience disease recurrence regardless of the quality of their clinical treatment.

This creates a frustrating cycle for clinicians. We invest significant time and expertise in treating patients, only to see the disease return at the next appointment because the home care has broken down. It is not a reflection of the patient's commitment — it is a reflection of the inadequacy of the support system we have traditionally provided.

## What the Research Says About Better Approaches

The evidence on improving patient engagement with health instructions is clear:

**Written materials improve retention** — but only if they are personalised, jargon-free, and given at the right moment. Generic leaflets have minimal impact.

**Repetition and spaced learning** dramatically improve long-term retention. Information encountered multiple times, at spaced intervals, is far more likely to be retained than information encountered once.

**Immediate application** — practising a skill immediately after instruction — significantly improves retention. This is why in-chair brushing instruction is more effective than verbal advice alone.

**Accountability mechanisms** — knowing that someone will check on your progress — significantly improve engagement. This is the basis of health coaching, and it is why patients with a dedicated hygienist who follows up between appointments tend to have better outcomes.

**Technology-mediated reminders** — smartphone notifications, in particular — have been shown in multiple studies to improve habit consistency and health behaviour engagement.

## The Role of Technology

This is precisely the gap that Perioskoup was built to address.

The app does not replace the clinical consultation. It extends it. After a patient's appointment, their periodontist or hygienist can set up a personalised programme in Perioskoup — specific techniques for specific areas, reminders timed to the patient's daily routine, and educational content that reinforces what was discussed in the chair.

The patient receives their instructions not as a one-time verbal briefing, but as a daily companion that reminds, encourages, and tracks their progress. The clinician receives engagement data that allows them to identify patients who are struggling and intervene before the disease recurs.

This is not a technological solution to a clinical problem. It is a clinical solution to a systems problem — the problem of a healthcare model that was designed for acute conditions, not chronic disease management.

## What Clinicians Can Do Now

While technology continues to develop, there are evidence-based strategies that clinicians can implement immediately:

**Limit information per consultation.** Focus on the two or three most important points. Patients who leave with three clear, actionable instructions will retain more than patients who leave with ten.

**Use teach-back.** Ask patients to explain back what they have understood. This identifies gaps in comprehension before the patient leaves the clinic.

**Provide written summaries.** A brief, personalised written summary of the key instructions — in plain language — significantly improves retention.

**Follow up.** A brief phone call or message 48 hours after an appointment, asking how the patient is getting on with their home care, has a disproportionate impact on engagement.

**Acknowledge the difficulty.** Patients who feel judged for not following instructions are less likely to be honest about their engagement. A non-judgmental, supportive approach creates the psychological safety that makes honest reporting — and therefore effective support — possible.

The forgetting curve is not a patient failure. It is a design failure. And like all design failures, it can be fixed.

*Dr. Anca Laura Constantin is a practising periodontist and co-founder of Perioskoup. She has treated hundreds of patients with periodontal disease and has developed Perioskoup specifically to address the engagement gap she observed in clinical practice.*
    `,
    answerCapsules: {
      "The Forgetting Curve in Dental Care": "Research shows patients forget 40\u201380% of medical information immediately after a consultation. In dental care, where instructions are complex and must be applied at home without supervision, this forgetting rate has direct consequences for treatment outcomes.",
      "Why Clinical Consultations Are Poor Learning Environments": "Three factors make dental consultations ineffective for learning: information overload (too much delivered in 30\u201345 minutes), absence of context (instructions given in a clinic but applied at home), and no feedback loop (no mechanism for patients to report progress between visits).",
      "The Consequences of Forgetting": "For periodontal patients, forgotten instructions lead to disease recurrence regardless of treatment quality. The period between appointments is critical for chronic conditions that require consistent daily management.",
      "What the Research Says About Better Approaches": "Evidence-based strategies for improving retention include: repetition and spaced learning, immediate application of skills, accountability mechanisms, and technology-mediated reminders such as smartphone notifications.",
      "The Role of Technology": "Perioskoup extends clinical consultations into daily life by delivering personalised instructions as ongoing reminders, tracking patient progress, and providing clinicians with engagement data to identify struggling patients before disease recurs.",
      "What Clinicians Can Do Now": "Clinicians can improve instruction retention by simplifying language, using visual aids, employing teach-back methods, providing written summaries, following up within 48 hours, and acknowledging the difficulty of behaviour change.",
    },
    faqs: [
      { q: "Why do patients forget dental instructions?", a: "Patients forget 40\u201380% of clinical information immediately due to information overload, lack of context (instructions given in clinic but applied at home), and absence of feedback loops between appointments." },
      { q: "How can dentists improve patient instruction retention?", a: "Dentists can improve retention by simplifying language, using visual aids, employing teach-back methods, providing written summaries, following up within 48 hours, and using technology-mediated reminders." },
      { q: "How does technology help patients remember dental care instructions?", a: "Apps like Perioskoup convert one-time verbal instructions into daily personalised reminders, track patient progress, and provide clinicians with engagement data to identify patients who need additional support." },
    ],
  },

  "building-the-bridge-perioskoup-story": {
    slug: "building-the-bridge-perioskoup-story",
    title: "Building the Bridge: The Perioskoup Story",
    metaTitle: "The Perioskoup Story | Building the Bridge",
    metaDescription: "How a periodontist, a full-stack engineer, and an AI specialist decided to build the dental companion they always wished existed. The Perioskoup origin story.",
    category: "Founder Story",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & Co-founder, Perioskoup",
    date: "2025-09-01",
    readTime: "7 min read",
    excerpt: "Every startup begins with a problem that someone couldn't stop thinking about. For Perioskoup, that problem was the gap between the dental chair and the patient's daily life.",
    body: `
## The Appointment That Started Everything

It was an ordinary Tuesday afternoon in my practice in Bucharest. I had just finished a periodontal maintenance appointment with a patient I had been treating for three years. Her disease had been well-controlled for the first two years — her pocket depths were stable, her bone levels were holding, her home care was good.

But at this appointment, something had changed. Her gums were inflamed again. The pocket depths had increased. When I asked about her home care, she was honest: she had been going through a difficult period at work, her routine had slipped, and she had stopped using her interdental brushes consistently.

Three months of disease recurrence, undoing two years of careful management.

I sat with her for a few minutes after the appointment, trying to figure out what I could have done differently. I had given her excellent clinical treatment. I had explained her condition thoroughly. I had provided written instructions. And yet, without the right support structure between appointments, the disease had come back.

That evening, I called Eduard.

## The Team

I had known Eduard Ciugulea for several years through mutual friends. He had a background in full-stack engineering and had been working on consumer applications for most of his career. When I described the problem — the gap between clinical care and daily life — he immediately understood it not as a dental problem, but as a product problem.

"You're describing a habit formation challenge," he said. "The clinical knowledge exists. The patient motivation exists. What's missing is the infrastructure to connect them."

We brought in Petrica Nancu, an AI specialist with experience in health and wellness applications, a few months later. The three of us spent the first several weeks not building anything — just mapping the problem.

## The Problem We Were Actually Solving

The more we mapped it, the more we realised that the problem was not unique to periodontology. It was a fundamental challenge in chronic disease management: the gap between what happens in a clinical setting and what happens in a patient's daily life.

In periodontology specifically, this gap has several dimensions:

**The knowledge gap.** Patients often leave appointments without a clear understanding of their condition, its severity, or what they need to do about it. Clinical language is not patient language.

**The instruction gap.** Even when patients understand their condition, the instructions they receive are often too generic to be actionable. "Brush better" is not a useful instruction.

**The motivation gap.** Chronic disease management requires sustained motivation over months and years. Clinical appointments, spaced months apart, provide insufficient motivational reinforcement.

**The feedback gap.** Patients have no way of knowing whether their home care is working. Without feedback, it is very difficult to maintain behaviour change.

**The communication gap.** When patients have questions between appointments, they have no easy way to get answers. And when clinicians want to check on a patient's progress, they have no mechanism to do so without scheduling an additional appointment.

Perioskoup was designed to address all five of these gaps.

## What We Built

The first version of Perioskoup was built in three months. It was deliberately simple: a patient-facing app that translated clinical recommendations into a personalised daily programme, with reminders, tracking, and educational content.

The clinician-facing dashboard came later — a tool that allows periodontists and dental hygienists to set up patient programmes, monitor engagement, and send targeted guidance between appointments.

We made several deliberate decisions early on that shaped the product:

**The clinician stays in control.** Perioskoup does not diagnose. It does not make clinical recommendations independently. Everything in the patient's programme is set by their clinician, based on a real examination. The AI personalises the delivery and timing of those recommendations — it does not generate them.

**Privacy by design.** Patient health data is among the most sensitive data that exists. We built GDPR requirements into the architecture from day one, not as an afterthought. All data is stored in EU-based servers, encrypted at rest and in transit.

**SaMD-safe language.** We are acutely aware of the regulatory landscape for software as a medical device. Perioskoup is designed to support clinical care, not to replace it. Every piece of content in the app is reviewed against EU MDR and FDA SaMD guidance.

## The EFP Award

In May 2025, we submitted Perioskoup to the EFP Digital Innovation Awards at EuroPerio11 in Vienna. We were selected as one of three prize winners from 20 submissions across 17 national societies.

The award was significant not just as validation, but as an introduction. At EuroPerio11, we met periodontists from across Europe who described the same challenge we had been working to solve. The conversations confirmed that the problem was real, widespread, and urgent.

## Where We Are Now

We are currently in private beta with a small group of founding clinics. We are onboarding new practices on a rolling basis, with priority given to periodontology and dental hygiene practices.

The waitlist for patients is open. Founding members will receive priority access, founding pricing, and a direct line to the team.

We are not trying to replace the dentist. We are trying to make every dentist more effective — by extending their reach into the 8,700 hours between annual appointments, and giving patients the support they need to actually follow through.

The bridge between the chair and the home. That's what we're building.

*Dr. Anca Laura Constantin is a practising periodontist and co-founder of Perioskoup. She is based in Bucharest, Romania.*
    `,
    answerCapsules: {
      "The Appointment That Started Everything": "Perioskoup was born from a clinical observation: patients who received excellent periodontal treatment still experienced disease recurrence because they lacked support for daily home care between appointments. The gap between the dental chair and daily life was the core problem.",
      "The Team": "Perioskoup was founded by three people with complementary expertise: Dr. Anca Laura Constantin (periodontist and CDO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The combination of clinical, engineering, and AI expertise shaped the product.",
      "The Problem We Were Actually Solving": "The real problem was not a lack of dental information but a lack of personalised, ongoing support. Patients needed daily guidance adapted to their specific condition, delivered at the right time, with feedback loops that reinforced good habits.",
      "What We Built": "Perioskoup consists of a patient-facing app (personalised daily programmes, reminders, tracking, education) and a clinician dashboard (programme setup, engagement monitoring, targeted guidance). The clinician stays in control; AI personalises delivery.",
      "The EFP Award": "Winning 3rd Prize at the EFP Digital Innovation Awards 2025 validated the approach and opened conversations with periodontists across Europe who confirmed the same clinical challenge.",
      "Where We Are Now": "Perioskoup is in private beta with founding clinics in Romania and the UK. The patient waitlist is open, with founding members receiving priority access and founding pricing.",
    },
    faqs: [
      { q: "What is Perioskoup?", a: "Perioskoup is a dental companion app that bridges the gap between dental appointments. It translates clinical recommendations into personalised daily programmes with reminders, tracking, and educational content for patients, while giving clinicians engagement data." },
      { q: "Who founded Perioskoup?", a: "Perioskoup was founded by Dr. Anca Laura Constantin (Periodontist & CDO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The idea emerged from Dr. Anca's clinical practice." },
      { q: "Is Perioskoup available yet?", a: "Perioskoup is currently in private beta with founding clinics in Romania and the UK. A patient waitlist is open, with founding members receiving priority access and founding pricing when the app launches on iOS and Android." },
    ],
  },
};

function useReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".reveal, .reveal-scale");
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function renderBody(body: string, capsules: Record<string, string> = {}) {
  const lines = body.trim().split("\n");
  const elements: ReactElement[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} style={{ height: "16px" }} />);
    } else if (trimmed.startsWith("## ")) {
      const heading = trimmed.slice(3);
      elements.push(
        <h2 key={key++} style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#F5F9EA", marginTop: "48px", marginBottom: "16px", lineHeight: 1.05 }}>
          {heading}
        </h2>
      );
      // Answer capsule after H2
      if (capsules[heading]) {
        elements.push(
          <div key={key++} style={{ borderLeft: "3px solid #C0E57A", background: "rgba(192,229,122,0.06)", padding: "16px 20px", marginBottom: "24px", borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "15px", fontWeight: 700, color: "#F5F9EA", lineHeight: 1.65, margin: 0 }}>
              {capsules[heading]}
            </p>
          </div>
        );
      }
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#F5F9EA", marginTop: "32px", marginBottom: "12px", lineHeight: 1.1 }}>
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.indexOf("**", 2) === trimmed.length - 2) {
      elements.push(
        <p key={key++} style={{ fontFamily: "Gabarito, sans-serif", fontSize: "16px", fontWeight: 700, color: "#F5F9EA", marginBottom: "8px" }}>
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} style={{ fontFamily: "Gabarito, sans-serif", fontSize: "16px", color: "#8C9C8C", lineHeight: 1.7, marginBottom: "8px", paddingLeft: "8px" }}>
          {trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, (_, t) => t)}
        </li>
      );
    } else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} style={{ borderLeft: "3px solid #C0E57A", paddingLeft: "20px", margin: "24px 0", fontFamily: "Gabarito, sans-serif", fontSize: "17px", fontStyle: "italic", color: "#F5F9EA", lineHeight: 1.65 }}>
          {trimmed.slice(2)}
        </blockquote>
      );
    } else if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
      elements.push(
        <p key={key++} style={{ fontFamily: "Gabarito, sans-serif", fontSize: "14px", color: "#8C9C8C", fontStyle: "italic", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #234966" }}>
          {trimmed.slice(1, -1)}
        </p>
      );
    } else {
      // Parse inline bold
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <p key={key++} style={{ fontFamily: "Gabarito, sans-serif", fontSize: "17px", color: "#8C9C8C", lineHeight: 1.75, marginBottom: "16px" }}>
          {parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={i} style={{ color: "#F5F9EA", fontWeight: 700 }}>{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    }
  }
  return elements;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const article = ARTICLES[slug];
  useReveal();

  // Meta tags handled by react-helmet-async Helmet component below

  if (!article) {
    return (
      <div style={{ background: "#0A171E", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ paddingTop: "160px", paddingBottom: "120px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Dongle, sans-serif", fontSize: "80px", color: "#F5F9EA" }}>Article not found</h1>
          <Link href="/blog" className="btn-primary" style={{ marginTop: "32px", display: "inline-flex" }}>← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const authorSchema = article.author === "Dr. Anca Laura Constantin"
    ? {
        "@type": "Person",
        "@id": "https://perioskoup.com/#anca-constantin",
        "name": article.author,
        "jobTitle": article.authorRole,
        "worksFor": { "@id": "https://perioskoup.com/#organization" },
        "sameAs": [
          "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
        ]
      }
    : {
        "@type": "Person",
        "name": article.author,
        "jobTitle": article.authorRole,
        "worksFor": { "@id": "https://perioskoup.com/#organization" }
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.metaDescription,
    "author": authorSchema,
    "publisher": {
      "@id": "https://perioskoup.com/#organization"
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "url": `https://perioskoup.com/blog/${article.slug}`,
    "image": OG_IMAGE,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://perioskoup.com/blog/${article.slug}` }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://perioskoup.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://perioskoup.com/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://perioskoup.com/blog/${article.slug}` }
    ]
  };

  const faqJsonLd = article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://perioskoup.com/blog/${article.slug}`} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={`https://perioskoup.com/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="article:published_time" content={`${article.date}T00:00:00Z`} />
        <meta property="article:author" content={article.author} />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content="/images/og-image.jpg" />
        <meta name="twitter:creator" content="@perioskoup" />
      </Helmet>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <Navbar />

      {/* Hero */}
      <section id="main-content" style={{ paddingTop: "120px", paddingBottom: "64px", background: "#0A171E", borderBottom: "1px solid #234966", position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Breadcrumb */}
          <nav className="reveal" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <Link href="/" style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#8C9C8C", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#234966" }}>/</span>
            <Link href="/blog" style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#8C9C8C", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "#234966" }}>/</span>
            <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#C0E57A" }}>{article.category}</span>
          </nav>

          {/* Category badge */}
          <div className="reveal" style={{ marginBottom: "20px" }}>
            <span className="label-tag">{article.category}</span>
          </div>

          <h1 className="display-md reveal" style={{ transitionDelay: "0.1s", marginBottom: "24px" }}>
            {article.title}
          </h1>

          <p className="body-lg reveal" style={{ transitionDelay: "0.15s", marginBottom: "40px", maxWidth: "680px" }}>
            {article.excerpt}
          </p>

          {/* Author + meta */}
          <div className="reveal" style={{ transitionDelay: "0.2s", display: "flex", alignItems: "center", gap: "16px", paddingTop: "24px", borderTop: "1px solid #234966" }}>
            <img src={article.authorImg} alt={article.author} loading="lazy" width={48} height={48} style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "15px", fontWeight: 700, color: "#F5F9EA" }}>{article.author}</p>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#8C9C8C" }}>{article.authorRole}</p>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#8C9C8C" }}>{new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#C0E57A" }}>{article.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ paddingTop: "64px", paddingBottom: "120px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="reveal">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {renderBody(article.body, article.answerCapsules)}
            </ul>
          </div>

          {/* Back to blog */}
          <div style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid #234966" }}>
            <Link href="/blog" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#050C10", padding: "80px 0", borderTop: "1px solid #234966" }}>
        <div className="container" style={{ maxWidth: "600px", textAlign: "center" }}>
          <h2 className="display-sm reveal" style={{ marginBottom: "16px" }}>
            Ready to take control of your dental health?
          </h2>
          <p className="body-lg reveal" style={{ transitionDelay: "0.1s", marginBottom: "32px" }}>
            Join the Perioskoup waitlist and be first when we launch.
          </p>
          <div className="reveal" style={{ transitionDelay: "0.2s", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/waitlist" className="btn-primary">
              Join the Waitlist
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/blog" className="btn-ghost">More Articles</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
