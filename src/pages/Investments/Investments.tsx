import { Button, Table, Title } from "@mantine/core";
import SSToken from "../../assets/SSToken.svg";

const elements = [
  {
    balance: 6,
    tokenSymbol: <img src={SSToken} width={30} />,
    token: "SSP23",
    state: "Creado",
    value: 129000,
    rewards: 302,
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
  },
  {
    balance: 7,
    tokenSymbol: <img src={SSToken} width={30} />,
    token: "SSP23",
    state: "Creado",
    value: 223000,
    rewards: 280,
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
  },
  {
    balance: 39,
    tokenSymbol: <img src={SSToken} width={30} />,
    token: "SSP23",
    state: "Finalizado",
    value: 129000,
    rewards: 728,
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
  },
  {
    balance: 56,
    tokenSymbol: <img src={SSToken} width={30} />,
    token: "SSP23",
    state: "Creado",
    value: 422000,
    rewards: 817,
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
  },
  {
    balance: 58,
    tokenSymbol: <img src={SSToken} width={30} />,
    token: "SSP23",
    state: "Creado",
    value: 87000,
    rewards: 120,
    actions: (
      <Button size="xs" color={"teal"} radius={"lg"}>
        Retirar
      </Button>
    ),
  },
];

export function Investments() {
  const rows = elements.map((element) => (
    <tr>
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
            <th>Balance</th>
            <th>Token</th>
            <th>Estado</th>
            <th>Valor estimado (USDC)</th>
            <th>Recompensa disponible (USDC)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
