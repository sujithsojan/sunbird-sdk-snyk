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
import { ContentEntry } from '../db/schema';
import { ContentUtil } from '../util/content-util';
import { FileName, MimeType, State, Visibility } from '..';
import { ContentKeys } from '../../preference-keys';
import { ArrayUtil } from '../../util/array-util';
import { FileUtil } from '../../util/file/util/file-util';
import { map } from 'rxjs/operators';
var DeleteContentHandler = /** @class */ (function () {
    function DeleteContentHandler(dbService, fileService, sharedPreferences) {
        this.dbService = dbService;
        this.fileService = fileService;
        this.sharedPreferences = sharedPreferences;
        this.updateNewContentModels = [];
        this.fileMapList = [];
    }
    DeleteContentHandler.prototype.deleteAllChildren = function (row, isChildContent) {
        return __awaiter(this, void 0, void 0, function () {
            var isUpdateLastModifiedTime, manifestPath, metaDataList, _i, _a, e, newContentModel, identifier, size;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isUpdateLastModifiedTime = false;
                        manifestPath = ContentUtil.getBasePath(row[ContentEntry.COLUMN_NAME_PATH]);
                        return [4 /*yield*/, this.fileService.readAsText(manifestPath, FileName.MANIFEST.valueOf())
                                .then(function (fileContents) { return __awaiter(_this, void 0, void 0, function () {
                                var childContents, childIdentifiers, childContentsFromDb;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            childContents = JSON.parse(fileContents).archive.items;
                                            childContents.shift();
                                            childIdentifiers = [];
                                            childContents.forEach(function (element) {
                                                childIdentifiers.push(element.identifier);
                                            });
                                            return [4 /*yield*/, this.findAllContentsFromDbWithIdentifiers(childIdentifiers)];
                                        case 1:
                                            childContentsFromDb = _a.sent();
                                            childContentsFromDb.forEach(function (child) { return __awaiter(_this, void 0, void 0, function () {
                                                var path, contentRootPath;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.deleteOrUpdateContent(child, true, isChildContent)];
                                                        case 1:
                                                            _a.sent();
                                                            isUpdateLastModifiedTime = true;
                                                            path = child[ContentEntry.COLUMN_NAME_PATH];
                                                            if (path && isUpdateLastModifiedTime) {
                                                                contentRootPath = ContentUtil.getFirstPartOfThePathNameOnLastDelimiter(path);
                                                                if (contentRootPath) {
                                                                    try {
                                                                        // Update last modified time
                                                                        this.sharedPreferences.putString(ContentKeys.KEY_LAST_MODIFIED, new Date().getMilliseconds() + '').toPromise();
                                                                    }
                                                                    catch (e) {
                                                                        console.log('Error', e);
                                                                    }
                                                                }
                                                            }
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (err) {
                                console.log('fileread err', err);
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getMetaData(this.fileMapList)];
                    case 2:
                        metaDataList = _b.sent();
                        if (!this.updateNewContentModels.length) return [3 /*break*/, 7];
                        this.dbService.beginTransaction();
                        _i = 0, _a = this.updateNewContentModels;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        e = _a[_i];
                        newContentModel = e;
                        identifier = newContentModel[ContentEntry.COLUMN_NAME_IDENTIFIER];
                        size = 0;
                        if (metaDataList) {
                            size = metaDataList[identifier] ? metaDataList[identifier].size : 0;
                            // metaDataList[identifier].lastModifiedTime
                        }
                        newContentModel[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] = size;
                        return [4 /*yield*/, this.dbService.update({
                                table: ContentEntry.TABLE_NAME,
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                selectionArgs: [identifier],
                                modelJson: newContentModel
                            }).toPromise()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.dbService.endTransaction(true);
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DeleteContentHandler.prototype.deleteOrUpdateContent = function (contentInDb, isChildItems, isChildContent) {
        return __awaiter(this, void 0, void 0, function () {
            var refCount, contentState, visibility, mimeType, path, localData, localContentData, appIcon, itemSetPreviewUrl, fileMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refCount = contentInDb[ContentEntry.COLUMN_NAME_REF_COUNT];
                        visibility = contentInDb[ContentEntry.COLUMN_NAME_VISIBILITY];
                        mimeType = contentInDb[ContentEntry.COLUMN_NAME_MIME_TYPE];
                        path = contentInDb[ContentEntry.COLUMN_NAME_PATH];
                        if (isChildContent) {
                            // If visibility is Default it means this content was visible in my downloads.
                            // After deleting artifact for this content it should not visible as well so reduce the refCount also for this.
                            if (refCount > 1 && visibility === Visibility.DEFAULT.valueOf()) {
                                refCount = refCount - 1;
                                // Update visibility
                                visibility = Visibility.PARENT.valueOf();
                            }
                            // Update the contentState
                            // Do not update the content state if mimeType is "application/vnd.ekstep.content-collection"
                            if (mimeType === MimeType.COLLECTION) {
                                contentState = State.ARTIFACT_AVAILABLE.valueOf();
                            }
                            else {
                                contentState = State.ONLY_SPINE.valueOf();
                            }
                        }
                        else {
                            // TODO: This check should be before updating the existing refCount.
                            // Do not update the content state if mimeType is "application/vnd.ekstep.content-collection" and refCount is more than 1.
                            if (mimeType === MimeType.COLLECTION.valueOf() && refCount > 1) {
                                contentState = State.ARTIFACT_AVAILABLE.valueOf();
                            }
                            else if (refCount > 1 && isChildItems) {
                                // Visibility will remain Default only.
                                contentState = State.ARTIFACT_AVAILABLE.valueOf();
                            }
                            else {
                                // Set the visibility to Parent so that this content will not visible in My contents / Downloads section.
                                // Update visibility
                                if (visibility === Visibility.DEFAULT.valueOf()) {
                                    visibility = Visibility.PARENT.valueOf();
                                }
                                contentState = State.ONLY_SPINE.valueOf();
                            }
                            refCount = refCount - 1;
                        }
                        if (!path) return [3 /*break*/, 3];
                        if (contentState === State.ONLY_SPINE.valueOf()) {
                            localData = contentInDb[ContentEntry.COLUMN_NAME_LOCAL_DATA];
                            localContentData = localData && JSON.parse(localData);
                            appIcon = '';
                            itemSetPreviewUrl = '';
                            if (localData) {
                                appIcon = localContentData.appIcon ? FileUtil.getFileName(localContentData.appIcon) : '';
                                itemSetPreviewUrl = localContentData.itemSetPreviewUrl ? FileUtil.getFileName(localContentData.itemSetPreviewUrl) : '';
                            }
                            this.rm(ContentUtil.getBasePath(path), [appIcon, itemSetPreviewUrl].join(':'));
                        }
                        contentInDb[ContentEntry.COLUMN_NAME_VISIBILITY] = visibility;
                        contentInDb[ContentEntry.COLUMN_NAME_REF_COUNT] = ContentUtil.addOrUpdateRefCount(refCount);
                        contentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE] = contentState;
                        if (!!isChildItems) return [3 /*break*/, 2];
                        contentInDb[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] = 0;
                        return [4 /*yield*/, this.dbService.update({
                                table: ContentEntry.TABLE_NAME,
                                modelJson: contentInDb,
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " =?",
                                selectionArgs: [contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER]]
                            }).pipe(map(function (v) { return v > 0; })).toPromise()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        fileMap = {};
                        fileMap['identifier'] = contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER];
                        fileMap['path'] = ContentUtil.getBasePath(path);
                        this.fileMapList.push(fileMap);
                        this.updateNewContentModels.push(contentInDb);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeleteContentHandler.prototype.findAllContentsFromDbWithIdentifiers = function (identifiers) {
        var identifiersStr = ArrayUtil.joinPreservingQuotes(identifiers);
        var filter = " WHERE " + ContentEntry.COLUMN_NAME_IDENTIFIER + " IN (" + identifiersStr + ") AND " + ContentEntry.COLUMN_NAME_REF_COUNT + " > 0";
        var query = "SELECT * FROM " + ContentEntry.TABLE_NAME + " " + filter;
        return this.dbService.execute(query).toPromise();
    };
    /** @internal */
    DeleteContentHandler.prototype.rm = function (directoryPath, directoryToBeSkipped) {
        return new Promise(function (resolve, reject) {
            try {
                sbutility.rm(directoryPath, directoryToBeSkipped, function (status) {
                    resolve(status);
                }, function (err) {
                    console.error(err);
                    reject(false);
                });
            }
            catch (xc) {
                console.error(xc);
                reject(false);
            }
        });
    };
    // TODO: move this method to file-service
    DeleteContentHandler.prototype.getMetaData = function (fileMapList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.getMetaData(fileMapList, function (entry) {
                            resolve(entry);
                        }, function (err) {
                            console.error(err);
                            reject(err);
                        });
                    })];
            });
        });
    };
    return DeleteContentHandler;
}());
export { DeleteContentHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbnRlbnQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2RlbGV0ZS1jb250ZW50LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFjLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBQyxNQUFNLElBQUksQ0FBQztBQUd0RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckM7SUFLSSw4QkFBb0IsU0FBb0IsRUFDcEIsV0FBd0IsRUFDeEIsaUJBQW9DO1FBRnBDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUxoRCwyQkFBc0IsR0FBNkIsRUFBRSxDQUFDO1FBQ3RELGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztJQUtuRCxDQUFDO0lBRUssZ0RBQWlCLEdBQXZCLFVBQXdCLEdBQTJCLEVBQUUsY0FBdUI7Ozs7Ozs7d0JBQ3BFLHdCQUF3QixHQUFHLEtBQUssQ0FBQzt3QkFDL0IsWUFBWSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUM7d0JBQ2xGLHFCQUFNLElBQUksQ0FBQyxX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QUFDO2FBQ047WUFBQyxPQUFPLEVBQUUsRUFBRTtnQkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBeUM7SUFDM0IsMENBQVcsR0FBekIsVUFBMEIsV0FBa0I7OztnQkFDeEMsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDL0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQzdCLFVBQUMsS0FBSzs0QkFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLENBQUMsRUFBRSxVQUFBLEdBQUc7NEJBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFFTCwyQkFBQztBQUFELENBQUMsQUExTEQsSUEwTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge0NvbnRlbnREYXRhLCBGaWxlTmFtZSwgTWltZVR5cGUsIFN0YXRlLCBWaXNpYmlsaXR5fSBmcm9tICcuLic7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge0NvbnRlbnRLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge0ZpbGVVdGlsfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvdXRpbC9maWxlLXV0aWwnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlQ29udGVudEhhbmRsZXIge1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVOZXdDb250ZW50TW9kZWxzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICBwcml2YXRlIGZpbGVNYXBMaXN0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMpIHtcbiAgICB9XG5cbiAgICBhc3luYyBkZWxldGVBbGxDaGlsZHJlbihyb3c6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXAsIGlzQ2hpbGRDb250ZW50OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBpc1VwZGF0ZUxhc3RNb2RpZmllZFRpbWUgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbWFuaWZlc3RQYXRoID0gQ29udGVudFV0aWwuZ2V0QmFzZVBhdGgocm93W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QQVRIXSEpO1xuICAgICAgICBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLnJlYWRBc1RleHQobWFuaWZlc3RQYXRoLCBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKCkpXG4gICAgICAgICAgICAudGhlbihhc3luYyAoZmlsZUNvbnRlbnRzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50cyA9IEpTT04ucGFyc2UoZmlsZUNvbnRlbnRzKS5hcmNoaXZlLml0ZW1zO1xuICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZElkZW50aWZpZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRJZGVudGlmaWVycy5wdXNoKGVsZW1lbnQuaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50c0Zyb21EYjogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgdGhpcy5maW5kQWxsQ29udGVudHNGcm9tRGJXaXRoSWRlbnRpZmllcnMoY2hpbGRJZGVudGlmaWVycyk7XG4gICAgICAgICAgICAgICAgY2hpbGRDb250ZW50c0Zyb21EYi5mb3JFYWNoKGFzeW5jIGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVPclVwZGF0ZUNvbnRlbnQoY2hpbGQsIHRydWUsIGlzQ2hpbGRDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGVMYXN0TW9kaWZpZWRUaW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aDogc3RyaW5nID0gY2hpbGRbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BBVEhdITtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGggJiYgaXNVcGRhdGVMYXN0TW9kaWZpZWRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50Um9vdFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCA9IENvbnRlbnRVdGlsLmdldEZpcnN0UGFydE9mVGhlUGF0aE5hbWVPbkxhc3REZWxpbWl0ZXIocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFJvb3RQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGxhc3QgbW9kaWZpZWQgdGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhDb250ZW50S2V5cy5LRVlfTEFTVF9NT0RJRklFRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0TWlsbGlzZWNvbmRzKCkgKyAnJykudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZXJlYWQgZXJyJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG1ldGFEYXRhTGlzdDogYW55ID0gYXdhaXQgdGhpcy5nZXRNZXRhRGF0YSh0aGlzLmZpbGVNYXBMaXN0KTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlTmV3Q29udGVudE1vZGVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBjb250ZW50IGluIERCXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy51cGRhdGVOZXdDb250ZW50TW9kZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsID0gZSBhcyBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBuZXdDb250ZW50TW9kZWxbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChtZXRhRGF0YUxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IG1ldGFEYXRhTGlzdFtpZGVudGlmaWVyXSA/IG1ldGFEYXRhTGlzdFtpZGVudGlmaWVyXS5zaXplIDogMDtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWV0YURhdGFMaXN0W2lkZW50aWZpZXJdLmxhc3RNb2RpZmllZFRpbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3Q29udGVudE1vZGVsW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRV0gPSBzaXplO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbaWRlbnRpZmllcl0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogbmV3Q29udGVudE1vZGVsXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlT3JVcGRhdGVDb250ZW50KGNvbnRlbnRJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwLCBpc0NoaWxkSXRlbXM6IGJvb2xlYW4sIGlzQ2hpbGRDb250ZW50OiBib29sZWFuKSB7XG4gICAgICAgIGxldCByZWZDb3VudDogbnVtYmVyID0gY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVF0hO1xuICAgICAgICBsZXQgY29udGVudFN0YXRlOiBudW1iZXI7XG4gICAgICAgIGxldCB2aXNpYmlsaXR5OiBzdHJpbmcgPSBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWV0hO1xuICAgICAgICBjb25zdCBtaW1lVHlwZTogc3RyaW5nID0gY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX01JTUVfVFlQRV07XG4gICAgICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QQVRIXSE7XG4gICAgICAgIGlmIChpc0NoaWxkQ29udGVudCkge1xuICAgICAgICAgICAgLy8gSWYgdmlzaWJpbGl0eSBpcyBEZWZhdWx0IGl0IG1lYW5zIHRoaXMgY29udGVudCB3YXMgdmlzaWJsZSBpbiBteSBkb3dubG9hZHMuXG4gICAgICAgICAgICAvLyBBZnRlciBkZWxldGluZyBhcnRpZmFjdCBmb3IgdGhpcyBjb250ZW50IGl0IHNob3VsZCBub3QgdmlzaWJsZSBhcyB3ZWxsIHNvIHJlZHVjZSB0aGUgcmVmQ291bnQgYWxzbyBmb3IgdGhpcy5cbiAgICAgICAgICAgIGlmIChyZWZDb3VudCA+IDEgJiYgdmlzaWJpbGl0eSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgIHJlZkNvdW50ID0gcmVmQ291bnQgLSAxO1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB2aXNpYmlsaXR5XG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IFZpc2liaWxpdHkuUEFSRU5ULnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjb250ZW50U3RhdGVcbiAgICAgICAgICAgIC8vIERvIG5vdCB1cGRhdGUgdGhlIGNvbnRlbnQgc3RhdGUgaWYgbWltZVR5cGUgaXMgXCJhcHBsaWNhdGlvbi92bmQuZWtzdGVwLmNvbnRlbnQtY29sbGVjdGlvblwiXG4gICAgICAgICAgICBpZiAobWltZVR5cGUgPT09IE1pbWVUeXBlLkNPTExFQ1RJT04pIHtcbiAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUgPSBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEUudmFsdWVPZigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUgPSBTdGF0ZS5PTkxZX1NQSU5FLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFRoaXMgY2hlY2sgc2hvdWxkIGJlIGJlZm9yZSB1cGRhdGluZyB0aGUgZXhpc3RpbmcgcmVmQ291bnQuXG4gICAgICAgICAgICAvLyBEbyBub3QgdXBkYXRlIHRoZSBjb250ZW50IHN0YXRlIGlmIG1pbWVUeXBlIGlzIFwiYXBwbGljYXRpb24vdm5kLmVrc3RlcC5jb250ZW50LWNvbGxlY3Rpb25cIiBhbmQgcmVmQ291bnQgaXMgbW9yZSB0aGFuIDEuXG4gICAgICAgICAgICBpZiAobWltZVR5cGUgPT09IE1pbWVUeXBlLkNPTExFQ1RJT04udmFsdWVPZigpICYmIHJlZkNvdW50ID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRTdGF0ZSA9IFN0YXRlLkFSVElGQUNUX0FWQUlMQUJMRS52YWx1ZU9mKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlZkNvdW50ID4gMSAmJiBpc0NoaWxkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAvLyBWaXNpYmlsaXR5IHdpbGwgcmVtYWluIERlZmF1bHQgb25seS5cbiAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUgPSBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEUudmFsdWVPZigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZpc2liaWxpdHkgdG8gUGFyZW50IHNvIHRoYXQgdGhpcyBjb250ZW50IHdpbGwgbm90IHZpc2libGUgaW4gTXkgY29udGVudHMgLyBEb3dubG9hZHMgc2VjdGlvbi5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdmlzaWJpbGl0eVxuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5ID09PSBWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSBWaXNpYmlsaXR5LlBBUkVOVC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRlbnRTdGF0ZSA9IFN0YXRlLk9OTFlfU1BJTkUudmFsdWVPZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVmQ291bnQgPSByZWZDb3VudCAtIDE7XG5cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZW50cnkgaW4gREIgZm9yIGFueSBjb250ZW50IHRoZW4gb24gdGhpcyBjYXNlIGNvbnRlbnRNb2RlbC5nZXRQYXRoKCkgd2lsbCBiZSBudWxsXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudFN0YXRlID09PSBTdGF0ZS5PTkxZX1NQSU5FLnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbENvbnRlbnREYXRhOiBDb250ZW50RGF0YSA9IGxvY2FsRGF0YSAmJiBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IGFwcEljb24gPSAnJztcbiAgICAgICAgICAgICAgICBsZXQgaXRlbVNldFByZXZpZXdVcmwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcEljb24gPSBsb2NhbENvbnRlbnREYXRhLmFwcEljb24gPyBGaWxlVXRpbC5nZXRGaWxlTmFtZShsb2NhbENvbnRlbnREYXRhLmFwcEljb24pIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TZXRQcmV2aWV3VXJsID0gbG9jYWxDb250ZW50RGF0YS5pdGVtU2V0UHJldmlld1VybCA/IEZpbGVVdGlsLmdldEZpbGVOYW1lKGxvY2FsQ29udGVudERhdGEuaXRlbVNldFByZXZpZXdVcmwpIDogJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm0oQ29udGVudFV0aWwuZ2V0QmFzZVBhdGgocGF0aCksIFthcHBJY29uLCBpdGVtU2V0UHJldmlld1VybF0uam9pbignOicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXSA9IHZpc2liaWxpdHk7XG4gICAgICAgICAgICBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUkVGX0NPVU5UXSA9IENvbnRlbnRVdGlsLmFkZE9yVXBkYXRlUmVmQ291bnQocmVmQ291bnQpO1xuICAgICAgICAgICAgY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEVdID0gY29udGVudFN0YXRlO1xuICAgICAgICAgICAgaWYgKCFpc0NoaWxkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0laRV9PTl9ERVZJQ0VdID0gMDtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogY29udGVudEluRGIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9ID0/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2NvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXV1cbiAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgICAgICAgICAgICAgZmlsZU1hcFsnaWRlbnRpZmllciddID0gY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdO1xuICAgICAgICAgICAgICAgIGZpbGVNYXBbJ3BhdGgnXSA9IENvbnRlbnRVdGlsLmdldEJhc2VQYXRoKHBhdGgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTWFwTGlzdC5wdXNoKGZpbGVNYXApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOZXdDb250ZW50TW9kZWxzLnB1c2goY29udGVudEluRGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kQWxsQ29udGVudHNGcm9tRGJXaXRoSWRlbnRpZmllcnMoaWRlbnRpZmllcnM6IHN0cmluZ1tdKTogUHJvbWlzZTxDb250ZW50RW50cnkuU2NoZW1hTWFwW10+IHtcbiAgICAgICAgY29uc3QgaWRlbnRpZmllcnNTdHIgPSBBcnJheVV0aWwuam9pblByZXNlcnZpbmdRdW90ZXMoaWRlbnRpZmllcnMpO1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSBgIFdIRVJFICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9IElOICgke2lkZW50aWZpZXJzU3RyfSkgQU5EICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVH0gPiAwYDtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUICogRlJPTSAke0NvbnRlbnRFbnRyeS5UQUJMRV9OQU1FfSAke2ZpbHRlcn1gO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHByaXZhdGUgcm0oZGlyZWN0b3J5UGF0aCwgZGlyZWN0b3J5VG9CZVNraXBwZWQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2J1dGlsaXR5LnJtKGRpcmVjdG9yeVBhdGgsIGRpcmVjdG9yeVRvQmVTa2lwcGVkLCAoc3RhdHVzOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHhjKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih4Yyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbW92ZSB0aGlzIG1ldGhvZCB0byBmaWxlLXNlcnZpY2VcbiAgICBwcml2YXRlIGFzeW5jIGdldE1ldGFEYXRhKGZpbGVNYXBMaXN0OiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LmdldE1ldGFEYXRhKGZpbGVNYXBMaXN0LFxuICAgICAgICAgICAgICAgIChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==