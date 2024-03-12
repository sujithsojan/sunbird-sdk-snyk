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
import { MoveContentStatus } from '../transfer-content-handler';
import { ContentEntry } from '../../../content/db/schema';
import { ContentUtil } from '../../../content/util/content-util';
import { ContentStatus, FileName, MimeType, State, Visibility } from '../../../content';
import { ExistingContentAction } from '../..';
import { defer } from 'rxjs';
var StoreDestinationContentInDb = /** @class */ (function () {
    function StoreDestinationContentInDb(appConfig, fileService, dbService, deviceInfo) {
        this.appConfig = appConfig;
        this.fileService = fileService;
        this.dbService = dbService;
        this.deviceInfo = deviceInfo;
    }
    StoreDestinationContentInDb.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var addedContentIdentifiers, _i, _a, duplicateContent, _b, addedContentIdentifiers_1, identifier;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        for (_i = 0, _a = context.duplicateContents; _i < _a.length; _i++) {
                            duplicateContent = _a[_i];
                            switch (context.existingContentAction || ExistingContentAction.IGNORE) {
                                case ExistingContentAction.KEEP_HIGER_VERSION:
                                    if (duplicateContent.status === MoveContentStatus.HIGHER_VERSION_IN_DESTINATION) {
                                        this.addDestinationContentInDb(duplicateContent.identifier, context.destinationFolder, false);
                                    }
                                    break;
                                case ExistingContentAction.KEEP_LOWER_VERSION:
                                    if (duplicateContent.status === MoveContentStatus.LOWER_VERSION_IN_DESTINATION) {
                                        this.addDestinationContentInDb(duplicateContent.identifier, context.destinationFolder, true);
                                    }
                                    break;
                                case ExistingContentAction.KEEP_DESTINATION:
                                case ExistingContentAction.IGNORE:
                                    if (duplicateContent.status === MoveContentStatus.LOWER_VERSION_IN_DESTINATION) {
                                        this.addDestinationContentInDb(duplicateContent.identifier, context.destinationFolder, true);
                                    }
                                    else {
                                        this.addDestinationContentInDb(duplicateContent.identifier, context.destinationFolder, false);
                                    }
                                    break;
                            }
                        }
                        if (context.validContentIdsInDestination && context.validContentIdsInDestination.length &&
                            context.duplicateContents && context.duplicateContents.length) {
                            addedContentIdentifiers = this.getNewlyAddedContents(context.validContentIdsInDestination, context.duplicateContents.map(function (element) { return element.identifier; }));
                        }
                        else if ((!context.validContentIdsInDestination || !context.duplicateContents.length)
                            && (context.validContentIdsInDestination && context.validContentIdsInDestination.length)) {
                            addedContentIdentifiers = context.validContentIdsInDestination;
                        }
                        if (!addedContentIdentifiers) return [3 /*break*/, 4];
                        _b = 0, addedContentIdentifiers_1 = addedContentIdentifiers;
                        _c.label = 1;
                    case 1:
                        if (!(_b < addedContentIdentifiers_1.length)) return [3 /*break*/, 4];
                        identifier = addedContentIdentifiers_1[_b];
                        return [4 /*yield*/, this.addDestinationContentInDb(identifier, context.destinationFolder, false)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _b++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    StoreDestinationContentInDb.prototype.getNewlyAddedContents = function (foldersList, contentIdentifiers) {
        return foldersList.filter(function (folder) {
            return contentIdentifiers.find(function (id) { return id !== folder; });
        });
    };
    StoreDestinationContentInDb.prototype.addDestinationContentInDb = function (identifier, storageFolder, keepLowerVersion) {
        var _this = this;
        var destinationPath = storageFolder.concat(identifier);
        return this.fileService.readAsText(storageFolder.concat(identifier), FileName.MANIFEST.valueOf()).then(function (manifestStringified) {
            var manifest = JSON.parse(manifestStringified);
            var items = manifest.archive.items;
            return _this.extractContentFromItem(items, destinationPath.concat('/'), manifest['ver'], keepLowerVersion);
        }).catch(function (e) {
            console.error(e);
        });
    };
    StoreDestinationContentInDb.prototype.extractContentFromItem = function (items, destinationPath, manifestVersion, keepLowerVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var insertNewContentModels, updateNewContentModels, _i, items_1, e, element, identifier, mimeType, contentType, primaryCategory, visibility, audience, pragma, pkgVersion, contentState, board, medium, grade, existingContentModel, existingContentPath, doesContentExist, referenceCount, basePath, sizeOnDevice, newContentModel, _a, insertNewContentModels_1, e, newContentModel, _b, updateNewContentModels_1, e, newContentModel;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        insertNewContentModels = [];
                        updateNewContentModels = [];
                        _i = 0, items_1 = items;
                        _c.label = 1;
                    case 1:
                        if (!(_i < items_1.length)) return [3 /*break*/, 5];
                        e = items_1[_i];
                        element = e;
                        identifier = element.identifier;
                        mimeType = element.mimeType;
                        contentType = ContentUtil.readContentType(element);
                        primaryCategory = ContentUtil.readPrimaryCategory(element);
                        visibility = ContentUtil.readVisibility(element);
                        audience = ContentUtil.readAudience(element);
                        pragma = ContentUtil.readPragma(element);
                        pkgVersion = element.pkgVersion;
                        contentState = State.ONLY_SPINE.valueOf();
                        board = element.board;
                        medium = element.medium;
                        grade = element.gradeLevel;
                        return [4 /*yield*/, this.dbService.read({
                                table: ContentEntry.TABLE_NAME,
                                columns: [],
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                selectionArgs: [identifier]
                            }).toPromise()];
                    case 2:
                        existingContentModel = (_c.sent())[0];
                        existingContentPath = existingContentModel &&
                            ContentUtil.getBasePath(existingContentModel[ContentEntry.COLUMN_NAME_PATH]);
                        doesContentExist = ContentUtil.doesContentExist(existingContentModel, identifier, pkgVersion, keepLowerVersion);
                        if (doesContentExist && !(element.status === ContentStatus.DRAFT.valueOf())) {
                            if (existingContentModel[ContentEntry.COLUMN_NAME_VISIBILITY] === Visibility.DEFAULT.valueOf()) {
                                element = JSON.parse(existingContentModel[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                            }
                        }
                        else {
                            doesContentExist = false;
                            // Add or update the content_state
                            if (MimeType.COLLECTION.valueOf() === mimeType) {
                                contentState = State.ARTIFACT_AVAILABLE.valueOf();
                            }
                            else {
                                contentState = State.ARTIFACT_AVAILABLE.valueOf();
                            }
                        }
                        referenceCount = ContentUtil.getReferenceCount(existingContentModel, visibility);
                        visibility = ContentUtil.getContentVisibility(existingContentModel, element['objectType'], visibility);
                        contentState = ContentUtil.getContentState(existingContentModel, contentState);
                        basePath = !doesContentExist ? destinationPath : existingContentPath;
                        return [4 /*yield*/, this.fileService.getDirectorySize(basePath)];
                    case 3:
                        sizeOnDevice = _c.sent();
                        ContentUtil.addOrUpdateViralityMetadata(element, this.deviceInfo.getDeviceID().toString());
                        newContentModel = ContentUtil.constructContentDBModel(identifier, manifestVersion, JSON.stringify(element), mimeType, contentType, visibility, basePath, referenceCount, contentState, audience, pragma, sizeOnDevice, board, medium, grade, primaryCategory);
                        if (!existingContentModel) {
                            insertNewContentModels.push(newContentModel);
                        }
                        else {
                            updateNewContentModels.push(newContentModel);
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (!(insertNewContentModels.length || updateNewContentModels.length)) return [3 /*break*/, 14];
                        this.dbService.beginTransaction();
                        _a = 0, insertNewContentModels_1 = insertNewContentModels;
                        _c.label = 6;
                    case 6:
                        if (!(_a < insertNewContentModels_1.length)) return [3 /*break*/, 9];
                        e = insertNewContentModels_1[_a];
                        newContentModel = e;
                        return [4 /*yield*/, this.dbService.insert({
                                table: ContentEntry.TABLE_NAME,
                                modelJson: newContentModel
                            }).toPromise()];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        _b = 0, updateNewContentModels_1 = updateNewContentModels;
                        _c.label = 10;
                    case 10:
                        if (!(_b < updateNewContentModels_1.length)) return [3 /*break*/, 13];
                        e = updateNewContentModels_1[_b];
                        newContentModel = e;
                        return [4 /*yield*/, this.dbService.update({
                                table: ContentEntry.TABLE_NAME,
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                selectionArgs: [newContentModel[ContentEntry.COLUMN_NAME_IDENTIFIER]],
                                modelJson: newContentModel
                            }).toPromise()];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        _b++;
                        return [3 /*break*/, 10];
                    case 13:
                        this.dbService.endTransaction(true);
                        _c.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return StoreDestinationContentInDb;
}());
export { StoreDestinationContentInDb };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZGVzdGluYXRpb24tY29udGVudC1pbi1kYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdG9yYWdlL2hhbmRsZXIvdHJhbnNmZXIvc3RvcmUtZGVzdGluYXRpb24tY29udGVudC1pbi1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQVcsaUJBQWlCLEVBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFDaEcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRCxPQUFPLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR3RGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUU1QyxPQUFPLEVBQUMsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRXZDO0lBRUkscUNBQ1ksU0FBb0IsRUFDcEIsV0FBd0IsRUFDeEIsU0FBb0IsRUFDcEIsVUFBc0I7UUFIdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFbEMsQ0FBQztJQUVELDZDQUFPLEdBQVAsVUFBUSxPQUErQjtRQUF2QyxpQkE2Q0M7UUE1Q0csT0FBTyxLQUFLLENBQUM7Ozs7O3dCQUdULFdBQXlELEVBQTFCLEtBQUEsT0FBTyxDQUFDLGlCQUFrQixFQUExQixjQUEwQixFQUExQixJQUEwQixFQUFFOzRCQUFoRCxnQkFBZ0I7NEJBRXZCLFFBQVEsT0FBTyxDQUFDLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRTtn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WUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0NBQ3JFLFNBQVMsRUFBRSxlQUFlOzZCQUM3QixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUxkLFNBS2MsQ0FBQzs7O3dCQVBILElBQXNCLENBQUE7Ozt3QkFTdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztLQUczQztJQUVMLGtDQUFDO0FBQUQsQ0FBQyxBQTlKRCxJQThKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7TWFuaWZlc3QsIE1vdmVDb250ZW50U3RhdHVzLCBUcmFuc2ZlckNvbnRlbnRDb250ZXh0fSBmcm9tICcuLi90cmFuc2Zlci1jb250ZW50LWhhbmRsZXInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtDb250ZW50U3RhdHVzLCBGaWxlTmFtZSwgTWltZVR5cGUsIFN0YXRlLCBWaXNpYmlsaXR5fSBmcm9tICcuLi8uLi8uLi9jb250ZW50JztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vLi4vLi4vYXBpL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7RXhpc3RpbmdDb250ZW50QWN0aW9ufSBmcm9tICcuLi8uLic7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmVEZXN0aW5hdGlvbkNvbnRlbnRJbkRiIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvXG4gICAgKSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShjb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWRkZWRDb250ZW50SWRlbnRpZmllcnM7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgZHVwbGljYXRlQ29udGVudCBvZiBjb250ZXh0LmR1cGxpY2F0ZUNvbnRlbnRzISkge1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LmV4aXN0aW5nQ29udGVudEFjdGlvbiB8fCBFeGlzdGluZ0NvbnRlbnRBY3Rpb24uSUdOT1JFKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXhpc3RpbmdDb250ZW50QWN0aW9uLktFRVBfSElHRVJfVkVSU0lPTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdXBsaWNhdGVDb250ZW50LnN0YXR1cyA9PT0gTW92ZUNvbnRlbnRTdGF0dXMuSElHSEVSX1ZFUlNJT05fSU5fREVTVElOQVRJT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERlc3RpbmF0aW9uQ29udGVudEluRGIoZHVwbGljYXRlQ29udGVudC5pZGVudGlmaWVyLCBjb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyISwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXhpc3RpbmdDb250ZW50QWN0aW9uLktFRVBfTE9XRVJfVkVSU0lPTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdXBsaWNhdGVDb250ZW50LnN0YXR1cyA9PT0gTW92ZUNvbnRlbnRTdGF0dXMuTE9XRVJfVkVSU0lPTl9JTl9ERVNUSU5BVElPTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGVzdGluYXRpb25Db250ZW50SW5EYihkdXBsaWNhdGVDb250ZW50LmlkZW50aWZpZXIsIGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV4aXN0aW5nQ29udGVudEFjdGlvbi5LRUVQX0RFU1RJTkFUSU9OOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIEV4aXN0aW5nQ29udGVudEFjdGlvbi5JR05PUkU6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVwbGljYXRlQ29udGVudC5zdGF0dXMgPT09IE1vdmVDb250ZW50U3RhdHVzLkxPV0VSX1ZFUlNJT05fSU5fREVTVElOQVRJT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERlc3RpbmF0aW9uQ29udGVudEluRGIoZHVwbGljYXRlQ29udGVudC5pZGVudGlmaWVyLCBjb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyISwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGVzdGluYXRpb25Db250ZW50SW5EYihkdXBsaWNhdGVDb250ZW50LmlkZW50aWZpZXIsIGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb250ZXh0LnZhbGlkQ29udGVudElkc0luRGVzdGluYXRpb24gJiYgY29udGV4dC52YWxpZENvbnRlbnRJZHNJbkRlc3RpbmF0aW9uLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIGNvbnRleHQuZHVwbGljYXRlQ29udGVudHMgJiYgY29udGV4dC5kdXBsaWNhdGVDb250ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhZGRlZENvbnRlbnRJZGVudGlmaWVycyA9IHRoaXMuZ2V0TmV3bHlBZGRlZENvbnRlbnRzKFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnZhbGlkQ29udGVudElkc0luRGVzdGluYXRpb24sIGNvbnRleHQuZHVwbGljYXRlQ29udGVudHMubWFwKGVsZW1lbnQgPT4gZWxlbWVudC5pZGVudGlmaWVyKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCghY29udGV4dC52YWxpZENvbnRlbnRJZHNJbkRlc3RpbmF0aW9uIHx8ICFjb250ZXh0LmR1cGxpY2F0ZUNvbnRlbnRzIS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgJiYgKGNvbnRleHQudmFsaWRDb250ZW50SWRzSW5EZXN0aW5hdGlvbiAmJiBjb250ZXh0LnZhbGlkQ29udGVudElkc0luRGVzdGluYXRpb24ubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIGFkZGVkQ29udGVudElkZW50aWZpZXJzID0gY29udGV4dC52YWxpZENvbnRlbnRJZHNJbkRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWRkZWRDb250ZW50SWRlbnRpZmllcnMpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWFkIGNvbnRlbnQgaW4gZGVzdGluYXRpb24gZm9sZGVyLlxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaWRlbnRpZmllciBvZiBhZGRlZENvbnRlbnRJZGVudGlmaWVycykge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFkZERlc3RpbmF0aW9uQ29udGVudEluRGIoaWRlbnRpZmllciwgY29udGV4dC5kZXN0aW5hdGlvbkZvbGRlciEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3bHlBZGRlZENvbnRlbnRzKGZvbGRlcnNMaXN0OiBzdHJpbmdbXSwgY29udGVudElkZW50aWZpZXJzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIGZvbGRlcnNMaXN0LmZpbHRlcigoZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudElkZW50aWZpZXJzLmZpbmQoKGlkKSA9PiBpZCAhPT0gZm9sZGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGREZXN0aW5hdGlvbkNvbnRlbnRJbkRiKGlkZW50aWZpZXI6IHN0cmluZywgc3RvcmFnZUZvbGRlcjogc3RyaW5nLCBrZWVwTG93ZXJWZXJzaW9uOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uUGF0aCA9IHN0b3JhZ2VGb2xkZXIuY29uY2F0KGlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5yZWFkQXNUZXh0KFxuICAgICAgICAgICAgc3RvcmFnZUZvbGRlci5jb25jYXQoaWRlbnRpZmllciksXG4gICAgICAgICAgICBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKClcbiAgICAgICAgKS50aGVuKChtYW5pZmVzdFN0cmluZ2lmaWVkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYW5pZmVzdDogTWFuaWZlc3QgPSBKU09OLnBhcnNlKG1hbmlmZXN0U3RyaW5naWZpZWQpO1xuICAgICAgICAgICAgY29uc3QgaXRlbXM6IGFueVtdID0gbWFuaWZlc3QuYXJjaGl2ZS5pdGVtcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RDb250ZW50RnJvbUl0ZW0oaXRlbXMsIGRlc3RpbmF0aW9uUGF0aC5jb25jYXQoJy8nKSwgbWFuaWZlc3RbJ3ZlciddLCBrZWVwTG93ZXJWZXJzaW9uKTtcbiAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZXh0cmFjdENvbnRlbnRGcm9tSXRlbShpdGVtczogYW55W10sIGRlc3RpbmF0aW9uUGF0aDogc3RyaW5nLCBtYW5pZmVzdFZlcnNpb246IHN0cmluZywga2VlcExvd2VyVmVyc2lvbjogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpbnNlcnROZXdDb250ZW50TW9kZWxzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICAgICAgY29uc3QgdXBkYXRlTmV3Q29udGVudE1vZGVsczogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZSBvZiBpdGVtcykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBlbGVtZW50LmlkZW50aWZpZXI7XG4gICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IGVsZW1lbnQubWltZVR5cGU7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IENvbnRlbnRVdGlsLnJlYWRDb250ZW50VHlwZShlbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHByaW1hcnlDYXRlZ29yeSA9IENvbnRlbnRVdGlsLnJlYWRQcmltYXJ5Q2F0ZWdvcnkoZWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IENvbnRlbnRVdGlsLnJlYWRWaXNpYmlsaXR5KGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgYXVkaWVuY2UgPSBDb250ZW50VXRpbC5yZWFkQXVkaWVuY2UoZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBwcmFnbWEgPSBDb250ZW50VXRpbC5yZWFkUHJhZ21hKGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgcGtnVmVyc2lvbiA9IGVsZW1lbnQucGtnVmVyc2lvbjtcbiAgICAgICAgICAgIGxldCBjb250ZW50U3RhdGUgPSBTdGF0ZS5PTkxZX1NQSU5FLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gZWxlbWVudC5ib2FyZDtcbiAgICAgICAgICAgIGNvbnN0IG1lZGl1bSA9IGVsZW1lbnQubWVkaXVtO1xuICAgICAgICAgICAgY29uc3QgZ3JhZGUgPSBlbGVtZW50LmdyYWRlTGV2ZWw7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnRNb2RlbDogQ29udGVudEVudHJ5LlNjaGVtYU1hcCB8IHVuZGVmaW5lZCA9XG4gICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbaWRlbnRpZmllcl1cbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKSlbMF07XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnRQYXRoID0gZXhpc3RpbmdDb250ZW50TW9kZWwgJiZcbiAgICAgICAgICAgICAgICBDb250ZW50VXRpbC5nZXRCYXNlUGF0aChleGlzdGluZ0NvbnRlbnRNb2RlbFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSF0hKTtcbiAgICAgICAgICAgIGxldCBkb2VzQ29udGVudEV4aXN0OiBib29sZWFuID0gQ29udGVudFV0aWwuZG9lc0NvbnRlbnRFeGlzdChleGlzdGluZ0NvbnRlbnRNb2RlbCwgaWRlbnRpZmllciwgcGtnVmVyc2lvbiwga2VlcExvd2VyVmVyc2lvbik7XG4gICAgICAgICAgICBpZiAoZG9lc0NvbnRlbnRFeGlzdCAmJiAhKGVsZW1lbnQuc3RhdHVzID09PSBDb250ZW50U3RhdHVzLkRSQUZULnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50TW9kZWwhW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gSlNPTi5wYXJzZShleGlzdGluZ0NvbnRlbnRNb2RlbCFbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvZXNDb250ZW50RXhpc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgb3IgdXBkYXRlIHRoZSBjb250ZW50X3N0YXRlXG4gICAgICAgICAgICAgICAgaWYgKE1pbWVUeXBlLkNPTExFQ1RJT04udmFsdWVPZigpID09PSBtaW1lVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUgPSBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEUudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTdGF0ZSA9IFN0YXRlLkFSVElGQUNUX0FWQUlMQUJMRS52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlQ291bnQgPSBDb250ZW50VXRpbC5nZXRSZWZlcmVuY2VDb3VudChleGlzdGluZ0NvbnRlbnRNb2RlbCwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICB2aXNpYmlsaXR5ID0gQ29udGVudFV0aWwuZ2V0Q29udGVudFZpc2liaWxpdHkoZXhpc3RpbmdDb250ZW50TW9kZWwsIGVsZW1lbnRbJ29iamVjdFR5cGUnXSwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICBjb250ZW50U3RhdGUgPSBDb250ZW50VXRpbC5nZXRDb250ZW50U3RhdGUoZXhpc3RpbmdDb250ZW50TW9kZWwsIGNvbnRlbnRTdGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBiYXNlUGF0aCA9ICFkb2VzQ29udGVudEV4aXN0ID8gZGVzdGluYXRpb25QYXRoIDogZXhpc3RpbmdDb250ZW50UGF0aDtcbiAgICAgICAgICAgIGNvbnN0IHNpemVPbkRldmljZSA9IGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuZ2V0RGlyZWN0b3J5U2l6ZShiYXNlUGF0aCEpO1xuICAgICAgICAgICAgQ29udGVudFV0aWwuYWRkT3JVcGRhdGVWaXJhbGl0eU1ldGFkYXRhKGVsZW1lbnQsIHRoaXMuZGV2aWNlSW5mby5nZXREZXZpY2VJRCgpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsOiBDb250ZW50RW50cnkuU2NoZW1hTWFwID0gQ29udGVudFV0aWwuY29uc3RydWN0Q29udGVudERCTW9kZWwoaWRlbnRpZmllciwgbWFuaWZlc3RWZXJzaW9uLFxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpLCBtaW1lVHlwZSwgY29udGVudFR5cGUsIHZpc2liaWxpdHksIGJhc2VQYXRoLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUNvdW50LCBjb250ZW50U3RhdGUsIGF1ZGllbmNlLCBwcmFnbWEsIHNpemVPbkRldmljZSwgYm9hcmQsIG1lZGl1bSwgZ3JhZGUsIHByaW1hcnlDYXRlZ29yeSk7XG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nQ29udGVudE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0TmV3Q29udGVudE1vZGVscy5wdXNoKG5ld0NvbnRlbnRNb2RlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHMucHVzaChuZXdDb250ZW50TW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbnNlcnROZXdDb250ZW50TW9kZWxzLmxlbmd0aCB8fCB1cGRhdGVOZXdDb250ZW50TW9kZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuYmVnaW5UcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGludG8gREJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBpbnNlcnROZXdDb250ZW50TW9kZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsID0gZSBhcyBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBuZXdDb250ZW50TW9kZWxcbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIGNvbnRlbnQgaW4gREJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiB1cGRhdGVOZXdDb250ZW50TW9kZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsID0gZSBhcyBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW25ld0NvbnRlbnRNb2RlbFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl1dLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IG5ld0NvbnRlbnRNb2RlbFxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIl19