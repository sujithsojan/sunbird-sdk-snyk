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
import { HttpRequestType, Request } from '../../api';
import { zip } from 'rxjs';
import { DeviceRegister } from '../../preference-keys';
import { map, mergeMap, tap } from 'rxjs/operators';
var DeviceRegisterHandler = /** @class */ (function () {
    function DeviceRegisterHandler(sdkConfig, deviceInfo, sharedPreferences, frameworkService, appInfoService, apiService, getDeviceProfileHandler) {
        this.sdkConfig = sdkConfig;
        this.deviceInfo = deviceInfo;
        this.sharedPreferences = sharedPreferences;
        this.frameworkService = frameworkService;
        this.appInfoService = appInfoService;
        this.apiService = apiService;
        this.getDeviceProfileHandler = getDeviceProfileHandler;
        this.deviceRegisterConfig = this.sdkConfig.deviceRegisterConfig;
        this.apiConfig = this.sdkConfig.apiConfig;
    }
    DeviceRegisterHandler.prototype.handle = function (request) {
        return this.registerDevice(request);
    };
    DeviceRegisterHandler.prototype.registerDevice = function (request) {
        var _this = this;
        return zip(this.deviceInfo.getDeviceSpec(), this.frameworkService.getActiveChannelId(), this.appInfoService.getFirstAccessTimestamp(), this.sharedPreferences.getString(DeviceRegister.DEVICE_LOCATION))
            .pipe(mergeMap(function (results) { return __awaiter(_this, void 0, void 0, function () {
            var deviceSpec, activeChannelId, firstAccessTimestamp, deviceLocation, deviceProfile, e_1, apiRequest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deviceSpec = results[0];
                        activeChannelId = results[1];
                        firstAccessTimestamp = results[2];
                        deviceLocation = results[3];
                        request = __assign(__assign({}, (request || {})), { dspec: deviceSpec, channel: activeChannelId, fcmToken: this.deviceRegisterConfig.fcmToken, producer: this.apiConfig.api_authentication.producerId, first_access: Number(firstAccessTimestamp) });
                        if (!(!request.userDeclaredLocation && deviceLocation)) return [3 /*break*/, 4];
                        request.userDeclaredLocation = JSON.parse(deviceLocation);
                        if (!!request.userDeclaredLocation.declaredOffline) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getDeviceProfileHandler.handle().toPromise()];
                    case 2:
                        deviceProfile = _a.sent();
                        if (!deviceProfile.userDeclaredLocation ||
                            !deviceProfile.userDeclaredLocation.state ||
                            !deviceProfile.userDeclaredLocation.district) {
                            delete request.userDeclaredLocation;
                            this.sharedPreferences.putString(DeviceRegister.DEVICE_LOCATION, '').toPromise();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        delete request.userDeclaredLocation;
                        return [3 /*break*/, 4];
                    case 4:
                        if (request.userDeclaredLocation) {
                            delete request.userDeclaredLocation.declaredOffline;
                        }
                        apiRequest = new Request.Builder()
                            .withType(HttpRequestType.POST)
                            .withPath(this.deviceRegisterConfig.apiPath + DeviceRegisterHandler.DEVICE_REGISTER_ENDPOINT
                            + '/' + this.deviceInfo.getDeviceID())
                            .withBearerToken(true)
                            .withBody({ request: request })
                            .build();
                        return [2 /*return*/, this.apiService.fetch(apiRequest)
                                .pipe(map(function (res) {
                                return res.body;
                            }), tap(function () {
                                if (request.userDeclaredLocation) {
                                    _this.sharedPreferences.putString(DeviceRegister.DEVICE_LOCATION, JSON.stringify(request.userDeclaredLocation)).toPromise();
                                }
                            }))
                                .toPromise()];
                }
            });
        }); }));
    };
    DeviceRegisterHandler.DEVICE_REGISTER_ENDPOINT = '/register';
    return DeviceRegisterHandler;
}());
export { DeviceRegisterHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLXJlZ2lzdGVyLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGV2aWNlLXJlZ2lzdGVyL2hhbmRsZXIvZGV2aWNlLXJlZ2lzdGVyLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQTJDLGVBQWUsRUFBRSxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFN0YsT0FBTyxFQUFhLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU1yQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHbEQ7SUFPSSwrQkFDWSxTQUFvQixFQUNwQixVQUFzQixFQUN0QixpQkFBb0MsRUFDcEMsZ0JBQWtDLEVBQ2xDLGNBQXVCLEVBQ3ZCLFVBQXNCLEVBQ3RCLHVCQUFnRDtRQU5oRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFTO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUV4RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzlDLENBQUM7SUFFRCxzQ0FBTSxHQUFOLFVBQU8sT0FBK0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8s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cEIsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDO2dDQUNBLElBQUksT0FBUSxDQUFDLG9CQUFvQixFQUFFO29DQUMvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUM1QixjQUFjLENBQUMsZUFBZSxFQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUNoRCxDQUFDLFNBQVMsRUFBRSxDQUFDO2lDQUNqQjs0QkFDTCxDQUFDLENBQUMsQ0FDTDtpQ0FDQSxTQUFTLEVBQUUsRUFBQzs7O2FBQ3BCLENBQUMsQ0FDTCxDQUFDO0lBQ1YsQ0FBQztJQXBHdUIsOENBQXdCLEdBQUcsV0FBVyxDQUFDO0lBc0duRSw0QkFBQztDQUFBLEFBeEdELElBd0dDO1NBeEdZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpQ29uZmlnLCBBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtEZXZpY2VSZWdpc3RlckNvbmZpZywgRGV2aWNlUmVnaXN0ZXJSZXF1ZXN0LCBEZXZpY2VSZWdpc3RlclJlc3BvbnNlLCBVc2VyRGVjbGFyZWRMb2NhdGlvbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEZXZpY2VJbmZvLCBEZXZpY2VTcGVjfSBmcm9tICcuLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge0FwcEluZm99IGZyb20gJy4uLy4uL3V0aWwvYXBwJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7RnJhbWV3b3JrU2VydmljZX0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7RGV2aWNlUmVnaXN0ZXJ9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge21hcCwgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtHZXREZXZpY2VQcm9maWxlSGFuZGxlcn0gZnJvbSAnLi9nZXQtZGV2aWNlLXByb2ZpbGUtaGFuZGxlcic7XG5cbmV4cG9ydCBjbGFzcyBEZXZpY2VSZWdpc3RlckhhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxEZXZpY2VSZWdpc3RlclJlcXVlc3QsIERldmljZVJlZ2lzdGVyUmVzcG9uc2U+IHtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERFVklDRV9SRUdJU1RFUl9FTkRQT0lOVCA9ICcvcmVnaXN0ZXInO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXZpY2VSZWdpc3RlckNvbmZpZzogRGV2aWNlUmVnaXN0ZXJDb25maWc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhcGlDb25maWc6IEFwaUNvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBwcml2YXRlIGRldmljZUluZm86IERldmljZUluZm8sXG4gICAgICAgIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBwcml2YXRlIGZyYW1ld29ya1NlcnZpY2U6IEZyYW1ld29ya1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYXBwSW5mb1NlcnZpY2U6IEFwcEluZm8sXG4gICAgICAgIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBnZXREZXZpY2VQcm9maWxlSGFuZGxlcjogR2V0RGV2aWNlUHJvZmlsZUhhbmRsZXJcbiAgICApIHtcbiAgICAgICAgdGhpcy5kZXZpY2VSZWdpc3RlckNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmRldmljZVJlZ2lzdGVyQ29uZmlnO1xuICAgICAgICB0aGlzLmFwaUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZztcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdD86IERldmljZVJlZ2lzdGVyUmVxdWVzdCk6IE9ic2VydmFibGU8RGV2aWNlUmVnaXN0ZXJSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlckRldmljZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyRGV2aWNlKHJlcXVlc3Q/OiBEZXZpY2VSZWdpc3RlclJlcXVlc3QpOiBPYnNlcnZhYmxlPERldmljZVJlZ2lzdGVyUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlSW5mby5nZXREZXZpY2VTcGVjKCksXG4gICAgICAgICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0QWN0aXZlQ2hhbm5lbElkKCksXG4gICAgICAgICAgICB0aGlzLmFwcEluZm9TZXJ2aWNlLmdldEZpcnN0QWNjZXNzVGltZXN0YW1wKCksXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhEZXZpY2VSZWdpc3Rlci5ERVZJQ0VfTE9DQVRJT04pXG4gICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKGFzeW5jIChyZXN1bHRzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlU3BlYzogRGV2aWNlU3BlYyA9IHJlc3VsdHNbMF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNoYW5uZWxJZDogc3RyaW5nID0gcmVzdWx0c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RBY2Nlc3NUaW1lc3RhbXAgPSByZXN1bHRzWzJdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2VMb2NhdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkID0gcmVzdWx0c1szXTtcblxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHJlcXVlc3QgfHwge30pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHNwZWM6IGRldmljZVNwZWMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBhY3RpdmVDaGFubmVsSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmY21Ub2tlbjogdGhpcy5kZXZpY2VSZWdpc3RlckNvbmZpZy5mY21Ub2tlbiEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWNlcjogdGhpcy5hcGlDb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLnByb2R1Y2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9hY2Nlc3M6IE51bWJlcihmaXJzdEFjY2Vzc1RpbWVzdGFtcClcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QudXNlckRlY2xhcmVkTG9jYXRpb24gJiYgZGV2aWNlTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QudXNlckRlY2xhcmVkTG9jYXRpb24gPSBKU09OLnBhcnNlKGRldmljZUxvY2F0aW9uKSBhcyBVc2VyRGVjbGFyZWRMb2NhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnVzZXJEZWNsYXJlZExvY2F0aW9uLmRlY2xhcmVkT2ZmbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZVByb2ZpbGUgPSBhd2FpdCB0aGlzLmdldERldmljZVByb2ZpbGVIYW5kbGVyLmhhbmRsZSgpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFkZXZpY2VQcm9maWxlLnVzZXJEZWNsYXJlZExvY2F0aW9uIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZGV2aWNlUHJvZmlsZS51c2VyRGVjbGFyZWRMb2NhdGlvbi5zdGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRldmljZVByb2ZpbGUudXNlckRlY2xhcmVkTG9jYXRpb24uZGlzdHJpY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVxdWVzdC51c2VyRGVjbGFyZWRMb2NhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGV2aWNlUmVnaXN0ZXIuREVWSUNFX0xPQ0FUSU9OLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVxdWVzdC51c2VyRGVjbGFyZWRMb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51c2VyRGVjbGFyZWRMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlcXVlc3QudXNlckRlY2xhcmVkTG9jYXRpb24uZGVjbGFyZWRPZmZsaW5lO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBpUmVxdWVzdDogUmVxdWVzdCA9IG5ldyBSZXF1ZXN0LkJ1aWxkZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QT1NUKVxuICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhQYXRoKHRoaXMuZGV2aWNlUmVnaXN0ZXJDb25maWchLmFwaVBhdGggKyBEZXZpY2VSZWdpc3RlckhhbmRsZXIuREVWSUNFX1JFR0lTVEVSX0VORFBPSU5UXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnLycgKyB0aGlzLmRldmljZUluZm8hLmdldERldmljZUlEKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAud2l0aEJvZHkoe3JlcXVlc3Q6IHJlcXVlc3R9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZSEuZmV0Y2g8RGV2aWNlUmVnaXN0ZXJSZXNwb25zZT4oYXBpUmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdCEudXNlckRlY2xhcmVkTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERldmljZVJlZ2lzdGVyLkRFVklDRV9MT0NBVElPTixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShyZXF1ZXN0IS51c2VyRGVjbGFyZWRMb2NhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxufVxuIl19