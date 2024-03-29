import { HttpRequestType, Request } from '../../api';
import { map } from 'rxjs/operators';
var DeleteAccountHandler = /** @class */ (function () {
    function DeleteAccountHandler(apiService, profileServiceConfig) {
        this.apiService = apiService;
        this.profileServiceConfig = profileServiceConfig;
        this.DELETE_ENDPOINT = '/delete';
    }
    DeleteAccountHandler.prototype.handle = function (request) {
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(this.profileServiceConfig.profileApiPath + this.DELETE_ENDPOINT)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody({ request: request })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (success) {
            return success.body.result.response === 'SUCCESS';
        }));
    };
    return DeleteAccountHandler;
}());
export { DeleteAccountHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFjY291bnQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm9maWxlL2hhbmRsZXIvZGVsZXRlLWFjY291bnQtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdDLGVBQWUsRUFBRSxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHbEYsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR25DO0lBR0ksOEJBQW9CLFVBQXNCLEVBQ3RCLG9CQUEwQztRQUQxQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFIN0Msb0JBQWUsR0FBRyxTQUFTLENBQUM7SUFJN0MsQ0FBQztJQUVELHFDQUFNLEdBQU4sVUFBTyxPQUEwQjtRQUM3QixJQUFNLFVBQVUsR0FBWSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7YUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUN6RSxlQUFlLENBQUMsSUFBSSxDQUFDO2FBQ3JCLGFBQWEsQ0FBQyxJQUFJLENBQUM7YUFDbkIsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzlCLEtBQUssRUFBRSxDQUFDO1FBRWIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBbUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUMzRSxHQUFHLENBQUMsVUFBQyxPQUFPO1lBQ1IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUwsMkJBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZUNvbmZpZ30gZnJvbSAnLi4nO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWxldGVVc2VyUmVxdWVzdCB9IGZyb20gJy4uL2RlZi9kZWxldGUtdXNlci1yZXF1ZXN0JztcblxuZXhwb3J0IGNsYXNzIERlbGV0ZUFjY291bnRIYW5kbGVyIGltcGxlbWVudHMgQXBpUmVxdWVzdEhhbmRsZXI8RGVsZXRlVXNlclJlcXVlc3QsIGJvb2xlYW4+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IERFTEVURV9FTkRQT0lOVCA9ICcvZGVsZXRlJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlQ29uZmlnOiBQcm9maWxlU2VydmljZUNvbmZpZykge1xuICAgIH1cblxuICAgIGhhbmRsZShyZXF1ZXN0OiBEZWxldGVVc2VyUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAgICAgICAud2l0aFBhdGgodGhpcy5wcm9maWxlU2VydmljZUNvbmZpZy5wcm9maWxlQXBpUGF0aCArIHRoaXMuREVMRVRFX0VORFBPSU5UKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhVc2VyVG9rZW4odHJ1ZSlcbiAgICAgICAgICAgIC53aXRoQm9keSh7IHJlcXVlc3Q6IHJlcXVlc3QgfSlcbiAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZmV0Y2g8eyByZXN1bHQ6IHsgcmVzcG9uc2U6IHN0cmluZyB9IH0+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2Vzcy5ib2R5LnJlc3VsdC5yZXNwb25zZSA9PT0gJ1NVQ0NFU1MnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn0iXX0=