const bitcoin = require('bitcoinjs-lib')
const ECPairFactory = require('ecpair')
const ecc = require('tiny-secp256k1')
const { Wallet } = require('ethers')

const createWallet = (cryptoCode) => {
  switch (cryptoCode) {
    case 'BTC':
      const ECPair = ECPairFactory.default(ecc);
      const keyPair = ECPair.makeRandom();
      const segwitAddr = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })

      return {
        publicAddress: segwitAddr.address,
        privateKey: keyPair.toWIF()
      }
    case 'ETH':
    case 'USDT':
    case 'USDC':
      const wallet = Wallet.createRandom()

      return {
        publicAddress: wallet.address,
        privateKey: wallet.privateKey
      }
    default:
      throw new Error(`Wallet generation not supported for ${cryptoCode}`)
  }
}

module.exports = { createWallet }