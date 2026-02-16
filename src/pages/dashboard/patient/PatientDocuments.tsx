import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const documents = [
  { id: 1, name: "Ordonnance — Consultation générale", doctor: "Dr. Amina Benjelloun", date: "10 Fév 2026", type: "Ordonnance", content: "Amoxicilline 500mg - 3x/jour pendant 7 jours\nParacétamol 1g - en cas de douleur" },
  { id: 2, name: "Résultats analyses sanguines", doctor: "Dr. Youssef El Mansouri", date: "5 Fév 2026", type: "Résultats", content: "Hémoglobine: 14.2 g/dL (Normal)\nGlycémie: 0.95 g/L (Normal)\nCholestérol: 1.8 g/L (Normal)" },
  { id: 3, name: "Certificat médical", doctor: "Dr. Fatima Zahra Alaoui", date: "1 Fév 2026", type: "Certificat", content: "Certificat médical attestant que M. Mohammed Bouabdelli est apte à la pratique sportive." },
  { id: 4, name: "Ordonnance — Dermatologie", doctor: "Dr. Karim Benali", date: "25 Jan 2026", type: "Ordonnance", content: "Crème hydratante - 2x/jour\nProtection solaire SPF50 - application quotidienne" },
  { id: 5, name: "Compte rendu consultation", doctor: "Dr. Amina Benjelloun", date: "20 Jan 2026", type: "Compte rendu", content: "Consultation de routine. Pas d'anomalie détectée. Prochain contrôle dans 6 mois." },
];

const typeColor: Record<string, string> = {
  Ordonnance: "bg-primary/10 text-primary",
  Résultats: "bg-success/10 text-success",
  Certificat: "bg-warning/10 text-warning",
  "Compte rendu": "bg-accent/10 text-accent-foreground",
};

const PatientDocuments = () => {
  const { toast } = useToast();
  const [viewDoc, setViewDoc] = useState<typeof documents[0] | null>(null);

  const handleDownload = (doc: typeof documents[0]) => {
    toast({ title: "Téléchargement lancé", description: `${doc.name} est en cours de téléchargement.` });
  };

  return (
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
                      <Button variant="ghost" size="icon" onClick={() => setViewDoc(doc)}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}><Download className="w-4 h-4" /></Button>
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
          <DialogHeader>
            <DialogTitle>{viewDoc?.name}</DialogTitle>
          </DialogHeader>
          {viewDoc && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Médecin:</span> <span className="font-medium">{viewDoc.doctor}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{viewDoc.date}</span></div>
                <div><span className="text-muted-foreground">Type:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColor[viewDoc.type]}`}>{viewDoc.type}</span></div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <p className="text-sm whitespace-pre-line">{viewDoc.content}</p>
              </div>
              <Button variant="hero" className="w-full" onClick={() => { handleDownload(viewDoc); setViewDoc(null); }}>
                <Download className="w-4 h-4" />Télécharger
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PatientDocuments;
