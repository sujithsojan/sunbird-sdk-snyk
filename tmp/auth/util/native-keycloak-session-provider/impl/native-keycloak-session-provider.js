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
import { HttpRequestType, Request } from '../../../../api';
import { map } from 'rxjs/operators';
import { SunbirdSdk } from '../../../../sdk';
import { CsModule } from '@project-sunbird/client-services';
import { JwtUtil } from '../../../../util/jwt-util';
var NativeKeycloakSessionProvider = /** @class */ (function () {
    function NativeKeycloakSessionProvider(loginConfig, nativeKeycloakTokenProvider) {
        this.loginConfig = loginConfig;
        this.nativeKeycloakTokenProvider = nativeKeycloakTokenProvider;
        this.apiService = SunbirdSdk.instance.apiService;
    }
    NativeKeycloakSessionProvider.parseAccessToken = function (accessToken) {
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
    NativeKeycloakSessionProvider.prototype.provide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.callKeycloakNativeLogin(this.nativeKeycloakTokenProvider.username, this.nativeKeycloakTokenProvider.password).toPromise()];
            });
        });
    };
    NativeKeycloakSessionProvider.prototype.callKeycloakNativeLogin = function (emailId, password) {
        var _this = this;
        var platform = window.device.platform.toLowerCase() === 'ios' ? 'ios' : window.device.platform.toLowerCase();
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(NativeKeycloakSessionProvider.LOGIN_API_ENDPOINT)
            .withBearerToken(false)
            .withUserToken(false)
            .withBody({
            client_id: platform,
            emailId: emailId,
            password: password,
            loginConfig: this.loginConfig.target
        })
            .build();
        return this.apiService.fetch(apiRequest)
            .pipe(map(function (success) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_b = success === null || success === void 0 ? void 0 : success.body) === null || _b === void 0 ? void 0 : _b.access_token)) return [3 /*break*/, 2];
                        CsModule.instance.updateAuthTokenConfig(success.body.access_token);
                        _a = {
                            access_token: success.body.access_token,
                            refresh_token: success.body.refresh_token
                        };
                        return [4 /*yield*/, NativeKeycloakSessionProvider.parseAccessToken(success.body.access_token)];
                    case 1: return [2 /*return*/, (_a.userToken = (_c.sent()).userToken,
                            _a)];
                    case 2: return [2 /*return*/, success.body];
                }
            });
        }); }));
    };
    NativeKeycloakSessionProvider.LOGIN_API_ENDPOINT = '/keycloak/login';
    return NativeKeycloakSessionProvider;
}());
export { NativeKeycloakSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWtleWNsb2FrLXNlc3Npb24tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXV0aC91dGlsL25hdGl2ZS1rZXljbG9hay1zZXNzaW9uLXByb3ZpZGVyL2ltcGwvbmF0aXZlLWtleWNsb2FrLXNlc3Npb24tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFjLGVBQWUsRUFBRSxPQUFPLEVBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPcEQ7SUFpQkksdUNBQ1ksV0FBeUMsRUFDekMsMkJBQWlEO1FBRGpELGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUN6QyxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQXNCO1FBRXpELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDckQsQ0FBQztJQWpCb0IsOENBQWdCLEdBQXJDLFVBQXNDLFdBQW1COzs7Ozs0QkFJbkMscUJBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQWxELFdBQVcsR0FBRyxTQUFvQzt3QkFDaEQsT0FBTyxHQUFpQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN0RSxzQkFBTztnQ0FDSCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQVMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dDQUNuRyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUk7NkJBQzNDLEVBQUM7Ozs7S0FDTDtJQVNLLCtDQUFPLEdBQWI7OztnQkFDSSxzQkFBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUM7OztLQUN6STtJQUVPLCtEQUF1QixHQUEvQixVQUFnQyxPQUFlLEVBQUUsUUFBZ0I7UUFBakUsaUJBNkJDO1FBNUJHLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5RyxJQUFNLFVBQVUsR0FBWSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7YUFDOUIsUUFBUSxDQUFDLDZCQUE2QixDQUFDLGtCQUFrQixDQUFDO2FBQzFELGVBQWUsQ0FBQyxLQUFLLENBQUM7YUFDdEIsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUNwQixRQUFRLENBQUM7WUFDTixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1NBQ3ZDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQWtELFVBQVUsQ0FBQzthQUNwRixJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQU8sT0FBTzs7Ozs7O29DQUNWLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLDBDQUFFLFlBQVk7d0JBQzNCLFFBQVEsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7NEJBRS9ELFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVk7NEJBQ3ZDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWE7O3dCQUM3QixxQkFBTSw2QkFBNkIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFBOzRCQUgvRix1QkFHSSxZQUFTLEdBQUUsQ0FBQyxTQUErRSxDQUFDLENBQUMsU0FBUztpQ0FDeEc7NEJBRUYsc0JBQU8sT0FBTyxDQUFDLElBQUksRUFBQzs7O2FBRTNCLENBQUMsQ0FDTCxDQUFDO0lBQ1YsQ0FBQztJQXhEdUIsZ0RBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUF5RG5FLG9DQUFDO0NBQUEsQUExREQsSUEwREM7U0ExRFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Vzc2lvblByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vLi4vZGVmL3Nlc3Npb24tcHJvdmlkZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0LCBBcGlDb25maWd9IGZyb20gJy4uLy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdW5iaXJkU2RrIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2RrJztcbmltcG9ydCB7IENzTW9kdWxlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMnO1xuaW1wb3J0IHsgV2Vidmlld1Nlc3Npb25Qcm92aWRlckNvbmZpZyB9IGZyb20gJy4uLy4uL3dlYnZpZXctc2Vzc2lvbi1wcm92aWRlci9kZWYvd2Vidmlldy1zZXNzaW9uLXByb3ZpZGVyLWNvbmZpZyc7XG5pbXBvcnQgeyBKd3RVdGlsIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9qd3QtdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF0aXZlS2V5Y2xvYWtUb2tlbnMge1xuICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE5hdGl2ZUtleWNsb2FrU2Vzc2lvblByb3ZpZGVyIGltcGxlbWVudHMgU2Vzc2lvblByb3ZpZGVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBMT0dJTl9BUElfRU5EUE9JTlQgPSAnL2tleWNsb2FrL2xvZ2luJztcbiAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2U7XG4gICAgcHJvdGVjdGVkIGFwaUNvbmZpZzogQXBpQ29uZmlnO1xuICAgIFxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHBhcnNlQWNjZXNzVG9rZW4oYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8e1xuICAgICAgICB1c2VyVG9rZW46IHN0cmluZztcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVzT246IG51bWJlcjtcbiAgICB9PiB7XG4gICAgICAgIGxldCBkZWNvZGVUb2tlbiA9IGF3YWl0IEp3dFV0aWwuZGVjb2RlSldUKGFjY2Vzc1Rva2VuKVxuICAgICAgICBjb25zdCBwYXlsb2FkOiB7IHN1Yjogc3RyaW5nLCBleHA6IG51bWJlciB9ID0gSlNPTi5wYXJzZShkZWNvZGVUb2tlbik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1c2VyVG9rZW46IHBheWxvYWQuc3ViLnNwbGl0KCc6JykubGVuZ3RoID09PSAzID8gPHN0cmluZz5wYXlsb2FkLnN1Yi5zcGxpdCgnOicpLnBvcCgpIDogcGF5bG9hZC5zdWIsXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZXNPbjogcGF5bG9hZC5leHAgKiAxMDAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGxvZ2luQ29uZmlnOiBXZWJ2aWV3U2Vzc2lvblByb3ZpZGVyQ29uZmlnLFxuICAgICAgICBwcml2YXRlIG5hdGl2ZUtleWNsb2FrVG9rZW5Qcm92aWRlcjogTmF0aXZlS2V5Y2xvYWtUb2tlbnNcbiAgICApIHtcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlID0gU3VuYmlyZFNkay5pbnN0YW5jZS5hcGlTZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbEtleWNsb2FrTmF0aXZlTG9naW4odGhpcy5uYXRpdmVLZXljbG9ha1Rva2VuUHJvdmlkZXIudXNlcm5hbWUsIHRoaXMubmF0aXZlS2V5Y2xvYWtUb2tlblByb3ZpZGVyLnBhc3N3b3JkKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGxLZXljbG9ha05hdGl2ZUxvZ2luKGVtYWlsSWQ6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtID0gd2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSdpb3MnID8gJ2lvcycgOiB3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGFwaVJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuUE9TVClcbiAgICAgICAgICAgIC53aXRoUGF0aChOYXRpdmVLZXljbG9ha1Nlc3Npb25Qcm92aWRlci5MT0dJTl9BUElfRU5EUE9JTlQpXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhVc2VyVG9rZW4oZmFsc2UpXG4gICAgICAgICAgICAud2l0aEJvZHkoe1xuICAgICAgICAgICAgICAgIGNsaWVudF9pZDogcGxhdGZvcm0sXG4gICAgICAgICAgICAgICAgZW1haWxJZDogZW1haWxJZCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgbG9naW5Db25maWc6IHRoaXMubG9naW5Db25maWcudGFyZ2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZmV0Y2g8eyBhY2Nlc3NfdG9rZW46IHN0cmluZywgcmVmcmVzaF90b2tlbjogc3RyaW5nIH0+KGFwaVJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoYXN5bmMgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3M/LmJvZHk/LmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UudXBkYXRlQXV0aFRva2VuQ29uZmlnKHN1Y2Nlc3MuYm9keS5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IHN1Y2Nlc3MuYm9keS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogc3VjY2Vzcy5ib2R5LnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlclRva2VuOiAoYXdhaXQgTmF0aXZlS2V5Y2xvYWtTZXNzaW9uUHJvdmlkZXIucGFyc2VBY2Nlc3NUb2tlbihzdWNjZXNzLmJvZHkuYWNjZXNzX3Rva2VuKSkudXNlclRva2VuXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3MuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==