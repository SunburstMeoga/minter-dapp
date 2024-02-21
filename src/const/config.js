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
  pmt_addr: '0xF0b6D63CEAE4D260143b2538f6d668f8a2BcC45D',
  mt_addr: '0x920Ad870faA2A1b4BAFfb95a5A952961cDBef425',
  mst_addr: '0xFF29ad1B21CCDb6E668395f5bdD42462b7a8a59F',
  pmt_purchase_addr: '0xd0b627A82de606f64e214A9a840bd3A4D4Abb96d',
  minter_collection: '0x526d64167d540F0E5c3c483c15df67ebD3f669FE',
  nfts_marketplace_addr: '0x10A446BDa366F9074105406cb2FC5641C3c2981e',
  swap_addr: '0x2eA9EAb9e69b39084bC8F2a95f480B8D2A3621AD',

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
