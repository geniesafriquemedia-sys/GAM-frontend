"use client";

import { useState } from "react";
import { X, Save, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PermissionsGrid } from "@/components/admin/PermissionsGrid";

interface RoleFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    color: string;
  };
  mode: "create" | "edit";
  onClose?: () => void;
}

export function RoleForm({ initialData, mode, onClose }: RoleFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(initialData?.permissions || []);
  const [isSaving, setIsSaving] = useState(false);

  const togglePermission = (id: string) => {
    setSelectedPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!name) {
      toast.error("Veuillez donner un nom au rôle");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(mode === "create" ? "Rôle créé avec succès" : "Rôle mis à jour");
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tighter uppercase italic text-primary">
            {mode === "create" ? "Nouveau Rôle" : "Modifier le Rôle"}
          </h2>
          <p className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">
            Configuration des accès sécurisés
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/50">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Nom du rôle</Label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Rédacteur Senior" 
                className="pl-11 h-11 rounded-2xl bg-muted/30 border-none font-semibold text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Description</Label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les responsabilités..."
              className="w-full min-h-[100px] p-4 rounded-2xl bg-muted/30 border-none font-medium text-xs resize-none outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="p-5 rounded-3xl bg-primary/5 border-none space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Info className="h-12 w-12" />
            </div>
            <div className="flex items-center gap-2 text-primary">
              <p className="text-[9px] font-black uppercase tracking-widest">Résumé des accès</p>
            </div>
            <p className="text-[11px] text-muted-foreground/80 font-medium leading-relaxed relative z-10">
              Ce rôle dispose de <span className="text-primary font-bold">{selectedPermissions.length} privilèges</span>. 
              Tout changement impactera l'équipe en temps réel.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <Label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-2">Matrice des Permissions</Label>
          <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <PermissionsGrid 
              selectedPermissions={selectedPermissions}
              onChange={togglePermission}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-4">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-11 px-10 font-black bg-primary text-white hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/10 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
        >
          {isSaving ? "Enregistrement..." : (mode === "create" ? "Créer le rôle" : "Valider les changements")}
        </Button>
      </div>
    </div>
  );
}
