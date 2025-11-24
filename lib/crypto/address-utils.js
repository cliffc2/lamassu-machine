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

const formatAddress = (address = '') => {
  if (address.includes(':')) return address.split(':')[1]

  return address
}

module.exports = { isValidAddress, formatAddress }