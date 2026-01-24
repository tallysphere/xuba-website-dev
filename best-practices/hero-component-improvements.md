# Hero Component Implementation Plan

> **Component:** `sections/Home/Hero.tsx`  
> **Created:** January 2026  
> **Status:** Core Implementation Complete

---

## Overview

This document outlines the recommended improvements for the Hero component following best practices for accessibility, performance, maintainability, and user experience.

---

## Implementation Checklist

### Phase 1: Quick Wins (High Impact, Low Effort)
- [x] Convert headline to `<h1>`
- [x] Wrap in `<section>` with `aria-labelledby`
- [x] Add `aria-hidden` to decorative icons
- [x] Remove unused React import
- [x] Fix height mismatch
- [x] Replace gray colors with theme tokens

### Phase 2: Component Architecture
- [x] Create `HeroCTA` component with animated arrow
- [x] Update props interface with JSDoc
- [x] Make `secondaryCta` optional
- [ ] Extract SideLines to shared components (optional)

### Phase 3: Performance Optimization
- [x] Lazy load Aurora with `dynamic()` import
- [x] Add loading placeholder (gradient)
- [x] Implement reduced-motion support

### Phase 4: Animation & UX
- [x] Enhanced button states (focus-visible, active, hover arrow animation)
- [x] Background loading transition
- [ ] ~~Entrance animations~~ (removed per user preference)

### Phase 5: Advanced (Future)
- [x] Add StructuredData component for JSON-LD SEO
- [ ] Implement A/B testing support
- [ ] Add responsive image support

---

## Files Created/Modified

| File | Status | Description |
|------|--------|-------------|
| `sections/Home/Hero.tsx` | ✅ Done | Semantic HTML, accessibility, theme support |
| `src/components/ui/hero-cta.tsx` | ✅ Done | Reusable CTA with animated arrow on hover |
| `src/components/ThemedHeroBackground.tsx` | ✅ Done | Lazy Aurora, reduced motion, loading state |
| `src/components/StructuredData.tsx` | ✅ Done | JSON-LD SEO component |
| `src/components/BlurText.tsx` | ✅ Installed | React Bits animation (available for future use) |

---

## What Was Implemented

### Accessibility
- Proper `<section>` with `aria-labelledby`
- `<h1>` for main headline (SEO)
- `id="main-content"` for skip links
- `aria-hidden="true"` on decorative elements

### Performance
- Aurora (WebGL) lazy loaded only for dark theme
- Loading placeholder prevents flash
- Reduced motion: static gradient for users who prefer no motion

### UX Enhancements
- HeroCTA arrow animates in on hover (width expansion technique)
- Text and arrow stay centered together
- Button states: hover scale, focus ring, active press

### Theming
- Light: DotPattern background, xuba-green colors
- Dark: Aurora background, xuba-purple/green colors
- All colors use theme tokens (no hardcoded grays)

---

## Remaining Optional Tasks

1. **Extract SideLines** - Move to `src/components/ui/side-lines.tsx`
2. **A/B Testing** - Add variant prop for headline/CTA experiments
3. **Image Support** - Add hero image with Next.js Image optimization

---

## Testing Checklist

- [ ] Visual check: both themes
- [ ] Accessibility audit (axe-core)
- [ ] Lighthouse performance
- [ ] Reduced motion preference
- [ ] Mobile responsiveness
