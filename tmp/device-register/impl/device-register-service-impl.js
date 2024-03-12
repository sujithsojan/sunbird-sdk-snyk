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
import { inject, injectable } from 'inversify';
import { DeviceRegisterHandler } from '../handler/device-register-handler';
import { InjectionTokens } from '../../injection-tokens';
import { GetDeviceProfileHandler } from '../handler/get-device-profile-handler';
var DeviceRegisterServiceImpl = /** @class */ (function () {
    function DeviceRegisterServiceImpl(sdkConfig, deviceInfo, sharedPreferences, frameworkService, appInfoService, apiService) {
        this.sdkConfig = sdkConfig;
        this.deviceInfo = deviceInfo;
        this.sharedPreferences = sharedPreferences;
        this.frameworkService = frameworkService;
        this.appInfoService = appInfoService;
        this.apiService = apiService;
        this.getDeviceProfileHandler = new GetDeviceProfileHandler(this.sdkConfig, this.deviceInfo, this.apiService);
        this.deviceRegisterHandler = new DeviceRegisterHandler(this.sdkConfig, this.deviceInfo, this.sharedPreferences, this.frameworkService, this.appInfoService, this.apiService, this.getDeviceProfileHandler);
    }
    DeviceRegisterServiceImpl.prototype.registerDevice = function (request) {
        return this.deviceRegisterHandler
            .handle(request);
    };
    DeviceRegisterServiceImpl.prototype.getDeviceProfile = function () {
        return this.getDeviceProfileHandler
            .handle();
    };
    DeviceRegisterServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.DEVICE_INFO)),
        __param(2, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(3, inject(InjectionTokens.FRAMEWORK_SERVICE)),
        __param(4, inject(InjectionTokens.APP_INFO)),
        __param(5, inject(InjectionTokens.API_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
    ], DeviceRegisterServiceImpl);
    return DeviceRegisterServiceImpl;
}());
export { DeviceRegisterServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLXJlZ2lzdGVyLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXZpY2UtcmVnaXN0ZXIvaW1wbC9kZXZpY2UtcmVnaXN0ZXItc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQU12RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUk5RTtJQUlJLG1DQUNnRCxTQUFvQixFQUNuQixVQUFzQixFQUNmLGlCQUFvQyxFQUNyQyxnQkFBa0MsRUFDM0MsY0FBdUIsRUFDcEIsVUFBc0I7UUFMdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzNDLG1CQUFjLEdBQWQsY0FBYyxDQUFTO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFbkUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFDakksSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxrREFBYyxHQUFkLFVBQWUsT0FBK0I7UUFDMUMsT0FBTyxJQUFJLENBQUMscUJBQXFCO2FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsb0RBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsdUJBQXVCO2FBQzlCLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUExQlEseUJBQXlCO1FBRHJDLFVBQVUsRUFBRTtRQU1KLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQTs7T0FWL0IseUJBQXlCLENBNEJyQztJQUFELGdDQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0E1QlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZXZpY2VQcm9maWxlUmVzcG9uc2UsIERldmljZVJlZ2lzdGVyUmVxdWVzdCwgRGV2aWNlUmVnaXN0ZXJSZXNwb25zZSwgRGV2aWNlUmVnaXN0ZXJTZXJ2aWNlfSBmcm9tICcuLic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0RldmljZVJlZ2lzdGVySGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci9kZXZpY2UtcmVnaXN0ZXItaGFuZGxlcic7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7QXBwSW5mb30gZnJvbSAnLi4vLi4vdXRpbC9hcHAnO1xuaW1wb3J0IHtBcGlTZXJ2aWNlfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtGcmFtZXdvcmtTZXJ2aWNlfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsnO1xuaW1wb3J0IHtHZXREZXZpY2VQcm9maWxlSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci9nZXQtZGV2aWNlLXByb2ZpbGUtaGFuZGxlcic7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZXZpY2VSZWdpc3RlclNlcnZpY2VJbXBsIGltcGxlbWVudHMgRGV2aWNlUmVnaXN0ZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRldmljZVJlZ2lzdGVySGFuZGxlcjogRGV2aWNlUmVnaXN0ZXJIYW5kbGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZ2V0RGV2aWNlUHJvZmlsZUhhbmRsZXI6IEdldERldmljZVByb2ZpbGVIYW5kbGVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9JTkZPKSBwcml2YXRlIGRldmljZUluZm86IERldmljZUluZm8sXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKSBwcml2YXRlIGZyYW1ld29ya1NlcnZpY2U6IEZyYW1ld29ya1NlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFQUF9JTkZPKSBwcml2YXRlIGFwcEluZm9TZXJ2aWNlOiBBcHBJbmZvLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSkgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmdldERldmljZVByb2ZpbGVIYW5kbGVyID0gbmV3IEdldERldmljZVByb2ZpbGVIYW5kbGVyKHRoaXMuc2RrQ29uZmlnLCB0aGlzLmRldmljZUluZm8sIHRoaXMuYXBpU2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5kZXZpY2VSZWdpc3RlckhhbmRsZXIgPSBuZXcgRGV2aWNlUmVnaXN0ZXJIYW5kbGVyKHRoaXMuc2RrQ29uZmlnLCB0aGlzLmRldmljZUluZm8sIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMsIHRoaXMuZnJhbWV3b3JrU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuYXBwSW5mb1NlcnZpY2UsIHRoaXMuYXBpU2VydmljZSwgdGhpcy5nZXREZXZpY2VQcm9maWxlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJEZXZpY2UocmVxdWVzdD86IERldmljZVJlZ2lzdGVyUmVxdWVzdCk6IE9ic2VydmFibGU8RGV2aWNlUmVnaXN0ZXJSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2VSZWdpc3RlckhhbmRsZXJcbiAgICAgICAgICAgIC5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgZ2V0RGV2aWNlUHJvZmlsZSgpOiBPYnNlcnZhYmxlPERldmljZVByb2ZpbGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREZXZpY2VQcm9maWxlSGFuZGxlclxuICAgICAgICAgICAgLmhhbmRsZSgpO1xuICAgIH1cblxufVxuIl19