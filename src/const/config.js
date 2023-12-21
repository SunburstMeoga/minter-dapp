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
  USDToken_addr: '0xB66Ee6DA8bC9709BC259f8d05D3d6D7178CCB0cc',
  pmt_addr: '0xb7963b1a673d6a2C896d675be759c1934A5788A9',
  mt_addr: '0x3482CC45Fe704C63CAf627A8443a1F4bb3DA798E',
  mst_addr: '0x7da8AA56BaC08842D6273334EBd15dBEfE2c674E',
  pmt_purchase_addr: '0x2D9A858e926531027d8Ec97b968c622E3fa481f3',
  nfts_marketplace_addr: '0x97E7aE4Dd8fdC3Be30CCF2D85cA2EeDFdA9f5f38',
  swap_addr: '0xF1C25399c45C5AD603B9Ea0Ca222AcA4fc1B219c',
  minter_collection: '0x6142e5232cb87e34196e95BaED4a6ba980413E9d',

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
