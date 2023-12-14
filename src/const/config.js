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

const config = {
  USDToken_addr: '0x53Ffa33162b1E3dd5FeE57531a6708b85266F7e0',
  pmt_addr: '0x21ABCeF1c903C9C05001F47BAFe99779A305E35B',
  mt_addr: '0x8Bc3C6944702E9e0FfA97cEB87FD01C7b2459889',
  mst_addr: '0x2D31C2AD61c7342a94eae6BBAC830819710C8425',
  pmt_purchase_addr: '0x830dE6a1d11dC9314BD59930F505Cf941Cbf1Be0',
  nfts_collection_addr: '0x3848027E5728Fd927791c065b68684e2EBf4fc2a',
  nfts_marketplace_addr: '0xc96a9f947046B8C1fE762434A44F03F10552B51d',
  swap_addr: '0x43a9DAE27950B940C1C43B34D6700936dcBcB1Bc',
  minter_collection: '0xD24544a9EE84493250d3AFbc39414b785A5f570a',

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
