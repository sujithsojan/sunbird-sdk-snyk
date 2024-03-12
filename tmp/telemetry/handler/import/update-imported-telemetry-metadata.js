import { Response } from '../../../api';
import { ImportedMetadataEntry } from '../../../profile/db/schema';
var UpdateImportedTelemetryMetadata = /** @class */ (function () {
    function UpdateImportedTelemetryMetadata(dbService) {
        this.dbService = dbService;
    }
    UpdateImportedTelemetryMetadata.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        var importId = importContext.metadata['export_id'];
        var did = importContext.metadata['did'];
        var importMetaDataModel = {
            imported_id: importId,
            device_id: did,
            count: importContext.metadata['events_count']
        };
        return this.dbService.read({
            table: ImportedMetadataEntry.TABLE_NAME,
            selection: ImportedMetadataEntry.COLUMN_NAME_IMPORTED_ID + " = ? AND " + ImportedMetadataEntry.COLUMN_NAME_DEVICE_ID + " = ?",
            selectionArgs: [importId, did],
            limit: '1'
        }).toPromise().then(function (results) {
            if (results && results.length) {
                return _this.dbService.update({
                    table: ImportedMetadataEntry.TABLE_NAME,
                    modelJson: importMetaDataModel
                }).toPromise();
            }
            else {
                return _this.dbService.insert({
                    table: ImportedMetadataEntry.TABLE_NAME,
                    modelJson: importMetaDataModel
                }).toPromise();
            }
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    return UpdateImportedTelemetryMetadata;
}());
export { UpdateImportedTelemetryMetadata };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWltcG9ydGVkLXRlbGVtZXRyeS1tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZWxlbWV0cnkvaGFuZGxlci9pbXBvcnQvdXBkYXRlLWltcG9ydGVkLXRlbGVtZXRyeS1tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWpFO0lBRUkseUNBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQUVNLGlEQUFPLEdBQWQsVUFBZSxhQUFxQztRQUFwRCxpQkE4QkM7UUE3QkcsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELElBQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBTSxtQkFBbUIsR0FBb0M7WUFDekQsV0FBVyxFQUFFLFFBQVE7WUFDckIsU0FBUyxFQUFFLEdBQUc7WUFDZCxLQUFLLEVBQUUsYUFBYSxDQUFDLFFBQVMsQ0FBQyxjQUFjLENBQUM7U0FDakQsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsS0FBSyxFQUFFLHFCQUFxQixDQUFDLFVBQVU7WUFDdkMsU0FBUyxFQUFLLHFCQUFxQixDQUFDLHVCQUF1QixpQkFBWSxxQkFBcUIsQ0FBQyxxQkFBcUIsU0FBTTtZQUN4SCxhQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO1lBQzlCLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQTBDO1lBQzNELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxVQUFVO29CQUN2QyxTQUFTLEVBQUUsbUJBQW1CO2lCQUNqQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDekIsS0FBSyxFQUFFLHFCQUFxQixDQUFDLFVBQVU7b0JBQ3ZDLFNBQVMsRUFBRSxtQkFBbUI7aUJBQ2pDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLFFBQVEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1lBQzlCLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHNDQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtJbXBvcnRUZWxlbWV0cnlDb250ZXh0fSBmcm9tICcuLi8uLic7XG5pbXBvcnQge0ltcG9ydGVkTWV0YWRhdGFFbnRyeX0gZnJvbSAnLi4vLi4vLi4vcHJvZmlsZS9kYi9zY2hlbWEnO1xuXG5leHBvcnQgY2xhc3MgVXBkYXRlSW1wb3J0ZWRUZWxlbWV0cnlNZXRhZGF0YSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoaW1wb3J0Q29udGV4dDogSW1wb3J0VGVsZW1ldHJ5Q29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIGNvbnN0IGltcG9ydElkID0gaW1wb3J0Q29udGV4dC5tZXRhZGF0YSFbJ2V4cG9ydF9pZCddO1xuICAgICAgICBjb25zdCBkaWQgPSBpbXBvcnRDb250ZXh0Lm1ldGFkYXRhIVsnZGlkJ107XG4gICAgICAgIGNvbnN0IGltcG9ydE1ldGFEYXRhTW9kZWw6IEltcG9ydGVkTWV0YWRhdGFFbnRyeS5TY2hlbWFNYXAgPSB7XG4gICAgICAgICAgICBpbXBvcnRlZF9pZDogaW1wb3J0SWQsXG4gICAgICAgICAgICBkZXZpY2VfaWQ6IGRpZCxcbiAgICAgICAgICAgIGNvdW50OiBpbXBvcnRDb250ZXh0Lm1ldGFkYXRhIVsnZXZlbnRzX2NvdW50J11cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IEltcG9ydGVkTWV0YWRhdGFFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtJbXBvcnRlZE1ldGFkYXRhRW50cnkuQ09MVU1OX05BTUVfSU1QT1JURURfSUR9ID0gPyBBTkQgJHtJbXBvcnRlZE1ldGFkYXRhRW50cnkuQ09MVU1OX05BTUVfREVWSUNFX0lEfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2ltcG9ydElkLCBkaWRdLFxuICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICB9KS50b1Byb21pc2UoKS50aGVuKChyZXN1bHRzOiBJbXBvcnRlZE1ldGFkYXRhRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBJbXBvcnRlZE1ldGFkYXRhRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBpbXBvcnRNZXRhRGF0YU1vZGVsXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogSW1wb3J0ZWRNZXRhZGF0YUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogaW1wb3J0TWV0YURhdGFNb2RlbFxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBpbXBvcnRDb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=