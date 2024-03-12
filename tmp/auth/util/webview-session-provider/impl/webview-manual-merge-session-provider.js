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
import { InterruptError } from '../../..';
var WebviewManualMergeSessionProvider = /** @class */ (function (_super) {
    __extends(WebviewManualMergeSessionProvider, _super);
    function WebviewManualMergeSessionProvider(manualMergeConfig, webviewRunner) {
        var _this = _super.call(this, SunbirdSdk.instance.sdkConfig.apiConfig, SunbirdSdk.instance.apiService, SunbirdSdk.instance.eventsBusService) || this;
        _this.manualMergeConfig = manualMergeConfig;
        _this.telemetryService = SunbirdSdk.instance.telemetryService;
        _this.webviewRunner = webviewRunner || new WebviewRunnerImpl();
        return _this;
    }
    WebviewManualMergeSessionProvider.prototype.provide = function () {
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
                        this.manualMergeConfig.target.params.push({
                            key: 'pdata',
                            value: JSON.stringify(telemetryContext.pdata)
                        });
                        return [2 /*return*/, dsl.launchWebview({
                                host: this.manualMergeConfig.target.host,
                                path: this.manualMergeConfig.target.path,
                                params: this.manualMergeConfig.target.params.reduce(function (acc, p) {
                                    acc[p.key] = p.value;
                                    return acc;
                                }, {})
                            }).then(function () {
                                return dsl.any.apply(dsl, _this.manualMergeConfig.return.reduce(function (acc, forCase) {
                                    switch (forCase.type) {
                                        case 'password':
                                            acc.push(_this.buildPasswordSessionProvider(dsl, forCase));
                                            break;
                                        case 'google':
                                            acc.push(_this.buildGoogleSessionProvider(dsl, forCase));
                                            break;
                                        case 'exit':
                                            acc.push(dsl.capture({
                                                host: forCase.when.host,
                                                path: forCase.when.path,
                                                params: forCase.when.params
                                            }).then(function () {
                                                return dsl.closeWebview().then(function () {
                                                    return dsl.clearCapture().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            throw new InterruptError('EXIT param found');
                                                        });
                                                    }); });
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
    return WebviewManualMergeSessionProvider;
}(WebviewBaseSessionProvider));
export { WebviewManualMergeSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy1tYW51YWwtbWVyZ2Utc2Vzc2lvbi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hdXRoL3V0aWwvd2Vidmlldy1zZXNzaW9uLXByb3ZpZGVyL2ltcGwvd2Vidmlldy1tYW51YWwtbWVyZ2Utc2Vzc2lvbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFHM0UsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHeEM7SUFBdUQscURBQTBCO0lBSTdFLDJDQUNZLGlCQUErQyxFQUN2RCxhQUE2QjtRQUZqQyxZQUlJLGtCQUNJLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDdkMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQzlCLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQ3ZDLFNBSUo7UUFYVyx1QkFBaUIsR0FBakIsaUJBQWlCLENBQThCO1FBU3ZELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1FBQzdELEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxJQUFJLElBQUksaUJBQWlCLEVBQUUsQ0FBQzs7SUFDbEUsQ0FBQztJQUVZLG1EQUFPLEdBQXBCOzs7Ozs7O3dCQUNVLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUVOLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXpFLGdCQUFnQixHQUFHLFNBQXNEO3dCQUUvRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7NEJBQ3RDLEdBQUcsRUFBRSxPQUFPOzRCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQzt5QkFDaEQsQ0FBQyxDQUFDO3dCQUVILHNCQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUM7Z0NBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUk7Z0NBQ3hDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUk7Z0NBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQztvQ0FDdkQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO29DQUNyQixPQUFPLEdBQUcsQ0FBQztnQ0FDZixDQUFDLEVBQUUsRUFBRSxDQUFDOzZCQUNULENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQ0osT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFQLEdBQUcsRUFDSCxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBMEIsVUFBQyxHQUFHLEVBQUUsT0FBTztvQ0FDMUUsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFO3dDQUNsQixLQUFLLFVBQVU7NENBQUUsR0FBRyxDQUFDLElBQUksQ0FDckIsS0FBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FDbEQsQ0FBQzs0Q0FBQyxNQUFNO3dDQUVULEtBQUssUUFBUTs0Q0FBRSxHQUFHLENBQUMsSUFBSSxDQUNuQixLQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUNoRCxDQUFDOzRDQUFDLE1BQU07d0NBRVQsS0FBSyxNQUFNOzRDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUM7Z0RBQ1IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTtnREFDdkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTtnREFDdkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTTs2Q0FDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQztnREFDSixPQUFBLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ3BCLE9BQUEsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQzs7NERBQ3BCLE1BQU0sSUFBSSxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7eURBQ2hELENBQUM7Z0RBRkYsQ0FFRSxDQUNMOzRDQUpELENBSUMsQ0FDSixDQUNKLENBQUM7NENBQUMsTUFBTTtxQ0FDWjtvQ0FFRCxPQUFPLEdBQUcsQ0FBQztnQ0FDZixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ1I7NEJBQ04sQ0FBQyxDQUFDLEVBQUM7Ozs7S0FDTjtJQUNMLHdDQUFDO0FBQUQsQ0FBQyxBQW5FRCxDQUF1RCwwQkFBMEIsR0FtRWhGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtXZWJ2aWV3QmFzZVNlc3Npb25Qcm92aWRlcn0gZnJvbSAnLi93ZWJ2aWV3LWJhc2Utc2Vzc2lvbi1wcm92aWRlcic7XG5pbXBvcnQge1dlYnZpZXdSdW5uZXJ9IGZyb20gJy4uL2RlZi93ZWJ2aWV3LXJ1bm5lcic7XG5pbXBvcnQge1dlYnZpZXdTZXNzaW9uUHJvdmlkZXJDb25maWd9IGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7U3VuYmlyZFNka30gZnJvbSAnLi4vLi4vLi4vLi4vc2RrJztcbmltcG9ydCB7V2Vidmlld1J1bm5lckltcGx9IGZyb20gJy4vd2Vidmlldy1ydW5uZXItaW1wbCc7XG5pbXBvcnQge09BdXRoU2Vzc2lvbn0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHtJbnRlcnJ1cHRFcnJvcn0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHtUZWxlbWV0cnlTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi8uLi90ZWxlbWV0cnknO1xuXG5leHBvcnQgY2xhc3MgV2Vidmlld01hbnVhbE1lcmdlU2Vzc2lvblByb3ZpZGVyIGV4dGVuZHMgV2Vidmlld0Jhc2VTZXNzaW9uUHJvdmlkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgd2Vidmlld1J1bm5lcjogV2Vidmlld1J1bm5lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRlbGVtZXRyeVNlcnZpY2U6IFRlbGVtZXRyeVNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYW51YWxNZXJnZUNvbmZpZzogV2Vidmlld1Nlc3Npb25Qcm92aWRlckNvbmZpZyxcbiAgICAgICAgd2Vidmlld1J1bm5lcj86IFdlYnZpZXdSdW5uZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBTdW5iaXJkU2RrLmluc3RhbmNlLnNka0NvbmZpZy5hcGlDb25maWcsXG4gICAgICAgICAgICBTdW5iaXJkU2RrLmluc3RhbmNlLmFwaVNlcnZpY2UsXG4gICAgICAgICAgICBTdW5iaXJkU2RrLmluc3RhbmNlLmV2ZW50c0J1c1NlcnZpY2VcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnRlbGVtZXRyeVNlcnZpY2UgPSBTdW5iaXJkU2RrLmluc3RhbmNlLnRlbGVtZXRyeVNlcnZpY2U7XG4gICAgICAgIHRoaXMud2Vidmlld1J1bm5lciA9IHdlYnZpZXdSdW5uZXIgfHwgbmV3IFdlYnZpZXdSdW5uZXJJbXBsKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgY29uc3QgZHNsID0gdGhpcy53ZWJ2aWV3UnVubmVyO1xuXG4gICAgICAgIGNvbnN0IHRlbGVtZXRyeUNvbnRleHQgPSBhd2FpdCB0aGlzLnRlbGVtZXRyeVNlcnZpY2UuYnVpbGRDb250ZXh0KCkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxNZXJnZUNvbmZpZy50YXJnZXQucGFyYW1zLnB1c2goe1xuICAgICAgICAgICAga2V5OiAncGRhdGEnLFxuICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRlbGVtZXRyeUNvbnRleHQucGRhdGEpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkc2wubGF1bmNoV2Vidmlldyh7XG4gICAgICAgICAgICBob3N0OiB0aGlzLm1hbnVhbE1lcmdlQ29uZmlnLnRhcmdldC5ob3N0LFxuICAgICAgICAgICAgcGF0aDogdGhpcy5tYW51YWxNZXJnZUNvbmZpZy50YXJnZXQucGF0aCxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5tYW51YWxNZXJnZUNvbmZpZy50YXJnZXQucGFyYW1zLnJlZHVjZSgoYWNjLCBwKSA9PiB7XG4gICAgICAgICAgICAgICAgYWNjW3Aua2V5XSA9IHAudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkc2wuYW55PE9BdXRoU2Vzc2lvbj4oXG4gICAgICAgICAgICAgICAgLi4udGhpcy5tYW51YWxNZXJnZUNvbmZpZy5yZXR1cm4ucmVkdWNlPFByb21pc2U8T0F1dGhTZXNzaW9uPltdPigoYWNjLCBmb3JDYXNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9yQ2FzZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6IGFjYy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRQYXNzd29yZFNlc3Npb25Qcm92aWRlcihkc2wsIGZvckNhc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICApOyBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ29vZ2xlJzogYWNjLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZEdvb2dsZVNlc3Npb25Qcm92aWRlcihkc2wsIGZvckNhc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICApOyBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXhpdCc6IGFjYy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzbC5jYXB0dXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9zdDogZm9yQ2FzZS53aGVuLmhvc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGZvckNhc2Uud2hlbi5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGZvckNhc2Uud2hlbi5wYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzbC5jbG9zZVdlYnZpZXcoKS50aGVuKCgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc2wuY2xlYXJDYXB0dXJlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludGVycnVwdEVycm9yKCdFWElUIHBhcmFtIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIFtdKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==