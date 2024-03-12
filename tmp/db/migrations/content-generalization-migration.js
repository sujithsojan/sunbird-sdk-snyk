var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Migration } from '..';
import { ContentEntry } from '../../content/db/schema';
import { CsPrimaryCategoryMapper } from '@project-sunbird/client-services/services/content/utilities/primary-category-mapper';
import { ContentUtil } from '../../content/util/content-util';
var ContentGeneralizationMigration = /** @class */ (function (_super) {
    __extends(ContentGeneralizationMigration, _super);
    function ContentGeneralizationMigration() {
        return _super.call(this, 15, 28) || this;
    }
    ContentGeneralizationMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateContentTable(dbService)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ContentGeneralizationMigration.prototype.updateContentTable = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, contentMap, primaryCategoryCases, updateQuery, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbService.beginTransaction();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, dbService.read({
                                table: ContentEntry.TABLE_NAME
                            }).toPromise()];
                    case 2:
                        entries = _a.sent();
                        contentMap = entries.reduce(function (acc, entry) {
                            var contentData;
                            if (entry[ContentEntry.COLUMN_NAME_LOCAL_DATA] && ContentUtil.isAvailableLocally(entry[ContentEntry.COLUMN_NAME_CONTENT_STATE])) {
                                contentData = JSON.parse(entry[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                            }
                            else if (entry[ContentEntry.COLUMN_NAME_SERVER_DATA]) {
                                contentData = JSON.parse(entry[ContentEntry.COLUMN_NAME_SERVER_DATA]);
                            }
                            var resourceType = contentData ? contentData.resourceType : undefined;
                            var primaryCategory = CsPrimaryCategoryMapper.getPrimaryCategory(entry[ContentEntry.COLUMN_NAME_CONTENT_TYPE], entry[ContentEntry.COLUMN_NAME_MIME_TYPE], resourceType).toLowerCase();
                            acc.set(entry[ContentEntry.COLUMN_NAME_IDENTIFIER], primaryCategory);
                            return acc;
                        }, new Map());
                        if (!contentMap.size) {
                            dbService.endTransaction(true);
                            return [2 /*return*/];
                        }
                        primaryCategoryCases = this.buildPrimaryCategoryCases(contentMap);
                        updateQuery = ("UPDATE " + ContentEntry.TABLE_NAME + " SET " + primaryCategoryCases + ";").trim();
                        return [4 /*yield*/, dbService.execute(updateQuery).toPromise()];
                    case 3:
                        _a.sent();
                        dbService.endTransaction(true);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        dbService.endTransaction(false);
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ContentGeneralizationMigration.prototype.buildPrimaryCategoryCases = function (contentMap) {
        return Array.from(contentMap.entries()).reduce(function (acc, _a) {
            var identifier = _a[0], primaryCategory = _a[1];
            return primaryCategory ? acc.concat(" WHEN '" + identifier + "' THEN '" + primaryCategory + "' ") : acc;
        }, " " + ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY + " = CASE " + ContentEntry.COLUMN_NAME_IDENTIFIER + " ").concat(' ELSE \'\' END ');
    };
    ContentGeneralizationMigration.prototype.queries = function () {
        return [
            ContentEntry.getAlterEntryForPrimaryCategory(),
        ];
    };
    return ContentGeneralizationMigration;
}(Migration));
export { ContentGeneralizationMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1nZW5lcmFsaXphdGlvbi1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9jb250ZW50LWdlbmVyYWxpemF0aW9uLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN4QyxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLHlCQUF5QixDQUFDO0FBQ3pFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHFGQUFxRixDQUFDO0FBQzVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUc1RDtJQUFvRCxrREFBUztJQUUzRDtlQUNFLGtCQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRVksOENBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7NEJBQ3JDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxFQUFBOzt3QkFBdEYsU0FBc0YsQ0FBQzt3QkFDdkYscUJBQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzt3QkFDekMsc0JBQU8sU0FBUyxFQUFDOzs7O0tBQ2xCO0lBRWEsMkRBQWtCLEdBQWhDLFVBQWlDLFNBQW9COzs7Ozs7d0JBQ25ELFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzs7O3dCQUdlLHFCQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0NBQzdELEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTs2QkFDL0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFGUixPQUFPLEdBQTZCLFNBRTVCO3dCQUNSLFVBQVUsR0FBd0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLOzRCQUNoRSxJQUFJLFdBQXdCLENBQUM7NEJBQzdCLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFFLENBQUMsRUFBRTtnQ0FDaEksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7NkJBQ3RFO2lDQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO2dDQUN0RCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQzs2QkFDdkU7NEJBRUQsSUFBTSxZQUFZLEdBQUcsV0FBWSxDQUFDLENBQUMsQ0FBQyxXQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7NEJBQzFFLElBQU0sZUFBZSxHQUFHLHVCQUF1QixDQUFDLGtCQUFrQixDQUNoRSxLQUFLLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEVBQzVDLEtBQUssQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDekUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7NEJBQ3JFLE9BQU8sR0FBRyxDQUFDO3dCQUNiLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBRWQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7NEJBQ3BCLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQy9CLHNCQUFPO3lCQUNSO3dCQUVLLG9CQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDbEUsV0FBVyxHQUFHLENBQUEsWUFBVSxZQUFZLENBQUMsVUFBVSxhQUFRLG9CQUFvQixNQUFHLENBQUEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDNUYscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWhELFNBQWdELENBQUM7d0JBRWpELFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7d0JBRS9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUM7d0JBQ2pCLFNBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sR0FBQyxDQUFDOzs7OztLQUVYO0lBRU8sa0VBQXlCLEdBQWpDLFVBQWtDLFVBQStCO1FBQy9ELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQVMsVUFBQyxHQUFHLEVBQUUsRUFBNkI7Z0JBQTVCLFVBQVUsUUFBQSxFQUFFLGVBQWUsUUFBQTtZQUN2RixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFVLFVBQVUsZ0JBQVcsZUFBZSxPQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2hHLENBQUMsRUFBRSxNQUFJLFlBQVksQ0FBQyw0QkFBNEIsZ0JBQVcsWUFBWSxDQUFDLHNCQUFzQixNQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvSCxDQUFDO0lBRUQsZ0RBQU8sR0FBUDtRQUNFLE9BQU87WUFDTCxZQUFZLENBQUMsK0JBQStCLEVBQUU7U0FDL0MsQ0FBQztJQUNKLENBQUM7SUFDSCxxQ0FBQztBQUFELENBQUMsQUEvREQsQ0FBb0QsU0FBUyxHQStENUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZSwgTWlncmF0aW9ufSBmcm9tICcuLic7XG5pbXBvcnQge0NvbnRlbnRFbnRyeSwgQ29udGVudEFjY2Vzc0VudHJ5fSBmcm9tICcuLi8uLi9jb250ZW50L2RiL3NjaGVtYSc7XG5pbXBvcnQge0NzUHJpbWFyeUNhdGVnb3J5TWFwcGVyfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jb250ZW50L3V0aWxpdGllcy9wcmltYXJ5LWNhdGVnb3J5LW1hcHBlcic7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi8uLi9jb250ZW50L3V0aWwvY29udGVudC11dGlsJztcbmltcG9ydCB7Q29udGVudERhdGF9IGZyb20gJy4uLy4uL2NvbnRlbnQnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudEdlbmVyYWxpemF0aW9uTWlncmF0aW9uIGV4dGVuZHMgTWlncmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigxNSwgMjgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5xdWVyaWVzKCkubWFwKChxdWVyeSkgPT4gZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpKSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVDb250ZW50VGFibGUoZGJTZXJ2aWNlKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb250ZW50VGFibGUoZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICBkYlNlcnZpY2UuYmVnaW5UcmFuc2FjdGlvbigpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVudHJpZXM6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IGRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgdGFibGU6IENvbnRlbnRFbnRyeS5UQUJMRV9OQU1FXG4gICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBlbnRyaWVzLnJlZHVjZSgoYWNjLCBlbnRyeSkgPT4ge1xuICAgICAgICBsZXQgY29udGVudERhdGE6IENvbnRlbnREYXRhO1xuICAgICAgICBpZiAoZW50cnlbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdICYmIENvbnRlbnRVdGlsLmlzQXZhaWxhYmxlTG9jYWxseShlbnRyeVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURV0hKSkge1xuICAgICAgICAgIGNvbnRlbnREYXRhID0gSlNPTi5wYXJzZShlbnRyeVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TRVJWRVJfREFUQV0pIHtcbiAgICAgICAgICBjb250ZW50RGF0YSA9IEpTT04ucGFyc2UoZW50cnlbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1NFUlZFUl9EQVRBXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNvdXJjZVR5cGUgPSBjb250ZW50RGF0YSEgPyBjb250ZW50RGF0YSEucmVzb3VyY2VUeXBlIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBwcmltYXJ5Q2F0ZWdvcnkgPSBDc1ByaW1hcnlDYXRlZ29yeU1hcHBlci5nZXRQcmltYXJ5Q2F0ZWdvcnkoXG4gICAgICAgICAgZW50cnlbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfVFlQRV0sXG4gICAgICAgICAgZW50cnlbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX01JTUVfVFlQRV0sIHJlc291cmNlVHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgYWNjLnNldChlbnRyeVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl0sIHByaW1hcnlDYXRlZ29yeSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCBuZXcgTWFwKCkpO1xuXG4gICAgICBpZiAoIWNvbnRlbnRNYXAuc2l6ZSkge1xuICAgICAgICBkYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJpbWFyeUNhdGVnb3J5Q2FzZXMgPSB0aGlzLmJ1aWxkUHJpbWFyeUNhdGVnb3J5Q2FzZXMoY29udGVudE1hcCk7XG4gICAgICBjb25zdCB1cGRhdGVRdWVyeSA9IGBVUERBVEUgJHtDb250ZW50RW50cnkuVEFCTEVfTkFNRX0gU0VUICR7cHJpbWFyeUNhdGVnb3J5Q2FzZXN9O2AudHJpbSgpO1xuICAgICAgYXdhaXQgZGJTZXJ2aWNlLmV4ZWN1dGUodXBkYXRlUXVlcnkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICBkYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIGRiU2VydmljZS5lbmRUcmFuc2FjdGlvbihmYWxzZSk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRQcmltYXJ5Q2F0ZWdvcnlDYXNlcyhjb250ZW50TWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oY29udGVudE1hcC5lbnRyaWVzKCkpLnJlZHVjZTxzdHJpbmc+KChhY2MsIFtpZGVudGlmaWVyLCBwcmltYXJ5Q2F0ZWdvcnldKSA9PiB7XG4gICAgICByZXR1cm4gcHJpbWFyeUNhdGVnb3J5ID8gYWNjLmNvbmNhdChgIFdIRU4gJyR7aWRlbnRpZmllcn0nIFRIRU4gJyR7cHJpbWFyeUNhdGVnb3J5fScgYCkgOiBhY2M7XG4gICAgfSwgYCAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QUklNQVJZX0NBVEVHT1JZfSA9IENBU0UgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gYCkuY29uY2F0KCcgRUxTRSBcXCdcXCcgRU5EICcpO1xuICB9XG5cbiAgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gW1xuICAgICAgQ29udGVudEVudHJ5LmdldEFsdGVyRW50cnlGb3JQcmltYXJ5Q2F0ZWdvcnkoKSxcbiAgICBdO1xuICB9XG59XG4iXX0=