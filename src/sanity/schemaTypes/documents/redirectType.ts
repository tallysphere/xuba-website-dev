import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'
import type { SanityDocumentLike } from 'sanity'

/**
 * Validates that a path starts with / and contains only valid characters.
 */
function isValidPath(value: string | undefined): string | true {
  if (!value) return 'Required'
  if (!value.startsWith('/')) return 'Must start with /'
  if (/[^a-zA-Z0-9\-_/:]/.test(value)) return 'Contains invalid characters'
  return true
}

/**
 * Redirect document type for managing URL redirects.
 * Used to redirect old URLs to new ones without losing SEO value.
 */
export const redirectType = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: LinkIcon,
  validation: (rule) =>
    rule.custom((doc: SanityDocumentLike | undefined) => {
      if (doc?.source === doc?.destination) {
        return 'Source and destination cannot be the same'
      }
      return true
    }),
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'The old URL path (e.g., /old-page)',
      validation: (rule) => rule.required().custom(isValidPath),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'The new URL path or full URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect (301)',
      type: 'boolean',
      description: '301 (permanent) or 302 (temporary) redirect',
      initialValue: true,
    }),
    defineField({
      name: 'isEnabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Toggle to enable/disable this redirect',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
      isEnabled: 'isEnabled',
    },
    prepare({ source, destination, permanent, isEnabled }) {
      const status = isEnabled ? (permanent ? '301' : '302') : 'Disabled'
      return {
        title: source || 'No source',
        subtitle: `→ ${destination || 'No destination'} (${status})`,
        media: LinkIcon,
      }
    },
  },
})
