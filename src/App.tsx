import { useState } from "react";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import IterationsPage from "./pages/IterationsPage";
import ArtifactsPage from "./pages/ArtifactsPage";
import SettingsPage from "./pages/SettingsPage";
import LogViewer from "./components/logs/LogViewer";

type Page = "landing" | "dashboard" | "iterations" | "artifacts" | "settings";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [status] = useState<"idle" | "running" | "error">("idle");

  const renderPage = () => {
    switch (page) {
      case "landing": return <LandingPage />;
      case "dashboard": return <DashboardPage />;
      case "iterations": return <IterationsPage />;
      case "artifacts": return <ArtifactsPage />;
      case "settings": return <SettingsPage />;
    }
  };

  const handleNavigate = (p: string) => {
    setPage(p as Page);
  };

  if (page === "landing") {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  return (
    <Layout currentPage={page} onNavigate={handleNavigate} status={status}>
      {renderPage()}
      <div className="mt-8"><LogViewer /></div>
    </Layout>
  );
}
