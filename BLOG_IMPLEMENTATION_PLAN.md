# Blog Extension Implementation Plan: Amen Tsehaie

## Executive Summary

This plan extends the existing Amen Tsehaie portfolio with a dedicated blog at `https://amentsehaie.vercel.app/blog`. The current Vite + React + TypeScript + Tailwind CSS setup remains in place for simplicity. The blog will be implemented as a client-routed section of the existing application, with typed local content, article pages, category pages, responsive media, technical SEO, and measurable reader actions.

The blog has two purposes:

- **Professional:** show Amen's interests, learning process, audio knowledge, and personal development through useful articles.
- **Academic:** provide concrete evidence for the DIP rubric: strategy, CMS research, UX decisions, content quality, technical SEO, analytics, and reflection.

**Confirmed project decisions:**

- Production URL: `https://amentsehaie.vercel.app/`
- Architecture: keep the current Vite/React setup; do not migrate to Next.js for this implementation.
- Content: personal-life details may be included when they are relevant and approved, but never publish sensitive information such as an exact home address, private contact details, or information about other people without permission.
- Affiliate links: not required; do not implement affiliate tracking.
- Email: reuse the existing EmailJS component and configuration rather than creating a second newsletter or contact integration.

**Timeline:** 5 implementation phases aligned with Weeks 4-8 | **Primary route:** `/blog` | **Rendering:** Vite SPA with client-side routing and Vercel fallback

## Final Result

At the end of this plan, the portfolio will have:

- the existing portfolio at `/`;
- a **Blog** tab in the desktop and mobile header;
- a blog hub at `/blog`;
- individual articles at `/blog/[slug]`;
- category pages at `/blog/category/[category]`;
- five assessment-ready articles and an optional sixth article;
- breadcrumbs, table of contents, reading progress, related articles, and responsive media;
- page titles, descriptions, canonical URLs, Open Graph tags, JSON-LD, sitemap, and robots instructions;
- consent-aware analytics for page views, 75% scroll depth, and cheat-sheet downloads;
- evidence for the slide deck and IMFC explanations.

**Project:** Amen Tsehaie personal portfolio
**Repository:** React 19 + TypeScript + Vite + Tailwind CSS
**Primary URL:** `/blog`
**Planning date:** 2026-09-29
**Academic context:** Digital Marketing Plan I (MINRBSDM25), Weeks 4-8

## 1. Purpose and Definition of Done

The portfolio currently presents a single-page experience. This extension adds a real blog area with its own URL path, navigation entry, article pages, categories, measurable calls to action, and evidence that can be used in the DIP presentation.

The work is complete when all of the following are true:

- `/` still loads the existing portfolio without broken section navigation.
- `/blog` is a separate blog hub and is reachable from the global header as **Blog**.
- `/blog/[slug]` loads a specific article on a direct visit and after a refresh.
- `/blog/category/[category]` filters articles by one of four approved pillars.
- Articles contain real, user-focused content rather than placeholder paragraphs.
- Each article has a title, author, date, category, summary, canonical URL, Open Graph data, and structured data.
- Responsive article layouts include breadcrumbs, a table of contents where useful, reading progress, and accessible media.
- At least one comparison table, two responsive diagrams, and one downloadable cheat sheet are implemented as working assets.
- Analytics events are tested on the deployed Vercel URL, with privacy consent handled before optional analytics loads.
- `sitemap.xml` and `robots.txt` are reachable at the domain root.
- The final build, lint check, direct-route checks, accessibility checks, and Lighthouse evidence are recorded.
- The implementation has matching evidence for Sections A-E and the IMFC slide pairs.

## 2. Verified Starting Point

These facts were observed in the repository on 2026-09-27:

