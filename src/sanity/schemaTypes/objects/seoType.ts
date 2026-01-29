import { defineField, defineType } from 'sanity'

/**
 * Reusable SEO object type for consistent metadata across all document types.
 * Uses coalesce() in GROQ queries for smart fallbacks.
 */
export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description:
        'Overrides the page title for search engines (50-60 characters recommended)',
      validation: (rule) =>
        rule.max(60).warning('SEO titles should be under 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 4,
      description: 'Description for search results (up to 300 characters)',
      validation: (rule) =>
        rule
          .max(500)
          .warning('Meta descriptions should be under 300 characters'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630 recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'If enabled, search engines will not index this page',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'string',
      description:
        'Optional: Specify the canonical URL if this content exists elsewhere (e.g., /about or https://xuba.co.nz/about)',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          // Allow relative paths starting with / or full URLs
          if (
            value.startsWith('/') ||
            value.startsWith('https://') ||
            value.startsWith('http://')
          ) {
            return true
          }
          return 'Must be a relative path (starting with /) or a full URL (starting with https://)'
        }),
    }),
  ],
})
