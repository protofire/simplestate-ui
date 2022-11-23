import {
  Card,
  Container,
  SimpleGrid,
  Text,
  Image,
  createStyles,
  Overlay,
  Button,
  Title,
  Modal,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useContract } from "../../hooks/useContract";
import { IProject } from "../../types/project";

const useStyles = createStyles(() => ({
  absolute: {
    position: "absolute",
    bottom: 5,
    left: 5,
    zIndex: 20,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    height: 100,
    width: "100%",
    zIndex: 10,
    background: "linear-gradient(transparent, #00000078 120%)",
  },
}));

export function Projects() {
  const { contract } = useContract();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { classes } = useStyles();

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
      };

      fetchProjects();
    }
  }, [contract]);

  if (loading || !contract) {
    return <div>Cargando...</div>;
  }

  const items = projects.map((p, i) => {
    const { foundingAmount, foundingTime, sellAmount, sellTime, raised } =
      p.financtialMetadata;

    return (
      <Card key={i} shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image src={p.metadataURL} height={160} alt={p.metadataURL} />
          <div style={{ position: "relative" }}>
            <div className={classes.overlay}></div>
            <Text color={"white"} className={classes.absolute} weight={500}>
              {p.name}
            </Text>
          </div>
        </Card.Section>

        <Card.Section m={"md"}>
          <Text>foundingAmount: {Number(foundingAmount)}</Text>
          <Text>foundingTime: {Number(foundingTime)}</Text>
          <Text>sellAmount: {Number(sellAmount)}</Text>
          <Text>sellTime: {Number(sellTime)}</Text>
          <Text>raised: {Number(raised)}</Text>
          <Button
            color={"teal"}
            radius={"lg"}
            leftIcon={<IconPlus size={18} />}
            onClick={() => setOpen(true)}
          >
            Ver detalle
          </Button>
        </Card.Section>
      </Card>
    );
  });

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
        {items}
      </SimpleGrid>
      <Modal
        size={"xl"}
        opened={open}
        title={<Title order={3}>Nuevo Proyecto</Title>}
        onClose={() => setOpen(false)}
      >
        <Card.Section>
          <Image src={'#'} height={160} alt={'aas'} />
          <div style={{ position: "relative" }}>
            <div className={classes.overlay}></div>
            <Text color={"white"} className={classes.absolute} weight={500}>
              Nombre
            </Text>
          </div>
        </Card.Section>
      </Modal>
    </Container>
  );
}
