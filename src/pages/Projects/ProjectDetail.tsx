
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
  Input,
  TextInput,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useContract } from "../../hooks/useContract";
import { IProject } from "../../types/project";
import { profit, raisedRate } from "../../utils";
import { useMetamask } from "../../hooks/useMetamask";

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

export function ProjectDetail({ project }: { project: IProject}) {
  const { classes } = useStyles();
  const [investmentValue, setInvestmentValue] = useState<number>();
  const { connectDefault, signer } = useMetamask();
  const { sign } = useContract();

  useEffect(() => {
    connectDefault();
  }, []);

  const invest = async () => {
    if (!investmentValue || !signer) return;
    const signedContract = await sign(signer);
    const tx = await signedContract?.functions.invest(project.id, { value: investmentValue });
    tx.wait();
  }

  return (
      <>
        <Grid>
          <Grid.Col md={6} lg={7}>
            <Card.Section>
              <Image
                src={project.metadataURL}
                height={160}
                alt={project.metadataURL}
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
                      {`${profit(
                        Number(project.financtialMetadata.sellAmount),
                        Number(project.financtialMetadata.foundingAmount)
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
                    <strong>{`${Number(project.financtialMetadata.sellTime)} Meses`}</strong>
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
                  Number(project.financtialMetadata.raised),
                  Number(project.financtialMetadata.foundingAmount)
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
                value={project ? raisedRate(
                  Number(project.financtialMetadata.raised),
                  Number(project.financtialMetadata.foundingAmount)
                ) : 0}
              />
              <Group style={{ justifyContent: "space-between" }} mb={"md"}>
                <Text color={"dimmed"} size={12}>
                  {`Total: ${Number(project.financtialMetadata.raised)} USDC`}
                </Text>
                <Text color={"dimmed"} size={12}>
                  {`Meta: ${Number(project.financtialMetadata.foundingAmount)} USDC`}
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
                  <TextInput
                    placeholder="500 USDC"
                    type={'number'}
                    onChange={(e) => setInvestmentValue(Number(e.target.value))}
                  />
                  <Button
                    variant="gradient"
                    gradient={{ from: "teal", to: "blue.9", deg: 60 }}
                    radius={"lg"}
                    m="md"
                    onClick={invest}
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

          <Text size={14}>Modelo de valuación (Valuation model): <strong>{project.valuationModel ?? 'Por ratio (rate)'}</strong></Text>
          <Text size={14}>Modelo de comisión (Fee model): <strong>{project.feeModel ?? 'Listado (Listing fee)'}</strong></Text>
          <Text size={14}>Unidades en circulación (Max supply): <strong>{`${project.maxSupply} Tokens`}</strong></Text>
          <Text size={14}>Metas de venta: <strong>{`${project.financtialMetadata.sellAmount} USDC`}</strong></Text>
          <Text size={14}>Meta de tiempo de ventas: <strong>{`${project?.financtialMetadata.sellTime} Meses`}</strong></Text>
          <Text size={14}>Meta de financiamiento:<strong>{`${project.financtialMetadata.foundingAmount} USDC`}</strong></Text>
          <Text size={14}>Meta de tiempo de financiamiento: <strong>{`${project.financtialMetadata.foundingTime} Días`}</strong></Text>
        </Card.Section>
    </>
  );
}