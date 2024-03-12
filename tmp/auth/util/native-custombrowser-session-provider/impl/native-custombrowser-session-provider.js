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
import { SunbirdSdk } from '../../../../sdk';
import { WebviewRunnerImpl } from '../../webview-session-provider/impl/webview-runner-impl';
import * as qs from 'qs';
import { JwtUtil } from '../../../../util/jwt-util';
var NativeCustomBrowserSessionProvider = /** @class */ (function () {
    function NativeCustomBrowserSessionProvider(loginConfig, customWebViewConfig, webviewRunner) {
        this.loginConfig = loginConfig;
        this.customWebViewConfig = customWebViewConfig;
        this.apiConfig = SunbirdSdk.instance.sdkConfig.apiConfig;
        this.telemetryService = SunbirdSdk.instance.telemetryService;
        this.webviewRunner = webviewRunner || new WebviewRunnerImpl();
    }
    NativeCustomBrowserSessionProvider.parseAccessToken = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var decodeToken, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JwtUtil.decodeJWT(accessToken)];
                    case 1:
                        decodeToken = _a.sent();
                        payload = JSON.parse(decodeToken);
                        return [2 /*return*/, {
                                userToken: payload.sub.split(':').length === 3 ? payload.sub.split(':').pop() : payload.sub,
                                accessTokenExpiresOn: payload.exp * 1000
                            }];
                }
            });
        });
    };
    NativeCustomBrowserSessionProvider.prototype.buildGoogleTargetUrl = function (redirecturl, extras) {
        var url = new URL(redirecturl['googleRedirectUrl']);
        delete extras['redirect_uri'];
        url.searchParams.set('redirect_uri', this.apiConfig.user_authentication.redirectUrl);
        delete extras['error_callback'];
        url.searchParams.set('error_callback', this.apiConfig.user_authentication.redirectUrl);
        Object.keys(extras).forEach(function (key) { return url.searchParams.set(key, extras[key]); });
        return url;
    };
    NativeCustomBrowserSessionProvider.prototype.provide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dsl, telemetryContext, redirectUrl, obj, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dsl = this.webviewRunner;
                        return [4 /*yield*/, this.telemetryService.buildContext().toPromise()];
                    case 1:
                        telemetryContext = _a.sent();
                        this.loginConfig.target.params.push({
                            key: 'pdata',
                            value: JSON.stringify(telemetryContext.pdata)
                        });
                        redirectUrl = "";
                        obj = {};
                        (this.loginConfig.target.params).forEach(function (item) {
                            if (item['key'] == 'redirect_uri') {
                                redirectUrl = item['value'];
                            }
                            obj[item.key] = item.value;
                        });
                        url = this.buildGoogleTargetUrl({ "googleRedirectUrl": this.loginConfig.target.host + "/" + NativeCustomBrowserSessionProvider.LOGIN_API_ENDPOINT + "?redirect_uri=" + redirectUrl }, obj);
                        return [2 /*return*/, dsl.launchCustomTab({
                                host: url.origin,
                                path: url.pathname,
                                params: qs.parse(url.searchParams.toString(), { ignoreQueryPrefix: true }),
                                extraParams: this.customWebViewConfig.get('extraParam')
                            }).then(function () {
                                return dsl.success();
                            }).then(function (success) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = {
                                                access_token: success.access_token,
                                                refresh_token: success.refresh_token
                                            };
                                            return [4 /*yield*/, NativeCustomBrowserSessionProvider.parseAccessToken(success.access_token)];
                                        case 1: return [2 /*return*/, (_a.userToken = (_b.sent()).userToken,
                                                _a)];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    NativeCustomBrowserSessionProvider.LOGIN_API_ENDPOINT = '/google/auth';
    return NativeCustomBrowserSessionProvider;
}());
export { NativeCustomBrowserSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWN1c3RvbWJyb3dzZXItc2Vzc2lvbi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hdXRoL3V0aWwvbmF0aXZlLWN1c3RvbWJyb3dzZXItc2Vzc2lvbi1wcm92aWRlci9pbXBsL25hdGl2ZS1jdXN0b21icm93c2VyLXNlc3Npb24tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBRTVGLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVwRDtJQWtCSSw0Q0FDWSxXQUF5QyxFQUN6QyxtQkFBeUIsRUFDakMsYUFBNkI7UUFGckIsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ3pDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBTTtRQUdqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsSUFBSSxJQUFJLGlCQUFpQixFQUFFLENBQUM7SUFDbEUsQ0FBQztJQXBCb0IsbURBQWdCLEdBQXJDLFVBQXNDLFdBQW1COzs7Ozs0QkFJbkMscUJBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQWxELFdBQVcsR0FBRyxTQUFvQzt3QkFDaEQsT0FBTyxHQUFpQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN0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QW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQzs2QkFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDSixPQUFBLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQWIsQ0FBYSxDQUNoQixDQUFDLElBQUksQ0FBQyxVQUFPLE9BQU87Ozs7OztnREFFYixZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7Z0RBQ2xDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTs7NENBQ3hCLHFCQUFNLGtDQUFrQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBQTtnREFIL0YsdUJBR0ksWUFBUyxHQUFFLENBQUMsU0FBK0UsQ0FBQyxDQUFDLFNBQVM7cURBQ3hHOzs7aUNBQ0wsQ0FBQyxFQUFDOzs7O0tBQ047SUF0RXVCLHFEQUFrQixHQUFHLGNBQWMsQ0FBQztJQXVFaEUseUNBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQXhFWSxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXNzaW9uUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi9kZWYvc2Vzc2lvbi1wcm92aWRlcic7XG5pbXBvcnQgeyBBcGlDb25maWd9IGZyb20gJy4uLy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQgeyBTdW5iaXJkU2RrIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2RrJztcbmltcG9ydCB7IFdlYnZpZXdTZXNzaW9uUHJvdmlkZXJDb25maWcgfSBmcm9tICcuLi8uLi93ZWJ2aWV3LXNlc3Npb24tcHJvdmlkZXIvZGVmL3dlYnZpZXctc2Vzc2lvbi1wcm92aWRlci1jb25maWcnO1xuaW1wb3J0IHsgV2Vidmlld1J1bm5lciB9IGZyb20gJy4uLy4uL3dlYnZpZXctc2Vzc2lvbi1wcm92aWRlci9kZWYvd2Vidmlldy1ydW5uZXInO1xuaW1wb3J0IHsgV2Vidmlld1J1bm5lckltcGwgfSBmcm9tICcuLi8uLi93ZWJ2aWV3LXNlc3Npb24tcHJvdmlkZXIvaW1wbC93ZWJ2aWV3LXJ1bm5lci1pbXBsJztcbmltcG9ydCB7IFRlbGVtZXRyeVNlcnZpY2UgfSBmcm9tICdzcmMvdGVsZW1ldHJ5L2RlZi90ZWxlbWV0cnktc2VydmljZSc7XG5pbXBvcnQgKiBhcyBxcyBmcm9tICdxcyc7XG5pbXBvcnQgeyBKd3RVdGlsIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9qd3QtdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVDdXN0b21Ccm93c2VyU2Vzc2lvblByb3ZpZGVyIGltcGxlbWVudHMgU2Vzc2lvblByb3ZpZGVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBMT0dJTl9BUElfRU5EUE9JTlQgPSAnL2dvb2dsZS9hdXRoJztcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYnZpZXdSdW5uZXI6IFdlYnZpZXdSdW5uZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZWxlbWV0cnlTZXJ2aWNlOiBUZWxlbWV0cnlTZXJ2aWNlO1xuICAgIHByaXZhdGUgYXBpQ29uZmlnOiBBcGlDb25maWc7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBwYXJzZUFjY2Vzc1Rva2VuKGFjY2Vzc1Rva2VuOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICAgICAgdXNlclRva2VuOiBzdHJpbmc7XG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlc09uOiBudW1iZXI7XG4gICAgfT4ge1xuICAgICAgICBsZXQgZGVjb2RlVG9rZW4gPSBhd2FpdCBKd3RVdGlsLmRlY29kZUpXVChhY2Nlc3NUb2tlbik7XG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IHsgc3ViOiBzdHJpbmcsIGV4cDogbnVtYmVyIH0gPSBKU09OLnBhcnNlKGRlY29kZVRva2VuKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXJUb2tlbjogcGF5bG9hZC5zdWIuc3BsaXQoJzonKS5sZW5ndGggPT09IDMgPyA8c3RyaW5nPnBheWxvYWQuc3ViLnNwbGl0KCc6JykucG9wKCkgOiBwYXlsb2FkLnN1YixcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlc09uOiBwYXlsb2FkLmV4cCAqIDEwMDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBsb2dpbkNvbmZpZzogV2Vidmlld1Nlc3Npb25Qcm92aWRlckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBjdXN0b21XZWJWaWV3Q29uZmlnPzogYW55LFxuICAgICAgICB3ZWJ2aWV3UnVubmVyPzogV2Vidmlld1J1bm5lclxuICAgICkge1xuICAgICAgICB0aGlzLmFwaUNvbmZpZyA9IFN1bmJpcmRTZGsuaW5zdGFuY2Uuc2RrQ29uZmlnLmFwaUNvbmZpZztcbiAgICAgICAgdGhpcy50ZWxlbWV0cnlTZXJ2aWNlID0gU3VuYmlyZFNkay5pbnN0YW5jZS50ZWxlbWV0cnlTZXJ2aWNlO1xuICAgICAgICB0aGlzLndlYnZpZXdSdW5uZXIgPSB3ZWJ2aWV3UnVubmVyIHx8IG5ldyBXZWJ2aWV3UnVubmVySW1wbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEdvb2dsZVRhcmdldFVybChyZWRpcmVjdHVybDoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIGV4dHJhczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBVUkwge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlZGlyZWN0dXJsWydnb29nbGVSZWRpcmVjdFVybCddKTtcblxuICAgICAgICBkZWxldGUgZXh0cmFzWydyZWRpcmVjdF91cmknXTtcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3JlZGlyZWN0X3VyaScsIHRoaXMuYXBpQ29uZmlnLnVzZXJfYXV0aGVudGljYXRpb24ucmVkaXJlY3RVcmwpO1xuICAgICAgICBkZWxldGUgZXh0cmFzWydlcnJvcl9jYWxsYmFjayddO1xuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnZXJyb3JfY2FsbGJhY2snLCB0aGlzLmFwaUNvbmZpZy51c2VyX2F1dGhlbnRpY2F0aW9uLnJlZGlyZWN0VXJsKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhleHRyYXMpLmZvckVhY2goa2V5ID0+IHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgZXh0cmFzW2tleV0pKTtcblxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgZHNsID0gdGhpcy53ZWJ2aWV3UnVubmVyO1xuICAgICAgICBjb25zdCB0ZWxlbWV0cnlDb250ZXh0ID0gYXdhaXQgdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmJ1aWxkQ29udGV4dCgpLnRvUHJvbWlzZSgpO1xuICAgICAgICB0aGlzLmxvZ2luQ29uZmlnLnRhcmdldC5wYXJhbXMucHVzaCh7XG4gICAgICAgICAgIGtleTogJ3BkYXRhJyxcbiAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRlbGVtZXRyeUNvbnRleHQucGRhdGEpXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVkaXJlY3RVcmwgPSBcIlwiO1xuICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICh0aGlzLmxvZ2luQ29uZmlnLnRhcmdldC5wYXJhbXMpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtWydrZXknXSA9PSAncmVkaXJlY3RfdXJpJykge1xuICAgICAgICAgICAgcmVkaXJlY3RVcmwgPSBpdGVtWyd2YWx1ZSddO1xuICAgICAgICB9XG4gICAgICAgICAgICBvYmpbaXRlbS5rZXldID0gaXRlbS52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuYnVpbGRHb29nbGVUYXJnZXRVcmwoe1wiZ29vZ2xlUmVkaXJlY3RVcmxcIjogYCR7dGhpcy5sb2dpbkNvbmZpZy50YXJnZXQuaG9zdH0vJHtOYXRpdmVDdXN0b21Ccm93c2VyU2Vzc2lvblByb3ZpZGVyLkxPR0lOX0FQSV9FTkRQT0lOVH0/cmVkaXJlY3RfdXJpPSR7cmVkaXJlY3RVcmx9YH0sIG9iaik7XG4gICAgICAgIHJldHVybiBkc2wubGF1bmNoQ3VzdG9tVGFiKHtcbiAgICAgICAgICAgIGhvc3Q6IHVybC5vcmlnaW4sXG4gICAgICAgICAgICBwYXRoOiB1cmwucGF0aG5hbWUsXG4gICAgICAgICAgICBwYXJhbXM6IHFzLnBhcnNlKHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKSwge2lnbm9yZVF1ZXJ5UHJlZml4OiB0cnVlfSksXG4gICAgICAgICAgICBleHRyYVBhcmFtczogdGhpcy5jdXN0b21XZWJWaWV3Q29uZmlnLmdldCgnZXh0cmFQYXJhbScpXG4gICAgICAgIH0pLnRoZW4oKCkgPT5cbiAgICAgICAgICAgIGRzbC5zdWNjZXNzKClcbiAgICAgICAgKS50aGVuKGFzeW5jIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogc3VjY2Vzcy5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogc3VjY2Vzcy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgIHVzZXJUb2tlbjogKGF3YWl0IE5hdGl2ZUN1c3RvbUJyb3dzZXJTZXNzaW9uUHJvdmlkZXIucGFyc2VBY2Nlc3NUb2tlbihzdWNjZXNzLmFjY2Vzc190b2tlbikpLnVzZXJUb2tlblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19