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
import { map } from 'rxjs/operators';
var OfflineSearchTextbookMigration = /** @class */ (function (_super) {
    __extends(OfflineSearchTextbookMigration, _super);
    function OfflineSearchTextbookMigration() {
        return _super.call(this, 6, 21) || this;
    }
    OfflineSearchTextbookMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, dbService.read({
                                table: ContentEntry.TABLE_NAME,
                                selection: ContentEntry.COLUMN_NAME_CONTENT_TYPE + " = ?",
                                selectionArgs: ['textbook']
                            }).pipe(map(function (rows) {
                                rows.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                    var localDataRow, localData;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                localDataRow = row[ContentEntry.COLUMN_NAME_LOCAL_DATA];
                                                if (!localDataRow) return [3 /*break*/, 2];
                                                localData = JSON.parse(localDataRow);
                                                row[ContentEntry.COLUMN_NAME_BOARD] = ContentUtil.getContentAttribute(localData['board']);
                                                row[ContentEntry.COLUMN_NAME_MEDIUM] = ContentUtil.getContentAttribute(localData['medium']);
                                                row[ContentEntry.COLUMN_NAME_GRADE] = ContentUtil.getContentAttribute(localData['gradeLevel']);
                                                return [4 /*yield*/, dbService.update({
                                                        table: ContentEntry.TABLE_NAME,
                                                        modelJson: row,
                                                        selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                                        selectionArgs: [row[ContentEntry.COLUMN_NAME_IDENTIFIER]]
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
    OfflineSearchTextbookMigration.prototype.queries = function () {
        return [ContentEntry.getAlterEntryForBoard(),
            ContentEntry.getAlterEntryForMedium(),
            ContentEntry.getAlterEntryForGrade()];
    };
    return OfflineSearchTextbookMigration;
}(Migration));
export { OfflineSearchTextbookMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS1zZWFyY2gtdGV4dGJvb2stbWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL21pZ3JhdGlvbnMvb2ZmbGluZS1zZWFyY2gtdGV4dGJvb2stbWlncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQVksU0FBUyxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDNUQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DO0lBQW9ELGtEQUFTO0lBRXpEO2VBQ0ksa0JBQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVksOENBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7OzRCQUNuQyxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFwQyxDQUFvQyxDQUFDLENBQUMsRUFBQTs7d0JBQXRGLFNBQXNGLENBQUM7d0JBQ3ZGLHFCQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0NBQ2pCLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTtnQ0FDOUIsU0FBUyxFQUFLLFlBQVksQ0FBQyx3QkFBd0IsU0FBTTtnQ0FDekQsYUFBYSxFQUFFLENBQUMsVUFBVSxDQUFDOzZCQUM5QixDQUFDLENBQUMsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFDLElBQThCO2dDQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQU8sR0FBMkI7Ozs7O2dEQUNyQyxZQUFZLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3FEQUMxRCxZQUFZLEVBQVosd0JBQVk7Z0RBQ04sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0RBQzNDLEdBQUcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0RBQzFGLEdBQUcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0RBQzVGLEdBQUcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0RBQy9GLHFCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0RBQ25CLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTt3REFDOUIsU0FBUyxFQUFFLEdBQUc7d0RBQ2QsU0FBUyxFQUFLLFlBQVksQ0FBQyxzQkFBc0IsU0FBTTt3REFDdkQsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3FEQUM1RCxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dEQUxkLFNBS2MsQ0FBQzs7Ozs7cUNBRXRCLENBQUMsQ0FBQzs0QkFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkF0QmIsU0FzQmEsQ0FBQzt3QkFFZCxzQkFBTyxTQUFTLEVBQUM7Ozs7S0FDcEI7SUFFRCxnREFBTyxHQUFQO1FBQ0ksT0FBTyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtZQUN4QyxZQUFZLENBQUMsc0JBQXNCLEVBQUU7WUFDckMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUwscUNBQUM7QUFBRCxDQUFDLEFBekNELENBQW9ELFNBQVMsR0F5QzVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2UsIE1pZ3JhdGlvbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIE9mZmxpbmVTZWFyY2hUZXh0Ym9va01pZ3JhdGlvbiBleHRlbmRzIE1pZ3JhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoNiwgMjEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhcHBseShkYlNlcnZpY2U6IERiU2VydmljZSkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLnF1ZXJpZXMoKS5tYXAoKHF1ZXJ5KSA9PiBkYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCkpKTtcbiAgICAgICAgYXdhaXQgZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IENvbnRlbnRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9UWVBFfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogWyd0ZXh0Ym9vayddXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJvd3M6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChhc3luYyAocm93OiBDb250ZW50RW50cnkuU2NoZW1hTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YVJvdyA9IHJvd1tDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbERhdGFSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UobG9jYWxEYXRhUm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1tDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQk9BUkRdID0gQ29udGVudFV0aWwuZ2V0Q29udGVudEF0dHJpYnV0ZShsb2NhbERhdGFbJ2JvYXJkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9NRURJVU1dID0gQ29udGVudFV0aWwuZ2V0Q29udGVudEF0dHJpYnV0ZShsb2NhbERhdGFbJ21lZGl1bSddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1tDb250ZW50RW50cnkuQ09MVU1OX05BTUVfR1JBREVdID0gQ29udGVudFV0aWwuZ2V0Q29udGVudEF0dHJpYnV0ZShsb2NhbERhdGFbJ2dyYWRlTGV2ZWwnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiByb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbcm93W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIFtDb250ZW50RW50cnkuZ2V0QWx0ZXJFbnRyeUZvckJvYXJkKCksXG4gICAgICAgICAgICBDb250ZW50RW50cnkuZ2V0QWx0ZXJFbnRyeUZvck1lZGl1bSgpLFxuICAgICAgICAgICAgQ29udGVudEVudHJ5LmdldEFsdGVyRW50cnlGb3JHcmFkZSgpXTtcbiAgICB9XG5cbn1cbiJdfQ==