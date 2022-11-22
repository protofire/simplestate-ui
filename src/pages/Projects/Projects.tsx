import { Card, Container, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useContract } from "../../hooks/useContract";
import { IProject } from "../../types/project";


export function Projects() {
  const { contract } = useContract();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contract) {
      setLoading(true);
      const fetchProjects = async () => {
        const projectList = [];
        const size = await contract?.functions.size();
        for (let i = 0; i < size; i++) {
          const project: IProject = await contract?.functions.projects(i);
          projectList.push(project);
        }
        setProjects(projectList);
        setLoading(false);
      }
      fetchProjects();
    }
  }, [contract]);

  if (loading) {
    return (<div>Cargando...</div>);
  }

  const items = projects.map((p, i) => {

    const {
      foundingAmount,
      foundingTime,
      sellAmount,
      sellTime,
      raised
    } = p.financtialMetadata;

    return (
      <Card key={i} shadow="sm" radius="md" withBorder>
        <Card.Section m={'md'}>
          <Text weight={500}>{p.name}</Text>
        </Card.Section>
        <Card.Section m={'md'}>
          <Text>foundingAmount: {Number(foundingAmount)}</Text>
          <Text>foundingTime: {Number(foundingTime)}</Text>
          <Text>sellAmount: {Number(sellAmount)}</Text>
          <Text>sellTime: {Number(sellTime)}</Text>
          <Text>raised: {Number(raised)}</Text>
        </Card.Section>
      </Card>
    )
  });

  return (
    <Container>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
