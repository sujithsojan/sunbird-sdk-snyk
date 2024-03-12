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
import { Response } from '../../../api';
import { FileUtil } from '../../../util/file/util/file-util';
import { FileExtension } from '../../util/content-constants';
var CleanTempLoc = /** @class */ (function () {
    function CleanTempLoc(fileService) {
        this.fileService = fileService;
    }
    CleanTempLoc.prototype.execute = function (exportContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, yesterday, directoryList, _loop_1, this_1, _i, directoryList_1, directory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = new Response();
                        yesterday = Date.now() - (24 * 60 * 60 * 1000);
                        return [4 /*yield*/, this.fileService.listDir(exportContext.destinationFolder)];
                    case 1:
                        directoryList = _a.sent();
                        if (!(directoryList && directoryList.length > 0)) return [3 /*break*/, 5];
                        _loop_1 = function (directory) {
                            var metaData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(FileUtil.getFileExtension(directory.nativeURL) === FileExtension.CONTENT)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.fileService.getMetaData(directory.nativeURL)];
                                    case 1:
                                        metaData = _a.sent();
                                        if (!(new Date(metaData.modificationTime).getMilliseconds() <= yesterday)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, new Promise(function (resolve) {
                                                directory.remove(function () {
                                                    resolve();
                                                }, function () {
                                                    resolve();
                                                });
                                            })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, directoryList_1 = directoryList;
                        _a.label = 2;
                    case 2:
                        if (!(_i < directoryList_1.length)) return [3 /*break*/, 5];
                        directory = directoryList_1[_i];
                        return [5 /*yield**/, _loop_1(directory)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        response.body = exportContext;
                        return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    return CleanTempLoc;
}());
export { CleanTempLoc };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4tdGVtcC1sb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9leHBvcnQvY2xlYW4tdGVtcC1sb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBSTNEO0lBRUksc0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzVDLENBQUM7SUFFWSw4QkFBTyxHQUFwQixVQUFxQixhQUFtQzs7Ozs7O3dCQUM5QyxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQzt3QkFDcEMsU0FBUyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUM5QixxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBQTs7d0JBQXhGLGFBQWEsR0FBWSxTQUErRDs2QkFDMUYsQ0FBQSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsRUFBekMsd0JBQXlDOzRDQUM5QixTQUFTOzs7Ozs2Q0FDWixDQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssYUFBYSxDQUFDLE9BQU8sQ0FBQSxFQUF4RSx3QkFBd0U7d0NBQzdDLHFCQUFNLE9BQUssV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dDQUE1RSxRQUFRLEdBQWEsU0FBdUQ7NkNBQzlFLENBQUEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsZUFBZSxFQUFFLElBQUksU0FBUyxDQUFBLEVBQWxFLHdCQUFrRTt3Q0FDbEUscUJBQU0sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dEQUN0QixTQUFTLENBQUMsTUFBTSxDQUFDO29EQUNiLE9BQU8sRUFBRSxDQUFDO2dEQUNkLENBQUMsRUFBRTtvREFDQyxPQUFPLEVBQUUsQ0FBQztnREFDZCxDQUFDLENBQUMsQ0FBQzs0Q0FDUCxDQUFDLENBQUMsRUFBQTs7d0NBTkYsU0FNRSxDQUFDOzs7Ozs7OzhCQVZzQixFQUFiLCtCQUFhOzs7NkJBQWIsQ0FBQSwyQkFBYSxDQUFBO3dCQUExQixTQUFTO3NEQUFULFNBQVM7Ozs7O3dCQUFJLElBQWEsQ0FBQTs7O3dCQWV6QyxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDOUIsc0JBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQzs7OztLQUNwQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0ZpbGVVdGlsfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvdXRpbC9maWxlLXV0aWwnO1xuaW1wb3J0IHtGaWxlRXh0ZW5zaW9ufSBmcm9tICcuLi8uLi91dGlsL2NvbnRlbnQtY29uc3RhbnRzJztcbmltcG9ydCB7RW50cnksIE1ldGFkYXRhfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUnO1xuaW1wb3J0IHtFeHBvcnRDb250ZW50Q29udGV4dH0gZnJvbSAnLi4vLi4nO1xuXG5leHBvcnQgY2xhc3MgQ2xlYW5UZW1wTG9jIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUoZXhwb3J0Q29udGV4dDogRXhwb3J0Q29udGVudENvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICBjb25zdCB5ZXN0ZXJkYXk6IG51bWJlciA9IERhdGUubm93KCkgLSAoMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeUxpc3Q6IEVudHJ5W10gPSBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLmxpc3REaXIoZXhwb3J0Q29udGV4dC5kZXN0aW5hdGlvbkZvbGRlcik7XG4gICAgICAgIGlmIChkaXJlY3RvcnlMaXN0ICYmIGRpcmVjdG9yeUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaXJlY3Rvcnkgb2YgZGlyZWN0b3J5TGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChGaWxlVXRpbC5nZXRGaWxlRXh0ZW5zaW9uKGRpcmVjdG9yeS5uYXRpdmVVUkwpID09PSBGaWxlRXh0ZW5zaW9uLkNPTlRFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YURhdGE6IE1ldGFkYXRhID0gYXdhaXQgdGhpcy5maWxlU2VydmljZS5nZXRNZXRhRGF0YShkaXJlY3RvcnkubmF0aXZlVVJMKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKG1ldGFEYXRhLm1vZGlmaWNhdGlvblRpbWUpLmdldE1pbGxpc2Vjb25kcygpIDw9IHllc3RlcmRheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRleHQ7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbn1cbiJdfQ==