'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const typeorm_1 = require('typeorm')
const crypto_1 = require('crypto')
const BufferCompatibility = array => {
  if (Buffer.from) {
    return Buffer.from(array)
  } else {
    return new Buffer(array)
  }
}
function convertCryptKey (strKey) {
  const newKey = BufferCompatibility([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ])
  strKey = BufferCompatibility(strKey)
  for (let i = 0; i < strKey.length; i++) newKey[i % 16] ^= strKey[i]
  return newKey
}
const _encrypt = (str, key) => {
  try {
    const c = crypto_1.createCipheriv('aes-128-ecb', convertCryptKey(key), '')
    let ret = ''
    ret += c.update(str, 'utf8', 'hex')
    ret += c.final('hex')
    return ret.toUpperCase()
  } catch (err) {
    return str
  }
}
const _decrypt = (str, key) => {
  try {
    const d = crypto_1.createDecipheriv('aes-128-ecb', convertCryptKey(key), '')
    let ret = ''
    ret += d.update(str, 'hex', 'utf8')
    ret += d.final('utf8')
    return ret
  } catch (err) {
    return str
  }
}
function encrypt (entity) {
  for (let columnMetadata of typeorm_1.getMetadataArgsStorage().columns) {
    let { propertyName, mode, target } = columnMetadata
    let options = columnMetadata.options
    let encrypt = options.encryptKey
    if (encrypt && mode === 'regular' && entity.constructor === target) {
      if (entity[propertyName]) {
        entity[propertyName] = _encrypt(
          entity[propertyName],
          encrypt + (options.name || propertyName)
        )
      }
    }
  }
  return entity
}
exports.encrypt = encrypt
function decrypt (entity) {
  for (let columnMetadata of typeorm_1.getMetadataArgsStorage().columns) {
    let { propertyName, mode, target } = columnMetadata
    let options = columnMetadata.options
    let encrypt = options.encryptKey
    if (encrypt && mode === 'regular' && entity.constructor === target) {
      if (entity[propertyName]) {
        entity[propertyName] = _decrypt(
          entity[propertyName],
          encrypt + (options.name || propertyName)
        )
      }
    }
  }
  return entity
}
exports.decrypt = decrypt

//# sourceMappingURL=index.js.map
