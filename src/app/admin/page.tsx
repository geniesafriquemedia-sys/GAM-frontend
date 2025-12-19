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
    <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background/50">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 md:px-8 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Plus className="h-5 w-5 rotate-45" />
            </Button>
            <div className="space-y-0.5">
              <h1 className="text-lg font-black text-foreground tracking-tighter uppercase">Tableau de Bord</h1>
              <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-[0.3em] hidden sm:block">Aujourd'hui, 24 Octobre 2023</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative w-48 md:w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input className="pl-9 rounded-xl bg-muted border-border text-foreground h-9 focus:ring-primary focus:border-primary transition-all font-medium text-xs" placeholder="Rechercher..." />
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 bg-muted border border-border text-foreground hover:bg-muted/80 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-primary rounded-full border border-background" />
            </Button>
            <Button asChild className="rounded-xl h-9 px-4 md:px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 text-[10px] uppercase tracking-widest">
              <Link href="/admin/articles/new" className="flex items-center gap-2">
                <Plus className="h-3.5 w-3.5" /> <span className="hidden xs:inline">Nouvel Article</span>
              </Link>
            </Button>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Stats Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="bg-card border-border rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-500">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-md py-0.5 px-2 text-[8px] font-black tracking-widest uppercase">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.title}</p>
                      <h3 className="text-2xl font-black text-foreground tracking-tighter">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Recent Articles */}
            <Card className="lg:col-span-8 bg-card border-border rounded-3xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b border-border">
                <div className="space-y-0.5">
                  <CardTitle className="text-lg font-black text-foreground tracking-tighter uppercase">Dernières Publications</CardTitle>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Gérez vos contenus récents</p>
                </div>
                <Button variant="ghost" asChild className="text-primary font-black uppercase tracking-widest text-[9px] hover:bg-primary/10 h-8 px-3">
                  <Link href="/admin/articles" className="flex items-center gap-1.5">Tout voir <ChevronRight className="h-2.5 w-2.5" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 md:p-6 hover:bg-muted/50 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-border flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop`} alt="" className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <p className="font-black text-foreground text-sm tracking-tight line-clamp-1 group-hover:text-primary transition-colors">L'innovation technologique en Afrique : tendances 2024</p>
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Technologie</span>
                            <div className="h-0.5 w-0.5 rounded-full bg-border" />
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                              <Clock className="h-2.5 w-2.5" /> Il y a {i * 2}h
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 md:gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-black text-foreground">1.2k</p>
                          <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Vues</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg border-border text-foreground font-black uppercase tracking-widest text-[9px] px-4 h-8 hover:bg-muted transition-all">Modifier</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Panel */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-primary rounded-3xl border-none overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6">
                  <ArrowUpRight className="h-6 w-6 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <CardContent className="p-8 space-y-4">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Audience Mensuelle</p>
                    <h3 className="text-3xl font-black text-white tracking-tighter">450k+</h3>
                  </div>
                  <p className="text-xs text-white/80 font-medium leading-relaxed">
                    Votre audience a augmenté de <span className="text-white font-black">24%</span> ce mois-ci.
                  </p>
                  <Button className="w-full bg-white text-primary font-black uppercase tracking-widest text-[10px] h-10 rounded-xl hover:bg-white/90 transition-all">
                    Rapport
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border rounded-3xl overflow-hidden">
                <CardHeader className="p-6 pb-4 border-b border-border">
                  <CardTitle className="text-sm font-black text-foreground tracking-tighter uppercase">Flux d'Activité</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3 group">
                        <div className="h-8 w-8 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-foreground/80 leading-snug">
                            <span className="font-black text-foreground">Ibrahim K.</span> a commenté.
                          </p>
                          <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Il y a {i * 15} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
