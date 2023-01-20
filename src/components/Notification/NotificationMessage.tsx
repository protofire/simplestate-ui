import { createStyles, Text } from "@mantine/core";
import { IProjectMetadata } from "../../types/projectMetadata";

const useStyles = createStyles(() => ({
  link: {
    color: "#12b886",
    "&:hover": {
      color: "#087c59",
    },
  },
}));

export function NotificationMessage({
  project,
  investmentValue,
}: {
  project: IProjectMetadata;
  investmentValue: number;
}) {
  const { classes } = useStyles();
  return (
    <Text c={"gray.6"}>
      Haz invertido <strong>{investmentValue}</strong> {project.underlyingToken.symbol ?? 'USDC'} en el proyecto:{" "}
      <strong>{project.name}</strong>. Accedé a la lista de{" "}
      <a className={classes.link} href="/investments">
        inversiones realizadas
      </a>
      .
    </Text>
  );
}
