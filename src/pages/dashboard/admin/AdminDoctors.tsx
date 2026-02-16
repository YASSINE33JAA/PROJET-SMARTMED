import { motion } from "framer-motion";
import { Search, Star, Check, X, MoreVertical, Eye } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialDoctors = [
  { id: 1, name: "Dr. Amina Benjelloun", specialty: "Médecine Générale", rating: 4.9, patients: 156, status: "verified" },
  { id: 2, name: "Dr. Youssef El Mansouri", specialty: "Cardiologie", rating: 4.8, patients: 89, status: "verified" },
  { id: 3, name: "Dr. Fatima Zahra Alaoui", specialty: "Pédiatrie", rating: 4.9, patients: 203, status: "verified" },
  { id: 4, name: "Dr. Karim Benali", specialty: "Dermatologie", rating: 4.7, patients: 67, status: "pending" },
  { id: 5, name: "Dr. Leila Chraibi", specialty: "Gynécologie", rating: 4.9, patients: 145, status: "verified" },
  { id: 6, name: "Dr. Hassan Ouazzani", specialty: "Ophtalmologie", rating: 4.6, patients: 54, status: "pending" },
];

const AdminDoctors = () => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [viewDoc, setViewDoc] = useState<typeof initialDoctors[0] | null>(null);
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));

  const handleApprove = (id: number) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: "verified" } : d));
    toast({ title: "Médecin approuvé", description: "Le médecin a été vérifié avec succès." });
  };

  const handleReject = (id: number) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    toast({ title: "Médecin refusé", description: "La demande a été refusée." });
  };

  return (
    <DashboardLayout role="admin" userName="Administrateur">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Médecins</h1>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher un médecin..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.specialty}</TableCell>
                    <TableCell><span className="flex items-center gap-1"><Star className="w-4 h-4 fill-warning text-warning" />{d.rating}</span></TableCell>
                    <TableCell>{d.patients}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.status === "verified" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                        {d.status === "verified" ? "Vérifié" : "En attente"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {d.status === "pending" && (
                        <>
                          <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10" onClick={() => handleApprove(d.id)}><Check className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleReject(d.id)}><X className="w-4 h-4" /></Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewDoc(d)}><Eye className="w-4 h-4 mr-2" />Voir détails</DropdownMenuItem>
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

      <Dialog open={viewDoc !== null} onOpenChange={() => setViewDoc(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Détails du médecin</DialogTitle></DialogHeader>
          {viewDoc && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Nom:</span> <span className="font-medium">{viewDoc.name}</span></div>
              <div><span className="text-muted-foreground">Spécialité:</span> <span className="font-medium">{viewDoc.specialty}</span></div>
              <div><span className="text-muted-foreground">Note:</span> <span className="font-medium flex items-center gap-1"><Star className="w-4 h-4 fill-warning text-warning" />{viewDoc.rating}</span></div>
              <div><span className="text-muted-foreground">Patients:</span> <span className="font-medium">{viewDoc.patients}</span></div>
              <div><span className="text-muted-foreground">Statut:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${viewDoc.status === "verified" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{viewDoc.status === "verified" ? "Vérifié" : "En attente"}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminDoctors;
