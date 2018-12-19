import { ColumnOptions } from 'typeorm'

export interface ExtendedColumnOptions extends ColumnOptions {
  encryptKey?: string
}
