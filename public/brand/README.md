# Brand assets

Small, vector-only identity assets for the CodeQuest shell.

| File                 | Use                                                        |
| -------------------- | ---------------------------------------------------------- |
| `codequest-mark.svg` | Favicon / external references (e.g. README, slides).        |

## Source of truth

The canonical mark lives in code at `src/components/brand/LogoMark.jsx`, rendered
as inline SVG. That keeps it themeable, crisp at any size and free of extra
network requests — the `public/` copy exists only for places that need a file
URL (browser tab icon, docs, social preview).

## Palette extracted from the mark

| Token             | Hex                        | Role                       |
| ----------------- | -------------------------- | -------------------------- |
| `signal-cyan`     | `#22d3ee`                  | primary accent             |
| `signal-cyan-deep`| `#0891b2`                  | primary accent (pressed)   |
| `signal-magenta`  | `#ec4899`                  | secondary accent           |
| `signal-amber`    | `#fbbf24`                  | data / highlight accent    |
| `ink-950`         | `#05070d`                  | page background            |
| `ink-850`         | `#0b0f1a`                  | card surface               |
| `slate-25`        | `#f6f8fc`                  | primary text               |

Accent colours are used sparingly (CTAs, active nav underline, code tokens),
never as large filled areas — the UI stays dark and low-saturation.
