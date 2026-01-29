import { defineField, defineType } from 'sanity'
import { LockIcon } from '@sanity/icons'

/**
 * Privacy Policy Page singleton for managing the /privacy page content.
 * Uses Portable Text for rich legal content with proper formatting.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const privacyPolicyPageType = defineType({
  name: 'privacyPolicyPage',
  title: 'Privacy Policy',
  type: 'document',
  icon: LockIcon,
  fields: [
    // Page Header
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the main title (e.g., "Legal")',
      initialValue: 'Legal',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main page title (e.g., "Privacy Policy")',
      validation: (rule) => rule.required(),
      initialValue: 'Privacy Policy',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      description: 'Word to highlight in green (e.g., "Policy")',
      initialValue: 'Policy',
    }),

    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'When this policy was last updated (displayed on the page)',
    }),

    // Rich Text Body
    defineField({
      name: 'body',
      title: 'Privacy Policy Content',
      type: 'blockContent',
      description: 'Full privacy policy content using rich text',
      validation: (rule) => rule.required(),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Privacy Policy page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, lastUpdated }) {
      return {
        title: title || 'Privacy Policy',
        subtitle: lastUpdated
          ? `Last updated: ${lastUpdated}`
          : 'Privacy Policy page',
        media: LockIcon,
      }
    },
  },
})
