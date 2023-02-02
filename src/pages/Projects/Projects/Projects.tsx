import { Container, SimpleGrid, Modal, Loader, Center, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { IProjectMetadata } from "../../../types/projectMetadata";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectDetail } from "../ProjectDetail/ProjectDetail";

const itemsPerPage = 3;

export function Projects() {
  const { fetchProjects, registryReady, getTotalProjects } = useApi();

  const [activePage, setPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  const [projects, setProjects] = useState<IProjectMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    project: IProjectMetadata | null;
  }>({ open: false, project: null });

  const totalPages = Math.ceil(totalProjects / itemsPerPage);


  useEffect(() => {
    setLoading(true);
    getTotalProjects().then((total: number) => {
      setTotalProjects(total);
      fetchProjects(total, activePage).then((p) => {
        setProjects(p);
        setLoading(false);
      });
    });

  }, [getTotalProjects, fetchProjects, activePage]);

  const openModal = (p: IProjectMetadata) => {
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
          <ProjectCard key={i} project={p} openModal={openModal} />
        ))}
      </SimpleGrid>
      <Pagination color={'teal'} style={{ justifyContent: 'center' }} my={'md'} page={activePage} onChange={setPage} total={totalPages} />
      <Modal
        size={"xl"}
        opened={modalState.open}
        onClose={() => setModalState({ open: false, project: null })}
      >
        <ProjectDetail project={modalState.project} />
      </Modal>
    </Container>
  );
}
