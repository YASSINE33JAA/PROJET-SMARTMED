import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Shield, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-doctor.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="w-4 h-4" />
              Plateforme sécurisée et certifiée
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Gérez vos{" "}
              <span className="text-gradient">rendez-vous médicaux</span> en
              toute simplicité
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              SmartMed révolutionne la prise de rendez-vous médicaux. 
              Trouvez votre médecin, choisissez votre créneau et confirmez 
              en quelques clics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button variant="hero" size="xl">
                  <Calendar className="w-5 h-5" />
                  Prendre Rendez-vous
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/medecins">
                <Button variant="outline" size="xl">
                  Découvrir nos médecins
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { value: "500+", label: "Médecins" },
                { value: "10k+", label: "Patients" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl lg:text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Médecin SmartMed"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -left-8 bottom-20 bg-card p-4 rounded-2xl shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Disponible 24/7</p>
                    <p className="text-sm text-muted-foreground">Réservez à tout moment</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
