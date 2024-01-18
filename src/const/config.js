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
  pmt_addr: '0x43fE101C7C96D62013a33947A1d53e9c65F4AB06',
  mt_addr: '0xD132c6489FC0e42013F4ca71C5F65DA9B9f911cE',
  mst_addr: '0xd9D2c0f9C5A20D85a222309fe42D1817344fa6b2',
  pmt_purchase_addr: '0xFf556936a04D7D025f0B64Fb9CBD07E4C904f077',
  nfts_marketplace_addr: '0x8780cF78051745B6AD664B6234bdD0C5859a2b4D',
  swap_addr: '0x05B220D7076De5EAdfa589e9D4d9D542465DD130',
  minter_collection: '0xF50f28dd68D8a2f65b78F2DCD40be19214145551',

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
