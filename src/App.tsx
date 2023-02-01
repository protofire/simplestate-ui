import { AppShell, Tabs } from "@mantine/core";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AdminProjects } from "./pages/AdminProjects/AdminProjects";
import { AppTabs } from "./components/AppTabs/AppTabs";
import { Projects } from "./pages/Projects/Projects/Projects";
import { Investments } from "./pages/Investments/Investments";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { SimpleEarn } from "./pages/Simplearn/SimpleEarn";
import { SimpleEarnAdmin } from "./pages/simplearn-admin/SimpleEarnAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell header={<AppHeader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" />} />
          <Route path={"/"} element={<AppTabs />}>
            <Route
              path="investments"
              element={
                <Tabs.Panel value="investments" pt="lg">
                  <Investments />
                </Tabs.Panel>
              }
            />

            <Route
              path="projects"
              element={
                <Tabs.Panel value="projects" pt="lg">
                  <Projects />
                </Tabs.Panel>
              }
            />

            <Route
              path="admin"
              element={
                <Tabs.Panel value="admin" pt="lg">
                  <AdminProjects />
                </Tabs.Panel>
              }
            />

            <Route
              path="simplearn"
              element={
                <Tabs.Panel value="simplearn" pt="lg">
                  <SimpleEarn />
                </Tabs.Panel>
              }
            />

            <Route
              path="simplearn-admin"
              element={
                <Tabs.Panel value="simplearn-admin" pt="lg">
                  <SimpleEarnAdmin />
                </Tabs.Panel>
              }
            />
          </Route>
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
