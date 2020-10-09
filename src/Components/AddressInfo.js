import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import InfoRow from './InfoRow.js'

const AddressInfo = ({ address }) => {
  const withUnit = count => `${count} Ether`
  return (
    <React.Fragment>
      <Segment.Group>
        <Segment color='teal'>
          <Header>Address information</Header>
        </Segment>
        <InfoRow title={'Address'} content={address.address} />
        <InfoRow title={'Balance'} content={withUnit(address.ETH.balance)} />
      </Segment.Group>
    </React.Fragment>
  )
}

export default AddressInfo
