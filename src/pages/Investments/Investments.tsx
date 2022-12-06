import { useState } from 'react';
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
  Modal,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import SSToken from "../../assets/SSToken.svg";
import { IProject } from '../../types/project';
import { projectStateLabels } from '../../constants/projectState';
import { ProjectDetail } from '../Projects/ProjectDetail';
import { mockProjects } from '../../mock/projects';

export function Investments() {
  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProject | null;
  }>({ open: false, project: null });

  const rows = mockProjects.map((project) => (
    <tr key={project.name}>
      <td>{project.name}</td>
      <td>
        <Badge color="green" radius="lg" variant="dot">
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
            {project.state !== 'funded' && !(project.id === 16)
              ? <span>
                  <strong>0</strong> USDC
                </span>
              :  <Text color='green'>
                  <strong>216</strong> USDC
                </Text>} 
          </Text>
          <Tooltip label="Retirar renta disponible" withArrow>
            <Button size="xs" color={"teal"} radius={"lg"} compact disabled={project.state !== 'funded' && !(project.id === 16)}>
              Retirar
            </Button>
          </Tooltip>
        </Group>
      </td>
      <td>
        <Tooltip label="Depositar fondos" withArrow>
          <Button
            size="xs"
            color={"teal"}
            radius={"lg"}
            variant="light"
            onClick={() => setModalState({open: true, project })}
            disabled={project.state !== 'initialized'}>
            Depositar
          </Button>
        </Tooltip>
      </td>
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
      <Modal
        opened={modalState.open}
        onClose={() => setModalState({ open: false, project: null })}
        title="Depositar fondos"
        size={"xl"}
      >
        <ProjectDetail project={modalState.project}/>
      </Modal>
    </>
  );
}