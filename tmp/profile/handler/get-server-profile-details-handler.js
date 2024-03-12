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
import { CachedItemRequestSourceFrom } from '../../key-value-store';
import { of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { CsInjectionTokens } from '../../injection-tokens';
var GetServerProfileDetailsHandler = /** @class */ (function () {
    function GetServerProfileDetailsHandler(cachedItemStore, keyValueStore, container, profileServiceConfig) {
        this.cachedItemStore = cachedItemStore;
        this.keyValueStore = keyValueStore;
        this.container = container;
        this.profileServiceConfig = profileServiceConfig;
        this.USER_PROFILE_DETAILS_KEY_PREFIX = 'userProfileDetails';
    }
    Object.defineProperty(GetServerProfileDetailsHandler.prototype, "csUserService", {
        get: function () {
            return this.container.get(CsInjectionTokens.USER_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    GetServerProfileDetailsHandler.prototype.handle = function (serverProfileDetailsRequest) {
        var _this = this;
        serverProfileDetailsRequest.from = serverProfileDetailsRequest.from || CachedItemRequestSourceFrom.CACHE;
        return of(serverProfileDetailsRequest.from).pipe(mergeMap(function (from) {
            if (from === CachedItemRequestSourceFrom.SERVER) {
                return _this.fetchFromServer(serverProfileDetailsRequest).pipe(tap(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.keyValueStore.setValue(this.USER_PROFILE_DETAILS_KEY_PREFIX + '-' + profile.id, JSON.stringify(profile)).toPromise()];
                    });
                }); }), catchError(function (error) {
                    if (serverProfileDetailsRequest.forceRefresh) {
                        throw error;
                    }
                    return _this.fetchFromCache(serverProfileDetailsRequest);
                }));
            }
            return _this.fetchFromCache(serverProfileDetailsRequest);
        }));
    };
    GetServerProfileDetailsHandler.prototype.fetchFromServer = function (request) {
        return this.csUserService.getProfileDetails(request, { apiPath: this.profileServiceConfig.profileApiPath_V5 });
    };
    GetServerProfileDetailsHandler.prototype.fetchFromCache = function (request) {
        var _this = this;
        return this.cachedItemStore.getCached(request.userId, this.USER_PROFILE_DETAILS_KEY_PREFIX, this.USER_PROFILE_DETAILS_KEY_PREFIX, function () { return _this.fetchFromServer(request); });
    };
    return GetServerProfileDetailsHandler;
}());
export { GetServerProfileDetailsHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXNlcnZlci1wcm9maWxlLWRldGFpbHMtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm9maWxlL2hhbmRsZXIvZ2V0LXNlcnZlci1wcm9maWxlLWRldGFpbHMtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQW9CLDJCQUEyQixFQUFpQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3JILE9BQU8sRUFBYSxFQUFFLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFJekQ7SUFPSSx3Q0FDWSxlQUFnQyxFQUNoQyxhQUE0QixFQUM1QixTQUFvQixFQUNwQixvQkFBMEM7UUFIMUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU5yQyxvQ0FBK0IsR0FBRyxvQkFBb0IsQ0FBQztJQVF4RSxDQUFDO0lBRUgsc0JBQVkseURBQWE7YUFBekI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELENBQUM7OztPQUFBO0lBRUMsK0NBQU0sR0FBTixVQUFPLDJCQUEyQjtRQUFsQyxpQkF5QkM7UUF2QkcsMkJBQTJCLENBQUMsSUFBSSxHQUFHLDJCQUEyQixDQUFDLElBQUksSUFBSSwyQkFBMkIsQ0FBQyxLQUFLLENBQUM7UUFFekcsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM1QyxRQUFRLENBQUMsVUFBQyxJQUFpQztZQUN2QyxJQUFJLElBQUksS0FBSywyQkFBMkIsQ0FBQyxNQUFNLEVBQUU7Z0JBQzdDLE9BQU8sS0FBSSxDQUFDLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FDekQsR0FBRyxDQUFDLFVBQU8sT0FBTzs7d0JBQ2Qsc0JBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQzlCLElBQUksQ0FBQywrQkFBK0IsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUNuRixDQUFDLFNBQVMsRUFBRSxFQUFDOztxQkFDakIsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxVQUFDLEtBQUs7b0JBQ2IsSUFBRywyQkFBMkIsQ0FBQyxZQUFZLEVBQUU7d0JBQ3hDLE1BQU0sS0FBSyxDQUFDO3FCQUNoQjtvQkFDRCxPQUFPLEtBQUksQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDNUQsQ0FBQyxDQUFDLENBQ0wsQ0FBQzthQUNMO1lBRUQsT0FBTyxLQUFJLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFHTyx3REFBZSxHQUF2QixVQUF3QixPQUFvQztRQUMxRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVPLHVEQUFjLEdBQXRCLFVBQXVCLE9BQW9DO1FBQTNELGlCQU9DO1FBTkcsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDakMsT0FBTyxDQUFDLE1BQU0sRUFDZCxJQUFJLENBQUMsK0JBQStCLEVBQ3BDLElBQUksQ0FBQywrQkFBK0IsRUFDcEMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQTdCLENBQTZCLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBQ0wscUNBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7UHJvZmlsZVNlcnZpY2VDb25maWcsIFNlcnZlclByb2ZpbGUsIFNlcnZlclByb2ZpbGVEZXRhaWxzUmVxdWVzdH0gZnJvbSAnLi4nO1xuaW1wb3J0IHtDYWNoZWRJdGVtUmVxdWVzdCwgQ2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tLCBDYWNoZWRJdGVtU3RvcmUsIEtleVZhbHVlU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDc0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge0NzVXNlclNlcnZpY2V9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL3NlcnZpY2VzL3VzZXInO1xuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gJ2ludmVyc2lmeSc7XG5cbmV4cG9ydCBjbGFzcyBHZXRTZXJ2ZXJQcm9maWxlRGV0YWlsc0hhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjx7XG4gICAgc2VydmVyUHJvZmlsZURldGFpbHNSZXF1ZXN0OiBTZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QsXG4gICAgY2FjaGVkSXRlbVJlcXVlc3Q6IENhY2hlZEl0ZW1SZXF1ZXN0XG59LCBTZXJ2ZXJQcm9maWxlPiB7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IFVTRVJfUFJPRklMRV9ERVRBSUxTX0tFWV9QUkVGSVggPSAndXNlclByb2ZpbGVEZXRhaWxzJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNhY2hlZEl0ZW1TdG9yZTogQ2FjaGVkSXRlbVN0b3JlLFxuICAgICAgICBwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmUsXG4gICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBDb250YWluZXIsXG4gICAgICAgIHByaXZhdGUgcHJvZmlsZVNlcnZpY2VDb25maWc6IFByb2ZpbGVTZXJ2aWNlQ29uZmlnXG4gICAgICAgICkge1xuICAgIH1cblxuICBwcml2YXRlIGdldCBjc1VzZXJTZXJ2aWNlKCk6IENzVXNlclNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXQoQ3NJbmplY3Rpb25Ub2tlbnMuVVNFUl9TRVJWSUNFKTtcbiAgfVxuXG4gICAgaGFuZGxlKHNlcnZlclByb2ZpbGVEZXRhaWxzUmVxdWVzdCk6IE9ic2VydmFibGU8U2VydmVyUHJvZmlsZT4ge1xuXG4gICAgICAgIHNlcnZlclByb2ZpbGVEZXRhaWxzUmVxdWVzdC5mcm9tID0gc2VydmVyUHJvZmlsZURldGFpbHNSZXF1ZXN0LmZyb20gfHwgQ2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tLkNBQ0hFO1xuXG4gICAgICAgIHJldHVybiBvZihzZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QuZnJvbSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChmcm9tOiBDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbSA9PT0gQ2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tLlNFUlZFUikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21TZXJ2ZXIoc2VydmVyUHJvZmlsZURldGFpbHNSZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFwKGFzeW5jIChwcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5VmFsdWVTdG9yZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5VU0VSX1BST0ZJTEVfREVUQUlMU19LRVlfUFJFRklYICsgJy0nICsgcHJvZmlsZS5pZCwgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlcnZlclByb2ZpbGVEZXRhaWxzUmVxdWVzdC5mb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShzZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShzZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgZmV0Y2hGcm9tU2VydmVyKHJlcXVlc3Q6IFNlcnZlclByb2ZpbGVEZXRhaWxzUmVxdWVzdCk6IE9ic2VydmFibGU8U2VydmVyUHJvZmlsZT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY3NVc2VyU2VydmljZS5nZXRQcm9maWxlRGV0YWlscyhyZXF1ZXN0LCB7IGFwaVBhdGggOiB0aGlzLnByb2ZpbGVTZXJ2aWNlQ29uZmlnLnByb2ZpbGVBcGlQYXRoX1Y1fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaEZyb21DYWNoZShyZXF1ZXN0OiBTZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFNlcnZlclByb2ZpbGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkSXRlbVN0b3JlLmdldENhY2hlZChcbiAgICAgICAgICAgIHJlcXVlc3QudXNlcklkLFxuICAgICAgICAgICAgdGhpcy5VU0VSX1BST0ZJTEVfREVUQUlMU19LRVlfUFJFRklYLFxuICAgICAgICAgICAgdGhpcy5VU0VSX1BST0ZJTEVfREVUQUlMU19LRVlfUFJFRklYLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5mZXRjaEZyb21TZXJ2ZXIocmVxdWVzdClcbiAgICAgICAgKTtcbiAgICB9XG59Il19