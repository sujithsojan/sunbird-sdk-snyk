var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
var ZipServiceImpl = /** @class */ (function () {
    function ZipServiceImpl() {
    }
    ZipServiceImpl.prototype.unzip = function (sourceZip, option, successCallback, errorCallback) {
        JJzip.unzip(sourceZip, option, function () {
            if (successCallback) {
                successCallback();
            }
        }, function (e) {
            if (errorCallback) {
                errorCallback(e);
            }
        });
    };
    ZipServiceImpl.prototype.zip = function (sourceFolderPath, option, directoriesToBeSkipped, filesToBeSkipped, successCallback, errorCallback) {
        JJzip.zip(sourceFolderPath, option, directoriesToBeSkipped, filesToBeSkipped, function () {
            if (successCallback) {
                successCallback();
            }
        }, function (e) {
            if (errorCallback) {
                errorCallback(e);
            }
        });
    };
    ZipServiceImpl = __decorate([
        injectable()
    ], ZipServiceImpl);
    return ZipServiceImpl;
}());
export { ZipServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL3ppcC9pbXBsL3ppcC1zZXJ2aWNlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUdyQztJQUFBO0lBd0JBLENBQUM7SUF2QkcsOEJBQUssR0FBTCxVQUFNLFNBQWlCLEVBQUUsTUFBTSxFQUFFLGVBQWdCLEVBQUUsYUFBYztRQUM3RCxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDM0IsSUFBSSxlQUFlLEVBQUU7Z0JBQ2pCLGVBQWUsRUFBRSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQyxFQUFFLFVBQUMsQ0FBQztZQUNELElBQUksYUFBYSxFQUFFO2dCQUNmLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRCQUFHLEdBQUgsVUFBSSxnQkFBd0IsRUFBRSxNQUFNLEVBQUUsc0JBQWdDLEVBQUUsZ0JBQTBCLEVBQUUsZUFBZ0IsRUFBRSxhQUFjO1FBQ2hJLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFO1lBQzFFLElBQUksZUFBZSxFQUFFO2dCQUNqQixlQUFlLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsRUFBRSxVQUFDLENBQUM7WUFDRCxJQUFJLGFBQWEsRUFBRTtnQkFDZixhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2QlEsY0FBYztRQUQxQixVQUFVLEVBQUU7T0FDQSxjQUFjLENBd0IxQjtJQUFELHFCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0F4QlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7WmlwU2VydmljZX0gZnJvbSAnLi4vZGVmL3ppcC1zZXJ2aWNlJztcbmltcG9ydCB7aW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFppcFNlcnZpY2VJbXBsIGltcGxlbWVudHMgWmlwU2VydmljZSB7XG4gICAgdW56aXAoc291cmNlWmlwOiBzdHJpbmcsIG9wdGlvbiwgc3VjY2Vzc0NhbGxiYWNrPywgZXJyb3JDYWxsYmFjaz8pIHtcbiAgICAgICAgSkp6aXAudW56aXAoc291cmNlWmlwLCBvcHRpb24sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgemlwKHNvdXJjZUZvbGRlclBhdGg6IHN0cmluZywgb3B0aW9uLCBkaXJlY3Rvcmllc1RvQmVTa2lwcGVkOiBzdHJpbmdbXSwgZmlsZXNUb0JlU2tpcHBlZDogc3RyaW5nW10sIHN1Y2Nlc3NDYWxsYmFjaz8sIGVycm9yQ2FsbGJhY2s/KSB7XG4gICAgICAgIEpKemlwLnppcChzb3VyY2VGb2xkZXJQYXRoLCBvcHRpb24sIGRpcmVjdG9yaWVzVG9CZVNraXBwZWQsIGZpbGVzVG9CZVNraXBwZWQsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19