import { DbService, Migration } from '..';
export declare class InitialMigration extends Migration {
    constructor();
    apply(dbService: DbService): Promise<undefined>;
    queries(): Array<string>;
}
