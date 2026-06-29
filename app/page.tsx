'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// ─── Types ───────────────────────────────────────────────
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  image_url: string | null;
  author: string;
  read_time: string | null;
  status: string;
  is_popular: boolean;
  is_trending: boolean;
  views: number;
  created_at: string;
}

// ─── Category colours ────────────────────────────────────
const catColor: Record<string, string> = {
  'Freelancing':         '#6c63ff',
  'YouTube Tips':        '#ff4444',
  'Blogging':            '#00b894',
  'Digital Marketing':   '#fdcb6e',
  'Affiliate Marketing': '#e17055',
  'Income Tips':         '#0984e3',
  'SEO':                 '#a29bfe',
  'Make Money Online':   '#fd79a8',
  'Fiverr':              '#1dbf73',
  'Upwork':              '#14a800',
  'Passive Income':      '#f9ca24',
  'Content Writing':     '#6ab04c',
  'Social Media':        '#e056fd',
  'Email Marketing':     '#30336b',
  'Google AdSense':      '#4285f4',
  'Dropshipping':        '#eb4d4b',
  'Amazon FBA':          '#f0932b',
  'Graphic Design':      '#be2edd',
  'Web Development':     '#0652DD',
};

const catEmoji: Record<string, string> = {
  'Freelancing':         '💼',
  'YouTube Tips':        '🎬',
  'Blogging':            '✍️',
  'Digital Marketing':   '📊',
  'Affiliate Marketing': '🤝',
  'Income Tips':         '💰',
  'SEO':                 '🔍',
  'Make Money Online':   '💵',
  'Fiverr':              '🟢',
  'Upwork':              '🔵',
  'Passive Income':      '💤',
  'Content Writing':     '📝',
  'Social Media':        '📱',
  'Email Marketing':     '📧',
  'Google AdSense':      '💲',
  'Dropshipping':        '📦',
  'Amazon FBA':          '🛒',
  'Graphic Design':      '🎨',
  'Web Development':     '💻',
};

// ─── Hero Slider data (static) ────────────────────────────
const slides = [
  { title: "Learn & Earn Online 💰", desc: "Discover the best ways to earn money online through freelancing, blogging, and digital skills.", bg: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)", btn: "Start Earning Today", href: "/category/freelancing" },
  { title: "Master Freelancing 🚀", desc: "Build a successful freelancing career on Upwork, Fiverr and other top platforms worldwide.", bg: "linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 50%,#2d1b69 100%)", btn: "Explore Freelancing", href: "/category/freelancing" },
  { title: "Grow on YouTube 🎬", desc: "Learn how to create viral content, grow subscribers and monetize your YouTube channel.", bg: "linear-gradient(135deg,#1a0a0a 0%,#2d1010 50%,#1a1a2e 100%)", btn: "YouTube Guide", href: "/category/youtube-tips" },
  { title: "Start Blogging Today ✍️", desc: "Create a profitable blog, write SEO content and earn passive income through blogging.", bg: "linear-gradient(135deg,#0a1a0a 0%,#102d10 50%,#1a1a2e 100%)", btn: "Blogging Tips", href: "/category/blogging" },
];

