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
import { HttpClientError, HttpRequestType, HttpSerializer, Request, ResponseCode } from '../../api';
import { AuthKeys } from '../../preference-keys';
import { NoActiveSessionError } from '../../profile';
import { ErrorEventType, EventNamespace } from '../../events-bus';
import { AuthTokenRefreshError } from '../errors/auth-token-refresh-error';
import { JwtUtil } from '../../util/jwt-util';
var AuthUtil = /** @class */ (function () {
    function AuthUtil(apiConfig, apiService, sharedPreferences, eventsBusService) {
        this.apiConfig = apiConfig;
        this.apiService = apiService;
        this.sharedPreferences = sharedPreferences;
        this.eventsBusService = eventsBusService;
    }
    AuthUtil.prototype.refreshSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionData, request, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSessionData()];
                    case 1:
                        sessionData = _a.sent();
                        if (!sessionData) {
                            throw new NoActiveSessionError('No Active Sessions found');
                        }
                        if (window.device.platform.toLowerCase() === "ios") {
                            request = new Request.Builder()
                                .withPath('/auth/v1/refresh/token')
                                .withType(HttpRequestType.POST)
                                .withSerializer(HttpSerializer.URLENCODED)
                                .withHeaders({
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            })
                                .withBearerToken(true)
                                .withBody({
                                refresh_token: sessionData.refresh_token
                            })
                                .build();
                        }
                        else {
                            request = new Request.Builder()
                                .withPath('/auth/v1/refresh/token')
                                .withType(HttpRequestType.POST)
                                .withSerializer(HttpSerializer.URLENCODED)
                                .withBearerToken(true)
                                .withBody({
                                refresh_token: sessionData.refresh_token
                            })
                                .build();
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.apiService.fetch(request).toPromise()
                                .catch(function (e) {
                                if (HttpClientError.isInstance(e) && e.response.responseCode === ResponseCode.HTTP_BAD_REQUEST) {
                                    throw new AuthTokenRefreshError(e.message);
                                }
                                throw e;
                            })
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var playload, jwtPayload, userToken, prevSessionData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(response.body.result.access_token && response.body.result.refresh_token)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, JwtUtil.decodeJWT(response.body.result.access_token)];
                                        case 1:
                                            playload = _a.sent();
                                            jwtPayload = JSON.parse(playload);
                                            userToken = jwtPayload.sub.split(':').length === 3 ? jwtPayload.sub.split(':').pop() : jwtPayload.sub;
                                            return [4 /*yield*/, this.getSessionData()];
                                        case 2:
                                            prevSessionData = _a.sent();
                                            sessionData = __assign(__assign({}, response.body.result), { userToken: prevSessionData ? prevSessionData.userToken : userToken, managed_access_token: prevSessionData ? prevSessionData.managed_access_token : undefined, accessTokenExpiresOn: jwtPayload.exp * 1000 });
                                            return [4 /*yield*/, this.sharedPreferences.putString(AuthKeys.KEY_OAUTH_SESSION, JSON.stringify(sessionData)).toPromise()];
                                        case 3: return [2 /*return*/, _a.sent()];
                                        case 4: throw new AuthTokenRefreshError('No token found in server response');
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1 instanceof AuthTokenRefreshError) {
                            this.eventsBusService.emit({
                                namespace: EventNamespace.ERROR,
                                event: {
                                    type: ErrorEventType.AUTH_TOKEN_REFRESH_ERROR,
                                    payload: e_1
                                }
                            });
                        }
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthUtil.prototype.startSession = function (sessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.putString(AuthKeys.KEY_OAUTH_SESSION, JSON.stringify(sessionData)).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthUtil.prototype.endSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.putString(AuthKeys.KEY_OAUTH_SESSION, '').toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthUtil.prototype.getSessionData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stringifiedSessionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.getString(AuthKeys.KEY_OAUTH_SESSION).toPromise()];
                    case 1:
                        stringifiedSessionData = _a.sent();
                        if (!stringifiedSessionData) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, JSON.parse(stringifiedSessionData)];
                }
            });
        });
    };
    return AuthUtil;
}());
export { AuthUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvdXRpbC9hdXRoLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXdCLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBWSxZQUFZLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFbkksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQTZCLGNBQWMsRUFBRSxjQUFjLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7QUFDOUcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDO0lBQ0ksa0JBQ1ksU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsaUJBQW9DLEVBQ3BDLGdCQUFrQztRQUhsQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRTlDLENBQUM7SUFFWSxpQ0FBYyxHQUEzQjs7Ozs7OzRCQUNzQixxQkFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUE7O3dCQUF6QyxXQUFXLEdBQUcsU0FBMkI7d0JBRTdDLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ2QsTUFBTSxJQUFJLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLENBQUM7eUJBQzlEO3dCQUVELElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFDOzRC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QUFBRCxDQUFDLEFBdkdELElBdUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlDb25maWcsIEFwaVNlcnZpY2UsIEh0dHBDbGllbnRFcnJvciwgSHR0cFJlcXVlc3RUeXBlLCBIdHRwU2VyaWFsaXplciwgUmVxdWVzdCwgUmVzcG9uc2UsIFJlc3BvbnNlQ29kZX0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7T0F1dGhTZXNzaW9ufSBmcm9tICcuLic7XG5pbXBvcnQge0F1dGhLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtOb0FjdGl2ZVNlc3Npb25FcnJvcn0gZnJvbSAnLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge0F1dGhUb2tlblJlZnJlc2hFcnJvckV2ZW50LCBFcnJvckV2ZW50VHlwZSwgRXZlbnROYW1lc3BhY2UsIEV2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IHtBdXRoVG9rZW5SZWZyZXNoRXJyb3J9IGZyb20gJy4uL2Vycm9ycy9hdXRoLXRva2VuLXJlZnJlc2gtZXJyb3InO1xuaW1wb3J0IHsgSnd0VXRpbCB9IGZyb20gJy4uLy4uL3V0aWwvand0LXV0aWwnO1xuXG5leHBvcnQgY2xhc3MgQXV0aFV0aWwge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwaUNvbmZpZzogQXBpQ29uZmlnLFxuICAgICAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBwcml2YXRlIGV2ZW50c0J1c1NlcnZpY2U6IEV2ZW50c0J1c1NlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVmcmVzaFNlc3Npb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBzZXNzaW9uRGF0YSA9IGF3YWl0IHRoaXMuZ2V0U2Vzc2lvbkRhdGEoKTtcblxuICAgICAgICBpZiAoIXNlc3Npb25EYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9BY3RpdmVTZXNzaW9uRXJyb3IoJ05vIEFjdGl2ZSBTZXNzaW9ucyBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXF1ZXN0IDtcbiAgICAgICAgaWYod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiKXtcbiAgICAgICAgICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoUGF0aCgnL2F1dGgvdjEvcmVmcmVzaC90b2tlbicpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAgICAgICAud2l0aFNlcmlhbGl6ZXIoSHR0cFNlcmlhbGl6ZXIuVVJMRU5DT0RFRClcbiAgICAgICAgICAgIC53aXRoSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhCb2R5KHtcbiAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBzZXNzaW9uRGF0YS5yZWZyZXNoX3Rva2VuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFBhdGgoJy9hdXRoL3YxL3JlZnJlc2gvdG9rZW4nKVxuICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QT1NUKVxuICAgICAgICAgICAgLndpdGhTZXJpYWxpemVyKEh0dHBTZXJpYWxpemVyLlVSTEVOQ09ERUQpXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAud2l0aEJvZHkoe1xuICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHNlc3Npb25EYXRhLnJlZnJlc2hfdG9rZW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwaVNlcnZpY2UuZmV0Y2gocmVxdWVzdCkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEh0dHBDbGllbnRFcnJvci5pc0luc3RhbmNlKGUpICYmIGUucmVzcG9uc2UucmVzcG9uc2VDb2RlID09PSBSZXNwb25zZUNvZGUuSFRUUF9CQURfUkVRVUVTVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhUb2tlblJlZnJlc2hFcnJvcihlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGFzeW5jIChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmJvZHkucmVzdWx0LmFjY2Vzc190b2tlbiAmJiByZXNwb25zZS5ib2R5LnJlc3VsdC5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxvYWQgPSBhd2FpdCBKd3RVdGlsLmRlY29kZUpXVChyZXNwb25zZS5ib2R5LnJlc3VsdC5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgand0UGF5bG9hZDogeyBzdWI6IHN0cmluZywgZXhwOiBudW1iZXIgfSA9IEpTT04ucGFyc2UocGxheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyVG9rZW4gPSBqd3RQYXlsb2FkLnN1Yi5zcGxpdCgnOicpLmxlbmd0aCA9PT0gMyA/IDxzdHJpbmc+IGp3dFBheWxvYWQuc3ViLnNwbGl0KCc6JykucG9wKCkgOiBqd3RQYXlsb2FkLnN1YjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlNlc3Npb25EYXRhID0gYXdhaXQgdGhpcy5nZXRTZXNzaW9uRGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5yZXNwb25zZS5ib2R5LnJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyVG9rZW46IHByZXZTZXNzaW9uRGF0YSA/IHByZXZTZXNzaW9uRGF0YS51c2VyVG9rZW4gOiB1c2VyVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlZF9hY2Nlc3NfdG9rZW46IHByZXZTZXNzaW9uRGF0YSA/IHByZXZTZXNzaW9uRGF0YS5tYW5hZ2VkX2FjY2Vzc190b2tlbiA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZXNPbjogand0UGF5bG9hZC5leHAgKiAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQXV0aEtleXMuS0VZX09BVVRIX1NFU1NJT04sIEpTT04uc3RyaW5naWZ5KHNlc3Npb25EYXRhKSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFRva2VuUmVmcmVzaEVycm9yKCdObyB0b2tlbiBmb3VuZCBpbiBzZXJ2ZXIgcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBBdXRoVG9rZW5SZWZyZXNoRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFcnJvckV2ZW50VHlwZS5BVVRIX1RPS0VOX1JFRlJFU0hfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBlXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgQXV0aFRva2VuUmVmcmVzaEVycm9yRXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzdGFydFNlc3Npb24oc2Vzc2lvbkRhdGE6IE9BdXRoU2Vzc2lvbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhBdXRoS2V5cy5LRVlfT0FVVEhfU0VTU0lPTiwgSlNPTi5zdHJpbmdpZnkoc2Vzc2lvbkRhdGEpKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZW5kU2Vzc2lvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQXV0aEtleXMuS0VZX09BVVRIX1NFU1NJT04sICcnKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2Vzc2lvbkRhdGEoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRTZXNzaW9uRGF0YSA9IGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKEF1dGhLZXlzLktFWV9PQVVUSF9TRVNTSU9OKS50b1Byb21pc2UoKTtcblxuICAgICAgICBpZiAoIXN0cmluZ2lmaWVkU2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmdpZmllZFNlc3Npb25EYXRhKTtcbiAgICB9XG59XG4iXX0=