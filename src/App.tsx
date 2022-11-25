import { AppShell, Tabs } from "@mantine/core";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AdminProjects } from "./pages/AdminProjects/AdminProjects";
import { AppTabs } from "./components/AppTabs";
import { Projects } from "./pages/Projects/Projects";
import { AppHeader } from "./components/AppHeader";

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
                <Tabs.Panel value="investments" pt="xs">
                  <div>Mis inversiones</div>
                </Tabs.Panel>
              }
            />

            <Route
              path="projects"
              element={
                <Tabs.Panel value="projects" pt="xs">
                  <Projects />
                </Tabs.Panel>
              }
            />

            <Route
              path="admin"
              element={
                <Tabs.Panel value="admin" pt="xs">
                  <AdminProjects />
                </Tabs.Panel>
              }
            />

            <Route
              path="treasury"
              element={
                <Tabs.Panel value="treasury" pt="xs">
                  <div>Tesoro</div>
                </Tabs.Panel>
              }
            />
          </Route>
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
