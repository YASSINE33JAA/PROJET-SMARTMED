import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Eye, Download, Printer } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialPrescriptions = [
  { id: 1, patient: "Ahmed Bennani", date: "10 Fév 2026", medications: "Amoxicilline 500mg, Paracétamol", status: "active" },
  { id: 2, patient: "Fatima Zahra", date: "8 Fév 2026", medications: "Oméprazole 20mg", status: "active" },
  { id: 3, patient: "Sara Idrissi", date: "1 Fév 2026", medications: "Metformine 850mg, Amlodipine 5mg", status: "active" },
  { id: 4, patient: "Omar Tazi", date: "25 Jan 2026", medications: "Ibuprofène 400mg", status: "expired" },
  { id: 5, patient: "Leila Benali", date: "20 Jan 2026", medications: "Vitamine D3", status: "expired" },
];

const MedecinPrescriptions = () => {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [showNew, setShowNew] = useState(false);
  const [viewPrescription, setViewPrescription] = useState(null);
  const [newPatient, setNewPatient] = useState("");
  const [newMeds, setNewMeds] = useState("");

  const handleCreate = () => {
    if (!newPatient || !newMeds) return;

    const newP = {
      id: prescriptions.length + 1,
      patient: newPatient,
      date: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      medications: newMeds,
      status: "active",
    };

    setPrescriptions((prev) => [newP, ...prev]);
    setShowNew(false);
    setNewPatient("");
    setNewMeds("");

    toast({
      title: "Ordonnance créée",
      description: `Ordonnance pour ${newPatient} ajoutée.`,
    });
  };

  const handlePrint = (p) => {
    toast({
      title: "Impression lancée",
      description: `Ordonnance de ${p.patient} envoyée à l'imprimante.`,
    });
  };

  const handleDownload = (p) => {
    toast({
      title: "Téléchargement lancé",
      description: `Ordonnance de ${p.patient} en cours de téléchargement.`,
    });
  };

  return (
    <DashboardLayout role="medecin" userName="Dr. Amina Benjelloun">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Ordonnances
          </h1>

          <Button variant="hero" onClick={() => setShowNew(true)}>
            <Plus className="w-4 h-4" />
            Nouvelle ordonnance
          </Button>
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
                {prescriptions.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      {p.patient}
                    </TableCell>

                    <TableCell>{p.date}</TableCell>

                    <TableCell className="max-w-xs truncate">
                      {p.medications}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.status === "active"
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.status === "active" ? "Active" : "Expirée"}
                      </span>
                    </TableCell>

                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewPrescription(p)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePrint(p)}
                      >
                        <Printer className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(p)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Prescription Dialog */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle ordonnance</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Input
                placeholder="Nom du patient"
                value={newPatient}
                onChange={(e) => setNewPatient(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Médicaments</Label>
              <Textarea
                placeholder="Liste des médicaments et posologie..."
                value={newMeds}
                onChange={(e) => setNewMeds(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>
              Annuler
            </Button>

            <Button
              variant="hero"
              onClick={handleCreate}
              disabled={!newPatient || !newMeds}
            >
              Créer l'ordonnance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Prescription Dialog */}
      <Dialog
        open={viewPrescription !== null}
        onOpenChange={() => setViewPrescription(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Ordonnance — {viewPrescription?.patient}
            </DialogTitle>
          </DialogHeader>

          {viewPrescription && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Patient:</span>{" "}
                  <span className="font-medium">
                    {viewPrescription.patient}
                  </span>
                </div>

                <div>
                  <span className="text-muted-foreground">Date:</span>{" "}
                  <span className="font-medium">
                    {viewPrescription.date}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <p className="text-sm font-medium mb-1">Médicaments:</p>
                <p className="text-sm">
                  {viewPrescription.medications}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handlePrint(viewPrescription);
                    setViewPrescription(null);
                  }}
                >
                  <Printer className="w-4 h-4" />
                  Imprimer
                </Button>

                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => {
                    handleDownload(viewPrescription);
                    setViewPrescription(null);
                  }}
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MedecinPrescriptions;