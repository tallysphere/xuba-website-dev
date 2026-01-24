# Best Practices Documentation

This directory contains implementation plans and best practices guidelines for the Xuba website.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [hero-component-improvements.md](./hero-component-improvements.md) | Detailed improvement plan for the Hero component | Planning |
| [component-standards.md](./component-standards.md) | General component development standards | Active |

## Quick Reference

### Component Checklist

Before marking any component as complete, ensure:

- [ ] Uses semantic HTML (`<section>`, `<article>`, `<nav>`, etc.)
- [ ] Has proper heading hierarchy (`<h1>` → `<h2>` → etc.)
- [ ] Includes ARIA labels where needed
- [ ] Supports both light and dark themes
- [ ] Has responsive styling for all breakpoints
- [ ] Uses theme tokens (not hardcoded colors)
- [ ] Has TypeScript interfaces with JSDoc comments
- [ ] Follows the `rounded-none` design pattern
- [ ] Has proper focus states for keyboard navigation

### Theming Reference

Always check `/theme` route or `src/app/(frontend)/theme/page.tsx` for color guidelines.

**Light Theme:**
- Background: `bg-white`
- Primary Text: `text-xuba-green-900`
- Secondary Text: `text-xuba-green-600`
- Accents: `text-xuba-green-500`

**Dark Theme:**
- Background: `bg-xuba-purple-900` or `bg-xuba-purple-950`
- Primary Text: `text-xuba-green-50` or `text-white`
- Secondary Text: `text-xuba-green-200`
- Accents: `text-xuba-green-400`

### Button Pattern

```
rounded-none border-4 hover:scale-105 transition-all duration-300
Light: bg-gray-100 border-gray-600 text-gray-700 shadow-lg
Dark: bg-transparent border-white text-white shadow-xl shadow-xuba-green-500/30
```

## Contributing

When adding new best practices:
1. Create a new markdown file in this directory
2. Update this README with a link
3. Include implementation status tracking
