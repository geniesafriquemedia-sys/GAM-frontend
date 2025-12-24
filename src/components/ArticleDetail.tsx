"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Share2, Bookmark, MessageCircle, ChevronRight, ImageIcon } from "lucide-react";
import { SocialShare } from "@/components/SocialShare";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleBody } from "@/components/ArticleBody";
import { useArticle } from "@/hooks";
import { getMediaUrl } from "@/lib/api/config";
import type { ArticleWithRelated, ArticleSummary } from "@/types";
import { formatReadingTime } from "@/types";

interface ArticleDetailProps {
    initialArticle: ArticleWithRelated;
    slug: string;
}

// Helper pour obtenir l'URL d'image d'un article
function getImageUrl(article: any): string | null {
    const rawUrl = article.image_url || null;
    return rawUrl ? getMediaUrl(rawUrl) : null;
}

function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function ArticleDetail({ initialArticle, slug }: ArticleDetailProps) {
    const { data: article } = useArticle({
        slug,
        initialData: initialArticle,
        refetchOnMount: false
    });

    if (!article) return null;

    const {
        title,
        excerpt,
        category,
        author,
        reading_time,
        published_at,
        body_blocks,
        content,
        related_articles
    } = article;

    const imageUrl = getImageUrl(article);
    const formattedDate = formatDate(published_at);
    const readTimeText = formatReadingTime(reading_time);

    return (
        <div className="flex flex-col gap-12 pb-24">
            {/* Article Hero */}
            <section className="relative w-full pt-12 md:pt-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                            <ChevronRight className="h-3 w-3" />
                            <Link href="/actualites" className="hover:text-primary transition-colors">Actualités</Link>
                            <ChevronRight className="h-3 w-3" />
                            {category && (
                                <Link href={`/categories/${category.slug}`} className="text-primary hover:text-primary/80 transition-colors">
                                    {category.name}
                                </Link>
                            )}
                        </nav>

                        <div className="space-y-10 mb-16">
                            {category && (
                                <Badge
                                    className="border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
                                    style={{
                                        backgroundColor: category.color || 'var(--primary)',
                                        color: '#fff',
                                        boxShadow: category.color ? `0 10px 25px ${category.color}40` : undefined
                                    }}
                                >
                                    {category.name}
                                </Badge>
                            )}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85] text-gradient">
                                {title}
                            </h1>
                            <p className="text-xl md:text-3xl font-medium text-foreground/80 leading-tight max-w-4xl italic">
                                "{excerpt}"
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-8 py-10 border-y border-primary/10 mb-16">
                            {author && (
                                <Link href={`/auteurs/${author.slug}`} className="flex items-center gap-6 group">
                                    <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center overflow-hidden text-white text-3xl font-black shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
                                        {author.photo ? (
                                            <Image src={author.photo} alt={author.name} width={80} height={80} className="object-cover w-full h-full" />
                                        ) : (
                                            author.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Auteur</p>
                                        <p className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{author.name}</p>
                                    </div>
                                </Link>
                            )}
                            <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-secondary/50 p-6 rounded-[2rem]">
                                <div className="flex flex-col gap-1">
                                    <span className="text-primary/60">Date de publication</span>
                                    <span className="text-foreground text-sm">{formattedDate}</span>
                                </div>
                                <div className="w-[1px] h-8 bg-primary/10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-primary/60">Temps de lecture</span>
                                    <span className="text-foreground text-sm">{readTimeText}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main image */}
            {imageUrl && (
                <section className="container mx-auto px-4">
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[4rem] max-w-7xl mx-auto shadow-2xl ring-1 ring-primary/5">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                    </div>
                </section>
            )}

            {/* Article Body */}
            <section className="container mx-auto px-4 pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Side Actions */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-6">
                            <Button size="icon" variant="outline" className="h-16 w-16 rounded-3xl border-primary/10 hover:bg-primary/5 group transition-all hover:-translate-y-1">
                                <Bookmark className="h-6 w-6 group-hover:fill-primary transition-all" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-16 w-16 rounded-3xl border-primary/10 hover:bg-primary/5 transition-all hover:-translate-y-1">
                                <MessageCircle className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Afficher les blocs StreamField si disponibles, sinon le contenu legacy */}
                        {body_blocks && body_blocks.length > 0 ? (
                            <ArticleBody blocks={body_blocks} />
                        ) : content ? (
                            <div
                                className="prose prose-zinc prose-2xl dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-primary prose-p:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[3rem] prose-strong:text-foreground prose-strong:font-black"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        ) : (
                            <p className="text-muted-foreground italic">Aucun contenu disponible pour cet article.</p>
                        )}

                        <div className="mt-24 p-16 bg-zinc-950 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-4 text-center md:text-left">
                                    <h3 className="text-4xl font-black tracking-tighter">L'Afrique mérite d'être partagée.</h3>
                                    <p className="text-zinc-400 text-lg font-medium">Contribuez au rayonnement du continent en partageant ce dossier.</p>
                                </div>
                                <SocialShare url={`https://gam.africa/articles/${slug}`} title={title} />
                            </div>
                            <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-primary/30 to-transparent opacity-50" />
                        </div>
                    </div>

                    {/* Side widgets */}
                    <div className="lg:col-span-3 space-y-12">
                        {author && (
                            <div className="p-10 bg-secondary/50 rounded-[3.5rem] border border-primary/10 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <User className="h-24 w-24 text-primary" />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">L'Expertise GAM</h3>
                                <p className="text-sm font-medium text-muted-foreground leading-relaxed relative z-10">
                                    {author.name} contribue régulièrement aux analyses de GAM Media.
                                </p>
                                <Button variant="link" className="p-0 h-auto mt-6 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline group/btn" asChild>
                                    <Link href={`/auteurs/${author.slug}`}>
                                        Voir ses publications <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        )}

                        {related_articles && related_articles.length > 0 && (
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Articles liés
                                </h3>
                                <div className="grid gap-8">
                                    {related_articles.slice(0, 3).map((item: ArticleSummary) => {
                                        const itemImageUrl = getImageUrl(item);
                                        return (
                                            <Link key={item.id} href={`/articles/${item.slug}`} className="group flex flex-col gap-4">
                                                <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg ring-1 ring-primary/5">
                                                    {itemImageUrl ? (
                                                        <Image
                                                            src={itemImageUrl}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                                                            <ImageIcon className="h-10 w-10 opacity-30 text-primary" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Lire l'article</span>
                                                    </div>
                                                </div>
                                                <h4 className="text-lg font-black leading-tight tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Recommendations Footer */}
            {related_articles && related_articles.length > 0 && (
                <section className="container mx-auto px-4 mt-32">
                    <div className="max-w-7xl mx-auto border-t border-primary/10 pt-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                            <div className="space-y-4">
                                <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Alimentez votre curiosité</p>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Continuer <br /> l'aventure.</h2>
                            </div>
                            <Button variant="outline" className="rounded-full h-14 px-10 font-black uppercase tracking-widest text-[10px] border-primary/20 hover:bg-primary/5 transition-all" asChild>
                                <Link href="/actualites">Explorer tout le flux</Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {related_articles.slice(0, 4).map((rec: ArticleSummary) => (
                                <ArticleCard key={rec.id} article={rec} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
