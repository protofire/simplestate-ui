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
  Avatar,
  Divider,
  Badge,
  Flex,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { buildNotification, NotificationType } from "../../constants/notifications";
import { useApi } from "../../hooks/useApi";
import { SimpleEarnInvestment } from '../../types/simple-earn';
import { SimpleEarnMetrics } from "../../types/simple-earn-metrics";
import tokenImg from '../../assets/SSToken.svg';

export function SimpleEarn() {
  const { 
    getSimpleEarnInvestment, 
    investSimpleEarn, 
    withdrawSimpleEarn, 
    setSimplearnRate, 
    simplearnAddress, 
    withdrawSimplearnFunds 
  } = useApi();

  const [investment, setInvestment] = useState<SimpleEarnInvestment>();
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState<SimpleEarnMetrics>();

  const [amountToInvest, setAmountToInvest] = useState<number>();
  const [loadingInvestment, setLoadingInvestment] = useState(false);

  const [amountToRedeem, setAmountToRedeem] = useState<number>();
  const [loadingRedemtion, setLoadingRedemption] = useState(false);
  const [redeemError, setRedeemError] = useState('');

  const [amountToWithdraw, setAmountToWithdraw] = useState<number>();
  const [loadingWithdrawAll, setLoadingWithdrawAll] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');

  const [update, setUpdate] = useState(false);

  const [rate, setRate] = useState<number>();
  const [loadingRate, setLoadingRate] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSimpleEarnInvestment().then((simplearn) => {
      if (simplearn) {
        setInvestment({ 
          apy: simplearn.apy,
          balance: simplearn.balance,
          symbol: simplearn.symbol, 
          underlyingBalance: simplearn.underlyingBalance,
          underlyingSymbol: simplearn.underlyingSymbol
        });

        console.log('underlying symbol', simplearn?.underlyingSymbol);

        setMetrics({
          tokenRate: simplearn.tokenRate,
          totalWithdrawable: simplearn.totalWithdrawable,
          totalAssets: simplearn.totalAssets
        });
      }
      setLoading(false);
    });
  }, [getSimpleEarnInvestment, update]);

  const reload = () => {
    setUpdate(u => !u);
  } 

  const invest = async () => {
    if(!amountToInvest) return;

    setLoadingInvestment(true);
    try {
      await investSimpleEarn(amountToInvest);
      const notification = buildNotification(NotificationType.INVEST_SIMPLEARN_SUCCESS);
      showNotification(notification);
      reload();
    } catch (err) {
      console.log(err);
      const notification = buildNotification(NotificationType.INVEST_SIMPLEARN_ERROR, {error: err});
      showNotification(notification);
    } finally {
      setLoadingInvestment(false);
    }
  }

  const withdraw = async () => {
    if(!amountToRedeem || !investment) return;
    if(amountToRedeem > investment.underlyingBalance) return setRedeemError('No puedes retirar un monto mayor a tu balance');
    setRedeemError('');
    
    setLoadingRedemption(true)
    try {
      await withdrawSimpleEarn(amountToRedeem);
      const notification = buildNotification(NotificationType.REDEEM_SIMPLEARN_SUCCESS);
      showNotification(notification);
      reload();
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
        Simple Earn
      </Title>
      {loading 
      ? 
        <Center m={"xl"}>
          <Loader color="teal" size="lg" variant="bars" />
        </Center> 
      : <><Paper radius="xs" p="lg" mb="xl" withBorder>
        <Grid >
          <Grid.Col span={6}>
            <Group>
            <Avatar
              src={tokenImg}
              alt="SimpleEarn"
            />
            <Text>1 SET = {metrics?.tokenRate} {investment?.underlyingSymbol ?? 'USDC'}</Text>
            </Group>
          </Grid.Col>
        </Grid>

        <Divider my={20}></Divider>
        
        <Flex >
         <Text mr={10}>Balance: {investment?.underlyingBalance} {investment?.underlyingSymbol ?? 'USDC'}</Text>
          <Text  mr={30} color={'dimmed'}>({investment?.balance} SET)</Text>            
          <Badge>
             <Text color={'teal'}>APY: {investment?.apy.toFixed(2)}%</Text>
          </Badge>
        </Flex>

        <Divider my={20}></Divider>

        <Group position="center" grow>
          <Text>Invertir ({investment?.underlyingSymbol ?? 'USDC'})</Text>

          <TextInput 
            placeholder={`500 ${investment?.underlyingSymbol ?? 'USDC'}`}
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
            Invertir
          </Button>
        </Group>
        <Group position="center" grow>
          <Text>Retirar ganancias ({investment?.underlyingSymbol ?? 'USDC'})</Text>

          <TextInput 
            placeholder={`500 ${investment?.underlyingSymbol ?? 'USDC'}`}
            type={"number"} 
            onChange={(e) => setAmountToRedeem(Number(e.target.value))}
            disabled={loadingRedemtion}
            bottom={'test'}
            description={`Balance disponible ${investment?.underlyingBalance} ${investment?.underlyingSymbol ?? 'USDC'}`}
            error={redeemError}
            inputWrapperOrder={['label', 'input', 'description', 'error',]}
            />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue.9", deg: 60 }}
            radius={"lg"}
            m="md"
            onClick={withdraw}
            disabled={!amountToRedeem || !investment?.balance || loadingRedemtion}
            leftIcon={loadingRedemtion && <Loader size={14} />}
          >
            Retirar
          </Button>
        </Group>
      </Paper>
      <Title size={"lg"} mb="lg">
          Administrar 
        </Title>
        <Paper radius="xs" p="lg" mb="xl" withBorder>
          <Text size={'sm'}>Simplearn Address: {simplearnAddress}</Text>
          <Divider my={20}></Divider>

          <Text >Reserva: {metrics?.totalWithdrawable} {investment?.underlyingSymbol ?? 'USDC'}</Text>

          <Text >Deuda con tenedores: {metrics?.totalAssets} {investment?.underlyingSymbol ?? 'USDC'}</Text>
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
      </>}
    </>
  );
}