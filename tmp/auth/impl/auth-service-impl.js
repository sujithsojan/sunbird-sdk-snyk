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
import { AuthUtil } from '../util/auth-util';
import { combineLatest, defer, from, merge, Observable } from 'rxjs';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { distinctUntilChanged, map, mapTo, mergeMap } from 'rxjs/operators';
import { CsModule } from '@project-sunbird/client-services';
import { AuthKeys, ProfileKeys } from '../../preference-keys';
var AuthServiceImpl = /** @class */ (function () {
    function AuthServiceImpl(sdkConfig, apiService, sharedPreferences, eventsBusService) {
        this.sdkConfig = sdkConfig;
        this.apiService = apiService;
        this.sharedPreferences = sharedPreferences;
        this.eventsBusService = eventsBusService;
        this.apiConfig = this.sdkConfig.apiConfig;
        this.authUtil = new AuthUtil(this.apiConfig, this.apiService, this.sharedPreferences, this.eventsBusService);
    }
    AuthServiceImpl_1 = AuthServiceImpl;
    AuthServiceImpl.prototype.onInit = function () {
        var _this = this;
        this.sharedPreferences.addListener(AuthKeys.KEY_OAUTH_SESSION, function (value) { return __awaiter(_this, void 0, void 0, function () {
            var profileSession, _a, _b, authSession, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!value) return [3 /*break*/, 5];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.sharedPreferences.getString(ProfileKeys.KEY_USER_SESSION).toPromise()];
                    case 2:
                        profileSession = _b.apply(_a, [(_c.sent())]);
                        authSession = JSON.parse(value);
                        CsModule.instance.config.core.api.authentication.userToken = authSession.access_token;
                        CsModule.instance.config.core.api.authentication.managedUserToken = profileSession.managedSession ? authSession.managed_access_token : undefined;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        console.error(e_1);
                        CsModule.instance.config.core.api.authentication.userToken = undefined;
                        CsModule.instance.config.core.api.authentication.managedUserToken = undefined;
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        CsModule.instance.config.core.api.authentication.userToken = undefined;
                        CsModule.instance.config.core.api.authentication.managedUserToken = undefined;
                        _c.label = 6;
                    case 6:
                        CsModule.instance.updateConfig(CsModule.instance.config);
                        return [2 /*return*/];
                }
            });
        }); });
        this.sharedPreferences.addListener(ProfileKeys.KEY_USER_SESSION, function (value) { return __awaiter(_this, void 0, void 0, function () {
            var profileSession, authSession, _a, _b, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!value) return [3 /*break*/, 5];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        profileSession = JSON.parse(value);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.sharedPreferences.getString(AuthKeys.KEY_OAUTH_SESSION).toPromise()];
                    case 2:
                        authSession = _b.apply(_a, [(_c.sent())]);
                        CsModule.instance.config.core.api.authentication.userToken = authSession.access_token;
                        CsModule.instance.config.core.api.authentication.managedUserToken = profileSession.managedSession ? authSession.managed_access_token : undefined;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _c.sent();
                        console.error(e_2);
                        CsModule.instance.config.core.api.authentication.userToken = undefined;
                        CsModule.instance.config.core.api.authentication.managedUserToken = undefined;
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        CsModule.instance.config.core.api.authentication.userToken = undefined;
                        CsModule.instance.config.core.api.authentication.managedUserToken = undefined;
                        _c.label = 6;
                    case 6:
                        CsModule.instance.updateConfig(CsModule.instance.config);
                        return [2 /*return*/];
                }
            });
        }); });
        return combineLatest([
            defer(function () { return _this.getSession(); }).pipe(mergeMap(function (session) { return __awaiter(_this, void 0, void 0, function () {
                var profileSession, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!session) {
                                return [2 /*return*/, undefined];
                            }
                            _b = (_a = JSON).parse;
                            return [4 /*yield*/, this.sharedPreferences.getString(ProfileKeys.KEY_USER_SESSION).toPromise()];
                        case 1:
                            profileSession = _b.apply(_a, [(_c.sent())]);
                            CsModule.instance.config.core.api.authentication.userToken = session.access_token;
                            CsModule.instance.config.core.api.authentication.managedUserToken = profileSession.managedSession ? session.managed_access_token : undefined;
                            CsModule.instance.updateConfig(CsModule.instance.config);
                            return [2 /*return*/, undefined];
                    }
                });
            }); })),
            defer(function () { return _this.onAccessTokenNearingExpiry(); }).pipe(mergeMap(function (shouldRefresh) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (shouldRefresh) {
                        return [2 /*return*/, this.refreshSession().toPromise()];
                    }
                    return [2 /*return*/, undefined];
                });
            }); }))
        ]).pipe(mapTo(undefined));
    };
    AuthServiceImpl.prototype.setSession = function (sessionProvider) {
        var _this = this;
        return from(sessionProvider.provide().then(function (sessionData) {
            if (!sessionData.access_token) {
                _this.authUtil.endSession();
                throw sessionData;
            }
            _this.authUtil.startSession(sessionData);
            _this.authUtil.refreshSession();
            return undefined;
        }));
    };
    AuthServiceImpl.prototype.getSession = function () {
        return from(this.authUtil.getSessionData());
    };
    AuthServiceImpl.prototype.resignSession = function () {
        return from(this.authUtil.endSession());
    };
    AuthServiceImpl.prototype.refreshSession = function () {
        return from(this.authUtil.refreshSession());
    };
    AuthServiceImpl.prototype.onAccessTokenNearingExpiry = function () {
        var _this = this;
        var initialSession$ = defer(function () { return _this.getSession(); });
        var consecutiveSession$ = new Observable(function (observer) {
            document.addEventListener('resume', function () {
                setTimeout(function () {
                    observer.next();
                }, 0);
            }, false);
        }).pipe(mergeMap(function () { return _this.getSession(); }));
        return merge(initialSession$, consecutiveSession$).pipe(map(function (session) {
            if (!session || !session.accessTokenExpiresOn) {
                return false;
            }
            return session.accessTokenExpiresOn - Date.now() < AuthServiceImpl_1.ACCESS_TOKEN_NEARING_EXPIRY_DELTA;
        }), distinctUntilChanged());
    };
    var AuthServiceImpl_1;
    AuthServiceImpl.ACCESS_TOKEN_NEARING_EXPIRY_DELTA = 1000 * 60 * 60;
    AuthServiceImpl = AuthServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.API_SERVICE)),
        __param(2, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(3, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], AuthServiceImpl);
    return AuthServiceImpl;
}());
export { AuthServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9pbXBsL2F1dGgtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBUyxJQUFJLEVBQWEsS0FBSyxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdyRixPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJNUQ7SUFLSSx5QkFDZ0QsU0FBb0IsRUFDbkIsVUFBc0IsRUFDZixpQkFBb0MsRUFDcEMsZ0JBQWtDO1FBSDFDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUV0RixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxp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QztRQUN6RyxDQUFDLENBQUMsRUFDRixvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQzs7SUFySXVCLGlEQUFpQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBRGxFLGVBQWU7UUFEM0IsVUFBVSxFQUFFO1FBT0osV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs7T0FUdEMsZUFBZSxDQXVJM0I7SUFBRCxzQkFBQztDQUFBLEFBdklELElBdUlDO1NBdklZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0F1dGhTZXJ2aWNlLCBPQXV0aFNlc3Npb24sIFNlc3Npb25Qcm92aWRlcn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtBcGlDb25maWcsIEFwaVNlcnZpY2V9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge0F1dGhVdGlsfSBmcm9tICcuLi91dGlsL2F1dGgtdXRpbCc7XG5pbXBvcnQge2NvbWJpbmVMYXRlc3QsIGRlZmVyLCBFTVBUWSwgZnJvbSwgZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge0V2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIG1hcFRvLCBtZXJnZU1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDc01vZHVsZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMnO1xuaW1wb3J0IHtBdXRoS2V5cywgUHJvZmlsZUtleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge1Byb2ZpbGVTZXNzaW9ufSBmcm9tICcuLi8uLi9wcm9maWxlJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIEF1dGhTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBBQ0NFU1NfVE9LRU5fTkVBUklOR19FWFBJUllfREVMVEEgPSAxMDAwICogNjAgKiA2MDtcbiAgICBwcml2YXRlIGF1dGhVdGlsOiBBdXRoVXRpbDtcbiAgICBwcml2YXRlIGFwaUNvbmZpZzogQXBpQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFQSV9TRVJWSUNFKSBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkVWRU5UU19CVVNfU0VSVklDRSkgcHJpdmF0ZSBldmVudHNCdXNTZXJ2aWNlOiBFdmVudHNCdXNTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmFwaUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZztcbiAgICAgICAgdGhpcy5hdXRoVXRpbCA9IG5ldyBBdXRoVXRpbCh0aGlzLmFwaUNvbmZpZywgdGhpcy5hcGlTZXJ2aWNlLCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLCB0aGlzLmV2ZW50c0J1c1NlcnZpY2UpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmFkZExpc3RlbmVyKEF1dGhLZXlzLktFWV9PQVVUSF9TRVNTSU9OLCBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2ZpbGVTZXNzaW9uOiBQcm9maWxlU2Vzc2lvbiA9IEpTT04ucGFyc2UoKGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKFByb2ZpbGVLZXlzLktFWV9VU0VSX1NFU1NJT04pLnRvUHJvbWlzZSgpKSEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdXRoU2Vzc2lvbjogT0F1dGhTZXNzaW9uID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmFwaS5hdXRoZW50aWNhdGlvbi51c2VyVG9rZW4gPSBhdXRoU2Vzc2lvbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmFwaS5hdXRoZW50aWNhdGlvbi5tYW5hZ2VkVXNlclRva2VuID0gcHJvZmlsZVNlc3Npb24ubWFuYWdlZFNlc3Npb24gPyBhdXRoU2Vzc2lvbi5tYW5hZ2VkX2FjY2Vzc190b2tlbiA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmFwaS5hdXRoZW50aWNhdGlvbi51c2VyVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmFwaS5hdXRoZW50aWNhdGlvbi5tYW5hZ2VkVXNlclRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLnVzZXJUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBDc01vZHVsZS5pbnN0YW5jZS5jb25maWcuY29yZS5hcGkuYXV0aGVudGljYXRpb24ubWFuYWdlZFVzZXJUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UudXBkYXRlQ29uZmlnKENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuYWRkTGlzdGVuZXIoUHJvZmlsZUtleXMuS0VZX1VTRVJfU0VTU0lPTiwgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlU2Vzc2lvbjogUHJvZmlsZVNlc3Npb24gPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXV0aFNlc3Npb246IE9BdXRoU2Vzc2lvbiA9IEpTT04ucGFyc2UoKGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKEF1dGhLZXlzLktFWV9PQVVUSF9TRVNTSU9OKS50b1Byb21pc2UoKSkhKTtcbiAgICAgICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLnVzZXJUb2tlbiA9IGF1dGhTZXNzaW9uLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLm1hbmFnZWRVc2VyVG9rZW4gPSBwcm9maWxlU2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IGF1dGhTZXNzaW9uLm1hbmFnZWRfYWNjZXNzX3Rva2VuIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLnVzZXJUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLm1hbmFnZWRVc2VyVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBDc01vZHVsZS5pbnN0YW5jZS5jb25maWcuY29yZS5hcGkuYXV0aGVudGljYXRpb24udXNlclRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmFwaS5hdXRoZW50aWNhdGlvbi5tYW5hZ2VkVXNlclRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBDc01vZHVsZS5pbnN0YW5jZS51cGRhdGVDb25maWcoQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2V0U2Vzc2lvbigpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoYXN5bmMgKHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlU2Vzc2lvbjogUHJvZmlsZVNlc3Npb24gPSBKU09OLnBhcnNlKChhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhQcm9maWxlS2V5cy5LRVlfVVNFUl9TRVNTSU9OKS50b1Byb21pc2UoKSkhKTtcbiAgICAgICAgICAgICAgICBDc01vZHVsZS5pbnN0YW5jZS5jb25maWcuY29yZS5hcGkuYXV0aGVudGljYXRpb24udXNlclRva2VuID0gc2Vzc2lvbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUuYXBpLmF1dGhlbnRpY2F0aW9uLm1hbmFnZWRVc2VyVG9rZW4gPSBwcm9maWxlU2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHNlc3Npb24ubWFuYWdlZF9hY2Nlc3NfdG9rZW4gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgQ3NNb2R1bGUuaW5zdGFuY2UudXBkYXRlQ29uZmlnKENzTW9kdWxlLmluc3RhbmNlLmNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIGRlZmVyKCgpID0+IHRoaXMub25BY2Nlc3NUb2tlbk5lYXJpbmdFeHBpcnkoKSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKGFzeW5jIChzaG91bGRSZWZyZXNoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZFJlZnJlc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFNlc3Npb24oKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIF0pLnBpcGUoXG4gICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNldFNlc3Npb24oc2Vzc2lvblByb3ZpZGVyOiBTZXNzaW9uUHJvdmlkZXIpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gZnJvbShzZXNzaW9uUHJvdmlkZXIucHJvdmlkZSgpLnRoZW4oKHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFV0aWwuZW5kU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIHRocm93IHNlc3Npb25EYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hdXRoVXRpbC5zdGFydFNlc3Npb24oc2Vzc2lvbkRhdGEpO1xuICAgICAgICAgICAgdGhpcy5hdXRoVXRpbC5yZWZyZXNoU2Vzc2lvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldFNlc3Npb24oKTogT2JzZXJ2YWJsZTxPQXV0aFNlc3Npb24gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5hdXRoVXRpbC5nZXRTZXNzaW9uRGF0YSgpKTtcbiAgICB9XG5cbiAgICByZXNpZ25TZXNzaW9uKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmF1dGhVdGlsLmVuZFNlc3Npb24oKSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFNlc3Npb24oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuYXV0aFV0aWwucmVmcmVzaFNlc3Npb24oKSk7XG4gICAgfVxuXG4gICAgb25BY2Nlc3NUb2tlbk5lYXJpbmdFeHBpcnkoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTZXNzaW9uJCA9IGRlZmVyKCgpID0+IHRoaXMuZ2V0U2Vzc2lvbigpKTtcbiAgICAgICAgY29uc3QgY29uc2VjdXRpdmVTZXNzaW9uJCA9IG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVzdW1lJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5nZXRTZXNzaW9uKCkpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgIGluaXRpYWxTZXNzaW9uJCxcbiAgICAgICAgICBjb25zZWN1dGl2ZVNlc3Npb24kXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLmFjY2Vzc1Rva2VuRXhwaXJlc09uKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5hY2Nlc3NUb2tlbkV4cGlyZXNPbiAtIERhdGUubm93KCkgPCBBdXRoU2VydmljZUltcGwuQUNDRVNTX1RPS0VOX05FQVJJTkdfRVhQSVJZX0RFTFRBO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=