import { Header, Button, createStyles, Container, Badge, Tooltip } from "@mantine/core";
import logo from '../../assets/simple-state-logo.png';
import { networkEnum, networks } from "../../constants/networks";
import { useMetamask } from "../../hooks/useMetamask";
import { useEffect } from "react";
import { Network } from '@ethersproject/providers';

const useStyles = createStyles((theme) => ({
  headerContent: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: 'space-between'
  }
}));

const defaultNetwork = Number(import.meta.env.VITE_CHAIN_ID ?? networkEnum.MUMBAI);

export function AppHeader() {
  const { connect, connectDefault, accounts, network, sitchChainTo } = useMetamask();
  const { classes } = useStyles();

  useEffect(() => {
    connectDefault();
  }, []);
  
  return (
    <Header height={{ base: 70 }} p="md">
      <Container>
        <div className={classes.headerContent} >
          <img src={logo} width={180} />
          {accounts[0]
            ? <SessionInfo {...{accounts, network, sitchChainTo}} />
            : <ConnectWallet connect={connect}/>
          }
        </div>
      </Container>
    </Header>
  );
}

interface ISessionInfoProps {
  accounts: string[], 
  network: Network | null,
  sitchChainTo: (chainId: number) => Promise<void>
}

function SessionInfo({ accounts, network, sitchChainTo } : ISessionInfoProps) {

  const switchChain = () => {
    if (network?.chainId !== defaultNetwork) {
      sitchChainTo(defaultNetwork);
    }
  }

  return (
    <div>
      {accounts[0]} 
      <Tooltip
        disabled={network?.chainId === defaultNetwork}
        multiline
        withArrow
        transition="fade"
        transitionDuration={200}
        label={`Red incorrecta, conéctate a la red de test ${networks[defaultNetwork]}`}
      >
        <Badge
          onClick={switchChain}
          color={network?.chainId === defaultNetwork ? 'teal' : 'red'}
        >{network?.name ?? 'Invalid network'}</Badge>
      </Tooltip>
    </div>
  );
}

function ConnectWallet({ connect }: {connect: () => Promise<void>}) {
  return (
    <Button
      sx={(theme) => ({ "box-shadow": theme.shadows.sm, })}
      color="teal"
      variant="white"
      radius={'lg'}
      onClick={connect}>
      Conectar billetera
    </Button>
  );
}