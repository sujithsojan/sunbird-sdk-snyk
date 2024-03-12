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
import { FileUtil } from '../../../util/file/util/file-util';
var CopyToDestination = /** @class */ (function () {
    function CopyToDestination() {
    }
    CopyToDestination.prototype.execute = function (exportResponse, contentExportRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var destinationFolder;
                        if (contentExportRequest.saveLocally) {
                            destinationFolder = contentExportRequest.destinationFolder;
                        }
                        else {
                            destinationFolder = (window.device.platform.toLowerCase() === "ios") ? cordova.file.documentsDirectory : cordova.file.externalCacheDirectory;
                            ;
                        }
                        sbutility.copyFile(FileUtil.getDirecory(exportResponse.body.ecarFilePath), destinationFolder, FileUtil.getFileName(exportResponse.body.ecarFilePath), function () {
                            resolve(exportResponse);
                        }, function (err) {
                            console.error(err);
                            resolve(err);
                        });
                    })];
            });
        });
    };
    return CopyToDestination;
}());
export { CopyToDestination };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1kZXN0aW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2V4cG9ydC9jb3B5LXRvLWRlc3RpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUczRDtJQUVJO0lBQ0EsQ0FBQztJQUVZLG1DQUFPLEdBQXBCLFVBQXFCLGNBQXdCLEVBQUUsb0JBQTBDOzs7Z0JBQ3JGLHNCQUFPLElBQUksT0FBTyxDQUFXLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLElBQUksaUJBQWlCLENBQUM7d0JBQ3RCLElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFOzRCQUNsQyxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDOUQ7NkJBQU07NEJBQ0gsaUJBQWlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQzs0QkFBQSxDQUFDO3lCQUNqSjt3QkFDRCxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxpQkFBaUIsRUFDeEYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUN0RDs0QkFDSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzVCLENBQUMsRUFBRSxVQUFBLEdBQUc7NEJBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFDTCx3QkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0ZpbGVVdGlsfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvdXRpbC9maWxlLXV0aWwnO1xuaW1wb3J0IHsgQ29udGVudEV4cG9ydFJlcXVlc3QgfSBmcm9tICcuLi8uLic7XG5cbmV4cG9ydCBjbGFzcyBDb3B5VG9EZXN0aW5hdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlY3V0ZShleHBvcnRSZXNwb25zZTogUmVzcG9uc2UsIGNvbnRlbnRFeHBvcnRSZXF1ZXN0OiBDb250ZW50RXhwb3J0UmVxdWVzdCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVzdGluYXRpb25Gb2xkZXI7XG4gICAgICAgICAgICBpZiAoY29udGVudEV4cG9ydFJlcXVlc3Quc2F2ZUxvY2FsbHkpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkZvbGRlciA9IGNvbnRlbnRFeHBvcnRSZXF1ZXN0LmRlc3RpbmF0aW9uRm9sZGVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkZvbGRlciA9ICh3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9zXCIpID8gY29yZG92YS5maWxlLmRvY3VtZW50c0RpcmVjdG9yeSA6IGNvcmRvdmEuZmlsZS5leHRlcm5hbENhY2hlRGlyZWN0b3J5OztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNidXRpbGl0eS5jb3B5RmlsZShGaWxlVXRpbC5nZXREaXJlY29yeShleHBvcnRSZXNwb25zZS5ib2R5LmVjYXJGaWxlUGF0aCksIGRlc3RpbmF0aW9uRm9sZGVyLFxuICAgICAgICAgICAgICAgIEZpbGVVdGlsLmdldEZpbGVOYW1lKGV4cG9ydFJlc3BvbnNlLmJvZHkuZWNhckZpbGVQYXRoKSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXhwb3J0UmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=