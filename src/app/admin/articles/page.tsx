"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const articles = [
  { id: 1, title: "L'émergence des Smart Cities en Afrique", category: "Technologie", status: "Publié", date: "24 Oct 2023", views: "12.4k", author: "Ibrahim K." },
  { id: 2, title: "Éducation : Le boom des plateformes d'e-learning", category: "Éducation", status: "Brouillon", date: "22 Oct 2023", views: "0", author: "Sarah M." },
  { id: 3, title: "Culture : Le retour en force de l'artisanat", category: "Culture", status: "Publié", date: "20 Oct 2023", views: "8.2k", author: "Jean D." },
  { id: 4, title: "Société : Les enjeux de la transition énergétique", category: "Société", status: "Publié", date: "18 Oct 2023", views: "5.1k", author: "Ibrahim K." },
  { id: 5, title: "Tech : Startups à suivre en 2024", category: "Tech", status: "Archivé", date: "15 Oct 2023", views: "15.7k", author: "Sarah M." },
];

export default function AdminArticlesPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">Gestion des Articles</h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">5 Articles au total</p>
        </div>
        
        <Button asChild className="rounded-xl h-12 px-6 font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 text-[10px] uppercase tracking-widest">
          <Link href="/admin/articles/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> <span className="hidden xs:inline">Nouvel Article</span>
          </Link>
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-6 rounded-[2rem] border border-border shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-11 rounded-xl bg-muted border-none text-foreground h-12 focus:ring-primary transition-all font-medium text-xs" placeholder="Rechercher un article..." />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-border text-foreground font-black uppercase tracking-widest text-[9px] h-12 px-6 hover:bg-muted transition-all">
            <Filter className="mr-2 h-4 w-4" /> Filtres
          </Button>
          <select className="flex-1 md:flex-none h-12 bg-muted border border-border rounded-xl px-6 text-foreground text-[9px] font-black uppercase tracking-widest focus:ring-primary outline-none cursor-pointer">
            <option>Tous les statuts</option>
            <option>Publié</option>
            <option>Brouillon</option>
            <option>Archivé</option>
          </select>
        </div>
      </div>

      {/* Table / List View */}
      <div className="bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-8 py-5 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Article</th>
                <th className="px-8 py-5 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] hidden md:table-cell">Auteur</th>
                <th className="px-8 py-5 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Statut</th>
                <th className="px-8 py-5 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] hidden sm:table-cell">Vues</th>
                <th className="px-8 py-5 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id} className="group hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4 min-w-[250px]">
                      <div className="h-12 w-12 rounded-2xl bg-muted overflow-hidden border border-border flex-shrink-0">
                        <img src={`https://images.unsplash.com/photo-${1500000000000 + article.id}?w=100&h=100&fit=crop`} alt="" className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="font-black text-foreground text-sm tracking-tight group-hover:text-primary transition-colors line-clamp-1 italic uppercase">{article.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{article.category}</span>
                          <div className="h-1 w-1 rounded-full bg-border" />
                          <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 hidden md:table-cell">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-primary font-black text-[9px]">{article.author.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground/80 uppercase tracking-tight">{article.author}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <Badge className={`
                      rounded-lg py-1 px-3 text-[8px] font-black tracking-widest uppercase border-none
                      ${article.status === 'Publié' ? 'bg-emerald-500/10 text-emerald-500' : 
                        article.status === 'Brouillon' ? 'bg-amber-500/10 text-amber-500' : 
                        'bg-muted text-muted-foreground'}
                    `}>
                      {article.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-5 hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-foreground font-black text-xs">
                      <Eye className="h-4 w-4 text-muted-foreground" /> {article.views}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Link href={`/admin/articles/${article.id}`}><Edit2 className="h-4 w-4" /></Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-card border-border rounded-2xl p-2 shadow-2xl">
                          <DropdownMenuItem className="rounded-xl focus:bg-muted focus:text-foreground p-3 cursor-pointer group">
                            <ExternalLink className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Voir sur le site</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl focus:bg-destructive/10 focus:text-destructive p-3 cursor-pointer group">
                            <Trash2 className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-destructive" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-destructive">Supprimer définitivement</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between bg-muted/20 gap-6">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center sm:text-left">Affichage 1-5 sur 5 articles</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled className="h-10 w-10 rounded-xl border-border text-muted-foreground/30">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-10 w-10 rounded-xl bg-primary text-white font-black text-[10px]">1</Button>
            <Button variant="outline" size="icon" disabled className="h-10 w-10 rounded-xl border-border text-muted-foreground/30">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

