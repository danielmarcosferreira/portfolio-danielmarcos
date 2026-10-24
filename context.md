# Portfolio — agent context

**Read this file before any change** to this repository (features, copy, layout, i18n, or data). It is the single source of truth for how the site is structured and what must stay consistent.

---

## Purpose

Editorial, single-page portfolio for **Daniel Marcos Ferreira** — mid-level full-stack developer. Content is driven by the real CV (**CV-Daniel**), not fictional case studies. The site is static-first, multilingual, and optimized for recruiters and hiring managers.

---

## Identity & copy (do not drift)

| Field | Value |
|--------|--------|
| Display name | **Daniel Marcos Ferreira** (not “Daniel Marcos Ferreira Ferreira”) |
| Role | **Mid-level Full-Stack Developer** (EN); localized equivalents in IT/PT |
| Location | **Ivrea – Torino, Italy** |
| Nationality / languages | Italian and Brazilian by birth; fluent **Portuguese** and **English** |
| Email | `daniel.marcos.1038@gmail.com` |
| Phone | `+39 352 086 5013` (`tel:+393520865013`) |
| LinkedIn | `https://br.linkedin.com/in/danielmarcosdev` |
| Employers | **FIGTREE** (Aug 2023 – present), **NOVAWARE** (Jul 2025 – present), **ORBWARE** (Dec 2024 – Jul 2025, junior front-end) |
| Do not add | NOVWARE (old spelling), fictional “Atlas/Pulse” projects, “Tech Lead” as primary title unless CV changes |

When updating professional copy, align bullets and tech lines with the CV. **IT** profile text may stay close to the Italian CV; **EN** and **PT** must be proper translations, not placeholders.

---

## Page structure (home)

