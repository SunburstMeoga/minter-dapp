import erc20_abi from './erc20.json'
import erc721_abi from './erc721.json'
import game_abi from './game.json'

const config = {
  erc20: erc20_abi,
  erc721: erc721_abi,
  game_abi: game_abi,
  service_addr: '0x268888cDad74F5a17853A7846497c0d97EAF84a1',
  musdt_addr: '0xAFABd8F48a485332Bb918a8848863bA34b80e602',
  bt_addr: '0x2d56b9C7d0d42a256272B5Cad83ae2373930D524',
  mt_addr: '0x2E3080b1472F4D062cB85FB9e53864E5c1D923A0',
  pmt_addr: '0x722C5f53cA140AeBA4E81daAacECa31c954DaC44',
  rt_addr: '0x76AbF68C406E7Bc11052A72a9270338c170a5Ae7',
  nft_addr: '0xe511f79e1cE1a268B56d5211D7861BD7D1af94b4',
  game_addr: '0xD494941a62CEC601E58D5fB26ce3D4eC23424b5c',
  rpc: 'https://rpc-testnet.hashahead.org',
  api: 'https://app.dexduel.com/api'
}

export { config }
