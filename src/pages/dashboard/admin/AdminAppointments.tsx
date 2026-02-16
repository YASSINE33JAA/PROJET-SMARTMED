import { motion } from "framer-motion";
import { Search, MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialAppointments = [
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
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [viewApt, setViewApt] = useState<typeof initialAppointments[0] | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = appointments.filter(a => a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    setDeleteId(null);
    toast({ title: "Rendez-vous supprimé" });
  };

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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewApt(a)}><Eye className="w-4 h-4 mr-2" />Voir détails</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(a.id)}><Trash2 className="w-4 h-4 mr-2" />Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={viewApt !== null} onOpenChange={() => setViewApt(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Détails du rendez-vous</DialogTitle></DialogHeader>
          {viewApt && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{viewApt.patient}</span></div>
              <div><span className="text-muted-foreground">Médecin:</span> <span className="font-medium">{viewApt.doctor}</span></div>
              <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{viewApt.date}</span></div>
              <div><span className="text-muted-foreground">Heure:</span> <span className="font-medium">{viewApt.time}</span></div>
              <div><span className="text-muted-foreground">Statut:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[viewApt.status].cls}`}>{statusMap[viewApt.status].text}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le rendez-vous</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir supprimer ce rendez-vous ?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminAppointments;
