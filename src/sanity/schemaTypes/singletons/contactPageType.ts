import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

/**
 * Contact Page singleton for managing the /contact page content.
 * Singleton behavior is enforced via Studio structure, not schema.
 * 
 * Note: Contact info (phone, email, address) comes from Site Settings
 * to maintain a single source of truth across the site.
 */
export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // Header Section
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the title (e.g., "Get in Touch")',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main page title (e.g., "Contact Us")',
      validation: (rule) => rule.required(),
      initialValue: 'Contact Us',
    }),

    // Content Section
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Heading for the contact info section',
      initialValue: "WE'D LOVE TO HEAR FROM YOU",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Main paragraph describing your contact philosophy',
    }),
    defineField({
      name: 'responseTimeText',
      title: 'Response Time Text',
      type: 'string',
      description: 'Text about typical response time (e.g., "We typically respond within 24 hours")',
      initialValue: 'We typically respond within 24 hours',
    }),

    // Contact Labels (customize the labels shown next to contact info)
    defineField({
      name: 'contactLabels',
      title: 'Contact Labels',
      type: 'object',
      description: 'Customize the labels shown above contact information',
      fields: [
        defineField({
          name: 'addressLabel',
          title: 'Address Label',
          type: 'string',
          initialValue: 'Visit Us',
        }),
        defineField({
          name: 'phoneLabel',
          title: 'Phone Label',
          type: 'string',
          initialValue: 'Call Us',
        }),
        defineField({
          name: 'emailLabel',
          title: 'Email Label',
          type: 'string',
          initialValue: 'Email Us',
        }),
      ],
    }),

    // Form Settings
    defineField({
      name: 'formSettings',
      title: 'Form Settings',
      type: 'object',
      description: 'Settings for the contact form',
      fields: [
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send Message',
        }),
        defineField({
          name: 'successTitle',
          title: 'Success Title',
          type: 'string',
          description: 'Title shown after form submission',
          initialValue: 'Message Sent!',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
          description: 'Message shown after form submission',
          initialValue: "Thank you for reaching out. We'll get back to you within 24 hours.",
        }),
        defineField({
          name: 'privacyText',
          title: 'Privacy Notice Text',
          type: 'string',
          description: 'Text before the privacy link (e.g., "By submitting this form, you agree to our")',
          initialValue: 'By submitting this form, you agree to our',
        }),
        defineField({
          name: 'privacyLinkText',
          title: 'Privacy Link Text',
          type: 'string',
          description: 'Text for the privacy policy link',
          initialValue: 'Privacy Policy',
        }),
        defineField({
          name: 'privacyLinkUrl',
          title: 'Privacy Link URL',
          type: 'string',
          description: 'URL for the privacy policy page',
          initialValue: '/privacy',
        }),
        defineField({
          name: 'privacyAfterText',
          title: 'Privacy After Text',
          type: 'string',
          description: 'Text after the privacy link',
          initialValue: '. Your information will never be shared with third parties.',
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Contact page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Page',
        subtitle: 'Contact page content',
        media: EnvelopeIcon,
      }
    },
  },
})
