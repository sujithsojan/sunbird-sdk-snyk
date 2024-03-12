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
import { GroupEntry, GroupProfileEntry, ProfileEntry } from '../../profile/db/schema';
import { ProfileSource } from '../../profile';
import { map } from 'rxjs/operators';
var GroupProfileMigration = /** @class */ (function (_super) {
    __extends(GroupProfileMigration, _super);
    function GroupProfileMigration() {
        return _super.call(this, 3, 18) || this;
    }
    GroupProfileMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, dbService.read({
                                table: ProfileEntry.TABLE_NAME,
                                columns: []
                            }).pipe(map(function (rows) {
                                rows.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (row[ProfileEntry.COLUMN_NAME_UID] === row[ProfileEntry.COLUMN_NAME_HANDLE]) {
                                                    row[ProfileEntry.COLUMN_NAME_SOURCE] = ProfileSource.SERVER.valueOf();
                                                }
                                                else {
                                                    row[ProfileEntry.COLUMN_NAME_SOURCE] = ProfileSource.LOCAL.valueOf();
                                                }
                                                return [4 /*yield*/, dbService.update({
                                                        table: ProfileEntry.TABLE_NAME,
                                                        modelJson: row
                                                    }).toPromise()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    GroupProfileMigration.prototype.queries = function () {
        return [
            GroupProfileEntry.getCreateEntry(),
            GroupEntry.getCreateEntry()
        ];
    };
    GroupProfileMigration.prototype.updateProfileTable = function () {
    };
    return GroupProfileMigration;
}(Migration));
export { GroupProfileMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcHJvZmlsZS1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9ncm91cC1wcm9maWxlLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DO0lBQTJDLHlDQUFTO0lBRWhEO2VBQ0ksa0JBQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVkscUNBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7Ozt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFPLEtBQUs7Ozs0Q0FDL0IscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0NBQTFDLFNBQTBDLENBQUM7Ozs7NkJBQzlDLENBQUMsQ0FBQzt3QkFFSCxxQkFBTSxTQUFTLENBQUMsSUFBSSxDQUFDO2dDQUNqQixLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7Z0NBQzlCLE9BQU8sRUFBRSxFQUFFOzZCQUNkLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsSUFBOEI7Z0NBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBTyxHQUEyQjs7OztnREFDM0MsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvREFDNUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7aURBRXpFO3FEQUFNO29EQUNILEdBQUcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lEQUN4RTtnREFDRCxxQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDO3dEQUNuQixLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7d0RBQzlCLFNBQVMsRUFBRSxHQUFHO3FEQUNqQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dEQUhkLFNBR2MsQ0FBQzs7OztxQ0FDbEIsQ0FBQyxDQUFDOzRCQUNQLENBQUMsQ0FBQyxDQUNMLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQWxCYixTQWtCYSxDQUFDO3dCQUVkLHNCQUFPLFNBQVMsRUFBQzs7OztLQUNwQjtJQUVELHVDQUFPLEdBQVA7UUFDSSxPQUFPO1lBQ0gsaUJBQWlCLENBQUMsY0FBYyxFQUFFO1lBQ2xDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7U0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFTyxrREFBa0IsR0FBMUI7SUFFQSxDQUFDO0lBR0wsNEJBQUM7QUFBRCxDQUFDLEFBOUNELENBQTJDLFNBQVMsR0E4Q25EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2UsIE1pZ3JhdGlvbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtHcm91cEVudHJ5LCBHcm91cFByb2ZpbGVFbnRyeSwgUHJvZmlsZUVudHJ5fSBmcm9tICcuLi8uLi9wcm9maWxlL2RiL3NjaGVtYSc7XG5pbXBvcnQge1Byb2ZpbGVTb3VyY2V9IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEdyb3VwUHJvZmlsZU1pZ3JhdGlvbiBleHRlbmRzIE1pZ3JhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoMywgMTgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhcHBseShkYlNlcnZpY2U6IERiU2VydmljZSkge1xuICAgICAgICB0aGlzLnF1ZXJpZXMoKS5mb3JFYWNoKGFzeW5jIChxdWVyeSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBkYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBjb2x1bW5zOiBbXVxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyb3dzOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goYXN5bmMgKHJvdzogUHJvZmlsZUVudHJ5LlNjaGVtYU1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdID09PSByb3dbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0hBTkRMRV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1tQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfU09VUkNFXSA9IFByb2ZpbGVTb3VyY2UuU0VSVkVSLnZhbHVlT2YoKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9TT1VSQ0VdID0gUHJvZmlsZVNvdXJjZS5MT0NBTC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IHJvd1xuICAgICAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBxdWVyaWVzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgR3JvdXBQcm9maWxlRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIEdyb3VwRW50cnkuZ2V0Q3JlYXRlRW50cnkoKVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUHJvZmlsZVRhYmxlKCkge1xuXG4gICAgfVxuXG5cbn1cbiJdfQ==