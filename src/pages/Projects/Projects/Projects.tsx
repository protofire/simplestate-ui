import { Container, SimpleGrid, Modal, Loader, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { useContract } from "../../../hooks/useContract";
import { IProject } from "../../../types/project";
import { IProjectMetadata } from "../../../types/projectMetadata";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectDetail } from "../ProjectDetail/ProjectDetail";

export function Projects() {
  const { contract, initContract } = useContract('registry');
  const [projects, setProjects] = useState<IProjectMetadata[]>([]);
  // const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProject | null;
  }>({ open: false, project: null });

  useEffect(() => {
    if (contract) {
      setLoading(true);

      const fetchProjects = async () => {
        const projectList: IProjectMetadata[] = [];
        console.log(contract.address);
        const size = await contract?.functions.getNumberOfProjects();
        console.log('number of projects', size);
        for (let i = size - 1; i >= 0; i--) {
          const [projectAddress] = await contract?.functions.keys(i);
          console.log('project address', projectAddress);
          const projectContract = initContract(projectAddress, 'project');
          const projectMetadata: IProjectMetadata = await projectContract?.functions.metadata();
          projectList.push(projectMetadata);
        }
        setProjects(projectList);
        setLoading(false);
      };

      fetchProjects();
    }
  }, [contract]);

  const openModal = (p: IProject) => {
    setModalState({ open: true, project: p });
  };

  if (loading || !contract) {
    return (
      <Center m={"xl"}>
        <Loader color="teal" size="lg" variant="bars" />
      </Center>
    );
  }

  return (
    <Container>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {projects.map((p, i) => (
          <div key={i}>{p.name}</div>
          // <ProjectCard key={i} project={p} openModal={openModal} />
        ))}
      </SimpleGrid>
      <Modal
        size={"xl"}
        opened={modalState.open}
        onClose={() => setModalState({ open: false, project: null })}
      >
        <ProjectDetail project={modalState.project!} />
      </Modal>
    </Container>
  );
}
