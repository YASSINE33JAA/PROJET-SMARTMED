import { motion } from "framer-motion";
import { FileText, Plus, Eye, Download, Printer } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const prescriptions = [
  { id: 1, patient: "Ahmed Bennani", date: "10 Fév 2026", medications: "Amoxicilline 500mg, Paracétamol", status: "active" },
  { id: 2, patient: "Fatima Zahra", date: "8 Fév 2026", medications: "Oméprazole 20mg", status: "active" },
  { id: 3, patient: "Sara Idrissi", date: "1 Fév 2026", medications: "Metformine 850mg, Amlodipine 5mg", status: "active" },
  { id: 4, patient: "Omar Tazi", date: "25 Jan 2026", medications: "Ibuprofène 400mg", status: "expired" },
  { id: 5, patient: "Leila Benali", date: "20 Jan 2026", medications: "Vitamine D3", status: "expired" },
];

const MedecinPrescriptions = () => (
  <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Ordonnances</h1>
        <Button variant="hero"><Plus className="w-4 h-4" />Nouvelle ordonnance</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Médicaments</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.patient}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell className="max-w-xs truncate">{p.medications}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {p.status === "active" ? "Active" : "Expirée"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Printer className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
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

export default MedecinPrescriptions;
