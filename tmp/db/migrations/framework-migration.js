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
import { ProfileEntry } from '../../profile/db/schema';
var FrameworkMigration = /** @class */ (function (_super) {
    __extends(FrameworkMigration, _super);
    function FrameworkMigration() {
        return _super.call(this, 18, 31) || this;
    }
    FrameworkMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.queries().forEach(function (query) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, dbService.execute(query).toPromise()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.updateProfileDB(dbService);
                return [2 /*return*/, undefined];
            });
        });
    };
    FrameworkMigration.prototype.queries = function () {
        return [ProfileEntry.getAlterEntryForProfileCategories()];
    };
    FrameworkMigration.prototype.updateProfileDB = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbService.read({
                                table: ProfileEntry.TABLE_NAME
                            }).toPromise()];
                    case 1:
                        entries = _a.sent();
                        entries.forEach(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            var categories, req;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        categories = this.getUpdateQueries(val);
                                        req = {};
                                        req[ProfileEntry.COLUMN_NAME_CATEGORIES] = JSON.stringify(categories);
                                        return [4 /*yield*/, dbService.update({
                                                table: ProfileEntry.TABLE_NAME,
                                                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                                                selectionArgs: [val.uid],
                                                modelJson: req
                                            }).toPromise()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log('error', e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FrameworkMigration.prototype.getUpdateQueries = function (entries) {
        var categories = {};
        categories['fwCategory1'] = entries.board;
        categories['fwCategory2'] = entries.medium;
        categories['fwCategory3'] = entries.grade;
        categories['fwCategory4'] = entries.subject;
        return categories;
    };
    return FrameworkMigration;
}(Migration));
export { FrameworkMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLW1pZ3JhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9taWdyYXRpb25zL2ZyYW1ld29yay1taWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxJQUFJLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBR3JEO0lBQXdDLHNDQUFTO0lBQzdDO2VBQ0ksa0JBQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRVksa0NBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBTyxLQUFLOzs7b0NBQy9CLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dDQUExQyxTQUEwQyxDQUFDOzs7O3FCQUM5QyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFaEMsc0JBQU8sU0FBUyxFQUFDOzs7S0FDcEI7SUFFRCxvQ0FBTyxHQUFQO1FBQ0ksT0FBTyxDQUFDLFlBQVksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVLLDRDQUFlLEdBQXJCLFVBQXNCLFNBQW9COzs7Ozs7Ozt3QkFFUSxxQkFBTSxTQUFTLENBQUMsSUFBSSxDQUFDO2dDQUMzRCxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7NkJBQy9CLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBRlYsT0FBTyxHQUE2QixTQUUxQjt3QkFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQU8sR0FBRzs7Ozs7d0NBQ2xCLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7d0NBQ3hDLEdBQUcsR0FBRyxFQUFFLENBQUM7d0NBQ2YsR0FBRyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7d0NBQ3RFLHFCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0RBQ3JCLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTtnREFDOUIsU0FBUyxFQUFLLFlBQVksQ0FBQyxlQUFlLFNBQU07Z0RBQ2hELGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0RBQ3hCLFNBQVMsRUFBRSxHQUFHOzZDQUNqQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dDQUxaLFNBS1ksQ0FBQzs7Ozs2QkFDZCxDQUFDLENBQUM7Ozs7d0JBRUwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBQyxDQUFDLENBQUM7Ozs7OztLQUUvQjtJQUVPLDZDQUFnQixHQUF4QixVQUF5QixPQUFPO1FBQzVCLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMxQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMxQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM1QyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBL0NELENBQXdDLFNBQVMsR0ErQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNaWdyYXRpb259IGZyb20gJy4uJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi9kZWYvZGItc2VydmljZSc7XG5pbXBvcnQge1Byb2ZpbGVFbnRyeX0gZnJvbSAnLi4vLi4vcHJvZmlsZS9kYi9zY2hlbWEnO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIEZyYW1ld29ya01pZ3JhdGlvbiBleHRlbmRzIE1pZ3JhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKDE4LCAzMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucXVlcmllcygpLmZvckVhY2goYXN5bmMgKHF1ZXJ5KSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBkYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2ZpbGVEQihkYlNlcnZpY2UpO1xuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIFtQcm9maWxlRW50cnkuZ2V0QWx0ZXJFbnRyeUZvclByb2ZpbGVDYXRlZ29yaWVzKCldO1xuICAgIH1cblxuICAgIGFzeW5jIHVwZGF0ZVByb2ZpbGVEQihkYlNlcnZpY2U6IERiU2VydmljZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW50cmllczogUHJvZmlsZUVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRVxuICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGFzeW5jICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gdGhpcy5nZXRVcGRhdGVRdWVyaWVzKHZhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0ge307XG4gICAgICAgICAgICAgICAgcmVxW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9DQVRFR09SSUVTXSA9IEpTT04uc3RyaW5naWZ5KGNhdGVnb3JpZXMpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgdGFibGU6IFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3ZhbC51aWRdLFxuICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiByZXFcbiAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VXBkYXRlUXVlcmllcyhlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB7fTtcbiAgICAgICAgY2F0ZWdvcmllc1snZndDYXRlZ29yeTEnXSA9IGVudHJpZXMuYm9hcmQ7XG4gICAgICAgIGNhdGVnb3JpZXNbJ2Z3Q2F0ZWdvcnkyJ10gPSBlbnRyaWVzLm1lZGl1bTtcbiAgICAgICAgY2F0ZWdvcmllc1snZndDYXRlZ29yeTMnXSA9IGVudHJpZXMuZ3JhZGU7XG4gICAgICAgIGNhdGVnb3JpZXNbJ2Z3Q2F0ZWdvcnk0J10gPSBlbnRyaWVzLnN1YmplY3Q7XG4gICAgICAgIHJldHVybiBjYXRlZ29yaWVzO1xuICAgIH1cbn0iXX0=