import { defineField, defineType, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

/**
 * Navigation Item object for main navigation and footer links.
 */
const navItemType = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'children',
      title: 'Dropdown Items',
      type: 'array',
      description: 'Optional dropdown menu items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'childNavItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      hasChildren: 'children',
    },
    prepare({ title, hasChildren }) {
      return {
        title: title || 'Untitled',
        subtitle: hasChildren?.length ? `${hasChildren.length} dropdown items` : undefined,
      }
    },
  },
})

/**
 * Footer Column object for organizing footer links.
 */
const footerColumnType = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare({ title, links }) {
      return {
        title: title || 'Untitled Column',
        subtitle: links?.length ? `${links.length} links` : 'No links',
      }
    },
  },
})

/**
 * Navigation singleton for site-wide navigation configuration.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      description: 'Primary navigation items in the header',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      description: 'Optional call-to-action button in the header',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      description: 'Link columns in the footer',
      of: [defineArrayMember({ type: 'footerColumn' })],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      description: 'Privacy Policy, Terms of Service, etc.',
      of: [defineArrayMember({ type: 'link' })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
        subtitle: 'Site navigation configuration',
        media: MenuIcon,
      }
    },
  },
})

// Export the helper types for registration
export { navItemType, footerColumnType }
