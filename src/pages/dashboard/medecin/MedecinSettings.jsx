import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Save, User } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const MedecinSettings = () => {
  const { toast } = useToast();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleChangePassword = () => {
    if (newPw !== confirmPw) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    setShowPasswordDialog(false);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour.",
    });
  };

  return (
    <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          Paramètres
        </h1>

        <div className="grid gap-6 max-w-2xl">
          {/* Profil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profil professionnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Spécialité</Label>
                  <Input defaultValue="Médecine Générale" />
                </div>

                <div className="space-y-2">
                  <Label>N° Ordre</Label>
                  <Input defaultValue="MED-2024-1234" />
                </div>

                <div className="space-y-2">
                  <Label>Prix consultation</Label>
                  <Input defaultValue="200 DH" />
                </div>

                <div className="space-y-2">
                  <Label>Durée consultation</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Nouveau rendez-vous",
                  desc: "Notification quand un patient prend RDV",
                },
                {
                  label: "Annulation",
                  desc: "Notification quand un RDV est annulé",
                },
                {
                  label: "Rappels",
                  desc: "Rappels des RDV du lendemain",
                },
              ].map((n) => (
                <div
                  key={n.label}
                  className="flex items-center justify-between"
                >
                  <div>
                    <Label>{n.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {n.desc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowPasswordDialog(true)}
              >
                Changer le mot de passe
              </Button>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Authentification 2FA</Label>
                  <p className="text-sm text-muted-foreground">
                    Protection renforcée
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Button
            variant="hero"
            onClick={() =>
              toast({ title: "Paramètres sauvegardés" })
            }
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </Button>
        </div>
      </motion.div>

      {/* Dialog Mot de passe */}
      <Dialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le mot de passe</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mot de passe actuel</Label>
              <Input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Nouveau mot de passe</Label>
              <Input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Confirmer le mot de passe</Label>
              <Input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
            >
              Annuler
            </Button>

            <Button
              variant="hero"
              onClick={handleChangePassword}
              disabled={!currentPw || !newPw || !confirmPw}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MedecinSettings;