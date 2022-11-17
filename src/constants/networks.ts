export const networks: Record<number, string> = {
  1:	'Ethereum (Mainnet)',
	3:	'Ropsten Test Network',
	4:	'Rinkeby Test Network',
	5:	'Goerli Test Network',
	42:	'Kovan Test Network',
	137:	'Polygon',
	80001: 'Mumbai Test Network',
	43114:	'Avalanche',
	43113:	'Fuji Test Network',
	1088:	'Metis Andromeda',
	588:	'Metis Stardust Test Network',
	1313161554:	'Aurora',
	1313161555:	'Aurora Test Network',
	56:	'BSC',
	97:	'BSC Test Network',
	250:	'Fantom Opera',
	4002:	'Fantom Test Network'
};

export enum networkEnum {
 ETHEREUM_MAINNET=1,
 ROPSTEN=3,
 RINKEBY=4,
 GOERLI=5,
 KOVAN=42,
 POLYGON=137,
 MUMBAI=80001,
 AVALANCHE=43114,
 FUJI=43113,
 METIS_ANDROMEDA=1088,
 METIS_STARDUST=588,
 AURORA=1313161554,
 AURORA_TEST=1313161555,
 BSC=56,
 BSC_TEST=97,
 FANTOM_OPERA=250,
 FANTOM_TEST=4002
}
