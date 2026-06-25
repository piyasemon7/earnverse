import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

export default function TopBar() {
  return (
    <div style={{
      background: '#0d0d1a',
      padding: '8px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      borderBottom: '1px solid #FFD700'
    }}>
      {/* বাম পাশ */}
      <div style={{display: 'flex', gap: '20px'}}>
        <a href="/about-us" style={{color: '#ccc', textDecoration: 'none'}}>About Us</a>
        <a href="/contact-us" style={{color: '#ccc', textDecoration: 'none'}}>Contact Us</a>
        <a href="/team" style={{color: '#ccc', textDecoration: 'none'}}>Team</a>
      </div>

      {/* মাঝখানে - Social Icons */}
      <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
        <a href="#" style={{color: '#FFD700'}}><FaFacebook size={16} /></a>
        <a href="#" style={{color: '#FFD700'}}><FaYoutube size={16} /></a>
        <a href="#" style={{color: '#FFD700'}}><FaInstagram size={16} /></a>
        <a href="#" style={{color: '#FFD700'}}><FaTwitter size={16} /></a>
      </div>

      {/* ডান পাশ */}
      <div style={{display: 'flex', gap: '20px', alignItems: 'center', color: '#ccc'}}>
        <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
          <MdEmail color="#FFD700" /> earnverse@gmail.com
        </span>
        <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
          <MdPhone color="#FFD700" /> +880 1700-000000
        </span>
      </div>
    </div>
  );
}