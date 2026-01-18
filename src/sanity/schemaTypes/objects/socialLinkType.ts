import { defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

/**
 * Social media link object for consistent social links across the site.
 */
export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'GitHub', value: 'github' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({ platform, url }) {
      const platformLabels: Record<string, string> = {
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        twitter: 'Twitter / X',
        instagram: 'Instagram',
        youtube: 'YouTube',
        github: 'GitHub',
      }
      return {
        title: platformLabels[platform] || platform || 'Social Link',
        subtitle: url,
        media: EarthGlobeIcon,
      }
    },
  },
})
