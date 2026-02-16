import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Check, X, User } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const initialAppointments = [
  { id: 1, patient: "Ahmed Bennani", type: "Consultation", date: "15 Fév 2026", time: "09:00", status: "pending" },
  { id: 2, patient: "Fatima Zahra", type: "Suivi", date: "15 Fév 2026", time: "10:30", status: "confirmed" },
  { id: 3, patient: "Youssef Alami", type: "Première visite", date: "16 Fév 2026", time: "09:00", status: "pending" },
  { id: 4, patient: "Sara Idrissi", type: "Contrôle", date: "14 Fév 2026", time: "14:00", status: "completed" },
  { id: 5, patient: "Omar Tazi", type: "Consultation", date: "13 Fév 2026", time: "11:00", status: "completed" },
  { id: 6, patient: "Leila Benali", type: "Résultats", date: "12 Fév 2026", time: "15:00", status: "cancelled" },
];

const statusMap: Record<string, { text: string; cls: string }> = {
  pending: { text: "En attente", cls: "bg-warning/10 text-warning" },
  confirmed: { text: "Confirmé", cls: "bg-primary/10 text-primary" },
  completed: { text: "Terminé", cls: "bg-success/10 text-success" },
  cancelled: { text: "Annulé", cls: "bg-destructive/10 text-destructive" },
};

const MedecinAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleAccept = (id: number) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "confirmed" } : a));
    toast({ title: "Rendez-vous confirmé", description: "Le patient sera notifié de la confirmation." });
  };

  const handleReject = (id: number) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "cancelled" } : a));
    toast({ title: "Rendez-vous refusé", description: "Le patient sera notifié de l'annulation." });
  };

  return (
    <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Rendez-vous</h1>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">En attente ({appointments.filter(a => a.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmés ({appointments.filter(a => a.status === "confirmed").length})</TabsTrigger>
            <TabsTrigger value="completed">Terminés ({appointments.filter(a => a.status === "completed").length})</TabsTrigger>
            <TabsTrigger value="cancelled">Annulés ({appointments.filter(a => a.status === "cancelled").length})</TabsTrigger>
          </TabsList>
          {["pending", "confirmed", "completed", "cancelled"].map(tab => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {appointments.filter(a => a.status === tab).map(apt => (
                    <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{apt.patient}</p>
                          <p className="text-sm text-muted-foreground">{apt.type}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />{apt.date}
                            <Clock className="w-3 h-3 ml-2" />{apt.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusMap[apt.status].cls}`}>{statusMap[apt.status].text}</span>
                        {apt.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10" onClick={() => handleAccept(apt.id)}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleReject(apt.id)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
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
};

export default MedecinAppointments;
