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
import { GroupEntry } from '../../../group-deprecated/db/schema';
var TransportGroup = /** @class */ (function () {
    function TransportGroup(dbService) {
        this.dbService = dbService;
    }
    TransportGroup.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: GroupEntry.TABLE_NAME,
            useExternalDb: true
        }).toPromise().then(function (groups) {
            return _this.saveGroupsToDb(importContext, groups);
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportGroup.prototype.saveGroupsToDb = function (importContext, groups) {
        return __awaiter(this, void 0, void 0, function () {
            var imported, failed;
            var _this = this;
            return __generator(this, function (_a) {
                imported = 0;
                failed = 0;
                groups.forEach(function (group) { return __awaiter(_this, void 0, void 0, function () {
                    var existingGroup;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.dbService.read({
                                    table: GroupEntry.TABLE_NAME,
                                    selection: GroupEntry.COLUMN_NAME_GID + " = ?",
                                    selectionArgs: [group[GroupEntry.COLUMN_NAME_GID]],
                                    limit: '1'
                                }).toPromise()];
                            case 1:
                                existingGroup = _a.sent();
                                if (!(!existingGroup || !existingGroup.length)) return [3 /*break*/, 3];
                                if (!group[GroupEntry.COLUMN_NAME_CREATED_AT]) {
                                    group[GroupEntry.COLUMN_NAME_CREATED_AT] = Date.now();
                                }
                                return [4 /*yield*/, this.dbService.insert({
                                        table: GroupEntry.TABLE_NAME,
                                        modelJson: group
                                    }).toPromise()];
                            case 2:
                                _a.sent();
                                imported++;
                                return [3 /*break*/, 4];
                            case 3:
                                failed++;
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                importContext.failed = importContext.failed ? importContext.failed + failed : failed;
                importContext.imported = importContext.imported ? importContext.imported + imported : imported;
                return [2 /*return*/];
            });
        });
    };
    return TransportGroup;
}());
export { TransportGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGUvaGFuZGxlci9pbXBvcnQvdHJhbnNwb3J0LWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRS9EO0lBQ0ksd0JBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQUVNLGdDQUFPLEdBQWQsVUFBZSxhQUFtQztRQUFsRCxpQkFXQztRQVZHLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLEVBQUUsVUFBVSxDQUFDLFVBQVU7WUFDNUIsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQThCO1lBQy9DLE9BQU8sS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRWEsdUNBQWMsR0FBNUIsVUFBNkIsYUFBbUMsRUFBRSxNQUE4Qjs7Ozs7Z0JBQ3hGLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQU8sS0FBMkI7Ozs7b0NBQ0MscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0NBQ3BFLEtBQUssRUFBRSxVQUFVLENBQUMsVUFBVTtvQ0FDNUIsU0FBUyxFQUFLLFVBQVUsQ0FBQyxlQUFlLFNBQU07b0NBQzlDLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7b0NBQ2xELEtBQUssRUFBRSxHQUFHO2lDQUNiLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0NBTFIsYUFBYSxHQUEyQixTQUtoQztxQ0FDVixDQUFBLENBQUMsYUFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQSxFQUF2Qyx3QkFBdUM7Z0NBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7b0NBQzNDLEtBQUssQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7aUNBQ3pEO2dDQUNELHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3dDQUN4QixLQUFLLEVBQUUsVUFBVSxDQUFDLFVBQVU7d0NBQzVCLFNBQVMsRUFBRSxLQUFLO3FDQUNuQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dDQUhkLFNBR2MsQ0FBQztnQ0FDZixRQUFRLEVBQUUsQ0FBQzs7O2dDQUdYLE1BQU0sRUFBRSxDQUFDOzs7OztxQkFHaEIsQ0FBQyxDQUFDO2dCQUNILGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDckYsYUFBYSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOzs7O0tBQ2xHO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7SW1wb3J0UHJvZmlsZUNvbnRleHR9IGZyb20gJy4uLy4uL2RlZi9pbXBvcnQtcHJvZmlsZS1jb250ZXh0JztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0dyb3VwRW50cnl9IGZyb20gJy4uLy4uLy4uL2dyb3VwLWRlcHJlY2F0ZWQvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydEdyb3VwIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoaW1wb3J0Q29udGV4dDogSW1wb3J0UHJvZmlsZUNvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogR3JvdXBFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgdXNlRXh0ZXJuYWxEYjogdHJ1ZVxuICAgICAgICB9KS50b1Byb21pc2UoKS50aGVuKChncm91cHM6IEdyb3VwRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVHcm91cHNUb0RiKGltcG9ydENvbnRleHQsIGdyb3Vwcyk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGltcG9ydENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2F2ZUdyb3Vwc1RvRGIoaW1wb3J0Q29udGV4dDogSW1wb3J0UHJvZmlsZUNvbnRleHQsIGdyb3VwczogR3JvdXBFbnRyeS5TY2hlbWFNYXBbXSkge1xuICAgICAgICBsZXQgaW1wb3J0ZWQgPSAwO1xuICAgICAgICBsZXQgZmFpbGVkID0gMDtcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goYXN5bmMgKGdyb3VwOiBHcm91cEVudHJ5LlNjaGVtYU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdHcm91cDogR3JvdXBFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtHcm91cEVudHJ5LkNPTFVNTl9OQU1FX0dJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbZ3JvdXBbR3JvdXBFbnRyeS5DT0xVTU5fTkFNRV9HSURdXSxcbiAgICAgICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmICghZXhpc3RpbmdHcm91cCB8fCAhZXhpc3RpbmdHcm91cC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwW0dyb3VwRW50cnkuQ09MVU1OX05BTUVfQ1JFQVRFRF9BVF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBbR3JvdXBFbnRyeS5DT0xVTU5fTkFNRV9DUkVBVEVEX0FUXSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogZ3JvdXBcbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICBpbXBvcnRlZCsrO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZhaWxlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICBpbXBvcnRDb250ZXh0LmZhaWxlZCA9IGltcG9ydENvbnRleHQuZmFpbGVkID8gaW1wb3J0Q29udGV4dC5mYWlsZWQgKyBmYWlsZWQgOiBmYWlsZWQ7XG4gICAgICAgIGltcG9ydENvbnRleHQuaW1wb3J0ZWQgPSBpbXBvcnRDb250ZXh0LmltcG9ydGVkID8gaW1wb3J0Q29udGV4dC5pbXBvcnRlZCArIGltcG9ydGVkIDogaW1wb3J0ZWQ7XG4gICAgfVxuXG59XG4iXX0=