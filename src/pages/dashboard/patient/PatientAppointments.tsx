import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, MoreVertical, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const initialAppointments = [
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

const PatientAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [cancelDialog, setCancelDialog] = useState<number | null>(null);
  const [detailDialog, setDetailDialog] = useState<typeof initialAppointments[0] | null>(null);

  const handleCancel = (id: number) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "cancelled" } : a));
    setCancelDialog(null);
    toast({ title: "Rendez-vous annulé", description: "Le rendez-vous a été annulé avec succès." });
  };

  return (
    <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Mes Rendez-vous</h1>
          <Button variant="hero" onClick={() => navigate("/dashboard/patient/book")}>
            <Calendar className="w-4 h-4" />Nouveau RDV
          </Button>
        </div>
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">À venir ({appointments.filter(a => a.status === "upcoming").length})</TabsTrigger>
            <TabsTrigger value="completed">Terminés ({appointments.filter(a => a.status === "completed").length})</TabsTrigger>
            <TabsTrigger value="cancelled">Annulés ({appointments.filter(a => a.status === "cancelled").length})</TabsTrigger>
          </TabsList>
          {["upcoming", "completed", "cancelled"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {appointments.filter(a => a.status === tab).map(apt => (
                    <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors">
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setDetailDialog(apt)}>
                              <Eye className="w-4 h-4 mr-2" />Voir détails
                            </DropdownMenuItem>
                            {apt.status === "upcoming" && (
                              <DropdownMenuItem className="text-destructive" onClick={() => setCancelDialog(apt.id)}>
                                <Trash2 className="w-4 h-4 mr-2" />Annuler
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      {/* Cancel Dialog */}
      <Dialog open={cancelDialog !== null} onOpenChange={() => setCancelDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler le rendez-vous</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est irréversible.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(null)}>Non, garder</Button>
            <Button variant="destructive" onClick={() => cancelDialog && handleCancel(cancelDialog)}>Oui, annuler</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailDialog !== null} onOpenChange={() => setDetailDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
          </DialogHeader>
          {detailDialog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Médecin</p><p className="font-medium">{detailDialog.doctor}</p></div>
                <div><p className="text-sm text-muted-foreground">Spécialité</p><p className="font-medium">{detailDialog.specialty}</p></div>
                <div><p className="text-sm text-muted-foreground">Date</p><p className="font-medium">{detailDialog.date}</p></div>
                <div><p className="text-sm text-muted-foreground">Heure</p><p className="font-medium">{detailDialog.time}</p></div>
                <div><p className="text-sm text-muted-foreground">Lieu</p><p className="font-medium">{detailDialog.location}</p></div>
                <div><p className="text-sm text-muted-foreground">Statut</p><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabel[detailDialog.status].className}`}>{statusLabel[detailDialog.status].text}</span></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PatientAppointments;
