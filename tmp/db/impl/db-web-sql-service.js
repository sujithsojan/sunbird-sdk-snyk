"use strict";
// import {DbConfig, DbService, DeleteQuery, InsertQuery, Migration, ReadQuery, UpdateQuery} from '..';
// import {Observable, Subject} from 'rxjs';
// import {InitialMigration} from '../migrations/initial-migration';
// import {injectable, inject} from 'inversify';
// import {SdkConfig} from '../../sdk-config';
// import {InjectionTokens} from '../../injection-tokens';
//
// @injectable()
// export class DbWebSqlService implements DbService {
//
//     private context: DbConfig;
//     webSqlDB: any;
//
//     constructor(@inject(InjectionTokens.SDK_CONFIG) private sdkConfig: SdkConfig,
//                 @inject(InjectionTokens.DB_VERSION) private dBVersion: number,
//                 @inject(InjectionTokens.DB_MIGRATION_LIST) private appMigrationList: Migration[],
//     ) {
//         this.context = this.sdkConfig.dbConfig;
//     }
//
//     public async init(): Promise<undefined> {
//         return new Promise<undefined>(((resolve) => {
//             this.webSqlDB = window.openDatabase(
//                 this.context.dbName,
//                 '',
//                 'Genie web sql DB',
//                 2 * 1024 * 1024,
//                 async (database) => {
//                     await this.onCreate();
//                     resolve();
//                 });
//
//             this.hasInitialized().subscribe(() => {
//                 resolve();
//             });
//         }));
//     }
//
//     read(readQuery: ReadQuery): Observable<any[]> {
//         return Observable.fromPromise(new Promise(async (resolve, reject) => {
//             const squel = await import('squel');
//
//             const attachFields = (mixin, fields: string[] = []) => {
//                 fields.forEach((field) => {
//                     mixin.field(field);
//                 });
//
//                 return mixin;
//             };
//
//             const query = squel.select({
//                 autoQuoteFieldNames: false
//             }).from(readQuery.table);
//
//             attachFields(query, readQuery.columns);
//
//             if (readQuery.groupBy) {
//                 query.group(readQuery.groupBy);
//             }
//
//             if (readQuery.having) {
//                 query.having(readQuery.having);
//             }
//             if (readQuery.distinct) {
//                 query.distinct();
//             }
//             if (readQuery.orderBy) {
//                 query.order(readQuery.orderBy);
//             }
//             if (readQuery.limit) {
//                 query.limit(parseInt(readQuery.limit, 10));
//             }
//             if (readQuery.selection && readQuery.selectionArgs) {
//                 query.where(readQuery.selection, ...readQuery.selectionArgs);
//             }
//
//             console.log(query.toString());
//
//             this.webSqlDB.transaction((tx) => {
//                 tx.executeSql(query.toParam().text, query.toParam().values, (sqlTransaction, sqlResultSet: SQLResultSet) => {
//                     resolve(Array.from(sqlResultSet.rows));
//                 }, (sqlTransaction, sqlError) => {
//                     reject(sqlError);
//                 });
//             });
//         }));
//     }
//
//     insert(inserQuery: InsertQuery): Observable<number> {
//         return Observable.fromPromise(new Promise(async (resolve, reject) => {
//             const squel = await import('squel');
//
//             const query = squel.insert()
//               .into(inserQuery.table)
//               .setFields(inserQuery.modelJson);
//
//             console.log(query.toString());
//
//             this.webSqlDB.transaction((tx) => {
//                 tx.executeSql(query.toParam().text, query.toParam().values, (sqlTransaction, sqlResultSet: SQLResultSet) => {
//                     resolve(sqlResultSet.rowsAffected);
//                 }, (sqlTransaction, sqlError) => {
//                     reject(sqlError);
//                 });
//             });
//         }));
//     }
//
//     execute(query: string): Observable<any> {
//         const observable = new Subject<any>();
//
//         console.log(query);
//
//         this.webSqlDB.transaction((tx) => {
//             tx.executeSql(query,
//                 [], (sqlTransaction, sqlResultSet) => {
//                     observable.next(Array.from(sqlResultSet.rows));
//                     observable.complete();
//                 }, (sqlTransaction, sqlError) => {
//                     observable.error(sqlError);
//                 });
//         });
//
//         return observable;
//     }
//
//     update(updateQuery: UpdateQuery): Observable<number> {
//         return Observable.fromPromise(new Promise(async (resolve, reject) => {
//             const squel = await import('squel');
//
//             const query = squel.update()
//               .table(updateQuery.table);
//
//             if (updateQuery.selection && updateQuery.selectionArgs) {
//                 query.where(updateQuery.selection, ...updateQuery.selectionArgs);
//             }
//
//             const setFields = (mixin, fields: { [key: string]: any }) => {
//                 Object.keys(fields).forEach((field) => {
//                     query.set(field, fields[field]);
//                 });
//             };
//
//             setFields(query, updateQuery.modelJson);
//
//             console.log(query.toString());
//
//             this.webSqlDB.transaction((tx) => {
//                 tx.executeSql(query.toParam().text, query.toParam().values, (sqlTransaction, sqlResultSet: SQLResultSet) => {
//                     resolve(sqlResultSet.rowsAffected);
//                 }, (sqlTransaction, sqlError) => {
//                     reject(sqlError);
//                 });
//             });
//         }));
//     }
//
//     delete(deleteQuery: DeleteQuery): Observable<undefined> {
//         return Observable.fromPromise(new Promise(async (resolve, reject) => {
//             const squel = await import('squel');
//
//             const query = squel.delete()
//               .from(deleteQuery.table)
//               .where(deleteQuery.selection, ...deleteQuery.selectionArgs);
//
//             console.log(query.toString());
//
//             this.webSqlDB.transaction((tx) => {
//                 tx.executeSql(query.toParam().text, query.toParam().values, (sqlTransaction, sqlResultSet: SQLResultSet) => {
//                     resolve(undefined);
//                 }, (sqlTransaction, sqlError) => {
//                     reject(sqlError);
//                 });
//             });
//         }));
//     }
//
//     beginTransaction(): void {
//         // TODO
//     }
//
//     endTransaction(isOperationSuccessful: boolean): void {
//         // TODO
//     }
//
//     private hasInitialized(): Observable<undefined> {
//         return this.execute('DROP TABLE IF EXISTS dummy_init_table');
//     }
//
//     private async onCreate() {
//         return new InitialMigration().apply(this);
//     }
//
//     copyDatabase(): Observable<boolean> {
//         throw new Error('Not implemented');
//     }
//
//     open(dbFilePath: string): Promise<undefined> {
//         throw new Error('Not implemented');
//     }
//
//
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItd2ViLXNxbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL2ltcGwvZGItd2ViLXNxbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1R0FBdUc7QUFDdkcsNENBQTRDO0FBQzVDLG9FQUFvRTtBQUNwRSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLDBEQUEwRDtBQUMxRCxFQUFFO0FBQ0YsZ0JBQWdCO0FBQ2hCLHNEQUFzRDtBQUN0RCxFQUFFO0FBQ0YsaUNBQWlDO0FBQ2pDLHFCQUFxQjtBQUNyQixFQUFFO0FBQ0Ysb0ZBQW9GO0FBQ3BGLGlGQUFpRjtBQUNqRixvR0FBb0c7QUFDcEcsVUFBVTtBQUNWLGtEQUFrRDtBQUNsRCxRQUFRO0FBQ1IsRUFBRTtBQUNGLGdEQUFnRDtBQUNoRCx3REFBd0Q7QUFDeEQsbURBQW1EO0FBQ25ELHVDQUF1QztBQUN2QyxzQkFBc0I7QUFDdEIsc0NBQXNDO0FBQ3RDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsNkNBQTZDO0FBQzdDLGlDQUFpQztBQUNqQyxzQkFBc0I7QUFDdEIsRUFBRTtBQUNGLHNEQUFzRDtBQUN0RCw2QkFBNkI7QUFDN0Isa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZixRQUFRO0FBQ1IsRUFBRTtBQUNGLHNEQUFzRDtBQUN0RCxpRkFBaUY7QUFDakYsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix1RUFBdUU7QUFDdkUsOENBQThDO0FBQzlDLDBDQUEwQztBQUMxQyxzQkFBc0I7QUFDdEIsRUFBRTtBQUNGLGdDQUFnQztBQUNoQyxpQkFBaUI7QUFDakIsRUFBRTtBQUNGLDJDQUEyQztBQUMzQyw2Q0FBNkM7QUFDN0Msd0NBQXdDO0FBQ3hDLEVBQUU7QUFDRixzREFBc0Q7QUFDdEQsRUFBRTtBQUNGLHVDQUF1QztBQUN2QyxrREFBa0Q7QUFDbEQsZ0JBQWdCO0FBQ2hCLEVBQUU7QUFDRixzQ0FBc0M7QUFDdEMsa0RBQWtEO0FBQ2xELGdCQUFnQjtBQUNoQix3Q0FBd0M7QUFDeEMsb0NBQW9DO0FBQ3BDLGdCQUFnQjtBQUNoQix1Q0FBdUM7QUFDdkMsa0RBQWtEO0FBQ2xELGdCQUFnQjtBQUNoQixxQ0FBcUM7QUFDckMsOERBQThEO0FBQzlELGdCQUFnQjtBQUNoQixvRUFBb0U7QUFDcEUsZ0ZBQWdGO0FBQ2hGLGdCQUFnQjtBQUNoQixFQUFFO0FBQ0YsNkNBQTZDO0FBQzdDLEVBQUU7QUFDRixrREFBa0Q7QUFDbEQsZ0lBQWdJO0FBQ2hJLDhEQUE4RDtBQUM5RCxxREFBcUQ7QUFDckQsd0NBQXdDO0FBQ3hDLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsZUFBZTtBQUNmLFFBQVE7QUFDUixFQUFFO0FBQ0YsNERBQTREO0FBQzVELGlGQUFpRjtBQUNqRixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLDJDQUEyQztBQUMzQyx3Q0FBd0M7QUFDeEMsa0RBQWtEO0FBQ2xELEVBQUU7QUFDRiw2Q0FBNkM7QUFDN0MsRUFBRTtBQUNGLGtEQUFrRDtBQUNsRCxnSUFBZ0k7QUFDaEksMERBQTBEO0FBQzFELHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFDeEMsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2YsUUFBUTtBQUNSLEVBQUU7QUFDRixnREFBZ0Q7QUFDaEQsaURBQWlEO0FBQ2pELEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsRUFBRTtBQUNGLDhDQUE4QztBQUM5QyxtQ0FBbUM7QUFDbkMsMERBQTBEO0FBQzFELHNFQUFzRTtBQUN0RSw2Q0FBNkM7QUFDN0MscURBQXFEO0FBQ3JELGtEQUFrRDtBQUNsRCxzQkFBc0I7QUFDdEIsY0FBYztBQUNkLEVBQUU7QUFDRiw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSLEVBQUU7QUFDRiw2REFBNkQ7QUFDN0QsaUZBQWlGO0FBQ2pGLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0YsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQyxFQUFFO0FBQ0Ysd0VBQXdFO0FBQ3hFLG9GQUFvRjtBQUNwRixnQkFBZ0I7QUFDaEIsRUFBRTtBQUNGLDZFQUE2RTtBQUM3RSwyREFBMkQ7QUFDM0QsdURBQXVEO0FBQ3ZELHNCQUFzQjtBQUN0QixpQkFBaUI7QUFDakIsRUFBRTtBQUNGLHVEQUF1RDtBQUN2RCxFQUFFO0FBQ0YsNkNBQTZDO0FBQzdDLEVBQUU7QUFDRixrREFBa0Q7QUFDbEQsZ0lBQWdJO0FBQ2hJLDBEQUEwRDtBQUMxRCxxREFBcUQ7QUFDckQsd0NBQXdDO0FBQ3hDLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsZUFBZTtBQUNmLFFBQVE7QUFDUixFQUFFO0FBQ0YsZ0VBQWdFO0FBQ2hFLGlGQUFpRjtBQUNqRixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMsNkVBQTZFO0FBQzdFLEVBQUU7QUFDRiw2Q0FBNkM7QUFDN0MsRUFBRTtBQUNGLGtEQUFrRDtBQUNsRCxnSUFBZ0k7QUFDaEksMENBQTBDO0FBQzFDLHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFDeEMsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2YsUUFBUTtBQUNSLEVBQUU7QUFDRixpQ0FBaUM7QUFDakMsa0JBQWtCO0FBQ2xCLFFBQVE7QUFDUixFQUFFO0FBQ0YsNkRBQTZEO0FBQzdELGtCQUFrQjtBQUNsQixRQUFRO0FBQ1IsRUFBRTtBQUNGLHdEQUF3RDtBQUN4RCx3RUFBd0U7QUFDeEUsUUFBUTtBQUNSLEVBQUU7QUFDRixpQ0FBaUM7QUFDakMscURBQXFEO0FBQ3JELFFBQVE7QUFDUixFQUFFO0FBQ0YsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxRQUFRO0FBQ1IsRUFBRTtBQUNGLHFEQUFxRDtBQUNyRCw4Q0FBOEM7QUFDOUMsUUFBUTtBQUNSLEVBQUU7QUFDRixFQUFFO0FBQ0YsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7RGJDb25maWcsIERiU2VydmljZSwgRGVsZXRlUXVlcnksIEluc2VydFF1ZXJ5LCBNaWdyYXRpb24sIFJlYWRRdWVyeSwgVXBkYXRlUXVlcnl9IGZyb20gJy4uJztcbi8vIGltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG4vLyBpbXBvcnQge0luaXRpYWxNaWdyYXRpb259IGZyb20gJy4uL21pZ3JhdGlvbnMvaW5pdGlhbC1taWdyYXRpb24nO1xuLy8gaW1wb3J0IHtpbmplY3RhYmxlLCBpbmplY3R9IGZyb20gJ2ludmVyc2lmeSc7XG4vLyBpbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG4vLyBpbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG4vL1xuLy8gQGluamVjdGFibGUoKVxuLy8gZXhwb3J0IGNsYXNzIERiV2ViU3FsU2VydmljZSBpbXBsZW1lbnRzIERiU2VydmljZSB7XG4vL1xuLy8gICAgIHByaXZhdGUgY29udGV4dDogRGJDb25maWc7XG4vLyAgICAgd2ViU3FsREI6IGFueTtcbi8vXG4vLyAgICAgY29uc3RydWN0b3IoQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbi8vICAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9WRVJTSU9OKSBwcml2YXRlIGRCVmVyc2lvbjogbnVtYmVyLFxuLy8gICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX01JR1JBVElPTl9MSVNUKSBwcml2YXRlIGFwcE1pZ3JhdGlvbkxpc3Q6IE1pZ3JhdGlvbltdLFxuLy8gICAgICkge1xuLy8gICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLnNka0NvbmZpZy5kYkNvbmZpZztcbi8vICAgICB9XG4vL1xuLy8gICAgIHB1YmxpYyBhc3luYyBpbml0KCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4vLyAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCgocmVzb2x2ZSkgPT4ge1xuLy8gICAgICAgICAgICAgdGhpcy53ZWJTcWxEQiA9IHdpbmRvdy5vcGVuRGF0YWJhc2UoXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRiTmFtZSxcbi8vICAgICAgICAgICAgICAgICAnJyxcbi8vICAgICAgICAgICAgICAgICAnR2VuaWUgd2ViIHNxbCBEQicsXG4vLyAgICAgICAgICAgICAgICAgMiAqIDEwMjQgKiAxMDI0LFxuLy8gICAgICAgICAgICAgICAgIGFzeW5jIChkYXRhYmFzZSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm9uQ3JlYXRlKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICB0aGlzLmhhc0luaXRpYWxpemVkKCkuc3Vic2NyaWJlKCgpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSkpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgcmVhZChyZWFkUXVlcnk6IFJlYWRRdWVyeSk6IE9ic2VydmFibGU8YW55W10+IHtcbi8vICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UobmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3Qgc3F1ZWwgPSBhd2FpdCBpbXBvcnQoJ3NxdWVsJyk7XG4vL1xuLy8gICAgICAgICAgICAgY29uc3QgYXR0YWNoRmllbGRzID0gKG1peGluLCBmaWVsZHM6IHN0cmluZ1tdID0gW10pID0+IHtcbi8vICAgICAgICAgICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgbWl4aW4uZmllbGQoZmllbGQpO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbWl4aW47XG4vLyAgICAgICAgICAgICB9O1xuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gc3F1ZWwuc2VsZWN0KHtcbi8vICAgICAgICAgICAgICAgICBhdXRvUXVvdGVGaWVsZE5hbWVzOiBmYWxzZVxuLy8gICAgICAgICAgICAgfSkuZnJvbShyZWFkUXVlcnkudGFibGUpO1xuLy9cbi8vICAgICAgICAgICAgIGF0dGFjaEZpZWxkcyhxdWVyeSwgcmVhZFF1ZXJ5LmNvbHVtbnMpO1xuLy9cbi8vICAgICAgICAgICAgIGlmIChyZWFkUXVlcnkuZ3JvdXBCeSkge1xuLy8gICAgICAgICAgICAgICAgIHF1ZXJ5Lmdyb3VwKHJlYWRRdWVyeS5ncm91cEJ5KTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBpZiAocmVhZFF1ZXJ5LmhhdmluZykge1xuLy8gICAgICAgICAgICAgICAgIHF1ZXJ5LmhhdmluZyhyZWFkUXVlcnkuaGF2aW5nKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGlmIChyZWFkUXVlcnkuZGlzdGluY3QpIHtcbi8vICAgICAgICAgICAgICAgICBxdWVyeS5kaXN0aW5jdCgpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgaWYgKHJlYWRRdWVyeS5vcmRlckJ5KSB7XG4vLyAgICAgICAgICAgICAgICAgcXVlcnkub3JkZXIocmVhZFF1ZXJ5Lm9yZGVyQnkpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgaWYgKHJlYWRRdWVyeS5saW1pdCkge1xuLy8gICAgICAgICAgICAgICAgIHF1ZXJ5LmxpbWl0KHBhcnNlSW50KHJlYWRRdWVyeS5saW1pdCwgMTApKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGlmIChyZWFkUXVlcnkuc2VsZWN0aW9uICYmIHJlYWRRdWVyeS5zZWxlY3Rpb25BcmdzKSB7XG4vLyAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmUocmVhZFF1ZXJ5LnNlbGVjdGlvbiwgLi4ucmVhZFF1ZXJ5LnNlbGVjdGlvbkFyZ3MpO1xuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5LnRvU3RyaW5nKCkpO1xuLy9cbi8vICAgICAgICAgICAgIHRoaXMud2ViU3FsREIudHJhbnNhY3Rpb24oKHR4KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgdHguZXhlY3V0ZVNxbChxdWVyeS50b1BhcmFtKCkudGV4dCwgcXVlcnkudG9QYXJhbSgpLnZhbHVlcywgKHNxbFRyYW5zYWN0aW9uLCBzcWxSZXN1bHRTZXQ6IFNRTFJlc3VsdFNldCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEFycmF5LmZyb20oc3FsUmVzdWx0U2V0LnJvd3MpKTtcbi8vICAgICAgICAgICAgICAgICB9LCAoc3FsVHJhbnNhY3Rpb24sIHNxbEVycm9yKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzcWxFcnJvcik7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSkpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgaW5zZXJ0KGluc2VyUXVlcnk6IEluc2VydFF1ZXJ5KTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbi8vICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UobmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3Qgc3F1ZWwgPSBhd2FpdCBpbXBvcnQoJ3NxdWVsJyk7XG4vL1xuLy8gICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBzcXVlbC5pbnNlcnQoKVxuLy8gICAgICAgICAgICAgICAuaW50byhpbnNlclF1ZXJ5LnRhYmxlKVxuLy8gICAgICAgICAgICAgICAuc2V0RmllbGRzKGluc2VyUXVlcnkubW9kZWxKc29uKTtcbi8vXG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhxdWVyeS50b1N0cmluZygpKTtcbi8vXG4vLyAgICAgICAgICAgICB0aGlzLndlYlNxbERCLnRyYW5zYWN0aW9uKCh0eCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHR4LmV4ZWN1dGVTcWwocXVlcnkudG9QYXJhbSgpLnRleHQsIHF1ZXJ5LnRvUGFyYW0oKS52YWx1ZXMsIChzcWxUcmFuc2FjdGlvbiwgc3FsUmVzdWx0U2V0OiBTUUxSZXN1bHRTZXQpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzcWxSZXN1bHRTZXQucm93c0FmZmVjdGVkKTtcbi8vICAgICAgICAgICAgICAgICB9LCAoc3FsVHJhbnNhY3Rpb24sIHNxbEVycm9yKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzcWxFcnJvcik7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSkpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZXhlY3V0ZShxdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbi8vICAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbi8vXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5KTtcbi8vXG4vLyAgICAgICAgIHRoaXMud2ViU3FsREIudHJhbnNhY3Rpb24oKHR4KSA9PiB7XG4vLyAgICAgICAgICAgICB0eC5leGVjdXRlU3FsKHF1ZXJ5LFxuLy8gICAgICAgICAgICAgICAgIFtdLCAoc3FsVHJhbnNhY3Rpb24sIHNxbFJlc3VsdFNldCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLm5leHQoQXJyYXkuZnJvbShzcWxSZXN1bHRTZXQucm93cykpO1xuLy8gICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmNvbXBsZXRlKCk7XG4vLyAgICAgICAgICAgICAgICAgfSwgKHNxbFRyYW5zYWN0aW9uLCBzcWxFcnJvcikgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmVycm9yKHNxbEVycm9yKTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbi8vICAgICB9XG4vL1xuLy8gICAgIHVwZGF0ZSh1cGRhdGVRdWVyeTogVXBkYXRlUXVlcnkpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuLy8gICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZShuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBzcXVlbCA9IGF3YWl0IGltcG9ydCgnc3F1ZWwnKTtcbi8vXG4vLyAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNxdWVsLnVwZGF0ZSgpXG4vLyAgICAgICAgICAgICAgIC50YWJsZSh1cGRhdGVRdWVyeS50YWJsZSk7XG4vL1xuLy8gICAgICAgICAgICAgaWYgKHVwZGF0ZVF1ZXJ5LnNlbGVjdGlvbiAmJiB1cGRhdGVRdWVyeS5zZWxlY3Rpb25BcmdzKSB7XG4vLyAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmUodXBkYXRlUXVlcnkuc2VsZWN0aW9uLCAuLi51cGRhdGVRdWVyeS5zZWxlY3Rpb25BcmdzKTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBjb25zdCBzZXRGaWVsZHMgPSAobWl4aW4sIGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaCgoZmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgcXVlcnkuc2V0KGZpZWxkLCBmaWVsZHNbZmllbGRdKTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIH07XG4vL1xuLy8gICAgICAgICAgICAgc2V0RmllbGRzKHF1ZXJ5LCB1cGRhdGVRdWVyeS5tb2RlbEpzb24pO1xuLy9cbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5LnRvU3RyaW5nKCkpO1xuLy9cbi8vICAgICAgICAgICAgIHRoaXMud2ViU3FsREIudHJhbnNhY3Rpb24oKHR4KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgdHguZXhlY3V0ZVNxbChxdWVyeS50b1BhcmFtKCkudGV4dCwgcXVlcnkudG9QYXJhbSgpLnZhbHVlcywgKHNxbFRyYW5zYWN0aW9uLCBzcWxSZXN1bHRTZXQ6IFNRTFJlc3VsdFNldCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHNxbFJlc3VsdFNldC5yb3dzQWZmZWN0ZWQpO1xuLy8gICAgICAgICAgICAgICAgIH0sIChzcWxUcmFuc2FjdGlvbiwgc3FsRXJyb3IpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHNxbEVycm9yKTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9KSk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBkZWxldGUoZGVsZXRlUXVlcnk6IERlbGV0ZVF1ZXJ5KTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbi8vICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UobmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3Qgc3F1ZWwgPSBhd2FpdCBpbXBvcnQoJ3NxdWVsJyk7XG4vL1xuLy8gICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBzcXVlbC5kZWxldGUoKVxuLy8gICAgICAgICAgICAgICAuZnJvbShkZWxldGVRdWVyeS50YWJsZSlcbi8vICAgICAgICAgICAgICAgLndoZXJlKGRlbGV0ZVF1ZXJ5LnNlbGVjdGlvbiwgLi4uZGVsZXRlUXVlcnkuc2VsZWN0aW9uQXJncyk7XG4vL1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocXVlcnkudG9TdHJpbmcoKSk7XG4vL1xuLy8gICAgICAgICAgICAgdGhpcy53ZWJTcWxEQi50cmFuc2FjdGlvbigodHgpID0+IHtcbi8vICAgICAgICAgICAgICAgICB0eC5leGVjdXRlU3FsKHF1ZXJ5LnRvUGFyYW0oKS50ZXh0LCBxdWVyeS50b1BhcmFtKCkudmFsdWVzLCAoc3FsVHJhbnNhY3Rpb24sIHNxbFJlc3VsdFNldDogU1FMUmVzdWx0U2V0KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbi8vICAgICAgICAgICAgICAgICB9LCAoc3FsVHJhbnNhY3Rpb24sIHNxbEVycm9yKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzcWxFcnJvcik7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSkpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgYmVnaW5UcmFuc2FjdGlvbigpOiB2b2lkIHtcbi8vICAgICAgICAgLy8gVE9ET1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZW5kVHJhbnNhY3Rpb24oaXNPcGVyYXRpb25TdWNjZXNzZnVsOiBib29sZWFuKTogdm9pZCB7XG4vLyAgICAgICAgIC8vIFRPRE9cbi8vICAgICB9XG4vL1xuLy8gICAgIHByaXZhdGUgaGFzSW5pdGlhbGl6ZWQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgnRFJPUCBUQUJMRSBJRiBFWElTVFMgZHVtbXlfaW5pdF90YWJsZScpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgcHJpdmF0ZSBhc3luYyBvbkNyZWF0ZSgpIHtcbi8vICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWFsTWlncmF0aW9uKCkuYXBwbHkodGhpcyk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBjb3B5RGF0YWJhc2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4vLyAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBvcGVuKGRiRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4vLyAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4vLyAgICAgfVxuLy9cbi8vXG4vLyB9XG4iXX0=