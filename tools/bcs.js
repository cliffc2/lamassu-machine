const bcs = require('../lib/scanner-genmega')
const { argv } = require('node:process');
const device = argv[2]
bcs.config({ scanner: { device } })
bcs.scanQR((res, err) => {
  if (res) process.exit(0)
  process.exit(1)
})
