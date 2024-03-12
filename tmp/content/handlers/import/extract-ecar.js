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
import { UniqueId } from '../../../db/util/unique-id';
var ExtractEcar = /** @class */ (function () {
    function ExtractEcar(fileService, zipService) {
        this.fileService = fileService;
        this.zipService = zipService;
        this.FILE_SIZE = 'FILE_SIZE';
    }
    ExtractEcar.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        var size;
        return this.fileService.getMetaData(importContext.ecarFilePath).then(function (metaData) {
            size = metaData.size;
            return _this.fileService.createDir(importContext.tmpLocation.concat(UniqueId.generateUniqueId()), true);
        }).then(function (directoryEntry) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        importContext.tmpLocation = directoryEntry.nativeURL;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.zipService.unzip(importContext.ecarFilePath, { target: directoryEntry.nativeURL }, function () {
                                    resolve();
                                }, function (e) {
                                    reject(e);
                                });
                            })];
                    case 1:
                        _a.sent();
                        importContext.metadata = {};
                        importContext.metadata.FILE_SIZE = size;
                        response.body = importContext;
                        return [2 /*return*/, Promise.resolve(response)];
                }
            });
        }); }).catch(function (error) {
            response.errorMesg = ContentErrorCode.IMPORT_FAILED_EXTRACT_ECAR.valueOf();
            return Promise.reject(response);
        });
    };
    return ExtractEcar;
}());
export { ExtractEcar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1lY2FyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvaW1wb3J0L2V4dHJhY3QtZWNhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRzlELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUVwRDtJQUdJLHFCQUFvQixXQUF3QixFQUN4QixVQUFzQjtRQUR0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSHpCLGNBQVMsR0FBRyxXQUFXLENBQUM7SUFJekMsQ0FBQztJQUVNLDZCQUFPLEdBQWQsVUFBZSxhQUFtQztRQUFsRCxpQkF1QkM7UUF0QkcsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQVksQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1lBQzFFLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFdBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBTyxjQUFjOzs7Ozt3QkFDekIsYUFBYSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO3dCQUNyRCxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUM5QixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxTQUFTLEVBQUMsRUFBRTtvQ0FDbEYsT0FBTyxFQUFFLENBQUM7Z0NBQ2QsQ0FBQyxFQUFFLFVBQUMsQ0FBQztvQ0FDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2QsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxDQUFDLEVBQUE7O3dCQU5GLFNBTUUsQ0FBQzt3QkFDSCxhQUFhLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzt3QkFDNUIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN4QyxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDOUIsc0JBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQzs7O2FBQ3BDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsUUFBUSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbXBvcnRDb250ZW50Q29udGV4dH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7Q29udGVudEVycm9yQ29kZX0gZnJvbSAnLi4vLi4vdXRpbC9jb250ZW50LWNvbnN0YW50cyc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1ppcFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvemlwL2RlZi96aXAtc2VydmljZSc7XG5pbXBvcnQge1VuaXF1ZUlkfSBmcm9tICcuLi8uLi8uLi9kYi91dGlsL3VuaXF1ZS1pZCc7XG5cbmV4cG9ydCBjbGFzcyBFeHRyYWN0RWNhciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBGSUxFX1NJWkUgPSAnRklMRV9TSVpFJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgemlwU2VydmljZTogWmlwU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKGltcG9ydENvbnRleHQ6IEltcG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgbGV0IHNpemU6IG51bWJlcjtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuZ2V0TWV0YURhdGEoaW1wb3J0Q29udGV4dC5lY2FyRmlsZVBhdGgpLnRoZW4oKG1ldGFEYXRhKSA9PiB7XG4gICAgICAgICAgICBzaXplID0gbWV0YURhdGEuc2l6ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZURpcihpbXBvcnRDb250ZXh0LnRtcExvY2F0aW9uIS5jb25jYXQoVW5pcXVlSWQuZ2VuZXJhdGVVbmlxdWVJZCgpKSwgdHJ1ZSk7XG4gICAgICAgIH0pLnRoZW4oYXN5bmMgKGRpcmVjdG9yeUVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpbXBvcnRDb250ZXh0LnRtcExvY2F0aW9uID0gZGlyZWN0b3J5RW50cnkubmF0aXZlVVJMO1xuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuemlwU2VydmljZS51bnppcChpbXBvcnRDb250ZXh0LmVjYXJGaWxlUGF0aCwge3RhcmdldDogZGlyZWN0b3J5RW50cnkubmF0aXZlVVJMfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbXBvcnRDb250ZXh0Lm1ldGFkYXRhID0ge307XG4gICAgICAgICAgICBpbXBvcnRDb250ZXh0Lm1ldGFkYXRhLkZJTEVfU0laRSA9IHNpemU7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gaW1wb3J0Q29udGV4dDtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5lcnJvck1lc2cgPSBDb250ZW50RXJyb3JDb2RlLklNUE9SVF9GQUlMRURfRVhUUkFDVF9FQ0FSLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==