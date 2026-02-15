import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Stethoscope, User, Check } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const specialties = ["Médecine Générale", "Cardiologie", "Pédiatrie", "Dermatologie", "Ophtalmologie", "Gynécologie"];
const doctors: Record<string, string[]> = {
  "Médecine Générale": ["Dr. Amina Benjelloun", "Dr. Hassan Ouazzani"],
  "Cardiologie": ["Dr. Youssef El Mansouri"],
  "Pédiatrie": ["Dr. Fatima Zahra Alaoui"],
  "Dermatologie": ["Dr. Karim Benali"],
  "Ophtalmologie": ["Dr. Hassan Ouazzani"],
  "Gynécologie": ["Dr. Leila Chraibi"],
};
const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];

const PatientBook = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = () => {
    toast({ title: "Rendez-vous confirmé !", description: `Avec ${doctor} le ${date} à ${time}.` });
    setStep(4);
  };

  return (
    <DashboardLayout role="patient" userName="Mohammed Bouabdelli">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Prendre un rendez-vous</h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-4">
          {[
            { n: 1, icon: Stethoscope, label: "Spécialité" },
            { n: 2, icon: User, label: "Médecin" },
            { n: 3, icon: Calendar, label: "Date & Heure" },
            { n: 4, icon: Check, label: "Confirmation" },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {step > s.n ? <Check className="w-5 h-5" /> : s.n}
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">{s.label}</span>
              {s.n < 4 && <div className={`w-8 h-0.5 ${step > s.n ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader><CardTitle>Choisir une spécialité</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {specialties.map(s => (
                  <button key={s} onClick={() => { setSpecialty(s); setStep(2); }}
                    className={`p-4 rounded-xl border text-left transition-all hover:border-primary/50 hover:bg-primary/5 ${specialty === s ? "border-primary bg-primary/10" : "border-border"}`}>
                    <Stethoscope className="w-5 h-5 text-primary mb-2" />
                    <p className="font-medium text-foreground">{s}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader><CardTitle>Choisir un médecin — {specialty}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {(doctors[specialty] || []).map(d => (
                <button key={d} onClick={() => { setDoctor(d); setStep(3); }}
                  className="w-full p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-left transition-all flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{d}</p>
                    <p className="text-sm text-muted-foreground">{specialty}</p>
                  </div>
                </button>
              ))}
              <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader><CardTitle>Choisir la date et l'heure</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <Label>Créneau horaire</Label>
                <div className="grid grid-cols-5 gap-2">
                  {timeSlots.map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      className={`p-2 rounded-lg border text-sm font-medium transition-all ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Motif (optionnel)</Label>
                <Textarea placeholder="Décrivez brièvement le motif de votre consultation..." />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
                <Button variant="hero" onClick={handleBook} disabled={!date || !time}>
                  Confirmer le rendez-vous
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">Rendez-vous confirmé !</h2>
              <p className="text-muted-foreground">{doctor} — {specialty}<br />{date} à {time}</p>
              <Button variant="hero" onClick={() => { setStep(1); setSpecialty(""); setDoctor(""); setDate(""); setTime(""); }}>
                Prendre un autre rendez-vous
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default PatientBook;
