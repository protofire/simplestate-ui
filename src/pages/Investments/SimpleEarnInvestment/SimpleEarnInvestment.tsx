import {
  Button,
  Title,
  Text,
  Group,
  Paper,
  Grid,
  TextInput,
} from "@mantine/core";

export function SimpleEarnInvestment() {
  return (
    <>
      <Title size={"lg"} mb="lg">
        Simple Earn
      </Title>
      <Paper radius="xs" p="lg" mb="xl" withBorder>
        <Grid>
          <Grid.Col span={4}>
            <Text>Balance: 29199 USDC</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Valor actual: 29199 USDC</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>APY: 6%</Text>
          </Grid.Col>
        </Grid>
        <Group position="center" grow>
          <Text>Comprar Simple Earn Token (SET)</Text>

          <TextInput placeholder="500 SET" type={"number"} />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue.9", deg: 60 }}
            radius={"lg"}
            m="md"
          >
            Comprar
          </Button>
        </Group>
      </Paper>
    </>
  );
}