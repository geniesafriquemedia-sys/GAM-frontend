"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  FileText, 
  Video, 
  Filter,
  Search,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const scheduledItems = [
  {
    id: "1",
    type: "article",
    title: "Le futur de la fintech au Sénégal",
    category: "Technologie",
    scheduledAt: "2023-11-20T10:00:00",
    status: "scheduled",
    author: "Fatou Dramé"
  },
  {
    id: "2",
    type: "video",
    title: "Reportage : Les artisans du fer à Bamako",
    category: "Culture",
    scheduledAt: "2023-11-21T18:30:00",
    status: "scheduled",
    author: "Moussa Traoré"
  },
  {
    id: "3",
    type: "article",
    title: "Économie : Les nouveaux corridors logistiques",
    category: "Économie",
    scheduledAt: "2023-11-22T08:00:00",
    status: "draft",
    author: "Amadou Diallo"
  },
  {
    id: "4",
    type: "video",
    title: "Interview : Ministre de l'Innovation",
    category: "Politique",
    scheduledAt: "2023-11-23T12:00:00",
    status: "scheduled",
    author: "Fatou Dramé"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function SchedulerPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
            <Calendar className="h-4 w-4" />
            <span>Gestion du Flux</span>
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic">
            Planification <span className="text-primary">Éditoriale</span>.
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher une publication..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 w-64 rounded-2xl bg-muted/30 border-none font-bold text-xs uppercase tracking-widest focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 rounded-2xl border-border bg-background hover:bg-muted p-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {scheduledItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className="group relative bg-muted/20 hover:bg-muted/30 rounded-[2rem] p-6 transition-all duration-500 border border-transparent hover:border-primary/10"
              >
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-background flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors shrink-0">
                    {item.type === "article" ? (
                      <FileText className="h-8 w-8 text-primary/40 group-hover:text-primary transition-colors" />
                    ) : (
                      <Video className="h-8 w-8 text-primary/40 group-hover:text-primary transition-colors" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/5 text-primary border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                        {item.category}
                      </Badge>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        Par {item.author}
                      </span>
                    </div>
                    <h3 className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-right space-y-2 shrink-0">
                    <div className="flex items-center justify-end gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                      <Clock className="h-3 w-3" />
                      {new Date(item.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} • {new Date(item.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2h', minute: '2h' })}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Badge className={item.status === "scheduled" ? "bg-amber-500/10 text-amber-500 border-none" : "bg-muted text-muted-foreground border-none"}>
                        <span className="text-[8px] font-black uppercase tracking-widest">
                          {item.status === "scheduled" ? "Planifié" : "Brouillon"}
                        </span>
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-background">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="space-y-4 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter leading-none italic uppercase">
                Stats de <br /> Planification.
              </h2>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { label: "Articles à venir", value: 12 },
                { label: "Vidéos en attente", value: 5 },
                { label: "Brouillons critiques", value: 3 }
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
                  <span className="text-2xl font-black italic">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/20 rounded-[2.5rem] p-10 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-[10px] font-black uppercase tracking-widest italic">Rappels de Publication</h3>
            </div>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
              Assurez-vous que toutes les métadonnées SEO sont renseignées avant la mise en ligne automatique.
            </p>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-primary/20 hover:bg-primary/5 hover:border-primary text-primary font-black text-[9px] uppercase tracking-widest transition-all">
              Vérifier le flux <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
