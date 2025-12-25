"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Linkedin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { contactService, validateContactForm } from "@/lib/api/services/engagement.service";
import type { ContactRequest } from "@/types";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactRequest>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactRequest, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});

    try {
      const response = await contactService.send(formData);
      setSubmitStatus("success");
      setSubmitMessage(response.message || "Votre message a été envoyé avec succès !");
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      setSubmitStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.";
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Header */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8">
            <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Contactez-nous
            </Badge>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-gradient">
              Parlons de <br/> l'Afrique.
            </h1>
            <p className="text-2xl md:text-4xl font-medium text-muted-foreground leading-tight">
              Une question, un projet ou simplement envie de nous dire bonjour ? Notre équipe est à votre écoute.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 translate-x-1/4 -z-10" />
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-16">
            <div className="space-y-12">
              <div className="flex gap-8 items-start group">
                <div className="h-16 w-16 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">E-mail</h3>
                  <p className="text-2xl font-black tracking-tight">geniesdafriquemedia@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="h-16 w-16 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Téléphone</h3>
                  <p className="text-2xl font-black tracking-tight">+241 66 79 76 00</p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="h-16 w-16 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Siège Social</h3>
                  <p className="text-2xl font-black tracking-tight">Cité de l'Innovation, <br/>Yaoundé, Cameroun</p>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[3rem] bg-zinc-950 text-white space-y-8">
              <h3 className="text-2xl font-black tracking-tight">Suivez-nous</h3>
              <div className="flex gap-6">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-16 rounded-[4rem] bg-secondary/20 border border-primary/5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter">Envoyez un message.</h2>
              <p className="text-muted-foreground font-medium">Nous vous répondrons sous 24h.</p>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 text-green-700 border border-green-200">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-700 border border-red-200">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-black uppercase tracking-widest px-1">Nom Complet</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom et prénom"
                    className={`h-16 px-6 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-primary ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-sm px-1">{errors.name}</p>}
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest px-1">E-mail</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className={`h-16 px-6 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-primary ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-sm px-1">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="subject" className="text-xs font-black uppercase tracking-widest px-1">Sujet</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Partenariat, Presse, Publicité, Autre..."
                  className={`h-16 px-6 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-primary ${errors.subject ? 'ring-2 ring-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="text-red-500 text-sm px-1">{errors.subject}</p>}
              </div>
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest px-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande ou votre projet..."
                  className={`min-h-[200px] p-6 rounded-[2rem] bg-white border-none shadow-sm focus-visible:ring-primary resize-none ${errors.message ? 'ring-2 ring-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-500 text-sm px-1">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-20 rounded-3xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message <Send className="ml-3 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
