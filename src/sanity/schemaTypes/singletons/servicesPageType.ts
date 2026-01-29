import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

/**
 * Services Page singleton for managing the /services page content.
 * Controls the hero section content and SEO for the services listing page.
 * The actual service cards are managed via the Homepage serviceCards field.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: RocketIcon,
  fields: [
    // Hero Section
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the main title (e.g., "What We Do")',
      initialValue: 'What We Do',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main page title (e.g., "Our Services")',
      validation: (rule) => rule.required(),
      initialValue: 'Our Services',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      description: 'Word to highlight in green (e.g., "Services")',
      initialValue: 'Services',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the title',
      initialValue:
        'We offer a robust range of IT support products and services to save you money, keep your systems happy, improve efficiency and help you work smarter.',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Services page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Services Page',
        subtitle: 'Services listing page content',
        media: RocketIcon,
      }
    },
  },
})
