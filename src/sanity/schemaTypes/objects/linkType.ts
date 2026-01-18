import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

/**
 * Reusable link object supporting both internal and external links.
 * Uses conditional visibility to show relevant fields based on link type.
 */
export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Display text for the link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Page',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'service' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      description: 'Opens link in a new browser tab',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      externalUrl: 'externalUrl',
      internalTitle: 'internalLink.title',
    },
    prepare({ title, linkType, externalUrl, internalTitle }) {
      const subtitle =
        linkType === 'external' ? externalUrl : internalTitle || 'No page selected'
      return {
        title: title || 'Untitled Link',
        subtitle,
        media: LinkIcon,
      }
    },
  },
})
