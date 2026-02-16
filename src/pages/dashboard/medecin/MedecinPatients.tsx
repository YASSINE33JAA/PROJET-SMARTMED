import { motion } from "framer-motion";
import { Users, Search, Eye, FileText } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const patients = [
  { id: 1, name: "Ahmed Bennani", age: 45, phone: "+212 6 11 22 33 44", lastVisit: "10 Fév 2026", visits: 8, notes: "Diabète type 2, suivi régulier. Traitement en cours: Metformine 850mg." },
  { id: 2, name: "Fatima Zahra", age: 32, phone: "+212 6 22 33 44 55", lastVisit: "8 Fév 2026", visits: 3, notes: "Suivi grossesse. RAS." },
  { id: 3, name: "Youssef Alami", age: 28, phone: "+212 6 33 44 55 66", lastVisit: "5 Fév 2026", visits: 1, notes: "Première consultation. Bilan de santé général." },
  { id: 4, name: "Sara Idrissi", age: 55, phone: "+212 6 44 55 66 77", lastVisit: "1 Fév 2026", visits: 12, notes: "Hypertension artérielle. Traitement: Amlodipine 5mg." },
  { id: 5, name: "Omar Tazi", age: 38, phone: "+212 6 55 66 77 88", lastVisit: "28 Jan 2026", visits: 5, notes: "Allergie saisonnière. Traitement antihistaminique." },
  { id: 6, name: "Leila Benali", age: 41, phone: "+212 6 66 77 88 99", lastVisit: "25 Jan 2026", visits: 7, notes: "Suivi thyroïdien. Lévothyroxine 75μg." },
];

const MedecinPatients = () => {
  const [search, setSearch] = useState("");
  const [viewPatient, setViewPatient] = useState<typeof patients[0] | null>(null);
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Mes Patients</h1>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher un patient..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Âge</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead>Visites</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.age} ans</TableCell>
                    <TableCell>{p.phone}</TableCell>
                    <TableCell>{p.lastVisit}</TableCell>
                    <TableCell>{p.visits}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => setViewPatient(p)}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setViewPatient(p)}><FileText className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={viewPatient !== null} onOpenChange={() => setViewPatient(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Dossier patient — {viewPatient?.name}</DialogTitle></DialogHeader>
          {viewPatient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Âge:</span> <span className="font-medium">{viewPatient.age} ans</span></div>
                <div><span className="text-muted-foreground">Téléphone:</span> <span className="font-medium">{viewPatient.phone}</span></div>
                <div><span className="text-muted-foreground">Dernière visite:</span> <span className="font-medium">{viewPatient.lastVisit}</span></div>
                <div><span className="text-muted-foreground">Nombre de visites:</span> <span className="font-medium">{viewPatient.visits}</span></div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <p className="text-sm font-medium mb-1">Notes médicales:</p>
                <p className="text-sm text-muted-foreground">{viewPatient.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MedecinPatients;
