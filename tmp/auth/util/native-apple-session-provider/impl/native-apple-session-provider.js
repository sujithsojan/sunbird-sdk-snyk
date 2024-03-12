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
var NativeAppleSessionProvider = /** @class */ (function () {
    function NativeAppleSessionProvider(nativeAppleTokenProvider) {
        this.nativeAppleTokenProvider = nativeAppleTokenProvider;
        this.apiService = SunbirdSdk.instance.apiService;
        console.log(this.apiService);
    }
    NativeAppleSessionProvider.parseAccessToken = function (accessToken) {
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
    NativeAppleSessionProvider.prototype.provide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appleSignInRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeAppleTokenProvider()];
                    case 1:
                        appleSignInRes = _a.sent();
                        return [2 /*return*/, this.callAppleNativeLogin(appleSignInRes).toPromise()];
                }
            });
        });
    };
    NativeAppleSessionProvider.prototype.callAppleNativeLogin = function (appleSignInRes) {
        var _this = this;
        var platform = window.device.platform.toLowerCase() === 'ios' ? 'ios' : null;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(NativeAppleSessionProvider.LOGIN_API_ENDPOINT)
            .withBearerToken(false)
            .withUserToken(false)
            .withBody(__assign({ emailId: appleSignInRes.email, platform: platform }, appleSignInRes))
            .build();
        return this.apiService.fetch(apiRequest)
            .pipe(map(function (success) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (success.body) {
                            CsModule.instance.updateAuthTokenConfig(success.body.sessionId.access_token);
                        }
                        _a = {
                            access_token: success.body.sessionId.access_token,
                            refresh_token: success.body.sessionId.refresh_token
                        };
                        return [4 /*yield*/, NativeAppleSessionProvider.parseAccessToken(success.body.sessionId.access_token)];
                    case 1: return [2 /*return*/, (_a.userToken = (_b.sent()).userToken,
                            _a)];
                }
            });
        }); }));
    };
    NativeAppleSessionProvider.LOGIN_API_ENDPOINT = '/apple/auth/ios';
    return NativeAppleSessionProvider;
}());
export { NativeAppleSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWFwcGxlLXNlc3Npb24tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXV0aC91dGlsL25hdGl2ZS1hcHBsZS1zZXNzaW9uLXByb3ZpZGVyL2ltcGwvbmF0aXZlLWFwcGxlLXNlc3Npb24tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQWEsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQW1CcEQ7SUFpQkksb0NBQ1ksd0JBQTBEO1FBQTFELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBa0M7UUFFbEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBakJvQiwyQ0FBZ0IsR0FBckMsVUFBc0MsV0FBbUI7Ozs7OzRCQUluQyxxQkFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbEQsV0FBVyxHQUFHLFNBQW9DO3dCQUNoRCxPQUFPLEdBQWlDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3RFLHNCQUFPO2dDQUNILFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBUyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0NBQ25HLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSTs2QkFDM0MsRUFBQzs7OztLQUNMO0lBU0ssNENBQU8sR0FBYjs7Ozs7NEJBQzJCLHFCQUFNLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFBOzt3QkFBdEQsY0FBYyxHQUFHLFNBQXFDO3dCQUM1RCxzQkFBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUM7Ozs7S0FDaEU7SUFFTyx5REFBb0IsR0FBNUIsVUFBNkIsY0FBYztRQUEzQyxpQkEwQkM7UUF6QkcsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvRSxJQUFNLFVBQVUsR0FBWSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7YUFDOUIsUUFBUSxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDO2FBQ3ZELGVBQWUsQ0FBQyxLQUFLLENBQUM7YUFDdEIsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUNwQixRQUFRLFlBQ0wsT0FBTyxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQzdCLFFBQVEsVUFBQSxJQUNMLGNBQWMsRUFDbkI7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQWdFLFVBQVUsQ0FBQzthQUNsRyxJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQU8sT0FBTzs7Ozs7d0JBQ2QsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFOzRCQUNkLFFBQVEsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQ2hGOzs0QkFFRyxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWTs0QkFDakQsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWE7O3dCQUN2QyxxQkFBTSwwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBQTs0QkFIdEcsdUJBR0ksWUFBUyxHQUFFLENBQUMsU0FBc0YsQ0FBQyxDQUFDLFNBQVM7aUNBQy9HOzs7YUFDTCxDQUFDLENBQ0wsQ0FBQztJQUNWLENBQUM7SUFyRHVCLDZDQUFrQixHQUFHLGlCQUFpQixDQUFDO0lBc0RuRSxpQ0FBQztDQUFBLEFBeERELElBd0RDO1NBeERZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2Vzc2lvblByb3ZpZGVyfSBmcm9tICcuLi8uLi8uLi9kZWYvc2Vzc2lvbi1wcm92aWRlcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBcGlTZXJ2aWNlLCBIdHRwUmVxdWVzdFR5cGUsIFJlcXVlc3R9IGZyb20gJy4uLy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtPQXV0aFNlc3Npb259IGZyb20gJy4uLy4uLy4uL2RlZi9vLWF1dGgtc2Vzc2lvbic7XG5pbXBvcnQge1N1bmJpcmRTZGt9IGZyb20gJy4uLy4uLy4uLy4uL3Nkayc7XG5pbXBvcnQge0NzTW9kdWxlfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBKd3RVdGlsIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9qd3QtdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF0aXZlQXBwbGVUb2tlbnMge1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgYXV0aG9yaXphdGlvbkNvZGU6IHN0cmluZztcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIGlkZW50aXR5VG9rZW46IHN0cmluZztcbiAgICBmdWxsTmFtZToge1xuICAgICAgICBuaWNrbmFtZTogc3RyaW5nO1xuICAgICAgICBwaG9uZXRpY1JlcHJlc2VudGF0aW9uOiBzdHJpbmc7XG4gICAgICAgIG1pZGRsZU5hbWU6IHN0cmluZ1xuICAgICAgICBmYW1pbHlOYW1lOiBzdHJpbmc7XG4gICAgICAgIG5hbWVQcmVmaXg6IHN0cmluZztcbiAgICAgICAgZ2l2ZW5OYW1lOiBzdHJpbmc7XG4gICAgICAgIG5hbWVTdWZmaXg6IHN0cmluZztcbiAgICB9O1xuICAgIHVzZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE5hdGl2ZUFwcGxlU2Vzc2lvblByb3ZpZGVyIGltcGxlbWVudHMgU2Vzc2lvblByb3ZpZGVyIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IExPR0lOX0FQSV9FTkRQT0lOVCA9ICcvYXBwbGUvYXV0aC9pb3MnO1xuICAgIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZTtcblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHBhcnNlQWNjZXNzVG9rZW4oYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8e1xuICAgICAgICB1c2VyVG9rZW46IHN0cmluZztcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVzT246IG51bWJlcjtcbiAgICB9PiB7XG4gICAgICAgIGxldCBkZWNvZGVUb2tlbiA9IGF3YWl0IEp3dFV0aWwuZGVjb2RlSldUKGFjY2Vzc1Rva2VuKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogeyBzdWI6IHN0cmluZywgZXhwOiBudW1iZXIgfSA9IEpTT04ucGFyc2UoZGVjb2RlVG9rZW4pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXNlclRva2VuOiBwYXlsb2FkLnN1Yi5zcGxpdCgnOicpLmxlbmd0aCA9PT0gMyA/IDxzdHJpbmc+cGF5bG9hZC5zdWIuc3BsaXQoJzonKS5wb3AoKSA6IHBheWxvYWQuc3ViLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVzT246IHBheWxvYWQuZXhwICogMTAwMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG5hdGl2ZUFwcGxlVG9rZW5Qcm92aWRlcjogKCkgPT4gUHJvbWlzZTxOYXRpdmVBcHBsZVRva2Vucz5cbiAgICApIHtcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlID0gU3VuYmlyZFNkay5pbnN0YW5jZS5hcGlTZXJ2aWNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFwaVNlcnZpY2UpO1xuICAgIH1cblxuICAgIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgY29uc3QgYXBwbGVTaWduSW5SZXMgPSBhd2FpdCB0aGlzLm5hdGl2ZUFwcGxlVG9rZW5Qcm92aWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsQXBwbGVOYXRpdmVMb2dpbihhcHBsZVNpZ25JblJlcykudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxsQXBwbGVOYXRpdmVMb2dpbihhcHBsZVNpZ25JblJlcyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtID0gd2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSAnaW9zJyA/ICdpb3MnIDogbnVsbDtcbiAgICAgICAgY29uc3QgYXBpUmVxdWVzdDogUmVxdWVzdCA9IG5ldyBSZXF1ZXN0LkJ1aWxkZXIoKVxuICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QT1NUKVxuICAgICAgICAgICAgLndpdGhQYXRoKE5hdGl2ZUFwcGxlU2Vzc2lvblByb3ZpZGVyLkxPR0lOX0FQSV9FTkRQT0lOVClcbiAgICAgICAgICAgIC53aXRoQmVhcmVyVG9rZW4oZmFsc2UpXG4gICAgICAgICAgICAud2l0aFVzZXJUb2tlbihmYWxzZSlcbiAgICAgICAgICAgIC53aXRoQm9keSh7XG4gICAgICAgICAgICAgICAgZW1haWxJZDogYXBwbGVTaWduSW5SZXMuZW1haWwsXG4gICAgICAgICAgICAgICAgcGxhdGZvcm0sXG4gICAgICAgICAgICAgICAgLi4uYXBwbGVTaWduSW5SZXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaDx7IHNlc3Npb25JZDogeyBhY2Nlc3NfdG9rZW46IHN0cmluZywgcmVmcmVzaF90b2tlbjogc3RyaW5nIH19PihhcGlSZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKGFzeW5jIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLnVwZGF0ZUF1dGhUb2tlbkNvbmZpZyhzdWNjZXNzLmJvZHkuc2Vzc2lvbklkLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogc3VjY2Vzcy5ib2R5LnNlc3Npb25JZC5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBzdWNjZXNzLmJvZHkuc2Vzc2lvbklkLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyVG9rZW46IChhd2FpdCBOYXRpdmVBcHBsZVNlc3Npb25Qcm92aWRlci5wYXJzZUFjY2Vzc1Rva2VuKHN1Y2Nlc3MuYm9keS5zZXNzaW9uSWQuYWNjZXNzX3Rva2VuKSkudXNlclRva2VuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19