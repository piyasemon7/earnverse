'use client';
import { useState } from 'react';
import { FiMenu, FiSearch, FiUser, FiMapPin, FiShield, FiMoon, FiSun, FiGlobe } from 'react-icons/fi';

export default function MainHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      {sidebarOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '280px', height: '100%',
          background: '#1a1a2e', zIndex: 1000, padding: '20px',
          boxShadow: '4px 0 15px rgba(0,0,0,0.5)'
        }}>
          <button onClick={() => setSidebarOpen(false)}
            style={{color: '#FFD700', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', marginBottom: '20px'}}>
            ✕ Close
          </button>
          <h3 style={{color: '#FFD700', marginBottom: '15px'}}>Latest Posts</h3>
          {['Freelancing Tips', 'Earn from YouTube', 'Digital Marketing', 'Affiliate Marketing', 'Online Courses', 'Blogging Guide'].map((post, i) => (
            <div key={i} style={{padding: '10px 0', borderBottom: '1px solid #333', color: '#ccc', cursor: 'pointer'}}>
              📝 {post}
            </div>
          ))}
        </div>
      )}

      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999}} />
      )}

      {/* Main Header */}
      <div style={{
        background: '#1a1a2e', padding: '12px 30px',
        display: 'flex', alignItems: 'center', gap: '15px',
        borderBottom: '2px solid #FFD700'
      }}>
        {/* Menu Button */}
        <button onClick={() => setSidebarOpen(true)}
          style={{background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer'}}>
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <h1 style={{color: '#FFD700', margin: '0', fontSize: '24px', whiteSpace: 'nowrap'}}>
          💰 EarnVerse
        </h1>

         {/* Category Dropdown */}
         <select
           style={{
          background: '#0d0d1a', color: '#FFD700', border: '1px solid #FFD700',
          padding: '6px 12px', borderRadius: '5px', cursor: 'pointer'
          }}
          onChange={(e) => {
          if (e.target.value) window.location.href = e.target.value;
           }}
          defaultValue=""
          >
         <option value="">All Categories</option>
         <option value="/category/freelancing">Freelancing</option>
         <option value="/category/youtube">YouTube</option>
         <option value="/category/blogging">Blogging</option>
         <option value="/category/digital-marketing">Digital Marketing</option>
         <option value="/category/affiliate">Affiliate</option>
         </select>

        {/* Search Bar */}
        <div style={{flex: 1, display: 'flex', alignItems: 'center',
          background: '#0d0d1a', border: '1px solid #FFD700', borderRadius: '25px', padding: '6px 15px'}}>
          <FiSearch color="#FFD700" style={{marginRight: '8px'}} />
          <input placeholder="Search articles..." style={{
            background: 'none', border: 'none', color: 'white', outline: 'none', width: '100%'
          }} />
        </div>

        {/* Right Icons */}
        <div style={{display: 'flex', gap: '18px', alignItems: 'center'}}>
          <FiGlobe size={20} color="#FFD700" style={{cursor: 'pointer'}} />  
          <FiMapPin size={20} color="#FFD700" style={{cursor: 'pointer'}} />
          <FiShield size={20} color="#FFD700" style={{cursor: 'pointer'}} />
          <FiUser size={20} color="#FFD700" style={{cursor: 'pointer'}} />
        </div>
      </div>
    </>
  );
}