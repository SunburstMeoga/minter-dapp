import erc20_abi from './erc20.json'
import erc721_abi from './erc721.json'
import game_abi from './game.json'

const config = {
  '3ATUSDToken_addr': '0x53Ffa33162b1E3dd5FeE57531a6708b85266F7e0',
  pmt_addr: '0xA6afb1F4dbC92C1019bd612D15b164AfD3caEf72',
  mt_addr: '0xD473D757DdF59f53C77AA90eC66e4c237113935e',
  mst_addr: '0x2D31C2AD61c7342a94eae6BBAC830819710C8425',
  pmt_purchase_addr: '0x1a07E2f75dc58A9eAbc1e8Da5355Fc036D87Bf17',
  nfts_collection_addr: '0xcEa698fB80d4e58F847CC4E1a2935011b15372DC',
  nfts_marketplace_addr: '0x45977e4715d5349ba8a465aea0eF4345987b51e1',

  api: 'http://13.228.135.184:8000/api',
  chainId: '1688288',
  rpcUrls: ['https://rpc-testnet.hashahead.org'],
  chainName: 'PGChain',
  blockExplorerUrls: ['https://scan.pgchain.org/']
}

export { config }
