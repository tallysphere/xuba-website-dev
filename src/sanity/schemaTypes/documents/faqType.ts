import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

/**
 * FAQ document type for frequently asked questions.
 */
export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Support', value: 'support' },
          { title: 'Billing', value: 'billing' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this FAQ appears',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
    },
    prepare({ title, category }) {
      const categoryLabels: Record<string, string> = {
        general: 'General',
        services: 'Services',
        support: 'Support',
        billing: 'Billing',
      }
      return {
        title: title || 'Untitled Question',
        subtitle: categoryLabels[category] || category,
        media: HelpCircleIcon,
      }
    },
  },
})
