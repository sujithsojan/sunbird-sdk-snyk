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
import { ContentEntry, ContentMarkerEntry } from '../../content/db/schema';
import { map } from 'rxjs/operators';
var RecentlyViewedMigration = /** @class */ (function (_super) {
    __extends(RecentlyViewedMigration, _super);
    function RecentlyViewedMigration() {
        return _super.call(this, 9, 24) || this;
    }
    RecentlyViewedMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, dbService.read({
                                table: ContentMarkerEntry.TABLE_NAME
                            }).pipe(map(function (rows) {
                                rows.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                    var localDataRow, localData;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                localDataRow = row[ContentMarkerEntry.COLUMN_NAME_DATA];
                                                if (!localDataRow) return [3 /*break*/, 2];
                                                localData = JSON.parse(localDataRow);
                                                row[ContentEntry.COLUMN_NAME_MIME_TYPE] = localData['mimeType'];
                                                return [4 /*yield*/, dbService.update({
                                                        table: ContentMarkerEntry.TABLE_NAME,
                                                        modelJson: row,
                                                        selection: ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER + " = ?",
                                                        selectionArgs: [row[ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER]]
                                                    }).toPromise()];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })).toPromise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    RecentlyViewedMigration.prototype.queries = function () {
        return [
            ContentMarkerEntry.getAlterEntryForMimeType()
        ];
    };
    return RecentlyViewedMigration;
}(Migration));
export { RecentlyViewedMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZW50bHktdmlld2VkLW1pZ3JhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9taWdyYXRpb25zL3JlY2VudGx5LXZpZXdlZC1taWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBWSxTQUFTLEVBQUMsTUFBTSxJQUFJLENBQUM7QUFDeEMsT0FBTyxFQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQztJQUE2QywyQ0FBUztJQUVsRDtlQUNJLGtCQUFNLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVZLHVDQUFLLEdBQWxCLFVBQW1CLFNBQW9COzs7Ozs0QkFDbkMscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDLEVBQUE7O3dCQUF0RixTQUFzRixDQUFDO3dCQUN2RixxQkFBTSxTQUFTLENBQUMsSUFBSSxDQUFDO2dDQUNqQixLQUFLLEVBQUUsa0JBQWtCLENBQUMsVUFBVTs2QkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQyxJQUFvQztnQ0FDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFPLEdBQWlDOzs7OztnREFDM0MsWUFBWSxHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3FEQUMxRCxZQUFZLEVBQVosd0JBQVk7Z0RBQ04sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0RBQzNDLEdBQUcsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0RBQ2hFLHFCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0RBQ25CLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO3dEQUNwQyxTQUFTLEVBQUUsR0FBRzt3REFDZCxTQUFTLEVBQUssa0JBQWtCLENBQUMsOEJBQThCLFNBQU07d0RBQ3JFLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO3FEQUMxRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dEQUxkLFNBS2MsQ0FBQzs7Ozs7cUNBRXRCLENBQUMsQ0FBQzs0QkFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFsQmIsU0FrQmEsQ0FBQzt3QkFFZCxzQkFBTyxTQUFTLEVBQUM7Ozs7S0FDcEI7SUFFRCx5Q0FBTyxHQUFQO1FBQ0ksT0FBTztZQUNILGtCQUFrQixDQUFDLHdCQUF3QixFQUFFO1NBQ2hELENBQUM7SUFDTixDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBckNELENBQTZDLFNBQVMsR0FxQ3JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2UsIE1pZ3JhdGlvbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtDb250ZW50RW50cnksIENvbnRlbnRNYXJrZXJFbnRyeX0gZnJvbSAnLi4vLi4vY29udGVudC9kYi9zY2hlbWEnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIFJlY2VudGx5Vmlld2VkTWlncmF0aW9uIGV4dGVuZHMgTWlncmF0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcig5LCAyNCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMucXVlcmllcygpLm1hcCgocXVlcnkpID0+IGRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS50b1Byb21pc2UoKSkpO1xuICAgICAgICBhd2FpdCBkYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogQ29udGVudE1hcmtlckVudHJ5LlRBQkxFX05BTUVcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocm93czogQ29udGVudE1hcmtlckVudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKGFzeW5jIChyb3c6IENvbnRlbnRNYXJrZXJFbnRyeS5TY2hlbWFNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxEYXRhUm93ID0gcm93W0NvbnRlbnRNYXJrZXJFbnRyeS5DT0xVTU5fTkFNRV9EQVRBXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2FsRGF0YVJvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxEYXRhID0gSlNPTi5wYXJzZShsb2NhbERhdGFSb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9NSU1FX1RZUEVdID0gbG9jYWxEYXRhWydtaW1lVHlwZSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRNYXJrZXJFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogcm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudE1hcmtlckVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfSURFTlRJRklFUn0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbcm93W0NvbnRlbnRNYXJrZXJFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lERU5USUZJRVJdXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBxdWVyaWVzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgQ29udGVudE1hcmtlckVudHJ5LmdldEFsdGVyRW50cnlGb3JNaW1lVHlwZSgpXG4gICAgICAgIF07XG4gICAgfVxuXG59XG4iXX0=