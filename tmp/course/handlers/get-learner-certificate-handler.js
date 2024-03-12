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
import { HttpRequestType, Request } from '../../api';
import { map } from 'rxjs/operators';
var GetLearnerCertificateHandler = /** @class */ (function () {
    function GetLearnerCertificateHandler(apiService, cachedItemStore) {
        this.apiService = apiService;
        this.cachedItemStore = cachedItemStore;
    }
    GetLearnerCertificateHandler.prototype.handle = function (request) {
        var _this = this;
        return this.cachedItemStore.get(request.userId, GetLearnerCertificateHandler.GET_LEARNER_CERTIFICATE_LOCAL_KEY, 'ttl_' + GetLearnerCertificateHandler.GET_LEARNER_CERTIFICATE_LOCAL_KEY, function () { return _this.fetchFromServer(request); });
    };
    GetLearnerCertificateHandler.prototype.fetchFromServer = function (request) {
        var leanrnerRequest = __assign(__assign({}, (request.size ? { size: request.size } : null)), { _source: [
                'data.badge.issuer.name',
                'pdfUrl',
                'data.issuedOn',
                'data.badge.name',
                'related.courseId',
                'related.Id'
            ], query: {
                bool: {
                    must: [
                        {
                            match_phrase: {
                                'recipient.id': request.userId
                            }
                        }
                    ]
                }
            } });
        var searchCertificateRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(GetLearnerCertificateHandler.CERTIFICATE_SEARCH_ENDPOINT)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody({
            request: leanrnerRequest
        })
            .build();
        return this.apiService.fetch(searchCertificateRequest)
            .pipe(map(function (response) {
            return response.body.result.response;
        }));
    };
    GetLearnerCertificateHandler.CERTIFICATE_SEARCH_ENDPOINT = '/api/certreg/v1/certs/search';
    GetLearnerCertificateHandler.GET_LEARNER_CERTIFICATE_LOCAL_KEY = 'learner-certificate';
    return GetLearnerCertificateHandler;
}());
export { GetLearnerCertificateHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWxlYXJuZXItY2VydGlmaWNhdGUtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3Vyc2UvaGFuZGxlcnMvZ2V0LWxlYXJuZXItY2VydGlmaWNhdGUtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBaUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUdwRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckM7SUFHRSxzQ0FBb0IsVUFBc0IsRUFBVSxlQUFnQztRQUFoRSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3BGLENBQUM7SUFFRCw2Q0FBTSxHQUFOLFVBQU8sT0FBb0M7UUFBM0MsaUJBT0M7UUFOQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUM3QixPQUFPLENBQUMsTUFBTSxFQUNkLDRCQUE0QixDQUFDLGlDQUFpQyxFQUM5RCxNQUFNLEdBQUcsNEJBQTRCLENBQUMsaUNBQWlDLEVBQ3ZFLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUE3QixDQUE2QixDQUNwQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHNEQUFlLEdBQXZCLFVBQXdCLE9BQW9DO1FBQzFELElBQUksZUFBZSx5QkFDZCxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQ2pELE9BQU8sRUFBRTtnQkFDUCx3QkFBd0I7Z0JBQ3hCLFFBQVE7Z0JBQ1IsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLGtCQUFrQjtnQkFDbEIsWUFBWTthQUNiLEVBQ0QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUU7d0JBQ0o7NEJBQ0UsWUFBWSxFQUFFO2dDQUNaLGNBQWMsRUFBRSxPQUFPLENBQUMsTUFBTTs2QkFDL0I7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRixHQUNGLENBQUM7UUFDRixJQUFNLHdCQUF3QixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTthQUNuRCxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzthQUM5QixRQUFRLENBQUMsNEJBQTRCLENBQUMsMkJBQTJCLENBQUM7YUFDbEUsZUFBZSxDQUFDLElBQUksQ0FBQzthQUNyQixhQUFhLENBQUMsSUFBSSxDQUFDO2FBQ25CLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQTZFLHdCQUF3QixDQUFDO2FBQy9ILElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQyxRQUFRO1lBQ1gsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFwRHVCLHdEQUEyQixHQUFHLDhCQUE4QixDQUFDO0lBQzdELDhEQUFpQyxHQUFHLHFCQUFxQixDQUFDO0lBb0RwRixtQ0FBQztDQUFBLEFBdERELElBc0RDO1NBdERZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwaVJlcXVlc3RIYW5kbGVyLCBBcGlTZXJ2aWNlLCBIdHRwUmVxdWVzdFR5cGUsIFJlcXVlc3QgfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHsgR2V0TGVhcm5lckNlcmlmaWNhdGVSZXF1ZXN0IH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGVhcm5lckNlcnRpZmljYXRlIH0gZnJvbSAnLi4vZGVmL2dldC1sZWFybmVyLWNlcnRpZmljYXRlLXJlc3BvbnNlJztcbmltcG9ydCB7IENhY2hlZEl0ZW1TdG9yZSB9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5leHBvcnQgY2xhc3MgR2V0TGVhcm5lckNlcnRpZmljYXRlSGFuZGxlciBpbXBsZW1lbnRzIEFwaVJlcXVlc3RIYW5kbGVyPEdldExlYXJuZXJDZXJpZmljYXRlUmVxdWVzdCwge2NvdW50OiBudW1iZXIsIGNvbnRlbnQ6IExlYXJuZXJDZXJ0aWZpY2F0ZVtdfT4ge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDRVJUSUZJQ0FURV9TRUFSQ0hfRU5EUE9JTlQgPSAnL2FwaS9jZXJ0cmVnL3YxL2NlcnRzL3NlYXJjaCc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEdFVF9MRUFSTkVSX0NFUlRJRklDQVRFX0xPQ0FMX0tFWSA9ICdsZWFybmVyLWNlcnRpZmljYXRlJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLCBwcml2YXRlIGNhY2hlZEl0ZW1TdG9yZTogQ2FjaGVkSXRlbVN0b3JlKSB7XG4gIH1cblxuICBoYW5kbGUocmVxdWVzdDogR2V0TGVhcm5lckNlcmlmaWNhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTx7Y291bnQ6IG51bWJlciwgY29udGVudDogTGVhcm5lckNlcnRpZmljYXRlW119PiB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkSXRlbVN0b3JlLmdldChcbiAgICAgIHJlcXVlc3QudXNlcklkLFxuICAgICAgR2V0TGVhcm5lckNlcnRpZmljYXRlSGFuZGxlci5HRVRfTEVBUk5FUl9DRVJUSUZJQ0FURV9MT0NBTF9LRVksXG4gICAgICAndHRsXycgKyBHZXRMZWFybmVyQ2VydGlmaWNhdGVIYW5kbGVyLkdFVF9MRUFSTkVSX0NFUlRJRklDQVRFX0xPQ0FMX0tFWSxcbiAgICAgICgpID0+IHRoaXMuZmV0Y2hGcm9tU2VydmVyKHJlcXVlc3QpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGZldGNoRnJvbVNlcnZlcihyZXF1ZXN0OiBHZXRMZWFybmVyQ2VyaWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPHtjb3VudDogbnVtYmVyLCBjb250ZW50OiBMZWFybmVyQ2VydGlmaWNhdGVbXX0+IHtcbiAgICBsZXQgbGVhbnJuZXJSZXF1ZXN0ID0ge1xuICAgICAgLi4uKHJlcXVlc3Quc2l6ZSA/IHsgc2l6ZTogcmVxdWVzdC5zaXplIH0gOiBudWxsKSxcbiAgICAgIF9zb3VyY2U6IFtcbiAgICAgICAgJ2RhdGEuYmFkZ2UuaXNzdWVyLm5hbWUnLFxuICAgICAgICAncGRmVXJsJyxcbiAgICAgICAgJ2RhdGEuaXNzdWVkT24nLFxuICAgICAgICAnZGF0YS5iYWRnZS5uYW1lJyxcbiAgICAgICAgJ3JlbGF0ZWQuY291cnNlSWQnLFxuICAgICAgICAncmVsYXRlZC5JZCdcbiAgICAgIF0sXG4gICAgICBxdWVyeToge1xuICAgICAgICBib29sOiB7XG4gICAgICAgICAgbXVzdDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtYXRjaF9waHJhc2U6IHtcbiAgICAgICAgICAgICAgICAncmVjaXBpZW50LmlkJzogcmVxdWVzdC51c2VySWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgc2VhcmNoQ2VydGlmaWNhdGVSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAud2l0aFBhdGgoR2V0TGVhcm5lckNlcnRpZmljYXRlSGFuZGxlci5DRVJUSUZJQ0FURV9TRUFSQ0hfRU5EUE9JTlQpXG4gICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAud2l0aFVzZXJUb2tlbih0cnVlKVxuICAgICAgLndpdGhCb2R5KHtcbiAgICAgICAgcmVxdWVzdDogbGVhbnJuZXJSZXF1ZXN0XG4gICAgICB9KVxuICAgICAgLmJ1aWxkKCk7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaDx7IHJlc3VsdDogeyByZXNwb25zZTogeyBjb3VudDogbnVtYmVyLCBjb250ZW50OiBMZWFybmVyQ2VydGlmaWNhdGVbXSB9IH0gfT4oc2VhcmNoQ2VydGlmaWNhdGVSZXF1ZXN0KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5yZXN1bHQucmVzcG9uc2U7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG59XG4iXX0=