# Build email marketing campaigns with Sanity and Klaviyo

This guide explains how two Sanity Functions working together create and send marketing campaigns through [Klaviyo](https://help.klaviyo.com/hc/en-us/articles/115005054847), integrated with [Sanity Connect for Shopify](/docs/apis-and-sdks/sanity-connect-for-shopify) setup. [This is the setup we use for the Sanity Swag store](/blog/studio-to-inbox).

> [!TIP]
> E-Commerce Not Required
> We're using the Shopify Connect app here because our use case is sending out email campaigns with products. You could use this to suit any of your needs outside of commerce.

With this guide you will:

- Build a flow using Klaviyo Campaigns directly in the Sanity Studio.
- Update Klaviyo HTML templates directly without opening Klaviyo.
- Send Campaigns to your Klaviyo customers directly from the Sanity Studio with your own editorial workflows.

## Prerequisites

- An existing or [new Klaviyo account](https://www.klaviyo.com/sign-up)
- An existing or [new Sanity project with a studio ](/docs/getting-started)
- Familiarity with Sanity Functions

[Functions quick start](/docs/compute-and-ai/function-quickstart)

[Official Function recipes](https://www.sanity.io/exchange/type=schemas/by=sanity)

## Overview

The marketing campaign system consists of two main [Sanity Functions](/docs/compute-and-ai/functions-introduction) that work in tandem:

10. `marketing-campaign-create`: Creates and updates marketing campaigns and email templates
11. `marketing-campaign-send`: Sends campaigns to subscribers

These functions automatically process content changes and integrate with [Klaviyo's API ](https://developers.klaviyo.com/en/reference/api_overview)for email marketing automation.

## How to set up Klaviyo

Before using these functions, you need to set up your Klaviyo account:

14. **Create a Klaviyo Account:** Sign up at [klaviyo.com](https://www.klaviyo.com) and complete account verification
15. **Create a List**2. Navigate to Audience → Lists & Segments in your Klaviyo dashboard
16. Create a new list (e.g., "Newsletter Subscribers")
17. Take note the List ID from the URL or in list settings (you'll need this later)

18. **Generate an API Key: **Go to Account → Settings → API Keys- Create a new Private API key with the following scopes:3. `campaigns:read`
19. `campaigns:write`
20. `templates:read`
21. `templates:write`

22. **Copy the API key** for environment configuration

### Sanity Connect for Shopify (optional)

These functions work with content synced from Shopify via [Sanity Connect for Shopify](/docs/apis-and-sdks/sanity-connect-for-shopify). The system expects:

- Products synced from Shopify as `shopify.product` documents
- Emails created in Sanity that reference these products
- Marketing campaigns that can be created from email content

## Implementation

### Extend your Sanity Studio

We'll be creating 2 new content types for our studio, `post` and `marketingCampaign`. The `post` content type resembles something like a typical post and you could easily repurpose existing content types to suit your needs. Our two functions below use these two content types and could be tweaked as needed.

**documents/post.ts**

```
import {defineField, defineType} from 'sanity'
import {BasketIcon, ImageIcon} from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
          },
        },
        {
          name: 'products',
          type: 'object',
          title: 'Products',
          icon: BasketIcon,
          fields: [
            {name: 'products', type: 'array', of: [{type: 'reference', to: [{type: 'product'}]}]},
          ],
          preview: {
            select: {
              products: 'products',
            },
            prepare(selection: any) {
              const {products} = selection
              return {
                title: 'Products',
                subtitle: `${products.length} products`,
              }
            },
          },
        },
        {
          type: 'image',
          icon: ImageIcon,
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Progress', value: 'inprogress'},
          {title: 'Ready for Review', value: 'ready-for-review'},
          {title: 'Ready', value: 'ready'},
          {title: 'Sent', value: 'sent'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'inprogress',
    }),
    defineField({
      name: 'marketingCampaign',
      title: 'Marketing Campaign',
      type: 'reference',
      to: [{type: 'marketingCampaign'}],
      weak: true,
    }),
    defineField({
      name: 'klaviyoListId',
      title: 'Klaviyo List ID',
      type: 'string',
      description: 'Optional: Override the default Klaviyo list ID for this post',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'body.0.asset',
    },
    prepare(selection: any) {
      const {title, status, media} = selection
      return {
        title: title || 'Untitled Post',
        subtitle: status ? `Status: ${status}` : 'No status',
        media: media,
      }
    },
  },
})

```

**documents/marketingCampaign.ts**

```
import {defineField, defineType} from 'sanity'

export const marketingCampaignType = defineType({
  name: 'marketingCampaign',
  title: 'Marketing Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post Content',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Ready (will trigger Klaviyo Send)', value: 'ready'},
          {title: 'Sent', value: 'sent'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'draft',
    }),
    defineField({
      name: 'klaviyoTemplateId',
      title: 'Klaviyo Template ID',
      type: 'string',
      description: 'The template ID from Klaviyo',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'klaviyoCampaignId',
      title: 'Klaviyo Campaign ID',
      type: 'string',
      description: 'The campaign ID from Klaviyo',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'A description of this marketing campaign',
    }),
  ],
})

```

### Blueprints configuration

We're assuming you've gong through the setup above to create a blueprint file, we're using configuration code below but reconfigure as needed; the only quirk here is making sure you are setup for env variables with `dotenv` and we have to pass them into our functions with the `env:`key below.

You should also scaffold the function so that each are created running the following command:

**cli**

```sh
npx sanity blueprints add function
```

**sanity.blueprint.ts**

```

import 'dotenv/config'
import process from 'node:process'
import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

const {KLAVIYO_API_KEY, KLAVIYO_LIST_ID} = process.env
if (typeof KLAVIYO_API_KEY !== 'string') {
  throw new Error('KLAVIYO_API_KEY must be set')
}
if (typeof KLAVIYO_LIST_ID !== 'string') {
  throw new Error('KLAVIYO_LIST_ID must be set')
}

export default defineBlueprint({
  "resources": [
    // .. Other Functions
    defineDocumentFunction({
      name: 'marketing-campaign-create',
      src: 'functions/marketing-campaign-create',
      event: {
        on: ['create', 'update'],
        filter: '_type == "post" && status != "sent"',
        projection: '{_id, _type, title, slug, body, marketingCampaign, klaviyoListId, "operation": delta::operation()}',
      },
      env: {
        KLAVIYO_API_KEY,
        KLAVIYO_LIST_ID,
      }
    }),
    defineDocumentFunction({
      name: 'marketing-campaign-send',
      src: 'functions/marketing-campaign-send',
      event: {
        on: ['publish'],
        filter: '_type == "marketingCampaign" && status == "ready"',
        projection: '{_id, _type, title, post, klaviyoCampaignId}',
      },
      env: {
        KLAVIYO_API_KEY,
        KLAVIYO_LIST_ID,
      }
    }),
  ]
})

```

Navigate to the root of the `create` function and use your prefered package manager to install:

**cli**

```sh
pnpm install @sanity/client @portabletext/to-html
```

And likewise navigate to the `send` function an ensure the `@sanity/client` is installed.

### Set up the marketing campaign create function

**File**: `functions/marketing-campaign-create/index.ts`
**Trigger**: Document changes on `post` documents
**Purpose**: Automatically creates and updates Klaviyo campaigns and email templates when posts are created or modified.

#### Key features

- **Automatic Template Generation**: Converts Sanity Portable Text content into an HTML email templates
- **Product Integration**: Renders Shopify products within email templates
- **Campaign Management**: Creates Klaviyo campaigns with proper audience targeting
- **Status Tracking**: Updates post status throughout the process
- **Error Handling**: Comprehensive error handling with console logs

#### Process flow

**Document Event Trigger:** Listens for changes to `post` documents- Determines operation type (create/update) based on document state

**Template Generation: **

38. Fetches post content including Portable Text body
39. Converts content to HTML using `@portabletext/to-html`
40. Renders Shopify products with pricing and images, generates both HTML and text versions

**Klaviyo Integration:**

- Creates email template in Klaviyo, creates marketing campaign with audience targeting, links template to campaign message, and handles template updates for existing campaigns

**Sanity Document Management**

- Creates `marketingCampaign` document
- Links post to marketing campaign
- Updates email status to `ready-for-review`

#### Environment variables required

Find the following information for your Klaviyo account and email list, and paste it into the environment file:

**.env**

```
KLAVIYO_API_KEY=your_klaviyo_api_key
KLAVIYO_LIST_ID=your_klaviyo_list_id
KLAVIYO_FROM_EMAIL=noreply@yourdomain.com
KLAVIYO_REPLY_TO_EMAIL=reply-to@yourdomain.com
KLAVIYO_CC_EMAIL=cc@yourdomain.com
KLAVIYO_BCC_EMAIL=bcc@yourdomain.com
```

#### Add code to the create campaign function file

Replace the boilerplate code in the `index.ts` function file that you scaffolded with the following code:

**marketing-campaign-create/index.ts**

```
import { documentEventHandler, type DocumentEvent } from '@sanity/functions'
import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'

interface PostDocument {
  _id: string;
  _type: string;
  title?: string;
  slug?: {
    current: string;
  };
  body?: any[];
  marketingCampaign?: {
    _ref: string;
  };
  klaviyoListId?: string;
  operation?: string;
}

// Note: DocumentEvent from @sanity/functions doesn't include operation property
// We'll need to determine the operation from the event data or use a different approach

interface KlaviyoCampaignResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      status: string;
    };
    relationships: {
      'campaign-messages': {
        data: Array<{
          id: string;
          type: string;
        }>;
      };
    };
  };
}

interface KlaviyoTemplateResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      html: string;
      text: string;
    };
  };
}

export const handler = documentEventHandler(async ({ context, event}: { context: any, event: DocumentEvent<PostDocument> }) => {
  console.log('👋 Marketing Campaign Function called at', new Date().toISOString())
  console.log('👋 Event:', event)

  try {
    const { _id, _type, title, slug, klaviyoListId, operation } = event.data as PostDocument

    // Determine operation based on whether marketingCampaign already exists
    console.log('👋 Determined operation:', operation)

    // Get Klaviyo API credentials from environment
    const klaviyoApiKey = process.env.KLAVIYO_API_KEY
    const localKlaviyoListId = klaviyoListId || process.env.KLAVIYO_LIST_ID

    if (!klaviyoApiKey) {
      console.error('❌ KLAVIYO_API_KEY not found in environment variables')
      return
    }

    if (!localKlaviyoListId) {
      console.error('❌ KLAVIYO_LIST_ID not found in environment variables')
      return
    }

    if (_type !== 'post') {
      console.log('⏭️ Skipping non-post document:', _type)
      return
    }

    const client = createClient({
      ...context.clientOptions,
      dataset: 'production',
      apiVersion: '2025-06-01',
    })

    // Handle different operations based on delta
    if (operation === 'create') {
      console.log('🆕 CREATE operation: Creating new marketing campaign and template')
      await handleCreateOperation(client, _id, title, slug, localKlaviyoListId, klaviyoApiKey)
    } else if (operation === 'update') {
      console.log('🔄 UPDATE operation: Updating existing template only')
      await handleUpdateOperation(client, _id, title, slug, klaviyoApiKey)
    } else {
      console.log('⏭️ Skipping operation:', operation)
      return
    }


  } catch (error) {
    console.error('❌ Error processing post for marketing campaign:', error)

    throw error
  }
})

// Handler for CREATE operation - creates new campaign and template
async function handleCreateOperation(
  client: any,
  postId: string,
  title: string | undefined,
  slug: { current: string } | undefined,
  klaviyoListId: string,
  klaviyoApiKey: string
) {
  console.log('🆕 CREATE: Creating new marketing campaign and template for post:', postId)

  if (!title || title.trim().length === 0) {
    console.error('❌ Post title is required for template creation')
    return
  }

  try {
    // Fetch nested data in the body for html rendering
    const {body: bodyData} = await client.fetch(portableTextBodyQuery(postId))

    console.log('📋 Body data:', bodyData)

    // Generate email templates
    const htmlContent = await generateEmailTemplate(title, slug?.current, bodyData)
    const textContent = generateTextContent(title, slug?.current)

    // Create Klaviyo template
    console.log('🎨 Creating Klaviyo template for post:', title)
    const templateData = {
      data: {
        type: 'template',
        attributes: {
          name: `${title} - Template`,
          editor_type: 'CODE',
          html: htmlContent,
          text: textContent
        }
      }
    }

    const templateResponse = await fetch('https://a.klaviyo.com/api/templates', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'application/vnd.api+json',
        'revision': '2025-07-15'
      },
      body: JSON.stringify(templateData)
    })

    if (!templateResponse.ok) {
      const errorText = await templateResponse.text()
      console.error('❌ Failed to create Klaviyo template:', templateResponse.status, errorText)
      return
    }

    const template: KlaviyoTemplateResponse = await templateResponse.json()
    console.log('✅ Created Klaviyo template:', template.data.id, 'Name:', template.data.attributes.name)

    // Create Klaviyo campaign
    console.log('📢 Creating Klaviyo campaign for post:', title)
    const campaignData = {
      data: {
        type: 'campaign',
        attributes: {
          name: `${title} - Campaign`,
          audiences: {
            "included": [klaviyoListId]
          },
          "send_strategy": {
            "method": "immediate"
          },
          "send_options": {
            "use_smart_sending": true
          },
          "tracking_options": {
            "add_tracking_params": true,
            "custom_tracking_params": [
              {
                "type": "dynamic",
                "value": "campaign_id",
                "name": "utm_medium"
              },
              {
                "type": "static",
                "value": "email",
                "name": "utm_source"
              }
            ],
            "is_tracking_clicks": true,
            "is_tracking_opens": true
          },
          "campaign-messages": {
            "data": [
              {
                "type": "campaign-message",
                "attributes": {
                  "definition": {
                    "channel": "email",
                    "label": "My message name",
                    "content": {
                      "subject": title,
                      "preview_text": "My preview text",
                      "from_email": process.env.KLAVIYO_FROM_EMAIL || 'noreply@yourdomain.com',
                      "from_label": "My Company",
                      "reply_to_email": process.env.KLAVIYO_REPLY_TO_EMAIL || 'reply-to@yourdomain.com',
                      "cc_email": process.env.KLAVIYO_CC_EMAIL || 'cc@yourdomain.com',
                      "bcc_email": process.env.KLAVIYO_BCC_EMAIL || 'bcc@yourdomain.com'
                    }
                  }
                }
              }
            ]
          }
        }
      }
    }

    const campaignResponse = await fetch('https://a.klaviyo.com/api/campaigns', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'application/vnd.api+json',
        'revision': '2025-07-15'
      },
      body: JSON.stringify(campaignData)
    })

    if (!campaignResponse.ok) {
      const errorText = await campaignResponse.text()
      console.error('❌ Failed to create Klaviyo campaign:', campaignResponse.status, errorText)
      return
    }

    const campaign: KlaviyoCampaignResponse = await campaignResponse.json()
    console.log('✅ Created Klaviyo campaign:', campaign.data.id, 'Name:', campaign.data.attributes.name)

    // Assign template to campaign message
    console.log('📎 Assigning template to campaign message...')
    await new Promise(resolve => setTimeout(resolve, 2000));

    const campaignMessageId = campaign.data.relationships['campaign-messages'].data[0].id

    const assignTemplateResponse = await fetch(`https://a.klaviyo.com/api/campaign-message-assign-template`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'application/vnd.api+json',
        'revision': '2025-07-15'
      },
      body: JSON.stringify({
        data: {
          type: "campaign-message",
          id: campaignMessageId,
          "relationships": {
            "template": {
              "data": {
                "type": "template",
                "id": template.data.id
              }
            }
          }
        }
      })
    })

    if (!assignTemplateResponse.ok) {
      const errorText = await assignTemplateResponse.text()
      console.error('❌ Failed to assign template to campaign:', assignTemplateResponse.status, errorText)
      throw new Error(`Failed to assign template: ${errorText}`)
    }

    console.log('✅ Template assigned successfully to campaign message')

    // Create marketingCampaign document in Sanity
    console.log('💾 Creating marketingCampaign document in Sanity')
    const marketingCampaignId = `marketingCampaign-${postId}`

    const newMarketingCampaign = await client.create({
      _id: marketingCampaignId,
      _type: 'marketingCampaign',
      title: `${title} - Marketing Campaign`,
      klaviyoCampaignId: campaign.data.id,
      klaviyoTemplateId: template.data.id,
      status: 'draft',
      post: { _ref: postId, _type: 'reference' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: `Marketing campaign for post: ${title}`
    })

    console.log('✅ Created marketingCampaign document:', newMarketingCampaign._id)

    // Update the post with the marketingCampaign reference
    console.log('🔄 Updating post with marketingCampaign reference')
    await client.patch(postId, {
      set: {
        marketingCampaign: { _ref: newMarketingCampaign._id, _type: 'reference' },
        status: 'ready-for-review'
      }
    }).commit()

    console.log('✅ Post updated successfully with marketingCampaign reference')

    console.log('✅ CREATE operation completed:', {
      postId: postId,
      marketingCampaignId: newMarketingCampaign._id,
      klaviyoCampaignId: campaign.data.id,
      klaviyoTemplateId: template.data.id
    })

  } catch (error) {
    console.error('❌ Error in CREATE operation:', error)

    throw error
  }
}

// Handler for UPDATE operation - updates template only
async function handleUpdateOperation(
  client: any,
  postId: string,
  title: string | undefined,
  slug: { current: string } | undefined,
  klaviyoApiKey: string
) {
  console.log('🔄 UPDATE: Updating template for existing marketing campaign')

  try {
    // Get the marketing campaign document to find the template ID
    const marketingCampaignQuery = `*[_type == "marketingCampaign" && post._ref == "${postId}"][0]`
    const marketingCampaignDoc = await client.fetch(marketingCampaignQuery)

    if (!marketingCampaignDoc) {
      console.log('ℹ️ No marketing campaign found for post, skipping update')
      return
    }

    const templateId = marketingCampaignDoc.klaviyoTemplateId
    if (!templateId) {
      console.error('❌ No template ID found in marketing campaign document')
      return
    }

    console.log('📋 Found template ID:', templateId, 'for post:', postId)

    // Fetch the latest body data for template update
    const {body: bodyData} = await client.fetch(portableTextBodyQuery(postId))

    // Generate updated email templates
    const htmlContent = await generateEmailTemplate(title, slug?.current, bodyData)
    const textContent = generateTextContent(title, slug?.current)

    // Update the Klaviyo template
    console.log('🔄 Updating Klaviyo template:', templateId)
    const updatedTemplateData = {
      data: {
        type: 'template',
        id: templateId,
        attributes: {
          html: htmlContent,
          text: textContent
        }
      }
    }

    const updatedTemplateResponse = await fetch(`https://a.klaviyo.com/api/templates/${templateId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'application/vnd.api+json',
        'revision': '2025-07-15'
      },
      body: JSON.stringify(updatedTemplateData)
    })

    if (!updatedTemplateResponse.ok) {
      console.error('❌ Failed to update Klaviyo template:', updatedTemplateResponse.status, updatedTemplateResponse.statusText)
      return
    }

    console.log('✅ Updated Klaviyo template:', templateId)

    // Reassign the updated template to the campaign to refresh the cache
    const klaviyoCampaignId = marketingCampaignDoc.klaviyoCampaignId
    if (klaviyoCampaignId) {
      console.log('🔄 Reassigning updated template to campaign:', klaviyoCampaignId)

      // Get the campaign message ID from the campaign
      const campaignResponse = await fetch(`https://a.klaviyo.com/api/campaigns/${klaviyoCampaignId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
          'accept': 'application/vnd.api+json',
          'revision': '2025-07-15'
        }
      })

      if (campaignResponse.ok) {
        const campaignData = await campaignResponse.json()
        const campaignMessageId = campaignData.data.relationships?.['campaign-messages']?.data?.[0]?.id

        if (campaignMessageId) {
          // Reassign the template to the campaign message
          const assignTemplateResponse = await fetch(`https://a.klaviyo.com/api/campaign-message-assign-template`, {
            method: 'POST',
            headers: {
              'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
              'Content-Type': 'application/json',
              'accept': 'application/vnd.api+json',
              'revision': '2025-07-15'
            },
            body: JSON.stringify({
              data: {
                type: "campaign-message",
                id: campaignMessageId,
                "relationships": {
                  "template": {
                    "data": {
                      "type": "template",
                      "id": templateId
                    }
                  }
                }
              }
            })
          })

          if (assignTemplateResponse.ok) {
            console.log('✅ Successfully reassigned updated template to campaign')
          } else {
            const errorText = await assignTemplateResponse.text()
            console.error('❌ Failed to reassign template to campaign:', assignTemplateResponse.status, errorText)
          }
        } else {
          console.error('❌ No campaign message ID found in campaign data')
        }
      } else {
        console.error('❌ Failed to fetch campaign data for template reassignment')
      }
    } else {
      console.log('ℹ️ No Klaviyo campaign ID found, skipping template reassignment')
    }

    // Update the marketing campaign document's updatedAt timestamp
    await client.patch(marketingCampaignDoc._id, {
      set: {
        updatedAt: new Date().toISOString()
      }
    }).commit()

    console.log('✅ UPDATE operation completed for post:', postId)

  } catch (error) {
    console.error('❌ Error in UPDATE operation:', error)

    throw error
  }
}

