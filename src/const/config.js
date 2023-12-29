// import erc20_abi from './erc20.json'
// import erc721_abi from './erc721.json'
import pmt_purchase_abi from './PMTPurchaseContract.json'
import nfts_marketplace_abi from './NFTMarketplace.json'
import nfts_collection_abi from './MinterCollection.json'
import swap_abi from './SwapContract.json'
import mt_abi from './MinterToken.json'
import usdt_abi from './MinterSharesToken.json'
import minter_collection_abi from './MinterCollection.json'
import burnable_token_abi from './BurnableToken.json'
import pmt_abi from './PreMintToken.json'

const config = {
  USDToken_addr: '0xA6afb1F4dbC92C1019bd612D15b164AfD3caEf72',
  pmt_addr: '0xD473D757DdF59f53C77AA90eC66e4c237113935e',
  mt_addr: '0x2D31C2AD61c7342a94eae6BBAC830819710C8425',
  mst_addr: '0x1a07E2f75dc58A9eAbc1e8Da5355Fc036D87Bf17',
  pmt_purchase_addr: '0xcEa698fB80d4e58F847CC4E1a2935011b15372DC',
  nfts_marketplace_addr: '0x4451D0e006b7F234c0faEEdCC548778b9B5a2Cc9',
  swap_addr: '0xD3934827Bfd5BAFF54d6E1d353263D0C5498260E',
  minter_collection: '0x45977e4715d5349ba8a465aea0eF4345987b51e1',

  nfts_collection_addr: '0x3848027E5728Fd927791c065b68684e2EBf4fc2a',

  pmt_abi: pmt_abi.abi,
  mt_abi: mt_abi.abi,
  burnable_token_abi: burnable_token_abi.abi,
  usdt_abi: usdt_abi.abi,
  pmt_purchase_abi: pmt_purchase_abi.abi,
  nfts_collection_abi: nfts_collection_abi.abi,
  nfts_marketplace_abi: nfts_marketplace_abi.abi,
  swap_abi: swap_abi.abi,
  minter_collection_abi: minter_collection_abi.abi,

  // api: 'http://13.228.135.184:8000/api',
  chainId: '0x11624',
  rpcUrls: ['https://rpc-testnet.hashahead.org'],
  chainName: 'HAH',
  blockExplorerUrls: ['https://testnet.hashahead.org/'],
  decimals: 18
}

export { config }
