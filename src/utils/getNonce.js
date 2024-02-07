import { v4 as uuidv4 } from 'uuid'

export function generateNonce() {
  const uuidValue = uuidv4()
  // //console.log('uuidValue', uuidValue)
  // Remove hyphens from the UUID value and convert to lowercase
  const uuidWithoutHyphens = uuidValue.replace(/-/g, '').toLowerCase()
  // Generate 4 random bytes and convert to hexadecimal
  const randomBytes = new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  // Combine the UUID without hyphens and the random bytes to form the nonce
  const nonce = uuidWithoutHyphens + randomBytes
  return nonce
}
