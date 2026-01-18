import { defineField, defineType, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

/**
 * Team Grid block for displaying team member cards.
 */
export const teamGridType = defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'object',
  icon: UsersIcon,
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
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      description: 'Select team members to display (leave empty to show all active members)',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'teamMember' }],
        }),
      ],
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      description: 'Maximum number of team members to display (when showing all)',
      validation: (rule) => rule.min(1).max(20),
    }),
    defineField({
      name: 'showBio',
      title: 'Show Biography',
      type: 'boolean',
      description: 'Display team member biographies',
      initialValue: false,
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
      initialValue: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      teamMembers: 'teamMembers',
    },
    prepare({ title, teamMembers }) {
      const count = teamMembers?.length || 0
      return {
        title: `Team Grid: ${title || 'Untitled'}`,
        subtitle: count > 0 ? `${count} selected members` : 'All active members',
        media: UsersIcon,
      }
    },
  },
})
