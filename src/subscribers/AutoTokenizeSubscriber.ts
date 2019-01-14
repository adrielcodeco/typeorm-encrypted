import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { tokenize, untokenize } from '../transformers'

@EventSubscriber()
export class AutoTokenizeSubscriber implements EntitySubscriberInterface {
  /**
   * Encrypt before insertion.
   */
  beforeInsert (event: InsertEvent<any>): void {
    tokenize(event.entity)
  }

  /**
   * Encrypt before update.
   */
  beforeUpdate (event: UpdateEvent<any>): void {
    tokenize(event.entity)
  }

  /**
   * Decrypt after find.
   */
  afterLoad (entity: any): void {
    untokenize(entity)
  }
}
