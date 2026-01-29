import { defineField, defineType, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

/**
 * About Page singleton for managing the /about page content.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    // Page Header
    defineField({
      name: 'headerEyebrow',
      title: 'Header Eyebrow',
      type: 'string',
      description: 'Small text above the main title (e.g., "Who Are We?")',
    }),
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
      description: 'First part of the page title (e.g., "Our")',
    }),
    defineField({
      name: 'headerTitleHighlight',
      title: 'Header Title Highlight',
      type: 'string',
      description: 'Highlighted/accent word in the title (e.g., "Team")',
    }),

    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description:
        'Main headline for the about page (e.g., "Clever IT & Clever People")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 4,
      description: 'Supporting text below the title',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      description:
        'Gallery images for the hero section (4 landscape images recommended)',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            }),
          ],
        }),
      ],
      validation: (rule) =>
        rule.max(4).warning('Maximum 4 images for the hero grid'),
    }),

    // Full-width Image Section
    defineField({
      name: 'enableFullWidthImage',
      title: 'Enable Full-width Image',
      type: 'boolean',
      description:
        'Show a full-width image between the hero and mission sections',
      initialValue: false,
    }),
    defineField({
      name: 'fullWidthImage',
      title: 'Full-width Image',
      type: 'image',
      description: 'A wide landscape image (aspect 5:2 recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        }),
      ],
      hidden: ({ parent }) => !parent?.enableFullWidthImage,
    }),

    // Mission Section
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      description: 'Title for the mission section (e.g., "Our mission")',
    }),
    defineField({
      name: 'missionIntro',
      title: 'Mission Introduction',
      type: 'text',
      rows: 4,
      description: 'Lead paragraph for the mission section',
    }),
    defineField({
      name: 'missionBody',
      title: 'Mission Body',
      type: 'text',
      rows: 6,
      description: 'Additional mission content',
    }),

    // Stats Section
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description:
        'Key statistics to display (e.g., years in business, clients, projects)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Years in Business"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The number value (e.g., "10", "100", "1000")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'postfix',
              title: 'Postfix',
              type: 'string',
              description: 'Optional suffix (e.g., "+", "%", "K")',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
              postfix: 'postfix',
            },
            prepare({ label, value, postfix }) {
              return {
                title: `${value}${postfix || ''} ${label}`,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4).warning('Maximum 4 stats recommended'),
    }),

    // Team Section
    defineField({
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
      description: 'Title for the team section (e.g., "Our team")',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Team Section Description',
      type: 'text',
      rows: 3,
      description: 'Brief description above the team grid',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the About page',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      media: 'heroImages.0',
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Page',
        subtitle: 'About page content',
        media: media || UsersIcon,
      }
    },
  },
})
