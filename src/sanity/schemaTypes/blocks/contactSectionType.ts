import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

/**
 * Contact Section block for contact CTAs and forms.
 */
export const contactSectionType = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: EnvelopeIcon,
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
      name: 'showContactForm',
      title: 'Show Contact Form',
      type: 'boolean',
      description: 'Display the contact form',
      initialValue: true,
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Information',
      type: 'boolean',
      description: 'Display phone, email, and address from Site Settings',
      initialValue: true,
    }),
    defineField({
      name: 'showMap',
      title: 'Show Map',
      type: 'boolean',
      description: 'Display a map (requires address in Site Settings)',
      initialValue: false,
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
      showContactForm: 'showContactForm',
      showContactInfo: 'showContactInfo',
    },
    prepare({ title, showContactForm, showContactInfo }) {
      const features = []
      if (showContactForm) features.push('Form')
      if (showContactInfo) features.push('Info')
      return {
        title: `Contact: ${title || 'Untitled'}`,
        subtitle: features.length > 0 ? features.join(', ') : 'No features',
        media: EnvelopeIcon,
      }
    },
  },
})
