import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

/**
 * Our Team Page singleton for managing the /our-team page content.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const ourTeamPageType = defineType({
  name: 'ourTeamPage',
  title: 'Our Team Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    // Page Header
    defineField({
      name: 'headerEyebrow',
      title: 'Header Eyebrow',
      type: 'string',
      description: 'Small text above the main title (e.g., "About The Team")',
    }),
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
      description: 'First part of the page title (e.g., "Meet")',
    }),
    defineField({
      name: 'headerTitleHighlight',
      title: 'Header Title Highlight',
      type: 'string',
      description: 'Highlighted/accent part of the title (e.g., "Our Team")',
    }),
    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      type: 'text',
      rows: 3,
      description: 'Introductory paragraph below the title',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Our Team page',
    }),
  ],
  preview: {
    select: {
      title: 'headerTitle',
      highlight: 'headerTitleHighlight',
    },
    prepare({ title, highlight }) {
      return {
        title: `${title || 'Meet'} ${highlight || 'Our Team'}`,
        subtitle: 'Our Team page content',
        media: UsersIcon,
      }
    },
  },
})
