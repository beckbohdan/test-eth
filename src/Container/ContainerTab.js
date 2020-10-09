import React from 'react'
import { Tab } from 'semantic-ui-react'
import TokenBalanceInfo from '../Components/TokenBalanceInfo.js'
import MinedBlocksPane from '../Components/MinedBlocksPane'

const ContainerTab = ({ address }) => {
  if (!address) return null
  const panes = [
    address.tokens
      ? {
        menuItem: 'Token Holdings Info',
        render: () => (
          <Tab.Pane>
            {address.tokens.map((token, key) => (
              <TokenBalanceInfo key={key} token={token} />
              ))}
          </Tab.Pane>
          )
      }
      : null,
    address.minedBlocks
      ? {
        menuItem: 'Mined blocks',
        render: () => (
          <Tab.Pane as='div'><MinedBlocksPane address={address} /></Tab.Pane>
          )
      }
      : null
  ]
  return <Tab menu={{ borderless: false }} panes={panes} />
}

export default ContainerTab
