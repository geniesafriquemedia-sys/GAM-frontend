"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Zap,
  Clock,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const stats = [
  { title: "Vues totales", value: "128.4k", change: "+12%", icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Articles", value: "45", change: "+3", icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  { title: "Contributeurs", value: "12", change: "+1", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "Engagement", value: "8.2%", change: "+2.4%", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">Tableau de Bord</h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Aujourd'hui, 24 Octobre 2023</p>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative w-48 md:w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input className="pl-9 rounded-xl bg-muted border-none text-foreground h-11 focus:ring-primary focus:border-primary transition-all font-medium text-xs" placeholder="Rechercher..." />
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted border border-border text-foreground hover:bg-muted/80 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-3 right-3 h-2 w-2 bg-primary rounded-full border border-background" />
          </Button>
          <Button asChild className="rounded-xl h-11 px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 text-[10px] uppercase tracking-widest">
            <Link href="/admin/articles/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> <span className="hidden xs:inline">Nouvel Article</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="bg-card border-border rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-500">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-lg py-1 px-3 text-[9px] font-black tracking-widest uppercase">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.title}</p>
                  <h3 className="text-3xl font-black text-foreground tracking-tighter">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Recent Articles */}
        <Card className="lg:col-span-8 bg-card border-border rounded-[2.5rem] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-8 pb-4 border-b border-border">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black text-foreground tracking-tighter uppercase italic">Dernières Publications</CardTitle>
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Gérez vos contenus récents</p>
            </div>
            <Button variant="ghost" asChild className="text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10 h-10 px-4 rounded-xl">
              <Link href="/admin/articles" className="flex items-center gap-2">Tout voir <ChevronRight className="h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-border flex-shrink-0">
                      <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop`} alt="" className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="font-black text-foreground text-base tracking-tight line-clamp-1 group-hover:text-primary transition-colors italic uppercase">L'innovation technologique en Afrique : tendances 2024</p>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Technologie</span>
                        <div className="h-1 w-1 rounded-full bg-border" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> Il y a {i * 2}h
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-base font-black text-foreground tracking-tighter">1.2k</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Vues</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl border-border text-foreground font-black uppercase tracking-widest text-[10px] px-6 h-10 hover:bg-muted transition-all">Modifier</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-primary rounded-[2.5rem] border-none overflow-hidden relative group shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-8">
              <ArrowUpRight className="h-8 w-8 text-white/20 group-hover:text-white transition-colors" />
            </div>
            <CardContent className="p-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Audience Mensuelle</p>
                <h3 className="text-4xl font-black text-white tracking-tighter">450k+</h3>
              </div>
              <p className="text-sm text-white/80 font-medium leading-relaxed">
                Votre audience a augmenté de <span className="text-white font-black">24%</span> ce mois-ci.
              </p>
              <Button className="w-full bg-white text-primary font-black uppercase tracking-widest text-[10px] h-12 rounded-2xl hover:bg-white/90 transition-all">
                Rapport Complet
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4 border-b border-border">
              <CardTitle className="text-base font-black text-foreground tracking-tighter uppercase italic">Flux d'Activité</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                      <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground/80 leading-snug">
                        <span className="font-black text-foreground uppercase italic">Ibrahim K.</span> a commenté votre article.
                      </p>
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Il y a {i * 15} min</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
