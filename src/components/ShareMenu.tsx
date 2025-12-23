"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Link2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ShareMenuProps {
    title: string;
    url: string;
}

export function ShareMenu({ title, url }: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'),
            color: "hover:text-blue-500",
        },
        {
            name: "Twitter",
            icon: Twitter,
            action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank'),
            color: "hover:text-sky-500",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank'),
            color: "hover:text-blue-700",
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, '_blank'),
            color: "hover:text-green-500",
        },
        {
            name: "Copier le lien",
            icon: Link2,
            action: () => {
                navigator.clipboard.writeText(url);
                toast.success("Lien copié !");
                setIsOpen(false);
            },
            color: "hover:text-primary",
        },
    ];

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-3 group text-background/60 hover:text-white transition-colors outline-none">
                    <div className={`h-14 w-14 flex items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md transition-all ${isOpen ? 'bg-white/20 border-white/30 text-white' : 'bg-white/5 group-hover:bg-white/10 group-hover:border-white/20'}`}>
                        <Share2 className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Partager</span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl" align="start" sideOffset={10}>
                <div className="grid gap-1">
                    {shareLinks.map((link) => (
                        <Button
                            key={link.name}
                            variant="ghost"
                            className={`w-full justify-start gap-3 h-11 text-muted-foreground ${link.color} transition-colors`}
                            onClick={link.action}
                        >
                            <link.icon className="h-4 w-4" />
                            <span className="font-medium text-sm">{link.name}</span>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
