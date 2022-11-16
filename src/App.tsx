import { AppShell, Header, Title, Tabs, Button, createStyles, Container } from "@mantine/core";
import logo from './assets/simple-state-logo.png';

const useStyles = createStyles((theme) => ({
  headerContent: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: 'space-between'
  }
}));

export default function App() {

  const { classes } = useStyles();

  return (
    <AppShell
      header={
        <Header height={{ base: 70 }} p="md">
          <Container>
            <div className={classes.headerContent} >
              <img src={logo} width={180} />
              <Button color="teal" radius={'lg'}>
                Conectarse
              </Button>
            </div>
          </Container>
        </Header>
      }
    >
      <Container>
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
      </Container>
    </AppShell>
  );
}
