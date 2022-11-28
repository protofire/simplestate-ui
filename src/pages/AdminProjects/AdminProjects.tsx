import { Button, Container, createStyles, Group, Loader, Modal, Select, Title, Text, Input, Divider } from "@mantine/core";
import { IconBuilding } from '@tabler/icons';
import { useEffect, useState } from "react";
import { projectStateLabels } from "../../constants/projectState";
import { useContract } from "../../hooks/useContract";
import { IProject } from "../../types/project";
import { profit } from "../../utils";
import { CreateProjectForm } from "./CreateProjectForm";

const useStyles = createStyles(() => ({
  group: {
    justifyContent: 'space-between'
  },
}));

export function AdminProjects() {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false); 
  
  const { contract } = useContract();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject>();

  useEffect(() => {
    if (contract) {
      setLoading(true);

      const fetchProjects = async () => {
        const projectList = [];
        const size = await contract?.functions.size();
        for (let i = size - 1; i >= 0; i--) {
          const project: IProject = await contract?.functions.projects(i);
          const projectWithId = { ...project, id: i };
          projectList.push(projectWithId);
        }
        setProjects(projectList);
        setLoading(false);
      };

      fetchProjects();
    }
  }, [contract]);

  const onProjectSelected = (id: string) => {
    const numericId = Number(id);
    const project = projects.find((p) => p.id === numericId);
    if (!project) return;

    setSelectedProject(project);
  }


  return (
    <Container>
      <Group className={classes.group}>
        <Select
          label="Proyecto"
          data={projects.map((p) => ({ value: p.id!.toString(), label: p.name }))}
          icon={loading && <Loader size={14}/>}
          disabled={loading}
          placeholder={'Seleccionar proyecto'}
          onChange={onProjectSelected}
          ></Select>
        <Button
          color={'teal'} 
          radius={'lg'} 
          leftIcon={<IconBuilding size={18}/>}
          onClick={() => setOpen(true)}
        >Crear proyecto</Button>
      </Group>

      <Modal size={'xl'} opened={open} title={<Title order={3}>Nuevo Proyecto</Title>} onClose={() => setOpen(false)}>
        <CreateProjectForm close={() => setOpen(false)}/>
      </Modal>

      <Group style={{display: selectedProject ? 'block': 'none'}} m={'lg'}>
        <Text>
          {`Cantidad de tokens en circulación: -`}
        </Text>
        <Text>
          {`Tasa de retorno: ${
            profit(
              Number(selectedProject?.financtialMetadata.sellAmount), 
              Number(selectedProject?.financtialMetadata.foundingAmount)
            ).toFixed(2)
          } %`}
        </Text>
        <Text>
          {`Tasa de interes (Interest rate): - %`}
        </Text>
        <Text>
          {`Unidad de cuenta (Unit of account): ${selectedProject?.unitOfAccount ?? 'USDC'}`}
        </Text>
        <Text>
          {selectedProject?.state && `Estado: ${projectStateLabels[selectedProject.state]}`}
        </Text>

        <Divider m={20}/>

        {selectedProject?.state === 'initialized' &&
          <Input.Wrapper id="distribute" label="Deposit income to distribute (USDC)">
            <Input id="distribute" placeholder="Distribute" type={'number'} width={400}/>
            <Button onClick={() => {}}>Distribute</Button>
          </Input.Wrapper>
        }
      </Group>
    </Container>
  );
}

