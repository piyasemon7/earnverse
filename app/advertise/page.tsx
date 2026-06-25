export default function AdvertisePage() {
  const packages = [
    { name: 'Banner Ad', price: '$50/mo', features: ['728x90 homepage banner', 'Above the fold placement', 'Monthly performance report'], color: '#6c63ff' },
    { name: 'Sponsored Post', price: '$80/post', features: ['Dedicated article about your brand', 'Shared on our social channels', 'Permanent backlink'], color: '#fdcb6e' },
    { name: 'Newsletter Feature', price: '$60/issue', features: ['Featured in our weekly newsletter', 'Sent to 10,000+ subscribers', 'Custom CTA button'], color: '#00b894' },
  ];

  return (
    <main>
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        minHeight: '300px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1 className="hero-title" style={{color: '#FFD700', fontWeight: 'bold', margin: '0 0 16px 0'}}>
          📢 Advertise With Us
        </h1>
        <p className="hero-desc" style={{color: '#ddd', maxWidth: '700px', lineHeight: '1.6', margin: 0}}>
          Reach 10,000+ monthly readers actively looking to earn money online, freelance, and grow digital skills.
        </p>
      </div>

      {/* Stats */}
      <div className="section-pad" style={{background: '#0d0d1a'}}>
        <div className="grid-3col" style={{maxWidth: '1100px', margin: '0 auto'}}>
          {[
            { num: '10K+', label: 'Monthly Visitors' },
            { num: '50+', label: 'Published Articles' },
            { num: 'BD + Global', label: 'Audience Reach' },
          ].map((s, i) => (
            <div key={i} style={{textAlign: 'center', padding: '20px'}}>
              <div style={{color: '#FFD700', fontSize: '30px', fontWeight: 'bold'}}>{s.num}</div>
              <div style={{color: '#aaa', fontSize: '14px', marginTop: '6px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <h2 style={{textAlign: 'center', color: '#1a1a2e', fontSize: '30px', fontWeight: 'bold', marginBottom: '35px'}}>
          Advertising Packages
        </h2>
        <div className="grid-3col" style={{maxWidth: '1300px', margin: '0 auto'}}>
          {packages.map((pkg, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '16px', padding: '30px',
              border: `2px solid ${pkg.color}33`, boxShadow: '0 5px 20px rgba(0,0,0,0.06)'
            }}>
              <h3 style={{color: pkg.color, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px'}}>{pkg.name}</h3>
              <div style={{color: '#1a1a2e', fontSize: '26px', fontWeight: 'bold', marginBottom: '18px'}}>{pkg.price}</div>
              <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
                {pkg.features.map((f, j) => (
                  <li key={j} style={{color: '#666', fontSize: '14px', marginBottom: '10px', paddingLeft: '20px', position: 'relative'}}>
                    <span style={{position: 'absolute', left: 0, color: pkg.color}}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <a href="/contact-us" style={{
            display: 'inline-block', padding: '15px 40px',
            background: '#FFD700', color: '#1a1a2e',
            borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none'
          }}>
            Get In Touch →
          </a>
        </div>
      </div>
    </main>
  );
}