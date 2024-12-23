import styled from 'styled-components'

import GithubI from './images/github.svg?component'
import TwitterI from './images/twitter-safe.svg?component'

export const DiscordIcon = styled(DiscordI)<{ size?: number; fill?: string }>`
  height: ${({ size }) => (size ? size + 'px' : '32px')};
  width: ${({ size }) => (size ? size + 'px' : '32px')};
  fill: ${({ fill }) => fill ?? '#98A1C0'};
  opacity: 1;
`

export const TwitterIcon = styled(TwitterI)<{ size?: number; fill?: string }>`
  height: ${({ size }) => (size ? size + 'px' : '32px')};
  width: ${({ size }) => (size ? size + 'px' : '32px')};
  fill: ${({ fill }) => fill ?? '#98A1C0'};
  opacity: 1;
`

export const GithubIcon = styled(GithubI)<{ size?: number; fill?: string }>`
  height: ${({ size }) => (size ? size + 'px' : '32px')};
  width: ${({ size }) => (size ? size + 'px' : '32px')};
  fill: ${({ fill }) => fill ?? '#98A1C0'};
  opacity: 1;
`
