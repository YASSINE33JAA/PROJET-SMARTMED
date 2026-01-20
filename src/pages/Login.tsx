import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in production, connect to backend
    navigate("/dashboard/patient");
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Smart<span className="text-primary">Med</span>
            </span>
          </Link>

          <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Bon retour parmi nous
            </h1>
            <p className="text-muted-foreground mb-8">
              Connectez-vous à votre espace SmartMed
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Se connecter
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>

          {/* Demo access */}
          <div className="mt-6 p-4 bg-accent/50 rounded-xl">
            <p className="text-sm text-center text-muted-foreground">
              <strong>Demo:</strong> Accès rapide aux tableaux de bord
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigate("/dashboard/patient")}
              >
                Patient
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigate("/dashboard/medecin")}
              >
                Médecin
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigate("/dashboard/admin")}
              >
                Admin
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-primary-foreground max-w-md"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8">
            <Stethoscope className="w-10 h-10" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">
            Gérez votre santé en toute simplicité
          </h2>
          <p className="text-primary-foreground/80">
            Accédez à vos rendez-vous, consultez votre dossier médical et 
            prenez soin de votre santé depuis un seul endroit.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
