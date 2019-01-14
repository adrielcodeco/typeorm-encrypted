import { ObjectLiteral, getMetadataArgsStorage } from 'typeorm'
import { createCipheriv, createDecipheriv } from 'crypto'
import { ExtendedColumnOptions } from '../options'

const BufferCompatibility = (array: any[]) => {
  if (Buffer.from) {
    return Buffer.from(array)
  } else {
    // tslint:disable-next-line: deprecation
    return new Buffer(array)
  }
}

function convertCryptKey (strKey: any) {
  const newKey: any = BufferCompatibility([
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

const _encrypt = (str: string, key: string) => {
  try {
    const c = createCipheriv('aes-128-ecb', convertCryptKey(key), '')
    let ret = ''
    ret += c.update(str, 'utf8', 'hex')
    ret += c.final('hex')
    return ret.toUpperCase()
  } catch (err) {
    return str
  }
}

const _decrypt = (str: string, key: string) => {
  try {
    const d = createDecipheriv('aes-128-ecb', convertCryptKey(key), '')
    let ret = ''
    ret += d.update(str, 'hex', 'utf8')
    ret += d.final('utf8')
    return ret
  } catch (err) {
    return str
  }
}

function parseGuid (guid: string): string {
  if (!guid || guid.length !== 32) return guid + ''
  guid += ''
  return (
    guid.substring(0, 8) +
    '-' +
    guid.substring(8, 12) +
    '-' +
    guid.substring(12, 16) +
    '-' +
    guid.substring(16, 20) +
    '-' +
    guid.substring(20, 32)
  ).toUpperCase()
}

/**
 * Encrypt fields on entity.
 */
export function encrypt<T extends ObjectLiteral> (entity: T): T {
  for (let columnMetadata of getMetadataArgsStorage().columns) {
    let { propertyName, mode, target } = columnMetadata
    let options: ExtendedColumnOptions = columnMetadata.options
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

/**
 * Decrypt fields on entity.
 */
export function decrypt<T extends ObjectLiteral> (entity: T): T {
  for (let columnMetadata of getMetadataArgsStorage().columns) {
    let { propertyName, mode, target } = columnMetadata
    let options: ExtendedColumnOptions = columnMetadata.options
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

export function tokenize<T extends ObjectLiteral> (entity: T): T {
  for (let columnMetadata of getMetadataArgsStorage().columns) {
    let { propertyName, mode, target } = columnMetadata
    let options: ExtendedColumnOptions = columnMetadata.options
    let tokenize = options.tokenize
    if (tokenize && mode === 'regular' && entity.constructor === target) {
      if (entity[propertyName]) {
        entity[propertyName] = entity[propertyName].replace(/-/g, '')
      }
    }
  }
  return entity
}

export function untokenize<T extends ObjectLiteral> (entity: T): T {
  for (let columnMetadata of getMetadataArgsStorage().columns) {
    let { propertyName, mode, target } = columnMetadata
    let options: ExtendedColumnOptions = columnMetadata.options
    let tokenize = options.tokenize
    if (tokenize && mode === 'regular' && entity.constructor === target) {
      if (entity[propertyName]) {
        entity[propertyName] = parseGuid(
          entity[propertyName]
        )
      }
    }
  }
  return entity
}
