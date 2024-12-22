import { ChainId } from '@repo/sdk-core'
import { SearchToken } from '@src/graphql/data/SearchTokens'
import { TokenQueryData } from '@src/graphql/data/Token'
import { TopToken } from '@src/graphql/data/TopTokens'
import { gqlToCurrency, supportedChainIdFromGQLChain } from '@src/graphql/data/util'
import { PortfolioLogo } from 'components/AccountDrawer/MiniPortfolio/PortfolioLogo'
import { useMemo } from 'react'

import { AssetLogoBaseProps } from './AssetLogo'

export default function QueryTokenLogo(
  props: AssetLogoBaseProps & {
    token?: TopToken | TokenQueryData | SearchToken
  }
) {
  const chainId =
    (props.token?.chain ? supportedChainIdFromGQLChain(props.token?.chain) : ChainId.MAINNET) ?? ChainId.MAINNET
  const currency = props.token ? gqlToCurrency(props.token) : undefined

  return <PortfolioLogo currencies={useMemo(() => [currency], [currency])} chainId={chainId} {...props} />
}