Order in [`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx):

1. **SiteNavigation** (sticky)
2. **PortfolioHero** — About / presentation (`#top`)
3. **ExperienceTimeline** — jobs first, then education (`#experience`, `#education`)
4. **ProjectsSection** (`#projects`) — carousel of live apps
5. **StackSection** (`#stack`)
6. **SiteFooter**

```text
About → Experience (professional) → Education (subsection) → Projects → Stack → Footer
```

---

## Section anchors & nav

| Anchor | Section | Nav key (`messages/*/nav`) |
|--------|---------|----------------------------|
| `#top` | Hero / About | `about` |
| `#experience` | Experience (includes professional jobs) | `experience` |
| `#education` | Education subsection inside experience | `education` |
| `#projects` | Projects carousel | `projects` |
| `#stack` | Stack | `stack` |

Nav component: [`src/components/sections/site-navigation.tsx`](src/components/sections/site-navigation.tsx). Brand monogram: **DM**.

---

## Internationalization (next-intl)

- **Locales:** `en` (default), `it`, `pt` — see [`src/i18n/routing.ts`](src/i18n/routing.ts)
- **URLs:** always prefixed (`/en`, `/it`, `/pt`)
- **Messages:** [`messages/en.json`](messages/en.json), [`messages/it.json`](messages/it.json), [`messages/pt.json`](messages/pt.json)
- **Rule:** Any user-visible string goes in **all three** JSON files under the same keys. Never hardcode copy in components except structural/UI labels that are already wired through `useTranslations` / `getTranslations`.
- **Namespaces in use:** `metadata`, `skipLink`, `nav`, `hero`, `experience`, `projects`, `stack`, `footer`

### Experience entry IDs

Defined in [`src/data/experience.ts`](src/data/experience.ts). Message keys use **underscores** (`job_figtree`), mapped from kebab IDs (`job-figtree`) in [`src/lib/experience-i18n.ts`](src/lib/experience-i18n.ts).

**Education:** `degree-information-systems`, `bootcamp-driven`, `degree-civil-engineering`

**Professional:** `job-novaware`, `job-orbware`, `job-figtree` (newest first in [`experience.ts`](src/data/experience.ts))

Each entry may include: `period`, `title`, `organization`, `description`, optional `bullets[]`, optional `techLine`.

---

## Data layer

| Data | File | Notes |
|------|------|--------|
| Experience IDs | [`src/data/experience.ts`](src/data/experience.ts) | Order = display order |
| Localized experience | [`src/lib/experience-i18n.ts`](src/lib/experience-i18n.ts) | `getLocalizedPathSections(locale)` |
| Projects | [`src/data/projects.ts`](src/data/projects.ts) | Order = carousel order. Fields: `id`, `kind` (`employer` / `freelance` / `personal`), `imageSrc`, `tech[]`, `liveUrl` |
| Localized projects | [`src/lib/projects-i18n.ts`](src/lib/projects-i18n.ts) | `getLocalizedProjects(locale)`; message keys use underscores (`figtree_student_platform`) under `projects.items.*` |

### Projects (`projects.items.*`)

`figtree-student-platform` (employer), `incorpora-mf` (employer), `ciway` (employer), `organiza-ai` (freelance), `debt-tracker` (personal). Stacks (from the user): Figtree — React.js, TypeScript, JavaScript, Node.js, Firebase, MongoDB, Styled Components, REST API; IncorporaMF & CIWAY — Next.js, NestJS, TypeScript, Tailwind CSS, REST API; Organiza AI & DebtTracker — Next.js, JavaScript, Firebase, Styled Components, REST API. Chips list technologies only (no soft skills like Scrum/Agile). Cards only show a "Employer project" label — the CV names FIGTREE, NOVAWARE and ORBWARE, so do not attach a company name to IncorporaMF / CIWAY unless the user confirms it.

Screenshots in [`public/projects/`](public/projects/) are real WebP captures (desktop ~1920px wide; `debt-tracker` is a portrait phone screenshot flagged `mobile: true` for extra padding and a shadow). The carousel frame is 12:7 to match the desktop captures, and every image uses `object-contain`, so nothing is cropped — keep new screenshots close to that ratio. To swap one, convert it to WebP in that folder and update `imageSrc` in `projects.ts`. To add a project: entry in `projects.ts` + `projects.items.<id_with_underscores>` (`title`, `description`, `imageAlt`) in all three JSON files.

---

## Key components

| Component | Role |
|-----------|------|
| [`portfolio-hero.tsx`](src/components/sections/portfolio-hero.tsx) | Name, role, profile, tech chips, contact links, CTA to `#experience` |
| [`experience-timeline.tsx`](src/components/sections/experience-timeline.tsx) | Professional timeline (emphasized), then education |
| [`projects-section.tsx`](src/components/sections/projects-section.tsx) | Server section: heading + localized data for the carousel |
| [`projects-carousel.tsx`](src/components/projects-carousel.tsx) | Client carousel: CSS scroll-snap row, prev/next buttons, arrow keys, no autoplay |
| [`stack-section.tsx`](src/components/sections/stack-section.tsx) | Three columns: `frontend`, `backend`, `data` |
| [`site-footer.tsx`](src/components/sections/site-footer.tsx) | Name, contact links, tagline |
| [`locale-switcher.tsx`](src/components/locale-switcher.tsx) | EN / IT / PT |
| [`theme-provider`](src/components/providers/theme-provider.tsx) | Light / dark via `next-themes` |

Root layout passes through children only: [`src/app/layout.tsx`](src/app/layout.tsx). Locale layout owns `<html>`, fonts, `NextIntlClientProvider`: [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx).

---

## Stack section content (from CV)

- **frontend:** React, Next.js, TypeScript, TailwindCSS, HTML/CSS  
- **backend:** Node.js, NestJS, Express.js, REST APIs  
- **data:** PostgreSQL, MongoDB, Firebase, Git, Scrum, clean code, code review  

---

## Design & UX conventions

- **Aesthetic:** Editorial — serif headings (`font-heading`), mono labels (`font-mono`), restrained borders, muted backgrounds on alternating sections.
- **Theming:** CSS variables in [`src/app/globals.css`](src/app/globals.css); class-based dark mode.
- **Accessibility:** Skip link, section `aria-labelledby`, focus rings on interactive elements, `sr-only` step labels on timeline.
- **Animations:** Framer Motion only where already used; do not add heavy motion by default. The projects carousel uses native CSS scroll-snap and shared hover classes, no autoplay.
- **Images:** Hero has no stock spotlight image; experience is text-first.

---

## Tech stack (project)

- **Next.js 16** (App Router) — read `node_modules/next/dist/docs/` before assuming older Next APIs ([`AGENTS.md`](AGENTS.md))
- **React 19**, **TypeScript**, **Tailwind CSS 4**
- **next-intl** for i18n; middleware in [`src/proxy.ts`](src/proxy.ts) (geo hint for IT/BR → locale cookie)
- **shadcn/ui** + Radix primitives under [`src/components/ui/`](src/components/ui/)
- **Optional:** Supabase stub in [`src/lib/supabase.ts`](src/lib/supabase.ts) — not required for static portfolio

---

## Commands

```bash
npm run dev    # local dev
npm run build  # production build (run after substantive changes)
npm run lint   # ESLint
```

After copy or structure changes, verify `/en`, `/it`, `/pt` and ensure no `MISSING_MESSAGE` console errors.

---

## Change checklist for agents

1. Read this file and the relevant section component + all three `messages/*.json` keys.
2. Keep **Daniel Marcos Ferreira**, **Italy location**, and **FIGTREE + NOVAWARE + ORBWARE** unless the user supplies a new CV.
3. Update **en, it, pt** together for any new or renamed message keys.
4. If adding experience entries, update `experience.ts` IDs **and** all locale JSON `experience.entries.*`.
5. Prefer minimal diffs; match existing naming, imports (`@/`), and server-component patterns (`setRequestLocale`, `getTranslations`).
6. Run `npm run build` and `npm run lint` before considering the task done.
7. Do **not** edit plan files in `.cursor/plans/` unless the user asks.

---

## Optional future work (not implemented)

- `public/cv-daniel.pdf` + “Download CV” button in hero
- Profile photo in About section
- Repo links per project (add optional `repoUrl` to `projects.ts` + a second button in the card)

---

## Quick file map

```text
messages/           → all UI copy (en, it, pt)
src/app/[locale]/   → page + layout + metadata
src/data/           → experience IDs, projects
src/lib/            → experience-i18n, projects-i18n, interactive-hover, utils
src/components/sections/ → page sections
src/i18n/           → routing, request, navigation helpers
src/proxy.ts        → locale middleware
context.md          → this file (read first)
AGENTS.md           → Next.js version warning + pointer here
```
