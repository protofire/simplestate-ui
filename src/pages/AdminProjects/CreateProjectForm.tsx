import { Button, Container, createStyles, Group, Input, Select, Title, SimpleGrid, Switch, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContract } from "../../hooks/useContract";

const useStyles = createStyles(() => ({
  input: {
    marginTop: 10
  }
}));

interface CreateProjectFormProps {
  close(): void;
}

export function CreateProjectForm({ close } : CreateProjectFormProps) {
  const { contract } = useContract();
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: '',
      owner: '',
      incomeDepositor: '',
      metadataURL: '',
      permissioningModel: 'blacklist',
      maxSupply: '',
      unitOfAccount: 'USDC',
      fundingAmount: '',
      fundingTime: '',
      sellAmount: '',
      sellTime: '',
      produceIncome: false,
      allowPartialSell: false,
      feeModel: 'listing',
      valuationModel: 'rate'
    },

    validate: {
      name: (value) => (!!value ? null : 'Campo requerido'),
      owner: (value) => (!!value ? null : 'Campo requerido'),
      incomeDepositor: (value) => (!!value ? null : 'Campo requerido'),
      maxSupply: (value) => (!!value ? null : 'Campo requerido'),
      fundingAmount: (value) => (!!value ? null : 'Campo requerido'),
      fundingTime: (value) => (!!value ? null : 'Campo requerido'),
      sellAmount: (value) => (!!value ? null : 'Campo requerido'),
      sellTime: (value) => (!!value ? null : 'Campo requerido'),
    },
  });

  const onSubmit = () => {
    if(form.validate().errors) return;

    console.log(form.values);
  }

  return (
    <Container>
      <form>
        <Title order={4}>Detalles del proyecto</Title>
        <Input.Wrapper className={classes.input} withAsterisk label="Nombre del proyecto">
          <TextInput form={form} {...form.getInputProps('name')} placeholder="Nombre del proyecto"/>
        </Input.Wrapper>

        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Dueño del proyecto <span style={{fontWeight: 300}}>(Owner)</span>
            </span>
        }>
          <TextInput {...form.getInputProps('owner')} placeholder="Ej. 0xae6C283135480b56738CDaBdB8d7Df11E59364a9SPT33" />
        </Input.Wrapper>

        <Input.Wrapper
          className={classes.input}
          withAsterisk
          label={
            <span>
              Depositante de ingresos <span style={{fontWeight: 300}}>(Income depositor)</span>
            </span>
        }>
          <TextInput {...form.getInputProps('incomeDepositor')} placeholder="Ej. 0xae6C283135480b56738CDaBdB8d7Df11E59364a9SPT33"/>
        </Input.Wrapper>

        <Input.Wrapper className={classes.input} label="Metadata URL">
          <TextInput {...form.getInputProps('metadataURL')} placeholder="Ej. http://someurl.io" />
        </Input.Wrapper>

        <Input.Wrapper className={classes.input} withAsterisk label="Modelo de permisionado">
          <Select disabled {...form.getInputProps('permissioningModel')} data={[{value: 'blacklist', label: 'by Blacklist provider'}]} />
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
            <NumberInput {...form.getInputProps('maxSupply')} type={'number'} placeholder="Ej. 5000" />
          </Input.Wrapper>
          <Input.Wrapper
            className={classes.input}
            withAsterisk
            label={
              <span>
                Unidad de cuenta <span style={{fontWeight: 300}}>(Moneda de depósito)</span>
              </span>
          }>
            <TextInput {...form.getInputProps('unitOfAccount')} disabled />
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
            <NumberInput {...form.getInputProps('fundingAmount')} type={'number'} placeholder="Ej. 150.000" />
          </Input.Wrapper>
          <Input.Wrapper
            className={classes.input}
            withAsterisk
            label={
              <span>
                Tiempo <span style={{fontWeight: 300}}>(Días corridos)</span>
              </span>
          }>
            <NumberInput {...form.getInputProps('fundingTime')} type={'number'} placeholder="Ej. 90" />
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
            <NumberInput {...form.getInputProps('sellAmount')} type={'number'} placeholder="Ej. 250.000" />
          </Input.Wrapper>
          <Input.Wrapper
            className={classes.input}
            withAsterisk
            label={
              <span>
                Tiempo <span style={{fontWeight: 300}}>(Meses)</span>
              </span>
          }>
            <NumberInput {...form.getInputProps('sellTime')} type={'number'} placeholder="Ej. 12" />
          </Input.Wrapper>
        </SimpleGrid>

        <Switch
          className={classes.input} 
          onLabel="SI" 
          offLabel="NO" 
          label={'Produce ingresos'} 
          color={'teal'} 
          size={'sm'} 
          labelPosition={'left'}
          {...form.getInputProps('produceIncome')}
        />
        <Switch 
          className={classes.input} 
          onLabel="SI" 
          offLabel="NO" 
          label={'Admite venta parcial'} 
          color={'teal'} 
          size={'sm'} 
          labelPosition={'left'}
          {...form.getInputProps('allowPartialSell')}
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
            <Select disabled {...form.getInputProps('feeModel')} data={[{value: 'listing', label: 'Listing fee'}]} />
          </Input.Wrapper>
          <Input.Wrapper
            className={classes.input}
            withAsterisk
            label={
              <span>
                Modelo de Valuación <span style={{fontWeight: 300}}>(Valuation model)</span>
              </span>
          }>
            <Select disabled {...form.getInputProps('valuationModel')} data={[{value: 'rate', label: 'by Amount rate'}]} />
          </Input.Wrapper>
        </SimpleGrid>

        <Group position={'right'} mt={20}>
          <Button onClick={close} color={'teal'} variant="subtle" >Cancelar</Button>
          <Button onClick={onSubmit} color={'teal'}>Crear</Button>
        </Group>
      </form>
    </Container>
  );
}