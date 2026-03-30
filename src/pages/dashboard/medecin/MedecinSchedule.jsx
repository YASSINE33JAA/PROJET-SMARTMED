import { motion } from "framer-motion";
import { Calendar, Clock, Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const weekDays = [
  { day: "Lundi", slots: ["09:00 - 12:00", "14:00 - 17:00"], active: true },
  { day: "Mardi", slots: ["09:00 - 12:00", "14:00 - 17:00"], active: true },
  { day: "Mercredi", slots: ["09:00 - 12:00"], active: true },
  { day: "Jeudi", slots: ["09:00 - 12:00", "14:00 - 17:00"], active: true },
  { day: "Vendredi", slots: ["09:00 - 12:00", "14:00 - 16:00"], active: true },
  { day: "Samedi", slots: ["09:00 - 12:00"], active: false },
  { day: "Dimanche", slots: [], active: false },
];

const upcomingWeek = [
  { date: "Lun 16 Fév", count: 8 },
  { date: "Mar 17 Fév", count: 10 },
  { date: "Mer 18 Fév", count: 5 },
  { date: "Jeu 19 Fév", count: 9 },
  { date: "Ven 20 Fév", count: 7 },
];

const MedecinSchedule = () => (
  <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Mon Planning</h1>
        <Button variant="hero"><Plus className="w-4 h-4" />Ajouter une disponibilité</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" />Horaires hebdomadaires</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {weekDays.map(d => (
              <div key={d.day} className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <Switch defaultChecked={d.active} />
                  <span className="font-medium text-foreground w-24">{d.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  {d.slots.length > 0 ? d.slots.map(s => (
                    <span key={s} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">{s}</span>
                  )) : <span className="text-sm text-muted-foreground">Fermé</span>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Semaine à venir</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcomingWeek.map(d => (
              <div key={d.date} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <span className="text-sm font-medium text-foreground">{d.date}</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">{d.count} RDV</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default MedecinSchedule;
