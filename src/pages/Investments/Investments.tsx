import { Table } from "@mantine/core";

const elements = [
  { balance: 6, token: "SPT23", state: "Creado", value: 129000, rewards: 302, actions: "Depositar" },
  { balance: 7, token: "SPT23", state: "Creado", value: 223000, rewards: 280, actions: "retirar" },
  { balance: 39, token: "SPT23", state: "Finalizado", value: 129000, rewards: 728, actions: "retirar" },
  { balance: 56, token: "SPT23", state: "Creado", value: 422000, rewards: 817, actions: "retirar" },
  { balance: 58, token: "SPT23", state: "Creado", value: 87000, rewards: 120, actions: "retirar" },
];

export function Investments() {
  const rows = elements.map((element) => (
    <tr key={element.token}>
      <td>{element.balance}</td>
      <td>{element.token}</td>
      <td>{element.state}</td>
      <td>{element.value}</td>
      <td>{element.rewards}</td>
      <td>{element.actions}</td>
    </tr>
  ));

  return (
    <Table striped highlightOnHover>
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
  );
}
