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
import { ProfileEntry, UserEntry } from '../../db/schema';
import { Response } from '../../../api';
var TransportUser = /** @class */ (function () {
    function TransportUser(dbService) {
        this.dbService = dbService;
    }
    TransportUser.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: UserEntry.TABLE_NAME,
            useExternalDb: true
        }).toPromise().then(function (users) {
            return _this.saveUsersToDb(importContext, users);
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportUser.prototype.saveUsersToDb = function (importContext, users) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                    var existingUser;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete user[UserEntry._ID];
                                return [4 /*yield*/, this.dbService.read({
                                        table: ProfileEntry.TABLE_NAME,
                                        selection: UserEntry.COLUMN_NAME_UID + " = ?",
                                        selectionArgs: [user[UserEntry.COLUMN_NAME_UID]],
                                        limit: '1'
                                    }).toPromise()];
                            case 1:
                                existingUser = _a.sent();
                                if (!(!existingUser || !existingUser.length)) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.dbService.insert({
                                        table: UserEntry.TABLE_NAME,
                                        modelJson: user
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
    return TransportUser;
}());
export { TransportUser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL2ltcG9ydC90cmFuc3BvcnQtdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdEM7SUFDSSx1QkFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUFlLGFBQW1DO1FBQWxELGlCQVdDO1FBVkcsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxTQUFTLENBQUMsVUFBVTtZQUMzQixhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBNEI7WUFDN0MsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztZQUM5QixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSxxQ0FBYSxHQUEzQixVQUE0QixhQUFtQyxFQUFFLEtBQTRCOzs7O2dCQUN6RixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQU8sSUFBeUI7Ozs7O2dDQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ2lCLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO3dDQUNsRSxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7d0NBQzlCLFNBQVMsRUFBSyxTQUFTLENBQUMsZUFBZSxTQUFNO3dDQUM3QyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dDQUNoRCxLQUFLLEVBQUUsR0FBRztxQ0FDYixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dDQUxSLFlBQVksR0FBMEIsU0FLOUI7cUNBQ1YsQ0FBQSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUEsRUFBckMsd0JBQXFDO2dDQUNyQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzt3Q0FDeEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxVQUFVO3dDQUMzQixTQUFTLEVBQUUsSUFBSTtxQ0FDbEIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOztnQ0FIZCxTQUdjLENBQUM7Ozs7O3FCQUV0QixDQUFDLENBQUM7Ozs7S0FFTjtJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0ltcG9ydFByb2ZpbGVDb250ZXh0fSBmcm9tICcuLi8uLi9kZWYvaW1wb3J0LXByb2ZpbGUtY29udGV4dCc7XG5pbXBvcnQge1Byb2ZpbGVFbnRyeSwgVXNlckVudHJ5fSBmcm9tICcuLi8uLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vYXBpJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydFVzZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShpbXBvcnRDb250ZXh0OiBJbXBvcnRQcm9maWxlQ29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBVc2VyRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHVzZUV4dGVybmFsRGI6IHRydWVcbiAgICAgICAgfSkudG9Qcm9taXNlKCkudGhlbigodXNlcnM6IFVzZXJFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZVVzZXJzVG9EYihpbXBvcnRDb250ZXh0LCB1c2Vycyk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGltcG9ydENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2F2ZVVzZXJzVG9EYihpbXBvcnRDb250ZXh0OiBJbXBvcnRQcm9maWxlQ29udGV4dCwgdXNlcnM6IFVzZXJFbnRyeS5TY2hlbWFNYXBbXSkge1xuICAgICAgICB1c2Vycy5mb3JFYWNoKGFzeW5jICh1c2VyOiBVc2VyRW50cnkuU2NoZW1hTWFwKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdXNlcltVc2VyRW50cnkuX0lEXTtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlcjogVXNlckVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICAgICAgdGFibGU6IFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7VXNlckVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdXNlcltVc2VyRW50cnkuQ09MVU1OX05BTUVfVUlEXV0sXG4gICAgICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nVXNlciB8fCAhZXhpc3RpbmdVc2VyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBVc2VyRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiB1c2VyXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG4iXX0=