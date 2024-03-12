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
import { GroupProfileEntry } from '../../../group-deprecated/db/schema';
var TransportGroupProfile = /** @class */ (function () {
    function TransportGroupProfile(dbService) {
        this.dbService = dbService;
    }
    TransportGroupProfile.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: GroupProfileEntry.TABLE_NAME,
            useExternalDb: true
        }).toPromise().then(function (groupProfiles) {
            return _this.saveGroupProfilesToDb(importContext, groupProfiles);
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportGroupProfile.prototype.saveGroupProfilesToDb = function (importContext, groupProfiles) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                groupProfiles.forEach(function (groupProfile) { return __awaiter(_this, void 0, void 0, function () {
                    var existingGroupProfile;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete groupProfile[GroupProfileEntry._ID];
                                return [4 /*yield*/, this.dbService.read({
                                        table: GroupProfileEntry.TABLE_NAME,
                                        selection: GroupProfileEntry.COLUMN_NAME_GID + " = ? AND " + GroupProfileEntry.COLUMN_NAME_UID + " = ?",
                                        selectionArgs: [groupProfiles[GroupProfileEntry.COLUMN_NAME_GID], groupProfile[GroupProfileEntry.COLUMN_NAME_UID]],
                                        limit: '1'
                                    }).toPromise()];
                            case 1:
                                existingGroupProfile = _a.sent();
                                if (!(!existingGroupProfile || !existingGroupProfile.length)) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.dbService.insert({
                                        table: GroupProfileEntry.TABLE_NAME,
                                        modelJson: groupProfile
                                    })];
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
    return TransportGroupProfile;
}());
export { TransportGroupProfile };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LWdyb3VwLXByb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL2ltcG9ydC90cmFuc3BvcnQtZ3JvdXAtcHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRXRFO0lBQ0ksK0JBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQUVNLHVDQUFPLEdBQWQsVUFBZSxhQUFtQztRQUFsRCxpQkFXQztRQVZHLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLEVBQUUsaUJBQWlCLENBQUMsVUFBVTtZQUNuQyxhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsYUFBNEM7WUFDN0QsT0FBTyxLQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLFFBQVEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1lBQzlCLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLHFEQUFxQixHQUFuQyxVQUFvQyxhQUFtQyxFQUFFLGFBQTRDOzs7O2dCQUNqSCxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQU8sWUFBeUM7Ozs7O2dDQUNsRSxPQUFPLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDaUIscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7d0NBQ2xGLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxVQUFVO3dDQUNuQyxTQUFTLEVBQUssaUJBQWlCLENBQUMsZUFBZSxpQkFBWSxpQkFBaUIsQ0FBQyxlQUFlLFNBQU07d0NBQ2xHLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsRUFBRSxZQUFZLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7d0NBQ2xILEtBQUssRUFBRSxHQUFHO3FDQUNiLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0NBTFIsb0JBQW9CLEdBQWtDLFNBSzlDO3FDQUNWLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQSxFQUFyRCx3QkFBcUQ7Z0NBQ3JELHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3dDQUN4QixLQUFLLEVBQUUsaUJBQWlCLENBQUMsVUFBVTt3Q0FDbkMsU0FBUyxFQUFFLFlBQVk7cUNBQzFCLENBQUMsRUFBQTs7Z0NBSEYsU0FHRSxDQUFDOzs7OztxQkFFVixDQUFDLENBQUM7Ozs7S0FFTjtJQUVMLDRCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0ltcG9ydFByb2ZpbGVDb250ZXh0fSBmcm9tICcuLi8uLi9kZWYvaW1wb3J0LXByb2ZpbGUtY29udGV4dCc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtHcm91cFByb2ZpbGVFbnRyeX0gZnJvbSAnLi4vLi4vLi4vZ3JvdXAtZGVwcmVjYXRlZC9kYi9zY2hlbWEnO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNwb3J0R3JvdXBQcm9maWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoaW1wb3J0Q29udGV4dDogSW1wb3J0UHJvZmlsZUNvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogR3JvdXBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHVzZUV4dGVybmFsRGI6IHRydWVcbiAgICAgICAgfSkudG9Qcm9taXNlKCkudGhlbigoZ3JvdXBQcm9maWxlczogR3JvdXBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVHcm91cFByb2ZpbGVzVG9EYihpbXBvcnRDb250ZXh0LCBncm91cFByb2ZpbGVzKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gaW1wb3J0Q29udGV4dDtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzYXZlR3JvdXBQcm9maWxlc1RvRGIoaW1wb3J0Q29udGV4dDogSW1wb3J0UHJvZmlsZUNvbnRleHQsIGdyb3VwUHJvZmlsZXM6IEdyb3VwUHJvZmlsZUVudHJ5LlNjaGVtYU1hcFtdKSB7XG4gICAgICAgIGdyb3VwUHJvZmlsZXMuZm9yRWFjaChhc3luYyAoZ3JvdXBQcm9maWxlOiBHcm91cFByb2ZpbGVFbnRyeS5TY2hlbWFNYXApID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBncm91cFByb2ZpbGVbR3JvdXBQcm9maWxlRW50cnkuX0lEXTtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nR3JvdXBQcm9maWxlOiBHcm91cFByb2ZpbGVFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7R3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfR0lEfSA9ID8gQU5EICR7R3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtncm91cFByb2ZpbGVzW0dyb3VwUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0dJRF0sIGdyb3VwUHJvZmlsZVtHcm91cFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdXSxcbiAgICAgICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmICghZXhpc3RpbmdHcm91cFByb2ZpbGUgfHwgIWV4aXN0aW5nR3JvdXBQcm9maWxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IGdyb3VwUHJvZmlsZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuIl19