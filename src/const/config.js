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

// const config = { // pro
//   USDToken_addr: '0xcc201Ea56965D7c107C02CE0C2C4CF9A022D1119',
//   pmt_addr: '0xFf44C7db82a2885f70d14080b0883Cd9e444417c',
//   mt_addr: '0x53Ffa33162b1E3dd5FeE57531a6708b85266F7e0',
//   mst_addr: '0xA6afb1F4dbC92C1019bd612D15b164AfD3caEf72',
//   pmt_purchase_addr: '0xD473D757DdF59f53C77AA90eC66e4c237113935e',
//   minter_collection: '0x2D31C2AD61c7342a94eae6BBAC830819710C8425',
//   nfts_marketplace_addr: '0x1a07E2f75dc58A9eAbc1e8Da5355Fc036D87Bf17',
//   swap_addr: '0xcEa698fB80d4e58F847CC4E1a2935011b15372DC',

//   nfts_collection_addr: '0x3848027E5728Fd927791c065b68684e2EBf4fc2a',

//   pmt_abi: pmt_abi.abi,
//   mt_abi: mt_abi.abi,
//   burnable_token_abi: burnable_token_abi.abi,
//   usdt_abi: usdt_abi.abi,
//   pmt_purchase_abi: pmt_purchase_abi.abi,
//   nfts_collection_abi: nfts_collection_abi.abi,
//   nfts_marketplace_abi: nfts_marketplace_abi.abi,
//   swap_abi: swap_abi.abi,
//   minter_collection_abi: minter_collection_abi.abi,

//   // api: 'http://13.228.135.184:8000/api',
//   chainId: '0x11624',
//   rpcUrls: ['https://rpc-testnet.hashahead.org'],
//   chainName: 'HAH',
//   blockExplorerUrls: ['https://testnet.hashahead.org/'],
//   decimals: 18
// }

const config = { // pre-pro
  USDToken_addr: '0xA6afb1F4dbC92C1019bd612D15b164AfD3caEf72',
  pmt_addr: '0xafb580053E0c6CE5A40397EFA233D7D7ec14Ed3D',
  mt_addr: '0xA2fd1BDA015e528c073eCB839536D4075826f717',
  mst_addr: '0xeb888048De96a814617954C30f2Ec176EBf34F86',
  pmt_purchase_addr: '0x61ABC490543842E151C82633399e0ffb3C6B37B9',
  minter_collection: '0x3A17ADd06C53A2e9a100211A93d18E6432Bb5bB4',
  nfts_marketplace_addr: '0x9576d7b31e1F4F0e8020f4D05Eed595798E0859e',
  swap_addr: '0x5C84f9D0cCB9360dc4064e95fF8447FE81E3fEd6',

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
