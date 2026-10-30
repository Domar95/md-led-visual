# Colours

Decision (October 2026): the site uses the **`slate`** palette, a soft
slate-blue base with a **butter-yellow** accent used on **small accents
only**.

All colours live in [`src/styles/colors.scss`](../src/styles/colors.scss).
Switch the whole site by changing `$palette` there.

## Chosen palette: `slate`

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#f3f5f8` | page background, soft grey-blue |
| `surface` | `#ffffff` | cards |
| `surface-sunken` | `#e8ecf2` | image placeholders, quiet tiles |
| `line` / `line-strong` | `#dde2ea` / `#c4ccd8` | hairlines, borders |
| `text` | `#142033` | slate ink: text and the main buttons |
| `text-muted` / `text-subtle` | `#4a5568` / `#687284` | secondary text |
| `highlight` | `#f0de78` | butter yellow: the accent |
| `glow` | `#4a78d0` | muted blue second light in the dark bands |
| `inverse-bg` / `inverse-surface` | `#0f1a2b` / `#18253a` | dark bands (services, footer) |
| `inverse-text` | `#f3f5f8` | text on dark bands |
| `accent-amount` | `small` | see below |

The colours come from the logo: its night-sky background (pulled towards a
calm slate blue) for the ink and dark bands, the diamond's yellow (softened)
for the accent, and its inner blue for the glow.

**Small accents only** (`accent-amount: small`) keeps the yellow off large
areas: the "Sprawdź wycenę" row is a dark card with a yellow outline and
link, and title highlights are a thin yellow underline instead of a marker.
Yellow stays on details: service icon tiles, the block behind the hero
photo, the hero photo progress bars, label diamonds, badges and the pricing
calculator's step numbers and selected screen.

With `accent-amount: full` (the default) those large areas are filled with
the accent instead.

## Why these

- The blue base was liked from the first blue palette onwards; the softer,
  greyer slate version was preferred over the brighter blue.
- The logo's own yellow `#f5ea3a` glared on large fills; butter `#f0de78` is
  the same hue, softer, and using it only on details keeps it calm.
- Violet as the second light fought the yellow; blue pairs with it.

## Tried and rejected

Kept in `colors.scss` for reference.

- `paper`: warm paper with the logo yellow (the original redesign).
- `midnight`: cool grey with mint-cyan.
- `neon`: plum with hot pink; liked, but the pink was too bright, and dusty
  rose did not fit either.
- `ember` (orange), `lime`, `violet`, `signal` (coral red).
- `stage`: a dark site with the yellow glowing. Works, but light mode was
  preferred.
- `logo`: the brighter blue base with butter as full fills. Acceptable, but
  `slate` with small accents was preferred. Earlier versions of it with a
  violet glow (clashed with the yellow) and an azure cyan accent (felt
  worse) were rejected.
- `spectrum`: the logo's rainbow as a gradient on the fills.
- Compared but not chosen on the blue base: gold `#f2c94c`, sunflower
  `#ffd43b`, amber `#f7b538`, champagne `#f1dca4`.

## Related layout decisions

The scrolling ticker of event types under the hero was removed. Neither a
large, bold version nor a small, quiet one fitted.

### Price card on the pricing page

Decision: the "Orientacyjny koszt" summary card on `/wycena` is **E, white
with a yellow underline**: a white card like the step cards, ink price with a
short butter underline, standard dark button. It fits the calm, small-accents
direction, echoes the underline on the page title, and avoids a dark card
sitting right above the dark footer on phones.

Runner-up, still acceptable: **B, dark with accents only**, the dark stage
card (dot field, blue and faint yellow glow), white price, light button with
ink text; yellow only on the label diamond and the glow. Worth switching to
if the white card doesn't stand out enough from the step cards.

Rejected: the dark card with a yellow price and yellow button (too
aggressive), a plain white card with no accent, a white card with the price
on a small dark panel inside it, a dark card with a yellow outlined button,
and a slate-tinted card.

All the styles are in
[`pricing-form.component.scss`](../src/components/pricing-form/pricing-form.component.scss).
To switch to B, give `.summary` the `stage-backdrop` mixin (keeping it
sticky), use the `inverse-*` colours for its text and dividers, and override
the button's container to `inverse-text` with `text` for the label.

## When changing the palette

- Update `<meta name="theme-color">` in `src/index.html` to the palette's
  `bg` (currently `#f3f5f8`).
- The accent must stay light enough for `on-highlight` text (the ink) to
  read on it.
- Angular Material's palette in `src/styles/_theme-colors.scss` is still
  generated from black and yellow. Overrides cover buttons and form fields,
  so it only shows in ripples and spinners. Regenerate it with
  `ng generate @angular/material:theme-color` if that ever matters.
- A palette may also set `fill` (for example a gradient) to use for accent
  backgrounds instead of the solid `highlight`, and `scheme: dark` for a
  dark site.
