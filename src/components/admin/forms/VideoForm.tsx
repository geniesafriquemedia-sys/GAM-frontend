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
    Link as LinkIcon,
    Calendar
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
    const [status, setStatus] = useState(initialData?.status || "brouillon");
    const [scheduledDate, setScheduledDate] = useState("");
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tighter uppercase italic text-primary">
            {mode === "create" ? "Ajouter une Vidéo" : "Modifier la Vidéo"}
          </h2>
          <p className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">
            Contenu Web TV • YouTube
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/50">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Titre de la vidéo</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entretien exclusif..." 
              className="h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">URL YouTube / Source</Label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
              <Input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..." 
                className="pl-11 h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Description</Label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brève description..." 
              className="min-h-[120px] rounded-2xl bg-muted/30 border-none font-medium text-xs focus-visible:ring-1 focus-visible:ring-primary/20 resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Aperçu de la Miniature</Label>
            {initialData?.thumbnail ? (
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted/20 group">
                <img src={initialData.thumbnail} className="object-cover h-full w-full opacity-80 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-xl">Changer</Button>
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-3xl bg-muted/20 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-all cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center shadow-sm">
                  <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Uploader</span>
              </div>
            )}
          </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Durée</Label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input placeholder="12:45" className="pl-11 h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Statut</Label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-11 bg-muted/30 border-none rounded-2xl px-4 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-muted/40 transition-colors"
                >
                  <option value="publie">Publié</option>
                  <option value="brouillon">Brouillon</option>
                  <option value="planifie">Planifié</option>
                </select>
              </div>
            </div>

            {status === "planifie" && (
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Date de publication</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input 
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="pl-11 h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20" 
                  />
                </div>
              </div>
            )}
          </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        {mode === "edit" && (
          <Button variant="ghost" className="h-11 px-6 text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-[9px] uppercase tracking-widest rounded-2xl">
            <Trash2 className="h-4 w-4 mr-2" /> Supprimer
          </Button>
        )}
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-11 px-10 font-black bg-primary text-white hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/10 transition-all active:scale-95 text-[9px] uppercase tracking-widest"
        >
          {isSaving ? "Enregistrement..." : (mode === "create" ? "Ajouter la vidéo" : "Enregistrer")}
        </Button>
      </div>
    </div>
  );
}
