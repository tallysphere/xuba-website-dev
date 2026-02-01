import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

/**
 * Homepage singleton for managing the / (root) page content.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'services', title: 'Services Section' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ===========================================
    // HERO SECTION
    // ===========================================
    defineField({
      name: 'heroHeadlinePart1',
      title: 'Headline Part 1',
      type: 'string',
      description: 'First part of the headline (e.g., "Looking for a")',
      group: 'hero',
      initialValue: 'Looking for a',
    }),
    defineField({
      name: 'heroHighlightWord',
      title: 'Highlight Word',
      type: 'string',
      description: 'The word that gets highlighted (e.g., "dedicated")',
      group: 'hero',
      initialValue: 'dedicated',
    }),
    defineField({
      name: 'heroHeadlinePart2',
      title: 'Headline Part 2',
      type: 'string',
      description: 'Second part of the headline (e.g., "IT Support?")',
      group: 'hero',
      initialValue: 'IT Support?',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the headline',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Explore our Services',
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          initialValue: '/services',
        }),
      ],
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Get in Touch',
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          initialValue: '/contact',
        }),
      ],
    }),

    // ===========================================
    // SERVICES SECTION
    // ===========================================
    defineField({
      name: 'servicesTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Title for the services section',
      group: 'services',
      initialValue: 'One-Stop IT Solutions',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Brief description below the title',
      group: 'services',
    }),
    defineField({
      name: 'serviceCards',
      title: 'Service Cards',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'URL path (e.g., "/services/cloud-technology")',
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
              description: 'Button text (e.g., "Explore Cloud Technology")',
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
              description:
                'Optional image for cards that display images (cards 2, 4, 6)',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe the image for accessibility',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'ctaLabel',
              media: 'image',
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.max(6).warning('Maximum 6 service cards recommended'),
    }),

    // ===========================================
    // SEO
    // ===========================================
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Homepage',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Homepage content',
        media: HomeIcon,
      }
    },
  },
})
