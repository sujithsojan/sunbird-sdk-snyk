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
import { defer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
var CourseRequestDelegate = /** @class */ (function () {
    function CourseRequestDelegate(defaultDelegate, authService, frameworkService, systemSettingsService) {
        this.defaultDelegate = defaultDelegate;
        this.authService = authService;
        this.frameworkService = frameworkService;
        this.systemSettingsService = systemSettingsService;
        this.ssoSectionIdMap = new Map();
    }
    CourseRequestDelegate.prototype.handle = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var isProfileLoggedIn, defaultChannelId, activeChannelId, isDefaultChannelProfile, sectionId, res, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.authService.getSession().toPromise()];
                    case 1:
                        isProfileLoggedIn = !!(_b.sent());
                        if (!isProfileLoggedIn) {
                            return [2 /*return*/, request];
                        }
                        return [4 /*yield*/, this.frameworkService.getDefaultChannelId().toPromise()];
                    case 2:
                        defaultChannelId = _b.sent();
                        activeChannelId = this.frameworkService.activeChannelId;
                        isDefaultChannelProfile = activeChannelId === defaultChannelId;
                        if (!!isDefaultChannelProfile) return [3 /*break*/, 7];
                        sectionId = void 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.systemSettingsService.getSystemSettings({
                                id: CourseRequestDelegate.SSO_COURSE_SECTION_ID
                            }).toPromise()];
                    case 4:
                        res = _b.sent();
                        sectionId = res && res.value;
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        if (sectionId) {
                            request.sections = (_a = {},
                                _a[sectionId] = {
                                    filters: {
                                        'batches.createdFor': [activeChannelId]
                                    }
                                },
                                _a);
                            this.ssoSectionIdMap.set(request.name + '-' + activeChannelId, sectionId);
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/, request];
                }
            });
        }); }).pipe(mergeMap(function (pageAssembleRequest) {
            return _this.defaultDelegate.handle(pageAssembleRequest);
        }), map(function (response) {
            var ssoPageSectionId = _this.ssoSectionIdMap.get(request.name + '-' + _this.frameworkService.activeChannelId);
            if (ssoPageSectionId) {
                response.ssoSectionId = ssoPageSectionId;
            }
            return response;
        }));
    };
    CourseRequestDelegate.SSO_COURSE_SECTION_ID = 'ssoCourseSection';
    return CourseRequestDelegate;
}());
export { CourseRequestDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLXJlcXVlc3QtZGVsZWdhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGFnZS9oYW5kbGUvZGVsZWdhdGVzL2NvdXJzZS1yZXF1ZXN0LWRlbGVnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBQyxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU03QztJQUtJLCtCQUNZLGVBQXVDLEVBQ3ZDLFdBQXdCLEVBQ3hCLGdCQUFrQyxFQUNsQyxxQkFBNEM7UUFINUMsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQU5oRCxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0lBUXBELENBQUM7SUFFRCxzQ0FBTSxHQUFOLFVBQU8sT0FBNkI7UUFBcEMsaUJBcURDO1FBcERHLE9BQU8sS0FBSyxDQUFDOzs7Ozs0QkFDb0IscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRFLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQStDLENBQUM7d0JBRTdFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTs0QkFDcEIsc0JBQU8sT0FBTyxFQUFDO3lCQUNsQjt3QkFFd0IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFoRixnQkFBZ0IsR0FBRyxTQUE2RDt3QkFDaEYsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFnQixDQUFDO3dCQUN6RCx1QkFBdUIsR0FBRyxlQUFlLEtBQUssZ0JBQWdCLENBQUM7NkJBRWpFLENBQUMsdUJBQXVCLEVBQXhCLHdCQUF3Qjt3QkFDcEIsU0FBUyxTQUFvQixDQUFDOzs7O3dCQUdsQixxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUM7Z0NBQzNELEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxxQkFBcUI7NkJBQ2xELENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBRlIsR0FBRyxHQUFHLFNBRUU7d0JBRWQsU0FBUyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDOzs7O3dCQUU3QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDOzs7d0JBR3JCLElBQUksU0FBUyxFQUFFOzRCQUNYLE9BQU8sQ0FBQyxRQUFRO2dDQUNaLEdBQUMsU0FBUyxJQUFHO29DQUNULE9BQU8sRUFBRTt3Q0FDTCxvQkFBb0IsRUFBRSxDQUFDLGVBQWUsQ0FBQztxQ0FDMUM7aUNBQ0o7bUNBQ0osQ0FBQzs0QkFFRixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7eUJBQzdFOzs0QkFHTCxzQkFBTyxPQUFPLEVBQUM7OzthQUNsQixDQUFDLENBQUMsSUFBSSxDQUNILFFBQVEsQ0FBQyxVQUFDLG1CQUFtQjtZQUN6QixPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLFVBQUMsUUFBUTtZQUNULElBQU0sZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTlHLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ2xCLFFBQVEsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7YUFDNUM7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQWpFdUIsMkNBQXFCLEdBQUcsa0JBQWtCLENBQUM7SUFrRXZFLDRCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0FuRVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7UGFnZUFzc2VtYmxlQ3JpdGVyaWF9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UGFnZUFzc2VtYmxlfSBmcm9tICcuLi8uLic7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBtZXJnZU1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEZWZhdWx0UmVxdWVzdERlbGVnYXRlfSBmcm9tICcuL2RlZmF1bHQtcmVxdWVzdC1kZWxlZ2F0ZSc7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9hdXRoJztcbmltcG9ydCB7RnJhbWV3b3JrU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrJztcbmltcG9ydCB7U3lzdGVtU2V0dGluZ3NTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zeXN0ZW0tc2V0dGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgQ291cnNlUmVxdWVzdERlbGVnYXRlIGltcGxlbWVudHMgQXBpUmVxdWVzdEhhbmRsZXI8UGFnZUFzc2VtYmxlQ3JpdGVyaWEsIFBhZ2VBc3NlbWJsZT4ge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNTT19DT1VSU0VfU0VDVElPTl9JRCA9ICdzc29Db3Vyc2VTZWN0aW9uJztcblxuICAgIHByaXZhdGUgc3NvU2VjdGlvbklkTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRlZmF1bHREZWxlZ2F0ZTogRGVmYXVsdFJlcXVlc3REZWxlZ2F0ZSxcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzeXN0ZW1TZXR0aW5nc1NlcnZpY2U6IFN5c3RlbVNldHRpbmdzU2VydmljZSxcbiAgICApIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdDogUGFnZUFzc2VtYmxlQ3JpdGVyaWEpOiBPYnNlcnZhYmxlPFBhZ2VBc3NlbWJsZT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNQcm9maWxlTG9nZ2VkSW4gPSAhIShhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFNlc3Npb24oKS50b1Byb21pc2UoKSk7XG5cbiAgICAgICAgICAgIGlmICghaXNQcm9maWxlTG9nZ2VkSW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdENoYW5uZWxJZCA9IGF3YWl0IHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXREZWZhdWx0Q2hhbm5lbElkKCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVDaGFubmVsSWQgPSB0aGlzLmZyYW1ld29ya1NlcnZpY2UuYWN0aXZlQ2hhbm5lbElkITtcbiAgICAgICAgICAgIGNvbnN0IGlzRGVmYXVsdENoYW5uZWxQcm9maWxlID0gYWN0aXZlQ2hhbm5lbElkID09PSBkZWZhdWx0Q2hhbm5lbElkO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGVmYXVsdENoYW5uZWxQcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zeXN0ZW1TZXR0aW5nc1NlcnZpY2UuZ2V0U3lzdGVtU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IENvdXJzZVJlcXVlc3REZWxlZ2F0ZS5TU09fQ09VUlNFX1NFQ1RJT05fSURcbiAgICAgICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbklkID0gcmVzICYmIHJlcy52YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNlY3Rpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgW3NlY3Rpb25JZF06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiYXRjaGVzLmNyZWF0ZWRGb3InOiBbYWN0aXZlQ2hhbm5lbElkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNzb1NlY3Rpb25JZE1hcC5zZXQocmVxdWVzdC5uYW1lICsgJy0nICsgYWN0aXZlQ2hhbm5lbElkLCBzZWN0aW9uSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgocGFnZUFzc2VtYmxlUmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHREZWxlZ2F0ZS5oYW5kbGUocGFnZUFzc2VtYmxlUmVxdWVzdCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzc29QYWdlU2VjdGlvbklkID0gdGhpcy5zc29TZWN0aW9uSWRNYXAuZ2V0KHJlcXVlc3QubmFtZSArICctJyArIHRoaXMuZnJhbWV3b3JrU2VydmljZS5hY3RpdmVDaGFubmVsSWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNzb1BhZ2VTZWN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3NvU2VjdGlvbklkID0gc3NvUGFnZVNlY3Rpb25JZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==