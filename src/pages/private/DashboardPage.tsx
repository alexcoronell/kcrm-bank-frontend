import Menu from "../../components/Shared/Menu";
import Dashboard from "../../components/Shared/Dashboard";

export default function DashboardPage() {
  const titlePage = "Dashboard";
  return (
    <main className="w-full h-full grow py-6 px-1 flex gap-x-3">
        <Menu />
        <Dashboard />
    </main>
  );
}
