import { Calendar, Users, FileText, Bell, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Calendar,
    title: "Réservation Facile",
    description: "Prenez rendez-vous en quelques clics, 24h/24, depuis votre téléphone ou ordinateur.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Médecins Qualifiés",
    description: "Accédez à un large réseau de médecins certifiés dans toutes les spécialités.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileText,
    title: "Dossier Médical",
    description: "Consultez votre historique médical, ordonnances et certificats en ligne.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Bell,
    title: "Rappels Automatiques",
    description: "Recevez des notifications SMS et email pour ne jamais manquer vos rendez-vous.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Shield,
    title: "Données Sécurisées",
    description: "Vos informations médicales sont protégées selon les normes les plus strictes.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    title: "Gain de Temps",
    description: "Fini les files d'attente. Optimisez votre temps avec notre système intelligent.",
    color: "bg-accent/10 text-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Fonctionnalités
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tout ce dont vous avez besoin pour gérer votre santé
          </h2>
          <p className="text-muted-foreground">
            SmartMed offre une solution complète pour patients, médecins et administrateurs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;