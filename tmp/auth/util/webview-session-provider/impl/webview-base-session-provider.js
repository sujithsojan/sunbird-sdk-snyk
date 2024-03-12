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
import { HttpRequestType, HttpSerializer, Request } from '../../../../api';
import * as qs from 'qs';
import { SignInError } from '../../../errors/sign-in-error';
import { JwtUtil } from '../../../../util/jwt-util';
var WebviewBaseSessionProvider = /** @class */ (function () {
    function WebviewBaseSessionProvider(apiConfig, apiService, eventsBusService) {
        this.apiConfig = apiConfig;
        this.apiService = apiService;
        this.eventsBusService = eventsBusService;
    }
    WebviewBaseSessionProvider.parseAccessToken = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var playload, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JwtUtil.decodeJWT(accessToken)];
                    case 1:
                        playload = _a.sent();
                        payload = JSON.parse(playload);
                        return [2 /*return*/, {
                                userToken: payload.sub.split(':').length === 3 ? payload.sub.split(':').pop() : payload.sub,
                                accessTokenExpiresOn: payload.exp * 1000
                            }];
                }
            });
        });
    };
    WebviewBaseSessionProvider.prototype.buildGoogleTargetUrl = function (captured, extras) {
        var url = new URL(captured['googleRedirectUrl']);
        delete extras['redirect_uri'];
        url.searchParams.set('redirect_uri', this.apiConfig.user_authentication.redirectUrl);
        delete extras['error_callback'];
        url.searchParams.set('error_callback', this.apiConfig.user_authentication.redirectUrl);
        Object.keys(extras).forEach(function (key) { return url.searchParams.set(key, extras[key]); });
        return url;
    };
    WebviewBaseSessionProvider.prototype.buildPasswordSessionProvider = function (dsl, forCase) {
        var _this = this;
        return dsl.capture({
            host: forCase.when.host,
            path: forCase.when.path,
            params: forCase.when.params
        }).then(function () {
            return dsl.closeWebview();
        }).then(function () {
            return dsl.success();
        }).then(function (captured) {
            return _this.resolvePasswordSession(captured);
        });
    };
    WebviewBaseSessionProvider.prototype.buildStateSessionProvider = function (dsl, forCase) {
        var _this = this;
        return dsl.capture({
            host: forCase.when.host,
            path: forCase.when.path,
            params: forCase.when.params
        }).then(function () {
            return dsl.closeWebview();
        }).then(function () {
            return dsl.success();
        }).then(function (captured) {
            return _this.resolveStateSession(captured);
        });
    };
    WebviewBaseSessionProvider.prototype.buildGoogleSessionProvider = function (dsl, forCase, customBrowserConfig) {
        var _this = this;
        return dsl.capture({
            host: forCase.when.host,
            path: forCase.when.path,
            params: forCase.when.params
        }).then(function () {
            return dsl.closeWebview();
        }).then(function () {
            return dsl.success();
        }).then(function (captured) {
            return dsl.getCaptureExtras().then(function (extras) {
                var url = _this.buildGoogleTargetUrl(captured, extras);
                return dsl.launchCustomTab({
                    host: url.origin,
                    path: url.pathname,
                    params: qs.parse(url.searchParams.toString(), { ignoreQueryPrefix: true }),
                    extraParams: customBrowserConfig.get('extraParam')
                }).then(function () {
                    return dsl.success();
                }).then(function (cap) {
                    return _this.resolveGoogleSession(cap);
                });
            });
        });
    };
    WebviewBaseSessionProvider.prototype.resolvePasswordSession = function (captured) {
        var _this = this;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(this.apiConfig.user_authentication.authUrl + '/token')
            .withBody({
            redirect_uri: this.apiConfig.host + '/oauth2callback',
            code: captured['code'],
            grant_type: 'authorization_code',
            client_id: 'android'
        })
            .withHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
            .withSerializer(HttpSerializer.URLENCODED)
            .withBearerToken(false)
            .withUserToken(false)
            .build();
        return this.apiService.fetch(apiRequest)
            .toPromise()
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userToken, accessTokenExpiresOn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(response.body.access_token && response.body.refresh_token)) return [3 /*break*/, 2];
                        return [4 /*yield*/, WebviewBaseSessionProvider.parseAccessToken(response.body.access_token)];
                    case 1:
                        _a = _b.sent(), userToken = _a.userToken, accessTokenExpiresOn = _a.accessTokenExpiresOn;
                        return [2 /*return*/, {
                                access_token: response.body.access_token,
                                refresh_token: response.body.refresh_token,
                                accessTokenExpiresOn: accessTokenExpiresOn,
                                userToken: userToken
                            }];
                    case 2: throw new SignInError('Server Error');
                }
            });
        }); }).catch(function () {
            throw new SignInError('Server Error');
        });
    };
    WebviewBaseSessionProvider.prototype.resolveStateSession = function (captured) {
        var _this = this;
        var apiUrl = "/v1/sso/create/session?id=";
        var params = window.device.platform.toLowerCase() === 'ios' ? encodeURIComponent(captured.id) : captured['id'];
        var completeUrl = apiUrl + params;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.GET)
            .withPath(completeUrl)
            .withUserToken(false)
            .withBearerToken(false)
            .build();
        return this.apiService.fetch(apiRequest)
            .toPromise()
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userToken, accessTokenExpiresOn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(response.body.access_token && response.body.refresh_token)) return [3 /*break*/, 2];
                        return [4 /*yield*/, WebviewBaseSessionProvider.parseAccessToken(response.body.access_token)];
                    case 1:
                        _a = _b.sent(), userToken = _a.userToken, accessTokenExpiresOn = _a.accessTokenExpiresOn;
                        return [2 /*return*/, {
                                access_token: response.body.access_token,
                                refresh_token: response.body.refresh_token,
                                accessTokenExpiresOn: accessTokenExpiresOn,
                                userToken: userToken
                            }];
                    case 2: throw new SignInError('Server Error');
                }
            });
        }); })
            .catch(function () {
            throw new SignInError('Server Error');
        });
    };
    WebviewBaseSessionProvider.prototype.resolveGoogleSession = function (captured) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userToken, accessTokenExpiresOn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(captured['access_token'] && captured['refresh_token'])) return [3 /*break*/, 2];
                        return [4 /*yield*/, WebviewBaseSessionProvider.parseAccessToken(captured['access_token'])];
                    case 1:
                        _a = _b.sent(), userToken = _a.userToken, accessTokenExpiresOn = _a.accessTokenExpiresOn;
                        return [2 /*return*/, {
                                access_token: captured['access_token'],
                                refresh_token: captured['refresh_token'],
                                accessTokenExpiresOn: accessTokenExpiresOn,
                                userToken: userToken
                            }];
                    case 2:
                        if (captured['error_message']) {
                            throw new SignInError(captured['error_message']);
                        }
                        _b.label = 3;
                    case 3: throw new SignInError('Server Error');
                }
            });
        });
    };
    return WebviewBaseSessionProvider;
}());
export { WebviewBaseSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy1iYXNlLXNlc3Npb24tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXV0aC91dGlsL3dlYnZpZXctc2Vzc2lvbi1wcm92aWRlci9pbXBsL3dlYnZpZXctYmFzZS1zZXNzaW9uLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBd0IsZUFBZSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQVcsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUl6QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXBEO0lBYUksb0NBQ2MsU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRmxDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRWhELENBQUM7SUFqQm9CLDJDQUFnQixHQUFyQyxVQUFzQyxXQUFtQjs7Ozs7NEJBSXRDLHFCQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUEvQyxRQUFRLEdBQUcsU0FBb0M7d0JBQzdDLE9BQU8sR0FBaUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbkUsc0JBQU87Z0NBQ0gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxP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TSxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7O2FBQ3pDLENBQUM7YUFDRCxLQUFLLENBQUM7WUFDSCxNQUFNLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVhLHlEQUFvQixHQUFsQyxVQUFtQyxRQUFpQzs7Ozs7OzZCQUM1RCxDQUFBLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUEsRUFBckQsd0JBQXFEO3dCQUNYLHFCQUFNLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFBOzt3QkFBL0csS0FBb0MsU0FBMkUsRUFBOUcsU0FBUyxlQUFBLEVBQUUsb0JBQW9CLDBCQUFBO3dCQUV0QyxzQkFBTztnQ0FDSCxZQUFZLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQztnQ0FDdEMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUM7Z0NBQ3hDLG9CQUFvQixzQkFBQTtnQ0FDcEIsU0FBUyxXQUFBOzZCQUNaLEVBQUM7O3dCQUNDLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFOzRCQUNsQyxNQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO3lCQUNwRDs7NEJBRUQsTUFBTSxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7OztLQUN6QztJQUNMLGlDQUFDO0FBQUQsQ0FBQyxBQWhMRCxJQWdMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpQ29uZmlnLCBBcGlTZXJ2aWNlLCBIdHRwUmVxdWVzdFR5cGUsIEh0dHBTZXJpYWxpemVyLCBSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vLi4vYXBpJztcbmltcG9ydCAqIGFzIHFzIGZyb20gJ3FzJztcbmltcG9ydCB7RXZlbnRzQnVzU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vLi4vZXZlbnRzLWJ1cyc7XG5pbXBvcnQge1Nlc3Npb25Qcm92aWRlcn0gZnJvbSAnLi4vLi4vLi4vZGVmL3Nlc3Npb24tcHJvdmlkZXInO1xuaW1wb3J0IHtPQXV0aFNlc3Npb259IGZyb20gJy4uLy4uLy4uL2RlZi9vLWF1dGgtc2Vzc2lvbic7XG5pbXBvcnQge1NpZ25JbkVycm9yfSBmcm9tICcuLi8uLi8uLi9lcnJvcnMvc2lnbi1pbi1lcnJvcic7XG5pbXBvcnQgeyBKd3RVdGlsIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9qd3QtdXRpbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXZWJ2aWV3QmFzZVNlc3Npb25Qcm92aWRlciBpbXBsZW1lbnRzIFNlc3Npb25Qcm92aWRlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgcGFyc2VBY2Nlc3NUb2tlbihhY2Nlc3NUb2tlbjogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgICAgIHVzZXJUb2tlbjogc3RyaW5nO1xuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZXNPbjogbnVtYmVyO1xuICAgIH0+IHtcbiAgICAgICAgbGV0IHBsYXlsb2FkID0gYXdhaXQgSnd0VXRpbC5kZWNvZGVKV1QoYWNjZXNzVG9rZW4pO1xuICAgICAgICBjb25zdCBwYXlsb2FkOiB7IHN1Yjogc3RyaW5nLCBleHA6IG51bWJlciB9ID0gSlNPTi5wYXJzZShwbGF5bG9hZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1c2VyVG9rZW46IHBheWxvYWQuc3ViLnNwbGl0KCc6JykubGVuZ3RoID09PSAzID8gPHN0cmluZz5wYXlsb2FkLnN1Yi5zcGxpdCgnOicpLnBvcCgpIDogcGF5bG9hZC5zdWIsXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZXNPbjogcGF5bG9hZC5leHAgKiAxMDAwXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpQ29uZmlnOiBBcGlDb25maWcsXG4gICAgICAgIHByb3RlY3RlZCBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZXZlbnRzQnVzU2VydmljZTogRXZlbnRzQnVzU2VydmljZVxuICAgICkge1xuICAgIH1cblxuICAgIGFic3RyYWN0IHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+O1xuXG4gICAgcHJvdGVjdGVkIGJ1aWxkR29vZ2xlVGFyZ2V0VXJsKGNhcHR1cmVkOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgZXh0cmFzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSk6IFVSTCB7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoY2FwdHVyZWRbJ2dvb2dsZVJlZGlyZWN0VXJsJ10pO1xuXG4gICAgICAgIGRlbGV0ZSBleHRyYXNbJ3JlZGlyZWN0X3VyaSddO1xuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncmVkaXJlY3RfdXJpJywgdGhpcy5hcGlDb25maWcudXNlcl9hdXRoZW50aWNhdGlvbi5yZWRpcmVjdFVybCk7XG4gICAgICAgIGRlbGV0ZSBleHRyYXNbJ2Vycm9yX2NhbGxiYWNrJ107XG4gICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdlcnJvcl9jYWxsYmFjaycsIHRoaXMuYXBpQ29uZmlnLnVzZXJfYXV0aGVudGljYXRpb24ucmVkaXJlY3RVcmwpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGV4dHJhcykuZm9yRWFjaChrZXkgPT4gdXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCBleHRyYXNba2V5XSkpO1xuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkUGFzc3dvcmRTZXNzaW9uUHJvdmlkZXIoZHNsLCBmb3JDYXNlKSB7XG4gICAgICAgIHJldHVybiBkc2wuY2FwdHVyZSh7XG4gICAgICAgICAgICBob3N0OiBmb3JDYXNlLndoZW4uaG9zdCxcbiAgICAgICAgICAgIHBhdGg6IGZvckNhc2Uud2hlbi5wYXRoLFxuICAgICAgICAgICAgcGFyYW1zOiBmb3JDYXNlLndoZW4ucGFyYW1zXG4gICAgICAgIH0pLnRoZW4oKCkgPT5cbiAgICAgICAgICAgIGRzbC5jbG9zZVdlYnZpZXcoKVxuICAgICAgICApLnRoZW4oKCkgPT5cbiAgICAgICAgICAgIGRzbC5zdWNjZXNzKClcbiAgICAgICAgKS50aGVuKChjYXB0dXJlZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZVBhc3N3b3JkU2Vzc2lvbihjYXB0dXJlZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFN0YXRlU2Vzc2lvblByb3ZpZGVyKGRzbCwgZm9yQ2FzZSkge1xuICAgICAgICByZXR1cm4gZHNsLmNhcHR1cmUoe1xuICAgICAgICAgICAgaG9zdDogZm9yQ2FzZS53aGVuLmhvc3QsXG4gICAgICAgICAgICBwYXRoOiBmb3JDYXNlLndoZW4ucGF0aCxcbiAgICAgICAgICAgIHBhcmFtczogZm9yQ2FzZS53aGVuLnBhcmFtc1xuICAgICAgICB9KS50aGVuKCgpID0+XG4gICAgICAgICAgICBkc2wuY2xvc2VXZWJ2aWV3KClcbiAgICAgICAgKS50aGVuKCgpID0+XG4gICAgICAgICAgICBkc2wuc3VjY2VzcygpXG4gICAgICAgICkudGhlbigoY2FwdHVyZWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVTdGF0ZVNlc3Npb24oY2FwdHVyZWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRHb29nbGVTZXNzaW9uUHJvdmlkZXIoZHNsLCBmb3JDYXNlLCBjdXN0b21Ccm93c2VyQ29uZmlnPykge1xuICAgICAgICByZXR1cm4gZHNsLmNhcHR1cmUoe1xuICAgICAgICAgICAgaG9zdDogZm9yQ2FzZS53aGVuLmhvc3QsXG4gICAgICAgICAgICBwYXRoOiBmb3JDYXNlLndoZW4ucGF0aCxcbiAgICAgICAgICAgIHBhcmFtczogZm9yQ2FzZS53aGVuLnBhcmFtc1xuICAgICAgICB9KS50aGVuKCgpID0+XG4gICAgICAgICAgICBkc2wuY2xvc2VXZWJ2aWV3KClcbiAgICAgICAgKS50aGVuKCgpID0+XG4gICAgICAgICAgICBkc2wuc3VjY2VzcygpXG4gICAgICAgICkudGhlbigoY2FwdHVyZWQpID0+XG4gICAgICAgICAgICBkc2wuZ2V0Q2FwdHVyZUV4dHJhcygpLnRoZW4oKGV4dHJhcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuYnVpbGRHb29nbGVUYXJnZXRVcmwoY2FwdHVyZWQsIGV4dHJhcyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZHNsLmxhdW5jaEN1c3RvbVRhYih7XG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHVybC5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHVybC5wYXRobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBxcy5wYXJzZSh1cmwuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCksIHtpZ25vcmVRdWVyeVByZWZpeDogdHJ1ZX0pLFxuICAgICAgICAgICAgICAgICAgICBleHRyYVBhcmFtczogY3VzdG9tQnJvd3NlckNvbmZpZy5nZXQoJ2V4dHJhUGFyYW0nKVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgZHNsLnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICkudGhlbigoY2FwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVHb29nbGVTZXNzaW9uKGNhcCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzb2x2ZVBhc3N3b3JkU2Vzc2lvbihjYXB0dXJlZDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBQcm9taXNlPE9BdXRoU2Vzc2lvbj4ge1xuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAgICAgICAud2l0aFBhdGgodGhpcy5hcGlDb25maWcudXNlcl9hdXRoZW50aWNhdGlvbi5hdXRoVXJsICsgJy90b2tlbicpXG4gICAgICAgICAgICAud2l0aEJvZHkoe1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5hcGlDb25maWcuaG9zdCArICcvb2F1dGgyY2FsbGJhY2snLFxuICAgICAgICAgICAgICAgIGNvZGU6IGNhcHR1cmVkWydjb2RlJ10sXG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ2F1dGhvcml6YXRpb25fY29kZScsXG4gICAgICAgICAgICAgICAgY2xpZW50X2lkOiAnYW5kcm9pZCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAud2l0aEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aXRoU2VyaWFsaXplcihIdHRwU2VyaWFsaXplci5VUkxFTkNPREVEKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbihmYWxzZSlcbiAgICAgICAgICAgIC53aXRoVXNlclRva2VuKGZhbHNlKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaChhcGlSZXF1ZXN0KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihhc3luYyAocmVzcG9uc2U6IFJlc3BvbnNlPHsgYWNjZXNzX3Rva2VuOiBzdHJpbmcsIHJlZnJlc2hfdG9rZW46IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5ib2R5LmFjY2Vzc190b2tlbiAmJiByZXNwb25zZS5ib2R5LnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3VzZXJUb2tlbiwgYWNjZXNzVG9rZW5FeHBpcmVzT259ID0gYXdhaXQgV2Vidmlld0Jhc2VTZXNzaW9uUHJvdmlkZXIucGFyc2VBY2Nlc3NUb2tlbihyZXNwb25zZS5ib2R5LmFjY2Vzc190b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2UuYm9keS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZXNwb25zZS5ib2R5LnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZXNPbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJUb2tlblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTaWduSW5FcnJvcignU2VydmVyIEVycm9yJyk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFNpZ25JbkVycm9yKCdTZXJ2ZXIgRXJyb3InKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzb2x2ZVN0YXRlU2Vzc2lvbihjYXB0dXJlZDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBQcm9taXNlPE9BdXRoU2Vzc2lvbj4ge1xuICAgICAgICBjb25zdCBhcGlVcmw9XCIvdjEvc3NvL2NyZWF0ZS9zZXNzaW9uP2lkPVwiXG4gICAgICAgIGxldCBwYXJhbXMgPSB3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09J2lvcycgPyBlbmNvZGVVUklDb21wb25lbnQoY2FwdHVyZWQuaWQpIDpjYXB0dXJlZFsnaWQnXTtcbiAgICAgICAgY29uc3QgY29tcGxldGVVcmwgPSBhcGlVcmwgKyBwYXJhbXM7XG4gICAgICAgIGNvbnN0IGFwaVJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuR0VUKVxuICAgICAgICAgICAgLndpdGhQYXRoKGNvbXBsZXRlVXJsKVxuICAgICAgICAgICAgLndpdGhVc2VyVG9rZW4oZmFsc2UpXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKGZhbHNlKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaChhcGlSZXF1ZXN0KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihhc3luYyAocmVzcG9uc2U6IFJlc3BvbnNlPHsgYWNjZXNzX3Rva2VuOiBzdHJpbmcsIHJlZnJlc2hfdG9rZW46IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5ib2R5LmFjY2Vzc190b2tlbiAmJiByZXNwb25zZS5ib2R5LnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3VzZXJUb2tlbiwgYWNjZXNzVG9rZW5FeHBpcmVzT259ID0gYXdhaXQgV2Vidmlld0Jhc2VTZXNzaW9uUHJvdmlkZXIucGFyc2VBY2Nlc3NUb2tlbihyZXNwb25zZS5ib2R5LmFjY2Vzc190b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2UuYm9keS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZXNwb25zZS5ib2R5LnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZXNPbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJUb2tlblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTaWduSW5FcnJvcignU2VydmVyIEVycm9yJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2lnbkluRXJyb3IoJ1NlcnZlciBFcnJvcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyByZXNvbHZlR29vZ2xlU2Vzc2lvbihjYXB0dXJlZDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBQcm9taXNlPE9BdXRoU2Vzc2lvbj4ge1xuICAgICAgICBpZiAoY2FwdHVyZWRbJ2FjY2Vzc190b2tlbiddICYmIGNhcHR1cmVkWydyZWZyZXNoX3Rva2VuJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IHt1c2VyVG9rZW4sIGFjY2Vzc1Rva2VuRXhwaXJlc09ufSA9IGF3YWl0IFdlYnZpZXdCYXNlU2Vzc2lvblByb3ZpZGVyLnBhcnNlQWNjZXNzVG9rZW4oY2FwdHVyZWRbJ2FjY2Vzc190b2tlbiddKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGNhcHR1cmVkWydhY2Nlc3NfdG9rZW4nXSxcbiAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBjYXB0dXJlZFsncmVmcmVzaF90b2tlbiddLFxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlc09uLFxuICAgICAgICAgICAgICAgIHVzZXJUb2tlblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChjYXB0dXJlZFsnZXJyb3JfbWVzc2FnZSddKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU2lnbkluRXJyb3IoY2FwdHVyZWRbJ2Vycm9yX21lc3NhZ2UnXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgU2lnbkluRXJyb3IoJ1NlcnZlciBFcnJvcicpO1xuICAgIH1cbn1cbiJdfQ==