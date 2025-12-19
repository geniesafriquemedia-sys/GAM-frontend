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
  Video,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-6 left-6 z-[100]">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-2xl bg-background/80 backdrop-blur-md border-border shadow-xl"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-card border-r border-border flex flex-col h-screen z-[95] transition-transform duration-500 lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <Link href="/" className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-2">
            GAM<span className="text-primary italic">.admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 mt-2">Menu Principal</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                  <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active" className="h-1 w-1 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="bg-muted rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 relative overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop" 
                    alt="Admin" 
                    className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-foreground truncate">Amadou Diallo</p>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest truncate">Directeur</p>
                </div>
              </div>

            <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-muted-foreground font-black text-[10px] uppercase tracking-[0.2em] hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all group"
            >
              <LogOut className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Déconnexion
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

import { Button } from "@/components/ui/button";
