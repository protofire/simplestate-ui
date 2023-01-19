import {
  Button,
  Container,
  createStyles,
  Group,
  Loader,
  Modal,
  Select,
  Title,
  Text,
  Input,
  Divider,
  SimpleGrid,
  Badge,
  TextInput,
} from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconBuilding } from "@tabler/icons";
import { useEffect, useState } from "react";
import { State, projectStateLabels } from "../../constants/projectState";
import * as Utils from "../../utils/utilities";
import { CreateProjectForm } from "./CreateProjectForm/CreateProjectForm";
import { useApi } from "../../hooks/useApi";
import { IProjectMetadata } from "../../types/projectMetadata";
import { buildNotification, NotificationType } from "../../constants/notifications";
import { showNotification } from "@mantine/notifications";
import { positiveNumberValidation } from "../../utils/validations";

const useStyles = createStyles(() => ({
  group: {
    justifyContent: "space-between",
  },
}));

export function AdminProjects() {
  const { fetchProjects, withdrawFunds, depositSellingAmount, depositRentAmount, getAccumulatedRent, rentIncomeAddress } = useApi();

  const { classes } = useStyles();

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProjectMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProjectMetadata>();

  const [amountToWithdraw, setAmountToWithdraw] = useState<number>();
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  const [amountToDeposit, setAmountToDeposit] = useState<number>();
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [depositError, setDepositError] = useState("");

  const [rentToDeposit, setRentToDeposit] = useState<number>();
  const [loadingDepositRent, setLoadingDepositRent] = useState(false);
  const [depositRentError, setDepositRentError] = useState("");

  const [totalDepositedRent, setTotalDepositedRent] = useState<number>();

  const enabledDepositRent = selectedProject?.state === State.Funded;
  const enableDepositSell = selectedProject?.state === State.Funded;
  const amountAvailable = selectedProject ? selectedProject?.financialTracking.fundingRaised - selectedProject?.financialTracking.fundingWithdrawed : 0;
  const symbol = selectedProject?.underlyingToken.symbol;

  useEffect(() => {
    setLoading(true);
    fetchProjects().then((p) => {
      setProjects(p);
      setLoading(false);
    });
  }, [fetchProjects, updating]);

  const reset = () => {
    setUpdating(u => !u);
    setSelectedProject(undefined);
  }

  const onProjectSelected = async (address: string) => {
    const project:IProjectMetadata | undefined = projects.find((p) => p.address === address);
    if (!project) return;
    setSelectedProject(project);
    const acc = await getAccumulatedRent(address);
    setTotalDepositedRent(acc);
  };

  const withdwaw = async () => {
    if (!selectedProject || amountToWithdraw === undefined) return;
    const error = positiveNumberValidation(amountToWithdraw.toString());
    if (error) return setWithdrawError(error);
    const available = selectedProject?.financialTracking.fundingRaised - selectedProject?.financialTracking.fundingWithdrawed;
    if(amountToWithdraw > available) return setWithdrawError('El monto excede el monto disponible para retiro.');

    setWithdrawError('');
    try {
      setLoadingWithdraw(true);
      await withdrawFunds(selectedProject, amountToWithdraw);
      const successNotification = buildNotification(NotificationType.WITHDRAW_FUNDS_SUCCESS);
      showNotification(successNotification);
      reset();
    } catch(err) {
      console.error(err);
      const errorNotification = buildNotification(NotificationType.WITHDRAW_FUNDS_ERROR, {error: err});
      showNotification(errorNotification);
    } finally {
      setLoadingWithdraw(false);
    }
  }

  const deposit = async () => {
    if (!selectedProject || !amountToDeposit) return;

    if (amountAvailable > 0) {
      var isConfirmed = confirm(
`Todavía tenés ${amountAvailable} ${symbol} para retirar.
Una vez que deposites la venta no podrás retirar este dinero, confirmas el depósito?`
      );
      if (!isConfirmed) return;
    }

    if (selectedProject.booleanConfigs.allowPartialSell && 
      (amountToDeposit < 0 || amountToDeposit > selectedProject.targets.sellingAmountTarget)) {
        return setDepositError('Monto inválido');
    }

    if (!selectedProject.booleanConfigs.allowPartialSell && 
        amountToDeposit !== selectedProject.targets.sellingAmountTarget) {
      return setDepositError('El monto a depositar debe ser igual al precio de venta');
    }

    setDepositError('')
  
    try {
      setLoadingDeposit(true);
      await depositSellingAmount(selectedProject.address, amountToDeposit);
      const successNotification = buildNotification(NotificationType.DEPOSIT_REVENUE_SUCCESS);
      showNotification(successNotification);
      reset();
    } catch(err) {
      console.log(err);
      const errorNotification = buildNotification(NotificationType.DEPOSIT_REVENUE_ERROR, err);
      showNotification(errorNotification);
    } finally {
      setLoadingDeposit(false); 
    }
  }

  const depositRent = async () => {
    if (!selectedProject || !rentToDeposit) return;
    try {
      setLoadingDepositRent(true);
      await depositRentAmount(selectedProject.address, rentToDeposit);
      const successNotification = buildNotification(NotificationType.DEPOSIT_RENT_SUCCESS);
      showNotification(successNotification);
      reset();
    } catch(err) {
      console.log(err);
      const errorNotification = buildNotification(NotificationType.DEPOSIT_RENT_ERROR, err);
      showNotification(errorNotification);
    } finally {
      setLoadingDepositRent(false); 
    }
  }

  return (
    <Container>
      <Group className={classes.group}>
        <Select
          label="Proyecto"
          data={projects.map((p) => ({
            value: p.address,
            label: p.name,
          }))}
          icon={loading && <Loader size={14} />}
          disabled={loading}
          placeholder={"Seleccionar proyecto"}
          onChange={onProjectSelected}
        ></Select>
        <Button
          color={"teal"}
          radius={"lg"}
          leftIcon={<IconBuilding size={18} />}
          onClick={() => setOpen(true)}
        >
          Crear proyecto
        </Button>
      </Group>

      <Modal
        size={"xl"}
        opened={open}
        closeOnClickOutside={false}
        title={<Title order={3}>Nuevo Proyecto</Title>}
        onClose={() => setOpen(false)}
      >
        <CreateProjectForm
          close={() => setOpen(false)}
          onCreate={() => reset()}
        />
      </Modal>

      {selectedProject && <Group style={{ display: "block" }} m={"lg"}>
        <Text>
          {`Address: `}
          <strong>{selectedProject?.address ?? ' - '}</strong>
        </Text>
        <Text>
          {`Admin: `}
          <strong>{selectedProject?.roles.admin ?? ' - '}</strong>
        </Text>
        {selectedProject.booleanConfigs.produceIncome && 
        <Text>
          {`Contrato de renta mensual: `}
          <strong>{rentIncomeAddress}</strong>
        </Text>
        } 
        
        <Text>
          {`Meta de financiamiento: `}
          <strong>{`${selectedProject?.targets.fundingAmountTarget} ${symbol}`?? ' - '}</strong>
        </Text>
        <Text>
          {`Meta de Venta: `}
          <strong>{`${selectedProject?.targets.sellingAmountTarget} ${symbol}`?? ' - '}</strong>
        </Text>
        <Text>
          {`Tasa de retorno: `}
          <strong>
            {Utils.profit(
              Number(selectedProject?.targets.sellingAmountTarget),
              Number(selectedProject?.targets.fundingAmountTarget)
            ).toFixed(2)}{" "}
            %
          </strong>
        </Text>
        <Text>
          {`Unidad de cuenta (Unit of account): `}
          <strong>{symbol ?? "USDC"}</strong>
        </Text>
        {selectedProject?.state !== undefined && (
          <Text>
            {`Estado: `}
            <strong>{projectStateLabels[selectedProject.state]}</strong>
          </Text>
        )}

        <Divider m={20} />

        <Group m={"md"}>
          <Badge color={"teal"}>{`Depósito acumulado: ${selectedProject?.financialTracking.fundingRaised} ${symbol}`}</Badge>
        </Group>

        <Group m={"md"}>
          <Badge color={"red"}>{`Fondos retirados: ${selectedProject?.financialTracking.fundingWithdrawed} USDC`}</Badge>
        </Group>

        <Group m={"md"}>
          <Badge>{`Disponible para retiro: ${amountAvailable} ${symbol}`}</Badge>
        </Group>


        <Input.Wrapper id="withdraw" label="Retirar Inversión">
          <SimpleGrid cols={2}>
            <TextInput
              icon={<IconArrowDown />}
              id="withdraw"
              placeholder={`Cantidad a retirar (${symbol})`}
              type={"number"}
              width={400}
              disabled={loadingWithdraw || amountAvailable === 0}
              onChange={(e: any) => setAmountToWithdraw(Number(e.target.value))}
              error={withdrawError}
            />
            <Button
              leftIcon={loadingWithdraw && <Loader size={14} />}
              color={"teal"}
              radius={"lg"}
              style={{ maxWidth: "200px" }}
              onClick={withdwaw}
              disabled={loadingWithdraw || amountAvailable === 0}
            >
              Retirar Inversión
            </Button>
          </SimpleGrid>
        </Input.Wrapper>

        {selectedProject.booleanConfigs.produceIncome && 
          <>
            <Group m={"md"}>
              <Badge>{`Renta depositada acumulada: ${totalDepositedRent} USDC`}</Badge>
            </Group>
            <Input.Wrapper id="distribute-rent" label={`Depositar renta (${symbol})`}>
              <SimpleGrid cols={2}>
                <TextInput
                  icon={<IconArrowUp />}
                  id="distribute-rent"
                  placeholder={`Valor renta (${symbol})`}
                  type={"number"}
                  width={400}
                  onChange={(e: any) => setRentToDeposit(Number(e.target.value))}
                  disabled={!enabledDepositRent|| loadingDepositRent}
                  error={depositRentError}
                />
                <Button
                leftIcon={loadingDepositRent && <Loader size={14} />}
                  color={"teal"}
                  radius={"lg"}
                  style={{ maxWidth: "200px" }}
                  onClick={depositRent}
                  disabled={!enabledDepositRent || loadingDepositRent}
                >
                  Depositar Renta
                </Button>
              </SimpleGrid>
            </Input.Wrapper>
          </>
        }

        <Group m={"md"}>
          <Badge>{`Venta depositada acumulada: ${selectedProject?.financialTracking.cumulativeRedeemableAmount} USDC`}</Badge>
        </Group>

        <Input.Wrapper id="distribute-sell" label="Depositar venta (USDC)">
          <SimpleGrid cols={2}>
            <TextInput
              icon={<IconArrowUp />}
              id="distribute-sell"
              placeholder="Valor venta (USDC)"
              type={"number"}
              width={400}
              disabled={!enableDepositSell || loadingDeposit}
              onChange={(e: any) => setAmountToDeposit(Number(e.target.value))}
              error={depositError}
            />
            <Button
              leftIcon={loadingDeposit && <Loader size={14} />}
              color={"teal"}
              radius={"lg"}
              style={{ maxWidth: "200px" }}
              onClick={deposit}
              disabled={!enableDepositSell || loadingDeposit}
            >
              Depositar Venta
            </Button>
          </SimpleGrid>
        </Input.Wrapper>
      </Group>}
    </Container>
  );
}
