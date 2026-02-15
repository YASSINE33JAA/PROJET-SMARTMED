import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Téléphone", value: "+212 5 37 00 00 00" },
  { icon: Mail, label: "Email", value: "contact@smartmed.ma" },
  { icon: MapPin, label: "Adresse", value: "Avenue Mohammed V, Khémisset, Maroc" },
  { icon: Clock, label: "Horaires", value: "Lun - Ven: 8h - 18h" },
];

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Contactez-nous
              </h1>
              <p className="text-muted-foreground text-lg">
                Une question ? Notre équipe est là pour vous aider.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-foreground">{item.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input id="name" placeholder="Votre nom" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="votre@email.com" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input id="subject" placeholder="Sujet de votre message" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Votre message..." rows={5} required />
                      </div>
                      <Button variant="hero" type="submit" className="w-full">
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
