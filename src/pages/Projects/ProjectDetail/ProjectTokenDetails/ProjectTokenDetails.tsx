
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
import { useContract } from "../../../../hooks/useContract";
import { useMetamask } from "../../../../hooks/useMetamask";
import { showNotification } from "@mantine/notifications";
import { NotificationMessage } from "../../../../components/Notification/NotificationMessage";
import { utils } from "ethers";
import { IconCheck, IconX } from "@tabler/icons";
import { metamaskErrors } from "../../../../constants/errors";
import { IProjectMetadata } from "../../../../types/projectMetadata";

export function ProjectTokenDetails({ project }: { project: IProjectMetadata }) {
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
    </>
  );
}
