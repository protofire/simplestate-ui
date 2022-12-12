

import {
  Button,
  Table,
  Title,
  Tooltip,
  Text,
  Group,
  Flex,
  Badge,
  Modal,
} from "@mantine/core";
import { colorsByState, projectStateLabels } from "../../../constants/projectState";
import { mockProjects } from "../../../mock/projects";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import SSToken from "../../../assets/SSToken.svg";
import { IconInfoCircle } from "@tabler/icons";
import { IProject } from "../../../types/project";
import { useState } from "react";

export function SimpleProjectInvestment() {

  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProject | null;
  }>({ open: false, project: null });

  const rows = mockProjects.map((project) => (
    <tr key={project.name}>
      <td>{project.name}</td>
      <td>
        <Badge color={colorsByState[project.state]} radius="lg" variant="dot">
          {projectStateLabels[project.state]}
        </Badge>
      </td>
      <td>
        <img src={SSToken} width={26} /> {`SIP${project.id}`}
      </td>
      <td>
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
      </td>
      <td>
        <Group position="right">
          <Text align="center" color="gray">
            {project.state !== "funded" && !(project.id === 16) ? (
              <span>
                <strong>0</strong> USDC
              </span>
            ) : (
              <Text color="green">
                <strong>216</strong> USDC
              </Text>
            )}
          </Text>
          <Tooltip label="Retirar renta disponible" withArrow>
            <Button
              size="xs"
              color={"teal"}
              radius={"lg"}
              compact
              disabled={project.state !== "funded" && !(project.id === 16)}
            >
              Retirar
            </Button>
          </Tooltip>
        </Group>
      </td>
      <td>
        {project.state !== "finished" ? (
          <Tooltip label="Depositar fondos" withArrow>
            <Button
              size="xs"
              color={"teal"}
              radius={"lg"}
              variant="light"
              onClick={() => setModalState({ open: true, project })}
              disabled={project.state !== "initialized"}
            >
              Depositar
            </Button>
          </Tooltip>
        ) : (
          <Tooltip label="Redimir fondos" withArrow>
            <Button
              size="xs"
              color={"blue"}
              radius={"lg"}
              variant="light"
              onClick={() => setModalState({ open: true, project })}
              disabled={project.redeemableAmount === 0}
            >
              Redimir
            </Button>
          </Tooltip>
        )}
      </td>
    </tr>
  ));

  return (
    <>
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
      <Modal
        opened={modalState.open}
        onClose={() => setModalState({ open: false, project: null })}
        title="Depositar fondos"
        size={"xl"}
      >
        <ProjectDetail project={modalState.project} />
      </Modal>
    </>
  );
}