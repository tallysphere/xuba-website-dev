# Component Development Standards

> Standards and patterns for building components in the Xuba website.

---

## Table of Contents

1. [File Structure](#file-structure)
2. [TypeScript Standards](#typescript-standards)
3. [Accessibility Requirements](#accessibility-requirements)
4. [Theming Guidelines](#theming-guidelines)
5. [Performance Best Practices](#performance-best-practices)
6. [Animation Standards](#animation-standards)
7. [Responsive Design](#responsive-design)

---

## File Structure

### Component Location

| Type | Location | Example |
|------|----------|---------|
| Page sections | `sections/{Page}/` | `sections/Home/Hero.tsx` |
| Reusable UI | `src/components/ui/` | `src/components/ui/button.tsx` |
| Layout components | `src/components/` | `src/components/Header.tsx` |
| Theme-aware wrappers | `src/components/` | `src/components/ThemedHeroBackground.tsx` |

### Naming Conventions

- **Components:** PascalCase (`HeroSection.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Hooks:** camelCase with `use` prefix (`useTheme.ts`)
- **Types:** PascalCase with descriptive suffix (`HomeHeroProps`)

---

## TypeScript Standards

### Props Interface

```typescript
/**
 * Props for the ComponentName component.
 * 
 * @example
 * <ComponentName title="Hello" variant="primary" />
 */
interface ComponentNameProps {
  /** The main title displayed in the component */
  title: string
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary'
  /** Additional CSS classes */
  className?: string
  /** Child elements */
  children?: React.ReactNode
}
```

### Export Pattern

```typescript
// Named export for components
export function ComponentName({ ...props }: ComponentNameProps) {
  return (...)
}

// Or default export for page sections
const PageSection = () => { ... }
export default PageSection
```

### Avoid

- `any` type - Use proper typing or `unknown`
- Inline type definitions for complex types
- Missing JSDoc comments on public interfaces

---

## Accessibility Requirements

### Semantic HTML

| Element | Use Case |
|---------|----------|
| `<section>` | Major page sections with a heading |
| `<article>` | Self-contained content (blog posts, cards) |
| `<nav>` | Navigation menus |
| `<header>` | Page or section headers |
| `<footer>` | Page or section footers |
| `<main>` | Primary page content (once per page) |
| `<aside>` | Tangentially related content |

### Heading Hierarchy

- Only one `<h1>` per page (usually in Hero)
- Headings must not skip levels (`<h1>` → `<h3>` is wrong)
- Use heading levels to convey document structure

### ARIA Guidelines

```tsx
// Interactive elements need labels
<button aria-label="Close menu">
  <XIcon aria-hidden="true" />
</button>

// Sections need identification
<section aria-labelledby="services-heading">
  <h2 id="services-heading">Our Services</h2>
</section>

// Loading states
<div aria-busy="true" aria-live="polite">
  Loading...
</div>
```

### Keyboard Navigation

- All interactive elements must be focusable
- Custom focus styles must be visible
- Focus order must be logical (follow visual order)

```tsx
// Custom focus styles
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xuba-green-500 focus-visible:ring-offset-2"
```

---

## Theming Guidelines

### Color Usage

**Never hardcode colors.** Always use theme tokens:

```tsx
// ❌ Bad
className="bg-[#b8d02f] text-[#1a1a1a]"

// ✅ Good
className="bg-xuba-green-500 text-xuba-green-900 dark:text-white"
```

### Theme-Aware Components

For components that need JavaScript theme detection:

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemedComponent() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) return null // or skeleton

  const isDark = resolvedTheme === 'dark'
  // ... render based on theme
}
```

### CSS-Only Theme Switching

Prefer CSS `dark:` variants over JavaScript when possible:

```tsx
// ✅ Preferred - no JS needed
className="bg-white dark:bg-xuba-purple-900 text-xuba-green-900 dark:text-white"
```

---

## Performance Best Practices

### Client vs Server Components

| Use Server Component | Use Client Component |
|---------------------|---------------------|
| Static content | Interactive elements |
| Data fetching | State management |
| Accessing backend | Browser APIs |
| Rendering markdown | Event listeners |
| SEO-critical content | Animations |

### Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // if not needed for SEO
})
```

### Image Optimization

```tsx
import Image from 'next/image'

// Always use Next.js Image
<Image
  src="/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  priority // for above-fold images
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

---

## Animation Standards

### Framer Motion Usage

```tsx
import { motion } from 'framer-motion'

// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

### Reduced Motion Support

Always respect user preferences:

```tsx
// CSS approach
className="motion-safe:animate-bounce"

// Framer Motion approach
const prefersReducedMotion = usePrefersReducedMotion()
<motion.div
  animate={prefersReducedMotion ? {} : { scale: 1.1 }}
/>
```

### Transition Standards

| Property | Duration | Easing |
|----------|----------|--------|
| Color changes | 150-200ms | ease |
| Transform (hover) | 200-300ms | ease-out |
| Entrance animations | 300-500ms | ease-out |
| Exit animations | 200-300ms | ease-in |
| Complex sequences | 500-800ms | custom |

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| `sm` | 640px | Large phones, landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Mobile-First Approach

```tsx
// ✅ Mobile-first
className="flex-col md:flex-row"
className="text-base md:text-lg lg:text-xl"
className="px-4 md:px-8 lg:px-12"

// ❌ Desktop-first
className="flex-row md:flex-col"
```

### Touch Targets

- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- Consider thumb zones on mobile

---

## Component Template

```tsx
'use client' // Only if needed

import { cn } from '@/lib/utils'

/**
 * ComponentName - Brief description of what it does.
 * 
 * @example
 * <ComponentName title="Hello" />
 */
interface ComponentNameProps {
  /** Description of prop */
  title: string
  /** Optional additional classes */
  className?: string
}

export function ComponentName({ title, className }: ComponentNameProps) {
  return (
    <section 
      aria-labelledby="component-heading"
      className={cn(
        'base-styles-here',
        'dark:dark-styles-here',
        className
      )}
    >
      <h2 id="component-heading">{title}</h2>
    </section>
  )
}
```

---

## Checklist for New Components

- [ ] Semantic HTML structure
- [ ] Proper TypeScript interfaces with JSDoc
- [ ] Accessibility (ARIA, keyboard nav, focus states)
- [ ] Light and dark theme support
- [ ] Responsive across all breakpoints
- [ ] Performance optimized (Server Component if possible)
- [ ] Reduced motion support
- [ ] Unit tests (if applicable)
- [ ] Storybook story (if using Storybook)
