import React, { useState } from 'react'

const services = [
  {
    id: 'cloud-technology',
    title: 'Cloud Technology',
    tagline: 'Simple. Flexible. Secure.',
    heroSubtitle: 'Your data, accessible anywhere—without the headaches.',
    introParagraph:
      "Moving to the cloud doesn't have to be complicated. We make it simple, flexible, and secure—so you can access your files, apps, and data from anywhere without worrying about what's happening behind the scenes.",
    benefits: [
      {
        icon: '🔒',
        title: 'Rock-solid security',
        desc: 'Your data protected with enterprise-grade encryption',
      },
      {
        icon: '📈',
        title: 'Scale as you grow',
        desc: "Pay for what you need, expand when you're ready",
      },
      {
        icon: '💾',
        title: 'Automatic backups',
        desc: 'Never lose a file again with continuous cloud backup',
      },
      {
        icon: '🌏',
        title: 'Access anywhere',
        desc: 'Work from the office, home, or beach—your choice',
      },
    ],
    whatWeHandle: [
      'Cloud migration & setup',
      'Microsoft 365 & Google Workspace',
      'AWS, Azure & cloud hosting',
      'Data storage & disaster recovery',
      'Cloud security & compliance',
    ],
    ctaHeadline: 'Ready to move to the cloud?',
    ctaSubtext:
      "Let's chat about what cloud setup makes sense for your business.",
  },
  {
    id: 'it-support',
    title: 'IT Support',
    tagline: 'Help when you need it. Problems solved fast.',
    heroSubtitle: 'Remote desktop support that keeps your team productive.',
    introParagraph:
      "Tech problems don't wait for convenient times. That's why we're here—ready to jump in, fix the issue, and get you back to work. No jargon, no runaround, just real solutions from real people.",
    benefits: [
      {
        icon: '⚡',
        title: 'Fast response times',
        desc: 'Most issues resolved within minutes, not hours',
      },
      {
        icon: '🖥️',
        title: 'Remote & on-site',
        desc: "We'll fix it remotely or come to you if needed",
      },
      {
        icon: '🛡️',
        title: 'Proactive monitoring',
        desc: 'We catch problems before they catch you',
      },
      {
        icon: '💬',
        title: 'Plain English',
        desc: 'No gobblygook—just clear explanations',
      },
    ],
    whatWeHandle: [
      'Hardware troubleshooting & management',
      'Remote data backup & restore',
      'Patch implementation & updates',
      'Virus & spyware removal',
      'Software installation & support',
    ],
    ctaHeadline: 'IT headaches slowing you down?',
    ctaSubtext: 'Get in touch and let us take the tech stress off your plate.',
  },
  {
    id: 'server-support-and-security',
    title: 'Server Support & Security',
    tagline: 'Protected. Monitored. Always running.',
    heroSubtitle: 'Enterprise-grade security without the enterprise price tag.',
    introParagraph:
      "Your servers are the backbone of your business. We keep them running smoothly, protected from threats, and monitored 24/7. Sleep easy knowing we've got your back—literally.",
    benefits: [
      {
        icon: '🔐',
        title: 'Multi-layer security',
        desc: 'Firewalls, VPN, and advanced threat detection',
      },
      {
        icon: '👁️',
        title: '24/7 monitoring',
        desc: "We watch so you don't have to",
      },
      {
        icon: '🦠',
        title: 'Threat elimination',
        desc: 'Spam, spyware, and virus protection that works',
      },
      {
        icon: '📊',
        title: 'Regular health checks',
        desc: 'Preventive maintenance before issues arise',
      },
    ],
    whatWeHandle: [
      'Server setup & configuration',
      'Firewall management',
      'VPN setup & security',
      'Spyware & virus protection',
      'Managed Detection & Response (MDR)',
    ],
    ctaHeadline: 'Is your server secure?',
    ctaSubtext:
      "Let's do a security health check—no obligation, just peace of mind.",
  },
  {
    id: 'system-deployment',
    title: 'System Deployment',
    tagline: 'New tech, zero drama.',
    heroSubtitle: 'From planning to installation—we handle it all.',
    introParagraph:
      'Getting new equipment should be exciting, not exhausting. We take care of everything—planning what you need, ordering the right gear, setting it up perfectly, and making sure your team knows how to use it. You just enjoy your shiny new tech.',
    benefits: [
      {
        icon: '📋',
        title: 'Smart planning',
        desc: 'We assess your needs and recommend the right fit',
      },
      {
        icon: '🔧',
        title: 'Expert installation',
        desc: 'Configured correctly from day one',
      },
      {
        icon: '🔄',
        title: 'Data migration',
        desc: 'All your files moved over safely',
      },
      {
        icon: '🎓',
        title: 'Team training',
        desc: 'Everyone up to speed quickly',
      },
    ],
    whatWeHandle: [
      'Hardware & software planning',
      'Procurement & purchasing',
      'Installation & configuration',
      'Data migration & setup',
      'User onboarding & training',
    ],
    ctaHeadline: 'New systems on the horizon?',
    ctaSubtext:
      "Tell us what you're thinking and we'll make it happen smoothly.",
  },
  {
    id: 'incident-support',
    title: 'Incident Support',
    tagline: 'When things go wrong, we go right.',
    heroSubtitle: 'Fast, expert response when you need it most.',
    introParagraph:
      "Systems crash. Networks go down. It happens. What matters is how fast you're back up and running. Our incident support team responds immediately—because every minute of downtime costs you money and sanity.",
    benefits: [
      {
        icon: '🚨',
        title: 'Rapid response',
        desc: 'On it within minutes of your call',
      },
      {
        icon: '🔍',
        title: 'Root cause analysis',
        desc: "We don't just fix it—we find out why",
      },
      {
        icon: '📱',
        title: 'On-site when needed',
        desc: "We'll come to you if remote won't cut it",
      },
      {
        icon: '📝',
        title: 'Full documentation',
        desc: "You'll know exactly what happened and why",
      },
    ],
    whatWeHandle: [
      'Server & network emergencies',
      'Desktop & application failures',
      'Data recovery situations',
      'Security incident response',
      'After-hours emergency support',
    ],
    ctaHeadline: 'Need backup when things break?',
    ctaSubtext: "Get our number saved—we're here when you need us.",
  },
  {
    id: 'smb-it-guidance',
    title: 'SMB IT Guidance',
    tagline: 'Smart advice. No sales pitch.',
    heroSubtitle: 'Strategic IT guidance that actually fits your budget.',
    introParagraph:
      'Small and medium businesses deserve big-business IT strategy—without the big-business price tag. We become your virtual IT department, helping you make smart tech decisions, avoid costly mistakes, and plan for growth.',
    benefits: [
      {
        icon: '🧭',
        title: 'Strategic planning',
        desc: 'IT roadmaps aligned with your business goals',
      },
      {
        icon: '💰',
        title: 'Budget-smart advice',
        desc: 'Get the most value from every tech dollar',
      },
      {
        icon: '🤝',
        title: 'Vendor management',
        desc: "We deal with suppliers so you don't have to",
      },
      {
        icon: '📈',
        title: 'Growth planning',
        desc: 'Tech that scales as your business does',
      },
    ],
    whatWeHandle: [
      'IT infrastructure planning',
      'Purchase assistance & recommendations',
      'New product & solution evaluation',
      'Office automation solutions',
      'Email migration & setup',
    ],
    ctaHeadline: 'Want IT advice you can trust?',
    ctaSubtext:
      "Let's have a no-pressure chat about where your tech is headed.",
  },
]

