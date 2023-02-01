import { Divider, Paper, Title, Text, TextInput, Group, Button, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { buildNotification, NotificationType } from "../../constants/notifications";
import { useApi } from "../../hooks/useApi";
import { SimpleEarnMetrics } from "../../types/simple-earn-metrics";


export function SimpleEarnAdmin() {

  const { simplearnAddress, getSimpleEarnInvestment, setSimplearnRate, withdrawSimplearnFunds } = useApi();
  const [metrics, setMetrics] = useState<SimpleEarnMetrics>();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [amountToWithdraw, setAmountToWithdraw] = useState<number>();
  const [loadingWithdrawAll, setLoadingWithdrawAll] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');

  const [rate, setRate] = useState<number>();
  const [loadingRate, setLoadingRate] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSimpleEarnInvestment().then((simplearn) => {
      if (simplearn) {
        setMetrics({
          tokenRate: simplearn.tokenRate,
          totalWithdrawable: simplearn.totalWithdrawable,
          totalAssets: simplearn.totalAssets,
          symbol: simplearn.underlyingSymbol
        });
      }
      setLoading(false);
    });
  }, [getSimpleEarnInvestment, update]);

  const reload = () => {
    setUpdate(u => !u);
  } 


  const submitRate = async () => {
    if(!rate) return;
    setLoadingRate(true)
    try {
      await setSimplearnRate(rate);
      const notification = buildNotification(NotificationType.RATE_SIMPLEARN_SUCCESS);
      showNotification(notification);
      reload();
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.RATE_SIMPLEARN_ERROR, {error: err});
      showNotification(notification);
    } finally {
      setLoadingRate(false);
    }
  }

  const withdrawAllFunds = async () => {
    if(!amountToWithdraw || !metrics) return;
    if (amountToWithdraw > metrics.totalWithdrawable) return setWithdrawError('No se puede retirar un monto mayor a la reserva.');

    setLoadingWithdrawAll(true)
    try {
      await withdrawSimplearnFunds(amountToWithdraw);
      const notification = buildNotification(NotificationType.WITHDRAW_SIMPLEARN_SUCCESS);
      showNotification(notification);
      reload();
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.WITHDRAW_SIMPLEARN_ERROR, {error: err});
      showNotification(notification);
    } finally {
      setLoadingWithdrawAll(false);
    }
  }

 return (
  <>
    <Title size={"lg"} mb="lg">
      Administrar 
    </Title>
    <Paper radius="xs" p="lg" mb="xl" withBorder>
      <Text size={'sm'}>Simplearn Address: {simplearnAddress}</Text>
      <Divider my={20}></Divider>

      <Text >Reserva: {metrics?.totalWithdrawable} {metrics?.symbol ?? 'USDC'}</Text>

      <Text >Deuda con tenedores: {metrics?.totalAssets} {metrics?.symbol ?? 'USDC'}</Text>
      <Divider my={20}></Divider>

      <Group position="center" grow>
        <Text>Retirar fondos existentes</Text>
        <TextInput 
          placeholder="ej: 1000"
          type={"number"} 
          onChange={(e) => setAmountToWithdraw(Number(e.target.value))}
          disabled={loadingWithdrawAll}
          error={withdrawError}
          />
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue.9", deg: 60 }}
          radius={"lg"}
          m="md"
          onClick={withdrawAllFunds}
          disabled={!amountToWithdraw || loadingWithdrawAll}
          leftIcon={loadingWithdrawAll && <Loader size={14} />}
        >
          Confirmar
        </Button>
      </Group>

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
  </>
 );
}