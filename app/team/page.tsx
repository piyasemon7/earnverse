export default function TeamPage() {
  const team = [
    { name: "আপনার নাম", role: "Founder & Author", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", bio: "Digital entrepreneur and online earning expert, writing for EarnVerse since 2020." },
    { name: "Team Member 2", role: "Content Editor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", bio: "Reviews and edits every guide for accuracy before publishing." },
    { name: "Team Member 3", role: "SEO Specialist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop", bio: "Makes sure every article reaches the right audience on Google." },
  ];

  return (
    <main>
      {/* Hero */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        minHeight: '280px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1 className="hero-title" style={{color: '#FFD700', fontWeight: 'bold', margin: '0 0 16px 0'}}>
          👥 Meet The Team
        </h1>
        <p className="hero-desc" style={{color: '#ddd', maxWidth: '700px', lineHeight: '1.6', margin: 0}}>
          The people behind EarnVerse's guides and content.
        </p>
      </div>

      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <div className="grid-3col" style={{maxWidth: '1300px', margin: '0 auto'}}>
          {team.map((member, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '16px', padding: '30px',
              textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', border: '1px solid #eee'
            }}>
              <img src={member.img} alt={member.name} style={{
                width: '110px', height: '110px', borderRadius: '50%',
                objectFit: 'cover', border: '4px solid #FFD700', marginBottom: '16px'
              }} />
              <h3 style={{color: '#1a1a2e', fontSize: '17px', fontWeight: 'bold', margin: '0 0 4px 0'}}>
                {member.name}
              </h3>
              <p style={{color: '#6c63ff', fontSize: '13px', fontWeight: '600', margin: '0 0 12px 0'}}>
                {member.role}
              </p>
              <p style={{color: '#777', fontSize: '13px', lineHeight: '1.7', margin: 0}}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}