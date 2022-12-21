import { Container, SimpleGrid, Modal, Loader, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { IProject } from "../../../types/project";
import { IProjectMetadata } from "../../../types/projectMetadata";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectDetail } from "../ProjectDetail/ProjectDetail";

export function Projects() {
  const { fetchProjects, registryReady } = useApi();
  const [projects, setProjects] = useState<IProjectMetadata[]>([]);
  // const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProject | null;
  }>({ open: false, project: null });

  useEffect(() => {
    setLoading(true);
    fetchProjects().then((p) => {
      setProjects(p);
      setLoading(false);
    });
  }, [fetchProjects]);

  const openModal = (p: IProject) => {
    setModalState({ open: true, project: p });
  };

  if (loading || !registryReady) {
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
