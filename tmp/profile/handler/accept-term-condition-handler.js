import { HttpRequestType, Request } from '../../api';
import { map } from 'rxjs/operators';
var AcceptTermConditionHandler = /** @class */ (function () {
    function AcceptTermConditionHandler(apiService, acceptTermsConditionApiConfig) {
        this.apiService = apiService;
        this.acceptTermsConditionApiConfig = acceptTermsConditionApiConfig;
        this.GET_ACCEPT_TERM_CONDITIONS_ENDPOINT = '/tnc/accept';
    }
    AcceptTermConditionHandler.prototype.handle = function (request) {
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(this.acceptTermsConditionApiConfig.profileApiPath + this.GET_ACCEPT_TERM_CONDITIONS_ENDPOINT)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody({ request: request })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (success) {
            return success.body.result.response === 'SUCCESS';
        }));
    };
    return AcceptTermConditionHandler;
}());
export { AcceptTermConditionHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0LXRlcm0tY29uZGl0aW9uLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL2FjY2VwdC10ZXJtLWNvbmRpdGlvbi1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0MsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUdsRixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkM7SUFHSSxvQ0FBb0IsVUFBc0IsRUFDdEIsNkJBQW1EO1FBRG5ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUFzQjtRQUh0RCx3Q0FBbUMsR0FBRyxhQUFhLENBQUM7SUFJckUsQ0FBQztJQUVELDJDQUFNLEdBQU4sVUFBTyxPQUFvQztRQUN2QyxJQUFNLFVBQVUsR0FBWSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7YUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDO2FBQ3RHLGVBQWUsQ0FBQyxJQUFJLENBQUM7YUFDckIsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNuQixRQUFRLENBQUMsRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDO2FBQ25CLEtBQUssRUFBRSxDQUFDO1FBRWIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBbUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUMzRSxHQUFHLENBQUMsVUFBQyxPQUFPO1lBQ1IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtBY2NlcHRUZXJtc0NvbmRpdGlvblJlcXVlc3QsIFByb2ZpbGVTZXJ2aWNlQ29uZmlnfSBmcm9tICcuLic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEFjY2VwdFRlcm1Db25kaXRpb25IYW5kbGVyIGltcGxlbWVudHMgQXBpUmVxdWVzdEhhbmRsZXI8QWNjZXB0VGVybXNDb25kaXRpb25SZXF1ZXN0LCBib29sZWFuPiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBHRVRfQUNDRVBUX1RFUk1fQ09ORElUSU9OU19FTkRQT0lOVCA9ICcvdG5jL2FjY2VwdCc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY2NlcHRUZXJtc0NvbmRpdGlvbkFwaUNvbmZpZzogUHJvZmlsZVNlcnZpY2VDb25maWcpIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdDogQWNjZXB0VGVybXNDb25kaXRpb25SZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGFwaVJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuUE9TVClcbiAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLmFjY2VwdFRlcm1zQ29uZGl0aW9uQXBpQ29uZmlnLnByb2ZpbGVBcGlQYXRoICsgdGhpcy5HRVRfQUNDRVBUX1RFUk1fQ09ORElUSU9OU19FTkRQT0lOVClcbiAgICAgICAgICAgIC53aXRoQmVhcmVyVG9rZW4odHJ1ZSlcbiAgICAgICAgICAgIC53aXRoVXNlclRva2VuKHRydWUpXG4gICAgICAgICAgICAud2l0aEJvZHkoe3JlcXVlc3R9KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaDx7IHJlc3VsdDogeyByZXNwb25zZTogc3RyaW5nIH0gfT4oYXBpUmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzLmJvZHkucmVzdWx0LnJlc3BvbnNlID09PSAnU1VDQ0VTUyc7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cblxuIl19