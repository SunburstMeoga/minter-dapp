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
  pmt_addr: '0xC206900AF5f88A9a5D407a3f9f39B3F53D46f26D',
  mt_addr: '0x10Ca04dE57A59ba3bAd376b7C4B408a400442940',
  mst_addr: '0xa31FC27b1c3696F8bfef72e7d12c9012f8ba7145',
  pmt_purchase_addr: '0xa726D1Ba5b6f8F71736249b1683C3AC475DbD5e3',
  nfts_marketplace_addr: '0x199Bdc36205150D4DC54103cD3bFaB4C24239961',
  swap_addr: '0x7Ce791cB7d490D5e405DcC78e1eAf5F790183122',
  minter_collection: '0xA2B26F07923F3E9cE141d9334D28988088E9423f',

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
