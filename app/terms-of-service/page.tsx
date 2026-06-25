export default function TermsOfServicePage() {
  const sections = [
    { title: '1. Acceptance of Terms', body: 'By accessing and using EarnVerse, you agree to be bound by these Terms of Service. If you do not agree, please do not use this website.' },
    { title: '2. Content Disclaimer', body: 'All content on EarnVerse is for educational and informational purposes only. Income figures mentioned in articles are examples or estimates and are not guaranteed. Results vary based on individual effort, skill, and market conditions.' },
    { title: '3. No Financial Guarantee', body: 'EarnVerse does not guarantee any specific income or results from following our guides. Freelancing, blogging, and online earning involve effort, time, and risk.' },
    { title: '4. Affiliate Disclosure', body: 'Some links on this site are affiliate links. We may earn a commission if you make a purchase through these links, at no extra cost to you. This helps support the free content we publish.' },
    { title: '5. Intellectual Property', body: 'All articles, images, and content on EarnVerse are owned by EarnVerse unless otherwise stated. You may not republish our content without written permission.' },
    { title: '6. User Conduct', body: 'You agree not to use this site for unlawful purposes, to spam our comment sections, or to attempt to disrupt the normal operation of the website.' },
    { title: '7. Changes To These Terms', body: 'We reserve the right to update these Terms of Service at any time. Continued use of the site after changes means you accept the updated terms.' },
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
          📜 Terms of Service
        </h1>
        <p style={{color: '#aaa', fontSize: '14px', margin: 0}}>Last updated: June 23, 2026</p>
      </div>

      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <div style={{
          maxWidth: '800px', margin: '0 auto', background: 'white',
          borderRadius: '16px', padding: '40px', boxShadow: '0 5px 20px rgba(0,0,0,0.06)', border: '1px solid #eee'
        }}>
          <p style={{color: '#555', fontSize: '15px', lineHeight: '1.8', marginBottom: '30px'}}>
            Please read these Terms of Service carefully before using EarnVerse.
          </p>
          {sections.map((s, i) => (
            <div key={i} style={{marginBottom: '26px'}}>
              <h2 style={{color: '#1a1a2e', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
                {s.title}
              </h2>
              <p style={{color: '#666', fontSize: '14px', lineHeight: '1.8', margin: 0}}>
                {s.body}
              </p>
            </div>
          ))}
          <p style={{color: '#999', fontSize: '13px', marginTop: '20px'}}>
            Questions about these terms? Email us at <strong>earnverse@gmail.com</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}