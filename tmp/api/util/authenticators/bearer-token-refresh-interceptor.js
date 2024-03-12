var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ApiTokenHandler } from '../../handlers/api-token-handler';
import { of } from 'rxjs';
import { ApiKeys } from '../../../preference-keys';
import { mergeMap, tap } from 'rxjs/operators';
import { CsHttpResponseCode } from '@project-sunbird/client-services/core/http-service';
var BearerTokenRefreshInterceptor = /** @class */ (function () {
    function BearerTokenRefreshInterceptor(sharedPreferences, apiConfig, deviceInfo, apiService) {
        this.sharedPreferences = sharedPreferences;
        this.apiConfig = apiConfig;
        this.deviceInfo = deviceInfo;
        this.apiService = apiService;
        this.apiTokenHandler = new ApiTokenHandler(this.apiConfig, this.apiService, this.deviceInfo);
    }
    BearerTokenRefreshInterceptor.prototype.interceptResponse = function (request, response) {
        var _this = this;
        if ((response.responseCode === CsHttpResponseCode.HTTP_UNAUTHORISED && response.body.message === 'Unauthorized')
            || response.responseCode === CsHttpResponseCode.HTTP_FORBIDDEN) {
            return this.apiTokenHandler.refreshAuthToken()
                .pipe(tap(function (bearerToken) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sharedPreferences.putString(ApiKeys.KEY_API_TOKEN, bearerToken).toPromise()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }), mergeMap(function () { return _this.apiService.fetch(request); }));
        }
        return of(response);
    };
    return BearerTokenRefreshInterceptor;
}());
export { BearerTokenRefreshInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhcmVyLXRva2VuLXJlZnJlc2gtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3V0aWwvYXV0aGVudGljYXRvcnMvYmVhcmVyLXRva2VuLXJlZnJlc2gtaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRWpFLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBR2pELE9BQU8sRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUNILGtCQUFrQixFQUlyQixNQUFNLG9EQUFvRCxDQUFDO0FBRTVEO0lBR0ksdUNBQ1ksaUJBQW9DLEVBQ3BDLFNBQW9CLEVBQ3BCLFVBQXNCLEVBQ3RCLFVBQXNCO1FBSHRCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCx5REFBaUIsR0FBakIsVUFBa0IsT0FBa0IsRUFBRSxRQUFvQjtRQUExRCxpQkFhQztRQVpHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxLQUFLLGtCQUFrQixDQUFDLGlCQUFpQixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLGNBQWMsQ0FBQztlQUN6RyxRQUFRLENBQUMsWUFBWSxLQUFLLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtZQUNoRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3pDLElBQUksQ0FDRCxHQUFHLENBQUMsVUFBTyxXQUFXOzs7Z0NBQ2xCLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7NEJBQXRGLFNBQXNGLENBQUM7Ozs7aUJBQzFGLENBQUMsRUFDRixRQUFRLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQ2pELENBQUM7U0FDVDtRQUVELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxvQ0FBQztBQUFELENBQUMsQUExQkQsSUEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwaVRva2VuSGFuZGxlcn0gZnJvbSAnLi4vLi4vaGFuZGxlcnMvYXBpLXRva2VuLWhhbmRsZXInO1xuaW1wb3J0IHtBcGlDb25maWcsIEFwaVNlcnZpY2V9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBcGlLZXlzfSBmcm9tICcuLi8uLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtEZXZpY2VJbmZvfSBmcm9tICcuLi8uLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge21lcmdlTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gICAgQ3NIdHRwUmVzcG9uc2VDb2RlLFxuICAgIENzUmVxdWVzdCxcbiAgICBDc1Jlc3BvbnNlLFxuICAgIENzUmVzcG9uc2VJbnRlcmNlcHRvclxufSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9jb3JlL2h0dHAtc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBCZWFyZXJUb2tlblJlZnJlc2hJbnRlcmNlcHRvciBpbXBsZW1lbnRzIENzUmVzcG9uc2VJbnRlcmNlcHRvciB7XG4gICAgcHJpdmF0ZSBhcGlUb2tlbkhhbmRsZXI6IEFwaVRva2VuSGFuZGxlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgcHJpdmF0ZSBhcGlDb25maWc6IEFwaUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5hcGlUb2tlbkhhbmRsZXIgPSBuZXcgQXBpVG9rZW5IYW5kbGVyKHRoaXMuYXBpQ29uZmlnLCB0aGlzLmFwaVNlcnZpY2UsIHRoaXMuZGV2aWNlSW5mbyk7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0UmVzcG9uc2UocmVxdWVzdDogQ3NSZXF1ZXN0LCByZXNwb25zZTogQ3NSZXNwb25zZSk6IE9ic2VydmFibGU8Q3NSZXNwb25zZT4ge1xuICAgICAgICBpZiAoKHJlc3BvbnNlLnJlc3BvbnNlQ29kZSA9PT0gQ3NIdHRwUmVzcG9uc2VDb2RlLkhUVFBfVU5BVVRIT1JJU0VEICYmIHJlc3BvbnNlLmJvZHkubWVzc2FnZSA9PT0gJ1VuYXV0aG9yaXplZCcpXG4gICAgICAgICAgICB8fCByZXNwb25zZS5yZXNwb25zZUNvZGUgPT09IENzSHR0cFJlc3BvbnNlQ29kZS5IVFRQX0ZPUkJJRERFTikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpVG9rZW5IYW5kbGVyLnJlZnJlc2hBdXRoVG9rZW4oKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKGJlYXJlclRva2VuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhBcGlLZXlzLktFWV9BUElfVE9LRU4sIGJlYXJlclRva2VuKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHRoaXMuYXBpU2VydmljZS5mZXRjaChyZXF1ZXN0KSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9mKHJlc3BvbnNlKTtcbiAgICB9XG59XG4iXX0=