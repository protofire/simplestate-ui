import {
  Button,
  Title,
  Text,
  Group,
  Paper,
  Grid,
  TextInput,
  Loader,
  Center,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { buildNotification, NotificationType } from "../../constants/notifications";
import { useApi } from "../../hooks/useApi";
import { SimpleEarnInvestment } from '../../types/simple-earn';

export function SimpleEarn() {
  const { getSimpleEarnInvestment, investSimpleEarn, redeemSimpleEarn, setSimplearnRate } = useApi();

  const [investment, setInvestment] = useState<SimpleEarnInvestment>();
  const [loading, setLoading] = useState(false);

  const [amountToInvest, setAmountToInvest] = useState<number>();
  const [loadingInvestment, setLoadingInvestment] = useState(false);

  const [amountToRedeem, setAmountToRedeem] = useState<number>();
  const [loadingRedemtion, setLoadingRedemption] = useState(false);

  const [rate, setRate] = useState<number>();
  const [loadingRate, setLoadingRate] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSimpleEarnInvestment().then((investment) => {
      setInvestment(investment);
      setLoading(false);
    });
  }, [getSimpleEarnInvestment]);

  const invest = async () => {
    if(!amountToInvest) return;

    setLoadingInvestment(true);
    try {
      await investSimpleEarn(amountToInvest);
      const notification = buildNotification(NotificationType.INVEST_SIMPLEARN_SUCCESS);
      showNotification(notification);
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.INVEST_SIMPLEARN_ERROR, {error: err});
      showNotification(notification);
    } finally {
      setLoadingInvestment(false);
    }
  }

  const redeem = async () => {
    if(!amountToRedeem) return;
    setLoadingRedemption(true)
    try {
      await redeemSimpleEarn(amountToRedeem);
      const notification = buildNotification(NotificationType.REDEEM_SIMPLEARN_SUCCESS);
      showNotification(notification);
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.REDEEM_SIMPLEARN_ERROR, {error: err});
      showNotification(notification);
    } finally {
      setLoadingRedemption(false);
    }
  }

  const submitRate = async () => {
    if(!rate) return;
    setLoadingRate(true)
    try {
      await setSimplearnRate(rate);
      const notification = buildNotification(NotificationType.RATE_SIMPLEARN_SUCCESS);
      showNotification(notification);
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.RATE_SIMPLEARN_ERROR, {error: err});
      showNotification(notification);
    } finally {
      setLoadingRate(false);
    }
  }

  return (
    <>
      <Title size={"lg"} mb="lg">
        Simple Earn
      </Title>
      {loading 
      ? 
        <Center m={"xl"}>
          <Loader color="teal" size="lg" variant="bars" />
        </Center> 
      : <><Paper radius="xs" p="lg" mb="xl" withBorder>
        <Grid>
          <Grid.Col span={4}>
            <Text>Balance: {investment?.balance} SET</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Valor actual: {investment?.underlyingBalance} USDC</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>APY: {investment?.apy.toFixed(2)}%</Text>
          </Grid.Col>
        </Grid>
        <Group position="center" grow>
          <Text>Comprar Simple Earn Token (SET)</Text>

          <TextInput 
            placeholder="500 SET" 
            type={"number"} 
            onChange={(e) => setAmountToInvest(Number(e.target.value))}
            disabled={loadingInvestment}
            />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue.9", deg: 60 }}
            radius={"lg"}
            m="md"
            onClick={invest}
            disabled={!amountToInvest || loadingInvestment}
            leftIcon={loadingInvestment && <Loader size={14} />}
          >
            Comprar
          </Button>
        </Group>
        <Group position="center" grow>
          <Text>Redimir Simple Earn Token (SET)</Text>

          <TextInput 
            placeholder="500 SET" 
            type={"number"} 
            onChange={(e) => setAmountToRedeem(Number(e.target.value))}
            disabled={loadingRedemtion}
            />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue.9", deg: 60 }}
            radius={"lg"}
            m="md"
            onClick={redeem}
            disabled={!amountToRedeem || !investment?.balance || loadingRedemtion}
            leftIcon={loadingRedemtion && <Loader size={14} />}
          >
            Redimir
          </Button>
        </Group>
      </Paper>
      <Title size={"lg"} mb="lg">
          Administrar 
        </Title>
        <Paper radius="xs" p="lg" mb="xl" withBorder>
        <Group position="center" grow>
          <Text>Ingresar Tasa de interés anual (APY)</Text>

          <TextInput 
            placeholder="ej: 5"
            type={"number"} 
            onChange={(e) => setRate(Number(e.target.value))}
            disabled={loadingRate}
            rightSection={'%'}
            />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue.9", deg: 60 }}
            radius={"lg"}
            m="md"
            onClick={submitRate}
            disabled={!rate || loadingRate}
            leftIcon={loadingRate && <Loader size={14} />}
          >
            Confirmar
          </Button>
        </Group>
        </Paper>
      </>}
    </>
  );
}