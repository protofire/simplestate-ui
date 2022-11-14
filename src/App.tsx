import { Container, MantineProvider, Text } from "@mantine/core"

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <Text>Simplestate</Text>
      </Container>
    </MantineProvider>
  )
}

export default App
