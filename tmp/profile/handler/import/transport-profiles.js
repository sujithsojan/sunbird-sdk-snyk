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
import { ProfileEntry } from '../../db/schema';
import { Response } from '../../../api';
var TransportProfiles = /** @class */ (function () {
    function TransportProfiles(dbService) {
        this.dbService = dbService;
    }
    TransportProfiles.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: ProfileEntry.TABLE_NAME,
            orderBy: ProfileEntry.COLUMN_NAME_HANDLE + " asc",
            useExternalDb: true
        }).toPromise().then(function (profiles) {
            return _this.saveProfilesToDb(importContext, profiles);
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportProfiles.prototype.saveProfilesToDb = function (importContext, profiles) {
        return __awaiter(this, void 0, void 0, function () {
            var imported, failed, _i, profiles_1, profile, existingProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imported = 0;
                        failed = 0;
                        _i = 0, profiles_1 = profiles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < profiles_1.length)) return [3 /*break*/, 6];
                        profile = profiles_1[_i];
                        return [4 /*yield*/, this.dbService.read({
                                table: ProfileEntry.TABLE_NAME,
                                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                                selectionArgs: [profile[ProfileEntry.COLUMN_NAME_UID]],
                                limit: '1'
                            }).toPromise()];
                    case 2:
                        existingProfile = _a.sent();
                        if (!(!existingProfile || !existingProfile.length)) return [3 /*break*/, 4];
                        if (!profile[ProfileEntry.COLUMN_NAME_CREATED_AT]) {
                            profile[ProfileEntry.COLUMN_NAME_CREATED_AT] = new Date().getTime();
                        }
                        delete profile[ProfileEntry._ID];
                        return [4 /*yield*/, this.dbService.insert({
                                table: ProfileEntry.TABLE_NAME,
                                modelJson: profile
                            }).toPromise()];
                    case 3:
                        _a.sent();
                        imported++;
                        importContext.imported = imported;
                        return [3 /*break*/, 5];
                    case 4:
                        failed++;
                        importContext.failed = failed;
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        importContext.failed = failed;
                        importContext.imported = imported;
                        return [2 /*return*/];
                }
            });
        });
    };
    return TransportProfiles;
}());
export { TransportProfiles };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LXByb2ZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGUvaGFuZGxlci9pbXBvcnQvdHJhbnNwb3J0LXByb2ZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDO0lBQ0ksMkJBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxhQUFtQztRQUFsRCxpQkFZQztRQVhHLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7WUFDOUIsT0FBTyxFQUFLLFlBQVksQ0FBQyxrQkFBa0IsU0FBTTtZQUNqRCxhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBa0M7WUFDbkQsT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLFFBQVEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1lBQzlCLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDRDQUFnQixHQUE5QixVQUErQixhQUFtQyxFQUFFLFFBQWtDOzs7Ozs7d0JBQzlGLFFBQVEsR0FBRyxDQUFDLENBQUM7d0JBQ2IsTUFBTSxHQUFHLENBQUMsQ0FBQzs4QkFDZSxFQUFSLHFCQUFROzs7NkJBQVIsQ0FBQSxzQkFBUSxDQUFBO3dCQUFuQixPQUFPO3dCQUNvQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQ0FDeEUsS0FBSyxFQUFFLFlBQVksQ0FBQyxVQUFVO2dDQUM5QixTQUFTLEVBQUssWUFBWSxDQUFDLGVBQWUsU0FBTTtnQ0FDaEQsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQ0FDdEQsS0FBSyxFQUFFLEdBQUc7NkJBQ2IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFMUixlQUFlLEdBQTZCLFNBS3BDOzZCQUVWLENBQUEsQ0FBQyxlQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFBLEVBQTNDLHdCQUEyQzt3QkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsRUFBRTs0QkFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQ3ZFO3dCQUNELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakMscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0NBQ3hCLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTtnQ0FDOUIsU0FBUyxFQUFFLE9BQU87NkJBQ3JCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBSGQsU0FHYyxDQUFDO3dCQUNmLFFBQVEsRUFBRSxDQUFDO3dCQUNYLGFBQWEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOzs7d0JBRWxDLE1BQU0sRUFBRSxDQUFDO3dCQUNULGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzs7d0JBckJoQixJQUFRLENBQUE7Ozt3QkF3QjlCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO3dCQUM5QixhQUFhLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7Ozs7S0FDckM7SUFFTCx3QkFBQztBQUFELENBQUMsQUFqREQsSUFpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtJbXBvcnRQcm9maWxlQ29udGV4dH0gZnJvbSAnLi4vLi4vZGVmL2ltcG9ydC1wcm9maWxlLWNvbnRleHQnO1xuaW1wb3J0IHtQcm9maWxlRW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNwb3J0UHJvZmlsZXMge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShpbXBvcnRDb250ZXh0OiBJbXBvcnRQcm9maWxlQ29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIG9yZGVyQnk6IGAke1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9IQU5ETEV9IGFzY2AsXG4gICAgICAgICAgICB1c2VFeHRlcm5hbERiOiB0cnVlXG4gICAgICAgIH0pLnRvUHJvbWlzZSgpLnRoZW4oKHByb2ZpbGVzOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVQcm9maWxlc1RvRGIoaW1wb3J0Q29udGV4dCwgcHJvZmlsZXMpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBpbXBvcnRDb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHNhdmVQcm9maWxlc1RvRGIoaW1wb3J0Q29udGV4dDogSW1wb3J0UHJvZmlsZUNvbnRleHQsIHByb2ZpbGVzOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pIHtcbiAgICAgICAgbGV0IGltcG9ydGVkID0gMDtcbiAgICAgICAgbGV0IGZhaWxlZCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgcHJvZmlsZSBvZiBwcm9maWxlcykge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdQcm9maWxlOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10gPSBhd2FpdCB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgICAgICB0YWJsZTogUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtwcm9maWxlW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdXSxcbiAgICAgICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgaWYgKCFleGlzdGluZ1Byb2ZpbGUgfHwgIWV4aXN0aW5nUHJvZmlsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByb2ZpbGVbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0NSRUFURURfQVRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0NSRUFURURfQVRdID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9maWxlW1Byb2ZpbGVFbnRyeS5fSURdO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBwcm9maWxlXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgaW1wb3J0ZWQrKztcbiAgICAgICAgICAgICAgICBpbXBvcnRDb250ZXh0LmltcG9ydGVkID0gaW1wb3J0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZhaWxlZCsrO1xuICAgICAgICAgICAgICAgIGltcG9ydENvbnRleHQuZmFpbGVkID0gZmFpbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGltcG9ydENvbnRleHQuZmFpbGVkID0gZmFpbGVkO1xuICAgICAgICBpbXBvcnRDb250ZXh0LmltcG9ydGVkID0gaW1wb3J0ZWQ7XG4gICAgfVxuXG59XG4iXX0=