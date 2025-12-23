import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Handshake,
  ArrowRight,
  Mail,
  // TODO: Décommenter quand le contenu sera prêt
  // TrendingUp,
  // Users,
  // Globe,
  // Megaphone,
  // BarChart3,
  // CheckCircle,
  // Building2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Devenir Partenaire | GAM",
  description: "Rejoignez GAM en tant que partenaire et touchez une audience panafricaine engagée. Découvrez nos offres de partenariat média.",
};

// TODO: Décommenter quand le contenu sera prêt
// const benefits = [
//   {
//     icon: Users,
//     title: "Audience qualifiée",
//     description: "Accédez à une communauté de décideurs, entrepreneurs et innovateurs africains.",
//   },
//   {
//     icon: Globe,
//     title: "Rayonnement panafricain",
//     description: "Étendez votre visibilité sur tout le continent africain et sa diaspora.",
//   },
//   {
//     icon: Megaphone,
//     title: "Contenus sur-mesure",
//     description: "Bénéficiez de formats publicitaires et éditoriaux adaptés à vos objectifs.",
//   },
//   {
//     icon: BarChart3,
//     title: "Mesure d'impact",
//     description: "Suivez les performances de vos campagnes avec des rapports détaillés.",
//   },
// ];

// const partnershipTypes = [
//   {
//     name: "Partenaire Média",
//     description: "Sponsoring d'articles, vidéos et rubriques thématiques.",
//     features: [
//       "Logo sur la page d'accueil",
//       "Articles sponsorisés",
//       "Mentions dans la newsletter",
//       "Rapports mensuels",
//     ],
//   },
//   {
//     name: "Partenaire Premium",
//     description: "Visibilité maximale avec des contenus exclusifs et des événements.",
//     features: [
//       "Tout du Pack Média",
//       "Vidéos sponsorisées Web TV",
//       "Interviews exclusives",
//       "Invitations aux événements GAM",
//       "Contenus sur les réseaux sociaux",
//     ],
//   },
//   {
//     name: "Partenaire Stratégique",
//     description: "Collaboration à long terme pour des projets d'envergure.",
//     features: [
//       "Tout du Pack Premium",
//       "Co-création de contenus",
//       "Séries documentaires dédiées",
//       "Présence lors des événements majeurs",
//       "Accès aux études et insights",
//     ],
//   },
// ];

export default function PartenariatsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-xs">
              <Handshake className="h-5 w-5" />
              <span>Partenariats</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              Ensemble, <br />
              <span className="text-primary">amplifions</span> l'Afrique.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Associez votre marque à un média innovant et engagé.
              Touchez une audience africaine qualifiée et passionnée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                asChild
              >
                <Link href="/contact">
                  Nous contacter <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs"
                asChild
              >
                <a href="mailto:partenariats@gam.africa">
                  <Mail className="mr-2 h-5 w-5" /> partenariats@gam.africa
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Décommenter les sections suivantes quand le contenu sera prêt */}

      {/* Stats Section */}
      {/* <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "500K+", label: "Visiteurs mensuels" },
              { value: "50K+", label: "Abonnés newsletter" },
              { value: "25+", label: "Pays touchés" },
              { value: "100K+", label: "Followers sociaux" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      {/* <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              GAM vous offre une visibilité unique auprès d'une audience engagée et influente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <benefit.icon className="h-7 w-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Partnership Types */}
      {/* <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Nos formules de partenariat
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions adaptées à vos objectifs et à votre budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partnershipTypes.map((type, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border transition-all ${
                  i === 1
                    ? 'bg-primary text-white border-primary scale-105 shadow-2xl shadow-primary/20'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className={`h-6 w-6 ${i === 1 ? 'text-white' : 'text-primary'}`} />
                  <h3 className="text-2xl font-black tracking-tight">{type.name}</h3>
                </div>
                <p className={`mb-8 font-medium ${i === 1 ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {type.description}
                </p>
                <ul className="space-y-3">
                  {type.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${i === 1 ? 'text-white' : 'text-primary'}`} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-8 h-12 rounded-xl font-bold ${
                    i === 1
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                  asChild
                >
                  <Link href="/contact">En savoir plus</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-[3rem] bg-foreground text-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px]" />

            <div className="relative z-10 space-y-8">
              <TrendingUp className="h-16 w-16 mx-auto text-primary" />

              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                Prêt à booster <br />votre visibilité en Afrique ?
              </h2>

              <p className="text-xl text-background/70 font-medium max-w-xl mx-auto">
                Contactez notre équipe partenariats pour discuter de vos objectifs
                et recevoir une proposition personnalisée.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs"
                  asChild
                >
                  <Link href="/contact">
                    Contactez-nous <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
