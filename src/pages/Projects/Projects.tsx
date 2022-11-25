import { IconPlus } from "@tabler/icons";

import {
  Card,
  Container,
  SimpleGrid,
  Text,
  Image,
  createStyles,
  Title,
  Divider,
  Group,
  Grid,
  Slider,
  Modal,
  Button,
  Center,
  Input,
  TextInput,
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
  }>({ open: false, project: null });

  const { classes } = useStyles();

  useEffect(() => {
    if (contract) {
      setLoading(true);

      const fetchProjects = async () => {
        const projectList = [];
        const size = await contract?.functions.size();
        for (let i = size - 1; i >= 0; i--) {
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
    const { foundingAmount, sellAmount, sellTime, raised } =
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
        onClose={() => setModalState({ open: false, project: null })}
      >
        <Grid>
          <Grid.Col md={6} lg={7}>
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
          </Grid.Col>
          <Grid.Col md={6} lg={5}>
            <Card.Section m={"md"}>
              <Grid justify={"center"}>
                <Grid.Col span={5}>
                  <Text size={18} align="center" color="teal">
                    <strong>
                      {`${profit(
                        Number(modalState.project?.financtialMetadata.sellAmount),
                        Number(modalState.project?.financtialMetadata.foundingAmount)
                      ).toFixed(2)} %`}
                    </strong>
                  </Text>
                  <Text color={"dimmed"} size={12} align="center">
                    {`Ganancia estimada`}
                  </Text>
                </Grid.Col>
                <Divider orientation="vertical" />
                <Grid.Col span={5}>
                  <Text size={18} align="center" color="teal">
                    <strong>{`${Number(modalState.project?.financtialMetadata.sellTime)} Meses`}</strong>
                  </Text>
                  <Text color={"dimmed"} size={12} align="center">
                    {`Tiempo de retorno`}
                  </Text>
                </Grid.Col>
              </Grid>
            </Card.Section>
            <Card.Section>
              <Text color={"dimmed"} size={12}>
                {`${raisedRate(
                  Number(modalState.project?.financtialMetadata.raised),
                  Number(modalState.project?.financtialMetadata.foundingAmount)
                )}% invertido`}
              </Text>
              <Slider
                my={10}
                thumbChildren={null}
                style={{ cursor: "default" }}
                styles={{ thumb: { cursor: "default" } }}
                thumbSize={8}
                label={null}
                color={"teal"}
                value={modalState.project ? raisedRate(
                  Number(modalState.project.financtialMetadata.raised),
                  Number(modalState.project.financtialMetadata.foundingAmount)
                ) : 0}
              />
              <Group style={{ justifyContent: "space-between" }} mb={"md"}>
                <Text color={"dimmed"} size={12}>
                  {`Total: ${Number(modalState.project?.financtialMetadata.raised)} USDC`}
                </Text>
                <Text color={"dimmed"} size={12}>
                  {`Meta: ${Number(modalState.project?.financtialMetadata.foundingAmount)} USDC`}
                </Text>
              </Group>
            </Card.Section>
          </Grid.Col>
        </Grid>
        <Grid bg={"gray.1"} p="md">
          <Grid.Col span={3}>
            <Text color={"dimmed"} size={13} align="center">
              TOKEN
            </Text>
            <Text size={18} align="center">
              <strong>SPT23</strong>
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text color={"dimmed"} size={13} align="center">
              Modelo de ratio
            </Text>
            <Text size={18} align="center">
              <strong>Lineal</strong>
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <form>
              <Input.Wrapper>
                <Group position="center" grow>
                  <TextInput placeholder="500 USDC" />
                  <Button
                    variant="gradient"
                    gradient={{ from: "teal", to: "blue.9", deg: 60 }}
                    radius={"lg"}
                    m="md"
                  >
                    Invertir
                  </Button>
                </Group>
              </Input.Wrapper>
            </form>
          </Grid.Col>
        </Grid>
        <Card.Section mt="lg">
          <Title color={"teal"} size={24}>
            Detalles
          </Title>

          <Text size={14}>Modelo de valuación (Valuation model): <strong>{modalState.project?.valuationModel ?? 'Por ratio (rate)'}</strong></Text>
          <Text size={14}>Modelo de comisión (Fee model): <strong>{modalState.project?.feeModel ?? 'Listado (Listing fee)'}</strong></Text>
          <Text size={14}>Unidades en circulación (Max supply): <strong>{`${modalState.project?.maxSupply} Tokens`}</strong></Text>
          <Text size={14}>Metas de venta: <strong>{`${modalState.project?.financtialMetadata.sellAmount} USDC`}</strong></Text>
          <Text size={14}>Meta de tiempo de ventas: <strong>{`${modalState.project?.financtialMetadata.sellTime} Meses`}</strong></Text>
          <Text size={14}>Meta de financiamiento:<strong>{`${modalState.project?.financtialMetadata.foundingAmount} USDC`}</strong></Text>
          <Text size={14}>Meta de tiempo de financiamiento: <strong>{`${modalState.project?.financtialMetadata.foundingTime} Días`}</strong></Text>
        </Card.Section>
      </Modal>
    </Container>
  );
}
