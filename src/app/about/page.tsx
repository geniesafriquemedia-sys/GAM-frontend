import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Zap, Globe, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 overflow-hidden bg-zinc-950 text-white pb-48">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8">
            <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] px-6 py-2 border-none">Qui sommes-nous ?</Badge>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]">
              Redéfinir le <br /> récit africain.
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-zinc-400 leading-tight max-w-2xl">
              Génies Afrique Médias (GAM) est bien plus qu'un média. C'est un mouvement dédié à l'excellence, à l'innovation et à la culture du continent.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-20 hidden lg:block translate-y-1/4">
           <Zap className="h-[800px] w-[800px] text-primary" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Zap, 
              title: "Innovation", 
              desc: "Nous explorons les frontières technologiques et les solutions qui transforment nos sociétés." 
            },
            { 
              icon: Globe, 
              title: "Impact", 
              desc: "Nos récits visent à inspirer le changement et à mettre en lumière les initiatives à fort impact." 
            },
            { 
              icon: Heart, 
              title: "Culture", 
              desc: "Nous célébrons l'héritage ancestral tout en accompagnant les créateurs contemporains." 
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] shadow-2xl border border-primary/5 space-y-6 group hover:bg-primary hover:text-white transition-all duration-500">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <item.icon className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter">{item.title}</h3>
              <p className="text-lg font-medium opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop" alt="Team" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </div>
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-primary">Pourquoi GAM ?</h2>
            <div className="space-y-8 text-xl font-medium text-muted-foreground leading-relaxed">
               <p>
                 L'Afrique regorge de génies, d'inventeurs et de créateurs dont les voix sont trop souvent inaudibles dans le vacarme des médias traditionnels.
               </p>
               <p>
                 GAM est né de la volonté de créer une plateforme d'excellence capable de porter ces voix avec la rigueur journalistique et l'esthétique visuelle qu'elles méritent.
               </p>
               <div className="flex items-center gap-6 pt-8">
                  <div className="flex -space-x-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="h-14 w-14 rounded-full border-4 border-background bg-zinc-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                       </div>
                     ))}
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest">Rejoignez l'aventure</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary p-12 md:p-24 rounded-[4rem] text-primary-foreground relative overflow-hidden text-center space-y-8">
           <Users className="h-24 w-24 mx-auto opacity-20" />
           <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight max-w-4xl mx-auto">Prêt à découvrir le meilleur de l'Afrique ?</h2>
           <div className="flex flex-wrap justify-center gap-6 pt-8">
              <Button asChild size="lg" className="rounded-full h-16 px-12 bg-white text-primary font-black text-xl hover:bg-white/90 shadow-2xl">
                 <Link href="/actualites">Explorer le flux</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="rounded-full h-16 px-12 border-white/20 hover:bg-white/10 font-black text-xl">
                 <Link href="/contact">Nous contacter</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
