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

const isNonZeroAmountInvoice = (address, network = 'prod') => {
  if (!hasValidPrefix(address, network, invoiceOptions)) return false
  try {
    const amount = _.toNumber(bolt11.decode(address).millisatoshis)
    return amount !== 0
  } catch (e) {
    return false
  }
}

// urlParam Invoice format: bitcoin:bc1(...)?amount=0.00035&lightning=lnbc(...)
const getUrlParamInvoice = (address, network = 'prod') => {
  const urlElements = _.split('?', address);

  // not url param
  if(_.size(urlElements) !== 2) return null

  const lnElements = _.split('&', urlElements[1])
  const parameters = _.fromPairs(_.map((parameter) => _.split('=', parameter) , lnElements))
  return parameters.lightning
}

module.exports = { isValidAddress, isNonZeroAmountInvoice, getUrlParamInvoice }