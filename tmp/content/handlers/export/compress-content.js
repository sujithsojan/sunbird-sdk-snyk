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
import { FileName } from '../..';
import { Response } from '../../../api';
import { ContentEntry } from '../../db/schema';
import { ContentUtil } from '../../util/content-util';
var CompressContent = /** @class */ (function () {
    function CompressContent(zipService) {
        this.zipService = zipService;
    }
    CompressContent.prototype.execute = function (exportContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _loop_1, _i, _a, element;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response = new Response();
                        _loop_1 = function (element) {
                            var contentInDb, contentData, artifactUrl, payload_1, path_1, skipDirectoriesName_1, skipFilesName_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        contentInDb = element;
                                        contentData = JSON.parse(contentInDb[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                                        if (!ContentUtil.isAvailableLocally(contentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE])
                                            || ContentUtil.isOnlineContent(contentData)
                                            || ContentUtil.isInlineIdentity(contentData['contentDisposition'], contentData['contentEncoding'])) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        artifactUrl = contentData.artifactUrl;
                                        if (!artifactUrl) return [3 /*break*/, 2];
                                        payload_1 = exportContentContext.tmpLocationPath.concat(artifactUrl);
                                        path_1 = contentInDb[ContentEntry.COLUMN_NAME_PATH];
                                        skipDirectoriesName_1 = [];
                                        skipFilesName_1 = [];
                                        skipDirectoriesName_1.push(contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER]);
                                        skipFilesName_1.push(contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER].concat('/', FileName.MANIFEST.valueOf()));
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                _this.zipService.zip(path_1, { target: payload_1 }, skipDirectoriesName_1, skipFilesName_1, function () {
                                                    resolve();
                                                }, function () {
                                                    reject();
                                                });
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = exportContentContext.contentModelsToExport;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        return [5 /*yield**/, _loop_1(element)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        response.body = exportContentContext;
                        return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    return CompressContent;
}());
export { CompressContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHJlc3MtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2V4cG9ydC9jb21wcmVzcy1jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBdUIsUUFBUSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQ3JELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRDtJQUNJLHlCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzFDLENBQUM7SUFFWSxpQ0FBTyxHQUFwQixVQUFxQixvQkFBMEM7Ozs7Ozs7d0JBQ3JELFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDOzRDQUMvQixPQUFPOzs7Ozt3Q0FDUixXQUFXLEdBQUcsT0FBaUMsQ0FBQzt3Q0FDaEQsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7d0NBRWpGLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDOytDQUNsRixXQUFXLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQzsrQ0FDeEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUU7O3lDQUV2Rzt3Q0FFSyxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQzs2Q0FDeEMsV0FBVyxFQUFYLHdCQUFXO3dDQUNMLFlBQVUsb0JBQW9CLENBQUMsZUFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7d0NBQ3BFLFNBQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dDQUNsRCx3QkFBZ0MsRUFBRSxDQUFDO3dDQUNuQyxrQkFBMEIsRUFBRSxDQUFDO3dDQUNuQyxxQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7d0NBQzNFLGVBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0NBQzlHLHFCQUFNLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0RBQzlCLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxTQUFRLEVBQUMsRUFBRSxxQkFBbUIsRUFBRSxlQUFhLEVBQUU7b0RBQy9FLE9BQU8sRUFBRSxDQUFDO2dEQUNkLENBQUMsRUFBRTtvREFDQyxNQUFNLEVBQUUsQ0FBQztnREFDYixDQUFDLENBQUMsQ0FBQzs0Q0FDUCxDQUFDLENBQUMsRUFBQTs7d0NBTkYsU0FNRSxDQUFDOzs7Ozs7OEJBeEJxRCxFQUExQyxLQUFBLG9CQUFvQixDQUFDLHFCQUFxQjs7OzZCQUExQyxDQUFBLGNBQTBDLENBQUE7d0JBQXJELE9BQU87c0RBQVAsT0FBTzs7Ozs7d0JBQUksSUFBMEMsQ0FBQTs7O3dCQTRCaEUsUUFBUSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQzt3QkFDckMsc0JBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQzs7OztLQUNwQztJQUVMLHNCQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7WmlwU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vdXRpbC96aXAvZGVmL3ppcC1zZXJ2aWNlJztcbmltcG9ydCB7RXhwb3J0Q29udGVudENvbnRleHQsIEZpbGVOYW1lfSBmcm9tICcuLi8uLic7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi8uLi91dGlsL2NvbnRlbnQtdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDb21wcmVzc0NvbnRlbnQge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgemlwU2VydmljZTogWmlwU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKGV4cG9ydENvbnRlbnRDb250ZXh0OiBFeHBvcnRDb250ZW50Q29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBleHBvcnRDb250ZW50Q29udGV4dC5jb250ZW50TW9kZWxzVG9FeHBvcnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRJbkRiID0gZWxlbWVudCBhcyBDb250ZW50RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgY29uc3QgY29udGVudERhdGEgPSBKU09OLnBhcnNlKGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSk7XG5cbiAgICAgICAgICAgIGlmICghQ29udGVudFV0aWwuaXNBdmFpbGFibGVMb2NhbGx5KGNvbnRlbnRJbkRiW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFXSEpXG4gICAgICAgICAgICAgICAgfHwgQ29udGVudFV0aWwuaXNPbmxpbmVDb250ZW50KGNvbnRlbnREYXRhKVxuICAgICAgICAgICAgICAgIHx8IENvbnRlbnRVdGlsLmlzSW5saW5lSWRlbnRpdHkoY29udGVudERhdGFbJ2NvbnRlbnREaXNwb3NpdGlvbiddLCBjb250ZW50RGF0YVsnY29udGVudEVuY29kaW5nJ10pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFydGlmYWN0VXJsID0gY29udGVudERhdGEuYXJ0aWZhY3RVcmw7XG4gICAgICAgICAgICBpZiAoYXJ0aWZhY3RVcmwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gZXhwb3J0Q29udGVudENvbnRleHQudG1wTG9jYXRpb25QYXRoIS5jb25jYXQoYXJ0aWZhY3RVcmwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSF07XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpcERpcmVjdG9yaWVzTmFtZTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBza2lwRmlsZXNOYW1lOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIHNraXBEaXJlY3Rvcmllc05hbWUucHVzaChjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl0pO1xuICAgICAgICAgICAgICAgIHNraXBGaWxlc05hbWUucHVzaChjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl0uY29uY2F0KCcvJywgRmlsZU5hbWUuTUFOSUZFU1QudmFsdWVPZigpKSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnppcFNlcnZpY2UuemlwKHBhdGghLCB7dGFyZ2V0OiBwYXlsb2FkIX0sIHNraXBEaXJlY3Rvcmllc05hbWUsIHNraXBGaWxlc05hbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRlbnRDb250ZXh0O1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbn1cbiJdfQ==