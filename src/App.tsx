import { AppShell, Header, Button, createStyles, Container, Badge, Tooltip, Tabs } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from './assets/simple-state-logo.png';
import TabsHeader from "./components/TabsHeader";
import { networkEnum } from "./constants/networks";
import { useMetamask } from "./hooks/useMetamask";

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
  const { connect, accounts, network, sitchChainTo } = useMetamask();

  const switchChain = () => {
    if (network?.chainId !== networkEnum.GOERLI) {
      sitchChainTo(networkEnum.GOERLI);
    }
  }

  return (
    <BrowserRouter>
      <AppShell
        header={
          <Header height={{ base: 70 }} p="md">
            <Container>
              <div className={classes.headerContent} >
                <img src={logo} width={180} />
                {accounts[0]
                    ? <div>
                        {accounts[0]} 
                        <Tooltip
                          disabled={network?.chainId === networkEnum.GOERLI}
                          multiline
                          withArrow
                          transition="fade"
                          transitionDuration={200}
                          label={"Red incorrecta, conéctate a la red de test Goerli"}
                        >
                          <Badge
                            onClick={switchChain}
                            color={network?.chainId === networkEnum.GOERLI ? 'teal' : 'red'}
                          >{network?.name}</Badge>
                        </Tooltip>
                      </div>
                    : <Button sx={(theme) => ({ "box-shadow": theme.shadows.sm, })} color="teal" variant="white" radius={'lg'} onClick={connect}>
                        Conectar billetera
                      </Button>
                }
              </div>
            </Container>
          </Header>
        }
      >

      <Routes>
        <Route path={'/'} element={<TabsHeader />} >
          <Route path="investments" element={
            <Tabs.Panel value="investments" pt="xs">
              <div>Mis inversiones</div>
            </Tabs.Panel>
          } />

          <Route path="projects" element={
            <Tabs.Panel value="projects" pt="xs">
              <div>Proyectos</div>
            </Tabs.Panel>
          } />

          <Route path="admin" element={
            <Tabs.Panel value="admin" pt="xs">
              <div>Administrar Proyectos</div>
            </Tabs.Panel>
          } />

          <Route path="treasury" element={
            <Tabs.Panel value="treasury" pt="xs">
              <div>Tesoro</div>
            </Tabs.Panel>
          } />
        </Route>
      </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
