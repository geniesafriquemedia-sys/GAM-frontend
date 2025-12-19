"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Shield, 
  Smartphone,
  Check,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  const handleSave = () => {
    toast.success("Paramètres enregistrés avec succès !");
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">Paramètres</h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Configurez votre espace et le site</p>
        </div>
        
        <Button 
          onClick={handleSave}
          className="rounded-2xl h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-[10px]"
        >
          <Save className="mr-2 h-4 w-4" /> Enregistrer les changements
        </Button>
      </header>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Profile Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <User className="h-5 w-5" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Profil Administrateur</h2>
          </div>
          <Card className="bg-card border-border rounded-[3rem] overflow-hidden p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-[2.5rem] border border-border space-y-6">
                <div className="h-32 w-32 rounded-[2.5rem] bg-primary/20 flex items-center justify-center border-2 border-primary/30 relative group cursor-pointer overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop" className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="text-white h-8 w-8" />
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl border-border text-foreground font-black uppercase tracking-widest text-[9px] h-10 px-6 hover:bg-muted">Changer l'avatar</Button>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Nom Complet</Label>
                  <Input defaultValue="Amadou Diallo" className="bg-muted border-border rounded-2xl h-14 px-6 text-foreground focus:ring-primary font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email</Label>
                  <Input defaultValue="a.diallo@gam.com" className="bg-muted border-border rounded-2xl h-14 px-6 text-foreground focus:ring-primary font-bold" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Site Configuration */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Globe className="h-5 w-5" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Configuration du Site</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border-border rounded-[3rem] p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-black text-foreground uppercase tracking-tighter text-lg italic">Mode Maintenance</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Rendre le site inaccessible</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-black text-foreground uppercase tracking-tighter text-lg italic">Commentaires</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Activer les commentaires</p>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
            <Card className="bg-card border-border rounded-[3rem] p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-black text-foreground uppercase tracking-tighter text-lg italic">Inscriptions</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Autoriser nouveaux comptes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-black text-foreground uppercase tracking-tighter text-lg italic">Newsletter</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Activer l'inscription auto</p>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-6 pb-20">
          <div className="flex items-center gap-3 text-destructive">
            <Shield className="h-5 w-5" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Sécurité & Système</h2>
          </div>
          <Card className="bg-destructive/5 border-destructive/10 rounded-[3rem] p-10 border-dashed">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <p className="font-black text-destructive uppercase tracking-tighter text-xl italic">Zone de Danger</p>
                <p className="text-[10px] text-destructive/60 font-bold uppercase tracking-widest">Actions irréversibles pour votre instance</p>
              </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <ConfirmDelete 
                    onConfirm={() => toast.success("Cache vidé avec succès")}
                    title="Vider le cache ?"
                    description="Cette action peut ralentir temporairement le chargement du site."
                    trigger={
                      <Button variant="ghost" className="rounded-xl border border-destructive/20 text-destructive font-black uppercase tracking-widest text-[9px] h-12 px-8 hover:bg-destructive/10 transition-all">Vider le cache</Button>
                    }
                  />
                  <ConfirmDelete 
                    onConfirm={() => toast.error("Le site a été réinitialisé")}
                    title="Réinitialiser TOUT le site ?"
                    description="ATTENTION : Cette action supprimera TOUS les articles, utilisateurs et paramètres. C'est la fin du monde tel que vous le connaissez."
                    trigger={
                      <Button className="rounded-xl bg-destructive text-white font-black uppercase tracking-widest text-[9px] h-12 px-8 hover:bg-destructive/90 transition-all">Réinitialiser le site</Button>
                    }
                  />
                </div>

            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
