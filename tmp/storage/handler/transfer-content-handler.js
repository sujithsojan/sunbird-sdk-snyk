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
import { StorageEventType } from '..';
import { EventNamespace } from '../../events-bus';
import { DeviceMemoryCheck } from './transfer/device-memory-check';
import { ValidateDestinationContent } from './transfer/validate-destination-content';
import { DeleteDestinationFolder } from './transfer/delete-destination-folder';
import { DuplicateContentCheck } from './transfer/duplicate-content-check';
import { CopyContentFromSourceToDestination } from './transfer/copy-content-from-source-to-destination';
import { UpdateSourceContentPathInDb } from './transfer/update-source-content-path-in-db';
import { StoreDestinationContentInDb } from './transfer/store-destination-content-in-db';
import { ValidateDestinationFolder } from './transfer/validate-destination-folder';
import { DeleteSourceFolder } from './transfer/delete-source-folder';
import { CancellationError } from '../errors/cancellation-error';
import { DuplicateContentError } from '../errors/duplicate-content-error';
import { LowMemoryError } from '../errors/low-memory-error';
import { defer, throwError } from 'rxjs';
import { catchError, mapTo, mergeMap, tap } from 'rxjs/operators';
export var MoveContentStatus;
(function (MoveContentStatus) {
    MoveContentStatus["SAME_VERSION_IN_BOTH"] = "SAME_VERSION_IN_BOTH";
    MoveContentStatus["HIGHER_VERSION_IN_DESTINATION"] = "HIGHER_VERSION_IN_DESTINATION";
    MoveContentStatus["LOWER_VERSION_IN_DESTINATION"] = "LOWER_VERSION_IN_DESTINATION";
})(MoveContentStatus || (MoveContentStatus = {}));
var TransferContentHandler = /** @class */ (function () {
    function TransferContentHandler(sdkConfig, fileService, dbService, eventsBusService, deviceInfo) {
        this.sdkConfig = sdkConfig;
        this.fileService = fileService;
        this.dbService = dbService;
        this.eventsBusService = eventsBusService;
        this.deviceInfo = deviceInfo;
        this.context = {};
    }
    TransferContentHandler.prototype.transfer = function (_a) {
        var _this = this;
        var contentIds = _a.contentIds, existingContentAction = _a.existingContentAction, deleteDestination = _a.deleteDestination, destinationFolder = _a.destinationFolder, shouldMergeInDestination = _a.shouldMergeInDestination, sourceFolder = _a.sourceFolder;
        this.context.hasTransferCancelled = false;
        this.context.shouldMergeInDestination = shouldMergeInDestination;
        this.context.contentIds = contentIds;
        this.context.existingContentAction = existingContentAction;
        this.context.deleteDestination = deleteDestination;
        this.context.destinationFolder = destinationFolder;
        this.context.sourceFolder = sourceFolder;
        return new ValidateDestinationFolder(this.fileService).execute(this.context).pipe(mergeMap(function (transferContext) {
            return new DeleteDestinationFolder().execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new DeviceMemoryCheck(_this.dbService).execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new ValidateDestinationContent(_this.fileService, _this.sdkConfig.appConfig).execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new DuplicateContentCheck(_this.dbService, _this.fileService).execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new CopyContentFromSourceToDestination(_this.eventsBusService).execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new DeleteSourceFolder(_this.eventsBusService).execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new UpdateSourceContentPathInDb(_this.dbService).execute(transferContext);
        }), mergeMap(function (transferContext) {
            return new StoreDestinationContentInDb(_this.sdkConfig.appConfig, _this.fileService, _this.dbService, _this.deviceInfo).execute(transferContext);
        })).pipe(tap(function () {
            _this.eventsBusService.emit({
                namespace: EventNamespace.STORAGE,
                event: {
                    type: StorageEventType.TRANSFER_COMPLETED
                }
            });
        }), mapTo(undefined), catchError(function (e) {
            if (e instanceof CancellationError) {
                _this.eventsBusService.emit({
                    namespace: EventNamespace.STORAGE,
                    event: {
                        type: StorageEventType.TRANSFER_REVERT_COMPLETED
                    }
                });
            }
            else if (e instanceof DuplicateContentError) {
                _this.eventsBusService.emit({
                    namespace: EventNamespace.STORAGE,
                    event: {
                        type: StorageEventType.TRANSFER_FAILED_DUPLICATE_CONTENT
                    }
                });
            }
            else if (e instanceof LowMemoryError) {
                _this.eventsBusService.emit({
                    namespace: EventNamespace.STORAGE,
                    event: {
                        type: StorageEventType.TRANSFER_FAILED_LOW_MEMORY
                    }
                });
            }
            console.error('Error', e);
            return throwError(e);
        }));
    };
    TransferContentHandler.prototype.cancel = function () {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.context.hasTransferCancelled = true;
                return [2 /*return*/];
            });
        }); }).pipe(mapTo(undefined));
    };
    return TransferContentHandler;
}());
export { TransferContentHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXItY29udGVudC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3JhZ2UvaGFuZGxlci90cmFuc2Zlci1jb250ZW50LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUVILGdCQUFnQixFQUtuQixNQUFNLElBQUksQ0FBQztBQUVaLE9BQU8sRUFBQyxjQUFjLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFDLGtDQUFrQyxFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDdEcsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFNdkYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBQyxLQUFLLEVBQWMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQUUsS0FB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WUFBWSxjQUFjLEVBQUU7Z0JBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxjQUFjLENBQUMsT0FBTztvQkFDakMsS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRSxnQkFBZ0IsQ0FBQywwQkFBMEI7cUJBQ2xCO2lCQUN0QyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTFCLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUFBLGlCQU1DO1FBTEcsT0FBTyxLQUFLLENBQUM7O2dCQUNULElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDOzs7YUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FDSCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQ25CLENBQUM7SUFDTixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBaEdELElBZ0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBFeGlzdGluZ0NvbnRlbnRBY3Rpb24sXG4gICAgU3RvcmFnZUV2ZW50VHlwZSxcbiAgICBTdG9yYWdlVHJhbnNmZXJDb21wbGV0ZWQsXG4gICAgU3RvcmFnZVRyYW5zZmVyRmFpbGVkRHVwbGljYXRlQ29udGVudCwgU3RvcmFnZVRyYW5zZmVyRmFpbGVkTG93TWVtb3J5LFxuICAgIFN0b3JhZ2VUcmFuc2ZlclJldmVydENvbXBsZXRlZCxcbiAgICBUcmFuc2ZlckNvbnRlbnRzUmVxdWVzdFxufSBmcm9tICcuLic7XG5pbXBvcnQge0NvbnRlbnR9IGZyb20gJy4uLy4uL2NvbnRlbnQnO1xuaW1wb3J0IHtFdmVudE5hbWVzcGFjZSwgRXZlbnRzQnVzU2VydmljZX0gZnJvbSAnLi4vLi4vZXZlbnRzLWJ1cyc7XG5pbXBvcnQge0RldmljZU1lbW9yeUNoZWNrfSBmcm9tICcuL3RyYW5zZmVyL2RldmljZS1tZW1vcnktY2hlY2snO1xuaW1wb3J0IHtWYWxpZGF0ZURlc3RpbmF0aW9uQ29udGVudH0gZnJvbSAnLi90cmFuc2Zlci92YWxpZGF0ZS1kZXN0aW5hdGlvbi1jb250ZW50JztcbmltcG9ydCB7RGVsZXRlRGVzdGluYXRpb25Gb2xkZXJ9IGZyb20gJy4vdHJhbnNmZXIvZGVsZXRlLWRlc3RpbmF0aW9uLWZvbGRlcic7XG5pbXBvcnQge0R1cGxpY2F0ZUNvbnRlbnRDaGVja30gZnJvbSAnLi90cmFuc2Zlci9kdXBsaWNhdGUtY29udGVudC1jaGVjayc7XG5pbXBvcnQge0NvcHlDb250ZW50RnJvbVNvdXJjZVRvRGVzdGluYXRpb259IGZyb20gJy4vdHJhbnNmZXIvY29weS1jb250ZW50LWZyb20tc291cmNlLXRvLWRlc3RpbmF0aW9uJztcbmltcG9ydCB7VXBkYXRlU291cmNlQ29udGVudFBhdGhJbkRifSBmcm9tICcuL3RyYW5zZmVyL3VwZGF0ZS1zb3VyY2UtY29udGVudC1wYXRoLWluLWRiJztcbmltcG9ydCB7U3RvcmVEZXN0aW5hdGlvbkNvbnRlbnRJbkRifSBmcm9tICcuL3RyYW5zZmVyL3N0b3JlLWRlc3RpbmF0aW9uLWNvbnRlbnQtaW4tZGInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7VmFsaWRhdGVEZXN0aW5hdGlvbkZvbGRlcn0gZnJvbSAnLi90cmFuc2Zlci92YWxpZGF0ZS1kZXN0aW5hdGlvbi1mb2xkZXInO1xuaW1wb3J0IHtEZWxldGVTb3VyY2VGb2xkZXJ9IGZyb20gJy4vdHJhbnNmZXIvZGVsZXRlLXNvdXJjZS1mb2xkZXInO1xuaW1wb3J0IHtDYW5jZWxsYXRpb25FcnJvcn0gZnJvbSAnLi4vZXJyb3JzL2NhbmNlbGxhdGlvbi1lcnJvcic7XG5pbXBvcnQge0R1cGxpY2F0ZUNvbnRlbnRFcnJvcn0gZnJvbSAnLi4vZXJyb3JzL2R1cGxpY2F0ZS1jb250ZW50LWVycm9yJztcbmltcG9ydCB7TG93TWVtb3J5RXJyb3J9IGZyb20gJy4uL2Vycm9ycy9sb3ctbWVtb3J5LWVycm9yJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGUsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXBUbywgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgZW51bSBNb3ZlQ29udGVudFN0YXR1cyB7XG4gICAgU0FNRV9WRVJTSU9OX0lOX0JPVEggPSAnU0FNRV9WRVJTSU9OX0lOX0JPVEgnLFxuICAgIEhJR0hFUl9WRVJTSU9OX0lOX0RFU1RJTkFUSU9OID0gJ0hJR0hFUl9WRVJTSU9OX0lOX0RFU1RJTkFUSU9OJyxcbiAgICBMT1dFUl9WRVJTSU9OX0lOX0RFU1RJTkFUSU9OID0gJ0xPV0VSX1ZFUlNJT05fSU5fREVTVElOQVRJT04nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW92ZUNvbnRlbnRSZXNwb25zZSB7XG4gICAgaWRlbnRpZmllcjogc3RyaW5nO1xuICAgIHN0YXR1czogTW92ZUNvbnRlbnRTdGF0dXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNmZXJDb250ZW50Q29udGV4dCB7XG4gICAgY29udGVudElkcz86IHN0cmluZ1tdO1xuICAgIHZhbGlkQ29udGVudElkc0luRGVzdGluYXRpb24/OiBzdHJpbmdbXTtcbiAgICBkZXN0aW5hdGlvbkZvbGRlcj86IHN0cmluZztcbiAgICBzb3VyY2VGb2xkZXI/OiBzdHJpbmc7XG4gICAgY29udGVudHNJblNvdXJjZT86IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXTtcbiAgICBjb250ZW50c0luRGVzdGluYXRpb24/OiBDb250ZW50W107XG4gICAgZXhpc3RpbmdDb250ZW50QWN0aW9uPzogRXhpc3RpbmdDb250ZW50QWN0aW9uO1xuICAgIGR1cGxpY2F0ZUNvbnRlbnRzPzogTW92ZUNvbnRlbnRSZXNwb25zZVtdO1xuICAgIGRlbGV0ZURlc3RpbmF0aW9uPzogYm9vbGVhbjtcbiAgICBoYXNUcmFuc2ZlckNhbmNlbGxlZD86IGJvb2xlYW47XG4gICAgc2hvdWxkTWVyZ2VJbkRlc3RpbmF0aW9uPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYW5pZmVzdCB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGFyY2hpdmU6IHtcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHN0YXR1czogc3RyaW5nXG4gICAgICAgICAgICBleHBpcmVzOiBzdHJpbmdcbiAgICAgICAgfVtdO1xuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2ZlckNvbnRlbnRIYW5kbGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBldmVudHNCdXNTZXJ2aWNlOiBFdmVudHNCdXNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRldmljZUluZm86IERldmljZUluZm9cbiAgICApIHtcbiAgICB9XG5cbiAgICB0cmFuc2Zlcih7Y29udGVudElkcywgZXhpc3RpbmdDb250ZW50QWN0aW9uLCBkZWxldGVEZXN0aW5hdGlvbiwgZGVzdGluYXRpb25Gb2xkZXIsIHNob3VsZE1lcmdlSW5EZXN0aW5hdGlvbiwgc291cmNlRm9sZGVyfTpcbiAgICAgICAgICAgICAgICAgVHJhbnNmZXJDb250ZW50c1JlcXVlc3QpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICB0aGlzLmNvbnRleHQuaGFzVHJhbnNmZXJDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNob3VsZE1lcmdlSW5EZXN0aW5hdGlvbiA9IHNob3VsZE1lcmdlSW5EZXN0aW5hdGlvbjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNvbnRlbnRJZHMgPSBjb250ZW50SWRzO1xuICAgICAgICB0aGlzLmNvbnRleHQuZXhpc3RpbmdDb250ZW50QWN0aW9uID0gZXhpc3RpbmdDb250ZW50QWN0aW9uO1xuICAgICAgICB0aGlzLmNvbnRleHQuZGVsZXRlRGVzdGluYXRpb24gPSBkZWxldGVEZXN0aW5hdGlvbjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyID0gZGVzdGluYXRpb25Gb2xkZXI7XG4gICAgICAgIHRoaXMuY29udGV4dC5zb3VyY2VGb2xkZXIgPSBzb3VyY2VGb2xkZXI7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0ZURlc3RpbmF0aW9uRm9sZGVyKHRoaXMuZmlsZVNlcnZpY2UpLmV4ZWN1dGUodGhpcy5jb250ZXh0KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHRyYW5zZmVyQ29udGV4dDogVHJhbnNmZXJDb250ZW50Q29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGVsZXRlRGVzdGluYXRpb25Gb2xkZXIoKS5leGVjdXRlKHRyYW5zZmVyQ29udGV4dCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCh0cmFuc2ZlckNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERldmljZU1lbW9yeUNoZWNrKHRoaXMuZGJTZXJ2aWNlKS5leGVjdXRlKHRyYW5zZmVyQ29udGV4dCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCh0cmFuc2ZlckNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRlRGVzdGluYXRpb25Db250ZW50KHRoaXMuZmlsZVNlcnZpY2UsIHRoaXMuc2RrQ29uZmlnLmFwcENvbmZpZykuZXhlY3V0ZSh0cmFuc2ZlckNvbnRleHQpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgodHJhbnNmZXJDb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEdXBsaWNhdGVDb250ZW50Q2hlY2sodGhpcy5kYlNlcnZpY2UsIHRoaXMuZmlsZVNlcnZpY2UpLmV4ZWN1dGUodHJhbnNmZXJDb250ZXh0KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHRyYW5zZmVyQ29udGV4dDogVHJhbnNmZXJDb250ZW50Q29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29weUNvbnRlbnRGcm9tU291cmNlVG9EZXN0aW5hdGlvbih0aGlzLmV2ZW50c0J1c1NlcnZpY2UpLmV4ZWN1dGUodHJhbnNmZXJDb250ZXh0KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHRyYW5zZmVyQ29udGV4dDogVHJhbnNmZXJDb250ZW50Q29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGVsZXRlU291cmNlRm9sZGVyKHRoaXMuZXZlbnRzQnVzU2VydmljZSkuZXhlY3V0ZSh0cmFuc2ZlckNvbnRleHQpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgodHJhbnNmZXJDb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVcGRhdGVTb3VyY2VDb250ZW50UGF0aEluRGIodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUodHJhbnNmZXJDb250ZXh0KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHRyYW5zZmVyQ29udGV4dDogVHJhbnNmZXJDb250ZW50Q29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU3RvcmVEZXN0aW5hdGlvbkNvbnRlbnRJbkRiKHRoaXMuc2RrQ29uZmlnLmFwcENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZSwgdGhpcy5kYlNlcnZpY2UsIHRoaXMuZGV2aWNlSW5mbykuZXhlY3V0ZSh0cmFuc2ZlckNvbnRleHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuU1RPUkFHRSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGUuVFJBTlNGRVJfQ09NUExFVEVEXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgU3RvcmFnZVRyYW5zZmVyQ29tcGxldGVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBDYW5jZWxsYXRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLlNUT1JBR0UsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGUuVFJBTlNGRVJfUkVWRVJUX0NPTVBMRVRFRFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBTdG9yYWdlVHJhbnNmZXJSZXZlcnRDb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlIGluc3RhbmNlb2YgRHVwbGljYXRlQ29udGVudEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzQnVzU2VydmljZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuU1RPUkFHRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogU3RvcmFnZUV2ZW50VHlwZS5UUkFOU0ZFUl9GQUlMRURfRFVQTElDQVRFX0NPTlRFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgU3RvcmFnZVRyYW5zZmVyRmFpbGVkRHVwbGljYXRlQ29udGVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBMb3dNZW1vcnlFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLlNUT1JBR0UsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGUuVFJBTlNGRVJfRkFJTEVEX0xPV19NRU1PUllcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgU3RvcmFnZVRyYW5zZmVyRmFpbGVkTG93TWVtb3J5XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yJywgZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuaGFzVHJhbnNmZXJDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==