// Helper function to generate email template HTML
async function generateEmailTemplate(title: string | undefined, slug: string | undefined, body: any[] | undefined): Promise<string> {
  const postUrl = slug ? `https://yourdomain.com/posts/${slug}` : '#'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'New Post'}</title>
    <style>
body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}img{-ms-interpolation-mode:bicubic;border:0;height:auto;line-height:100%;outline:none;text-decoration:none}body{margin:0;padding:0;background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6}.email-container{max-width:600px;margin:0 auto;background-color:#fff}.header{text-align:center;padding:48px 24px}.logo{font-size:24px;font-weight:700;color:#d97706;letter-spacing:2px;margin-bottom:4px}.logo-subtitle{font-size:12px;color:#6b7280;letter-spacing:3px;margin-bottom:32px}.main-headline{font-size:32px;font-weight:300;color:#111827;margin-bottom:16px;line-height:1.2}.main-description{font-size:16px;color:#6b7280;line-height:1.6;max-width:400px;margin:0 auto}.product-section{padding:0 24px}.product-card{margin-bottom:32px;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)}.product-image{width:100%;height:320px;object-fit:contain;display:block}.product-badge{position:absolute;top:16px;left:16px;background-color:#ec4899;color:#fff;padding:4px 12px;font-size:12px;font-weight:500;border-radius:20px}.product-info{padding:24px;background-color:#fff}.product-name{font-size:20px;font-weight:500;color:#111827;margin-bottom:8px}.product-pricing{margin-bottom:16px}.product-price{font-size:20px;font-weight:300;color:#d97706;margin-right:12px}.product-original-price{font-size:16px;color:#6b7280;text-decoration:line-through}.btn{display:inline-block;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:500;text-align:center;width:100%;box-sizing:border-box}.btn-primary{background-color:#d97706;color:#fff}.btn-outline{background-color:transparent;color:#d97706;border:2px solid #d97706}.btn-secondary{background-color:#ec4899;color:#fff}.collection-cta{padding:48px 24px}.collection-card{background-color:#f9fafb;padding:32px;border-radius:8px;text-align:center}.collection-title{font-size:24px;font-weight:300;color:#111827;margin-bottom:12px}.collection-description{color:#6b7280;margin-bottom:24px;line-height:1.6}.experience-cta{padding:0 24px 48px;text-align:center}.experience-title{font-size:24px;font-weight:300;color:#111827;margin-bottom:12px}.experience-description{color:#6b7280;margin-bottom:24px;line-height:1.6;max-width:400px;margin:0 auto}.footer{padding:32px 24px;border-top:1px solid #e5e7eb;text-align:center}.footer-links{margin-bottom:16px}.footer-link{color:#6b7280;text-decoration:none;margin:0 12px}.footer-text{font-size:12px;color:#6b7280;margin-bottom:8px}.footer-link:hover{color:#ec4899}@media only screen and (max-width:600px){.main-headline{font-size:28px}.product-section{padding:0 16px}.collection-cta,.experience-cta{padding-left:16px;padding-right:16px}}
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">SANITY</div>
            <div class="logo-subtitle">Squiggle Mart</div>

            ${toHTML(body || [], {
              components: {
                types: {
                  image: ({value}) => {
                    return `<img src="${value.asset.url}" alt="${value.alt || ''}" style="max-width: 100%; height: auto; margin: 20px 0;" />`
                  },
                  products: ({value}) => {
                          console.log('Products block value:', value)
                          if (!value?.products || !Array.isArray(value.products)) return ''
                          console.log('Products:', value.products)
                          return `
                             <div class="product-section">
                               ${value.products
                                 .map(
                                   (product: any) => `
                                     <div class="product-card">
                                       <div style="position: relative;">
                                         <img src="${product.store.previewImageUrl || ''}" alt="${product.title || 'Product'}" class="product-image">
                                         ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                                       </div>
                                       <div class="product-info">
                                         <h3 class="product-name">${product.store.title || 'Untitled Product'}</h3>
                                         <div class="product-pricing">
                                           <span class="">$${product.store?.priceRange?.minVariantPrice}</span>
                                         </div>
                                         <a href="https://yoursite.com/products/${product.slug || '#'}" class="btn btn-primary">Shop Now</a>
                                       </div>
                                     </div>
                                   `,
                                 )
                                 .join('')}
                             </div>`
                        },
                      },
                marks: {
                  strong: ({children}) => `<strong>${children}</strong>`,
                  em: ({children}) => `<em>${children}</em>`,
                  underline: ({children}) => `<u>${children}</u>`
                },
                block: {
                  h1: ({children}) => `<h1 style="font-size: 24px; margin: 24px 0;">${children}</h1>`,
                  h2: ({children}) => `<h2 style="font-size: 20px; margin: 20px 0;">${children}</h2>`,
                  h3: ({children}) => `<h3 style="font-size: 18px; margin: 18px 0;">${children}</h3>`,
                  normal: ({children}) => `<p style="font-size: 16px; line-height: 1.6; margin: 16px 0;">${children}</p>`,
                  blockquote: ({children}) => `<blockquote style="font-style: italic; margin: 20px 0; padding-left: 20px; border-left: 4px solid #ccc;">${children}</blockquote>`
                },

              }
            })}
        </div>
        <!-- Collection CTA -->
        <div class="collection-cta">
            <div class="collection-card">
                <h3 class="collection-title">Explore the Complete Collection'</h3>
                <p class="collection-description">
                    Show your love for Squiggle Mart with this limited edition collection.
                </p>
                <a href="https://squigglemart.com/collections/all" class="btn btn-outline">View All Items</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-links">
                <a href="https://www.instagram.com/squigglemart" class="footer-link">Instagram</a>
                <a href="https://www.pinterest.com/squigglemart" class="footer-link">Pinterest</a>
                <a href="https://www.facebook.com/squigglemart" class="footer-link">Facebook</a>
            </div>
            <p class="footer-text">© ${new Date().getFullYear()} Sanity. All rights reserved.</p>
            <p class="footer-text">
                You're receiving this because you subscribed to our newsletter.
                <a href="https://yoursite.com/unsubscribe" class="footer-link">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
  `
}

// Helper function to generate text content
function generateTextContent(title: string | undefined, slug: string | undefined): string {
  const postUrl = slug ? `https://yoursite.com/posts/${slug}` : '#'

  return `
${title || 'New Post'}

We've just published a new post that we think you'll find interesting.

Read more at: ${postUrl}

Best regards,
Your Team
  `.trim()
}

