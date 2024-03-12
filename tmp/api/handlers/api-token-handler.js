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
import { ResponseCode } from '..';
import { from } from 'rxjs';
import * as dayjs from 'dayjs';
import { CsHttpRequestType, CsNetworkError, CsRequest } from '@project-sunbird/client-services/core/http-service';
import { JwtUtil } from '../../util/jwt-util';
var ApiTokenHandler = /** @class */ (function () {
    function ApiTokenHandler(config, apiService, deviceInfo) {
        this.config = config;
        this.apiService = apiService;
        this.deviceInfo = deviceInfo;
    }
    ApiTokenHandler.prototype.refreshAuthToken = function () {
        return from(this.getBearerTokenFromKongV2());
    };
    ApiTokenHandler.prototype.getMobileDeviceConsumerKey = function () {
        return this.config.api_authentication.producerId + '-' + this.deviceInfo.getDeviceID();
    };
    ApiTokenHandler.prototype.buildGetMobileDeviceConsumerSecretAPIRequest = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = (_a = new CsRequest.Builder()
                            .withPath(path)
                            .withType(CsHttpRequestType.POST)).withHeaders;
                        _c = {
                            'Content-Encoding': 'gzip'
                        };
                        _d = 'Authorization';
                        _e = "Bearer ";
                        return [4 /*yield*/, this.generateMobileAppConsumerBearerToken()];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c[_d] = _e + (_f.sent()),
                                _c)])
                            .withBody({
                            id: ApiTokenHandler.ID,
                            ver: ApiTokenHandler.VERSION,
                            ts: dayjs().format(),
                            request: {
                                key: this.getMobileDeviceConsumerKey()
                            }
                        })
                            .build()];
                }
            });
        });
    };
    ApiTokenHandler.prototype.getBearerTokenFromKongV2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiPathKongV2, req;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiPathKongV2 = "/api/api-manager/v2/consumer/" + this.config.api_authentication.mobileAppConsumer + "/credential/register";
                        return [4 /*yield*/, this.buildGetMobileDeviceConsumerSecretAPIRequest(apiPathKongV2)];
                    case 1:
                        req = _a.sent();
                        return [2 /*return*/, this.apiService.fetch(req).toPromise()
                                .then(function (res) {
                                return res.body.result.token;
                            }).catch(function (e) {
                                if ((!(CsNetworkError.isInstance(e)))) {
                                    var apiPathKongV1 = "/api/api-manager/v1/consumer/" + _this.config.api_authentication.mobileAppConsumer + "/credential/register";
                                    if (e.response.responseCode === ResponseCode.HTTP_KONG_FAILURE) {
                                        var responseHeaders = e.response.headers;
                                        var fallBackUrl = responseHeaders ? responseHeaders['location'] : apiPathKongV1;
                                        return _this.getBearerTokenFromFallback(fallBackUrl || apiPathKongV1);
                                    }
                                    else {
                                        return _this.getBearerTokenFromFallback(apiPathKongV1);
                                    }
                                }
                                throw e;
                            })];
                }
            });
        });
    };
    ApiTokenHandler.prototype.getBearerTokenFromFallback = function (fallBackUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildGetMobileDeviceConsumerSecretAPIRequest(fallBackUrl)];
                    case 1:
                        req = _a.sent();
                        return [2 /*return*/, this.apiService.fetch(req).toPromise()
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            result = res.body.result;
                                            if (!!result.token) return [3 /*break*/, 2];
                                            return [4 /*yield*/, JwtUtil.createJWTToken(this.getMobileDeviceConsumerKey(), result.secret)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [2 /*return*/, result.token];
                                    }
                                });
                            }); }).catch(function (e) {
                                console.log('e ', e);
                            })];
                }
            });
        });
    };
    ApiTokenHandler.prototype.generateMobileAppConsumerBearerToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mobileAppConsumerKey, mobileAppConsumerSecret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mobileAppConsumerKey = this.config.api_authentication.mobileAppKey;
                        mobileAppConsumerSecret = this.config.api_authentication.mobileAppSecret;
                        return [4 /*yield*/, JwtUtil.createJWTToken(mobileAppConsumerKey, mobileAppConsumerSecret)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiTokenHandler.VERSION = '1.0';
    ApiTokenHandler.ID = 'ekstep.genie.device.register';
    return ApiTokenHandler;
}());
export { ApiTokenHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXRva2VuLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL2hhbmRsZXJzL2FwaS10b2tlbi1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBd0IsWUFBWSxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxJQUFJLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUNoSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7SUFLRSx5QkFDVSxNQUFpQixFQUNqQixVQUFzQixFQUN0QixVQUFzQjtRQUZ0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUVoQyxDQUFDO0lBRU0sMENBQWdCLEdBQXZCO1FBQ0UsT0FBTyxJQUFJLENBQ1QsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRU8sb0RBQTBCLEdBQWxDO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6RixDQUFDO0lBRWEsc0VBQTRDLEdBQTFELFVBQTJELElBQVk7Ozs7Ozt3QkFDOUQsS0FBQSxDQUFBLEtBQUEsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFOzZCQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDOzZCQUNkLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQSxD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dkIsQ0FBQyxDQUFDLEVBQUM7Ozs7S0FDTjtJQUVhLDhEQUFvQyxHQUFsRDs7Ozs7O3dCQUNRLG9CQUFvQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO3dCQUNuRSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQzt3QkFDeEUscUJBQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSx1QkFBdUIsQ0FBQyxFQUFBOzRCQUFsRixzQkFBTyxTQUEyRSxFQUFBOzs7O0tBQ25GO0lBOUV1Qix1QkFBTyxHQUFHLEtBQUssQ0FBQztJQUNoQixrQkFBRSxHQUFHLDhCQUE4QixDQUFDO0lBOEU5RCxzQkFBQztDQUFBLEFBakZELElBaUZDO1NBakZZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwaUNvbmZpZywgQXBpU2VydmljZSwgUmVzcG9uc2VDb2RlfSBmcm9tICcuLic7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHtEZXZpY2VJbmZvfSBmcm9tICcuLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge0NzSHR0cFJlcXVlc3RUeXBlLCBDc05ldHdvcmtFcnJvciwgQ3NSZXF1ZXN0fSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9jb3JlL2h0dHAtc2VydmljZSc7XG5pbXBvcnQgeyBKd3RVdGlsIH0gZnJvbSAnLi4vLi4vdXRpbC9qd3QtdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBBcGlUb2tlbkhhbmRsZXIge1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZFUlNJT04gPSAnMS4wJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSUQgPSAnZWtzdGVwLmdlbmllLmRldmljZS5yZWdpc3Rlcic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IEFwaUNvbmZpZyxcbiAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvXG4gICkge1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2hBdXRoVG9rZW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gZnJvbShcbiAgICAgIHRoaXMuZ2V0QmVhcmVyVG9rZW5Gcm9tS29uZ1YyKClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb2JpbGVEZXZpY2VDb25zdW1lcktleSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLnByb2R1Y2VySWQgKyAnLScgKyB0aGlzLmRldmljZUluZm8uZ2V0RGV2aWNlSUQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYnVpbGRHZXRNb2JpbGVEZXZpY2VDb25zdW1lclNlY3JldEFQSVJlcXVlc3QocGF0aDogc3RyaW5nKTogUHJvbWlzZTxDc1JlcXVlc3Q+IHtcbiAgICByZXR1cm4gbmV3IENzUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgIC53aXRoUGF0aChwYXRoKVxuICAgICAgLndpdGhUeXBlKENzSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAud2l0aEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1FbmNvZGluZyc6ICdnemlwJyxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YXdhaXQgdGhpcy5nZW5lcmF0ZU1vYmlsZUFwcENvbnN1bWVyQmVhcmVyVG9rZW4oKX1gXG4gICAgICB9KVxuICAgICAgLndpdGhCb2R5KHtcbiAgICAgICAgaWQ6IEFwaVRva2VuSGFuZGxlci5JRCxcbiAgICAgICAgdmVyOiBBcGlUb2tlbkhhbmRsZXIuVkVSU0lPTixcbiAgICAgICAgdHM6IGRheWpzKCkuZm9ybWF0KCksXG4gICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICBrZXk6IHRoaXMuZ2V0TW9iaWxlRGV2aWNlQ29uc3VtZXJLZXkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmJ1aWxkKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldEJlYXJlclRva2VuRnJvbUtvbmdWMigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGFwaVBhdGhLb25nVjIgPSBgL2FwaS9hcGktbWFuYWdlci92Mi9jb25zdW1lci8ke3RoaXMuY29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5tb2JpbGVBcHBDb25zdW1lcn0vY3JlZGVudGlhbC9yZWdpc3RlcmA7XG4gICAgbGV0IHJlcSA9IGF3YWl0IHRoaXMuYnVpbGRHZXRNb2JpbGVEZXZpY2VDb25zdW1lclNlY3JldEFQSVJlcXVlc3QoYXBpUGF0aEtvbmdWMik7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaChyZXEpLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuYm9keS5yZXN1bHQudG9rZW47XG4gICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoKCEoQ3NOZXR3b3JrRXJyb3IuaXNJbnN0YW5jZShlKSkpKSB7XG4gICAgICAgICAgY29uc3QgYXBpUGF0aEtvbmdWMSA9IGAvYXBpL2FwaS1tYW5hZ2VyL3YxL2NvbnN1bWVyLyR7dGhpcy5jb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLm1vYmlsZUFwcENvbnN1bWVyfS9jcmVkZW50aWFsL3JlZ2lzdGVyYDtcbiAgICAgICAgICBpZiAoZS5yZXNwb25zZS5yZXNwb25zZUNvZGUgPT09IFJlc3BvbnNlQ29kZS5IVFRQX0tPTkdfRkFJTFVSRSkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gZS5yZXNwb25zZS5oZWFkZXJzO1xuICAgICAgICAgICAgY29uc3QgZmFsbEJhY2tVcmwgPSByZXNwb25zZUhlYWRlcnMgPyByZXNwb25zZUhlYWRlcnNbJ2xvY2F0aW9uJ10gOiBhcGlQYXRoS29uZ1YxO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmVhcmVyVG9rZW5Gcm9tRmFsbGJhY2soZmFsbEJhY2tVcmwgfHwgYXBpUGF0aEtvbmdWMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJlYXJlclRva2VuRnJvbUZhbGxiYWNrKGFwaVBhdGhLb25nVjEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyAgZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRCZWFyZXJUb2tlbkZyb21GYWxsYmFjayhmYWxsQmFja1VybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsZXQgcmVxID0gYXdhaXQgdGhpcy5idWlsZEdldE1vYmlsZURldmljZUNvbnN1bWVyU2VjcmV0QVBJUmVxdWVzdChmYWxsQmFja1VybCk7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaChyZXEpLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlcy5ib2R5LnJlc3VsdDtcbiAgICAgICAgaWYgKCFyZXN1bHQudG9rZW4pIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgSnd0VXRpbC5jcmVhdGVKV1RUb2tlbih0aGlzLmdldE1vYmlsZURldmljZUNvbnN1bWVyS2V5KCksIHJlc3VsdC5zZWNyZXQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlbjtcbiAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlICcsIGUpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdlbmVyYXRlTW9iaWxlQXBwQ29uc3VtZXJCZWFyZXJUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IG1vYmlsZUFwcENvbnN1bWVyS2V5ID0gdGhpcy5jb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLm1vYmlsZUFwcEtleTtcbiAgICBjb25zdCBtb2JpbGVBcHBDb25zdW1lclNlY3JldCA9IHRoaXMuY29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5tb2JpbGVBcHBTZWNyZXQ7XG4gICAgcmV0dXJuIGF3YWl0IEp3dFV0aWwuY3JlYXRlSldUVG9rZW4obW9iaWxlQXBwQ29uc3VtZXJLZXksIG1vYmlsZUFwcENvbnN1bWVyU2VjcmV0KVxuICB9XG59XG4iXX0=