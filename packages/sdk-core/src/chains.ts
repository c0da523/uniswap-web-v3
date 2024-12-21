export enum ChainId {
  MAINNET = 1,
  GOERLI = 5, // deprecated
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420, // deprecated
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613, // deprecated
  POLYGON = 137,
  POLYGON_MUMBAI = 80001, // deprecated
  CELO = 42220, // 可以拿来测试
  CELO_ALFAJORES = 44787,
  GNOSIS = 100,
  MOONBEAM = 1284,
  BNB = 56,
  BNB_TESTNET = 97,
  AVALANCHE = 43114,
  BASE_GOERLI = 84531, // deprecated
  BASE = 8453,
  EXP_TESTNET = 10000
}

export const SUPPORTED_CHAINS = [
  ChainId.MAINNET,
  ChainId.OPTIMISM,
  ChainId.OPTIMISM_GOERLI,
  ChainId.ARBITRUM_ONE,
  ChainId.ARBITRUM_GOERLI,
  ChainId.POLYGON,
  ChainId.POLYGON_MUMBAI,
  ChainId.GOERLI,
  ChainId.SEPOLIA,
  ChainId.CELO_ALFAJORES,
  ChainId.CELO,
  ChainId.BNB,
  ChainId.BNB_TESTNET,
  ChainId.AVALANCHE,
  ChainId.BASE,
  ChainId.BASE_GOERLI,
  ChainId.EXP_TESTNET
] as const
export type SupportedChainsType = typeof SUPPORTED_CHAINS[number]

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = 'ETH',
  MATIC = 'MATIC',
  CELO = 'CELO',
  GNOSIS = 'XDAI',
  MOONBEAM = 'GLMR',
  BNB = 'BNB',
  AVAX = 'AVAX',
  EXP = 'EXP'
}
