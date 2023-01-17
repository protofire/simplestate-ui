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
import { buildNotification, NotificationType } from "../../../constants/notifications";
import { useApi } from "../../../hooks/useApi";
import { SimpleEarnInvestment } from '../../../types/simple-earn'

const mock: SimpleEarnInvestment = {
  balance: 10,
  value: 30,
  apy: 5
}

export function SimpleEarn() {
  const { getSimpleEarnInvestment, investSimpleEarn, redeemSimpleEarn } = useApi();

  const [investment, setInvestment] = useState<SimpleEarnInvestment>();
  const [loading, setLoading] = useState(false);

  const [amountToInvest, setAmountToInvest] = useState<number>();
  const [loadingInvestment, setLoadingInvestment] = useState(false);

  const [amountToRedeem, setAmountToRedeem] = useState<number>();
  const [loadingRedemtion, setLoadingRedemption] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSimpleEarnInvestment().then((investment) => {
      setTimeout(() => {
        setInvestment(mock);
        setLoading(false);
      }, 2000);
    });
  }, [getSimpleEarnInvestment]);

  const invest = () => {
    if(!amountToInvest) return;

    setLoadingInvestment(true);
    try {
      investSimpleEarn(amountToInvest);
      const notification = buildNotification(NotificationType.INVEST_SIMPLEARN_SUCCESS);
      showNotification(notification);
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.INVEST_SIMPLEARN_ERROR);
      showNotification(notification);
    } finally {
      setLoadingInvestment(false);
    }
  }

  const redeem = () => {
    if(!amountToRedeem) return;
    setLoadingRedemption(true)
    try {
      redeemSimpleEarn(amountToRedeem);
      const notification = buildNotification(NotificationType.REDEEM_SIMPLEARN_SUCCESS);
      showNotification(notification);
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.REDEEM_SIMPLEARN_ERROR);
      showNotification(notification);
    } finally {
      setLoadingRedemption(false);
    }
  }

  return (
    <>
      <Title size={"lg"} mb="lg">
        Simple Earn
      </Title>
      {loading 
      ? <Center m={"xl"}>
          <Loader color="teal" size="lg" variant="bars" />
        </Center> 
      : <Paper radius="xs" p="lg" mb="xl" withBorder>
        <Grid>
          <Grid.Col span={4}>
            <Text>Balance: {investment?.balance} SET</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Valor actual: {investment?.value} USDC</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>APY: {investment?.apy}%</Text>
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
            disabled={!amountToRedeem || !investment?.value || loadingRedemtion}
          >
            Redimir
          </Button>
        </Group>
      </Paper>}
    </>
  );
}