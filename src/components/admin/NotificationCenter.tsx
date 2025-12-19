"use client";

import { Bell, Check, Info, AlertTriangle, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const initialNotifications = [
  {
    id: 1,
    title: "Nouvel article publié",
    description: "Amadou Diallo a publié 'L'émergence des Smart Cities'.",
    time: "Il y a 2 min",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Alerte de sécurité",
    description: "Tentative de connexion suspecte détectée.",
    time: "Il y a 1 heure",
    type: "warning",
    read: false,
  },
  {
    id: 3,
    title: "Mise à jour système",
    description: "La version 2.4 du dashboard est disponible.",
    time: "Il y a 5 heures",
    type: "info",
    read: true,
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-muted group">
          <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96 bg-card border-border rounded-2xl p-0 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              onClick={markAllAsRead}
              className="h-auto p-0 text-[8px] font-black uppercase tracking-widest text-primary hover:bg-transparent"
            >
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-4 border-b border-border last:border-0 transition-colors flex gap-4 group relative",
                  !notification.read ? "bg-primary/5" : "hover:bg-muted/30"
                )}
              >
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                  notification.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                  notification.type === 'warning' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                  "bg-blue-500/10 border-blue-500/20 text-blue-500"
                )}>
                  {notification.type === 'success' ? <Check className="h-4 w-4" /> :
                   notification.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                   <Info className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn(
                      "text-[10px] font-black uppercase tracking-tight truncate",
                      !notification.read ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {notification.title}
                    </p>
                    <span className="text-[8px] font-bold text-muted-foreground whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-[8px] font-black uppercase tracking-widest text-primary hover:underline"
                      >
                        Lu
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="text-[8px] font-black uppercase tracking-widest text-destructive hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Bell className="h-6 w-6" />
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Aucune notification</p>
            </div>
          )}
        </div>
        <div className="p-3 border-t border-border bg-muted/30 text-center">
          <Button variant="ghost" className="w-full h-8 text-[9px] font-black uppercase tracking-widest hover:bg-muted">
            Voir tout l'historique
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
