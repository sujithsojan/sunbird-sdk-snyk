import { Response } from '../../../api';
import { ShareDirection, ShareItemType, ShareType } from '../../../telemetry';
import { ContentUtil } from '../../util/content-util';
var GenerateExportShareTelemetry = /** @class */ (function () {
    function GenerateExportShareTelemetry(telemetryService) {
        this.telemetryService = telemetryService;
    }
    GenerateExportShareTelemetry.prototype.execute = function (exportContentContext, fileName, contentExportRequest) {
        var response = new Response();
        var items = [];
        for (var _i = 0, _a = exportContentContext.items; _i < _a.length; _i++) {
            var element = _a[_i];
            var item = {
                type: ShareItemType.CONTENT,
                origin: ContentUtil.readOriginFromContentMap(element),
                identifier: element.identifier,
                pkgVersion: Number(element.pkgVersion),
                transferCount: ContentUtil.readTransferCountFromContentMap(element),
                size: ContentUtil.readSizeFromContentMap(element)
            };
        }
        var req = {
            dir: ShareDirection.OUT,
            type: ShareType.FILE.valueOf(),
            items: items,
            env: 'sdk'
        };
        return this.telemetryService.share(req).toPromise()
            .then(function () {
            var exportedFilePath;
            if (contentExportRequest.saveLocally) {
                exportedFilePath = contentExportRequest.destinationFolder.concat(fileName);
            }
            else {
                var folderPath = (window.device.platform.toLowerCase() === "ios") ? cordova.file.documentsDirectory : cordova.file.externalCacheDirectory;
                exportedFilePath = folderPath.concat(fileName);
            }
            var exportResponse = { exportedFilePath: exportedFilePath };
            response.body = exportResponse;
            return Promise.resolve(response);
        }).catch(function () {
            return Promise.reject(response);
        });
    };
    return GenerateExportShareTelemetry;
}());
export { GenerateExportShareTelemetry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtZXhwb3J0LXNoYXJlLXRlbGVtZXRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2V4cG9ydC9nZW5lcmF0ZS1leHBvcnQtc2hhcmUtdGVsZW1ldHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFPLGNBQWMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUEwQyxNQUFNLG9CQUFvQixDQUFDO0FBQzNILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRDtJQUNJLHNDQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN0RCxDQUFDO0lBRUQsOENBQU8sR0FBUCxVQUFRLG9CQUEwQyxFQUFFLFFBQWdCLEVBQUUsb0JBQTBDO1FBQzVHLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLEtBQXNCLFVBQTJCLEVBQTNCLEtBQUEsb0JBQW9CLENBQUMsS0FBTSxFQUEzQixjQUEyQixFQUEzQixJQUEyQixFQUFFO1lBQTlDLElBQU0sT0FBTyxTQUFBO1lBQ2QsSUFBTSxJQUFJLEdBQVM7Z0JBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPO2dCQUMzQixNQUFNLEVBQUUsV0FBVyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQztnQkFDckQsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUM5QixVQUFVLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQ3RDLGFBQWEsRUFBRSxXQUFXLENBQUMsK0JBQStCLENBQUMsT0FBTyxDQUFDO2dCQUNuRSxJQUFJLEVBQUUsV0FBVyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQzthQUNwRCxDQUFDO1NBQ0w7UUFDRCxJQUFNLEdBQUcsR0FBMEI7WUFDL0IsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHO1lBQ3ZCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM5QixLQUFLLEVBQUUsS0FBSztZQUNaLEdBQUcsRUFBRSxLQUFLO1NBQ2IsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUU7YUFDOUMsSUFBSSxDQUFDO1lBQ0YsSUFBSSxnQkFBZ0IsQ0FBQztZQUNyQixJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBRTtnQkFDbEMsZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlFO2lCQUFNO2dCQUNILElBQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7Z0JBQzVJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxJQUFNLGNBQWMsR0FBMEIsRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO1lBQ25GLFFBQVEsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1lBQy9CLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUwsbUNBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50RXhwb3J0UmVzcG9uc2UsIEV4cG9ydENvbnRlbnRDb250ZXh0LCBDb250ZW50RXhwb3J0UmVxdWVzdH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7SXRlbSwgU2hhcmVEaXJlY3Rpb24sIFNoYXJlSXRlbVR5cGUsIFNoYXJlVHlwZSwgVGVsZW1ldHJ5U2VydmljZSwgVGVsZW1ldHJ5U2hhcmVSZXF1ZXN0fSBmcm9tICcuLi8uLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vLi4vdXRpbC9jb250ZW50LXV0aWwnO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVFeHBvcnRTaGFyZVRlbGVtZXRyeSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0ZWxlbWV0cnlTZXJ2aWNlOiBUZWxlbWV0cnlTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShleHBvcnRDb250ZW50Q29udGV4dDogRXhwb3J0Q29udGVudENvbnRleHQsIGZpbGVOYW1lOiBzdHJpbmcsIGNvbnRlbnRFeHBvcnRSZXF1ZXN0OiBDb250ZW50RXhwb3J0UmVxdWVzdCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIGNvbnN0IGl0ZW1zOiBJdGVtW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGV4cG9ydENvbnRlbnRDb250ZXh0Lml0ZW1zISkge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogSXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTaGFyZUl0ZW1UeXBlLkNPTlRFTlQsXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBDb250ZW50VXRpbC5yZWFkT3JpZ2luRnJvbUNvbnRlbnRNYXAoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogZWxlbWVudC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgIHBrZ1ZlcnNpb246IE51bWJlcihlbGVtZW50LnBrZ1ZlcnNpb24pLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyQ291bnQ6IENvbnRlbnRVdGlsLnJlYWRUcmFuc2ZlckNvdW50RnJvbUNvbnRlbnRNYXAoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgc2l6ZTogQ29udGVudFV0aWwucmVhZFNpemVGcm9tQ29udGVudE1hcChlbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXE6IFRlbGVtZXRyeVNoYXJlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGRpcjogU2hhcmVEaXJlY3Rpb24uT1VULFxuICAgICAgICAgICAgdHlwZTogU2hhcmVUeXBlLkZJTEUudmFsdWVPZigpLFxuICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgZW52OiAnc2RrJ1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLnNoYXJlKHJlcSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXhwb3J0ZWRGaWxlUGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudEV4cG9ydFJlcXVlc3Quc2F2ZUxvY2FsbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0ZWRGaWxlUGF0aCA9IGNvbnRlbnRFeHBvcnRSZXF1ZXN0LmRlc3RpbmF0aW9uRm9sZGVyLmNvbmNhdChmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyUGF0aCA9ICh3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9zXCIpID8gY29yZG92YS5maWxlLmRvY3VtZW50c0RpcmVjdG9yeSA6IGNvcmRvdmEuZmlsZS5leHRlcm5hbENhY2hlRGlyZWN0b3J5O1xuICAgICAgICAgICAgICAgICAgICBleHBvcnRlZEZpbGVQYXRoID0gZm9sZGVyUGF0aC5jb25jYXQoZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBleHBvcnRSZXNwb25zZTogQ29udGVudEV4cG9ydFJlc3BvbnNlID0ge2V4cG9ydGVkRmlsZVBhdGg6IGV4cG9ydGVkRmlsZVBhdGh9O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBleHBvcnRSZXNwb25zZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=