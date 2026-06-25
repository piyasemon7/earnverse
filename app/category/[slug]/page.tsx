'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// ─── Category meta (রং, emoji, description) ───────────────
const categoryMeta: Record<string, { emoji: string; color: string; description: string }> = {
  freelancing:        { emoji: '💼', color: '#6c63ff', description: 'Fiverr, Upwork সহ সেরা freelancing platform এ কিভাবে কাজ পাবেন এবং ক্যারিয়ার গড়বেন।' },
  youtube:            { emoji: '🎬', color: '#ff4444', description: 'YouTube channel তৈরি থেকে monetization পর্যন্ত সব কিছু শিখুন এবং passive income করুন।' },
  blogging:           { emoji: '✍️', color: '#00b894', description: 'Blog তৈরি করুন, SEO শিখুন এবং AdSense ও Affiliate Marketing দিয়ে passive income করুন।' },
  'digital-marketing':{ emoji: '📊', color: '#fdcb6e', description: 'Social Media, Email Marketing, Google Ads সহ সব digital marketing strategy শিখুন।' },
  'digital marketing':{ emoji: '📊', color: '#fdcb6e', description: 'Social Media, Email Marketing, Google Ads সহ সব digital marketing strategy শিখুন।' },
  affiliate:          { emoji: '🤝', color: '#e17055', description: 'Affiliate marketing শিখুন এবং অন্যদের product promote করে commission income করুন।' },
  'income tips':      { emoji: '💰', color: '#0984e3', description: 'অনলাইনে আয় করার সেরা টিপস ও কৌশল শিখুন।' },
  seo:                { emoji: '🔍', color: '#a29bfe', description: 'Search Engine Optimization শিখুন এবং Google-এ rank করুন।' },
  'make money online':{ emoji: '💵', color: '#fd79a8', description: 'ঘরে বসে অনলাইনে আয় করার সেরা উপায়গুলো জানুন।' },
};

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
  views: number;
  created_at: string;
}

