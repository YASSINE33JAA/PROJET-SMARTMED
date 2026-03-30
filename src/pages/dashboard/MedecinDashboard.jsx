import { Calendar, Users, Clock, FileText, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Stats avec les icônes correctes
const stats = [
  { title: "Rendez-vous du jour", value: "12", icon: Calendar, color: "bg-primary/10 text-primary" },
  { title: "Mes patients", value: "156", icon: Users, color: "bg-success/10 text-success" },
  { title: "En attente", value: "4", icon: Clock, color: "bg-warning/10 text-warning" },
  { title: "Ordonnances ce mois", value: "38", icon: FileText, color: "bg-accent/10 text-accent" },
];

const todayAppointments = [
  { time: "09:00", patient: "Ahmed Bennani", type: "Consultation générale", status: "completed" },
  { time: "09:45", patient: "Fatima Zahra Alaoui", type: "Suivi traitement", status: "completed" },
  { time: "10:30", patient: "Youssef El Mansouri", type: "Première consultation", status: "in-progress" },
  { time: "11:15", patient: "Sara Idrissi", type: "Contrôle annuel", status: "upcoming" },
  { time: "14:00", patient: "Omar Tazi", type: "Consultation", status: "upcoming" },
  { time: "15:00", patient: "Leila Benali", type: "Résultats examens", status: "upcoming" },
];

const MedecinDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Bonjour, Dr. Benjelloun 👋</h1>
            <p className="text-muted-foreground">Vous avez 12 rendez-vous prévus aujourd'hui.</p>
          </div>
          <Button variant="hero" onClick={() => navigate("/dashboard/medecin/schedule")}>
            <Calendar className="w-4 h-4 mr-2" />
            Voir mon planning
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <ArrowUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Today appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Planning du jour
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayAppointments.map((apt, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  apt.status === "in-progress"
                    ? "border-primary bg-primary/5"
                    : apt.status === "completed"
                    ? "border-border bg-muted/30"
                    : "border-border hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-lg font-bold ${apt.status === "in-progress" ? "text-primary" : "text-muted-foreground"}`}>
                    {apt.time}
                  </div>
                  <div>
                    <p className={`font-medium ${apt.status === "completed" ? "text-muted-foreground" : "text-foreground"}`}>
                      {apt.patient}
                    </p>
                    <p className="text-sm text-muted-foreground">{apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === "completed"
                        ? "bg-muted text-muted-foreground"
                        : apt.status === "in-progress"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {apt.status === "completed" ? "Terminé" : apt.status === "in-progress" ? "En cours" : "À venir"}
                  </span>
                  {apt.status === "upcoming" && (
                    <Button size="sm" variant="outline" onClick={() => navigate("/dashboard/medecin/appointments")}>
                      Détails
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default MedecinDashboard;