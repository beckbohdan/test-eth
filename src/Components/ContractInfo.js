import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import InfoRow from './InfoRow.js'
import TokenInfo from './TokenInfo.js'

const ContractInfo = ({ address }) => {
  const withUnit = count => `${count} Ether`

  return (
    <React.Fragment>
      <Segment.Group>
        <Segment>
          <Header>Contract information</Header>
        </Segment>
        <InfoRow title={'Address'} content={address.address} />
        <InfoRow title={'Balance'} content={withUnit(address.ETH.balance)} />
      </Segment.Group>
      <TokenInfo tokenInfo={address.tokenInfo} />
    </React.Fragment>
  )
}

export default ContractInfo
