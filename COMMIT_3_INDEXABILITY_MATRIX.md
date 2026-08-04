# Commit 3 — SEO Indexability Matrix

**Status: implementation applied for all Category A/B classifications below that required no business judgment. Category C (removal/redirect execution) is a PROPOSAL only — not executed. Awaiting approval per the task's explicit STOP condition.**

All findings are evidence-based: derived from reading `router.tsx`, `routeRegistry.ts`, `serviceRoutes.ts`, `locationRoutes.ts`, `industryRoutes.ts`, `knowledgeRoutes.ts`, `blogRoutes.ts`, `DynamicRouteResolver.tsx`, `LocationLandingPage.tsx`, `LocationServiceLandingPage.tsx`, `ServiceLandingPage.tsx`, `IndustryLandingPage.tsx`, `KnowledgePage.tsx`, `BlogPostPage.tsx`, `BlogHubPage.tsx`, `prerender.js`, `vite.config.ts`, `vercel.json`, and by building/rendering the actual `dist/` output with Puppeteer against a fresh build.

---

## Major finding — RESOLVED: contradictory robots directives on non-prerendered routes

**Original finding:** `vercel.json` had no explicit SPA-fallback rewrite; with `"framework": "vite"` set, Vercel's Vite preset implicitly served `dist/index.html` (the **prerendered homepage**, since `prerender.js` writes the homepage's crawl result directly over `dist/index.html`) for any URL that doesn't match a static file. Testing showed every Category B route (e.g. `/housekeeping-services-mumbai`) rendered with **3 `<meta name="robots">` tags simultaneously present**: two `index, follow` and one `noindex, nofollow` — a genuine, live contradiction, not a degraded-but-safe signal.

**Precise root cause, traced to source:** two compounding defects, both now fixed:
1. **`index.html` (source template) had a static, hardcoded `<meta name="robots" content="index, follow...">` tag** (confirmed: only `robots` was duplicated across every prerendered file, never `googlebot` — `SEO.tsx` renders both from the same Helmet call, so if Helmet itself were the duplicator both would double equally; only one is static-and-duplicated, proving the static template as the source). `react-helmet-async` only manages tags *it* renders — it never removes tags baked into HTML it didn't produce — so every single prerendered page carried this redundant tag, and the served SPA-fallback shell (itself a prerendered page) carried it too.
2. **The SPA-fallback target was the prerendered homepage**, not a clean shell — so any route relying on client hydration (all of Category B) started from a DOM that already had a *different page's* fully-rendered title/canonical/robots baked in, on top of which its own Helmet could only add, never replace.

This is root cause **B (stale SPA-fallback metadata) compounding with a static-template duplicate that affected even prerendered pages** — not A, C, D, or F.

**Fix implemented (source architecture, no client-side hacks):**
- `index.html`: removed the static `<meta name="robots">` line entirely — `SEO.tsx` already renders one, unconditionally, on every route.
- `scripts/prerender.js`: no longer deletes `index.shell.html` after the crawl; it now ships in `dist/` as the genuinely clean, unhydrated fallback shell (empty `<div id="root">`, no page-specific tags).
- `vercel.json`: added `{ "source": "/(.*)", "destination": "/index.shell.html" }` as the final rewrite rule — static files (all 30 Category A pages) are still served directly and never touch this rule; only genuinely-unmatched paths (Category B, true 404s) fall through to the clean shell.

**Verified after the fix** (rebuilt, re-tested the same 6 combinatorial URLs plus `/pune`, `/faq`, `/faqs`, `/mumbai`, `/thane` with a Puppeteer harness that faithfully replicates the new `vercel.json` rewrite): **every route now renders exactly one `<meta name="robots">` tag, with zero contradictions.** All 30 Category A pages also improved from 2 redundant identical tags to exactly 1. Full detail in the Final Report below.

---

## Route Family Matrix

### A — INDEXABLE (30 URLs — prerendered + sitemap-listed)

