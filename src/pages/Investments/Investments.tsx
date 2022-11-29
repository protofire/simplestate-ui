import {
  Button,
  Table,
  Title,
  ActionIcon,
  Tooltip,
  Text,
  Divider,
} from "@mantine/core";
import {
  IconAdjustments,
  IconArrowBarDown,
  IconArrowBarUp,
} from "@tabler/icons";
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
    state: "Creado",
    value: 129000,
    rewards: (
      <Text align="center" color="teal">
        <strong>212</strong> USDC
      </Text>
    ),
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
    actions2: (
      <Button.Group>
        <Tooltip label="Depositar">
          <ActionIcon color="blue" radius="md" variant="light"  mr={"lg"}>
            <IconArrowBarDown size={24} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Retirar ganancias">
          <ActionIcon color="teal" radius="md" variant="light">
            <IconArrowBarUp size={24} />
          </ActionIcon>
        </Tooltip>
      </Button.Group>
    ),
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
    state: "Creado",
    value: 223000,
    rewards: (
      <Text align="center" color="teal">
        <strong>212</strong> USDC
      </Text>
    ),
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
    actions2: (
      <Button.Group>
        <Tooltip label="Depositar">
          <ActionIcon color="blue" radius="md" variant="light"  mr={"lg"}>
            <IconArrowBarDown size={24} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Retirar ganancias">
          <ActionIcon color="teal" radius="md" variant="light">
            <IconArrowBarUp size={24} />
          </ActionIcon>
        </Tooltip>
      </Button.Group>
    ),
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
    value: 129000,
    rewards: (
      <Text align="center" color="teal">
        <strong>212</strong> USDC
      </Text>
    ),
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
    actions2: (
      <Button.Group>
        <Tooltip label="Depositar">
          <ActionIcon color="blue" radius="md" variant="light"  mr={"lg"} disabled>
            <IconArrowBarDown size={24} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Retirar ganancias">
          <ActionIcon color="teal" radius="md" variant="light">
            <IconArrowBarUp size={24} />
          </ActionIcon>
        </Tooltip>
      </Button.Group>
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
    state: "Creado",
    value: 422000,
    rewards: (
      <Text align="center" color="teal">
        <strong>212</strong> USDC
      </Text>
    ),
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
    actions2: (
      <Button.Group>
        <Tooltip label="Depositar">
          <ActionIcon color="blue" radius="md" variant="light"  mr={"lg"}>
            <IconArrowBarDown size={24} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Retirar ganancias">
          <ActionIcon color="teal" radius="md" variant="light">
            <IconArrowBarUp size={24} />
          </ActionIcon>
        </Tooltip>
      </Button.Group>
    ),
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
    value: 87000,
    rewards: (
      <Text align="center" color="teal">
        <strong>212</strong> USDC
      </Text>
    ),
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
    actions2: (
      <Button.Group>
        <Tooltip label="Depositar">
          <ActionIcon color="blue" radius="md" variant="light"  mr={"lg"}>
            <IconArrowBarDown size={24} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Retirar ganancias">
          <ActionIcon color="teal" radius="md" variant="light">
            <IconArrowBarUp size={24} />
          </ActionIcon>
        </Tooltip>
      </Button.Group>
    ),
  },
];

export function Investments() {
  const rows = elements.map((element) => (
    <tr>
      <td>{element.name}</td>
      <td>{element.balance}</td>
      <td>
        {element.tokenSymbol} {element.token}
      </td>
      <td>{element.state}</td>
      <td>{element.value}</td>
      <td>{element.rewards}</td>
      <td>{element.actions}</td>
    </tr>
  ));

  const rows2 = elements.map((element) => (
    <tr>
      <td>{element.name}</td>
      <td>{element.balance}</td>
      <td>
        {element.tokenSymbol} {element.token}
      </td>
      <td>{element.state}</td>
      <td>{element.value}</td>
      <td>{element.rewards}</td>
      <td>{element.actions2}</td>
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
            <th>Balance</th>
            <th>Token</th>
            <th>Estado</th>
            <th>Valor estimado</th>
            <th>Recompensa disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Title size={"lg"} m="xl">Tabla variante 2</Title>
      <hr />
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        striped
        highlightOnHover
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Balance</th>
            <th>Token</th>
            <th>Estado</th>
            <th>Valor estimado</th>
            <th>Recompensa disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows2}</tbody>
      </Table>
      <Button.Group mt={"xl"}>
        <Button variant="default">Invertir</Button>
        <Button variant="default">Retirar</Button>
        <Button variant="default" disabled>
          Cancelar
        </Button>
      </Button.Group>
    </>
  );
}
