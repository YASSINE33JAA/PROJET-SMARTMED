import { motion } from "framer-motion";
import { Stethoscope, Search, Star, Check, X, MoreVertical } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const doctors = [
  { id: 1, name: "Dr. Amina Benjelloun", specialty: "Médecine Générale", rating: 4.9, patients: 156, status: "verified" },
  { id: 2, name: "Dr. Youssef El Mansouri", specialty: "Cardiologie", rating: 4.8, patients: 89, status: "verified" },
  { id: 3, name: "Dr. Fatima Zahra Alaoui", specialty: "Pédiatrie", rating: 4.9, patients: 203, status: "verified" },
  { id: 4, name: "Dr. Karim Benali", specialty: "Dermatologie", rating: 4.7, patients: 67, status: "pending" },
  { id: 5, name: "Dr. Leila Chraibi", specialty: "Gynécologie", rating: 4.9, patients: 145, status: "verified" },
  { id: 6, name: "Dr. Hassan Ouazzani", specialty: "Ophtalmologie", rating: 4.6, patients: 54, status: "pending" },
];

const AdminDoctors = () => {
  const [search, setSearch] = useState("");
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));

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
                          <Button size="sm" variant="outline" className="text-success"><Check className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="text-destructive"><X className="w-4 h-4" /></Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                    </TableCell>
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

export default AdminDoctors;
