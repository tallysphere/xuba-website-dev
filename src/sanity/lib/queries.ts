import { defineQuery } from 'next-sanity'

// =============================================================================
// Site Settings & Navigation Queries
// =============================================================================

/**
 * Fetches global site settings.
 * Used in layout for site name, logo, contact info, and default SEO.
 */
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteName,
    logo,
    favicon,
    "defaultSeo": {
      "title": coalesce(defaultSeo.title, siteName),
      "description": defaultSeo.description,
      "image": defaultSeo.image,
      "noIndex": defaultSeo.noIndex == true
    },
    contact {
      phone,
      email,
      address,
      businessHours
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    analytics {
      googleAnalyticsId,
      googleTagManagerId
    },
    contactSection {
      heading,
      subheading,
      ctaLabel,
      ctaLink
    }
  }
`)

/**
 * Fetches contact section content and contact info from Site Settings.
 * Used by the reusable ContactSection component.
 */
export const CONTACT_SECTION_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    contact {
      phone,
      email,
      address
    },
    contactSection {
      heading,
      subheading,
      ctaLabel,
      ctaLink
    }
  }
`)

/**
 * Fetches site navigation for header and footer.
 */
export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0]{
    mainNav[] {
      _key,
      label,
      "link": link {
        linkType,
        externalUrl,
        openInNewTab,
        "internalHref": internalLink->slug.current
      },
      children[] {
        _key,
        label,
        "link": link {
          linkType,
          externalUrl,
          openInNewTab,
          "internalHref": internalLink->slug.current
        }
      }
    },
    ctaButton {
      label,
      "link": link {
        linkType,
        externalUrl,
        openInNewTab,
        "internalHref": internalLink->slug.current
      }
    },
    footerColumns[] {
      _key,
      title,
      links[] {
        _key,
        label,
        linkType,
        externalUrl,
        openInNewTab,
        "internalHref": internalLink->slug.current
      }
    },
    legalLinks[] {
      _key,
      label,
      linkType,
      externalUrl,
      openInNewTab,
      "internalHref": internalLink->slug.current
    }
  }
`)

// =============================================================================
// About Page Query
// =============================================================================

/**
 * Fetches the About Page singleton content.
 * Used on the /about page for hero images, mission, and stats.
 */
export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroTitle,
    heroSubtitle,
    heroImages[] {
      _key,
      asset,
      alt,
      hotspot,
      crop
    },
    missionTitle,
    missionIntro,
    missionBody,
    stats[] {
      _key,
      label,
      value,
      postfix
    },
    teamTitle,
    teamDescription,
    "seo": {
      "title": coalesce(seo.title, heroTitle, "About Us"),
      "description": seo.description,
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`)

// =============================================================================
// Homepage Query
// =============================================================================

/**
 * Fetches the Homepage singleton content.
 * Used on the / (root) page for Hero and Services sections.
 */
export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    // Hero Section
    heroHeadlinePart1,
    heroHighlightWord,
    heroHeadlinePart2,
    heroDescription,
    heroPrimaryCta {
      label,
      href
    },
    heroSecondaryCta {
      label,
      href
    },
    // Services Section
    servicesTitle,
    servicesDescription,
    serviceCards[] {
      _key,
      title,
      description,
      href,
      ctaLabel
    },
    // SEO
    "seo": {
      "title": coalesce(seo.title, "Xuba - IT Solutions"),
      "description": seo.description,
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`)

// =============================================================================
// Contact Page Query
// =============================================================================

/**
 * Fetches the Contact Page singleton content along with Site Settings contact info.
 * Used on the /contact page.
 */
export const CONTACT_PAGE_QUERY = defineQuery(`
  {
    "contactPage": *[_type == "contactPage"][0]{
      eyebrow,
      title,
      heading,
      description,
      responseTimeText,
      contactLabels {
        addressLabel,
        phoneLabel,
        emailLabel
      },
      "seo": {
        "title": coalesce(seo.title, title, "Contact Us"),
        "description": seo.description,
        "image": seo.image,
        "noIndex": seo.noIndex == true
      }
    },
    "siteSettings": *[_type == "siteSettings"][0]{
      contact {
        phone,
        email,
        address
      }
    }
  }
`)

// =============================================================================
// Page Queries
// =============================================================================

/**
 * Fetches a page by slug with expanded page builder content.
 */
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true,
      "canonicalUrl": seo.canonicalUrl
    },
    pageBuilder[] {
      _key,
      _type,
      ...,
      _type == "servicesGrid" => {
        ...,
        services[]-> {
          _id,
          title,
          "slug": slug.current,
          shortDescription,
          icon,
          featuredImage
        }
      },
      _type == "teamGrid" => {
        ...,
        teamMembers[]-> {
          _id,
          name,
          "slug": slug.current,
          role,
          image,
          location,
          socialLinks
        }
      },
      _type == "faqSection" => {
        ...,
        faqs[]-> {
          _id,
          question,
          answer,
          category
        }
      }
    }
  }
`)

