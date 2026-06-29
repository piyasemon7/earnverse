'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  image_url: string | null;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, content, category, image_url')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Search error:', error);
        setResults([]);
      } else {
        setResults(data || []);
      }

      setLoading(false);
    }

    fetchResults();
  }, [query]);

  return (
    <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#1a1a2e', fontSize: '28px', marginBottom: '8px', fontWeight: 'bold' }}>
        🔍 Search Results
      </h2>
      <p style={{ textAlign: 'center', color: '#777', marginBottom: '40px', fontSize: '15px' }}>
        {query ? `Showing results for "${query}"` : 'Type something in the search bar to get started'}
      </p>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#aaa' }}>Loading...</p>
      ) : results.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#aaa' }}>
          {query ? `No articles found matching "${query}".` : 'No search query provided.'}
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
          {results.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{
                display: 'flex', gap: '15px', background: 'white', borderRadius: '12px',
                padding: '15px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{ width: '120px', height: '90px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                />
              )}
              <div>
                <span style={{ color: '#FFD700', background: '#1a1a2e', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                  {post.category}
                </span>
                <h3 style={{ color: '#1a1a2e', fontSize: '15px', fontWeight: 'bold', margin: '8px 0 8px 0', lineHeight: '1.4' }}>
                  {post.title}
                </h3>
                <p style={{ color: '#777', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                  {post.content?.slice(0, 100)}...
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>}>
      <SearchResults />
    </Suspense>
  );
}