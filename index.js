const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPOTS_PER_SOL
} = require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = new PublicKey(wallet._keypair.secretKey)

console.log(publicKey)
console.log(secretKey)