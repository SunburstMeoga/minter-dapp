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
  pmt_addr: '0xd21acBFE087E4b80fa77e1Dcef324bFD7485301A',
  mt_addr: '0x2986c3eBd1d9ae38CBe92b838b3dFC8E82d6c97D',
  mst_addr: '0xa39782FD9B5fCd7798E6645E72Bcd9b962D1A6d0',
  pmt_purchase_addr: '0xc46cDa67EC557A7D5c1a6b9D6353aD4C21E6cB39',
  nfts_marketplace_addr: '0xAC9a83A6831B8CF59B83F57ed9dafC99156fE1A3',
  swap_addr: '0x81B8DaFf7d57F7B1D49Dd65698142b2c6DC0B05D',
  minter_collection: '0xC1843b94e6FbB9B5177F9612acB81aC8c03124ff',

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

  api: 'http://13.228.135.184:8000/api',
  chainId: '1688288',
  rpcUrls: ['https://rpc-testnet.hashahead.org'],
  chainName: 'PGChain',
  blockExplorerUrls: ['https://scan.pgchain.org/']
}

export { config }
