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
import { ContentUtil } from '../../content/util/content-util';
var COLUMN_NAME_LOCAL_DATA = ContentEntry.COLUMN_NAME_LOCAL_DATA;
var COLUMN_NAME_CONTENT_STATE = ContentEntry.COLUMN_NAME_CONTENT_STATE;
var COLUMN_NAME_SERVER_DATA = ContentEntry.COLUMN_NAME_SERVER_DATA;
var COLUMN_NAME_DIALCODES = ContentEntry.COLUMN_NAME_DIALCODES;
var COLUMN_NAME_IDENTIFIER = ContentEntry.COLUMN_NAME_IDENTIFIER;
var COLUMN_NAME_CHILD_NODES = ContentEntry.COLUMN_NAME_CHILD_NODES;
var ContentDialcodeMigration = /** @class */ (function (_super) {
    __extends(ContentDialcodeMigration, _super);
    function ContentDialcodeMigration() {
        return _super.call(this, 11, 26) || this;
    }
    ContentDialcodeMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateEntries(dbService)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ContentDialcodeMigration.prototype.queries = function () {
        return [
            ContentEntry.getAlterEntryForDialCode(),
            ContentEntry.getAlterEntryForChildNodes()
        ];
    };
    ContentDialcodeMigration.prototype.updateEntries = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, contentDataMap, dialcodeCases, childNodeCases, updateQuery, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbService.beginTransaction();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbService.read({
                                table: ContentEntry.TABLE_NAME
                            }).toPromise()];
                    case 2:
                        entries = _a.sent();
                        contentDataMap = entries.reduce(function (acc, entry) {
                            if (entry[COLUMN_NAME_LOCAL_DATA] && ContentUtil.isAvailableLocally(entry[COLUMN_NAME_CONTENT_STATE])) {
                                var localData = JSON.parse(entry[COLUMN_NAME_LOCAL_DATA]);
                                if (localData.dialcodes || localData.childNodes) {
                                    acc.set(entry[COLUMN_NAME_IDENTIFIER], localData);
                                }
                            }
                            else if (entry[COLUMN_NAME_SERVER_DATA]) {
                                var serverData = JSON.parse(entry[COLUMN_NAME_SERVER_DATA]);
                                if (serverData.dialcodes || serverData.childNodes) {
                                    acc.set(entry[COLUMN_NAME_IDENTIFIER], serverData);
                                }
                            }
                            return acc;
                        }, new Map());
                        if (!contentDataMap.size) {
                            dbService.endTransaction(true);
                            return [2 /*return*/];
                        }
                        dialcodeCases = this.buildDialcodesCases(contentDataMap);
                        childNodeCases = this.buildChildNodesCases(contentDataMap);
                        updateQuery = ("UPDATE " + ContentEntry.TABLE_NAME + " SET " + dialcodeCases + " " + (dialcodeCases && childNodeCases ? ',' : '') + " " + childNodeCases + " WHERE " + COLUMN_NAME_IDENTIFIER + " IN(" + Array.from(contentDataMap.keys()).map(function (id) { return "'" + id + "'"; }).join(',') + ");").trim();
                        dbService.execute(updateQuery);
                        dbService.endTransaction(true);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        dbService.endTransaction(false);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContentDialcodeMigration.prototype.buildDialcodesCases = function (contentDataMap) {
        if (!Array.from(contentDataMap.entries()).some(function (_a) {
            var _ = _a[0], content = _a[1];
            return !!(content.dialcodes && content.dialcodes.length);
        })) {
            return '';
        }
        return Array.from(contentDataMap.entries()).reduce(function (acc, _a) {
            var identifier = _a[0], content = _a[1];
            var serializedDialcodes = ContentUtil.getContentAttribute(content.dialcodes);
            return serializedDialcodes ? acc.concat(" WHEN '" + identifier + "' THEN '" + serializedDialcodes + "' ") : acc;
        }, " " + COLUMN_NAME_DIALCODES + " = CASE " + COLUMN_NAME_IDENTIFIER + " ").concat(' ELSE \'\' END ');
    };
    ContentDialcodeMigration.prototype.buildChildNodesCases = function (contentDataMap) {
        if (!Array.from(contentDataMap.entries()).some(function (_a) {
            var _ = _a[0], content = _a[1];
            return !!(content.childNodes && content.childNodes.length);
        })) {
            return '';
        }
        return Array.from(contentDataMap.entries()).reduce(function (acc, _a) {
            var identifier = _a[0], content = _a[1];
            var serializedChildNodes = ContentUtil.getContentAttribute(content.childNodes);
            return serializedChildNodes ? acc.concat(" WHEN '" + identifier + "' THEN '" + serializedChildNodes + "' ") : acc;
        }, " " + COLUMN_NAME_CHILD_NODES + " = CASE " + COLUMN_NAME_IDENTIFIER + " ").concat(' ELSE \'\' END ');
    };
    return ContentDialcodeMigration;
}(Migration));
export { ContentDialcodeMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1kaWFsY29kZS1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9jb250ZW50LWRpYWxjb2RlLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN4QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzVELElBQU8sc0JBQXNCLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDO0FBQ3BFLElBQU8seUJBQXlCLEdBQUcsWUFBWSxDQUFDLHlCQUF5QixDQUFDO0FBQzFFLElBQU8sdUJBQXVCLEdBQUcsWUFBWSxDQUFDLHVCQUF1QixDQUFDO0FBQ3RFLElBQU8scUJBQXFCLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixDQUFDO0FBQ2xFLElBQU8sc0JBQXNCLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDO0FBQ3BFLElBQU8sdUJBQXVCLEdBQUcsWUFBWSxDQUFDLHVCQUF1QixDQUFDO0FBRXRFO0lBQThDLDRDQUFTO0lBRW5EO2VBQ0ksa0JBQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRVksd0NBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7NEJBQ25DLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxFQUFBOzt3QkFBdEYsU0FBc0YsQ0FBQzt3QkFDdkYscUJBQU0sSUFB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LEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFTLFVBQUMsR0FBRyxFQUFFLEVBQXFCO2dCQUFwQixVQUFVLFFBQUEsRUFBRSxPQUFPLFFBQUE7WUFDakYsSUFBTSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pGLE9BQU8sb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBVSxVQUFVLGdCQUFXLG9CQUFvQixPQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzVHLENBQUMsRUFBRSxNQUFJLHVCQUF1QixnQkFBVyxzQkFBc0IsTUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FBQyxBQXZGRCxDQUE4QyxTQUFTLEdBdUZ0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlLCBNaWdyYXRpb259IGZyb20gJy4uJztcbmltcG9ydCB7Q29udGVudEVudHJ5fSBmcm9tICcuLi8uLi9jb250ZW50L2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvbnRlbnREYXRhfSBmcm9tICcuLi8uLi9jb250ZW50JztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IENPTFVNTl9OQU1FX0xPQ0FMX0RBVEEgPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQTtcbmltcG9ydCBDT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFID0gQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEU7XG5pbXBvcnQgQ09MVU1OX05BTUVfU0VSVkVSX0RBVEEgPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0VSVkVSX0RBVEE7XG5pbXBvcnQgQ09MVU1OX05BTUVfRElBTENPREVTID0gQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0RJQUxDT0RFUztcbmltcG9ydCBDT0xVTU5fTkFNRV9JREVOVElGSUVSID0gQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVI7XG5pbXBvcnQgQ09MVU1OX05BTUVfQ0hJTERfTk9ERVMgPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ0hJTERfTk9ERVM7XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50RGlhbGNvZGVNaWdyYXRpb24gZXh0ZW5kcyBNaWdyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKDExLCAyNik7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMucXVlcmllcygpLm1hcCgocXVlcnkpID0+IGRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS50b1Byb21pc2UoKSkpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUVudHJpZXMoZGJTZXJ2aWNlKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBxdWVyaWVzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgQ29udGVudEVudHJ5LmdldEFsdGVyRW50cnlGb3JEaWFsQ29kZSgpLFxuICAgICAgICAgICAgQ29udGVudEVudHJ5LmdldEFsdGVyRW50cnlGb3JDaGlsZE5vZGVzKClcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHVwZGF0ZUVudHJpZXMoZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICAgICAgZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW50cmllczogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRVxuICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnREYXRhTWFwOiBNYXA8c3RyaW5nLCBDb250ZW50RGF0YT4gPSBlbnRyaWVzLnJlZHVjZSgoYWNjLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeVtDT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSAmJiBDb250ZW50VXRpbC5pc0F2YWlsYWJsZUxvY2FsbHkoZW50cnlbQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURV0hKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbERhdGE6IENvbnRlbnREYXRhID0gSlNPTi5wYXJzZShlbnRyeVtDT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbERhdGEuZGlhbGNvZGVzIHx8IGxvY2FsRGF0YS5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Muc2V0KGVudHJ5W0NPTFVNTl9OQU1FX0lERU5USUZJRVJdLCBsb2NhbERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbnRyeVtDT0xVTU5fTkFNRV9TRVJWRVJfREFUQV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmVyRGF0YTogQ29udGVudERhdGEgPSBKU09OLnBhcnNlKGVudHJ5W0NPTFVNTl9OQU1FX1NFUlZFUl9EQVRBXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJEYXRhLmRpYWxjb2RlcyB8fCBzZXJ2ZXJEYXRhLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5zZXQoZW50cnlbQ09MVU1OX05BTUVfSURFTlRJRklFUl0sIHNlcnZlckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIG5ldyBNYXAoKSk7XG5cbiAgICAgICAgICAgIGlmICghY29udGVudERhdGFNYXAuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGRiU2VydmljZS5lbmRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGRpYWxjb2RlQ2FzZXMgPSB0aGlzLmJ1aWxkRGlhbGNvZGVzQ2FzZXMoY29udGVudERhdGFNYXApO1xuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlQ2FzZXMgPSB0aGlzLmJ1aWxkQ2hpbGROb2Rlc0Nhc2VzKGNvbnRlbnREYXRhTWFwKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVF1ZXJ5ID0gYFVQREFURSAke0NvbnRlbnRFbnRyeS5UQUJMRV9OQU1FfSBTRVQgJHtkaWFsY29kZUNhc2VzfSAke2RpYWxjb2RlQ2FzZXMgJiYgY2hpbGROb2RlQ2FzZXMgPyAnLCcgOiAnJ30gJHtjaGlsZE5vZGVDYXNlc30gV0hFUkUgJHtDT0xVTU5fTkFNRV9JREVOVElGSUVSfSBJTigke0FycmF5LmZyb20oY29udGVudERhdGFNYXAua2V5cygpKS5tYXAoaWQgPT4gYCcke2lkfSdgKS5qb2luKCcsJyl9KTtgLnRyaW0oKTtcblxuICAgICAgICAgICAgZGJTZXJ2aWNlLmV4ZWN1dGUodXBkYXRlUXVlcnkpO1xuXG4gICAgICAgICAgICBkYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICBkYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGREaWFsY29kZXNDYXNlcyhcbiAgICAgICAgY29udGVudERhdGFNYXA6IE1hcDxzdHJpbmcsIENvbnRlbnREYXRhPixcbiAgICApIHtcbiAgICAgICAgaWYgKCFBcnJheS5mcm9tKGNvbnRlbnREYXRhTWFwLmVudHJpZXMoKSkuc29tZSgoW18sIGNvbnRlbnRdKSA9PiAhIShjb250ZW50LmRpYWxjb2RlcyAmJiBjb250ZW50LmRpYWxjb2Rlcy5sZW5ndGgpKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oY29udGVudERhdGFNYXAuZW50cmllcygpKS5yZWR1Y2U8c3RyaW5nPigoYWNjLCBbaWRlbnRpZmllciwgY29udGVudF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWREaWFsY29kZXMgPSBDb250ZW50VXRpbC5nZXRDb250ZW50QXR0cmlidXRlKGNvbnRlbnQuZGlhbGNvZGVzKTtcbiAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVkRGlhbGNvZGVzID8gYWNjLmNvbmNhdChgIFdIRU4gJyR7aWRlbnRpZmllcn0nIFRIRU4gJyR7c2VyaWFsaXplZERpYWxjb2Rlc30nIGApIDogYWNjO1xuICAgICAgICB9LCBgICR7Q09MVU1OX05BTUVfRElBTENPREVTfSA9IENBU0UgJHtDT0xVTU5fTkFNRV9JREVOVElGSUVSfSBgKS5jb25jYXQoJyBFTFNFIFxcJ1xcJyBFTkQgJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZENoaWxkTm9kZXNDYXNlcyhcbiAgICAgICAgY29udGVudERhdGFNYXA6IE1hcDxzdHJpbmcsIENvbnRlbnREYXRhPixcbiAgICApIHtcbiAgICAgICAgaWYgKCFBcnJheS5mcm9tKGNvbnRlbnREYXRhTWFwLmVudHJpZXMoKSkuc29tZSgoW18sIGNvbnRlbnRdKSA9PiAhIShjb250ZW50LmNoaWxkTm9kZXMgJiYgY29udGVudC5jaGlsZE5vZGVzLmxlbmd0aCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShjb250ZW50RGF0YU1hcC5lbnRyaWVzKCkpLnJlZHVjZTxzdHJpbmc+KChhY2MsIFtpZGVudGlmaWVyLCBjb250ZW50XSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VyaWFsaXplZENoaWxkTm9kZXMgPSBDb250ZW50VXRpbC5nZXRDb250ZW50QXR0cmlidXRlKGNvbnRlbnQuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICByZXR1cm4gc2VyaWFsaXplZENoaWxkTm9kZXMgPyBhY2MuY29uY2F0KGAgV0hFTiAnJHtpZGVudGlmaWVyfScgVEhFTiAnJHtzZXJpYWxpemVkQ2hpbGROb2Rlc30nIGApIDogYWNjO1xuICAgICAgICB9LCBgICR7Q09MVU1OX05BTUVfQ0hJTERfTk9ERVN9ID0gQ0FTRSAke0NPTFVNTl9OQU1FX0lERU5USUZJRVJ9IGApLmNvbmNhdCgnIEVMU0UgXFwnXFwnIEVORCAnKTtcbiAgICB9XG59XG4iXX0=