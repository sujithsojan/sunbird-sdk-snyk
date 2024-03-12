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
import { ContentErrorCode } from '../..';
import { ContentEntry } from '../../db/schema';
import { ContentUtil } from '../../util/content-util';
import { Response } from '../../../api';
var CopyAsset = /** @class */ (function () {
    function CopyAsset() {
    }
    CopyAsset.prototype.execute = function (exportContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, i, subContentsInDb, contentModelsToExport, _i, contentModelsToExport_1, element, contentInDb, contentData, appIcon, setPreviewUrl, _a, _b, item, e_1, contentDisposition, contentEncoding, artifactUrl, e_2, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = new Response();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 15, , 16]);
                        i = 0;
                        subContentsInDb = [];
                        if (exportContentContext.subContentIds != null && exportContentContext.subContentIds.length > 0) {
                            subContentsInDb = this.excludeContentForSubModule(exportContentContext.contentModelsToExport, exportContentContext.subContentIds);
                        }
                        contentModelsToExport = exportContentContext.contentModelsToExport;
                        if (subContentsInDb && subContentsInDb.length > 0) {
                            contentModelsToExport = subContentsInDb;
                        }
                        _i = 0, contentModelsToExport_1 = contentModelsToExport;
                        _c.label = 2;
                    case 2:
                        if (!(_i < contentModelsToExport_1.length)) return [3 /*break*/, 14];
                        element = contentModelsToExport_1[_i];
                        contentInDb = element;
                        contentData = exportContentContext.items[i];
                        appIcon = contentData['appIcon'];
                        setPreviewUrl = contentData['itemSetPreviewUrl'];
                        _a = 0, _b = [appIcon, setPreviewUrl];
                        _c.label = 3;
                    case 3:
                        if (!(_a < _b.length)) return [3 /*break*/, 8];
                        item = _b[_a];
                        if (!(item && !item.startsWith('https:'))) return [3 /*break*/, 7];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.copyFile(contentInDb[ContentEntry.COLUMN_NAME_PATH], exportContentContext.tmpLocationPath, item)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [3 /*break*/, 7];
                    case 7:
                        _a++;
                        return [3 /*break*/, 3];
                    case 8:
                        contentDisposition = contentData['contentDisposition'];
                        contentEncoding = contentData['contentEncoding'];
                        if (!ContentUtil.isInlineIdentity(contentDisposition, contentEncoding)) return [3 /*break*/, 12];
                        artifactUrl = contentData['artifactUrl'];
                        if (!artifactUrl) return [3 /*break*/, 12];
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.copyFile(contentInDb[ContentEntry.COLUMN_NAME_PATH], exportContentContext.tmpLocationPath, artifactUrl)];
                    case 10:
                        _c.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _c.sent();
                        console.error(e_2);
                        return [3 /*break*/, 12];
                    case 12:
                        i++;
                        _c.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 2];
                    case 14:
                        response.body = exportContentContext;
                        return [2 /*return*/, response];
                    case 15:
                        e_3 = _c.sent();
                        response.errorMesg = ContentErrorCode.EXPORT_FAILED_COPY_ASSET;
                        throw response;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    CopyAsset.prototype.excludeContentForSubModule = function (contentsInDb, subCollectionIds) {
        var subCollectionContents = [];
        contentsInDb.forEach(function (contentInDb) {
            var identifier = contentInDb['identifier'];
            if (subCollectionIds && subCollectionIds.indexOf(identifier) > -1) {
                subCollectionContents.push(contentInDb);
            }
        });
        return subCollectionContents;
    };
    CopyAsset.prototype.copyFile = function (sourcePath, destinationPath, fileName) {
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
    return CopyAsset;
}());
export { CopyAsset };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1hc3NldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2V4cG9ydC9jb3B5LWFzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBdUIsTUFBTSxPQUFPLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDO0lBRUk7SUFDQSxDQUFDO0lBRVksMkJBQU8sR0FBcEIsVUFBcUIsb0JBQTBDOzs7Ozs7d0JBQ3JELFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDOzs7O3dCQUVsQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLGVBQWUsR0FBNkIsRUFBRSxDQUFDO3dCQUNuRCxJQUFJLG9CQUFvQixDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQzdGLGVBQWUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLEVBQ3hGLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUMzQzt3QkFFRyxxQkFBcUIsR0FBNkIsb0JBQW9CLENBQUMscUJBQXFCLENBQUM7d0JBQ2pHLElBQUksZUFBZSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUMvQyxxQkFBcUIsR0FBRyxlQUFlLENBQUM7eUJBQzNDOzhCQUUwQyxFQUFyQiwrQ0FBcUI7Ozs2QkFBckIsQ0FBQSxtQ0FBcUIsQ0FBQTt3QkFBaEMsT0FBTzt3QkFDUixXQUFXLEdBQUcsT0FBaUMsQ0FBQzt3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ZW50RXJyb3JDb2RlLCBFeHBvcnRDb250ZW50Q29udGV4dH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi8uLi91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuXG5leHBvcnQgY2xhc3MgQ29weUFzc2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKGV4cG9ydENvbnRlbnRDb250ZXh0OiBFeHBvcnRDb250ZW50Q29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBsZXQgc3ViQ29udGVudHNJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICAgICAgICAgIGlmIChleHBvcnRDb250ZW50Q29udGV4dC5zdWJDb250ZW50SWRzICE9IG51bGwgJiYgZXhwb3J0Q29udGVudENvbnRleHQuc3ViQ29udGVudElkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc3ViQ29udGVudHNJbkRiID0gdGhpcy5leGNsdWRlQ29udGVudEZvclN1Yk1vZHVsZShleHBvcnRDb250ZW50Q29udGV4dC5jb250ZW50TW9kZWxzVG9FeHBvcnQsXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydENvbnRlbnRDb250ZXh0LnN1YkNvbnRlbnRJZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY29udGVudE1vZGVsc1RvRXhwb3J0OiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBleHBvcnRDb250ZW50Q29udGV4dC5jb250ZW50TW9kZWxzVG9FeHBvcnQ7XG4gICAgICAgICAgICBpZiAoc3ViQ29udGVudHNJbkRiICYmIHN1YkNvbnRlbnRzSW5EYi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29udGVudE1vZGVsc1RvRXhwb3J0ID0gc3ViQ29udGVudHNJbkRiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29udGVudE1vZGVsc1RvRXhwb3J0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudEluRGIgPSBlbGVtZW50IGFzIENvbnRlbnRFbnRyeS5TY2hlbWFNYXA7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudERhdGEgPSBleHBvcnRDb250ZW50Q29udGV4dC5pdGVtcyFbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgYXBwSWNvbiA9IGNvbnRlbnREYXRhWydhcHBJY29uJ107XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0UHJldmlld1VybCA9IGNvbnRlbnREYXRhWydpdGVtU2V0UHJldmlld1VybCddO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIFthcHBJY29uLCBzZXRQcmV2aWV3VXJsXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiAhaXRlbS5zdGFydHNXaXRoKCdodHRwczonKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvcHlGaWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSF0hLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRDb250ZW50Q29udGV4dC50bXBMb2NhdGlvblBhdGghLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudERpc3Bvc2l0aW9uOiBzdHJpbmcgPSBjb250ZW50RGF0YVsnY29udGVudERpc3Bvc2l0aW9uJ107XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudEVuY29kaW5nOiBzdHJpbmcgPSBjb250ZW50RGF0YVsnY29udGVudEVuY29kaW5nJ107XG4gICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmlzSW5saW5lSWRlbnRpdHkoY29udGVudERpc3Bvc2l0aW9uLCBjb250ZW50RW5jb2RpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFydGlmYWN0VXJsOiBzdHJpbmcgPSBjb250ZW50RGF0YVsnYXJ0aWZhY3RVcmwnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFydGlmYWN0VXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29weUZpbGUoY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BBVEhdISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0Q29udGVudENvbnRleHQudG1wTG9jYXRpb25QYXRoISwgYXJ0aWZhY3RVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRlbnRDb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXNwb25zZS5lcnJvck1lc2cgPSBDb250ZW50RXJyb3JDb2RlLkVYUE9SVF9GQUlMRURfQ09QWV9BU1NFVDtcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGNsdWRlQ29udGVudEZvclN1Yk1vZHVsZShjb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSwgc3ViQ29sbGVjdGlvbklkcz86IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IHN1YkNvbGxlY3Rpb25Db250ZW50czogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gW107XG4gICAgICAgIGNvbnRlbnRzSW5EYi5mb3JFYWNoKGNvbnRlbnRJbkRiID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBjb250ZW50SW5EYlsnaWRlbnRpZmllciddO1xuICAgICAgICAgICAgaWYgKHN1YkNvbGxlY3Rpb25JZHMgJiYgc3ViQ29sbGVjdGlvbklkcy5pbmRleE9mKGlkZW50aWZpZXIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJDb2xsZWN0aW9uQ29udGVudHMucHVzaChjb250ZW50SW5EYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3ViQ29sbGVjdGlvbkNvbnRlbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY29weUZpbGUoc291cmNlUGF0aDogc3RyaW5nLCBkZXN0aW5hdGlvblBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LmNvcHlGaWxlKHNvdXJjZVBhdGgsIGRlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==