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
    <div className="min-h-screen bg-black flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-28 border-b border-white/5 flex items-center justify-between px-12 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Tableau de Bord</h1>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">Aujourd'hui, 24 Octobre 2023</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative w-72 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input className="pl-12 rounded-2xl bg-white/5 border-white/10 text-white h-12 focus:ring-primary focus:border-primary transition-all font-medium" placeholder="Rechercher..." />
            </div>
            <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 bg-white/5 border border-white/10 text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 h-2 w-2 bg-primary rounded-full border-2 border-black" />
            </Button>
            <Button asChild className="rounded-2xl h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
              <Link href="/admin/articles/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Nouvel Article
              </Link>
            </Button>
          </div>
        </header>

        <div className="p-12 space-y-12 overflow-y-auto custom-scrollbar">
          {/* Stats Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="bg-white/5 border-white/5 rounded-[2.5rem] overflow-hidden group hover:bg-white/[0.08] transition-all duration-500">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`h-14 w-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                        <stat.icon className="h-7 w-7" />
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-lg py-1 px-3 text-[10px] font-black tracking-widest uppercase">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{stat.title}</p>
                      <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Articles */}
            <Card className="lg:col-span-8 bg-white/5 border-white/5 rounded-[3rem] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-10 pb-6 border-b border-white/5">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-white tracking-tighter uppercase">Dernières Publications</CardTitle>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Gérez vos contenus récents</p>
                </div>
                <Button variant="ghost" asChild className="text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10">
                  <Link href="/admin/articles" className="flex items-center gap-2">Tout voir <ChevronRight className="h-3 w-3" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-8 hover:bg-white/[0.03] transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="relative h-16 w-16 rounded-[1.25rem] overflow-hidden border border-white/10">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop`} alt="" className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-white text-lg tracking-tight line-clamp-1 group-hover:text-primary transition-colors">L'innovation technologique en Afrique : tendances 2024</p>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Technologie</span>
                            <div className="h-1 w-1 rounded-full bg-white/20" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                              <Clock className="h-3 w-3" /> Il y a {i * 2}h
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="text-right hidden sm:block">
                          <p className="text-lg font-black text-white">1.2k</p>
                          <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Lectures</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 text-white font-black uppercase tracking-widest text-[10px] px-6 h-10 hover:bg-white/10 transition-all">Modifier</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Panel: Performance & Activity */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="bg-primary rounded-[3rem] border-none overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8">
                  <ArrowUpRight className="h-8 w-8 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <CardContent className="p-10 space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Audience Mensuelle</p>
                    <h3 className="text-5xl font-black text-white tracking-tighter">450k+</h3>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed">
                    Votre audience a augmenté de <span className="text-white font-black">24%</span> ce mois-ci. Continuez sur cette lancée !
                  </p>
                  <Button className="w-full bg-white text-primary font-black uppercase tracking-widest text-xs h-14 rounded-2xl hover:bg-white/90 transition-all">
                    Rapport de Performance
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/5 rounded-[3rem] overflow-hidden">
                <CardHeader className="p-10 pb-6 border-b border-white/5">
                  <CardTitle className="text-xl font-black text-white tracking-tighter uppercase">Flux d'Activité</CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="h-10 w-10 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                          <MessageSquare className="h-4 w-4 text-white/40 group-hover:text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-white/80 leading-snug">
                            <span className="font-black text-white">Ibrahim K.</span> a commenté votre dernier article.
                          </p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Il y a {i * 15} min</p>
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
