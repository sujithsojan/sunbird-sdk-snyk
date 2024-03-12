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
import { WebviewBaseSessionProvider } from './webview-base-session-provider';
import { SunbirdSdk } from '../../../../sdk';
import { WebviewRunnerImpl } from './webview-runner-impl';
import { SignInError } from '../../../errors/sign-in-error';
import { WebviewAutoMergeSessionProvider } from './webview-auto-merge-session-provider';
var WebviewStateSessionProvider = /** @class */ (function (_super) {
    __extends(WebviewStateSessionProvider, _super);
    function WebviewStateSessionProvider(stateSessionConfig, autoMergeConfig, webviewRunner) {
        var _this = _super.call(this, SunbirdSdk.instance.sdkConfig.apiConfig, SunbirdSdk.instance.apiService, SunbirdSdk.instance.eventsBusService) || this;
        _this.stateSessionConfig = stateSessionConfig;
        _this.autoMergeConfig = autoMergeConfig;
        _this.telemetryService = SunbirdSdk.instance.telemetryService;
        _this.webViewRunner = webviewRunner || new WebviewRunnerImpl();
        return _this;
    }
    WebviewStateSessionProvider.prototype.provide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dsl, telemetryContext;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dsl = this.webViewRunner;
                        return [4 /*yield*/, this.telemetryService.buildContext().toPromise()];
                    case 1:
                        telemetryContext = _a.sent();
                        this.stateSessionConfig.target.params.push({
                            key: 'pdata',
                            value: JSON.stringify(telemetryContext.pdata)
                        });
                        return [2 /*return*/, dsl.launchWebview({
                                host: this.stateSessionConfig.target.host,
                                path: this.stateSessionConfig.target.path,
                                params: this.stateSessionConfig.target.params.reduce(function (acc, p) {
                                    acc[p.key] = p.value;
                                    return acc;
                                }, __assign({}, this.resetParams))
                            }).then(function () {
                                return dsl.any.apply(dsl, _this.stateSessionConfig.return.reduce(function (acc, forCase) {
                                    switch (forCase.type) {
                                        case 'state':
                                            acc.push(_this.buildStateSessionProvider(dsl, forCase));
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
                                                    return new WebviewAutoMergeSessionProvider(_this.autoMergeConfig, _this.webViewRunner, captured).provide();
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
    return WebviewStateSessionProvider;
}(WebviewBaseSessionProvider));
export { WebviewStateSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy1zdGF0ZS1zZXNzaW9uLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2F1dGgvdXRpbC93ZWJ2aWV3LXNlc3Npb24tcHJvdmlkZXIvaW1wbC93ZWJ2aWV3LXN0YXRlLXNlc3Npb24tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFJM0UsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQU90RjtJQUFpRCwrQ0FBMEI7SUFLdkUscUNBQ1ksa0JBQXFELEVBQ3JELGVBQTZDLEVBQ3JELGFBQTZCO1FBSGpDLFlBS0ksa0JBQ0ksVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUN2QyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFDOUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDdkMsU0FHSjtRQVhXLHdCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUM7UUFDckQscUJBQWUsR0FBZixlQUFlLENBQThCO1FBUXJELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1FBQzdELEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxJQUFJLElBQUksaUJBQWlCLEVBQUUsQ0FBQzs7SUFDbEUsQ0FBQztJQUVZLDZDQUFPLEdBQXBCOzs7Ozs7O3dCQUNVLEdBQUcsR0FBRyxJ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QUMvQixLQUFJLENBQUMsZUFBZSxFQUNwQixLQUFJLENBQUMsYUFBYSxFQUNsQixRQUFRLENBQ1gsQ0FBQyxPQUFPLEVBQUU7Z0RBSlgsQ0FJVyxDQUNkLENBQUM7NENBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0Q0FBQyxNQUFNO3FDQUNkO29DQUNELE9BQU8sR0FBRyxDQUFDO2dDQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDUjs0QkFDTixDQUFDLENBQUMsRUFBQzs7OztLQUNOO0lBRUwsa0NBQUM7QUFBRCxDQUFDLEFBcEZELENBQWlELDBCQUEwQixHQW9GMUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1dlYnZpZXdCYXNlU2Vzc2lvblByb3ZpZGVyfSBmcm9tICcuL3dlYnZpZXctYmFzZS1zZXNzaW9uLXByb3ZpZGVyJztcbmltcG9ydCB7T0F1dGhTZXNzaW9ufSBmcm9tICcuLi8uLi8uLi9kZWYvby1hdXRoLXNlc3Npb24nO1xuaW1wb3J0IHtXZWJ2aWV3UnVubmVyfSBmcm9tICcuLi9kZWYvd2Vidmlldy1ydW5uZXInO1xuaW1wb3J0IHtUZWxlbWV0cnlTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHtTdW5iaXJkU2RrfSBmcm9tICcuLi8uLi8uLi8uLi9zZGsnO1xuaW1wb3J0IHtXZWJ2aWV3UnVubmVySW1wbH0gZnJvbSAnLi93ZWJ2aWV3LXJ1bm5lci1pbXBsJztcbmltcG9ydCB7V2Vidmlld1N0YXRlU2Vzc2lvblByb3ZpZGVyQ29uZmlnfSBmcm9tICcuLi9kZWYvd2Vidmlldy1zdGF0ZS1zZXNzaW9uLXByb3ZpZGVyLWNvbmZpZyc7XG5pbXBvcnQge1NpZ25JbkVycm9yfSBmcm9tICcuLi8uLi8uLi9lcnJvcnMvc2lnbi1pbi1lcnJvcic7XG5pbXBvcnQge1dlYnZpZXdBdXRvTWVyZ2VTZXNzaW9uUHJvdmlkZXJ9IGZyb20gJy4vd2Vidmlldy1hdXRvLW1lcmdlLXNlc3Npb24tcHJvdmlkZXInO1xuaW1wb3J0IHtXZWJ2aWV3U2Vzc2lvblByb3ZpZGVyQ29uZmlnfSBmcm9tICcuLi9kZWYvd2Vidmlldy1zZXNzaW9uLXByb3ZpZGVyLWNvbmZpZyc7XG5cbmludGVyZmFjZSBQYXJhbU1hcCB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgV2Vidmlld1N0YXRlU2Vzc2lvblByb3ZpZGVyIGV4dGVuZHMgV2Vidmlld0Jhc2VTZXNzaW9uUHJvdmlkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgd2ViVmlld1J1bm5lcjogV2Vidmlld1J1bm5lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRlbGVtZXRyeVNlcnZpY2U6IFRlbGVtZXRyeVNlcnZpY2U7XG4gICAgcHJpdmF0ZSByZXNldFBhcmFtczogUGFyYW1NYXAgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZVNlc3Npb25Db25maWc6IFdlYnZpZXdTdGF0ZVNlc3Npb25Qcm92aWRlckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBhdXRvTWVyZ2VDb25maWc6IFdlYnZpZXdTZXNzaW9uUHJvdmlkZXJDb25maWcsXG4gICAgICAgIHdlYnZpZXdSdW5uZXI/OiBXZWJ2aWV3UnVubmVyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgU3VuYmlyZFNkay5pbnN0YW5jZS5zZGtDb25maWcuYXBpQ29uZmlnLFxuICAgICAgICAgICAgU3VuYmlyZFNkay5pbnN0YW5jZS5hcGlTZXJ2aWNlLFxuICAgICAgICAgICAgU3VuYmlyZFNkay5pbnN0YW5jZS5ldmVudHNCdXNTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGVsZW1ldHJ5U2VydmljZSA9IFN1bmJpcmRTZGsuaW5zdGFuY2UudGVsZW1ldHJ5U2VydmljZTtcbiAgICAgICAgdGhpcy53ZWJWaWV3UnVubmVyID0gd2Vidmlld1J1bm5lciB8fCBuZXcgV2Vidmlld1J1bm5lckltcGwoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcHJvdmlkZSgpOiBQcm9taXNlPE9BdXRoU2Vzc2lvbj4ge1xuICAgICAgICBjb25zdCBkc2wgPSB0aGlzLndlYlZpZXdSdW5uZXI7XG4gICAgICAgIGNvbnN0IHRlbGVtZXRyeUNvbnRleHQgPSBhd2FpdCB0aGlzLnRlbGVtZXRyeVNlcnZpY2UuYnVpbGRDb250ZXh0KCkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZVNlc3Npb25Db25maWcudGFyZ2V0LnBhcmFtcy5wdXNoKHtcbiAgICAgICAgICAgIGtleTogJ3BkYXRhJyxcbiAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeSh0ZWxlbWV0cnlDb250ZXh0LnBkYXRhKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZHNsLmxhdW5jaFdlYnZpZXcoe1xuICAgICAgICAgICAgaG9zdDogdGhpcy5zdGF0ZVNlc3Npb25Db25maWcudGFyZ2V0Lmhvc3QsXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlU2Vzc2lvbkNvbmZpZy50YXJnZXQucGF0aCxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5zdGF0ZVNlc3Npb25Db25maWcudGFyZ2V0LnBhcmFtcy5yZWR1Y2UoKGFjYywgcCkgPT4ge1xuICAgICAgICAgICAgICAgIGFjY1twLmtleV0gPSBwLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7Li4udGhpcy5yZXNldFBhcmFtc30pXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRzbC5hbnk8T0F1dGhTZXNzaW9uPihcbiAgICAgICAgICAgICAgICAuLi50aGlzLnN0YXRlU2Vzc2lvbkNvbmZpZy5yZXR1cm4ucmVkdWNlPFByb21pc2U8T0F1dGhTZXNzaW9uPltdPigoYWNjLCBmb3JDYXNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9yQ2FzZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0ZVNlc3Npb25Qcm92aWRlcihkc2wsIGZvckNhc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXRlLWVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChkc2wuY2FwdHVyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IGZvckNhc2Uud2hlbi5ob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBmb3JDYXNlLndoZW4ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBmb3JDYXNlLndoZW4ucGFyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkc2wuY2xvc2VXZWJ2aWV3KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHNsLnJlc29sdmVDYXB0dXJlZCgnZXJyb3JfbWVzc2FnZScpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2lnbkluRXJyb3IoJ1NlcnZlciBFcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocGFyYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2lnbkluRXJyb3IocGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlncmF0ZSc6IGFjYy5wdXNoKGRzbC5jYXB0dXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0OiBmb3JDYXNlLndoZW4uaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBmb3JDYXNlLndoZW4ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGZvckNhc2Uud2hlbi5wYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc2wuc3VjY2VzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICApLnRoZW4oKGNhcHR1cmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHNsLnJlc2V0SW5BcHBCcm93c2VyRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkc2wuY2xlYXJDYXB0dXJlKCkudGhlbigoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgV2Vidmlld0F1dG9NZXJnZVNlc3Npb25Qcm92aWRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b01lcmdlQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJWaWV3UnVubmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5wcm92aWRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIFtdKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19