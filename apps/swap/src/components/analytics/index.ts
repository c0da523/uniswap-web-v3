import { sendAnalyticsEvent } from '@src/analytics'
import { InterfaceEventName } from '@uniswap/analytics-events'

export function outboundLink({ label }: { label: string }) {
  sendAnalyticsEvent(InterfaceEventName.EXTERNAL_LINK_CLICK, {
    label,
  })
}
