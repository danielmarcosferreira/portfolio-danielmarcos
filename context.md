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
4. **StackSection** (`#stack`)
5. **SiteFooter**

There is **no** Work / project card grid on the home page. Employer stories live only in the experience timeline.

```text
About → Experience (professional) → Education (subsection) → Stack → Footer
```

---

## Section anchors & nav

| Anchor | Section | Nav key (`messages/*/nav`) |
|--------|---------|----------------------------|
| `#top` | Hero / About | `about` |
| `#experience` | Experience (includes professional jobs) | `experience` |
| `#education` | Education subsection inside experience | `education` |
| `#stack` | Stack | `stack` |

Nav component: [`src/components/sections/site-navigation.tsx`](src/components/sections/site-navigation.tsx). Brand monogram: **DM**.

---

## Internationalization (next-intl)

- **Locales:** `en` (default), `it`, `pt` — see [`src/i18n/routing.ts`](src/i18n/routing.ts)
- **URLs:** always prefixed (`/en`, `/it`, `/pt`)
- **Messages:** [`messages/en.json`](messages/en.json), [`messages/it.json`](messages/it.json), [`messages/pt.json`](messages/pt.json)
- **Rule:** Any user-visible string goes in **all three** JSON files under the same keys. Never hardcode copy in components except structural/UI labels that are already wired through `useTranslations` / `getTranslations`.
- **Namespaces in use:** `metadata`, `skipLink`, `nav`, `hero`, `experience`, `stack`, `footer`

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
| Projects | [`src/data/projects.ts`](src/data/projects.ts) | **Empty array** — reserved for future case studies; not used on home |
| Projects i18n | [`src/lib/projects-i18n.ts`](src/lib/projects-i18n.ts) | Only if projects are reintroduced |

Legacy files (not on home page): [`work-section.tsx`](src/components/sections/work-section.tsx), [`project-card.tsx`](src/components/project-card.tsx), [`projects-source.ts`](src/lib/projects-source.ts). Do not wire them back without an explicit product decision.

---

## Key components

| Component | Role |
|-----------|------|
| [`portfolio-hero.tsx`](src/components/sections/portfolio-hero.tsx) | Name, role, profile, tech chips, contact links, CTA to `#experience` |
| [`experience-timeline.tsx`](src/components/sections/experience-timeline.tsx) | Professional timeline (emphasized), then education |
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
- **Animations:** Framer Motion only where already used (e.g. project cards if re-enabled); do not add heavy motion by default.
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
- Case-study **projects** grid (would need `projects.ts` + `projects.*` messages + home page wiring)

---

## Quick file map

```text
messages/           → all UI copy (en, it, pt)
src/app/[locale]/   → page + layout + metadata
src/data/           → experience IDs, projects (empty)
src/lib/            → experience-i18n, projects-i18n, utils, tech-icons
src/components/sections/ → page sections
src/i18n/           → routing, request, navigation helpers
src/proxy.ts        → locale middleware
context.md          → this file (read first)
AGENTS.md           → Next.js version warning + pointer here
```
