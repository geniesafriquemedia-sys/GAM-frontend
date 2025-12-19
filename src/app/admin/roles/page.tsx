"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Users, 
  Lock,
  ChevronRight,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RoleForm } from "@/components/admin/forms/RoleForm";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

const roles = [
  {
    id: "r1",
    name: "Administrateur",
    description: "Accès total au système, gestion des utilisateurs et paramètres critiques.",
    usersCount: 2,
    permissionsCount: 24,
    color: "bg-primary",
    permissions: ["articles.view", "articles.create", "articles.edit", "articles.publish", "articles.delete", "video.view", "video.manage", "users.view", "users.manage", "roles.manage", "settings.view", "settings.manage", "analytics.view"]
  },
  {
    id: "r2",
    name: "Rédacteur Senior",
    description: "Peut créer, modifier et publier des articles. Gestion limitée de la Web TV.",
    usersCount: 5,
    permissionsCount: 12,
    color: "bg-blue-500",
    permissions: ["articles.view", "articles.create", "articles.edit", "articles.publish", "video.view"]
  },
  {
    id: "r3",
    name: "Modérateur",
    description: "Gestion des commentaires et surveillance du contenu utilisateur.",
    usersCount: 3,
    permissionsCount: 6,
    color: "bg-amber-500",
    permissions: ["articles.view", "video.view"]
  }
];

export default function RolesAdmin() {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">RÔLES & PERMISSIONS</h1>
          <p className="text-muted-foreground font-medium text-sm">Définissez les niveaux d'accès et les responsabilités de l'équipe.</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl h-12 px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 text-[10px] uppercase tracking-widest">
              <Plus className="mr-2 h-4 w-4" /> CRÉER UN RÔLE
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl rounded-[2.5rem] border-none p-8 bg-background shadow-2xl overflow-y-auto max-h-[90vh]">
            <RoleForm mode="create" onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-card border border-border rounded-[2.5rem] p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
          >
            <div className="absolute top-6 right-6">
              <div className={`h-12 w-12 rounded-2xl ${role.color}/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform`}>
                <Shield className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                  {role.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary">
                    {role.permissionsCount} Permissions
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                {role.description}
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-muted">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                    {role.usersCount} Membres
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button 
                  onClick={() => {
                    setSelectedRole(role);
                    setIsEditOpen(true);
                  }}
                  className="flex-1 h-11 rounded-xl font-black text-[9px] uppercase tracking-widest bg-muted hover:bg-primary hover:text-white transition-all group/btn"
                >
                  Configurer <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </Button>
                <ConfirmDelete 
                  onConfirm={() => toast.success(`Rôle "${role.name}" supprimé`)}
                  trigger={
                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 mt-12 relative overflow-hidden group">
        <div className="absolute -right-12 -bottom-12 h-64 w-64 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <Lock className="h-6 w-6" />
              <h2 className="text-2xl font-black tracking-tighter uppercase italic">Protection du Système</h2>
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed max-w-2xl">
              Les rôles permettent de maintenir l'intégrité de GAM en limitant l'accès aux fonctionnalités sensibles. 
              Toute modification des rôles est enregistrée dans les logs d'activité pour une traçabilité totale.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="p-6 rounded-[2rem] bg-background/50 backdrop-blur-sm border border-white/20 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Sécurité Active</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-5xl rounded-[2.5rem] border-none p-8 bg-background shadow-2xl overflow-y-auto max-h-[90vh]">
          {selectedRole && (
            <RoleForm 
              mode="edit" 
              initialData={selectedRole} 
              onClose={() => setIsEditOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
