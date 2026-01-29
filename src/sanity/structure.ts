import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  UsersIcon,
  InfoOutlineIcon,
  EnvelopeIcon,
  HomeIcon,
  RocketIcon,
} from '@sanity/icons'
// import { MenuIcon, DocumentsIcon, CommentIcon, HelpCircleIcon, LinkIcon } from '@sanity/icons'

// Singleton document IDs
const SINGLETON_IDS = [
  'siteSettings',
  'navigation',
  'aboutPage',
  'contactPage',
  'homepage',
  'ourTeamPage',
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
      // ACTIVE CONTENT TYPES
      // ===========================================

      // Homepage (singleton) - First item for prominence
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage'),
        ),

      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.listItem()
        .title('Team Members')
        .icon(UsersIcon)
        .child(S.documentTypeList('teamMember').title('Team Members')),

      S.listItem()
        .title('About Page')
        .icon(InfoOutlineIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page'),
        ),

      S.listItem()
        .title('Contact Page')
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Contact Page'),
        ),

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
      // SERVICES
      // ===========================================
      S.listItem()
        .title('Services')
        .icon(RocketIcon)
        .child(S.documentTypeList('service').title('Services')),

      // ===========================================
      // COMMENTED OUT - UNCOMMENT WHEN NEEDED
      // ===========================================

      // S.listItem()
      //   .title('Pages')
      //   .icon(DocumentsIcon)
      //   .child(S.documentTypeList('page').title('Pages')),

      // S.listItem()
      //   .title('Testimonials')
      //   .icon(CommentIcon)
      //   .child(S.documentTypeList('testimonial').title('Testimonials')),

      // S.listItem()
      //   .title('FAQs')
      //   .icon(HelpCircleIcon)
      //   .child(S.documentTypeList('faq').title('FAQs')),

      // S.divider(),

      // S.listItem()
      //   .title('Navigation')
      //   .icon(MenuIcon)
      //   .child(
      //     S.document()
      //       .schemaType('navigation')
      //       .documentId('navigation')
      //       .title('Navigation')
      //   ),

      // S.divider(),

      // S.listItem()
      //   .title('Redirects')
      //   .icon(LinkIcon)
      //   .child(S.documentTypeList('redirect').title('Redirects')),

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
          ].includes(id)
        )
      }),
    ])
