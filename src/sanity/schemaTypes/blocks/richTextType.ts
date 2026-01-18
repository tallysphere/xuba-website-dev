import { defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons'

/**
 * Rich Text block for free-form content with Portable Text.
 */
export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title above the content',
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'maxWidth',
      title: 'Content Width',
      type: 'string',
      options: {
        list: [
          { title: 'Narrow (prose)', value: 'prose' },
          { title: 'Medium', value: 'md' },
          { title: 'Wide', value: 'lg' },
          { title: 'Full Width', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'prose',
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `Rich Text: ${title || 'Untitled'}`,
        media: TextIcon,
      }
    },
  },
})
