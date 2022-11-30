import { Container, SimpleGrid, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { useContract } from "../../hooks/useContract";
import { IProject } from "../../types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";

export function Projects() {
  const { contract } = useContract();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProject | null;
  }>({ open: false, project: null });

  useEffect(() => {
    if (contract) {
      setLoading(true);

      const fetchProjects = async () => {
        const projectList = [];
        const size = await contract?.functions.size();
        for (let i = size - 1; i >= 0; i--) {
          const project: IProject = await contract?.functions.projects(i);
          projectList.push(project);
        }
        setProjects(projectList);
        setLoading(false);
      };

      fetchProjects();
    }
  }, [contract]);

  const openModal = (p: IProject) => {
    setModalState({ open: true , project: p });
  }

  if (loading || !contract) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[{ maxWidth: 755, cols: 2, spacing: "sm" }, { maxWidth: 600, cols: 1, spacing: "sm" }]}
      >
        {projects.map((p, i) => (<ProjectCard key={i} project={p} openModal={openModal}/>))}
      </SimpleGrid>
      <Modal
        size={"xl"}
        opened={modalState.open}
        onClose={() => setModalState({ open: false, project: null })}
      >
        <ProjectDetail project={modalState.project!}/>
      </Modal>
    </Container>
  );
}
