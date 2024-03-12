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
import { GetFormHandler } from '../handle/get-form-handler';
import { injectable, inject } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
var FormServiceImpl = /** @class */ (function () {
    function FormServiceImpl(sdkConfig, apiService, fileService, cachedItemStore) {
        this.sdkConfig = sdkConfig;
        this.apiService = apiService;
        this.fileService = fileService;
        this.cachedItemStore = cachedItemStore;
        this.formServiceConfig = this.sdkConfig.formServiceConfig;
    }
    FormServiceImpl.prototype.getForm = function (formRequest) {
        return new GetFormHandler(this.apiService, this.formServiceConfig, this.fileService, this.cachedItemStore).handle(formRequest);
    };
    FormServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.API_SERVICE)),
        __param(2, inject(InjectionTokens.FILE_SERVICE)),
        __param(3, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], FormServiceImpl);
    return FormServiceImpl;
}());
export { FormServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZm9ybS9pbXBsL2Zvcm0tc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFJekQ7SUFJSSx5QkFDZ0QsU0FBb0IsRUFDbkIsVUFBc0IsRUFDckIsV0FBd0IsRUFDbkIsZUFBZ0M7UUFIdkMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNuRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztJQUM5RCxDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLFdBQXdCO1FBQzVCLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQzdELElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBZlEsZUFBZTtRQUQzQixVQUFVLEVBQUU7UUFNSixXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25DLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7T0FSckMsZUFBZSxDQWdCM0I7SUFBRCxzQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zvcm1SZXF1ZXN0LCBGb3JtU2VydmljZSwgRm9ybVNlcnZpY2VDb25maWd9IGZyb20gJy4uJztcbmltcG9ydCB7Q2FjaGVkSXRlbVN0b3JlfSBmcm9tICcuLi8uLi9rZXktdmFsdWUtc3RvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7R2V0Rm9ybUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZS9nZXQtZm9ybS1oYW5kbGVyJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7QXBpU2VydmljZX0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7IGluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbnMgfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IFNka0NvbmZpZyB9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2VJbXBsIGltcGxlbWVudHMgRm9ybVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBmb3JtU2VydmljZUNvbmZpZzogRm9ybVNlcnZpY2VDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQVBJX1NFUlZJQ0UpIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuRklMRV9TRVJWSUNFKSBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQ0FDSEVEX0lURU1fU1RPUkUpIHByaXZhdGUgY2FjaGVkSXRlbVN0b3JlOiBDYWNoZWRJdGVtU3RvcmUpIHtcbiAgICAgICAgdGhpcy5mb3JtU2VydmljZUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmZvcm1TZXJ2aWNlQ29uZmlnO1xuICAgIH1cblxuICAgIGdldEZvcm0oZm9ybVJlcXVlc3Q6IEZvcm1SZXF1ZXN0KTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IHt9IH0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZXRGb3JtSGFuZGxlcih0aGlzLmFwaVNlcnZpY2UsIHRoaXMuZm9ybVNlcnZpY2VDb25maWcsXG4gICAgICAgICAgICB0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLmNhY2hlZEl0ZW1TdG9yZSkuaGFuZGxlKGZvcm1SZXF1ZXN0KTtcbiAgICB9XG59XG4iXX0=