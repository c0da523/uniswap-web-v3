import {
  BACKEND_NOT_YET_SUPPORTED_CHAIN_IDS,
  BACKEND_SUPPORTED_CHAINS,
  supportedChainIdFromGQLChain,
  validateUrlChainParam,
} from '@src/graphql/data/util'
import Badge from 'components/Badge'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { getChainInfo } from 'constants/chainInfo'
import { useInfoExplorePageEnabled } from 'featureFlags/flags/infoExplore'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useExploreParams } from 'pages/Explore/redirects'
import { useRef } from 'react'
import { Check, ChevronDown, ChevronUp } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
import { useModalIsOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import styled, { css, useTheme } from 'styled-components'
import { EllipsisStyle } from 'theme/components'

import FilterOption from './FilterOption'

const InternalMenuItem = styled.div`
  flex: 1;
  padding: 12px 8px;
  color: ${({ theme }) => theme.neutral1};

  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`
const InternalLinkMenuItem = styled(InternalMenuItem)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;

  :hover {
    background-color: ${({ theme }) => theme.surface3};
    text-decoration: none;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 60%;
      pointer-events: none;
    `}
`
const MenuTimeFlyout = styled.span<{ isInfoExplorePageEnabled: boolean }>`
  min-width: ${({ isInfoExplorePageEnabled }) => (isInfoExplorePageEnabled ? '150px' : '240px')};
  max-height: 350px;
  overflow: auto;
  background-color: ${({ theme }) => theme.surface1};
  box-shadow: ${({ theme }) => theme.deprecated_deepShadow};
  border: 0.5px solid ${({ theme }) => theme.surface3};
  border-radius: 12px 0px 0px 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 48px;
  z-index: 100;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.surface3} transparent`};

  // safari and chrome scrollbar styling
  ::-webkit-scrollbar {
    background: transparent;
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.surface3};
    border-radius: 8px;
  }

  ${({ isInfoExplorePageEnabled }) =>
    isInfoExplorePageEnabled
      ? css`
          right: 0px;
          @media screen and (max-width: ${({ theme }) => `${theme.breakpoint.lg}px`}) {
            left: 0px;
          }
        `
      : css`
          left: 0px;
        `}
`
const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`
const StyledMenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  border: none;
  font-weight: 535;
  vertical-align: middle;
`
const Chevron = styled.span<{ open: boolean }>`
  padding-top: 1px;
  color: ${({ open, theme }) => (open ? theme.neutral1 : theme.neutral2)};
`
const NetworkLabel = styled.div`
  ${EllipsisStyle}
  display: flex;
  gap: 8px;
  align-items: center;
`
const CheckContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
`
const NetworkFilterOption = styled(FilterOption)<{ isInfoExplorePageEnabled: boolean }>`
  ${({ isInfoExplorePageEnabled }) => !isInfoExplorePageEnabled && 'min-width: 156px;'}
`
const Tag = styled(Badge)`
  background-color: ${({ theme }) => theme.surface2};
  color: ${({ theme }) => theme.neutral2};
  font-size: 10px;
  opacity: 1;
  padding: 4px 6px;
`

export default function NetworkFilter() {
  const theme = useTheme()
  const node = useRef<HTMLDivElement | null>(null)
  const open = useModalIsOpen(ApplicationModal.NETWORK_FILTER)
  const toggleMenu = useToggleModal(ApplicationModal.NETWORK_FILTER)
  useOnClickOutside(node, open ? toggleMenu : undefined)
  const navigate = useNavigate()
  const { tab } = useExploreParams()

  const isInfoExplorePageEnabled = useInfoExplorePageEnabled()

  const currentChainName = validateUrlChainParam(useParams().chainName)
  const chainId = supportedChainIdFromGQLChain(currentChainName)

  const chainInfo = getChainInfo(chainId)

  return (
    <StyledMenu ref={node}>
      <NetworkFilterOption
        isInfoExplorePageEnabled={isInfoExplorePageEnabled}
        onClick={toggleMenu}
        aria-label="networkFilter"
        active={open}
        data-testid="tokens-network-filter-selected"
      >
        <StyledMenuContent>
          <NetworkLabel>
            <ChainLogo chainId={chainId} size={20} /> {!isInfoExplorePageEnabled && chainInfo.label}
          </NetworkLabel>
          <Chevron open={open}>
            {open ? (
              <ChevronUp width={20} height={15} viewBox="0 0 24 20" />
            ) : (
              <ChevronDown width={20} height={15} viewBox="0 0 24 20" />
            )}
          </Chevron>
        </StyledMenuContent>
      </NetworkFilterOption>
      {open && (
        <MenuTimeFlyout isInfoExplorePageEnabled={isInfoExplorePageEnabled}>
          {BACKEND_SUPPORTED_CHAINS.map((network) => {
            const chainId = supportedChainIdFromGQLChain(network)
            const chainInfo = getChainInfo(chainId)
            return (
              <InternalLinkMenuItem
                key={network}
                data-testid={`tokens-network-filter-option-${network.toLowerCase()}`}
                onClick={() => {
                  isInfoExplorePageEnabled
                    ? navigate(`/explore/${tab}/${network.toLowerCase()}`)
                    : navigate(`/tokens/${network.toLowerCase()}`)
                  toggleMenu()
                }}
              >
                <NetworkLabel>
                  <ChainLogo chainId={chainId} size={20} /> {chainInfo.label}
                </NetworkLabel>
                {network === currentChainName && (
                  <CheckContainer>
                    <Check size={16} color={theme.accent1} />
                  </CheckContainer>
                )}
              </InternalLinkMenuItem>
            )
          })}
          {BACKEND_NOT_YET_SUPPORTED_CHAIN_IDS.map((network) => {
            const chainInfo = getChainInfo(network)
            return (
              <InternalLinkMenuItem
                key={network}
                data-testid={`tokens-network-filter-option-${network}-chain`}
                disabled
              >
                <NetworkLabel>
                  <ChainLogo chainId={network} size={20} /> {chainInfo.label}
                </NetworkLabel>
                <Tag>Coming soon</Tag>
              </InternalLinkMenuItem>
            )
          })}
        </MenuTimeFlyout>
      )}
    </StyledMenu>
  )
}
