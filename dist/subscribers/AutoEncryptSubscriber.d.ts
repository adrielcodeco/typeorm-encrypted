import { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
export declare class AutoEncryptSubscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<any>): void;
    beforeUpdate(event: UpdateEvent<any>): void;
    afterLoad(entity: any): void;
}
//# sourceMappingURL=AutoEncryptSubscriber.d.ts.map