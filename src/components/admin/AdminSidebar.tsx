"use client";

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
  X,
  Shield
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Articles", href: "/admin/articles" },
  { icon: Video, label: "Web TV", href: "/admin/web-tv" },
  { icon: Users, label: "Utilisateurs", href: "/admin/users" },
  { icon: Shield, label: "Permissions", href: "/admin/roles" },
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
      "fixed inset-y-0 left-0 w-72 bg-background/80 backdrop-blur-3xl border-r border-border/50 flex flex-col h-screen z-[95] transition-transform duration-500 lg:translate-x-0 lg:static",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <span className="text-white font-black text-xl italic">G</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground uppercase italic leading-none group-hover:text-primary transition-colors">GAM<span className="text-primary/50">.admin</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-8 overflow-y-auto custom-scrollbar pt-4">
        <div className="space-y-1">
          <p className="px-4 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] mb-4">Navigation</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative",
                  isActive 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110 relative z-10", isActive ? "text-white" : "text-primary/40 group-hover:text-primary")} />
                <span className="font-black text-[10px] uppercase tracking-widest relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill" 
                    className="absolute inset-0 bg-primary rounded-2xl shadow-xl shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
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
