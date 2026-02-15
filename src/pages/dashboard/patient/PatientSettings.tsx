import { motion } from "framer-motion";
import { Bell, Shield, Globe, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PatientSettings = () => {
  const { toast } = useToast();
  return (
    <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Paramètres</h1>
        <div className="grid gap-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Notifications</CardTitle>
              <CardDescription>Gérez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Rappels de rendez-vous", desc: "Recevoir un rappel avant chaque rendez-vous", default: true },
                { label: "Notifications par email", desc: "Recevoir les notifications par email", default: true },
                { label: "Notifications SMS", desc: "Recevoir les notifications par SMS", default: false },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between">
                  <div><Label>{n.label}</Label><p className="text-sm text-muted-foreground">{n.desc}</p></div>
                  <Switch defaultChecked={n.default} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Préférences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><Label>Langue</Label><p className="text-sm text-muted-foreground">Langue de l'interface</p></div>
                <Select defaultValue="fr">
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" />Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Changer le mot de passe</Button>
              <div className="flex items-center justify-between">
                <div><Label>Authentification à deux facteurs</Label><p className="text-sm text-muted-foreground">Sécurité renforcée pour votre compte</p></div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          <Button variant="hero" onClick={() => toast({ title: "Paramètres sauvegardés" })}><Save className="w-4 h-4" />Sauvegarder</Button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PatientSettings;
