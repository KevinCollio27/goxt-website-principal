import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const BLOG_API =
  "https://api-crm.goxt.io/api/blog-widget/blg_seENlOEbs58BmiwmIvQBujpz/posts";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  thumbnail_url: string;
  tags: string;
  published_at: string;
  author: { name: string };
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(BLOG_API, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.posts ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogGrid() {
  const posts = await getPosts();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Novedades GOxT
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Lo último del blog
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Artículos, guías y casos de uso para equipos que quieren operar mejor.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground py-8">
            No hay artículos disponibles por ahora.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4"
              >
                {/* Thumbnail */}
                <div className="relative h-52 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
                  {post.thumbnail_url && (
                    <Image
                      src={post.thumbnail_url}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-2">
                  {post.tags && (
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {post.tags.split(",")[0].trim()}
                    </p>
                  )}
                  <h3 className="text-lg font-medium tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {post.author?.name && <span>{post.author.name}</span>}
                    {post.author?.name && post.published_at && <span>·</span>}
                    {post.published_at && <span>{formatDate(post.published_at)}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
