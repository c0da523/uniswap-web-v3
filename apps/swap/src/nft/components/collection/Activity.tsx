import { NftActivityType } from '@src/graphql/data/__generated__/types-and-hooks'
import { useNftActivity } from '@src/graphql/data/nft/NftActivity'
import { OpacityHoverState } from 'components/Common'
import { Box } from 'nft/components/Box'
import { Column, Row } from 'nft/components/Flex'
import { useBag, useIsMobile, useNativeUsdPrice } from 'nft/hooks'
import { ActivityEventType } from 'nft/types'
import { useCallback, useReducer } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as styles from './Activity.css'
import { AddressCell, BuyCell, EventCell, ItemCell, PriceCell } from './ActivityCells'
import { ActivityLoader, ActivityPageLoader } from './ActivityLoader'

enum ColumnHeaders {
  Item = 'Item',
  Event = 'Event',
  Price = 'Price',
  By = 'By',
  To = 'To',
}

const FilterBox = styled.div<{ isActive: boolean }>`
  display: flex;
  color: ${({ isActive, theme }) => (isActive ? theme.neutral1 : theme.neutral1)};
  background: ${({ isActive, theme }) => (isActive ? theme.surface3 : theme.surface1)};
  border: ${({ isActive, theme }) => `1px solid ${isActive ? theme.surface3 : theme.surface3}`};
  ${OpacityHoverState};
`

export const HeaderRow = () => {
  return (
    <Box className={styles.headerRow}>
      <Box>{ColumnHeaders.Item}</Box>
      <Box>{ColumnHeaders.Event}</Box>
      <Box display={{ sm: 'none', md: 'block' }}>{ColumnHeaders.Price}</Box>
      <Box display={{ sm: 'none', xl: 'block' }}>{ColumnHeaders.By}</Box>
      <Box display={{ sm: 'none', xxl: 'block' }}>{ColumnHeaders.To}</Box>
    </Box>
  )
}

interface ActivityProps {
  contractAddress: string
  rarityVerified: boolean
  collectionName: string
  chainId?: number
}

const initialFilterState = {
  [ActivityEventType.Listing]: true,
  [ActivityEventType.Sale]: true,
  [ActivityEventType.Transfer]: false,
  [ActivityEventType.CancelListing]: false,
}

export const reduceFilters = (state: typeof initialFilterState, action: { eventType: ActivityEventType }) => {
  return { ...state, [action.eventType]: !state[action.eventType] }
}

export const Activity = ({ contractAddress, rarityVerified, collectionName, chainId }: ActivityProps) => {
  const [activeFilters, filtersDispatch] = useReducer(reduceFilters, initialFilterState)

  const {
    nftActivity,
    hasNext: hasNextActivity,
    loadMore: loadMoreActivities,
    loading: activitiesAreLoading,
  } = useNftActivity(
    {
      activityTypes: Object.keys(activeFilters)
        .map((key) => key as NftActivityType)
        .filter((key) => activeFilters[key]),
      address: contractAddress,
    },
    25
  )

  const isLoadingMore = hasNextActivity && nftActivity?.length
  const itemsInBag = useBag((state) => state.itemsInBag)
  const addAssetsToBag = useBag((state) => state.addAssetsToBag)
  const removeAssetsFromBag = useBag((state) => state.removeAssetsFromBag)
  const cartExpanded = useBag((state) => state.bagExpanded)
  const toggleCart = useBag((state) => state.toggleBag)
  const isMobile = useIsMobile()
  const ethPriceInUSD = useNativeUsdPrice()

  const Filter = useCallback(
    function ActivityFilter({ eventType }: { eventType: ActivityEventType }) {
      const isActive = activeFilters[eventType]

      return (
        <FilterBox className={styles.filter} isActive={isActive} onClick={() => filtersDispatch({ eventType })}>
          {eventType.charAt(0) + eventType.slice(1).toLowerCase() + 's'}
        </FilterBox>
      )
    },
    [activeFilters]
  )

  return (
    <Box marginLeft={{ sm: '16', md: '48' }}>
      <Row gap="8" paddingTop={{ sm: '0', md: '16' }}>
        <Filter eventType={ActivityEventType.Listing} />
        <Filter eventType={ActivityEventType.Sale} />
        <Filter eventType={ActivityEventType.Transfer} />
      </Row>
      {activitiesAreLoading ? (
        <ActivityLoader />
      ) : (
        nftActivity && (
          <Column marginTop="36">
            <HeaderRow />
            <InfiniteScroll
              next={loadMoreActivities}
              hasMore={!!hasNextActivity}
              loader={isLoadingMore ? <ActivityPageLoader rowCount={2} /> : null}
              dataLength={nftActivity?.length ?? 0}
              style={{ overflow: 'unset' }}
            >
              {nftActivity.map(
                (event, i) =>
                  event.eventType && (
                    <Box
                      as={Link}
                      data-testid="nft-activity-row"
                      // @ts-ignore Box component is not typed properly to typecheck
                      // custom components' props and will incorrectly report `to` as invalid
                      to={`/nfts/asset/${event.collectionAddress}/${event.tokenId}?origin=activity`}
                      className={styles.eventRow}
                      key={i}
                    >
                      <ItemCell
                        event={event}
                        rarityVerified={rarityVerified}
                        collectionName={collectionName}
                        eventTimestamp={event.eventTimestamp}
                        isMobile={isMobile}
                      />
                      <EventCell
                        eventType={event.eventType}
                        eventTimestamp={event.eventTimestamp}
                        eventTransactionHash={event.transactionHash}
                        price={event.price}
                        isMobile={isMobile}
                      />
                      <PriceCell marketplace={event.marketplace} price={event.price} />
                      <AddressCell address={event.fromAddress} chainId={chainId} />
                      <AddressCell address={event.toAddress} chainId={chainId} desktopLBreakpoint />
                      <BuyCell
                        event={event}
                        collectionName={collectionName}
                        selectAsset={addAssetsToBag}
                        removeAsset={removeAssetsFromBag}
                        itemsInBag={itemsInBag}
                        cartExpanded={cartExpanded}
                        toggleCart={toggleCart}
                        isMobile={isMobile}
                        ethPriceInUSD={ethPriceInUSD}
                      />
                    </Box>
                  )
              )}
            </InfiniteScroll>
          </Column>
        )
      )}
    </Box>
  )
}
