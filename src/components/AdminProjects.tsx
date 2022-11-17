import { Button, Container, createStyles, Group, Select } from "@mantine/core";
import { IconBuilding } from '@tabler/icons';

const useStyles = createStyles(() => ({
  group: {
    justifyContent: 'space-between'
  }
}));

export function AdminProjects() {
  const { classes } = useStyles();
  return (
    <Container>
      <Group className={classes.group}>
        <Select label="Proyecto" data={[]}></Select>
        <Button color={'teal'} radius={'lg'} leftIcon={<IconBuilding size={18}/>}>Crear proyecto</Button>
      </Group>
    </Container>
  );
}