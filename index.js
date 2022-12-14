const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async () => {
  try {
    //Creates connection Object;
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const walletBalance = await connection.getBalance(publicKey)
    console.log(`Wallet balance is ${walletBalance}`)
  } catch (err) {
    console.error(err)
  }
}

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  } catch (err) {
    console.log(err)
  }
}

const main = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

main()