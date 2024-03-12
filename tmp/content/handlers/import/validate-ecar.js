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
import { ContentErrorCode, ContentImportStatus, FileName, Visibility } from '../..';
import { Response } from '../../../api';
import { ContentUtil } from '../../util/content-util';
import { ContentEntry } from '../../db/schema';
import { ArrayUtil } from '../../../util/array-util';
import { HierarchyManifestConversion } from './hierarchy-manifest-conversion';
var ValidateEcar = /** @class */ (function () {
    function ValidateEcar(fileService, dbService, appConfig, getContentDetailsHandler) {
        this.fileService = fileService;
        this.dbService = dbService;
        this.appConfig = appConfig;
        this.getContentDetailsHandler = getContentDetailsHandler;
    }
    ValidateEcar.prototype.execute = function (importContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, newData, _a, manifestJson, archive, items, contentIds, _i, items_1, e, item, identifier, query, existingContentModels, result, isRootExists, _b, items_2, e, item, identifier, visibility, status_1, isDraftContent, existingContentModel, existingContentPath, refCount, existingContentData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = new Response();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.fileService.readAsText(importContext.tmpLocation, FileName.HIERARCHY.valueOf())];
                    case 2:
                        data = _c.sent();
                        if (data) {
                            newData = JSON.parse(data);
                            newData['archive'] = new HierarchyManifestConversion().hierarchyToManifestConversion(newData.content);
                            delete newData.content;
                            data = JSON.stringify(newData);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _c.sent();
                        return [4 /*yield*/, this.fileService.readAsText(importContext.tmpLocation, FileName.MANIFEST.valueOf())];
                    case 4:
                        data = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (!!data) return [3 /*break*/, 7];
                        response.errorMesg = ContentErrorCode.IMPORT_FAILED_MANIFEST_FILE_NOT_FOUND.valueOf();
                        return [4 /*yield*/, this.fileService.removeRecursively(importContext.tmpLocation)];
                    case 6:
                        _c.sent();
                        throw response;
                    case 7:
                        manifestJson = JSON.parse(data);
                        if (!(manifestJson.ver === 1.0)) return [3 /*break*/, 9];
                        response.errorMesg = ContentErrorCode.IMPORT_FAILED_UNSUPPORTED_MANIFEST.valueOf();
                        return [4 /*yield*/, this.fileService.removeRecursively(importContext.tmpLocation)];
                    case 8:
                        _c.sent();
                        throw response;
                    case 9:
                        archive = manifestJson.archive;
                        if (!!archive.items) return [3 /*break*/, 11];
                        response.errorMesg = ContentErrorCode.IMPORT_FAILED_NO_CONTENT_METADATA.valueOf();
                        return [4 /*yield*/, this.fileService.removeRecursively(importContext.tmpLocation)];
                    case 10:
                        _c.sent();
                        throw response;
                    case 11:
                        importContext.manifestVersion = manifestJson.ver;
                        importContext.items = [];
                        items = archive.items;
                        contentIds = [];
                        // TODO: Following loop can be replaced with childNodes of root content.
                        for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                            e = items_1[_i];
                            item = e;
                            identifier = item.identifier;
                            contentIds.push(identifier);
                        }
                        query = ArrayUtil.joinPreservingQuotes(contentIds);
                        return [4 /*yield*/, this.getContentDetailsHandler.fetchFromDBForAll(query).toPromise()];
                    case 12:
                        existingContentModels = _c.sent();
                        result = existingContentModels.reduce(function (map, obj) {
                            map[obj.identifier] = obj;
                            return map;
                        }, {});
                        isRootExists = false;
                        importContext.existedContentIdentifiers = {};
                        for (_b = 0, items_2 = items; _b < items_2.length; _b++) {
                            e = items_2[_b];
                            item = e;
                            identifier = item.identifier;
                            visibility = ContentUtil.readVisibility(item);
                            status_1 = item.status;
                            isDraftContent = ContentUtil.isDraftContent(status_1);
                            // Draft content expiry .To prevent import of draft content if the expires date is lesser than from the current date.
                            if (isDraftContent && ContentUtil.isExpired(item.expires)) {
                                this.skipContent(importContext, identifier, visibility, ContentImportStatus.CONTENT_EXPIRED, items);
                                continue;
                            }
                            // If more than 1 root content is bundled in ecar then initialize the isRootExists to false.
                            if (visibility === Visibility.DEFAULT.valueOf()) {
                                isRootExists = false;
                            }
                            existingContentModel = result[identifier];
                            existingContentPath = void 0;
                            if (existingContentModel) {
                                refCount = existingContentModel[ContentEntry.COLUMN_NAME_REF_COUNT];
                                existingContentPath = existingContentModel[ContentEntry.COLUMN_NAME_PATH];
                                // If more than 1 root content is bundled in ecar then initialize the isRootExists to false.
                                if (existingContentPath
                                    && visibility === Visibility.DEFAULT.valueOf() // Check only for root nodes
                                    && refCount && refCount > 0) { // refCount = 0 means that content was imported and then deleted from the device,
                                    // which will consider as not imported if its equals to zero.
                                    isRootExists = true;
                                    existingContentData = JSON.parse(existingContentModel[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                                    if (existingContentData
                                        && item.pkgVersion > existingContentData.pkgVersion
                                        && existingContentData.childNodes && existingContentData.childNodes.length > 0) {
                                        importContext.contentIdsToDelete = new Set(existingContentData.childNodes);
                                    }
                                }
                            }
                            // To check whether the file is already imported or not
                            if (existingContentPath // Check if path of old content is not empty.
                                && visibility === Visibility.DEFAULT.valueOf() // If visibility is Parent then invoke ExtractPayloads
                                && !ContentUtil.isDuplicateCheckRequired(isDraftContent, item.pkgVersion) // Check if its draft and pkgVersion is 0.
                                && ContentUtil.isImportFileExist(existingContentModel, item) // Check whether the file is already imported or not.
                            ) {
                                importContext.rootIdentifier = identifier;
                                this.skipContent(importContext, identifier, visibility, ContentImportStatus.ALREADY_EXIST, items);
                                continue;
                            }
                            if (isRootExists
                                // If new content is added in the updated version then do not add in existedContentIdentifiers
                                && importContext.contentIdsToDelete.delete(identifier)) {
                                importContext.existedContentIdentifiers[identifier] = true;
                            }
                            importContext.items.push(item);
                        }
                        response.body = importContext;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Skip the content.
     */
    ValidateEcar.prototype.skipContent = function (importContext, identifier, visibility, contentImportStatus, items) {
        if (visibility === Visibility.DEFAULT) {
            if (contentImportStatus === ContentImportStatus.ALREADY_EXIST) {
                if (items && items.length === 1) {
                    importContext.contentImportResponseList.push({ identifier: identifier, status: contentImportStatus });
                }
            }
            else {
                importContext.contentImportResponseList.push({ identifier: identifier, status: contentImportStatus });
            }
        }
        importContext.skippedItemsIdentifier.push(identifier);
    };
    return ValidateEcar;
}());
export { ValidateEcar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZWNhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2ltcG9ydC92YWxpZGF0ZS1lY2FyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBYyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQXdCLFVBQVUsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUNySCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUlwRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTlFO0lBRUksc0JBQW9CLFdBQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLFNBQW9CLEVBQ3BCLHdCQUFrRDtRQUhsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUN0RSxDQUFDO0lBRVksOEJBQU8sR0FBcEIsVUFBcUIsYUFBbUM7Ozs7Ozt3QkFDOUMsUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7Ozs7d0JBRy9CLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFZLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFBOzt3QkFBbEcsSUFBSSxHQUFHLFNBQTJGLENBQUM7d0JBRW5HLElBQUcsSUFBSSxFQUFDOzRCQUNFLE9BQU8sR0FB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NkJBQzlEOzRCQUVELGFBQWEsQ0FBQyxLQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNuQzt3QkFFRCxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDOUIsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ25CO0lBRUQ7O09BRUc7SUFDSyxrQ0FBVyxHQUFuQixVQUFvQixhQUFtQyxFQUFFLFVBQWtCLEVBQUUsVUFBa0IsRUFDM0UsbUJBQXdDLEVBQUUsS0FBSztRQUMvRCxJQUFJLFVBQVUsS0FBSyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQ25DLElBQUksbUJBQW1CLEtBQUssbUJBQW1CLENBQUMsYUFBYSxFQUFFO2dCQUMzRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDN0IsYUFBYSxDQUFDLHlCQUEwQixDQUFDLElBQUksQ0FBQyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFDLENBQUMsQ0FBQztpQkFDeEc7YUFDSjtpQkFBTTtnQkFDSCxhQUFhLENBQUMseUJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO2FBQ3hHO1NBQ0o7UUFDRCxhQUFhLENBQUMsc0JBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFsSkQsSUFrSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRlbnREYXRhLCBDb250ZW50RXJyb3JDb2RlLCBDb250ZW50SW1wb3J0U3RhdHVzLCBGaWxlTmFtZSwgSW1wb3J0Q29udGVudENvbnRleHQsIFZpc2liaWxpdHl9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi8uLi91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vLi4vLi4vYXBpL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0dldENvbnRlbnREZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi4vZ2V0LWNvbnRlbnQtZGV0YWlscy1oYW5kbGVyJztcbmltcG9ydCB7Q29udGVudEVudHJ5fSBmcm9tICcuLi8uLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQgeyBIaWVyYXJjaHlNYW5pZmVzdENvbnZlcnNpb24gfSBmcm9tICcuL2hpZXJhcmNoeS1tYW5pZmVzdC1jb252ZXJzaW9uJztcblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlRWNhciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnZXRDb250ZW50RGV0YWlsc0hhbmRsZXI6IEdldENvbnRlbnREZXRhaWxzSGFuZGxlcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKGltcG9ydENvbnRleHQ6IEltcG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGRhdGEgPSBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLnJlYWRBc1RleHQoaW1wb3J0Q29udGV4dC50bXBMb2NhdGlvbiEsIEZpbGVOYW1lLkhJRVJBUkNIWS52YWx1ZU9mKCkpO1xuXG4gICAgICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICBuZXdEYXRhWydhcmNoaXZlJ10gPSBuZXcgSGllcmFyY2h5TWFuaWZlc3RDb252ZXJzaW9uKCkuaGllcmFyY2h5VG9NYW5pZmVzdENvbnZlcnNpb24obmV3RGF0YS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV3RGF0YS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBkYXRhID0gYXdhaXQgdGhpcy5maWxlU2VydmljZS5yZWFkQXNUZXh0KGltcG9ydENvbnRleHQudG1wTG9jYXRpb24hLCBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXNwb25zZS5lcnJvck1lc2cgPSBDb250ZW50RXJyb3JDb2RlLklNUE9SVF9GQUlMRURfTUFOSUZFU1RfRklMRV9OT1RfRk9VTkQudmFsdWVPZigpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5maWxlU2VydmljZS5yZW1vdmVSZWN1cnNpdmVseShpbXBvcnRDb250ZXh0LnRtcExvY2F0aW9uISk7XG4gICAgICAgICAgICB0aHJvdyByZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0SnNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgaWYgKG1hbmlmZXN0SnNvbi52ZXIgPT09IDEuMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3JNZXNnID0gQ29udGVudEVycm9yQ29kZS5JTVBPUlRfRkFJTEVEX1VOU1VQUE9SVEVEX01BTklGRVNULnZhbHVlT2YoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UucmVtb3ZlUmVjdXJzaXZlbHkoaW1wb3J0Q29udGV4dC50bXBMb2NhdGlvbiEpO1xuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJjaGl2ZSA9IG1hbmlmZXN0SnNvbi5hcmNoaXZlO1xuICAgICAgICBpZiAoIWFyY2hpdmUuaXRlbXMpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yTWVzZyA9IENvbnRlbnRFcnJvckNvZGUuSU1QT1JUX0ZBSUxFRF9OT19DT05URU5UX01FVEFEQVRBLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UucmVtb3ZlUmVjdXJzaXZlbHkoaW1wb3J0Q29udGV4dC50bXBMb2NhdGlvbiEpO1xuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpbXBvcnRDb250ZXh0Lm1hbmlmZXN0VmVyc2lvbiA9IG1hbmlmZXN0SnNvbi52ZXI7XG4gICAgICAgIGltcG9ydENvbnRleHQuaXRlbXMgPSBbXTtcblxuICAgICAgICBjb25zdCBpdGVtcyA9IGFyY2hpdmUuaXRlbXM7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIC8vIFRPRE86IEZvbGxvd2luZyBsb29wIGNhbiBiZSByZXBsYWNlZCB3aXRoIGNoaWxkTm9kZXMgb2Ygcm9vdCBjb250ZW50LlxuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBpdGVtLmlkZW50aWZpZXI7XG4gICAgICAgICAgICBjb250ZW50SWRzLnB1c2goaWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVlcnkgPSBBcnJheVV0aWwuam9pblByZXNlcnZpbmdRdW90ZXMoY29udGVudElkcyk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQ29udGVudE1vZGVscyA9IGF3YWl0IHRoaXMuZ2V0Q29udGVudERldGFpbHNIYW5kbGVyLmZldGNoRnJvbURCRm9yQWxsKHF1ZXJ5KS50b1Byb21pc2UoKTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBleGlzdGluZ0NvbnRlbnRNb2RlbHMucmVkdWNlKChtYXAsIG9iaikgPT4ge1xuICAgICAgICAgICAgbWFwW29iai5pZGVudGlmaWVyXSA9IG9iajtcbiAgICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICBsZXQgaXNSb290RXhpc3RzID0gZmFsc2U7XG4gICAgICAgIGltcG9ydENvbnRleHQuZXhpc3RlZENvbnRlbnRJZGVudGlmaWVycyA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgZSBvZiBpdGVtcykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGUgYXMgYW55O1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IGl0ZW0uaWRlbnRpZmllcjtcbiAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBDb250ZW50VXRpbC5yZWFkVmlzaWJpbGl0eShpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGl0ZW0uc3RhdHVzO1xuICAgICAgICAgICAgY29uc3QgaXNEcmFmdENvbnRlbnQ6IGJvb2xlYW4gPSBDb250ZW50VXRpbC5pc0RyYWZ0Q29udGVudChzdGF0dXMpO1xuICAgICAgICAgICAgLy8gRHJhZnQgY29udGVudCBleHBpcnkgLlRvIHByZXZlbnQgaW1wb3J0IG9mIGRyYWZ0IGNvbnRlbnQgaWYgdGhlIGV4cGlyZXMgZGF0ZSBpcyBsZXNzZXIgdGhhbiBmcm9tIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICAgICAgICBpZiAoaXNEcmFmdENvbnRlbnQgJiYgQ29udGVudFV0aWwuaXNFeHBpcmVkKGl0ZW0uZXhwaXJlcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBDb250ZW50KGltcG9ydENvbnRleHQsIGlkZW50aWZpZXIsIHZpc2liaWxpdHksIENvbnRlbnRJbXBvcnRTdGF0dXMuQ09OVEVOVF9FWFBJUkVELCBpdGVtcyk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG1vcmUgdGhhbiAxIHJvb3QgY29udGVudCBpcyBidW5kbGVkIGluIGVjYXIgdGhlbiBpbml0aWFsaXplIHRoZSBpc1Jvb3RFeGlzdHMgdG8gZmFsc2UuXG4gICAgICAgICAgICBpZiAodmlzaWJpbGl0eSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgIGlzUm9vdEV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnRNb2RlbDogQ29udGVudEVudHJ5LlNjaGVtYU1hcCA9IHJlc3VsdFtpZGVudGlmaWVyXTtcbiAgICAgICAgICAgIGxldCBleGlzdGluZ0NvbnRlbnRQYXRoO1xuXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50TW9kZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZDb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gZXhpc3RpbmdDb250ZW50TW9kZWxbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVF07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdDb250ZW50UGF0aCA9IGV4aXN0aW5nQ29udGVudE1vZGVsW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QQVRIXTtcblxuICAgICAgICAgICAgICAgIC8vIElmIG1vcmUgdGhhbiAxIHJvb3QgY29udGVudCBpcyBidW5kbGVkIGluIGVjYXIgdGhlbiBpbml0aWFsaXplIHRoZSBpc1Jvb3RFeGlzdHMgdG8gZmFsc2UuXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nQ29udGVudFBhdGhcbiAgICAgICAgICAgICAgICAgICAgJiYgdmlzaWJpbGl0eSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSAgLy8gQ2hlY2sgb25seSBmb3Igcm9vdCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAmJiByZWZDb3VudCAmJiByZWZDb3VudCA+IDApIHsgIC8vIHJlZkNvdW50ID0gMCBtZWFucyB0aGF0IGNvbnRlbnQgd2FzIGltcG9ydGVkIGFuZCB0aGVuIGRlbGV0ZWQgZnJvbSB0aGUgZGV2aWNlLFxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB3aWxsIGNvbnNpZGVyIGFzIG5vdCBpbXBvcnRlZCBpZiBpdHMgZXF1YWxzIHRvIHplcm8uXG4gICAgICAgICAgICAgICAgICAgIGlzUm9vdEV4aXN0cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDb250ZW50RGF0YTogQ29udGVudERhdGEgPSBKU09OLnBhcnNlKGV4aXN0aW5nQ29udGVudE1vZGVsW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0NvbnRlbnREYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBpdGVtLnBrZ1ZlcnNpb24gPiBleGlzdGluZ0NvbnRlbnREYXRhLnBrZ1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGV4aXN0aW5nQ29udGVudERhdGEuY2hpbGROb2RlcyAmJiBleGlzdGluZ0NvbnRlbnREYXRhLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0Q29udGV4dC5jb250ZW50SWRzVG9EZWxldGUgPSBuZXcgU2V0KGV4aXN0aW5nQ29udGVudERhdGEuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRvIGNoZWNrIHdoZXRoZXIgdGhlIGZpbGUgaXMgYWxyZWFkeSBpbXBvcnRlZCBvciBub3RcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0NvbnRlbnRQYXRoICAgICAvLyBDaGVjayBpZiBwYXRoIG9mIG9sZCBjb250ZW50IGlzIG5vdCBlbXB0eS5cbiAgICAgICAgICAgICAgICAmJiB2aXNpYmlsaXR5ID09PSBWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpIC8vIElmIHZpc2liaWxpdHkgaXMgUGFyZW50IHRoZW4gaW52b2tlIEV4dHJhY3RQYXlsb2Fkc1xuICAgICAgICAgICAgICAgICYmICFDb250ZW50VXRpbC5pc0R1cGxpY2F0ZUNoZWNrUmVxdWlyZWQoaXNEcmFmdENvbnRlbnQsIGl0ZW0ucGtnVmVyc2lvbikgLy8gQ2hlY2sgaWYgaXRzIGRyYWZ0IGFuZCBwa2dWZXJzaW9uIGlzIDAuXG4gICAgICAgICAgICAgICAgJiYgQ29udGVudFV0aWwuaXNJbXBvcnRGaWxlRXhpc3QoZXhpc3RpbmdDb250ZW50TW9kZWwsIGl0ZW0pIC8vIENoZWNrIHdoZXRoZXIgdGhlIGZpbGUgaXMgYWxyZWFkeSBpbXBvcnRlZCBvciBub3QuXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpbXBvcnRDb250ZXh0LnJvb3RJZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBDb250ZW50KGltcG9ydENvbnRleHQsIGlkZW50aWZpZXIsIHZpc2liaWxpdHksIENvbnRlbnRJbXBvcnRTdGF0dXMuQUxSRUFEWV9FWElTVCwgaXRlbXMpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNSb290RXhpc3RzXG4gICAgICAgICAgICAgICAgLy8gSWYgbmV3IGNvbnRlbnQgaXMgYWRkZWQgaW4gdGhlIHVwZGF0ZWQgdmVyc2lvbiB0aGVuIGRvIG5vdCBhZGQgaW4gZXhpc3RlZENvbnRlbnRJZGVudGlmaWVyc1xuICAgICAgICAgICAgICAgICYmIGltcG9ydENvbnRleHQuY29udGVudElkc1RvRGVsZXRlLmRlbGV0ZShpZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgICAgIGltcG9ydENvbnRleHQuZXhpc3RlZENvbnRlbnRJZGVudGlmaWVyc1tpZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGltcG9ydENvbnRleHQuaXRlbXMhLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZS5ib2R5ID0gaW1wb3J0Q29udGV4dDtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNraXAgdGhlIGNvbnRlbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBza2lwQ29udGVudChpbXBvcnRDb250ZXh0OiBJbXBvcnRDb250ZW50Q29udGV4dCwgaWRlbnRpZmllcjogc3RyaW5nLCB2aXNpYmlsaXR5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SW1wb3J0U3RhdHVzOiBDb250ZW50SW1wb3J0U3RhdHVzLCBpdGVtcykge1xuICAgICAgICBpZiAodmlzaWJpbGl0eSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxUKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudEltcG9ydFN0YXR1cyA9PT0gQ29udGVudEltcG9ydFN0YXR1cy5BTFJFQURZX0VYSVNUKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpbXBvcnRDb250ZXh0LmNvbnRlbnRJbXBvcnRSZXNwb25zZUxpc3QhLnB1c2goe2lkZW50aWZpZXI6IGlkZW50aWZpZXIsIHN0YXR1czogY29udGVudEltcG9ydFN0YXR1c30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW1wb3J0Q29udGV4dC5jb250ZW50SW1wb3J0UmVzcG9uc2VMaXN0IS5wdXNoKHtpZGVudGlmaWVyOiBpZGVudGlmaWVyLCBzdGF0dXM6IGNvbnRlbnRJbXBvcnRTdGF0dXN9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRDb250ZXh0LnNraXBwZWRJdGVtc0lkZW50aWZpZXIhLnB1c2goaWRlbnRpZmllcik7XG4gICAgfVxufVxuIl19