const POSTS_PER_PAGE = 6;

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = React.use(params);
  const slug = rawSlug.toLowerCase();

  // category name: "digital-marketing" → "Digital Marketing"
  const displayName = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // DB-এ category value হতে পারে "Digital Marketing" বা "Freelancing" ইত্যাদি
  const dbCategory = displayName;

  const meta = categoryMeta[slug] || { emoji: '📂', color: '#FFD700', description: `${displayName} সম্পর্কিত সব পোস্ট পড়ুন।` };

  const [posts, setPosts]           = useState<Post[]>([]);
  const [loading, setLoading]       = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy]         = useState<'latest' | 'oldest' | 'popular'>('latest');

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .ilike('category', dbCategory)   // case-insensitive match
        .order('created_at', { ascending: false });

      if (!error && data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [slug]);

  // ── Sort ──
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'latest')  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortBy === 'oldest')  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return (b.views || 0) - (a.views || 0); // popular
  });

  // ── Pagination ──
  const totalPages   = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex   = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // ── Other categories (all unique cats from Supabase — static list for nav) ──
  const otherCats = Object.entries(categoryMeta).filter(([key]) => key !== slug && !key.includes(' '));

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d1a' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #2a2a4a', borderTopColor: '#FFD700', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#aaa', fontSize: '15px' }}>Loading posts…</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  return (
    <main style={{ background: '#0d0d1a', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: `linear-gradient(135deg, #0d0d1a 0%, ${meta.color}22 50%, #1a1a2e 100%)`, padding: '60px 40px', borderBottom: `2px solid ${meta.color}33`, textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: '20px', fontSize: '14px' }}>
            <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#555', margin: '0 8px' }}>›</span>
            <span style={{ color: meta.color }}>Category</span>
            <span style={{ color: '#555', margin: '0 8px' }}>›</span>
            <span style={{ color: '#fff' }}>{displayName}</span>
          </div>

          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: `${meta.color}22`, border: `2px solid ${meta.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 20px' }}>
            {meta.emoji}
          </div>
          <h1 style={{ color: '#FFD700', fontSize: '42px', fontWeight: 'bold', margin: '0 0 15px 0' }}>
            {meta.emoji} {displayName}
          </h1>
          <p style={{ color: '#bbb', fontSize: '18px', lineHeight: '1.7', margin: '0 0 25px 0' }}>
            {meta.description}
          </p>
          <div style={{ display: 'inline-flex', gap: '30px', background: '#1a1a2e', borderRadius: '50px', padding: '12px 30px', border: `1px solid ${meta.color}33` }}>
            <span style={{ color: '#aaa', fontSize: '14px' }}>
              📝 <strong style={{ color: '#fff' }}>{posts.length}</strong> Articles
            </span>
            <span style={{ color: '#555' }}>|</span>
            <span style={{ color: '#aaa', fontSize: '14px' }}>
              🏷️ <strong style={{ color: meta.color }}>{displayName}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ background: '#1a1a2e', padding: '15px 40px', borderBottom: '1px solid #2a2a4a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>
          Showing <strong style={{ color: '#fff' }}>{currentPosts.length}</strong> of{' '}
          <strong style={{ color: '#fff' }}>{posts.length}</strong> articles
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#aaa', fontSize: '14px' }}>Sort by:</span>
          <select value={sortBy} onChange={e => { setSortBy(e.target.value as 'latest'|'oldest'|'popular'); setCurrentPage(1); }}
            style={{ background: '#0d0d1a', color: '#fff', border: `1px solid ${meta.color}66`, borderRadius: '8px', padding: '6px 12px', fontSize: '14px', cursor: 'pointer' }}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* ── Posts Grid ── */}
      <div style={{ padding: '50px 40px', maxWidth: '1400px', margin: '0 auto' }}>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>📭</div>
            <h2 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '12px' }}>No Posts Yet</h2>
            <p style={{ color: '#aaa', fontSize: '15px', marginBottom: '24px' }}>
              এই category-তে এখনো কোনো post publish হয়নি।
            </p>
            <Link href="/" style={{ padding: '12px 28px', background: '#FFD700', color: '#1a1a2e', borderRadius: '25px', fontWeight: 'bold', textDecoration: 'none' }}>
              ← Go Back Home
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {currentPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none', background: '#1a1a2e', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${meta.color}33`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 15px 30px ${meta.color}33`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>

                {/* Image */}
                <div style={{ position: 'relative' }}>
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '200px', background: `${meta.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>
                      {meta.emoji}
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #1a1a2e 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: meta.color, color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                    {meta.emoji} {displayName}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                    <span>🗓 {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    {post.read_time && <span>⏱ {post.read_time}</span>}
                  </div>
                  <h3 style={{ color: '#FFD700', fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.7', margin: '0 0 15px 0' }}>
                    {post.content?.slice(0, 110)}…
                  </p>
                  <span style={{ color: meta.color, fontSize: '13px', fontWeight: 'bold' }}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '50px' }}>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              style={{ padding: '10px 20px', borderRadius: '10px', background: currentPage === 1 ? '#2a2a4a' : meta.color, color: currentPage === 1 ? '#555' : '#fff', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)}
                style={{ width: '42px', height: '42px', borderRadius: '10px', background: currentPage === page ? meta.color : '#1a1a2e', color: currentPage === page ? '#fff' : '#aaa', border: `1px solid ${currentPage === page ? meta.color : '#2a2a4a'}`, cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              style={{ padding: '10px 20px', borderRadius: '10px', background: currentPage === totalPages ? '#2a2a4a' : meta.color, color: currentPage === totalPages ? '#555' : '#fff', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              Next →
            </button>
          </div>
        )}
      </div>

      {/* ── Other Categories ── */}
      <div style={{ padding: '50px 40px', background: '#1a1a2e', borderTop: '1px solid #2a2a4a' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ color: '#FFD700', fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center' }}>
            📂 অন্যান্য Categories
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {otherCats.map(([key, cat]) => {
              const name = key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              return (
                <Link key={key} href={`/category/${key}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '30px', background: `${cat.color}15`, border: `1px solid ${cat.color}44`, color: cat.color, textDecoration: 'none', fontSize: '15px', fontWeight: '600', transition: 'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = cat.color; (e.currentTarget as HTMLElement).style.color = '#1a1a2e'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${cat.color}15`; (e.currentTarget as HTMLElement).style.color = cat.color; }}>
                  {cat.emoji} {name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </main>
  );
}