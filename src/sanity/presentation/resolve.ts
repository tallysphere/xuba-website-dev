import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

/**
 * Presentation tool resolve configuration.
 * Maps document types to their frontend URLs for Visual Editing.
 *
 * @see https://www.sanity.io/docs/configuring-the-presentation-tool
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Pages
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Page',
            href: doc?.slug === 'home' ? '/' : `/${doc?.slug}`,
          },
        ],
      }),
    }),

    // Services
    service: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Service',
            href: `/services/${doc?.slug}`,
          },
          {
            title: 'All Services',
            href: '/services',
          },
        ],
      }),
    }),

    // Team Members
    teamMember: defineLocations({
      select: {
        name: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || 'Unnamed Team Member',
            href: `/our-team#${doc?.slug}`,
          },
          {
            title: 'Our Team',
            href: '/our-team',
          },
        ],
      }),
    }),

    // FAQs
    faq: defineLocations({
      select: {
        question: 'question',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.question || 'FAQ',
            href: '/support',
          },
        ],
      }),
    }),

    // Testimonials
    testimonial: defineLocations({
      select: {
        author: 'author',
        company: 'company',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: `${doc?.author || 'Testimonial'}${doc?.company ? ` - ${doc.company}` : ''}`,
            href: '/',
          },
        ],
      }),
    }),

    // Site Settings (singleton)
    siteSettings: defineLocations({
      message: 'Site Settings are used globally across the entire website',
      tone: 'positive',
    }),

    // Navigation (singleton)
    navigation: defineLocations({
      message: 'Navigation is used in the header and footer across all pages',
      tone: 'positive',
    }),
  },
}
