import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Medecins from "./pages/Medecins";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
// Patient
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import PatientAppointments from "./pages/dashboard/patient/PatientAppointments";
import PatientBook from "./pages/dashboard/patient/PatientBook";
import PatientDocuments from "./pages/dashboard/patient/PatientDocuments";
import PatientProfile from "./pages/dashboard/patient/PatientProfile";
import PatientSettings from "./pages/dashboard/patient/PatientSettings";
import PatientRendezVous from "./pages/dashboard/PatientRendezVous";
// Medecin
import MedecinDashboard from "./pages/dashboard/MedecinDashboard";
import MedecinSchedule from "./pages/dashboard/medecin/MedecinSchedule";
import MedecinPatients from "./pages/dashboard/medecin/MedecinPatients";
import MedecinAppointments from "./pages/dashboard/medecin/MedecinAppointments";
import MedecinPrescriptions from "./pages/dashboard/medecin/MedecinPrescriptions";
import MedecinSettings from "./pages/dashboard/medecin/MedecinSettings";
// Admin
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminDoctors from "./pages/dashboard/admin/AdminDoctors";
import AdminAppointments from "./pages/dashboard/admin/AdminAppointments";
import AdminReports from "./pages/dashboard/admin/AdminReports";
import AdminSettings from "./pages/dashboard/admin/AdminSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* Toaster components */}
        <Toaster />
        <Sonner />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/medecins" element={<Medecins />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor/:id" element={<PatientRendezVous />} />

          {/* Patient */}
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/patient/appointments" element={<PatientAppointments />} />
          <Route path="/dashboard/patient/book" element={<PatientBook />} />
          <Route path="/dashboard/patient/documents" element={<PatientDocuments />} />
          <Route path="/dashboard/patient/profile" element={<PatientProfile />} />
          <Route path="/dashboard/patient/settings" element={<PatientSettings />} />

          {/* Medecin */}
          <Route path="/dashboard/medecin" element={<MedecinDashboard />} />
          <Route path="/dashboard/medecin/schedule" element={<MedecinSchedule />} />
          <Route path="/dashboard/medecin/patients" element={<MedecinPatients />} />
          <Route path="/dashboard/medecin/appointments" element={<MedecinAppointments />} />
          <Route path="/dashboard/medecin/prescriptions" element={<MedecinPrescriptions />} />
          <Route path="/dashboard/medecin/settings" element={<MedecinSettings />} />

          {/* Admin */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/doctors" element={<AdminDoctors />} />
          <Route path="/dashboard/admin/appointments" element={<AdminAppointments />} />
          <Route path="/dashboard/admin/reports" element={<AdminReports />} />
          <Route path="/dashboard/admin/settings" element={<AdminSettings />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;