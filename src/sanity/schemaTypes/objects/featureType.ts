import { defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

/**
 * Feature object for service offerings and feature lists.
 */
export const featureType = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  icon: BulbOutlineIcon,
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
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (e.g., "cloud", "shield", "server")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: title || 'Untitled Feature',
        subtitle: description,
        media: BulbOutlineIcon,
      }
    },
  },
})
