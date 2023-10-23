import { ethers } from 'ethers'
import { config } from '@/const/config'

provider = new ethers.BrowserProvider(window.ethereum)
signer = await provider.getSigner()
const GAME = new ethers.Contract(config.game_abi, config.erc20_abi, provider)
const GAMETRADE = new ethers.Contract(config.game_abi, config.erc20_abi, signer)
