import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Calendar, Users, FileText, Settings,
  Bell, LogOut, Stethoscope, User, Clock, ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  role: "admin" | "medecin" | "patient";
}

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard/admin" },
    { icon: Users, label: "Utilisateurs", href: "/dashboard/admin/users" },
    { icon: Stethoscope, label: "Médecins", href: "/dashboard/admin/doctors" },
    { icon: Calendar, label: "Rendez-vous", href: "/dashboard/admin/appointments" },
    { icon: FileText, label: "Rapports", href: "/dashboard/admin/reports" },
    { icon: Settings, label: "Paramètres", href: "/dashboard/admin/settings" },
  ],
  medecin: [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard/medecin" },
    { icon: Calendar, label: "Mon Planning", href: "/dashboard/medecin/schedule" },
    { icon: Users, label: "Mes Patients", href: "/dashboard/medecin/patients" },
    { icon: ClipboardList, label: "Rendez-vous", href: "/dashboard/medecin/appointments" },
    { icon: FileText, label: "Ordonnances", href: "/dashboard/medecin/prescriptions" },
    { icon: Settings, label: "Paramètres", href: "/dashboard/medecin/settings" },
  ],
  patient: [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard/patient" },
    { icon: Calendar, label: "Mes Rendez-vous", href: "/dashboard/patient/appointments" },
    { icon: Clock, label: "Prendre RDV", href: "/dashboard/patient/book" },
    { icon: FileText, label: "Documents", href: "/dashboard/patient/documents" },
    { icon: User, label: "Mon Profil", href: "/dashboard/patient/profile" },
    { icon: Settings, label: "Paramètres", href: "/dashboard/patient/settings" },
  ],
};

const DashboardSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const items = menuItems[role];

  const handleNotifications = () => {
    toast({ title: "Notifications", description: "Vous avez 3 nouvelles notifications." });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <Stethoscope className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">Smart<span className="text-primary">Med</span></span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={handleNotifications}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
        >
          <Bell className="w-5 h-5" />
          Notifications
          <span className="ml-auto w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => navigate("/login")}
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
