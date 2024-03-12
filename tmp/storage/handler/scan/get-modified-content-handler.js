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
import { ContentEntry } from '../../../content/db/schema';
import { ContentUtil } from '../../../content/util/content-util';
import { ArrayUtil } from '../../../util/array-util';
import { defer } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
var GetModifiedContentHandler = /** @class */ (function () {
    function GetModifiedContentHandler(fileService, dbService) {
        this.fileService = fileService;
        this.dbService = dbService;
    }
    GetModifiedContentHandler.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var dbContentIdentifiers, destination, folderList, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getContentsInDb()];
                    case 1:
                        dbContentIdentifiers = _c.sent();
                        if (!context.currentStoragePath) return [3 /*break*/, 5];
                        destination = ContentUtil.getContentRootDir(context.currentStoragePath).concat('/');
                        if (window.device.platform.toLowerCase() === "ios") {
                            destination = "file://" + destination;
                        }
                        return [4 /*yield*/, this.getFolderList(destination)];
                    case 2:
                        folderList = _c.sent();
                        _a = context;
                        return [4 /*yield*/, this.getNewlyAddedContents(folderList, dbContentIdentifiers)];
                    case 3:
                        _a.newlyAddedIdentifiers = _c.sent();
                        _b = context;
                        return [4 /*yield*/, this.getDeletedContents(folderList, dbContentIdentifiers)];
                    case 4:
                        _b.deletedIdentifiers = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        context.newlyAddedIdentifiers = [];
                        context.deletedIdentifiers = dbContentIdentifiers;
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); }).pipe(mapTo(context));
    };
    GetModifiedContentHandler.prototype.doesDestinationStorageExist = function (destination) {
        return this.fileService.exists(destination).then(function (entry) {
            return true;
        }).catch(function () {
            return false;
        });
    };
    GetModifiedContentHandler.prototype.getContentsInDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dbService.execute(ContentUtil.getFindAllContentsQuery()).pipe(map(function (contentsInDb) {
                        var dbContentIdentifiers = contentsInDb
                            .filter(function (contentInDb) {
                            return contentInDb[ContentEntry.COLUMN_NAME_CONTENT_TYPE].toLowerCase() !== 'textbookunit';
                        }).map(function (contentInDb) {
                            return contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER];
                        });
                        return dbContentIdentifiers;
                    })).toPromise()];
            });
        });
    };
    GetModifiedContentHandler.prototype.getNewlyAddedContents = function (folderList, contentIdentifiers) {
        return folderList.filter(function (element) { return !ArrayUtil.contains(contentIdentifiers, element); });
    };
    GetModifiedContentHandler.prototype.getDeletedContents = function (folderList, contentIdentifiers) {
        return contentIdentifiers.filter(function (element) { return !ArrayUtil.contains(folderList, element); });
    };
    GetModifiedContentHandler.prototype.getFolderList = function (destination) {
        return this.fileService.listDir(destination.replace(/\/$/, ''))
            .then(function (entries) {
            var folderList = entries.map(function (entry) {
                return entry.name;
            });
            return folderList;
        }).catch(function () {
            return [];
        });
    };
    return GetModifiedContentHandler;
}());
export { GetModifiedContentHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW1vZGlmaWVkLWNvbnRlbnQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdG9yYWdlL2hhbmRsZXIvc2Nhbi9nZXQtbW9kaWZpZWQtY29udGVudC1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQztJQUNJLG1DQUFvQixXQUF3QixFQUN4QixTQUFvQjtRQURwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRXhDLENBQUM7SUFFTSwyQ0FBTyxHQUFkLFVBQWUsT0FBMkI7UUFBMUMsaUJBa0JDO1FBakJHLE9BQU8sS0FBSyxDQUFDOzs7OzRCQUNvQixxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUFuRCxvQkFBb0IsR0FBRyxTQUE0Qjs2QkFDckQsT0FBTyxDQUFDLGtCQUFrQixFQUExQix3QkFBMEI7d0JBQ3RCLFdBQVcsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN4RixJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTs0QkFDL0MsV0FBVyxHQUFHLFNBQVMsR0FBQyxXQUFXLENBQUM7eUJBQ3ZD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Q1gsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQXBFRCxJQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7U2NhbkNvbnRlbnRDb250ZXh0fSBmcm9tICcuLi8uLi9kZWYvc2Nhbi1yZXF1ZXN0cyc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBtYXBUb30gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgR2V0TW9kaWZpZWRDb250ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoY29udGV4dDogU2NhbkNvbnRlbnRDb250ZXh0KTogT2JzZXJ2YWJsZTxTY2FuQ29udGVudENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRiQ29udGVudElkZW50aWZpZXJzID0gYXdhaXQgdGhpcy5nZXRDb250ZW50c0luRGIoKTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmN1cnJlbnRTdG9yYWdlUGF0aCkge1xuICAgICAgICAgICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IENvbnRlbnRVdGlsLmdldENvbnRlbnRSb290RGlyKGNvbnRleHQuY3VycmVudFN0b3JhZ2VQYXRoKS5jb25jYXQoJy8nKTtcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBcImZpbGU6Ly9cIitkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyTGlzdCA9IGF3YWl0IHRoaXMuZ2V0Rm9sZGVyTGlzdChkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5uZXdseUFkZGVkSWRlbnRpZmllcnMgPSBhd2FpdCB0aGlzLmdldE5ld2x5QWRkZWRDb250ZW50cyhmb2xkZXJMaXN0LCBkYkNvbnRlbnRJZGVudGlmaWVycyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kZWxldGVkSWRlbnRpZmllcnMgPSBhd2FpdCB0aGlzLmdldERlbGV0ZWRDb250ZW50cyhmb2xkZXJMaXN0LCBkYkNvbnRlbnRJZGVudGlmaWVycyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubmV3bHlBZGRlZElkZW50aWZpZXJzID0gW107XG4gICAgICAgICAgICAgICAgY29udGV4dC5kZWxldGVkSWRlbnRpZmllcnMgPSBkYkNvbnRlbnRJZGVudGlmaWVycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKGNvbnRleHQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb2VzRGVzdGluYXRpb25TdG9yYWdlRXhpc3QoZGVzdGluYXRpb246IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5leGlzdHMoZGVzdGluYXRpb24pLnRoZW4oKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRDb250ZW50c0luRGIoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKENvbnRlbnRVdGlsLmdldEZpbmRBbGxDb250ZW50c1F1ZXJ5KCkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbnRlbnRzSW5EYjogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGJDb250ZW50SWRlbnRpZmllcnM6IHN0cmluZ1tdID0gY29udGVudHNJbkRiXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGNvbnRlbnRJbkRiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfVFlQRV0udG9Mb3dlckNhc2UoKSAhPT0gJ3RleHRib29rdW5pdCc7XG4gICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoY29udGVudEluRGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYkNvbnRlbnRJZGVudGlmaWVycztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXdseUFkZGVkQ29udGVudHMoZm9sZGVyTGlzdDogc3RyaW5nW10sIGNvbnRlbnRJZGVudGlmaWVyczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBmb2xkZXJMaXN0LmZpbHRlcihlbGVtZW50ID0+ICFBcnJheVV0aWwuY29udGFpbnMoY29udGVudElkZW50aWZpZXJzLCBlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWxldGVkQ29udGVudHMoZm9sZGVyTGlzdDogc3RyaW5nW10sIGNvbnRlbnRJZGVudGlmaWVyczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBjb250ZW50SWRlbnRpZmllcnMuZmlsdGVyKGVsZW1lbnQgPT4gIUFycmF5VXRpbC5jb250YWlucyhmb2xkZXJMaXN0LCBlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGb2xkZXJMaXN0KGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmxpc3REaXIoZGVzdGluYXRpb24ucmVwbGFjZSgvXFwvJC8sICcnKSlcbiAgICAgICAgICAgIC50aGVuKChlbnRyaWVzOiBFbnRyeVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyTGlzdDogc3RyaW5nW10gPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5Lm5hbWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvbGRlckxpc3Q7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19