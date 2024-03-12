import { HttpRequestType, Request } from '../../api';
import { CachedItemRequestSourceFrom } from '../../key-value-store';
import { Path } from '../../util/file/util/path';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
var SearchLocationHandler = /** @class */ (function () {
    function SearchLocationHandler(apiService, profileServiceConfig, fileService, cachedItemStore) {
        this.apiService = apiService;
        this.profileServiceConfig = profileServiceConfig;
        this.fileService = fileService;
        this.cachedItemStore = cachedItemStore;
        this.LOCATION_LOCAL_KEY = 'location-';
    }
    SearchLocationHandler.prototype.handle = function (request) {
        var _this = this;
        var id = request.filters.type;
        if (request.filters.parentId) {
            id = id + '_' + request.filters.parentId;
        }
        return this.cachedItemStore[request.from === CachedItemRequestSourceFrom.SERVER ? 'get' : 'getCached'](id, this.LOCATION_LOCAL_KEY, 'ttl_' + this.LOCATION_LOCAL_KEY, function () { return _this.fetchFromServer(request); }, function () { return _this.fetchFromFile(request); }, SearchLocationHandler.LOCATION_TTL);
    };
    SearchLocationHandler.prototype.fetchFromServer = function (request) {
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.POST)
            .withPath(this.profileServiceConfig.searchLocationApiPath + SearchLocationHandler.GET_SEARCH_LOCATION_ENDPOINT)
            .withBearerToken(true)
            .withUserToken(false)
            .withBody({ request: request })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (success) {
            return success.body.result.response;
        }));
    };
    SearchLocationHandler.prototype.fetchFromFile = function (request) {
        var dir = Path.getAssetPath() + this.profileServiceConfig.locationDirPath;
        var file = request.filters.type;
        if (request.filters.parentId) {
            file = file + '-' + request.filters.parentId;
        }
        file = file + '.json';
        return from(this.fileService.readFileFromAssets(dir.concat('/', file))).pipe(map(function (filecontent) {
            var result = JSON.parse(filecontent);
            return result.result.response;
        }));
    };
    SearchLocationHandler.GET_SEARCH_LOCATION_ENDPOINT = '/location/search';
    SearchLocationHandler.LOCATION_TTL = 24 * 60 * 60 * 1000; // 1 day
    return SearchLocationHandler;
}());
export { SearchLocationHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWxvY2F0aW9uLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL3NlYXJjaC1sb2NhdGlvbi1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0MsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUdsRixPQUFPLEVBQUMsMkJBQTJCLEVBQWtCLE1BQU0sdUJBQXVCLENBQUM7QUFFbkYsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxJQUFJLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DO0lBTUksK0JBQW9CLFVBQXNCLEVBQ3RCLG9CQUEwQyxFQUMxQyxXQUF3QixFQUN4QixlQUFnQztRQUhoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBTG5DLHVCQUFrQixHQUFHLFdBQVcsQ0FBQztJQU1sRCxDQUFDO0lBRUQsc0NBQU0sR0FBTixVQUFPLE9BQStCO1FBQXRDLGlCQWNDO1FBYkcsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUMxQixFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUM1QztRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDbEcsRUFBRSxFQUNGLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFDaEMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQTdCLENBQTZCLEVBQ25DLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUEzQixDQUEyQixFQUNqQyxxQkFBcUIsQ0FBQyxZQUFZLENBQ3JDLENBQUM7SUFDTixDQUFDO0lBRU8sK0NBQWUsR0FBdkIsVUFBd0IsT0FBK0I7UUFDbkQsSUFBTSxVQUFVLEdBQVksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2FBQzVDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2FBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUMsNEJBQTRCLENBQUM7YUFDOUcsZUFBZSxDQUFDLElBQUksQ0FBQzthQUNyQixhQUFhLENBQUMsS0FBSyxDQUFDO2FBQ3BCLFFBQVEsQ0FBQyxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUM7YUFDbkIsS0FBSyxFQUFFLENBQUM7UUFFYixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFtRCxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQzNGLEdBQUcsQ0FBQyxVQUFDLE9BQU87WUFDUixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVPLDZDQUFhLEdBQXJCLFVBQXNCLE9BQStCO1FBQ2pELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDO1FBRTVFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDMUIsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDaEQ7UUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUV0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3hFLEdBQUcsQ0FBQyxVQUFDLFdBQW1CO1lBQ3BCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQTFEdUIsa0RBQTRCLEdBQUcsa0JBQWtCLENBQUM7SUFDbEQsa0NBQVksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRO0lBMkR4RSw0QkFBQztDQUFBLEFBN0RELElBNkRDO1NBN0RZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXIsIEFwaVNlcnZpY2UsIEh0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdH0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7TG9jYXRpb25TZWFyY2hDcml0ZXJpYSwgUHJvZmlsZVNlcnZpY2VDb25maWd9IGZyb20gJy4uJztcbmltcG9ydCB7TG9jYXRpb25TZWFyY2hSZXN1bHR9IGZyb20gJy4uL2RlZi9sb2NhdGlvbi1zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7Q2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tLCBDYWNoZWRJdGVtU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1BhdGh9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS91dGlsL3BhdGgnO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hMb2NhdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxMb2NhdGlvblNlYXJjaENyaXRlcmlhLCBMb2NhdGlvblNlYXJjaFJlc3VsdFtdPiB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgR0VUX1NFQVJDSF9MT0NBVElPTl9FTkRQT0lOVCA9ICcvbG9jYXRpb24vc2VhcmNoJztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBMT0NBVElPTl9UVEwgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyAxIGRheVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSBMT0NBVElPTl9MT0NBTF9LRVkgPSAnbG9jYXRpb24tJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlQ29uZmlnOiBQcm9maWxlU2VydmljZUNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhY2hlZEl0ZW1TdG9yZTogQ2FjaGVkSXRlbVN0b3JlKSB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcXVlc3Q6IExvY2F0aW9uU2VhcmNoQ3JpdGVyaWEpOiBPYnNlcnZhYmxlPExvY2F0aW9uU2VhcmNoUmVzdWx0W10+IHtcbiAgICAgICAgbGV0IGlkID0gcmVxdWVzdC5maWx0ZXJzLnR5cGU7XG4gICAgICAgIGlmIChyZXF1ZXN0LmZpbHRlcnMucGFyZW50SWQpIHtcbiAgICAgICAgICAgIGlkID0gaWQgKyAnXycgKyByZXF1ZXN0LmZpbHRlcnMucGFyZW50SWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRJdGVtU3RvcmVbcmVxdWVzdC5mcm9tID09PSBDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20uU0VSVkVSID8gJ2dldCcgOiAnZ2V0Q2FjaGVkJ10oXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIHRoaXMuTE9DQVRJT05fTE9DQUxfS0VZLFxuICAgICAgICAgICAgJ3R0bF8nICsgdGhpcy5MT0NBVElPTl9MT0NBTF9LRVksXG4gICAgICAgICAgICAoKSA9PiB0aGlzLmZldGNoRnJvbVNlcnZlcihyZXF1ZXN0KSxcbiAgICAgICAgICAgICgpID0+IHRoaXMuZmV0Y2hGcm9tRmlsZShyZXF1ZXN0KSxcbiAgICAgICAgICAgIFNlYXJjaExvY2F0aW9uSGFuZGxlci5MT0NBVElPTl9UVExcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRnJvbVNlcnZlcihyZXF1ZXN0OiBMb2NhdGlvblNlYXJjaENyaXRlcmlhKTogT2JzZXJ2YWJsZTxMb2NhdGlvblNlYXJjaFJlc3VsdFtdPiB7XG4gICAgICAgIGNvbnN0IGFwaVJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuUE9TVClcbiAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLnByb2ZpbGVTZXJ2aWNlQ29uZmlnLnNlYXJjaExvY2F0aW9uQXBpUGF0aCArIFNlYXJjaExvY2F0aW9uSGFuZGxlci5HRVRfU0VBUkNIX0xPQ0FUSU9OX0VORFBPSU5UKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhVc2VyVG9rZW4oZmFsc2UpXG4gICAgICAgICAgICAud2l0aEJvZHkoe3JlcXVlc3R9KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaDx7IHJlc3VsdDogeyByZXNwb25zZTogTG9jYXRpb25TZWFyY2hSZXN1bHRbXSB9IH0+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2Vzcy5ib2R5LnJlc3VsdC5yZXNwb25zZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaEZyb21GaWxlKHJlcXVlc3Q6IExvY2F0aW9uU2VhcmNoQ3JpdGVyaWEpOiBPYnNlcnZhYmxlPExvY2F0aW9uU2VhcmNoUmVzdWx0W10+IHtcbiAgICAgICAgY29uc3QgZGlyID0gUGF0aC5nZXRBc3NldFBhdGgoKSArIHRoaXMucHJvZmlsZVNlcnZpY2VDb25maWcubG9jYXRpb25EaXJQYXRoO1xuXG4gICAgICAgIGxldCBmaWxlID0gcmVxdWVzdC5maWx0ZXJzLnR5cGU7XG4gICAgICAgIGlmIChyZXF1ZXN0LmZpbHRlcnMucGFyZW50SWQpIHtcbiAgICAgICAgICAgIGZpbGUgPSBmaWxlICsgJy0nICsgcmVxdWVzdC5maWx0ZXJzLnBhcmVudElkO1xuICAgICAgICB9XG4gICAgICAgIGZpbGUgPSBmaWxlICsgJy5qc29uJztcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmZpbGVTZXJ2aWNlLnJlYWRGaWxlRnJvbUFzc2V0cyhkaXIuY29uY2F0KCcvJywgZmlsZSkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChmaWxlY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShmaWxlY29udGVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXN1bHQucmVzcG9uc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19