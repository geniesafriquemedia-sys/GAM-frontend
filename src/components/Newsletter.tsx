"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Merci pour votre inscription !");
      setEmail("");
    }
  };

  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Restez informé</h2>
          <p className="text-muted-foreground">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, innovations et reportages exclusifs de GAM directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="votre@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full"
            />
            <Button type="submit" className="rounded-full px-8">
              S'inscrire
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            En vous inscrivant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </div>
    </section>
  );
}
