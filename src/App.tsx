import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Tabs,
} from "@mantine/core";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <img src="./src/assets/simple-state-logo.png" width={180} />
          </div>
        </Header>
      }
    >
      <Title>Projects</Title>
      <Tabs color="teal" variant="pills" radius="lg" defaultValue="invests" mt="lg">
        <Tabs.List>
          <Tabs.Tab value="invests">My Investments</Tabs.Tab>
          <Tabs.Tab value="explorer">Projects Explorer</Tabs.Tab>
          <Tabs.Tab value="admin">Admin Projects</Tabs.Tab>
          <Tabs.Tab value="tressury">Tressury</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="invests" pt="xs">
          My Investments tab content
        </Tabs.Panel>

        <Tabs.Panel value="explorer" pt="xs">
          Projects Explorer tab content
        </Tabs.Panel>

        <Tabs.Panel value="admin" pt="xs">
          Settings tab content
        </Tabs.Panel>

        <Tabs.Panel value="tressury" pt="xs">
          Tressury tab content
        </Tabs.Panel>
      </Tabs>
    </AppShell>
  );
}
