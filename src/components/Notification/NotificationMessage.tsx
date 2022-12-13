import { Text } from "@mantine/core";

export function NotificationMessage({
  projectName,
  investmentValue,
}: {
  projectName: string | undefined;
  investmentValue: number;
}) {
  return (
    <Text c={"gray.6"}>
      Haz invertido <strong>{investmentValue}</strong> USDC en el proyecto:{" "}
      <strong>{projectName}</strong>. Accedé a la lista de{" "}
      <a href="/investments">inversiones realizadas</a>.
    </Text>
  );
}
