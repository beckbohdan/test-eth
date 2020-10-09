import React from 'react'
import { Grid, Segment, Label } from 'semantic-ui-react'
import InfoRow from './InfoRow.js'
import PriceDiffLabel from './PriceDiffLabel.js'

const TokenInfo = ({ tokenInfo }) => {
  const price = tokenInfo.price
  const labels = price
    ? <Label.Group size='middle'>
      <PriceDiffLabel diff={price.diff} label='24 h' />
      <PriceDiffLabel diff={price.diff7d} label='7 d' />
      <PriceDiffLabel diff={price.diff30d} label='30 d' />
    </Label.Group>
    : null
  const priceContent = price && (
    <Grid>
      <Grid.Column width={3}>{`${(price.rate * 1).toFixed(2)} ${price.currency}`}</Grid.Column>
      <Grid.Column width={13}>{labels}</Grid.Column>
    </Grid>
  )
  return (
    <Segment.Group>
      {price &&
        <InfoRow
          title='Price'
          content={priceContent}
        />}
      {price &&
      <InfoRow
        title='Market cap'
        content={`${price.marketCapUsd.toLocaleString()} ${price.currency}`}
      />}
    </Segment.Group>
  )
}

export default TokenInfo
