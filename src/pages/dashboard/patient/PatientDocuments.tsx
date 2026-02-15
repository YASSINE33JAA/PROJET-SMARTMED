import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const documents = [
  { id: 1, name: "Ordonnance — Consultation générale", doctor: "Dr. Amina Benjelloun", date: "10 Fév 2026", type: "Ordonnance" },
  { id: 2, name: "Résultats analyses sanguines", doctor: "Dr. Youssef El Mansouri", date: "5 Fév 2026", type: "Résultats" },
  { id: 3, name: "Certificat médical", doctor: "Dr. Fatima Zahra Alaoui", date: "1 Fév 2026", type: "Certificat" },
  { id: 4, name: "Ordonnance — Dermatologie", doctor: "Dr. Karim Benali", date: "25 Jan 2026", type: "Ordonnance" },
  { id: 5, name: "Compte rendu consultation", doctor: "Dr. Amina Benjelloun", date: "20 Jan 2026", type: "Compte rendu" },
];

const typeColor: Record<string, string> = {
  Ordonnance: "bg-primary/10 text-primary",
  Résultats: "bg-success/10 text-success",
  Certificat: "bg-warning/10 text-warning",
  "Compte rendu": "bg-accent/10 text-accent-foreground",
};

const PatientDocuments = () => (
  <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Mes Documents</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Médecin</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />{doc.name}
                  </TableCell>
                  <TableCell>{doc.doctor}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColor[doc.type] || ""}`}>{doc.type}</span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
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

export default PatientDocuments;
