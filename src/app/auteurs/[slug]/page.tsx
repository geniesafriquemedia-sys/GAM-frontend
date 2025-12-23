import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, Mail, Globe, Twitter, Linkedin, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/ArticleCard";
import { api } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const author = await api.authors.getBySlugServer(slug);
    return {
      title: `${author.name} - Auteur | GAM`,
      description: author.bio || `Découvrez les articles de ${author.name} sur GAM.`,
    };
  } catch {
    return {
      title: "Auteur non trouvé | GAM",
    };
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;

  let author;
  let articles;

  try {
    // Fetch author and their articles in parallel
    [author, articles] = await Promise.all([
      api.authors.getBySlugServer(slug),
      api.articles.getAllServer({ author_slug: slug, page_size: 12 }),
    ]);
  } catch {
    notFound();
  }

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-background pt-12 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Author Photo */}
            <div className="relative">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden bg-muted border-4 border-background shadow-2xl">
                {author.photo ? (
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <User className="h-16 w-16 text-primary/50" />
                  </div>
                )}
              </div>
              {author.is_active && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <Badge className="bg-green-500 text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Actif
                  </Badge>
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Rédacteur</p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">{author.name}</h1>
              </div>

              {author.bio && (
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {author.bio}
                </p>
              )}

              {/* Stats & Social */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{author.articles_count}</span>
                  <span className="text-sm">article{author.articles_count > 1 ? 's' : ''}</span>
                </div>

                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-sm">Contact</span>
                  </a>
                )}

                {author.twitter && (
                  <a
                    href={author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}

                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}

                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="text-sm">Site web</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Articles de {author.name}</h2>
            <p className="text-muted-foreground mt-2">
              {articles.count} article{articles.count > 1 ? 's' : ''} publié{articles.count > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {articles.results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-3xl">
            <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">Aucun article publié</p>
            <p className="text-muted-foreground mt-2">Cet auteur n'a pas encore publié d'articles.</p>
          </div>
        )}
      </section>
    </div>
  );
}
