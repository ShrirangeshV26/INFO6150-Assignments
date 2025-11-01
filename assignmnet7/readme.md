# Chelsea FC Club Store (Two-Page Website)

A responsive two-page site demonstrating **CSS Grid**, **Flexbox**, and advanced **SASS/SCSS**.

## Pages

- `index.html` – Home with hero, features grid, and featured products grid.
- `store.html` – Shop page with filter bar (Flexbox), product grid (Grid), and contact form.

## SASS/SCSS Features Implemented

- **Variables**: Colors, fonts, spacing (`_variables.scss`)
- **Custom Properties**: CSS variables generated from SASS maps (`_base.scss`)
- **Nesting**: Throughout components and layout files
- **Interpolation**: Dynamic class names (`$brand-name`, `$btn-prefix`)
- **Placeholder Selectors**: `%card`, `%btn-base` with `@extend`
- **Mixins**: `flex-center`, `flex-between`, `grid`, `respond`, `focus-ring`, `btn-variant`
- **Functions**: `rem()`, `clampSize()`
- **Additional Features (4+)**:
  - **Maps** for colors/spacing and helper accessors (`_maps.scss`)
  - **@each** to emit CSS custom properties & utilities
  - **@for** to autogenerate `.grid-cols-2..4` classes
  - **@if / @else** theming in `themes/_theme.scss`
  - **Module System**: `@use` in all partials
  - **Color utilities** within mixins (hover/active states)

## Layout Requirements

- **Grid (2+)**
  - Hero center grid on Home
  - Features grid on Home
  - Product grid on Store (also Grid)
- **Flexbox (2+)**
  - Header bar (logo + nav + actions)
  - Footer layout (three zones)
  - Store filter bar (title + controls)

## Setup & Build

```bash
# from project root
npm -v           # optional, just to verify node is present
# If you don't use npm, you can install the Dart Sass standalone too.

# Compile once:
sass scss/main.scss css/main.css

# Or watch for changes:
sass --watch scss/main.scss:css/main.css
```
