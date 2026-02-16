import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const specialties = [
  "Toutes les spécialités", "Médecine Générale", "Cardiologie", "Pédiatrie",
  "Dermatologie", "Ophtalmologie", "Gynécologie", "Orthopédie",
];

const doctors = [
  { id: 1, name: "Dr. Amina Benjelloun", specialty: "Médecine Générale", rating: 4.9, reviews: 128, avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", location: "Khémisset", nextAvailable: "Aujourd'hui", price: "200 DH" },
  { id: 2, name: "Dr. Youssef El Mansouri", specialty: "Cardiologie", rating: 4.8, reviews: 95, avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", location: "Rabat", nextAvailable: "Demain", price: "400 DH" },
  { id: 3, name: "Dr. Fatima Zahra Alaoui", specialty: "Pédiatrie", rating: 4.9, reviews: 156, avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face", location: "Khémisset", nextAvailable: "Aujourd'hui", price: "250 DH" },
  { id: 4, name: "Dr. Karim Benali", specialty: "Dermatologie", rating: 4.7, reviews: 82, avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face", location: "Rabat", nextAvailable: "Dans 2 jours", price: "350 DH" },
  { id: 5, name: "Dr. Leila Chraibi", specialty: "Gynécologie", rating: 4.9, reviews: 201, avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", location: "Casablanca", nextAvailable: "Demain", price: "450 DH" },
  { id: 6, name: "Dr. Hassan Ouazzani", specialty: "Ophtalmologie", rating: 4.6, reviews: 67, avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", location: "Khémisset", nextAvailable: "Aujourd'hui", price: "300 DH" },
];

const Medecins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialty || specialty === "Toutes les spécialités" || doc.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">Trouvez votre médecin</h1>
              <p className="text-muted-foreground">Recherchez parmi nos médecins qualifiés et prenez rendez-vous en ligne.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-4xl mx-auto">
              <div className="bg-card p-4 rounded-2xl shadow-lg border border-border flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Nom du médecin..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 h-12 border-0 bg-secondary/50" />
                </div>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger className="w-full md:w-64 h-12 bg-secondary/50 border-0"><SelectValue placeholder="Spécialité" /></SelectTrigger>
                  <SelectContent>{specialties.map((spec) => (<SelectItem key={spec} value={spec}>{spec}</SelectItem>))}</SelectContent>
                </Select>
                <Button variant="hero" size="lg" className="h-12"><Filter className="w-4 h-4" />Rechercher</Button>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
          <p className="text-muted-foreground mb-8"><span className="font-semibold text-foreground">{filteredDoctors.length}</span> médecins trouvés</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{doctor.name}</h3>
                      <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({doctor.reviews} avis)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" />{doctor.location}</div>
                    <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-success" /><span className="text-success font-medium">Disponible: {doctor.nextAvailable}</span></div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">{doctor.price}</span>
                    <Button variant="hero" size="default" onClick={() => navigate("/dashboard/patient/book")}>Prendre RDV</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Medecins;
