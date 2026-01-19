# Team Members Integration Plan

Integrate Sanity team members into the `/our-team` and `/about` pages.

---

## Current State

### Sanity Schema (teamMemberType)
| Field | Type | Notes |
|-------|------|-------|
| name | string | Required |
| slug | slug | Required |
| role | string | Required |
| image | image (hotspot) | With alt text field |
| bio | blockContent | Portable Text (rich text) |
| location | string | e.g., "Auckland, New Zealand" |
| email | string | Email validation |
| socialLinks | socialLink[] | platform + url |
| order | number | Display order |
| isActive | boolean | Filter inactive members |

### Existing Query (queries.ts)
```groq
TEAM_MEMBERS_QUERY = *[_type == "teamMember" && isActive == true] | order(order asc, name asc) {
  _id, name, slug, role, image, bio, location, email, socialLinks[]
}
```

### Infrastructure Ready
- `sanityFetch` from `src/sanity/lib/live.ts`
- `urlFor` from `src/sanity/lib/image.ts`
- `cdn.sanity.io` already in `next.config.ts` remotePatterns

---

## Implementation Steps

### Step 1: Regenerate TypeScript Types
Run typegen to get types for the 3 team members you added:
```bash
npm run typegen
```

### Step 2: Update `/our-team/page.tsx`

**Changes:**
1. Convert from Client Component to Server Component (remove `'use client'`)
2. Import `sanityFetch` and `TEAM_MEMBERS_QUERY`
3. Import `urlFor` for image URLs
4. Make the component `async` and fetch data
5. Replace hardcoded `people` array with Sanity data
6. Use `_id` as key instead of `name`

**Data Mapping:**
| Hardcoded Field | Sanity Field |
|-----------------|--------------|
| `name` | `name` |
| `role` | `role` |
| `imageUrl` | `urlFor(image).width(1024).height(1024).url()` |
| `bio` | `bio` (needs Portable Text renderer if rich text) |
| `xUrl` | `socialLinks.find(s => s.platform === 'twitter')?.url` |
| `linkedinUrl` | `socialLinks.find(s => s.platform === 'linkedin')?.url` |

### Step 3: Update `/about/page.tsx`

**Changes:**
1. Remove `'use client'` directive
2. Extract CountUp to a separate client component (it needs client-side JS)
3. Import `sanityFetch` and `TEAM_MEMBERS_QUERY`
4. Import `urlFor` for image URLs
5. Make the component `async` and fetch data
6. Replace hardcoded `team` array with Sanity data

**Data Mapping:**
| Hardcoded Field | Sanity Field |
|-----------------|--------------|
| `name` | `name` |
| `role` | `role` |
| `imageUrl` | `urlFor(image).width(500).height(500).url()` |
| `location` | `location` |

### Step 4: Create CountUp Client Component (for about page)
The about page uses `react-countup` which requires client-side JavaScript.
Extract to: `src/components/CountUpStats.tsx`

---

## Code Snippets

### Fetching Team Members (Server Component)
```tsx
import { sanityFetch } from '@/sanity/lib/live'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export default async function OurTeamPage() {
  const { data: teamMembers } = await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  })

  return (
    // ... render teamMembers
  )
}
```

### Image URL Generation
```tsx
// For high-quality team photos (our-team page)
urlFor(member.image).width(1024).height(1024).fit('crop').url()

// For grid thumbnails (about page)
urlFor(member.image).width(500).height(500).fit('crop').url()
```

### Getting Social Links
```tsx
const linkedInUrl = member.socialLinks?.find(
  (link) => link.platform === 'linkedin'
)?.url

const twitterUrl = member.socialLinks?.find(
  (link) => link.platform === 'twitter'
)?.url
```

---

## Files to Modify

| File | Action |
|------|--------|
| `src/app/(frontend)/our-team/page.tsx` | Convert to Server Component, fetch from Sanity |
| `src/app/(frontend)/about/page.tsx` | Convert to Server Component, fetch from Sanity |
| `src/components/CountUpStats.tsx` | **NEW** - Extract client-side CountUp logic |

---

## Testing Checklist

- [ ] Run `npm run typegen` to generate types
- [ ] Verify team members display on `/our-team`
- [ ] Verify team members display on `/about`
- [ ] Check images load correctly from Sanity CDN
- [ ] Verify social links work (if populated)
- [ ] Test responsive layout on mobile
- [ ] Confirm `isActive: false` members are hidden

---

## Notes

- **Bio field**: Currently using `blockContent` (Portable Text). If you want to display it, you'll need `@portabletext/react`. For now, we can use a plain text fallback or skip it.
- **Social Links**: The schema uses `socialLink` objects with `platform` (facebook, linkedin, twitter, etc.) and `url`. Map these to the existing X/LinkedIn icons.
- **Order**: Team members are ordered by `order` field, then alphabetically by name.
