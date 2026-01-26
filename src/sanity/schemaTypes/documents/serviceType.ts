import { defineField, defineType, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'

/**
 * Service document type for IT service offerings.
 * Extended with hero, intro, benefits, services list, and CTA sections.
 */
export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'intro', title: 'Introduction' },
    { name: 'content', title: 'Rich Text Content' },
    { name: 'benefits', title: 'Benefits' },
    { name: 'services', title: 'What We Handle' },
    { name: 'faq', title: 'FAQ' },
    { name: 'cta', title: 'Call to Action' },
    { name: 'related', title: 'Related Services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ===========================================
    // BASIC INFO
    // ===========================================
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return 'Slug must be lowercase with hyphens only'
          }
          return true
        }),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      description: 'Brief description for service cards (150 characters recommended)',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      group: 'basic',
      description: 'Icon identifier from lucide-react (e.g., "Cloud", "Shield", "Server", "Headphones")',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'basic',
      description: 'Order in which this service appears in listings',
      initialValue: 0,
    }),

    // ===========================================
    // HERO SECTION
    // ===========================================
    defineField({
      name: 'heroImage',
      title: 'Hero Featured Image',
      type: 'image',
      group: 'hero',
      description: 'Optional large featured image displayed in the hero section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'hero',
      description: 'Main headline tagline (e.g., "Simple. Flexible. Secure.")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'taglineHighlight',
      title: 'Tagline Highlight Word',
      type: 'string',
      group: 'hero',
      description: 'The word in the tagline to highlight in green (e.g., "Secure")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'hero',
      description: 'Smaller text below the headline (e.g., "Your data, accessible anywhere—without the headaches.")',
    }),

    // ===========================================
    // INTRODUCTION SECTION
    // ===========================================
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      group: 'intro',
      rows: 5,
      description: 'The main paragraph for the introduction section',
    }),
    defineField({
      name: 'introHighlights',
      title: 'Highlighted Words',
      type: 'array',
      group: 'intro',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Words to highlight in green within the intro text',
    }),

    // ===========================================
    // RICH TEXT CONTENT SECTION
    // ===========================================
    defineField({
      name: 'bodyContent',
      title: 'Rich Text Content',
      type: 'blockContent',
      group: 'content',
      description: 'Detailed service description with headings, paragraphs, lists, and images. This is the main content area for in-depth information.',
    }),

    // ===========================================
    // BENEFITS SECTION
    // ===========================================
    defineField({
      name: 'benefitsTitle',
      title: 'Benefits Section Title',
      type: 'string',
      group: 'benefits',
      description: 'Title for the benefits section (e.g., "Why Go Cloud?")',
      initialValue: 'Benefits',
    }),
    defineField({
      name: 'benefitsHighlight',
      title: 'Benefits Title Highlight',
      type: 'string',
      group: 'benefits',
      description: 'Word to highlight in the benefits title',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'benefits',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'benefit',
          title: 'Benefit',
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
              rows: 2,
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "ShieldCheck", "TrendingUp", "Database")',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),

    // ===========================================
    // WHAT WE HANDLE SECTION
    // ===========================================
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string',
      group: 'services',
      description: 'Title for the "What We Handle" section',
      initialValue: 'What We Handle For You',
    }),
    defineField({
      name: 'servicesTitleHighlight',
      title: 'Services Title Highlight',
      type: 'string',
      group: 'services',
      description: 'Word to highlight in the services title (e.g., "Handle")',
    }),
    defineField({
      name: 'serviceItems',
      title: 'Service Items',
      type: 'array',
      group: 'services',
      of: [defineArrayMember({ type: 'string' })],
      description: 'List of specific services/tasks handled',
    }),

    // ===========================================
    // FAQ SECTION
    // ===========================================
    defineField({
      name: 'faqTitle',
      title: 'FAQ Section Title',
      type: 'string',
      group: 'faq',
      description: 'Title for the FAQ section',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'faqTitleHighlight',
      title: 'FAQ Title Highlight',
      type: 'string',
      group: 'faq',
      description: 'Word to highlight in the FAQ title (e.g., "Questions")',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(10),
    }),

    // ===========================================
    // CTA SECTION
    // ===========================================
    defineField({
      name: 'contactCta',
      title: 'Contact Mini-CTA',
      type: 'object',
      group: 'cta',
      description: 'Optional mini contact CTA section displayed between content sections',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Mini-CTA',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Get a free consultation call!',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get In Touch',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      group: 'cta',
      description: 'Main CTA headline (e.g., "Ready to Move to the Cloud?")',
    }),
    defineField({
      name: 'ctaHighlight',
      title: 'CTA Highlight Word',
      type: 'string',
      group: 'cta',
      description: 'Word to highlight in the CTA headline',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'text',
      group: 'cta',
      rows: 2,
      description: 'Supporting text below the CTA headline',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'cta',
      initialValue: "Let's Talk",
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact',
    }),

    // ===========================================
    // RELATED SERVICES
    // ===========================================
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      group: 'related',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
      validation: (rule) => rule.max(3),
    }),

    // ===========================================
    // LEGACY FIELDS (kept for backward compatibility)
    // ===========================================
    defineField({
      name: 'features',
      title: 'Features (Legacy)',
      type: 'array',
      group: 'benefits',
      of: [defineArrayMember({ type: 'feature' })],
      description: 'Legacy features field - use Benefits instead',
      hidden: true,
    }),
    defineField({
      name: 'body',
      title: 'Body Content (Legacy)',
      type: 'blockContent',
      group: 'basic',
      description: 'Legacy body content - not used in new template',
      hidden: true,
    }),

    // ===========================================
    // SEO
    // ===========================================
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Service',
        subtitle,
        media: media || RocketIcon,
      }
    },
  },
})
