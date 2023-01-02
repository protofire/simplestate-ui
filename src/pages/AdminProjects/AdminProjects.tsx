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

const useStyles = createStyles(() => ({
  group: {
    justifyContent: "space-between",
  },
}));

export function AdminProjects() {
  const { fetchProjects, withdrawFunds, depositSellingAmount } = useApi();

  const { classes } = useStyles();

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProjectMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProjectMetadata>();

  const [amountToWithdraw, setAmountToWithdraw] = useState<number>();
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  const [amountToDeposit, setAmountToDeposit] = useState<number>();
  const [loadingDeposit, setLoadingDeposit] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProjects().then((p) => {
      setProjects(p);
      setLoading(false);
    });
  }, [fetchProjects, projectCreated]);

  const onProjectSelected = (address: string) => {
    const project:IProjectMetadata | undefined = projects.find((p) => p.address === address);
    if (!project) return;
    setSelectedProject(project);
  };

  const withdwaw = async () => {
    if (!selectedProject || !amountToWithdraw) return;
    try {
      setLoadingWithdraw(true);
      await withdrawFunds(selectedProject.address, amountToWithdraw);
      const successNotification = buildNotification(NotificationType.WITHDRAW_FUNDS_SUCCESS);
      showNotification(successNotification);
    } catch(err) {
      console.log(err);
      const errorNotification = buildNotification(NotificationType.WITHDRAW_FUNDS_ERROR);
      showNotification(errorNotification);
    } finally {
      setLoadingWithdraw(false); 
    }
  }

  const deposit = async () => {
    if (!selectedProject || !amountToDeposit) return;
    try {
      setLoadingDeposit(true);
      await depositSellingAmount(selectedProject.address, amountToDeposit);
      const successNotification = buildNotification(NotificationType.WITHDRAW_FUNDS_SUCCESS);
      showNotification(successNotification);
    } catch(err) {
      console.log(err);
      const errorNotification = buildNotification(NotificationType.WITHDRAW_FUNDS_ERROR);
      showNotification(errorNotification);
    } finally {
      setLoadingDeposit(false); 
    }
  }

  const enabledDepositRent = selectedProject?.state === State.Funded;
  const enableDepositSell = selectedProject?.state === State.Funded;

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
          onCreate={() => setProjectCreated(true)}
        />
      </Modal>

      <Group style={{ display: selectedProject ? "block" : "none" }} m={"lg"}>
        <Text>
          {`Address: `}
          <strong>{selectedProject?.address ?? ' - '}</strong>
          {/* <strong>{selectedProject?.owner}</strong> */}
        </Text>
        <Text>
          {`Dueño del proyecto (owner): `}
          <strong> -</strong>
          {/* <strong>{selectedProject?.owner}</strong> */}
        </Text>
        <Text>
          {`Depositante de ingresos (Income depositor): `}
          <strong> -</strong>
          {/* <strong>{selectedProject?.incomeDepositor}</strong> */}
        </Text>
        <Text>
          {`Cantidad de tokens en circulación: `}
          <strong> -</strong>
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
          {`Tasa de interes (Interest rate): `}
          <strong> -%</strong>
        </Text>
        <Text>
          {`Unidad de cuenta (Unit of account): `}
          <strong>{selectedProject?.unitOfAccount ?? "USDC"}</strong>
        </Text>
        {selectedProject?.state !== undefined && (
          <Text>
            {`Estado: `}
            <strong>{projectStateLabels[selectedProject.state]}</strong>
          </Text>
        )}

        <Divider m={20} />

        <Group m={"md"}>
          <Badge color={"teal"}>{`Depósito acumulado: ${selectedProject?.financialTracking.fundingRaised} USDC`}</Badge>
        </Group>

        <Input.Wrapper id="withdraw" label="Retirar Inversión">
          <SimpleGrid cols={2}>
            <Input
              icon={<IconArrowDown />}
              id="withdraw"
              placeholder="Cantidad a retirar (USDC)"
              type={"number"}
              width={400}
              onChange={(e) => setAmountToWithdraw(Number(e.target.value))}
            />
            <Button
              color={"teal"}
              radius={"lg"}
              style={{ maxWidth: "200px" }}
              onClick={withdwaw}
              disabled={loadingWithdraw}
            >
              Retirar Inversión
            </Button>
          </SimpleGrid>
        </Input.Wrapper>

        {/* <Input.Wrapper id="distribute-rent" label="Depositar renta (USDC)">
          <SimpleGrid cols={2}>
            <Input
              icon={<IconArrowUp />}
              id="distribute-rent"
              placeholder="Valor renta (USDC)"
              type={"number"}
              width={400}
              disabled={!enabledDepositRent}
            />
            <Button
              color={"teal"}
              radius={"lg"}
              style={{ maxWidth: "200px" }}
              onClick={() => {}}
              disabled={!enabledDepositRent}
            >
              Depositar Renta
            </Button>
          </SimpleGrid>
        </Input.Wrapper> */}

        <Input.Wrapper id="distribute-sell" label="Depositar venta (USDC)">
          <SimpleGrid cols={2}>
            <Input
              icon={<IconArrowUp />}
              id="distribute-sell"
              placeholder="Valor venta (USDC)"
              type={"number"}
              width={400}
              disabled={!enableDepositSell || loadingDeposit}
              onChange={(e) => setAmountToDeposit(Number(e.target.value))}
            />
            <Button
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
      </Group>
    </Container>
  );
}