| URL/pattern | Reason | Sitemap | Prerender | Robots | Content source |
|---|---|---|---|---|---|
| `/` | Homepage, unique | ✅ | ✅ | index,follow | `HomePage.tsx` |
| `/about` | Unique hand-authored | ✅ | ✅ | index,follow | `AboutUs.tsx` |
| `/services` | Services hub, `ItemList` schema | ✅ | ✅ | index,follow | `ServicesHubPage.tsx` |
| `/talk-to-us` | Contact/conversion page | ✅ | ✅ | index,follow | `TalkToUs.tsx` |
| `/privacy-policy` | Legal, standard practice to index | ✅ | ✅ | index,follow | `PrivacyPolicy.tsx` |
| `/terms-and-conditions` | Legal, standard practice to index | ✅ | ✅ | index,follow | `TermsAndConditions.tsx` |
| `/blog` | Blog hub — **fixed in this commit**: was missing canonical entirely (raw `<Helmet>`, no `<SEO>`) | ✅ | ✅ | index,follow | `BlogHubPage.tsx` |
| `/housekeeping-services` + 6 more service pages | Unique long-form content per service, confirmed non-templated (audited) | ✅ ×7 | ✅ ×7 | index,follow | `servicesData` / `data/base/*` |
| `/locations/pune`, `/locations/hinjawadi`, `/locations/kharadi` | Hand-authored, genuinely differentiated (confirmed: distinct business hubs, challenges, FAQs per city) | ✅ ×3 | ✅ ×3 | index,follow | `content/locations/locationData.ts` |
| `/industries/it-companies`, `/hospitals`, `/manufacturing` | Hand-authored, industry-specific compliance/SLA content | ✅ ×3 | ✅ ×3 | index,follow | `content/industries/industryData.ts` |
| `/housekeeping-cost`, `/security-guard-pricing`, `/pf-compliance`, `/background-verification`, `/facility-management-vs-housekeeping` | Unique pricing/trust/comparison content | ✅ ×5 | ✅ ×5 | index,follow | `content/knowledge/*`, `content/comparisons/*` |
| `/blog/{5 existing slugs}` | Unique articles, dynamically discovered from `content/blogs/` | ✅ ×5 | ✅ ×5 | index,follow | `content/blogs/*/meta.ts` |

**Total: 30.** (Static 6 + services 7 + locations 3 + industries 3 + knowledge 5 + blog hub 1 + blog posts 5.)

---

### B — RETAINED BUT NON-INDEXABLE

| URL/pattern | Count | Behavior applied | Sitemap | Prerender | Robots (rendered) | Reason |
|---|---|---|---|---|---|---|
| `/{service}-{location}` combinatorial | 63 (7 services × 9 `data/locations.ts` cities, incl. Pune) | `noindex` added to `<SEO>` in `LocationServiceLandingPage.tsx`; excluded from manifest | ❌ | ❌ | **unambiguous** noindex,nofollow (verified single tag, no contradiction — see resolved finding above) | Confirmed in the prior approved audit: 56 of 63 are byte-identical template paragraphs with only city/service tokens swapped (`generateLocalizedContent`); the 4 Pune-specific overrides have real content but the URL *pattern* itself is what the approved Content Strategy targets for retirement, not an individual-page judgment made here |
| `/pune` (flat) | 1 | Left as-is; already self-canonicalizes to `/locations/pune` via `LocationLandingPage.tsx`'s existing `<SEO canonicalUrl={`/locations/${location.slug}`}>` | ❌ | ❌ | index,follow, but canonical points elsewhere | Exact content duplicate of `/locations/pune` (same data source); cross-canonical already signals consolidation without needing a code change |
| `/faq`, `/faqs` | 2 | Removed from prerender/sitemap manifest (previously incorrectly included) | ❌ | ❌ | n/a — client-side navigates to `/` | `SectionRedirect` components with zero unique content; verified they resolve to homepage-identical content client-side |

**Total Category B: 66** (63 combinatorial + 1 duplicate flat city + 2 redirect placeholders).

---

### C — REMOVE (implemented) / PROPOSED (not yet executed)

