"use client";

import { motion } from "framer-motion";
import { User, Mail, Shield, Bell, LogOut, ChevronRight, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted/30 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter">Mon <span className="text-primary italic">Espace</span></h1>
              <p className="text-muted-foreground font-medium">Gérez vos informations personnelles et vos préférences.</p>
            </div>
            <Button variant="outline" className="rounded-xl font-bold border-red-500/20 text-red-500 hover:bg-red-50 hover:border-red-500 transition-all">
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-4">
              <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                <CardContent className="p-4 space-y-1">
                  <button className="w-full flex items-center justify-between p-4 bg-primary/10 text-primary rounded-2xl font-bold transition-all">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      Profil
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 text-muted-foreground hover:bg-muted rounded-2xl font-bold transition-all">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5" />
                      Sécurité
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 text-muted-foreground hover:bg-muted rounded-2xl font-bold transition-all">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Main Profile Form */}
            <div className="lg:col-span-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-10 pb-6 border-b border-border/50">
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center font-black text-3xl text-primary overflow-hidden border-4 border-background shadow-xl">
                        JD
                      </div>
                      <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-background transform transition-transform hover:scale-110">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-black tracking-tighter">Informations personnelles</CardTitle>
                      <CardDescription>Mettez à jour votre nom et votre adresse email.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Prénom</Label>
                      <Input id="firstName" defaultValue="Jean" className="rounded-xl h-12 border-muted bg-muted/30 focus:bg-background transition-all" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nom</Label>
                      <Input id="lastName" defaultValue="Dupont" className="rounded-xl h-12 border-muted bg-muted/30 focus:bg-background transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Adresse Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="jean.dupont@example.com" className="pl-12 rounded-xl h-12 border-muted bg-muted/30 focus:bg-background transition-all" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50 flex justify-end">
                    <Button className="rounded-xl h-12 px-8 font-black shadow-lg shadow-primary/20">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
