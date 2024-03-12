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
import { ContentEntry } from '../../content/db/schema';
import { ContentUtil } from '../../content/util/content-util';
import { ContentStatus, FileName, MimeType, State, Visibility } from '../../content';
var StorageHandler = /** @class */ (function () {
    function StorageHandler(appConfig, fileService, dbService, deviceInfo) {
        this.appConfig = appConfig;
        this.fileService = fileService;
        this.dbService = dbService;
        this.deviceInfo = deviceInfo;
    }
    StorageHandler.prototype.addDestinationContentInDb = function (identifier, storageFolder, keepLowerVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var destinationPath;
            var _this = this;
            return __generator(this, function (_a) {
                destinationPath = storageFolder.concat(identifier);
                this.fileService.readAsText(storageFolder.concat(identifier), FileName.MANIFEST.valueOf()).then(function (manifestStringified) {
                    var manifest = JSON.parse(manifestStringified);
                    var items = manifest.archive.items;
                    return _this.extractContentFromItem(items, destinationPath.concat('/'), manifest['ver'], keepLowerVersion);
                }).catch(function (e) {
                    console.error(e);
                });
                return [2 /*return*/];
            });
        });
    };
    StorageHandler.prototype.deleteContentsFromDb = function (deletedIdentifiers) {
        return __awaiter(this, void 0, void 0, function () {
            var contentsInDb, _i, contentsInDb_1, element, contentInDb, refCount, _a, contentsInDb_2, element, contentInDb;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dbService.execute(ContentUtil.getFindAllContentsWithIdentifierQuery(deletedIdentifiers)).toPromise()];
                    case 1:
                        contentsInDb = _b.sent();
                        for (_i = 0, contentsInDb_1 = contentsInDb; _i < contentsInDb_1.length; _i++) {
                            element = contentsInDb_1[_i];
                            contentInDb = element;
                            if ((contentInDb[ContentEntry.COLUMN_NAME_MIME_TYPE] === MimeType.COLLECTION) &&
                                contentInDb[ContentEntry.COLUMN_NAME_REF_COUNT] > 1) {
                                contentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE] = State.ARTIFACT_AVAILABLE;
                            }
                            else {
                                contentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE] = State.ONLY_SPINE;
                            }
                            if ((contentInDb[ContentEntry.COLUMN_NAME_VISIBILITY] === Visibility.DEFAULT) &&
                                contentInDb[ContentEntry.COLUMN_NAME_REF_COUNT] > 0) {
                                refCount = contentInDb[ContentEntry.COLUMN_NAME_REF_COUNT];
                                contentInDb[ContentEntry.COLUMN_NAME_REF_COUNT] = ContentUtil.addOrUpdateRefCount(refCount - 1);
                            }
                            contentInDb[ContentEntry.COLUMN_NAME_VISIBILITY] = Visibility.PARENT;
                        }
                        this.dbService.beginTransaction();
                        _a = 0, contentsInDb_2 = contentsInDb;
                        _b.label = 2;
                    case 2:
                        if (!(_a < contentsInDb_2.length)) return [3 /*break*/, 5];
                        element = contentsInDb_2[_a];
                        contentInDb = element;
                        return [4 /*yield*/, this.dbService.update({
                                table: ContentEntry.TABLE_NAME,
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                selectionArgs: [contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER]],
                                modelJson: contentInDb
                            }).toPromise()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.dbService.endTransaction(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    StorageHandler.prototype.extractContentFromItem = function (items, destinationPath, manifestVersion, keepLowerVersion) {
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
    return StorageHandler;
}());
export { StorageHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3JhZ2UvaGFuZGxlci9zdG9yYWdlLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RCxPQUFPLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU9uRjtJQUVJLHdCQUFvQixTQUFvQixFQUNwQixXQUF3QixFQUN4QixTQUFvQixFQUNwQixVQUFzQjtRQUh0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUUxQyxDQUFDO0lBRVksa0RBQXlCLEdBQXRDLFVBQXVDLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxnQkFBeUI7Ozs7O2dCQUNqRyxlQUFlLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQ3ZCLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQ2hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQzlCLENBQUMsSUFBSSxDQUFDLFVBQUMsbUJBQW1CO29CQUN2QixJQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQzNELElBQU0sS0FBSyxHQUFVLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUM1QyxPQUFPLEtBQUksQ0FBQyxz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d0JBQTNCLENBQUM7d0JBQ0YsZUFBZSxHQUFHLENBQTJCLENBQUM7d0JBQ3BELHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dDQUN4QixLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7Z0NBQzlCLFNBQVMsRUFBSyxZQUFZLENBQUMsc0JBQXNCLFNBQU07Z0NBQ3ZELGFBQWEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQ0FDckUsU0FBUyxFQUFFLGVBQWU7NkJBQzdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBTGQsU0FLYyxDQUFDOzs7d0JBUEgsSUFBc0IsQ0FBQTs7O3dCQVN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0tBRTNDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBdklELElBdUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtDb250ZW50U3RhdHVzLCBGaWxlTmFtZSwgTWltZVR5cGUsIFN0YXRlLCBWaXNpYmlsaXR5fSBmcm9tICcuLi8uLi9jb250ZW50JztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi8uLi9hcGkvY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uL2RiJztcbmltcG9ydCB7RGV2aWNlSW5mb30gZnJvbSAnLi4vLi4vdXRpbC9kZXZpY2UnO1xuaW1wb3J0IHtNYW5pZmVzdH0gZnJvbSAnLi90cmFuc2Zlci1jb250ZW50LWhhbmRsZXInO1xuXG5leHBvcnQgY2xhc3MgU3RvcmFnZUhhbmRsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBDb25maWc6IEFwcENvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGV2aWNlSW5mbzogRGV2aWNlSW5mbykge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFkZERlc3RpbmF0aW9uQ29udGVudEluRGIoaWRlbnRpZmllcjogc3RyaW5nLCBzdG9yYWdlRm9sZGVyOiBzdHJpbmcsIGtlZXBMb3dlclZlcnNpb246IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25QYXRoID0gc3RvcmFnZUZvbGRlci5jb25jYXQoaWRlbnRpZmllcik7XG4gICAgICAgIHRoaXMuZmlsZVNlcnZpY2UucmVhZEFzVGV4dChcbiAgICAgICAgICAgIHN0b3JhZ2VGb2xkZXIuY29uY2F0KGlkZW50aWZpZXIpLFxuICAgICAgICAgICAgRmlsZU5hbWUuTUFOSUZFU1QudmFsdWVPZigpXG4gICAgICAgICkudGhlbigobWFuaWZlc3RTdHJpbmdpZmllZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFuaWZlc3Q6IE1hbmlmZXN0ID0gSlNPTi5wYXJzZShtYW5pZmVzdFN0cmluZ2lmaWVkKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zOiBhbnlbXSA9IG1hbmlmZXN0LmFyY2hpdmUuaXRlbXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0Q29udGVudEZyb21JdGVtKGl0ZW1zLCBkZXN0aW5hdGlvblBhdGguY29uY2F0KCcvJyksIG1hbmlmZXN0Wyd2ZXInXSwga2VlcExvd2VyVmVyc2lvbik7XG4gICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlQ29udGVudHNGcm9tRGIoZGVsZXRlZElkZW50aWZpZXJzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBjb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoXG4gICAgICAgICAgICBDb250ZW50VXRpbC5nZXRGaW5kQWxsQ29udGVudHNXaXRoSWRlbnRpZmllclF1ZXJ5KGRlbGV0ZWRJZGVudGlmaWVycykpLnRvUHJvbWlzZSgpO1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29udGVudHNJbkRiKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50SW5EYiA9IGVsZW1lbnQgYXMgQ29udGVudEVudHJ5LlNjaGVtYU1hcDtcbiAgICAgICAgICAgIGlmICgoY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX01JTUVfVFlQRV0gPT09IE1pbWVUeXBlLkNPTExFQ1RJT04pICYmXG4gICAgICAgICAgICAgICAgY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVF0hID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFXSA9IFN0YXRlLkFSVElGQUNUX0FWQUlMQUJMRTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEVdID0gU3RhdGUuT05MWV9TUElORTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWV0gPT09IFZpc2liaWxpdHkuREVGQVVMVCkgJiZcbiAgICAgICAgICAgICAgICBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUkVGX0NPVU5UXSEgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmQ291bnQ6IG51bWJlciA9IGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9SRUZfQ09VTlRdITtcbiAgICAgICAgICAgICAgICBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUkVGX0NPVU5UXSA9IENvbnRlbnRVdGlsLmFkZE9yVXBkYXRlUmVmQ291bnQocmVmQ291bnQgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXSA9IFZpc2liaWxpdHkuUEFSRU5UO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbnRlbnRzSW5EYikge1xuICAgICAgICAgICAgY29uc3QgY29udGVudEluRGIgPSBlbGVtZW50IGFzIENvbnRlbnRFbnRyeS5TY2hlbWFNYXA7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl1dLFxuICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogY29udGVudEluRGJcbiAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZXh0cmFjdENvbnRlbnRGcm9tSXRlbShpdGVtczogYW55W10sIGRlc3RpbmF0aW9uUGF0aDogc3RyaW5nLCBtYW5pZmVzdFZlcnNpb246IHN0cmluZywga2VlcExvd2VyVmVyc2lvbjogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpbnNlcnROZXdDb250ZW50TW9kZWxzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICAgICAgY29uc3QgdXBkYXRlTmV3Q29udGVudE1vZGVsczogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZSBvZiBpdGVtcykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBlbGVtZW50LmlkZW50aWZpZXI7XG4gICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IGVsZW1lbnQubWltZVR5cGU7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IENvbnRlbnRVdGlsLnJlYWRDb250ZW50VHlwZShlbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHByaW1hcnlDYXRlZ29yeSA9IENvbnRlbnRVdGlsLnJlYWRQcmltYXJ5Q2F0ZWdvcnkoZWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IENvbnRlbnRVdGlsLnJlYWRWaXNpYmlsaXR5KGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgYXVkaWVuY2UgPSBDb250ZW50VXRpbC5yZWFkQXVkaWVuY2UoZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBwcmFnbWEgPSBDb250ZW50VXRpbC5yZWFkUHJhZ21hKGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgcGtnVmVyc2lvbiA9IGVsZW1lbnQucGtnVmVyc2lvbjtcbiAgICAgICAgICAgIGxldCBjb250ZW50U3RhdGUgPSBTdGF0ZS5PTkxZX1NQSU5FLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gZWxlbWVudC5ib2FyZDtcbiAgICAgICAgICAgIGNvbnN0IG1lZGl1bSA9IGVsZW1lbnQubWVkaXVtO1xuICAgICAgICAgICAgY29uc3QgZ3JhZGUgPSBlbGVtZW50LmdyYWRlTGV2ZWw7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnRNb2RlbDogQ29udGVudEVudHJ5LlNjaGVtYU1hcCB8IHVuZGVmaW5lZCA9XG4gICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbaWRlbnRpZmllcl1cbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKSlbMF07XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnRQYXRoID0gZXhpc3RpbmdDb250ZW50TW9kZWwgJiZcbiAgICAgICAgICAgICAgICBDb250ZW50VXRpbC5nZXRCYXNlUGF0aChleGlzdGluZ0NvbnRlbnRNb2RlbFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSF0hKTtcbiAgICAgICAgICAgIGxldCBkb2VzQ29udGVudEV4aXN0OiBib29sZWFuID0gQ29udGVudFV0aWwuZG9lc0NvbnRlbnRFeGlzdChleGlzdGluZ0NvbnRlbnRNb2RlbCwgaWRlbnRpZmllciwgcGtnVmVyc2lvbiwga2VlcExvd2VyVmVyc2lvbik7XG4gICAgICAgICAgICBpZiAoZG9lc0NvbnRlbnRFeGlzdCAmJiAhKGVsZW1lbnQuc3RhdHVzID09PSBDb250ZW50U3RhdHVzLkRSQUZULnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50TW9kZWwhW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gSlNPTi5wYXJzZShleGlzdGluZ0NvbnRlbnRNb2RlbCFbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvZXNDb250ZW50RXhpc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgb3IgdXBkYXRlIHRoZSBjb250ZW50X3N0YXRlXG4gICAgICAgICAgICAgICAgaWYgKE1pbWVUeXBlLkNPTExFQ1RJT04udmFsdWVPZigpID09PSBtaW1lVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUgPSBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEUudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTdGF0ZSA9IFN0YXRlLkFSVElGQUNUX0FWQUlMQUJMRS52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlQ291bnQgPSBDb250ZW50VXRpbC5nZXRSZWZlcmVuY2VDb3VudChleGlzdGluZ0NvbnRlbnRNb2RlbCwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICB2aXNpYmlsaXR5ID0gQ29udGVudFV0aWwuZ2V0Q29udGVudFZpc2liaWxpdHkoZXhpc3RpbmdDb250ZW50TW9kZWwsIGVsZW1lbnRbJ29iamVjdFR5cGUnXSwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICBjb250ZW50U3RhdGUgPSBDb250ZW50VXRpbC5nZXRDb250ZW50U3RhdGUoZXhpc3RpbmdDb250ZW50TW9kZWwsIGNvbnRlbnRTdGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBiYXNlUGF0aCA9ICFkb2VzQ29udGVudEV4aXN0ID8gZGVzdGluYXRpb25QYXRoIDogZXhpc3RpbmdDb250ZW50UGF0aDtcbiAgICAgICAgICAgIGNvbnN0IHNpemVPbkRldmljZSA9IGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuZ2V0RGlyZWN0b3J5U2l6ZShiYXNlUGF0aCEpO1xuICAgICAgICAgICAgQ29udGVudFV0aWwuYWRkT3JVcGRhdGVWaXJhbGl0eU1ldGFkYXRhKGVsZW1lbnQsIHRoaXMuZGV2aWNlSW5mby5nZXREZXZpY2VJRCgpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsOiBDb250ZW50RW50cnkuU2NoZW1hTWFwID0gQ29udGVudFV0aWwuY29uc3RydWN0Q29udGVudERCTW9kZWwoaWRlbnRpZmllciwgbWFuaWZlc3RWZXJzaW9uLFxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpLCBtaW1lVHlwZSwgY29udGVudFR5cGUsIHZpc2liaWxpdHksIGJhc2VQYXRoLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUNvdW50LCBjb250ZW50U3RhdGUsIGF1ZGllbmNlLCBwcmFnbWEsIHNpemVPbkRldmljZSwgYm9hcmQsIG1lZGl1bSwgZ3JhZGUsIHByaW1hcnlDYXRlZ29yeSk7XG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nQ29udGVudE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0TmV3Q29udGVudE1vZGVscy5wdXNoKG5ld0NvbnRlbnRNb2RlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHMucHVzaChuZXdDb250ZW50TW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbnNlcnROZXdDb250ZW50TW9kZWxzLmxlbmd0aCB8fCB1cGRhdGVOZXdDb250ZW50TW9kZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuYmVnaW5UcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGludG8gREJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBpbnNlcnROZXdDb250ZW50TW9kZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsID0gZSBhcyBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBuZXdDb250ZW50TW9kZWxcbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIGNvbnRlbnQgaW4gREJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiB1cGRhdGVOZXdDb250ZW50TW9kZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudE1vZGVsID0gZSBhcyBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW25ld0NvbnRlbnRNb2RlbFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl1dLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IG5ld0NvbnRlbnRNb2RlbFxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==