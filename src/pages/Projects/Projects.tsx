import { IconPlus } from "@tabler/icons";

import {
  Card,
  Container,
  SimpleGrid,
  Text,
  Image,
  createStyles,
  Overlay,
  Title,
  Divider,
  Group,
  Grid,
  Slider,
  Modal,
  Button,
  Center,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { projectStateLabels } from "../../constants/projectState";
import { useContract } from "../../hooks/useContract";
import { IProject } from "../../types/project";
import { profit, raisedRate } from "../../utils";

const useStyles = createStyles(() => ({
  absolute: {
    position: "absolute",
    bottom: 5,
    left: 5,
    zIndex: 20,
  },
  state: {
    position: "absolute",
    left: 0,
    bottom: 135,
    zIndex: 20,
    width: "100%",
    textAlign: "center",
    background: "#00800082",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    height: 100,
    width: "100%",
    zIndex: 10,
    background: "linear-gradient(transparent, #00000078 120%)",
  },
}));

export function Projects() {
  const { contract } = useContract();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProject | null;
  }>({ open: true, project: null });

  const { classes } = useStyles();

  useEffect(() => {
    if (contract) {
      setLoading(true);

      const fetchProjects = async () => {
        const projectList = [];
        const size = await contract?.functions.size();
        for (let i = 0; i < size; i++) {
          const project: IProject = await contract?.functions.projects(i);
          projectList.push(project);
        }
        setProjects(projectList);
        setLoading(false);
      };

      fetchProjects();
    }
  }, [contract]);

  if (loading || !contract) {
    return <div>Cargando...</div>;
  }

  const items = projects.map((p, i) => {
    const { foundingAmount, foundingTime, sellAmount, sellTime, raised } =
      p.financtialMetadata;

    return (
      <Card key={i} shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image src={p.metadataURL} height={160} alt={p.metadataURL} />
          <div style={{ position: "relative" }}>
            <div className={classes.overlay}></div>
            <Text color={"white"} className={classes.state} weight={500}>
              {projectStateLabels[p.state]}
            </Text>
            <Text color={"white"} className={classes.absolute} weight={500}>
              {p.name}
            </Text>
          </div>
        </Card.Section>

        <Card.Section m={"md"}>
          <Title align="center" order={3}>
            {p.produceIncome ? "Renta Mensual" : "Renta Final"}
          </Title>
          <Text color={"dimmed"} size={14} align="center">
            {p.produceIncome
              ? `Cobras en ${p.unitOfAccount ?? "USDC"} al final del plazo`
              : `Cobras en ${p.unitOfAccount ?? "USDC"} todos los meses`}
          </Text>
        </Card.Section>

        <Divider />

        <Card.Section m={"md"}>
          <Grid justify={"center"}>
            <Grid.Col span={5}>
              <Text size={16} align="center">
                {`${profit(Number(sellAmount), Number(foundingAmount)).toFixed(
                  2
                )} %`}
              </Text>
              <Text color={"dimmed"} size={12} align="center">
                {`Ganancia estimada`}
              </Text>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col span={5}>
              <Text size={16} align="center">
                {`${sellTime} meses`}
              </Text>
              <Text color={"dimmed"} size={12} align="center">
                {`Tiempo de retorno`}
              </Text>
            </Grid.Col>
          </Grid>
        </Card.Section>

        <Divider />

        <Card.Section m={"md"}>
          <Text color={"dimmed"} size={12}>{`${raisedRate(
            Number(raised),
            Number(foundingAmount)
          )}% invertido`}</Text>
          <Slider
            my={10}
            thumbChildren={null}
            style={{ cursor: "default" }}
            styles={{ thumb: { cursor: "default" } }}
            thumbSize={8}
            label={null}
            color={"teal"}
            value={raisedRate(Number(raised), Number(foundingAmount))}
          />
          <Group style={{ justifyContent: "space-between" }} mb={"md"}>
            <Text color={"dimmed"} size={12}>{`Total: ${Number(raised)} ${
              p.unitOfAccount ?? "USDC"
            }`}</Text>
            <Text color={"dimmed"} size={12}>{`Meta: ${Number(
              foundingAmount
            )} ${p.unitOfAccount ?? "USDC"}`}</Text>
          </Group>
        </Card.Section>
        <Card.Section>
          <Center>
            <Button
              color={"teal"}
              radius={"lg"}
              leftIcon={<IconPlus size={18} />}
              onClick={() => setModalState({ open: true, project: p })}
              m="md"
            >
              Ver detalle
            </Button>
          </Center>
        </Card.Section>
      </Card>
    );
  });

  return (
    <Container>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {items}
      </SimpleGrid>
      <Modal
        size={"xl"}
        opened={modalState.open}
        title={<Title order={3}>Nuevo Proyecto</Title>}
        onClose={() => setModalState({ open: false, project: null })}
      >
        <Card.Section>
          <Image
            src={modalState.project?.metadataURL}
            height={160}
            alt={modalState.project?.metadataURL}
          />
          <div style={{ position: "relative" }}>
            <div className={classes.overlay}></div>
            <Text color={"white"} className={classes.absolute} weight={500}>
              {modalState.project?.name}
            </Text>
          </div>
        </Card.Section>
        <Card.Section>
          <Slider
            my={10}
            thumbChildren={null}
            style={{ cursor: "default" }}
            styles={{ thumb: { cursor: "default" } }}
            thumbSize={8}
            label={null}
            color={"teal"}
            value={33}
          />
          <Group style={{ justifyContent: "space-between" }} mb={"md"}>
            <Text color={"dimmed"} size={12}>
              Total: 1550 USDC
            </Text>
            <Text color={"dimmed"} size={12}>
              Meta: 222000 USDC
            </Text>
          </Group>
        </Card.Section>
      </Modal>
    </Container>
  );
}
