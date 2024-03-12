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
import { Response } from '../../../api';
import { KeyValueStoreEntry } from '../../../key-value-store/db/schema';
var TransportFrameworkNChannel = /** @class */ (function () {
    function TransportFrameworkNChannel(dbService) {
        this.dbService = dbService;
    }
    TransportFrameworkNChannel.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: KeyValueStoreEntry.TABLE_NAME,
            useExternalDb: true
        }).toPromise().then(function (keyValueStoreEntriesInExternalDb) {
            return _this.saveNoSqlEntryToDb(keyValueStoreEntriesInExternalDb);
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportFrameworkNChannel.prototype.saveNoSqlEntryToDb = function (keyValueStoreEntriesInExternalDb) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                keyValueStoreEntriesInExternalDb.forEach(function (keyValueStoreEntryInExternalDb) { return __awaiter(_this, void 0, void 0, function () {
                    var existingKeyvalueStore;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete keyValueStoreEntryInExternalDb[KeyValueStoreEntry._ID];
                                return [4 /*yield*/, this.dbService.read({
                                        table: KeyValueStoreEntry.TABLE_NAME,
                                        selection: KeyValueStoreEntry.COLUMN_NAME_KEY + " = ?",
                                        selectionArgs: [keyValueStoreEntryInExternalDb[KeyValueStoreEntry.COLUMN_NAME_KEY]],
                                        limit: '1'
                                    }).toPromise()];
                            case 1:
                                existingKeyvalueStore = _a.sent();
                                if (!(!existingKeyvalueStore || !existingKeyvalueStore.length)) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.dbService.insert({
                                        table: KeyValueStoreEntry.TABLE_NAME,
                                        modelJson: keyValueStoreEntryInExternalDb
                                    }).toPromise()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return TransportFrameworkNChannel;
}());
export { TransportFrameworkNChannel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LWZyYW1ld29yay1uLWNoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL2ltcG9ydC90cmFuc3BvcnQtZnJhbWV3b3JrLW4tY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRXRFO0lBQ0ksb0NBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQUVNLDRDQUFPLEdBQWQsVUFBZSxhQUFtQztRQUFsRCxpQkFXQztRQVZHLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLEVBQUUsa0JBQWtCLENBQUMsVUFBVTtZQUNwQyxhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsZ0NBQWdFO1lBQ2pGLE9BQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRWEsdURBQWtCLEdBQWhDLFVBQWlDLGdDQUFnRTs7OztnQkFDN0YsZ0NBQWdDLENBQUMsT0FBTyxDQUFDLFVBQU8sOEJBQTREOzs7OztnQ0FDeEcsT0FBTyw4QkFBOEIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDRCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzt3Q0FDbkYsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFVBQVU7d0NBQ3BDLFNBQVMsRUFBSyxrQkFBa0IsQ0FBQyxlQUFlLFNBQU07d0NBQ3RELGFBQWEsRUFBRSxDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO3dDQUNuRixLQUFLLEVBQUUsR0FBRztxQ0FDYixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dDQUxSLHFCQUFxQixHQUFrQyxTQUsvQztxQ0FDVixDQUFBLENBQUMscUJBQXFCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUEsRUFBdkQsd0JBQXVEO2dDQUN2RCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzt3Q0FDeEIsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFVBQVU7d0NBQ3BDLFNBQVMsRUFBRSw4QkFBOEI7cUNBQzVDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0NBSGQsU0FHYyxDQUFDOzs7OztxQkFFdEIsQ0FBQyxDQUFDOzs7O0tBRU47SUFJTCxpQ0FBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtJbXBvcnRQcm9maWxlQ29udGV4dH0gZnJvbSAnLi4vLi4vZGVmL2ltcG9ydC1wcm9maWxlLWNvbnRleHQnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7R3JvdXBQcm9maWxlRW50cnl9IGZyb20gJy4uLy4uLy4uL2dyb3VwLWRlcHJlY2F0ZWQvZGIvc2NoZW1hJztcbmltcG9ydCB7S2V5VmFsdWVTdG9yZUVudHJ5fSBmcm9tICcuLi8uLi8uLi9rZXktdmFsdWUtc3RvcmUvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydEZyYW1ld29ya05DaGFubmVsIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoaW1wb3J0Q29udGV4dDogSW1wb3J0UHJvZmlsZUNvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogS2V5VmFsdWVTdG9yZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICB1c2VFeHRlcm5hbERiOiB0cnVlXG4gICAgICAgIH0pLnRvUHJvbWlzZSgpLnRoZW4oKGtleVZhbHVlU3RvcmVFbnRyaWVzSW5FeHRlcm5hbERiOiBLZXlWYWx1ZVN0b3JlRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVOb1NxbEVudHJ5VG9EYihrZXlWYWx1ZVN0b3JlRW50cmllc0luRXh0ZXJuYWxEYik7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGltcG9ydENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2F2ZU5vU3FsRW50cnlUb0RiKGtleVZhbHVlU3RvcmVFbnRyaWVzSW5FeHRlcm5hbERiOiBLZXlWYWx1ZVN0b3JlRW50cnkuU2NoZW1hTWFwW10pIHtcbiAgICAgICAga2V5VmFsdWVTdG9yZUVudHJpZXNJbkV4dGVybmFsRGIuZm9yRWFjaChhc3luYyAoa2V5VmFsdWVTdG9yZUVudHJ5SW5FeHRlcm5hbERiOiBLZXlWYWx1ZVN0b3JlRW50cnkuU2NoZW1hTWFwKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUga2V5VmFsdWVTdG9yZUVudHJ5SW5FeHRlcm5hbERiW0tleVZhbHVlU3RvcmVFbnRyeS5fSURdO1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdLZXl2YWx1ZVN0b3JlOiBHcm91cFByb2ZpbGVFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBLZXlWYWx1ZVN0b3JlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0tleVZhbHVlU3RvcmVFbnRyeS5DT0xVTU5fTkFNRV9LRVl9ID0gP2AsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2tleVZhbHVlU3RvcmVFbnRyeUluRXh0ZXJuYWxEYltLZXlWYWx1ZVN0b3JlRW50cnkuQ09MVU1OX05BTUVfS0VZXV0sXG4gICAgICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nS2V5dmFsdWVTdG9yZSB8fCAhZXhpc3RpbmdLZXl2YWx1ZVN0b3JlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBLZXlWYWx1ZVN0b3JlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBrZXlWYWx1ZVN0b3JlRW50cnlJbkV4dGVybmFsRGJcbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuXG59XG4iXX0=