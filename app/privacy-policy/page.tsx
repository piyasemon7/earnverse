export default function PrivacyPolicyPage() {
  const sections = [
    { title: '1. Information We Collect', body: 'We may collect your name, email address, and IP address when you subscribe to our newsletter, leave a comment, or contact us through the contact form. We also use cookies and analytics tools (such as Google Analytics) to understand how visitors use the site.' },
    { title: '2. How We Use Your Information', body: 'Your information is used to send newsletters you signed up for, respond to your messages, and improve our content based on what readers find useful. We do not sell your personal information to third parties.' },
    { title: '3. Cookies', body: 'EarnVerse uses cookies to remember your preferences and to serve relevant ads through partners like Google AdSense. You can disable cookies in your browser settings, though some features may not work as intended.' },
    { title: '4. Third-Party Links', body: 'Our articles may link to external websites (e.g. Fiverr, Upwork, YouTube). We are not responsible for the privacy practices of those third-party sites.' },
    { title: '5. Your Rights', body: 'You may request to see, update, or delete the personal information we hold about you at any time by emailing us at earnverse@gmail.com.' },
    { title: '6. Changes To This Policy', body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.' },
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
          🔒 Privacy Policy
        </h1>
        <p style={{color: '#aaa', fontSize: '14px', margin: 0}}>Last updated: June 23, 2026</p>
      </div>

      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <div style={{
          maxWidth: '800px', margin: '0 auto', background: 'white',
          borderRadius: '16px', padding: '40px', boxShadow: '0 5px 20px rgba(0,0,0,0.06)', border: '1px solid #eee'
        }}>
          <p style={{color: '#555', fontSize: '15px', lineHeight: '1.8', marginBottom: '30px'}}>
            EarnVerse ("we", "us", "our") respects your privacy. This policy explains what information we
            collect, how we use it, and the choices you have.
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
            Questions about this policy? Email us at <strong>earnverse@gmail.com</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}