import { Calendar, Users, Clock, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Rendez-vous du jour",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Calendar,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Nouveaux patients",
    value: "12",
    change: "+4",
    trend: "up",
    icon: Users,
    color: "bg-success/10 text-success",
  },
  {
    title: "En attente",
    value: "3",
    change: "-1",
    trend: "down",
    icon: Clock,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Taux de satisfaction",
    value: "98%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-accent/10 text-accent",
  },
];

const todayAppointments = [
  { time: "09:00", patient: "Ahmed Bennani", type: "Consultation", status: "confirmed" },
  { time: "10:30", patient: "Fatima Zahra", type: "Suivi", status: "confirmed" },
  { time: "11:30", patient: "Youssef Alami", type: "Première visite", status: "pending" },
  { time: "14:00", patient: "Sara Idrissi", type: "Consultation", status: "confirmed" },
  { time: "15:30", patient: "Omar Tazi", type: "Contrôle", status: "confirmed" },
];

const PatientDashboard = () => {
  return (
    <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Welcome */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Bonjour, Mohammed 👋
          </h1>
          <p className="text-muted-foreground">
            Voici un aperçu de votre activité aujourd'hui.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
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
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Rendez-vous d'aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAppointments.map((apt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-primary">
                        {apt.time}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apt.patient}</p>
                        <p className="text-sm text-muted-foreground">{apt.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === "confirmed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {apt.status === "confirmed" ? "Confirmé" : "En attente"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Prendre un rendez-vous", icon: Calendar, href: "/dashboard/patient/book" },
                { label: "Voir mes documents", icon: Users, href: "/dashboard/patient/documents" },
                { label: "Modifier mon profil", icon: Clock, href: "/dashboard/patient/profile" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-secondary hover:border-primary/20 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{action.label}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
