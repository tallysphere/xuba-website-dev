import { defineField, defineType, defineArrayMember } from 'sanity'
import { GridIcon } from '@sanity/icons'

/**
 * Services Grid block for displaying service cards.
 */
export const servicesGridType = defineType({
  name: 'servicesGrid',
  title: 'Services Grid',
  type: 'object',
  icon: GridIcon,
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
      name: 'services',
      title: 'Services',
      type: 'array',
      description: 'Select services to display (leave empty to show all)',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
    }),
    defineField({
      name: 'showAllLink',
      title: 'Show "View All Services" Link',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      services: 'services',
    },
    prepare({ title, services }) {
      const count = services?.length || 0
      return {
        title: `Services Grid: ${title || 'Untitled'}`,
        subtitle: count > 0 ? `${count} selected services` : 'All services',
        media: GridIcon,
      }
    },
  },
})
