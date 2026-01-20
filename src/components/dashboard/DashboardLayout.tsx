import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface LayoutProps {
  children: ReactNode;
  role: "admin" | "medecin" | "patient";
  userName: string;
}

const DashboardLayout = ({ children, role, userName }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} />
      <div className="ml-64">
        <DashboardHeader userName={userName} userRole={role} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
