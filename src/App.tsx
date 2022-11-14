import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Tabs,
  Anchor,
} from "@mantine/core";
// import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          <Anchor href="https://mantine.dev/" target="_blank">
            Simplestate docs
          </Anchor>
        </Footer>
      }
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
