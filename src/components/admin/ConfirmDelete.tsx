"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface ConfirmDeleteProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  trigger?: ReactNode;
}

export function ConfirmDelete({ 
  onConfirm, 
  title = "Êtes-vous sûr ?", 
  description = "Cette action est irréversible. Cela supprimera définitivement cet élément de nos serveurs.",
  trigger 
}: ConfirmDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-[2rem] border-border bg-card shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 gap-3">
          <AlertDialogCancel className="rounded-xl border-border font-black text-[10px] uppercase tracking-widest h-12 px-6">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-black text-[10px] uppercase tracking-widest h-12 px-6 shadow-lg shadow-destructive/20"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
