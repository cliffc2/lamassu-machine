const _ = require('lodash/fp')
const state = {
  coinConfigs: {}
}

const getCoinConfigs = () => state.coinConfigs
const setCoinConfigs = value => state.coinConfigs = value

const getUnitScale = (cryptoCode) => {
  const coinConfig = getCoinConfigs()?.[cryptoCode]
  if (!coinConfig) throw new Error(`No config found for ${cryptoCode}`)
  if (!_.isNumber(coinConfig.unitScale)) throw new Error(`unitScale is not a number for ${cryptoCode}`)

  return coinConfig.unitScale
}

module.exports = {
  setCoinConfigs,
  getCoinConfigs,
  getUnitScale
}
