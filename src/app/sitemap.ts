import { MetadataRoute } from "next";

const BLOG_API =
  "https://api-crm.goxt.io/api/blog-widget/blg_seENlOEbs58BmiwmIvQBujpz/posts";

async function getBlogPosts(): Promise<{ slug: string; published_at: string }[]> {
  try {
    const res = await fetch(BLOG_API, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.posts ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://goxt.io",            lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: "https://goxt.io/blog",       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: "https://goxt.io/soluciones", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://goxt.io/planes",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://goxt.io/demo",       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://goxt.io/contacto",   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: "https://goxt.io/diagnostico",lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://goxt.io/skills",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://goxt.io/plataformas",lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://goxt.io/postulacion",lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://goxt.io/privacidad", lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: "https://goxt.io/terminos",   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://goxt.io/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
