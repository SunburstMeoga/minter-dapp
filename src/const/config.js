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
  pmt_addr: '0xa8dBf4d790FD348aA4d26aA129B92bC5086059bC',
  mt_addr: '0x70d1850F4Bde88065e7De5DF3e41c3aa1DFAc2Ef',
  mst_addr: '0x7a1baBa2D4aE66c39Fe9CD4C78E85D5E61730bA4',
  pmt_purchase_addr: '0x60d3E08f69D347b62F0A21CCfb0dF83952a6A004',
  nfts_marketplace_addr: '0xdf31600DA7FE6A62370E5506d8e57064893Ea50A',
  swap_addr: '0xFfa489f992066E54c68C787F112767FE0cdD5010',
  minter_collection: '0x22Fc986D42F0277c10A4DB22E76850c8397e60AD',

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
