import { Link } from "react-router-dom";
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">Smart<span className="text-primary">Med</span></span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Votre plateforme de gestion de rendez-vous médicaux. Simple, rapide et sécurisée.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {[
                { href: "/medecins", label: "Nos Médecins" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Connexion" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Prise de Rendez-vous", "Téléconsultation", "Dossier Médical", "Ordonnances en ligne"].map((service) => (
                <li key={service}><span className="text-sm text-primary-foreground/70">{service}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70"><Mail className="w-4 h-4 text-primary" />contact@smartmed.ma</li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70"><Phone className="w-4 h-4 text-primary" />+212 5 37 00 00 00</li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70"><MapPin className="w-4 h-4 text-primary mt-0.5" />Khémisset, Maroc</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50 text-center">
            © 2026 SmartMed. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
