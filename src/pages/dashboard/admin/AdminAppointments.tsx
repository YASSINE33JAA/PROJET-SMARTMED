import { motion } from "framer-motion";
import { Calendar, Search, MoreVertical } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appointments = [
  { id: 1, patient: "Ahmed Bennani", doctor: "Dr. Amina Benjelloun", date: "15 Fév 2026", time: "09:00", status: "confirmed" },
  { id: 2, patient: "Fatima Zahra", doctor: "Dr. Youssef El Mansouri", date: "15 Fév 2026", time: "10:30", status: "pending" },
  { id: 3, patient: "Sara Idrissi", doctor: "Dr. Fatima Zahra Alaoui", date: "16 Fév 2026", time: "14:00", status: "confirmed" },
  { id: 4, patient: "Omar Tazi", doctor: "Dr. Karim Benali", date: "14 Fév 2026", time: "11:00", status: "completed" },
  { id: 5, patient: "Leila Benali", doctor: "Dr. Leila Chraibi", date: "13 Fév 2026", time: "15:00", status: "cancelled" },
];

const statusMap: Record<string, { text: string; cls: string }> = {
  pending: { text: "En attente", cls: "bg-warning/10 text-warning" },
  confirmed: { text: "Confirmé", cls: "bg-primary/10 text-primary" },
  completed: { text: "Terminé", cls: "bg-success/10 text-success" },
  cancelled: { text: "Annulé", cls: "bg-destructive/10 text-destructive" },
};

const AdminAppointments = () => {
  const [search, setSearch] = useState("");
  const filtered = appointments.filter(a => a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="admin" userName="Administrateur">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Rendez-vous</h1>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.patient}</TableCell>
                    <TableCell>{a.doctor}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[a.status].cls}`}>{statusMap[a.status].text}</span></TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminAppointments;
