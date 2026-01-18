import { defineField, defineType } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

/**
 * Statistic object for displaying key metrics and numbers.
 * Used in stats sections and about pages.
 */
export const statType = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The numeric value (e.g., "100", "10")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'Optional suffix (e.g., "+", "%", "K")',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Description of the stat (e.g., "Years in Business")',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      suffix: 'suffix',
      label: 'label',
    },
    prepare({ value, suffix, label }) {
      return {
        title: `${value}${suffix || ''} - ${label}`,
        media: ActivityIcon,
      }
    },
  },
})
