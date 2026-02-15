import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appointments = [
  { id: 1, doctor: "Dr. Amina Benjelloun", specialty: "Médecine Générale", date: "15 Fév 2026", time: "09:00", location: "Khémisset", status: "upcoming" },
  { id: 2, doctor: "Dr. Youssef El Mansouri", specialty: "Cardiologie", date: "18 Fév 2026", time: "14:30", location: "Rabat", status: "upcoming" },
  { id: 3, doctor: "Dr. Fatima Zahra Alaoui", specialty: "Pédiatrie", date: "10 Fév 2026", time: "10:00", location: "Khémisset", status: "completed" },
  { id: 4, doctor: "Dr. Karim Benali", specialty: "Dermatologie", date: "5 Fév 2026", time: "11:00", location: "Rabat", status: "completed" },
  { id: 5, doctor: "Dr. Leila Chraibi", specialty: "Gynécologie", date: "1 Fév 2026", time: "15:00", location: "Casablanca", status: "cancelled" },
];

const statusLabel: Record<string, { text: string; className: string }> = {
  upcoming: { text: "À venir", className: "bg-primary/10 text-primary" },
  completed: { text: "Terminé", className: "bg-success/10 text-success" },
  cancelled: { text: "Annulé", className: "bg-destructive/10 text-destructive" },
};

const AppointmentCard = ({ apt }: { apt: typeof appointments[0] }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Calendar className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{apt.doctor}</p>
        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.date} à {apt.time}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{apt.location}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabel[apt.status].className}`}>
        {statusLabel[apt.status].text}
      </span>
      <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
    </div>
  </div>
);

const PatientAppointments = () => (
  <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Mes Rendez-vous</h1>
        <Button variant="hero"><Calendar className="w-4 h-4" />Nouveau RDV</Button>
      </div>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
          <TabsTrigger value="cancelled">Annulés</TabsTrigger>
        </TabsList>
        {["upcoming", "completed", "cancelled"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-4 space-y-3">
                {appointments.filter(a => a.status === tab).map(apt => <AppointmentCard key={apt.id} apt={apt} />)}
                {appointments.filter(a => a.status === tab).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Aucun rendez-vous.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  </DashboardLayout>
);

export default PatientAppointments;
