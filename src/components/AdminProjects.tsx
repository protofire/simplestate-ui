import { Button, Container, createStyles, Group, Input, Modal, Select, Title, Text, SimpleGrid, Switch } from "@mantine/core";
import { IconBuilding } from '@tabler/icons';
import { useState } from "react";

const useStyles = createStyles(() => ({
  group: {
    justifyContent: 'space-between'
  },
  input: {
    marginTop: 10
  }
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

interface CreateProjectFormProps {
  close(): void;
}

function CreateProjectForm({ close } : CreateProjectFormProps) {
  const { classes } = useStyles();

  return (
    <Container>
      <Title order={4}>Detalles del proyecto</Title>
      <Input.Wrapper className={classes.input} withAsterisk label="Nombre del proyecto">
        <Input placeholder="Nombre del proyecto"></Input>
      </Input.Wrapper>

      <Input.Wrapper
        className={classes.input}
        withAsterisk
        label={
          <span>
            Dueño del proyecto <span style={{fontWeight: 300}}>(Owner)</span>
          </span>
      }>
        <Input placeholder="Ej. 0xae6C283135480b56738CDaBdB8d7Df11E59364a9SPT33"></Input>
      </Input.Wrapper>

      <Input.Wrapper
        className={classes.input}
        withAsterisk
        label={
          <span>
            Depositante de ingresos <span style={{fontWeight: 300}}>(Income depositor)</span>
          </span>
      }>
        <Input placeholder="Ej. 0xae6C283135480b56738CDaBdB8d7Df11E59364a9SPT33"></Input>
      </Input.Wrapper>

      <Input.Wrapper className={classes.input} withAsterisk label="Metadata URL">
        <Input placeholder="Ej. http://someurl.io"></Input>
      </Input.Wrapper>

      <Input.Wrapper className={classes.input} withAsterisk label="Modelo de permisionado">
        <Select disabled value={'blacklist'} data={[{value: 'blacklist', label: 'by Blacklist provider'}]} />
      </Input.Wrapper>

      <Title mt={20} order={4}>Finanzas del proyecto</Title>
      
      <SimpleGrid cols={2}>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Unidades en circulación <span style={{fontWeight: 300}}>(Max supply)</span>
            </span>
        }>
          <Input type={'number'} placeholder="Ej. 5000"></Input>
        </Input.Wrapper>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Unidad de cuenta <span style={{fontWeight: 300}}>(Moneda de depósito)</span>
            </span>
        }>
          <Input disabled value={'USDC'}></Input>
        </Input.Wrapper>
      </SimpleGrid>

      <Title mt={20} order={6}>Metas de Financiamiento</Title>
      <SimpleGrid cols={2}>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Cantidad <span style={{fontWeight: 300}}>(USDC)</span>
            </span>
        }>
          <Input type={'number'} placeholder="Ej. 150.000"></Input>
        </Input.Wrapper>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Tiempo <span style={{fontWeight: 300}}>(Días corridos)</span>
            </span>
        }>
          <Input type={'number'} placeholder="Ej. 90"></Input>
        </Input.Wrapper>
      </SimpleGrid>


      <Title mt={20} order={6}>Metas de venta</Title>
      <SimpleGrid cols={2}>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Cantidad <span style={{fontWeight: 300}}>(USDC)</span>
            </span>
        }>
          <Input type={'number'} placeholder="Ej. 250.000"></Input>
        </Input.Wrapper>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Tiempo <span style={{fontWeight: 300}}>(Meses)</span>
            </span>
        }>
          <Input type={'number'} placeholder="Ej. 12"></Input>
        </Input.Wrapper>
      </SimpleGrid>

      <Switch
        className={classes.input} 
        onLabel="SI" 
        offLabel="NO" 
        label={'Produce ingresos'} 
        defaultValue={'si'} 
        color={'teal'} 
        size={'sm'} 
        labelPosition={'left'}
      />
      <Switch 
        className={classes.input} 
        onLabel="SI" 
        offLabel="NO" 
        label={'Admite venta parcial'} 
        defaultValue={'no'} 
        color={'teal'} 
        size={'sm'} 
        labelPosition={'left'}
      />

      <SimpleGrid cols={2}>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Modelo de Comisión <span style={{fontWeight: 300}}>(Fee model)</span>
            </span>
        }>
          <Select disabled value={'listing'} data={[{value: 'listing', label: 'Listing fee'}]} />
        </Input.Wrapper>
        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Modelo de Valuación <span style={{fontWeight: 300}}>(Valuation model)</span>
            </span>
        }>
          <Select disabled value={'rate'} data={[{value: 'rate', label: 'by Amount rate'}]} />
        </Input.Wrapper>
      </SimpleGrid>

      <Group position={'right'} mt={20}>
        <Button onClick={close} color={'teal'} variant="subtle" >Cancelar</Button>
        <Button onClick={close} color={'teal'}>Crear</Button>
      </Group>
    </Container>
  );
}