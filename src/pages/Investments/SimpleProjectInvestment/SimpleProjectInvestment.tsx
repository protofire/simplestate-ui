

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
import { buildNotification, NotificationType } from "../../../constants/notifications";
import { showNotification } from "@mantine/notifications";

export function SimpleProjectInvestment() {
  const { getInvestments, redeem, getClaimableRent } = useApi();

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

  useEffect(() => {
    if (investments.length === 0) return;
    const rentInvestments = investments.filter(i => i.project.booleanConfigs.produceIncome);
    Promise.all(rentInvestments.map(i => getClaimableRent(i.project.address))).then((c) => {
      console.log('claimable rent', c);
    });
  }, [getClaimableRent, investments]);

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
    const { sellingAmountTarget } = investment.project.targets;
    const state = investment.project.state;
    const totalUnderlyingBalance = investment.balance * sellingAmountTarget / investment.token.supply;

    const allowInvest = investment.project.state === State.Initialized;
    const allowRedeem = (state === State.Funded && investment.project.booleanConfigs.allowPartialSell) || state === State.Closed;
    const produceIncome = investment.project.booleanConfigs.produceIncome;

    if(produceIncome) {
      getClaimableRent(investment.project.address)
    }

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
            <Tooltip label={`Monto a redimir una vez finalizado el per??odo`} withArrow>
              <Group>
                <Text color="violet.9">
                  <strong>{investment.balance}</strong>
                </Text>
                <IconInfoCircle size={20} />
              </Group>
            </Tooltip>
            <Text align="center">
              (<strong>{state >= State.Funded ? totalUnderlyingBalance.toFixed(2) : '-'}</strong> USDC)
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
          {allowInvest && 
            <Tooltip label="Depositar fondos" withArrow>
              <Button
                size="xs"
                color={"teal"}
                radius={"lg"}
                variant="light"
                onClick={() => setModalState({ open: true, project: investment.project })}
              >
                Invertir
              </Button>
            </Tooltip>}
          {allowRedeem && 
            <Tooltip label="Redimir fondos" withArrow>
              <Button
                leftIcon={loadingRedeem && <Loader size={14} />}
                size="xs"
                color={"blue"}
                radius={"lg"}
                variant="light"
                onClick={() => redeemTokens(totalUnderlyingBalance, investment)}
                disabled={loadingRedeem}
              >
                Redimir
              </Button>
            </Tooltip>
          }
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