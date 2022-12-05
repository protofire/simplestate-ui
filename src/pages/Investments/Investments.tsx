import {
  Button,
  Table,
  Title,
  Tooltip,
  Text,
  Group,
  Flex,
  Badge,
  Paper,
  Grid,
  TextInput,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import SSToken from "../../assets/SSToken.svg";

const elements = [
  {
    name: "Macondo 1",
    balance: (
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP8 = 2.63 USDC" withArrow>
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
    token: "SIP8",
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
      <Tooltip label="Depositar fondos" withArrow>
        <Button size="xs" color={"teal"} radius={"lg"} variant="light">
          Depositar
        </Button>
      </Tooltip>
    ),
  },
  {
    name: "Macondo 2",
    balance: (
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP9 = 2.63 USDC" withArrow>
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
    token: "SIP9",
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
      <Tooltip label="Depositar fondos" withArrow>
        <Button size="xs" color={"teal"} radius={"lg"} variant="light">
          Depositar
        </Button>
      </Tooltip>
    ),
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
      <Badge color="grape" radius="lg" variant="dot">
        Fondeado
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
      <Badge color="grape" radius="lg" variant="dot">
        Fondeado
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
          <strong>913</strong> USDC
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
      <Badge color="grape" radius="lg" variant="dot">
        Fondeado
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
          <strong>872</strong> USDC
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
    name: "House La Abeja - NORTE",
    balance: (
      <Flex justify="" align="center" direction="row" wrap="wrap" gap={"xs"}>
        <Tooltip label="1 SIP81 = 2.63 USDC" withArrow>
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
    token: "SIP81",
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
    name: "House La Abeja - SUR",
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
        <Text align="center" color="teal">
          <strong>4822</strong> USDC
        </Text>
        <Tooltip label="Retirar renta disponible" withArrow>
          <Button size="xs" color={"teal"} radius={"lg"} compact>
            Retirar
          </Button>
        </Tooltip>
      </Group>
    ),
    actions: (
      <Tooltip label="Redimir balance" withArrow>
        <Button size="xs" color={"teablue"} radius={"lg"} variant="light" disabled>
          Redimir
        </Button>
      </Tooltip>
    ),
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
      <Title size={"lg"} mb="lg">
        Simple Earn
      </Title>
      <Paper radius="xs" p="lg" mb="xl" withBorder>
        <Grid>
          <Grid.Col span={4}>
            <Text>Balance: 29199 USDC</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Valor actual: 29199 USDC</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>APY: 6%</Text>
          </Grid.Col>
        </Grid>
        <Group position="center" grow>
          <Text>Comprar Simple Earn Token (SET)</Text>

          <TextInput placeholder="500 SET" type={"number"} />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue.9", deg: 60 }}
            radius={"lg"}
            m="md"
          >
            Comprar
          </Button>
        </Group>
      </Paper>
      <Title size={"lg"} mb="lg">
        Proyectos
      </Title>
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        withBorder
        highlightOnHover
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
