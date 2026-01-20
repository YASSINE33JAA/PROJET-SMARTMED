import { Search, CalendarCheck, Bell, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Trouvez votre médecin",
    description: "Recherchez par spécialité, localisation ou nom. Consultez les profils et avis.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Choisissez un créneau",
    description: "Sélectionnez la date et l'heure qui vous conviennent parmi les disponibilités.",
  },
  {
    icon: Bell,
    step: "03",
    title: "Confirmez votre RDV",
    description: "Recevez une confirmation immédiate et des rappels avant votre rendez-vous.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Consultez en toute sérénité",
    description: "Présentez-vous à l'heure. Votre dossier médical est accessible en ligne.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Comment ça marche
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Prenez rendez-vous en 4 étapes simples
          </h2>
          <p className="text-muted-foreground">
            Un processus simplifié pour une expérience sans stress.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="font-display text-3xl font-bold text-primary/20">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
