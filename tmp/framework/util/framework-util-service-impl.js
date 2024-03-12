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
import { defer, iif, of } from 'rxjs';
import { FrameworkMapper } from './framework-mapper';
import { GetFrameworkCategoryTermsHandler } from '../handler/get-framework-category-terms-handler';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { map, mergeMap } from 'rxjs/operators';
import { CachedItemRequestSourceFrom } from '../../key-value-store';
var FrameworkUtilServiceImpl = /** @class */ (function () {
    function FrameworkUtilServiceImpl(sharedPreferences, frameworkService, profileService) {
        this.sharedPreferences = sharedPreferences;
        this.frameworkService = frameworkService;
        this.profileService = profileService;
    }
    FrameworkUtilServiceImpl.prototype.getActiveChannel = function (getActiveChannelRequest) {
        var _this = this;
        if (getActiveChannelRequest === void 0) { getActiveChannelRequest = { from: CachedItemRequestSourceFrom.CACHE }; }
        return this.frameworkService.getActiveChannelId().pipe(mergeMap(function (channelId) {
            return _this.frameworkService.getChannelDetails({
                from: getActiveChannelRequest.from,
                channelId: channelId
            });
        }));
    };
    FrameworkUtilServiceImpl.prototype.getActiveChannelSuggestedFrameworkList = function (getSuggestedFrameworksRequest) {
        var _this = this;
        return this.profileService.getActiveSessionProfile({ requiredFields: [] }).pipe(mergeMap(function (profile) {
            return iif(function () { return !!profile.serverProfile && !getSuggestedFrameworksRequest.ignoreActiveChannel; }, defer(function () { return _this.getActiveChannel({ from: getSuggestedFrameworksRequest.from }); }), defer(function () { return _this.frameworkService.getDefaultChannelDetails({ from: getSuggestedFrameworksRequest.from }); }));
        }), mergeMap(function (channel) {
            if (channel.frameworks) {
                return of(channel.frameworks).pipe(map(function (frameworks) {
                    return frameworks
                        .map(function (f) { return FrameworkMapper.prepareFrameworkCategoryAssociations(f); })
                        .map(function (f) { return FrameworkMapper.prepareFrameworkTranslations(f, getSuggestedFrameworksRequest.language); });
                }));
            }
            return _this.frameworkService.getFrameworkDetails({
                from: getSuggestedFrameworksRequest.from,
                frameworkId: channel.defaultFramework,
                requiredCategories: getSuggestedFrameworksRequest.requiredCategories
            }).pipe(map(function (framework) {
                framework.index = 0;
                return [framework];
            }));
        }));
    };
    FrameworkUtilServiceImpl.prototype.getFrameworkCategoryTerms = function (request) {
        return new GetFrameworkCategoryTermsHandler(this, this.frameworkService, this.sharedPreferences).handle(request);
    };
    FrameworkUtilServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(1, inject(InjectionTokens.FRAMEWORK_SERVICE)),
        __param(2, inject(InjectionTokens.PROFILE_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], FrameworkUtilServiceImpl);
    return FrameworkUtilServiceImpl;
}());
export { FrameworkUtilServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLXV0aWwtc2VydmljZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZyYW1ld29yay91dGlsL2ZyYW1ld29yay11dGlsLXNlcnZpY2UtaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFaEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR2xFO0lBQ0ksa0NBQWdFLGlCQUFvQyxFQUNyQyxnQkFBa0MsRUFDcEMsY0FBOEI7UUFGM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUMzRixDQUFDO0lBRU0sbURBQWdCLEdBQXZCLFVBQXdCLHVCQUE4RjtRQUF0SCxpQkFTQztRQVR1Qix3Q0FBQSxFQUFBLDRCQUFxRCxJQUFJLEVBQUUsMkJBQTJCLENBQUMsS0FBSyxFQUFFO1FBQ2xILE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNsRCxRQUFRLENBQUMsVUFBQyxTQUFpQjtZQUN2QixPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDcEMsSUFBSSxFQUFFLHVCQUF1QixDQUFDLElBQUk7Z0JBQ2xDLFNBQVMsV0FBQTthQUNaLENBQUM7UUFIRixDQUdFLENBQ0wsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLHlFQUFzQyxHQUE3QyxVQUE4Qyw2QkFBNEQ7UUFBMUcsaUJBa0NDO1FBakNHLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsUUFBUSxDQUFDLFVBQUMsT0FBZ0I7WUFDdEIsT0FBQSxHQUFHLENBQ0MsY0FBTSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLENBQUMsNkJBQTZCLENBQUMsbUJBQW1CLEVBQTdFLENBQTZFLEVBQ25GLEtBQUssQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLDZCQUE2QixDQUFDLElBQUksRUFBRSxDQUFDLEVBQW5FLENBQW1FLENBQUMsRUFDaEYsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBNUYsQ0FBNEYsQ0FBQyxDQUM1RztRQUpELENBSUMsQ0FDSixFQUNELFFBQVEsQ0FBQyxVQUFDLE9BQWdCO1lBQ3RCLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDOUIsR0FBRyxDQUFDLFVBQUMsVUFBVTtvQkFDWCxPQUFBLFVBQVU7eUJBQ0wsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsZUFBZSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxFQUF2RCxDQUF1RCxDQUFDO3lCQUNuRSxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxlQUFlLENBQUMsNEJBQTRCLENBQ3BELENBQUMsRUFBRSw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsRUFEbEMsQ0FDa0MsQ0FDN0M7Z0JBSkwsQ0FJSyxDQUNSLENBQ0osQ0FBQzthQUNMO1lBRUQsT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7Z0JBQzdDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxJQUFJO2dCQUN4QyxXQUFXLEVBQUUsT0FBTyxDQUFDLGdCQUFnQjtnQkFDckMsa0JBQWtCLEVBQUUsNkJBQTZCLENBQUMsa0JBQWtCO2FBQ3ZFLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsU0FBb0I7Z0JBQ3JCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRU0sNERBQXlCLEdBQWhDLFVBQWlDLE9BQXlDO1FBQ3RFLE9BQU8sSUFBSSxnQ0FBZ0MsQ0FDdkMsSUFBSSxFQUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUN6QixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBM0RRLHdCQUF3QjtRQURwQyxVQUFVLEVBQUU7UUFFSSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUN6QyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUE7O09BSDNDLHdCQUF3QixDQTREcEM7SUFBRCwrQkFBQztDQUFBLEFBNURELElBNERDO1NBNURZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrVXRpbFNlcnZpY2V9IGZyb20gJy4vZnJhbWV3b3JrLXV0aWwtc2VydmljZSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge0NhdGVnb3J5VGVybSwgQ2hhbm5lbCwgRnJhbWV3b3JrLCBGcmFtZXdvcmtTZXJ2aWNlLCBHZXRBY3RpdmVDaGFubmVsUmVxdWVzdCwgR2V0RnJhbWV3b3JrQ2F0ZWdvcnlUZXJtc1JlcXVlc3R9IGZyb20gJy4uJztcbmltcG9ydCB7ZGVmZXIsIGlpZiwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtHZXRTdWdnZXN0ZWRGcmFtZXdvcmtzUmVxdWVzdH0gZnJvbSAnLi9yZXF1ZXN0cyc7XG5pbXBvcnQge0ZyYW1ld29ya01hcHBlcn0gZnJvbSAnLi9mcmFtZXdvcmstbWFwcGVyJztcbmltcG9ydCB7UHJvZmlsZSwgUHJvZmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtHZXRGcmFtZXdvcmtDYXRlZ29yeVRlcm1zSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci9nZXQtZnJhbWV3b3JrLWNhdGVnb3J5LXRlcm1zLWhhbmRsZXInO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge21hcCwgbWVyZ2VNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Q2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tfSBmcm9tICcuLi8uLi9rZXktdmFsdWUtc3RvcmUnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJhbWV3b3JrVXRpbFNlcnZpY2VJbXBsIGltcGxlbWVudHMgRnJhbWV3b3JrVXRpbFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuRlJBTUVXT1JLX1NFUlZJQ0UpIHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5QUk9GSUxFX1NFUlZJQ0UpIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFjdGl2ZUNoYW5uZWwoZ2V0QWN0aXZlQ2hhbm5lbFJlcXVlc3Q6IEdldEFjdGl2ZUNoYW5uZWxSZXF1ZXN0ID0geyBmcm9tOiBDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20uQ0FDSEUgfSk6IE9ic2VydmFibGU8Q2hhbm5lbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldEFjdGl2ZUNoYW5uZWxJZCgpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoY2hhbm5lbElkOiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldENoYW5uZWxEZXRhaWxzKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZ2V0QWN0aXZlQ2hhbm5lbFJlcXVlc3QuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbElkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWN0aXZlQ2hhbm5lbFN1Z2dlc3RlZEZyYW1ld29ya0xpc3QoZ2V0U3VnZ2VzdGVkRnJhbWV3b3Jrc1JlcXVlc3Q6IEdldFN1Z2dlc3RlZEZyYW1ld29ya3NSZXF1ZXN0KTogT2JzZXJ2YWJsZTxGcmFtZXdvcmtbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVTZXNzaW9uUHJvZmlsZSh7cmVxdWlyZWRGaWVsZHM6IFtdfSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChwcm9maWxlOiBQcm9maWxlKSA9PlxuICAgICAgICAgICAgICAgIGlpZihcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gISFwcm9maWxlLnNlcnZlclByb2ZpbGUgJiYgIWdldFN1Z2dlc3RlZEZyYW1ld29ya3NSZXF1ZXN0Lmlnbm9yZUFjdGl2ZUNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2V0QWN0aXZlQ2hhbm5lbCh7IGZyb206IGdldFN1Z2dlc3RlZEZyYW1ld29ya3NSZXF1ZXN0LmZyb20gfSkpLFxuICAgICAgICAgICAgICAgICAgICBkZWZlcigoKSA9PiB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0RGVmYXVsdENoYW5uZWxEZXRhaWxzKHsgZnJvbTogZ2V0U3VnZ2VzdGVkRnJhbWV3b3Jrc1JlcXVlc3QuZnJvbSB9KSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNoYW5uZWw6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbC5mcmFtZXdvcmtzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihjaGFubmVsLmZyYW1ld29ya3MpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoKGZyYW1ld29ya3MpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3Jrc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChmKSA9PiBGcmFtZXdvcmtNYXBwZXIucHJlcGFyZUZyYW1ld29ya0NhdGVnb3J5QXNzb2NpYXRpb25zKGYpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChmKSA9PiBGcmFtZXdvcmtNYXBwZXIucHJlcGFyZUZyYW1ld29ya1RyYW5zbGF0aW9ucyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYsIGdldFN1Z2dlc3RlZEZyYW1ld29ya3NSZXF1ZXN0Lmxhbmd1YWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRGcmFtZXdvcmtEZXRhaWxzKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZ2V0U3VnZ2VzdGVkRnJhbWV3b3Jrc1JlcXVlc3QuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3JrSWQ6IGNoYW5uZWwuZGVmYXVsdEZyYW1ld29yayxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRDYXRlZ29yaWVzOiBnZXRTdWdnZXN0ZWRGcmFtZXdvcmtzUmVxdWVzdC5yZXF1aXJlZENhdGVnb3JpZXNcbiAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoKGZyYW1ld29yazogRnJhbWV3b3JrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXdvcmsuaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtmcmFtZXdvcmtdO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGcmFtZXdvcmtDYXRlZ29yeVRlcm1zKHJlcXVlc3Q6IEdldEZyYW1ld29ya0NhdGVnb3J5VGVybXNSZXF1ZXN0KTogT2JzZXJ2YWJsZTxDYXRlZ29yeVRlcm1bXT4ge1xuICAgICAgICByZXR1cm4gbmV3IEdldEZyYW1ld29ya0NhdGVnb3J5VGVybXNIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXNcbiAgICAgICAgKS5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxufVxuIl19