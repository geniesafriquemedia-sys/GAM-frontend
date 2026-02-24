"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Zap, Globe, Smartphone, Tv, Users } from "lucide-react";
import { AnimatedWord, AnimatedText } from "@/components/AnimatedText";

// FAQ Data selon la vision GAM
const faqCategories = [
  {
    id: "general",
    title: "Questions Générales",
    icon: HelpCircle,
    questions: [
      {
        q: "Qu'est-ce que GAM (Génies d'Afrique Médias) ?",
        a: "GAM est une plateforme média numérique indépendante lancée par AFRITECK INSTITUT. Notre mission est de révéler les talents africains, promouvoir l'innovation, l'éducation, la culture et informer sur les initiatives positives à travers des articles approfondis, interviews et reportages vidéo."
      },
      {
        q: "Qui se cache derrière GAM ?",
        a: "GAM est une initiative d'AFRITECK INSTITUT, organisation dédiée à la promotion de l'innovation technologique et culturelle en Afrique. Notre équipe est composée de journalistes, créateurs de contenu et experts passionnés par le développement du continent africain."
      },
      {
        q: "Comment GAM est-il financé ?",
        a: "GAM est une plateforme indépendante financée par AFRITECK INSTITUT. Nous assurons notre liberté éditoriale grâce à un modèle basé sur les partenariats stratégiques, la publicité ciblée et le soutien de nos lecteurs."
      },
      {
        q: "Quelle est la ligne éditoriale de GAM ?",
        a: "Notre ligne éditoriale est axée sur le journalisme constructif : nous mettons en lumière les talents, innovations et solutions africaines tout en maintenant une rigueur journalistique. Nous couvrons l'innovation, l'éducation, la culture, l'entrepreneuriat et les initiatives de développement durable."
      }
    ]
  },
  {
    id: "pwa",
    title: "Application & PWA",
    icon: Smartphone,
    questions: [
      {
        q: "Comment installer l'application GAM sur mon téléphone ?",
        a: "GAM est une Progressive Web App (PWA) que vous pouvez installer directement depuis votre navigateur : Sur iOS : Ouvrez Safari, cliquez sur le bouton de partage, puis 'Sur l'écran d'accueil'. Sur Android : Ouvrez Chrome, cliquez sur le menu (3 points), puis 'Installer l'application' ou 'Ajouter à l'écran d'accueil'."
      },
      {
        q: "Quelle est la différence entre la PWA et le site web ?",
        a: "La PWA vous offre une expérience similaire à une application native : accès rapide depuis l'écran d'accueil, fonctionnement offline pour consulter les contenus déjà chargés, notifications push (bientôt), chargement plus rapide et interface optimisée sans barre d'adresse."
      },
      {
        q: "L'application fonctionne-t-elle sans connexion internet ?",
        a: "Oui ! Grâce à notre technologie PWA, vous pouvez consulter les articles et vidéos déjà chargés même en mode hors ligne. Le contenu est automatiquement mis en cache lors de votre navigation."
      },
      {
        q: "Puis-je recevoir des notifications ?",
        a: "Les notifications push sont en cours de déploiement. Vous pourrez bientôt recevoir des alertes pour les breaking news, nouveaux articles de vos catégories favorites et vidéos exclusives."
      }
    ]
  },
  {
    id: "content",
    title: "Contenus & Web TV",
    icon: Tv,
    questions: [
      {
        q: "À quelle fréquence publiez-vous du nouveau contenu ?",
        a: "Nous publions quotidiennement des articles d'actualité et des analyses approfondies. Notre Web TV propose de nouvelles vidéos plusieurs fois par semaine : interviews, reportages, documentaires et émissions spéciales."
      },
      {
        q: "Comment accéder à la Web TV de GAM ?",
        a: "Notre Web TV est accessible directement depuis le menu principal du site. Vous y trouverez toutes nos productions vidéo organisées par catégories : interviews de personnalités, reportages terrain, documentaires culturels et émissions thématiques."
      },
      {
        q: "Puis-je proposer un sujet ou une personnalité à interviewer ?",
        a: "Absolument ! Nous encourageons les suggestions de notre communauté. Contactez-nous via notre page de contact avec vos propositions. Nous étudions chaque suggestion avec attention."
      },
      {
        q: "Comment suivre mes sujets préférés ?",
        a: "Vous pouvez explorer nos différentes catégories (Innovation, Culture, Éducation, Entrepreneuriat...) et utiliser notre fonction de recherche pour trouver des contenus spécifiques. Bientôt, vous pourrez créer un compte pour personnaliser votre expérience."
      }
    ]
  },
  {
    id: "engagement",
    title: "Participer & Contribuer",
    icon: Users,
    questions: [
      {
        q: "Comment partager un article ou une vidéo ?",
        a: "Chaque article et vidéo dispose d'un bouton de partage permettant de diffuser le contenu sur Facebook, Twitter, LinkedIn, WhatsApp ou par email. Vous pouvez également copier le lien pour le partager où vous voulez."
      },
      {
        q: "Puis-je contribuer en tant que journaliste ou créateur ?",
        a: "Oui ! GAM est ouvert aux contributions de journalistes, photographes, vidéastes et experts. Contactez-nous via notre page Partenariats pour discuter des opportunités de collaboration."
      },
      {
        q: "Comment devenir partenaire de GAM ?",
        a: "Nous recherchons constamment des partenaires stratégiques alignés avec notre vision. Visitez notre page Partenariats pour découvrir les différentes formes de collaboration possibles : partenariats médiatiques, sponsoring, co-productions..."
      },
      {
        q: "Y a-t-il une newsletter GAM ?",
        a: "Oui ! Inscrivez-vous à notre newsletter depuis le footer du site pour recevoir chaque semaine notre sélection des meilleurs articles, vidéos exclusives et analyses approfondies directement dans votre boîte mail."
      }
    ]
  },
  {
    id: "technical",
    title: "Questions Techniques",
    icon: Zap,
    questions: [
      {
        q: "Sur quels appareils puis-je utiliser GAM ?",
        a: "GAM est optimisé pour tous les appareils : smartphones (iOS & Android), tablettes, ordinateurs (Windows, Mac, Linux) et même smart TV via le navigateur. Notre design responsive s'adapte automatiquement à votre écran."
      },
      {
        q: "Quels navigateurs sont supportés ?",
        a: "GAM fonctionne sur tous les navigateurs modernes : Chrome, Firefox, Safari, Edge et Opera. Pour une expérience optimale, nous recommandons d'utiliser la dernière version de votre navigateur."
      },
      {
        q: "Pourquoi les vidéos ne se chargent pas ?",
        a: "Vérifiez votre connexion internet. Nos vidéos sont hébergées sur YouTube pour garantir une qualité optimale. Si le problème persiste, essayez de vider le cache de votre navigateur ou contactez-nous."
      },
      {
        q: "Comment signaler un problème technique ?",
        a: "Si vous rencontrez un bug ou un problème technique, contactez-nous via notre page Contact en décrivant le problème, votre appareil et votre navigateur. Nous vous répondrons dans les plus brefs délais."
      }
    ]
  },
  {
    id: "coverage",
    title: "Couverture Géographique",
    icon: Globe,
    questions: [
      {
        q: "GAM couvre-t-il toute l'Afrique ?",
        a: "Oui ! Notre vocation est panafricaine. Nous couvrons l'actualité, les innovations et les talents des 54 pays africains, avec une attention particulière aux histoires locales qui inspirent le continent entier."
      },
      {
        q: "Couvrez-vous aussi la diaspora africaine ?",
        a: "Absolument ! La diaspora africaine joue un rôle majeur dans le développement du continent. Nous mettons régulièrement en lumière les initiatives, succès et contributions des Africains et afro-descendants à travers le monde."
      },
      {
        q: "Dans quelles langues publiez-vous ?",
        a: "Actuellement, GAM publie principalement en français. Nous travaillons à l'ajout de contenus en anglais, arabe et langues africaines pour refléter la diversité linguistique du continent."
      }
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6"
            {...fadeInUp}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4"
            >
              <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
              Questions Fréquentes
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tout ce que vous devez savoir sur{" "}
              <span className="font-bold text-primary">GAM - Génies d'Afrique Médias</span>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container max-w-5xl">
          <motion.div
            className="space-y-12 sm:space-y-16 md:space-y-20"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {faqCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  variants={fadeInUp}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions Accordion */}
                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-3 sm:space-y-4"
                  >
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem
                        key={`${category.id}-${qIdx}`}
                        value={`${category.id}-${qIdx}`}
                        className="border border-border/50 rounded-2xl px-4 sm:px-6 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
                      >
                        <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-bold hover:text-primary py-4 sm:py-5">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 sm:mt-20 md:mt-24 p-6 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-black text-sm sm:text-base uppercase tracking-wider hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
              >
                Nous Contacter
              </a>
              <a
                href="/partenariats"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-background border-2 border-primary text-primary rounded-full font-black text-sm sm:text-base uppercase tracking-wider hover:bg-primary/5 transition-all"
              >
                Devenir Partenaire
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
