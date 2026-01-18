import { defineField, defineType, defineArrayMember } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

/**
 * Stats Section block for displaying key metrics and statistics.
 */
export const statsSectionType = defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  icon: ActivityIcon,
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
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [defineArrayMember({ type: 'stat' })],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Accent', value: 'accent' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      stats: 'stats',
    },
    prepare({ title, stats }) {
      const count = stats?.length || 0
      return {
        title: `Stats: ${title || 'Untitled'}`,
        subtitle: `${count} statistics`,
        media: ActivityIcon,
      }
    },
  },
})
