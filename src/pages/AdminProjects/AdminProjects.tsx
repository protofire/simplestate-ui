import { Button, Container, createStyles, Group, Modal, Select, Title } from "@mantine/core";
import { IconBuilding } from '@tabler/icons';
import { useState } from "react";
import { CreateProjectForm } from "./CreateProjectForm";

const useStyles = createStyles(() => ({
  group: {
    justifyContent: 'space-between'
  },
}));

export function AdminProjects() {
  const { classes } = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Group className={classes.group}>
        <Select label="Proyecto" data={[]}></Select>
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
    </Container>
  );
}

