'use client'

import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'

export default function TermsOfServicePage() {
  return (
    <section
      aria-labelledby='terms-page-heading'
      className='relative isolate min-h-screen bg-white dark:bg-xuba-purple-900 flex flex-col items-center overflow-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      {/* Header Section */}
      <div className='relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-12'>
        <div className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase'>
          Legal
        </div>
        <h1
          id='terms-page-heading'
          className='text-xuba-green-900 dark:text-white md:text-7xl text-4xl sm:text-5xl font-thin tracking-tight mt-4 text-center'
        >
          Terms of{' '}
          <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
            Service
          </span>
        </h1>
      </div>

      {/* Content Section */}
      <main className='relative z-10 w-full max-w-4xl mx-auto px-6 pb-24'>
        <div className='prose prose-lg dark:prose-invert max-w-none'>
          {/* Section 1: DEFINITIONS */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>1.</span> DEFINITIONS
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.1</span>{' '}
                &quot;Business Hours&quot; means the hours of 8.30am to 5.00pm.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.2</span>{' '}
                &quot;Client&quot; means any person or entity purchasing Goods
                and/or Services from Xuba.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.3</span>{' '}
                &quot;Goods&quot; means all goods supplied or to be supplied by
                Xuba to the Client and shall include, without limitation, all
                computer Hardware and computer Software.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.4</span>{' '}
                &quot;Hardware&quot; means any physical piece of electronic
                computing componentry, whether individually or as part of an
                assembled computer system, a standalone computing device or
                peripheral.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.5</span>{' '}
                &quot;Intellectual Property&quot; means all or any of the
                following: trademarks and applications for registration of
                trademarks, trade name(s), patents and applications for patents,
                plant variety rights, know-how, being technical and other
                information or experience or trade secrets, copyright in any
                written material, plans, software code or other work, designs,
                whether or not registered or protected by copyright, and any
                other intellectual property.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.6</span> &quot;New
                Intellectual Property&quot; means any Intellectual Property
                created or existing as a result of, or in connection with, Xuba
                carrying out the Services.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.7</span>{' '}
                &quot;Price&quot; means the price payable for the Goods and
                Services by the Client to Xuba including without limitation all
                disbursements and labour charges and is exclusive of GST.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.8</span>{' '}
                &quot;Professional Services&quot; means all services and advice
                provided or to be provided by Xuba to the Client and shall
                include without limitation general IT consulting, IT system
                engineering, IT compatibility, IT infrastructure analysis, IT
                health checks and other similar IT services. For specific
                projects, the parties may execute a specific proposal to further
                describe the Services.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.9</span>{' '}
                &quot;Services&quot; means Support Services and Professional
                Services.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.10</span>{' '}
                &quot;Software&quot; means machine readable code, compiled to
                create a computer program (or part thereof), whether installed
                locally or remotely via internet or other platform, including
                without limitation any Updates, Upgrades and, to the extent that
                they relate to Software, Work Around&apos;s, and any other
                software code provided by Xuba, including as part of any
                Services.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.11</span>{' '}
                &quot;Support Services&quot; means the support that is available
                for purchase by the Client, and if so purchased, as described in
                a Support Services Schedule signed by Xuba and the Client, from
                time to time. Should the parties not have signed a Support
                Services Schedule, Xuba shall not be obliged to provide any
                support related services.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.12</span> &quot;Terms
                of Trade&quot; means these terms of trade, together with any
                executed Support Services Schedules and/or Proposals.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.13</span>{' '}
                &quot;Update&quot; means a routine update to Software released
                by a third party manufacturer, which is generally of a minor
                nature.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.14</span>{' '}
                &quot;Upgrade&quot; means a routine upgrade to Software released
                by a third party manufacturer, which is generally of a major
                nature.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.15</span> &quot;Work
                Around&quot; means manipulation of the settings and
                configuration of Software or Hardware to bring such Software or
                Hardware back to an operating manner, but which may not be in
                accordance with the relevant specification.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.16</span>{' '}
                &quot;Working Days&quot; means any day (other than a Saturday or
                Sunday) on which registered trading banks are open for business
                in New Zealand.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>1.17</span>{' '}
                &quot;Xuba&quot; means Xuba Limited and any employees of Xuba.
              </p>
            </div>
          </section>

          {/* Section 2: ACCEPTANCE */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>2.</span> ACCEPTANCE
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>2.1</span> The parties
                agree that the Client will be deemed to have accepted these
                Terms &amp; Conditions of Trade when the Service Level Agreement
                and/or Quote is signed by someone authorised to accept Service
                Level Agreement and/or Quote by Xuba.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>2.2</span> Any
                instructions received by Xuba from the Client for the order or
                supply of Goods and Services shall, subject to clause 2.2,
                constitute a binding contract and acceptance of the terms and
                conditions contained herein.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>2.3</span> Xuba
                reserves the right to refuse to supply the Client with any Goods
                or Services at any time without giving reasons for such refusal.
              </p>
            </div>
          </section>

          {/* Section 3: PRICING */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>3.</span> PRICING
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>3.1</span> Professional
                Services shall be charged for each hour in accordance with
                Xuba&apos;s standard labour charges that may be set and amended
                from time to time by Xuba, or separately agreed by the parties
                in a Support Services Schedule, from time to time. In addition
                to labour, Xuba shall charge the Client for any Goods supplied
                by it, that were used within the course of providing
                Professional Services.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>3.2</span> If a
                quotation is given by Xuba for Goods and/or Services:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>3.2.1</span> unless
                  otherwise agreed, the quotation shall be valid for thirty (30)
                  days from the date of issue;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>3.2.2</span> the
                  quotation shall be exclusive of goods and services tax unless
                  specifically stated to the contrary; and
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>3.2.3</span> the
                  Client acknowledges that any quotation given by Xuba is based
                  on Xuba&apos;s knowledge at the time the quotation is given,
                  is Xuba&apos;s best estimate only and can be varied by Xuba if
                  any circumstances change or the Client requires any additional
                  Goods or Services; and
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>3.2.4</span> such
                  quotation may be accepted by the Client issuing a purchase
                  order to Xuba that references the applicable quotation and is
                  received by Xuba within the timeframe set out within clause
                  3.2.1.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: PAYMENT */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>4.</span> PAYMENT
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>4.1</span> Upon receipt
                of completion of services in accordance with the acceptance of
                the quotation, Xuba will invoice the Client on the last day of
                the month.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>4.2</span> The Client
                shall pay the Price set out in the invoice for Goods and
                Services, plus any GST payable on the Price, on or before the
                20th day of the month following the date of the invoice (
                <strong className='text-xuba-green-900 dark:text-white'>Due Date</strong>).
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>4.3</span> Xuba, prior
                to supplying the Goods and Services may require payment of the
                full Price in advance or progress payments to be made at various
                stages during the supply. In the event that the Client fails to
                meet any requirement for payment, Xuba may refuse to commence or
                continue supply to the Client.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>4.4</span> Xuba may
                impose a credit limit (
                <strong className='text-xuba-green-900 dark:text-white'>Credit Limit</strong>) at its
                sole discretion for the Client&apos;s account from time to time,
                and may alter the Credit Limit without notice. The Client
                acknowledges that staying within the Credit Limit is the
                Client&apos;s sole responsibility and Xuba accepts no
                responsibility for any account going into excess of the Credit
                Limit.
              </p>
            </div>
          </section>

          {/* Section 5: DELIVERY AND RISK */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>5.</span> DELIVERY AND RISK
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>5.1</span> Any delivery
                timeframe stated by Xuba is an estimate only, and Xuba shall not
                be liable should delivery take place earlier or later than
                stated.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>5.2</span> Xuba, the
                manufacturer, third party or agent shall deliver Goods to the
                Clients nominated premises if delivery has been included within
                the accepted quotation. If delivery has not been included, the
                Client shall be required to collect the Goods from Xuba, the
                manufacturer, third party or agent, as specified by Xuba from
                time to time, at the Clients expense. The Client acknowledges
                that such location may be outside New Zealand.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>5.3</span> Risk in any
                Goods and Services supplied by Xuba shall pass when the Goods
                and Services are delivered to the Client at the nominated
                premises, or collected by the Client from Xuba, the
                manufacturer, third party or agent as set out above, and it
                shall be the Client&apos;s obligation to insure the Goods from
                that time.
              </p>
            </div>
          </section>

          {/* Section 6: CANCELLATION */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>6.</span> CANCELLATION
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>6.1</span> Purchase
                orders placed with Xuba by the Client cannot be cancelled
                without the written approval of Xuba. In the event that Xuba
                accepts the cancellation of any order placed, it shall be
                entitled to charge a reasonable fee for any work done or
                expenditure incurred on behalf of Xuba to the date of the
                cancellation in reliance on the order including a fee for the
                processing and acceptance of the Client&apos;s order and request
                for cancellation.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>6.2</span> Xuba may
                cancel an order at any time by Xuba giving the Client written
                notice. The Client shall indemnify Xuba against all claims and
                loss of any kind whatsoever however caused or arising as a
                result of this clause brought by any person in connection with
                any cancellation by Xuba, its agents or employees in connection
                with the cancelled Goods and Services.
              </p>
            </div>
          </section>

          {/* Section 7: GOODS WARRANTY */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>7.</span> GOODS WARRANTY
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>7.1</span> All Goods
                installed by Xuba shall be installed in accordance with the
                manufacturer&apos;s instructions or standard industry practice,
                and a manufacturer&apos;s warranty may apply.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>7.2</span> For the
                avoidance of doubt, Xuba is not liable for any warranty provided
                by any manufacturer. Xuba may, in Xuba&apos;s discretion,
                provide reasonable assistance to the Client to make a claim
                against such manufacturer&apos;s warranty.
              </p>
            </div>
          </section>

          {/* Section 8: SERVICES WARRANTIES */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>8.</span> SERVICES
              WARRANTIES
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>8.1</span> Xuba
                warrants that it shall perform all Services in a professional
                manner and in accordance with generally accepted industry best
                practice.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>8.2</span> Should the
                Services be carried out at the Clients site, or other site at
                the direction of the Client, the Client warrants that such site
                is safe and secure, and in compliance with all applicable
                occupational safety and health legislation.
              </p>
            </div>
          </section>

          {/* Section 9: CONSUMER LEGISLATION & LIABILITY */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>9.</span> CONSUMER
              LEGISLATION &amp; LIABILITY
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>9.1</span> The
                statutory guarantees contained in the Consumer Guarantees Act
                1993 are excluded to the maximum extent permitted where the
                Client acquires Goods and Services from Xuba for the purposes of
                a business in terms of section 2 and 43 of that Act
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>9.2</span> The Consumer
                Guarantees Act 1993, the Sale of Goods Act 1908, the Fair
                Trading Act 1986 and other statutes may imply warranties or
                conditions or impose obligations upon Xuba which cannot by law
                (or which can only to a limited extent by law) be excluded or
                modified. In respect of any such implied warranties, conditions
                or terms imposed on Xuba, Xuba&apos;s liability shall, where it
                is allowed, be excluded or if not able to be excluded only apply
                to the minimum extent required by the relevant statute.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>9.3</span> Except as
                otherwise provided by clause 9.2 Xuba shall not be liable for
                any loss of data, consequential loss whether suffered or
                incurred by the Client or another person and whether in contract
                or tort (including negligence) or otherwise and irrespective of
                whether such loss or damage arises directly or indirectly from
                Goods and Services provided by Xuba to the Client.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>9.4</span> Except as
                otherwise provided by clause 9.2, in the event that Xuba is
                found liable for the loss or damage set out in clause 9.3, such
                liability shall be limited to the Price paid by the Client to
                Xuba for the Goods and/or Services that are the subject matter
                of the claim.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>9.5</span> The Client
                indemnifies Xuba in respect of all liabilities, costs (including
                but not limited to full costs of any fees between solicitor and
                client or debt collection agency fees), disbursements and other
                expenses incurred by Xuba, arising out of or incidental to a
                breach of these Terms of Trade or default by the Client.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>9.6</span> For the
                avoidance of doubt, it is the Clients sole responsibility to
                manage its internal processes, procedures or requirements in
                relation to data backup, data recovery and disaster recovery,
                and to ensure the protection, confidentiality or security of its
                data or information. Notwithstanding anything else in these
                terms of trade, in no circumstances shall Xuba be liable for any
                data loss, restoration, recovery, reconstitution, recreation of
                data, or other similar and associated loss.
              </p>
            </div>
          </section>

          {/* Section 10: DEFAULT */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>10.</span> DEFAULT
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>10.1</span> The
                following shall constitute defaults by the Client:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.1</span>{' '}
                  non-payment of any monies by the Due Date;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.2</span> the
                  Client intimates that it will not pay any sum by the Due Date;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.3</span> the
                  Client exceeds its Credit Limit;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.4</span> any
                  Goods are seized by any other creditor of the Client or any
                  other creditor intimates that it intends to seize Goods;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.5</span> any
                  Goods in the possession of the Client are materially damaged
                  while any sum due from the Client to Xuba remains unpaid;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.6</span> the
                  Client is bankrupted or put Into liquidation or a receiver is
                  appointed to any of the Client&apos;s assets;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.7</span> a Court
                  judgment is entered against the Client and remains unsatisfied
                  for seven (7) days; and
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.1.8</span> any
                  material adverse change in the financial position of the
                  Client.
                </p>
              </div>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>10.2</span> If the
                Client has breached or is in breach of these Terms of Trade,
                then without prejudice to Xuba&apos;s other rights and remedies
                under these Terms of Trade or at law, Xuba may (at Xuba&apos;s
                sole discretion) take any one or more of the following actions:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.2.1</span> cancel
                  these Terms of Trade;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.2.2</span> refuse
                  to supply Goods and Services to the Client or only continue to
                  supply Goods and Services on a cash on delivery or a cash up
                  front basis;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.2.3</span> impose
                  a Credit Limit in accordance with clause 4.4;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.2.4</span> require
                  the Client to provide a guarantor in accordance with clause
                  12; or
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>10.2.5</span> remove
                  or repossess Goods in accordance with clause 11.4.
                </p>
              </div>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>10.3</span> Xuba may
                seek reimbursement from the Client for any costs, charges or
                expenses (including legal costs as between solicitor and client
                and any debt collection agency fees) incurred by Xuba or any
                third party in consequence of or in connection with any default
                or any breach of these Terms of Trade by the Client including,
                without limitation, the enforcement by Xuba of any power, right
                or remedy conferred upon Xuba by law or by these Terms of Trade.
              </p>
            </div>
          </section>

          {/* Section 11: TITLE AND SECURITY */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>11.</span> TITLE AND
              SECURITY (PERSONAL PROPERTY SECURITIES ACT 1999)
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>11.1</span> Title in
                any Goods supplied by Xuba passes to the Client only when the
                Client has made payment in full for all Goods provided by Xuba
                and of all other sums due to Xuba by the Client on any account
                whatsoever. Until all sums due to Xuba by the Client have been
                paid in full, Xuba has a security interest in all Goods.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>11.2</span> The Client
                gives Xuba a security interest over:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>11.2.1</span> all
                  property that Xuba has performed Services on or to, or in
                  which Goods supplied or financed by Xuba have been attached or
                  incorporated; and
                </p>
              </div>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>11.3</span> The Client
                agrees to:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>11.3.1</span> if
                  required by Xuba, cooperate in good faith with Xuba to execute
                  the documentation required to register any security interest
                  in favour of Xuba on the Personal Property Securities Register
                  and protect Xuba&apos;s interest in the Goods supplied; and
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>11.3.2</span> waive
                  any right to receive a copy of the verification statement,
                  pursuant to s148 of the Personal Property Securities Act 1999.
                </p>
              </div>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>11.4</span> The Client
                gives irrevocable authority to Xuba to enter any premises
                occupied by the Client or on which Goods are situated at any
                reasonable time after default by the Client or before default if
                Xuba believes a default is likely and to remove and repossess
                any Goods and any other property to which Goods are attached or
                in which Goods are incorporated. Xuba shall not be liable for
                any costs, damages, expenses or losses incurred by the Client or
                any third party as a result of this action, nor liable in
                contract or in tort or otherwise in any way whatsoever unless by
                statute such liability cannot be excluded.
              </p>
            </div>
          </section>

          {/* Section 12: PERSONAL GUARANTEES */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>12.</span> PERSONAL
              GUARANTEES
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>12.1</span> Xuba may at
                any time require these Terms of Trade to be executed by one or
                more Guarantor of the Client that are suitable in Xuba&apos;s
                reasonable opinion. For the avoidance of doubt, suitability of a
                Guarantor may include, but is not limited to, examinations by
                Xuba of such factors as:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>12.1.1</span> the
                  proposed Guarantor&apos;s then current financial position;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>12.1.2</span> any
                  assets then currently held by the proposed Guarantor;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>12.1.3</span> the
                  proposed Guarantor&apos;s credit history; and
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>12.1.4</span> any
                  other matter that Xuba considers relevant.
                </p>
              </div>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>12.2</span> If the
                Client is a company, partnership or trust, the director(s),
                partner(s) or trustee(s) signing these Terms of Trade, in
                consideration for Xuba agreeing to supply Goods and Services and
                grant credit to the Client, also sign these Terms of Trade in
                their personal capacity as Guarantors.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>12.3</span> Any person,
                company or other entity executing these Terms of Trade as a
                Guarantor jointly and severally undertakes as principal debtors
                to Xuba to pay any and all monies now or hereafter owed by the
                Client to Xuba and indemnify Xuba against non-payment by the
                Client. Any liability of a Guarantor hereto shall not exclude
                the Client in any way whatsoever from the liabilities and
                obligations contained in these Terms of Trade. The Guarantors
                and Client shall be jointly and severally liable under the terms
                and conditions of these Terms of Trade and for payment of all
                sums due hereunder.
              </p>
            </div>
          </section>

          {/* Section 13: COLLECTION AND USE OF INFORMATION */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>13.</span> COLLECTION AND
              USE OF INFORMATION
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>13.1</span> The Client
                authorises Xuba to collect, retain and use any information about
                the Client, for the purpose of assessing the Clients credit
                worthiness, enforcing any rights under these Terms of Trade, or
                marketing any of Xuba&apos;s Goods and Services (including
                without limitation by electronic means). The Client may opt out
                of such electronic marketing by notifying Xuba.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>13.2</span> If the
                Client is required to provide a guarantor by Xuba, the Client
                shall procure and provide any additional information in relation
                to such guarantor requested by Xuba, for the purpose of
                assessing the guarantor&apos;s credit worthiness and enforcing
                any rights under these Terms of Trade. The Client warrants that
                it has all necessary consents or authorisations required to
                provide such information to Xuba for this purpose.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>13.3</span> If the
                Client is required to provide, and does so provide, information
                in relation to its employees, contractors or agents, to allow
                Xuba to complete the Services set out in these Terms of Trade,
                the Client warrants that it has all necessary consents or
                authorisations required to provide such information to Xuba for
                this purpose.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>13.4</span> The Client
                authorises Xuba to disclose any information obtained to any
                person for the purposes set out in clause 13.1.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>13.5</span> Where the
                Client is a natural person the authorities under clauses 13.1
                and 13.3 are authorities or consents for the purposes of the
                Privacy Act 1993.
              </p>
            </div>
          </section>

          {/* Section 14: MANUFACTURER TERMS */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>14.</span> MANUFACTURER
              TERMS
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>14.1</span> All third
                party Hardware sold by Xuba to the Client, and third party
                Software procured by Xuba for the Clients use, are manufactured
                by third parties, and are subject to the terms and conditions of
                use of those manufacturers, which may include, without
                limitation, end user licence agreements, support agreements,
                interoperability matrices and/or other requirements of use (
                <strong className='text-xuba-green-900 dark:text-white'>Manufacturer Terms</strong>).
                Depending on the requirements of the manufacturer, the
                Manufacturer Terms may be entered into with Xuba or directly
                with the manufacturer. The Client shall be deemed to accept such
                additional terms and conditions upon delivery or collection (as
                applicable) of the Goods. Xuba will use reasonable endeavours to
                make such Manufacturer Terms available to the Client as early as
                reasonably possible. Should the Client wish to negotiate such
                Manufacturer Terms, the Client must do so directly with the
                manufacturer concerned.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>14.2</span> Should Xuba
                licence any Software to the Client as part of these Terms of
                Trade, such Software shall be subject to the end user licence
                agreement and/or other terms and conditions distributed with
                such Software, and available upon request from Xuba.
              </p>
            </div>
          </section>

          {/* Section 15: INTELLECTUAL PROPERTY AND CONFIDENTIALITY */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>15.</span> INTELLECTUAL
              PROPERTY AND CONFIDENTIALITY
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>15.1</span> All
                Intellectual Property owned by a party prior to entering into
                these Terms of Trade shall remain the property of that party.
                The parties agree that any New Intellectual Property created by
                Xuba in carrying out the Services shall be the property of Xuba
                and the Client shall have no right or claim to the New
                Intellectual Property.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>15.2</span> Subject to
                the payment of the Price of all invoiced Goods and Services,
                Xuba grants the Client, for their internal business purposes
                only, a non-exclusive, worldwide, royalty free licence to use,
                modify and copy the New Intellectual Property created as part of
                any Services provided.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>15.3</span> The Client
                warrants that it has all necessary third party software licences
                required to enable Xuba to perform the Services, if such
                Services don&apos;t relate to Software purchased pursuant to
                these Terms of Trade.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>15.4</span> Xuba may
                use diagnostic software from time to time, to assist it in the
                performance of the Services. The Client consents to Xuba
                installing and running such software on the Client&apos;s IT
                system. Such diagnostic software remains the sole and exclusive
                property of Xuba, and shall not form part of any software
                licence contained within, or associated with, these Terms of
                Trade. Any output from the diagnostic software, and any
                Intellectual Property contained within such output, shall be
                owned by Xuba, and such output may only be used by the Client
                upon the specific consent of Xuba, and Xuba may impose any use
                restrictions that it deems fit.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>15.5</span> All
                Intellectual Property and other information belonging to the
                parties (including but not limited to these Terms of Trade)
                which by designation or by its nature is intended to be treated
                as confidential will be confidential information for the
                purposes of these Terms of Trade (
                <strong className='text-xuba-green-900 dark:text-white'>Confidential Information</strong>
                ).
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>15.6</span> The Client
                shall not without the prior written consent of Xuba disclose any
                Confidential Information to any third party. Xuba may disclose
                such Confidential Information to its group companies (including
                subsidiaries and parent companies), to any subcontractors or
                independent contractors, and as otherwise reasonably required to
                comply with its obligations under these Terms of Trade. Should
                either party disclose information as authorised pursuant to
                these Terms of Trade, the disclosing party shall ensure that the
                receiving party observes not less than equivalent obligations of
                confidentiality as those contained in this Agreement.
              </p>
            </div>
          </section>

          {/* Section 16: DISPUTES */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>16.</span> DISPUTES
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>16.1</span> In the
                event of any dispute between the parties in relation to these
                Terms of Trade (but excluding the payment of the Price) the
                parties will first seek to resolve such dispute by promptly
                giving notice to the other party and cooperatively endeavour to
                resolve the dispute. If the dispute remains unresolved the
                parties will first seek a resolution through the use of
                mediation or other informal method of resolution before pursuing
                arbitration or resolution through the Courts.
              </p>
            </div>
          </section>

          {/* Section 17: MISCELLANEOUS */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mb-6 flex items-center gap-3'>
              <span className='text-xuba-green-500'>17.</span> MISCELLANEOUS
            </h2>
            <div className='space-y-4 text-xuba-green-700 dark:text-gray-300'>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.1</span> Xuba shall
                not be liable for delay or failure to perform its obligations
                directly or indirectly if the cause of the delay or failure is
                beyond Xuba&apos;s control including without limitation
                &quot;acts of god&quot;, wars or failure of third parties such
                as suppliers or subcontractors.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.2</span> Notices,
                communication documents or demands required to be made or served
                pursuant to this Agreement shall be in writing signed by the
                party giving the notice or by any officer or solicitor of that
                party. Any notice or document shall be deemed to be duly given
                or made:
              </p>
              <div className='ml-8 space-y-3'>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>17.2.1</span> if
                  delivered by hand, when so delivered;
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>17.2.2</span> if sent
                  by post, on the third Working Day following posting; or
                </p>
                <p>
                  <span className='text-xuba-green-900 dark:text-white font-medium'>17.2.3</span> in the
                  case of a communication by facsimile when transmitted with no
                  indication of incomplete transmission to the recipient&apos;s
                  last known facsimile number.
                </p>
              </div>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.3</span> Except as
                expressly set out within these Terms of Trade, notices may not
                be given by email. Notices, communication documents or demands
                shall be given to the parties, in the case of Xuba, at its
                registered address, and in the case of the Client, if it is a
                company at its registered address, or if it is an individual, at
                their most recent residential address provided by that
                individual to Xuba.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.4</span> Failure by
                Xuba to enforce any of the terms and conditions contained in
                these Terms of Trade shall not be deemed to be a waiver of any
                of the rights or obligations Xuba has under these Terms of
                Trade.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.5</span> Xuba may
                subcontract any or all of the Services, delivery of Goods or
                other obligation pursuant to these Terms of Trade to any third
                party, in its discretion. Xuba will at all times remain
                responsible for the subcontractors compliance with these Terms
                of Trade.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.6</span> If any
                provision of these Terms of Trade shall be invalid, void or
                illegal or unenforceable the validity existence, legality and
                enforceability of the remaining provisions shall not be
                affected, prejudiced or impaired.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.7</span> These terms
                and conditions of trade shall be governed by the laws of New
                Zealand, and the courts of New Zealand shall have non-exclusive
                jurisdiction to determine any dispute arising out of the subject
                matter of these Terms of Trade.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.8</span> Reference
                to any Statutes includes any later amendments or changes to
                those Statutes.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.9</span> The Client
                may not assign its rights or obligations pursuant to these Terms
                of Trade, without obtaining the prior written consent of Xuba.
                Any attempted assignment shall not have effect, and shall be
                null and void.
              </p>
              <p>
                <span className='text-xuba-green-900 dark:text-white font-medium'>17.10</span> Xuba may
                from time to time amend these Terms of Trade by giving the
                Client notice in writing. No other amendment shall have effect
                unless recorded in writing and signed by the parties.
              </p>
            </div>
          </section>
        </div>
      </main>
    </section>
  )
}
