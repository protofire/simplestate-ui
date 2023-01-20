
import { IconPlus } from "@tabler/icons";
import {
  Card,
  Text,
  Image,
  createStyles,
  Title,
  Divider,
  Group,
  Grid,
  Slider,
  Button,
  Center,
} from "@mantine/core";
import { projectStateLabels } from "../../../constants/projectState";
import * as Utils from "../../../utils/utilities";
import { IProjectMetadata } from "../../../types/projectMetadata";

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

interface ProjectCardParams {
  project: IProjectMetadata,
  openModal(p: IProjectMetadata): void
}

export function ProjectCard({ project, openModal }: ProjectCardParams) {
  const { classes } = useStyles();

  const { 
    fundingAmountTarget,
    sellingAmountTarget,
    sellingTimeTarget 
  } = project.targets;

  const { fundingRaised } = project.financialTracking;

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section>
        <Image src={project.offchainLink} height={160} alt={project.offchainLink} />
        <div style={{ position: "relative" }}>
          <div className={classes.overlay}></div>
          <Text color={"white"} className={classes.state} weight={500}>
            {projectStateLabels[project.state]}
          </Text>
          <Text color={"white"} className={classes.absolute} weight={500}>
            {project.name}
          </Text>
        </div>
      </Card.Section>

      <Card.Section m={"md"}>
        <Title align="center" order={3}>
          {project.booleanConfigs.produceIncome ? "Renta Mensual" : "Renta Final"}
        </Title>
        <Text color={"dimmed"} size={14} align="center">
          {project.booleanConfigs.produceIncome
            ? `Cobras en ${project.underlyingToken.symbol ?? "USDC"} todos los meses`
            : `Cobras en ${project.underlyingToken.symbol ?? "USDC"} al finalizar el período`}
        </Text>
      </Card.Section>

      <Divider />

      <Card.Section m={"md"}>
        <Grid justify={"center"}>
          <Grid.Col span={5}>
            <Text size={16} align="center">
              {`${Utils.profit(Number(sellingAmountTarget), Number(fundingAmountTarget)).toFixed(
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
              {new Date(sellingTimeTarget * 1000).toLocaleDateString('es-AR')}
            </Text>
            <Text color={"dimmed"} size={12} align="center">
              {`Fecha de retorno`}
            </Text>
          </Grid.Col>
        </Grid>
      </Card.Section>

      <Divider />

      <Card.Section m={"md"}>
        <Text color={"dimmed"} size={12}>{`${Utils.raisedRate(
          Number(fundingRaised),
          Number(fundingAmountTarget)
        ).toFixed(2)}% invertido`}</Text>
        <Slider
          my={10}
          thumbChildren={null}
          style={{ cursor: "default" }}
          styles={{ thumb: { cursor: "default" } }}
          thumbSize={8}
          label={null}
          color={"teal"}
          value={Utils.raisedRate(Number(fundingRaised), Number(fundingAmountTarget))}
        />
        <Group style={{ justifyContent: "space-between" }} mb={"md"}>
          <Text color={"dimmed"} size={12}>{`Total: ${Number(fundingRaised)} ${
            project.underlyingToken.symbol ?? "USDC"
          }`}</Text>
          <Text color={"dimmed"} size={12}>{`Meta: ${Number(
            fundingAmountTarget
          )} ${project.underlyingToken.symbol ?? "USDC"}`}</Text>
        </Group>
      </Card.Section>
      <Card.Section>
        <Center>
          <Button
            color={"teal"}
            radius={"lg"}
            leftIcon={<IconPlus size={18} />}
            onClick={() => openModal(project)}
            m="md"
          >
            Ver detalle
          </Button>
        </Center>
      </Card.Section>
    </Card>
  );
}