"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  Sparkles,
  BarChart3,
  Video
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Articles", href: "/admin/articles" },
  { icon: Video, label: "Web TV", href: "/admin/web-tv" },
  { icon: Users, label: "Utilisateurs", href: "/admin/users" },
  { icon: BarChart3, label: "Analyses", href: "/admin/analytics" },
  { icon: Settings, label: "Paramètres", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col h-screen sticky top-0 overflow-hidden">
      <div className="p-10">
        <Link href="/" className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
          GAM<span className="text-primary italic">.admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6">Menu Principal</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active" className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border">
        <div className="bg-muted rounded-[2rem] p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop" 
                  alt="Admin" 
                  className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground truncate">Amadou Diallo</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">Directeur de Publication</p>
              </div>
            </div>

          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-border text-muted-foreground font-black text-xs uppercase tracking-[0.2em] hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all group"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Déconnexion
          </Link>
        </div>
      </div>
    </aside>
  );
}
