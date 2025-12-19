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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            {mode === "create" ? "Nouveau Rôle" : "Modifier le Rôle"}
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
            Configuration des accès • Sécurité
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Nom du rôle</Label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Rédacteur Senior" 
                className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Description</Label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les responsabilités de ce rôle..."
              className="w-full min-h-[120px] p-4 rounded-xl bg-muted/50 border-none font-medium text-sm resize-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Info className="h-4 w-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">Résumé</p>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
              Ce rôle aura accès à <span className="text-primary font-bold">{selectedPermissions.length} permissions</span> spécifiques. 
              Les modifications seront appliquées immédiatement à tous les utilisateurs possédant ce rôle.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] block mb-2">Permissions détaillées</Label>
          <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <PermissionsGrid 
              selectedPermissions={selectedPermissions}
              onChange={togglePermission}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
        >
          {isSaving ? "Enregistrement..." : (mode === "create" ? "Créer le rôle" : "Sauvegarder les modifications")}
        </Button>
      </div>
    </div>
  );
}
