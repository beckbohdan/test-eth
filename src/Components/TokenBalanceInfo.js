import React from 'react'
import { Segment, Label } from 'semantic-ui-react'
import InfoRow from './InfoRow.js'
import PriceDiffLabel from './PriceDiffLabel.js'



const TokenBalanceInfo = ({ token }) => {
  const quantity = token.balance / Math.pow(10, token.tokenInfo.decimals)
  const price = token.tokenInfo.price
  const value_in_usd = (quantity * price.rate).toFixed(2)
  const totalSupply = `${(token.tokenInfo.totalSupply / Math.pow(10, token.tokenInfo.decimals)).toLocaleString()} ${token.tokenInfo.symbol}`
  const headerContent = price
    ? <Label.Group size='middle'>
      <PriceDiffLabel diff={price.diff} label='24 h' />
      <PriceDiffLabel diff={price.diff7d} label='7 d' />
      <PriceDiffLabel diff={price.diff30d} label='30 d' />
    </Label.Group>
    : null
  return (
    <Segment.Group>
      <InfoRow colored
        h='h3'
        title={`${token.tokenInfo.name} (${token.tokenInfo.symbol})`}
        content={headerContent}
      />
      <InfoRow
        title='Quantity'
        content={`${quantity} ${token.tokenInfo.symbol}`}
      />
      {price &&
        <InfoRow
          title='Value in USD'
          content={`${value_in_usd} ${token.tokenInfo.price.currency}`}
        />}
      {price &&
        <InfoRow
          title='Token Price'
          content={`${(price.rate * 1).toFixed(2)} ${price.currency}`}
        />}

      <InfoRow title='Total supply' content={totalSupply} />
    </Segment.Group>
  )
}

export default TokenBalanceInfo
