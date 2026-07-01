import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ShareButtons from "@/components/sections/blog-share-buttons";
import { defaultOgImages, defaultOgImage } from "@/lib/metadata";

const BLOG_API =
  "https://api-crm.goxt.io/api/blog-widget/blg_seENlOEbs58BmiwmIvQBujpz/posts";

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  thumbnail_url: string;
  tags: string;
  published_at: string;
  author: { name: string };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    // Sin cache: thumbnail_url es una URL firmada de S3 que expira en 1h.
    // Cachear la página dejaría URLs vencidas servidas hasta la próxima revalidación.
    const res = await fetch(`${BLOG_API}/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post no encontrado" };

  const description = post.content
    ? post.content.replace(/<[^>]*>/g, "").slice(0, 160).trim()
    : (post.tags ?? "");

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `https://goxt.io/blog/${slug}`,
      type: "article",
      publishedTime: post.published_at,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.thumbnail_url
        ? [{ url: post.thumbnail_url, alt: post.title }]
        : defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.thumbnail_url ? [post.thumbnail_url] : [defaultOgImage.url],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const tags = post.tags
    ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const description = post.content
    ? post.content.replace(/<[^>]*>/g, "").slice(0, 160).trim()
    : (post.tags ?? "");

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.thumbnail_url || undefined,
    datePublished: post.published_at,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "GOxT",
    },
    publisher: {
      "@type": "Organization",
      name: "GOxT",
      logo: {
        "@type": "ImageObject",
        url: "https://goxt.io/assets/logo_goxt_blanco.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://goxt.io/blog/${slug}`,
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Navbar />
      <main>

        {/* Header — misma estructura que BlogHeader */}
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto sm:px-16 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Columna izquierda */}
              <div className="flex flex-col gap-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  <ArrowLeft size={14} />
                  Volver al blog
                </Link>

                <div className="flex flex-col gap-4">
                  {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {tags.map((tag) => (
                        <Badge key={tag} className="text-sm h-auto py-1 px-3 border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-2 text-base text-muted-foreground">
                    {post.author?.name && <span>{post.author.name}</span>}
                    {post.author?.name && post.published_at && <span>·</span>}
                    {post.published_at && <span>{formatDate(post.published_at)}</span>}
                  </div>

                  <ShareButtons title={post.title} />
                </div>
              </div>

              {/* Columna derecha: thumbnail */}
              {post.thumbnail_url && (
                <div className="relative h-80 md:h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
                  <Image
                    src={post.thumbnail_url}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Contenido del post */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto sm:px-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
