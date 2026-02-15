import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PatientProfile = () => {
  const { toast } = useToast();
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profil mis à jour", description: "Vos informations ont été sauvegardées." });
  };

  return (
    <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Mon Profil</h1>
        <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-foreground">Mohammed Bouabdelli</h2>
                <p className="text-sm text-muted-foreground">Patient</p>
              </div>
              <Button variant="outline" className="w-full">Changer la photo</Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nom</Label><Input defaultValue="Bouabdelli" /></div>
                <div className="space-y-2"><Label>Prénom</Label><Input defaultValue="Mohammed" /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="m.bouabdelli@email.com" /></div>
                <div className="space-y-2"><Label>Téléphone</Label><Input defaultValue="+212 6 12 34 56 78" /></div>
                <div className="space-y-2"><Label>Date de naissance</Label><Input type="date" defaultValue="1990-05-15" /></div>
                <div className="space-y-2">
                  <Label>Sexe</Label>
                  <Select defaultValue="male">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculin</SelectItem>
                      <SelectItem value="female">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Adresse</Label><Input defaultValue="Rue Hassan II, Khémisset" /></div>
              <div className="space-y-2"><Label>Notes médicales</Label><Textarea placeholder="Allergies, traitements en cours..." /></div>
              <Button variant="hero" type="submit"><Save className="w-4 h-4" />Sauvegarder</Button>
            </CardContent>
          </Card>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default PatientProfile;
