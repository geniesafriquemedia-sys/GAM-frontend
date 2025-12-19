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
  ArrowLeft,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import { ArticlePreview } from "@/components/admin/ArticlePreview";

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
  const [status, setStatus] = useState("draft");
  const [scheduledDate, setScheduledDate] = useState("");
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
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Contenu</Label>
              <div className="bg-muted/10 rounded-3xl border-none overflow-hidden">
                <div className="flex items-center gap-1 p-3 border-b border-border/10 bg-muted/20">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><Bold className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><Italic className="h-4 w-4" /></Button>
                  <div className="w-px h-5 bg-border/20 mx-1" />
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><List className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><LinkIcon className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><ImageIcon className="h-4 w-4" /></Button>
                </div>
                <Textarea 
                  placeholder="Écrivez votre contenu..." 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[500px] bg-transparent border-none p-8 focus-visible:ring-0 text-foreground/80 text-lg leading-relaxed placeholder:text-foreground/5 resize-none font-medium"
                />
              </div>
            </div>

        </div>

        <div className="lg:col-span-4 space-y-8">
            <div className="bg-muted/20 rounded-3xl p-8 border-none space-y-8">
              <div className="space-y-4">
                <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Statut & Planification</Label>
                <div className="grid grid-cols-1 gap-4">
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-12 bg-muted/30 border-none rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-muted/40 transition-colors"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="scheduled">Planifié</option>
                    <option value="published">Publié</option>
                  </select>

                  {status === "scheduled" && (
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                      <Input 
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="pl-11 h-12 rounded-2xl bg-muted/30 border-none font-black text-[10px] uppercase tracking-widest focus-visible:ring-1 focus-visible:ring-primary/20"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Image de Couverture</Label>
              {initialData?.image ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/20 group">
                  <img src={initialData.image} className="object-cover h-full w-full opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white font-black text-[9px] uppercase tracking-widest rounded-xl">Changer</Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl bg-muted/20 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center shadow-sm">
                    <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Uploader</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Catégorie</Label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 bg-muted/30 border-none rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <option value="">Sélectionner...</option>
                <option value="Technologie">Technologie</option>
                <option value="Éducation">Éducation</option>
                <option value="Culture">Culture</option>
                <option value="Société">Société</option>
              </select>
            </div>

            {mode === "edit" && (
              <div className="pt-4 border-t border-border/10">
                <Button variant="ghost" className="w-full h-11 text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all">
                  <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                </Button>
              </div>
            )}
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 border-none space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-[9px] font-black uppercase tracking-widest">IA GAM</span>
            </div>
            <p className="text-muted-foreground text-[11px] font-medium leading-relaxed">
              Optimisez vos titres et contenus avec notre assistant IA dédié.
            </p>
            <Button className="w-full h-11 bg-primary text-white font-black text-[9px] uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
              Optimiser
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
