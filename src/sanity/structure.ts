import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  UsersIcon,
  InfoOutlineIcon,
  EnvelopeIcon,
  HomeIcon,
  RocketIcon,
  DocumentTextIcon,
  LockIcon,
  HelpCircleIcon,
} from '@sanity/icons'

// Singleton document IDs
const SINGLETON_IDS = [
  'siteSettings',
  'navigation',
  'aboutPage',
  'contactPage',
  'homepage',
  'ourTeamPage',
  'termsOfServicePage',
  'privacyPolicyPage',
  'servicesPage',
  'supportPage',
]

/**
 * Custom Studio structure with organized sections and singletons.
 * Singletons are enforced here via fixed document IDs.
 *
 * @see https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ===========================================
      // PAGES
      // ===========================================

      // Homepage
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage'),
        ),

      // Services Page
      S.listItem()
        .title('Services Page')
        .icon(RocketIcon)
        .child(
          S.document()
            .schemaType('servicesPage')
            .documentId('servicesPage')
            .title('Services Page'),
        ),

      // About Page
      S.listItem()
        .title('About Page')
        .icon(InfoOutlineIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page'),
        ),

      // Contact Page
      S.listItem()
        .title('Contact Page')
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Contact Page'),
        ),

      // Support Page
      S.listItem()
        .title('Support Page')
        .icon(HelpCircleIcon)
        .child(
          S.document()
            .schemaType('supportPage')
            .documentId('supportPage')
            .title('Support Page'),
        ),

      // Our Team Page
      S.listItem()
        .title('Our Team Page')
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType('ourTeamPage')
            .documentId('ourTeamPage')
            .title('Our Team Page'),
        ),

      S.divider(),

      // ===========================================
      // CONTENT
      // ===========================================

      // Team Members
      S.listItem()
        .title('Team Members')
        .icon(UsersIcon)
        .child(S.documentTypeList('teamMember').title('Team Members')),

      // Services
      S.listItem()
        .title('Services')
        .icon(RocketIcon)
        .child(S.documentTypeList('service').title('Services')),

      S.divider(),

      // ===========================================
      // LEGAL
      // ===========================================

      // Terms of Service
      S.listItem()
        .title('Terms of Service')
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .schemaType('termsOfServicePage')
            .documentId('termsOfServicePage')
            .title('Terms of Service'),
        ),

      // Privacy Policy
      S.listItem()
        .title('Privacy Policy')
        .icon(LockIcon)
        .child(
          S.document()
            .schemaType('privacyPolicyPage')
            .documentId('privacyPolicyPage')
            .title('Privacy Policy'),
        ),

      S.divider(),

      // ===========================================
      // SETTINGS
      // ===========================================

      // Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      // Filter out singletons and already-listed types from the default list
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return (
          id &&
          !SINGLETON_IDS.includes(id) &&
          ![
            'page',
            'service',
            'teamMember',
            'testimonial',
            'faq',
            'redirect',
            'navigation',
            'aboutPage',
            'contactPage',
            'homepage',
            'ourTeamPage',
            'termsOfServicePage',
            'privacyPolicyPage',
            'servicesPage',
            'supportPage',
          ].includes(id)
        )
      }),
    ])
