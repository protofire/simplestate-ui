

import {
  Button,
  Table,
  Title,
  Tooltip,
  Text,
  Group,
  Flex,
  Badge,
  Modal,
  Center,
  Loader,
} from "@mantine/core";
import { colorsByState, projectStateLabels, State } from "../../../constants/projectState";
import SSToken from "../../../assets/SSToken.svg";
import { IconInfoCircle } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { Investment } from "../../../types/investment";
import { IProjectMetadata } from "../../../types/projectMetadata";
import { ProjectDetail } from "../../Projects/ProjectDetail/ProjectDetail";
import { profit } from "../../../utils/utilities";
import { buildNotification, NotificationType } from "../../../constants/notifications";
import { showNotification } from "@mantine/notifications";

export function SimpleProjectInvestment() {
  const { getInvestments, redeem } = useApi();

  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProjectMetadata | null;
  }>({ open: false, project: null });

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);

  const [loadingRedeem, setLoadingRedeem] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvestments().then((investments) => {
      if (investments) {
        setInvestments(investments);
        setLoading(false);
      }
    });
  }, [getInvestments, updating]);

  if (loading) {
    return (
      <Center m={"xl"}>
        <Loader color="teal" size="lg" variant="bars" />
      </Center>
    );
  }

  const reset = () => {
    setUpdating(u => !u);
  }

  const redeemTokens = async (amount: number, investment: Investment) => {
    try {
      setLoadingRedeem(true);
      await redeem(amount, investment.project.address, investment.token.address);
      const successNotification = buildNotification(NotificationType.REDEEM_TOKENS_SUCCESS);
      showNotification(successNotification);
      reset();
    } catch (err) {
      console.error(err);
      const errorNotification = buildNotification(NotificationType.REDEEM_TOKENS_ERROR, err);
      showNotification(errorNotification);
    } finally {
      setLoadingRedeem(false);
    }
  }

  const rows = investments.map((investment) => {
    const { sellingAmountTarget, fundingAmountTarget } = investment.project.targets;
    const profitRate = profit(sellingAmountTarget, fundingAmountTarget) / 100;
    const underlyingBalance = investment.balance / investment.rate;
    const totalUnderlyingBalance = underlyingBalance + underlyingBalance * profitRate;

    return (
      <tr key={investment.project.name}>
        <td>{investment.project.name}</td>
        <td>
          <Badge color={colorsByState[investment.project.state]} radius="lg" variant="dot">
            {projectStateLabels[investment.project.state]}
          </Badge>
        </td>
        <td>
          <img src={SSToken} width={26} /> {investment.token.symbol}
        </td>
        <td>
          <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
            <Tooltip label={`Rate: ${profitRate * 100} %`} withArrow>
              <Group>
                <Text color="violet.9">
                  <strong>{investment.balance}</strong>
                </Text>
                <IconInfoCircle size={20} />
              </Group>
            </Tooltip>
            <Text align="center">
              (<strong>{totalUnderlyingBalance}</strong> USDC)
            </Text>
          </Flex>
        </td>
        {/* <td>
          <Group position="right">
            <Text align="center" color="gray">
              {investment.project.state !== State.Funded ? (
                <span>
                  <strong>0</strong> USDC
                </span>
              ) : (
                <Text color="green">
                  <strong>-</strong> USDC
                </Text>
              )}
            </Text>
            <Tooltip label="Retirar renta disponible" withArrow>
              <Button
                size="xs"
                color={"teal"}
                radius={"lg"}
                compact
                disabled={investment.project.state !== State.Funded}
              >
                Retirar
              </Button>
            </Tooltip>
          </Group>
        </td> */}
        <td>
          {investment.project.state < State.Closed ? (
            <Tooltip label="Depositar fondos" withArrow>
              <Button
                size="xs"
                color={"teal"}
                radius={"lg"}
                variant="light"
                onClick={() => setModalState({ open: true, project: investment.project })}
                disabled={investment.project.state !== State.Initialized}
              >
                Invertir
              </Button>
            </Tooltip>
          ) : (
            <Tooltip label="Redimir fondos" withArrow>
              <Button
                leftIcon={loadingRedeem && <Loader size={14} />}
                size="xs"
                color={"blue"}
                radius={"lg"}
                variant="light"
                onClick={() => redeemTokens(totalUnderlyingBalance, investment)}
                disabled={investment.project.state !== State.Closed || loadingRedeem}
              >
                Redimir
              </Button>
            </Tooltip>
          )}
        </td>
      </tr>)
  });

  return (
    <>
      <Title size={"lg"} mb="lg">
        Proyectos
      </Title>
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        withBorder
        highlightOnHover
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Token</th>
            <th>Balance</th>
            {/* <th>Renta disponible</th> */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Modal
        opened={modalState.open}
        onClose={() => setModalState({ open: false, project: null })}
        title="Depositar fondos"
        size={"xl"}
      >
        <ProjectDetail project={modalState.project} />
      </Modal>
    </>
  );
}