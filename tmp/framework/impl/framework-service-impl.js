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
import { CachedItemRequestSourceFrom } from '../../key-value-store';
import { GetChannelDetailsHandler } from '../handler/get-channel-detail-handler';
import { GetFrameworkDetailsHandler } from '../handler/get-framework-detail-handler';
import { defer, iif, of } from 'rxjs';
import { HttpRequestType, Request } from '../../api';
import { NoActiveChannelFoundError } from '../errors/no-active-channel-found-error';
import { FrameworkKeys } from '../../preference-keys';
import { inject, injectable } from 'inversify';
import { InjectionTokens, CsInjectionTokens } from '../../injection-tokens';
import { catchError, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { CsModule } from '@project-sunbird/client-services';
var FrameworkServiceImpl = /** @class */ (function () {
    function FrameworkServiceImpl(sdkConfig, fileService, apiService, cachedItemStore, sharedPreferences, systemSettingsService, csFrameworkService) {
        this.sdkConfig = sdkConfig;
        this.fileService = fileService;
        this.apiService = apiService;
        this.cachedItemStore = cachedItemStore;
        this.sharedPreferences = sharedPreferences;
        this.systemSettingsService = systemSettingsService;
        this.csFrameworkService = csFrameworkService;
    }
    FrameworkServiceImpl_1 = FrameworkServiceImpl;
    Object.defineProperty(FrameworkServiceImpl.prototype, "activeChannelId", {
        get: function () {
            return this._activeChannelId;
        },
        enumerable: false,
        configurable: true
    });
    FrameworkServiceImpl.prototype.preInit = function () {
        var _this = this;
        return this.getActiveChannelId().pipe(tap(function (activeChannelId) { return _this._activeChannelId = activeChannelId; }), mapTo(undefined), catchError(function (e) {
            if (e instanceof NoActiveChannelFoundError) {
                return _this.setActiveChannelId(_this.sdkConfig.apiConfig.api_authentication.channelId);
            }
            throw e;
        }));
    };
    FrameworkServiceImpl.prototype.getDefaultChannelId = function () {
        var _this = this;
        return iif(function () { return (!_this.sdkConfig.frameworkServiceConfig.overriddenDefaultChannelId); }, defer(function () {
            return _this.systemSettingsService.getSystemSettings({
                id: _this.sdkConfig.frameworkServiceConfig.systemSettingsDefaultChannelIdKey
            }).pipe(map(function (r) { return r.value; }));
        }), defer(function () {
            return of(_this.sdkConfig.frameworkServiceConfig.overriddenDefaultChannelId);
        }));
    };
    FrameworkServiceImpl.prototype.getDefaultChannelDetails = function (request) {
        var _this = this;
        if (request === void 0) { request = { from: CachedItemRequestSourceFrom.CACHE }; }
        return this.systemSettingsService.getSystemSettings({
            id: this.sdkConfig.frameworkServiceConfig.systemSettingsDefaultChannelIdKey
        }).pipe(map(function (r) { return r.value; }), mergeMap(function (channelId) {
            return _this.getChannelDetails({
                from: request.from,
                channelId: _this.sdkConfig.frameworkServiceConfig.overriddenDefaultChannelId || channelId
            });
        }));
    };
    FrameworkServiceImpl.prototype.getChannelDetails = function (request) {
        return new GetChannelDetailsHandler(this.apiService, this.sdkConfig.frameworkServiceConfig, this.fileService, this.cachedItemStore).handle(request);
    };
    FrameworkServiceImpl.prototype.getFrameworkDetails = function (request) {
        return new GetFrameworkDetailsHandler(this, this.apiService, this.sdkConfig.frameworkServiceConfig, this.fileService, this.cachedItemStore).handle(request);
    };
    FrameworkServiceImpl.prototype.getFrameworkConfig = function (frameworkId, formRequest) {
        var params;
        if (formRequest) {
            params = { type: formRequest.type, subType: formRequest.subType, action: formRequest.action, rootOrgId: formRequest.rootOrgId, framework: formRequest.framework, component: formRequest.component };
        }
        return this.csFrameworkService.getFrameworkConfig(frameworkId, { apiPath: "/api/framework/v1" }, { apiPath: "/api/data/v1/form", params: params });
    };
    FrameworkServiceImpl.prototype.searchOrganization = function (request) {
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(this.sdkConfig.frameworkServiceConfig.searchOrganizationApiPath + FrameworkServiceImpl_1.SEARCH_ORGANIZATION_ENDPOINT)
            .withBody({ request: request })
            .withBearerToken(true)
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (response) {
            return response.body.result.response;
        }));
    };
    FrameworkServiceImpl.prototype.getActiveChannelId = function () {
        return this.sharedPreferences.getString(FrameworkServiceImpl_1.KEY_ACTIVE_CHANNEL_ID).pipe(map(function (channelId) {
            if (!channelId) {
                throw new NoActiveChannelFoundError('No Active channel ID set in preferences');
            }
            return channelId;
        }));
    };
    FrameworkServiceImpl.prototype.setActiveChannelId = function (channelId) {
        this._activeChannelId = channelId;
        if (CsModule.instance.isInitialised) {
            CsModule.instance.updateConfig(__assign(__assign({}, CsModule.instance.config), { core: __assign(__assign({}, CsModule.instance.config.core), { global: __assign(__assign({}, CsModule.instance.config.core.global), { channelId: channelId }) }) }));
        }
        return this.sharedPreferences.putString(FrameworkServiceImpl_1.KEY_ACTIVE_CHANNEL_ID, channelId);
    };
    var FrameworkServiceImpl_1;
    FrameworkServiceImpl.KEY_ACTIVE_CHANNEL_ID = FrameworkKeys.KEY_ACTIVE_CHANNEL_ID;
    FrameworkServiceImpl.SEARCH_ORGANIZATION_ENDPOINT = '/search';
    FrameworkServiceImpl = FrameworkServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.FILE_SERVICE)),
        __param(2, inject(InjectionTokens.API_SERVICE)),
        __param(3, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __param(4, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(5, inject(InjectionTokens.SYSTEM_SETTINGS_SERVICE)),
        __param(6, inject(CsInjectionTokens.FRAMEWORK_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
    ], FrameworkServiceImpl);
    return FrameworkServiceImpl;
}());
export { FrameworkServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvaW1wbC9mcmFtZXdvcmstc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLDJCQUEyQixFQUFrQixNQUFNLHVCQUF1QixDQUFDO0FBVW5GLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRW5GLE9BQU8sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVoRCxPQUFPLEVBQWEsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUUvRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUdsRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDckUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSzFEO0lBTUksOEJBQXdELFNBQW9CLEVBQ2xCLFdBQXdCLEVBQ3pCLFVBQXNCLEVBQ2hCLGVBQWdDLEVBQy9CLGlCQUFvQyxFQUMvQixxQkFBNEMsRUFDaEQsa0JBQXNDO1FBTi9DLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDbEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFD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O0lBQzVELGlEQUE0QixHQUFHLFNBQVMsQ0FBQztJQUZ4RCxvQkFBb0I7UUFEaEMsVUFBVSxFQUFFO1FBT0ksV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDL0MsV0FBQSxNQUFNLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7T0FaL0Msb0JBQW9CLENBdUloQztJQUFELDJCQUFDO0NBQUEsQUF2SUQsSUF1SUM7U0F2SVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20sIENhY2hlZEl0ZW1TdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7XG4gICAgQ2hhbm5lbCxcbiAgICBDaGFubmVsRGV0YWlsc1JlcXVlc3QsXG4gICAgRnJhbWV3b3JrLFxuICAgIEZyYW1ld29ya0RldGFpbHNSZXF1ZXN0LFxuICAgIEZyYW1ld29ya1NlcnZpY2UsXG4gICAgT3JnYW5pemF0aW9uU2VhcmNoQ3JpdGVyaWEsXG4gICAgT3JnYW5pemF0aW9uU2VhcmNoUmVzcG9uc2Vcbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtHZXRDaGFubmVsRGV0YWlsc0hhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvZ2V0LWNoYW5uZWwtZGV0YWlsLWhhbmRsZXInO1xuaW1wb3J0IHtHZXRGcmFtZXdvcmtEZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci9nZXQtZnJhbWV3b3JrLWRldGFpbC1oYW5kbGVyJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7ZGVmZXIsIGlpZiwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtPcmdhbml6YXRpb259IGZyb20gJy4uL2RlZi9vcmdhbml6YXRpb24nO1xuaW1wb3J0IHtBcGlTZXJ2aWNlLCBIdHRwUmVxdWVzdFR5cGUsIFJlcXVlc3R9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge05vQWN0aXZlQ2hhbm5lbEZvdW5kRXJyb3J9IGZyb20gJy4uL2Vycm9ycy9uby1hY3RpdmUtY2hhbm5lbC1mb3VuZC1lcnJvcic7XG5pbXBvcnQge1N5c3RlbVNldHRpbmdzU2VydmljZX0gZnJvbSAnLi4vLi4vc3lzdGVtLXNldHRpbmdzJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7RnJhbWV3b3JrS2V5c30gZnJvbSAnLi4vLi4vcHJlZmVyZW5jZS1rZXlzJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbnMsIENzSW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDc01vZHVsZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMnO1xuaW1wb3J0IHsgQ3NGcmFtZXdvcmtTZXJ2aWNlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvZnJhbWV3b3JrL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtUmVxdWVzdCB9IGZyb20gJ3NyYyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmFtZXdvcmtTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIEZyYW1ld29ya1NlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEtFWV9BQ1RJVkVfQ0hBTk5FTF9JRCA9IEZyYW1ld29ya0tleXMuS0VZX0FDVElWRV9DSEFOTkVMX0lEO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNFQVJDSF9PUkdBTklaQVRJT05fRU5EUE9JTlQgPSAnL3NlYXJjaCc7XG5cbiAgICBwcml2YXRlIF9hY3RpdmVDaGFubmVsSWQ/OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkZJTEVfU0VSVklDRSkgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQVBJX1NFUlZJQ0UpIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DQUNIRURfSVRFTV9TVE9SRSkgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TSEFSRURfUFJFRkVSRU5DRVMpIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNZU1RFTV9TRVRUSU5HU19TRVJWSUNFKSBwcml2YXRlIHN5c3RlbVNldHRpbmdzU2VydmljZTogU3lzdGVtU2V0dGluZ3NTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoQ3NJbmplY3Rpb25Ub2tlbnMuRlJBTUVXT1JLX1NFUlZJQ0UpIHByaXZhdGUgY3NGcmFtZXdvcmtTZXJ2aWNlOiBDc0ZyYW1ld29ya1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlQ2hhbm5lbElkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVDaGFubmVsSWQ7XG4gICAgfVxuXG4gICAgcHJlSW5pdCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmVDaGFubmVsSWQoKS5waXBlKFxuICAgICAgICAgICAgdGFwKChhY3RpdmVDaGFubmVsSWQpID0+IHRoaXMuX2FjdGl2ZUNoYW5uZWxJZCA9IGFjdGl2ZUNoYW5uZWxJZCksXG4gICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgTm9BY3RpdmVDaGFubmVsRm91bmRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVDaGFubmVsSWQodGhpcy5zZGtDb25maWcuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5jaGFubmVsSWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRDaGFubmVsSWQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGlpZihcbiAgICAgICAgICAgICgpID0+ICghdGhpcy5zZGtDb25maWcuZnJhbWV3b3JrU2VydmljZUNvbmZpZy5vdmVycmlkZGVuRGVmYXVsdENoYW5uZWxJZCksXG4gICAgICAgICAgICBkZWZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtU2V0dGluZ3NTZXJ2aWNlLmdldFN5c3RlbVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuc2RrQ29uZmlnLmZyYW1ld29ya1NlcnZpY2VDb25maWcuc3lzdGVtU2V0dGluZ3NEZWZhdWx0Q2hhbm5lbElkS2V5XG4gICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChyKSA9PiByLnZhbHVlKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGRlZmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgIHJldHVybiBvZih0aGlzLnNka0NvbmZpZy5mcmFtZXdvcmtTZXJ2aWNlQ29uZmlnLm92ZXJyaWRkZW5EZWZhdWx0Q2hhbm5lbElkIGFzIHN0cmluZylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7ICAgICAgICBcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0Q2hhbm5lbERldGFpbHMocmVxdWVzdCA9IHsgZnJvbTogQ2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tLkNBQ0hFIH0pOiBPYnNlcnZhYmxlPENoYW5uZWw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtU2V0dGluZ3NTZXJ2aWNlLmdldFN5c3RlbVNldHRpbmdzKHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnNka0NvbmZpZy5mcmFtZXdvcmtTZXJ2aWNlQ29uZmlnLnN5c3RlbVNldHRpbmdzRGVmYXVsdENoYW5uZWxJZEtleVxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyKSA9PiByLnZhbHVlKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChjaGFubmVsSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENoYW5uZWxEZXRhaWxzKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogcmVxdWVzdC5mcm9tLFxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsSWQ6IHRoaXMuc2RrQ29uZmlnLmZyYW1ld29ya1NlcnZpY2VDb25maWcub3ZlcnJpZGRlbkRlZmF1bHRDaGFubmVsSWQgfHwgY2hhbm5lbElkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENoYW5uZWxEZXRhaWxzKHJlcXVlc3Q6IENoYW5uZWxEZXRhaWxzUmVxdWVzdCk6IE9ic2VydmFibGU8Q2hhbm5lbD4ge1xuICAgICAgICByZXR1cm4gbmV3IEdldENoYW5uZWxEZXRhaWxzSGFuZGxlcihcbiAgICAgICAgICAgIHRoaXMuYXBpU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLmZyYW1ld29ya1NlcnZpY2VDb25maWcsXG4gICAgICAgICAgICB0aGlzLmZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5jYWNoZWRJdGVtU3RvcmUsXG4gICAgICAgICkuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldEZyYW1ld29ya0RldGFpbHMocmVxdWVzdDogRnJhbWV3b3JrRGV0YWlsc1JlcXVlc3QpOiBPYnNlcnZhYmxlPEZyYW1ld29yaz4ge1xuICAgICAgICByZXR1cm4gbmV3IEdldEZyYW1ld29ya0RldGFpbHNIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHRoaXMuYXBpU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLmZyYW1ld29ya1NlcnZpY2VDb25maWcsXG4gICAgICAgICAgICB0aGlzLmZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5jYWNoZWRJdGVtU3RvcmUsXG4gICAgICAgICkuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldEZyYW1ld29ya0NvbmZpZyhmcmFtZXdvcmtJZDogc3RyaW5nLCBmb3JtUmVxdWVzdD86IEZvcm1SZXF1ZXN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IHBhcmFtcztcbiAgICAgICAgaWYoZm9ybVJlcXVlc3Qpe1xuICAgICAgICAgICAgcGFyYW1zID0geyB0eXBlOiBmb3JtUmVxdWVzdC50eXBlLCBzdWJUeXBlOiBmb3JtUmVxdWVzdC5zdWJUeXBlLCBhY3Rpb246IGZvcm1SZXF1ZXN0LmFjdGlvbiwgcm9vdE9yZ0lkOiBmb3JtUmVxdWVzdC5yb290T3JnSWQsIGZyYW1ld29yazogZm9ybVJlcXVlc3QuZnJhbWV3b3JrLCBjb21wb25lbnQ6IGZvcm1SZXF1ZXN0LmNvbXBvbmVudCB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3NGcmFtZXdvcmtTZXJ2aWNlLmdldEZyYW1ld29ya0NvbmZpZyhmcmFtZXdvcmtJZCxcbiAgICAgICAgICAgIHsgYXBpUGF0aDogXCIvYXBpL2ZyYW1ld29yay92MVwiIH0sXG4gICAgICAgICAgICB7IGFwaVBhdGg6IFwiL2FwaS9kYXRhL3YxL2Zvcm1cIiwgcGFyYW1zIH0pXG4gICAgfVxuXG4gICAgc2VhcmNoT3JnYW5pemF0aW9uPFQgZXh0ZW5kcyBQYXJ0aWFsPE9yZ2FuaXphdGlvbj4+KHJlcXVlc3Q6IE9yZ2FuaXphdGlvblNlYXJjaENyaXRlcmlhPFQ+KTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25TZWFyY2hSZXNwb25zZTxUPj4ge1xuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAgICAgICAud2l0aFBhdGgodGhpcy5zZGtDb25maWcuZnJhbWV3b3JrU2VydmljZUNvbmZpZy5zZWFyY2hPcmdhbml6YXRpb25BcGlQYXRoICsgRnJhbWV3b3JrU2VydmljZUltcGwuU0VBUkNIX09SR0FOSVpBVElPTl9FTkRQT0lOVClcbiAgICAgICAgICAgIC53aXRoQm9keSh7cmVxdWVzdH0pXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoPHsgcmVzdWx0OiB7IHJlc3BvbnNlOiBPcmdhbml6YXRpb25TZWFyY2hSZXNwb25zZTxUPiB9IH0+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkucmVzdWx0LnJlc3BvbnNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRBY3RpdmVDaGFubmVsSWQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKEZyYW1ld29ya1NlcnZpY2VJbXBsLktFWV9BQ1RJVkVfQ0hBTk5FTF9JRCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoY2hhbm5lbElkOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYW5uZWxJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9BY3RpdmVDaGFubmVsRm91bmRFcnJvcignTm8gQWN0aXZlIGNoYW5uZWwgSUQgc2V0IGluIHByZWZlcmVuY2VzJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWxJZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlQ2hhbm5lbElkKGNoYW5uZWxJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2hhbm5lbElkID0gY2hhbm5lbElkO1xuICAgICAgICBpZiAoQ3NNb2R1bGUuaW5zdGFuY2UuaXNJbml0aWFsaXNlZCkge1xuICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UudXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAuLi5Dc01vZHVsZS5pbnN0YW5jZS5jb25maWcsXG4gICAgICAgICAgICAgICAgY29yZToge1xuICAgICAgICAgICAgICAgICAgICAuLi5Dc01vZHVsZS5pbnN0YW5jZS5jb25maWcuY29yZSxcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5Dc01vZHVsZS5pbnN0YW5jZS5jb25maWcuY29yZS5nbG9iYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsSWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhGcmFtZXdvcmtTZXJ2aWNlSW1wbC5LRVlfQUNUSVZFX0NIQU5ORUxfSUQsIGNoYW5uZWxJZCk7XG4gICAgfVxufVxuIl19