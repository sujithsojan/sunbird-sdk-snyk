var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../../injection-tokens';
import { DbService } from '../../../db';
import { SearchHistoryEntry } from '../db/schema';
import { SearchHistoryDbEntryMapper } from '../util/search-history-db-entry-mapper';
import { map, mapTo, mergeMap } from 'rxjs/operators';
var SearchHistoryServiceImpl = /** @class */ (function () {
    function SearchHistoryServiceImpl(dbService, profileService) {
        this.dbService = dbService;
        this.profileService = profileService;
    }
    SearchHistoryServiceImpl_1 = SearchHistoryServiceImpl;
    SearchHistoryServiceImpl.prototype.addEntry = function (_a) {
        var _this = this;
        var query = _a.query, namespace = _a.namespace;
        return this.profileService.getActiveProfileSession()
            .pipe(mergeMap(function (_a) {
            var _b;
            var uid = _a.uid;
            return _this.dbService.insert({
                table: SearchHistoryEntry.TABLE_NAME,
                modelJson: (_b = {},
                    _b[SearchHistoryEntry.COLUMN_NAME_QUERY] = query.trim(),
                    _b[SearchHistoryEntry.COLUMN_NAME_NAMESPACE] = namespace,
                    _b[SearchHistoryEntry.COLUMN_NAME_USER_ID] = uid,
                    _b[SearchHistoryEntry.COLUMN_NAME_TIME_STAMP] = Date.now(),
                    _b)
            }).pipe(mapTo(uid));
        }), mergeMap(function (uid) {
            return _this.dbService.execute("\n                        DELETE FROM " + SearchHistoryEntry.TABLE_NAME + " WHERE\n                        " + SearchHistoryEntry._ID + " IN (SELECT " + SearchHistoryEntry._ID + " FROM " + SearchHistoryEntry.TABLE_NAME + " WHERE\n                        " + SearchHistoryEntry.COLUMN_NAME_USER_ID + " = \"" + uid + "\" AND\n                        " + SearchHistoryEntry.COLUMN_NAME_NAMESPACE + " = \"" + namespace + "\"\n                        ORDER BY " + SearchHistoryEntry.COLUMN_NAME_TIME_STAMP + " DESC\n                        LIMIT -1 OFFSET " + SearchHistoryServiceImpl_1.MAX_USER_SEARCH_HISTORY_ENTRIES + ")\n                    ");
        }), mapTo(undefined));
    };
    SearchHistoryServiceImpl.prototype.getEntries = function (_a) {
        var _this = this;
        var like = _a.like, limit = _a.limit, namespace = _a.namespace;
        return this.profileService.getActiveProfileSession()
            .pipe(mergeMap(function (_a) {
            var uid = _a.uid;
            var likeQuery = '';
            if (like) {
                likeQuery = "AND " + SearchHistoryEntry.COLUMN_NAME_QUERY + " LIKE \"%" + like.trim() + "%\"";
            }
            return _this.dbService.execute("\n                        SELECT * FROM " + SearchHistoryEntry.TABLE_NAME + " WHERE\n                        " + SearchHistoryEntry.COLUMN_NAME_USER_ID + " = \"" + uid + "\" AND\n                        " + SearchHistoryEntry.COLUMN_NAME_NAMESPACE + " = \"" + namespace + "\"\n                        " + likeQuery + "\n                        ORDER BY " + SearchHistoryEntry.COLUMN_NAME_TIME_STAMP + " DESC\n                        LIMIT " + limit + "\n                    ");
        }), map(function (entries) {
            return entries.map(function (entry) {
                return SearchHistoryDbEntryMapper.mapSearchHistoryDbEntryToSearchEntry(entry);
            });
        }));
    };
    var SearchHistoryServiceImpl_1;
    SearchHistoryServiceImpl.MAX_USER_SEARCH_HISTORY_ENTRIES = 10;
    SearchHistoryServiceImpl = SearchHistoryServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __param(1, inject(InjectionTokens.PROFILE_SERVICE)),
        __metadata("design:paramtypes", [DbService, Object])
    ], SearchHistoryServiceImpl);
    return SearchHistoryServiceImpl;
}());
export { SearchHistoryServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWhpc3Rvcnktc2VydmljZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvc2VhcmNoLWhpc3RvcnkvaW1wbC9zZWFyY2gtaGlzdG9yeS1zZXJ2aWNlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdEMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2hELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3BEO0lBR0ksa0NBQXdELFNBQW9CLEVBQ2YsY0FBOEI7UUFEbkMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNmLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUMzRixDQUFDO2lDQUxRLHdCQUF3QjtJQU9qQywyQ0FBUSxHQUFSLFVBQVMsRUFBbUM7UUFBNUMsaUJBNEJDO1lBNUJTLEtBQUssV0FBQSxFQUFFLFNBQVMsZUFBQTtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUU7YUFDL0MsSUFBSSxDQUNELFFBQVEsQ0FBQyxVQUFDLEVBQUs7O2dCQUFKLEdBQUcsU0FBQTtZQUNWLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQTtvQkFDUCxHQUFDLGtCQUFrQixDQUFDLGlCQUFpQixJQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ3BELEdBQUMsa0JBQWtCLENBQUMscUJBQXFCLElBQUcsU0FBUztvQkFDckQsR0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsSUFBRyxHQUFHO29CQUM3QyxHQUFDLGtCQUFrQixDQUFDLHNCQUFzQixJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7c0JBQ2pCLENBQUE7YUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FDSCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2IsQ0FBQztRQUNOLENBQUMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxVQUFDLEdBQUc7WUFDVCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDJDQUNaLGtCQUFrQixDQUFDLFVBQVUsd0NBQ3pDLGtCQUFrQixDQUFDLEdBQUcsb0JBQWUsa0JBQWtCLENBQUMsR0FBRyxjQUFTLGtCQUFrQixDQUFDLFVBQVUsd0NBQ2pHLGtCQUFrQixDQUFDLG1CQUFtQixhQUFPLEdBQUcsd0NBQ2hELGtCQUFrQixDQUFDLHFCQUFxQixhQUFPLFNBQVMsNkNBQy9DLGtCQUFrQixDQUFDLHNCQUFzQix1REFDbEMsMEJBQXdCLENBQUMsK0JBQStCLDRCQUM3RSxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsRUFDRixLQUFLLENBQUMsU0FBUyxDQUFDLENBQ25CLENBQUM7SUFDVixDQUFDO0lBRUQsNkNBQVUsR0FBVixVQUFXLEVBQTJDO1FBQXRELGlCQXlCQztZQXpCVyxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxTQUFTLGVBQUE7UUFDOUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFO2FBQy9DLElBQUksQ0FDRCxRQUFRLENBQUMsVUFBQyxFQUFLO2dCQUFKLEdBQUcsU0FBQTtZQUNWLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVuQixJQUFJLElBQUksRUFBRTtnQkFDTixTQUFTLEdBQUcsU0FBTyxrQkFBa0IsQ0FBQyxpQkFBaUIsaUJBQVcsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFJLENBQUM7YUFDckY7WUFFRCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDZDQUNWLGtCQUFrQixDQUFDLFVBQVUsd0NBQzNDLGtCQUFrQixDQUFDLG1CQUFtQixhQUFPLEdBQUcsd0NBQ2hELGtCQUFrQixDQUFDLHFCQUFxQixhQUFPLFNBQVMsb0NBQ3hELFNBQVMsMkNBQ0Esa0JBQWtCLENBQUMsc0JBQXNCLDZDQUM1QyxLQUFLLDJCQUNoQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsVUFBQyxPQUF1QztZQUN4QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO2dCQUNyQixPQUFPLDBCQUEwQixDQUFDLG9DQUFvQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNWLENBQUM7O0lBN0RjLHdEQUErQixHQUFHLEVBQUUsQ0FBQztJQUQzQyx3QkFBd0I7UUFEcEMsVUFBVSxFQUFFO1FBSUksV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQTt5Q0FEZSxTQUFTO09BSG5FLHdCQUF3QixDQStEcEM7SUFBRCwrQkFBQztDQUFBLEFBL0RELElBK0RDO1NBL0RZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VhcmNoRW50cnksIFNlYXJjaEhpc3RvcnlTZXJ2aWNlfSBmcm9tICcuLic7XG5pbXBvcnQge2luamVjdCwgaW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FkZEVudHJ5UmVxdWVzdCwgR2V0RW50cmllc1JlcXVlc3R9IGZyb20gJy4uL2RlZi9yZXF1ZXN0cyc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge1NlYXJjaEhpc3RvcnlFbnRyeX0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7U2VhcmNoSGlzdG9yeURiRW50cnlNYXBwZXJ9IGZyb20gJy4uL3V0aWwvc2VhcmNoLWhpc3RvcnktZGItZW50cnktbWFwcGVyJztcbmltcG9ydCB7bWFwLCBtYXBUbywgbWVyZ2VNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEhpc3RvcnlTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIFNlYXJjaEhpc3RvcnlTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBNQVhfVVNFUl9TRUFSQ0hfSElTVE9SWV9FTlRSSUVTID0gMTA7XG5cbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlBST0ZJTEVfU0VSVklDRSkgcHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBhZGRFbnRyeSh7cXVlcnksIG5hbWVzcGFjZX06IEFkZEVudHJ5UmVxdWVzdCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh7dWlkfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBTZWFyY2hIaXN0b3J5RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfUVVFUlldOiBxdWVyeS50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1NlYXJjaEhpc3RvcnlFbnRyeS5DT0xVTU5fTkFNRV9OQU1FU1BBQ0VdOiBuYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1NlYXJjaEhpc3RvcnlFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEXTogdWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfVElNRV9TVEFNUF06IERhdGUubm93KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgUGFydGlhbDxTZWFyY2hIaXN0b3J5RW50cnkuU2NoZW1hTWFwPlxuICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odWlkKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh1aWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYFxuICAgICAgICAgICAgICAgICAgICAgICAgREVMRVRFIEZST00gJHtTZWFyY2hIaXN0b3J5RW50cnkuVEFCTEVfTkFNRX0gV0hFUkVcbiAgICAgICAgICAgICAgICAgICAgICAgICR7U2VhcmNoSGlzdG9yeUVudHJ5Ll9JRH0gSU4gKFNFTEVDVCAke1NlYXJjaEhpc3RvcnlFbnRyeS5fSUR9IEZST00gJHtTZWFyY2hIaXN0b3J5RW50cnkuVEFCTEVfTkFNRX0gV0hFUkVcbiAgICAgICAgICAgICAgICAgICAgICAgICR7U2VhcmNoSGlzdG9yeUVudHJ5LkNPTFVNTl9OQU1FX1VTRVJfSUR9ID0gXCIke3VpZH1cIiBBTkRcbiAgICAgICAgICAgICAgICAgICAgICAgICR7U2VhcmNoSGlzdG9yeUVudHJ5LkNPTFVNTl9OQU1FX05BTUVTUEFDRX0gPSBcIiR7bmFtZXNwYWNlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBPUkRFUiBCWSAke1NlYXJjaEhpc3RvcnlFbnRyeS5DT0xVTU5fTkFNRV9USU1FX1NUQU1QfSBERVNDXG4gICAgICAgICAgICAgICAgICAgICAgICBMSU1JVCAtMSBPRkZTRVQgJHtTZWFyY2hIaXN0b3J5U2VydmljZUltcGwuTUFYX1VTRVJfU0VBUkNIX0hJU1RPUllfRU5UUklFU30pXG4gICAgICAgICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0RW50cmllcyh7bGlrZSwgbGltaXQsIG5hbWVzcGFjZX06IEdldEVudHJpZXNSZXF1ZXN0KTogT2JzZXJ2YWJsZTxTZWFyY2hFbnRyeVtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh7dWlkfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGlrZVF1ZXJ5ID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpa2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpa2VRdWVyeSA9IGBBTkQgJHtTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfUVVFUll9IExJS0UgXCIlJHtsaWtlLnRyaW0oKX0lXCJgO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYFxuICAgICAgICAgICAgICAgICAgICAgICAgU0VMRUNUICogRlJPTSAke1NlYXJjaEhpc3RvcnlFbnRyeS5UQUJMRV9OQU1FfSBXSEVSRVxuICAgICAgICAgICAgICAgICAgICAgICAgJHtTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfVVNFUl9JRH0gPSBcIiR7dWlkfVwiIEFORFxuICAgICAgICAgICAgICAgICAgICAgICAgJHtTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfTkFNRVNQQUNFfSA9IFwiJHtuYW1lc3BhY2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7bGlrZVF1ZXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgT1JERVIgQlkgJHtTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfVElNRV9TVEFNUH0gREVTQ1xuICAgICAgICAgICAgICAgICAgICAgICAgTElNSVQgJHtsaW1pdH1cbiAgICAgICAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChlbnRyaWVzOiBTZWFyY2hIaXN0b3J5RW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJpZXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNlYXJjaEhpc3RvcnlEYkVudHJ5TWFwcGVyLm1hcFNlYXJjaEhpc3RvcnlEYkVudHJ5VG9TZWFyY2hFbnRyeShlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==