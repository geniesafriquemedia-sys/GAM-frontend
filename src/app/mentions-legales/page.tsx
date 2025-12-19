import { Badge } from "@/components/ui/badge";

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-6">
          <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Juridique
          </Badge>
          <h1 className="text-6xl font-black tracking-tighter">Mentions Légales.</h1>
        </div>

        <div className="prose prose-zinc lg:prose-xl max-w-none space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Éditeur du site</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Le site <strong>GAM (Génies Afrique Médias)</strong> est édité par la société GAM MEDIA SAS, au capital de 1 000 000 FCFA, immatriculée au Registre du Commerce et des Sociétés de Yaoundé sous le numéro RC/YAO/2023/B/000.
            </p>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Siège social : Cité de l'Innovation, Quartier Bastos, Yaoundé, Cameroun.<br/>
              Directeur de la publication : Équipe de Rédaction GAM.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Hébergement</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Ce site est hébergé par Vercel Inc., situé au 340 S Lemon Ave #1192 Walnut, CA 91789, USA.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Propriété intellectuelle</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              L'ensemble de ce site relève de la législation camerounaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
