"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Bold, 
  Italic, 
  List,
  Sparkles,
  CheckCircle2,
  X,
  History,
  Trash2,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

interface ArticleFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    category: string;
    image: string;
    tags: string[];
  };
  mode: "create" | "edit";
}

export function ArticleForm({ initialData, mode }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      toast.success(mode === "create" ? "Article créé avec succès" : "Modifications enregistrées");
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <Button variant="ghost" asChild className="rounded-2xl h-12 w-12 bg-muted border border-border text-foreground hover:bg-muted/80">
            <Link href="/admin/articles">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">
              {mode === "create" ? "Nouvel Article" : "Modifier l'Article"}
            </h1>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
              {mode === "create" ? "Mode Édition • Brouillon" : `ID: ${initialData?.id || 'ART-X'} • Publié`}
            </p>
          </div>
        </div>
        
          <div className="flex items-center gap-4">
            <ArticlePreview 
              data={{
                title,
                content,
                category,
                image: initialData?.image || "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000&auto=format&fit=crop",
              }}
              trigger={
                <Button variant="ghost" className="rounded-2xl h-12 px-8 font-black text-foreground hover:bg-muted border border-transparent hover:border-border transition-all uppercase tracking-widest text-[10px]">
                  <Eye className="mr-2 h-4 w-4" /> {mode === "create" ? "Prévisualiser" : "Voir"}
                </Button>
              }
            />
            <Button 
              onClick={handleSave}
            className="rounded-2xl h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-[10px]"
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {mode === "create" ? "Création..." : "Mise à jour..."}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" /> {mode === "create" ? "Publier l'article" : "Enregistrer"}
              </span>
            )}
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Titre de l'article</Label>
            <Input 
              placeholder="Entrez un titre percutant..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl font-black bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-foreground/10 text-foreground tracking-tighter italic"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Contenu</Label>
            <div className="bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm">
              <div className="flex items-center gap-1 p-4 border-b border-border bg-muted/30">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"><Bold className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"><Italic className="h-4 w-4" /></Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"><List className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"><LinkIcon className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"><ImageIcon className="h-4 w-4" /></Button>
              </div>
              <Textarea 
                placeholder="Commencez à rédiger votre histoire ici..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] bg-transparent border-none p-8 focus-visible:ring-0 text-foreground/80 text-lg leading-relaxed placeholder:text-foreground/5 resize-none font-medium"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-card rounded-[2.5rem] p-8 border border-border space-y-8 shadow-sm">
            <div className="space-y-4">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Image de Couverture</Label>
              {initialData?.image ? (
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border group">
                  <img src={initialData.image} className="object-cover h-full w-full opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white font-black text-[9px] uppercase tracking-widest rounded-xl">Changer l'image</Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors text-center">Uploader une image</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Catégorie</Label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-14 bg-muted border border-border rounded-2xl px-6 text-foreground text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
              >
                <option value="">Sélectionner...</option>
                <option value="Technologie">Technologie</option>
                <option value="Éducation">Éducation</option>
                <option value="Culture">Culture</option>
                <option value="Société">Société</option>
              </select>
            </div>

            {mode === "edit" && (
              <div className="space-y-4 pt-4 border-t border-border">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Actions</Label>
                <Button variant="ghost" className="w-full h-12 text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">
                  <Trash2 className="h-4 w-4 mr-2" /> Supprimer l'article
                </Button>
              </div>
            )}
          </div>

          <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">IA GAM</span>
            </div>
            <p className="text-muted-foreground text-xs font-medium leading-relaxed">
              Utilisez l'IA pour optimiser vos titres, générer des résumés ou suggérer des tags pertinents.
            </p>
            <Button className="w-full h-12 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all">
              Optimiser avec l'IA
            </Button>
          </div>
        </div>
      </div>

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-12 right-12 bg-emerald-500 text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 z-[100]"
        >
          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="font-black text-lg tracking-tight">{mode === "create" ? "Article créé !" : "Modifications enregistrées !"}</p>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Opération terminée avec succès.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