| Area | Current state | Consequence for the plan |
|---|---|---|
| Framework | React 19, TypeScript, Vite 7 | The app is not currently a Next.js app and has no server-rendered route metadata. |
| Entry point | `src/main.tsx` renders one `App` component | Routing must be introduced without replacing the existing portfolio composition accidentally. |
| Current app | `src/App.tsx` renders `Header`, portfolio sections, and `Footer` | The existing one-page experience must remain the home route. |
| Navigation | `src/components/layout/Header.tsx` contains hash links and mobile navigation | Blog needs a real path link and a mobile-menu entry; hash scrolling should remain for home sections. |
| Styling | Tailwind CSS with dark charcoal and electric blue/cyan theme | Blog should extend the visual language, not introduce a disconnected design system. |
| Fonts | Tailwind `sans` is Helvetica/Arial/sans-serif | Choose any new editorial font only after checking licensing, loading cost, and visual fit. |
| Dependencies | Framer Motion, Lucide, React Hook Form, EmailJS and intersection observer are installed | Reuse existing packages where appropriate; do not add a CMS dependency before the architecture decision. |
| Content | No blog content model or route is present | Create typed local content first; migration to a CMS must not be required to publish the assessment content. |
| Public assets | `public/` contains the logo and Vite asset | New public assets, downloadable files, and SEO files must be added deliberately. |
| Deployment config | `vite.config.ts` only enables the React plugin | Vercel route fallback, cache behavior, and environment variables still need to be verified. |

### Important correction to the supplied architecture

The supplied plan describes a Next.js/MDX architecture, but the repository currently uses Vite. The project will stay with Vite to keep the implementation manageable and preserve the existing portfolio. This means route metadata is updated in the browser and must be verified on the deployed site. The CMS comparison must clearly describe this actual custom Vite/Vercel content architecture, not a Next.js system that was never deployed.

## 3. Product and Content Scope

### 3.1 Audience and purpose

The blog should show Amen's development as an audio-focused creator and professional. It is not only a collection of tutorials. Each article should combine a useful practical lesson with a small, honest personal perspective: what was difficult, what was learned, what is being improved, and what the reader can try next.

| Persona | Need | Content angle | Funnel stage |
|---|---|---|---|
| Bedroom Producer Ben | Affordable guitar recording and low latency | Budget gear, setup decisions, repeatable home-recording steps | Awareness |
| Sanctuary Sam | Clear guidance for volunteer church sound operators | Practical mixing, feedback prevention, gain staging | Problem solving / consideration |
| DIY Mastering Dan | Better-sounding mixes with accessible tools | EQ, dynamics, loudness, and decisions that can be applied immediately | Application / decision |

Do not invent personal achievements, equipment ownership, analytics results, or professional claims. Mark any proposed personal detail as a content question and confirm it before publishing.

### 3.2 Four category pillars

Use stable slugs so links and analytics remain consistent:

1. `guitar-craft` - playing, practice, tone, and the learning process.
2. `home-recording` - interfaces, microphones, room setup, and tracking.
3. `mixing-mastering` - EQ, compression, balance, loudness, and revisions.
4. `church-audio` - live sound, volunteers, feedback, and practical service workflows.

### 3.3 Initial editorial backlog

Publish the first five articles in the assessment window. Treat the sixth article as a planned extension unless the course requires it earlier.

| # | Working title | Category | Persona | Funnel | Required proof |
|---|---|---|---|---|---|
| 1 | The $150 Home Studio: Essential Gear for Self-Taught Guitarists | Home Recording | Ben | Awareness | 1,000+ words, interactive comparison table, two responsive diagrams, Open Graph preview |
| 2 | Church Sound 101: A Beginner's Survival Guide to Mixing Sunday Service | Church Audio | Sam | Problem solving | Gain-staging diagram, low-cut recipe, downloadable cheat sheet, download event |
| 3 | Acoustic vs. Electric: How to Record Clean Guitar Tracks at Home | Guitar Craft / Home Recording | Ben | Consideration | Decision guide, recording workflow, UTM-ready distribution link |
| 4 | Taming the Mud: Four Subtractive EQ Fixes to Clean Up Your Mix | Mixing & Mastering | Dan | Consideration | Before/after audio or visual explanation, EQ curve asset, actionable checklist |
| 5 | How to Eliminate Live Feedback in Church Without Ruining Vocal Tone | Church Audio | Sam | Application | Troubleshooting flow, safe diagnostic order, practical church context |
| 6 | From Bedroom Mix to Streaming: A Beginner's Three-Step Home Mastering Chain | Mixing & Mastering | Dan | Decision | Backlog item unless the delivery schedule requires it |

### 3.4 Article acceptance checklist

Every published article must have:

