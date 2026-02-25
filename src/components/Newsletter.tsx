"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Send, Loader2, CheckCircle2, AlertCircle, Twitter, Facebook, Youtube, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { newsletterService, isValidEmail } from "@/lib/api/services/engagement.service";
import Link from "next/link";

// ─── Confetti particle (CSS-only) ────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: "square" | "circle" | "triangle";
}

function ConfettiEffect({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) { setParticles([]); return; }
    const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899", "#f97316"];
    const shapes: Particle["shape"][] = ["square", "circle", "triangle"];
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 10,
        duration: 1.2 + Math.random() * 1.5,
        delay: Math.random() * 0.6,
        rotation: Math.random() * 720 - 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }))
    );
    const t = setTimeout(() => setParticles([]), 3000);
    return () => clearTimeout(t);
  }, [active]);

  if (!particles.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            width: p.size,
            height: p.size,
            backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
            borderLeft: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
            borderRight: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
            borderBottom: p.shape === "triangle" ? `${p.size}px solid ${p.color}` : undefined,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(400px) rotate(var(--rot, 360deg)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Social links ─────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    name: "Twitter / X",
    href: "https://x.com/geniesdafriquemedia",
    icon: Twitter,
    color: "hover:bg-black hover:text-white hover:border-black",
    label: "X",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/geniesdafriquemedia",
    icon: Facebook,
    color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    label: "FB",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@geniesdafriquemedia",
    icon: Youtube,
    color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
    label: "YT",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/geniesdafriquemedia",
    icon: Instagram,
    color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
    label: "IG",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confetti, setConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Real-time email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError && val) setEmailError("");
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!email.trim()) {
      setEmailError("Veuillez entrer votre adresse email");
      inputRef.current?.focus();
      return;
    }
    if (!isValidEmail(email.trim())) {
      setEmailError("Adresse email invalide (ex: vous@exemple.com)");
      inputRef.current?.focus();
      return;
    }

    setEmailError("");
    setIsLoading(true);
    setStatus("idle");

    try {
      await newsletterService.subscribe(email.trim(), "homepage");
      setStatus("success");
      setConfetti(true);
      setEmail("");
      setTimeout(() => setConfetti(false), 100); // reset so re-trigger works
    } catch (error) {
      const err = error as { message?: string; status?: number };
      if (err?.message?.includes("déjà inscrit") || err?.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
        setErrorMsg("Une erreur est survenue. Veuillez réessayer dans quelques instants.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full px-4 py-24">
      {/* African-inspired background pattern */}
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[3rem] bg-foreground text-background shadow-[0_50px_100px_-20px_rgba(0,0,0,0.35)]"
        >
          {/* Confetti */}
          <ConfettiEffect active={confetti} />

          {/* Background pattern – adinkra-inspired SVG */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3Ccircle cx='40' cy='40' r='18' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Cpath d='M40 22 L40 58 M22 40 L58 40' stroke='%23ffffff' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Decorative icons */}
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 opacity-[0.04] pointer-events-none">
            <Mail className="h-[36rem] w-[36rem]" />
          </div>
          <div className="absolute -bottom-20 -left-20 opacity-[0.04] pointer-events-none">
            <Send className="h-[28rem] w-[28rem]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center p-10 md:p-20">
            {/* Left: Copy */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <Mail className="h-4 w-4" />
                  <span>Communauté Exclusive</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
                  L'Afrique <br /> dans votre <br />
                  <span className="text-primary italic">boîte mail</span>.
                </h2>
                <p className="text-background/60 text-lg font-medium max-w-sm leading-relaxed">
                  Rejoignez notre communauté. Pas de bruit, juste des pépites soigneusement sélectionnées.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-background/40">
                  Suivez-nous
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {SOCIAL_LINKS.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-background/70 font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 ${social.color}`}
                    >
                      <social.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{social.name}</span>
                      <span className="sm:hidden">{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[2.5rem] border border-white/10 shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="h-10 w-10 text-green-400" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black tracking-tight">Bienvenue dans la communauté !</h3>
                      <p className="text-background/60 text-sm font-medium leading-relaxed">
                        Vous recevrez bientôt les meilleures pépites africaines directement dans votre boîte mail.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs font-bold text-background/40 hover:text-background/70 underline transition-colors"
                    >
                      S'inscrire avec une autre adresse
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="newsletter-email"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-background/40 ml-4 block"
                      >
                        Adresse Email
                      </label>
                      <div className="relative group">
                        <Mail className={`absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          emailError ? "text-red-400" : "text-background/40 group-focus-within:text-primary"
                        }`} />
                        <input
                          ref={inputRef}
                          id="newsletter-email"
                          type="email"
                          placeholder="votre@futur.com"
                          value={email}
                          onChange={handleEmailChange}
                          disabled={isLoading}
                          className={`w-full bg-white/5 border rounded-3xl pl-16 pr-6 py-6 text-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                            emailError
                              ? "border-red-400/60 focus:ring-red-400/30"
                              : "border-white/10 focus:ring-primary/50"
                          }`}
                        />
                      </div>

                      {/* Inline validation error */}
                      <AnimatePresence>
                        {emailError && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 ml-4 overflow-hidden"
                          >
                            <AlertCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                            <p className="text-xs text-red-400 font-medium">{emailError}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Duplicate / error messages */}
                    <AnimatePresence>
                      {status === "duplicate" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-4"
                        >
                          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-300 font-medium">
                            Cette adresse est déjà inscrite à notre newsletter. Merci pour votre fidélité !
                          </p>
                        </motion.div>
                      )}
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4"
                        >
                          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-300 font-medium">{errorMsg}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-20 rounded-3xl bg-primary text-primary-foreground hover:bg-primary/90 font-black text-xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : (
                        <>
                          Rejoindre le mouvement
                          <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[10px] text-background/30 font-medium leading-relaxed">
                      Pas de spam. Désinscription en un clic. En vous inscrivant, vous acceptez
                      notre politique de confidentialité.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