const portableTextBodyQuery = (postId: string) => `
*[_id == "${postId}"][0]{
      body[]{
        _type,
        _key,
        // Handle image blocks
        _type == "image" => {
          asset->{
            url,
            metadata
          },
          alt
        },
        // Handle product blocks
        _type == "products" => {
          _type,
          products[]->{
            _type,
            ...,
            store
          }
        },
        // Handle text blocks
        _type == "block" => {
          ...,
          children[]{
            ...,
            // Resolve any marks that might have references
            _type == "span" => {
              ...,
              markDefs[]{
                ...,
                _type == "link" => {
                  ...,
                  internalLink->{
                    _id,
                    _type,
                    title,
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
`
```

### Set up the campaign send function

**File**: `functions/marketing-campaign-send/index.ts`
**Trigger**: Document changes on `marketingCampaign` documents specifically toggling the `status` to `ready to send`
**Purpose**: Sends approved marketing campaigns to subscribers via Klaviyo.

#### Key Features

- **Campaign Validation**: Ensures campaign is ready for sending
- **Status Management**: Updates campaign and email status after sending
- **Error Handling**: Handles Klaviyo API errors gracefully
- **Rate Limiting**: Respects Klaviyo's API rate limits

#### Process Flow

**Document Event Trigger**

- Listens for changes to `marketingCampaign` documents
- Validates that campaign has the required Klaviyo campaign ID

**Campaign Sending**

- Calls Klaviyo's send job API
- Handles various error scenarios (rate limits, permissions, etc.)
- Updates campaign status to `sent`

**Status Updates **

- Updates marketing campaign document with send timestamp
- Updates post status to `sent`
- Creates success/error notifications

#### Add environment variables

Find the API key for your Klaviyo account and email list, and paste it into the environment file:

**.env**

```
KLAVIYO_API_KEY=your_klaviyo_api_key
```

#### Add code to the send campaign function file

**marketing-campaign-send/index.ts**

```
import { documentEventHandler, type DocumentEvent } from '@sanity/functions'
import { createClient } from '@sanity/client'

