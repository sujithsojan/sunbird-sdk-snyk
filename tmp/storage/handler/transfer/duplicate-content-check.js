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
import { ContentUtil } from '../../../content/util/content-util';
import { ContentEntry } from '../../../content/db/schema';
import { DuplicateContentError } from '../../errors/duplicate-content-error';
import { FileName } from '../../../content';
var COLUMN_NAME_IDENTIFIER = ContentEntry.COLUMN_NAME_IDENTIFIER;
var COLUMN_NAME_LOCAL_DATA = ContentEntry.COLUMN_NAME_LOCAL_DATA;
import { defer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
var DuplicateContentCheck = /** @class */ (function () {
    function DuplicateContentCheck(dbService, fileService) {
        this.dbService = dbService;
        this.fileService = fileService;
    }
    DuplicateContentCheck.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var contentEntries, duplicateContentsInDb, duplicateContents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContentsInDb(context.contentIds)];
                    case 1:
                        contentEntries = _a.sent();
                        duplicateContentsInDb = [];
                        if (!(context.validContentIdsInDestination && context.validContentIdsInDestination.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getContentsInDb(context.validContentIdsInDestination)];
                    case 2:
                        duplicateContentsInDb = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.generateMoveContentResponses(context, duplicateContentsInDb)];
                    case 4:
                        duplicateContents = (_a.sent()).moveContentDupContentList;
                        context.contentsInSource = contentEntries;
                        context.duplicateContents = duplicateContents;
                        if (context.duplicateContents.length && !context.shouldMergeInDestination) {
                            throw new DuplicateContentError('context.shouldMergeInDestination is false');
                        }
                        return [2 /*return*/];
                }
            });
        }); }).pipe(mapTo(context));
    };
    DuplicateContentCheck.prototype.getContentsInDb = function (contentIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (contentIds.length) {
                    return [2 /*return*/, this.dbService.execute(ContentUtil.getFindAllContentsWithIdentifierQuery(contentIds)).toPromise()];
                }
                return [2 /*return*/, this.dbService.execute(ContentUtil.getFindAllContentsQuery()).toPromise()];
            });
        });
    };
    DuplicateContentCheck.prototype.getPkgVersionFromFile = function (destinationContentRootDir, contentIdentifier) {
        return this.fileService.readAsText(destinationContentRootDir.concat(contentIdentifier), FileName.MANIFEST.valueOf()).then(function (manifestStringified) {
            var manifest = JSON.parse(manifestStringified);
            var items = manifest.archive.items;
            if (items) {
                var matchedItem = items.find(function (item) { return item['identifier'] === contentIdentifier; });
                return matchedItem['pkgVersion'];
            }
            else {
                return 0;
            }
        }).catch(function () {
            return -1;
        });
    };
    DuplicateContentCheck.prototype.generateMoveContentResponses = function (context, contents) {
        return __awaiter(this, void 0, void 0, function () {
            var moveContentDiffPkgList, moveContentDupContentList, _i, contents_1, content, destPkgVersion, srcPkgVersion, moveContentResponse, moveContentResponse, moveContentResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        moveContentDiffPkgList = [];
                        moveContentDupContentList = [];
                        _i = 0, contents_1 = contents;
                        _a.label = 1;
                    case 1:
                        if (!(_i < contents_1.length)) return [3 /*break*/, 4];
                        content = contents_1[_i];
                        return [4 /*yield*/, this.getPkgVersionFromFile(context.destinationFolder, content[COLUMN_NAME_IDENTIFIER])];
                    case 2:
                        destPkgVersion = _a.sent();
                        srcPkgVersion = ContentUtil.readPkgVersion(JSON.parse(content[COLUMN_NAME_LOCAL_DATA]));
                        if (destPkgVersion !== -1) {
                            if (destPkgVersion > srcPkgVersion) {
                                moveContentResponse = {
                                    identifier: content[COLUMN_NAME_IDENTIFIER],
                                    status: MoveContentStatus.HIGHER_VERSION_IN_DESTINATION
                                };
                                moveContentDiffPkgList.push(moveContentResponse);
                                moveContentDupContentList.push(moveContentResponse);
                            }
                            else if (destPkgVersion < srcPkgVersion) {
                                moveContentResponse = {
                                    identifier: content[COLUMN_NAME_IDENTIFIER],
                                    status: MoveContentStatus.LOWER_VERSION_IN_DESTINATION
                                };
                                moveContentDiffPkgList.push(moveContentResponse);
                                moveContentDupContentList.push(moveContentResponse);
                            }
                            else {
                                moveContentResponse = {
                                    identifier: content[COLUMN_NAME_IDENTIFIER],
                                    status: MoveContentStatus.SAME_VERSION_IN_BOTH
                                };
                                moveContentDupContentList.push(moveContentResponse);
                            }
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, {
                            moveContentDiffPkgList: moveContentDiffPkgList,
                            moveContentDupContentList: moveContentDupContentList
                        }];
                }
            });
        });
    };
    return DuplicateContentCheck;
}());
export { DuplicateContentCheck };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVwbGljYXRlLWNvbnRlbnQtY2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvcmFnZS9oYW5kbGVyL3RyYW5zZmVyL2R1cGxpY2F0ZS1jb250ZW50LWNoZWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBZ0MsaUJBQWlCLEVBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFDckgsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUV4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsSUFBTyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsc0JBQXNCLENBQUM7QUFDcEUsSUFBTyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFDLEtBQUssRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFPckM7SUFFSSwrQkFBb0IsU0FBb0IsRUFBVSxXQUF3QjtRQUF0RCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDMUUsQ0FBQztJQUVELHVDQUFPLEdBQVAsVUFBUSxPQUErQjtRQUF2QyxpQkFrQkM7UUFqQkcsT0FBTyxLQUFLLENBQUM7Ozs7NEJBQ2MscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVyxDQUFDLEVBQUE7O3dCQUFoRSxjQUFjLEdBQUcsU0FBK0M7d0JBQ2xFLHFCQUFxQixHQUE2QixFQUFFLENBQUM7NkJBQ3JELENBQUEsT0FBTyxDQUFDLDRCQUE0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QUksY0FBYyxHQUFHLGFBQWEsRUFBRTtnQ0FDMUIsbUJBQW1CLEdBQXdCO29DQUM3QyxVQUFVLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDO29DQUMzQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsNkJBQTZCO2lDQUMxRCxDQUFDO2dDQUVGLHNCQUFzQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dDQUNqRCx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs2QkFDdkQ7aUNBQU0sSUFBSSxjQUFjLEdBQUcsYUFBYSxFQUFFO2dDQUNqQyxtQkFBbUIsR0FBd0I7b0NBQzdDLFVBQVUsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUM7b0NBQzNDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyw0QkFBNEI7aUNBQ3pELENBQUM7Z0NBRUYsc0JBQXNCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0NBQ2pELHlCQUF5QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzZCQUN2RDtpQ0FBTTtnQ0FDRyxtQkFBbUIsR0FBd0I7b0NBQzdDLFVBQVUsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUM7b0NBQzNDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxvQkFBb0I7aUNBQ2pELENBQUM7Z0NBRUYseUJBQXlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7NkJBQ3ZEO3lCQUNKOzs7d0JBNUJpQixJQUFRLENBQUE7OzRCQStCOUIsc0JBQU87NEJBQ0gsc0JBQXNCLHdCQUFBOzRCQUN0Qix5QkFBeUIsMkJBQUE7eUJBQzVCLEVBQUM7Ozs7S0FDTDtJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQTdGRCxJQTZGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge01hbmlmZXN0LCBNb3ZlQ29udGVudFJlc3BvbnNlLCBNb3ZlQ29udGVudFN0YXR1cywgVHJhbnNmZXJDb250ZW50Q29udGV4dH0gZnJvbSAnLi4vdHJhbnNmZXItY29udGVudC1oYW5kbGVyJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7RHVwbGljYXRlQ29udGVudEVycm9yfSBmcm9tICcuLi8uLi9lcnJvcnMvZHVwbGljYXRlLWNvbnRlbnQtZXJyb3InO1xuaW1wb3J0IHtGaWxlTmFtZX0gZnJvbSAnLi4vLi4vLi4vY29udGVudCc7XG5pbXBvcnQgQ09MVU1OX05BTUVfSURFTlRJRklFUiA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSO1xuaW1wb3J0IENPTFVNTl9OQU1FX0xPQ0FMX0RBVEEgPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQTtcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXBUb30gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbnRlcmZhY2UgTW92ZUNvbnRlbnRSZXNwb25zZXMge1xuICAgIG1vdmVDb250ZW50RGlmZlBrZ0xpc3Q6IE1vdmVDb250ZW50UmVzcG9uc2VbXTtcbiAgICBtb3ZlQ29udGVudER1cENvbnRlbnRMaXN0OiBNb3ZlQ29udGVudFJlc3BvbnNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBEdXBsaWNhdGVDb250ZW50Q2hlY2sge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSwgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQpOiBPYnNlcnZhYmxlPFRyYW5zZmVyQ29udGVudENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRFbnRyaWVzID0gYXdhaXQgdGhpcy5nZXRDb250ZW50c0luRGIoY29udGV4dC5jb250ZW50SWRzISk7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29udGVudHNJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LnZhbGlkQ29udGVudElkc0luRGVzdGluYXRpb24gJiYgY29udGV4dC52YWxpZENvbnRlbnRJZHNJbkRlc3RpbmF0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbnRlbnRzSW5EYiA9IGF3YWl0IHRoaXMuZ2V0Q29udGVudHNJbkRiKGNvbnRleHQudmFsaWRDb250ZW50SWRzSW5EZXN0aW5hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkdXBsaWNhdGVDb250ZW50cyA9IChhd2FpdCB0aGlzLmdlbmVyYXRlTW92ZUNvbnRlbnRSZXNwb25zZXMoY29udGV4dCwgZHVwbGljYXRlQ29udGVudHNJbkRiKSkubW92ZUNvbnRlbnREdXBDb250ZW50TGlzdDtcblxuICAgICAgICAgICAgY29udGV4dC5jb250ZW50c0luU291cmNlID0gY29udGVudEVudHJpZXM7XG4gICAgICAgICAgICBjb250ZXh0LmR1cGxpY2F0ZUNvbnRlbnRzID0gZHVwbGljYXRlQ29udGVudHM7XG5cbiAgICAgICAgICAgIGlmIChjb250ZXh0LmR1cGxpY2F0ZUNvbnRlbnRzLmxlbmd0aCAmJiAhY29udGV4dC5zaG91bGRNZXJnZUluRGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRHVwbGljYXRlQ29udGVudEVycm9yKCdjb250ZXh0LnNob3VsZE1lcmdlSW5EZXN0aW5hdGlvbiBpcyBmYWxzZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwVG8oY29udGV4dClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldENvbnRlbnRzSW5EYihjb250ZW50SWRzOiBzdHJpbmdbXSk6IFByb21pc2U8Q29udGVudEVudHJ5LlNjaGVtYU1hcFtdPiB7XG4gICAgICAgIGlmIChjb250ZW50SWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoQ29udGVudFV0aWwuZ2V0RmluZEFsbENvbnRlbnRzV2l0aElkZW50aWZpZXJRdWVyeShjb250ZW50SWRzKSkudG9Qcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShDb250ZW50VXRpbC5nZXRGaW5kQWxsQ29udGVudHNRdWVyeSgpKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBrZ1ZlcnNpb25Gcm9tRmlsZShkZXN0aW5hdGlvbkNvbnRlbnRSb290RGlyOiBzdHJpbmcsIGNvbnRlbnRJZGVudGlmaWVyOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5yZWFkQXNUZXh0KFxuICAgICAgICAgICAgZGVzdGluYXRpb25Db250ZW50Um9vdERpci5jb25jYXQoY29udGVudElkZW50aWZpZXIpLFxuICAgICAgICAgICAgRmlsZU5hbWUuTUFOSUZFU1QudmFsdWVPZigpXG4gICAgICAgICkudGhlbigobWFuaWZlc3RTdHJpbmdpZmllZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFuaWZlc3Q6IE1hbmlmZXN0ID0gSlNPTi5wYXJzZShtYW5pZmVzdFN0cmluZ2lmaWVkKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zOiBhbnlbXSA9IG1hbmlmZXN0LmFyY2hpdmUuaXRlbXM7XG4gICAgICAgICAgICBpZiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkSXRlbSA9IGl0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW1bJ2lkZW50aWZpZXInXSA9PT0gY29udGVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVkSXRlbVsncGtnVmVyc2lvbiddO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZ2VuZXJhdGVNb3ZlQ29udGVudFJlc3BvbnNlcyhjb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50czogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdKTogUHJvbWlzZTxNb3ZlQ29udGVudFJlc3BvbnNlcz4ge1xuICAgICAgICBjb25zdCBtb3ZlQ29udGVudERpZmZQa2dMaXN0OiBNb3ZlQ29udGVudFJlc3BvbnNlW10gPSBbXTtcbiAgICAgICAgY29uc3QgbW92ZUNvbnRlbnREdXBDb250ZW50TGlzdDogTW92ZUNvbnRlbnRSZXNwb25zZVtdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjb250ZW50IG9mIGNvbnRlbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBkZXN0UGtnVmVyc2lvbiA9IGF3YWl0IHRoaXMuZ2V0UGtnVmVyc2lvbkZyb21GaWxlKGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLCBjb250ZW50W0NPTFVNTl9OQU1FX0lERU5USUZJRVJdKTtcbiAgICAgICAgICAgIGNvbnN0IHNyY1BrZ1ZlcnNpb24gPSBDb250ZW50VXRpbC5yZWFkUGtnVmVyc2lvbihKU09OLnBhcnNlKGNvbnRlbnRbQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pKTtcbiAgICAgICAgICAgIGlmIChkZXN0UGtnVmVyc2lvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVzdFBrZ1ZlcnNpb24gPiBzcmNQa2dWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVDb250ZW50UmVzcG9uc2U6IE1vdmVDb250ZW50UmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBjb250ZW50W0NPTFVNTl9OQU1FX0lERU5USUZJRVJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBNb3ZlQ29udGVudFN0YXR1cy5ISUdIRVJfVkVSU0lPTl9JTl9ERVNUSU5BVElPTlxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIG1vdmVDb250ZW50RGlmZlBrZ0xpc3QucHVzaChtb3ZlQ29udGVudFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZUNvbnRlbnREdXBDb250ZW50TGlzdC5wdXNoKG1vdmVDb250ZW50UmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFBrZ1ZlcnNpb24gPCBzcmNQa2dWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVDb250ZW50UmVzcG9uc2U6IE1vdmVDb250ZW50UmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBjb250ZW50W0NPTFVNTl9OQU1FX0lERU5USUZJRVJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBNb3ZlQ29udGVudFN0YXR1cy5MT1dFUl9WRVJTSU9OX0lOX0RFU1RJTkFUSU9OXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgbW92ZUNvbnRlbnREaWZmUGtnTGlzdC5wdXNoKG1vdmVDb250ZW50UmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlQ29udGVudER1cENvbnRlbnRMaXN0LnB1c2gobW92ZUNvbnRlbnRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW92ZUNvbnRlbnRSZXNwb25zZTogTW92ZUNvbnRlbnRSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbnRlbnRbQ09MVU1OX05BTUVfSURFTlRJRklFUl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IE1vdmVDb250ZW50U3RhdHVzLlNBTUVfVkVSU0lPTl9JTl9CT1RIXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgbW92ZUNvbnRlbnREdXBDb250ZW50TGlzdC5wdXNoKG1vdmVDb250ZW50UmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb3ZlQ29udGVudERpZmZQa2dMaXN0LFxuICAgICAgICAgICAgbW92ZUNvbnRlbnREdXBDb250ZW50TGlzdFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==