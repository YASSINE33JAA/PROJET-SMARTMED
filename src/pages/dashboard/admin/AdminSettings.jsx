import { motion } from "framer-motion";
import { Settings, Bell, Shield, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout role="admin" userName="Administrateur">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Paramètres</h1>

        <div className="grid gap-6 max-w-2xl">

          {/* Général */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />Général
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>Nom de la plateforme</Label>
                <Input defaultValue="SmartMed" />
              </div>
              <div className="space-y-1">
                <Label>Email de contact</Label>
                <Input defaultValue="contact@smartmed.ma" />
              </div>
              <div className="space-y-1">
                <Label>Langue par défaut</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Notifications email", desc: "Envoyer les notifications par email", default: true },
                { label: "Notifications SMS", desc: "Envoyer les notifications par SMS", default: false },
                { label: "Alertes système", desc: "Notifications pour les événements critiques", default: true },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between">
                  <div>
                    <Label>{n.label}</Label>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.default} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Mode maintenance</Label>
                  <p className="text-sm text-muted-foreground">Activer le mode maintenance</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Inscription ouverte</Label>
                  <p className="text-sm text-muted-foreground">Permettre les nouvelles inscriptions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Bouton Sauvegarder */}
          <Button
            variant="hero"
            onClick={() =>
              toast({
                title: "Paramètres sauvegardés",
                description: "Les paramètres ont été mis à jour avec succès.",
              })
            }
          >
            <Save className="w-4 h-4 mr-2" />Sauvegarder
          </Button>

        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminSettings;