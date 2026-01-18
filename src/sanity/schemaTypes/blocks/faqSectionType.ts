import { defineField, defineType, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

/**
 * FAQ Section block for displaying frequently asked questions.
 */
export const faqSectionType = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      description: 'Select FAQs to display (leave empty to show all)',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'faq' }],
        }),
      ],
    }),
    defineField({
      name: 'filterByCategory',
      title: 'Filter by Category',
      type: 'string',
      description: 'Show only FAQs from a specific category (when showing all)',
      options: {
        list: [
          { title: 'All Categories', value: '' },
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Support', value: 'support' },
          { title: 'Billing', value: 'billing' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      description: 'Maximum number of FAQs to display (when showing all)',
      validation: (rule) => rule.min(1).max(20),
    }),
    defineField({
      name: 'showContactCta',
      title: 'Show Contact CTA',
      type: 'boolean',
      description: 'Display "Still have questions?" CTA below FAQs',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs',
      filterByCategory: 'filterByCategory',
    },
    prepare({ title, faqs, filterByCategory }) {
      const count = faqs?.length || 0
      const category = filterByCategory ? ` (${filterByCategory})` : ''
      return {
        title: `FAQs: ${title || 'Untitled'}`,
        subtitle: count > 0 ? `${count} selected FAQs` : `All FAQs${category}`,
        media: HelpCircleIcon,
      }
    },
  },
})