export default function XubaWireframes() {
  const [activeService, setActiveService] = useState(0)
  const service = services[activeService]

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', -apple-system, sans-serif",
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      {/* Service Selector */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
          padding: '12px 20px',
          zIndex: 100,
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#888', fontSize: '13px', marginRight: '8px' }}>
          Select service:
        </span>
        {services.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveService(i)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeService === i ? '#c8e600' : '#333',
              color: activeService === i ? '#000' : '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: activeService === i ? '600' : '400',
              transition: 'all 0.2s',
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Wireframe Preview */}
      <div
        style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}
      >
        {/* Page Title */}
        <div
          style={{
            backgroundColor: '#1e1e2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid #333',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                backgroundColor: '#c8e600',
                color: '#000',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              WIREFRAME
            </span>
            <span style={{ color: '#888', fontSize: '13px' }}>
              URL: /services/{service.id}
            </span>
          </div>
          <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '600' }}>
            {service.title} — Service Page
          </h1>
        </div>

        {/* SECTION 1: Hero */}
        <WireframeSection
          number='1'
          title='Hero Section'
          annotation='Full-width hero with dark background. Service title prominent, tagline highlighted in brand yellow.'
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              border: '2px dashed #444',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: '#888',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              [NAV BAR - logo left, menu right]
            </div>
            <h1
              style={{
                fontSize: '42px',
                margin: '20px 0 8px',
                fontWeight: '700',
              }}
            >
              {service.title}
            </h1>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#c8e600',
                color: '#000',
                padding: '8px 20px',
                borderRadius: '4px',
                fontSize: '18px',
                fontWeight: '600',
                margin: '12px 0',
              }}
            >
              {service.tagline}
            </div>
            <p
              style={{
                color: '#aaa',
                fontSize: '18px',
                maxWidth: '500px',
                margin: '20px auto 30px',
              }}
            >
              {service.heroSubtitle}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}
            >
              <button
                style={{
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  border: '2px solid #fff',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Get in Touch →
              </button>
              <button
                style={{
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  border: '2px solid #555',
                  color: '#aaa',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Learn More ↓
              </button>
            </div>
          </div>
        </WireframeSection>

        {/* SECTION 2: Intro Paragraph */}
        <WireframeSection
          number='2'
          title='Introduction'
          annotation='Short, friendly paragraph explaining the service in plain English. Max 3 sentences. Conversational tone.'
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '50px 60px',
              border: '2px dashed #444',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '20px',
                lineHeight: '1.7',
                color: '#ccc',
                maxWidth: '700px',
                margin: '0 auto',
                fontStyle: 'italic',
              }}
            >
              &quot;{service.introParagraph}&quot;
            </p>
          </div>
        </WireframeSection>

        {/* SECTION 3: Benefits Grid */}
        <WireframeSection
          number='3'
          title='Key Benefits'
          annotation='4-column grid showing main benefits with icons. Each benefit has a short title and one-line description.'
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '2px dashed #444',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {benefit.icon}
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    margin: '0 0 8px',
                    color: '#c8e600',
                  }}
                >
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </WireframeSection>

        {/* SECTION 4: What We Handle */}
        <WireframeSection
          number='4'
          title='What We Handle'
          annotation='Simple list of specific services/tasks. Shows comprehensiveness without being overwhelming.'
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '40px',
              border: '2px dashed #444',
              display: 'flex',
              gap: '40px',
            }}
          >
            <div style={{ flex: '1' }}>
              <h3
                style={{
                  fontSize: '24px',
                  marginBottom: '24px',
                  color: '#fff',
                }}
              >
                What we handle for you
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {service.whatWeHandle.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      padding: '12px 0',
                      borderBottom: '1px solid #333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ccc',
                    }}
                  >
                    <span style={{ color: '#c8e600' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                flex: '1',
                backgroundColor: '#252525',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#555',
                fontSize: '14px',
                minHeight: '250px',
              }}
            >
              [Relevant illustration or icon graphic]
            </div>
          </div>
        </WireframeSection>

        {/* SECTION 5: Why Xuba */}
        <WireframeSection
          number='5'
          title='Why Xuba?'
          annotation='Reusable component across all service pages. Shows 4 core differentiators. Builds trust.'
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '40px',
              border: '2px dashed #444',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                marginBottom: '30px',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              Why businesses choose Xuba
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
              }}
            >
              {[
                {
                  icon: '💰',
                  title: 'No surprise costs',
                  desc: 'Predictable pricing, always',
                },
                {
                  icon: '✅',
                  title: 'Right first time',
                  desc: "We don't do repeat visits",
                },
                {
                  icon: '🤝',
                  title: 'We get you',
                  desc: 'Your business, understood',
                },
                {
                  icon: '💬',
                  title: 'No gobblygook',
                  desc: 'Plain English, always',
                },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>
                    {item.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: '14px',
                      margin: '0 0 6px',
                      color: '#c8e600',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </WireframeSection>

        {/* SECTION 6: CTA */}
        <WireframeSection
          number='6'
          title='Call to Action'
          annotation='Strong, service-specific CTA. Uses friendly, action-oriented language. Primary button prominent.'
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #2a1a3a 0%, #1a1a2a 100%)',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              border: '2px dashed #444',
            }}
          >
            <h2
              style={{
                fontSize: '32px',
                marginBottom: '12px',
                color: '#fff',
              }}
            >
              {service.ctaHeadline}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#aaa',
                marginBottom: '30px',
              }}
            >
              {service.ctaSubtext}
            </p>
            <button
              style={{
                padding: '16px 40px',
                backgroundColor: '#c8e600',
                border: 'none',
                color: '#000',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Let&apos;s Talk →
            </button>
          </div>
        </WireframeSection>

        {/* SECTION 7: Related Services */}
        <WireframeSection
          number='7'
          title='Related Services'
          annotation='Shows 2-3 other services the visitor might be interested in. Keeps them exploring.'
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '40px',
              border: '2px dashed #444',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                marginBottom: '24px',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              You might also need...
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {services
                .filter((_, i) => i !== activeService)
                .slice(0, 3)
                .map((s, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#252525',
                      borderRadius: '8px',
                      padding: '24px',
                      textAlign: 'center',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        margin: '0 0 8px',
                        color: '#c8e600',
                      }}
                    >
                      {s.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        margin: '0 0 16px',
                      }}
                    >
                      {s.tagline}
                    </p>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                      Learn more →
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </WireframeSection>

        {/* SECTION 8: Footer */}
        <WireframeSection
          number='8'
          title='Footer'
          annotation='Standard footer with logo, nav links, contact info, and social links.'
        >
          <div
            style={{
              backgroundColor: '#111',
              borderRadius: '12px',
              padding: '40px',
              border: '2px dashed #444',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#c8e600',
                  marginBottom: '8px',
                }}
              >
                xuba.
              </div>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Clever IT. Clever People.
                <br />
                Hamilton, NZ
              </p>
            </div>
            <div style={{ display: 'flex', gap: '60px' }}>
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    color: '#888',
                    marginBottom: '12px',
                  }}
                >
                  Pages
                </h4>
                <div
                  style={{ fontSize: '13px', color: '#666', lineHeight: '2' }}
                >
                  Services
                  <br />
                  About
                  <br />
                  Team
                  <br />
                  Contact
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    color: '#888',
                    marginBottom: '12px',
                  }}
                >
                  Contact
                </h4>
                <div
                  style={{ fontSize: '13px', color: '#666', lineHeight: '2' }}
                >
                  hello@xuba.co.nz
                  <br />
                  07 XXX XXXX
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    color: '#888',
                    marginBottom: '12px',
                  }}
                >
                  Social
                </h4>
                <div
                  style={{ fontSize: '13px', color: '#666', lineHeight: '2' }}
                >
                  LinkedIn
                  <br />
                  Facebook
                </div>
              </div>
            </div>
          </div>
        </WireframeSection>

        {/* Copy Export */}
        <div
          style={{
            backgroundColor: '#0d2818',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '40px',
            border: '1px solid #1a4028',
          }}
        >
          <h3 style={{ color: '#4ade80', marginTop: 0, fontSize: '16px' }}>
            📋 Copy Summary for {service.title}
          </h3>
          <div style={{ fontSize: '13px', color: '#aaa', lineHeight: '1.8' }}>
            <p>
              <strong style={{ color: '#4ade80' }}>Hero Tagline:</strong>{' '}
              {service.tagline}
            </p>
            <p>
              <strong style={{ color: '#4ade80' }}>Hero Subtitle:</strong>{' '}
              {service.heroSubtitle}
            </p>
            <p>
              <strong style={{ color: '#4ade80' }}>Intro:</strong>{' '}
              {service.introParagraph}
            </p>
            <p>
              <strong style={{ color: '#4ade80' }}>CTA Headline:</strong>{' '}
              {service.ctaHeadline}
            </p>
            <p>
              <strong style={{ color: '#4ade80' }}>CTA Subtext:</strong>{' '}
              {service.ctaSubtext}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WireframeSection({
  number,
  title,
  annotation,
  children,
}: {
  number: string
  title: string
  annotation: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            backgroundColor: '#c8e600',
            color: '#000',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '700',
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <div>
          <h2 style={{ fontSize: '18px', margin: '0 0 4px', color: '#fff' }}>
            {title}
          </h2>
          <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>
            {annotation}
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}
