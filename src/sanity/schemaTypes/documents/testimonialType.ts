import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

/**
 * Testimonial document type for client testimonials.
 */
export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Author Role',
      type: 'string',
      description: 'e.g., "CEO", "IT Manager"',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      company: 'company',
      media: 'image',
      featured: 'featured',
    },
    prepare({ quote, author, company, media, featured }) {
      const truncatedQuote = quote?.length > 50 ? `${quote.substring(0, 50)}...` : quote
      return {
        title: truncatedQuote || 'Untitled Testimonial',
        subtitle: `${author}${company ? ` - ${company}` : ''}${featured ? ' ⭐' : ''}`,
        media: media || CommentIcon,
      }
    },
  },
})
