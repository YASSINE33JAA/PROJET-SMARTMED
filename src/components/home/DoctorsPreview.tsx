import { Star } from "lucide-react";
import { motion } from "framer-motion";

const doctors = [
  {
    id: 1,
    name: "Dr. Amina Benjelloun",
    specialty: "Médecine Générale",
    rating: 4.9,
    reviews: 128,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Youssef El Mansouri",
    specialty: "Cardiologie",
    rating: 4.8,
    reviews: 95,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Fatima Zahra Alaoui",
    specialty: "Pédiatrie",
    rating: 4.9,
    reviews: 156,
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    available: false,
  },
  {
    id: 4,
    name: "Dr. Karim Benali",
    specialty: "Dermatologie",
    rating: 4.7,
    reviews: 82,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
];

const DoctorsPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Notre Équipe
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Des médecins de confiance à votre service
          </h2>
          <p className="text-muted-foreground">
            Une équipe de professionnels qualifiés pour prendre soin de votre santé.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 text-center"
            >
              <div className="relative inline-block mb-4">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-background shadow-lg"
                />
                <span
                  className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-card ${
                    doctor.available ? "bg-success" : "bg-muted-foreground"
                  }`}
                />
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {doctor.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                {doctor.specialty}
              </p>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium text-foreground">
                  {doctor.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({doctor.reviews} avis)
                </span>
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.available
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {doctor.available ? "Disponible" : "Indisponible"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsPreview;
