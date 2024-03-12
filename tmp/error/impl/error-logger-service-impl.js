var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { DbService } from '../../db';
import { of } from 'rxjs';
import { ErrorStackEntry } from '../db/schema';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { SystemSettingsOrgIds } from '../../system-settings/def/system-settings-org-ids';
import { ErrorStackMapper } from '../util/error-stack-mapper';
import { ErrorStackSyncHandler } from '../handlers/error-stack-sync-handler';
import { ErrorStackSyncRequestDecorator } from '../handlers/error-stack-sync-request-decorator';
import { ErrorLogKeys } from '../../preference-keys';
import { map, mergeMap } from 'rxjs/operators';
var ErrorLoggerServiceImpl = /** @class */ (function () {
    function ErrorLoggerServiceImpl(systemSettingsService, dbService, appInfo, apiService, sdkConfig, errorLoggerService, deviceInfo, sharedPreferences) {
        this.systemSettingsService = systemSettingsService;
        this.dbService = dbService;
        this.appInfo = appInfo;
        this.apiService = apiService;
        this.sdkConfig = sdkConfig;
        this.errorLoggerService = errorLoggerService;
        this.deviceInfo = deviceInfo;
        this.sharedPreferences = sharedPreferences;
        this.errorLoggerConfig = this.sdkConfig.errorLoggerConfig;
        this.errorStackSyncRequestDecorator = new ErrorStackSyncRequestDecorator(this.sdkConfig.apiConfig, this.deviceInfo, this.appInfo);
        this.errorStackSyncHandler = new ErrorStackSyncHandler(this.apiService, this.dbService, this.errorLoggerConfig, this.errorLoggerService, this.errorStackSyncRequestDecorator);
    }
    ErrorLoggerServiceImpl_1 = ErrorLoggerServiceImpl;
    ErrorLoggerServiceImpl.prototype.onInit = function () {
        var _this = this;
        return this.sharedPreferences.getString(ErrorLogKeys.KEY_ERROR_LOG_LAST_SYNCED_TIME_STAMP)
            .pipe(mergeMap(function (timestamp) {
            if (!timestamp) {
                return _this.sharedPreferences.putString(ErrorLogKeys.KEY_ERROR_LOG_LAST_SYNCED_TIME_STAMP, Date.now() + '');
            }
            return of(undefined);
        }));
    };
    ErrorLoggerServiceImpl.prototype.logError = function (request) {
        var _this = this;
        var errorStack = {
            appver: this.appInfo.getVersionName(),
            pageid: request.pageId,
            ts: Date.now(),
            log: request.stacktrace
        };
        return this.dbService.insert({
            table: ErrorStackEntry.TABLE_NAME,
            modelJson: ErrorStackMapper.mapErrorStackToErrorStackDBEntry(errorStack)
        })
            .pipe(mergeMap(function () { return _this.getErrorCount(); }), mergeMap(function (errorCount) {
            return _this.getErrorLogSyncSettings()
                .pipe(map(function (settings) { return (__assign(__assign({}, settings), { errorCount: errorCount })); }));
        }), map(function (_a) {
            var errorCount = _a.errorCount, frequency = _a.frequency, bandwidth = _a.bandwidth;
            return {
                errorCount: errorCount,
                errorLogSyncFrequency: frequency,
                errorLogSyncBandwidth: bandwidth
            };
        }), mergeMap(function (_a) {
            var errorCount = _a.errorCount, errorLogSyncFrequency = _a.errorLogSyncFrequency, errorLogSyncBandwidth = _a.errorLogSyncBandwidth;
            return _this.hasErrorLogSyncFrequencyCrossed(errorCount, errorLogSyncFrequency)
                .pipe(map(function (shouldSync) { return ({
                shouldSync: shouldSync,
                errorLogSyncBandwidth: errorLogSyncBandwidth
            }); }));
        }), mergeMap(function (_a) {
            var shouldSync = _a.shouldSync, errorLogSyncBandwidth = _a.errorLogSyncBandwidth;
            if (shouldSync) {
                return _this.errorStackSyncHandler.handle(errorLogSyncBandwidth)
                    .pipe(mergeMap(function () {
                    return _this.sharedPreferences.putString(ErrorLogKeys.KEY_ERROR_LOG_LAST_SYNCED_TIME_STAMP, Date.now() + '');
                }));
            }
            return of(undefined);
        }));
    };
    ErrorLoggerServiceImpl.prototype.hasErrorLogSyncFrequencyCrossed = function (errorCount, errorLogSyncFrequency) {
        return this.sharedPreferences.getString(ErrorLogKeys.KEY_ERROR_LOG_LAST_SYNCED_TIME_STAMP)
            .pipe(map(function (timestamp) { return parseInt(timestamp, 10); }), map(function (timestamp) {
            return (timestamp + errorLogSyncFrequency) < Date.now();
        }));
    };
    ErrorLoggerServiceImpl.prototype.getErrorCount = function () {
        return this.dbService.execute("SELECT COUNT(*) as count FROM " + ErrorStackEntry.TABLE_NAME)
            .pipe(map(function (result) { return result[0]['count']; }));
    };
    ErrorLoggerServiceImpl.prototype.getErrorLogSyncSettings = function () {
        var getSystemSettingsRequest = {
            id: ErrorLoggerServiceImpl_1.ERROR_LOG_SYNC_SETTINGS
        };
        return this.systemSettingsService.getSystemSettings(getSystemSettingsRequest)
            .pipe(map(function (r) { return JSON.parse(r.value); }));
    };
    var ErrorLoggerServiceImpl_1;
    ErrorLoggerServiceImpl.ERROR_LOG_SYNC_SETTINGS = SystemSettingsOrgIds.ERROR_LOG_SYNC_SETTINGS;
    ErrorLoggerServiceImpl = ErrorLoggerServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SYSTEM_SETTINGS_SERVICE)),
        __param(1, inject(InjectionTokens.DB_SERVICE)),
        __param(2, inject(InjectionTokens.APP_INFO)),
        __param(3, inject(InjectionTokens.API_SERVICE)),
        __param(4, inject(InjectionTokens.SDK_CONFIG)),
        __param(5, inject(InjectionTokens.NETWORKINFO_SERVICE)),
        __param(6, inject(InjectionTokens.DEVICE_INFO)),
        __param(7, inject(InjectionTokens.SHARED_PREFERENCES)),
        __metadata("design:paramtypes", [Object, DbService, Object, Object, Object, Object, Object, Object])
    ], ErrorLoggerServiceImpl);
    return ErrorLoggerServiceImpl;
}());
export { ErrorLoggerServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2VyLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lcnJvci9pbXBsL2Vycm9yLWxvZ2dlci1zZXJ2aWNlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM3QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFPdkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFFOUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRW5ELE9BQU8sRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0M7SUFPSSxnQ0FDNkQscUJBQTRDLEVBQ3pELFNBQW9CLEVBQ3RCLE9BQWdCLEVBQ2IsVUFBc0IsRUFDdkIsU0FBb0IsRUFDWCxrQkFBc0MsRUFDOUMsVUFBc0IsRUFDZixpQkFBb0M7UUFQL0IsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUN6RCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDYixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGNBQVMs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T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtFcnJvckxvZ2dlclNlcnZpY2V9IGZyb20gJy4uJztcbmltcG9ydCB7RXJyb3JTdGFja0VudHJ5fSBmcm9tICcuLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge0dldFN5c3RlbVNldHRpbmdzUmVxdWVzdCwgU3lzdGVtU2V0dGluZ3NTZXJ2aWNlfSBmcm9tICcuLi8uLi9zeXN0ZW0tc2V0dGluZ3MnO1xuaW1wb3J0IHtTeXN0ZW1TZXR0aW5nc09yZ0lkc30gZnJvbSAnLi4vLi4vc3lzdGVtLXNldHRpbmdzL2RlZi9zeXN0ZW0tc2V0dGluZ3Mtb3JnLWlkcyc7XG5pbXBvcnQge0FwcEluZm99IGZyb20gJy4uLy4uL3V0aWwvYXBwJztcbmltcG9ydCB7QXBpU2VydmljZX0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7RXJyb3JMb2dnZXJDb25maWd9IGZyb20gJy4uL2NvbmZpZy9lcnJvci1sb2dnZXItY29uZmlnJztcbmltcG9ydCB7VGVsZW1ldHJ5RXJyb3JSZXF1ZXN0fSBmcm9tICcuLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHtFcnJvclN0YWNrfSBmcm9tICcuLi9kZWYvZXJyb3Itc3RhY2snO1xuaW1wb3J0IHtFcnJvclN0YWNrTWFwcGVyfSBmcm9tICcuLi91dGlsL2Vycm9yLXN0YWNrLW1hcHBlcic7XG5pbXBvcnQge0Vycm9yU3RhY2tTeW5jSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZXJyb3Itc3RhY2stc3luYy1oYW5kbGVyJztcbmltcG9ydCB7TmV0d29ya0luZm9TZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL25ldHdvcmsnO1xuaW1wb3J0IHtFcnJvclN0YWNrU3luY1JlcXVlc3REZWNvcmF0b3J9IGZyb20gJy4uL2hhbmRsZXJzL2Vycm9yLXN0YWNrLXN5bmMtcmVxdWVzdC1kZWNvcmF0b3InO1xuaW1wb3J0IHtEZXZpY2VJbmZvfSBmcm9tICcuLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge0Vycm9yTG9nS2V5c30gZnJvbSAnLi4vLi4vcHJlZmVyZW5jZS1rZXlzJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7bWFwLCBtZXJnZU1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnZXJTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIEVycm9yTG9nZ2VyU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBFUlJPUl9MT0dfU1lOQ19TRVRUSU5HUyA9IFN5c3RlbVNldHRpbmdzT3JnSWRzLkVSUk9SX0xPR19TWU5DX1NFVFRJTkdTO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZXJyb3JMb2dnZXJDb25maWc6IEVycm9yTG9nZ2VyQ29uZmlnO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZXJyb3JTdGFja1N5bmNIYW5kbGVyOiBFcnJvclN0YWNrU3luY0hhbmRsZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBlcnJvclN0YWNrU3luY1JlcXVlc3REZWNvcmF0b3I6IEVycm9yU3RhY2tTeW5jUmVxdWVzdERlY29yYXRvcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TWVNURU1fU0VUVElOR1NfU0VSVklDRSkgcHJpdmF0ZSBzeXN0ZW1TZXR0aW5nc1NlcnZpY2U6IFN5c3RlbVNldHRpbmdzU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREJfU0VSVklDRSkgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQVBQX0lORk8pIHByaXZhdGUgYXBwSW5mbzogQXBwSW5mbyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQVBJX1NFUlZJQ0UpIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuTkVUV09SS0lORk9fU0VSVklDRSkgcHJpdmF0ZSBlcnJvckxvZ2dlclNlcnZpY2U6IE5ldHdvcmtJbmZvU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREVWSUNFX0lORk8pIHByaXZhdGUgZGV2aWNlSW5mbzogRGV2aWNlSW5mbyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0hBUkVEX1BSRUZFUkVOQ0VTKSBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5lcnJvckxvZ2dlckNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmVycm9yTG9nZ2VyQ29uZmlnO1xuICAgICAgICB0aGlzLmVycm9yU3RhY2tTeW5jUmVxdWVzdERlY29yYXRvciA9IG5ldyBFcnJvclN0YWNrU3luY1JlcXVlc3REZWNvcmF0b3IoXG4gICAgICAgICAgICB0aGlzLnNka0NvbmZpZy5hcGlDb25maWcsXG4gICAgICAgICAgICB0aGlzLmRldmljZUluZm8sXG4gICAgICAgICAgICB0aGlzLmFwcEluZm9cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5lcnJvclN0YWNrU3luY0hhbmRsZXIgPSBuZXcgRXJyb3JTdGFja1N5bmNIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2VyQ29uZmlnLFxuICAgICAgICAgICAgdGhpcy5lcnJvckxvZ2dlclNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmVycm9yU3RhY2tTeW5jUmVxdWVzdERlY29yYXRvclxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uSW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKEVycm9yTG9nS2V5cy5LRVlfRVJST1JfTE9HX0xBU1RfU1lOQ0VEX1RJTUVfU1RBTVApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoRXJyb3JMb2dLZXlzLktFWV9FUlJPUl9MT0dfTEFTVF9TWU5DRURfVElNRV9TVEFNUCwgRGF0ZS5ub3coKSArICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGxvZ0Vycm9yKHJlcXVlc3Q6IFRlbGVtZXRyeUVycm9yUmVxdWVzdCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IGVycm9yU3RhY2s6IEVycm9yU3RhY2sgPSB7XG4gICAgICAgICAgICBhcHB2ZXI6IHRoaXMuYXBwSW5mby5nZXRWZXJzaW9uTmFtZSgpLFxuICAgICAgICAgICAgcGFnZWlkOiByZXF1ZXN0LnBhZ2VJZCxcbiAgICAgICAgICAgIHRzOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbG9nOiByZXF1ZXN0LnN0YWNrdHJhY2VcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRhYmxlOiBFcnJvclN0YWNrRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIG1vZGVsSnNvbjogRXJyb3JTdGFja01hcHBlci5tYXBFcnJvclN0YWNrVG9FcnJvclN0YWNrREJFbnRyeShlcnJvclN0YWNrKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5nZXRFcnJvckNvdW50KCkpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChlcnJvckNvdW50KSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVycm9yTG9nU3luY1NldHRpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoc2V0dGluZ3MpID0+ICh7Li4uc2V0dGluZ3MsIGVycm9yQ291bnR9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1hcCgoe2Vycm9yQ291bnQsIGZyZXF1ZW5jeSwgYmFuZHdpZHRofSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTG9nU3luY0ZyZXF1ZW5jeTogZnJlcXVlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JMb2dTeW5jQmFuZHdpZHRoOiBiYW5kd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoe2Vycm9yQ291bnQsIGVycm9yTG9nU3luY0ZyZXF1ZW5jeSwgZXJyb3JMb2dTeW5jQmFuZHdpZHRofSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNFcnJvckxvZ1N5bmNGcmVxdWVuY3lDcm9zc2VkKGVycm9yQ291bnQsIGVycm9yTG9nU3luY0ZyZXF1ZW5jeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoc2hvdWxkU3luYykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkU3luYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JMb2dTeW5jQmFuZHdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh7c2hvdWxkU3luYywgZXJyb3JMb2dTeW5jQmFuZHdpZHRofSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkU3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JTdGFja1N5bmNIYW5kbGVyLmhhbmRsZShlcnJvckxvZ1N5bmNCYW5kd2lkdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhFcnJvckxvZ0tleXMuS0VZX0VSUk9SX0xPR19MQVNUX1NZTkNFRF9USU1FX1NUQU1QLCBEYXRlLm5vdygpICsgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc0Vycm9yTG9nU3luY0ZyZXF1ZW5jeUNyb3NzZWQoZXJyb3JDb3VudDogbnVtYmVyLCBlcnJvckxvZ1N5bmNGcmVxdWVuY3k6IG51bWJlcik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoRXJyb3JMb2dLZXlzLktFWV9FUlJPUl9MT0dfTEFTVF9TWU5DRURfVElNRV9TVEFNUClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgodGltZXN0YW1wKSA9PiBwYXJzZUludCh0aW1lc3RhbXAhLCAxMCkpLFxuICAgICAgICAgICAgICAgIG1hcCgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGltZXN0YW1wICsgZXJyb3JMb2dTeW5jRnJlcXVlbmN5KSA8IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFcnJvckNvdW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKGBTRUxFQ1QgQ09VTlQoKikgYXMgY291bnQgRlJPTSAke0Vycm9yU3RhY2tFbnRyeS5UQUJMRV9OQU1FfWApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKHJlc3VsdDogRXJyb3JTdGFja0VudHJ5LlNjaGVtYU1hcFtdKSA9PiByZXN1bHRbMF1bJ2NvdW50J10pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RXJyb3JMb2dTeW5jU2V0dGluZ3MoKTogT2JzZXJ2YWJsZTx7IGZyZXF1ZW5jeTogbnVtYmVyLCBiYW5kd2lkdGg6IG51bWJlciB9PiB7XG4gICAgICAgIGNvbnN0IGdldFN5c3RlbVNldHRpbmdzUmVxdWVzdDogR2V0U3lzdGVtU2V0dGluZ3NSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgaWQ6IEVycm9yTG9nZ2VyU2VydmljZUltcGwuRVJST1JfTE9HX1NZTkNfU0VUVElOR1NcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1TZXR0aW5nc1NlcnZpY2UuZ2V0U3lzdGVtU2V0dGluZ3MoZ2V0U3lzdGVtU2V0dGluZ3NSZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyKSA9PiBKU09OLnBhcnNlKHIudmFsdWUpKVxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=