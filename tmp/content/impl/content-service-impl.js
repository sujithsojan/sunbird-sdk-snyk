var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
import { ContentDeleteStatus, ContentEventType, ContentImportStatus, FileExtension, MimeType, SearchType, } from '..';
import { combineLatest, defer, from, interval, Observable, of } from 'rxjs';
import { Response } from '../../api';
import { GetContentDetailsHandler } from '../handlers/get-content-details-handler';
import { DbService } from '../../db';
import { ChildContentsHandler } from '../handlers/get-child-contents-handler';
import { ContentEntry, ContentMarkerEntry } from '../db/schema';
import { ContentUtil } from '../util/content-util';
import { DeleteContentHandler } from '../handlers/delete-content-handler';
import { SearchContentHandler } from '../handlers/search-content-handler';
import { GetContentsHandler } from '../handlers/get-contents-handler';
import { ContentMapper } from '../util/content-mapper';
import { ImportNExportHandler } from '../handlers/import-n-export-handler';
import { CreateContentExportManifest } from '../handlers/export/create-content-export-manifest';
import { WriteManifest } from '../handlers/export/write-manifest';
import { CompressContent } from '../handlers/export/compress-content';
import { DeviceMemoryCheck } from '../handlers/export/device-memory-check';
import { CopyAsset } from '../handlers/export/copy-asset';
import { EcarBundle } from '../handlers/export/ecar-bundle';
import { ExtractEcar } from '../handlers/import/extract-ecar';
import { ValidateEcar } from '../handlers/import/validate-ecar';
import { ExtractPayloads } from '../handlers/import/extract-payloads';
import { CreateContentImportManifest } from '../handlers/import/create-content-import-manifest';
import { EcarCleanup } from '../handlers/import/ecar-cleanup';
import { Rollup } from '../../telemetry';
import { UpdateSizeOnDevice } from '../handlers/import/update-size-on-device';
import { CreateTempLoc } from '../handlers/export/create-temp-loc';
import { ContentSearchApiHandler } from '../handlers/import/content-search-api-handler';
import { ArrayUtil } from '../../util/array-util';
import { FileUtil } from '../../util/file/util/file-util';
import { EventNamespace } from '../../events-bus';
import { GenerateImportShareTelemetry } from '../handlers/import/generate-import-share-telemetry';
import { GenerateExportShareTelemetry } from '../handlers/export/generate-export-share-telemetry';
import { GenerateInteractTelemetry } from '../handlers/import/generate-interact-telemetry';
import { ContentKeys, FrameworkKeys } from '../../preference-keys';
import { ContentStorageHandler } from '../handlers/content-storage-handler';
import { SharedPreferencesSetCollectionImpl } from '../../util/shared-preferences/impl/shared-preferences-set-collection-impl';
import { Container, inject, injectable } from 'inversify';
import { CsInjectionTokens, InjectionTokens } from '../../injection-tokens';
import { catchError, filter, map, mapTo, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { CopyToDestination } from '../handlers/export/copy-to-destination';
import { GetContentHeirarchyHandler } from '../handlers/get-content-heirarchy-handler';
import { DeleteTempDir } from '../handlers/export/deletete-temp-dir';
import { ContentAggregator } from '../handlers/content-aggregator';
import { CsMimeTypeFacetToMimeTypeCategoryAggregator } from '@project-sunbird/client-services/services/content/utilities/mime-type-facet-to-mime-type-category-aggregator';
import { MimeTypeCategory } from '@project-sunbird/client-services/models/content';
import { QuestionSetFileReadHandler } from '../handlers/question-set-file-read-handler';
import { GetChildQuestionSetHandler } from '../handlers/get-child-question-set-handler';
var ContentServiceImpl = /** @class */ (function () {
    function ContentServiceImpl(sdkConfig, apiService, dbService, profileService, fileService, zipService, deviceInfo, telemetryService, contentFeedbackService, downloadService, sharedPreferences, eventsBusService, cachedItemStore, appInfo, networkInfoService, container, storageService) {
        this.sdkConfig = sdkConfig;
        this.apiService = apiService;
        this.dbService = dbService;
        this.profileService = profileService;
        this.fileService = fileService;
        this.zipService = zipService;
        this.deviceInfo = deviceInfo;
        this.telemetryService = telemetryService;
        this.contentFeedbackService = contentFeedbackService;
        this.downloadService = downloadService;
        this.sharedPreferences = sharedPreferences;
        this.eventsBusService = eventsBusService;
        this.cachedItemStore = cachedItemStore;
        this.appInfo = appInfo;
        this.networkInfoService = networkInfoService;
        this.container = container;
        this.storageService = storageService;
        this.contentUpdateSizeOnDeviceTimeoutRef = new Map();
        this.contentServiceConfig = this.sdkConfig.contentServiceConfig;
        this.appConfig = this.sdkConfig.appConfig;
        this.getContentDetailsHandler = new GetContentDetailsHandler(this.contentFeedbackService, this.profileService, this.apiService, this.contentServiceConfig, this.dbService, this.eventsBusService);
        this.getContentHeirarchyHandler = new GetContentHeirarchyHandler(this.apiService, this.contentServiceConfig);
        this.questionSetFileReadHandler = new QuestionSetFileReadHandler(this.storageService, this.fileService);
        this.getChildQuestionSetHandler = new GetChildQuestionSetHandler(this, this.dbService, this.storageService, this.fileService);
        this.contentDeleteRequestSet = new SharedPreferencesSetCollectionImpl(this.sharedPreferences, ContentServiceImpl_1.KEY_CONTENT_DELETE_REQUEST_LIST, function (item) { return item.contentId; });
    }
    ContentServiceImpl_1 = ContentServiceImpl;
    ContentServiceImpl.prototype.onInit = function () {
        this.downloadService.registerOnDownloadCompleteDelegate(this);
        return combineLatest([
            this.handleContentDeleteRequestSetChanges(),
            this.handleUpdateSizeOnDeviceFail()
        ]).pipe(mapTo(undefined));
    };
    ContentServiceImpl.prototype.getContentDetails = function (request) {
        return this.getContentDetailsHandler.handle(request);
    };
    ContentServiceImpl.prototype.getContentHeirarchy = function (request) {
        return this.getContentHeirarchyHandler.handle(request);
    };
    ContentServiceImpl.prototype.getContents = function (request) {
        var _this = this;
        var query = new GetContentsHandler().getAllLocalContentQuery(request);
        return this.dbService.execute(query).pipe(mergeMap(function (contentsInDb) {
            return defer(function () { return __awaiter(_this, void 0, void 0, function () {
                var contents, _i, contentsInDb_1, contentInDb, content, uids, contentMarkerQuery, entries;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            contents = [];
                            _i = 0, contentsInDb_1 = contentsInDb;
                            _a.label = 1;
                        case 1:
                            if (!(_i < contentsInDb_1.length)) return [3 /*break*/, 4];
                            contentInDb = contentsInDb_1[_i];
                            content = ContentMapper.mapContentDBEntryToContent(contentInDb);
                            return [4 /*yield*/, this.getContentDetailsHandler.decorateContent({
                                    content: content,
                                    attachContentAccess: request.attachContentAccess,
                                    attachContentMarker: request.attachContentAccess,
                                    attachFeedback: request.attachFeedback
                                }).toPromise()];
                        case 2:
                            content = _a.sent();
                            contents.push(content);
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            if (!request.resourcesOnly) return [3 /*break*/, 6];
                            uids = request.uid;
                            contentMarkerQuery = "SELECT * FROM " + ContentMarkerEntry.TABLE_NAME + "\n                                                    WHERE UID IN (" + ArrayUtil.joinPreservingQuotes(uids) + ")";
                            return [4 /*yield*/, this.dbService.execute(contentMarkerQuery).toPromise()];
                        case 5:
                            entries = _a.sent();
                            entries.forEach(function (entry) {
                                var content = {
                                    identifier: entry[ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER],
                                    name: '',
                                    contentData: entry[ContentMarkerEntry.COLUMN_NAME_DATA] &&
                                        JSON.parse(entry[ContentMarkerEntry.COLUMN_NAME_DATA]),
                                    isUpdateAvailable: false,
                                    mimeType: '',
                                    basePath: '',
                                    contentType: '',
                                    primaryCategory: '',
                                    isAvailableLocally: false,
                                    referenceCount: 0,
                                    sizeOnDevice: 0,
                                    lastUsedTime: 0,
                                    lastUpdatedTime: 0,
                                };
                                contents.push(content);
                            });
                            _a.label = 6;
                        case 6: return [2 /*return*/, contents];
                    }
                });
            }); });
        }));
    };
    ContentServiceImpl.prototype.cancelImport = function (contentId) {
        return this.downloadService.cancel({ identifier: contentId });
    };
    ContentServiceImpl.prototype.deleteContent = function (contentDeleteRequest) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var contentDeleteResponse, deleteContentHandler, _i, _a, contentDelete, contentInDb;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentDeleteRequest.contentDeleteList.forEach(function (contentDelete) {
                            var ref = _this.contentUpdateSizeOnDeviceTimeoutRef.get(contentDelete.contentId);
                            if (ref) {
                                clearTimeout(ref);
                                _this.contentUpdateSizeOnDeviceTimeoutRef.delete(contentDelete.contentId);
                            }
                        });
                        contentDeleteResponse = [];
                        deleteContentHandler = new DeleteContentHandler(this.dbService, this.fileService, this.sharedPreferences);
                        _i = 0, _a = contentDeleteRequest.contentDeleteList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        contentDelete = _a[_i];
                        return [4 /*yield*/, this.getContentDetailsHandler.fetchFromDB(contentDelete.contentId).toPromise()];
                    case 2:
                        contentInDb = _b.sent();
                        if (!contentInDb) return [3 /*break*/, 6];
                        contentDeleteResponse.push({
                            identifier: contentDelete.contentId,
                            status: ContentDeleteStatus.DELETED_SUCCESSFULLY
                        });
                        if (!ContentUtil.hasChildren(contentInDb[ContentEntry.COLUMN_NAME_LOCAL_DATA])) return [3 /*break*/, 4];
                        return [4 /*yield*/, deleteContentHandler.deleteAllChildren(contentInDb, contentDelete.isChildContent)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, deleteContentHandler.deleteOrUpdateContent(contentInDb, false, contentDelete.isChildContent)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        contentDeleteResponse.push({
                            identifier: contentDelete.contentId,
                            status: ContentDeleteStatus.NOT_FOUND
                        });
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8:
                        new UpdateSizeOnDevice(this.dbService, this.sharedPreferences, this.fileService).execute();
                        return [2 /*return*/, contentDeleteResponse];
                }
            });
        }); }).pipe(tap(function () { return contentDeleteRequest.contentDeleteList.forEach(function (c) {
            _this.downloadService.onContentDelete(c.contentId);
        }); }));
    };
    ContentServiceImpl.prototype.enqueueContentDelete = function (contentDeleteRequest) {
        return this.contentDeleteRequestSet.addAll(contentDeleteRequest.contentDeleteList);
    };
    ContentServiceImpl.prototype.clearContentDeleteQueue = function () {
        return this.contentDeleteRequestSet.clear();
    };
    ContentServiceImpl.prototype.getContentDeleteQueue = function () {
        return this.contentDeleteRequestSet.asListChanges();
    };
    ContentServiceImpl.prototype.exportContent = function (contentExportRequest) {
        var _this = this;
        var exportHandler = new ImportNExportHandler(this.deviceInfo, this.dbService, this.fileService);
        return from(exportHandler.getContentExportDBModelToExport(contentExportRequest.contentIds)
            .then(function (contentsInDb) {
            return _this.fileService.getTempLocation(contentExportRequest.destinationFolder)
                .then(function (tempLocationPath) {
                var metaData = {};
                var fileName = ContentUtil.getExportedFileName(contentsInDb, _this.appInfo.getAppName());
                metaData['content_count'] = contentsInDb.length;
                var exportContentContext = {
                    metadata: metaData,
                    ecarFilePath: tempLocationPath.nativeURL.concat(fileName),
                    destinationFolder: contentExportRequest.destinationFolder,
                    contentModelsToExport: contentsInDb,
                    tmpLocationPath: tempLocationPath.nativeURL,
                    subContentIds: contentExportRequest.subContentIds
                };
                //     return new CleanTempLoc(this.fileService).execute(exportContentContext);
                // }).then((exportResponse: Response) => {
                return new CreateTempLoc(_this.fileService).execute(exportContentContext);
            }).then(function (exportResponse) {
                return new CreateContentExportManifest(_this.dbService, exportHandler).execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new WriteManifest(_this.fileService, _this.deviceInfo).execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new CompressContent(_this.zipService).execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new DeviceMemoryCheck(_this.fileService).execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new CopyAsset().execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new EcarBundle(_this.fileService, _this.zipService).execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new CopyToDestination().execute(exportResponse, contentExportRequest);
                // }).then((exportResponse: Response) => {
                //     return new DeleteTempEcar(this.fileService).execute(exportResponse.body);
            }).then(function (exportResponse) {
                return new DeleteTempDir().execute(exportResponse.body);
            }).then(function (exportResponse) {
                var fileName = ContentUtil.getExportedFileName(contentsInDb, _this.appInfo.getAppName());
                return new GenerateExportShareTelemetry(_this.telemetryService).execute(exportResponse.body, fileName, contentExportRequest);
            }).then(function (exportResponse) {
                return exportResponse.body;
            });
        }));
    };
    ContentServiceImpl.prototype.getChildContents = function (childContentRequest) {
        var _this = this;
        if (!childContentRequest.level) {
            childContentRequest.level = -1;
        }
        var childContentHandler = new ChildContentsHandler(this.dbService, this.getContentDetailsHandler, this.appConfig);
        var hierarchyInfoList = childContentRequest.hierarchyInfo;
        if (!hierarchyInfoList) {
            hierarchyInfoList = [];
        }
        else if (hierarchyInfoList.length > 0) {
            if (hierarchyInfoList[hierarchyInfoList.length - 1].identifier === childContentRequest.contentId) {
                var length_1 = hierarchyInfoList.length;
                hierarchyInfoList.splice((length_1 - 1), 1);
            }
        }
        return this.dbService.read(GetContentDetailsHandler.getReadContentQuery(childContentRequest.contentId)).pipe(mergeMap(function (rows) { return __awaiter(_this, void 0, void 0, function () {
            var childContentsMap, data, childIdentifiers, query, childContents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        childContentsMap = new Map();
                        data = JSON.parse(rows[0][ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                        childIdentifiers = data.childNodes;
                        // const childIdentifiers = await childContentHandler
                        // .getChildIdentifiersFromManifest(rows[0][ContentEntry.COLUMN_NAME_PATH]!);
                        console.log('childIdentifiers', childIdentifiers);
                        if (!childIdentifiers) return [3 /*break*/, 2];
                        query = "SELECT * FROM " + ContentEntry.TABLE_NAME + "\n                                WHERE " + ContentEntry.COLUMN_NAME_IDENTIFIER + "\n                                IN (" + ArrayUtil.joinPreservingQuotes(childIdentifiers) + ")";
                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                    case 1:
                        childContents = _a.sent();
                        // console.log('childContents', childContents);
                        childContents.forEach(function (element) {
                            childContentsMap.set(element.identifier, element);
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/, childContentHandler.fetchChildrenOfContent(rows[0], childContentsMap, 0, childContentRequest.level, hierarchyInfoList)];
                }
            });
        }); }));
    };
    ContentServiceImpl.prototype.getDownloadState = function () {
        // TODO
        throw new Error('Not Implemented yet');
    };
    ContentServiceImpl.prototype.importContent = function (contentImportRequest) {
        var _this = this;
        var searchContentHandler = new SearchContentHandler(this.appConfig, this.contentServiceConfig, this.telemetryService);
        var contentIds = ArrayUtil.deDupe(contentImportRequest.contentImportArray.map(function (i) { return i.contentId; }));
        var filter = searchContentHandler.getContentSearchFilter(contentIds, contentImportRequest.contentStatusArray, contentImportRequest.fields);
        return new ContentSearchApiHandler(this.apiService, this.contentServiceConfig).handle(filter).pipe(map(function (searchResponse) {
            return (searchResponse.result.content && searchResponse.result.content.length &&
                searchResponse.result.QuestionSet && searchResponse.result.QuestionSet.length) ?
                searchResponse.result.content.concat(searchResponse.result.QuestionSet) :
                searchResponse.result.content || searchResponse.result.QuestionSet;
        }), mergeMap(function (contents) { return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var contentImportResponses, downloadRequestList, _loop_1, _i, contentIds_1, contentId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentImportResponses = [];
                        if (!(contents && contents.length)) return [3 /*break*/, 5];
                        downloadRequestList = [];
                        _loop_1 = function (contentId) {
                            var contentData, contentImport, downloadUrl, status_1, downloadRequest;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        contentData = contents.find(function (x) { return x.identifier === contentId; });
                                        if (!contentData) return [3 /*break*/, 2];
                                        contentImport = contentImportRequest.contentImportArray.find(function (i) { return i.contentId === contentId; });
                                        return [4 /*yield*/, searchContentHandler.getDownloadUrl(contentData, contentImport)];
                                    case 1:
                                        downloadUrl = _a.sent();
                                        status_1 = ContentImportStatus.NOT_FOUND;
                                        if (downloadUrl && FileUtil.getFileExtension(downloadUrl) === FileExtension.CONTENT.valueOf()) {
                                            status_1 = ContentImportStatus.ENQUEUED_FOR_DOWNLOAD;
                                            downloadRequest = {
                                                identifier: contentId,
                                                downloadUrl: downloadUrl,
                                                mimeType: MimeType.ECAR,
                                                destinationFolder: contentImport.destinationFolder,
                                                isChildContent: contentImport.isChildContent,
                                                filename: contentId.concat('.', FileExtension.CONTENT),
                                                correlationData: contentImport.correlationData,
                                                rollUp: contentImport.rollUp,
                                                contentMeta: contentData,
                                                withPriority: contentImportRequest.withPriority ||
                                                    (contentData.mimeType === MimeType.COLLECTION.valueOf() ? 1 : 0),
                                                title: contentData.name ?
                                                    contentData.name.concat('.', FileExtension.CONTENT) : contentId.concat('.', FileExtension.CONTENT)
                                            };
                                            downloadRequestList.push(downloadRequest);
                                        }
                                        contentImportResponses.push({ identifier: contentId, status: status_1 });
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, contentIds_1 = contentIds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < contentIds_1.length)) return [3 /*break*/, 4];
                        contentId = contentIds_1[_i];
                        return [5 /*yield**/, _loop_1(contentId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.downloadService.download(downloadRequestList).toPromise().then();
                        _a.label = 5;
                    case 5: return [2 /*return*/, contentImportResponses];
                }
            });
        }); }); }));
    };
    ContentServiceImpl.prototype.importEcar = function (ecarImportRequest) {
        var _this = this;
        return from(this.fileService.exists(ecarImportRequest.sourceFilePath).then(function (entry) {
            var importContentContext = {
                isChildContent: ecarImportRequest.isChildContent,
                ecarFilePath: ecarImportRequest.sourceFilePath,
                destinationFolder: ecarImportRequest.destinationFolder,
                skippedItemsIdentifier: [],
                items: [],
                contentImportResponseList: [],
                correlationData: ecarImportRequest.correlationData || [],
                rollUp: ecarImportRequest.rollUp || new Rollup(),
                contentIdsToDelete: new Set(),
                identifier: ecarImportRequest.identifier
            };
            return new GenerateInteractTelemetry(_this.telemetryService).execute(importContentContext, 'ContentImport-Initiated')
                .then(function () {
                return _this.fileService.getTempLocation(ecarImportRequest.destinationFolder);
            }).then(function (tempLocation) {
                importContentContext.tmpLocation = tempLocation.nativeURL;
                return new ExtractEcar(_this.fileService, _this.zipService).execute(importContentContext);
            }).then(function (importResponse) {
                return new ValidateEcar(_this.fileService, _this.dbService, _this.appConfig, _this.getContentDetailsHandler).execute(importResponse.body);
            }).then(function (importResponse) {
                return new ExtractPayloads(_this.fileService, _this.zipService, _this.appConfig, _this.dbService, _this.deviceInfo, _this.getContentDetailsHandler, _this.eventsBusService, _this.sharedPreferences)
                    .execute(importResponse.body);
            }).then(function (_a) {
                var importResponse = _a[0], ref = _a[1];
                _this.contentUpdateSizeOnDeviceTimeoutRef.set(importContentContext.rootIdentifier ?
                    importContentContext.rootIdentifier : importContentContext.identifiers[0], ref);
                _this.eventsBusService.emit({
                    namespace: EventNamespace.CONTENT,
                    event: {
                        type: ContentEventType.CONTENT_EXTRACT_COMPLETED,
                        payload: {
                            contentId: importContentContext.rootIdentifier ?
                                importContentContext.rootIdentifier : importContentContext.identifiers[0]
                        }
                    }
                });
                var response = new Response();
                return new CreateContentImportManifest(_this.dbService, _this.deviceInfo, _this.fileService).execute(importResponse.body);
                // }).then((importResponse: Response) => {
                //     return new CreateHierarchy(this.dbService, this.fileService).execute(importResponse.body);
            }).then(function (importResponse) {
                return new EcarCleanup(_this.fileService).execute(importResponse.body);
            }).then(function (importResponse) {
                var response = new Response();
                return _this.cleanupContent(importContentContext).toPromise()
                    .then(function () {
                    response.body = importContentContext;
                    return Promise.resolve(response);
                }).catch(function () {
                    return Promise.reject(response);
                });
                // }).then((importResponse: Response) => {
                //     new UpdateSizeOnDevice(this.dbService, this.sharedPreferences).execute();
                //     return importResponse;
            }).then(function (importResponse) {
                return new GenerateImportShareTelemetry(_this.telemetryService).execute(importResponse.body);
            }).then(function (importResponse) {
                return new GenerateInteractTelemetry(_this.telemetryService).execute(importResponse.body, 'ContentImport-Success');
            }).then(function (importResponse) {
                _this.eventsBusService.emit({
                    namespace: EventNamespace.CONTENT,
                    event: {
                        type: ContentEventType.IMPORT_COMPLETED,
                        payload: {
                            contentId: importContentContext.rootIdentifier ?
                                importContentContext.rootIdentifier : importContentContext.identifiers[0]
                        }
                    }
                });
                return importResponse.body.contentImportResponseList;
            });
        }).catch(function (error) {
            console.log('error', error);
            return [{ identifier: '', status: ContentImportStatus.NOT_FOUND }];
        }));
    };
    ContentServiceImpl.prototype.nextContent = function (hierarchyInfo, currentContentIdentifier, shouldConvertBasePath) {
        var _this = this;
        var childContentHandler = new ChildContentsHandler(this.dbService, this.getContentDetailsHandler, this.appConfig);
        return this.dbService.read(GetContentDetailsHandler.getReadContentQuery(hierarchyInfo[0].identifier)).pipe(mergeMap(function (rows) { return __awaiter(_this, void 0, void 0, function () {
            var contentKeyList, nextContentIdentifier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, childContentHandler.getContentsKeyList(rows[0])];
                    case 1:
                        contentKeyList = _a.sent();
                        nextContentIdentifier = childContentHandler.getNextContentIdentifier(hierarchyInfo, currentContentIdentifier, contentKeyList);
                        return [2 /*return*/, childContentHandler.getContentFromDB(hierarchyInfo, nextContentIdentifier, shouldConvertBasePath)];
                }
            });
        }); }));
    };
    ContentServiceImpl.prototype.prevContent = function (hierarchyInfo, currentContentIdentifier, shouldConvertBasePath) {
        var _this = this;
        var childContentHandler = new ChildContentsHandler(this.dbService, this.getContentDetailsHandler, this.appConfig);
        return this.dbService.read(GetContentDetailsHandler.getReadContentQuery(hierarchyInfo[0].identifier)).pipe(mergeMap(function (rows) { return __awaiter(_this, void 0, void 0, function () {
            var contentKeyList, previousContentIdentifier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, childContentHandler.getContentsKeyList(rows[0])];
                    case 1:
                        contentKeyList = _a.sent();
                        previousContentIdentifier = childContentHandler.getPreviousContentIdentifier(hierarchyInfo, currentContentIdentifier, contentKeyList);
                        return [2 /*return*/, childContentHandler.getContentFromDB(hierarchyInfo, previousContentIdentifier, shouldConvertBasePath)];
                }
            });
        }); }));
    };
    ContentServiceImpl.prototype.getRelevantContent = function (request) {
        var _this = this;
        var relevantContentResponse = {};
        return of(relevantContentResponse).pipe(mergeMap(function (content) {
            if (request.next) {
                return _this.nextContent(request.hierarchyInfo, request.contentIdentifier, request.shouldConvertBasePath).pipe(map(function (nextContet) {
                    relevantContentResponse.nextContent = nextContet;
                    return relevantContentResponse;
                }));
            }
            return of(relevantContentResponse);
        }), mergeMap(function (content) {
            if (request.prev) {
                return _this.prevContent(request.hierarchyInfo, request.contentIdentifier, request.shouldConvertBasePath).pipe(map(function (prevContent) {
                    relevantContentResponse.previousContent = prevContent;
                    return relevantContentResponse;
                }));
            }
            return of(relevantContentResponse);
        }), map(function (contentResponse) {
            var response = {};
            response.next = contentResponse.nextContent ? { content: contentResponse.nextContent } : undefined;
            response.prev = contentResponse.previousContent ? { content: contentResponse.previousContent } : undefined;
            return response;
        }));
    };
    ContentServiceImpl.prototype.subscribeForImportStatus = function (contentId) {
        // TODO
        throw new Error('Not Implemented yet');
    };
    ContentServiceImpl.prototype.searchContent = function (contentSearchCriteria, request, apiHandler, isFromContentAggregator) {
        var _this = this;
        contentSearchCriteria = JSON.parse(JSON.stringify(contentSearchCriteria));
        if (contentSearchCriteria.facetFilters) {
            var mimeTypeFacetFilters = contentSearchCriteria.facetFilters.find(function (f) { return (f.name === 'mimeType'); });
            if (mimeTypeFacetFilters) {
                mimeTypeFacetFilters.values = mimeTypeFacetFilters.values
                    .filter(function (v) { return v.apply; })
                    .reduce(function (acc, v) {
                    acc = acc.concat(v['values'].map(function (f) { return (__assign(__assign({}, f), { apply: true })); }));
                    return acc;
                }, []);
            }
        }
        var searchHandler = new SearchContentHandler(this.appConfig, this.contentServiceConfig, this.telemetryService);
        var languageCode = contentSearchCriteria.languageCode;
        if (request) {
            contentSearchCriteria = searchHandler.getSearchCriteria(request);
            if (languageCode) {
                contentSearchCriteria.languageCode = languageCode;
            }
        }
        else {
            contentSearchCriteria.limit = contentSearchCriteria.limit ? contentSearchCriteria.limit : 100;
            contentSearchCriteria.offset = contentSearchCriteria.offset ? contentSearchCriteria.offset : 0;
        }
        var searchRequest = searchHandler.getSearchContentRequest(contentSearchCriteria);
        return this.sharedPreferences.getString(FrameworkKeys.KEY_ACTIVE_CHANNEL_ACTIVE_FRAMEWORK_ID).pipe(mergeMap(function (frameworkId) {
            if (!apiHandler) {
                apiHandler = new ContentSearchApiHandler(_this.apiService, _this.contentServiceConfig, frameworkId, contentSearchCriteria.languageCode);
            }
            return apiHandler.handle(searchRequest).pipe(map(function (searchResponse) {
                if (!contentSearchCriteria.facetFilters && contentSearchCriteria.searchType === SearchType.SEARCH) {
                    if (!isFromContentAggregator) {
                        searchRequest.filters.contentType = [];
                        searchRequest.filters.primaryCategory = [];
                    }
                    searchRequest.filters.audience = [];
                }
                return searchHandler.mapSearchResponse(contentSearchCriteria, searchResponse, searchRequest);
            }), map(function (contentSearchResponse) {
                if (!contentSearchResponse.filterCriteria.facetFilters) {
                    return contentSearchResponse;
                }
                var mimeTypeFacetFilters = contentSearchResponse.filterCriteria.facetFilters.find(function (f) { return f.name === 'mimeType'; });
                if (mimeTypeFacetFilters) {
                    mimeTypeFacetFilters.values =
                        CsMimeTypeFacetToMimeTypeCategoryAggregator.aggregate(mimeTypeFacetFilters.values, contentSearchCriteria.searchType === 'filter' ? [MimeTypeCategory.ALL] : []);
                }
                return contentSearchResponse;
            }));
        }));
    };
    ContentServiceImpl.prototype.cancelDownload = function (contentId) {
        return this.downloadService.cancel({ identifier: contentId });
    };
    ContentServiceImpl.prototype.setContentMarker = function (contentMarkerRequest) {
        var _this = this;
        var query = "SELECT * FROM " + ContentMarkerEntry.TABLE_NAME + "\n                       WHERE " + ContentMarkerEntry.COLUMN_NAME_UID + " = '" + contentMarkerRequest.uid + "'\n                       AND " + ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER + "='" + contentMarkerRequest.contentId + "'\n                       AND " + ContentMarkerEntry.COLUMN_NAME_MARKER + " = " + contentMarkerRequest.marker;
        return this.dbService.execute(query).pipe(mergeMap(function (contentMarker) {
            var markerModel = {
                uid: contentMarkerRequest.uid,
                identifier: contentMarkerRequest.contentId,
                epoch_timestamp: Date.now(),
                data: contentMarkerRequest.data,
                extra_info: JSON.stringify(contentMarkerRequest.extraInfo),
                marker: contentMarkerRequest.marker.valueOf(),
                mime_type: _this.getMimeType(contentMarkerRequest.data)
            };
            if (ArrayUtil.isEmpty(contentMarker)) {
                return _this.dbService.insert({
                    table: ContentMarkerEntry.TABLE_NAME,
                    modelJson: markerModel
                }).pipe(map(function (v) { return v > 0; }));
            }
            else {
                if (contentMarkerRequest.isMarked) {
                    return _this.dbService.update({
                        table: ContentMarkerEntry.TABLE_NAME,
                        selection: ContentMarkerEntry.COLUMN_NAME_UID + "= ? AND " + ContentMarkerEntry
                            .COLUMN_NAME_CONTENT_IDENTIFIER + "= ? AND " + ContentMarkerEntry.COLUMN_NAME_MARKER + "= ?",
                        selectionArgs: [contentMarkerRequest.uid, contentMarkerRequest.contentId,
                            contentMarkerRequest.marker.valueOf().toString()],
                        modelJson: markerModel
                    }).pipe(map(function (v) { return v > 0; }));
                }
                else {
                    return _this.dbService.delete({
                        table: ContentMarkerEntry.TABLE_NAME,
                        selection: ContentMarkerEntry.COLUMN_NAME_UID + " = ? AND " + ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER + " = ? AND " + ContentMarkerEntry.COLUMN_NAME_MARKER + " = ?",
                        selectionArgs: [contentMarkerRequest.uid, contentMarkerRequest.contentId, '' + contentMarkerRequest.marker]
                    }).pipe(map(function (v) { return v; }));
                }
            }
        }));
    };
    ContentServiceImpl.prototype.onDownloadCompletion = function (request) {
        var _this = this;
        var importEcarRequest = {
            isChildContent: request.isChildContent,
            sourceFilePath: request.downloadedFilePath,
            destinationFolder: request.destinationFolder,
            correlationData: request.correlationData,
            rollUp: request.rollUp,
            identifier: request.identifier
        };
        return this.importEcar(importEcarRequest).pipe(mergeMap(function () {
            // TODO
            // @ts-ignore
            return _this.downloadService.cancel({ identifier: request.identifier }, false);
        }), catchError(function () {
            // TODO
            // @ts-ignore
            return _this.downloadService.cancel({ identifier: request.identifier }, false);
        }), mapTo(undefined));
    };
    ContentServiceImpl.prototype.getContentSpaceUsageSummary = function (contentSpaceUsageSummaryRequest) {
        var contentSpaceUsageSummaryList = [];
        var storageHandler = new ContentStorageHandler(this.dbService);
        return from(storageHandler.getContentUsageSummary(contentSpaceUsageSummaryRequest.paths));
    };
    ContentServiceImpl.prototype.buildContentAggregator = function (formService, courseService, profileService) {
        return new ContentAggregator(new SearchContentHandler(this.appConfig, this.contentServiceConfig, this.telemetryService), formService, this, this.cachedItemStore, courseService, profileService, this.apiService, this.networkInfoService);
    };
    ContentServiceImpl.prototype.getQuestionList = function (questionIds, parentId) {
        var _this = this;
        return this.getContentDetails({
            contentId: parentId,
            objectType: 'QuestionSet'
        }).pipe(switchMap(function (content) {
            if (content.isAvailableLocally && parentId) {
                return _this.questionSetFileReadHandler.getLocallyAvailableQuestion(questionIds, parentId);
            }
            else {
                return _this.contentServiceDelegate.getQuestionList(questionIds);
            }
        }), catchError(function (e) {
            return _this.contentServiceDelegate.getQuestionList(questionIds);
        }));
    };
    ContentServiceImpl.prototype.getQuestionSetHierarchy = function (data) {
        return this.contentServiceDelegate.getQuestionSetHierarchy(data);
    };
    ContentServiceImpl.prototype.getQuestionSetRead = function (contentId, params) {
        return this.contentServiceDelegate.getQuestionSetRead(contentId, params);
    };
    ContentServiceImpl.prototype.getQuestionSetChildren = function (questionSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getChildQuestionSetHandler.handle(questionSetId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContentServiceImpl.prototype.formatSearchCriteria = function (requestMap) {
        var searchHandler = new SearchContentHandler(this.appConfig, this.contentServiceConfig, this.telemetryService);
        return searchHandler.getSearchCriteria(requestMap);
    };
    ContentServiceImpl.prototype.cleanupContent = function (importContentContext) {
        var contentDeleteList = [];
        for (var _i = 0, _a = Array.from(importContentContext.contentIdsToDelete.values()); _i < _a.length; _i++) {
            var contentId = _a[_i];
            var contentDeleteRequest = {
                contentId: contentId,
                isChildContent: false
            };
            contentDeleteList.push(contentDeleteRequest);
        }
        return this.deleteContent({ contentDeleteList: contentDeleteList })
            .pipe(mapTo(undefined));
    };
    ContentServiceImpl.prototype.getMimeType = function (data) {
        var mimeType = '';
        if (data) {
            var localData = JSON.parse(data);
            mimeType = localData['mimeType'];
        }
        return mimeType;
    };
    ContentServiceImpl.prototype.handleContentDeleteRequestSetChanges = function () {
        var _this = this;
        return this.contentDeleteRequestSet.asListChanges().pipe(mergeMap(function (requests) {
            var currentRequest = requests[0];
            if (!currentRequest) {
                return of(undefined);
            }
            return _this.deleteContent({ contentDeleteList: [currentRequest] }).pipe(mergeMap(function () { return _this.contentDeleteRequestSet.remove(currentRequest); }), mapTo(undefined));
        }));
    };
    ContentServiceImpl.prototype.handleUpdateSizeOnDeviceFail = function () {
        var _this = this;
        return this.sharedPreferences.getBoolean(ContentServiceImpl_1.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL).pipe(mergeMap(function (hasUpdated) {
            if (!hasUpdated) {
                return from(new UpdateSizeOnDevice(_this.dbService, _this.sharedPreferences, _this.fileService).execute()).pipe(mapTo(undefined));
            }
            return of(undefined);
        }));
    };
    Object.defineProperty(ContentServiceImpl.prototype, "contentServiceDelegate", {
        get: function () {
            return this.container.get(CsInjectionTokens.CONTENT_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    ContentServiceImpl.prototype.downloadTranscriptFile = function (transcriptReq) {
        var _this = this;
        var dataDirectory = window.device.platform.toLowerCase() === 'ios' ?
            cordova.file.documentsDirectory : cordova.file.externalDataDirectory + ContentServiceImpl_1.DOWNLOAD_DIR_NAME;
        return this.createTranscriptDir(transcriptReq, dataDirectory).then(function () {
            var downloadRequest = {
                uri: transcriptReq.downloadUrl,
                title: transcriptReq.fileName,
                description: '',
                mimeType: '',
                visibleInDownloadsUi: true,
                notificationVisibility: 1,
                destinationInExternalPublicDir: {
                    dirType: 'Download',
                    subPath: transcriptReq.fileName
                },
                headers: [],
                destinationUri: transcriptReq.destinationUrl
            };
            return _this.downloadTranscript(downloadRequest).toPromise()
                .then(function (sourceUrl) {
                if (sourceUrl && sourceUrl.path) {
                    _this.copyFile(sourceUrl.path.split(/\/(?=[^\/]+$)/)[0], dataDirectory.concat('/' + transcriptReq.identifier), transcriptReq.fileName).then(function () {
                        _this.deleteFolder(sourceUrl.path);
                    });
                    return sourceUrl.path;
                }
            });
        });
    };
    ContentServiceImpl.prototype.createTranscriptDir = function (req, dataDirectory) {
        var _this = this;
        return this.fileService.exists(dataDirectory.concat('/' + req.identifier)).then(function (entry) {
            return entry.nativeURL;
        }).catch(function () {
            return _this.fileService.createDir(dataDirectory, false).then(function (directoryEntry) {
                _this.fileService.createDir(dataDirectory.concat('/' + req.identifier), false).then(function (directory) {
                    return directory.nativeURL;
                });
            });
        });
    };
    ContentServiceImpl.prototype.downloadTranscript = function (downloadRequest) {
        return new Observable(function (observer) {
            downloadManager.enqueue(downloadRequest, function (err, id) {
                if (err) {
                    return observer.error(err);
                }
                observer.next(id);
                observer.complete();
            });
        }).pipe(mergeMap(function (downloadId) {
            return interval(1000)
                .pipe(mergeMap(function () {
                return new Observable(function (observer) {
                    downloadManager.query({ ids: [downloadId] }, function (err, entries) {
                        if (err || (entries[0].status === 16)) {
                            return observer.error(err || new Error('Unknown Error'));
                        }
                        return observer.next(entries[0]);
                    });
                });
            }), filter(function (entry) { return entry.status === 8; }), take(1));
        }), map(function (entry) { return ({ path: entry.localUri }); }));
    };
    ContentServiceImpl.prototype.copyFile = function (sourcePath, destinationPath, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.copyFile(sourcePath, destinationPath, fileName, function () {
                            resolve();
                        }, function (err) {
                            console.error(err);
                            resolve(err);
                        });
                    })];
            });
        });
    };
    ContentServiceImpl.prototype.deleteFolder = function (deletedirectory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!deletedirectory) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.rm(deletedirectory, '', function () {
                            resolve();
                        }, function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    var ContentServiceImpl_1;
    ContentServiceImpl.DOWNLOAD_DIR_NAME = 'transcript';
    ContentServiceImpl.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL = ContentKeys.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL;
    ContentServiceImpl.KEY_CONTENT_DELETE_REQUEST_LIST = ContentKeys.KEY_CONTENT_DELETE_REQUEST_LIST;
    ContentServiceImpl = ContentServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.API_SERVICE)),
        __param(2, inject(InjectionTokens.DB_SERVICE)),
        __param(3, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(4, inject(InjectionTokens.FILE_SERVICE)),
        __param(5, inject(InjectionTokens.ZIP_SERVICE)),
        __param(6, inject(InjectionTokens.DEVICE_INFO)),
        __param(7, inject(InjectionTokens.TELEMETRY_SERVICE)),
        __param(8, inject(InjectionTokens.CONTENT_FEEDBACK_SERVICE)),
        __param(9, inject(InjectionTokens.DOWNLOAD_SERVICE)),
        __param(10, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(11, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __param(12, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __param(13, inject(InjectionTokens.APP_INFO)),
        __param(14, inject(InjectionTokens.NETWORKINFO_SERVICE)),
        __param(15, inject(InjectionTokens.CONTAINER)),
        __param(16, inject(InjectionTokens.STORAGE_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, DbService, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Container, Object])
    ], ContentServiceImpl);
    return ContentServiceImpl;
}());
export { ContentServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9pbXBsL2NvbnRlbnQtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQU9ILG1CQUFtQixFQUduQixnQkFBZ0IsRUFPaEIsbUJBQW1CLEVBV25CLGFBQWEsRUFJYixRQUFRLEVBS1IsVUFBVSxHQUNiLE1BQU0sSUFBSSxDQUFDO0FBQ1osT0FBTyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQVksSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQVksRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlGLE9BQU8sRUFBZ0MsUUFBUSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRWxFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFJeEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8s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UUFDeEMsWUFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsWUFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsWUFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsWUFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLFlBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQzNDLFlBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQyxZQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUE7eURBZGUsU0FBUyxrR0FhVixTQUFTO09BL0IxRCxrQkFBa0IsQ0F3MUI5QjtJQUFELHlCQUFDO0NBQUEsQUF4MUJELElBdzFCQztTQXgxQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGlsZENvbnRlbnRSZXF1ZXN0LFxuICAgIENvbnRlbnQsXG4gICAgQ29udGVudERhdGEsXG4gICAgQ29udGVudERlbGV0ZSxcbiAgICBDb250ZW50RGVsZXRlUmVxdWVzdCxcbiAgICBDb250ZW50RGVsZXRlUmVzcG9uc2UsXG4gICAgQ29udGVudERlbGV0ZVN0YXR1cyxcbiAgICBDb250ZW50RGV0YWlsUmVxdWVzdCxcbiAgICBDb250ZW50RG93bmxvYWRSZXF1ZXN0LFxuICAgIENvbnRlbnRFdmVudFR5cGUsXG4gICAgQ29udGVudEV4cG9ydFJlcXVlc3QsXG4gICAgQ29udGVudEV4cG9ydFJlc3BvbnNlLFxuICAgIENvbnRlbnRGZWVkYmFja1NlcnZpY2UsXG4gICAgQ29udGVudEltcG9ydCxcbiAgICBDb250ZW50SW1wb3J0UmVxdWVzdCxcbiAgICBDb250ZW50SW1wb3J0UmVzcG9uc2UsXG4gICAgQ29udGVudEltcG9ydFN0YXR1cyxcbiAgICBDb250ZW50TWFya2VyUmVxdWVzdCxcbiAgICBDb250ZW50UmVxdWVzdCxcbiAgICBDb250ZW50U2VhcmNoQ3JpdGVyaWEsXG4gICAgQ29udGVudFNlYXJjaFJlc3VsdCxcbiAgICBDb250ZW50U2VydmljZSxcbiAgICBDb250ZW50U2VydmljZUNvbmZpZyxcbiAgICBDb250ZW50U3BhY2VVc2FnZVN1bW1hcnlSZXF1ZXN0LFxuICAgIENvbnRlbnRTcGFjZVVzYWdlU3VtbWFyeVJlc3BvbnNlLFxuICAgIEVjYXJJbXBvcnRSZXF1ZXN0LFxuICAgIEV4cG9ydENvbnRlbnRDb250ZXh0LFxuICAgIEZpbGVFeHRlbnNpb24sXG4gICAgRmlsdGVyVmFsdWUsXG4gICAgSGllcmFyY2h5SW5mbyxcbiAgICBJbXBvcnRDb250ZW50Q29udGV4dCxcbiAgICBNaW1lVHlwZSxcbiAgICBSZWxldmFudENvbnRlbnRSZXF1ZXN0LFxuICAgIFJlbGV2YW50Q29udGVudFJlc3BvbnNlLFxuICAgIFJlbGV2YW50Q29udGVudFJlc3BvbnNlUGxheWVyLFxuICAgIFNlYXJjaFJlc3BvbnNlLFxuICAgIFNlYXJjaFR5cGUsXG59IGZyb20gJy4uJztcbmltcG9ydCB7Y29tYmluZUxhdGVzdCwgZGVmZXIsIGZvcmtKb2luLCBmcm9tLCBpbnRlcnZhbCwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXIsIEFwaVNlcnZpY2UsIFJlc3BvbnNlfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge0dldENvbnRlbnREZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZ2V0LWNvbnRlbnQtZGV0YWlscy1oYW5kbGVyJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge0NoaWxkQ29udGVudHNIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVycy9nZXQtY2hpbGQtY29udGVudHMtaGFuZGxlcic7XG5pbXBvcnQge0NvbnRlbnRFbnRyeSwgQ29udGVudE1hcmtlckVudHJ5fSBmcm9tICcuLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtEZWxldGVDb250ZW50SGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZGVsZXRlLWNvbnRlbnQtaGFuZGxlcic7XG5pbXBvcnQge1NlYXJjaENvbnRlbnRIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVycy9zZWFyY2gtY29udGVudC1oYW5kbGVyJztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi8uLi9hcGkvY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtEaXJlY3RvcnlFbnRyeSwgRW50cnl9IGZyb20gJy4uLy4uL3V0aWwvZmlsZSc7XG5pbXBvcnQge0dldENvbnRlbnRzSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZ2V0LWNvbnRlbnRzLWhhbmRsZXInO1xuaW1wb3J0IHtDb250ZW50TWFwcGVyfSBmcm9tICcuLi91dGlsL2NvbnRlbnQtbWFwcGVyJztcbmltcG9ydCB7SW1wb3J0TkV4cG9ydEhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXJzL2ltcG9ydC1uLWV4cG9ydC1oYW5kbGVyJztcbmltcG9ydCB7Q3JlYXRlQ29udGVudEV4cG9ydE1hbmlmZXN0fSBmcm9tICcuLi9oYW5kbGVycy9leHBvcnQvY3JlYXRlLWNvbnRlbnQtZXhwb3J0LW1hbmlmZXN0JztcbmltcG9ydCB7V3JpdGVNYW5pZmVzdH0gZnJvbSAnLi4vaGFuZGxlcnMvZXhwb3J0L3dyaXRlLW1hbmlmZXN0JztcbmltcG9ydCB7Q29tcHJlc3NDb250ZW50fSBmcm9tICcuLi9oYW5kbGVycy9leHBvcnQvY29tcHJlc3MtY29udGVudCc7XG5pbXBvcnQge1ppcFNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvemlwL2RlZi96aXAtc2VydmljZSc7XG5pbXBvcnQge0RldmljZU1lbW9yeUNoZWNrfSBmcm9tICcuLi9oYW5kbGVycy9leHBvcnQvZGV2aWNlLW1lbW9yeS1jaGVjayc7XG5pbXBvcnQge0NvcHlBc3NldH0gZnJvbSAnLi4vaGFuZGxlcnMvZXhwb3J0L2NvcHktYXNzZXQnO1xuaW1wb3J0IHtFY2FyQnVuZGxlfSBmcm9tICcuLi9oYW5kbGVycy9leHBvcnQvZWNhci1idW5kbGUnO1xuaW1wb3J0IHtFeHRyYWN0RWNhcn0gZnJvbSAnLi4vaGFuZGxlcnMvaW1wb3J0L2V4dHJhY3QtZWNhcic7XG5pbXBvcnQge1ZhbGlkYXRlRWNhcn0gZnJvbSAnLi4vaGFuZGxlcnMvaW1wb3J0L3ZhbGlkYXRlLWVjYXInO1xuaW1wb3J0IHtFeHRyYWN0UGF5bG9hZHN9IGZyb20gJy4uL2hhbmRsZXJzL2ltcG9ydC9leHRyYWN0LXBheWxvYWRzJztcbmltcG9ydCB7Q3JlYXRlQ29udGVudEltcG9ydE1hbmlmZXN0fSBmcm9tICcuLi9oYW5kbGVycy9pbXBvcnQvY3JlYXRlLWNvbnRlbnQtaW1wb3J0LW1hbmlmZXN0JztcbmltcG9ydCB7RWNhckNsZWFudXB9IGZyb20gJy4uL2hhbmRsZXJzL2ltcG9ydC9lY2FyLWNsZWFudXAnO1xuaW1wb3J0IHtSb2xsdXAsIFRlbGVtZXRyeVNlcnZpY2V9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge1VwZGF0ZVNpemVPbkRldmljZX0gZnJvbSAnLi4vaGFuZGxlcnMvaW1wb3J0L3VwZGF0ZS1zaXplLW9uLWRldmljZSc7XG5pbXBvcnQge0NyZWF0ZVRlbXBMb2N9IGZyb20gJy4uL2hhbmRsZXJzL2V4cG9ydC9jcmVhdGUtdGVtcC1sb2MnO1xuaW1wb3J0IHtTZWFyY2hSZXF1ZXN0fSBmcm9tICcuLi9kZWYvc2VhcmNoLXJlcXVlc3QnO1xuaW1wb3J0IHtDb250ZW50U2VhcmNoQXBpSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvaW1wb3J0L2NvbnRlbnQtc2VhcmNoLWFwaS1oYW5kbGVyJztcbmltcG9ydCB7QXJyYXlVdGlsfSBmcm9tICcuLi8uLi91dGlsL2FycmF5LXV0aWwnO1xuaW1wb3J0IHtGaWxlVXRpbH0gZnJvbSAnLi4vLi4vdXRpbC9maWxlL3V0aWwvZmlsZS11dGlsJztcbmltcG9ydCB7RG93bmxvYWRSZXF1ZXN0LCBEb3dubG9hZFNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvZG93bmxvYWQnO1xuaW1wb3J0IHtEb3dubG9hZENvbXBsZXRlRGVsZWdhdGV9IGZyb20gJy4uLy4uL3V0aWwvZG93bmxvYWQvZGVmL2Rvd25sb2FkLWNvbXBsZXRlLWRlbGVnYXRlJztcbmltcG9ydCB7RXZlbnROYW1lc3BhY2UsIEV2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IHtHZW5lcmF0ZUltcG9ydFNoYXJlVGVsZW1ldHJ5fSBmcm9tICcuLi9oYW5kbGVycy9pbXBvcnQvZ2VuZXJhdGUtaW1wb3J0LXNoYXJlLXRlbGVtZXRyeSc7XG5pbXBvcnQge0dlbmVyYXRlRXhwb3J0U2hhcmVUZWxlbWV0cnl9IGZyb20gJy4uL2hhbmRsZXJzL2V4cG9ydC9nZW5lcmF0ZS1leHBvcnQtc2hhcmUtdGVsZW1ldHJ5JztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7R2VuZXJhdGVJbnRlcmFjdFRlbGVtZXRyeX0gZnJvbSAnLi4vaGFuZGxlcnMvaW1wb3J0L2dlbmVyYXRlLWludGVyYWN0LXRlbGVtZXRyeSc7XG5pbXBvcnQge0NhY2hlZEl0ZW1TdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7Q29udGVudEtleXMsIEZyYW1ld29ya0tleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge0NvbnRlbnRTdG9yYWdlSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvY29udGVudC1zdG9yYWdlLWhhbmRsZXInO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc1NldENvbGxlY3Rpb259IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzL2RlZi9zaGFyZWQtcHJlZmVyZW5jZXMtc2V0LWNvbGxlY3Rpb24nO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc1NldENvbGxlY3Rpb25JbXBsfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcy9pbXBsL3NoYXJlZC1wcmVmZXJlbmNlcy1zZXQtY29sbGVjdGlvbi1pbXBsJztcbmltcG9ydCB7U2RrU2VydmljZU9uSW5pdERlbGVnYXRlfSBmcm9tICcuLi8uLi9zZGstc2VydmljZS1vbi1pbml0LWRlbGVnYXRlJztcbmltcG9ydCB7Q29udGFpbmVyLCBpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0NzSW5qZWN0aW9uVG9rZW5zLCBJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtEZXZpY2VJbmZvfSBmcm9tICcuLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGZpbHRlciwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0NvcHlUb0Rlc3RpbmF0aW9ufSBmcm9tICcuLi9oYW5kbGVycy9leHBvcnQvY29weS10by1kZXN0aW5hdGlvbic7XG5pbXBvcnQge0FwcEluZm99IGZyb20gJy4uLy4uL3V0aWwvYXBwJztcbmltcG9ydCB7R2V0Q29udGVudEhlaXJhcmNoeUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXJzL2dldC1jb250ZW50LWhlaXJhcmNoeS1oYW5kbGVyJztcbmltcG9ydCB7RGVsZXRlVGVtcERpcn0gZnJvbSAnLi4vaGFuZGxlcnMvZXhwb3J0L2RlbGV0ZXRlLXRlbXAtZGlyJztcbmltcG9ydCB7Q29udGVudEFnZ3JlZ2F0b3J9IGZyb20gJy4uL2hhbmRsZXJzL2NvbnRlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuLi8uLi9mb3JtJztcbmltcG9ydCB7Q3NNaW1lVHlwZUZhY2V0VG9NaW1lVHlwZUNhdGVnb3J5QWdncmVnYXRvcn0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY29udGVudC91dGlsaXRpZXMvbWltZS10eXBlLWZhY2V0LXRvLW1pbWUtdHlwZS1jYXRlZ29yeS1hZ2dyZWdhdG9yJztcbmltcG9ydCB7TWltZVR5cGVDYXRlZ29yeX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvbW9kZWxzL2NvbnRlbnQnO1xuaW1wb3J0IHtDb3Vyc2VTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb3Vyc2UnO1xuaW1wb3J0IHtOZXR3b3JrSW5mb1NlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvbmV0d29yayc7XG5pbXBvcnQgeyBDc0NvbnRlbnRTZXJ2aWNlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY29udGVudCc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3N0b3JhZ2UvZGVmL3N0b3JhZ2Utc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvblNldEZpbGVSZWFkSGFuZGxlciB9IGZyb20gJy4uL2hhbmRsZXJzL3F1ZXN0aW9uLXNldC1maWxlLXJlYWQtaGFuZGxlcic7XG5pbXBvcnQgeyBHZXRDaGlsZFF1ZXN0aW9uU2V0SGFuZGxlciB9IGZyb20gJy4uL2hhbmRsZXJzL2dldC1jaGlsZC1xdWVzdGlvbi1zZXQtaGFuZGxlcidcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIENvbnRlbnRTZXJ2aWNlLCBEb3dubG9hZENvbXBsZXRlRGVsZWdhdGUsIFNka1NlcnZpY2VPbkluaXREZWxlZ2F0ZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRE9XTkxPQURfRElSX05BTUUgPSAndHJhbnNjcmlwdCc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgS0VZX0lTX1VQREFURV9TSVpFX09OX0RFVklDRV9TVUNDRVNTRlVMID0gQ29udGVudEtleXMuS0VZX0lTX1VQREFURV9TSVpFX09OX0RFVklDRV9TVUNDRVNTRlVMO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEtFWV9DT05URU5UX0RFTEVURV9SRVFVRVNUX0xJU1QgPSBDb250ZW50S2V5cy5LRVlfQ09OVEVOVF9ERUxFVEVfUkVRVUVTVF9MSVNUO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZ2V0Q29udGVudERldGFpbHNIYW5kbGVyOiBHZXRDb250ZW50RGV0YWlsc0hhbmRsZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBnZXRDb250ZW50SGVpcmFyY2h5SGFuZGxlcjogR2V0Q29udGVudEhlaXJhcmNoeUhhbmRsZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250ZW50U2VydmljZUNvbmZpZzogQ29udGVudFNlcnZpY2VDb25maWc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhcHBDb25maWc6IEFwcENvbmZpZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IHF1ZXN0aW9uU2V0RmlsZVJlYWRIYW5kbGVyOiBRdWVzdGlvblNldEZpbGVSZWFkSGFuZGxlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdldENoaWxkUXVlc3Rpb25TZXRIYW5kbGVyOiBHZXRDaGlsZFF1ZXN0aW9uU2V0SGFuZGxlcjtcblxuICAgIHByaXZhdGUgY29udGVudERlbGV0ZVJlcXVlc3RTZXQ6IFNoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbjxDb250ZW50RGVsZXRlPjtcblxuICAgIHByaXZhdGUgY29udGVudFVwZGF0ZVNpemVPbkRldmljZVRpbWVvdXRSZWY6IE1hcDxzdHJpbmcsIE5vZGVKUy5UaW1lb3V0PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSkgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5QUk9GSUxFX1NFUlZJQ0UpIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5aSVBfU0VSVklDRSkgcHJpdmF0ZSB6aXBTZXJ2aWNlOiBaaXBTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5ERVZJQ0VfSU5GTykgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5URUxFTUVUUllfU0VSVklDRSkgcHJpdmF0ZSB0ZWxlbWV0cnlTZXJ2aWNlOiBUZWxlbWV0cnlTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DT05URU5UX0ZFRURCQUNLX1NFUlZJQ0UpIHByaXZhdGUgY29udGVudEZlZWRiYWNrU2VydmljZTogQ29udGVudEZlZWRiYWNrU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuRE9XTkxPQURfU0VSVklDRSkgcHJpdmF0ZSBkb3dubG9hZFNlcnZpY2U6IERvd25sb2FkU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0hBUkVEX1BSRUZFUkVOQ0VTKSBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuRVZFTlRTX0JVU19TRVJWSUNFKSBwcml2YXRlIGV2ZW50c0J1c1NlcnZpY2U6IEV2ZW50c0J1c1NlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkNBQ0hFRF9JVEVNX1NUT1JFKSBwcml2YXRlIGNhY2hlZEl0ZW1TdG9yZTogQ2FjaGVkSXRlbVN0b3JlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUFBfSU5GTykgcHJpdmF0ZSBhcHBJbmZvOiBBcHBJbmZvLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5ORVRXT1JLSU5GT19TRVJWSUNFKSBwcml2YXRlIG5ldHdvcmtJbmZvU2VydmljZTogTmV0d29ya0luZm9TZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DT05UQUlORVIpIHByaXZhdGUgY29udGFpbmVyOiBDb250YWluZXIsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNUT1JBR0VfU0VSVklDRSkgcHJpdmF0ZSBzdG9yYWdlU2VydmljZTogU3RvcmFnZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VydmljZUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmNvbnRlbnRTZXJ2aWNlQ29uZmlnO1xuICAgICAgICB0aGlzLmFwcENvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmFwcENvbmZpZztcbiAgICAgICAgdGhpcy5nZXRDb250ZW50RGV0YWlsc0hhbmRsZXIgPSBuZXcgR2V0Q29udGVudERldGFpbHNIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcy5jb250ZW50RmVlZGJhY2tTZXJ2aWNlLCB0aGlzLnByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLCB0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLCB0aGlzLmRiU2VydmljZSwgdGhpcy5ldmVudHNCdXNTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLmdldENvbnRlbnRIZWlyYXJjaHlIYW5kbGVyID0gbmV3IEdldENvbnRlbnRIZWlyYXJjaHlIYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5jb250ZW50U2VydmljZUNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5xdWVzdGlvblNldEZpbGVSZWFkSGFuZGxlciA9IG5ldyBRdWVzdGlvblNldEZpbGVSZWFkSGFuZGxlcih0aGlzLnN0b3JhZ2VTZXJ2aWNlLCB0aGlzLmZpbGVTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLmdldENoaWxkUXVlc3Rpb25TZXRIYW5kbGVyID0gbmV3IEdldENoaWxkUXVlc3Rpb25TZXRIYW5kbGVyKHRoaXMsIHRoaXMuZGJTZXJ2aWNlLCB0aGlzLnN0b3JhZ2VTZXJ2aWNlLCB0aGlzLmZpbGVTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnREZWxldGVSZXF1ZXN0U2V0ID0gbmV3IFNoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbkltcGwoXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICAgICAgQ29udGVudFNlcnZpY2VJbXBsLktFWV9DT05URU5UX0RFTEVURV9SRVFVRVNUX0xJU1QsXG4gICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5jb250ZW50SWRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvbkluaXQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgdGhpcy5kb3dubG9hZFNlcnZpY2UucmVnaXN0ZXJPbkRvd25sb2FkQ29tcGxldGVEZWxlZ2F0ZSh0aGlzKTtcblxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbnRlbnREZWxldGVSZXF1ZXN0U2V0Q2hhbmdlcygpLFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVVcGRhdGVTaXplT25EZXZpY2VGYWlsKClcbiAgICAgICAgXSkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50RGV0YWlscyhyZXF1ZXN0OiBDb250ZW50RGV0YWlsUmVxdWVzdCk6IE9ic2VydmFibGU8Q29udGVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50RGV0YWlsc0hhbmRsZXIuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRIZWlyYXJjaHkocmVxdWVzdDogQ29udGVudERldGFpbFJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudEhlaXJhcmNoeUhhbmRsZXIuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRzKHJlcXVlc3Q6IENvbnRlbnRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxDb250ZW50W10+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgR2V0Q29udGVudHNIYW5kbGVyKCkuZ2V0QWxsTG9jYWxDb250ZW50UXVlcnkocmVxdWVzdCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNvbnRlbnRzSW5EYjogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudHM6IENvbnRlbnRbXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29udGVudEluRGIgb2YgY29udGVudHNJbkRiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IENvbnRlbnRNYXBwZXIubWFwQ29udGVudERCRW50cnlUb0NvbnRlbnQoY29udGVudEluRGIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gYXdhaXQgdGhpcy5nZXRDb250ZW50RGV0YWlsc0hhbmRsZXIuZGVjb3JhdGVDb250ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaENvbnRlbnRBY2Nlc3M6IHJlcXVlc3QuYXR0YWNoQ29udGVudEFjY2VzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hDb250ZW50TWFya2VyOiByZXF1ZXN0LmF0dGFjaENvbnRlbnRBY2Nlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNoRmVlZGJhY2s6IHJlcXVlc3QuYXR0YWNoRmVlZGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50cy5wdXNoKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlc291cmNlc09ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpZHMgPSByZXF1ZXN0LnVpZCBhcyBzdHJpbmdbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRNYXJrZXJRdWVyeSA9IGBTRUxFQ1QgKiBGUk9NICR7Q29udGVudE1hcmtlckVudHJ5LlRBQkxFX05BTUV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgVUlEIElOICgke0FycmF5VXRpbC5qb2luUHJlc2VydmluZ1F1b3Rlcyh1aWRzKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJpZXM6IENvbnRlbnRNYXJrZXJFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoY29udGVudE1hcmtlclF1ZXJ5KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IENvbnRlbnRNYXJrZXJFbnRyeS5TY2hlbWFNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50OiBDb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBlbnRyeVtDb250ZW50TWFya2VyRW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JREVOVElGSUVSXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnREYXRhOiBlbnRyeVtDb250ZW50TWFya2VyRW50cnkuQ09MVU1OX05BTUVfREFUQV0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04ucGFyc2UoZW50cnlbQ29udGVudE1hcmtlckVudHJ5LkNPTFVNTl9OQU1FX0RBVEFdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGVBdmFpbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VQYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5Q2F0ZWdvcnk6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0F2YWlsYWJsZUxvY2FsbHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2VDb3VudDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZU9uRGV2aWNlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VXNlZFRpbWU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVcGRhdGVkVGltZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzLnB1c2goY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50cztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY2FuY2VsSW1wb3J0KGNvbnRlbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG93bmxvYWRTZXJ2aWNlLmNhbmNlbCh7aWRlbnRpZmllcjogY29udGVudElkfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ29udGVudChjb250ZW50RGVsZXRlUmVxdWVzdDogQ29udGVudERlbGV0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnREZWxldGVSZXNwb25zZVtdPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb250ZW50RGVsZXRlUmVxdWVzdC5jb250ZW50RGVsZXRlTGlzdC5mb3JFYWNoKChjb250ZW50RGVsZXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmID0gdGhpcy5jb250ZW50VXBkYXRlU2l6ZU9uRGV2aWNlVGltZW91dFJlZi5nZXQoY29udGVudERlbGV0ZS5jb250ZW50SWQpO1xuICAgICAgICAgICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHJlZik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFVwZGF0ZVNpemVPbkRldmljZVRpbWVvdXRSZWYuZGVsZXRlKGNvbnRlbnREZWxldGUuY29udGVudElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnREZWxldGVSZXNwb25zZTogQ29udGVudERlbGV0ZVJlc3BvbnNlW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUNvbnRlbnRIYW5kbGVyID0gbmV3IERlbGV0ZUNvbnRlbnRIYW5kbGVyKHRoaXMuZGJTZXJ2aWNlLCB0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBjb250ZW50RGVsZXRlIG9mIGNvbnRlbnREZWxldGVSZXF1ZXN0LmNvbnRlbnREZWxldGVMaXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudEluRGIgPSBhd2FpdCB0aGlzLmdldENvbnRlbnREZXRhaWxzSGFuZGxlci5mZXRjaEZyb21EQihjb250ZW50RGVsZXRlLmNvbnRlbnRJZCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRJbkRiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnREZWxldGVSZXNwb25zZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbnRlbnREZWxldGUuY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBDb250ZW50RGVsZXRlU3RhdHVzLkRFTEVURURfU1VDQ0VTU0ZVTExZXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChDb250ZW50VXRpbC5oYXNDaGlsZHJlbihjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkZWxldGVDb250ZW50SGFuZGxlci5kZWxldGVBbGxDaGlsZHJlbihjb250ZW50SW5EYiwgY29udGVudERlbGV0ZS5pc0NoaWxkQ29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkZWxldGVDb250ZW50SGFuZGxlci5kZWxldGVPclVwZGF0ZUNvbnRlbnQoY29udGVudEluRGIsIGZhbHNlLCBjb250ZW50RGVsZXRlLmlzQ2hpbGRDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RGVsZXRlUmVzcG9uc2UucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBjb250ZW50RGVsZXRlLmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogQ29udGVudERlbGV0ZVN0YXR1cy5OT1RfRk9VTkRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3IFVwZGF0ZVNpemVPbkRldmljZSh0aGlzLmRiU2VydmljZSwgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcywgdGhpcy5maWxlU2VydmljZSkuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnREZWxldGVSZXNwb25zZTtcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiBjb250ZW50RGVsZXRlUmVxdWVzdC5jb250ZW50RGVsZXRlTGlzdC5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub25Db250ZW50RGVsZXRlKGMuY29udGVudElkKTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGVucXVldWVDb250ZW50RGVsZXRlKGNvbnRlbnREZWxldGVSZXF1ZXN0OiBDb250ZW50RGVsZXRlUmVxdWVzdCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50RGVsZXRlUmVxdWVzdFNldC5hZGRBbGwoY29udGVudERlbGV0ZVJlcXVlc3QuY29udGVudERlbGV0ZUxpc3QpO1xuICAgIH1cblxuICAgIGNsZWFyQ29udGVudERlbGV0ZVF1ZXVlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50RGVsZXRlUmVxdWVzdFNldC5jbGVhcigpO1xuICAgIH1cblxuICAgIGdldENvbnRlbnREZWxldGVRdWV1ZSgpOiBPYnNlcnZhYmxlPENvbnRlbnREZWxldGVbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50RGVsZXRlUmVxdWVzdFNldC5hc0xpc3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0Q29udGVudChjb250ZW50RXhwb3J0UmVxdWVzdDogQ29udGVudEV4cG9ydFJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnRFeHBvcnRSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBleHBvcnRIYW5kbGVyID0gbmV3IEltcG9ydE5FeHBvcnRIYW5kbGVyKHRoaXMuZGV2aWNlSW5mbywgdGhpcy5kYlNlcnZpY2UsIHRoaXMuZmlsZVNlcnZpY2UpO1xuICAgICAgICByZXR1cm4gZnJvbShleHBvcnRIYW5kbGVyLmdldENvbnRlbnRFeHBvcnREQk1vZGVsVG9FeHBvcnQoY29udGVudEV4cG9ydFJlcXVlc3QuY29udGVudElkcylcbiAgICAgICAgICAgIC50aGVuKChjb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmdldFRlbXBMb2NhdGlvbihjb250ZW50RXhwb3J0UmVxdWVzdC5kZXN0aW5hdGlvbkZvbGRlcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHRlbXBMb2NhdGlvblBhdGg6IERpcmVjdG9yeUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRhRGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBDb250ZW50VXRpbC5nZXRFeHBvcnRlZEZpbGVOYW1lKGNvbnRlbnRzSW5EYiwgdGhpcy5hcHBJbmZvLmdldEFwcE5hbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhRGF0YVsnY29udGVudF9jb3VudCddID0gY29udGVudHNJbkRiLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9ydENvbnRlbnRDb250ZXh0OiBFeHBvcnRDb250ZW50Q29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWNhckZpbGVQYXRoOiB0ZW1wTG9jYXRpb25QYXRoLm5hdGl2ZVVSTC5jb25jYXQoZmlsZU5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uRm9sZGVyOiBjb250ZW50RXhwb3J0UmVxdWVzdC5kZXN0aW5hdGlvbkZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TW9kZWxzVG9FeHBvcnQ6IGNvbnRlbnRzSW5EYixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBMb2NhdGlvblBhdGg6IHRlbXBMb2NhdGlvblBhdGgubmF0aXZlVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNvbnRlbnRJZHM6IGNvbnRlbnRFeHBvcnRSZXF1ZXN0LnN1YkNvbnRlbnRJZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyBDbGVhblRlbXBMb2ModGhpcy5maWxlU2VydmljZSkuZXhlY3V0ZShleHBvcnRDb250ZW50Q29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KS50aGVuKChleHBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ3JlYXRlVGVtcExvYyh0aGlzLmZpbGVTZXJ2aWNlKS5leGVjdXRlKGV4cG9ydENvbnRlbnRDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoZXhwb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENyZWF0ZUNvbnRlbnRFeHBvcnRNYW5pZmVzdCh0aGlzLmRiU2VydmljZSwgZXhwb3J0SGFuZGxlcikuZXhlY3V0ZShleHBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoZXhwb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdyaXRlTWFuaWZlc3QodGhpcy5maWxlU2VydmljZSwgdGhpcy5kZXZpY2VJbmZvKS5leGVjdXRlKGV4cG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChleHBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29tcHJlc3NDb250ZW50KHRoaXMuemlwU2VydmljZSkuZXhlY3V0ZShleHBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoZXhwb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERldmljZU1lbW9yeUNoZWNrKHRoaXMuZmlsZVNlcnZpY2UpLmV4ZWN1dGUoZXhwb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKGV4cG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb3B5QXNzZXQoKS5leGVjdXRlKGV4cG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChleHBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRWNhckJ1bmRsZSh0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLnppcFNlcnZpY2UpLmV4ZWN1dGUoZXhwb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKGV4cG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb3B5VG9EZXN0aW5hdGlvbigpLmV4ZWN1dGUoZXhwb3J0UmVzcG9uc2UsIGNvbnRlbnRFeHBvcnRSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pLnRoZW4oKGV4cG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBuZXcgRGVsZXRlVGVtcEVjYXIodGhpcy5maWxlU2VydmljZSkuZXhlY3V0ZShleHBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoZXhwb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERlbGV0ZVRlbXBEaXIoKS5leGVjdXRlKGV4cG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChleHBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gQ29udGVudFV0aWwuZ2V0RXhwb3J0ZWRGaWxlTmFtZShjb250ZW50c0luRGIsIHRoaXMuYXBwSW5mby5nZXRBcHBOYW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0ZUV4cG9ydFNoYXJlVGVsZW1ldHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVsZW1ldHJ5U2VydmljZSkuZXhlY3V0ZShleHBvcnRSZXNwb25zZS5ib2R5LCBmaWxlTmFtZSwgY29udGVudEV4cG9ydFJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKGV4cG9ydFJlc3BvbnNlOiBSZXNwb25zZTxDb250ZW50RXhwb3J0UmVzcG9uc2U+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0UmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZW50cyhjaGlsZENvbnRlbnRSZXF1ZXN0OiBDaGlsZENvbnRlbnRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxDb250ZW50PiB7XG4gICAgICAgIGlmICghY2hpbGRDb250ZW50UmVxdWVzdC5sZXZlbCkge1xuICAgICAgICAgICAgY2hpbGRDb250ZW50UmVxdWVzdC5sZXZlbCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoaWxkQ29udGVudEhhbmRsZXIgPSBuZXcgQ2hpbGRDb250ZW50c0hhbmRsZXIodGhpcy5kYlNlcnZpY2UsIHRoaXMuZ2V0Q29udGVudERldGFpbHNIYW5kbGVyLCB0aGlzLmFwcENvbmZpZyk7XG4gICAgICAgIGxldCBoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdID0gY2hpbGRDb250ZW50UmVxdWVzdC5oaWVyYXJjaHlJbmZvO1xuICAgICAgICBpZiAoIWhpZXJhcmNoeUluZm9MaXN0KSB7XG4gICAgICAgICAgICBoaWVyYXJjaHlJbmZvTGlzdCA9IFtdO1xuICAgICAgICB9IGVsc2UgaWYgKGhpZXJhcmNoeUluZm9MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChoaWVyYXJjaHlJbmZvTGlzdFtoaWVyYXJjaHlJbmZvTGlzdC5sZW5ndGggLSAxXS5pZGVudGlmaWVyID09PSBjaGlsZENvbnRlbnRSZXF1ZXN0LmNvbnRlbnRJZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGhpZXJhcmNoeUluZm9MaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBoaWVyYXJjaHlJbmZvTGlzdC5zcGxpY2UoKGxlbmd0aCAtIDEpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKEdldENvbnRlbnREZXRhaWxzSGFuZGxlci5nZXRSZWFkQ29udGVudFF1ZXJ5KGNoaWxkQ29udGVudFJlcXVlc3QuY29udGVudElkKSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKGFzeW5jIChyb3dzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbnRlbnRzTWFwOiBNYXA8c3RyaW5nLCBDb250ZW50RW50cnkuU2NoZW1hTWFwPiA9IG5ldyBNYXA8c3RyaW5nLCBDb250ZW50RW50cnkuU2NoZW1hTWFwPigpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHBhcmVudENvbnRlbnQgPSBDb250ZW50TWFwcGVyLm1hcENvbnRlbnREQkVudHJ5VG9Db250ZW50KHJvd3NbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJvd3NbMF1bQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZElkZW50aWZpZXJzID0gZGF0YS5jaGlsZE5vZGVzO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgY2hpbGRJZGVudGlmaWVycyA9IGF3YWl0IGNoaWxkQ29udGVudEhhbmRsZXJcbiAgICAgICAgICAgICAgICAvLyAuZ2V0Q2hpbGRJZGVudGlmaWVyc0Zyb21NYW5pZmVzdChyb3dzWzBdW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QQVRIXSEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGlsZElkZW50aWZpZXJzJywgY2hpbGRJZGVudGlmaWVycyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkSWRlbnRpZmllcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUICogRlJPTSAke0NvbnRlbnRFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXSEVSRSAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTiAoJHtBcnJheVV0aWwuam9pblByZXNlcnZpbmdRdW90ZXMoY2hpbGRJZGVudGlmaWVycyl9KWA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50cyA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hpbGRDb250ZW50cycsIGNoaWxkQ29udGVudHMpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzTWFwLnNldChlbGVtZW50LmlkZW50aWZpZXIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRDb250ZW50SGFuZGxlci5mZXRjaENoaWxkcmVuT2ZDb250ZW50KFxuICAgICAgICAgICAgICAgICAgICByb3dzWzBdLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzTWFwLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRSZXF1ZXN0LmxldmVsISxcbiAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5SW5mb0xpc3RcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXREb3dubG9hZFN0YXRlKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgSW1wbGVtZW50ZWQgeWV0Jyk7XG4gICAgfVxuXG4gICAgaW1wb3J0Q29udGVudChjb250ZW50SW1wb3J0UmVxdWVzdDogQ29udGVudEltcG9ydFJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnRJbXBvcnRSZXNwb25zZVtdPiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaENvbnRlbnRIYW5kbGVyID0gbmV3IFNlYXJjaENvbnRlbnRIYW5kbGVyKHRoaXMuYXBwQ29uZmlnLCB0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLCB0aGlzLnRlbGVtZXRyeVNlcnZpY2UpO1xuICAgICAgICBjb25zdCBjb250ZW50SWRzOiBzdHJpbmdbXSA9IEFycmF5VXRpbC5kZUR1cGUoY29udGVudEltcG9ydFJlcXVlc3QuY29udGVudEltcG9ydEFycmF5Lm1hcCgoaSkgPT4gaS5jb250ZW50SWQpKTtcbiAgICAgICAgY29uc3QgZmlsdGVyOiBTZWFyY2hSZXF1ZXN0ID1cbiAgICAgICAgICAgIHNlYXJjaENvbnRlbnRIYW5kbGVyLmdldENvbnRlbnRTZWFyY2hGaWx0ZXIoY29udGVudElkcywgY29udGVudEltcG9ydFJlcXVlc3QuY29udGVudFN0YXR1c0FycmF5LCBjb250ZW50SW1wb3J0UmVxdWVzdC5maWVsZHMpO1xuICAgICAgICByZXR1cm4gbmV3IENvbnRlbnRTZWFyY2hBcGlIYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5jb250ZW50U2VydmljZUNvbmZpZykuaGFuZGxlKGZpbHRlcikucGlwZShcbiAgICAgICAgICAgIG1hcCgoc2VhcmNoUmVzcG9uc2U6IFNlYXJjaFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzZWFyY2hSZXNwb25zZS5yZXN1bHQuY29udGVudCAmJiBzZWFyY2hSZXNwb25zZS5yZXN1bHQuY29udGVudC5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3BvbnNlLnJlc3VsdC5RdWVzdGlvblNldCAmJiBzZWFyY2hSZXNwb25zZS5yZXN1bHQuUXVlc3Rpb25TZXQubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICBzZWFyY2hSZXNwb25zZS5yZXN1bHQuY29udGVudC5jb25jYXQoc2VhcmNoUmVzcG9uc2UucmVzdWx0LlF1ZXN0aW9uU2V0KSA6XG4gICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzcG9uc2UucmVzdWx0LmNvbnRlbnQgfHwgc2VhcmNoUmVzcG9uc2UucmVzdWx0LlF1ZXN0aW9uU2V0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudHM6IENvbnRlbnREYXRhW10pID0+IGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50SW1wb3J0UmVzcG9uc2VzOiBDb250ZW50SW1wb3J0UmVzcG9uc2VbXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRzICYmIGNvbnRlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZFJlcXVlc3RMaXN0OiBEb3dubG9hZFJlcXVlc3RbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbnRlbnRJZCBvZiBjb250ZW50SWRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50RGF0YTogQ29udGVudERhdGEgfCB1bmRlZmluZWQgPSBjb250ZW50cy5maW5kKHggPT4geC5pZGVudGlmaWVyID09PSBjb250ZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnREYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudEltcG9ydDogQ29udGVudEltcG9ydCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJbXBvcnRSZXF1ZXN0LmNvbnRlbnRJbXBvcnRBcnJheS5maW5kKChpKSA9PiBpLmNvbnRlbnRJZCA9PT0gY29udGVudElkKSE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRVcmwgPSBhd2FpdCBzZWFyY2hDb250ZW50SGFuZGxlci5nZXREb3dubG9hZFVybChjb250ZW50RGF0YSwgY29udGVudEltcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXR1czogQ29udGVudEltcG9ydFN0YXR1cyA9IENvbnRlbnRJbXBvcnRTdGF0dXMuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb3dubG9hZFVybCAmJiBGaWxlVXRpbC5nZXRGaWxlRXh0ZW5zaW9uKGRvd25sb2FkVXJsKSA9PT0gRmlsZUV4dGVuc2lvbi5DT05URU5ULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBDb250ZW50SW1wb3J0U3RhdHVzLkVOUVVFVUVEX0ZPUl9ET1dOTE9BRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRSZXF1ZXN0OiBDb250ZW50RG93bmxvYWRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRVcmw6IGRvd25sb2FkVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWltZVR5cGU6IE1pbWVUeXBlLkVDQVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkZvbGRlcjogY29udGVudEltcG9ydC5kZXN0aW5hdGlvbkZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hpbGRDb250ZW50OiBjb250ZW50SW1wb3J0LmlzQ2hpbGRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGNvbnRlbnRJZC5jb25jYXQoJy4nLCBGaWxlRXh0ZW5zaW9uLkNPTlRFTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBjb250ZW50SW1wb3J0LmNvcnJlbGF0aW9uRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGxVcDogY29udGVudEltcG9ydC5yb2xsVXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TWV0YTogY29udGVudERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoUHJpb3JpdHk6IGNvbnRlbnRJbXBvcnRSZXF1ZXN0LndpdGhQcmlvcml0eSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZW50RGF0YS5taW1lVHlwZSA9PT0gTWltZVR5cGUuQ09MTEVDVElPTi52YWx1ZU9mKCkgPyAxIDogMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogY29udGVudERhdGEubmFtZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnREYXRhLm5hbWUuY29uY2F0KCcuJywgRmlsZUV4dGVuc2lvbi5DT05URU5UKSA6IGNvbnRlbnRJZC5jb25jYXQoJy4nLCBGaWxlRXh0ZW5zaW9uLkNPTlRFTlQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkUmVxdWVzdExpc3QucHVzaChkb3dubG9hZFJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SW1wb3J0UmVzcG9uc2VzLnB1c2goe2lkZW50aWZpZXI6IGNvbnRlbnRJZCwgc3RhdHVzOiBzdGF0dXN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkU2VydmljZS5kb3dubG9hZChkb3dubG9hZFJlcXVlc3RMaXN0KS50b1Byb21pc2UoKS50aGVuKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRJbXBvcnRSZXNwb25zZXM7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpbXBvcnRFY2FyKGVjYXJJbXBvcnRSZXF1ZXN0OiBFY2FySW1wb3J0UmVxdWVzdCk6IE9ic2VydmFibGU8Q29udGVudEltcG9ydFJlc3BvbnNlW10+IHtcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5maWxlU2VydmljZS5leGlzdHMoZWNhckltcG9ydFJlcXVlc3Quc291cmNlRmlsZVBhdGgpLnRoZW4oKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0Q29udGVudENvbnRleHQ6IEltcG9ydENvbnRlbnRDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgIGlzQ2hpbGRDb250ZW50OiBlY2FySW1wb3J0UmVxdWVzdC5pc0NoaWxkQ29udGVudCxcbiAgICAgICAgICAgICAgICBlY2FyRmlsZVBhdGg6IGVjYXJJbXBvcnRSZXF1ZXN0LnNvdXJjZUZpbGVQYXRoLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uRm9sZGVyOiBlY2FySW1wb3J0UmVxdWVzdC5kZXN0aW5hdGlvbkZvbGRlcixcbiAgICAgICAgICAgICAgICBza2lwcGVkSXRlbXNJZGVudGlmaWVyOiBbXSxcbiAgICAgICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICAgICAgY29udGVudEltcG9ydFJlc3BvbnNlTGlzdDogW10sXG4gICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBlY2FySW1wb3J0UmVxdWVzdC5jb3JyZWxhdGlvbkRhdGEgfHwgW10sXG4gICAgICAgICAgICAgICAgcm9sbFVwOiBlY2FySW1wb3J0UmVxdWVzdC5yb2xsVXAgfHwgbmV3IFJvbGx1cCgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRJZHNUb0RlbGV0ZTogbmV3IFNldCgpLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGVjYXJJbXBvcnRSZXF1ZXN0LmlkZW50aWZpZXJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRlSW50ZXJhY3RUZWxlbWV0cnkodGhpcy50ZWxlbWV0cnlTZXJ2aWNlKS5leGVjdXRlKGltcG9ydENvbnRlbnRDb250ZXh0LCAnQ29udGVudEltcG9ydC1Jbml0aWF0ZWQnKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuZ2V0VGVtcExvY2F0aW9uKGVjYXJJbXBvcnRSZXF1ZXN0LmRlc3RpbmF0aW9uRm9sZGVyKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKCh0ZW1wTG9jYXRpb246IERpcmVjdG9yeUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGltcG9ydENvbnRlbnRDb250ZXh0LnRtcExvY2F0aW9uID0gdGVtcExvY2F0aW9uLm5hdGl2ZVVSTDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFeHRyYWN0RWNhcih0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLnppcFNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0Q29udGVudENvbnRleHQpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRlRWNhcih0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLmRiU2VydmljZSwgdGhpcy5hcHBDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENvbnRlbnREZXRhaWxzSGFuZGxlcikuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFeHRyYWN0UGF5bG9hZHModGhpcy5maWxlU2VydmljZSwgdGhpcy56aXBTZXJ2aWNlLCB0aGlzLmFwcENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLCB0aGlzLmRldmljZUluZm8sIHRoaXMuZ2V0Q29udGVudERldGFpbHNIYW5kbGVyLCB0aGlzLmV2ZW50c0J1c1NlcnZpY2UsIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKChbaW1wb3J0UmVzcG9uc2UsIHJlZl06IFtSZXNwb25zZSwgTm9kZUpTLlRpbWVvdXRdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFVwZGF0ZVNpemVPbkRldmljZVRpbWVvdXRSZWYuc2V0KGltcG9ydENvbnRlbnRDb250ZXh0LnJvb3RJZGVudGlmaWVyID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydENvbnRlbnRDb250ZXh0LnJvb3RJZGVudGlmaWVyIDogaW1wb3J0Q29udGVudENvbnRleHQuaWRlbnRpZmllcnMhWzBdLCByZWYpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLkNPTlRFTlQsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IENvbnRlbnRFdmVudFR5cGUuQ09OVEVOVF9FWFRSQUNUX0NPTVBMRVRFRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJZDogaW1wb3J0Q29udGVudENvbnRleHQucm9vdElkZW50aWZpZXIgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0Q29udGVudENvbnRleHQucm9vdElkZW50aWZpZXIgOiBpbXBvcnRDb250ZW50Q29udGV4dC5pZGVudGlmaWVycyFbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDcmVhdGVDb250ZW50SW1wb3J0TWFuaWZlc3QodGhpcy5kYlNlcnZpY2UsIHRoaXMuZGV2aWNlSW5mbywgdGhpcy5maWxlU2VydmljZSkuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gbmV3IENyZWF0ZUhpZXJhcmNoeSh0aGlzLmRiU2VydmljZSwgdGhpcy5maWxlU2VydmljZSkuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFY2FyQ2xlYW51cCh0aGlzLmZpbGVTZXJ2aWNlKS5leGVjdXRlKGltcG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW51cENvbnRlbnQoaW1wb3J0Q29udGVudENvbnRleHQpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGltcG9ydENvbnRlbnRDb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBuZXcgVXBkYXRlU2l6ZU9uRGV2aWNlKHRoaXMuZGJTZXJ2aWNlLCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzKS5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gaW1wb3J0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGVJbXBvcnRTaGFyZVRlbGVtZXRyeSh0aGlzLnRlbGVtZXRyeVNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgfSkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGVJbnRlcmFjdFRlbGVtZXRyeSh0aGlzLnRlbGVtZXRyeVNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSwgJ0NvbnRlbnRJbXBvcnQtU3VjY2VzcycpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZTxJbXBvcnRDb250ZW50Q29udGV4dD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNCdXNTZXJ2aWNlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBFdmVudE5hbWVzcGFjZS5DT05URU5ULFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb250ZW50RXZlbnRUeXBlLklNUE9SVF9DT01QTEVURUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGltcG9ydENvbnRlbnRDb250ZXh0LnJvb3RJZGVudGlmaWVyID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydENvbnRlbnRDb250ZXh0LnJvb3RJZGVudGlmaWVyIDogaW1wb3J0Q29udGVudENvbnRleHQuaWRlbnRpZmllcnMhWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGltcG9ydFJlc3BvbnNlLmJvZHkuY29udGVudEltcG9ydFJlc3BvbnNlTGlzdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW3tpZGVudGlmaWVyOiAnJywgc3RhdHVzOiBDb250ZW50SW1wb3J0U3RhdHVzLk5PVF9GT1VORH1dO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgbmV4dENvbnRlbnQoaGllcmFyY2h5SW5mbzogSGllcmFyY2h5SW5mb1tdLCBjdXJyZW50Q29udGVudElkZW50aWZpZXI6IHN0cmluZywgc2hvdWxkQ29udmVydEJhc2VQYXRoPzogYm9vbGVhbik6IE9ic2VydmFibGU8Q29udGVudD4ge1xuICAgICAgICBjb25zdCBjaGlsZENvbnRlbnRIYW5kbGVyID0gbmV3IENoaWxkQ29udGVudHNIYW5kbGVyKHRoaXMuZGJTZXJ2aWNlLCB0aGlzLmdldENvbnRlbnREZXRhaWxzSGFuZGxlciwgdGhpcy5hcHBDb25maWcpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZChHZXRDb250ZW50RGV0YWlsc0hhbmRsZXIuZ2V0UmVhZENvbnRlbnRRdWVyeShoaWVyYXJjaHlJbmZvWzBdLmlkZW50aWZpZXIpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoYXN5bmMgKHJvd3M6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRLZXlMaXN0ID0gYXdhaXQgY2hpbGRDb250ZW50SGFuZGxlci5nZXRDb250ZW50c0tleUxpc3Qocm93c1swXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dENvbnRlbnRJZGVudGlmaWVyID0gY2hpbGRDb250ZW50SGFuZGxlci5nZXROZXh0Q29udGVudElkZW50aWZpZXIoaGllcmFyY2h5SW5mbyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnRJZGVudGlmaWVyLCBjb250ZW50S2V5TGlzdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkQ29udGVudEhhbmRsZXIuZ2V0Q29udGVudEZyb21EQihoaWVyYXJjaHlJbmZvLCBuZXh0Q29udGVudElkZW50aWZpZXIsIHNob3VsZENvbnZlcnRCYXNlUGF0aCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByZXZDb250ZW50KGhpZXJhcmNoeUluZm86IEhpZXJhcmNoeUluZm9bXSwgY3VycmVudENvbnRlbnRJZGVudGlmaWVyOiBzdHJpbmcsIHNob3VsZENvbnZlcnRCYXNlUGF0aD86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPENvbnRlbnQ+IHtcbiAgICAgICAgY29uc3QgY2hpbGRDb250ZW50SGFuZGxlciA9IG5ldyBDaGlsZENvbnRlbnRzSGFuZGxlcih0aGlzLmRiU2VydmljZSwgdGhpcy5nZXRDb250ZW50RGV0YWlsc0hhbmRsZXIsIHRoaXMuYXBwQ29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoR2V0Q29udGVudERldGFpbHNIYW5kbGVyLmdldFJlYWRDb250ZW50UXVlcnkoaGllcmFyY2h5SW5mb1swXS5pZGVudGlmaWVyKSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKGFzeW5jIChyb3dzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50S2V5TGlzdCA9IGF3YWl0IGNoaWxkQ29udGVudEhhbmRsZXIuZ2V0Q29udGVudHNLZXlMaXN0KHJvd3NbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGVudElkZW50aWZpZXIgPSBjaGlsZENvbnRlbnRIYW5kbGVyLmdldFByZXZpb3VzQ29udGVudElkZW50aWZpZXIoaGllcmFyY2h5SW5mbyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnRJZGVudGlmaWVyLCBjb250ZW50S2V5TGlzdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkQ29udGVudEhhbmRsZXIuZ2V0Q29udGVudEZyb21EQihoaWVyYXJjaHlJbmZvLCBwcmV2aW91c0NvbnRlbnRJZGVudGlmaWVyLCBzaG91bGRDb252ZXJ0QmFzZVBhdGgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRSZWxldmFudENvbnRlbnQocmVxdWVzdDogUmVsZXZhbnRDb250ZW50UmVxdWVzdCk6IE9ic2VydmFibGU8UmVsZXZhbnRDb250ZW50UmVzcG9uc2VQbGF5ZXI+IHtcbiAgICAgICAgY29uc3QgcmVsZXZhbnRDb250ZW50UmVzcG9uc2U6IFJlbGV2YW50Q29udGVudFJlc3BvbnNlID0ge307XG4gICAgICAgIHJldHVybiBvZihyZWxldmFudENvbnRlbnRSZXNwb25zZSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0Q29udGVudChyZXF1ZXN0LmhpZXJhcmNoeUluZm8hLCByZXF1ZXN0LmNvbnRlbnRJZGVudGlmaWVyISwgcmVxdWVzdC5zaG91bGRDb252ZXJ0QmFzZVBhdGgpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoKG5leHRDb250ZXQ6IENvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxldmFudENvbnRlbnRSZXNwb25zZS5uZXh0Q29udGVudCA9IG5leHRDb250ZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbGV2YW50Q29udGVudFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb2YocmVsZXZhbnRDb250ZW50UmVzcG9uc2UpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldkNvbnRlbnQocmVxdWVzdC5oaWVyYXJjaHlJbmZvISwgcmVxdWVzdC5jb250ZW50SWRlbnRpZmllciEsIHJlcXVlc3Quc2hvdWxkQ29udmVydEJhc2VQYXRoKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChwcmV2Q29udGVudDogQ29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGV2YW50Q29udGVudFJlc3BvbnNlLnByZXZpb3VzQ29udGVudCA9IHByZXZDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWxldmFudENvbnRlbnRSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHJlbGV2YW50Q29udGVudFJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChjb250ZW50UmVzcG9uc2U6IFJlbGV2YW50Q29udGVudFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlbGV2YW50Q29udGVudFJlc3BvbnNlUGxheWVyID0ge307XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UubmV4dCA9IGNvbnRlbnRSZXNwb25zZS5uZXh0Q29udGVudCA/IHtjb250ZW50OiBjb250ZW50UmVzcG9uc2UubmV4dENvbnRlbnQhfSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5wcmV2ID0gY29udGVudFJlc3BvbnNlLnByZXZpb3VzQ29udGVudCEgPyB7Y29udGVudDogY29udGVudFJlc3BvbnNlLnByZXZpb3VzQ29udGVudCF9IDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRm9ySW1wb3J0U3RhdHVzKGNvbnRlbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBJbXBsZW1lbnRlZCB5ZXQnKTtcbiAgICB9XG5cbiAgICBzZWFyY2hDb250ZW50KFxuICAgICAgICBjb250ZW50U2VhcmNoQ3JpdGVyaWE6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSxcbiAgICAgICAgcmVxdWVzdD86IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgICAgIGFwaUhhbmRsZXI/OiBBcGlSZXF1ZXN0SGFuZGxlcjxTZWFyY2hSZXF1ZXN0LCBTZWFyY2hSZXNwb25zZT4sXG4gICAgICAgIGlzRnJvbUNvbnRlbnRBZ2dyZWdhdG9yPzogYm9vbGVhbixcbiAgICApOiBPYnNlcnZhYmxlPENvbnRlbnRTZWFyY2hSZXN1bHQ+IHtcbiAgICAgICAgY29udGVudFNlYXJjaENyaXRlcmlhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb250ZW50U2VhcmNoQ3JpdGVyaWEpKTtcbiAgICAgICAgaWYgKGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5mYWNldEZpbHRlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlRmFjZXRGaWx0ZXJzID0gY29udGVudFNlYXJjaENyaXRlcmlhLmZhY2V0RmlsdGVycy5maW5kKGYgPT4gKGYubmFtZSA9PT0gJ21pbWVUeXBlJykpO1xuICAgICAgICAgICAgaWYgKG1pbWVUeXBlRmFjZXRGaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVGYWNldEZpbHRlcnMudmFsdWVzID0gbWltZVR5cGVGYWNldEZpbHRlcnMudmFsdWVzXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKHYgPT4gdi5hcHBseSlcbiAgICAgICAgICAgICAgICAgIC5yZWR1Y2U8RmlsdGVyVmFsdWVbXT4oKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGFjYyA9IGFjYy5jb25jYXQoKHZbJ3ZhbHVlcyddIGFzIEZpbHRlclZhbHVlW10pLm1hcChmID0+ICh7Li4uZiwgYXBwbHk6IHRydWV9KSkpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hIYW5kbGVyOiBTZWFyY2hDb250ZW50SGFuZGxlciA9IG5ldyBTZWFyY2hDb250ZW50SGFuZGxlcih0aGlzLmFwcENvbmZpZyxcbiAgICAgICAgICAgIHRoaXMuY29udGVudFNlcnZpY2VDb25maWcsIHRoaXMudGVsZW1ldHJ5U2VydmljZSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlQ29kZSA9IGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5sYW5ndWFnZUNvZGU7XG4gICAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICBjb250ZW50U2VhcmNoQ3JpdGVyaWEgPSBzZWFyY2hIYW5kbGVyLmdldFNlYXJjaENyaXRlcmlhKHJlcXVlc3QpO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlQ29kZSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5sYW5ndWFnZUNvZGUgPSBsYW5ndWFnZUNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50U2VhcmNoQ3JpdGVyaWEubGltaXQgPSBjb250ZW50U2VhcmNoQ3JpdGVyaWEubGltaXQgPyBjb250ZW50U2VhcmNoQ3JpdGVyaWEubGltaXQgOiAxMDA7XG4gICAgICAgICAgICBjb250ZW50U2VhcmNoQ3JpdGVyaWEub2Zmc2V0ID0gY29udGVudFNlYXJjaENyaXRlcmlhLm9mZnNldCA/IGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5vZmZzZXQgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoUmVxdWVzdCA9IHNlYXJjaEhhbmRsZXIuZ2V0U2VhcmNoQ29udGVudFJlcXVlc3QoY29udGVudFNlYXJjaENyaXRlcmlhKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoRnJhbWV3b3JrS2V5cy5LRVlfQUNUSVZFX0NIQU5ORUxfQUNUSVZFX0ZSQU1FV09SS19JRCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChmcmFtZXdvcmtJZD86IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghYXBpSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBhcGlIYW5kbGVyID0gbmV3IENvbnRlbnRTZWFyY2hBcGlIYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5jb250ZW50U2VydmljZUNvbmZpZywgZnJhbWV3b3JrSWQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFNlYXJjaENyaXRlcmlhLmxhbmd1YWdlQ29kZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwaUhhbmRsZXIuaGFuZGxlKHNlYXJjaFJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoc2VhcmNoUmVzcG9uc2U6IFNlYXJjaFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnRTZWFyY2hDcml0ZXJpYS5mYWNldEZpbHRlcnMgJiYgY29udGVudFNlYXJjaENyaXRlcmlhLnNlYXJjaFR5cGUgPT09IFNlYXJjaFR5cGUuU0VBUkNIKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Zyb21Db250ZW50QWdncmVnYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXF1ZXN0LmZpbHRlcnMuY29udGVudFR5cGUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVxdWVzdC5maWx0ZXJzLnByaW1hcnlDYXRlZ29yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXF1ZXN0LmZpbHRlcnMuYXVkaWVuY2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hIYW5kbGVyLm1hcFNlYXJjaFJlc3BvbnNlKGNvbnRlbnRTZWFyY2hDcml0ZXJpYSwgc2VhcmNoUmVzcG9uc2UsIHNlYXJjaFJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgbWFwKChjb250ZW50U2VhcmNoUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGVudFNlYXJjaFJlc3BvbnNlLmZpbHRlckNyaXRlcmlhLmZhY2V0RmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50U2VhcmNoUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlRmFjZXRGaWx0ZXJzID0gY29udGVudFNlYXJjaFJlc3BvbnNlLmZpbHRlckNyaXRlcmlhLmZhY2V0RmlsdGVycy5maW5kKGYgPT4gZi5uYW1lID09PSAnbWltZVR5cGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbWVUeXBlRmFjZXRGaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWltZVR5cGVGYWNldEZpbHRlcnMudmFsdWVzID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3NNaW1lVHlwZUZhY2V0VG9NaW1lVHlwZUNhdGVnb3J5QWdncmVnYXRvci5hZ2dyZWdhdGUobWltZVR5cGVGYWNldEZpbHRlcnMudmFsdWVzIGFzIGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5zZWFyY2hUeXBlID09PSAnZmlsdGVyJyA/IFtNaW1lVHlwZUNhdGVnb3J5LkFMTF0gOiBbXSkgYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRTZWFyY2hSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjYW5jZWxEb3dubG9hZChjb250ZW50SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvd25sb2FkU2VydmljZS5jYW5jZWwoe2lkZW50aWZpZXI6IGNvbnRlbnRJZH0pO1xuICAgIH1cblxuICAgIHNldENvbnRlbnRNYXJrZXIoY29udGVudE1hcmtlclJlcXVlc3Q6IENvbnRlbnRNYXJrZXJSZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCAqIEZST00gJHtDb250ZW50TWFya2VyRW50cnkuVEFCTEVfTkFNRX1cbiAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtDb250ZW50TWFya2VyRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ICcke2NvbnRlbnRNYXJrZXJSZXF1ZXN0LnVpZH0nXG4gICAgICAgICAgICAgICAgICAgICAgIEFORCAke0NvbnRlbnRNYXJrZXJFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lERU5USUZJRVJ9PScke2NvbnRlbnRNYXJrZXJSZXF1ZXN0LmNvbnRlbnRJZH0nXG4gICAgICAgICAgICAgICAgICAgICAgIEFORCAke0NvbnRlbnRNYXJrZXJFbnRyeS5DT0xVTU5fTkFNRV9NQVJLRVJ9ID0gJHtjb250ZW50TWFya2VyUmVxdWVzdC5tYXJrZXJ9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudE1hcmtlcjogQ29udGVudE1hcmtlckVudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXJNb2RlbDogQ29udGVudE1hcmtlckVudHJ5LlNjaGVtYU1hcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdWlkOiBjb250ZW50TWFya2VyUmVxdWVzdC51aWQsXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbnRlbnRNYXJrZXJSZXF1ZXN0LmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgZXBvY2hfdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBjb250ZW50TWFya2VyUmVxdWVzdC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBleHRyYV9pbmZvOiBKU09OLnN0cmluZ2lmeShjb250ZW50TWFya2VyUmVxdWVzdC5leHRyYUluZm8pLFxuICAgICAgICAgICAgICAgICAgICBtYXJrZXI6IGNvbnRlbnRNYXJrZXJSZXF1ZXN0Lm1hcmtlci52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgICAgIG1pbWVfdHlwZTogdGhpcy5nZXRNaW1lVHlwZShjb250ZW50TWFya2VyUmVxdWVzdC5kYXRhKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5VXRpbC5pc0VtcHR5KGNvbnRlbnRNYXJrZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRNYXJrZXJFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBtYXJrZXJNb2RlbFxuICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKHYgPT4gdiA+IDApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRNYXJrZXJSZXF1ZXN0LmlzTWFya2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudE1hcmtlckVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtDb250ZW50TWFya2VyRW50cnkuQ09MVU1OX05BTUVfVUlEfT0gPyBBTkQgJHtDb250ZW50TWFya2VyRW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5DT0xVTU5fTkFNRV9DT05URU5UX0lERU5USUZJRVJ9PSA/IEFORCAke0NvbnRlbnRNYXJrZXJFbnRyeS5DT0xVTU5fTkFNRV9NQVJLRVJ9PSA/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbY29udGVudE1hcmtlclJlcXVlc3QudWlkLCBjb250ZW50TWFya2VyUmVxdWVzdC5jb250ZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRNYXJrZXJSZXF1ZXN0Lm1hcmtlci52YWx1ZU9mKCkudG9TdHJpbmcoKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBtYXJrZXJNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudE1hcmtlckVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDb250ZW50TWFya2VyRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID8gQU5EICR7Q29udGVudE1hcmtlckVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfSURFTlRJRklFUlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPSA/IEFORCAke0NvbnRlbnRNYXJrZXJFbnRyeS5DT0xVTU5fTkFNRV9NQVJLRVJ9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2NvbnRlbnRNYXJrZXJSZXF1ZXN0LnVpZCwgY29udGVudE1hcmtlclJlcXVlc3QuY29udGVudElkLCAnJyArIGNvbnRlbnRNYXJrZXJSZXF1ZXN0Lm1hcmtlcl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKHYgPT4gdiEpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvbkRvd25sb2FkQ29tcGxldGlvbihyZXF1ZXN0OiBDb250ZW50RG93bmxvYWRSZXF1ZXN0KTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgaW1wb3J0RWNhclJlcXVlc3Q6IEVjYXJJbXBvcnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgaXNDaGlsZENvbnRlbnQ6IHJlcXVlc3QuaXNDaGlsZENvbnRlbnQhLFxuICAgICAgICAgICAgc291cmNlRmlsZVBhdGg6IHJlcXVlc3QuZG93bmxvYWRlZEZpbGVQYXRoISxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uRm9sZGVyOiByZXF1ZXN0LmRlc3RpbmF0aW9uRm9sZGVyISxcbiAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogcmVxdWVzdC5jb3JyZWxhdGlvbkRhdGEhLFxuICAgICAgICAgICAgcm9sbFVwOiByZXF1ZXN0LnJvbGxVcCEsXG4gICAgICAgICAgICBpZGVudGlmaWVyOiByZXF1ZXN0LmlkZW50aWZpZXJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0RWNhcihpbXBvcnRFY2FyUmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+XG4gICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkU2VydmljZS5jYW5jZWwoe2lkZW50aWZpZXI6IHJlcXVlc3QuaWRlbnRpZmllciF9LCBmYWxzZSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+XG4gICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkU2VydmljZS5jYW5jZWwoe2lkZW50aWZpZXI6IHJlcXVlc3QuaWRlbnRpZmllciF9LCBmYWxzZSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5KGNvbnRlbnRTcGFjZVVzYWdlU3VtbWFyeVJlcXVlc3Q6IENvbnRlbnRTcGFjZVVzYWdlU3VtbWFyeVJlcXVlc3QpOlxuICAgICAgICBPYnNlcnZhYmxlPENvbnRlbnRTcGFjZVVzYWdlU3VtbWFyeVJlc3BvbnNlW10+IHtcbiAgICAgICAgY29uc3QgY29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5TGlzdDogQ29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5UmVzcG9uc2VbXSA9IFtdO1xuICAgICAgICBjb25zdCBzdG9yYWdlSGFuZGxlciA9IG5ldyBDb250ZW50U3RvcmFnZUhhbmRsZXIodGhpcy5kYlNlcnZpY2UpO1xuICAgICAgICByZXR1cm4gZnJvbShzdG9yYWdlSGFuZGxlci5nZXRDb250ZW50VXNhZ2VTdW1tYXJ5KGNvbnRlbnRTcGFjZVVzYWdlU3VtbWFyeVJlcXVlc3QucGF0aHMpKTtcbiAgICB9XG5cbiAgICBidWlsZENvbnRlbnRBZ2dyZWdhdG9yKFxuICAgICAgICBmb3JtU2VydmljZTogRm9ybVNlcnZpY2UsXG4gICAgICAgIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsXG4gICAgICAgIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSxcbiAgICApOiBDb250ZW50QWdncmVnYXRvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ29udGVudEFnZ3JlZ2F0b3IoXG4gICAgICAgICAgICBuZXcgU2VhcmNoQ29udGVudEhhbmRsZXIodGhpcy5hcHBDb25maWcsIHRoaXMuY29udGVudFNlcnZpY2VDb25maWcsIHRoaXMudGVsZW1ldHJ5U2VydmljZSksXG4gICAgICAgICAgICBmb3JtU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICB0aGlzLmNhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgICAgIGNvdXJzZVNlcnZpY2UsXG4gICAgICAgICAgICBwcm9maWxlU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuYXBpU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMubmV0d29ya0luZm9TZXJ2aWNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0UXVlc3Rpb25MaXN0KHF1ZXN0aW9uSWRzOiBzdHJpbmdbXSwgcGFyZW50SWQ/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudERldGFpbHMoeyBcbiAgICAgICAgICAgIGNvbnRlbnRJZDogcGFyZW50SWQsXG4gICAgICAgICAgICBvYmplY3RUeXBlOiAnUXVlc3Rpb25TZXQnXG4gICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKChjb250ZW50OiBDb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuaXNBdmFpbGFibGVMb2NhbGx5ICYmIHBhcmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXN0aW9uU2V0RmlsZVJlYWRIYW5kbGVyLmdldExvY2FsbHlBdmFpbGFibGVRdWVzdGlvbihxdWVzdGlvbklkcywgcGFyZW50SWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRTZXJ2aWNlRGVsZWdhdGUuZ2V0UXVlc3Rpb25MaXN0KHF1ZXN0aW9uSWRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50U2VydmljZURlbGVnYXRlLmdldFF1ZXN0aW9uTGlzdChxdWVzdGlvbklkcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFF1ZXN0aW9uU2V0SGllcmFyY2h5KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFNlcnZpY2VEZWxlZ2F0ZS5nZXRRdWVzdGlvblNldEhpZXJhcmNoeShkYXRhKTtcbiAgICB9XG5cbiAgICBnZXRRdWVzdGlvblNldFJlYWQoY29udGVudElkOnN0cmluZywgcGFyYW1zPzphbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFNlcnZpY2VEZWxlZ2F0ZS5nZXRRdWVzdGlvblNldFJlYWQoY29udGVudElkLHBhcmFtcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UXVlc3Rpb25TZXRDaGlsZHJlbihxdWVzdGlvblNldElkOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0Q2hpbGRRdWVzdGlvblNldEhhbmRsZXIuaGFuZGxlKHF1ZXN0aW9uU2V0SWQpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9ybWF0U2VhcmNoQ3JpdGVyaWEocmVxdWVzdE1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaEhhbmRsZXI6IFNlYXJjaENvbnRlbnRIYW5kbGVyID0gbmV3IFNlYXJjaENvbnRlbnRIYW5kbGVyKHRoaXMuYXBwQ29uZmlnLFxuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VydmljZUNvbmZpZywgdGhpcy50ZWxlbWV0cnlTZXJ2aWNlKTtcbiAgICAgICAgcmV0dXJuIHNlYXJjaEhhbmRsZXIuZ2V0U2VhcmNoQ3JpdGVyaWEocmVxdWVzdE1hcCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhbnVwQ29udGVudChpbXBvcnRDb250ZW50Q29udGV4dDogSW1wb3J0Q29udGVudENvbnRleHQpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBjb250ZW50RGVsZXRlTGlzdDogQ29udGVudERlbGV0ZVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY29udGVudElkIG9mIEFycmF5LmZyb20oaW1wb3J0Q29udGVudENvbnRleHQuY29udGVudElkc1RvRGVsZXRlLnZhbHVlcygpKSkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudERlbGV0ZVJlcXVlc3Q6IENvbnRlbnREZWxldGUgPSB7XG4gICAgICAgICAgICAgICAgY29udGVudElkOiBjb250ZW50SWQsXG4gICAgICAgICAgICAgICAgaXNDaGlsZENvbnRlbnQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29udGVudERlbGV0ZUxpc3QucHVzaChjb250ZW50RGVsZXRlUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlQ29udGVudCh7Y29udGVudERlbGV0ZUxpc3Q6IGNvbnRlbnREZWxldGVMaXN0fSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNaW1lVHlwZShkYXRhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbWltZVR5cGUgPSAnJztcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBtaW1lVHlwZSA9IGxvY2FsRGF0YVsnbWltZVR5cGUnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWltZVR5cGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDb250ZW50RGVsZXRlUmVxdWVzdFNldENoYW5nZXMoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudERlbGV0ZVJlcXVlc3RTZXQuYXNMaXN0Q2hhbmdlcygpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgocmVxdWVzdHM6IENvbnRlbnREZWxldGVbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSZXF1ZXN0ID0gcmVxdWVzdHNbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZUNvbnRlbnQoe2NvbnRlbnREZWxldGVMaXN0OiBbY3VycmVudFJlcXVlc3RdfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5jb250ZW50RGVsZXRlUmVxdWVzdFNldC5yZW1vdmUoY3VycmVudFJlcXVlc3QpKSxcbiAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVXBkYXRlU2l6ZU9uRGV2aWNlRmFpbCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRCb29sZWFuKENvbnRlbnRTZXJ2aWNlSW1wbC5LRVlfSVNfVVBEQVRFX1NJWkVfT05fREVWSUNFX1NVQ0NFU1NGVUwpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoaGFzVXBkYXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghaGFzVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBVcGRhdGVTaXplT25EZXZpY2UodGhpcy5kYlNlcnZpY2UsIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMsIHRoaXMuZmlsZVNlcnZpY2UpLmV4ZWN1dGUoKVxuICAgICAgICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBjb250ZW50U2VydmljZURlbGVnYXRlKCk6IENzQ29udGVudFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0KENzSW5qZWN0aW9uVG9rZW5zLkNPTlRFTlRfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZG93bmxvYWRUcmFuc2NyaXB0RmlsZSh0cmFuc2NyaXB0UmVxKSB7XG4gICAgICAgIGNvbnN0IGRhdGFEaXJlY3RvcnkgPSB3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09ICdpb3MnID9cbiAgICAgICAgIGNvcmRvdmEuZmlsZS5kb2N1bWVudHNEaXJlY3RvcnkgOiBjb3Jkb3ZhLmZpbGUuZXh0ZXJuYWxEYXRhRGlyZWN0b3J5ICsgQ29udGVudFNlcnZpY2VJbXBsLkRPV05MT0FEX0RJUl9OQU1FO1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUcmFuc2NyaXB0RGlyKHRyYW5zY3JpcHRSZXEsIGRhdGFEaXJlY3RvcnkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZG93bmxvYWRSZXF1ZXN0OiBFbnF1ZXVlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IHRyYW5zY3JpcHRSZXEuZG93bmxvYWRVcmwsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zY3JpcHRSZXEuZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlOiAnJyxcbiAgICAgICAgICAgICAgICB2aXNpYmxlSW5Eb3dubG9hZHNVaTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25WaXNpYmlsaXR5OiAxLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSW5FeHRlcm5hbFB1YmxpY0Rpcjoge1xuICAgICAgICAgICAgICAgICAgICBkaXJUeXBlOiAnRG93bmxvYWQnLFxuICAgICAgICAgICAgICAgICAgICBzdWJQYXRoOiB0cmFuc2NyaXB0UmVxLmZpbGVOYW1lXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblVyaTogdHJhbnNjcmlwdFJlcS5kZXN0aW5hdGlvblVybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvd25sb2FkVHJhbnNjcmlwdChkb3dubG9hZFJlcXVlc3QpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbigoc291cmNlVXJsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZVVybCAmJiBzb3VyY2VVcmwucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcHlGaWxlKHNvdXJjZVVybC5wYXRoLnNwbGl0KC9cXC8oPz1bXlxcL10rJCkvKVswXSwgZGF0YURpcmVjdG9yeS5jb25jYXQoJy8nICsgdHJhbnNjcmlwdFJlcS5pZGVudGlmaWVyKSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjcmlwdFJlcS5maWxlTmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZvbGRlcihzb3VyY2VVcmwucGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlVXJsLnBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVRyYW5zY3JpcHREaXIocmVxLCBkYXRhRGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmV4aXN0cyhkYXRhRGlyZWN0b3J5LmNvbmNhdCgnLycgKyByZXEuaWRlbnRpZmllcikpLnRoZW4oKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5Lm5hdGl2ZVVSTDtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuY3JlYXRlRGlyKGRhdGFEaXJlY3RvcnksIGZhbHNlKS50aGVuKChkaXJlY3RvcnlFbnRyeTogRGlyZWN0b3J5RW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZS5jcmVhdGVEaXIoZGF0YURpcmVjdG9yeS5jb25jYXQoJy8nICsgcmVxLmlkZW50aWZpZXIpLCBmYWxzZSkudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lm5hdGl2ZVVSTDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3dubG9hZFRyYW5zY3JpcHQoZG93bmxvYWRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxzdHJpbmc+KChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgZG93bmxvYWRNYW5hZ2VyLmVucXVldWUoZG93bmxvYWRSZXF1ZXN0LCAoZXJyLCBpZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGlkKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoZG93bmxvYWRJZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVydmFsKDEwMDApXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEVucXVldWVkRW50cnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkTWFuYWdlci5xdWVyeSh7aWRzOiBbZG93bmxvYWRJZF19LCAoZXJyLCBlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIHx8IChlbnRyaWVzWzBdLnN0YXR1cyA9PT0gMTYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVyciB8fCBuZXcgRXJyb3IoJ1Vua25vd24gRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIubmV4dChlbnRyaWVzWzBdISBhcyBFbnF1ZXVlZEVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigoZW50cnk6IEVucXVldWVkRW50cnkpID0+IGVudHJ5LnN0YXR1cyA9PT0gOCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgoZW50cnkpID0+ICh7cGF0aDogZW50cnkubG9jYWxVcml9KSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNvcHlGaWxlKHNvdXJjZVBhdGg6IHN0cmluZywgZGVzdGluYXRpb25QYXRoOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5jb3B5RmlsZShzb3VyY2VQYXRoLCBkZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGRlbGV0ZUZvbGRlcihkZWxldGVkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIGlmICghZGVsZXRlZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LnJtKGRlbGV0ZWRpcmVjdG9yeSwgJycsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=