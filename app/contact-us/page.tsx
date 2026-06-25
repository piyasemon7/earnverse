'use client';

import { useState } from 'react';

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect this to an API route or email service (e.g. Resend, Formspree)
    console.log(form);
    setSubmitted(true);
  };

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
          📩 Contact Us
        </h1>
        <p className="hero-desc" style={{color: '#ddd', maxWidth: '700px', lineHeight: '1.6', margin: 0}}>
          Questions, feedback, or partnership ideas — we'd love to hear from you.
        </p>
      </div>

      <div className="section-pad" style={{background: '#f8f8f8'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <div className="about-grid">
            {/* Contact info */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {[
                { icon: '📧', label: 'Email', value: 'earnverse@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+880 1700-000000' },
                { icon: '📍', label: 'Location', value: 'Dhaka, Bangladesh' },
              ].map((c, i) => (
                <div key={i} style={{
                  background: '#1a1a2e', borderRadius: '14px', padding: '20px',
                  border: '1px solid #FFD70033', display: 'flex', alignItems: 'center', gap: '14px'
                }}>
                  <span style={{fontSize: '26px'}}>{c.icon}</span>
                  <div>
                    <div style={{color: '#aaa', fontSize: '12px'}}>{c.label}</div>
                    <div style={{color: '#FFD700', fontSize: '15px', fontWeight: 'bold'}}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: '30px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)', border: '1px solid #eee'
            }}>
              {submitted ? (
                <p style={{color: '#00b894', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '40px 0'}}>
                  ✅ Thanks! Your message has been sent. We'll reply within 24 hours.
                </p>
              ) : (
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                  <input
                    name="name" placeholder="Your name" value={form.name} onChange={handleChange} required
                    style={{padding: '13px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px'}}
                  />
                  <input
                    name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required
                    style={{padding: '13px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px'}}
                  />
                  <input
                    name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required
                    style={{padding: '13px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px'}}
                  />
                  <textarea
                    name="message" placeholder="Your message" value={form.message} onChange={handleChange} required rows={5}
                    style={{padding: '13px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', resize: 'vertical'}}
                  />
                  <button type="submit" style={{
                    padding: '14px', background: '#FFD700', color: '#1a1a2e',
                    border: 'none', borderRadius: '10px', fontSize: '15px',
                    fontWeight: 'bold', cursor: 'pointer'
                  }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}