"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  Play, 
  Image as ImageIcon, 
  Youtube, 
  Clock,
  CheckCircle2,
  X,
  Trash2,
  ArrowLeft,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";

interface VideoFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    duration: string;
    status: string;
  };
  mode: "create" | "edit";
  onClose?: () => void;
}

export function VideoForm({ initialData, mode, onClose }: VideoFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(mode === "create" ? "Vidéo ajoutée avec succès" : "Vidéo mise à jour");
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            {mode === "create" ? "Ajouter une Vidéo" : "Modifier la Vidéo"}
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
            Contenu Web TV • YouTube
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Titre de la vidéo</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entretien exclusif..." 
              className="h-12 rounded-xl bg-muted/50 border-none font-medium focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">URL YouTube / Source</Label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..." 
                className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Description</Label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brève description du contenu..." 
              className="min-h-[120px] rounded-xl bg-muted/50 border-none font-medium focus-visible:ring-primary resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Aperçu de la Miniature</Label>
            {initialData?.thumbnail ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border group">
                <img src={initialData.thumbnail} className="object-cover h-full w-full opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">Changer</Button>
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Uploader une image</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Durée</Label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="12:45" className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium" />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Statut</Label>
              <select className="w-full h-12 bg-muted/50 border-none rounded-xl px-4 text-sm font-bold outline-none appearance-none cursor-pointer">
                <option value="publie">Publié</option>
                <option value="brouillon">Brouillon</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
        {mode === "edit" && (
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-[10px] uppercase tracking-widest rounded-xl">
            <Trash2 className="h-4 w-4 mr-2" /> Supprimer
          </Button>
        )}
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
        >
          {isSaving ? "Enregistrement..." : (mode === "create" ? "Ajouter la vidéo" : "Enregistrer")}
        </Button>
      </div>
    </div>
  );
}
