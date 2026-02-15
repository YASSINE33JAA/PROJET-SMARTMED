import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Calendar, Download } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const monthlyData = [
  { month: "Sep", rdv: 320 },
  { month: "Oct", rdv: 410 },
  { month: "Nov", rdv: 380 },
  { month: "Déc", rdv: 450 },
  { month: "Jan", rdv: 520 },
  { month: "Fév", rdv: 480 },
];

const specialtyData = [
  { name: "Médecine Générale", value: 35 },
  { name: "Cardiologie", value: 20 },
  { name: "Pédiatrie", value: 18 },
  { name: "Dermatologie", value: 12 },
  { name: "Autres", value: 15 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--accent))", "hsl(var(--muted-foreground))"];

const AdminReports = () => (
  <DashboardLayout role="admin" userName="Administrateur">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Rapports</h1>
        <Button variant="outline"><Download className="w-4 h-4" />Exporter</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "RDV ce mois", value: "480", icon: Calendar, change: "+12%" },
          { label: "Nouveaux patients", value: "67", icon: Users, change: "+8%" },
          { label: "Taux satisfaction", value: "96%", icon: TrendingUp, change: "+2%" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
              <span className="ml-auto text-sm font-medium text-success">{s.change}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Rendez-vous par mois</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="rdv" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Répartition par spécialité</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={specialtyData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {specialtyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default AdminReports;