- a reader problem stated in the introduction;
- a clear audience and search intent;
- an accurate title, slug, excerpt, category, author, and publication date;
- headings that support scanning;
- at least one concrete action or example;
- internal links to the blog hub, a category, and a related article where available;
- a personal reflection that is true and approved;
- image alt text that describes the information conveyed;
- source notes for claims, product specifications, or safety advice;
- a final call to action such as reading a related article, downloading the cheat sheet, or contacting Amen.

## 4. URL and Navigation Contract

The following URL contract should not change after content starts being distributed:

| Route | Purpose | Expected rendering |
|---|---|---|
| `/` | Existing portfolio | Existing one-page sections |
| `/blog` | Blog hub, featured post, categories, article index | Blog layout |
| `/blog/[slug]` | Full article | Article layout with metadata |
| `/blog/category/[category]` | Category landing page | Filtered article list and category description |
| `/sitemap.xml` | Search-engine URL index | Valid XML |
| `/robots.txt` | Crawler directives and sitemap reference | Plain text |

Navigation rules:

- Add **Blog** to the desktop header and mobile menu.
- A click from `/` to Blog must use `/blog`, not a hash fragment.
- The logo continues to return to the portfolio home route.
- Article breadcrumbs must link back to `/blog` and the relevant category.
- All internal links must work with keyboard navigation and direct browser refreshes.

## 5. Architecture Decision Gate

Complete this gate before implementing article pages. The decision is already made: use Option A. Record the decision and the evidence in the project notes and presentation.

### Option A: Stay with Vite and add client-side routing

Implementation shape:

- add `react-router-dom`;
- render the current portfolio at `/` and blog pages in route components;
- add a Vercel rewrite so unknown application routes serve the SPA entry;
- generate a static `sitemap.xml` and `robots.txt` during the build or maintain them in `public/`;
- implement metadata in the document at route change time;
- test social previews carefully because crawlers may not execute the application before reading metadata.

Advantages: smallest migration, keeps the existing app intact, fastest route to a working assessment prototype.

Risks: weaker server-side SEO and social previews, route metadata is runtime-dependent, and Vite has no built-in dynamic route handlers.

### Option B: Migrate to Next.js with MDX or typed content

Implementation shape:

- move the portfolio into the Next.js app structure;
- implement `/blog`, `/blog/[slug]`, and `/blog/category/[category]` as file-system routes;
- use static generation for known articles;
- use `generateMetadata` for title, description, canonical, and Open Graph values;
- use route handlers or static generation for `sitemap.xml` and `robots.txt`;
- keep content in MDX or a typed content module under version control.

Advantages: stronger route-level metadata, static generation, easier JSON-LD placement, and closer alignment with the supplied Next.js architecture.

Risks: migration can consume assessment time, existing styling and asset imports may require fixes, and it introduces a framework change that must be documented and tested.

### Confirmed decision: Option A

Use Vite with `react-router-dom`, typed local content, a Vercel SPA rewrite, and runtime metadata updates. Do not migrate to Next.js in this blog implementation. The trade-off is accepted because the current setup is already deployed, the existing portfolio should remain stable, and the assessment needs a complete working blog rather than a risky framework migration.

Before publishing, test the deployed route output and social previews. If a platform cannot read runtime metadata, document that limitation in the technical SEO slide instead of claiming server-rendered behavior.

The final CMS slide must state: **platform evaluated, architecture actually deployed, evidence collected, trade-offs accepted, and fallback plan**.

## 6. CMS and Architecture Research Deliverable

The rubric requires research into at least three CMS systems. Compare more than names: cite official documentation and record the date of each test or source review.

