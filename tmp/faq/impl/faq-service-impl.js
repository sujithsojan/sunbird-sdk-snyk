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
import { GetFaqDetailsHandler } from '../handler/get-faq-details-handler';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
var FaqServiceImpl = /** @class */ (function () {
    function FaqServiceImpl(sdkConfig, fileService, apiService, cachedItemStore) {
        this.sdkConfig = sdkConfig;
        this.fileService = fileService;
        this.apiService = apiService;
        this.cachedItemStore = cachedItemStore;
    }
    FaqServiceImpl.prototype.getFaqDetails = function (request) {
        return new GetFaqDetailsHandler(this.apiService, this.sdkConfig.faqServiceConfig, this.fileService, this.cachedItemStore).handle(request);
    };
    FaqServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.FILE_SERVICE)),
        __param(2, inject(InjectionTokens.API_SERVICE)),
        __param(3, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], FaqServiceImpl);
    return FaqServiceImpl;
}());
export { FaqServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFxLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mYXEvaW1wbC9mYXEtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3hFLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUd2RDtJQUVJLHdCQUF3RCxTQUFvQixFQUNsQixXQUF3QixFQUN6QixVQUFzQixFQUNoQixlQUFnQztRQUh2QyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3pCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQy9GLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsT0FBc0I7UUFDaEMsT0FBTyxJQUFJLG9CQUFvQixDQUMzQixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQy9CLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxlQUFlLENBQ3ZCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFmUSxjQUFjO1FBRDFCLFVBQVUsRUFBRTtRQUdJLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25DLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOztPQUw3QyxjQUFjLENBaUIxQjtJQUFELHFCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FqQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdldEZhcVJlcXVlc3QgfSBmcm9tICcuLy4uL2RlZi9nZXQtZmFxLXJlcXVlc3QnO1xuaW1wb3J0IHtDYWNoZWRJdGVtU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge0ZhcVNlcnZpY2UsIEZhcX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtHZXRGYXFEZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci9nZXQtZmFxLWRldGFpbHMtaGFuZGxlcic7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBcGlTZXJ2aWNlfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGYXFTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIEZhcVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFQSV9TRVJWSUNFKSBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQ0FDSEVEX0lURU1fU1RPUkUpIHByaXZhdGUgY2FjaGVkSXRlbVN0b3JlOiBDYWNoZWRJdGVtU3RvcmUpIHtcbiAgICB9XG5cbiAgICBnZXRGYXFEZXRhaWxzKHJlcXVlc3Q6IEdldEZhcVJlcXVlc3QpOiBPYnNlcnZhYmxlPEZhcT4ge1xuICAgICAgICByZXR1cm4gbmV3IEdldEZhcURldGFpbHNIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5zZGtDb25maWcuZmFxU2VydmljZUNvbmZpZyxcbiAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmNhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgKS5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxuXG59XG4iXX0=