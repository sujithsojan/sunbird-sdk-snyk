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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { defer } from 'rxjs';
import { ContentMapper } from '../../../content/util/content-mapper';
var DialcodeRequestDelegate = /** @class */ (function () {
    function DialcodeRequestDelegate(defaultDelegate, dbService) {
        this.defaultDelegate = defaultDelegate;
        this.dbService = dbService;
    }
    DialcodeRequestDelegate.prototype.handle = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var pageAssemble, e_1, query, localContents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.defaultDelegate.handle(request).toPromise()];
                    case 1:
                        pageAssemble = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3:
                        if (!(request.filters && request.filters.dialcodes)) return [3 /*break*/, 8];
                        query = "SELECT c.* FROM content c WHERE ref_count > 0 AND dialcodes LIKE '%%~" + request.filters.dialcodes + "~%%'";
                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                    case 4:
                        localContents = (_a.sent())
                            .map(function (e) { return ContentMapper.mapContentDBEntryToContent(e).contentData; });
                        if (!(pageAssemble && pageAssemble.sections[0] && localContents.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.mergePageAssembleWithLocalContents(pageAssemble, localContents)];
                    case 5:
                        pageAssemble = _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(!pageAssemble && localContents.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.buildPageAssembleWithLocalContents(localContents)];
                    case 7:
                        pageAssemble = _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!pageAssemble) {
                            throw new Error('NO_DATA');
                        }
                        return [2 /*return*/, pageAssemble];
                }
            });
        }); });
    };
    DialcodeRequestDelegate.prototype.buildPageAssembleWithLocalContents = function (localContents) {
        return __awaiter(this, void 0, void 0, function () {
            var tempPageAssemble;
            return __generator(this, function (_a) {
                tempPageAssemble = {
                    name: '',
                    id: '',
                    sections: [
                        {
                            display: '',
                            count: 0,
                            index: 0,
                            sectionDataType: '',
                            resmsgId: '',
                            searchQuery: '',
                            name: '',
                            id: '',
                            apiId: '',
                            group: 0,
                            contents: localContents
                        }
                    ]
                };
                return [2 /*return*/, this.mergePageAssembleWithLocalCollections(tempPageAssemble, localContents)];
            });
        });
    };
    DialcodeRequestDelegate.prototype.mergePageAssembleWithLocalContents = function (pageAssemble, localContents) {
        return __awaiter(this, void 0, void 0, function () {
            var section, localContentsDiff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        section = pageAssemble.sections[0];
                        if (!(section.contents && section.contents.length)) return [3 /*break*/, 3];
                        localContentsDiff = localContents.filter(function (localContent) {
                            return !section.contents.find(function (responseContent) { return responseContent.identifier === localContent.identifier; });
                        });
                        if (!localContentsDiff.length) return [3 /*break*/, 2];
                        section.contents = __spreadArrays(localContentsDiff, section.contents);
                        return [4 /*yield*/, this.mergePageAssembleWithLocalCollections(pageAssemble, localContentsDiff)];
                    case 1:
                        pageAssemble = _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        section.contents = localContents;
                        return [4 /*yield*/, this.mergePageAssembleWithLocalCollections(pageAssemble, localContents)];
                    case 4:
                        pageAssemble = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, pageAssemble];
                }
            });
        });
    };
    DialcodeRequestDelegate.prototype.mergePageAssembleWithLocalCollections = function (pageAssemble, localContents) {
        return __awaiter(this, void 0, void 0, function () {
            var section, _i, localContents_1, content, query, localCollectionsContainingContent, _loop_1, _a, localCollectionsContainingContent_1, localCollection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        section = pageAssemble.sections[0];
                        if (!section.collections) {
                            section.collections = [];
                        }
                        _i = 0, localContents_1 = localContents;
                        _b.label = 1;
                    case 1:
                        if (!(_i < localContents_1.length)) return [3 /*break*/, 4];
                        content = localContents_1[_i];
                        query = "SELECT c.* FROM content c WHERE c.visibility = 'Default' AND ref_count > 0 AND child_nodes LIKE '%%~" + content.identifier + "~%%'";
                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                    case 2:
                        localCollectionsContainingContent = (_b.sent())
                            .map(function (e) { return ContentMapper.mapContentDBEntryToContent(e).contentData; });
                        if (localCollectionsContainingContent.length) {
                            _loop_1 = function (localCollection) {
                                var existingResponseCollection = section.collections.find(function (responseCollection) {
                                    return responseCollection.identifier === localCollection.identifier;
                                });
                                if (existingResponseCollection) {
                                    if (!(existingResponseCollection.childNodes.indexOf(content.identifier) >= 0)) {
                                        existingResponseCollection.childNodes.push(content.identifier);
                                    }
                                }
                                else {
                                    section.collections.push(__assign(__assign({}, localCollection), { childNodes: [content.identifier] }));
                                }
                            };
                            for (_a = 0, localCollectionsContainingContent_1 = localCollectionsContainingContent; _a < localCollectionsContainingContent_1.length; _a++) {
                                localCollection = localCollectionsContainingContent_1[_a];
                                _loop_1(localCollection);
                            }
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, pageAssemble];
                }
            });
        });
    };
    return DialcodeRequestDelegate;
}());
export { DialcodeRequestDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbGNvZGUtcmVxdWVzdC1kZWxlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdlL2hhbmRsZS9kZWxlZ2F0ZXMvZGlhbGNvZGUtcmVxdWVzdC1kZWxlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBS3ZDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVuRTtJQUNJLGlDQUNZLGVBQXVDLEVBQ3ZDLFNBQW9CO1FBRHBCLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRWhDLENBQUM7SUFFRCx3Q0FBTSxHQUFOLFVBQU8sT0FBNkI7UUFBcEMsaUJBaUNDO1FBaENHLE9BQU8sS0FBSyxDQUFDOzs7Ozs7d0JBSVUscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFyRSxZQUFZLEdBQUcsU0FBc0QsQ0FBQzs7Ozt3QkFFdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQzs7OzZCQUdqQixDQUFBLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUEsRUFBNUMsd0JBQTRDO3dCQUN0QyxLQUFLLEdBQUcsMEVBQXdFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxTQUFNLENBQUM7d0JBQzlGLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBakUsYUFBYSxHQUFJLENBQUMsU0FBK0MsQ0FBOEI7NkJBQ2hHLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFB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QUFqQyxJQUFpQztnQ0FBcEQsZUFBZTt3Q0FBZixlQUFlOzZCQWV6Qjt5QkFDSjs7O3dCQXRCaUIsSUFBYSxDQUFBOzs0QkF5Qm5DLHNCQUFPLFlBQVksRUFBQzs7OztLQUN2QjtJQUNMLDhCQUFDO0FBQUQsQ0FBQyxBQWxKRCxJQWtKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZUNyaXRlcmlhfSBmcm9tICcuLi8uLic7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZX0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RlZmF1bHRSZXF1ZXN0RGVsZWdhdGV9IGZyb20gJy4vZGVmYXVsdC1yZXF1ZXN0LWRlbGVnYXRlJztcbmltcG9ydCB7Q29udGVudERhdGF9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQnO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7Q29udGVudEVudHJ5fSBmcm9tICcuLi8uLi8uLi9jb250ZW50L2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvbnRlbnRNYXBwZXJ9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LW1hcHBlcic7XG5cbmV4cG9ydCBjbGFzcyBEaWFsY29kZVJlcXVlc3REZWxlZ2F0ZSBpbXBsZW1lbnRzIEFwaVJlcXVlc3RIYW5kbGVyPFBhZ2VBc3NlbWJsZUNyaXRlcmlhLCBQYWdlQXNzZW1ibGU+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkZWZhdWx0RGVsZWdhdGU6IERlZmF1bHRSZXF1ZXN0RGVsZWdhdGUsXG4gICAgICAgIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdDogUGFnZUFzc2VtYmxlQ3JpdGVyaWEpOiBPYnNlcnZhYmxlPFBhZ2VBc3NlbWJsZT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhZ2VBc3NlbWJsZTogUGFnZUFzc2VtYmxlIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhZ2VBc3NlbWJsZSA9IGF3YWl0IHRoaXMuZGVmYXVsdERlbGVnYXRlLmhhbmRsZShyZXF1ZXN0KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5maWx0ZXJzICYmIHJlcXVlc3QuZmlsdGVycy5kaWFsY29kZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgYy4qIEZST00gY29udGVudCBjIFdIRVJFIHJlZl9jb3VudCA+IDAgQU5EIGRpYWxjb2RlcyBMSUtFICclJX4ke3JlcXVlc3QuZmlsdGVycy5kaWFsY29kZXN9fiUlJ2A7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxDb250ZW50cyA9ICgoYXdhaXQgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCkpIGFzIENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoZSkgPT4gQ29udGVudE1hcHBlci5tYXBDb250ZW50REJFbnRyeVRvQ29udGVudChlKS5jb250ZW50RGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFnZUFzc2VtYmxlICYmIHBhZ2VBc3NlbWJsZS5zZWN0aW9uc1swXSAmJiBsb2NhbENvbnRlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlQXNzZW1ibGUgPSBhd2FpdCB0aGlzLm1lcmdlUGFnZUFzc2VtYmxlV2l0aExvY2FsQ29udGVudHMoXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlQXNzZW1ibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbENvbnRlbnRzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghcGFnZUFzc2VtYmxlICYmIGxvY2FsQ29udGVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VBc3NlbWJsZSA9IGF3YWl0IHRoaXMuYnVpbGRQYWdlQXNzZW1ibGVXaXRoTG9jYWxDb250ZW50cyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsQ29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcGFnZUFzc2VtYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT19EQVRBJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYWdlQXNzZW1ibGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgYnVpbGRQYWdlQXNzZW1ibGVXaXRoTG9jYWxDb250ZW50cyhcbiAgICAgICAgbG9jYWxDb250ZW50czogQ29udGVudERhdGFbXVxuICAgICk6IFByb21pc2U8UGFnZUFzc2VtYmxlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHRlbXBQYWdlQXNzZW1ibGUgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgIHNlY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uRGF0YVR5cGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICByZXNtc2dJZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFF1ZXJ5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgYXBpSWQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBncm91cDogMCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHM6IGxvY2FsQ29udGVudHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0gYXMgUGFydGlhbDxQYWdlQXNzZW1ibGU+O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lcmdlUGFnZUFzc2VtYmxlV2l0aExvY2FsQ29sbGVjdGlvbnMoXG4gICAgICAgICAgICB0ZW1wUGFnZUFzc2VtYmxlIGFzIFBhZ2VBc3NlbWJsZSxcbiAgICAgICAgICAgIGxvY2FsQ29udGVudHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIG1lcmdlUGFnZUFzc2VtYmxlV2l0aExvY2FsQ29udGVudHMoXG4gICAgICAgIHBhZ2VBc3NlbWJsZTogUGFnZUFzc2VtYmxlLFxuICAgICAgICBsb2NhbENvbnRlbnRzOiBDb250ZW50RGF0YVtdXG4gICAgKTogUHJvbWlzZTxQYWdlQXNzZW1ibGU+IHtcbiAgICAgICAgLy8gZGlhbGNvZGUgdG8gaGF2ZSB1dG1vc3Qgb25lIHNlY3Rpb25cbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHBhZ2VBc3NlbWJsZS5zZWN0aW9uc1swXTtcblxuICAgICAgICBpZiAoc2VjdGlvbi5jb250ZW50cyAmJiBzZWN0aW9uLmNvbnRlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxDb250ZW50c0RpZmYgPSBsb2NhbENvbnRlbnRzLmZpbHRlcigobG9jYWxDb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzZWN0aW9uLmNvbnRlbnRzIS5maW5kKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZUNvbnRlbnQgPT4gcmVzcG9uc2VDb250ZW50LmlkZW50aWZpZXIgPT09IGxvY2FsQ29udGVudC5pZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobG9jYWxDb250ZW50c0RpZmYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5jb250ZW50cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubG9jYWxDb250ZW50c0RpZmYsXG4gICAgICAgICAgICAgICAgICAgIC4uLnNlY3Rpb24uY29udGVudHNcbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgcGFnZUFzc2VtYmxlID0gYXdhaXQgdGhpcy5tZXJnZVBhZ2VBc3NlbWJsZVdpdGhMb2NhbENvbGxlY3Rpb25zKFxuICAgICAgICAgICAgICAgICAgICBwYWdlQXNzZW1ibGUsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsQ29udGVudHNEaWZmLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWN0aW9uLmNvbnRlbnRzID0gbG9jYWxDb250ZW50cztcblxuICAgICAgICAgICAgcGFnZUFzc2VtYmxlID0gYXdhaXQgdGhpcy5tZXJnZVBhZ2VBc3NlbWJsZVdpdGhMb2NhbENvbGxlY3Rpb25zKFxuICAgICAgICAgICAgICAgIHBhZ2VBc3NlbWJsZSxcbiAgICAgICAgICAgICAgICBsb2NhbENvbnRlbnRzLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlQXNzZW1ibGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBtZXJnZVBhZ2VBc3NlbWJsZVdpdGhMb2NhbENvbGxlY3Rpb25zKFxuICAgICAgICBwYWdlQXNzZW1ibGU6IFBhZ2VBc3NlbWJsZSxcbiAgICAgICAgbG9jYWxDb250ZW50czogQ29udGVudERhdGFbXSxcbiAgICApOiBQcm9taXNlPFBhZ2VBc3NlbWJsZT4ge1xuICAgICAgICAvLyBkaWFsY29kZSB0byBoYXZlIHV0bW9zdCBvbmUgc2VjdGlvblxuICAgICAgICBjb25zdCBzZWN0aW9uID0gcGFnZUFzc2VtYmxlLnNlY3Rpb25zWzBdO1xuXG4gICAgICAgIGlmICghc2VjdGlvbi5jb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgc2VjdGlvbi5jb2xsZWN0aW9ucyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBjb250ZW50IG9mIGxvY2FsQ29udGVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCBjLiogRlJPTSBjb250ZW50IGMgV0hFUkUgYy52aXNpYmlsaXR5ID0gJ0RlZmF1bHQnIEFORCByZWZfY291bnQgPiAwIEFORCBjaGlsZF9ub2RlcyBMSUtFICclJX4ke2NvbnRlbnQuaWRlbnRpZmllcn1+JSUnYDtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsQ29sbGVjdGlvbnNDb250YWluaW5nQ29udGVudCA9ICgoYXdhaXQgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCkpIGFzIENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSlcbiAgICAgICAgICAgICAgICAubWFwKChlKSA9PiBDb250ZW50TWFwcGVyLm1hcENvbnRlbnREQkVudHJ5VG9Db250ZW50KGUpLmNvbnRlbnREYXRhKTtcblxuICAgICAgICAgICAgaWYgKGxvY2FsQ29sbGVjdGlvbnNDb250YWluaW5nQ29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxvY2FsQ29sbGVjdGlvbiBvZiBsb2NhbENvbGxlY3Rpb25zQ29udGFpbmluZ0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdSZXNwb25zZUNvbGxlY3Rpb246IENvbnRlbnREYXRhIHwgdW5kZWZpbmVkID0gc2VjdGlvbi5jb2xsZWN0aW9ucyEuZmluZCgocmVzcG9uc2VDb2xsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VDb2xsZWN0aW9uLmlkZW50aWZpZXIgPT09IGxvY2FsQ29sbGVjdGlvbi5pZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdSZXNwb25zZUNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGV4aXN0aW5nUmVzcG9uc2VDb2xsZWN0aW9uLmNoaWxkTm9kZXMuaW5kZXhPZihjb250ZW50LmlkZW50aWZpZXIpID49IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdSZXNwb25zZUNvbGxlY3Rpb24uY2hpbGROb2Rlcy5wdXNoKGNvbnRlbnQuaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLmNvbGxlY3Rpb25zIS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5sb2NhbENvbGxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGROb2RlczogW2NvbnRlbnQuaWRlbnRpZmllcl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgQ29udGVudERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhZ2VBc3NlbWJsZTtcbiAgICB9XG59XG4iXX0=