var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { SignInError } from '../../..';
import { WebviewRunnerImpl } from './webview-runner-impl';
import { SunbirdSdk } from '../../../../sdk';
import { WebviewAutoMergeSessionProvider } from './webview-auto-merge-session-provider';
import { WebviewBaseSessionProvider } from './webview-base-session-provider';
var WebviewLoginSessionProvider = /** @class */ (function (_super) {
    __extends(WebviewLoginSessionProvider, _super);
    function WebviewLoginSessionProvider(loginConfig, autoMergeConfig, customWebViewConfig, webviewRunner) {
        var _this = _super.call(this, SunbirdSdk.instance.sdkConfig.apiConfig, SunbirdSdk.instance.apiService, SunbirdSdk.instance.eventsBusService) || this;
        _this.loginConfig = loginConfig;
        _this.autoMergeConfig = autoMergeConfig;
        _this.customWebViewConfig = customWebViewConfig;
        _this.telemetryService = SunbirdSdk.instance.telemetryService;
        _this.webviewRunner = webviewRunner || new WebviewRunnerImpl();
        return _this;
    }
    WebviewLoginSessionProvider.prototype.provide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dsl, telemetryContext;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dsl = this.webviewRunner;
                        return [4 /*yield*/, this.telemetryService.buildContext().toPromise()];
                    case 1:
                        telemetryContext = _a.sent();
                        if (this.loginConfig.context == "password") {
                            this.loginConfig.target.path = "/recover/identify/account";
                        }
                        this.loginConfig.target.params.push({
                            key: 'pdata',
                            value: JSON.stringify(telemetryContext.pdata)
                        });
                        if (!(window.device.platform.toLowerCase() === 'ios' && this.loginConfig.context === "login")) return [3 /*break*/, 3];
                        return [4 /*yield*/, dsl.launchWebview({
                                host: this.loginConfig.target.host,
                                path: 'logoff',
                                params: this.loginConfig.target.params.reduce(function (acc, p) {
                                    acc[p.key] = p.value;
                                    return acc;
                                }, __assign({}, this.resetParams))
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, dsl.launchWebview({
                            host: this.loginConfig.target.host,
                            path: this.loginConfig.target.path,
                            params: this.loginConfig.target.params.reduce(function (acc, p) {
                                acc[p.key] = p.value;
                                return acc;
                            }, __assign({}, this.resetParams))
                        }).then(function () {
                            return dsl.any.apply(dsl, _this.loginConfig.return.reduce(function (acc, forCase) {
                                switch (forCase.type) {
                                    case 'password':
                                        acc.push(_this.buildPasswordSessionProvider(dsl, forCase));
                                        if (_this.resetParams && _this.loginConfig.context == "password") {
                                            dsl.closeWebview();
                                        }
                                        break;
                                    case 'state':
                                        acc.push(_this.buildStateSessionProvider(dsl, forCase));
                                        break;
                                    case 'google':
                                        acc.push(_this.buildGoogleSessionProvider(dsl, forCase, _this.customWebViewConfig));
                                        break;
                                    case 'state-error':
                                        acc.push(dsl.capture({
                                            host: forCase.when.host,
                                            path: forCase.when.path,
                                            params: forCase.when.params
                                        }).then(function () {
                                            return dsl.closeWebview().then(function () {
                                                return dsl.resolveCaptured('error_message').catch(function () {
                                                    throw new SignInError('Server Error');
                                                }).then(function (param) {
                                                    throw new SignInError(param);
                                                });
                                            });
                                        }));
                                        break;
                                    case 'migrate':
                                        acc.push(dsl.capture({
                                            host: forCase.when.host,
                                            path: forCase.when.path,
                                            params: forCase.when.params
                                        }).then(function () {
                                            return dsl.success();
                                        }).then(function (captured) {
                                            dsl.resetInAppBrowserEventListeners();
                                            return dsl.clearCapture().then(function () {
                                                return new WebviewAutoMergeSessionProvider(_this.autoMergeConfig, _this.webviewRunner, captured).provide();
                                            });
                                        }));
                                        break;
                                    case 'reset':
                                        acc.push(dsl.capture({
                                            host: forCase.when.host,
                                            path: forCase.when.path,
                                            params: __spreadArrays(forCase.when.params, [
                                                {
                                                    key: 'client_id',
                                                    resolveTo: 'client_id',
                                                    match: 'portal'
                                                },
                                                {
                                                    key: 'automerge',
                                                    resolveTo: 'automerge',
                                                    exists: 'false'
                                                }
                                            ])
                                        }).then(function () {
                                            return dsl.getCaptureExtras().then(function (extras) {
                                                _this.resetParams = extras;
                                                return dsl.closeWebview().then(function () {
                                                    return new Promise(function (resolve) { return setTimeout(resolve, 500); })
                                                        .then(function () { return _this.provide(); });
                                                });
                                            });
                                        }));
                                        break;
                                }
                                return acc;
                            }, []));
                        })];
                }
            });
        });
    };
    return WebviewLoginSessionProvider;
}(WebviewBaseSessionProvider));
export { WebviewLoginSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy1sb2dpbi1zZXNzaW9uLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2F1dGgvdXRpbC93ZWJ2aWV3LXNlc3Npb24tcHJvdmlkZXIvaW1wbC93ZWJ2aWV3LWxvZ2luLXNlc3Npb24tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQywrQkFBK0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RGLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBSzNFO0lBQWlELCtDQUEwQjtJQU12RSxxQ0FDWSxXQUF5QyxFQUN6QyxlQUE2QyxFQUM3QyxtQkFBeUIsRUFDakMsYUFBNkI7UUFKakMsWUFNSSxrQkFDSSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQ3ZDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUM5QixVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUN2QyxTQUlKO1FBYlcsaUJBQVcsR0FBWCxXQUFXLENBQThCO1FBQ3pDLHFCQUFlLEdBQWYsZUFBZSxDQUE4QjtRQUM3Qyx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQU07UUFTakMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFDN0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLElBQUksSUFBSSxpQkFBaUIsRUFBRSxDQUFDOztJQUNsRSxDQUFDO0lBRVksNkNBQU8sR0FBcEI7Ozs7Ozs7d0JBQ1UsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7d0JBRU4scUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBekUsZ0JBQWdCLEdBQUcsU0FBc0Q7d0JBQy9FLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksVUFBVSxFQUFFOzRCQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsMkJBQTJCLENBQUM7eUJBQzlEO3dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7NEJBQ2pDLEdBQUcsRUFBRSxPQUFPOzRCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQzt5QkFDL0MsQ0FBQyxDQUFDOzZCQUNBLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQSxFQUF0Rix3QkFBc0Y7d0JBQ3JGLHFCQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUM7Z0NBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dDQUNsQyxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO29DQUNqRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7b0NBQ3JCLE9BQU8sR0FBRyxDQUFDO2dDQUNmLENBQUMsZUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFOzZCQUM1QixDQUFDLEVBQUE7O3dCQVBGLFNBT0UsQ0FBQzs7NEJBRVAsc0JBQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQzs0QkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7NEJBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzRCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUNqRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0NBQ3JCLE9BQU8sR0FBRyxDQUFDOzRCQUNmLENBQUMsZUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO3lCQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNKLE9BQU8sR0FBRyxDQUFDLEdBQUcsT0FBUCxHQUFHLEVBQ0gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUEwQixVQUFDLEdBQUcsRUFBRSxPQUFPO2dDQUNwRSxRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0NBQ2xCLEtBQUssVUFBVTt3Q0FBRSxHQUFHLENBQUMsSUFBSSxDQUNyQixLQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUNsRCxDQUFDO3dDQUNGLElBQUksS0FBSSxDQUFDLFdBQVcsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7NENBQzVELEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQTt5Q0FDckI7d0NBQ0QsTUFBTTtvQ0FFTixLQUFLLE9BQU87d0NBQUUsR0FBRyxDQUFDLElBQUksQ0FDbEIsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FDL0MsQ0FBQzt3Q0FBQyxNQUFNO29DQUVULEtBQUssUUFBUTt3Q0FBRSxHQUFHLENBQUMsSUFBSSxDQUNuQixLQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FDMUUsQ0FBQzt3Q0FBQyxNQUFNO29DQUVULEtBQUssYUFBYTt3Q0FBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7NENBQ3JDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUk7NENBQ3ZCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUk7NENBQ3ZCLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07eUNBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUM7NENBQ0osT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUMzQixPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDO29EQUM5QyxNQUFNLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dEQUMxQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO29EQUNWLE1BQU0sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0RBQ2pDLENBQUMsQ0FBQyxDQUFDOzRDQUNQLENBQUMsQ0FBQyxDQUFDO3dDQUNQLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQUMsTUFBTTtvQ0FFWCxLQUFLLFNBQVM7d0NBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDOzRDQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJOzRDQUN2QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJOzRDQUN2QixNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNO3lDQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDOzRDQUNKLE9BQUEsR0FBRyxDQUFDLE9BQU8sRUFBRTt3Q0FBYixDQUFhLENBQ2hCLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTs0Q0FDWixHQUFHLENBQUMsK0JBQStCLEVBQUUsQ0FBQzs0Q0FFdEMsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUMzQixPQUFBLElBQUksK0JBQStCLENBQy9CLEtBQUksQ0FBQyxlQUFlLEVBQ3BCLEtBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FDWCxDQUFDLE9BQU8sRUFBRTs0Q0FKWCxDQUlXLENBQ2QsQ0FBQzt3Q0FDTixDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUFDLE1BQU07b0NBRVgsS0FBSyxPQUFPO3dDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzs0Q0FDL0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTs0Q0FDdkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTs0Q0FDdkIsTUFBTSxpQkFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07Z0RBQ3RCO29EQUNJLEdBQUcsRUFBRSxXQUFXO29EQUNoQixTQUFTLEVBQUUsV0FBVztvREFDdEIsS0FBSyxFQUFFLFFBQVE7aURBQ2xCO2dEQUNEO29EQUNJLEdBQUcsRUFBRSxXQUFXO29EQUNoQixTQUFTLEVBQUUsV0FBVztvREFDdEIsTUFBTSxFQUFFLE9BQU87aURBQ2xCOzhDQUNKO3lDQUNKLENBQUMsQ0FBQyxJQUFJLENBQUM7NENBQ0osT0FBQSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO2dEQUMvQixLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztnREFFMUIsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUMzQixPQUFBLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQzt5REFDN0MsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDO2dEQUQvQixDQUMrQixDQUNsQyxDQUFDOzRDQUNOLENBQUMsQ0FBQzt3Q0FQRixDQU9FLENBQ0wsQ0FBQyxDQUFDO3dDQUFDLE1BQU07aUNBQ2I7Z0NBRUQsT0FBTyxHQUFHLENBQUM7NEJBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNSO3dCQUNOLENBQUMsQ0FBQyxFQUFDOzs7O0tBQ047SUFDTCxrQ0FBQztBQUFELENBQUMsQUF2SUQsQ0FBaUQsMEJBQTBCLEdBdUkxRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T0F1dGhTZXNzaW9uLCBTaWduSW5FcnJvcn0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHtXZWJ2aWV3U2Vzc2lvblByb3ZpZGVyQ29uZmlnfSBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQge1dlYnZpZXdSdW5uZXJ9IGZyb20gJy4uL2RlZi93ZWJ2aWV3LXJ1bm5lcic7XG5pbXBvcnQge1dlYnZpZXdSdW5uZXJJbXBsfSBmcm9tICcuL3dlYnZpZXctcnVubmVyLWltcGwnO1xuaW1wb3J0IHtTdW5iaXJkU2RrfSBmcm9tICcuLi8uLi8uLi8uLi9zZGsnO1xuaW1wb3J0IHtXZWJ2aWV3QXV0b01lcmdlU2Vzc2lvblByb3ZpZGVyfSBmcm9tICcuL3dlYnZpZXctYXV0by1tZXJnZS1zZXNzaW9uLXByb3ZpZGVyJztcbmltcG9ydCB7V2Vidmlld0Jhc2VTZXNzaW9uUHJvdmlkZXJ9IGZyb20gJy4vd2Vidmlldy1iYXNlLXNlc3Npb24tcHJvdmlkZXInO1xuaW1wb3J0IHtUZWxlbWV0cnlTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi8uLi90ZWxlbWV0cnknO1xuXG5pbnRlcmZhY2UgUGFyYW1NYXAgeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH1cblxuZXhwb3J0IGNsYXNzIFdlYnZpZXdMb2dpblNlc3Npb25Qcm92aWRlciBleHRlbmRzIFdlYnZpZXdCYXNlU2Vzc2lvblByb3ZpZGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYnZpZXdSdW5uZXI6IFdlYnZpZXdSdW5uZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZWxlbWV0cnlTZXJ2aWNlOiBUZWxlbWV0cnlTZXJ2aWNlO1xuXG4gICAgcHJpdmF0ZSByZXNldFBhcmFtczogUGFyYW1NYXAgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBsb2dpbkNvbmZpZzogV2Vidmlld1Nlc3Npb25Qcm92aWRlckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBhdXRvTWVyZ2VDb25maWc6IFdlYnZpZXdTZXNzaW9uUHJvdmlkZXJDb25maWcsXG4gICAgICAgIHByaXZhdGUgY3VzdG9tV2ViVmlld0NvbmZpZz86IGFueSxcbiAgICAgICAgd2Vidmlld1J1bm5lcj86IFdlYnZpZXdSdW5uZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBTdW5iaXJkU2RrLmluc3RhbmNlLnNka0NvbmZpZy5hcGlDb25maWcsXG4gICAgICAgICAgICBTdW5iaXJkU2RrLmluc3RhbmNlLmFwaVNlcnZpY2UsXG4gICAgICAgICAgICBTdW5iaXJkU2RrLmluc3RhbmNlLmV2ZW50c0J1c1NlcnZpY2VcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnRlbGVtZXRyeVNlcnZpY2UgPSBTdW5iaXJkU2RrLmluc3RhbmNlLnRlbGVtZXRyeVNlcnZpY2U7XG4gICAgICAgIHRoaXMud2Vidmlld1J1bm5lciA9IHdlYnZpZXdSdW5uZXIgfHwgbmV3IFdlYnZpZXdSdW5uZXJJbXBsKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgY29uc3QgZHNsID0gdGhpcy53ZWJ2aWV3UnVubmVyO1xuXG4gICAgICAgIGNvbnN0IHRlbGVtZXRyeUNvbnRleHQgPSBhd2FpdCB0aGlzLnRlbGVtZXRyeVNlcnZpY2UuYnVpbGRDb250ZXh0KCkudG9Qcm9taXNlKCk7XG4gICAgICAgIGlmKHRoaXMubG9naW5Db25maWcuY29udGV4dCA9PSBcInBhc3N3b3JkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5Db25maWcudGFyZ2V0LnBhdGggPSBcIi9yZWNvdmVyL2lkZW50aWZ5L2FjY291bnRcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ2luQ29uZmlnLnRhcmdldC5wYXJhbXMucHVzaCh7XG4gICAgICAgICAgIGtleTogJ3BkYXRhJyxcbiAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRlbGVtZXRyeUNvbnRleHQucGRhdGEpXG4gICAgICAgIH0pO1xuICAgICAgICBpZih3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09ICdpb3MnICYmIHRoaXMubG9naW5Db25maWcuY29udGV4dCA9PT0gXCJsb2dpblwiKSB7XG4gICAgICAgICAgICBhd2FpdCBkc2wubGF1bmNoV2Vidmlldyh7XG4gICAgICAgICAgICAgICAgaG9zdDogdGhpcy5sb2dpbkNvbmZpZy50YXJnZXQuaG9zdCxcbiAgICAgICAgICAgICAgICBwYXRoOiAnbG9nb2ZmJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMubG9naW5Db25maWcudGFyZ2V0LnBhcmFtcy5yZWR1Y2UoKGFjYywgcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY2NbcC5rZXldID0gcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCB7Li4udGhpcy5yZXNldFBhcmFtc30pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHNsLmxhdW5jaFdlYnZpZXcoe1xuICAgICAgICAgICAgaG9zdDogdGhpcy5sb2dpbkNvbmZpZy50YXJnZXQuaG9zdCxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMubG9naW5Db25maWcudGFyZ2V0LnBhdGgsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMubG9naW5Db25maWcudGFyZ2V0LnBhcmFtcy5yZWR1Y2UoKGFjYywgcCkgPT4ge1xuICAgICAgICAgICAgICAgIGFjY1twLmtleV0gPSBwLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7Li4udGhpcy5yZXNldFBhcmFtc30pXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRzbC5hbnk8T0F1dGhTZXNzaW9uPihcbiAgICAgICAgICAgICAgICAuLi50aGlzLmxvZ2luQ29uZmlnLnJldHVybi5yZWR1Y2U8UHJvbWlzZTxPQXV0aFNlc3Npb24+W10+KChhY2MsIGZvckNhc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JDYXNlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzogYWNjLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFBhc3N3b3JkU2Vzc2lvblByb3ZpZGVyKGRzbCwgZm9yQ2FzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXNldFBhcmFtcyAmJiB0aGlzLmxvZ2luQ29uZmlnLmNvbnRleHQgPT0gXCJwYXNzd29yZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHNsLmNsb3NlV2VidmlldygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXRlJzogYWNjLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFN0YXRlU2Vzc2lvblByb3ZpZGVyKGRzbCwgZm9yQ2FzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7IGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdnb29nbGUnOiBhY2MucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkR29vZ2xlU2Vzc2lvblByb3ZpZGVyKGRzbCwgZm9yQ2FzZSwgdGhpcy5jdXN0b21XZWJWaWV3Q29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTsgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXRlLWVycm9yJzogYWNjLnB1c2goZHNsLmNhcHR1cmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IGZvckNhc2Uud2hlbi5ob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGZvckNhc2Uud2hlbi5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZm9yQ2FzZS53aGVuLnBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRzbC5jbG9zZVdlYnZpZXcoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRzbC5yZXNvbHZlQ2FwdHVyZWQoJ2Vycm9yX21lc3NhZ2UnKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2lnbkluRXJyb3IoJ1NlcnZlciBFcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFNpZ25JbkVycm9yKHBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7IGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtaWdyYXRlJzogYWNjLnB1c2goZHNsLmNhcHR1cmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IGZvckNhc2Uud2hlbi5ob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGZvckNhc2Uud2hlbi5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogZm9yQ2FzZS53aGVuLnBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzbC5zdWNjZXNzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICkudGhlbigoY2FwdHVyZWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc2wucmVzZXRJbkFwcEJyb3dzZXJFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRzbC5jbGVhckNhcHR1cmUoKS50aGVuKCgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBXZWJ2aWV3QXV0b01lcmdlU2Vzc2lvblByb3ZpZGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvTWVyZ2VDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlYnZpZXdSdW5uZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnByb3ZpZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7IGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXNldCc6IGFjYy5wdXNoKGRzbC5jYXB0dXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0OiBmb3JDYXNlLndoZW4uaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBmb3JDYXNlLndoZW4ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZm9yQ2FzZS53aGVuLnBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnY2xpZW50X2lkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVUbzogJ2NsaWVudF9pZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogJ3BvcnRhbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnYXV0b21lcmdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVUbzogJ2F1dG9tZXJnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdHM6ICdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc2wuZ2V0Q2FwdHVyZUV4dHJhcygpLnRoZW4oKGV4dHJhcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UGFyYW1zID0gZXh0cmFzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkc2wuY2xvc2VXZWJ2aWV3KCkudGhlbigoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnByb3ZpZGUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCBbXSksXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=