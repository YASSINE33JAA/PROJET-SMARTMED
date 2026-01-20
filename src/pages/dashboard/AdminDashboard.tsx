import { Calendar, Users, Stethoscope, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Utilisateurs",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Médecins Actifs",
    value: "48",
    change: "+3",
    trend: "up",
    icon: Stethoscope,
    color: "bg-success/10 text-success",
  },
  {
    title: "RDV ce mois",
    value: "856",
    change: "+18%",
    trend: "up",
    icon: Calendar,
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Taux d'annulation",
    value: "4.2%",
    change: "-0.8%",
    trend: "down",
    icon: TrendingUp,
    color: "bg-warning/10 text-warning",
  },
];

const chartData = [
  { name: "Jan", rdv: 420 },
  { name: "Fév", rdv: 380 },
  { name: "Mar", rdv: 520 },
  { name: "Avr", rdv: 480 },
  { name: "Mai", rdv: 600 },
  { name: "Juin", rdv: 750 },
  { name: "Juil", rdv: 680 },
];

const recentUsers = [
  { name: "Ahmed Bennani", role: "Patient", date: "Aujourd'hui" },
  { name: "Dr. Fatima Alaoui", role: "Médecin", date: "Aujourd'hui" },
  { name: "Sara Idrissi", role: "Patient", date: "Hier" },
  { name: "Omar Tazi", role: "Patient", date: "Hier" },
  { name: "Dr. Karim Benali", role: "Médecin", date: "Il y a 2 jours" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userName="Administrateur">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Welcome */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Tableau de bord administrateur
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de la plateforme SmartMed.
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

        {/* Charts and Tables */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Évolution des rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rdv"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary) / 0.2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Nouveaux inscrits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium text-foreground">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{user.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
