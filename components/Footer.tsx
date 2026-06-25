'use client';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer>
      {/* Main Footer */}
      <div style={{background: '#0d0d1a', padding: '60px 40px 40px', borderTop: '2px solid #FFD700'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px'}}>

          {/* Column 1 - Logo & About */}
          <div>
            <h2 style={{color: '#FFD700', fontSize: '26px', fontWeight: 'bold', margin: '0 0 15px 0'}}>
              💰 EarnVerse
            </h2>
            <p style={{color: '#aaa', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px'}}>
              EarnVerse is your ultimate guide to earning money online. We provide practical tips on freelancing, blogging, YouTube and digital marketing.
            </p>
            <div style={{display: 'flex', gap: '12px'}}>
              {[
                { icon: <FaFacebook size={16} />, color: '#1877f2', href: '#' },
                { icon: <FaYoutube size={16} />, color: '#ff0000', href: '#' },
                { icon: <FaInstagram size={16} />, color: '#e4405f', href: '#' },
                { icon: <FaTwitter size={16} />, color: '#1da1f2', href: '#' },
              ].map((social, i) => (
                <a key={i} href={social.href} style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: `${social.color}22`, border: `1px solid ${social.color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: social.color, textDecoration: 'none', transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = social.color;
                  (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `${social.color}22`;
                  (e.currentTarget as HTMLAnchorElement).style.color = social.color;
                }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 style={{color: '#FFD700', fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0', paddingBottom: '10px', borderBottom: '1px solid #2a2a4a'}}>
              Quick Links
            </h3>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Contact Us', href: '/contact-us' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
                { label: 'Advertise', href: '/advertise' },
                { label: 'Sitemap', href: '/sitemap' },
              ].map((link, i) => (
                <li key={i} style={{marginBottom: '10px'}}>
                  <a href={link.href} style={{
                    color: '#aaa', textDecoration: 'none', fontSize: '14px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FFD700'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#aaa'}>
                    ▸ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h3 style={{color: '#FFD700', fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0', paddingBottom: '10px', borderBottom: '1px solid #2a2a4a'}}>
              Categories
            </h3>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {[
                { label: 'Freelancing', count: '45', href: '/category/freelancing' },
                { label: 'YouTube Tips', count: '38', href: '/category/youtube' },
                { label: 'Blogging', count: '52', href: '/category/blogging' },
                { label: 'Affiliate Marketing', count: '29', href: '/category/affiliate' },
                { label: 'Digital Marketing', count: '41', href: '/category/digital-marketing' },
                { label: 'Passive Income', count: '33', href: '/category/passive-income' },
                { label: 'SEO Tips', count: '27', href: '/category/seo' },
              ].map((cat, i) => (
                <li key={i} style={{marginBottom: '10px'}}>
                  <a href={cat.href} style={{
                    color: '#aaa', textDecoration: 'none', fontSize: '14px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FFD700'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#aaa'}>
                    <span>▸ {cat.label}</span>
                    <span style={{background: '#FFD70022', color: '#FFD700', padding: '2px 8px', borderRadius: '10px', fontSize: '11px'}}>
                      {cat.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 style={{color: '#FFD700', fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0', paddingBottom: '10px', borderBottom: '1px solid #2a2a4a'}}>
              Contact Us
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px'}}>
              {[
                { icon: <MdEmail size={18} />, text: 'earnverse@gmail.com' },
                { icon: <MdPhone size={18} />, text: '+880 1700-000000' },
                { icon: <MdLocationOn size={18} />, text: 'Dhaka, Bangladesh' },
              ].map((item, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#aaa', fontSize: '14px'}}>
                  <span style={{color: '#FFD700'}}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            {/* Mini Newsletter */}
            <div>
              <p style={{color: '#aaa', fontSize: '13px', marginBottom: '10px'}}>
                Subscribe for weekly updates:
              </p>
              <div style={{display: 'flex', gap: '8px'}}>
                <input type="email" placeholder="Your email..." style={{
                  flex: 1, padding: '9px 12px', borderRadius: '20px',
                  border: '1px solid #333', background: '#1a1a2e',
                  color: 'white', fontSize: '13px', outline: 'none'
                }} />
                <button style={{
                  padding: '9px 15px', background: '#FFD700', color: '#1a1a2e',
                  border: 'none', borderRadius: '20px', fontWeight: 'bold',
                  cursor: 'pointer', fontSize: '13px'
                }}>
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        background: '#080810', padding: '15px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #1a1a2e'
      }}>
        <p style={{color: '#666', fontSize: '13px', margin: 0}}>
          © 2024 <span style={{color: '#FFD700'}}>EarnVerse</span>. All rights reserved. Made with ❤️ in Bangladesh
        </p>
        <button onClick={scrollToTop} style={{
          background: '#FFD700', color: '#1a1a2e', border: 'none',
          width: '38px', height: '38px', borderRadius: '50%',
          fontSize: '18px', cursor: 'pointer', fontWeight: 'bold',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          ↑
        </button>
      </div>
    </footer>
  );
}