export default function SitemapPage() {
  const groups = [
    {
      title: 'Main Pages',
      color: '#6c63ff',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Team', href: '/team' },
      ],
    },
    {
      title: 'Categories',
      color: '#00b894',
      links: [
        { label: 'Freelancing', href: '/freelancing' },
        { label: 'YouTube', href: '/youtube' },
        { label: 'Blogging', href: '/blogging' },
        { label: 'Digital Marketing', href: '/digital-marketing' },
        { label: 'Affiliate Marketing', href: '/affiliate' },
      ],
    },
    {
      title: 'Legal',
      color: '#e17055',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Advertise', href: '/advertise' },
      ],
    },
  ];

  return (
    <main>
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        minHeight: '240px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1 className="hero-title" style={{color: '#FFD700', fontWeight: 'bold', margin: '0 0 12px 0'}}>
          🗺️ Sitemap
        </h1>
        <p style={{color: '#aaa', fontSize: '14px', margin: 0}}>All pages on EarnVerse, in one place</p>
      </div>

      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <div className="grid-3col" style={{maxWidth: '1100px', margin: '0 auto'}}>
          {groups.map((g, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '16px', padding: '28px',
              border: `2px solid ${g.color}33`, boxShadow: '0 5px 20px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{color: g.color, fontSize: '17px', fontWeight: 'bold', marginBottom: '16px'}}>
                {g.title}
              </h2>
              <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {g.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href} style={{color: '#555', fontSize: '14px', textDecoration: 'none'}}>
                      → {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}