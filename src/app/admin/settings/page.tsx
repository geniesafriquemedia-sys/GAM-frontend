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
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-background/50">
        <header className="h-28 border-b border-border flex items-center justify-between px-12 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground tracking-tighter uppercase">Paramètres</h1>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Configurez votre espace et le site</p>
          </div>
          
          <Button className="rounded-2xl h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-[10px]">
            <Save className="mr-2 h-4 w-4" /> Enregistrer les changements
          </Button>
        </header>

        <div className="p-12 overflow-y-auto custom-scrollbar">
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
                    <div className="h-32 w-32 rounded-[2.5rem] bg-primary/20 flex items-center justify-center border-2 border-primary/30 relative group cursor-pointer">
                      <span className="text-primary font-black text-4xl">AD</span>
                      <div className="absolute inset-0 bg-primary/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="text-white h-8 w-8" />
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl border-border text-foreground font-black uppercase tracking-widest text-[9px] h-10 px-6 hover:bg-muted">Changer l'avatar</Button>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Nom Complet</Label>
                      <Input defaultValue="Admin GAM" className="bg-muted border-border rounded-2xl h-14 px-6 text-foreground focus:ring-primary font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email</Label>
                      <Input defaultValue="admin@genieafrique.com" className="bg-muted border-border rounded-2xl h-14 px-6 text-foreground focus:ring-primary font-bold" />
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
                      <p className="font-black text-foreground uppercase tracking-tighter text-lg">Mode Maintenance</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Rendre le site inaccessible</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-black text-foreground uppercase tracking-tighter text-lg">Commentaires</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Activer les commentaires</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </Card>
                <Card className="bg-card border-border rounded-[3rem] p-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-black text-foreground uppercase tracking-tighter text-lg">Inscriptions</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Autoriser nouveaux comptes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-black text-foreground uppercase tracking-tighter text-lg">Newsletter</p>
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
                    <p className="font-black text-destructive uppercase tracking-tighter text-xl">Zone de Danger</p>
                    <p className="text-[10px] text-destructive/60 font-bold uppercase tracking-widest">Actions irréversibles pour votre instance</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="ghost" className="rounded-xl border border-destructive/20 text-destructive font-black uppercase tracking-widest text-[9px] h-12 px-8 hover:bg-destructive/10 transition-all">Vider le cache</Button>
                    <Button className="rounded-xl bg-destructive text-white font-black uppercase tracking-widest text-[9px] h-12 px-8 hover:bg-destructive/90 transition-all">Réinitialiser le site</Button>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
