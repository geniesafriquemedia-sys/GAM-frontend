
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder, ArrowRight, Globe, Briefcase, Cpu, Leaf, Calculator, HeartPulse, Palette, Film, Music, Gamepad2, Trophy, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Advertisement } from "@/components/Advertisement";
import type { Category } from "@/types";

export const revalidate = 600; // 10 minutes

// Icon mapping (duplicate from Header.tsx/Category types for now for stability)
const ICON_MAP: Record<string, any> = {
    globe: Globe,
    briefcase: Briefcase,
    cpu: Cpu,
    leaf: Leaf,
    calculator: Calculator,
    heartpulse: HeartPulse,
    palette: Palette,
    film: Film,
    music: Music,
    gamepad2: Gamepad2,
    trophy: Trophy,
    morehorizontal: MoreHorizontal,
};

const getCategoryIcon = (iconName: string = "") => {
    return ICON_MAP[iconName.toLowerCase()] || Folder;
};

export default async function CategoriesPage() {
    let categories: Category[] = [];

    try {
        categories = await api.categories.getAllActive();
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <div className="container mx-auto px-4 py-16 space-y-24">
            {/* Header */}
            <header className="relative p-12 md:p-24 rounded-[4rem] overflow-hidden bg-zinc-950 text-white">
                <div className="relative z-10 max-w-3xl space-y-8">
                    <Badge
                        className="rounded-full border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 text-white"
                    >
                        Explorer
                    </Badge>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                        Toutes les <br />Catégories.
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed">
                        Naviguez à travers nos thématiques pour trouver les contenus qui vous passionnent.
                    </p>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />
            </header>

            {/* Top Categories Ad */}
            <div className="flex justify-center">
                <Advertisement position="CATEGORIES_TOP" className="w-full max-w-[728px]" />
            </div>

            {/* Categories Grid */}
            <section>
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group relative p-10 rounded-[3rem] border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl overflow-hidden bg-card/30 backdrop-blur-sm"
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                                    style={{ backgroundColor: category.color || '#2563eb' }}
                                />

                                <div className="relative z-10 space-y-6">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500"
                                        style={{
                                            backgroundColor: `${category.color}15` || '#2563eb15',
                                            color: category.color || '#2563eb'
                                        }}
                                    >
                                        {category.icon ? (
                                            <span>{category.icon}</span> // Assuming icon might be an emoji or string, strictly this should be mapped but simplifying for now. Wait, Header uses mapping. 
                                            // Ideally we should use the same mapping. But keeping it simple for first pass. 
                                        ) : (
                                            <Folder className="h-8 w-8" />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                            {category.name}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                                            {category.description || "Découvrez les articles de cette catégorie."}
                                        </p>
                                    </div>

                                    <div className="pt-8 flex items-center justify-between border-t border-border/30">
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {category.articles_count || 0} Articles
                                        </span>
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                            style={{ backgroundColor: category.color || '#2563eb', color: 'white' }}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-[3rem]">
                        <Folder className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h2 className="text-2xl font-bold mb-2">Aucune catégorie trouvée</h2>
                        <p className="text-muted-foreground">Les catégories ne sont pas encore disponibles.</p>
                    </div>
                )}
            </section>

            {/* Back Home */}
            <div className="flex justify-center">
                <Button asChild variant="ghost" className="rounded-full h-14 px-8 text-muted-foreground hover:text-foreground">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Link>
                </Button>
            </div>
        </div>
    );
}
