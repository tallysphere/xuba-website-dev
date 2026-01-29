import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/**
 * Terms of Service Page singleton for managing the /terms-of-service page content.
 * Uses Portable Text for rich legal content with proper formatting.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const termsOfServicePageType = defineType({
  name: 'termsOfServicePage',
  title: 'Terms of Service',
  type: 'document',
  icon: DocumentTextIcon,
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
      description: 'Main page title (e.g., "Terms of Service")',
      validation: (rule) => rule.required(),
      initialValue: 'Terms of Service',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      description: 'Word to highlight in green (e.g., "Service")',
      initialValue: 'Service',
    }),

    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'When these terms were last updated (displayed on the page)',
    }),

    // Rich Text Body
    defineField({
      name: 'body',
      title: 'Terms Content',
      type: 'blockContent',
      description: 'Full terms of service content using rich text',
      validation: (rule) => rule.required(),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Terms of Service page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, lastUpdated }) {
      return {
        title: title || 'Terms of Service',
        subtitle: lastUpdated
          ? `Last updated: ${lastUpdated}`
          : 'Terms of Service page',
        media: DocumentTextIcon,
      }
    },
  },
})
