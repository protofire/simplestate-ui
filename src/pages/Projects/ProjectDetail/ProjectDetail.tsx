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
  Loader,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useContract } from "../../../hooks/useContract";
import { useMetamask } from "../../../hooks/useMetamask";
import { showNotification } from "@mantine/notifications";
import { NotificationMessage } from "../../../components/Notification/NotificationMessage";
import { utils } from "ethers";
import { IconCheck, IconX } from "@tabler/icons";
import * as Utils from "../../../utils/utilities";
import { metamaskErrors } from "../../../constants/errors";
import { IProjectMetadata } from "../../../types/projectMetadata";

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

export function ProjectDetail({ project }: { project: IProjectMetadata | null }) {
  const { classes } = useStyles();
  const { connectDefault, signer, accounts } = useMetamask();
  const { sign } = useContract('registry');

  const [investmentValue, setInvestmentValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    connectDefault();
  }, []);

  const invest = async () => {
    if (!investmentValue) return setError("Please set an investment value");
    if (!signer || accounts.length === 0)
      return setError("Please connect your wallet");
    setError("");
    setLoading(true);

    try {
      const signedContract = await sign(signer);
      const tx = await signedContract?.functions.invest(project?.address, {
        value: utils.parseUnits(investmentValue.toString(), "ether"),
      });
      await tx.wait();
      showNotification({
        id: "success",
        autoClose: 5000,
        title: "Inversion realizada",
        icon:<IconCheck size={18} />,
        message: (
          <NotificationMessage
            investmentValue={investmentValue}
            projectName={project?.name}
          />
        ),
        color: "teal",
        radius: "md",
      });
    } catch (err) {
      if (err instanceof Error) {

        console.log((err as any).reason);

        showNotification({
          id: "error",
          autoClose: 5000,
          title: "Ocurrió un error",
          icon:<IconX size={18} />,
          message: metamaskErrors[(err as any).reason] ?? '',
          color: "red",
          radius: "md",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return <></>;
  }

  const { 
    sellingAmountTarget,
    fundingAmountTarget,
    sellingTimeTarget,
    fundingTimeTarget
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
      <Grid bg={"gray.1"} p="md">
        <Grid.Col span={3}>
          <Text color={"dimmed"} size={13} align="center">
            TOKEN
          </Text>
          <Text size={18} align="center">
            <strong>{project.token ? project.token.symbol : ' - '}</strong>
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
                  type={"number"}
                  onChange={(e) => setInvestmentValue(Number(e.target.value))}
                  disabled={loading}
                  error={error}
                />
                <Button
                  variant="gradient"
                  gradient={{ from: "teal", to: "blue.9", deg: 60 }}
                  radius={"lg"}
                  m="md"
                  onClick={invest}
                  disabled={loading}
                  leftIcon={loading && <Loader size={14} />}
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
        <Text size={14}>
          Address:{" "}
          <strong>{project.address ?? "-"}</strong>
        </Text>
        <Text size={14}>
          Modelo de valuación (Valuation model):{" "}
          <strong>{project.valuationModel ?? "Por ratio (rate)"}</strong>
        </Text>
        <Text size={14}>
          Modelo de comisión (Fee model):{" "}
          <strong>{project.feeModel ?? "Listado (Listing fee)"}</strong>
        </Text>
        <Text size={14}>
          Metas de venta:{" "}
          <strong>{`${sellingAmountTarget} USDC`}</strong>
        </Text>
        <Text size={14}>
          Meta de tiempo de ventas:{" "}
          <strong>{new Date(sellingTimeTarget * 1000).toLocaleDateString('es-AR')}</strong>
        </Text>
        <Text size={14}>
          Meta de financiamiento:
          <strong>{`${fundingAmountTarget} USDC`}</strong>
        </Text>
        <Text size={14}>
          Meta de tiempo de financiamiento:{" "}
          <strong>{new Date(fundingTimeTarget * 1000).toLocaleDateString('es-AR')}</strong>
        </Text>
      </Card.Section>
    </>
  );
}
