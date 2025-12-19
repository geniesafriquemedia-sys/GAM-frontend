"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, FileText, Video, Users, Settings, Database } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionGroup {
  name: string;
  icon: any;
  permissions: Permission[];
}

const permissionGroups: PermissionGroup[] = [
  {
    name: "Articles & Contenu",
    icon: FileText,
    permissions: [
      { id: "articles.view", name: "Voir les articles", description: "Accès en lecture à tous les articles" },
      { id: "articles.create", name: "Créer des articles", description: "Possibilité de rédiger de nouveaux articles" },
      { id: "articles.edit", name: "Modifier les articles", description: "Éditer le contenu des articles existants" },
      { id: "articles.publish", name: "Publier", description: "Mettre en ligne ou dépublier des articles" },
      { id: "articles.delete", name: "Supprimer", description: "Action irréversible de suppression d'articles" },
    ],
  },
  {
    name: "Web TV (Vidéo)",
    icon: Video,
    permissions: [
      { id: "video.view", name: "Voir les vidéos", description: "Accès à la bibliothèque vidéo" },
      { id: "video.manage", name: "Gérer les vidéos", description: "Ajouter, modifier ou supprimer des vidéos" },
    ],
  },
  {
    name: "Gestion d'Équipe",
    icon: Users,
    permissions: [
      { id: "users.view", name: "Voir les membres", description: "Consulter la liste de l'équipe" },
      { id: "users.manage", name: "Gérer l'équipe", description: "Inviter, modifier ou bannir des membres" },
      { id: "roles.manage", name: "Gérer les rôles", description: "Modifier les permissions et créer des rôles" },
    ],
  },
  {
    name: "Système & Config",
    icon: Settings,
    permissions: [
      { id: "settings.view", name: "Voir les paramètres", description: "Accès aux configurations de base" },
      { id: "settings.manage", name: "Modifier les réglages", description: "Changer les paramètres critiques du site" },
      { id: "analytics.view", name: "Voir les stats", description: "Accès au tableau de bord analytique" },
    ],
  },
];

interface PermissionsGridProps {
  selectedPermissions: string[];
  onChange: (permissionId: string) => void;
}

export function PermissionsGrid({ selectedPermissions, onChange }: PermissionsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {permissionGroups.map((group) => (
        <div key={group.name} className="space-y-4 p-6 rounded-[2rem] bg-muted/30 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <group.icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest">{group.name}</h3>
          </div>
          
          <div className="space-y-3">
            {group.permissions.map((permission) => (
              <div 
                key={permission.id} 
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-background/50 transition-colors cursor-pointer group"
                onClick={() => onChange(permission.id)}
              >
                <Checkbox 
                  id={permission.id} 
                  checked={selectedPermissions.includes(permission.id)}
                  onCheckedChange={() => onChange(permission.id)}
                  className="mt-1 border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="space-y-0.5">
                  <Label 
                    htmlFor={permission.id}
                    className="text-[11px] font-black uppercase tracking-wider cursor-pointer group-hover:text-primary transition-colors"
                  >
                    {permission.name}
                  </Label>
                  <p className="text-[10px] text-muted-foreground font-medium leading-tight">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
