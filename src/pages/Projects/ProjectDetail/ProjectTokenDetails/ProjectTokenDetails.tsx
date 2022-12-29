
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
import { buildNotification, NotificationType } from "../../../../constants/notifications";
import { useApi } from "../../../../hooks/useApi";

export function ProjectTokenDetails({ project }: { project: IProjectMetadata }) {
  const { connectDefault, signer, accounts } = useMetamask();
  const { investInProject } = useApi();

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
      await investInProject(project.address, investmentValue);
      const successNotification = buildNotification(
        NotificationType.INVEST_PROJECT_SUCCESS,
        { investmentValue, name: project?.name });
      showNotification(successNotification);
    } catch (err) {
      console.error(err);
      const errorNotification = buildNotification(
        NotificationType.INVEST_PROJECT_ERROR,
        { error: err });
      showNotification(errorNotification);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <strong>Manual</strong>
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
    </>
  );
}
