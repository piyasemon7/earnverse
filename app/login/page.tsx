'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/profile')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('✅ Check your email to confirm!')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/profile` }
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
          {isLogin ? '🔐 Login' : '📝 Register'}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
        />

        <button onClick={handleAuth} disabled={loading}
          style={{ width: '100%', padding: '12px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginBottom: '12px' }}>
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>

        <div style={{ textAlign: 'center', margin: '12px 0', color: '#999' }}>— OR —</div>

        <button onClick={handleGoogle}
          style={{ width: '100%', padding: '12px', background: 'white', color: '#333', border: '2px solid #ddd', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          🔵 Continue with Google
        </button>

        {message && <p style={{ textAlign: 'center', marginTop: '16px', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#6c63ff', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}