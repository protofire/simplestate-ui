import {
  Text,
  Group,
  Grid,
  Button,
  Input,
  TextInput,
  Loader,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useMetamask } from "../../../../hooks/useMetamask";
import { showNotification } from "@mantine/notifications";
import { IProjectMetadata } from "../../../../types/projectMetadata";
import {
  buildNotification,
  NotificationType,
} from "../../../../constants/notifications";
import { useApi } from "../../../../hooks/useApi";
import { State } from "../../../../constants/projectState";

export function ProjectTokenDetails({
  project,
}: {
  project: IProjectMetadata;
}) {
  const { 
    fundingAmountTarget,
  } = project.targets;
  const { connectDefault, signer, accounts } = useMetamask();
  const { investInProject } = useApi();

  const [investmentValue, setInvestmentValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    connectDefault();
  }, []);

  const invest = async () => {
    if (!investmentValue) return setError("Por favor, ingresa un monto válido");
    if (investmentValue + project.financialTracking.fundingRaised > fundingAmountTarget) return setError("Ingrese un monto inferior a la meta de financiamiento.")
    if (!signer || accounts.length === 0)
      return setError("Por favor, conecta tu wallet");
    if (!project.token) return setError('Token no encontrado');
    setError("");
    setLoading(true);

    try {
      await investInProject(project.address, investmentValue, project.token);
      const successNotification = buildNotification(
        NotificationType.INVEST_PROJECT_SUCCESS,
        { investmentValue, project }
      );
      showNotification(successNotification);
    } catch (err) {
      console.error(err);
      const errorNotification = buildNotification(
        NotificationType.INVEST_PROJECT_ERROR,
        { error: err }
      );
      showNotification(errorNotification);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid bg={"gray.1"} p="md" align="center">
        <Grid.Col span={3}>
          <Text color={"dimmed"} size={13} align="center">
            TOKEN
          </Text>
          <Text size={18} align="center">
            <strong>{project.token ? project.token.symbol : " - "}</strong>
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text color={"dimmed"} size={13} align="center">
            Modelo de ratio
          </Text>
          <Text size={18} align="center">
            <strong>Manual</strong>
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <form>
            <Input.Wrapper>
              <Group position="center" grow>
                <TextInput
                  placeholder={`500 ${project.underlyingToken.symbol ?? 'USDC'}`}
                  type={"number"}
                  onChange={(e) => setInvestmentValue(Number(e.target.value))}
                  disabled={loading || project.state !== State.Initialized}
                  error={error}
                />
                <Button
                  variant="gradient"
                  gradient={{ from: "teal", to: "blue.9", deg: 60 }}
                  radius={"lg"}
                  m="md"
                  onClick={invest}
                  disabled={loading || project.state !== State.Initialized}
                  leftIcon={loading && <Loader size={14} />}
                >
                  Invertir
                </Button>
              </Group>
              <Group>
                {project.state !== State.Initialized ? (
                  <Text size={"xs"} color="blue">
                    Solo se permiten inversiones en proyectos inicializados.
                  </Text>
                ) : (
                  <></>
                )}
              </Group>
            </Input.Wrapper>
          </form>
        </Grid.Col>
      </Grid>
    </>
  );
}
