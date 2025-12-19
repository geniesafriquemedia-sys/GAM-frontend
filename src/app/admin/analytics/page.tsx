"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Vues Totales", value: "124.5k", change: "+12.5%", trendingUp: true, icon: Eye },
  { label: "Visiteurs Uniques", value: "45.2k", change: "+8.2%", trendingUp: true, icon: Users },
  { label: "Temps de Lecture", value: "4m 32s", change: "-2.4%", trendingUp: false, icon: Clock },
  { label: "Taux de Rebond", value: "32.1%", change: "+1.2%", trendingUp: true, icon: TrendingUp },
];

const topArticles = [
  { title: "L'émergence des Smart Cities en Afrique", views: "12.4k", change: "+15%" },
  { title: "Éducation : Le boom des plateformes d'e-learning", views: "8.2k", change: "+10%" },
  { title: "Culture : Le retour en force de l'artisanat", views: "6.1k", change: "+5%" },
];

export default function AnalyticsAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">ANALYSES</h1>
          <p className="text-muted-foreground font-medium">Suivez les performances de votre contenu en temps réel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 font-black text-[10px] uppercase tracking-widest border-border">7 Derniers Jours</Button>
          <Button className="rounded-xl h-11 px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">Exporter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-[2rem] p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-muted rounded-2xl">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge className={stat.trendingUp ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'}>
                {stat.trendingUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {stat.change}
              </Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black tracking-tighter mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-card border border-border rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black tracking-tighter uppercase italic">Aperçu du Trafic</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Vues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Visiteurs</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full bg-muted/20 rounded-3xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 flex items-end justify-between px-8 py-4">
               {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                 <div key={i} className="w-12 bg-primary/20 rounded-t-xl transition-all group-hover:bg-primary/40" style={{ height: `${h}%` }} />
               ))}
            </div>
            <p className="relative z-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border">Visualisation Graphique</p>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-card border border-border rounded-[2rem] p-8">
            <h2 className="text-xl font-black tracking-tighter uppercase italic mb-6">Top Articles</h2>
            <div className="space-y-6">
              {topArticles.map((article, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="space-y-1 max-w-[70%]">
                    <p className="text-xs font-black uppercase italic leading-tight line-clamp-1 group-hover:text-primary transition-colors">{article.title}</p>
                    <p className="text-[10px] text-muted-foreground font-bold">{article.views} vues</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{article.change}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-[2rem] p-8">
            <h2 className="text-xl font-black tracking-tighter uppercase italic mb-6">Appareils</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider">Desktop</span>
                </div>
                <span className="text-xs font-black">58%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '58%' }} />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider">Mobile</span>
                </div>
                <span className="text-xs font-black">42%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
