import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

/**
 * Site Settings singleton for global site configuration.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of the website',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Site logo (SVG or PNG recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32 or 16x16 PNG)',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      description:
        'Default SEO settings used when pages do not specify their own',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Main contact phone number',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'businessHours',
          title: 'Business Hours',
          type: 'string',
          description: 'e.g., "Mon-Fri 9am-5pm"',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
    defineField({
      name: 'localBusiness',
      title: 'Local Business (JSON-LD)',
      type: 'object',
      description:
        'Structured data for search engines (Organization/LocalBusiness schema)',
      fields: [
        defineField({
          name: 'businessType',
          title: 'Business Type',
          type: 'string',
          description: 'Schema.org type',
          options: {
            list: [
              { title: 'Local Business', value: 'LocalBusiness' },
              { title: 'IT Service', value: 'ProfessionalService' },
              { title: 'Computer Store', value: 'ComputerStore' },
              { title: 'Organization', value: 'Organization' },
            ],
          },
          initialValue: 'ProfessionalService',
        }),
        defineField({
          name: 'legalName',
          title: 'Legal Business Name',
          type: 'string',
          description: 'Official registered business name',
        }),
        defineField({
          name: 'description',
          title: 'Business Description',
          type: 'text',
          rows: 3,
          description: 'Short description of your business for search engines',
        }),
        defineField({
          name: 'streetAddress',
          title: 'Street Address',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          initialValue: 'Hamilton',
        }),
        defineField({
          name: 'region',
          title: 'Region/State',
          type: 'string',
          initialValue: 'Waikato',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'NZ',
        }),
        defineField({
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          description: 'GPS latitude coordinate',
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          description: 'GPS longitude coordinate',
        }),
        defineField({
          name: 'priceRange',
          title: 'Price Range',
          type: 'string',
          description: 'Relative price range',
          options: {
            list: [
              { title: '$ - Budget', value: '$' },
              { title: '$$ - Moderate', value: '$$' },
              { title: '$$$ - Premium', value: '$$$' },
            ],
          },
        }),
        defineField({
          name: 'openingHours',
          title: 'Opening Hours',
          type: 'array',
          description:
            'Business hours in schema.org format (e.g., "Mo-Fr 08:30-17:00")',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'serviceArea',
          title: 'Service Area',
          type: 'array',
          description: 'Areas/cities you serve',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'foundingDate',
          title: 'Founding Date',
          type: 'date',
          description: 'When the business was founded',
        }),
        defineField({
          name: 'numberOfEmployees',
          title: 'Number of Employees',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      description: 'Third-party analytics configuration',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'e.g., G-XXXXXXXXXX',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'e.g., GTM-XXXXXXX',
        }),
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      description: 'Content for the reusable Contact Section component',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Main heading text',
          initialValue: 'We are here to help you with your IT needs',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          description: 'Text below the heading',
          initialValue: 'Get in touch with us Today.',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Button Label',
          type: 'string',
          initialValue: 'Get in touch',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '/contact',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
        media: media || CogIcon,
      }
    },
  },
})
