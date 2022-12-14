import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles(() => ({
  link: {
    color: "#12b886",
    "&:hover": {
      color: "#087c59",
    },
  },
}));

export function NotificationMessage({
  projectName,
  investmentValue,
}: {
  projectName: string | undefined;
  investmentValue: number;
}) {
  const { classes } = useStyles();
  return (
    <Text c={"gray.6"}>
      Haz invertido <strong>{investmentValue}</strong> USDC en el proyecto:{" "}
      <strong>{projectName}</strong>. Accedé a la lista de{" "}
      <a className={classes.link} href="/investments">
        inversiones realizadas
      </a>
      .
    </Text>
  );
}
