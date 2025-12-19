"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Bell,
  Search,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const stats = [
  { title: "Vues totales", value: "128.4k", change: "+12%", icon: Eye, color: "text-blue-500" },
  { title: "Articles", value: "45", change: "+3", icon: FileText, color: "text-primary" },
  { title: "Utilisateurs", value: "1.2k", change: "+18%", icon: Users, color: "text-purple-500" },
  { title: "Commentaires", value: "892", change: "+24", icon: MessageSquare, color: "text-orange-500" },
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
  visible: { opacity: 1, y: 0 }
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            GAM<span className="text-primary italic">.admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold transition-all">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/articles" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-xl font-bold transition-all">
            <FileText className="h-5 w-5" />
            Articles
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-xl font-bold transition-all">
            <Users className="h-5 w-5" />
            Utilisateurs
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-xl font-bold transition-all">
            <Settings className="h-5 w-5" />
            Paramètres
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="bg-muted p-4 rounded-2xl space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Compte</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary">AD</div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Admin GAM</p>
                <p className="text-[10px] text-muted-foreground truncate">admin@genieafrique.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-background border-b border-border flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 rounded-xl bg-muted/50 border-none h-11" placeholder="Rechercher..." />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
            </Button>
            <Button className="rounded-xl font-bold flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nouvel Article
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                      <h3 className="text-3xl font-black">{stat.value}</h3>
                      <p className="text-xs font-bold text-emerald-500">{stat.change} ce mois</p>
                    </div>
                    <div className={`h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-7 w-7" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 border-none shadow-sm rounded-[2.5rem]">
              <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                <CardTitle className="text-2xl font-black tracking-tighter">Articles récents</CardTitle>
                <Button variant="ghost" className="font-bold text-primary">Tout voir</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-6 px-8 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-muted overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop`} alt="" className="object-cover h-full w-full" />
                        </div>
                        <div>
                          <p className="font-bold line-clamp-1">L'innovation technologique en Afrique : tendances {2024 + i}</p>
                          <p className="text-xs text-muted-foreground">Publié le {10 + i} Oct 2023 • Par Admin</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-black">1.2k</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Vues</p>
                        </div>
                        <Button variant="ghost" size="sm" className="font-bold rounded-lg">Modifier</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 border-none shadow-sm rounded-[2.5rem]">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black tracking-tighter">Activités</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm"><strong>Jean Dupont</strong> a commenté sur "Le boom de la tech à Lagos"</p>
                        <p className="text-xs text-muted-foreground">Il y a {i * 15} minutes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
