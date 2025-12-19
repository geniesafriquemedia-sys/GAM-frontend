"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  User, 
  Mail, 
  Shield, 
  CheckCircle2,
  X,
  Trash2,
  Image as ImageIcon,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface UserFormProps {
  initialData?: {
    id?: string;
    name: string;
    email: string;
    role: string;
    status: string;
    avatar: string;
  };
  mode: "create" | "edit";
  onClose?: () => void;
}

export function UserForm({ initialData, mode, onClose }: UserFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [role, setRole] = useState(initialData?.role || "Rédacteur");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(mode === "create" ? "Membre invité avec succès" : "Profil mis à jour");
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tighter uppercase italic text-primary">
            {mode === "create" ? "Inviter un Membre" : "Modifier le Profil"}
          </h2>
          <p className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">
            Gestion de l'équipe • Permissions
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/50">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Photo de profil</Label>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/20 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-all cursor-pointer group">
              {initialData?.avatar ? (
                <>
                  <img src={initialData.avatar} className="h-full w-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center shadow-sm">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Uploader</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont" 
                  className="pl-11 h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Adresse Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@gam.com" 
                  className="pl-11 h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Rôle & Permissions</Label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 pl-11 bg-muted/30 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-muted/40 transition-colors"
                >
                  <option value="Administrateur">Administrateur</option>
                  <option value="Rédacteur">Rédacteur</option>
                  <option value="Modérateur">Modérateur</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Statut du compte</Label>
              <select className="w-full h-11 bg-muted/30 border-none rounded-2xl px-4 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-muted/40 transition-colors">
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>

          {mode === "create" && (
            <div className="p-4 rounded-2xl bg-primary/5 border-none flex gap-4 items-center">
              <div className="p-2 rounded-xl bg-primary/10">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-muted-foreground text-[10px] font-medium leading-tight">
                Un email d'invitation sera envoyé pour configurer le mot de passe de manière sécurisée.
              </p>
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
          {isSaving ? "Traitement..." : (mode === "create" ? "Envoyer l'invitation" : "Enregistrer")}
        </Button>
      </div>
    </div>
  );
}
