import {
  Card,
  Text,
  Image,
  createStyles,
  Divider,
  Group,
  Grid,
  Slider
} from "@mantine/core";
import * as Utils from "../../../../utils/utilities";
import { IProjectMetadata } from "../../../../types/projectMetadata";

const useStyles = createStyles(() => ({
  absolute: {
    position: "absolute",
    bottom: 5,
    left: 5,
    zIndex: 20,
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

export function ProjectStats({ project }: { project: IProjectMetadata }) {
  const { classes } = useStyles();

  const { 
    sellingAmountTarget,
    fundingAmountTarget,
    sellingTimeTarget
  } = project.targets;

  const { fundingRaised,  } = project.financialTracking

  return (
    <>
      <Grid>
        <Grid.Col md={6} lg={7}>
          <Card.Section>
            <Image
              src={project.offchainLink}
              height={160}
              alt={project.offchainLink}
            />
            <div style={{ position: "relative" }}>
              <div className={classes.overlay}></div>
              <Text color={"white"} className={classes.absolute} weight={500}>
                {project.name}
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
                    {`${Utils.profit(
                      Number(sellingAmountTarget),
                      Number(fundingAmountTarget)
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
                  <strong>{new Date(sellingTimeTarget * 1000).toLocaleDateString('es-AR')}</strong>
                </Text>
                <Text color={"dimmed"} size={12} align="center">
                  {`Tiempo de retorno`}
                </Text>
              </Grid.Col>
            </Grid>
          </Card.Section>
          <Card.Section>
            <Text color={"dimmed"} size={12}>
              {`${Utils.raisedRate(
                Number(fundingRaised),
                Number(fundingAmountTarget)
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
              value={
                project
                  ? Utils.raisedRate(
                      Number(fundingRaised),
                      Number(fundingAmountTarget)
                    )
                  : 0
              }
            />
            <Group style={{ justifyContent: "space-between" }} mb={"md"}>
              <Text color={"dimmed"} size={12}>
                {`Total: ${Number(fundingRaised)} USDC`}
              </Text>
              <Text color={"dimmed"} size={12}>
                {`Meta: ${Number(fundingAmountTarget)} USDC`}
              </Text>
            </Group>
          </Card.Section>
        </Grid.Col>
      </Grid>
    </>
  );
}
