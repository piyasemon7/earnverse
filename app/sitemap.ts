import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://earnverse-six.vercel.app'

  // স্ট্যাটিক পেজগুলো
  const staticRoutes = [
    '',
    '/contact-us',
    '/team',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Supabase থেকে সব পাবলিশড ব্লগ পোস্ট আনা
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')

const postRoutes = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at || new Date().toISOString(),
  }))

  return [...staticRoutes, ...postRoutes]
}