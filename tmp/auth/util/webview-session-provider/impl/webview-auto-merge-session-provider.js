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
import { AuthEventType } from '../../..';
import { WebviewBaseSessionProvider } from './webview-base-session-provider';
import { SunbirdSdk } from '../../../../sdk';
import { HttpRequestType, Request } from '../../../../api';
import { EventNamespace } from '../../../../events-bus';
import { mapTo } from 'rxjs/operators';
var WebviewAutoMergeSessionProvider = /** @class */ (function (_super) {
    __extends(WebviewAutoMergeSessionProvider, _super);
    function WebviewAutoMergeSessionProvider(autoMergeConfig, webviewRunner, captured) {
        var _this = _super.call(this, SunbirdSdk.instance.sdkConfig.apiConfig, SunbirdSdk.instance.apiService, SunbirdSdk.instance.eventsBusService) || this;
        _this.autoMergeConfig = autoMergeConfig;
        _this.webviewRunner = webviewRunner;
        _this.captured = captured;
        _this.telemetryService = SunbirdSdk.instance.telemetryService;
        return _this;
    }
    WebviewAutoMergeSessionProvider.prototype.provide = function () {
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
                        this.autoMergeConfig.target.params.push({
                            key: 'pdata',
                            value: JSON.stringify(telemetryContext.pdata)
                        });
                        Object.keys(this.captured).forEach(function (p) {
                            _this.autoMergeConfig.target.params.push({
                                key: p,
                                value: _this.captured[p]
                            });
                        });
                        return [2 /*return*/, dsl.redirectTo({
                                host: this.autoMergeConfig.target.host,
                                path: this.autoMergeConfig.target.path,
                                params: this.autoMergeConfig.target.params.reduce(function (acc, p) {
                                    acc[p.key] = p.value;
                                    return acc;
                                }, {})
                            }).then(function () {
                                return dsl.any.apply(dsl, _this.autoMergeConfig.return.reduce(function (acc, forCase) {
                                    switch (forCase.type) {
                                        case 'password':
                                            acc.push(_this.buildPasswordSessionProvider(dsl, forCase).then(function (session) {
                                                return _this.performAutoMerge({ payload: _this.captured['payload'], session: session });
                                            }));
                                            break;
                                        case 'state':
                                            acc.push(_this.buildStateSessionProvider(dsl, forCase));
                                            break;
                                        case 'google':
                                            acc.push(_this.buildGoogleSessionProvider(dsl, forCase)
                                                .then(function (session) {
                                                return _this.performAutoMerge({ payload: _this.captured['payload'], session: session });
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
    WebviewAutoMergeSessionProvider.prototype.performAutoMerge = function (_a) {
        var _this = this;
        var payload = _a.payload, session = _a.session;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.GET)
            .withPath(this.apiConfig.user_authentication.autoMergeApiPath)
            .withParameters({
            client_id: 'android'
        })
            .withHeaders({
            'x-authenticated-user-token': session.access_token,
            'x-authenticated-user-data': payload
        })
            .build();
        return this.apiService.fetch(apiRequest).pipe(mapTo(undefined)).toPromise().then(function () {
            _this.eventsBusService.emit({
                namespace: EventNamespace.AUTH,
                event: {
                    type: AuthEventType.AUTO_MIGRATE_SUCCESS,
                    payload: undefined
                }
            });
            return session;
        }).catch(function (e) {
            console.error(e);
            _this.eventsBusService.emit({
                namespace: EventNamespace.AUTH,
                event: {
                    type: AuthEventType.AUTO_MIGRATE_FAIL,
                    payload: undefined
                }
            });
            return session;
        });
    };
    return WebviewAutoMergeSessionProvider;
}(WebviewBaseSessionProvider));
export { WebviewAutoMergeSessionProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy1hdXRvLW1lcmdlLXNlc3Npb24tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXV0aC91dGlsL3dlYnZpZXctc2Vzc2lvbi1wcm92aWRlci9pbXBsL3dlYnZpZXctYXV0by1tZXJnZS1zZXNzaW9uLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsYUFBYSxFQUFlLE1BQU0sVUFBVSxDQUFDO0FBR3JELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdkM7SUFBcUQsbURBQTBCO0lBRzNFLHlDQUNZLGVBQTZDLEVBQzdDLGFBQTRCLEVBQzVCLFFBQW1DO1FBSC9DLFlBS0ksa0JBQ0ksVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUN2QyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFDOUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDdkMsU0FHSjtRQVhXLHFCQUFlLEdBQWYsZUFBZSxDQUE4QjtRQUM3QyxtQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixjQUFRLEdBQVIsUUFBUSxDQUEyQjtRQVEzQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQzs7SUFDakUsQ0FBQztJQUVZLGlEQUFPLEdBQXBCOzs7Ozs7O3dCQUNVLEdB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QkFBMEIsR0FrSDlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBdXRoRXZlbnRUeXBlLCBPQXV0aFNlc3Npb259IGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7V2Vidmlld1J1bm5lcn0gZnJvbSAnLi4vZGVmL3dlYnZpZXctcnVubmVyJztcbmltcG9ydCB7V2Vidmlld1Nlc3Npb25Qcm92aWRlckNvbmZpZ30gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHtXZWJ2aWV3QmFzZVNlc3Npb25Qcm92aWRlcn0gZnJvbSAnLi93ZWJ2aWV3LWJhc2Utc2Vzc2lvbi1wcm92aWRlcic7XG5pbXBvcnQge1N1bmJpcmRTZGt9IGZyb20gJy4uLy4uLy4uLy4uL3Nkayc7XG5pbXBvcnQge0h0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7RXZlbnROYW1lc3BhY2V9IGZyb20gJy4uLy4uLy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IHsgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1RlbGVtZXRyeVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL3RlbGVtZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBXZWJ2aWV3QXV0b01lcmdlU2Vzc2lvblByb3ZpZGVyIGV4dGVuZHMgV2Vidmlld0Jhc2VTZXNzaW9uUHJvdmlkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGVsZW1ldHJ5U2VydmljZTogVGVsZW1ldHJ5U2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGF1dG9NZXJnZUNvbmZpZzogV2Vidmlld1Nlc3Npb25Qcm92aWRlckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSB3ZWJ2aWV3UnVubmVyOiBXZWJ2aWV3UnVubmVyLFxuICAgICAgICBwcml2YXRlIGNhcHR1cmVkOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgU3VuYmlyZFNkay5pbnN0YW5jZS5zZGtDb25maWcuYXBpQ29uZmlnLFxuICAgICAgICAgICAgU3VuYmlyZFNkay5pbnN0YW5jZS5hcGlTZXJ2aWNlLFxuICAgICAgICAgICAgU3VuYmlyZFNkay5pbnN0YW5jZS5ldmVudHNCdXNTZXJ2aWNlXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy50ZWxlbWV0cnlTZXJ2aWNlID0gU3VuYmlyZFNkay5pbnN0YW5jZS50ZWxlbWV0cnlTZXJ2aWNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBwcm92aWRlKCk6IFByb21pc2U8T0F1dGhTZXNzaW9uPiB7XG4gICAgICAgIGNvbnN0IGRzbCA9IHRoaXMud2Vidmlld1J1bm5lcjtcblxuICAgICAgICBjb25zdCB0ZWxlbWV0cnlDb250ZXh0ID0gYXdhaXQgdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmJ1aWxkQ29udGV4dCgpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHRoaXMuYXV0b01lcmdlQ29uZmlnLnRhcmdldC5wYXJhbXMucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdwZGF0YScsXG4gICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkodGVsZW1ldHJ5Q29udGV4dC5wZGF0YSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jYXB0dXJlZCkuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXV0b01lcmdlQ29uZmlnLnRhcmdldC5wYXJhbXMucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiBwLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNhcHR1cmVkW3BdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRzbC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIGhvc3Q6IHRoaXMuYXV0b01lcmdlQ29uZmlnLnRhcmdldC5ob3N0LFxuICAgICAgICAgICAgcGF0aDogdGhpcy5hdXRvTWVyZ2VDb25maWcudGFyZ2V0LnBhdGgsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuYXV0b01lcmdlQ29uZmlnLnRhcmdldC5wYXJhbXMucmVkdWNlKChhY2MsIHApID0+IHtcbiAgICAgICAgICAgICAgICBhY2NbcC5rZXldID0gcC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwge30pXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRzbC5hbnk8T0F1dGhTZXNzaW9uPihcbiAgICAgICAgICAgICAgICAuLi50aGlzLmF1dG9NZXJnZUNvbmZpZy5yZXR1cm4ucmVkdWNlPFByb21pc2U8T0F1dGhTZXNzaW9uPltdPigoYWNjLCBmb3JDYXNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9yQ2FzZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRQYXNzd29yZFNlc3Npb25Qcm92aWRlcihkc2wsIGZvckNhc2UpLnRoZW4oKHNlc3Npb24pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1BdXRvTWVyZ2Uoe3BheWxvYWQ6IHRoaXMuY2FwdHVyZWRbJ3BheWxvYWQnXSwgc2Vzc2lvbn0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0ZVNlc3Npb25Qcm92aWRlcihkc2wsIGZvckNhc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ29vZ2xlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZEdvb2dsZVNlc3Npb25Qcm92aWRlcihkc2wsIGZvckNhc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc2Vzc2lvbikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1BdXRvTWVyZ2Uoe3BheWxvYWQ6IHRoaXMuY2FwdHVyZWRbJ3BheWxvYWQnXSwgc2Vzc2lvbn0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgfSwgW10pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJmb3JtQXV0b01lcmdlKHtwYXlsb2FkLCBzZXNzaW9ufTogeyBwYXlsb2FkOiBzdHJpbmcsIHNlc3Npb246IE9BdXRoU2Vzc2lvbiB9KTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgY29uc3QgYXBpUmVxdWVzdCA9IG5ldyBSZXF1ZXN0LkJ1aWxkZXIoKVxuICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5HRVQpXG4gICAgICAgICAgICAud2l0aFBhdGgodGhpcy5hcGlDb25maWcudXNlcl9hdXRoZW50aWNhdGlvbi5hdXRvTWVyZ2VBcGlQYXRoKVxuICAgICAgICAgICAgLndpdGhQYXJhbWV0ZXJzKHtcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQ6ICdhbmRyb2lkJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aXRoSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ3gtYXV0aGVudGljYXRlZC11c2VyLXRva2VuJzogc2Vzc2lvbi5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ3gtYXV0aGVudGljYXRlZC11c2VyLWRhdGEnOiBwYXlsb2FkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaChhcGlSZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICApLnRvUHJvbWlzZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNCdXNTZXJ2aWNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuQVVUSCxcbiAgICAgICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBBdXRoRXZlbnRUeXBlLkFVVE9fTUlHUkFURV9TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBFdmVudE5hbWVzcGFjZS5BVVRILFxuICAgICAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEF1dGhFdmVudFR5cGUuQVVUT19NSUdSQVRFX0ZBSUwsXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19