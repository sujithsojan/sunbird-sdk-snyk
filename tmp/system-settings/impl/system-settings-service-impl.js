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
import { GetSystemSettingsHandler } from '../handlers/get-system-settings-handler';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
var SystemSettingsServiceImpl = /** @class */ (function () {
    function SystemSettingsServiceImpl(sdkConfig, apiService, fileService, cachedChannelItemStore) {
        this.sdkConfig = sdkConfig;
        this.apiService = apiService;
        this.fileService = fileService;
        this.cachedChannelItemStore = cachedChannelItemStore;
        this.systemSettingsConfig = this.sdkConfig.systemSettingsConfig;
    }
    SystemSettingsServiceImpl.prototype.getSystemSettings = function (request) {
        return new GetSystemSettingsHandler(this.apiService, this.systemSettingsConfig, this.fileService, this.cachedChannelItemStore).handle(request);
    };
    SystemSettingsServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.API_SERVICE)),
        __param(2, inject(InjectionTokens.FILE_SERVICE)),
        __param(3, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], SystemSettingsServiceImpl);
    return SystemSettingsServiceImpl;
}());
export { SystemSettingsServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLXNldHRpbmdzLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zeXN0ZW0tc2V0dGluZ3MvaW1wbC9zeXN0ZW0tc2V0dGluZ3Mtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUl2RDtJQUdJLG1DQUNnRCxTQUFvQixFQUNuQixVQUFzQixFQUNyQixXQUF3QixFQUNuQixzQkFBdUM7UUFIOUMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25CLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBaUI7UUFFMUYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7SUFDcEUsQ0FBQztJQUVELHFEQUFpQixHQUFqQixVQUFrQixPQUFpQztRQUMvQyxPQUFPLElBQUksd0JBQXdCLENBQy9CLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLG9CQUFvQixFQUN6QixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsc0JBQXNCLENBQzlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFuQlEseUJBQXlCO1FBRHJDLFVBQVUsRUFBRTtRQUtKLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOztPQVByQyx5QkFBeUIsQ0FvQnJDO0lBQUQsZ0NBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NhY2hlZEl0ZW1TdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7R2V0U3lzdGVtU2V0dGluZ3NSZXF1ZXN0LCBTeXN0ZW1TZXR0aW5ncywgU3lzdGVtU2V0dGluZ3NDb25maWcsIFN5c3RlbVNldHRpbmdzU2VydmljZX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXBpU2VydmljZX0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7R2V0U3lzdGVtU2V0dGluZ3NIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVycy9nZXQtc3lzdGVtLXNldHRpbmdzLWhhbmRsZXInO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXN0ZW1TZXR0aW5nc1NlcnZpY2VJbXBsIGltcGxlbWVudHMgU3lzdGVtU2V0dGluZ3NTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN5c3RlbVNldHRpbmdzQ29uZmlnOiBTeXN0ZW1TZXR0aW5nc0NvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSkgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DQUNIRURfSVRFTV9TVE9SRSkgcHJpdmF0ZSBjYWNoZWRDaGFubmVsSXRlbVN0b3JlOiBDYWNoZWRJdGVtU3RvcmUsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc3lzdGVtU2V0dGluZ3NDb25maWcgPSB0aGlzLnNka0NvbmZpZy5zeXN0ZW1TZXR0aW5nc0NvbmZpZztcbiAgICB9XG5cbiAgICBnZXRTeXN0ZW1TZXR0aW5ncyhyZXF1ZXN0OiBHZXRTeXN0ZW1TZXR0aW5nc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFN5c3RlbVNldHRpbmdzPiB7XG4gICAgICAgIHJldHVybiBuZXcgR2V0U3lzdGVtU2V0dGluZ3NIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1TZXR0aW5nc0NvbmZpZyxcbiAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmNhY2hlZENoYW5uZWxJdGVtU3RvcmUsXG4gICAgICAgICkuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cbn1cbiJdfQ==