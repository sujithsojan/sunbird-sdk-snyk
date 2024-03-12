import { HttpRequestType, Request } from '../../api';
import { map } from 'rxjs/operators';
var VerifyOtpHandler = /** @class */ (function () {
    function VerifyOtpHandler(apiService, optServiceConfig) {
        this.apiService = apiService;
        this.optServiceConfig = optServiceConfig;
        this.GET_VERIFY_OTP_ENDPOINT = '/verify';
    }
    VerifyOtpHandler.prototype.handle = function (request) {
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(this.optServiceConfig.otpApiPath + this.GET_VERIFY_OTP_ENDPOINT)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody({
            request: request
        })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (success) {
            return success.body.result.response === 'SUCCESS';
        }));
    };
    return VerifyOtpHandler;
}());
export { VerifyOtpHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LW90cC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb2ZpbGUvaGFuZGxlci92ZXJpZnktb3RwLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQyxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBR2xGLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQztJQUdJLDBCQUFvQixVQUFzQixFQUN0QixnQkFBc0M7UUFEdEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXNCO1FBSHpDLDRCQUF1QixHQUFHLFNBQVMsQ0FBQztJQUlyRCxDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLE9BQXlCO1FBQzVCLElBQU0sVUFBVSxHQUFZLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTthQUM1QyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzthQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7YUFDekUsZUFBZSxDQUFDLElBQUksQ0FBQzthQUNyQixhQUFhLENBQUMsSUFBSSxDQUFDO2FBQ25CLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUViLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQW1DLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDM0UsR0FBRyxDQUFDLFVBQUMsT0FBTztZQUNSLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXIsIEFwaVNlcnZpY2UsIEh0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdH0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7UHJvZmlsZVNlcnZpY2VDb25maWcsIFZlcmlmeU90cFJlcXVlc3R9IGZyb20gJy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgVmVyaWZ5T3RwSGFuZGxlciBpbXBsZW1lbnRzIEFwaVJlcXVlc3RIYW5kbGVyPFZlcmlmeU90cFJlcXVlc3QsIGJvb2xlYW4+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IEdFVF9WRVJJRllfT1RQX0VORFBPSU5UID0gJy92ZXJpZnknO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3B0U2VydmljZUNvbmZpZzogUHJvZmlsZVNlcnZpY2VDb25maWcpIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdDogVmVyaWZ5T3RwUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAgICAgICAud2l0aFBhdGgodGhpcy5vcHRTZXJ2aWNlQ29uZmlnLm90cEFwaVBhdGggKyB0aGlzLkdFVF9WRVJJRllfT1RQX0VORFBPSU5UKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhVc2VyVG9rZW4odHJ1ZSlcbiAgICAgICAgICAgIC53aXRoQm9keSh7XG4gICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZmV0Y2g8eyByZXN1bHQ6IHsgcmVzcG9uc2U6IHN0cmluZyB9IH0+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2Vzcy5ib2R5LnJlc3VsdC5yZXNwb25zZSA9PT0gJ1NVQ0NFU1MnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiJdfQ==