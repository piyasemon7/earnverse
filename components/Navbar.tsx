'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const megaMenuData = {
  "Earning Tips": [
    { img: "💰", title: "Freelancing Guide 2024", desc: "Complete guide to start freelancing and earn online from home." },
    { img: "🎯", title: "Upwork Profile Tips", desc: "How to create a winning Upwork profile that gets clients." },
    { img: "💼", title: "Fiverr Success Secrets", desc: "Top secrets to become a top-rated seller on Fiverr." },
    { img: "🚀", title: "Remote Jobs Guide", desc: "Find high-paying remote jobs without any experience." },
  ],
  "Digital Skills": [
    { img: "📱", title: "Social Media Marketing", desc: "Learn SMM and earn money managing brands on social media." },
    { img: "🎨", title: "Graphic Design Basics", desc: "Start graphic design career with free tools like Canva." },
    { img: "💻", title: "Web Development", desc: "Learn web development and build websites for clients." },
    { img: "📊", title: "SEO Mastery", desc: "Master SEO to rank websites and get free organic traffic." },
  ],
};

const dropdownData = {
  "YouTube": [
    { img: "▶️", title: "YouTube Channel Setup", desc: "Step by step guide to create and setup your YouTube channel." },
    { img: "🎬", title: "Video Editing Tips", desc: "Best free video editing tools for beginners in 2024." },
    { img: "💵", title: "YouTube Monetization", desc: "How to monetize your YouTube channel and earn money." },
  ],
  "Blogging": [
    { img: "✍️", title: "Start a Blog in 2024", desc: "Complete beginner guide to start a profitable blog today." },
    { img: "📝", title: "Content Writing Tips", desc: "Write SEO-friendly content that ranks on Google." },
    { img: "💸", title: "Blog Monetization", desc: "Top ways to monetize your blog and earn passive income." },
  ],
};

const navItems = ["Home", "Earning Tips", "Digital Skills", "YouTube", "Blogging", "About", "Contact"];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // User state চেক করুন
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    // Auth change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <nav style={{
      background: '#12122a',
      padding: '0 30px',
      borderBottom: '1px solid #FFD700',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Nav Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {navItems.map((item) => (
            <div key={item}
              onMouseEnter={() => setActiveMenu(item)}
              onMouseLeave={() => setActiveMenu(null)}
              style={{ position: 'relative' }}>

              <a href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  color: activeMenu === item ? '#FFD700' : '#ddd',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '14px',
                  borderBottom: activeMenu === item ? '2px solid #FFD700' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}>
                {item}
                {(megaMenuData[item as keyof typeof megaMenuData] || dropdownData[item as keyof typeof dropdownData]) && ' ▾'}
              </a>

              {/* Mega Menu */}
              {activeMenu === item && megaMenuData[item as keyof typeof megaMenuData] && (
                <div style={{
                  position: 'fixed',
                  left: '0', right: '0',
                  background: '#1a1a2e',
                  border: '1px solid #FFD700',
                  borderTop: 'none',
                  padding: '25px 40px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                  {megaMenuData[item as keyof typeof megaMenuData].map((post, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '12px', alignItems: 'flex-start',
                      padding: '12px', borderRadius: '8px', cursor: 'pointer',
                      background: '#0d0d1a', border: '1px solid #2a2a4a'
                    }}>
                      <span style={{ fontSize: '28px' }}>{post.img}</span>
                      <div>
                        <div style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>
                          {post.title}
                        </div>
                        <div style={{ color: '#999', fontSize: '12px', lineHeight: '1.5' }}>
                          {post.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown Menu */}
              {activeMenu === item && dropdownData[item as keyof typeof dropdownData] && (
                <div style={{
                  position: 'absolute',
                  top: '100%', left: '0',
                  width: '320px',
                  background: '#1a1a2e',
                  border: '1px solid #FFD700',
                  borderRadius: '0 0 8px 8px',
                  padding: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                  {dropdownData[item as keyof typeof dropdownData].map((post, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '12px', alignItems: 'flex-start',
                      padding: '10px', borderRadius: '6px', cursor: 'pointer',
                      marginBottom: '8px', background: '#0d0d1a'
                    }}>
                      <span style={{ fontSize: '24px' }}>{post.img}</span>
                      <div>
                        <div style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                          {post.title}
                        </div>
                        <div style={{ color: '#999', fontSize: '12px', lineHeight: '1.5' }}>
                          {post.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Account Section */}
        <div style={{ position: 'relative' }}>
          {user ? (
            // Logged in - Avatar দেখাবে
            <div>
              <div onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFD700' }} />
                ) : (
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6c63ff', border: '2px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
                <span style={{ color: '#FFD700', fontSize: '13px' }}>▾</span>
              </div>

              {/* User Dropdown */}
              {showUserMenu && (
                <div style={{
                  position: 'absolute', right: '0', top: '50px',
                  background: '#1a1a2e', border: '1px solid #FFD700',
                  borderRadius: '12px', padding: '12px', width: '200px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 200
                }}>
                  <p style={{ color: '#aaa', fontSize: '12px', padding: '8px 12px', margin: 0 }}>
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </p>
                  <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '8px 0' }} />
                  <a href="/profile" style={{ display: 'block', padding: '8px 12px', color: '#ddd', textDecoration: 'none', borderRadius: '6px', fontSize: '14px' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0d0d1a')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    👤 My Profile
                  </a>
                  <button onClick={handleLogout}
                    style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', color: '#ff4444', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', fontSize: '14px' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0d0d1a')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Not logged in - Login বাটন দেখাবে
            <a href="/login" style={{
              padding: '8px 20px',
              background: '#FFD700',
              color: '#12122a',
              borderRadius: '20px',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Login
            </a>
          )}
        </div>

      </div>
    </nav>
  );
}