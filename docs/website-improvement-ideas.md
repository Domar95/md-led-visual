# Website improvement ideas: brand and business

Notes after the redesign (`feature/redesign`). The visual side is covered: hero, features, offer categories, gallery, pricing calculator and contact. What's missing is mostly **trust** and **findability**. People renting an LED screen for a wedding or a corporate gala are spending real money on a one-off event that can't go wrong. They want proof the company is reliable and that it operates in their area.

Ideas are ordered from highest impact.

## 1. Broken or missing now

- [ ] **The About page (`/o-mnie`) is still lorem ipsum** (`src/views/about-page/about-page.component.html`). It should say who's behind MD LED Visual, how long the business has been running, and show a real photo of the team with the equipment. For a small rental business, a real face is one of the strongest trust signals.
- [ ] **No service area anywhere on the site.** No city, region or travel radius is mentioned. Customers search "telebim wynajem Kraków", not just "telebim". Add something like "Działamy w całej Polsce, baza: X" to the hero or footer and to the page titles.
- [ ] **SEO basics** in `src/index.html` and the routes:
  - `lang="en"` should be `lang="pl"`
  - add a `<meta name="description">`
  - add Open Graph tags, so links shared on Facebook or WhatsApp show a preview
  - add `LocalBusiness` structured data (JSON-LD)
  - page titles are generic ("Galeria", "Wycena"). Add the brand and keywords, e.g. "Galeria realizacji | MD LED Visual – wynajem telebimów"

## 2. Trust and proof

- [ ] **Testimonials:** a few short quotes with a name and event type ("Wesele, Rzeszów, 2025"). Even better, show the Google rating with a link to the Google Business Profile reviews.
- [ ] **Client logos ("Zaufali nam" strip),** if there have been corporate or municipal events. One recognizable logo convinces B2B clients more than a paragraph of text.
- [ ] **Numbers:** e.g. "150+ wydarzeń · 8 lat · do 40 m² ekranu". Works well as a small band between the hero and the features.
- [ ] **Case studies in the gallery:** for 2–3 events, add a sentence each on what the client needed, which screen was set up and how. That turns photos into proof.

## 3. Fewer questions before booking

- [ ] **FAQ** (on the pricing page or the home page). Questions event customers keep asking:
  - How far in advance should I book?
  - Do you handle outdoor events? What happens if it rains?
  - What power supply is needed?
  - How long does setup take?
  - Is an operator included?
  - Can I play my own presentation or a livestream?

  A FAQ also brings long-tail SEO traffic.
- [ ] **"How it works" in 3–4 steps:** contact → quote → setup on the day → operation during the event. Makes the service feel less risky.
- [ ] **Equipment specs:** pixel pitch, available sizes, brightness (outdoor vs indoor), trucks or trailers. B2B and agency buyers compare suppliers on these.

## 4. Conversion

- [ ] **WhatsApp or click-to-call button that stays visible on mobile.** Most event customers browse on their phone, and the phone number only shows up on the contact page.
- [ ] **Event date field in the contact form** (check whether it's there). Availability is the first thing to check anyway.
- [ ] **Short video in the hero or gallery.** The product is visual and moving. A 15-second loop from a real event does better than any still image.

## 5. Optional, later

- [ ] **Separate landing pages per segment**, e.g. "Telebim na wesele", "Ekran LED na konferencję". These rank much better than one generic page.
- [ ] **Advertising and partners:** screens for sponsor displays, partnerships with wedding venues and event agencies. Could be a "Dla agencji" section.

## Suggested first three

1. Real About page
2. Service area on the site
3. Testimonials and numbers

Fix the SEO basics along the way, since they're quick.
