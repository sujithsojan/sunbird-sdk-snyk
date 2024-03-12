import { HttpRequestType, Request } from '../../../api';
import { map } from 'rxjs/operators';
var ContentSearchApiHandler = /** @class */ (function () {
    function ContentSearchApiHandler(apiService, contentServiceConfig, framework, langCode) {
        this.apiService = apiService;
        this.contentServiceConfig = contentServiceConfig;
        this.framework = framework;
        this.langCode = langCode;
        this.SEARCH_ENDPOINT = '/search';
    }
    ContentSearchApiHandler.prototype.handle = function (request) {
        var additionalPath = this.framework && this.langCode && "?framework=" + this.framework + "&lang=" + this.langCode + "&orgdetails=orgName";
        var apiRequest = new Request.Builder()
            .withHost(this.contentServiceConfig.host)
            .withType(HttpRequestType.POST)
            .withPath(this.contentServiceConfig.searchApiPath.concat(this.SEARCH_ENDPOINT).concat(additionalPath ? additionalPath : ''))
            .withBearerToken(true)
            .withBody({ request: request })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (success) {
            return success.body;
        }));
    };
    return ContentSearchApiHandler;
}());
export { ContentSearchApiHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtYXBpLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9pbXBvcnQvY29udGVudC1zZWFyY2gtYXBpLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQyxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBSXJGLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQztJQUdJLGlDQUFvQixVQUFzQixFQUN0QixvQkFBMEMsRUFDMUMsU0FBa0IsRUFDbEIsUUFBaUI7UUFIakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGNBQVMsR0FBVCxTQUFTLENBQVM7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUxwQixvQkFBZSxHQUFHLFNBQVMsQ0FBQztJQU03QyxDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUFPLE9BQXNCO1FBQ3pCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxnQkFBYyxJQUFJLENBQUMsU0FBUyxjQUFTLElBQUksQ0FBQyxRQUFRLHdCQUFxQixDQUFDO1FBQ2xJLElBQU0sVUFBVSxHQUFZLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTthQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQzthQUN4QyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzthQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDM0gsZUFBZSxDQUFDLElBQUksQ0FBQzthQUNyQixRQUFRLENBQUMsRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDO2FBQ25CLEtBQUssRUFBRSxDQUFDO1FBRWIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBaUIsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUN6RCxHQUFHLENBQUMsVUFBQyxPQUFPO1lBQ1IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtDb250ZW50U2VydmljZUNvbmZpZywgU2VhcmNoUmVzcG9uc2V9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NlYXJjaFJlcXVlc3R9IGZyb20gJy4uLy4uL2RlZi9zZWFyY2gtcmVxdWVzdCc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaEFwaUhhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxTZWFyY2hSZXF1ZXN0LCBTZWFyY2hSZXNwb25zZT4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgU0VBUkNIX0VORFBPSU5UID0gJy9zZWFyY2gnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29udGVudFNlcnZpY2VDb25maWc6IENvbnRlbnRTZXJ2aWNlQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZnJhbWV3b3JrPzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGFuZ0NvZGU/OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdDogU2VhcmNoUmVxdWVzdCk6IE9ic2VydmFibGU8U2VhcmNoUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFBhdGggPSB0aGlzLmZyYW1ld29yayAmJiB0aGlzLmxhbmdDb2RlICYmIGA/ZnJhbWV3b3JrPSR7dGhpcy5mcmFtZXdvcmt9Jmxhbmc9JHt0aGlzLmxhbmdDb2RlfSZvcmdkZXRhaWxzPW9yZ05hbWVgO1xuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aEhvc3QodGhpcy5jb250ZW50U2VydmljZUNvbmZpZy5ob3N0KVxuICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QT1NUKVxuICAgICAgICAgICAgLndpdGhQYXRoKHRoaXMuY29udGVudFNlcnZpY2VDb25maWcuc2VhcmNoQXBpUGF0aC5jb25jYXQodGhpcy5TRUFSQ0hfRU5EUE9JTlQpLmNvbmNhdChhZGRpdGlvbmFsUGF0aCA/IGFkZGl0aW9uYWxQYXRoIDogJycpKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhCb2R5KHtyZXF1ZXN0fSlcbiAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZmV0Y2g8U2VhcmNoUmVzcG9uc2U+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2Vzcy5ib2R5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiJdfQ==