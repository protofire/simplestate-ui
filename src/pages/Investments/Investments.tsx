import {
  Button,
  Table,
  Title,
  Tooltip,
  Text,
  Group,
  Flex,
  Badge,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import SSToken from "../../assets/SSToken.svg";

const elements = [
  {
    name: "House La tablada",
    balance: (
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP10 = 2.63 USDC" withArrow>
          <Group>
          <Text color="violet.9">
            <strong>2112</strong>
          </Text>
          <IconInfoCircle size={20} />
          </Group>
          
        </Tooltip>
        <Text align="center">
          (<strong>4622</strong> USDC)
        </Text>
      </Flex>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP10",
    state: (
      <Badge color="green" radius="lg" variant="dot">
        Inicializado
      </Badge>
    ),
    value: (
      <Text align="center">
        <strong>3922</strong> USDC
      </Text>
    ),
    rewards: (
      <Group position="right">
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} compact>
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
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP28 = 2.63 USDC" withArrow>
          <Group>
          <Text color="violet.9">
            <strong>2112</strong>
          </Text>
          <IconInfoCircle size={20} />
          </Group>
          
        </Tooltip>
        <Text align="center">
          (<strong>4622</strong> USDC)
        </Text>
      </Flex>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP28",
    state: (
      <Badge color="green" radius="lg" variant="dot">
        Inicializado
      </Badge>
    ),
    value: (
      <Text align="center">
        <strong>9222</strong> USDC
      </Text>
    ),
    rewards: (
      <Group position="right">
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} compact>
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
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP82 = 2.63 USDC" withArrow>
          <Group>
          <Text color="violet.9">
            <strong>2112</strong>
          </Text>
          <IconInfoCircle size={20} />
          </Group>
          
        </Tooltip>
        <Text align="center">
          (<strong>4622</strong> USDC)
        </Text>
      </Flex>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP82",
    state: (
      <Badge color="blue" radius="lg" variant="dot">
        Finalizado
      </Badge>
    ),
    value: (
      <Text align="center">
        <strong>212212</strong> USDC
      </Text>
    ),
    rewards: (
      <Group position="right">
        <Text align="center" color="gray">
          <strong>0</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} compact disabled>
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
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP14 = 2.63 USDC" withArrow>
          <Group>
          <Text color="violet.9">
            <strong>2112</strong>
          </Text>
          <IconInfoCircle size={20} />
          </Group>
          
        </Tooltip>
        <Text align="center">
          (<strong>4622</strong> USDC)
        </Text>
      </Flex>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP14",
    state: (
      <Badge color="green" radius="lg" variant="dot">
        Inicializado
      </Badge>
    ),
    value: (
      <Text align="center">
        <strong>76542</strong> USDC
      </Text>
    ),
    rewards: (
      <Group position="right">
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} compact>
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
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP29 = 2.63 USDC" withArrow>
          <Group>
          <Text color="violet.9">
            <strong>2112</strong>
          </Text>
          <IconInfoCircle size={20} />
          </Group>
          
        </Tooltip>
        <Text align="center">
          (<strong>4622</strong> USDC)
        </Text>
      </Flex>
    ),
    tokenSymbol: <img src={SSToken} width={26} />,
    token: "SIP29",
    state: (
      <Badge color="green" radius="lg" variant="dot">
        Inicializado
      </Badge>
    ),
    value: (
      <Text align="center">
        <strong>59235</strong> USDC
      </Text>
    ),
    rewards: (
      <Group position="right">
        <Text align="center" color="teal">
          <strong>212</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} compact>
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
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.state}</td>
      <td>
        {element.tokenSymbol} {element.token}
      </td>
      <td>{element.balance}</td>
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
        withBorder
        highlightOnHover
        mt={"lg"}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Token</th>
            <th>Balance</th>
            <th>Renta disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
