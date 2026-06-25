'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      else setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const whatsappNumber = '8801710998104' // আপনার WhatsApp নম্বর দিন

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Profile Card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px' }}>
            {user?.user_metadata?.avatar_url
              ? <img src={user.user_metadata.avatar_url} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              : '👤'}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>
            {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
          </h2>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>{user?.email}</p>

          {/* WhatsApp Button */}
          <a href={`https://wa.me/${whatsappNumber}?text=Hello, I'm ${user?.email} from EarnVerse!`}
            target="_blank"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: 'white', padding: '12px 24px', borderRadius: '25px', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px', marginBottom: '16px' }}>
            💬 Contact on WhatsApp
          </a>

          <br />

          <button onClick={handleLogout}
            style={{ marginTop: '12px', padding: '10px 24px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>
            🚪 Logout
          </button>
        </div>

        {/* Account Info */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>🔒 Account Info (Private)</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Email</span>
            <span style={{ fontWeight: '500' }}>{user?.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Member since</span>
            <span style={{ fontWeight: '500' }}>{new Date(user?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ color: '#888' }}>Login method</span>
            <span style={{ fontWeight: '500' }}>{user?.app_metadata?.provider === 'google' ? '🔵 Google' : '📧 Email'}</span>
          </div>
        </div>

      </div>
    </div>
  )
}