| URL/pattern | Count | Treatment | Status |
|---|---|---|---|
| `/mumbai`, `/navi-mumbai`, `/thane`, `/nagpur`, `/nashik`, `/aurangabad`, `/kolhapur` (flat `LOCATION`-type registrations) | 7 | Dead-registration removal from `serviceRoutes.ts` | **Implemented.** Proven zero behavior change: `LocationLandingPage.tsx` only reads `content/locations/locationData.ts` (keys: `pune`, `hinjawadi`, `kharadi`); these 7 registrations pointed at `data/locations.ts` keys that don't exist there, so they **already rendered `NotFoundPage`** before this change (confirmed via Puppeteer against the pre-change build). Removing the dead registration produces the identical rendered result via `DynamicRouteResolver`'s own registry-miss fallback — this is dead-code cleanup, not a content removal, so it did not require the STOP condition. |
| 63 combinatorial `/{service}-{location}` URLs | 63 | **Proposed:** 301 → parent `/{service}` page | **NOT implemented.** Flagged per the task's explicit instruction: "If implementing a single authoritative indexability source requires deleting or redirecting the 69 questionable routes immediately, STOP." A 301 to the parent service hub is the evidence-backed, semantically-defensible destination (same service, same business, just without a location qualifier that was templated/non-differentiated for 59 of 63 combos) — this is the "duplicate URL → canonical replacement" pattern the task explicitly endorses, not the rejected "random city → homepage" pattern. But since this deletes/redirects real, currently-reachable content (including the 4 Pune combos with genuine unique copy), it requires your approval before execution, and the 4 Pune-specific content pieces should ideally be migrated into their target pages first rather than simply discarded — a content-phase decision, not infrastructure. |
| `/pune` (flat) | 1 | **Proposed:** 301 → `/locations/pune` | **NOT implemented.** Currently handled via cross-canonical (Category B) which is a reasonable interim state; a real 301 is a small, low-risk follow-up but wasn't executed here since it touches `vercel.json`/routing and the task's STOP condition covers this URL too. |

**No 404s or 410s were newly introduced in this commit.** The 7 dead-registration removals don't produce a *new* 404 — they preserve the existing soft-404 (`NotFoundPage`) behavior exactly.

---

## OWNER INPUT REQUIRED

1. **Do you want the 63 combinatorial-route → parent-service 301 redirects executed now, or after the 4 Pune-specific content pieces (`housekeeping_pune_content.ts`, `office_boy_pune_content.ts`, `pantry_staff_pune_content.ts`, `facility_management_pune_content.ts`) are migrated somewhere durable?** This is exactly the open question already raised in the approved `PREZENTI_SEO_IMPLEMENTATION_PLAN.md`/Content Strategy — reiterated here as the concrete blocking decision for Commit 3's redirect phase.
2. **Which secondary cities (if any) does Prezenti have genuine, verifiable local presence in** (Mumbai, Navi Mumbai, Thane, Nagpur, Nashik, Aurangabad, Kolhapur)? No claim of operational coverage has been fabricated here — all 7 are currently non-indexable/dead-registration, consistent with "no evidence of real local differentiation" from the original audit. If real coverage exists for any, that changes whether future dedicated content should be built there instead of just 301-redirecting.
3. **Should the `/pune` → `/locations/pune` 301 be executed now** (small, low-risk, single redirect) or bundled with the larger combinatorial-route redirect work in #1?

## Blog draft/publication-status safety

**Finding:** `prerender.js`'s blog discovery was purely folder-based (`fs.readdirSync`), never checking each post's `status` field (`Draft | Review | SEO Review | Legal Review | Ready | Published | Archived`), while `BlogHubPage.tsx`'s own listing already filters to `Published`/`Ready`. Today all 5 existing posts are `Published`, so there was no active exposure — but the mechanism would have silently prerendered and sitemap-listed any future `Draft` post the moment its folder was created.

**Fix:** `prerender.js` now reads each `meta.ts`'s `status` field (via a targeted regex — this script isn't part of the Vite/TS build graph, so a full TS import isn't available) and only includes a post if its status is `Published` or `Ready`, matching `BlogHubPage.tsx`'s own criterion exactly. Verified: all 5 real posts still correctly included (zero exclusion warnings on a fresh build); the filter logic was independently unit-tested against all 7 possible status values and correctly accepts only `Published`/`Ready`.

## Deferred to later SEO phases (explicitly out of Commit 3 scope)

- Migrating the 4 Pune-specific combo pages' unique content into `/housekeeping-services`, `/office-boy-services`, `/pantry-staff-services`, `/facility-management-services`, or `/locations/pune` (per the approved Content Strategy's Month 2/4 plan).
- Nesting `/locations/pune/hinjawadi` and `/locations/pune/kharadi` per the approved Information Architecture doc's URL-restructuring recommendation.
- Any new content, H1 rewrites, keyword targeting, CTA changes, or internal-linking optimization (explicitly prohibited in this commit per Phase 17).
