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
import { ContentErrorCode } from '../../util/content-constants';
var EcarBundle = /** @class */ (function () {
    function EcarBundle(fileService, zipService) {
        this.fileService = fileService;
        this.zipService = zipService;
    }
    EcarBundle.prototype.execute = function (exportContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, metaData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = new Response();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.zipService.zip(exportContentContext.tmpLocationPath, { target: exportContentContext.ecarFilePath }, [], [], function () {
                                    resolve();
                                }, function () {
                                    response.errorMesg = ContentErrorCode.EXPORT_FAILED_ECAR_BUNDLE;
                                    throw response;
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fileService.getMetaData(exportContentContext.ecarFilePath)];
                    case 2:
                        metaData = _a.sent();
                        exportContentContext.metadata[EcarBundle.FILE_SIZE] = metaData.size;
                        response.body = exportContentContext;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    EcarBundle.FILE_SIZE = 'FILE_SIZE';
    return EcarBundle;
}());
export { EcarBundle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNhci1idW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9leHBvcnQvZWNhci1idW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUc5RDtJQUdJLG9CQUFvQixXQUF3QixFQUN4QixVQUFzQjtRQUR0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzFDLENBQUM7SUFFWSw0QkFBTyxHQUFwQixVQUFxQixvQkFBMEM7Ozs7Ozs7d0JBQ3JELFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO3dCQUMxQyxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUM5QixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxlQUFnQixFQUNyRCxFQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxZQUFjLEVBQUMsRUFDN0MsRUFBRSxFQUNGLEVBQUUsRUFDRjtvQ0FDSSxPQUFPLEVBQUUsQ0FBQztnQ0FDZCxDQUFDLEVBQUU7b0NBQ0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQztvQ0FDaEUsTUFBTSxRQUFRLENBQUM7Z0NBQ25CLENBQUMsQ0FBQyxDQUFDOzRCQUNYLENBQUMsQ0FBQyxFQUFBOzt3QkFYRixTQVdFLENBQUM7d0JBQ3dCLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLFlBQWEsQ0FBQyxFQUFBOzt3QkFBM0YsUUFBUSxHQUFhLFNBQXNFO3dCQUNqRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ3BFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUM7d0JBQ3JDLHNCQUFPLFFBQVEsRUFBQzs7OztLQUNuQjtJQXhCdUIsb0JBQVMsR0FBRyxXQUFXLENBQUM7SUEwQnBELGlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0EzQlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7WmlwU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vdXRpbC96aXAvZGVmL3ppcC1zZXJ2aWNlJztcbmltcG9ydCB7RXhwb3J0Q29udGVudENvbnRleHR9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0NvbnRlbnRFcnJvckNvZGV9IGZyb20gJy4uLy4uL3V0aWwvY29udGVudC1jb25zdGFudHMnO1xuaW1wb3J0IHtNZXRhZGF0YX0gZnJvbSAnLi4vLi4vLi4vdXRpbC9maWxlJztcblxuZXhwb3J0IGNsYXNzIEVjYXJCdW5kbGUge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEZJTEVfU0laRSA9ICdGSUxFX1NJWkUnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6aXBTZXJ2aWNlOiBaaXBTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUoZXhwb3J0Q29udGVudENvbnRleHQ6IEV4cG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56aXBTZXJ2aWNlLnppcChleHBvcnRDb250ZW50Q29udGV4dC50bXBMb2NhdGlvblBhdGghLFxuICAgICAgICAgICAgICAgIHt0YXJnZXQ6IGV4cG9ydENvbnRlbnRDb250ZXh0LmVjYXJGaWxlUGF0aCEhfSxcbiAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yTWVzZyA9IENvbnRlbnRFcnJvckNvZGUuRVhQT1JUX0ZBSUxFRF9FQ0FSX0JVTkRMRTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtZXRhRGF0YTogTWV0YWRhdGEgPSBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLmdldE1ldGFEYXRhKGV4cG9ydENvbnRlbnRDb250ZXh0LmVjYXJGaWxlUGF0aCEpO1xuICAgICAgICBleHBvcnRDb250ZW50Q29udGV4dC5tZXRhZGF0YVtFY2FyQnVuZGxlLkZJTEVfU0laRV0gPSBtZXRhRGF0YS5zaXplO1xuICAgICAgICByZXNwb25zZS5ib2R5ID0gZXhwb3J0Q29udGVudENvbnRleHQ7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbn1cbiJdfQ==