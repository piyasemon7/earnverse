import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// Supabase থেকে সব slug এনে static page বানাবে
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params

  // Supabase থেকে এই slug এর পোস্ট আনো
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  // পোস্ট না পেলে 404 দেখাও
  if (error || !post) {
    notFound()
  }

  return (
    <div style={{ background: '#f8f8f8', minHeight: '100vh' }}>

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#1a1a2e' }} />
        )}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, #0d0d1a 40%, transparent 100%)'
        }} />
        <div style={{ position: 'absolute', bottom: 0, padding: '40px', maxWidth: '900px' }}>
          {post.category && (
            <span style={{
              background: '#6c63ff', color: 'white',
              padding: '5px 15px', borderRadius: '20px',
              fontSize: '12px', fontWeight: 'bold',
              marginBottom: '15px', display: 'inline-block'
            }}>
              {post.category}
            </span>
          )}
          <h1 style={{
            color: 'white', fontSize: '36px',
            fontWeight: 'bold', margin: '10px 0', lineHeight: '1.3'
          }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', color: '#bbb', fontSize: '14px' }}>
            <span>✍️ EarnVerse Team</span>
            <span>🗓 {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric'
            })}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        maxWidth: '1500px', margin: '0 auto', padding: '40px',
        display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px'
      }}>

        {/* Main Content */}
        <div>
          <div style={{
            background: 'white', borderRadius: '16px',
            padding: '40px', boxShadow: '0 3px 15px rgba(0,0,0,0.08)'
          }}>
           <div className="blog-content">
           <ReactMarkdown>{post.content}</ReactMarkdown>
           </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Newsletter Box */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e, #0d0d1a)',
            borderRadius: '16px', padding: '25px',
            border: '1px solid #FFD70033', textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
              📧 Get Weekly Tips
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '15px', lineHeight: '1.6' }}>
              Subscribe and get the latest earning tips every week!
            </p>
            <input
              type="email"
              placeholder="Your email..."
              style={{
                width: '100%', padding: '10px', borderRadius: '20px',
                border: '1px solid #333', background: '#0d0d1a',
                color: 'white', fontSize: '13px', outline: 'none',
                marginBottom: '10px', boxSizing: 'border-box'
              }}
            />
            <button style={{
              width: '100%', padding: '10px', background: '#FFD700',
              color: '#1a1a2e', border: 'none', borderRadius: '20px',
              fontWeight: 'bold', cursor: 'pointer', fontSize: '14px'
            }}>
              Subscribe Now
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}