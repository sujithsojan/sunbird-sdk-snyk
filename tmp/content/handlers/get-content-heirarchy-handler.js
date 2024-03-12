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
import { map } from 'rxjs/operators';
import { HttpRequestType, Request } from '../../api';
var GetContentHeirarchyHandler = /** @class */ (function () {
    function GetContentHeirarchyHandler(apiService, contentServiceConfig) {
        this.apiService = apiService;
        this.contentServiceConfig = contentServiceConfig;
        this.GET_CONTENT_HEIRARCHY_ENDPOINT = '/hierarchy';
    }
    GetContentHeirarchyHandler.prototype.handle = function (request) {
        var _this = this;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.GET)
            .withPath(this.contentServiceConfig.contentHeirarchyAPIPath + this.GET_CONTENT_HEIRARCHY_ENDPOINT + '/' + request.contentId)
            .withBearerToken(true)
            .build();
        return this.apiService.fetch(apiRequest)
            .pipe(map(function (response) {
            return _this.mapContentFromContentHeirarchyData(response.body.result.content);
        }));
    };
    GetContentHeirarchyHandler.prototype.mapContentFromContentHeirarchyData = function (serverContentData) {
        var _this = this;
        serverContentData['contentData'] = __assign({}, serverContentData);
        if (serverContentData['children'] && serverContentData['children'].length) {
            serverContentData['children'] = serverContentData['children'].map(function (childContent) {
                return _this.mapContentFromContentHeirarchyData(__assign({}, childContent));
            });
        }
        return serverContentData;
    };
    return GetContentHeirarchyHandler;
}());
export { GetContentHeirarchyHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRlbnQtaGVpcmFyY2h5LWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9nZXQtY29udGVudC1oZWlyYXJjaHktaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQWdDLGVBQWUsRUFBRSxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHbEY7SUFHSSxvQ0FBb0IsVUFBc0IsRUFBVSxvQkFBMEM7UUFBMUUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFGN0UsbUNBQThCLEdBQUcsWUFBWSxDQUFDO0lBRy9ELENBQUM7SUFFRCwyQ0FBTSxHQUFOLFVBQU8sT0FBNkI7UUFBcEMsaUJBWUM7UUFYRyxJQUFNLFVBQVUsR0FBWSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7YUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDM0gsZUFBZSxDQUFDLElBQUksQ0FBQzthQUNyQixLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQXVDLFVBQVUsQ0FBQzthQUN6RSxJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUMsUUFBUTtZQUNULE9BQU8sS0FBSSxDQUFDLGtDQUFrQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBRU8sdUVBQWtDLEdBQTFDLFVBQTJDLGlCQUFpQjtRQUE1RCxpQkFRQztRQVBHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxnQkFBTyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3ZFLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFlBQVk7Z0JBQzNFLE9BQU8sS0FBSSxDQUFDLGtDQUFrQyxjQUFLLFlBQVksRUFBRSxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFDTCxpQ0FBQztBQUFELENBQUMsQUE3QkQsSUE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtDb250ZW50LCBDb250ZW50RGF0YSwgQ29udGVudERldGFpbFJlcXVlc3QsIENvbnRlbnRTZXJ2aWNlQ29uZmlnfSBmcm9tICcuLic7XG5cbmV4cG9ydCBjbGFzcyBHZXRDb250ZW50SGVpcmFyY2h5SGFuZGxlciBpbXBsZW1lbnRzIEFwaVJlcXVlc3RIYW5kbGVyPENvbnRlbnREZXRhaWxSZXF1ZXN0LCBDb250ZW50PiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBHRVRfQ09OVEVOVF9IRUlSQVJDSFlfRU5EUE9JTlQgPSAnL2hpZXJhcmNoeSc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsIHByaXZhdGUgY29udGVudFNlcnZpY2VDb25maWc6IENvbnRlbnRTZXJ2aWNlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcXVlc3Q6IENvbnRlbnREZXRhaWxSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IGFwaVJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuR0VUKVxuICAgICAgICAgICAgLndpdGhQYXRoKHRoaXMuY29udGVudFNlcnZpY2VDb25maWcuY29udGVudEhlaXJhcmNoeUFQSVBhdGggKyB0aGlzLkdFVF9DT05URU5UX0hFSVJBUkNIWV9FTkRQT0lOVCArICcvJyArIHJlcXVlc3QuY29udGVudElkKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZmV0Y2g8eyByZXN1bHQ6IHsgY29udGVudDogQ29udGVudERhdGEgfSB9PihhcGlSZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBDb250ZW50RnJvbUNvbnRlbnRIZWlyYXJjaHlEYXRhKHJlc3BvbnNlLmJvZHkucmVzdWx0LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFwQ29udGVudEZyb21Db250ZW50SGVpcmFyY2h5RGF0YShzZXJ2ZXJDb250ZW50RGF0YSkge1xuICAgICAgICBzZXJ2ZXJDb250ZW50RGF0YVsnY29udGVudERhdGEnXSA9IHsuLi5zZXJ2ZXJDb250ZW50RGF0YX07XG4gICAgICAgIGlmIChzZXJ2ZXJDb250ZW50RGF0YVsnY2hpbGRyZW4nXSAmJiBzZXJ2ZXJDb250ZW50RGF0YVsnY2hpbGRyZW4nXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlcnZlckNvbnRlbnREYXRhWydjaGlsZHJlbiddID0gc2VydmVyQ29udGVudERhdGFbJ2NoaWxkcmVuJ10ubWFwKChjaGlsZENvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBDb250ZW50RnJvbUNvbnRlbnRIZWlyYXJjaHlEYXRhKHsuLi5jaGlsZENvbnRlbnR9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXJ2ZXJDb250ZW50RGF0YTtcbiAgICB9XG59XG5cbiJdfQ==