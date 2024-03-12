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
import { of, throwError } from 'rxjs';
import { Container, inject, injectable } from 'inversify';
import { CsInjectionTokens, InjectionTokens } from '../injection-tokens';
import { ApiKeys } from '../preference-keys';
import { ApiTokenHandler } from './handlers/api-token-handler';
import { ErrorEventType, EventNamespace } from '../events-bus';
import { catchError, mergeMap } from 'rxjs/operators';
import { CsHttpClientError, CsHttpServerError } from '@project-sunbird/client-services/core/http-service';
import { BearerTokenRefreshInterceptor } from './util/authenticators/bearer-token-refresh-interceptor';
import { UserTokenRefreshInterceptor } from './util/authenticators/user-token-refresh-interceptor';
import { CsModule } from '@project-sunbird/client-services';
import { CsRequestLoggerInterceptor, CsResponseLoggerInterceptor } from '@project-sunbird/client-services/core/http-service/utilities/interceptors';
var ApiServiceImpl = /** @class */ (function () {
    function ApiServiceImpl(container, sdkConfig, deviceInfo, sharedPreferences, eventsBusService, httpService) {
        this.container = container;
        this.sdkConfig = sdkConfig;
        this.deviceInfo = deviceInfo;
        this.sharedPreferences = sharedPreferences;
        this.eventsBusService = eventsBusService;
        this.httpService = httpService;
        this.hasEmittedPlannedMaintenanceErrorEvent = false;
        this.defaultRequestInterceptors = [];
        this.defaultResponseInterceptors = [];
        this.apiConfig = this.sdkConfig.apiConfig;
        if (this.apiConfig.debugMode) {
            this.defaultRequestInterceptors = [
                new CsRequestLoggerInterceptor()
            ];
            this.defaultResponseInterceptors = [
                new CsResponseLoggerInterceptor()
            ];
        }
    }
    ApiServiceImpl_1 = ApiServiceImpl;
    Object.defineProperty(ApiServiceImpl.prototype, "bearerTokenRefreshInterceptor", {
        get: function () {
            if (!this._bearerTokenRefreshInterceptor) {
                this._bearerTokenRefreshInterceptor = new BearerTokenRefreshInterceptor(this.container.get(InjectionTokens.SHARED_PREFERENCES), this.container.get(InjectionTokens.SDK_CONFIG).apiConfig, this.container.get(InjectionTokens.DEVICE_INFO), this.container.get(InjectionTokens.API_SERVICE));
            }
            return this._bearerTokenRefreshInterceptor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiServiceImpl.prototype, "userTokenRefreshInterceptor", {
        get: function () {
            if (!this._userTokenRefreshInterceptor) {
                this._userTokenRefreshInterceptor = new UserTokenRefreshInterceptor(this.container.get(InjectionTokens.API_SERVICE), this.container.get(InjectionTokens.AUTH_SERVICE));
            }
            return this._userTokenRefreshInterceptor;
        },
        enumerable: false,
        configurable: true
    });
    ApiServiceImpl.prototype.onInit = function () {
        var _this = this;
        this.sharedPreferences.addListener(ApiKeys.KEY_API_TOKEN, function (value) {
            if (value) {
                CsModule.instance.config.core.api.authentication.bearerToken = value;
            }
            else {
                CsModule.instance.config.core.api.authentication.bearerToken = undefined;
            }
            CsModule.instance.updateConfig(CsModule.instance.config);
        });
        return this.sharedPreferences.getString(ApiKeys.KEY_API_TOKEN).pipe(mergeMap(function (apiToken) {
            if (!apiToken) {
                return new ApiTokenHandler(_this.apiConfig, _this, _this.deviceInfo).refreshAuthToken().pipe(mergeMap(function (bearerToken) {
                    return _this.sharedPreferences.putString(ApiKeys.KEY_API_TOKEN, bearerToken);
                }), catchError(function () { return of(undefined); }));
            }
            CsModule.instance.config.core.api.authentication.bearerToken = apiToken;
            CsModule.instance.updateConfig(CsModule.instance.config);
            return of(undefined);
        }));
    };
    ApiServiceImpl.prototype.fetch = function (request) {
        var _this = this;
        this.defaultRequestInterceptors.forEach(function (i) {
            if (request.requestInterceptors.indexOf(i) === -1) {
                request.requestInterceptors.push(i);
            }
        });
        this.defaultResponseInterceptors.forEach(function (i) {
            if (request.responseInterceptors.indexOf(i) === -1) {
                request.responseInterceptors.push(i);
            }
        });
        if (request.withBearerToken) {
            var bearerTokenRefreshInterceptorIndex = request.responseInterceptors.indexOf(this.bearerTokenRefreshInterceptor);
            if (bearerTokenRefreshInterceptorIndex === -1) {
                request.responseInterceptors.push(this.bearerTokenRefreshInterceptor);
            }
            else {
                request.responseInterceptors.splice(bearerTokenRefreshInterceptorIndex, 1);
            }
        }
        if (request.withUserToken) {
            var userTokenRefreshInterceptorIndex = request.responseInterceptors.indexOf(this.userTokenRefreshInterceptor);
            if (userTokenRefreshInterceptorIndex === -1) {
                request.responseInterceptors.push(this.userTokenRefreshInterceptor);
            }
            else {
                request.responseInterceptors.splice(userTokenRefreshInterceptorIndex, 1);
            }
        }
        return this.httpService.fetch(request).pipe(catchError(function (e) {
            if (CsHttpServerError.isInstance(e)) {
                _this.eventsBusService.emit({
                    namespace: EventNamespace.ERROR,
                    event: {
                        type: ErrorEventType.HTTP_SERVER_ERROR,
                        payload: e
                    }
                });
                if (e.response.responseCode === ApiServiceImpl_1.PLANNED_MAINTENANCE_ERROR_CODE) {
                    if (!_this.hasEmittedPlannedMaintenanceErrorEvent) {
                        _this.hasEmittedPlannedMaintenanceErrorEvent = true;
                        _this.eventsBusService.emit({
                            namespace: EventNamespace.ERROR,
                            event: {
                                type: ErrorEventType.PLANNED_MAINTENANCE_PERIOD,
                                payload: e
                            }
                        });
                    }
                }
            }
            else if (CsHttpClientError.isInstance(e)) {
                _this.eventsBusService.emit({
                    namespace: EventNamespace.ERROR,
                    event: {
                        type: ErrorEventType.HTTP_CLIENT_ERROR,
                        payload: e
                    }
                });
            }
            return throwError(e);
        }));
    };
    ApiServiceImpl.prototype.setDefaultRequestInterceptors = function (interceptors) {
        this.defaultRequestInterceptors = interceptors;
        if (this.apiConfig.debugMode) {
            this.defaultRequestInterceptors.push(new CsRequestLoggerInterceptor());
        }
    };
    ApiServiceImpl.prototype.setDefaultResponseInterceptors = function (interceptors) {
        this.defaultResponseInterceptors = interceptors;
        if (this.apiConfig.debugMode) {
            this.defaultResponseInterceptors.push(new CsResponseLoggerInterceptor());
        }
    };
    var ApiServiceImpl_1;
    ApiServiceImpl.PLANNED_MAINTENANCE_ERROR_CODE = 531;
    ApiServiceImpl = ApiServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.CONTAINER)),
        __param(1, inject(InjectionTokens.SDK_CONFIG)),
        __param(2, inject(InjectionTokens.DEVICE_INFO)),
        __param(3, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(4, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __param(5, inject(CsInjectionTokens.HTTP_SERVICE)),
        __metadata("design:paramtypes", [Container, Object, Object, Object, Object, Object])
    ], ApiServiceImpl);
    return ApiServiceImpl;
}());
export { ApiServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvYXBpLXNlcnZpY2UtaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQWEsRUFBRSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUloRCxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBRSxjQUFjLEVBQStFLE1BQU0sZUFBZSxDQUFDO0FBRTNJLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUNILGlCQUFpQixFQUNqQixpQkFBaUIsRUFNcEIsTUFBTSxvREFBb0QsQ0FBQztBQUM1RCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUNyRyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUVqRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDMUQsT0FBTyxFQUNILDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDOUIsTUFBTSwyRUFBMkUsQ0FBQztBQUduRjtJQU9JLHdCQUMrQyxTQUFvQixFQUNuQixTQUFvQixFQUNuQixVQUFzQixFQUNmLGlCQUFvQyxFQUNwQyxnQkFBa0MsRUFDdEMsV0FBMEI7UUFML0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ25CLGVBQVUsR0FB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Q0FBQztTQUNMO0lBQ0wsQ0FBQzs7SUF4S2MsNkNBQThCLEdBQUcsR0FBRyxDQUFDO0lBRDNDLGNBQWM7UUFEMUIsVUFBVSxFQUFFO1FBU0osV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2pDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsV0FBQSxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUE7eUNBTGUsU0FBUztPQVIxRCxjQUFjLENBMEsxQjtJQUFELHFCQUFDO0NBQUEsQUExS0QsSUEwS0M7U0ExS1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpQ29uZmlnfSBmcm9tICcuL2NvbmZpZy9hcGktY29uZmlnJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBcGlTZXJ2aWNlfSBmcm9tICcuL2RlZi9hcGktc2VydmljZSc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7Q29udGFpbmVyLCBpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0NzSW5qZWN0aW9uVG9rZW5zLCBJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtBcGlLZXlzfSBmcm9tICcuLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtBcGlUb2tlbkhhbmRsZXJ9IGZyb20gJy4vaGFuZGxlcnMvYXBpLXRva2VuLWhhbmRsZXInO1xuaW1wb3J0IHtFcnJvckV2ZW50VHlwZSwgRXZlbnROYW1lc3BhY2UsIEV2ZW50c0J1c0V2ZW50LCBFdmVudHNCdXNTZXJ2aWNlLCBIdHRwQ2xpZW50RXJyb3JFdmVudCwgSHR0cFNlcnZlckVycm9yRXZlbnR9IGZyb20gJy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IHtFbWl0UmVxdWVzdH0gZnJvbSAnLi4vZXZlbnRzLWJ1cy9kZWYvZW1pdC1yZXF1ZXN0JztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWVyZ2VNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gICAgQ3NIdHRwQ2xpZW50RXJyb3IsXG4gICAgQ3NIdHRwU2VydmVyRXJyb3IsXG4gICAgQ3NIdHRwU2VydmljZSxcbiAgICBDc1JlcXVlc3QsXG4gICAgQ3NSZXF1ZXN0SW50ZXJjZXB0b3IsXG4gICAgQ3NSZXNwb25zZSxcbiAgICBDc1Jlc3BvbnNlSW50ZXJjZXB0b3Jcbn0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvY29yZS9odHRwLXNlcnZpY2UnO1xuaW1wb3J0IHtCZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvcn0gZnJvbSAnLi91dGlsL2F1dGhlbnRpY2F0b3JzL2JlYXJlci10b2tlbi1yZWZyZXNoLWludGVyY2VwdG9yJztcbmltcG9ydCB7VXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9yfSBmcm9tICcuL3V0aWwvYXV0aGVudGljYXRvcnMvdXNlci10b2tlbi1yZWZyZXNoLWludGVyY2VwdG9yJztcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4uL2F1dGgnO1xuaW1wb3J0IHtDc01vZHVsZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMnO1xuaW1wb3J0IHtcbiAgICBDc1JlcXVlc3RMb2dnZXJJbnRlcmNlcHRvcixcbiAgICBDc1Jlc3BvbnNlTG9nZ2VySW50ZXJjZXB0b3Jcbn0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvY29yZS9odHRwLXNlcnZpY2UvdXRpbGl0aWVzL2ludGVyY2VwdG9ycyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIEFwaVNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIFBMQU5ORURfTUFJTlRFTkFOQ0VfRVJST1JfQ09ERSA9IDUzMTtcbiAgICBwcml2YXRlIGhhc0VtaXR0ZWRQbGFubmVkTWFpbnRlbmFuY2VFcnJvckV2ZW50ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBkZWZhdWx0UmVxdWVzdEludGVyY2VwdG9yczogQ3NSZXF1ZXN0SW50ZXJjZXB0b3JbXSA9IFtdO1xuICAgIHByaXZhdGUgZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3JzOiBDc1Jlc3BvbnNlSW50ZXJjZXB0b3JbXSA9IFtdO1xuICAgIHByaXZhdGUgYXBpQ29uZmlnOiBBcGlDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQ09OVEFJTkVSKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udGFpbmVyLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5ERVZJQ0VfSU5GTykgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TSEFSRURfUFJFRkVSRU5DRVMpIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5FVkVOVFNfQlVTX1NFUlZJQ0UpIHByaXZhdGUgZXZlbnRzQnVzU2VydmljZTogRXZlbnRzQnVzU2VydmljZSxcbiAgICAgICAgQGluamVjdChDc0luamVjdGlvblRva2Vucy5IVFRQX1NFUlZJQ0UpIHByaXZhdGUgaHR0cFNlcnZpY2U6IENzSHR0cFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5hcGlDb25maWcgPSB0aGlzLnNka0NvbmZpZy5hcGlDb25maWc7XG5cbiAgICAgICAgaWYgKHRoaXMuYXBpQ29uZmlnLmRlYnVnTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0UmVxdWVzdEludGVyY2VwdG9ycyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgQ3NSZXF1ZXN0TG9nZ2VySW50ZXJjZXB0b3IoKVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcnMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IENzUmVzcG9uc2VMb2dnZXJJbnRlcmNlcHRvcigpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYmVhcmVyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3I/OiBCZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvcjtcblxuICAgIGdldCBiZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvcigpOiBCZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvciB7XG4gICAgICAgIGlmICghdGhpcy5fYmVhcmVyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2JlYXJlclRva2VuUmVmcmVzaEludGVyY2VwdG9yID0gbmV3IEJlYXJlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmdldDxTaGFyZWRQcmVmZXJlbmNlcz4oSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUyksXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZ2V0PFNka0NvbmZpZz4oSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpLmFwaUNvbmZpZyxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5nZXQ8RGV2aWNlSW5mbz4oSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9JTkZPKSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5nZXQ8QXBpU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkFQSV9TRVJWSUNFKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9iZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91c2VyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3I/OiBVc2VyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3I7XG5cbiAgICBnZXQgdXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKCk6IFVzZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvciB7XG4gICAgICAgIGlmICghdGhpcy5fdXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3IgPSBuZXcgVXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmdldDxBcGlTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuQVBJX1NFUlZJQ0UpLFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmdldDxBdXRoU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkFVVEhfU0VSVklDRSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvcjtcbiAgICB9XG5cbiAgICBvbkluaXQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5hZGRMaXN0ZW5lcihBcGlLZXlzLktFWV9BUElfVE9LRU4sICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLmJlYXJlclRva2VuID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmFwaS5hdXRoZW50aWNhdGlvbi5iZWFyZXJUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UudXBkYXRlQ29uZmlnKENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhBcGlLZXlzLktFWV9BUElfVE9LRU4pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoYXBpVG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWFwaVRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXBpVG9rZW5IYW5kbGVyKHRoaXMuYXBpQ29uZmlnLCB0aGlzLCB0aGlzLmRldmljZUluZm8pLnJlZnJlc2hBdXRoVG9rZW4oKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGJlYXJlclRva2VuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKEFwaUtleXMuS0VZX0FQSV9UT0tFTiwgYmVhcmVyVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKHVuZGVmaW5lZCkpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLmJlYXJlclRva2VuID0gYXBpVG9rZW47XG4gICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UudXBkYXRlQ29uZmlnKENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZldGNoPFQgPSBhbnk+KHJlcXVlc3Q6IENzUmVxdWVzdCk6IE9ic2VydmFibGU8Q3NSZXNwb25zZTxUPj4ge1xuICAgICAgICB0aGlzLmRlZmF1bHRSZXF1ZXN0SW50ZXJjZXB0b3JzLmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlcXVlc3RJbnRlcmNlcHRvcnMuaW5kZXhPZihpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlcXVlc3RJbnRlcmNlcHRvcnMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcnMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVzcG9uc2VJbnRlcmNlcHRvcnMuaW5kZXhPZihpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlSW50ZXJjZXB0b3JzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXF1ZXN0LndpdGhCZWFyZXJUb2tlbikge1xuICAgICAgICAgICAgY29uc3QgYmVhcmVyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3JJbmRleCA9IHJlcXVlc3QucmVzcG9uc2VJbnRlcmNlcHRvcnMuaW5kZXhPZih0aGlzLmJlYXJlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKTtcbiAgICAgICAgICAgIGlmIChiZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvckluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VJbnRlcmNlcHRvcnMucHVzaCh0aGlzLmJlYXJlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZUludGVyY2VwdG9ycy5zcGxpY2UoYmVhcmVyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3JJbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVxdWVzdC53aXRoVXNlclRva2VuKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVG9rZW5SZWZyZXNoSW50ZXJjZXB0b3JJbmRleCA9IHJlcXVlc3QucmVzcG9uc2VJbnRlcmNlcHRvcnMuaW5kZXhPZih0aGlzLnVzZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvcik7XG4gICAgICAgICAgICBpZiAodXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9ySW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZUludGVyY2VwdG9ycy5wdXNoKHRoaXMudXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZUludGVyY2VwdG9ycy5zcGxpY2UodXNlclRva2VuUmVmcmVzaEludGVyY2VwdG9ySW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZmV0Y2g8VD4ocmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQ3NIdHRwU2VydmVyRXJyb3IuaXNJbnN0YW5jZShlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFcnJvckV2ZW50VHlwZS5IVFRQX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEh0dHBTZXJ2ZXJFcnJvckV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0gYXMgRW1pdFJlcXVlc3Q8RXZlbnRzQnVzRXZlbnQ+KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKGUgYXMgQ3NIdHRwU2VydmVyRXJyb3IpLnJlc3BvbnNlLnJlc3BvbnNlQ29kZSA9PT0gQXBpU2VydmljZUltcGwuUExBTk5FRF9NQUlOVEVOQU5DRV9FUlJPUl9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzRW1pdHRlZFBsYW5uZWRNYWludGVuYW5jZUVycm9yRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0VtaXR0ZWRQbGFubmVkTWFpbnRlbmFuY2VFcnJvckV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFcnJvckV2ZW50VHlwZS5QTEFOTkVEX01BSU5URU5BTkNFX1BFUklPRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChDc0h0dHBDbGllbnRFcnJvci5pc0luc3RhbmNlKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzQnVzU2VydmljZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEVycm9yRXZlbnRUeXBlLkhUVFBfQ0xJRU5UX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgSHR0cENsaWVudEVycm9yRXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSBhcyBFbWl0UmVxdWVzdDxFdmVudHNCdXNFdmVudD4pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yczogQ3NSZXF1ZXN0SW50ZXJjZXB0b3JbXSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRSZXF1ZXN0SW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0b3JzO1xuXG4gICAgICAgIGlmICh0aGlzLmFwaUNvbmZpZy5kZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFJlcXVlc3RJbnRlcmNlcHRvcnMucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgQ3NSZXF1ZXN0TG9nZ2VySW50ZXJjZXB0b3IoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldERlZmF1bHRSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcnM6IENzUmVzcG9uc2VJbnRlcmNlcHRvcltdKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0b3JzO1xuXG4gICAgICAgIGlmICh0aGlzLmFwaUNvbmZpZy5kZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3JzLnB1c2goXG4gICAgICAgICAgICAgICAgbmV3IENzUmVzcG9uc2VMb2dnZXJJbnRlcmNlcHRvcigpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19