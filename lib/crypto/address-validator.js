const addressValidator = require('multicoin-address-validator')
const lnValidator = require('./ln-validator')

const isValidAddress = (address, cryptoCode, network = 'prod') => {
  if (cryptoCode === 'LN') return lnValidator.isValidAddress(address, cryptoCode, network)
  try {
    return addressValidator.validate(address, cryptoCode, network)
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = { isValidAddress }