"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Video, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2, 
  Play,
  Calendar,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

const videos = [
  {
    id: "v1",
    title: "Entretien exclusif avec les innovateurs de Lagos",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    duration: "12:45",
    views: "1.2k",
    date: "12 Oct 2023",
    status: "Publié"
  },
  {
    id: "v2",
    title: "Documentaire : L'art du pagne revisité",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
    duration: "08:20",
    views: "850",
    date: "11 Oct 2023",
    status: "Publié"
  },
  {
    id: "v3",
    title: "Reportage : Les fermes solaires du Kenya",
    thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop",
    duration: "15:10",
    views: "2.4k",
    date: "10 Oct 2023",
    status: "Brouillon"
  }
];

export default function WebTVAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">WEB TV</h1>
          <p className="text-muted-foreground font-medium">Gérez vos contenus vidéo et diffusions YouTube.</p>
        </div>
        <Button className="rounded-xl h-12 px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
          <Plus className="mr-2 h-4 w-4" /> AJOUTER UNE VIDÉO
        </Button>
      </div>

      <div className="bg-card border border-border rounded-[2rem] p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher une vidéo..." 
              className="pl-11 h-12 rounded-xl bg-muted/50 border-none font-medium"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 rounded-xl px-6 font-black text-[10px] uppercase tracking-widest border-border hover:bg-muted transition-colors">
              Filtrer
            </Button>
            <Button variant="outline" className="h-12 rounded-xl px-6 font-black text-[10px] uppercase tracking-widest border-border hover:bg-muted transition-colors">
              Statut
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-muted/30 border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Badge className="bg-primary text-white text-[9px] font-black uppercase tracking-widest border-none">
                    <Play className="h-2 w-2 mr-1 fill-current" /> {video.duration}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={video.status === 'Publié' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}>
                    {video.status}
                  </Badge>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <h3 className="font-black text-sm leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors italic uppercase">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {video.views}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {video.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
