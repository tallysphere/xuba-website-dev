import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

/**
 * Support Page singleton for managing the /support page content.
 * Includes TeamViewer integration settings.
 * Singleton behavior is enforced via Studio structure, not schema.
 */
export const supportPageType = defineType({
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    // Hero Section
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description:
        'Small text above the main title (e.g., "Need Quick Support?")',
      initialValue: 'Need Quick Support?',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main page title (e.g., "Quick Support")',
      validation: (rule) => rule.required(),
      initialValue: 'Quick Support',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      description: 'Word to highlight in green (e.g., "Support")',
      initialValue: 'Support',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      description: 'Supporting text below the title',
      initialValue:
        'We are here to help you with your IT needs. Our dedicated support team is ready to assist you with remote troubleshooting, system diagnostics, software installations, and technical guidance. Get instant access to professional IT support through our secure TeamViewer connection below.',
    }),

    // TeamViewer Settings
    defineField({
      name: 'teamViewerUrl',
      title: 'TeamViewer URL',
      type: 'url',
      description:
        'The TeamViewer Quick Support URL (e.g., https://get.teamviewer.com/xubasupport)',
      validation: (rule) => rule.required(),
      initialValue: 'https://get.teamviewer.com/xubasupport',
    }),
    defineField({
      name: 'teamViewerTitle',
      title: 'TeamViewer Window Title',
      type: 'string',
      description: 'Title shown in the TeamViewer window bar',
      initialValue: 'TeamViewer Quick Support',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the Support page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Support Page',
        subtitle: 'Quick support page content',
        media: HelpCircleIcon,
      }
    },
  },
})