| Dimension | WordPress | Wix Studio | Custom Vercel stack | Evidence to collect |
|---|---|---|---|---|
| Content editing | Mature editor and plugin ecosystem | Hosted visual editor | Git-based typed content or MDX; developer-led publishing | Source links and a representative workflow |
| Hosting and deployment | Separate hosting choice or WordPress.com plan | Fully hosted platform | Vercel deployment connected to repository | Deployment notes and cost assumptions |
| Technical SEO control | Strong with configuration/plugins; verify plugin dependency | Accessible but platform-controlled | High control if server-rendered; weaker if client-only Vite | Metadata inspection and route tests |
| Performance control | Depends on theme, plugins, and host | CDN and platform runtime control | Bundle, assets, caching, and rendering are under project control | Lighthouse and network evidence |
| Data portability | Database export is possible but migration needs work | Export and platform-lock-in limits must be researched | Source-controlled content and assets | Export/import test or documented limitation |
| Privacy/compliance | Plugins may add third-party processing | Hosted services and forms need review | Only selected services are added, but consent is the owner's responsibility | Data-flow diagram and privacy checklist |
| Maintenance | Core, theme, and plugin updates | Platform-managed, design still maintained | Code, dependencies, content, and deployment maintained by the team | Maintenance estimate |

Do not present unsupported claims such as a guaranteed `<50ms` TTFB or guaranteed 95+ Lighthouse scores. Measure the deployed site and label all targets as targets until verified. Also do not call the custom stack a CMS unless it provides a content-management workflow; describe it as a custom content architecture when that is what was built.

## 7. Repository Implementation Sequence

The paths below are proposed ownership boundaries. Create them only when the relevant phase begins.

```text
src/
  app/
    router.tsx
    routeMetadata.ts
  blog/
    content.ts
    types.ts
    categories.ts
    components/
      BlogCard.tsx
      Breadcrumbs.tsx
      ReadingProgress.tsx
      TableOfContents.tsx
      ArticleBody.tsx
      NewsletterCapture.tsx
    pages/
      BlogIndex.tsx
      BlogArticle.tsx
      BlogCategory.tsx
public/
  blog/
    diagrams/
    downloads/
  robots.txt
  sitemap.xml
```

The folder names may be adjusted during implementation, but preserve the same content model and URL contract so the content remains stable.

## 8. Phase-by-Phase Implementation Workflow

Follow the phases in order. Each phase ends with a gate. Do not begin the next phase until the current route, content, or deployment behavior has been checked.

### Phase 1: Foundation and route setup

**Objective:** Add the blog foundation without damaging the existing one-page portfolio.

**Actions:**

1. Run `npm run lint` and `npm run build` to establish the baseline.
2. Install the routing dependency:

  ```bash
  npm install react-router-dom
  ```

3. Create the route structure for `/`, `/blog`, `/blog/:slug`, and `/blog/category/:category`.
4. Move the existing portfolio rendering into the `/` route without changing its section IDs.
5. Add a `vercel.json` rewrite so direct visits to client-side routes return the Vite entry file.
6. Add the **Blog** item to both desktop and mobile navigation.
7. Verify that `/`, `/blog`, and one temporary test article route work after a browser refresh.

**Why:** Routing is the foundation of the requested new URL path. It must be stable before content, metadata, and analytics are added.

**Deliverable:** Existing portfolio plus an empty but reachable blog shell.

**Gate:** Home hash links still scroll correctly, Blog opens at `/blog`, and direct route refreshes do not show a Vercel 404.

### Phase 2: Content model and blog experience

**Objective:** Create a maintainable content system and the main reader-facing layouts.

**Actions:**

1. Add the `BlogPost` type and category definitions.
2. Create the typed local article data file.
3. Build the blog hub with an introduction, featured article, category navigation, and article cards.
4. Build category pages with descriptions, filtered articles, and an invalid-category state.
5. Build the article template with semantic headings, breadcrumbs, author/date information, related articles, and a not-found state.
6. Add the table of contents and reading-progress components.
7. Reuse the existing dark portfolio style, blue accent palette, Lucide icons, and Framer Motion patterns where they improve clarity.
8. Reuse the existing EmailJS implementation only where a contact or subscription call to action is needed. Do not create a second mail service.

**Why:** Separating content from layout allows articles to be written and edited without duplicating page components. It also makes category filtering, metadata, and sitemap generation predictable.

**Deliverable:** Fully navigable blog hub, category page, and reusable article page with one short test article.

**Gate:** Every link works with keyboard navigation, the layout is usable at 375px and 1440px, and no article depends on animation to be readable.

### Phase 3: Article production and rich media

**Objective:** Produce the content required by the rubric and connect it to the reader journey.

**Actions:**

