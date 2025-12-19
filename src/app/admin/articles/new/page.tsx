"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon, 
  Bold, 
  Italic, 
  List,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#050505] relative">
        <header className="h-28 border-b border-white/5 flex items-center justify-between px-12 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <Button variant="ghost" asChild className="rounded-2xl h-12 w-12 bg-white/5 border border-white/10 text-white hover:bg-white/10">
              <Link href="/admin/articles">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Nouvel Article</h1>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">Mode Édition • Brouillon</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="rounded-2xl h-12 px-8 font-black text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all uppercase tracking-widest text-[10px]">
              <Eye className="mr-2 h-4 w-4" /> Prévisualiser
            </Button>
            <Button 
              onClick={handleSave}
              className="rounded-2xl h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-[10px]"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enregistrement...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" /> Publier l'article
                </span>
              )}
            </Button>
          </div>
        </header>

        <div className="p-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Editor Area */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Titre de l'article</Label>
                <Input 
                  placeholder="Entrez un titre percutant..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-4xl font-black bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-white/10 text-white tracking-tighter"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Contenu</Label>
                <div className="bg-white/5 rounded-[2rem] border border-white/5 overflow-hidden">
                  <div className="flex items-center gap-1 p-4 border-b border-white/5 bg-white/[0.02]">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/40 hover:text-white hover:bg-white/5"><Bold className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/40 hover:text-white hover:bg-white/5"><Italic className="h-4 w-4" /></Button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/40 hover:text-white hover:bg-white/5"><List className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/40 hover:text-white hover:bg-white/5"><LinkIcon className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/40 hover:text-white hover:bg-white/5"><ImageIcon className="h-4 w-4" /></Button>
                  </div>
                  <Textarea 
                    placeholder="Commencez à rédiger votre histoire ici..." 
                    className="min-h-[500px] bg-transparent border-none p-8 focus-visible:ring-0 text-white/80 text-lg leading-relaxed placeholder:text-white/5 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Config */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 space-y-8">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Image de Couverture</Label>
                  <div className="aspect-video rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-6 w-6 text-white/20 group-hover:text-primary" />
                    </div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Uploader une image</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Catégorie</Label>
                  <select className="w-full h-14 bg-black border border-white/10 rounded-2xl px-6 text-white text-[10px] font-black uppercase tracking-widest focus:ring-primary outline-none appearance-none">
                    <option>Sélectionner...</option>
                    <option>Technologie</option>
                    <option>Éducation</option>
                    <option>Culture</option>
                    <option>Société</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/5 text-white/60 border-none rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest">Innovation <X className="ml-2 h-3 w-3 cursor-pointer" /></Badge>
                    <Badge className="bg-white/5 text-white/60 border-none rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest">Afrique <X className="ml-2 h-3 w-3 cursor-pointer" /></Badge>
                    <Button variant="ghost" size="sm" className="h-7 px-3 rounded-lg border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white">Ajouter +</Button>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-[2.5rem] p-8 border border-primary/20 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Optimisation IA</span>
                </div>
                <p className="text-white/60 text-xs font-medium leading-relaxed">
                  Laissez notre IA analyser votre contenu pour suggérer des titres plus percutants et améliorer votre SEO.
                </p>
                <Button className="w-full h-12 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all">
                  Analyser le texte
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Toast Overlay */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-12 right-12 bg-emerald-500 text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 z-[100]"
          >
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black text-lg tracking-tight">Article publié !</p>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Il est maintenant visible sur le site.</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
