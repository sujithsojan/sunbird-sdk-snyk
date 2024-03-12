import { Response } from '../../../api';
import { ImportedMetadataEntry } from '../../db/schema';
var UpdateImportedProfileMetadata = /** @class */ (function () {
    function UpdateImportedProfileMetadata(dbService) {
        this.dbService = dbService;
    }
    UpdateImportedProfileMetadata.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        var importId = importContext.metadata['export_id'];
        var did = importContext.metadata['did'];
        var importMetaDataModel = {
            imported_id: importId,
            device_id: did,
            count: importContext.metadata['profiles_count']
        };
        return this.dbService.read({
            table: ImportedMetadataEntry.TABLE_NAME,
            selection: ImportedMetadataEntry.COLUMN_NAME_IMPORTED_ID + " =? AND " + ImportedMetadataEntry.COLUMN_NAME_DEVICE_ID + " = ?",
            selectionArgs: [importId, did],
            limit: '1'
        }).toPromise().then(function (results) {
            if (results && results.length) {
                return _this.dbService.update({
                    table: ImportedMetadataEntry.TABLE_NAME,
                    modelJson: importMetaDataModel,
                    selection: ImportedMetadataEntry.COLUMN_NAME_IMPORTED_ID + " =? AND " + ImportedMetadataEntry.COLUMN_NAME_DEVICE_ID + " =?",
                    selectionArgs: [importId, did]
                }).toPromise();
            }
            else {
                return _this.dbService.insert({
                    table: ImportedMetadataEntry.TABLE_NAME,
                    modelJson: importMetaDataModel,
                }).toPromise();
            }
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    return UpdateImportedProfileMetadata;
}());
export { UpdateImportedProfileMetadata };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWltcG9ydGVkLXByb2ZpbGUtbWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL2ltcG9ydC91cGRhdGUtaW1wb3J0ZWQtcHJvZmlsZS1tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBR3REO0lBRUksdUNBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFFeEMsQ0FBQztJQUVNLCtDQUFPLEdBQWQsVUFBZSxhQUFtQztRQUFsRCxpQkFnQ0M7UUEvQkcsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELElBQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBTSxtQkFBbUIsR0FBb0M7WUFDekQsV0FBVyxFQUFFLFFBQVE7WUFDckIsU0FBUyxFQUFFLEdBQUc7WUFDZCxLQUFLLEVBQUUsYUFBYSxDQUFDLFFBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNuRCxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLEVBQUUscUJBQXFCLENBQUMsVUFBVTtZQUN2QyxTQUFTLEVBQUsscUJBQXFCLENBQUMsdUJBQXVCLGdCQUFXLHFCQUFxQixDQUFDLHFCQUFxQixTQUFNO1lBQ3ZILGFBQWEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7WUFDOUIsS0FBSyxFQUFFLEdBQUc7U0FDYixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBMEM7WUFDM0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDekIsS0FBSyxFQUFFLHFCQUFxQixDQUFDLFVBQVU7b0JBQ3ZDLFNBQVMsRUFBRSxtQkFBbUI7b0JBQzlCLFNBQVMsRUFBSyxxQkFBcUIsQ0FBQyx1QkFBdUIsZ0JBQVcscUJBQXFCLENBQUMscUJBQXFCLFFBQUs7b0JBQ3RILGFBQWEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7aUJBQ2pDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUN6QixLQUFLLEVBQUUscUJBQXFCLENBQUMsVUFBVTtvQkFDdkMsU0FBUyxFQUFFLG1CQUFtQjtpQkFDakMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsb0NBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0ltcG9ydGVkTWV0YWRhdGFFbnRyeX0gZnJvbSAnLi4vLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7SW1wb3J0UHJvZmlsZUNvbnRleHR9IGZyb20gJy4uLy4uL2RlZi9pbXBvcnQtcHJvZmlsZS1jb250ZXh0JztcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZUltcG9ydGVkUHJvZmlsZU1ldGFkYXRhIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKGltcG9ydENvbnRleHQ6IEltcG9ydFByb2ZpbGVDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgY29uc3QgaW1wb3J0SWQgPSBpbXBvcnRDb250ZXh0Lm1ldGFkYXRhIVsnZXhwb3J0X2lkJ107XG4gICAgICAgIGNvbnN0IGRpZCA9IGltcG9ydENvbnRleHQubWV0YWRhdGEhWydkaWQnXTtcbiAgICAgICAgY29uc3QgaW1wb3J0TWV0YURhdGFNb2RlbDogSW1wb3J0ZWRNZXRhZGF0YUVudHJ5LlNjaGVtYU1hcCA9IHtcbiAgICAgICAgICAgIGltcG9ydGVkX2lkOiBpbXBvcnRJZCxcbiAgICAgICAgICAgIGRldmljZV9pZDogZGlkLFxuICAgICAgICAgICAgY291bnQ6IGltcG9ydENvbnRleHQubWV0YWRhdGEhWydwcm9maWxlc19jb3VudCddXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBJbXBvcnRlZE1ldGFkYXRhRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7SW1wb3J0ZWRNZXRhZGF0YUVudHJ5LkNPTFVNTl9OQU1FX0lNUE9SVEVEX0lEfSA9PyBBTkQgJHtJbXBvcnRlZE1ldGFkYXRhRW50cnkuQ09MVU1OX05BTUVfREVWSUNFX0lEfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2ltcG9ydElkLCBkaWRdLFxuICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICB9KS50b1Byb21pc2UoKS50aGVuKChyZXN1bHRzOiBJbXBvcnRlZE1ldGFkYXRhRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBJbXBvcnRlZE1ldGFkYXRhRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBpbXBvcnRNZXRhRGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0ltcG9ydGVkTWV0YWRhdGFFbnRyeS5DT0xVTU5fTkFNRV9JTVBPUlRFRF9JRH0gPT8gQU5EICR7SW1wb3J0ZWRNZXRhZGF0YUVudHJ5LkNPTFVNTl9OQU1FX0RFVklDRV9JRH0gPT9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbaW1wb3J0SWQsIGRpZF1cbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBJbXBvcnRlZE1ldGFkYXRhRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBpbXBvcnRNZXRhRGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBpbXBvcnRDb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=