1. Write and publish Article 1 with at least 1,000 words, a comparison table, two responsive diagrams, sources, and a personal reflection.
2. Write and publish Article 2 with the gain-staging diagram, low-cut recipe, and downloadable cheat sheet.
3. Write Article 3 with the acoustic-versus-electric decision guide and home recording workflow.
4. Write Article 4 with the subtractive EQ examples and an EQ visual.
5. Write Article 5 with the live-feedback troubleshooting flow.
6. Add Article 6 only after Articles 1-5, the technical SEO, and the analytics gates are complete.
7. Confirm every personal detail before publishing. Personal context may explain motivation, learning, or goals, but sensitive private information is excluded.
8. Add text alternatives for diagrams, audio comparisons, and any visual decision tool.

**Why:** The articles are the evidence of the blog's function. They need to be useful to real readers while also demonstrating awareness, consideration, and application stages.

**Deliverable:** Five complete, linked articles with approved images, diagrams, and downloadable content.

**Gate:** Each article passes the acceptance checklist, has a category and audience, contains at least one actionable takeaway, and is discoverable from the blog hub.

### Phase 4: SEO, analytics, and Vercel verification

**Objective:** Make the custom implementation measurable and technically defensible.

**Actions:**

1. Add runtime title, description, canonical, Open Graph, and Twitter/X metadata.
2. Add validated `BlogPosting` and `BreadcrumbList` JSON-LD to article pages.
3. Add `Person` author data using only verified public information.
4. Create and verify `public/sitemap.xml` and `public/robots.txt` using `https://amentsehaie.vercel.app/`.
5. Add consent-aware GA4 or GTM configuration through Vercel environment variables.
6. Track page views, `scroll_depth_75`, and `cheat_sheet_download`.
7. Do not add `outbound_affiliate_click`; affiliate links are not part of this project.
8. Test events in the deployed production environment, not only in localhost.
9. Run Lighthouse on desktop and mobile and record the actual results.

**Why:** Vercel hosting does not automatically prove that metadata, structured data, analytics, or direct routes work. Each must be checked as a separate technical requirement.

**Deliverable:** Deployed blog with working SEO files, structured data, analytics events, and an evidence log.

**Gate:** Direct route loads, rendered metadata, schema validation, sitemap, robots, consent behavior, download tracking, and production analytics are all verified.

### Phase 5: Academic package and launch

**Objective:** Convert the implementation into a complete, defensible assessment package.

**Actions:**

1. Complete the CMS comparison: WordPress, Wix Studio, and the actual Vite/Vercel content architecture.
2. Add competitor research and content-gap findings.
3. Map articles to personas, search intent, customer-journey stages, and funnel objectives.
4. Capture desktop/mobile screenshots and Lighthouse evidence.
5. Build the 25-30 slide deck with paired visual and IMFC slides.
6. Add the bibliography, GenAI prompt registry, certificate, Guest Presentation records, and technical appendix.
7. Run final lint, build, route, accessibility, metadata, link, and download checks.
8. Deploy the final production version and record the deployment date and commit/build identifier.

**Why:** The website and presentation must tell the same story. The evidence should show what was researched, what was built, what was measured, and what will be improved.

**Deliverable:** Published blog and complete submission package.

**Gate:** The live URL, slide deck, appendices, and implementation evidence agree with one another and contain no placeholder values.

### Step 1: Establish a clean baseline

1. Run `npm run lint` and `npm run build` before changes.
2. Open the current home page at desktop and mobile widths.
3. Record the current route behavior, header behavior, and any pre-existing warnings.
4. Confirm the production Vercel domain and whether a custom domain is available.
5. Create a short change log so new failures are distinguishable from existing ones.

**Gate:** The baseline build passes, or pre-existing failures are documented before blog work begins.

### Step 2: Decide and install routing

1. Complete the architecture gate in Section 5.
2. If staying with Vite, install and configure `react-router-dom`.
3. Move the existing `App` rendering into the home route without changing section IDs.
4. Add route-level fallback handling for unknown paths.
5. Verify `/`, `/blog`, an article path, and a category path in development.
6. Add the Vercel rewrite required for direct SPA route visits if Option A is chosen.

**Gate:** Direct navigation and refresh work for every required route in both local preview and deployed preview.

### Step 3: Add the Blog navigation entry

