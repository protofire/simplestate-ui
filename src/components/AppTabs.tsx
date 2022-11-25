import { Container, Tabs, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";


export function AppTabs() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [tab, setTab] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    if(!tabValue) {
      setTab(location.pathname.slice(1))
    }
  }, []);

  const onTabChanged = (value: string) => {
    navigate(`/${value}`);
    setTab(value)
  };

  return (
    <Container>
    <Tabs
      value={tab}
      onTabChange={onTabChanged}
      color="teal"
      variant="pills" 
      radius="lg" 
      mt="lg"
    >
      <Tabs.List>
        <Tabs.Tab value="investments">Mis inversiones</Tabs.Tab>
        <Tabs.Tab value="projects">Proyectos</Tabs.Tab>
        <Tabs.Tab value="admin">Administrar Proyectos</Tabs.Tab>
        <Tabs.Tab value="treasury">Tesoro</Tabs.Tab>
      </Tabs.List>
      <Outlet/>
    </Tabs>
  </Container>
  )
}