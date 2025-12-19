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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            {mode === "create" ? "Inviter un Membre" : "Modifier le Profil"}
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
            Gestion de l'équipe • Permissions
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Photo de profil</Label>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer group">
              {initialData?.avatar ? (
                <>
                  <img src={initialData.avatar} className="h-full w-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
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
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont" 
                  className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Adresse Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@gam.com" 
                  className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Rôle & Permissions</Label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-12 pl-11 bg-muted/50 border-none rounded-xl text-sm font-bold outline-none appearance-none cursor-pointer"
                >
                  <option value="Administrateur">Administrateur</option>
                  <option value="Rédacteur">Rédacteur</option>
                  <option value="Modérateur">Modérateur</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Statut du compte</Label>
              <select className="w-full h-12 bg-muted/50 border-none rounded-xl px-4 text-sm font-bold outline-none appearance-none cursor-pointer">
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>

          {mode === "create" && (
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
              <Lock className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Sécurité</p>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Un email d'invitation sera envoyé à l'utilisateur pour qu'il puisse configurer son mot de passe de manière sécurisée.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
        {mode === "edit" && (
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-[10px] uppercase tracking-widest rounded-xl">
            <Trash2 className="h-4 w-4 mr-2" /> Supprimer l'accès
          </Button>
        )}
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
        >
          {isSaving ? "Traitement..." : (mode === "create" ? "Envoyer l'invitation" : "Enregistrer les modifications")}
        </Button>
      </div>
    </div>
  );
}
