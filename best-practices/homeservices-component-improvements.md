# HomeServices Component Implementation Plan

> **Component:** `sections/Home/HomeServices.tsx`  
> **Created:** January 2026  
> **Status:** Complete

---

## Overview

This document outlines the improvements made to the HomeServices component following the established best practices for accessibility, performance, theming, and user experience.

---

## Implementation Checklist

### Phase 1: Critical Light Theme Fixes
- [x] Fix description text color (`text-neutral-200` → `text-xuba-green-600`)
- [x] Add Card light mode background (`bg-xuba-green-50`)
- [x] Fix CTA link text color (`text-gray-50` → `text-xuba-green-800`)

### Phase 2: Color Token Standardization
- [x] Replace all `neutral-*` colors with xuba brand tokens
- [x] Replace all `gray-*` colors with xuba brand tokens
- [x] Update Header corner dots colors
- [x] Update SkeletonContainer gradients
- [x] Update SVG path colors
- [x] Update CardTitle and CardDescription colors

### Phase 3: Semantic HTML & Accessibility
- [x] Wrap in `<section aria-labelledby="services-heading">`
- [x] Add `id="services-heading"` to `<h2>`
- [x] Add `aria-hidden="true"` to decorative SVGs
- [x] Add `aria-hidden="true"` to Globe canvas
- [x] Add `aria-hidden="true"` to ArrowRightIcon
- [x] Improve image alt text descriptions

### Phase 4: Performance Optimization
- [x] Extract Globe to separate component file
- [x] Lazy load Globe with `dynamic()` import
- [x] Add loading placeholder for Globe

### Phase 5: Reduced Motion Support
- [x] Add `motion-reduce:` classes to Header animation
- [x] Add `motion-reduce:hidden` to animated SVG paths
- [x] Add `motion-reduce:animate-none` to SkeletonContainers
- [x] Globe stops rotation when reduced motion preferred

### Phase 6: Code Quality
- [x] Remove unused React import
- [x] Add JSDoc comments to all interfaces
- [x] Add JSDoc comments to all components
- [x] Apply `rounded-none` design pattern

---

## Files Created/Modified

| File | Status | Description |
|------|--------|-------------|
| `sections/Home/HomeServices.tsx` | ✅ Modified | Full theming, accessibility, performance |
| `src/components/Globe.tsx` | ✅ Created | Extracted Globe with reduced motion support |

---

## Color Changes Summary

| Element | Before | After |
|---------|--------|-------|
| Section title | `text-neutral-800` | `text-xuba-green-900 dark:text-xuba-green-50` |
| Description | `text-neutral-200` | `text-xuba-green-600 dark:text-xuba-green-200` |
| Card background | (none for light) | `bg-xuba-green-50 dark:bg-xuba-purple-800/80` |
| Card border | - | `border-xuba-green-200 dark:border-xuba-purple-500/25` |
| CardTitle | `text-neutral-700` | `text-xuba-green-800 dark:text-xuba-green-400` |
| CardDescription | `text-neutral-500` | `text-xuba-green-600 dark:text-xuba-green-100` |
| CTA text | `text-gray-50` | `text-xuba-green-800 dark:text-xuba-green-50` |
| Image borders | `border-neutral-200` | `border-xuba-green-200 dark:border-xuba-purple-600` |
| Header dots | `bg-neutral-200` | `bg-xuba-green-300 dark:bg-xuba-green-500/55` |
| SVG paths | `text-neutral-200` | `text-xuba-green-200 dark:text-xuba-purple-700` |
| SkeletonContainer | `from-white to-white` | `from-white to-xuba-green-50` |
| Code text | `text-neutral-800` | `text-xuba-green-800 dark:text-xuba-green-200` |

---

## Accessibility Improvements

1. **Semantic Structure**
   - Wrapped in `<section>` with `aria-labelledby`
   - Heading has proper `id` for reference

2. **Decorative Elements Hidden**
   - All SVG animations: `aria-hidden="true"`
   - Globe canvas: `aria-hidden="true"`
   - Arrow icons: `aria-hidden="true"`

3. **Image Alt Text**
   - Changed from generic "Dashboard" to descriptive text
   - Example: "IT Support dashboard showing helpdesk ticket management"

---

## Performance Improvements

1. **Globe Lazy Loading**
   - Extracted to `src/components/Globe.tsx`
   - Uses `dynamic()` with `ssr: false`
   - Shows gradient placeholder while loading

2. **Reduced Motion**
   - Globe stops rotating for users who prefer reduced motion
   - SkeletonContainer animations disabled
   - SVG gradient animations hidden

---

## Design System Compliance

- All colors use xuba brand tokens
- `rounded-none` applied to cards and images
- Consistent hover states with brand colors
- Proper dark/light theme support throughout
