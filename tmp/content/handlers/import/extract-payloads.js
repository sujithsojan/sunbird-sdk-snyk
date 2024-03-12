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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { ContentDisposition, ContentEncoding, ContentEventType, ContentStatus, FileName, MimeType, State, Visibility } from '../..';
import { UpdateSizeOnDevice } from './update-size-on-device';
import { Response } from '../../../api';
import { ContentUtil } from '../../util/content-util';
import { ContentEntry } from '../../db/schema';
import { FileUtil } from '../../../util/file/util/file-util';
import { EventNamespace } from '../../../events-bus';
import * as dayjs from 'dayjs';
import { ArrayUtil } from '../../../util/array-util';
var COLUMN_NAME_VISIBILITY = ContentEntry.COLUMN_NAME_VISIBILITY;
var ExtractPayloads = /** @class */ (function () {
    function ExtractPayloads(fileService, zipService, appConfig, dbService, deviceInfo, getContentDetailsHandler, eventsBusService, sharedPreferences) {
        this.fileService = fileService;
        this.zipService = zipService;
        this.appConfig = appConfig;
        this.dbService = dbService;
        this.deviceInfo = deviceInfo;
        this.getContentDetailsHandler = getContentDetailsHandler;
        this.eventsBusService = eventsBusService;
        this.sharedPreferences = sharedPreferences;
    }
    ExtractPayloads.prototype.execute = function (importContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, insertNewContentModels, updateNewContentModels, commonContentModelsMap, payloadDestinationPathMap, rootContentPath, currentCount, contentIds, nonUnitContentIds, appIcons, _i, _a, e, element, identifier, visibility, appIcon, destinationRootDir, createdDirectories, createSubDirectories, query, existingContentModels, result, _loop_1, this_1, _b, _c, e, updateContentFileSizeInDBTimeOutRef, e_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        response = new Response();
                        importContext.identifiers = [];
                        insertNewContentModels = [];
                        updateNewContentModels = [];
                        commonContentModelsMap = new Map();
                        payloadDestinationPathMap = new Map();
                        currentCount = 0;
                        // post event before starting with how many imports are to be done totally
                        this.postImportProgressEvent(currentCount, importContext.items.length);
                        contentIds = [];
                        nonUnitContentIds = [];
                        appIcons = [];
                        for (_i = 0, _a = importContext.items; _i < _a.length; _i++) {
                            e = _a[_i];
                            element = e;
                            identifier = element.identifier;
                            visibility = ContentUtil.readVisibility(element);
                            appIcon = element.appIcon;
                            if (ContentUtil.isNotUnit(element.mimeType, visibility)) {
                                nonUnitContentIds.push(identifier);
                                if (appIcon && !appIcon.startsWith('https:')) {
                                    appIcons.push(identifier + '/' + appIcon.substring(0, appIcon.lastIndexOf('/')));
                                }
                            }
                            contentIds.push(identifier);
                        }
                        destinationRootDir = ContentUtil.getContentRootDir(importContext.destinationFolder);
                        if (!(importContext.items[0].mimeType === MimeType.QUESTION_SET)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.segregateQuestions(destinationRootDir, JSON.parse(JSON.stringify(importContext.items)))];
                    case 1:
                        createdDirectories = _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createDirectories(destinationRootDir, nonUnitContentIds)];
                    case 3:
                        createdDirectories = _d.sent();
                        _d.label = 4;
                    case 4: return [4 /*yield*/, this.createDirectories(destinationRootDir, appIcons)];
                    case 5:
                        createSubDirectories = _d.sent();
                        query = ArrayUtil.joinPreservingQuotes(contentIds);
                        return [4 /*yield*/, this.getContentDetailsHandler.fetchFromDBForAll(query).toPromise()];
                    case 6:
                        existingContentModels = _d.sent();
                        result = existingContentModels.reduce(function (map, obj) {
                            map[obj.identifier] = obj;
                            return map;
                        }, {});
                        _loop_1 = function (e) {
                            var item, identifier, mimeType, contentEncoding, contentDisposition, contentType, primaryCategory, visibility, audience, pragma, pkgVersion, artifactUrl, appIcon, itemSetPreviewUrl, board, medium, grade, dialcodes, childNodes, contentState, payloadDestination, existingContentModel, existingContentPath, rootNodeIdentifier, payloadDirectory, payloadDestinationDirectoryEntry, isUnzippingSuccessful, doesContentExist, e_2, payload_1, e_3, basePath, referenceCount, sizeOnDevice, newContentModel, existingContentState;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = e;
                                        identifier = item.identifier;
                                        // skip the content if already imported on the same version
                                        if (importContext.skippedItemsIdentifier
                                            && importContext.skippedItemsIdentifier.indexOf(identifier) > -1) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        mimeType = item.mimeType;
                                        contentEncoding = item.contentEncoding;
                                        contentDisposition = item.contentDisposition;
                                        contentType = ContentUtil.readContentType(item);
                                        primaryCategory = ContentUtil.readPrimaryCategory(item);
                                        visibility = ContentUtil.readVisibility(item);
                                        audience = ContentUtil.readAudience(item);
                                        pragma = ContentUtil.readPragma(item);
                                        pkgVersion = item.pkgVersion;
                                        artifactUrl = item.artifactUrl;
                                        appIcon = item.appIcon;
                                        itemSetPreviewUrl = item.itemSetPreviewUrl;
                                        board = item.board;
                                        medium = item.medium;
                                        grade = item.gradeLevel;
                                        dialcodes = item.dialcodes;
                                        childNodes = item.childNodes;
                                        contentState = State.ONLY_SPINE.valueOf();
                                        existingContentModel = result[identifier];
                                        existingContentPath = void 0;
                                        if (existingContentModel) {
                                            existingContentPath = ContentUtil.getBasePath(existingContentModel[ContentEntry.COLUMN_NAME_PATH]);
                                        }
                                        rootNodeIdentifier = void 0;
                                        if (visibility === Visibility.DEFAULT.valueOf()) {
                                            rootNodeIdentifier = identifier;
                                        }
                                        if (!ContentUtil.isNotUnit(mimeType, visibility)) return [3 /*break*/, 3];
                                        if (!(createdDirectories[identifier] && createdDirectories[identifier].path)) return [3 /*break*/, 1];
                                        payloadDestination = (window.device.platform.toLowerCase() === "ios") ? createdDirectories[identifier].path.concat("/") : createdDirectories[identifier].path;
                                        return [3 /*break*/, 3];
                                    case 1:
                                        payloadDirectory = (window.device.platform.toLowerCase() === "ios") ?
                                            ContentUtil.getContentRootDir(importContext.destinationFolder).concat(identifier) :
                                            ContentUtil.getContentRootDir(importContext.destinationFolder).concat('/', identifier);
                                        return [4 /*yield*/, this_1.fileService.createDir(payloadDirectory, false)];
                                    case 2:
                                        payloadDestinationDirectoryEntry = _a.sent();
                                        payloadDestination = payloadDestinationDirectoryEntry.nativeURL;
                                        _a.label = 3;
                                    case 3:
                                        isUnzippingSuccessful = false;
                                        doesContentExist = ContentUtil.doesContentExist(existingContentModel, identifier, pkgVersion, false);
                                        if (!(doesContentExist && !(item.status === ContentStatus.DRAFT.valueOf()))) return [3 /*break*/, 4];
                                        if (existingContentModel[COLUMN_NAME_VISIBILITY] === Visibility.DEFAULT.valueOf()) {
                                            item = JSON.parse(existingContentModel[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                                        }
                                        return [3 /*break*/, 17];
                                    case 4:
                                        doesContentExist = false;
                                        if (!artifactUrl) return [3 /*break*/, 16];
                                        if (!(!ContentUtil.isInlineIdentity(contentDisposition, contentEncoding) && mimeType === MimeType.EPUB)) return [3 /*break*/, 8];
                                        _a.label = 5;
                                    case 5:
                                        _a.trys.push([5, 7, , 8]);
                                        return [4 /*yield*/, this_1.copyAssets(importContext.tmpLocation, artifactUrl, payloadDestination)];
                                    case 6:
                                        _a.sent();
                                        isUnzippingSuccessful = true;
                                        return [3 /*break*/, 8];
                                    case 7:
                                        e_2 = _a.sent();
                                        isUnzippingSuccessful = false;
                                        return [3 /*break*/, 8];
                                    case 8:
                                        if (!(!contentDisposition || !contentEncoding ||
                                            (contentDisposition === ContentDisposition.INLINE.valueOf()
                                                && contentEncoding === ContentEncoding.GZIP.valueOf()))) return [3 /*break*/, 10];
                                        payload_1 = importContext.tmpLocation.concat(artifactUrl);
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                _this.zipService.unzip(payload_1, { target: payloadDestination }, function () {
                                                    isUnzippingSuccessful = true;
                                                    resolve();
                                                }, function () {
                                                    resolve();
                                                });
                                            })];
                                    case 9:
                                        _a.sent();
                                        return [3 /*break*/, 16];
                                    case 10:
                                        if (!ContentUtil.isInlineIdentity(contentDisposition, contentEncoding)) return [3 /*break*/, 15];
                                        _a.label = 11;
                                    case 11:
                                        _a.trys.push([11, 13, , 14]);
                                        return [4 /*yield*/, this_1.copyAssets(importContext.tmpLocation, artifactUrl, payloadDestination)];
                                    case 12:
                                        _a.sent();
                                        isUnzippingSuccessful = true;
                                        return [3 /*break*/, 14];
                                    case 13:
                                        e_3 = _a.sent();
                                        isUnzippingSuccessful = false;
                                        return [3 /*break*/, 14];
                                    case 14: return [3 /*break*/, 16];
                                    case 15:
                                        if (ContentDisposition.ONLINE.valueOf() === contentDisposition) { // Content with no artifact)
                                            isUnzippingSuccessful = true;
                                        }
                                        _a.label = 16;
                                    case 16:
                                        // Add or update the content_state
                                        if (isUnzippingSuccessful
                                            || this_1.shouldDownloadQuestionSet(importContext.items, item)
                                            || MimeType.COLLECTION.valueOf() === mimeType) {
                                            contentState = State.ARTIFACT_AVAILABLE.valueOf();
                                        }
                                        else {
                                            contentState = State.ONLY_SPINE.valueOf();
                                        }
                                        if (ContentUtil.isNotUnit(mimeType, visibility)) {
                                            try {
                                                if (!appIcon.startsWith('https:')) {
                                                    this_1.copyAssets(importContext.tmpLocation, appIcon, payloadDestination, true);
                                                }
                                            }
                                            catch (e) {
                                            }
                                        }
                                        try {
                                            if (!itemSetPreviewUrl.startsWith('https:')) {
                                                this_1.copyAssets(importContext.tmpLocation, itemSetPreviewUrl, payloadDestination, false);
                                            }
                                        }
                                        catch (e) {
                                        }
                                        _a.label = 17;
                                    case 17:
                                        basePath = this_1.getBasePath(payloadDestination, doesContentExist, existingContentPath);
                                        if (visibility === Visibility.DEFAULT.valueOf()) {
                                            rootContentPath = basePath;
                                            importContext.rootIdentifier = identifier;
                                        }
                                        else {
                                            if (ContentUtil.isNotUnit(mimeType, visibility)) {
                                                importContext.identifiers.push(identifier);
                                            }
                                        }
                                        referenceCount = this_1.getReferenceCount(existingContentModel, visibility, importContext.isChildContent, importContext.existedContentIdentifiers);
                                        visibility = this_1.getContentVisibility(existingContentModel, item['objectType'], importContext.isChildContent, visibility);
                                        // contentState = this.getContentState(existingContentModel, contentState);
                                        ContentUtil.addOrUpdateViralityMetadata(item, this_1.deviceInfo.getDeviceID().toString());
                                        sizeOnDevice = 0;
                                        if (ContentUtil.isNotUnit(mimeType, visibility)) {
                                            payloadDestinationPathMap.set(identifier, payloadDestination);
                                            // try {
                                            //     sizeOnDevice = await this.fileService.getDirectorySize(payloadDestination!);
                                            // } catch (e) {
                                            // }
                                        }
                                        newContentModel = this_1.constructContentDBModel(identifier, importContext.manifestVersion, JSON.stringify(item), mimeType, contentType, visibility, basePath, referenceCount, contentState, audience, pragma, sizeOnDevice, board, medium, grade, dialcodes, childNodes, primaryCategory);
                                        if (!existingContentModel) {
                                            insertNewContentModels.push(newContentModel);
                                        }
                                        else {
                                            existingContentState = this_1.getContentState(existingContentModel, contentState);
                                            if (existingContentState === State.ONLY_SPINE.valueOf()
                                                || isUnzippingSuccessful // If unzip is success it means artifact is available.
                                                || MimeType.COLLECTION.valueOf() === mimeType) {
                                                updateNewContentModels.push(newContentModel);
                                            }
                                            else {
                                                newContentModel[ContentEntry.COLUMN_NAME_CONTENT_STATE] = this_1.getContentState(existingContentModel, contentState);
                                            }
                                        }
                                        commonContentModelsMap.set(identifier, newContentModel);
                                        // increase the current count
                                        currentCount++;
                                        if (currentCount % 20 === 0 || currentCount === (importContext.items.length)) {
                                            this_1.postImportProgressEvent(currentCount, importContext.items.length);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b = 0, _c = importContext.items;
                        _d.label = 7;
                    case 7:
                        if (!(_b < _c.length)) return [3 /*break*/, 10];
                        e = _c[_b];
                        return [5 /*yield**/, _loop_1(e)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 7];
                    case 10:
                        // Update/create contents in DB with size_on_device as 0 initially
                        this.updateContentDB(insertNewContentModels, updateNewContentModels);
                        updateContentFileSizeInDBTimeOutRef = setTimeout(function () {
                            // Update the contents in DB with actual size
                            _this.updateContentFileSizeInDB(importContext, commonContentModelsMap, payloadDestinationPathMap, result);
                        }, 5000);
                        if (!rootContentPath) return [3 /*break*/, 14];
                        _d.label = 11;
                    case 11:
                        _d.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, this.fileService.copyFile(importContext.tmpLocation, FileName.MANIFEST.valueOf(), rootContentPath, FileName.MANIFEST.valueOf())];
                    case 12:
                        _d.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_1 = _d.sent();
                        console.log("Exception Raised During Import");
                        return [3 /*break*/, 14];
                    case 14:
                        response.body = importContext;
                        return [2 /*return*/, Promise.resolve([response, updateContentFileSizeInDBTimeOutRef])];
                }
            });
        });
    };
    ExtractPayloads.prototype.updateContentFileSizeInDB = function (importContext, commonContentModelsMap, payloadDestinationPathMap, result) {
        return __awaiter(this, void 0, void 0, function () {
            var updateNewContentModels, _i, _a, e, item, identifier, mimeType, visibility, payloadDestination, sizeOnDevice, existingContentModel, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updateNewContentModels = [];
                        _i = 0, _a = importContext.items;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        e = _a[_i];
                        item = e;
                        identifier = item.identifier;
                        mimeType = commonContentModelsMap.get(identifier).mimeType;
                        visibility = commonContentModelsMap.get(identifier).visibility;
                        payloadDestination = payloadDestinationPathMap.get(identifier);
                        sizeOnDevice = 0;
                        existingContentModel = result[identifier];
                        if (!ContentUtil.isNotUnit(mimeType, visibility)) return [3 /*break*/, 5];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.fileService.getDirectorySize(payloadDestination)];
                    case 3:
                        sizeOnDevice = _b.sent();
                        commonContentModelsMap.get(identifier).size_on_device = sizeOnDevice;
                        if (!existingContentModel) {
                            updateNewContentModels.push(commonContentModelsMap.get(identifier));
                        }
                        else {
                            updateNewContentModels.push(commonContentModelsMap.get(identifier));
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.updateContentDB([], updateNewContentModels, true);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtractPayloads.prototype.updateContentDB = function (insertNewContentModels, updateNewContentModels, updateSize) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, insertNewContentModels_1, e, newContentModel, _a, updateNewContentModels_1, e, newContentModel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        insertNewContentModels = (insertNewContentModels && insertNewContentModels.length) ? this.filterQuestionSetContent(insertNewContentModels) : insertNewContentModels;
                        updateNewContentModels = (updateNewContentModels && updateNewContentModels.length) ? this.filterQuestionSetContent(updateNewContentModels) : updateNewContentModels;
                        if (!(insertNewContentModels.length || updateNewContentModels.length)) return [3 /*break*/, 9];
                        this.dbService.beginTransaction();
                        _i = 0, insertNewContentModels_1 = insertNewContentModels;
                        _b.label = 1;
                    case 1:
                        if (!(_i < insertNewContentModels_1.length)) return [3 /*break*/, 4];
                        e = insertNewContentModels_1[_i];
                        newContentModel = e;
                        return [4 /*yield*/, this.dbService.insert({
                                table: ContentEntry.TABLE_NAME,
                                modelJson: newContentModel
                            }).toPromise()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _a = 0, updateNewContentModels_1 = updateNewContentModels;
                        _b.label = 5;
                    case 5:
                        if (!(_a < updateNewContentModels_1.length)) return [3 /*break*/, 8];
                        e = updateNewContentModels_1[_a];
                        newContentModel = e;
                        return [4 /*yield*/, this.dbService.update({
                                table: ContentEntry.TABLE_NAME,
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                selectionArgs: [newContentModel[ContentEntry.COLUMN_NAME_IDENTIFIER]],
                                modelJson: newContentModel
                            }).toPromise()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8:
                        this.dbService.endTransaction(true);
                        _b.label = 9;
                    case 9:
                        if (updateSize) {
                            new UpdateSizeOnDevice(this.dbService, this.sharedPreferences, this.fileService).execute();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtractPayloads.prototype.copyAssets = function (tempLocationPath, asset, payloadDestinationPath, useSubDirectories) {
        return __awaiter(this, void 0, void 0, function () {
            var folderContainingFile, e_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!asset) return [3 /*break*/, 6];
                        folderContainingFile = asset.substring(0, asset.lastIndexOf('/'));
                        if (!!useSubDirectories) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fileService.createDir(payloadDestinationPath.concat(folderContainingFile), false)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(window.device.platform.toLowerCase() === "ios")) return [3 /*break*/, 4];
                        // * checking if file exist, then delete the file
                        return [4 /*yield*/, this.fileService.exists(payloadDestinationPath.concat('/', asset))
                                .then(function (entry) {
                                if (entry) {
                                    _this.fileService.removeFile(payloadDestinationPath.concat('/', asset)).then();
                                }
                            })
                                .catch(function (error) {
                                console.log('Error =>', error);
                            })];
                    case 3:
                        // * checking if file exist, then delete the file
                        _a.sent();
                        _a.label = 4;
                    case 4: 
                    // If source icon is not available then copy assets is failing and throwing exception.
                    return [4 /*yield*/, this.fileService.copyFile(tempLocationPath.concat(folderContainingFile), FileUtil.getFileName(asset), payloadDestinationPath.concat(folderContainingFile), FileUtil.getFileName(asset))];
                    case 5:
                        // If source icon is not available then copy assets is failing and throwing exception.
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_5 = _a.sent();
                        console.error('Cannot Copy Asset');
                        throw e_5;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * add or update the reference count for the content
     *
     */
    ExtractPayloads.prototype.getContentVisibility = function (existingContentInDb, objectType, isChildContent, previousVisibility) {
        var visibility;
        if ('Library' === objectType) {
            visibility = Visibility.PARENT.valueOf();
        }
        else if (existingContentInDb) {
            if (isChildContent // If import started from child content then do not update the visibility.
                // If not started from child content then do not shrink visibility.
                || !(Visibility.PARENT.valueOf() === existingContentInDb[COLUMN_NAME_VISIBILITY])) {
                visibility = existingContentInDb[COLUMN_NAME_VISIBILITY];
            }
        }
        return visibility ? visibility : previousVisibility;
    };
    /**
     * Add or update the content_state. contentState should not update the spine_only when importing the spine content
     * after importing content with artifacts.
     *
     */
    ExtractPayloads.prototype.getContentState = function (existingContentInDb, contentState) {
        if (existingContentInDb && existingContentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE] > contentState) {
            contentState = existingContentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE];
        }
        return contentState;
    };
    ExtractPayloads.prototype.getBasePath = function (payLoadDestinationPath, doesContentExist, existingContentPath) {
        var path;
        if (payLoadDestinationPath && !doesContentExist) {
            path = payLoadDestinationPath;
        }
        else {
            path = existingContentPath;
        }
        return path;
    };
    /**
     * add or update the reference count for the content
     *
     */
    ExtractPayloads.prototype.getReferenceCount = function (existingContent, visibility, isChildContent, updateIdentifiers) {
        var refCount;
        if (existingContent) {
            refCount = existingContent[ContentEntry.COLUMN_NAME_REF_COUNT];
            var found = updateIdentifiers ? updateIdentifiers[existingContent[ContentEntry.COLUMN_NAME_IDENTIFIER]] : undefined;
            if (found) {
                // Do not increase the refCount.
            }
            else if (!isChildContent) { // If import started from child content then do not update the refCount.
                // if the content has a 'Default' visibility and update the same content then don't increase the reference count...
                if (!(Visibility.DEFAULT.valueOf() === existingContent[COLUMN_NAME_VISIBILITY]
                    && Visibility.DEFAULT.valueOf() === visibility)) {
                    refCount = refCount + 1;
                }
            }
        }
        else {
            refCount = 1;
        }
        return refCount;
    };
    ExtractPayloads.prototype.postImportProgressEvent = function (currentCount, totalCount) {
        this.eventsBusService.emit({
            namespace: EventNamespace.CONTENT,
            event: {
                type: ContentEventType.IMPORT_PROGRESS,
                payload: {
                    totalCount: totalCount,
                    currentCount: currentCount
                }
            }
        });
    };
    ExtractPayloads.prototype.constructContentDBModel = function (identifier, manifestVersion, localData, mimeType, contentType, visibility, path, refCount, contentState, audience, pragma, sizeOnDevice, board, medium, grade, dialcodes, childNodes, primaryCategory) {
        var _a;
        return _a = {},
            _a[ContentEntry.COLUMN_NAME_IDENTIFIER] = identifier,
            _a[ContentEntry.COLUMN_NAME_SERVER_DATA] = '',
            _a[ContentEntry.COLUMN_NAME_PATH] = ContentUtil.getBasePath(path),
            _a[ContentEntry.COLUMN_NAME_REF_COUNT] = refCount,
            _a[ContentEntry.COLUMN_NAME_CONTENT_STATE] = contentState,
            _a[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] = sizeOnDevice,
            _a[ContentEntry.COLUMN_NAME_MANIFEST_VERSION] = manifestVersion,
            _a[ContentEntry.COLUMN_NAME_LOCAL_DATA] = localData,
            _a[ContentEntry.COLUMN_NAME_MIME_TYPE] = mimeType,
            _a[ContentEntry.COLUMN_NAME_CONTENT_TYPE] = contentType,
            _a[ContentEntry.COLUMN_NAME_VISIBILITY] = visibility,
            _a[ContentEntry.COLUMN_NAME_AUDIENCE] = audience,
            _a[ContentEntry.COLUMN_NAME_PRAGMA] = pragma,
            _a[ContentEntry.COLUMN_NAME_LOCAL_LAST_UPDATED_ON] = dayjs(Date.now()).format(),
            _a[ContentEntry.COLUMN_NAME_BOARD] = ContentUtil.getContentAttribute(board),
            _a[ContentEntry.COLUMN_NAME_MEDIUM] = ContentUtil.getContentAttribute(medium),
            _a[ContentEntry.COLUMN_NAME_GRADE] = ContentUtil.getContentAttribute(grade),
            _a[ContentEntry.COLUMN_NAME_DIALCODES] = ContentUtil.getContentAttribute(dialcodes),
            _a[ContentEntry.COLUMN_NAME_CHILD_NODES] = ContentUtil.getContentAttribute(childNodes),
            _a[ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY] = primaryCategory,
            _a;
    };
    // TODO: move this method to file-service
    ExtractPayloads.prototype.createDirectories = function (parentDirectoryPath, listOfFolder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        parentDirectoryPath = (window.device.platform.toLowerCase() === "ios") ? parentDirectoryPath.concat('/') : parentDirectoryPath;
                        sbutility.createDirectories(ContentUtil.getBasePath(parentDirectoryPath), listOfFolder, function (entry) {
                            resolve(entry);
                        }, function (err) {
                            console.error(err);
                            reject(err);
                        });
                    })];
            });
        });
    };
    ExtractPayloads.prototype.filterQuestionSetContent = function (items) {
        var filterdItems = items.filter(function (i) { return (i.mimeType !== MimeType.QUESTION && i.mime_type !== MimeType.QUESTION); });
        return filterdItems;
    };
    ExtractPayloads.prototype.segregateQuestions = function (destinationRootDir, flattenedList) {
        var e_6, _a;
        return __awaiter(this, void 0, void 0, function () {
            var segregatedQuestions, count, dirArr, createdDir, segregatedArr, key, segregatedArr_1, segregatedArr_1_1, iterator, childDir, e_6_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        segregatedQuestions = {};
                        for (count = 0; count < flattenedList.length; count++) {
                            if (flattenedList[count].mimeType === MimeType.QUESTION_SET &&
                                !segregatedQuestions[flattenedList[count].identifier]) {
                                segregatedQuestions[flattenedList[count].identifier] = [];
                            }
                            else if (flattenedList[count].mimeType === MimeType.QUESTION) {
                                if (segregatedQuestions[flattenedList[count].parent]) {
                                    segregatedQuestions[flattenedList[count].parent].push(flattenedList[count].identifier);
                                }
                                else {
                                    segregatedQuestions[flattenedList[count].identifier] = [flattenedList[count].identifier];
                                }
                            }
                        }
                        dirArr = Object.keys(segregatedQuestions);
                        return [4 /*yield*/, this.createDirectories(destinationRootDir, dirArr)];
                    case 1:
                        createdDir = _b.sent();
                        segregatedArr = [];
                        for (key in segregatedQuestions) {
                            segregatedArr.push({
                                idArr: segregatedQuestions[key],
                                dir: destinationRootDir + "/" + key
                            });
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 9, 14]);
                        segregatedArr_1 = __asyncValues(segregatedArr);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, segregatedArr_1.next()];
                    case 4:
                        if (!(segregatedArr_1_1 = _b.sent(), !segregatedArr_1_1.done)) return [3 /*break*/, 7];
                        iterator = segregatedArr_1_1.value;
                        return [4 /*yield*/, this.createDirectories(iterator.dir, iterator.idArr)];
                    case 5:
                        childDir = _b.sent();
                        createdDir = __assign(__assign({}, createdDir), childDir);
                        _b.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_6_1 = _b.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _b.trys.push([9, , 12, 13]);
                        if (!(segregatedArr_1_1 && !segregatedArr_1_1.done && (_a = segregatedArr_1.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(segregatedArr_1)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, createdDir];
                }
            });
        });
    };
    ExtractPayloads.prototype.shouldDownloadQuestionSet = function (contentItems, item) {
        if (item.mimeType === MimeType.QUESTION_SET && ContentUtil.readVisibility(item) === Visibility.DEFAULT.valueOf()) {
            return true;
        }
        return this.checkParentQustionSet(contentItems, item);
    };
    // recursive function
    ExtractPayloads.prototype.checkParentQustionSet = function (contentItems, content) {
        if (!content || !content.parent) {
            return false;
        }
        var parentContent = contentItems.find(function (i) { return (i.identifier === content.parent); });
        if (!parentContent || parentContent.mimeType !== MimeType.QUESTION_SET) {
            return false;
        }
        else if (parentContent.mimeType === MimeType.QUESTION_SET &&
            ContentUtil.readVisibility(parentContent) === Visibility.DEFAULT.valueOf()) {
            return true;
        }
        return this.checkParentQustionSet(contentItems, parentContent);
    };
    return ExtractPayloads;
}());
export { ExtractPayloads };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1wYXlsb2Fkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2ltcG9ydC9leHRyYWN0LXBheWxvYWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsUUFBUSxFQUVSLFFBQVEsRUFDUixLQUFLLEVBQ0wsVUFBVSxFQUNiLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUd0QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFcEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUUzRCxPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxJQUFPLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztBQUVwRTtJQUVJLHlCQUFvQixXQUF3QixFQUN4QixVQUFzQixFQUN0QixTQUFvQixFQUNwQixTQUFvQixFQUNwQixVQUFzQixFQUN0Qix3QkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ2xDLGlCQUFvQztRQVBwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFD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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb250ZW50RGlzcG9zaXRpb24sXG4gICAgQ29udGVudEVuY29kaW5nLFxuICAgIENvbnRlbnRFdmVudFR5cGUsXG4gICAgQ29udGVudFN0YXR1cyxcbiAgICBGaWxlTmFtZSxcbiAgICBJbXBvcnRDb250ZW50Q29udGV4dCxcbiAgICBNaW1lVHlwZSxcbiAgICBTdGF0ZSxcbiAgICBWaXNpYmlsaXR5XG59IGZyb20gJy4uLy4uJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7VXBkYXRlU2l6ZU9uRGV2aWNlfSBmcm9tICcuL3VwZGF0ZS1zaXplLW9uLWRldmljZSc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvY29udGVudC11dGlsJztcbmltcG9ydCB7R2V0Q29udGVudERldGFpbHNIYW5kbGVyfSBmcm9tICcuLi9nZXQtY29udGVudC1kZXRhaWxzLWhhbmRsZXInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge1ppcFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvemlwL2RlZi96aXAtc2VydmljZSc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vLi4vLi4vYXBpL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7RmlsZVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS91dGlsL2ZpbGUtdXRpbCc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7RXZlbnROYW1lc3BhY2UsIEV2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0ICogYXMgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQgQ09MVU1OX05BTUVfVklTSUJJTElUWSA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZO1xuXG5leHBvcnQgY2xhc3MgRXh0cmFjdFBheWxvYWRzIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgemlwU2VydmljZTogWmlwU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ2V0Q29udGVudERldGFpbHNIYW5kbGVyOiBHZXRDb250ZW50RGV0YWlsc0hhbmRsZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBldmVudHNCdXNTZXJ2aWNlOiBFdmVudHNCdXNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUoaW1wb3J0Q29udGV4dDogSW1wb3J0Q29udGVudENvbnRleHQpOiBQcm9taXNlPFtSZXNwb25zZSwgTm9kZUpTLlRpbWVvdXRdPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICBpbXBvcnRDb250ZXh0LmlkZW50aWZpZXJzID0gW107XG4gICAgICAgIGNvbnN0IGluc2VydE5ld0NvbnRlbnRNb2RlbHM6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IFtdO1xuICAgICAgICBjb25zdCB1cGRhdGVOZXdDb250ZW50TW9kZWxzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICAgICAgY29uc3QgY29tbW9uQ29udGVudE1vZGVsc01hcDogTWFwPHN0cmluZywgQ29udGVudEVudHJ5LlNjaGVtYU1hcD4gPSBuZXcgTWFwPHN0cmluZywgQ29udGVudEVudHJ5LlNjaGVtYU1hcD4oKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZERlc3RpbmF0aW9uUGF0aE1hcDogTWFwPHN0cmluZywgc3RyaW5nIHwgdW5kZWZpbmVkPiA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IHJvb3RDb250ZW50UGF0aDtcbiAgICAgICAgLy8gdGhpcyBjb3VudCBpcyBmb3IgbWFpbnRhaW5pbmcgaG93IG1hbnkgY29udGVudHMgYXJlIGltcG9ydGVkIHNvIGZhclxuICAgICAgICBsZXQgY3VycmVudENvdW50ID0gMDtcbiAgICAgICAgLy8gcG9zdCBldmVudCBiZWZvcmUgc3RhcnRpbmcgd2l0aCBob3cgbWFueSBpbXBvcnRzIGFyZSB0byBiZSBkb25lIHRvdGFsbHlcbiAgICAgICAgdGhpcy5wb3N0SW1wb3J0UHJvZ3Jlc3NFdmVudChjdXJyZW50Q291bnQsIGltcG9ydENvbnRleHQuaXRlbXMhLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGNvbnN0IG5vblVuaXRDb250ZW50SWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBjb25zdCBhcHBJY29uczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGltcG9ydENvbnRleHQuaXRlbXMhKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZSBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gZWxlbWVudC5pZGVudGlmaWVyO1xuICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IENvbnRlbnRVdGlsLnJlYWRWaXNpYmlsaXR5KGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgYXBwSWNvbiA9IGVsZW1lbnQuYXBwSWNvbjtcbiAgICAgICAgICAgIGlmIChDb250ZW50VXRpbC5pc05vdFVuaXQoZWxlbWVudC5taW1lVHlwZSwgdmlzaWJpbGl0eSkpIHtcbiAgICAgICAgICAgICAgICBub25Vbml0Q29udGVudElkcy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIGlmIChhcHBJY29uICYmICFhcHBJY29uLnN0YXJ0c1dpdGgoJ2h0dHBzOicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcEljb25zLnB1c2goaWRlbnRpZmllciArICcvJyArIGFwcEljb24uc3Vic3RyaW5nKDAsIGFwcEljb24ubGFzdEluZGV4T2YoJy8nKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRlbnRJZHMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZURpcihDb250ZW50VXRpbC5nZXRDb250ZW50Um9vdERpcihpbXBvcnRDb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyKSwgZmFsc2UpO1xuICAgICAgICAvLyBDcmVhdGUgYWxsIHRoZSBkaXJlY3RvcmllcyBmb3IgY29udGVudC5cbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25Sb290RGlyID0gQ29udGVudFV0aWwuZ2V0Q29udGVudFJvb3REaXIoaW1wb3J0Q29udGV4dC5kZXN0aW5hdGlvbkZvbGRlcilcbiAgICAgICAgbGV0IGNyZWF0ZWREaXJlY3RvcmllcztcbiAgICAgICAgaWYoaW1wb3J0Q29udGV4dC5pdGVtcyFbMF0ubWltZVR5cGUgPT09IE1pbWVUeXBlLlFVRVNUSU9OX1NFVCl7XG5cbiAgICAgICAgICAgIGNyZWF0ZWREaXJlY3RvcmllcyA9IGF3YWl0IHRoaXMuc2VncmVnYXRlUXVlc3Rpb25zKFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uUm9vdERpciwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbXBvcnRDb250ZXh0Lml0ZW1zKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIGNyZWF0ZWREaXJlY3RvcmllcyA9IGF3YWl0IHRoaXMuY3JlYXRlRGlyZWN0b3JpZXMoZGVzdGluYXRpb25Sb290RGlyLFxuICAgICAgICAgICAgICAgIG5vblVuaXRDb250ZW50SWRzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjcmVhdGUgc3ViZGlyZWN0b3JpZXMgZm9yIHRoZSBjb250ZW50cyB3aGljaCBoYXMgYXBwSWNvbnNcbiAgICAgICAgY29uc3QgY3JlYXRlU3ViRGlyZWN0b3JpZXMgPSBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yaWVzKGRlc3RpbmF0aW9uUm9vdERpciwgYXBwSWNvbnMpO1xuICAgICAgICBjb25zdCBxdWVyeSA9IEFycmF5VXRpbC5qb2luUHJlc2VydmluZ1F1b3Rlcyhjb250ZW50SWRzKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdDb250ZW50TW9kZWxzID0gYXdhaXQgdGhpcy5nZXRDb250ZW50RGV0YWlsc0hhbmRsZXIuZmV0Y2hGcm9tREJGb3JBbGwocXVlcnkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGV4aXN0aW5nQ29udGVudE1vZGVscy5yZWR1Y2UoKG1hcCwgb2JqKSA9PiB7XG4gICAgICAgICAgICBtYXBbb2JqLmlkZW50aWZpZXJdID0gb2JqO1xuICAgICAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgaW1wb3J0Q29udGV4dC5pdGVtcyEpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZSBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gaXRlbS5pZGVudGlmaWVyO1xuICAgICAgICAgICAgLy8gc2tpcCB0aGUgY29udGVudCBpZiBhbHJlYWR5IGltcG9ydGVkIG9uIHRoZSBzYW1lIHZlcnNpb25cbiAgICAgICAgICAgIGlmIChpbXBvcnRDb250ZXh0LnNraXBwZWRJdGVtc0lkZW50aWZpZXJcbiAgICAgICAgICAgICAgICAmJiBpbXBvcnRDb250ZXh0LnNraXBwZWRJdGVtc0lkZW50aWZpZXIuaW5kZXhPZihpZGVudGlmaWVyKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IGl0ZW0ubWltZVR5cGU7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50RW5jb2RpbmcgPSBpdGVtLmNvbnRlbnRFbmNvZGluZztcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnREaXNwb3NpdGlvbiA9IGl0ZW0uY29udGVudERpc3Bvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSBDb250ZW50VXRpbC5yZWFkQ29udGVudFR5cGUoaXRlbSk7XG4gICAgICAgICAgICBjb25zdCBwcmltYXJ5Q2F0ZWdvcnkgPSBDb250ZW50VXRpbC5yZWFkUHJpbWFyeUNhdGVnb3J5KGl0ZW0pO1xuICAgICAgICAgICAgbGV0IHZpc2liaWxpdHkgPSBDb250ZW50VXRpbC5yZWFkVmlzaWJpbGl0eShpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGllbmNlID0gQ29udGVudFV0aWwucmVhZEF1ZGllbmNlKGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgcHJhZ21hID0gQ29udGVudFV0aWwucmVhZFByYWdtYShpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHBrZ1ZlcnNpb24gPSBpdGVtLnBrZ1ZlcnNpb247XG4gICAgICAgICAgICBjb25zdCBhcnRpZmFjdFVybCA9IGl0ZW0uYXJ0aWZhY3RVcmw7XG4gICAgICAgICAgICBjb25zdCBhcHBJY29uID0gaXRlbS5hcHBJY29uO1xuICAgICAgICAgICAgY29uc3QgaXRlbVNldFByZXZpZXdVcmwgPSBpdGVtLml0ZW1TZXRQcmV2aWV3VXJsO1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSBpdGVtLmJvYXJkO1xuICAgICAgICAgICAgY29uc3QgbWVkaXVtID0gaXRlbS5tZWRpdW07XG4gICAgICAgICAgICBjb25zdCBncmFkZSA9IGl0ZW0uZ3JhZGVMZXZlbDtcbiAgICAgICAgICAgIGNvbnN0IGRpYWxjb2RlcyA9IGl0ZW0uZGlhbGNvZGVzO1xuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IGl0ZW0uY2hpbGROb2RlcztcbiAgICAgICAgICAgIGxldCBjb250ZW50U3RhdGUgPSBTdGF0ZS5PTkxZX1NQSU5FLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIGxldCBwYXlsb2FkRGVzdGluYXRpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLy8gY29uc3QgZXhpc3RpbmdDb250ZW50TW9kZWwgPSBhd2FpdCB0aGlzLmdldENvbnRlbnREZXRhaWxzSGFuZGxlci5mZXRjaEZyb21EQihpZGVudGlmaWVyKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ29udGVudE1vZGVsID0gcmVzdWx0W2lkZW50aWZpZXJdO1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nQ29udGVudFBhdGg7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50TW9kZWwpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0NvbnRlbnRQYXRoID0gQ29udGVudFV0aWwuZ2V0QmFzZVBhdGgoZXhpc3RpbmdDb250ZW50TW9kZWxbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BBVEhdISk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCByb290Tm9kZUlkZW50aWZpZXI7XG4gICAgICAgICAgICBpZiAodmlzaWJpbGl0eSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgIHJvb3ROb2RlSWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQ29udGVudFV0aWwuaXNOb3RVbml0KG1pbWVUeXBlLCB2aXNpYmlsaXR5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjcmVhdGVkRGlyZWN0b3JpZXNbaWRlbnRpZmllcl0gJiYgY3JlYXRlZERpcmVjdG9yaWVzW2lkZW50aWZpZXJdLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZERlc3RpbmF0aW9uID0gKHdpbmRvdy5kZXZpY2UucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gXCJpb3NcIikgPyBjcmVhdGVkRGlyZWN0b3JpZXNbaWRlbnRpZmllcl0ucGF0aCEuY29uY2F0KFwiL1wiKTogY3JlYXRlZERpcmVjdG9yaWVzW2lkZW50aWZpZXJdLnBhdGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBheWxvYWREaXJlY3RvcnkgPSAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiKSA/IFxuICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudFV0aWwuZ2V0Q29udGVudFJvb3REaXIoaW1wb3J0Q29udGV4dC5kZXN0aW5hdGlvbkZvbGRlcikuY29uY2F0KGlkZW50aWZpZXIpOlxuICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudFV0aWwuZ2V0Q29udGVudFJvb3REaXIoaW1wb3J0Q29udGV4dC5kZXN0aW5hdGlvbkZvbGRlcikuY29uY2F0KCcvJywgaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWREZXN0aW5hdGlvbkRpcmVjdG9yeUVudHJ5OiBEaXJlY3RvcnlFbnRyeSA9IGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuY3JlYXRlRGlyKHBheWxvYWREaXJlY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkRGVzdGluYXRpb24gPSBwYXlsb2FkRGVzdGluYXRpb25EaXJlY3RvcnlFbnRyeS5uYXRpdmVVUkw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNVbnppcHBpbmdTdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgZG9lc0NvbnRlbnRFeGlzdDogYm9vbGVhbiA9IENvbnRlbnRVdGlsLmRvZXNDb250ZW50RXhpc3QoZXhpc3RpbmdDb250ZW50TW9kZWwsIGlkZW50aWZpZXIsIHBrZ1ZlcnNpb24sIGZhbHNlKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjb250ZW50IGlzIGV4aXN0IHRoZW4gY29weSB0aGUgb2xkIGNvbnRlbnQgZGF0YSBhbmQgYWRkIGl0IGludG8gbmV3IGNvbnRlbnQuXG4gICAgICAgICAgICBpZiAoZG9lc0NvbnRlbnRFeGlzdCAmJiAhKGl0ZW0uc3RhdHVzID09PSBDb250ZW50U3RhdHVzLkRSQUZULnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50TW9kZWwhW0NPTFVNTl9OQU1FX1ZJU0lCSUxJVFldID09PSBWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBKU09OLnBhcnNlKGV4aXN0aW5nQ29udGVudE1vZGVsIVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9lc0NvbnRlbnRFeGlzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIGxldCBpc1VuemlwcGluZ1N1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoYXJ0aWZhY3RVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFDb250ZW50VXRpbC5pc0lubGluZUlkZW50aXR5KGNvbnRlbnREaXNwb3NpdGlvbiwgY29udGVudEVuY29kaW5nKSAmJiBtaW1lVHlwZSA9PT0gTWltZVR5cGUuRVBVQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvcHlBc3NldHMoaW1wb3J0Q29udGV4dC50bXBMb2NhdGlvbiEsIGFydGlmYWN0VXJsLCBwYXlsb2FkRGVzdGluYXRpb24hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuemlwcGluZ1N1Y2Nlc3NmdWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVW56aXBwaW5nU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGVudERpc3Bvc2l0aW9uIHx8ICFjb250ZW50RW5jb2RpbmcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZW50RGlzcG9zaXRpb24gPT09IENvbnRlbnREaXNwb3NpdGlvbi5JTkxJTkUudmFsdWVPZigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY29udGVudEVuY29kaW5nID09PSBDb250ZW50RW5jb2RpbmcuR1pJUC52YWx1ZU9mKCkpKSB7IC8vIENvbnRlbnQgd2l0aCBhcnRpZmFjdCB3aXRob3V0IHppcCBpLmUuIHBmZCwgbXA0XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gaW1wb3J0Q29udGV4dC50bXBMb2NhdGlvbiEuY29uY2F0KGFydGlmYWN0VXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnppcFNlcnZpY2UudW56aXAocGF5bG9hZCwge3RhcmdldDogcGF5bG9hZERlc3RpbmF0aW9uIX0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbnppcHBpbmdTdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQ29udGVudFV0aWwuaXNJbmxpbmVJZGVudGl0eShjb250ZW50RGlzcG9zaXRpb24sIGNvbnRlbnRFbmNvZGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jb3B5QXNzZXRzKGltcG9ydENvbnRleHQudG1wTG9jYXRpb24hLCBhcnRpZmFjdFVybCwgcGF5bG9hZERlc3RpbmF0aW9uISk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbnppcHBpbmdTdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuemlwcGluZ1N1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChDb250ZW50RGlzcG9zaXRpb24uT05MSU5FLnZhbHVlT2YoKSA9PT0gY29udGVudERpc3Bvc2l0aW9uKSB7IC8vIENvbnRlbnQgd2l0aCBubyBhcnRpZmFjdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVW56aXBwaW5nU3VjY2Vzc2Z1bCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgb3IgdXBkYXRlIHRoZSBjb250ZW50X3N0YXRlXG4gICAgICAgICAgICAgICAgaWYgKGlzVW56aXBwaW5nU3VjY2Vzc2Z1bFxuICAgICAgICAgICAgICAgIHx8IHRoaXMuc2hvdWxkRG93bmxvYWRRdWVzdGlvblNldChpbXBvcnRDb250ZXh0Lml0ZW1zISwgaXRlbSlcbiAgICAgICAgICAgICAgICB8fCBNaW1lVHlwZS5DT0xMRUNUSU9OLnZhbHVlT2YoKSA9PT0gbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFN0YXRlID0gU3RhdGUuQVJUSUZBQ1RfQVZBSUxBQkxFLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUgPSBTdGF0ZS5PTkxZX1NQSU5FLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmlzTm90VW5pdChtaW1lVHlwZSwgdmlzaWJpbGl0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXBwSWNvbi5zdGFydHNXaXRoKCdodHRwczonKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weUFzc2V0cyhpbXBvcnRDb250ZXh0LnRtcExvY2F0aW9uISwgYXBwSWNvbiwgcGF5bG9hZERlc3RpbmF0aW9uISwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbVNldFByZXZpZXdVcmwuc3RhcnRzV2l0aCgnaHR0cHM6JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weUFzc2V0cyhpbXBvcnRDb250ZXh0LnRtcExvY2F0aW9uISwgaXRlbVNldFByZXZpZXdVcmwsIHBheWxvYWREZXN0aW5hdGlvbiEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuZ2V0QmFzZVBhdGgocGF5bG9hZERlc3RpbmF0aW9uLCBkb2VzQ29udGVudEV4aXN0LCBleGlzdGluZ0NvbnRlbnRQYXRoKTtcbiAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5ID09PSBWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgcm9vdENvbnRlbnRQYXRoID0gYmFzZVBhdGg7XG4gICAgICAgICAgICAgICAgaW1wb3J0Q29udGV4dC5yb290SWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmlzTm90VW5pdChtaW1lVHlwZSwgdmlzaWJpbGl0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1wb3J0Q29udGV4dC5pZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZUNvdW50ID0gdGhpcy5nZXRSZWZlcmVuY2VDb3VudChleGlzdGluZ0NvbnRlbnRNb2RlbCwgdmlzaWJpbGl0eSxcbiAgICAgICAgICAgICAgICBpbXBvcnRDb250ZXh0LmlzQ2hpbGRDb250ZW50LCBpbXBvcnRDb250ZXh0LmV4aXN0ZWRDb250ZW50SWRlbnRpZmllcnMpO1xuICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuZ2V0Q29udGVudFZpc2liaWxpdHkoZXhpc3RpbmdDb250ZW50TW9kZWwsIGl0ZW1bJ29iamVjdFR5cGUnXSwgaW1wb3J0Q29udGV4dC5pc0NoaWxkQ29udGVudCwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICAvLyBjb250ZW50U3RhdGUgPSB0aGlzLmdldENvbnRlbnRTdGF0ZShleGlzdGluZ0NvbnRlbnRNb2RlbCwgY29udGVudFN0YXRlKTtcbiAgICAgICAgICAgIENvbnRlbnRVdGlsLmFkZE9yVXBkYXRlVmlyYWxpdHlNZXRhZGF0YShpdGVtLCB0aGlzLmRldmljZUluZm8uZ2V0RGV2aWNlSUQoKS50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgY29uc3Qgc2l6ZU9uRGV2aWNlID0gMDtcbiAgICAgICAgICAgIGlmIChDb250ZW50VXRpbC5pc05vdFVuaXQobWltZVR5cGUsIHZpc2liaWxpdHkpKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc3RpbmF0aW9uUGF0aE1hcC5zZXQoaWRlbnRpZmllciwgcGF5bG9hZERlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyB0cnkge1xuICAgICAgICAgICAgICAgIC8vICAgICBzaXplT25EZXZpY2UgPSBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLmdldERpcmVjdG9yeVNpemUocGF5bG9hZERlc3RpbmF0aW9uISk7XG4gICAgICAgICAgICAgICAgLy8gfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRlbnRNb2RlbDogQ29udGVudEVudHJ5LlNjaGVtYU1hcCA9IHRoaXMuY29uc3RydWN0Q29udGVudERCTW9kZWwoaWRlbnRpZmllciwgaW1wb3J0Q29udGV4dC5tYW5pZmVzdFZlcnNpb24sXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoaXRlbSksIG1pbWVUeXBlLCBjb250ZW50VHlwZSwgdmlzaWJpbGl0eSwgYmFzZVBhdGgsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlQ291bnQsIGNvbnRlbnRTdGF0ZSwgYXVkaWVuY2UsIHByYWdtYSwgc2l6ZU9uRGV2aWNlLCBib2FyZCwgbWVkaXVtLCBncmFkZSwgZGlhbGNvZGVzLCBjaGlsZE5vZGVzLCBwcmltYXJ5Q2F0ZWdvcnkpO1xuICAgICAgICAgICAgaWYgKCFleGlzdGluZ0NvbnRlbnRNb2RlbCkge1xuICAgICAgICAgICAgICAgIGluc2VydE5ld0NvbnRlbnRNb2RlbHMucHVzaChuZXdDb250ZW50TW9kZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnRTdGF0ZSA9IHRoaXMuZ2V0Q29udGVudFN0YXRlKGV4aXN0aW5nQ29udGVudE1vZGVsLCBjb250ZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0NvbnRlbnRTdGF0ZSA9PT0gU3RhdGUuT05MWV9TUElORS52YWx1ZU9mKClcbiAgICAgICAgICAgICAgICAgICAgfHwgaXNVbnppcHBpbmdTdWNjZXNzZnVsICAgIC8vIElmIHVuemlwIGlzIHN1Y2Nlc3MgaXQgbWVhbnMgYXJ0aWZhY3QgaXMgYXZhaWxhYmxlLlxuICAgICAgICAgICAgICAgICAgICB8fCBNaW1lVHlwZS5DT0xMRUNUSU9OLnZhbHVlT2YoKSA9PT0gbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlTmV3Q29udGVudE1vZGVscy5wdXNoKG5ld0NvbnRlbnRNb2RlbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q29udGVudE1vZGVsW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFXSA9IHRoaXMuZ2V0Q29udGVudFN0YXRlKGV4aXN0aW5nQ29udGVudE1vZGVsLCBjb250ZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tbW9uQ29udGVudE1vZGVsc01hcC5zZXQoaWRlbnRpZmllciwgbmV3Q29udGVudE1vZGVsKTtcblxuICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGN1cnJlbnQgY291bnRcbiAgICAgICAgICAgIGN1cnJlbnRDb3VudCsrO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRDb3VudCAlIDIwID09PSAwIHx8IGN1cnJlbnRDb3VudCA9PT0gKGltcG9ydENvbnRleHQuaXRlbXMhLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RJbXBvcnRQcm9ncmVzc0V2ZW50KGN1cnJlbnRDb3VudCwgaW1wb3J0Q29udGV4dC5pdGVtcyEubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBVcGRhdGUvY3JlYXRlIGNvbnRlbnRzIGluIERCIHdpdGggc2l6ZV9vbl9kZXZpY2UgYXMgMCBpbml0aWFsbHlcbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50REIoaW5zZXJ0TmV3Q29udGVudE1vZGVscywgdXBkYXRlTmV3Q29udGVudE1vZGVscyk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUNvbnRlbnRGaWxlU2l6ZUluREJUaW1lT3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbnRlbnRzIGluIERCIHdpdGggYWN0dWFsIHNpemVcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29udGVudEZpbGVTaXplSW5EQihpbXBvcnRDb250ZXh0LCBjb21tb25Db250ZW50TW9kZWxzTWFwLCBwYXlsb2FkRGVzdGluYXRpb25QYXRoTWFwLCByZXN1bHQpO1xuICAgICAgICB9LCA1MDAwKTtcblxuICAgICAgICBpZiAocm9vdENvbnRlbnRQYXRoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuY29weUZpbGUoaW1wb3J0Q29udGV4dC50bXBMb2NhdGlvbiEsXG4gICAgICAgICAgICAgICAgICAgIEZpbGVOYW1lLk1BTklGRVNULnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRlbnRQYXRoLFxuICAgICAgICAgICAgICAgICAgICBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKCkpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGNlcHRpb24gUmFpc2VkIER1cmluZyBJbXBvcnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlLmJvZHkgPSBpbXBvcnRDb250ZXh0O1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtyZXNwb25zZSwgdXBkYXRlQ29udGVudEZpbGVTaXplSW5EQlRpbWVPdXRSZWZdIGFzIGFueSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlQ29udGVudEZpbGVTaXplSW5EQihpbXBvcnRDb250ZXh0OiBJbXBvcnRDb250ZW50Q29udGV4dCwgY29tbW9uQ29udGVudE1vZGVsc01hcCwgcGF5bG9hZERlc3RpbmF0aW9uUGF0aE1hcCwgcmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHM6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgaW1wb3J0Q29udGV4dC5pdGVtcyEpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBpdGVtLmlkZW50aWZpZXI7XG4gICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IGNvbW1vbkNvbnRlbnRNb2RlbHNNYXAuZ2V0KGlkZW50aWZpZXIpLm1pbWVUeXBlO1xuICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IGNvbW1vbkNvbnRlbnRNb2RlbHNNYXAuZ2V0KGlkZW50aWZpZXIpLnZpc2liaWxpdHk7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkRGVzdGluYXRpb24gPSBwYXlsb2FkRGVzdGluYXRpb25QYXRoTWFwLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIGxldCBzaXplT25EZXZpY2UgPSAwO1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDb250ZW50TW9kZWwgPSByZXN1bHRbaWRlbnRpZmllcl07XG4gICAgICAgICAgICBpZiAoQ29udGVudFV0aWwuaXNOb3RVbml0KG1pbWVUeXBlLCB2aXNpYmlsaXR5KSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemVPbkRldmljZSA9IGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuZ2V0RGlyZWN0b3J5U2l6ZShwYXlsb2FkRGVzdGluYXRpb24hKTtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uQ29udGVudE1vZGVsc01hcC5nZXQoaWRlbnRpZmllcikuc2l6ZV9vbl9kZXZpY2UgPSBzaXplT25EZXZpY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3RpbmdDb250ZW50TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHMucHVzaChjb21tb25Db250ZW50TW9kZWxzTWFwLmdldChpZGVudGlmaWVyKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVOZXdDb250ZW50TW9kZWxzLnB1c2goY29tbW9uQ29udGVudE1vZGVsc01hcC5nZXQoaWRlbnRpZmllcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRlbnREQihbXSwgdXBkYXRlTmV3Q29udGVudE1vZGVscywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlQ29udGVudERCKGluc2VydE5ld0NvbnRlbnRNb2RlbHMsIHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHMsIHVwZGF0ZVNpemU/OiBib29sZWFuKSB7XG4gICAgICAgIGluc2VydE5ld0NvbnRlbnRNb2RlbHMgPSAoaW5zZXJ0TmV3Q29udGVudE1vZGVscyAmJiBpbnNlcnROZXdDb250ZW50TW9kZWxzLmxlbmd0aCkgPyB0aGlzLmZpbHRlclF1ZXN0aW9uU2V0Q29udGVudChpbnNlcnROZXdDb250ZW50TW9kZWxzKTogaW5zZXJ0TmV3Q29udGVudE1vZGVscztcbiAgICAgICAgdXBkYXRlTmV3Q29udGVudE1vZGVscyA9ICh1cGRhdGVOZXdDb250ZW50TW9kZWxzICYmIHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHMubGVuZ3RoKSA/IHRoaXMuZmlsdGVyUXVlc3Rpb25TZXRDb250ZW50KHVwZGF0ZU5ld0NvbnRlbnRNb2RlbHMpOiB1cGRhdGVOZXdDb250ZW50TW9kZWxzO1xuICAgICAgICBpZiAoaW5zZXJ0TmV3Q29udGVudE1vZGVscy5sZW5ndGggfHwgdXBkYXRlTmV3Q29udGVudE1vZGVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIC8vIEluc2VydCBpbnRvIERCXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgaW5zZXJ0TmV3Q29udGVudE1vZGVscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRlbnRNb2RlbCA9IGUgYXMgQ29udGVudEVudHJ5LlNjaGVtYU1hcDtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogbmV3Q29udGVudE1vZGVsXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBjb250ZW50IGluIERCXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdXBkYXRlTmV3Q29udGVudE1vZGVscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRlbnRNb2RlbCA9IGUgYXMgQ29udGVudEVudHJ5LlNjaGVtYU1hcDtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtuZXdDb250ZW50TW9kZWxbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdXSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBuZXdDb250ZW50TW9kZWxcbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGVTaXplKSB7XG4gICAgICAgICAgICBuZXcgVXBkYXRlU2l6ZU9uRGV2aWNlKHRoaXMuZGJTZXJ2aWNlLCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLCB0aGlzLmZpbGVTZXJ2aWNlKS5leGVjdXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjb3B5QXNzZXRzKHRlbXBMb2NhdGlvblBhdGg6IHN0cmluZywgYXNzZXQ6IHN0cmluZywgcGF5bG9hZERlc3RpbmF0aW9uUGF0aDogc3RyaW5nLCB1c2VTdWJEaXJlY3Rvcmllcz86IGJvb2xlYW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChhc3NldCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGljb25TcmMgPSB0ZW1wTG9jYXRpb25QYXRoLmNvbmNhdChhc3NldCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgaWNvbkRlc3RpbmF0aW9uID0gcGF5bG9hZERlc3RpbmF0aW9uUGF0aC5jb25jYXQoYXNzZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvbGRlckNvbnRhaW5pbmdGaWxlID0gYXNzZXQuc3Vic3RyaW5nKDAsIGFzc2V0Lmxhc3RJbmRleE9mKCcvJykpO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IENhbiBvcHRpbWl6ZSBmb2xkZXIgY3JlYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoIXVzZVN1YkRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuY3JlYXRlRGlyKHBheWxvYWREZXN0aW5hdGlvblBhdGguY29uY2F0KGZvbGRlckNvbnRhaW5pbmdGaWxlKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vICogb25seSBpbiBjYXNlIG9mIGlPUyAqKioqXG4gICAgICAgICAgICAgICAgaWYod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICogY2hlY2tpbmcgaWYgZmlsZSBleGlzdCwgdGhlbiBkZWxldGUgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5maWxlU2VydmljZS5leGlzdHMocGF5bG9hZERlc3RpbmF0aW9uUGF0aC5jb25jYXQoJy8nLCBhc3NldCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UucmVtb3ZlRmlsZShwYXlsb2FkRGVzdGluYXRpb25QYXRoLmNvbmNhdCgnLycsIGFzc2V0KSkudGhlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yID0+JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgc291cmNlIGljb24gaXMgbm90IGF2YWlsYWJsZSB0aGVuIGNvcHkgYXNzZXRzIGlzIGZhaWxpbmcgYW5kIHRocm93aW5nIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLmNvcHlGaWxlKHRlbXBMb2NhdGlvblBhdGguY29uY2F0KGZvbGRlckNvbnRhaW5pbmdGaWxlKSwgRmlsZVV0aWwuZ2V0RmlsZU5hbWUoYXNzZXQpLFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkRGVzdGluYXRpb25QYXRoLmNvbmNhdChmb2xkZXJDb250YWluaW5nRmlsZSksIEZpbGVVdGlsLmdldEZpbGVOYW1lKGFzc2V0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBDb3B5IEFzc2V0Jyk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIG9yIHVwZGF0ZSB0aGUgcmVmZXJlbmNlIGNvdW50IGZvciB0aGUgY29udGVudFxuICAgICAqXG4gICAgICovXG4gICAgZ2V0Q29udGVudFZpc2liaWxpdHkoZXhpc3RpbmdDb250ZW50SW5EYiwgb2JqZWN0VHlwZSwgaXNDaGlsZENvbnRlbnQ6IGJvb2xlYW4sIHByZXZpb3VzVmlzaWJpbGl0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHZpc2liaWxpdHk7XG4gICAgICAgIGlmICgnTGlicmFyeScgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgICAgICAgIHZpc2liaWxpdHkgPSBWaXNpYmlsaXR5LlBBUkVOVC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXhpc3RpbmdDb250ZW50SW5EYikge1xuICAgICAgICAgICAgaWYgKGlzQ2hpbGRDb250ZW50ICAgICAvLyBJZiBpbXBvcnQgc3RhcnRlZCBmcm9tIGNoaWxkIGNvbnRlbnQgdGhlbiBkbyBub3QgdXBkYXRlIHRoZSB2aXNpYmlsaXR5LlxuICAgICAgICAgICAgICAgIC8vIElmIG5vdCBzdGFydGVkIGZyb20gY2hpbGQgY29udGVudCB0aGVuIGRvIG5vdCBzaHJpbmsgdmlzaWJpbGl0eS5cbiAgICAgICAgICAgICAgICB8fCAhKFZpc2liaWxpdHkuUEFSRU5ULnZhbHVlT2YoKSA9PT0gZXhpc3RpbmdDb250ZW50SW5EYltDT0xVTU5fTkFNRV9WSVNJQklMSVRZXSkpIHtcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gZXhpc3RpbmdDb250ZW50SW5EYltDT0xVTU5fTkFNRV9WSVNJQklMSVRZXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmlzaWJpbGl0eSA/IHZpc2liaWxpdHkgOiBwcmV2aW91c1Zpc2liaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIG9yIHVwZGF0ZSB0aGUgY29udGVudF9zdGF0ZS4gY29udGVudFN0YXRlIHNob3VsZCBub3QgdXBkYXRlIHRoZSBzcGluZV9vbmx5IHdoZW4gaW1wb3J0aW5nIHRoZSBzcGluZSBjb250ZW50XG4gICAgICogYWZ0ZXIgaW1wb3J0aW5nIGNvbnRlbnQgd2l0aCBhcnRpZmFjdHMuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRDb250ZW50U3RhdGUoZXhpc3RpbmdDb250ZW50SW5EYiwgY29udGVudFN0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50SW5EYiAmJiBleGlzdGluZ0NvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFXSA+IGNvbnRlbnRTdGF0ZSkge1xuICAgICAgICAgICAgY29udGVudFN0YXRlID0gZXhpc3RpbmdDb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRTdGF0ZTtcbiAgICB9XG5cbiAgICBnZXRCYXNlUGF0aChwYXlMb2FkRGVzdGluYXRpb25QYXRoLCBkb2VzQ29udGVudEV4aXN0OiBib29sZWFuLCBleGlzdGluZ0NvbnRlbnRQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcGF0aDtcbiAgICAgICAgaWYgKHBheUxvYWREZXN0aW5hdGlvblBhdGggJiYgIWRvZXNDb250ZW50RXhpc3QpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXlMb2FkRGVzdGluYXRpb25QYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IGV4aXN0aW5nQ29udGVudFBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIG9yIHVwZGF0ZSB0aGUgcmVmZXJlbmNlIGNvdW50IGZvciB0aGUgY29udGVudFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZWZlcmVuY2VDb3VudChleGlzdGluZ0NvbnRlbnQsIHZpc2liaWxpdHk6IHN0cmluZywgaXNDaGlsZENvbnRlbnQ6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVJZGVudGlmaWVycz86IHsgW2lkZW50aWZpZXI6IHN0cmluZ106IGJvb2xlYW4gfSk6IG51bWJlciB7XG4gICAgICAgIGxldCByZWZDb3VudDogbnVtYmVyO1xuICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50KSB7XG4gICAgICAgICAgICByZWZDb3VudCA9IGV4aXN0aW5nQ29udGVudFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUkVGX0NPVU5UXTtcblxuICAgICAgICAgICAgY29uc3QgZm91bmQgPSB1cGRhdGVJZGVudGlmaWVycyA/IHVwZGF0ZUlkZW50aWZpZXJzW2V4aXN0aW5nQ29udGVudFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl1dIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGluY3JlYXNlIHRoZSByZWZDb3VudC5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzQ2hpbGRDb250ZW50KSB7ICAgIC8vIElmIGltcG9ydCBzdGFydGVkIGZyb20gY2hpbGQgY29udGVudCB0aGVuIGRvIG5vdCB1cGRhdGUgdGhlIHJlZkNvdW50LlxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjb250ZW50IGhhcyBhICdEZWZhdWx0JyB2aXNpYmlsaXR5IGFuZCB1cGRhdGUgdGhlIHNhbWUgY29udGVudCB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSByZWZlcmVuY2UgY291bnQuLi5cbiAgICAgICAgICAgICAgICBpZiAoIShWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpID09PSBleGlzdGluZ0NvbnRlbnRbQ09MVU1OX05BTUVfVklTSUJJTElUWV1cbiAgICAgICAgICAgICAgICAgICAgJiYgVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSA9PT0gdmlzaWJpbGl0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmQ291bnQgPSByZWZDb3VudCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVmQ291bnQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWZDb3VudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvc3RJbXBvcnRQcm9ncmVzc0V2ZW50KGN1cnJlbnRDb3VudCwgdG90YWxDb3VudCkge1xuICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLkNPTlRFTlQsXG4gICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IENvbnRlbnRFdmVudFR5cGUuSU1QT1JUX1BST0dSRVNTLFxuICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxDb3VudDogdG90YWxDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvdW50OiBjdXJyZW50Q291bnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0Q29udGVudERCTW9kZWwoaWRlbnRpZmllciwgbWFuaWZlc3RWZXJzaW9uLCBsb2NhbERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZSwgY29udGVudFR5cGUsIHZpc2liaWxpdHksIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZDb3VudCwgY29udGVudFN0YXRlLCBhdWRpZW5jZSwgcHJhZ21hLCBzaXplT25EZXZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZCwgbWVkaXVtLCBncmFkZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxjb2RlcywgY2hpbGROb2RlcywgcHJpbWFyeUNhdGVnb3J5KTogQ29udGVudEVudHJ5LlNjaGVtYU1hcCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdOiBpZGVudGlmaWVyLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TRVJWRVJfREFUQV06ICcnLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QQVRIXTogQ29udGVudFV0aWwuZ2V0QmFzZVBhdGgocGF0aCksXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVF06IHJlZkNvdW50LFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFXTogY29udGVudFN0YXRlLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRV06IHNpemVPbkRldmljZSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTUFOSUZFU1RfVkVSU0lPTl06IG1hbmlmZXN0VmVyc2lvbixcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV06IGxvY2FsRGF0YSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTUlNRV9UWVBFXTogbWltZVR5cGUsXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfVFlQRV06IGNvbnRlbnRUeXBlLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXTogdmlzaWJpbGl0eSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQVVESUVOQ0VdOiBhdWRpZW5jZSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUFJBR01BXTogcHJhZ21hLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9MQVNUX1VQREFURURfT05dOiBkYXlqcyhEYXRlLm5vdygpKS5mb3JtYXQoKSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQk9BUkRdOiBDb250ZW50VXRpbC5nZXRDb250ZW50QXR0cmlidXRlKGJvYXJkKSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTUVESVVNXTogQ29udGVudFV0aWwuZ2V0Q29udGVudEF0dHJpYnV0ZShtZWRpdW0pLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9HUkFERV06IENvbnRlbnRVdGlsLmdldENvbnRlbnRBdHRyaWJ1dGUoZ3JhZGUpLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9ESUFMQ09ERVNdOiBDb250ZW50VXRpbC5nZXRDb250ZW50QXR0cmlidXRlKGRpYWxjb2RlcyksXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NISUxEX05PREVTXTogQ29udGVudFV0aWwuZ2V0Q29udGVudEF0dHJpYnV0ZShjaGlsZE5vZGVzKSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUFJJTUFSWV9DQVRFR09SWV06IHByaW1hcnlDYXRlZ29yeVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFRPRE86IG1vdmUgdGhpcyBtZXRob2QgdG8gZmlsZS1zZXJ2aWNlXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVEaXJlY3RvcmllcyhwYXJlbnREaXJlY3RvcnlQYXRoOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0T2ZGb2xkZXI6IHN0cmluZ1tdKTogUHJvbWlzZTx7IFtrZXk6IHN0cmluZ106IHsgcGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkIH0gfT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiB7IHBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCB9IH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeVBhdGggPSAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiKSA/IHBhcmVudERpcmVjdG9yeVBhdGguY29uY2F0KCcvJykgOiBwYXJlbnREaXJlY3RvcnlQYXRoO1xuICAgICAgICAgICAgc2J1dGlsaXR5LmNyZWF0ZURpcmVjdG9yaWVzKENvbnRlbnRVdGlsLmdldEJhc2VQYXRoKHBhcmVudERpcmVjdG9yeVBhdGgpLCBsaXN0T2ZGb2xkZXIsXG4gICAgICAgICAgICAgICAgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlclF1ZXN0aW9uU2V0Q29udGVudChpdGVtcyl7XG4gICAgICAgIGNvbnN0IGZpbHRlcmRJdGVtcyA9IGl0ZW1zLmZpbHRlcihpID0+IChpLm1pbWVUeXBlICE9PU1pbWVUeXBlLlFVRVNUSU9OICYmIGkubWltZV90eXBlICE9PU1pbWVUeXBlLlFVRVNUSU9OKSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJkSXRlbXNcbiAgICB9XG5cbiAgICBhc3luYyBzZWdyZWdhdGVRdWVzdGlvbnMoZGVzdGluYXRpb25Sb290RGlyLCBmbGF0dGVuZWRMaXN0KSB7XG4gICAgICAgIGxldCBzZWdyZWdhdGVkUXVlc3Rpb25zID0ge307XG4gICAgICAgIGZvciAobGV0IGNvdW50ID0gMDsgY291bnQgPCBmbGF0dGVuZWRMaXN0Lmxlbmd0aDsgY291bnQrKykge1xuICAgICAgICAgICAgaWYgKGZsYXR0ZW5lZExpc3RbY291bnRdLm1pbWVUeXBlID09PSBNaW1lVHlwZS5RVUVTVElPTl9TRVQgJiZcbiAgICAgICAgICAgICAgICAhc2VncmVnYXRlZFF1ZXN0aW9uc1tmbGF0dGVuZWRMaXN0W2NvdW50XS5pZGVudGlmaWVyXSkge1xuICAgICAgICAgICAgICAgIHNlZ3JlZ2F0ZWRRdWVzdGlvbnNbZmxhdHRlbmVkTGlzdFtjb3VudF0uaWRlbnRpZmllcl0gPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmxhdHRlbmVkTGlzdFtjb3VudF0ubWltZVR5cGUgPT09IE1pbWVUeXBlLlFVRVNUSU9OKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlZ3JlZ2F0ZWRRdWVzdGlvbnNbZmxhdHRlbmVkTGlzdFtjb3VudF0ucGFyZW50XSkge1xuICAgICAgICAgICAgICAgICAgICBzZWdyZWdhdGVkUXVlc3Rpb25zW2ZsYXR0ZW5lZExpc3RbY291bnRdLnBhcmVudF0ucHVzaChmbGF0dGVuZWRMaXN0W2NvdW50XS5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWdyZWdhdGVkUXVlc3Rpb25zW2ZsYXR0ZW5lZExpc3RbY291bnRdLmlkZW50aWZpZXJdID0gW2ZsYXR0ZW5lZExpc3RbY291bnRdLmlkZW50aWZpZXJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXJBcnIgPSBPYmplY3Qua2V5cyhzZWdyZWdhdGVkUXVlc3Rpb25zKTtcbiAgICAgICAgbGV0IGNyZWF0ZWREaXIgPSBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yaWVzKGRlc3RpbmF0aW9uUm9vdERpciwgZGlyQXJyKTtcbiAgICAgICAgY29uc3Qgc2VncmVnYXRlZEFycjogYW55ID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2VncmVnYXRlZFF1ZXN0aW9ucykge1xuICAgICAgICAgICAgc2VncmVnYXRlZEFyci5wdXNoKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWRBcnI6IHNlZ3JlZ2F0ZWRRdWVzdGlvbnNba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgZGlyOiBgJHtkZXN0aW5hdGlvblJvb3REaXJ9LyR7a2V5fWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBpdGVyYXRvciBvZiBzZWdyZWdhdGVkQXJyKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZERpciA9IGF3YWl0IHRoaXMuY3JlYXRlRGlyZWN0b3JpZXMoaXRlcmF0b3IuZGlyLCBpdGVyYXRvci5pZEFycik7XG4gICAgICAgICAgICBjcmVhdGVkRGlyID0geyAuLi5jcmVhdGVkRGlyLCAuLi5jaGlsZERpciB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZWREaXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG91bGREb3dubG9hZFF1ZXN0aW9uU2V0KGNvbnRlbnRJdGVtcywgaXRlbSl7XG4gICAgICAgIGlmKGl0ZW0ubWltZVR5cGUgPT09IE1pbWVUeXBlLlFVRVNUSU9OX1NFVCAmJiBDb250ZW50VXRpbC5yZWFkVmlzaWJpbGl0eShpdGVtKSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja1BhcmVudFF1c3Rpb25TZXQoY29udGVudEl0ZW1zLCBpdGVtKVxuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSBmdW5jdGlvblxuICAgIHByaXZhdGUgY2hlY2tQYXJlbnRRdXN0aW9uU2V0KGNvbnRlbnRJdGVtcywgY29udGVudCkge1xuICAgICAgICBpZighY29udGVudCB8fCAhY29udGVudC5wYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmVudENvbnRlbnQgPSBjb250ZW50SXRlbXMuZmluZChpID0+IChpLmlkZW50aWZpZXIgPT09IGNvbnRlbnQucGFyZW50KSk7XG4gICAgICAgIGlmKCFwYXJlbnRDb250ZW50IHx8IHBhcmVudENvbnRlbnQubWltZVR5cGUgIT09IE1pbWVUeXBlLlFVRVNUSU9OX1NFVCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZihwYXJlbnRDb250ZW50Lm1pbWVUeXBlID09PSBNaW1lVHlwZS5RVUVTVElPTl9TRVQgJiYgXG4gICAgICAgICAgICBDb250ZW50VXRpbC5yZWFkVmlzaWJpbGl0eShwYXJlbnRDb250ZW50KSA9PT0gVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQYXJlbnRRdXN0aW9uU2V0KGNvbnRlbnRJdGVtcywgcGFyZW50Q29udGVudClcbiAgICB9XG5cbn1cbiJdfQ==