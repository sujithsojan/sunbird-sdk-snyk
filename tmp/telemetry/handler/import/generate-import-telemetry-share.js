import { ShareDirection, ShareItemType, ShareType } from '../..';
import { Response } from '../../../api';
import { ImportedMetadataEntry } from '../../../profile/db/schema';
var GenerateImportTelemetryShare = /** @class */ (function () {
    function GenerateImportTelemetryShare(dbService, telemetryService) {
        this.dbService = dbService;
        this.telemetryService = telemetryService;
    }
    GenerateImportTelemetryShare.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: ImportedMetadataEntry.TABLE_NAME
        }).toPromise().then(function (results) {
            var items = [];
            results.forEach(function (result) {
                var item = {
                    type: ShareItemType.TELEMETRY,
                    origin: result[ImportedMetadataEntry.COLUMN_NAME_DEVICE_ID],
                    identifier: result[ImportedMetadataEntry.COLUMN_NAME_IMPORTED_ID],
                    pkgVersion: 0,
                    transferCount: 0,
                    size: ''
                };
                items.push(item);
            });
            var req = {
                dir: ShareDirection.IN,
                type: ShareType.FILE.valueOf(),
                items: items,
                env: 'sdk'
            };
            return _this.telemetryService.share(req).toPromise();
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    return GenerateImportTelemetryShare;
}());
export { GenerateImportTelemetryShare };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW1wb3J0LXRlbGVtZXRyeS1zaGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZWxlbWV0cnkvaGFuZGxlci9pbXBvcnQvZ2VuZXJhdGUtaW1wb3J0LXRlbGVtZXRyeS1zaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsY0FBYyxFQUNkLGFBQWEsRUFDYixTQUFTLEVBR1osTUFBTSxPQUFPLENBQUM7QUFDZixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWpFO0lBQ0ksc0NBQW9CLFNBQW9CLEVBQ3BCLGdCQUFrQztRQURsQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFDdEQsQ0FBQztJQUVNLDhDQUFPLEdBQWQsVUFBZSxhQUFxQztRQUFwRCxpQkE2QkM7UUE1QkcsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxVQUFVO1NBQzFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUEwQztZQUMzRCxJQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7WUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQXVDO2dCQUNwRCxJQUFNLElBQUksR0FBUztvQkFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFNBQVM7b0JBQzdCLE1BQU0sRUFBRSxNQUFNLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUM7b0JBQzNELFVBQVUsRUFBRSxNQUFNLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLENBQUM7b0JBQ2pFLFVBQVUsRUFBRSxDQUFDO29CQUNiLGFBQWEsRUFBRSxDQUFDO29CQUNoQixJQUFJLEVBQUUsRUFBRTtpQkFDWCxDQUFDO2dCQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFNLEdBQUcsR0FBMEI7Z0JBQy9CLEdBQUcsRUFBRSxjQUFjLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM5QixLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUUsS0FBSzthQUNiLENBQUM7WUFDRixPQUFPLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBQ0wsbUNBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBJbXBvcnRUZWxlbWV0cnlDb250ZXh0LFxuICAgIEl0ZW0sXG4gICAgU2hhcmVEaXJlY3Rpb24sXG4gICAgU2hhcmVJdGVtVHlwZSxcbiAgICBTaGFyZVR5cGUsXG4gICAgVGVsZW1ldHJ5U2VydmljZSxcbiAgICBUZWxlbWV0cnlTaGFyZVJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0ltcG9ydGVkTWV0YWRhdGFFbnRyeX0gZnJvbSAnLi4vLi4vLi4vcHJvZmlsZS9kYi9zY2hlbWEnO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVJbXBvcnRUZWxlbWV0cnlTaGFyZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRlbGVtZXRyeVNlcnZpY2U6IFRlbGVtZXRyeVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShpbXBvcnRDb250ZXh0OiBJbXBvcnRUZWxlbWV0cnlDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IEltcG9ydGVkTWV0YWRhdGFFbnRyeS5UQUJMRV9OQU1FXG4gICAgICAgIH0pLnRvUHJvbWlzZSgpLnRoZW4oKHJlc3VsdHM6IEltcG9ydGVkTWV0YWRhdGFFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbXM6IEl0ZW1bXSA9IFtdO1xuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQ6IEltcG9ydGVkTWV0YWRhdGFFbnRyeS5TY2hlbWFNYXApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBTaGFyZUl0ZW1UeXBlLlRFTEVNRVRSWSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiByZXN1bHRbSW1wb3J0ZWRNZXRhZGF0YUVudHJ5LkNPTFVNTl9OQU1FX0RFVklDRV9JRF0sXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IHJlc3VsdFtJbXBvcnRlZE1ldGFkYXRhRW50cnkuQ09MVU1OX05BTUVfSU1QT1JURURfSURdLFxuICAgICAgICAgICAgICAgICAgICBwa2dWZXJzaW9uOiAwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2ZlckNvdW50OiAwLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiAnJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgcmVxOiBUZWxlbWV0cnlTaGFyZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgZGlyOiBTaGFyZURpcmVjdGlvbi5JTixcbiAgICAgICAgICAgICAgICB0eXBlOiBTaGFyZVR5cGUuRklMRS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIGVudjogJ3NkaydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLnNoYXJlKHJlcSkudG9Qcm9taXNlKCk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGltcG9ydENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19