interface MarketingCampaignDocument {
  _id: string;
  _type: string;
  klaviyoCampaignId?: string;
  post?: {
    _ref: string;
  };
  status?: string;
}

interface KlaviyoSendJobResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      status: string;
    };
  };
}

export const handler = documentEventHandler(async ({ context, event}: { context: any, event: DocumentEvent<MarketingCampaignDocument> }) => {
  console.log('🚀 Marketing Campaign Send Function called at', new Date().toISOString())
  console.log('🚀 Event:', event)

  try {
    const { _id, _type, klaviyoCampaignId, post } = event.data as MarketingCampaignDocument

    // Get Klaviyo API credentials from environment
    const klaviyoApiKey = process.env.KLAVIYO_API_KEY

    if (!klaviyoApiKey) {
      console.error('❌ KLAVIYO_API_KEY not found in environment variables')
      return
    }

    if (_type !== 'marketingCampaign') {
      console.log('⏭️ Skipping non-marketingCampaign document:', _type)
      return
    }

    // Check if marketing campaign has a post reference
    if (!post?._ref) {
      console.log('⏭️ Marketing campaign does not have a post reference - skipping')
      return
    }

    const client = createClient({
      ...context.clientOptions,
      dataset: 'production',
      apiVersion: '2025-06-01',
    })

    // Get the post document from the marketing campaign reference
    const postId = post._ref
    const postDocument = await client.getDocument(postId)

    if (!postDocument) {
      console.error('❌ Email document not found:', postId)
      return
    }

    if (!klaviyoCampaignId) {
      console.error('❌ Klaviyo campaign ID not found in marketing campaign document')
      return
    }

    console.log('📢 Sending Klaviyo campaign:', klaviyoCampaignId)

    try {
      // Send the campaign using Klaviyo's send endpoint
      const sendCampaignResponse = await fetch(`https://a.klaviyo.com/api/campaign-send-jobs`, {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
          'Content-Type': 'application/json',
          'accept': 'application/vnd.api+json',
          'revision': '2025-07-15'
        },
        body: JSON.stringify({
          data: {
            type: 'campaign-send-job',
            id: klaviyoCampaignId
          }
        })
      })

      if (!sendCampaignResponse.ok) {
        const errorText = await sendCampaignResponse.text()
        console.error('❌ Failed to send Klaviyo campaign:', sendCampaignResponse.status, errorText)

        // Handle specific error cases
        if (sendCampaignResponse.status === 429) {
          console.error('❌ Rate limit exceeded. Klaviyo allows 10/s burst, 150/m steady')
        } else if (sendCampaignResponse.status === 400) {
          console.error('❌ Bad request. Check campaign data format')
        } else if (sendCampaignResponse.status === 403) {
          console.error('❌ Forbidden. Check API key permissions (campaigns:write scope required)')
        } else if (sendCampaignResponse.status === 422) {
          console.error('❌ Unprocessable entity. Campaign may not be ready to send')
        }
        return
      }

      const sendJobResponse: KlaviyoSendJobResponse = await sendCampaignResponse.json()
      console.log('✅ Campaign send job created successfully:', sendJobResponse.data.id)

      // Update the marketing campaign document status to 'sent'
      console.log('🔄 Updating marketing campaign status to sent')
      await client.patch(_id, {
        set: {
          status: 'sent',
          sentAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }).commit()

      console.log('✅ Marketing campaign status updated to sent')

      // Update the email status to 'sent' (this should not trigger further updates)
      console.log('🔄 Updating post status to sent')
      await client.patch(postId, {
        set: {
          status: 'sent'
        }
      }).commit()

      console.log('✅ Post status updated to sent')

      console.log('✅ Campaign send completed successfully:', {
        postId: postId,
        marketingCampaignId: _id,
        klaviyoCampaignId: klaviyoCampaignId,
        sendJobId: sendJobResponse.data.id
      })

    } catch (error) {
      console.error('❌ Error sending Klaviyo campaign:', error)

      throw error
    }

  } catch (error) {
    console.error('❌ Error processing campaign send:', error)


    throw error
  }
})
```

### Test and deploy the functions

You should test if the functions run locally, and deploy them to production when you have validated that everything is correctly set up.

## Usage guide

Once the functions are deployed, you test out the flow in the Studio.

### Creating a Marketing Campaign

70. **Create an Post in Sanity Studio** - build an initial post/email in the Sanity studio, include copy/products/etc
71. **Function Automatically Triggers**

- Creates Klaviyo template with rendered content
- Creates Klaviyo campaign with audience targeting
- Links post to marketing campaign
- Updates post status to `ready-for-review`

### Sending a Campaign

72. **Update Marketing Campaign Status** - When you're ready to send the campaign, go into the campaign that's ready and change the status to ready-to-send
73. **Function Automatically Triggers**

- Sends campaign via Klaviyo API
- Updates campaign status to `sent`
- Updates post status to `sent`
- Creates success notification

> [!NOTE]
> Why 2 Different Functions?
> Given the complexity of the workflow, it makes more sense to separate these functions so they're easy to troubleshoot and extend with your use cases. Putting all these switch statements into 1 giant function would just increase the technical debt and complexity so we split them up!

## Troubleshooting

### Common Issues

76. **API Key Issues**- Verify API key has correct permissions, check API key is not expired, ensure API key is properly set in environment variables
77. **List ID Issues**- Verify list exists in Klaviyo, check list ID is correct, ensure list has subscribers
78. **Template Generation Issues**- Check Portable Text content structure, verify product references are valid, test template rendering in Klaviyo preview
79. **Campaign Sending Issues**- Verify campaign is in correct status, check Klaviyo campaign settings, review rate limit status

### Debugging Steps

78. **Check Function Logs**- Review console output for errors, look for specific error messages, check API response status codes
79. **Verify Environment Variables**- Ensure all required variables are set, check variable values are correct, test API key with Klaviyo directly
80. **Test API Calls**- Use Klaviyo's API documentation, test API calls manually, verify request/response format
