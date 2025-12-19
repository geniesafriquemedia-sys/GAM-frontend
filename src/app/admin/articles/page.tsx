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
    <div className="min-h-screen bg-black flex overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-28 border-b border-white/5 flex items-center justify-between px-12 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Gestion des Articles</h1>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">5 Articles au total</p>
          </div>
          
          <Button asChild className="rounded-2xl h-12 px-8 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
            <Link href="/admin/articles/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nouvel Article
            </Link>
          </Button>
        </header>

        <div className="p-12 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/5 p-6 rounded-[2rem] border border-white/5">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input className="pl-12 rounded-xl bg-black border-white/10 text-white h-12 focus:ring-primary focus:border-primary transition-all font-medium" placeholder="Rechercher un titre ou un auteur..." />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-white/10 text-white font-black uppercase tracking-widest text-[10px] h-12 px-6 hover:bg-white/5">
                <Filter className="mr-2 h-4 w-4" /> Filtres
              </Button>
              <select className="flex-1 md:flex-none h-12 bg-black border border-white/10 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest focus:ring-primary outline-none">
                <option>Tous les statuts</option>
                <option>Publié</option>
                <option>Brouillon</option>
                <option>Archivé</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-8 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Article</th>
                  <th className="p-8 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Auteur</th>
                  <th className="p-8 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Statut</th>
                  <th className="p-8 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Vues</th>
                  <th className="p-8 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {articles.map((article) => (
                  <tr key={article.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-8">
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-2xl bg-white/5 overflow-hidden border border-white/10 flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + article.id}?w=200&h=200&fit=crop`} alt="" className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-white text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-1">{article.title}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{article.category}</span>
                            <div className="h-1 w-1 rounded-full bg-white/10" />
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{article.date}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                          <span className="text-primary font-black text-[10px]">{article.author.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span className="text-sm font-bold text-white/80">{article.author}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <Badge className={`
                        rounded-lg py-1 px-3 text-[9px] font-black tracking-widest uppercase border-none
                        ${article.status === 'Publié' ? 'bg-emerald-500/10 text-emerald-500' : 
                          article.status === 'Brouillon' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-white/10 text-white/40'}
                      `}>
                        {article.status}
                      </Badge>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-2 text-white font-black text-sm">
                        <Eye className="h-4 w-4 text-white/20" /> {article.views}
                      </div>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 text-white/40 hover:text-white">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 text-white/40 hover:text-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 bg-[#0A0A0A] border-white/10 rounded-2xl p-2 shadow-2xl">
                            <DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-white p-3 cursor-pointer group">
                              <ExternalLink className="mr-3 h-4 w-4 text-white/20 group-hover:text-primary" />
                              <span className="text-xs font-black uppercase tracking-widest">Voir sur le site</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-white p-3 cursor-pointer group">
                              <Trash2 className="mr-3 h-4 w-4 text-white/20 group-hover:text-red-500" />
                              <span className="text-xs font-black uppercase tracking-widest text-red-500">Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-8 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Affichage 1-5 sur 5 articles</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled className="h-10 w-10 rounded-xl border-white/10 text-white/20">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" className="h-10 w-10 rounded-xl bg-primary text-white font-black">1</Button>
                </div>
                <Button variant="outline" size="icon" disabled className="h-10 w-10 rounded-xl border-white/10 text-white/20">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
