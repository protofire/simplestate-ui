import { Divider, Paper, Title, Text, TextInput, Group, Button, Loader, Center, Badge } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { buildNotification, NotificationType } from "../../constants/notifications";
import { useApi } from "../../hooks/useApi";
import { SimpleEarnMetrics } from "../../types/simple-earn-metrics";

export function SimpleEarnAdmin() {

  const { 
    simplearnAddress, 
    getSimpleEarnInvestment, 
    setSimplearnRate, 
    withdrawSimplearnFunds,
    setWithdrawalLimit
  } = useApi();
  const [metrics, setMetrics] = useState<SimpleEarnMetrics>();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [amountToWithdraw, setAmountToWithdraw] = useState<number>();
  const [loadingWithdrawAll, setLoadingWithdrawAll] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');

  const [rate, setRate] = useState<number>();
  const [loadingRate, setLoadingRate] = useState(false);


  const [limitWithdrawalAmount, setLimiWithdrawalAmount] = useState<number>();
  const [loadingLimitWithdrawalAmount, setLoadingWithdrawalAmount] = useState(false);
  const [limitWithdrawalTime, setLimiWithdrawalTime] = useState<number>();
  const [loadingLimitWithdrawalTime, setLoadingWithdrawalTime] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSimpleEarnInvestment().then((simplearn) => {
      if (simplearn) {
        setMetrics({
          tokenRate: simplearn.tokenRate,
          totalWithdrawable: simplearn.totalWithdrawable,
          totalAssets: simplearn.totalAssets,
          symbol: simplearn.underlyingSymbol,
          withdrawalLimitTime: simplearn.withdrawalLimitTime,
          withdrawalLimitAmount: simplearn.withdrawalLimitAmount,
          apy: simplearn.apy
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

  const submitLimitWithdrawalAmount = async () => {
    if (!limitWithdrawalAmount || !metrics) return;

    setLoadingWithdrawalAmount(true); 
    try {
      await setWithdrawalLimit(limitWithdrawalAmount, metrics.withdrawalLimitTime);
      const notification = buildNotification(NotificationType.WITHDRAW_LIMIT_SUCCESS);
      showNotification(notification);
      reload();
    }
    catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.WITHDRAW_LIMIT_ERROR, {error: err});
      showNotification(notification);
    }
    finally {
      setLoadingWithdrawalAmount(false);
    }
  }

  const submitLimitWithdrawalTime = async () => {
    if (!limitWithdrawalTime || !metrics) return;

    setLoadingWithdrawalTime(true); 
    try {
      await setWithdrawalLimit(metrics.withdrawalLimitAmount , limitWithdrawalTime);
      const notification = buildNotification(NotificationType.WITHDRAW_LIMIT_SUCCESS);
      showNotification(notification);
      reload();
    }
    catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.WITHDRAW_LIMIT_ERROR, {error: err});
      showNotification(notification);
    }
    finally {
      setLoadingWithdrawalTime(false);
    }
  }

 return (
  <>
    <Title size={"lg"} mb="lg">
      Administrar 
    </Title>
    {loading 
      ? 
        <Center m={"xl"}>
          <Loader color="teal" size="lg" variant="bars" />
        </Center> 
      : <Paper radius="xs" p="lg" mb="xl" withBorder>
      <Text size={'sm'}>Simplearn Address: {simplearnAddress}</Text>
      <Divider my={20}></Divider>
      <Badge>
        <Text color={'teal'}>APY: {metrics?.apy.toFixed(2)}%</Text>
      </Badge>

      <Text >Reserva: {metrics?.totalWithdrawable} {metrics?.symbol ?? 'USDC'}</Text>

      <Text >Deuda con tenedores: {metrics?.totalAssets} {metrics?.symbol ?? 'USDC'}</Text>

      <Text >Límite de retiro: {metrics?.withdrawalLimitAmount} {metrics?.symbol ?? 'USDC'} (Cada {metrics?.withdrawalLimitTime} Horas)</Text> 

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

      <Divider my={20}></Divider>

      <Group position="center" grow>
        <Text>Ingresar monto límite de retiro ({metrics?.symbol ?? ''})</Text>
        <TextInput 
          placeholder="ej: 5000"
          type={"number"} 
          onChange={(e) => setLimiWithdrawalAmount(Number(e.target.value))}
          disabled={loadingLimitWithdrawalAmount}
          />
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue.9", deg: 60 }}
          radius={"lg"}
          m="md"
          onClick={submitLimitWithdrawalAmount}
          disabled={!limitWithdrawalAmount || loadingLimitWithdrawalAmount}
          leftIcon={loadingLimitWithdrawalAmount && <Loader size={14} />}
        >
          Confirmar
        </Button>
      </Group>

      <Group position="center" grow>
        <Text>Ingresar período para monto límite de retiro (en Horas)</Text>
        <TextInput 
          placeholder="ej: 24"
          type={"number"} 
          onChange={(e) => setLimiWithdrawalTime(Number(e.target.value))}
          disabled={loadingLimitWithdrawalTime}
          />
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue.9", deg: 60 }}
          radius={"lg"}
          m="md"
          onClick={submitLimitWithdrawalTime}
          disabled={!limitWithdrawalTime || loadingLimitWithdrawalTime}
          leftIcon={loadingLimitWithdrawalTime && <Loader size={14} />}
        >
          Confirmar
        </Button>
      </Group>
    </Paper>}
  </>
 );
}