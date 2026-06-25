export default function AboutUsPage() {
  return (
    <main>
      {/* Hero */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        minHeight: '320px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1 className="hero-title" style={{color: '#FFD700', fontWeight: 'bold', margin: '0 0 16px 0'}}>
          👋 About EarnVerse
        </h1>
        <p className="hero-desc" style={{color: '#ddd', maxWidth: '700px', lineHeight: '1.6', margin: 0}}>
          Helping people in Bangladesh and beyond build real income online — one practical guide at a time.
        </p>
      </div>

      {/* Mission */}
      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <div className="about-grid">
            <div>
              <h2 style={{color: '#1a1a2e', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px'}}>
                Our Mission
              </h2>
              <p style={{color: '#555', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px'}}>
                EarnVerse started in 2020 with one simple goal: make online earning easy to understand for
                beginners in Bangladesh. No hype, no fake promises — just practical, step-by-step guides on
                freelancing, blogging, YouTube, and digital marketing.
              </p>
              <p style={{color: '#555', fontSize: '15px', lineHeight: '1.8'}}>
                Today, over 10,000 readers visit EarnVerse every month to learn skills that actually pay.
                We test every method ourselves before writing about it.
              </p>
            </div>
            <div style={{
              background: '#1a1a2e', borderRadius: '20px', padding: '35px',
              border: '2px solid #FFD70033', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                {[
                  { num: '50+', label: 'Articles Published' },
                  { num: '10K+', label: 'Monthly Readers' },
                  { num: '4+', label: 'Years Online' },
                ].map((stat, i) => (
                  <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < 2 ? '1px solid #2a2a4a' : 'none', paddingBottom: i < 2 ? '16px' : 0}}>
                    <span style={{color: '#aaa', fontSize: '14px'}}>{stat.label}</span>
                    <span style={{color: '#FFD700', fontSize: '24px', fontWeight: 'bold'}}>{stat.num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-pad" style={{background: '#0d0d1a'}}>
        <div style={{maxWidth: '1300px', margin: '0 auto'}}>
          <h2 style={{textAlign: 'center', color: '#FFD700', fontSize: '30px', fontWeight: 'bold', marginBottom: '35px'}}>
            What We Stand For
          </h2>
          <div className="grid-3col">
            {[
              { icon: '✅', title: 'Practical Over Hype', desc: 'Every guide is based on real methods that work, not exaggerated income claims.' },
              { icon: '🇧🇩', title: 'Built for Bangladesh', desc: 'Content written with local context, payment methods, and platforms in mind.' },
              { icon: '🔄', title: 'Always Updated', desc: 'Platforms change fast — we revisit and update guides regularly.' },
            ].map((v, i) => (
              <div key={i} style={{
                background: '#1a1a2e', borderRadius: '14px', padding: '28px',
                border: '1px solid #2a2a4a', textAlign: 'center'
              }}>
                <div style={{fontSize: '36px', marginBottom: '12px'}}>{v.icon}</div>
                <h3 style={{color: '#FFD700', fontSize: '17px', fontWeight: 'bold', marginBottom: '10px'}}>{v.title}</h3>
                <p style={{color: '#aaa', fontSize: '14px', lineHeight: '1.7', margin: 0}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}