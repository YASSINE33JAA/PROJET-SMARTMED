import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children, role, userName }) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} />

      <div className="ml-64">
        <DashboardHeader userName={userName} userRole={role} />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;