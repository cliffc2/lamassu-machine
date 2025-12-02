const _ = require('lodash/fp')
const state = {
  coinConfigs: {}
}

const getCoinConfigs = () => state.coinConfigs
const setCoinConfigs = value => state.coinConfigs = value

const getCoinConfig = cryptoCode => {
  const coinConfig = getCoinConfigs()?.[cryptoCode]
  if (!coinConfig) throw new Error(`No config found for ${cryptoCode}`)
  return coinConfig
}

const getZeroConf = (cryptoCode) => getCoinConfig(cryptoCode).zeroConf ?? false

const getUnitScale = (cryptoCode) => {
  const coinConfig = getCoinConfig(cryptoCode)
  if (!_.isNumber(coinConfig.unitScale)) throw new Error(`unitScale is not a number for ${cryptoCode}`)

  return coinConfig.unitScale
}

const getDepositUrl = (cryptoCode, address, amount) => {
  const { urlPrefix, urlAmount } = getCoinConfig(cryptoCode)

  return _.flow(
    url => urlPrefix ? `${urlPrefix}:${url}` : url,
    url => urlAmount ? `${url}?${urlAmount}=${amount}` : url
  )(address)
}

module.exports = {
  setCoinConfigs,
  getCoinConfigs,
  getCoinConfig,
  getUnitScale,
  getZeroConf,
  getDepositUrl,
}
