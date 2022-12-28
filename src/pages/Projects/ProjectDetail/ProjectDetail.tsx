import { Card, Text, Title } from "@mantine/core";
import { IProjectMetadata } from "../../../types/projectMetadata";
import { ProjectStats } from "./ProjectStats/ProjectStats";
import { ProjectTokenDetails } from "./ProjectTokenDetails/ProjectTokenDetails";

export function ProjectDetail({ project }: { project: IProjectMetadata | null }) {

  if (!project) {
    return <></>;
  }

  const { 
    sellingAmountTarget,
    fundingAmountTarget,
    sellingTimeTarget,
    fundingTimeTarget
  } = project.targets;

  return (
    <>
      <ProjectStats project={project} />
      <ProjectTokenDetails project={project} />
      <Card.Section mt="lg">
        <Title color={"teal"} size={24}>
          Detalles
        </Title>
        <Text size={14}>
          Address:{" "}
          <strong>{project.address ?? "-"}</strong>
        </Text>
        <Text size={14}>
          Modelo de valuación (Valuation model):{" "}
          <strong>{project.valuationModel ?? "Por ratio (rate)"}</strong>
        </Text>
        <Text size={14}>
          Modelo de comisión (Fee model):{" "}
          <strong>{project.feeModel ?? "Listado (Listing fee)"}</strong>
        </Text>
        <Text size={14}>
          Metas de venta:{" "}
          <strong>{`${sellingAmountTarget} USDC`}</strong>
        </Text>
        <Text size={14}>
          Meta de tiempo de ventas:{" "}
          <strong>{new Date(sellingTimeTarget * 1000).toLocaleDateString('es-AR')}</strong>
        </Text>
        <Text size={14}>
          Meta de financiamiento:{" "}
          <strong>{`${fundingAmountTarget} USDC`}</strong>
        </Text>
        <Text size={14}>
          Meta de tiempo de financiamiento:{" "}
          <strong>{new Date(fundingTimeTarget * 1000).toLocaleDateString('es-AR')}</strong>
        </Text>
      </Card.Section>
    </>
  );
}
