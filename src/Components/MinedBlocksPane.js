import React from 'react'
import { Table } from 'semantic-ui-react'
import * as api from '../Api/web3Wrapper'

const MinedBlocksPane = ({ address }) => {
  if (!address.minedBlocks) return null
  return (
    <Table celled textAlign='center'>
      <Table.Body>
        {address.minedBlocks.map((block, key) => (
          <Table.Row key={key}>
            <Table.Cell>
              {block.blockNumber}
            </Table.Cell>
            <Table.Cell>
              {`${api.fromWei(block.blockReward, 'ether')} Ether`}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default MinedBlocksPane