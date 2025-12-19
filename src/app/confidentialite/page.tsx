import { Badge } from "@/components/ui/badge";

export default function ConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-6">
          <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Protection des données
          </Badge>
          <h1 className="text-6xl font-black tracking-tighter">Confidentialité.</h1>
        </div>

        <div className="prose prose-zinc lg:prose-xl max-w-none space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Collecte des données</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Nous collectons les informations que vous nous fournissez directement, notamment lors de votre inscription à notre newsletter ou via notre formulaire de contact. Ces données incluent généralement votre nom et votre adresse e-mail.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Utilisation des données</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Vos données sont utilisées exclusivement pour vous envoyer nos actualités et répondre à vos demandes de contact. Nous ne vendons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Vos droits</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Conformément à la réglementation sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à l'adresse privacy@gam-media.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
