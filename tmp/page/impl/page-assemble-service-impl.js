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
import { PageAssemblerFactory } from '../handle/page-assembler-factory';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { DbService } from '../../db';
import { PageAssembleKeys } from '../../preference-keys';
var PageAssembleServiceImpl = /** @class */ (function () {
    function PageAssembleServiceImpl(apiService, sdkConfig, cachedItemStore, keyValueStore, sharedPreferences, frameworkService, authService, systemSettingsService, dbService, profileService) {
        this.apiService = apiService;
        this.sdkConfig = sdkConfig;
        this.cachedItemStore = cachedItemStore;
        this.keyValueStore = keyValueStore;
        this.sharedPreferences = sharedPreferences;
        this.frameworkService = frameworkService;
        this.authService = authService;
        this.systemSettingsService = systemSettingsService;
        this.dbService = dbService;
        this.profileService = profileService;
        this.pageAssembleServiceConfig = this.sdkConfig.pageServiceConfig;
    }
    PageAssembleServiceImpl.prototype.setPageAssembleChannel = function (request) {
        this.sharedPreferences.putString(PageAssembleKeys.KEY_ORGANISATION_ID, request.channelId).toPromise();
    };
    PageAssembleServiceImpl.prototype.getPageAssemble = function (criteria) {
        return new PageAssemblerFactory(this.apiService, this.pageAssembleServiceConfig, this.cachedItemStore, this.keyValueStore, this.sharedPreferences, this.frameworkService, this.authService, this.systemSettingsService, this.dbService, this.profileService).handle(criteria);
    };
    PageAssembleServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.API_SERVICE)),
        __param(1, inject(InjectionTokens.SDK_CONFIG)),
        __param(2, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __param(3, inject(InjectionTokens.KEY_VALUE_STORE)),
        __param(4, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(5, inject(InjectionTokens.FRAMEWORK_SERVICE)),
        __param(6, inject(InjectionTokens.AUTH_SERVICE)),
        __param(7, inject(InjectionTokens.SYSTEM_SETTINGS_SERVICE)),
        __param(8, inject(InjectionTokens.DB_SERVICE)),
        __param(9, inject(InjectionTokens.PROFILE_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, DbService, Object])
    ], PageAssembleServiceImpl);
    return PageAssembleServiceImpl;
}());
export { PageAssembleServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hc3NlbWJsZS1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZS9pbXBsL3BhZ2UtYXNzZW1ibGUtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSXRFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU16RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR3ZEO0lBSUksaUNBQ2lELFVBQXNCLEVBQ3ZCLFNBQW9CLEVBQ2IsZUFBZ0MsRUFDbEMsYUFBNEIsRUFDekIsaUJBQW9DLEVBQ3JDLGdCQUFrQyxFQUN2QyxXQUF3QixFQUNiLHFCQUE0QyxFQUN6RCxTQUFvQixFQUNmLGNBQThCO1FBVGxDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNiLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3JDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDYiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ3pELGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDZixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFL0UsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUM7SUFDdEUsQ0FBQztJQUVELHdEQUFzQixHQUF0QixVQUF1QixPQUFzQztRQUN6RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxRyxDQUFDO0lBRUQsaURBQWUsR0FBZixVQUFnQixRQUE4QjtRQUMxQyxPQUFPLElBQUksb0JBQW9CLENBQzNCLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLHlCQUF5QixFQUM5QixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLHFCQUFxQixFQUMxQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxjQUFjLENBQ3RCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFwQ1EsdUJBQXVCO1FBRG5DLFVBQVUsRUFBRTtRQU1KLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzFDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3pDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUMvQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO3lHQURlLFNBQVM7T0FiM0QsdUJBQXVCLENBc0NuQztJQUFELDhCQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0F0Q1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYWdlQXNzZW1ibGVDcml0ZXJpYSwgUGFnZUFzc2VtYmxlU2VydmljZSwgUGFnZVNlcnZpY2VDb25maWcsIFNldFBhZ2VBc3NlbWJsZUNoYW5uZWxSZXF1ZXN0fSBmcm9tICcuLic7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7UGFnZUFzc2VtYmxlckZhY3Rvcnl9IGZyb20gJy4uL2hhbmRsZS9wYWdlLWFzc2VtYmxlci1mYWN0b3J5JztcbmltcG9ydCB7QXBpU2VydmljZX0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7Q2FjaGVkSXRlbVN0b3JlLCBLZXlWYWx1ZVN0b3JlfSBmcm9tICcuLi8uLi9rZXktdmFsdWUtc3RvcmUnO1xuaW1wb3J0IHsgU2hhcmVkUHJlZmVyZW5jZXMgfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQgeyBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW5zIH0gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQgeyBTZGtDb25maWcgfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7RnJhbWV3b3JrU2VydmljZX0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrJztcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4uLy4uL2F1dGgnO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge1N5c3RlbVNldHRpbmdzU2VydmljZX0gZnJvbSAnLi4vLi4vc3lzdGVtLXNldHRpbmdzJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZUtleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlQXNzZW1ibGVTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIFBhZ2VBc3NlbWJsZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYWdlQXNzZW1ibGVTZXJ2aWNlQ29uZmlnOiBQYWdlU2VydmljZUNvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSkgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DQUNIRURfSVRFTV9TVE9SRSkgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuS0VZX1ZBTFVFX1NUT1JFKSBwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmUsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKSBwcml2YXRlIGZyYW1ld29ya1NlcnZpY2U6IEZyYW1ld29ya1NlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFVVEhfU0VSVklDRSkgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNZU1RFTV9TRVRUSU5HU19TRVJWSUNFKSBwcml2YXRlIHN5c3RlbVNldHRpbmdzU2VydmljZTogU3lzdGVtU2V0dGluZ3NTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5QUk9GSUxFX1NFUlZJQ0UpIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMucGFnZUFzc2VtYmxlU2VydmljZUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLnBhZ2VTZXJ2aWNlQ29uZmlnO1xuICAgIH1cblxuICAgIHNldFBhZ2VBc3NlbWJsZUNoYW5uZWwocmVxdWVzdDogU2V0UGFnZUFzc2VtYmxlQ2hhbm5lbFJlcXVlc3QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoUGFnZUFzc2VtYmxlS2V5cy5LRVlfT1JHQU5JU0FUSU9OX0lELCByZXF1ZXN0LmNoYW5uZWxJZCkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUFzc2VtYmxlKGNyaXRlcmlhOiBQYWdlQXNzZW1ibGVDcml0ZXJpYSk6IE9ic2VydmFibGU8UGFnZUFzc2VtYmxlPiB7XG4gICAgICAgIHJldHVybiBuZXcgUGFnZUFzc2VtYmxlckZhY3RvcnkoXG4gICAgICAgICAgICB0aGlzLmFwaVNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLnBhZ2VBc3NlbWJsZVNlcnZpY2VDb25maWcsXG4gICAgICAgICAgICB0aGlzLmNhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgICAgIHRoaXMua2V5VmFsdWVTdG9yZSxcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1TZXR0aW5nc1NlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmRiU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZVNlcnZpY2VcbiAgICAgICAgKS5oYW5kbGUoY3JpdGVyaWEpO1xuICAgIH1cblxufVxuIl19