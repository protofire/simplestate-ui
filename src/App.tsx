import { AppShell, Header, Title, Tabs } from "@mantine/core";
import logo from './assets/simple-state-logo.png';

export default function App() {

  return (
    <AppShell
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: "flex", alignItems: "center", height: "100%" }} >
            <img src={logo} width={180} />
          </div>
        </Header>
      }
    >
      <Title>Proyectos</Title>
      <Tabs color="teal" variant="pills" radius="lg" defaultValue="invests" mt="lg">
        <Tabs.List>
          <Tabs.Tab value="invests">Mis inversiones</Tabs.Tab>
          <Tabs.Tab value="explorer">Proyectos</Tabs.Tab>
          <Tabs.Tab value="admin">Administrar Proyectos</Tabs.Tab>
          <Tabs.Tab value="tressury">Tesoro</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="invests" pt="xs">
          Mis inversiones
        </Tabs.Panel>

        <Tabs.Panel value="explorer" pt="xs">
          Proyectos
        </Tabs.Panel>

        <Tabs.Panel value="admin" pt="xs">
          Administrar Proyectos
        </Tabs.Panel>

        <Tabs.Panel value="tressury" pt="xs">
          Tesoro
        </Tabs.Panel>
      </Tabs>
    </AppShell>
  );
}
