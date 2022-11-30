import { Button, Table, Title, Tooltip, Text, Group } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import SSToken from "../../assets/SSToken.svg";

const elements = [
  {
    name: "House La tablada",
    balance: (
      <Text align="center" color="violet.9">
        <strong>2112</strong>
      </Text>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP10",
    state: "Inicializado",
    value: (
      <Text align="center">
        <strong>3922</strong> USDC
      </Text>
    ),
    rewards: (
      <Group>
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"}>
            Retirar
          </Button>
        </Tooltip>
      </Group>
    ),
    actions: "",
  },
  {
    name: "House La Tablada Resort",
    balance: (
      <Text align="center" color="violet.9">
        <strong>9892</strong>
      </Text>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP28",
    state: "Inicializado",
    value: (
      <Text align="center">
        <strong>9222</strong> USDC
      </Text>
    ),
    rewards: (
      <Group>
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"}>
            Retirar
          </Button>
        </Tooltip>
      </Group>
    ),
    actions: "",
  },
  {
    name: "House La Abeja",
    balance: (
      <Text align="center" color="violet.9">
        <strong>632</strong>
      </Text>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP82",
    state: "Finalizado",
    value: (
      <Text align="center">
        <strong>212212</strong> USDC
      </Text>
    ),
    rewards: (
      <Group>
        <Text align="center" color="gray">
          <strong>0</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} disabled>
            Retirar
          </Button>
        </Tooltip>
      </Group>
    ),
    actions: (
      <Tooltip label="Redimir balance" withArrow>
        <Button size="xs" color={"teablue"} radius={"lg"} variant="light">
          Redimir
        </Button>
      </Tooltip>
    ),
  },
  {
    name: "House La Falda",
    balance: (
      <Text align="center" color="violet.9">
        <strong>2112</strong>
      </Text>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP14",
    state: "Inicializado",
    value: (
      <Text align="center">
        <strong>76542</strong> USDC
      </Text>
    ),
    rewards: (
      <Group>
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"}>
            Retirar
          </Button>
        </Tooltip>
      </Group>
    ),
    actions: "",
  },
  {
    name: "Hotel Patagonia",
    balance: (
      <Text align="center" color="violet.9">
        <strong>890</strong>
      </Text>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP29",
    state: "Inicializado",
    value: (
      <Text align="center">
        <strong>59235</strong> USDC
      </Text>
    ),
    rewards: (
      <Group>
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"}>
            Retirar
          </Button>
        </Tooltip>
      </Group>
    ),
    actions: "",
  },
];

export function Investments() {
  const rows = elements.map((element) => (
    <tr>
      <td>{element.name}</td>
      <td>{element.state}</td>
      <td>
        {element.tokenSymbol} {element.token}
      </td>
      <td>{element.balance}</td>
      <td>{element.value}</td>
      <td>{element.rewards}</td>
      <td>{element.actions}</td>
    </tr>
  ));

  return (
    <>
      <Title size={"lg"}>Proyectos</Title>

      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        striped
        highlightOnHover
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Token</th>
            <th>Balance</th>
            <th>Valor estimado</th>
            <th>Renta disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