1. Add a `/blog` link to the header's desktop navigation.
2. Add the same link to the mobile menu and close the menu after navigation.
3. Keep hash scrolling for `About`, `Work`, `Skills`, and `Contact` on the home page.
4. Test focus states, active/hover states, mobile overflow, and browser back navigation.

**Gate:** The new tab is visible, reachable by keyboard, and does not regress existing navigation.

### Step 4: Define typed content before building article UI

Create a content type containing at least:

```ts
type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'guitar-craft' | 'home-recording' | 'mixing-mastering' | 'church-audio';
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  heroImage?: string;
  keywords: string[];
  sections: Array<{ id: string; heading: string; body: string }>;
  relatedSlugs: string[];
};
```

Use ISO dates, unique slugs, and validated category values. Keep content separate from layout components. If MDX is selected, define the same frontmatter contract and validate it at build time.

**Gate:** A missing slug, duplicate slug, invalid category, or missing required metadata fails a validation check before deployment.

### Step 5: Build the blog hub and category pages

The hub should contain:

- a clear editorial introduction and personal purpose;
- a featured article;
- category navigation for the four pillars;
- article cards showing category, title, excerpt, date, and reading time;
- a visible but restrained newsletter or contact call to action;
- empty and invalid-category states;
- responsive layouts that remain scannable on narrow screens.

Category pages should explain the pillar in one short paragraph, list only matching articles, and link back to the hub.

**Gate:** Every published article is discoverable from the hub and exactly one category page.

### Step 6: Build the article template

Implement these in order:

1. semantic article landmarks and heading hierarchy;
2. title, excerpt, author, date, category, and reading time;
3. breadcrumbs;
4. article body and related links;
5. generated table of contents from headings;
6. reading-progress indicator using the existing intersection/scroll patterns where practical;
7. responsive media with explicit dimensions and alt text;
8. newsletter capture with a clear privacy explanation;
9. previous/next or related article navigation;
10. not-found handling for unknown slugs.

Avoid putting the entire article inside nested decorative cards. Use the existing dark visual language, strong contrast, restrained motion, and a readable editorial measure. Do not make the content dependent on animation.

**Gate:** Keyboard users can reach every interactive element, headings form a logical outline, and content remains readable with motion reduced and images unavailable.

### Step 7: Produce the required rich media

For Article 1:

- build an interactive comparison table for gear, price, use case, trade-offs, and recommendation;
- add two optimized responsive diagrams, such as a signal chain and a budget allocation map;
- provide explicit alt text and a text explanation so the diagrams are not the only way to understand the content;
- optimize image dimensions and formats without claiming performance results until measured.

For Article 2:

- create a gain-staging process diagram;
- explain a low-cut filter recipe with context and cautions;
- add a static PDF or equivalent cheat sheet under `public/blog/downloads/`;
- ensure the download has a descriptive filename and accessible link text.

For Articles 3-5:

- use an acoustic/electric decision guide;
- use an EQ curve or before/after explanation;
- use a feedback troubleshooting flow;
- provide text alternatives for every visual or audio comparison.

**Gate:** Assets render at mobile and desktop sizes, have no broken paths, and are understandable without color alone.

### Step 8: Implement technical SEO

For every indexable route, define:

- unique `<title>` and meta description;
- canonical URL using the real production origin;
- Open Graph title, description, URL, type, and image;
- Twitter/X card values if required by the selected distribution channels;
- language and viewport metadata;
- `Article` or `BlogPosting` JSON-LD for articles;
- `BreadcrumbList` JSON-LD for article pages;
- `Person` author data with only verified information.

Validate JSON-LD as JSON before rendering. Escape title, description, and URLs safely. Do not place an unverified date, author URL, organization, or image URL in structured data.

Create `sitemap.xml` with the home, blog hub, category pages, and published article URLs. Create `robots.txt` with a sitemap reference and only the directives actually intended. Verify both from the deployed origin.

**Gate:** Inspect rendered HTML or the route output, validate structured data, check canonical URLs, and test Open Graph previews on a deployed URL.

### Step 9: Add analytics with privacy controls

Decide on GA4 or Google Tag Manager and record the measurement ID only in Vercel environment variables. Never commit secrets or identifiers that should differ by environment.

