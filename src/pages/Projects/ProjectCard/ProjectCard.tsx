
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
import { IProject } from "../../../types/project";
import * as Utils from "../../../utils/utilities";

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

export function ProjectCard({ project, openModal }: { project: IProject, openModal(p: IProject): void}) {
  const { classes } = useStyles();

  const { foundingAmount, sellAmount, sellTime, raised } = project.financtialMetadata;

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section>
        <Image src={project.metadataURL} height={160} alt={project.metadataURL} />
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
          {project.produceIncome ? "Renta Mensual" : "Renta Final"}
        </Title>
        <Text color={"dimmed"} size={14} align="center">
          {project.produceIncome
            ? `Cobras en ${project.unitOfAccount ?? "USDC"} al final del plazo`
            : `Cobras en ${project.unitOfAccount ?? "USDC"} todos los meses`}
        </Text>
      </Card.Section>

      <Divider />

      <Card.Section m={"md"}>
        <Grid justify={"center"}>
          <Grid.Col span={5}>
            <Text size={16} align="center">
              {`${Utils.profit(Number(sellAmount), Number(foundingAmount)).toFixed(
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
        <Text color={"dimmed"} size={12}>{`${Utils.raisedRate(
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
          value={Utils.raisedRate(Number(raised), Number(foundingAmount))}
        />
        <Group style={{ justifyContent: "space-between" }} mb={"md"}>
          <Text color={"dimmed"} size={12}>{`Total: ${Number(raised)} ${
            project.unitOfAccount ?? "USDC"
          }`}</Text>
          <Text color={"dimmed"} size={12}>{`Meta: ${Number(
            foundingAmount
          )} ${project.unitOfAccount ?? "USDC"}`}</Text>
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