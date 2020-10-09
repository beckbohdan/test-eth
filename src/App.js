import React, { Component } from 'react'
import './App.css'
import * as api from './Api/web3Wrapper.js'
import * as ethplorer from './Api/ethplorer.js'
import * as etherscan from './Api/etherscan.js'

import {
  Button,
  Grid,
  Message,
  Segment,
  Input,
  Header
} from 'semantic-ui-react'

import AddressInfo from './Components/AddressInfo'
import ContractInfo from './Components/ContractInfo'
import ContainerTab from './Container/ContainerTab'


const MAX_COUNT = 50

class App extends Component {
  constructor (props) {
    super(props)
    this.initialState = {
      searchValue: '', // '0xa145ac099e3d2e9781c9c848249e2e6b256b030d', //0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
      error: null,
      block: null,
      address: null
    }

    this.state = {
      ...this.initialState,
      searchFinished: false,
      currentBlock: 0,
      blocks: {},
      ethSupply: 0,
      ethPrice: {}
    }
  }

  componentDidMount () {
    this.timerID = setInterval(this.getCurrentBlock, 3000)
    etherscan.getEthSupply(this.handleEthSupply, this.onError)
    etherscan.getEthPrice(this.handleEthPrice, this.onError)
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  onError = error => {
    this.setState({
      error: error.message
    })
  }

  getCurrentBlock = () => {
    api.getBlockNumber(currentBlock => this.setState({ currentBlock }))
  }

  reset = () => {
    this.setState({
      ...this.initialState,
      searchFinished: false
    })
  }

  handleEthSupply = result => {
    if (result.status === '1') {
      this.setState({
        ethSupply: result.result
      })
    }
  }

  handleEthPrice = result => {
    if (result.status === '1') {
      this.setState({
        ethPrice: result.result
      })
    }
  }

  handleBlockInfo = (error, block) => {
    this.setState({ searchFinished: true })
    if (error) this.onError(error)
    if (block) {
      this.setState({ block })
    }
  }

  handleAddressInfo = address => {
    this.setState({ address })
        etherscan
          .getMinedBlocks(address.address)
          .then(result => this.handleMinedBlocks(result))
          .catch(this.onError)
      }


  handleMinedBlocks = result => {
    if (result.status === '1') {
      this.setState({
        address: {
          ...this.state.address,
          minedBlocks: result.result.slice(0, MAX_COUNT)
        }
      })
    }
  }

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSearch()
    }
  }

  onSearch = () => {
    const { searchValue } = this.state
    this.reset()
    if (api.isAddress(searchValue)) {
      ethplorer.getAddressInfo(
        searchValue,
        this.handleAddressInfo,
        this.onError
      )
    } else {
        this.setState({
          error: `${searchValue} Invalid Wallet address`
        })
    }
  }

  onChange = e => this.setState({ searchValue: e.target.value.trim() })

  fromWei = (wei, unit) => {
    return `${api.fromWei(wei, unit)} ${unit[0].toUpperCase()}${unit.slice(1)}`
  }



  renderMainInfo = () => {
    const {
      error,
      searchFinished,
      block,
      address
    } = this.state
    const notFound = !error && searchFinished && !block
    if (address) {
      return (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column>
              {address.contractInfo
                ? <ContractInfo address={address} />
                : <AddressInfo address={address} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <ContainerTab address={address} />
            </Grid.Column>
          </Grid.Row>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            {notFound &&
              <Message warning>
                <Message.Header>Sorry</Message.Header>
                <p>{'There are no matching entries'}</p>
              </Message>}
          </Grid.Column>
        </Grid.Row>
      
      </React.Fragment>
    )
  }

  renderHeader = () => {
    const { ethPrice, ethSupply } = this.state
    return (
      <Grid verticalAlign='center'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment.Group>
              <Segment color='blue'>
                <Header>Ether price:</Header>
              </Segment>
              <Segment>
                <Grid verticalAlign='center'>
                  <Grid.Row verticalAlign='center' columns={3}>
                    <Grid.Column>
                      {ethPrice.ethusd &&
                        <p>{`$${ethPrice.ethusd.toLocaleString()}`}</p>}
                    </Grid.Column>
                    <Grid.Column>
                      {ethPrice.ethbtc &&
                        <p>{`${ethPrice.ethbtc.toLocaleString()} BTC`}</p>}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group>
              <Segment>
                <Header>Market cap</Header>
              </Segment>
              <Segment>
                <Grid verticalAlign='center'>
                  <Grid.Row verticalAlign='center' columns={3}>
                    <Grid.Column>
                      <p
                      >{`$${(api.fromWei(ethSupply + '', 'ether') * ethPrice.ethusd).toLocaleString()}`}</p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  render () {
    const { error } = this.state
    return (
      <Grid container style={{ padding: '1em 0em' }}>
        <Grid.Row width={16}>
          <Grid.Column>
            {this.renderHeader()}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Input
              fluid
              onKeyPress={this.onKeyPress}
              placeholder='Search by address'
              onChange={this.onChange}
              action={
                <Button color='gray' icon='search' onClick={this.onSearch} />
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {error &&
              <Message error>
                <Message.Header>Something wrong</Message.Header>
                <p>{error}</p>
              </Message>}
          </Grid.Column>
        </Grid.Row>
        {this.renderMainInfo()}
      </Grid>
    )
  }
}

export default App