Required events:

| Event | Trigger | Parameters to consider | Verification |
|---|---|---|---|
| `scroll_depth_75` | Article reaches 75% depth | `page_path`, `article_slug` | GA4 DebugView and browser network request |
| `cheat_sheet_download` | Article 2 file download | `file_name`, `article_slug` | Download works and event appears |

Also measure page views, acquisition source, engagement rate, average engagement time, and top pages. Use UTM links for approved distribution, for example `utm_source=reddit&utm_medium=community&utm_campaign=church_audio_launch`, but only report data after the campaign actually runs. Affiliate-link tracking is out of scope.

Add a consent mechanism appropriate to the audience and jurisdiction before non-essential analytics cookies or scripts load. Document what is collected, why, retention assumptions, and how a visitor can change consent. Do not treat a locally visible script tag as proof that production tracking works.

**Gate:** Test in production with a clean browser session, record consent state, confirm event requests, and capture GA4 DebugView evidence without exposing personal data.

### Step 10: Deploy and verify on Vercel

1. Connect the repository and confirm the build command is `npm run build` unless the chosen framework changes it.
2. Add required environment variables to the correct Vercel environments.
3. Deploy a preview before production.
4. Test direct loads of `/blog`, one article, one category, `/sitemap.xml`, and `/robots.txt`.
5. Test browser refresh, back/forward navigation, unknown slugs, and unknown categories.
6. Test mobile and desktop widths.
7. Run Lighthouse on the deployed URL, not only localhost.
8. Record Performance, Accessibility, Best Practices, and SEO scores with date, device mode, URL, and build version.
9. Fix critical accessibility, broken route, metadata, and layout issues before publishing.

The supplied target of 95+ is a target, not a guaranteed result. Record actual scores and explain trade-offs in the IMFC slide.

## 9. Week-by-Week Delivery Schedule

### Week 4: architecture, research, and Article 1

- baseline build and route inventory;
- CMS comparison research with at least WordPress, Wix Studio, and the actually deployed custom architecture;
- architecture decision and risk log;
- route skeleton and Blog navigation entry;
- typed content model;
- Article 1 draft, assets, and article template;
- Section A strategy and Section B research slides in paired Presentation + IMFC format.

**Evidence:** comparison matrix, decision record, screenshots of `/blog`, Article 1 review checklist, source list, and first deployed preview.

### Week 5: FPA gate, Article 2, and analytics

- complete Article 2 and cheat sheet;
- implement download event;
- configure consent-aware GA4 or GTM;
- add initial sitemap and robots files;
- prepare 30-50% slide deck package;
- collect the certificate and first four Guest Presentation reflection records.

**Evidence:** production event test, download test, route checks, FPA checklist, certificate PDF/screenshot, and reflection verification log.

### Week 6: technical SEO, Article 3, and distribution

- implement metadata, canonical URLs, JSON-LD, and breadcrumbs;
- complete Article 3;
- run desktop and mobile Lighthouse audits;
- distribute approved links with UTM parameters on permitted channels;
- assemble Section C UX and responsive wireframe evidence.

**Evidence:** rendered metadata, schema validation, sitemap/robots checks, Lighthouse screenshots, UTM link register, and desktop/mobile comparisons.

### Week 7: Articles 4-5 and funnel mapping

- complete Articles 4 and 5;
- add EQ, waveform, and troubleshooting assets;
- map all articles to awareness, consideration, decision, or application stages;
- verify internal linking and related content;
- finish Section D content portfolio slides.

**Evidence:** editorial matrix, rich-media inventory, article QA records, funnel map, and content-source notes.

### Week 8: measurement, compliance, and submission lock

- export GA4 metrics: users, sessions, engagement rate, average engagement time, acquisition channels, and top pages;
- explain anomalies and propose concrete conversion improvements;
- verify all seven Guest Presentation forms;
- complete bibliography with at least five suitable academic or peer-reviewed sources;
- complete GenAI prompt and output audit;
- run Turnitin pre-check and confirm the required threshold with the course rules;
- lock the 25-30 slide deck and appendices.

**Evidence:** dated analytics export, interpretation notes, compliance checklist, bibliography, prompt registry, Turnitin result, and final technical appendix.

