const _ = require('lodash/fp')
const { bech32 } = require('bech32')
const bolt11 = require('bolt11')

const lnurlOptions = {
  prod: 'lnurl',
  test: 'lntb'
}

const invoiceOptions = {
  prod: 'lnbc',
  test: 'lntb'
}

const hasValidPrefix = (address, network, opts) => {
  return address.toLowerCase().startsWith(opts[network])
}

const isValidAddress = (address, cryptoCode, network) => {
  const isInvoice = hasValidPrefix(address, network, invoiceOptions)
  const isLnurl = hasValidPrefix(address, network, lnurlOptions)

  try {
    isInvoice ? bolt11.decode(address) : bech32.decode(address, Number.MAX_SAFE_INTEGER)
  } catch (error) {
    return false
  }

  return isInvoice || isLnurl
}

const isNonZeroAmountInvoice = (address, cryptoCode, network = 'prod') => {
  if (cryptoCode !== 'LN') return false
  if (!hasValidPrefix(address, network, invoiceOptions)) return false
  try {
    const amount = _.toNumber(bolt11.decode(address).millisatoshis)
    return amount !== 0
  } catch (e) {
    return false
  }
}

module.exports = { isValidAddress, isNonZeroAmountInvoice }