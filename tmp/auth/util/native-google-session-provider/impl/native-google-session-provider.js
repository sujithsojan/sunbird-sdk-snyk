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
var NativeGoogleSessionProvider = /** @class */ (function () {
    function NativeGoogleSessionProvider(nativeGoogleTokenProvider) {
        this.nativeGoogleTokenProvider = nativeGoogleTokenProvider;
        this.apiService = SunbirdSdk.instance.apiService;
    }
    NativeGoogleSessionProvider.parseAccessToken = function (accessToken) {
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
    NativeGoogleSessionProvider.prototype.provide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nativeGoogleToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeGoogleTokenProvider()];
                    case 1:
                        nativeGoogleToken = _a.sent();
                        return [2 /*return*/, this.callGoogleNativeLogin(nativeGoogleToken.idToken, nativeGoogleToken.email).toPromise()];
                }
            });
        });
    };
    NativeGoogleSessionProvider.prototype.callGoogleNativeLogin = function (idToken, emailId) {
        var _this = this;
        var platform = window.device.platform.toLowerCase() === 'ios' ? 'ios' : null;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(NativeGoogleSessionProvider.LOGIN_API_ENDPOINT)
            .withBearerToken(false)
            .withUserToken(false)
            .withBody({
            emailId: emailId,
            platform: platform
        })
            .withHeaders({
            'X-GOOGLE-ID-TOKEN': idToken
        })
            .build();
        return this.apiService.fetch(apiRequest)
            .pipe(map(function (success) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (success.body) {
                            CsModule.instance.updateAuthTokenConfig(success.body.access_token);
                        }
                        _a = {
                            access_token: success.body.access_token,
                            refresh_token: success.body.refresh_token
                        };
                        return [4 /*yield*/, NativeGoogleSessionProvider.parseAccessToken(success.body.access_token)];
                    case 1: return [2 /*return*/, (_a.userToken = (_b.sent()).userToken,
                            _a)];
                }
            });
        }); }));
    };
    NativeGoogleSessionProvider.LOGIN_API_ENDPOINT = '/google/auth/android';
    return NativeGoogleSessionProvider;
}());
export { NativeGoogleSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWdvb2dsZS1zZXNzaW9uLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2F1dGgvdXRpbC9uYXRpdmUtZ29vZ2xlLXNlc3Npb24tcHJvdmlkZXIvaW1wbC9uYXRpdmUtZ29vZ2xlLXNlc3Npb24tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFhLGVBQWUsRUFBRSxPQUFPLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPcEQ7SUFpQkkscUNBQ1kseUJBQTREO1FBQTVELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBbUM7UUFFcEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNyRCxDQUFDO0lBaEJvQiw0Q0FBZ0IsR0FBckMsVUFBc0MsV0FBbUI7Ozs7OzRCQUluQyxxQkFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbEQsV0FBVyxHQUFHLFNBQW9DO3dCQUNoRCxPQUFPLEdBQWlDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3RFLHNCQUFPO2dDQUNILFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBUyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0NBQ25HLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSTs2QkFDM0MsRUFBQzs7OztLQUNMO0lBUUssNkNBQU8sR0FBYjs7Ozs7NEJBQzhCLHFCQUFNLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFBOzt3QkFBMUQsaUJBQWlCLEdBQUcsU0FBc0M7d0JBQ2hFLHNCQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUM7Ozs7S0FDckc7SUFFTywyREFBcUIsR0FBN0IsVUFBOEIsT0FBZSxFQUFFLE9BQWU7UUFBOUQsaUJBNEJDO1FBM0JHLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUM7UUFDN0UsSUFBTSxVQUFVLEdBQVksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2FBQzVDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2FBQzlCLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxrQkFBa0IsQ0FBQzthQUN4RCxlQUFlLENBQUMsS0FBSyxDQUFDO2FBQ3RCLGFBQWEsQ0FBQyxLQUFLLENBQUM7YUFDcEIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQzthQUNELFdBQVcsQ0FBQztZQUNULG1CQUFtQixFQUFFLE9BQU87U0FDL0IsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBa0QsVUFBVSxDQUFDO2FBQ3BGLElBQUksQ0FDRCxHQUFHLENBQUMsVUFBTyxPQUFPOzs7Ozt3QkFDZCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7NEJBQ2QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3lCQUN0RTs7NEJBRUcsWUFBWSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWTs0QkFDdkMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYTs7d0JBQzdCLHFCQUFNLDJCQUEyQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUE7NEJBSDdGLHVCQUdJLFlBQVMsR0FBRSxDQUFDLFNBQTZFLENBQUMsQ0FBQyxTQUFTO2lDQUN0Rzs7O2FBQ0wsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBdER1Qiw4Q0FBa0IsR0FBRyxzQkFBc0IsQ0FBQztJQXVEeEUsa0NBQUM7Q0FBQSxBQXpERCxJQXlEQztTQXpEWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Nlc3Npb25Qcm92aWRlcn0gZnJvbSAnLi4vLi4vLi4vZGVmL3Nlc3Npb24tcHJvdmlkZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi8uLi8uLi9hcGknO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7T0F1dGhTZXNzaW9ufSBmcm9tICcuLi8uLi8uLi9kZWYvby1hdXRoLXNlc3Npb24nO1xuaW1wb3J0IHtTdW5iaXJkU2RrfSBmcm9tICcuLi8uLi8uLi8uLi9zZGsnO1xuaW1wb3J0IHtDc01vZHVsZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMnO1xuaW1wb3J0IHsgSnd0VXRpbCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvand0LXV0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5hdGl2ZUdvb2dsZVRva2VucyB7XG4gICAgaWRUb2tlbjogc3RyaW5nO1xuICAgIGVtYWlsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVHb29nbGVTZXNzaW9uUHJvdmlkZXIgaW1wbGVtZW50cyBTZXNzaW9uUHJvdmlkZXIge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTE9HSU5fQVBJX0VORFBPSU5UID0gJy9nb29nbGUvYXV0aC9hbmRyb2lkJztcbiAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2U7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBwYXJzZUFjY2Vzc1Rva2VuKGFjY2Vzc1Rva2VuOiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICAgICAgdXNlclRva2VuOiBzdHJpbmc7XG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlc09uOiBudW1iZXI7XG4gICAgfT4ge1xuICAgICAgICBsZXQgZGVjb2RlVG9rZW4gPSBhd2FpdCBKd3RVdGlsLmRlY29kZUpXVChhY2Nlc3NUb2tlbik7XG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IHsgc3ViOiBzdHJpbmcsIGV4cDogbnVtYmVyIH0gPSBKU09OLnBhcnNlKGRlY29kZVRva2VuKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXJUb2tlbjogcGF5bG9hZC5zdWIuc3BsaXQoJzonKS5sZW5ndGggPT09IDMgPyA8c3RyaW5nPnBheWxvYWQuc3ViLnNwbGl0KCc6JykucG9wKCkgOiBwYXlsb2FkLnN1YixcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlc09uOiBwYXlsb2FkLmV4cCAqIDEwMDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBuYXRpdmVHb29nbGVUb2tlblByb3ZpZGVyOiAoKSA9PiBQcm9taXNlPE5hdGl2ZUdvb2dsZVRva2Vucz5cbiAgICApIHtcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlID0gU3VuYmlyZFNkay5pbnN0YW5jZS5hcGlTZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgY29uc3QgbmF0aXZlR29vZ2xlVG9rZW4gPSBhd2FpdCB0aGlzLm5hdGl2ZUdvb2dsZVRva2VuUHJvdmlkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbEdvb2dsZU5hdGl2ZUxvZ2luKG5hdGl2ZUdvb2dsZVRva2VuLmlkVG9rZW4sIG5hdGl2ZUdvb2dsZVRva2VuLmVtYWlsKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGxHb29nbGVOYXRpdmVMb2dpbihpZFRva2VuOiBzdHJpbmcsIGVtYWlsSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtID0gd2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSdpb3MnID8gJ2lvcycgOm51bGw7XG4gICAgICAgIGNvbnN0IGFwaVJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuUE9TVClcbiAgICAgICAgICAgIC53aXRoUGF0aChOYXRpdmVHb29nbGVTZXNzaW9uUHJvdmlkZXIuTE9HSU5fQVBJX0VORFBPSU5UKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbihmYWxzZSlcbiAgICAgICAgICAgIC53aXRoVXNlclRva2VuKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhCb2R5KHtcbiAgICAgICAgICAgICAgICBlbWFpbElkOiBlbWFpbElkLFxuICAgICAgICAgICAgICAgIHBsYXRmb3JtOiBwbGF0Zm9ybVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aXRoSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ1gtR09PR0xFLUlELVRPS0VOJzogaWRUb2tlblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoPHsgYWNjZXNzX3Rva2VuOiBzdHJpbmcsIHJlZnJlc2hfdG9rZW46IHN0cmluZyB9PihhcGlSZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKGFzeW5jIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLnVwZGF0ZUF1dGhUb2tlbkNvbmZpZyhzdWNjZXNzLmJvZHkuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBzdWNjZXNzLmJvZHkuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogc3VjY2Vzcy5ib2R5LnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyVG9rZW46IChhd2FpdCBOYXRpdmVHb29nbGVTZXNzaW9uUHJvdmlkZXIucGFyc2VBY2Nlc3NUb2tlbihzdWNjZXNzLmJvZHkuYWNjZXNzX3Rva2VuKSkudXNlclRva2VuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19