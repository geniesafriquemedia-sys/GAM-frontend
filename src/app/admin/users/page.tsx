"use client";

import { motion } from "framer-motion";
import { 
  UserPlus, 
  Search, 
  MoreVertical, 
  Mail, 
  Shield, 
  Calendar,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

const users = [
  {
    id: "u1",
    name: "Amadou Diallo",
    email: "a.diallo@gam.com",
    role: "Administrateur",
    status: "Actif",
    joined: "01 Jan 2023",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop"
  },
  {
    id: "u2",
    name: "Moussa Sow",
    email: "m.sow@gam.com",
    role: "Rédacteur",
    status: "Actif",
    joined: "15 Mar 2023",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop"
  },
  {
    id: "u3",
    name: "Fatou Kane",
    email: "f.kane@gam.com",
    role: "Rédacteur",
    status: "Inactif",
    joined: "22 Juin 2023",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop"
  }
];

export default function UsersAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">UTILISATEURS</h1>
          <p className="text-muted-foreground font-medium">Gérez les membres de votre équipe et leurs permissions.</p>
        </div>
        <Button className="rounded-xl h-12 px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
          <UserPlus className="mr-2 h-4 w-4" /> INVITER UN MEMBRE
        </Button>
      </div>

      <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher par nom ou email..." 
                className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-12 rounded-xl px-6 font-black text-[10px] uppercase tracking-widest border-border hover:bg-muted transition-colors">
                Rôles
              </Button>
              <Button variant="outline" className="h-12 rounded-xl px-6 font-black text-[10px] uppercase tracking-widest border-border hover:bg-muted transition-colors">
                Statut
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Utilisateur</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rôle</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Statut</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Date d'adhésion</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-muted/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-muted overflow-hidden border border-border group-hover:border-primary/30 transition-colors">
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase italic leading-none">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={
                      user.status === 'Actif' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20 text-[9px] font-black uppercase' 
                        : 'bg-destructive/10 text-destructive border-destructive/20 text-[9px] font-black uppercase'
                    }>
                      {user.status === 'Actif' ? <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> : <XCircle className="h-2.5 w-2.5 mr-1" />}
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {user.joined}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
