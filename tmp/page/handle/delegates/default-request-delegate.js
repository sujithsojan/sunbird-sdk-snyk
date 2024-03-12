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
import { HttpRequestType, Request } from '../../../api';
import { PageName } from '../..';
import { CachedItemRequestSourceFrom } from '../../../key-value-store';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { defer } from 'rxjs';
import * as SHA1 from 'crypto-js/sha1';
import { PageAssembleKeys } from '../../../preference-keys';
var DefaultRequestDelegate = /** @class */ (function () {
    function DefaultRequestDelegate(apiService, pageApiServiceConfig, sharedPreferences, cachedItemStore, keyValueStore, authService, profileService, systemSettingsService) {
        this.apiService = apiService;
        this.pageApiServiceConfig = pageApiServiceConfig;
        this.sharedPreferences = sharedPreferences;
        this.cachedItemStore = cachedItemStore;
        this.keyValueStore = keyValueStore;
        this.authService = authService;
        this.profileService = profileService;
        this.systemSettingsService = systemSettingsService;
        this.PAGE_ASSEMBLE_LOCAL_KEY = 'page_assemble-';
        this.PAGE_ASSEMBLE_ENDPOINT = '/page/assemble?orgdetails=orgName';
        this.DIALCODE_ASSEMBLE_ENDPOINT = '/dial/assemble';
    }
    DefaultRequestDelegate.getIdForDb = function (request) {
        var key = request.name + '-' +
            (request.organisationId || '') + '-' +
            (request.source || 'app') + '-' +
            (request.mode || '') + '-' +
            (request.filters ? SHA1(JSON.stringify(request.filters)).toString() : '') +
            (request.sections ? SHA1(JSON.stringify(request.sections)).toString() : '');
        return key;
    };
    DefaultRequestDelegate.prototype.handle = function (request) {
        var _this = this;
        request.from = request.from || CachedItemRequestSourceFrom.CACHE;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var overriddenPageAssembleChannelId, isSsoUser, tenantCoursePageConfig, overrideConfig;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.name !== PageName.COURSE) {
                            return [2 /*return*/, request];
                        }
                        return [4 /*yield*/, this.sharedPreferences.getString(PageAssembleKeys.KEY_ORGANISATION_ID).toPromise()];
                    case 1:
                        overriddenPageAssembleChannelId = _a.sent();
                        if (!overriddenPageAssembleChannelId) {
                            return [2 /*return*/, request];
                        }
                        isSsoUser = function () { return __awaiter(_this, void 0, void 0, function () {
                            var isProfileLoggedIn, isDefaultChannelProfile;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.authService.getSession().toPromise()];
                                    case 1:
                                        isProfileLoggedIn = !!(_a.sent());
                                        return [4 /*yield*/, this.profileService.isDefaultChannelProfile().toPromise()];
                                    case 2:
                                        isDefaultChannelProfile = _a.sent();
                                        return [2 /*return*/, isProfileLoggedIn && !isDefaultChannelProfile];
                                }
                            });
                        }); };
                        return [4 /*yield*/, isSsoUser()];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, request];
                        }
                        return [4 /*yield*/, this.systemSettingsService
                                .getSystemSettings({ id: DefaultRequestDelegate.SYSTEM_SETTINGS_TENANT_COURSE_PAGE_ID })
                                .toPromise()
                                .then(function (response) {
                                try {
                                    return JSON.parse(response.value);
                                }
                                catch (e) {
                                    console.error(e);
                                    return [];
                                }
                            })];
                    case 3:
                        tenantCoursePageConfig = _a.sent();
                        request.organisationId = overriddenPageAssembleChannelId;
                        overrideConfig = tenantCoursePageConfig
                            .find(function (config) { return config.channelId === overriddenPageAssembleChannelId; });
                        if (overrideConfig) {
                            request.name = overrideConfig.page;
                        }
                        return [2 /*return*/, request];
                }
            });
        }); }).pipe(mergeMap(function (adaptedRequest) {
            if (adaptedRequest.from === CachedItemRequestSourceFrom.SERVER) {
                return _this.fetchFromServer(adaptedRequest).pipe(catchError(function () {
                    return _this.fetchFromCache(adaptedRequest);
                }));
            }
            return _this.fetchFromCache(adaptedRequest);
        }));
    };
    DefaultRequestDelegate.prototype.fetchFromServer = function (request) {
        var _this = this;
        var pageAssembleEndPoint = request.name === PageName.DIAL_CODE ? this.DIALCODE_ASSEMBLE_ENDPOINT : this.PAGE_ASSEMBLE_ENDPOINT;
        var apiRequest = new Request.Builder()
            .withHost(this.pageApiServiceConfig.host)
            .withType(HttpRequestType.POST)
            .withPath(this.pageApiServiceConfig.apiPath + pageAssembleEndPoint)
            .withBearerToken(true)
            .withBody({ request: request })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (success) {
            return success.body.result.response;
        }), tap(function (pageAssembleRes) {
            var pageAssemble = JSON.stringify(pageAssembleRes);
            _this.sharedPreferences.putString(('ttl_' + _this.PAGE_ASSEMBLE_LOCAL_KEY + '-' + DefaultRequestDelegate.getIdForDb(request)), Date.now() + '').toPromise();
            _this.keyValueStore.setValue(_this.PAGE_ASSEMBLE_LOCAL_KEY + '-' + DefaultRequestDelegate.getIdForDb(request), pageAssemble).toPromise();
        }));
    };
    DefaultRequestDelegate.prototype.fetchFromCache = function (request) {
        var _this = this;
        return this.cachedItemStore.getCached(DefaultRequestDelegate.getIdForDb(request), this.PAGE_ASSEMBLE_LOCAL_KEY, 'ttl_' + this.PAGE_ASSEMBLE_LOCAL_KEY, function () { return _this.fetchFromServer(request); });
    };
    DefaultRequestDelegate.SYSTEM_SETTINGS_TENANT_COURSE_PAGE_ID = 'tenantCoursePage';
    return DefaultRequestDelegate;
}());
export { DefaultRequestDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1yZXF1ZXN0LWRlbGVnYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BhZ2UvaGFuZGxlL2RlbGVnYXRlcy9kZWZhdWx0LXJlcXVlc3QtZGVsZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFnQyxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3JGLE9BQU8sRUFBdUIsUUFBUSxFQUFvQixNQUFNLE9BQU8sQ0FBQztBQUV4RSxPQUFPLEVBQUMsMkJBQTJCLEVBQWlDLE1BQU0sMEJBQTBCLENBQUM7QUFDckcsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBQyxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxLQUFLLElBQUksTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQU0xRDtJQWlCSSxnQ0FDWSxVQUFzQixFQUN0QixvQkFBdUMsRUFDdkMsaUJBQW9DLEVBQ3BDLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLGNBQThCLEVBQzlCLHFCQUE0QztRQVA1QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBbUI7UUFDdkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUF4QnZDLDRCQUF1QixH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Q0FBQztJQStIdkYsNkJBQUM7Q0FBQSxBQW5JRCxJQW1JQztTQW5JWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwaVJlcXVlc3RIYW5kbGVyLCBBcGlTZXJ2aWNlLCBIdHRwUmVxdWVzdFR5cGUsIFJlcXVlc3R9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZUNyaXRlcmlhLCBQYWdlTmFtZSwgUGFnZVNlcnZpY2VDb25maWd9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UGFnZUFzc2VtYmxlfSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQge0NhY2hlZEl0ZW1SZXF1ZXN0U291cmNlRnJvbSwgQ2FjaGVkSXRlbVN0b3JlLCBLZXlWYWx1ZVN0b3JlfSBmcm9tICcuLi8uLi8uLi9rZXktdmFsdWUtc3RvcmUnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgU0hBMSBmcm9tICdjcnlwdG8tanMvc2hhMSc7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZUtleXN9IGZyb20gJy4uLy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9hdXRoJztcbmltcG9ydCB7UHJvZmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtTeXN0ZW1TZXR0aW5nc1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3N5c3RlbS1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVxdWVzdERlbGVnYXRlIGltcGxlbWVudHMgQXBpUmVxdWVzdEhhbmRsZXI8UGFnZUFzc2VtYmxlQ3JpdGVyaWEsIFBhZ2VBc3NlbWJsZT4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgUEFHRV9BU1NFTUJMRV9MT0NBTF9LRVkgPSAncGFnZV9hc3NlbWJsZS0nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgUEFHRV9BU1NFTUJMRV9FTkRQT0lOVCA9ICcvcGFnZS9hc3NlbWJsZT9vcmdkZXRhaWxzPW9yZ05hbWUnO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgRElBTENPREVfQVNTRU1CTEVfRU5EUE9JTlQgPSAnL2RpYWwvYXNzZW1ibGUnO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNZU1RFTV9TRVRUSU5HU19URU5BTlRfQ09VUlNFX1BBR0VfSUQgPSAndGVuYW50Q291cnNlUGFnZSc7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRJZEZvckRiKHJlcXVlc3Q6IFBhZ2VBc3NlbWJsZUNyaXRlcmlhKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qga2V5ID1cbiAgICAgICAgICAgIHJlcXVlc3QubmFtZSArICctJyArXG4gICAgICAgICAgICAocmVxdWVzdC5vcmdhbmlzYXRpb25JZCB8fCAnJykgKyAnLScgK1xuICAgICAgICAgICAgKHJlcXVlc3Quc291cmNlIHx8ICdhcHAnKSArICctJyArXG4gICAgICAgICAgICAocmVxdWVzdC5tb2RlIHx8ICcnKSArICctJyArXG4gICAgICAgICAgICAocmVxdWVzdC5maWx0ZXJzID8gU0hBMShKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmZpbHRlcnMpKS50b1N0cmluZygpIDogJycpICtcbiAgICAgICAgKHJlcXVlc3Quc2VjdGlvbnMgPyBTSEExKEpTT04uc3RyaW5naWZ5KHJlcXVlc3Quc2VjdGlvbnMpKS50b1N0cmluZygpIDogJycpO1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGFnZUFwaVNlcnZpY2VDb25maWc6IFBhZ2VTZXJ2aWNlQ29uZmlnLFxuICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgcHJpdmF0ZSBrZXlWYWx1ZVN0b3JlOiBLZXlWYWx1ZVN0b3JlLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3lzdGVtU2V0dGluZ3NTZXJ2aWNlOiBTeXN0ZW1TZXR0aW5nc1NlcnZpY2UgICAgXG4gICAgKSB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcXVlc3Q6IFBhZ2VBc3NlbWJsZUNyaXRlcmlhKTogT2JzZXJ2YWJsZTxQYWdlQXNzZW1ibGU+IHtcbiAgICAgICAgcmVxdWVzdC5mcm9tID0gcmVxdWVzdC5mcm9tIHx8IENhY2hlZEl0ZW1SZXF1ZXN0U291cmNlRnJvbS5DQUNIRTtcblxuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QubmFtZSAhPT0gUGFnZU5hbWUuQ09VUlNFKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG92ZXJyaWRkZW5QYWdlQXNzZW1ibGVDaGFubmVsSWQgPSBhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhQYWdlQXNzZW1ibGVLZXlzLktFWV9PUkdBTklTQVRJT05fSUQpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICBpZiAoIW92ZXJyaWRkZW5QYWdlQXNzZW1ibGVDaGFubmVsSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXNTc29Vc2VyID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzUHJvZmlsZUxvZ2dlZEluID0gISEoYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRTZXNzaW9uKCkudG9Qcm9taXNlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGVmYXVsdENoYW5uZWxQcm9maWxlID0gYXdhaXQgdGhpcy5wcm9maWxlU2VydmljZS5pc0RlZmF1bHRDaGFubmVsUHJvZmlsZSgpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzUHJvZmlsZUxvZ2dlZEluICYmICFpc0RlZmF1bHRDaGFubmVsUHJvZmlsZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChhd2FpdCBpc1Nzb1VzZXIoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0ZW5hbnRDb3Vyc2VQYWdlQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2hhbm5lbElkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcGFnZTogUGFnZU5hbWVcbiAgICAgICAgICAgIH1bXSA9IGF3YWl0IHRoaXMuc3lzdGVtU2V0dGluZ3NTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmdldFN5c3RlbVNldHRpbmdzKHtpZDogRGVmYXVsdFJlcXVlc3REZWxlZ2F0ZS5TWVNURU1fU0VUVElOR1NfVEVOQU5UX0NPVVJTRV9QQUdFX0lEfSlcbiAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9yZ2FuaXNhdGlvbklkID0gb3ZlcnJpZGRlblBhZ2VBc3NlbWJsZUNoYW5uZWxJZDtcblxuICAgICAgICAgICAgY29uc3Qgb3ZlcnJpZGVDb25maWcgPSB0ZW5hbnRDb3Vyc2VQYWdlQ29uZmlnXG4gICAgICAgICAgICAgICAgLmZpbmQoKGNvbmZpZykgPT4gY29uZmlnLmNoYW5uZWxJZCA9PT0gb3ZlcnJpZGRlblBhZ2VBc3NlbWJsZUNoYW5uZWxJZCk7XG5cbiAgICAgICAgICAgIGlmIChvdmVycmlkZUNvbmZpZykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QubmFtZSA9IG92ZXJyaWRlQ29uZmlnLnBhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGFkYXB0ZWRSZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFkYXB0ZWRSZXF1ZXN0LmZyb20gPT09IENhY2hlZEl0ZW1SZXF1ZXN0U291cmNlRnJvbS5TRVJWRVIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tU2VydmVyKGFkYXB0ZWRSZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoYWRhcHRlZFJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShhZGFwdGVkUmVxdWVzdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hGcm9tU2VydmVyKHJlcXVlc3Q6IFBhZ2VBc3NlbWJsZUNyaXRlcmlhKTogT2JzZXJ2YWJsZTxQYWdlQXNzZW1ibGU+IHtcblxuICAgICAgICBjb25zdCBwYWdlQXNzZW1ibGVFbmRQb2ludCA9IHJlcXVlc3QubmFtZSA9PT0gUGFnZU5hbWUuRElBTF9DT0RFID8gdGhpcy5ESUFMQ09ERV9BU1NFTUJMRV9FTkRQT0lOVCA6IHRoaXMuUEFHRV9BU1NFTUJMRV9FTkRQT0lOVDtcblxuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aEhvc3QodGhpcy5wYWdlQXBpU2VydmljZUNvbmZpZy5ob3N0KVxuICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QT1NUKVxuICAgICAgICAgICAgLndpdGhQYXRoKHRoaXMucGFnZUFwaVNlcnZpY2VDb25maWcuYXBpUGF0aCArIHBhZ2VBc3NlbWJsZUVuZFBvaW50KVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhCb2R5KHtyZXF1ZXN0fSlcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoPHsgcmVzdWx0OiB7IHJlc3BvbnNlOiBQYWdlQXNzZW1ibGUgfSB9PihhcGlSZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgbWFwKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3MuYm9keS5yZXN1bHQucmVzcG9uc2U7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcCgocGFnZUFzc2VtYmxlUmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZUFzc2VtYmxlID0gSlNPTi5zdHJpbmdpZnkocGFnZUFzc2VtYmxlUmVzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAoJ3R0bF8nICsgdGhpcy5QQUdFX0FTU0VNQkxFX0xPQ0FMX0tFWSArICctJyArIERlZmF1bHRSZXF1ZXN0RGVsZWdhdGUuZ2V0SWRGb3JEYihyZXF1ZXN0KSksIERhdGUubm93KCkgKyAnJ1xuICAgICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmtleVZhbHVlU3RvcmUuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUEFHRV9BU1NFTUJMRV9MT0NBTF9LRVkgKyAnLScgKyBEZWZhdWx0UmVxdWVzdERlbGVnYXRlLmdldElkRm9yRGIocmVxdWVzdCksIHBhZ2VBc3NlbWJsZVxuICAgICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRnJvbUNhY2hlKHJlcXVlc3Q6IFBhZ2VBc3NlbWJsZUNyaXRlcmlhKTogT2JzZXJ2YWJsZTxQYWdlQXNzZW1ibGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkSXRlbVN0b3JlLmdldENhY2hlZChcbiAgICAgICAgICAgIERlZmF1bHRSZXF1ZXN0RGVsZWdhdGUuZ2V0SWRGb3JEYihyZXF1ZXN0KSxcbiAgICAgICAgICAgIHRoaXMuUEFHRV9BU1NFTUJMRV9MT0NBTF9LRVksXG4gICAgICAgICAgICAndHRsXycgKyB0aGlzLlBBR0VfQVNTRU1CTEVfTE9DQUxfS0VZLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5mZXRjaEZyb21TZXJ2ZXIocmVxdWVzdClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=