/**
 * Fetches all page slugs for static generation.
 */
export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// =============================================================================
// Service Queries
// =============================================================================

/**
 * Fetches all services for listing page.
 */
export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    featuredImage
  }
`)

/**
 * Fetches a single service by slug with full details.
 * Includes all sections: hero, intro, body content, benefits, services list, CTA, and related.
 */
export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    featuredImage,
    
    // Hero Section
    heroImage {
      asset,
      alt,
      hotspot,
      crop
    },
    tagline,
    taglineHighlight,
    subtitle,
    
    // Introduction Section
    introText,
    introHighlights,
    
    // Rich Text Body Content
    bodyContent,
    
    // Benefits Section
    benefitsTitle,
    benefitsHighlight,
    benefits[] {
      _key,
      title,
      description,
      icon
    },
    
    // What We Handle Section
    servicesTitle,
    servicesTitleHighlight,
    serviceItems,
    
    // FAQ Section
    faqTitle,
    faqTitleHighlight,
    faqs[] {
      _key,
      question,
      answer
    },
    
    // Contact Mini-CTA
    contactCta {
      enabled,
      heading,
      buttonText,
      buttonLink
    },
    
    // CTA Section
    ctaHeadline,
    ctaHighlight,
    ctaSubtext,
    ctaButtonText,
    ctaButtonLink,
    
    // Related Services (with thumbnails)
    relatedServices[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      tagline,
      icon,
      featuredImage {
        asset,
        alt,
        hotspot,
        crop
      }
    },
    
    // Legacy fields (for backward compatibility)
    features[] {
      _key,
      title,
      description,
      icon
    },
    body,
    
    // SEO
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, shortDescription),
      "image": coalesce(seo.image, featuredImage),
      "noIndex": seo.noIndex == true,
      "canonicalUrl": seo.canonicalUrl
    }
  }
`)

/**
 * Fetches all service slugs for static generation.
 */
export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// =============================================================================
// Team Member Queries
// =============================================================================

/**
 * Fetches all active team members.
 */
export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember" && isActive == true] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    image,
    bio,
    location,
    email,
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`)

/**
 * Fetches a single team member by slug.
 */
export const TEAM_MEMBER_QUERY = defineQuery(`
  *[_type == "teamMember" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    role,
    image,
    bio,
    location,
    email,
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`)

// =============================================================================
// FAQ Queries
// =============================================================================

/**
 * Fetches all FAQs, optionally filtered by category.
 */
export const FAQS_QUERY = defineQuery(`
  *[_type == "faq" && ($category == "" || category == $category)] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`)

// =============================================================================
// Testimonial Queries
// =============================================================================

/**
 * Fetches all testimonials.
 */
export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(featured desc, order asc) {
    _id,
    quote,
    author,
    role,
    company,
    image,
    companyLogo,
    featured
  }
`)

/**
 * Fetches featured testimonials only.
 */
export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    image,
    companyLogo
  }
`)

// =============================================================================
// SEO & Sitemap Queries
// =============================================================================

/**
 * Fetches all slugs for sitemap generation.
 */
export const SITEMAP_QUERY = defineQuery(`
  {
    "pages": *[_type == "page" && !(seo.noIndex == true) && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    },
    "services": *[_type == "service" && !(seo.noIndex == true) && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  }
`)

// =============================================================================
// Redirect Queries
// =============================================================================

/**
 * Fetches all enabled redirects for Next.js config.
 */
export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true]{
    source,
    destination,
    permanent
  }
`)