// ─── FAQ (static) ─────────────────────────────────────────
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "How can I start earning money online as a beginner?", a: "Start with freelancing on Fiverr or Upwork. Learn one skill like graphic design, content writing or web development. Create a profile, apply for jobs and deliver quality work. Most beginners earn their first $100 within 30 days." },
    { q: "How much money can I earn from blogging?", a: "Blogging income varies widely. Beginners can earn $100-500/month within 6 months. With consistent effort and good SEO, you can reach $2000-5000/month within 1-2 years through ads, affiliate marketing and sponsored posts." },
    { q: "Is YouTube a good way to earn money in Bangladesh?", a: "Yes! YouTube is one of the best platforms to earn money in Bangladesh. You need 1000 subscribers and 4000 watch hours to monetize. Many Bangladeshi YouTubers earn $500-3000/month from their channels." },
    { q: "What is affiliate marketing and how does it work?", a: "Affiliate marketing means promoting other companies products and earning a commission for each sale. You get a unique link, share it on your blog or social media, and earn 5-50% commission when someone buys through your link." },
    { q: "Do I need to invest money to start freelancing?", a: "No! Freelancing requires zero investment. You just need a computer, internet connection and a skill. Platforms like Fiverr and Upwork are free to join. You only pay a small commission when you earn money." },
    { q: "How long does it take to learn digital marketing?", a: "You can learn the basics of digital marketing in 2-3 months. With consistent practice and real projects, you can become job-ready in 6 months. Many free resources including Google, Meta and HubSpot offer free certifications." },
    { q: "Can I earn passive income online?", a: "Yes! Passive income sources include blogging with AdSense, affiliate marketing, selling digital products, YouTube channel and creating online courses. It takes 6-12 months of hard work to build passive income streams." },
    { q: "What skills are most in demand for freelancing in 2024?", a: "Top in-demand freelancing skills include web development, graphic design, content writing, video editing, digital marketing, SEO, social media management and AI prompt engineering. These skills can earn $20-100 per hour." },
  ];
  return (
    <div style={{ padding: '60px 40px', background: '#0d0d1a' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#FFD700', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>❓ Frequently Asked Questions</h2>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px', fontSize: '16px' }}>Everything you need to know about earning online</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#1a1a2e', borderRadius: '12px', border: `1px solid ${openIndex === i ? '#FFD700' : '#2a2a4a'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600', paddingRight: '15px' }}>{faq.q}</span>
                <span style={{ color: '#FFD700', fontSize: '22px', fontWeight: 'bold', flexShrink: 0, transition: 'transform 0.3s', transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 20px 18px', color: '#aaa', fontSize: '14px', lineHeight: '1.8', borderTop: '1px solid #2a2a4a' }}>
                  <div style={{ paddingTop: '15px' }}>{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN HOME PAGE
// ════════════════════════════════════════════════════════════
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');
  const [animating, setAnimating] = useState(false);

  // ── Data from Supabase ──
  const [popularPosts, setPopularPosts]   = useState<Post[]>([]);
  const [recentPosts, setRecentPosts]     = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [categories, setCategories]       = useState<string[]>([]);
  const [loading, setLoading]             = useState(true);

  // ── Fetch all data on mount ──
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Popular
        const { data: pop } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_popular', true)
          .eq('status', 'published')
          .order('views', { ascending: false })
          .limit(10);
        setPopularPosts(pop || []);

        // Recent
        const { data: rec } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(12);
        setRecentPosts(rec || []);

        // Trending — last 7 days, highest views, OR manually marked
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const { data: trnd } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .or(`is_trending.eq.true,created_at.gte.${sevenDaysAgo}`)
          .order('views', { ascending: false })
          .limit(6);
        setTrendingPosts(trnd || []);

        // All categories — Supabase থেকে unique category list
        const { data: allPosts } = await supabase
          .from('blog_posts')
          .select('category')
          .eq('status', 'published');

const dbCats = [...new Set(
  (allPosts || [])
    .map((p: { category: string }) => p.category)
    .filter(Boolean)
)];

// DB-তে post না থাকলেও এই categories সবসময় দেখাবে
const fixedCats = [
  'Freelancing', 'Income Tips', 'Digital Marketing',
  'Make Money Online', 'YouTube Tips', 'Blogging',
  'SEO', 'Affiliate Marketing', 'Fiverr', 'Upwork',
  'Passive Income', 'Social Media', 'Content Writing',
];

const cats = [...new Set([...dbCats, ...fixedCats])];
setCategories(cats);

        if (cats.length) {
          setActiveCategory(cats[0]);
          await fetchCategoryPosts(cats[0]);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // ── Fetch 9 posts for selected category ──
  async function fetchCategoryPosts(cat: string) {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', cat)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(9); // ৯টি পোস্ট
    setCategoryPosts(data || []);
  }

  function handleCategoryChange(cat: string) {
    if (cat === activeCategory) return;
    setAnimating(true);
    setTimeout(async () => {
      setActiveCategory(cat);
      await fetchCategoryPosts(cat);
      setAnimating(false);
    }, 300);
  }

  // ── Hero slider auto‑advance ──
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const color = catColor[activeCategory] || '#6c63ff';
  const emoji = catEmoji[activeCategory] || '📂';

  // ── Category slug for URL ──
  function getCategorySlug(cat: string) {
    return cat.toLowerCase().replace(/ /g, '-');
  }

  return (
    <main>
      {/* ── Hero Slider ── */}
      <div style={{ background: slides[current].bg, minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px', transition: 'background 1s ease' }}>
        <h1 style={{ color: '#FFD700', fontSize: '52px', fontWeight: 'bold', margin: '0 0 20px 0' }}>{slides[current].title}</h1>
        <p style={{ color: '#ddd', fontSize: '20px', maxWidth: '700px', lineHeight: '1.6', margin: '0 0 35px 0' }}>{slides[current].desc}</p>
        <a href={slides[current].href} style={{ padding: '14px 35px', background: '#FFD700', color: '#1a1a2e', border: 'none', borderRadius: '30px', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' }}>
          {slides[current].btn} →
        </a>
        <div style={{ display: 'flex', gap: '10px', marginTop: '40px' }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '30px' : '10px', height: '10px', borderRadius: '5px', background: i === current ? '#FFD700' : '#555', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      {/* ── Popular Posts ── */}
      <div style={{ padding: '50px 40px', background: '#f8f8f8' }}>
        <h2 style={{ textAlign: 'center', color: '#1a1a2e', fontSize: '32px', marginBottom: '10px', fontWeight: 'bold' }}>🔥 Popular Posts</h2>
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '40px', fontSize: '16px' }}>Most read articles on EarnVerse</p>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>Loading…</p>
        ) : popularPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>No popular posts yet. Mark posts as Popular from the Admin Panel.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', maxWidth: '1500px', margin: '0 auto' }}>
            {popularPosts.map((post) => (
              <a key={post.id} href={`/blog/${post.slug}`} style={{ display: 'flex', gap: '15px', background: 'white', borderRadius: '12px', padding: '15px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', border: '1px solid #eee', transition: 'transform 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} style={{ width: '120px', height: '90px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                )}
                <div>
                  <h3 style={{ color: '#1a1a2e', fontSize: '15px', fontWeight: 'bold', margin: '0 0 8px 0', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ color: '#777', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{post.content?.slice(0, 100)}…</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          ── Category Section (Updated) ──
      ══════════════════════════════════════════ */}
      <div style={{ padding: '60px 40px', background: '#0d0d1a' }}>
        <h2 style={{ textAlign: 'center', color: '#FFD700', fontSize: '32px', marginBottom: '8px', fontWeight: 'bold' }}>
          📂 Browse by Category
        </h2>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '35px', fontSize: '16px' }}>
          Select a category to explore related posts
        </p>

        {/* ── Category Tabs — Supabase থেকে Dynamic ── */}
        {categories.length === 0 && !loading ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>কোনো category পাওয়া যায়নি।</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              const c = catColor[cat] || '#6c63ff';
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '9px 20px',
                    background: isActive ? c : '#1a1a2e',
                    color: isActive ? 'white' : '#aaa',
                    border: `2px solid ${isActive ? c : '#333'}`,
                    borderRadius: '30px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {catEmoji[cat] || '📂'} {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Posts Grid — ৯টি ── */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>Loading…</p>
        ) : categoryPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>
            এই category-তে এখনো কোনো post নেই।
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '25px',
              maxWidth: '1500px',
              margin: '0 auto',
              opacity: animating ? 0 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            {categoryPosts.map(post => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  background: '#1a1a2e',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `1px solid ${color}33`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 10px 25px ${color}44`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      background: `${color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '50px',
                    }}
                  >
                    {emoji}
                  </div>
                )}
                <div style={{ padding: '15px' }}>
                  <span
                    style={{
                      background: color,
                      color: 'white',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}
                  >
                    {emoji} {activeCategory}
                  </span>
                  <h3
                    style={{
                      color: '#FFD700',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      margin: '10px 0 8px',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.title}
                  </h3>
                  <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                    {post.content?.slice(0, 100)}…
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ── Read More Button — Active ── */}
        {activeCategory && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a
              href={`/category/${getCategorySlug(activeCategory)}`}
              style={{
                display: 'inline-block',
                padding: '13px 40px',
                background: 'transparent',
                color: '#FFD700',
                border: '2px solid #FFD700',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#FFD700';
                (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a2e';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = '#FFD700';
              }}
            >
              Read More {activeCategory} Posts →
            </a>
          </div>
        )}
      </div>

      {/* ── Recent Posts ── */}
      <div style={{ padding: '60px 40px', background: '#f8f8f8' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
            <div>
              <h2 style={{ color: '#1a1a2e', fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>🕐 Recent Posts</h2>
              <p style={{ color: '#777', fontSize: '16px', margin: 0 }}>Latest articles and tips</p>
            </div>
            <a href="/recent" style={{ padding: '10px 25px', background: '#1a1a2e', color: '#FFD700', border: '2px solid #1a1a2e', borderRadius: '25px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}>View All →</a>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>Loading…</p>
          ) : recentPosts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>No posts published yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
              {recentPosts.map(post => {
                const c = catColor[post.category] || '#6c63ff';
                return (
                  <a key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 3px 15px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid #eee' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.08)'; }}>
                    <div style={{ position: 'relative' }}>
                      {post.image_url && <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: c, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>{post.category}</span>
                    </div>
                    <div style={{ padding: '18px' }}>
                      <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 8px 0' }}>🗓 {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <h3 style={{ color: '#1a1a2e', fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1.4' }}>{post.title}</h3>
                      <p style={{ color: '#777', fontSize: '13px', lineHeight: '1.6', margin: '0 0 15px 0' }}>{post.content?.slice(0, 110)}…</p>
                      <span style={{ color: '#6c63ff', fontSize: '13px', fontWeight: 'bold' }}>Read More →</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Trending Posts ── */}
      <div style={{ padding: '60px 40px', background: '#1a1a2e' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#FFD700', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>🔥 Trending Right Now</h2>
          <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px', fontSize: '16px' }}>Most popular posts this week</p>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>Loading…</p>
          ) : trendingPosts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>No trending posts yet. Mark posts as Trending from the Admin Panel.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
              {/* Big Featured */}
              <a href={`/blog/${trendingPosts[0].slug}`} style={{ display: 'block', textDecoration: 'none', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #FFD70033', position: 'relative', transition: 'transform 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-5px)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'}>
                {trendingPosts[0].image_url && <img src={trendingPosts[0].image_url} alt={trendingPosts[0].title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #0d0d1a 40%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ background: '#ff4444', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>🔥 TRENDING #1</span>
                    <span style={{ background: '#6c63ff33', color: '#a29bfe', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', border: '1px solid #6c63ff66' }}>{trendingPosts[0].category}</span>
                  </div>
                  <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1.4' }}>{trendingPosts[0].title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: '#FFD700', fontSize: '13px' }}>👁 {trendingPosts[0].views || 0} views</span>
                    <span style={{ color: '#aaa', fontSize: '13px' }}>🗓 {new Date(trendingPosts[0].created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    <span style={{ color: '#FFD700', fontSize: '13px', fontWeight: 'bold', marginLeft: 'auto' }}>Read More →</span>
                  </div>
                </div>
              </a>

              {/* Right list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {trendingPosts.slice(1, 6).map((post, i) => {
                  const c = catColor[post.category] || '#6c63ff';
                  return (
                    <a key={post.id} href={`/blog/${post.slug}`} style={{ display: 'flex', gap: '12px', alignItems: 'center', textDecoration: 'none', background: '#0d0d1a', borderRadius: '12px', padding: '12px', border: '1px solid #2a2a4a', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FFD700'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(5px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2a2a4a'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)'; }}>
                      <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#FFD70022', border: '2px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>{i + 2}</div>
                      {post.image_url && <img src={post.image_url} alt={post.title} style={{ width: '70px', height: '55px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ background: `${c}22`, color: c, padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block', marginBottom: '5px' }}>{post.category}</span>
                        <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0, lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.title}</h4>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                          <span style={{ color: '#FFD700', fontSize: '11px' }}>👁 {post.views || 0}</span>
                          <span style={{ color: '#666', fontSize: '11px' }}>🗓 {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Trending Topics ── */}
      <div style={{ padding: '50px 40px', background: '#1a1a2e' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#FFD700', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            🔥 Trending Topics
          </h2>
          <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '35px', fontSize: '16px' }}>
            Hot topics everyone is reading right now
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {[
              { tag: 'Freelancing',         color: '#6c63ff', href: '/category/freelancing' },
              { tag: 'Make Money Online',   color: '#fd79a8', href: '/category/make-money-online' },
              { tag: 'YouTube Tips',        color: '#ff4444', href: '/category/youtube-tips' },
              { tag: 'Blogging',            color: '#00b894', href: '/category/blogging' },
              { tag: 'Affiliate Marketing', color: '#e17055', href: '/category/affiliate-marketing' },
              { tag: 'SEO',                 color: '#a29bfe', href: '/category/seo' },
              { tag: 'Digital Marketing',   color: '#fdcb6e', href: '/category/digital-marketing' },
              { tag: 'Fiverr',              color: '#1dbf73', href: '/category/fiverr' },
              { tag: 'Upwork',              color: '#14a800', href: '/category/upwork' },
              { tag: 'Passive Income',      color: '#f9ca24', href: '/category/passive-income' },
              { tag: 'Content Writing',     color: '#6ab04c', href: '/category/content-writing' },
              { tag: 'Social Media',        color: '#e056fd', href: '/category/social-media' },
              { tag: 'Email Marketing',     color: '#74b9ff', href: '/category/email-marketing' },
              { tag: 'Google AdSense',      color: '#4285f4', href: '/category/google-adsense' },
              { tag: 'Dropshipping',        color: '#eb4d4b', href: '/category/dropshipping' },
              { tag: 'Amazon FBA',          color: '#f0932b', href: '/category/amazon-fba' },
              { tag: 'Graphic Design',      color: '#be2edd', href: '/category/graphic-design' },
              { tag: 'Web Development',     color: '#0652DD', href: '/category/web-development' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 18px', borderRadius: '25px',
                  background: `${item.color}22`,
                  border: `1px solid ${item.color}66`,
                  color: item.color, textDecoration: 'none',
                  fontSize: '14px', fontWeight: '500',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = item.color;
                  (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a2e';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `${item.color}22`;
                  (e.currentTarget as HTMLAnchorElement).style.color = item.color;
                }}
              >
                # {item.tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div style={{ padding: '70px 40px', background: 'linear-gradient(135deg, #FFD700 0%, #f9a825 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#1a1a2e', fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' }}>📧 Stay Updated!</h2>
          <p style={{ color: '#1a1a2e', fontSize: '18px', marginBottom: '35px', lineHeight: '1.6' }}>Get the latest earning tips, freelancing guides and digital skills delivered straight to your inbox every week.</p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email address…" style={{ flex: 1, padding: '15px 20px', borderRadius: '30px', border: 'none', fontSize: '15px', outline: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }} />
            <button style={{ padding: '15px 30px', background: '#1a1a2e', color: '#FFD700', border: 'none', borderRadius: '30px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe →</button>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FaqSection />

    </main>
  );
}