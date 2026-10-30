# Website improvement ideas: brand and business

Notes after the redesign (`feature/redesign`). The visual side is covered: hero, features, offer categories, gallery, pricing calculator and contact. What's missing is mostly **trust** and **findability**. People renting an LED screen for a wedding or a corporate gala are spending real money on a one-off event that can't go wrong. They want proof the company is reliable and that it operates in their area.

Ideas are ordered from highest impact.

## Sample content: replace before it can go live

Most of sections 2–4 are built, but filled with **made-up sample content** so the layout can be judged. All of it lives in one file, [`src/content/site-content.ts`](../src/content/site-content.ts), and every invented item is marked `placeholder: true`.

- Placeholder items show only where `environment.showPlaceholderContent` is `true`. **For now it's `true` in both `environment.development.ts` and `environment.ts`**, because the production build is deployed only to a test environment. **Before the site goes live, set it back to `false` in `environment.ts`** (or replace every sample with real content): invented reviews, clients or specs would mislead customers, and fake reviews are illegal in Poland/the EU (Omnibus directive, UOKiK).
- To publish an item: replace the text with the real thing and set `placeholder: false`. A section with no publishable items hides itself.

| Content | Where it shows | Status |
| --- | --- | --- |
| Numbers | Home, band under the hero | "10 lat" and "Cała Polska" are real; "300+ wydarzeń" and "do 40 m²" are samples |
| Testimonials (3) | Home, "Opinie" | samples |
| Client logos (6) | Home, under the testimonials | labelled boxes; add `logo` image paths |
| Showreel video | Home, "W akcji" | **real**: YouTube `s2FHnMWDh48` from the company channel; live in production |
| FAQ answers (6) | `/oferta` | the questions are real, the answers are samples |
| Equipment specs (3 screen types) | `/oferta` | samples |
| Case studies (3) | `/oferta` | samples |
| About history and team photo | About page | samples; the photo is a drawn stand-in |

## 1. Broken or missing now

- [x] **The contact form sent to a placeholder address.** `RECEIVER_EMAIL` in `src/services/email.service.ts` is now `ledvisual@o2.pl`. The Cloud Function only accepts requests from `https://md-led-visual.web.app`; a custom domain will need adding to `ALLOWED_ORIGIN` in `functions/main.py`.
- [ ] **The About page (`/o-mnie`):** the real facts are in (Wrocław, 10 years, all of Poland). The history paragraph and team photo are samples (see above); they need the real story and a real photo of the team with the equipment.
- [x] **Service area:** "Wrocław i cała Polska" in the hero label, the footer, the contact details, the home page title and the search and link-preview descriptions.
- [x] **SEO basics** in `src/index.html` and the routes:
  - [x] `lang="pl"`
  - [x] `<meta name="description">`, now with Wrocław and all of Poland
  - [x] Open Graph tags, with a generated 1200×630 preview image (`public/og-image.jpg`: logo and headline). Swap for a real event photo when there is one
  - [x] `LocalBusiness` structured data (JSON-LD): name, phone, email, Wrocław, all of Poland, Facebook and YouTube. Real facts only
  - [x] page titles carry the brand and keywords, e.g. "Galeria realizacji | MD LED Visual – wynajem ekranów LED i telebimów" (`src/app/page-title.strategy.ts`)

## 2. Trust and proof

Built; content is samples until replaced (see the table above).

- [ ] **Testimonials:** a few short quotes with a name and event type ("Wesele, Wrocław, 2025"). Even better, show the Google rating with a link to the Google Business Profile reviews.
- [ ] **Client logos ("Zaufali nam" strip),** if there have been corporate or municipal events. One recognizable logo convinces B2B clients more than a paragraph of text.
- [ ] **Numbers:** a band between the hero and the services. Two real figures are live; add more once confirmed.
- [ ] **Case studies** on `/oferta` (kept out of the gallery, where visitors want photos straight away): for 2–3 events, a sentence each on what the client needed and what was set up. That turns photos into proof.

## 3. Fewer questions before booking

- [ ] **FAQ** on `/oferta` (`src/components/faq`). Answers are samples; check each one against how you actually work. Once real, it's worth adding `FAQPage` structured data for search results.
- [x] **"How it works" in 3–4 steps:** "Jak pracujemy" on the home page, after the services: Rozmowa → Wycena i dobór sprzętu → Montaż i realizacja → Demontaż (`src/components/home/process`).
- [ ] **Equipment specs** on `/oferta` (`src/components/equipment`). Samples; replace with your real pixel pitch, sizes, brightness and trailer details.

## 4. Conversion

- [x] **Click-to-call button that stays visible on mobile:** a "Zadzwoń" pill in the bottom right on phones, after scrolling past the hero; hidden on `/wycena` and `/kontakt`, which have their own (`src/components/ui-elements/call-button`). WhatsApp could be added if the number uses it.
- [x] **Event date field in the contact form:** optional, native date picker, no past dates; sent as "Data wydarzenia" in the email.
- [x] **Video:** "W akcji" on the home page shows the YouTube video "Ekran LED, napis LOVE, fontanna iskier, niski dym" from the company channel (`src/components/home/showreel`). Thumbnail with a play button; the player loads from youtube-nocookie.com only on click. To change it, set `youtubeId` in `src/content/site-content.ts`.

## 5. Optional, later

- [ ] **Separate landing pages per segment**, e.g. "Telebim na wesele", "Ekran LED na konferencję". These rank much better than one generic page.
- [ ] **Advertising and partners:** screens for sponsor displays, partnerships with wedding venues and event agencies. Could be a "Dla agencji" section.
