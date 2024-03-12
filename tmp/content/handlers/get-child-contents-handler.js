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
import { ContentUtil } from '../util/content-util';
import { ContentEntry } from '../db/schema';
import { ChildContents, MimeType, State } from '../util/content-constants';
import { Stack } from '../util/stack';
import { ContentMapper } from '../util/content-mapper';
import { ArrayUtil } from '../../util/array-util';
import { FileName } from './../util/content-constants';
var ChildContentsHandler = /** @class */ (function () {
    function ChildContentsHandler(dbService, getContentDetailsHandler, appConfig, fileService) {
        this.dbService = dbService;
        this.getContentDetailsHandler = getContentDetailsHandler;
        this.appConfig = appConfig;
        this.fileService = fileService;
    }
    ChildContentsHandler.prototype.fetchChildrenOfContent = function (contentInDb, childContentsMap, currentLevel, level, sourceInfoList) {
        return __awaiter(this, void 0, void 0, function () {
            var content, childContentModels, hierarchyInfoList, childContents, _i, childContentModels_1, element, childContentModel, childContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = ContentMapper.mapContentDBEntryToContent(contentInDb);
                        return [4 /*yield*/, this.getSortedChildrenList(contentInDb[ContentEntry.COLUMN_NAME_LOCAL_DATA], ChildContents.ALL, childContentsMap)];
                    case 1:
                        childContentModels = _a.sent();
                        if (!(childContentModels && childContentModels.length)) return [3 /*break*/, 7];
                        hierarchyInfoList = [];
                        hierarchyInfoList = hierarchyInfoList.concat(sourceInfoList);
                        hierarchyInfoList.push({
                            identifier: contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER],
                            contentType: contentInDb[ContentEntry.COLUMN_NAME_CONTENT_TYPE],
                            primaryCategory: contentInDb[ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY]
                        });
                        content.hierarchyInfo = hierarchyInfoList;
                        if (!(level === -1 || currentLevel <= level)) return [3 /*break*/, 6];
                        childContents = [];
                        _i = 0, childContentModels_1 = childContentModels;
                        _a.label = 2;
                    case 2:
                        if (!(_i < childContentModels_1.length)) return [3 /*break*/, 5];
                        element = childContentModels_1[_i];
                        childContentModel = element;
                        return [4 /*yield*/, this.fetchChildrenOfContent(childContentModel, childContentsMap, currentLevel + 1, level, hierarchyInfoList)];
                    case 3:
                        childContent = _a.sent();
                        if (childContent.contentData.appIcon && !childContent.contentData.appIcon.startsWith('http')) {
                            childContent.contentData.appIcon =
                                '_app_file_'.concat(childContent.basePath).concat(childContent.contentData.appIcon);
                        }
                        childContents.push(childContent);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        content.children = childContents;
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        content.hierarchyInfo = sourceInfoList;
                        _a.label = 8;
                    case 8: return [2 /*return*/, content];
                }
            });
        });
    };
    ChildContentsHandler.prototype.getContentsKeyList = function (contentInDb) {
        return __awaiter(this, void 0, void 0, function () {
            var contentKeyList, contentStack, parentChildRelation, key, node, childContentsInDb, tempKey, i, immediateParent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentKeyList = [];
                        contentStack = new Stack();
                        parentChildRelation = [];
                        key = '';
                        contentStack.push(contentInDb);
                        _a.label = 1;
                    case 1:
                        if (!!contentStack.isEmpty()) return [3 /*break*/, 4];
                        node = contentStack.pop();
                        if (!ContentUtil.hasChildren(node[ContentEntry.COLUMN_NAME_LOCAL_DATA])) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getSortedChildrenListOld(node[ContentEntry.COLUMN_NAME_LOCAL_DATA], ChildContents.ALL)];
                    case 2:
                        childContentsInDb = _a.sent();
                        childContentsInDb.forEach(function (childContentInDb) {
                            contentStack.push(childContentInDb);
                            parentChildRelation.push(node[ContentEntry.COLUMN_NAME_IDENTIFIER].concat('/', childContentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER]));
                        });
                        _a.label = 3;
                    case 3:
                        if (!key) {
                            key = node[ContentEntry.COLUMN_NAME_IDENTIFIER];
                        }
                        else {
                            tempKey = void 0;
                            for (i = key.split('/').length - 1; i >= 0; i--) {
                                immediateParent = key.split('/')[i];
                                if (ArrayUtil.contains(parentChildRelation, immediateParent.concat('/', node[ContentEntry.COLUMN_NAME_IDENTIFIER]))) {
                                    break;
                                }
                                else {
                                    key = key.substring(0, key.lastIndexOf('/'));
                                }
                            }
                            if (MimeType.COLLECTION.valueOf() === node[ContentEntry.COLUMN_NAME_MIME_TYPE]) {
                                key = key + '/' + node[ContentEntry.COLUMN_NAME_IDENTIFIER];
                            }
                            else {
                                tempKey = key + '/' + node[ContentEntry.COLUMN_NAME_IDENTIFIER];
                                contentKeyList.push(tempKey);
                            }
                        }
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, contentKeyList];
                }
            });
        });
    };
    ChildContentsHandler.prototype.getContentFromDB = function (hierarchyInfoList, identifier, shouldConvertBasePath) {
        return __awaiter(this, void 0, void 0, function () {
            var nextContentHierarchyList, nextContent, nextContentIdentifierList, idCount, isAllHierarchyContentFound, i, contentInDb, nextContentInDb, compatibilityLevel, isCompatible, hierarchyIdentifiers_1, query, contentModels, i, contentModel, localData, isTrackable, parentIdentifier, hierarchyList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nextContentHierarchyList = [];
                        if (!identifier) return [3 /*break*/, 7];
                        nextContentIdentifierList = identifier.split('/');
                        idCount = nextContentIdentifierList.length;
                        isAllHierarchyContentFound = true;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < (idCount - 1))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getContentDetailsHandler
                                .fetchFromDB(nextContentIdentifierList[i]).toPromise()];
                    case 2:
                        contentInDb = _a.sent();
                        if (contentInDb) {
                            nextContentHierarchyList.push({
                                identifier: contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER],
                                contentType: contentInDb[ContentEntry.COLUMN_NAME_CONTENT_TYPE],
                                primaryCategory: contentInDb[ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY]
                            });
                        }
                        else {
                            isAllHierarchyContentFound = false;
                            return [3 /*break*/, 4];
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!isAllHierarchyContentFound) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getContentDetailsHandler.fetchFromDB(nextContentIdentifierList[idCount - 1]).toPromise()];
                    case 5:
                        nextContentInDb = _a.sent();
                        if (!nextContentInDb) return [3 /*break*/, 7];
                        nextContent = ContentMapper.mapContentDBEntryToContent(nextContentInDb, shouldConvertBasePath);
                        nextContent.hierarchyInfo = nextContentHierarchyList;
                        nextContent.rollup = ContentUtil.getContentRollup(nextContent.identifier, nextContent.hierarchyInfo);
                        compatibilityLevel = ContentUtil.readCompatibilityLevel(nextContent.contentData);
                        isCompatible = ContentUtil.isCompatible(this.appConfig, compatibilityLevel);
                        nextContent.isCompatible = isCompatible;
                        hierarchyIdentifiers_1 = nextContentHierarchyList.map(function (t) { return t['identifier']; });
                        query = ArrayUtil.joinPreservingQuotes(hierarchyIdentifiers_1);
                        return [4 /*yield*/, this.getContentDetailsHandler.fetchFromDBForAll(query).toPromise()];
                    case 6:
                        contentModels = _a.sent();
                        contentModels = contentModels.sort(function (a, b) {
                            return hierarchyIdentifiers_1.indexOf(a['identifier']) - hierarchyIdentifiers_1.indexOf(b['identifier']);
                        });
                        for (i = 0; i < contentModels.length; i++) {
                            contentModel = contentModels[i];
                            localData = JSON.parse(contentModel[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                            isTrackable = ContentUtil.isTrackable(localData);
                            if (i === 0 && isTrackable === 1) {
                                break;
                            }
                            else if (isTrackable === 1) {
                                parentIdentifier = contentModel['identifier'];
                                hierarchyList = JSON.parse(JSON.stringify(nextContentHierarchyList));
                                if (hierarchyList) {
                                    hierarchyList = hierarchyList.slice(0, i);
                                    nextContent['trackableParentInfo'] = {
                                        identifier: contentModel['identifier'],
                                        hierarchyInfo: hierarchyList
                                    };
                                }
                                break;
                            }
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/, nextContent];
                }
            });
        });
    };
    ChildContentsHandler.prototype.getNextContentIdentifier = function (hierarchyInfoList, currentIdentifier, contentKeyList) {
        var currentIdentifiers = '';
        var nextContentIdentifier;
        hierarchyInfoList.forEach(function (hierarchyItem) {
            if (!currentIdentifiers) {
                currentIdentifiers = hierarchyItem.identifier;
            }
            else {
                currentIdentifiers = currentIdentifiers.concat('/', hierarchyItem.identifier);
            }
        });
        currentIdentifiers = currentIdentifiers.concat('/', currentIdentifier);
        var indexOfCurrentContentIdentifier = contentKeyList.indexOf(currentIdentifiers);
        if (indexOfCurrentContentIdentifier > 0) {
            nextContentIdentifier = contentKeyList[indexOfCurrentContentIdentifier - 1];
        }
        return nextContentIdentifier;
    };
    ChildContentsHandler.prototype.getPreviousContentIdentifier = function (hierarchyInfoList, currentIdentifier, contentKeyList) {
        var currentIdentifiers = '';
        var previousContentIdentifier;
        hierarchyInfoList.forEach(function (hierarchyItem) {
            if (!currentIdentifiers) {
                currentIdentifiers = hierarchyItem.identifier;
            }
            else {
                currentIdentifiers = currentIdentifiers.concat('/', hierarchyItem.identifier);
            }
        });
        currentIdentifiers = currentIdentifiers.concat('/', currentIdentifier);
        var indexOfCurrentContentIdentifier = contentKeyList.indexOf(currentIdentifiers);
        if (indexOfCurrentContentIdentifier !== -1 && indexOfCurrentContentIdentifier < (contentKeyList.length - 1)) {
            previousContentIdentifier = contentKeyList[indexOfCurrentContentIdentifier + 1];
        }
        return previousContentIdentifier;
    };
    // remove this later and use 'getSortedChildrenList' by passing childrencontentmap
    ChildContentsHandler.prototype.getSortedChildrenListOld = function (localData, level) {
        return __awaiter(this, void 0, void 0, function () {
            var data, childContents, childIdentifiers, whenAndThen, i, orderBy, filter, query;
            return __generator(this, function (_a) {
                data = JSON.parse(localData);
                childContents = data.children;
                if (!childContents || !childContents.length) {
                    return [2 /*return*/, []];
                }
                childContents = childContents.sort(function (childContent1, childContent2) {
                    return (childContent1.index - childContent2.index);
                });
                childIdentifiers = [];
                whenAndThen = '';
                i = 0;
                childContents.forEach(function (childContent) {
                    childIdentifiers.push(childContent.identifier);
                    whenAndThen = whenAndThen.concat(" WHEN '" + childContent.identifier + "' THEN " + i);
                    i = i + 1;
                });
                orderBy = '';
                if (i > 0) {
                    orderBy = orderBy.concat(" ORDER BY CASE  " + ContentEntry.COLUMN_NAME_IDENTIFIER + "  " + whenAndThen + "  END");
                }
                filter = '';
                switch (level) {
                    case ChildContents.DOWNLOADED.valueOf():
                        filter = ' AND ' + ContentEntry.COLUMN_NAME_CONTENT_STATE + '=\'' + State.ARTIFACT_AVAILABLE + '\'';
                        break;
                    case ChildContents.SPINE.valueOf():
                        filter = ' AND ' + ContentEntry.COLUMN_NAME_CONTENT_STATE + '=\'' + State.ONLY_SPINE + '\'';
                        break;
                    case ChildContents.ALL.valueOf():
                    default:
                        filter = '';
                        break;
                }
                query = "SELECT * FROM " + ContentEntry.TABLE_NAME + "\n                        WHERE " + ContentEntry.COLUMN_NAME_IDENTIFIER + "\n                        IN (" + ArrayUtil.joinPreservingQuotes(childIdentifiers) + ") " + filter + " " + orderBy;
                return [2 /*return*/, this.dbService.execute(query).toPromise()];
            });
        });
    };
    ChildContentsHandler.prototype.getSortedChildrenList = function (localData, level, childContentsMap) {
        return __awaiter(this, void 0, void 0, function () {
            var data, childContents, childContentsFromDB, _i, childContents_1, childContent, child, query, childFromDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = JSON.parse(localData);
                        childContents = data.children;
                        if (!childContents || !childContents.length) {
                            return [2 /*return*/, []];
                        }
                        childContents = childContents.sort(function (childContent1, childContent2) {
                            return (childContent1.index - childContent2.index);
                        });
                        childContentsFromDB = [];
                        _i = 0, childContents_1 = childContents;
                        _a.label = 1;
                    case 1:
                        if (!(_i < childContents_1.length)) return [3 /*break*/, 5];
                        childContent = childContents_1[_i];
                        child = childContentsMap.get(childContent.identifier);
                        if (!child) return [3 /*break*/, 2];
                        childContentsFromDB.push(child);
                        return [3 /*break*/, 4];
                    case 2:
                        query = "SELECT * FROM " + ContentEntry.TABLE_NAME + "\n                 WHERE " + ContentEntry.COLUMN_NAME_IDENTIFIER + " = '" + childContent.identifier + "'";
                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                    case 3:
                        childFromDb = _a.sent();
                        if (childFromDb.length) {
                            childContentsFromDB.push(childFromDb[0]);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        switch (level) {
                            case ChildContents.DOWNLOADED.valueOf():
                                // filter = ' AND ' + ContentEntry.COLUMN_NAME_CONTENT_STATE + '=\'' + State.ARTIFACT_AVAILABLE + '\'';
                                childContentsFromDB = childContentsFromDB
                                    .filter(function (c) { return c[ContentEntry.COLUMN_NAME_CONTENT_STATE] = State.ARTIFACT_AVAILABLE; });
                                break;
                            case ChildContents.SPINE.valueOf():
                                // filter = ' AND ' + ContentEntry.COLUMN_NAME_CONTENT_STATE + '=\'' + State.ONLY_SPINE + '\'';
                                childContentsFromDB = childContentsFromDB.filter(function (c) { return c[ContentEntry.COLUMN_NAME_CONTENT_STATE] = State.ONLY_SPINE; });
                                break;
                            case ChildContents.ALL.valueOf():
                            default:
                                break;
                        }
                        return [2 /*return*/, childContentsFromDB];
                }
            });
        });
    };
    // need to pass fileservice in constructor to use this method
    ChildContentsHandler.prototype.getChildIdentifiersFromManifest = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var manifestPath, childIdentifiers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manifestPath = 'file:///' + path;
                        childIdentifiers = [];
                        return [4 /*yield*/, this.fileService.readAsText(manifestPath, FileName.MANIFEST.valueOf())
                                .then(function (fileContents) { return __awaiter(_this, void 0, void 0, function () {
                                var childContents;
                                return __generator(this, function (_a) {
                                    console.log('fileContents', JSON.parse(fileContents));
                                    childContents = JSON.parse(fileContents).archive.items;
                                    childContents.shift();
                                    childContents.forEach(function (element) {
                                        childIdentifiers.push(element.identifier);
                                    });
                                    return [2 /*return*/, childIdentifiers];
                                });
                            }); }).catch(function (err) {
                                console.log('getChildIdentifiersFromManifest err', err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, childIdentifiers];
                }
            });
        });
    };
    return ChildContentsHandler;
}());
export { ChildContentsHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNoaWxkLWNvbnRlbnRzLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9nZXQtY2hpbGQtY29udGVudHMtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3ZEO0lBRUksOEJBQW9CLFNBQW9CLEVBQ3BCLHdCQUFrRCxFQUNsRCxTQUFvQixFQUNwQixXQUF5QjtRQUh6QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYztJQUM3QyxDQUFDO0lBRVkscURBQXNCLEdBQW5DLFVBQW9DLFdBQW1DLEVBQ25DLGdCQUFnQixFQUNoQixZQUFvQixFQUNwQixLQUFhLEVBQ2IsY0FBZ0M7Ozs7Ozt3QkFDMUQsT0FBTyxHQUFZLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFFM0UscUJBQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENB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Z0NBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDNUQsQ0FBQyxDQUFDLEVBQUE7O3dCQVhGLFNBV0UsQ0FBQzt3QkFDSCxzQkFBTyxnQkFBZ0IsRUFBQzs7OztLQUMzQjtJQUdMLDJCQUFDO0FBQUQsQ0FBQyxBQXZURCxJQXVUQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudCwgSGllcmFyY2h5SW5mb30gZnJvbSAnLi4vZGVmL2NvbnRlbnQnO1xuaW1wb3J0IHtDaGlsZENvbnRlbnR9IGZyb20gJy4uL2RlZi9yZXNwb25zZSc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0NoaWxkQ29udGVudHMsIE1pbWVUeXBlLCBTdGF0ZX0gZnJvbSAnLi4vdXRpbC9jb250ZW50LWNvbnN0YW50cyc7XG5pbXBvcnQge0dldENvbnRlbnREZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi9nZXQtY29udGVudC1kZXRhaWxzLWhhbmRsZXInO1xuaW1wb3J0IHtTdGFja30gZnJvbSAnLi4vdXRpbC9zdGFjayc7XG5pbXBvcnQge0NvbnRlbnRNYXBwZXJ9IGZyb20gJy4uL3V0aWwvY29udGVudC1tYXBwZXInO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlTmFtZSB9IGZyb20gJy4vLi4vdXRpbC9jb250ZW50LWNvbnN0YW50cyc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vLi4vYXBpL2NvbmZpZy9hcHAtY29uZmlnJztcblxuZXhwb3J0IGNsYXNzIENoaWxkQ29udGVudHNIYW5kbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnZXRDb250ZW50RGV0YWlsc0hhbmRsZXI6IEdldENvbnRlbnREZXRhaWxzSGFuZGxlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U/OiBGaWxlU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBmZXRjaENoaWxkcmVuT2ZDb250ZW50KGNvbnRlbnRJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHNNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudExldmVsOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbmZvTGlzdD86IEhpZXJhcmNoeUluZm9bXSk6IFByb21pc2U8Q29udGVudD4ge1xuICAgICAgICBjb25zdCBjb250ZW50OiBDb250ZW50ID0gQ29udGVudE1hcHBlci5tYXBDb250ZW50REJFbnRyeVRvQ29udGVudChjb250ZW50SW5EYik7XG4gICAgICAgIGNvbnN0IGNoaWxkQ29udGVudE1vZGVsczogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0U29ydGVkQ2hpbGRyZW5MaXN0KGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSwgQ2hpbGRDb250ZW50cy5BTEwsIGNoaWxkQ29udGVudHNNYXApO1xuICAgICAgICBpZiAoY2hpbGRDb250ZW50TW9kZWxzICYmIGNoaWxkQ29udGVudE1vZGVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdID0gW107XG4gICAgICAgICAgICBoaWVyYXJjaHlJbmZvTGlzdCA9IGhpZXJhcmNoeUluZm9MaXN0LmNvbmNhdChzb3VyY2VJbmZvTGlzdCEpO1xuICAgICAgICAgICAgaGllcmFyY2h5SW5mb0xpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9UWVBFXSxcbiAgICAgICAgICAgICAgICBwcmltYXJ5Q2F0ZWdvcnk6IGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QUklNQVJZX0NBVEVHT1JZXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb250ZW50LmhpZXJhcmNoeUluZm8gPSBoaWVyYXJjaHlJbmZvTGlzdCE7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gLTEgfHwgY3VycmVudExldmVsIDw9IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50czogQ29udGVudFtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNoaWxkQ29udGVudE1vZGVscykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbnRlbnRNb2RlbCA9IGVsZW1lbnQgYXMgQ29udGVudEVudHJ5LlNjaGVtYU1hcDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50OiBDb250ZW50ID0gYXdhaXQgdGhpcy5mZXRjaENoaWxkcmVuT2ZDb250ZW50KGNoaWxkQ29udGVudE1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDb250ZW50c01hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZXJhcmNoeUluZm9MaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkQ29udGVudC5jb250ZW50RGF0YS5hcHBJY29uICYmICFjaGlsZENvbnRlbnQuY29udGVudERhdGEuYXBwSWNvbi5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudC5jb250ZW50RGF0YS5hcHBJY29uID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnX2FwcF9maWxlXycuY29uY2F0KGNoaWxkQ29udGVudC5iYXNlUGF0aCkuY29uY2F0KGNoaWxkQ29udGVudC5jb250ZW50RGF0YS5hcHBJY29uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzLnB1c2goY2hpbGRDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGVudC5jaGlsZHJlbiA9IGNoaWxkQ29udGVudHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50LmhpZXJhcmNoeUluZm8gPSBzb3VyY2VJbmZvTGlzdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDb250ZW50c0tleUxpc3QoY29udGVudEluRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXApOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRLZXlMaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBjb25zdCBjb250ZW50U3RhY2sgPSBuZXcgU3RhY2s8Q29udGVudEVudHJ5LlNjaGVtYU1hcD4oKTtcbiAgICAgICAgY29uc3QgcGFyZW50Q2hpbGRSZWxhdGlvbjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGtleSA9ICcnO1xuICAgICAgICBjb250ZW50U3RhY2sucHVzaChjb250ZW50SW5EYik7XG4gICAgICAgIGxldCBub2RlOiBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICB3aGlsZSAoIWNvbnRlbnRTdGFjay5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIG5vZGUgPSBjb250ZW50U3RhY2sucG9wKCk7XG4gICAgICAgICAgICBpZiAoQ29udGVudFV0aWwuaGFzQ2hpbGRyZW4obm9kZVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZ2V0U29ydGVkQ2hpbGRyZW5MaXN0T2xkKFxuICAgICAgICAgICAgICAgICAgICBub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSxcbiAgICAgICAgICAgICAgICAgICAgQ2hpbGRDb250ZW50cy5BTEwpO1xuICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHNJbkRiLmZvckVhY2goKGNoaWxkQ29udGVudEluRGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFN0YWNrLnB1c2goY2hpbGRDb250ZW50SW5EYik7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENoaWxkUmVsYXRpb24ucHVzaChub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXS5jb25jYXQoJy8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl0pKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgIGtleSA9IG5vZGVbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEtleTogc3RyaW5nO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGtleS5zcGxpdCgnLycpLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVBhcmVudDogc3RyaW5nID0ga2V5LnNwbGl0KCcvJylbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheVV0aWwuY29udGFpbnMocGFyZW50Q2hpbGRSZWxhdGlvbiwgaW1tZWRpYXRlUGFyZW50LmNvbmNhdCgnLycsIG5vZGVbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5LnN1YnN0cmluZygwLCBrZXkubGFzdEluZGV4T2YoJy8nKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKE1pbWVUeXBlLkNPTExFQ1RJT04udmFsdWVPZigpID09PSBub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9NSU1FX1RZUEVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleSArICcvJyArIG5vZGVbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBLZXkgPSBrZXkgKyAnLycgKyBub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEtleUxpc3QucHVzaCh0ZW1wS2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZW50S2V5TGlzdDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDb250ZW50RnJvbURCKGhpZXJhcmNoeUluZm9MaXN0OiBIaWVyYXJjaHlJbmZvW10sIGlkZW50aWZpZXI6IHN0cmluZywgIHNob3VsZENvbnZlcnRCYXNlUGF0aD86IGJvb2xlYW4pOiBQcm9taXNlPENvbnRlbnQ+IHtcbiAgICAgICAgY29uc3QgbmV4dENvbnRlbnRIaWVyYXJjaHlMaXN0OiBIaWVyYXJjaHlJbmZvW10gPSBbXTtcbiAgICAgICAgbGV0IG5leHRDb250ZW50O1xuICAgICAgICAvLyBjb25zdCBuZXh0Q29udGVudElkZW50aWZpZXIgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudElkZW50aWZpZXIoaGllcmFyY2h5SW5mb0xpc3QsIGN1cnJlbnRJZGVudGlmaWVyLCBjb250ZW50S2V5TGlzdCk7XG4gICAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0Q29udGVudElkZW50aWZpZXJMaXN0OiBzdHJpbmdbXSA9IGlkZW50aWZpZXIuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIGNvbnN0IGlkQ291bnQ6IG51bWJlciA9IG5leHRDb250ZW50SWRlbnRpZmllckxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGlzQWxsSGllcmFyY2h5Q29udGVudEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGlkQ291bnQgLSAxKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudEluRGIgPSBhd2FpdCB0aGlzLmdldENvbnRlbnREZXRhaWxzSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2hGcm9tREIobmV4dENvbnRlbnRJZGVudGlmaWVyTGlzdFtpXSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRJbkRiKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDb250ZW50SGllcmFyY2h5TGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9UWVBFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDYXRlZ29yeTogY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BSSU1BUllfQ0FURUdPUlldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQWxsSGllcmFyY2h5Q29udGVudEZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0FsbEhpZXJhcmNoeUNvbnRlbnRGb3VuZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb250ZW50SW5EYiA9IGF3YWl0IHRoaXMuZ2V0Q29udGVudERldGFpbHNIYW5kbGVyLmZldGNoRnJvbURCKFxuICAgICAgICAgICAgICAgICAgICBuZXh0Q29udGVudElkZW50aWZpZXJMaXN0W2lkQ291bnQgLSAxXSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDb250ZW50SW5EYikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q29udGVudCA9IENvbnRlbnRNYXBwZXIubWFwQ29udGVudERCRW50cnlUb0NvbnRlbnQobmV4dENvbnRlbnRJbkRiLCBzaG91bGRDb252ZXJ0QmFzZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q29udGVudC5oaWVyYXJjaHlJbmZvID0gbmV4dENvbnRlbnRIaWVyYXJjaHlMaXN0O1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q29udGVudC5yb2xsdXAgPSBDb250ZW50VXRpbC5nZXRDb250ZW50Um9sbHVwKG5leHRDb250ZW50LmlkZW50aWZpZXIsIG5leHRDb250ZW50LmhpZXJhcmNoeUluZm8pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wYXRpYmlsaXR5TGV2ZWwgPSBDb250ZW50VXRpbC5yZWFkQ29tcGF0aWJpbGl0eUxldmVsKG5leHRDb250ZW50LmNvbnRlbnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNDb21wYXRpYmxlID0gQ29udGVudFV0aWwuaXNDb21wYXRpYmxlKHRoaXMuYXBwQ29uZmlnLCBjb21wYXRpYmlsaXR5TGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q29udGVudC5pc0NvbXBhdGlibGUgPSBpc0NvbXBhdGlibGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpZXJhcmNoeUlkZW50aWZpZXJzOiBzdHJpbmdbXSA9IG5leHRDb250ZW50SGllcmFyY2h5TGlzdC5tYXAodCA9PiB0WydpZGVudGlmaWVyJ10pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IEFycmF5VXRpbC5qb2luUHJlc2VydmluZ1F1b3RlcyhoaWVyYXJjaHlJZGVudGlmaWVycyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50TW9kZWxzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPVxuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0Q29udGVudERldGFpbHNIYW5kbGVyLmZldGNoRnJvbURCRm9yQWxsKHF1ZXJ5KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudE1vZGVscyA9IGNvbnRlbnRNb2RlbHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhpZXJhcmNoeUlkZW50aWZpZXJzLmluZGV4T2YoYVsnaWRlbnRpZmllciddKSAtIGhpZXJhcmNoeUlkZW50aWZpZXJzLmluZGV4T2YoYlsnaWRlbnRpZmllciddKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudE1vZGVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudE1vZGVsID0gY29udGVudE1vZGVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UoY29udGVudE1vZGVsW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1RyYWNrYWJsZSA9IENvbnRlbnRVdGlsLmlzVHJhY2thYmxlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGkgPT09IDAgJiYgaXNUcmFja2FibGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNUcmFja2FibGUgPT09IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SWRlbnRpZmllciA9IGNvbnRlbnRNb2RlbFsnaWRlbnRpZmllciddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaWVyYXJjaHlMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShuZXh0Q29udGVudEhpZXJhcmNoeUxpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGllcmFyY2h5TGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWVyYXJjaHlMaXN0ID0gaGllcmFyY2h5TGlzdC5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENvbnRlbnRbJ3RyYWNrYWJsZVBhcmVudEluZm8nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbnRlbnRNb2RlbFsnaWRlbnRpZmllciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5SW5mbzogaGllcmFyY2h5TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dENvbnRlbnQ7XG4gICAgfVxuICAgIGdldE5leHRDb250ZW50SWRlbnRpZmllcihoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWRlbnRpZmllcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50S2V5TGlzdDogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgY3VycmVudElkZW50aWZpZXJzID0gJyc7XG4gICAgICAgIGxldCBuZXh0Q29udGVudElkZW50aWZpZXI7XG4gICAgICAgIGhpZXJhcmNoeUluZm9MaXN0LmZvckVhY2goKGhpZXJhcmNoeUl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmICghY3VycmVudElkZW50aWZpZXJzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudElkZW50aWZpZXJzID0gaGllcmFyY2h5SXRlbS5pZGVudGlmaWVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50SWRlbnRpZmllcnMgPSBjdXJyZW50SWRlbnRpZmllcnMuY29uY2F0KCcvJywgaGllcmFyY2h5SXRlbS5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRJZGVudGlmaWVycyA9IGN1cnJlbnRJZGVudGlmaWVycy5jb25jYXQoJy8nLCBjdXJyZW50SWRlbnRpZmllcik7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZDdXJyZW50Q29udGVudElkZW50aWZpZXI6IG51bWJlciA9IGNvbnRlbnRLZXlMaXN0LmluZGV4T2YoY3VycmVudElkZW50aWZpZXJzKTtcbiAgICAgICAgaWYgKGluZGV4T2ZDdXJyZW50Q29udGVudElkZW50aWZpZXIgPiAwKSB7XG4gICAgICAgICAgICBuZXh0Q29udGVudElkZW50aWZpZXIgPSBjb250ZW50S2V5TGlzdFtpbmRleE9mQ3VycmVudENvbnRlbnRJZGVudGlmaWVyIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRDb250ZW50SWRlbnRpZmllcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJldmlvdXNDb250ZW50SWRlbnRpZmllcihoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJZGVudGlmaWVyOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEtleUxpc3Q6IHN0cmluZ1tdKTogc3RyaW5nIHtcblxuICAgICAgICBsZXQgY3VycmVudElkZW50aWZpZXJzID0gJyc7XG4gICAgICAgIGxldCBwcmV2aW91c0NvbnRlbnRJZGVudGlmaWVyO1xuICAgICAgICBoaWVyYXJjaHlJbmZvTGlzdC5mb3JFYWNoKChoaWVyYXJjaHlJdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRJZGVudGlmaWVycykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJZGVudGlmaWVycyA9IGhpZXJhcmNoeUl0ZW0uaWRlbnRpZmllcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudElkZW50aWZpZXJzID0gY3VycmVudElkZW50aWZpZXJzLmNvbmNhdCgnLycsIGhpZXJhcmNoeUl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjdXJyZW50SWRlbnRpZmllcnMgPSBjdXJyZW50SWRlbnRpZmllcnMuY29uY2F0KCcvJywgY3VycmVudElkZW50aWZpZXIpO1xuICAgICAgICBjb25zdCBpbmRleE9mQ3VycmVudENvbnRlbnRJZGVudGlmaWVyID0gY29udGVudEtleUxpc3QuaW5kZXhPZihjdXJyZW50SWRlbnRpZmllcnMpO1xuICAgICAgICBpZiAoaW5kZXhPZkN1cnJlbnRDb250ZW50SWRlbnRpZmllciAhPT0gLTEgJiYgaW5kZXhPZkN1cnJlbnRDb250ZW50SWRlbnRpZmllciA8IChjb250ZW50S2V5TGlzdC5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgcHJldmlvdXNDb250ZW50SWRlbnRpZmllciA9IGNvbnRlbnRLZXlMaXN0W2luZGV4T2ZDdXJyZW50Q29udGVudElkZW50aWZpZXIgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXNDb250ZW50SWRlbnRpZmllcjtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgdGhpcyBsYXRlciBhbmQgdXNlICdnZXRTb3J0ZWRDaGlsZHJlbkxpc3QnIGJ5IHBhc3NpbmcgY2hpbGRyZW5jb250ZW50bWFwXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRTb3J0ZWRDaGlsZHJlbkxpc3RPbGQobG9jYWxEYXRhOiBzdHJpbmcsIGxldmVsOiBudW1iZXIpOiBQcm9taXNlPENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbERhdGEpO1xuICAgICAgICBsZXQgY2hpbGRDb250ZW50czogQ2hpbGRDb250ZW50W10gPSBkYXRhLmNoaWxkcmVuO1xuICAgICAgICBpZiAoIWNoaWxkQ29udGVudHMgfHwgIWNoaWxkQ29udGVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZENvbnRlbnRzID0gY2hpbGRDb250ZW50cy5zb3J0KChjaGlsZENvbnRlbnQxLCBjaGlsZENvbnRlbnQyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGNoaWxkQ29udGVudDEuaW5kZXggLSBjaGlsZENvbnRlbnQyLmluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2hpbGRJZGVudGlmaWVyczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IHdoZW5BbmRUaGVuID0gJyc7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgY2hpbGRDb250ZW50cy5mb3JFYWNoKGNoaWxkQ29udGVudCA9PiB7XG4gICAgICAgICAgICBjaGlsZElkZW50aWZpZXJzLnB1c2goY2hpbGRDb250ZW50LmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgd2hlbkFuZFRoZW4gPSB3aGVuQW5kVGhlbi5jb25jYXQoYCBXSEVOICcke2NoaWxkQ29udGVudC5pZGVudGlmaWVyfScgVEhFTiAke2l9YCk7XG4gICAgICAgICAgICBpID0gaSArIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcmRlckJ5ID0gJyc7XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgb3JkZXJCeSA9IG9yZGVyQnkuY29uY2F0KGAgT1JERVIgQlkgQ0FTRSAgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gICR7d2hlbkFuZFRoZW59ICBFTkRgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmaWx0ZXIgPSAnJztcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSBDaGlsZENvbnRlbnRzLkRPV05MT0FERUQudmFsdWVPZigpOlxuICAgICAgICAgICAgICAgIGZpbHRlciA9ICcgQU5EICcgKyBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURSArICc9XFwnJyArIFN0YXRlLkFSVElGQUNUX0FWQUlMQUJMRSArICdcXCcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDaGlsZENvbnRlbnRzLlNQSU5FLnZhbHVlT2YoKTpcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSAnIEFORCAnICsgQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEUgKyAnPVxcJycgKyBTdGF0ZS5PTkxZX1NQSU5FICsgJ1xcJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENoaWxkQ29udGVudHMuQUxMLnZhbHVlT2YoKTpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmlsdGVyID0gJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgKiBGUk9NICR7Q29udGVudEVudHJ5LlRBQkxFX05BTUV9XG4gICAgICAgICAgICAgICAgICAgICAgICBXSEVSRSAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfVxuICAgICAgICAgICAgICAgICAgICAgICAgSU4gKCR7QXJyYXlVdGlsLmpvaW5QcmVzZXJ2aW5nUXVvdGVzKGNoaWxkSWRlbnRpZmllcnMpfSkgJHtmaWx0ZXJ9ICR7b3JkZXJCeX1gO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGFzeW5jIGdldFNvcnRlZENoaWxkcmVuTGlzdChsb2NhbERhdGE6IHN0cmluZywgbGV2ZWw6IG51bWJlciwgY2hpbGRDb250ZW50c01hcCk6IFByb21pc2U8Q29udGVudEVudHJ5LlNjaGVtYU1hcFtdPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgIGxldCBjaGlsZENvbnRlbnRzOiBDaGlsZENvbnRlbnRbXSA9IGRhdGEuY2hpbGRyZW47XG4gICAgICAgIGlmICghY2hpbGRDb250ZW50cyB8fCAhY2hpbGRDb250ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkQ29udGVudHMgPSBjaGlsZENvbnRlbnRzLnNvcnQoKGNoaWxkQ29udGVudDEsIGNoaWxkQ29udGVudDIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoY2hpbGRDb250ZW50MS5pbmRleCAtIGNoaWxkQ29udGVudDIuaW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY2hpbGRDb250ZW50c0Zyb21EQjogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGRDb250ZW50IG9mIGNoaWxkQ29udGVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRDb250ZW50c01hcC5nZXQoY2hpbGRDb250ZW50LmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRDb250ZW50c0Zyb21EQi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUICogRlJPTSAke0NvbnRlbnRFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgICAgICBXSEVSRSAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSA9ICcke2NoaWxkQ29udGVudC5pZGVudGlmaWVyfSdgO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRnJvbURiID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkRnJvbURiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzRnJvbURCLnB1c2goY2hpbGRGcm9tRGJbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAobGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgQ2hpbGRDb250ZW50cy5ET1dOTE9BREVELnZhbHVlT2YoKTpcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgPSAnIEFORCAnICsgQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEUgKyAnPVxcJycgKyBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEUgKyAnXFwnJztcbiAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzRnJvbURCID0gY2hpbGRDb250ZW50c0Zyb21EQlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGMpID0+IGNbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEVdID0gU3RhdGUuQVJUSUZBQ1RfQVZBSUxBQkxFKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2hpbGRDb250ZW50cy5TUElORS52YWx1ZU9mKCk6XG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyID0gJyBBTkQgJyArIENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFICsgJz1cXCcnICsgU3RhdGUuT05MWV9TUElORSArICdcXCcnO1xuICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHNGcm9tREIgPSBjaGlsZENvbnRlbnRzRnJvbURCLmZpbHRlcigoYykgPT4gY1tDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURV0gPSBTdGF0ZS5PTkxZX1NQSU5FKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2hpbGRDb250ZW50cy5BTEwudmFsdWVPZigpOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGlsZENvbnRlbnRzRnJvbURCO1xuXG4gICAgfVxuXG4gICAgLy8gbmVlZCB0byBwYXNzIGZpbGVzZXJ2aWNlIGluIGNvbnN0cnVjdG9yIHRvIHVzZSB0aGlzIG1ldGhvZFxuICAgIHB1YmxpYyBhc3luYyBnZXRDaGlsZElkZW50aWZpZXJzRnJvbU1hbmlmZXN0IChwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbWFuaWZlc3RQYXRoID0gJ2ZpbGU6Ly8vJyArIHBhdGg7XG4gICAgICAgIGNvbnN0IGNoaWxkSWRlbnRpZmllcnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UhLnJlYWRBc1RleHQobWFuaWZlc3RQYXRoLCBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKCkpXG4gICAgICAgIC50aGVuKGFzeW5jIChmaWxlQ29udGVudHMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWxlQ29udGVudHMnLCBKU09OLnBhcnNlKGZpbGVDb250ZW50cykpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50cyA9IEpTT04ucGFyc2UoZmlsZUNvbnRlbnRzKS5hcmNoaXZlLml0ZW1zO1xuICAgICAgICAgICAgY2hpbGRDb250ZW50cy5zaGlmdCgpO1xuICAgICAgICAgICAgY2hpbGRDb250ZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNoaWxkSWRlbnRpZmllcnMucHVzaChlbGVtZW50LmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGRJZGVudGlmaWVycztcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldENoaWxkSWRlbnRpZmllcnNGcm9tTWFuaWZlc3QgZXJyJywgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaGlsZElkZW50aWZpZXJzO1xuICAgIH1cblxuXG59XG4iXX0=