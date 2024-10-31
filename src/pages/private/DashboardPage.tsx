import Page from "../../components/layouts/Page";
import Menu from "../../components/Shared/Menu";
import Dashboard from "../../components/Shared/Dashboard";

export default function DashboardPage() {
  const titlePage = "Dashboard";
  return (
    <Page titlePage={titlePage}>
      <div className="DashboardPage">
        <Menu />
        <Dashboard />
      </div>
    </Page>
  );
}
