"use client";

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SocialShare({ url, title }: { url: string; title: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Lien copié !");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center">
        <Share2 className="h-4 w-4 mr-1" /> Partager :
      </span>
      <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')}>
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank')}>
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`, '_blank')}>
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={copyToClipboard}>
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
