---
name: Harbour Dusk
typography:
  display:
    fontFamily: Newsreader
  body:
    fontFamily: Inter
  mono:
    fontFamily: JetBrains Mono
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
---

# Parlance design system: Harbour Dusk

Harbour Dusk is a calm, dark-first interface set on warm-sand neutrals with a 60-degree hue undertone, accented by a deep sea-teal and a sparing amber. It should feel like a quiet room before an important meeting: focused, unhurried, honest about how you did.

## Principles

Parlance is used in three moods, and every surface belongs to one of them.

- **Deciding**: choosing what to practise next. Pages lead with one clear next step.
- **Performing**: a live practice session. Chrome steps back; the conversation fills the screen.
- **Reflecting**: debriefs and the journal. Prose reads at a comfortable measure, with evidence beside each note.

## Color

The palette lives in `apps/web/app/globals.css` as oklch tokens, with a light set under `:root, .light` and a dark set under `.dark`. Dark is the default theme.

- Surfaces are warm-sand neutrals at hue 60, never achromatic grays.
- Teal (`--primary`) carries brand presence and primary fills.
- Amber (`--accent`) marks selection, emphasis and live coaching.
- Elevation in dark mode comes from surface luminance alone: sunken, background, card, popover.

## Typography

- Display: Newsreader, for page titles and the landing page only.
- Body: Inter, for everything else.
- Mono: JetBrains Mono, for transcripts' timestamps and code.

Prose keeps to a 70ch measure (`max-w-prose`) with `text-wrap: pretty`.

## Components

Use the primitives in `apps/web/components/ui` and the page-level parts in `apps/web/components`. The internal gallery at `/dev/design-system` shows each one in both themes.

## Do's and Don'ts

### Do

- Do let teal carry brand presence on otherwise quiet surfaces.
- Do use amber for selection, emphasis, high-intent next steps and live coaching, still sparingly.
- Do classify product surfaces as Deciding, Performing or Reflecting before choosing a layout.
- Do use `PageHero`, `SectionHeading` and `ListGroupLabel` instead of hand-rolling title hierarchy.
- Do use the hero card variant for the one dominant next step on a page.
- Do keep prose within a readable measure and product data as dense as the task requires.
- Do use progressive disclosure for secondary detail.
- Do provide visible focus, AA contrast, semantic headings, labels, errors and reduced-motion behavior.
- Do route rules that can be checked into token validation, layout validation, lint or tests.
- Do use `joinMetadataParts` for peer metadata lists and `joinMetadataText` for plain-string exports.
- Do pick an overflow strategy (`truncate`, `line-clamp-2` or `break-words`) on dense metadata lines.

### Don't

- Don't use pastel companion palettes as decoration around teal brand elements; keep ordinary surfaces warm-sand neutral.
- Don't use teal-to-blue gradients, gradient text or decorative glassmorphism.
- Don't use repeated icon-card grids, dashboard widgets or modal dialogs as reflexive scaffolding.
- Don't use decorative grid backgrounds, diagonal stripes, hand-drawn SVG scenes or fake technical texture.
- Don't place tiny uppercase eyebrows or numbered markers above sections.
- Don't box every section in a card, nest cards, or place a bordered section inside a card.
- Don't add a page-local glow, hairline or shadow override to a card; use the variant that carries it.
- Don't put actions in page-title rows or duplicate the same creation action in the toolbar and the empty state.
- Don't use amber for hover decoration, paint every primary amber, or mix teal chrome into live-coaching controls.
- Don't use teal for a chosen-among-options state.
- Don't use display type in controls, data, labels or navigation.
- Don't reduce meaningful text opacity below the documented contrast floor.
- Don't use raw colors, arbitrary sizes, arbitrary z-index values, broad `transition-all`, a local focus ring, or unsanctioned radius and shadow values when a token or utility exists.
- Don't use Unicode middots, bullets, pipes or en dashes as peer-list separators in signed-in product UI.
