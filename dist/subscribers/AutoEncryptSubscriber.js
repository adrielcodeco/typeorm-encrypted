'use strict'
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length

    var r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc

    var d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') { r = Reflect.decorate(decorators, target, key, desc) } else {
      for (var i = decorators.length - 1; i >= 0; i--) {
        if ((d = decorators[i])) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r }
      }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
Object.defineProperty(exports, '__esModule', { value: true })
const typeorm_1 = require('typeorm')
const transformers_1 = require('../transformers')
let AutoEncryptSubscriber = class AutoEncryptSubscriber {
  beforeInsert (event) {
    transformers_1.encrypt(event.entity)
  }
  beforeUpdate (event) {
    transformers_1.encrypt(event.entity)
  }
  afterLoad (entity) {
    transformers_1.decrypt(entity)
  }
}
AutoEncryptSubscriber = __decorate(
  [typeorm_1.EventSubscriber()],
  AutoEncryptSubscriber
)
exports.AutoEncryptSubscriber = AutoEncryptSubscriber

//# sourceMappingURL=AutoEncryptSubscriber.js.map
