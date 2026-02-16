import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Globe, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const PatientSettings = () => {
  const { toast } = useToast();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleChangePassword = () => {
    if (newPw !== confirmPw) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    setShowPasswordDialog(false);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    toast({ title: "Mot de passe modifié", description: "Votre mot de passe a été mis à jour." });
  };

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
              <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>Changer le mot de passe</Button>
              <div className="flex items-center justify-between">
                <div><Label>Authentification à deux facteurs</Label><p className="text-sm text-muted-foreground">Sécurité renforcée pour votre compte</p></div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          <Button variant="hero" onClick={() => toast({ title: "Paramètres sauvegardés" })}><Save className="w-4 h-4" />Sauvegarder</Button>
        </div>
      </motion.div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Changer le mot de passe</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Mot de passe actuel</Label><Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} /></div>
            <div className="space-y-2"><Label>Nouveau mot de passe</Label><Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} /></div>
            <div className="space-y-2"><Label>Confirmer le mot de passe</Label><Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>Annuler</Button>
            <Button variant="hero" onClick={handleChangePassword} disabled={!currentPw || !newPw || !confirmPw}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PatientSettings;
