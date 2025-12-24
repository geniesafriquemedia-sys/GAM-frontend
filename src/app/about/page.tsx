import { Badge } from "@/components/ui/badge";
import { Globe, Users, Target, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatKPIWithPlus, formatKPINumber } from "@/types";

// Revalidate every 10 minutes
export const revalidate = 600;

export default async function AboutPage() {
  // Fetch KPIs from API
  let kpis = null;
  try {
    kpis = await api.kpi.getPlatformKPIServer();
  } catch (error) {
    console.error('Failed to fetch KPIs:', error);
  }

  // Stats with real data from database (no simulated values)
  const stats = [
    {
      label: "Articles publiés",
      value: kpis?.total_articles ? formatKPIWithPlus(kpis.total_articles) : "0"
    },
    {
      label: "Lecteurs mensuels",
      value: kpis?.monthly_readers ? formatKPINumber(kpis.monthly_readers) : "0"
    },
    {
      label: "Pays couverts",
      value: kpis?.countries_covered?.toString() || "0"
    },
    {
      label: "Experts TV",
      value: kpis?.tv_experts ? formatKPIWithPlus(kpis.tv_experts) : "0"
    },
  ];

  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8">
            <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Qui sommes-nous
            </Badge>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-gradient">
              Génies Afrique Médias.
            </h1>
            <p className="text-2xl md:text-4xl font-medium text-muted-foreground leading-tight">
              Le média de référence qui célèbre l'innovation, la culture et l'excellence du continent africain.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl rotate-2">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              alt="Notre Vision"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Notre Vision.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                Nous croyons en une Afrique dynamique, technologique et fière de ses racines. GAM est né de la volonté de raconter le continent autrement, loin des clichés habituels.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-secondary/50 rounded-[3rem] space-y-4 border border-primary/5">
                <Target className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-black tracking-tight">Mission</h3>
                <p className="text-sm text-muted-foreground font-medium">Inspirer la nouvelle génération de bâtisseurs africains.</p>
              </div>
              <div className="p-8 bg-primary/5 rounded-[3rem] space-y-4 border border-primary/10">
                <Award className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-black tracking-tight">Excellence</h3>
                <p className="text-sm text-muted-foreground font-medium">Produire des contenus de haute qualité journalistique.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-zinc-950 py-32 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2 text-center">
                <p className="text-5xl md:text-7xl font-black tracking-tighter text-primary">{stat.value}</p>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="container mx-auto px-4">
        <div className="rounded-[4rem] bg-secondary/30 p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">Rejoignez <br /> l'aventure GAM.</h2>
            <p className="text-xl text-muted-foreground font-medium">
              Vous êtes passionné par l'Afrique et l'innovation ? Nous sommes toujours à la recherche de nouveaux talents.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <Button size="lg" className="h-16 px-10 rounded-3xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20">
                Postuler maintenant
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-3xl border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-xs">
                Nous contacter
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
