import type { SchemaTypeDefinition } from 'sanity'

// Objects (reusable)
import { seoType } from './objects/seoType'
import { linkType } from './objects/linkType'
import { socialLinkType } from './objects/socialLinkType'
import { statType } from './objects/statType'
import { featureType } from './objects/featureType'

// Shared
import { blockContentType } from './shared/blockContentType'

// Singletons
import { siteSettingsType } from './singletons/siteSettingsType'
import {
  navigationType,
  navItemType,
  footerColumnType,
} from './singletons/navigationType'
import { aboutPageType } from './singletons/aboutPageType'
import { contactPageType } from './singletons/contactPageType'
import { homepageType } from './singletons/homepageType'
import { ourTeamPageType } from './singletons/ourTeamPageType'

// Documents
import { pageType } from './documents/pageType'
import { serviceType } from './documents/serviceType'
import { teamMemberType } from './documents/teamMemberType'
import { faqType } from './documents/faqType'
import { testimonialType } from './documents/testimonialType'
import { redirectType } from './documents/redirectType'

// Page Builder Blocks
import { heroType } from './blocks/heroType'
import { servicesGridType } from './blocks/servicesGridType'
import { teamGridType } from './blocks/teamGridType'
import { statsSectionType } from './blocks/statsSectionType'
import { faqSectionType } from './blocks/faqSectionType'
import { contactSectionType } from './blocks/contactSectionType'
import { richTextType } from './blocks/richTextType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects (must be registered first as they are referenced by other types)
    seoType,
    linkType,
    socialLinkType,
    statType,
    featureType,

    // Shared
    blockContentType,

    // Navigation helper objects
    navItemType,
    footerColumnType,

    // Page Builder Blocks (must be registered before documents that reference them)
    heroType,
    servicesGridType,
    teamGridType,
    statsSectionType,
    faqSectionType,
    contactSectionType,
    richTextType,

    // Singletons
    siteSettingsType,
    navigationType,
    aboutPageType,
    contactPageType,
    homepageType,
    ourTeamPageType,

    // Documents
    pageType,
    serviceType,
    teamMemberType,
    faqType,
    testimonialType,
    redirectType,
  ],
}