## 10. IMFC and Slide Deck Evidence Map

Use each visual slide immediately followed by its explanatory IMFC slide. Every IMFC slide should explicitly label Introduction, Methodology, Findings, and Conclusions.

| Slides | Implementation evidence |
|---|---|
| 1-2 | Live URL, project identity, and architecture summary |
| 3-6 | Strategy, personas, SMART KPIs, and prompt-engineering audit |
| 7-12 | UX trends, CMS matrix, competitor benchmark, and content gaps |
| 13-16 | Route map, user flows, wireframes, responsive decisions, heuristics |
| 17-20 | Editorial calendar, funnel mapping, keyword/search intent, rich media |
| 21-24 | Metadata, JSON-LD, sitemap, Lighthouse, GA4 events, optimization plan |
| 25-30 | Reflection, bibliography, GenAI registry, certificate, Guest Presentations, raw technical verification |

For each screenshot or metric, record: source URL or tool, date collected, device/mode, relevant settings, and what conclusion the evidence supports. A screenshot without context is not a reproducible finding.

## 11. Quality Assurance Checklist

### Functional

- [ ] Home route and all existing hash links still work.
- [ ] Blog tab works on desktop and mobile.
- [ ] Hub, article, category, not-found, sitemap, and robots routes work directly.
- [ ] Browser refresh works on every application route.
- [ ] Article cards, breadcrumbs, related links, TOC, and download link work.

### Accessibility

- [ ] One meaningful H1 per page.
- [ ] Heading order is logical.
- [ ] All controls have accessible names and visible focus states.
- [ ] Images have useful alt text; decorative images are marked accordingly.
- [ ] Contrast is checked for text, links, buttons, and progress indicators.
- [ ] Motion-reduced behavior is usable.
- [ ] Tables remain navigable on small screens.

### SEO and sharing

- [ ] Unique title and description for every indexable route.
- [ ] Canonical URLs use the final production origin.
- [ ] Open Graph image and text are correct for each article.
- [ ] JSON-LD parses and matches visible content.
- [ ] Sitemap contains only intended canonical URLs.
- [ ] Robots file is reachable and references the sitemap.
- [ ] No placeholder author, date, domain, or image values remain.

### Performance and deployment

- [ ] Production build passes.
- [ ] Lint passes.
- [ ] Images have stable dimensions and reasonable file sizes.
- [ ] No unnecessary third-party script loads before consent.
- [ ] Lighthouse results are recorded for desktop and mobile.
- [ ] Vercel preview and production direct-route behavior are tested.

### Content and academic integrity

- [ ] Personal claims are verified by Amen.
- [ ] Product and technical claims have source notes.
- [ ] AI assistance is recorded in the prompt registry as required.
- [ ] Bibliography uses a consistent citation style.
- [ ] Analytics numbers are actual observations, not targets or invented examples.

## 12. Risks, Questions, and Decision Log

Resolve these before the corresponding implementation phase:

| Question | Why it matters | Decision owner |
|---|---|---|
| Is the final Vercel domain known? | Required for canonical URLs, Open Graph URLs, sitemap entries, and slides. | Project owner |
| What limitations does client-side metadata have on the deployed Vite site? | Determines what must be documented in the technical SEO evidence. | Project owner |
| Which personal-life details are approved for publication? | Prevents invented or overly private content. | Amen |
| Is a blog contact or subscription CTA required by the final rubric? | Determines whether the existing EmailJS form is reused on the blog or the blog only links to Contact. | Project owner |
| Which distribution channels are allowed for the assessment? | Avoids posting links in channels without permission. | Course rules |
| What exact Turnitin and source requirements apply? | The supplied text contains targets that must be confirmed against the official manual. | Course manual / lecturer |

Maintain a decision log with date, decision, evidence, owner, and follow-up. Never silently replace a target with an achieved result.

## 13. Recommended Work Rhythm

Use one small vertical slice at a time:

1. write or update the content contract;
2. implement the smallest route or component;
3. run `npm run lint` and `npm run build`;
4. test the changed route in the browser at desktop and mobile widths;
5. record the result and evidence;
6. move to the next slice only after the gate passes.

This keeps the existing portfolio protected while the blog grows and makes the final academic evidence traceable to actual implementation work.