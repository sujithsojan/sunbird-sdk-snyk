import { Path } from '../../util/file/util/path';
import { HttpRequestType, Request } from '../../api';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
var GetSystemSettingsHandler = /** @class */ (function () {
    function GetSystemSettingsHandler(apiService, systemSettingsConfig, fileservice, cachedItemStore) {
        this.apiService = apiService;
        this.systemSettingsConfig = systemSettingsConfig;
        this.fileservice = fileservice;
        this.cachedItemStore = cachedItemStore;
        this.SYSTEM_SETTINGS_FILE_KEY_PREFIX = 'system-setting-';
        this.SYSTEM_SETTINGS_LOCAL_KEY = 'system-settings-';
        this.GET_SYSTEM_SETTINGS_ENDPOINT = '/system/settings/get';
    }
    GetSystemSettingsHandler.prototype.handle = function (request) {
        var _this = this;
        return this.cachedItemStore.getCached(request.id, this.SYSTEM_SETTINGS_LOCAL_KEY, 'ttl_' + this.SYSTEM_SETTINGS_LOCAL_KEY, function () { return _this.fetchFromServer(request); }, function () { return _this.fetchFromFile(request); });
    };
    GetSystemSettingsHandler.prototype.fetchFromServer = function (request) {
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.GET)
            .withPath(this.systemSettingsConfig.systemSettingsApiPath + this.GET_SYSTEM_SETTINGS_ENDPOINT + '/' + request.id)
            .withBearerToken(true)
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (response) {
            return response.body.result.response;
        }));
    };
    GetSystemSettingsHandler.prototype.fetchFromFile = function (request) {
        var dir = Path.getAssetPath() + this.systemSettingsConfig.systemSettingsDirPath;
        var file = this.SYSTEM_SETTINGS_FILE_KEY_PREFIX + request.id + '.json';
        return from(this.fileservice.readFileFromAssets(dir.concat('/', file))).pipe(map(function (fileContent) {
            var result = JSON.parse(fileContent);
            return (result.result.response);
        }));
    };
    return GetSystemSettingsHandler;
}());
export { GetSystemSettingsHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXN5c3RlbS1zZXR0aW5ncy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N5c3RlbS1zZXR0aW5ncy9oYW5kbGVycy9nZXQtc3lzdGVtLXNldHRpbmdzLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRS9DLE9BQU8sRUFBZ0MsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsRixPQUFPLEVBQUMsSUFBSSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQztJQUtJLGtDQUFvQixVQUFzQixFQUN0QixvQkFBMEMsRUFDMUMsV0FBd0IsRUFDeEIsZUFBZ0M7UUFIaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVBuQyxvQ0FBK0IsR0FBRyxpQkFBaUIsQ0FBQztRQUNwRCw4QkFBeUIsR0FBRyxrQkFBa0IsQ0FBQztRQUMvQyxpQ0FBNEIsR0FBRyxzQkFBc0IsQ0FBQztJQU12RSxDQUFDO0lBRUQseUNBQU0sR0FBTixVQUFPLE9BQWlDO1FBQXhDLGlCQVFDO1FBUEcsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDakMsT0FBTyxDQUFDLEVBQUUsRUFDVixJQUFJLENBQUMseUJBQXlCLEVBQzlCLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQ3ZDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUE3QixDQUE2QixFQUNuQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBM0IsQ0FBMkIsQ0FDcEMsQ0FBQztJQUNOLENBQUM7SUFFTyxrREFBZSxHQUF2QixVQUF3QixPQUFpQztRQUNyRCxJQUFNLFVBQVUsR0FBWSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7YUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDaEgsZUFBZSxDQUFDLElBQUksQ0FBQzthQUNyQixLQUFLLEVBQUUsQ0FBQztRQUViLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQTJDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDbkYsR0FBRyxDQUFDLFVBQUMsUUFBUTtZQUNULE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRU8sZ0RBQWEsR0FBckIsVUFBc0IsT0FBaUM7UUFDbkQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNsRixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsK0JBQStCLEdBQUcsT0FBTyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDekUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN4RSxHQUFHLENBQUMsVUFBQyxXQUFtQjtZQUNwQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUwsK0JBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWNoZWRJdGVtU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1BhdGh9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS91dGlsL3BhdGgnO1xuaW1wb3J0IHtHZXRTeXN0ZW1TZXR0aW5nc1JlcXVlc3QsIFN5c3RlbVNldHRpbmdzLCBTeXN0ZW1TZXR0aW5nc0NvbmZpZ30gZnJvbSAnLi4nO1xuaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBHZXRTeXN0ZW1TZXR0aW5nc0hhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxHZXRTeXN0ZW1TZXR0aW5nc1JlcXVlc3QsIFN5c3RlbVNldHRpbmdzPiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBTWVNURU1fU0VUVElOR1NfRklMRV9LRVlfUFJFRklYID0gJ3N5c3RlbS1zZXR0aW5nLSc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBTWVNURU1fU0VUVElOR1NfTE9DQUxfS0VZID0gJ3N5c3RlbS1zZXR0aW5ncy0nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgR0VUX1NZU1RFTV9TRVRUSU5HU19FTkRQT0lOVCA9ICcvc3lzdGVtL3NldHRpbmdzL2dldCc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzeXN0ZW1TZXR0aW5nc0NvbmZpZzogU3lzdGVtU2V0dGluZ3NDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmaWxlc2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSkge1xuICAgIH1cblxuICAgIGhhbmRsZShyZXF1ZXN0OiBHZXRTeXN0ZW1TZXR0aW5nc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFN5c3RlbVNldHRpbmdzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlZEl0ZW1TdG9yZS5nZXRDYWNoZWQ8U3lzdGVtU2V0dGluZ3M+KFxuICAgICAgICAgICAgcmVxdWVzdC5pZCxcbiAgICAgICAgICAgIHRoaXMuU1lTVEVNX1NFVFRJTkdTX0xPQ0FMX0tFWSxcbiAgICAgICAgICAgICd0dGxfJyArIHRoaXMuU1lTVEVNX1NFVFRJTkdTX0xPQ0FMX0tFWSxcbiAgICAgICAgICAgICgpID0+IHRoaXMuZmV0Y2hGcm9tU2VydmVyKHJlcXVlc3QpLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5mZXRjaEZyb21GaWxlKHJlcXVlc3QpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaEZyb21TZXJ2ZXIocmVxdWVzdDogR2V0U3lzdGVtU2V0dGluZ3NSZXF1ZXN0KTogT2JzZXJ2YWJsZTxTeXN0ZW1TZXR0aW5ncz4ge1xuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLkdFVClcbiAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLnN5c3RlbVNldHRpbmdzQ29uZmlnLnN5c3RlbVNldHRpbmdzQXBpUGF0aCArIHRoaXMuR0VUX1NZU1RFTV9TRVRUSU5HU19FTkRQT0lOVCArICcvJyArIHJlcXVlc3QuaWQpXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoPHsgcmVzdWx0OiB7IHJlc3BvbnNlOiBTeXN0ZW1TZXR0aW5ncyB9IH0+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkucmVzdWx0LnJlc3BvbnNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRnJvbUZpbGUocmVxdWVzdDogR2V0U3lzdGVtU2V0dGluZ3NSZXF1ZXN0KTogT2JzZXJ2YWJsZTxTeXN0ZW1TZXR0aW5ncz4ge1xuICAgICAgICBjb25zdCBkaXIgPSBQYXRoLmdldEFzc2V0UGF0aCgpICsgdGhpcy5zeXN0ZW1TZXR0aW5nc0NvbmZpZy5zeXN0ZW1TZXR0aW5nc0RpclBhdGg7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLlNZU1RFTV9TRVRUSU5HU19GSUxFX0tFWV9QUkVGSVggKyByZXF1ZXN0LmlkICsgJy5qc29uJztcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5maWxlc2VydmljZS5yZWFkRmlsZUZyb21Bc3NldHMoZGlyLmNvbmNhdCgnLycsIGZpbGUpKSkucGlwZShcbiAgICAgICAgICAgIG1hcCgoZmlsZUNvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEpTT04ucGFyc2UoZmlsZUNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAocmVzdWx0LnJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19