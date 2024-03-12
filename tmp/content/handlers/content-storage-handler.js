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
import { ContentEntry } from '../db/schema';
import { Visibility } from '..';
import { map } from 'rxjs/operators';
var ContentStorageHandler = /** @class */ (function () {
    function ContentStorageHandler(dbService) {
        this.dbService = dbService;
    }
    ContentStorageHandler.prototype.getUsgaeSpace = function (path) {
        var query = "SELECT SUM(" + ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE + ") as total_size\n                      FROM " + ContentEntry.TABLE_NAME + "\n                      WHERE " + ContentEntry.COLUMN_NAME_VISIBILITY + " = '" + Visibility.DEFAULT.valueOf() + "'\n                      AND  " + ContentEntry.COLUMN_NAME_PATH + " LIKE '" + path.replace('file://', '') + "%'";
        return this.dbService.execute(query).pipe(map(function (result) {
            return result[0]['total_size'] || 0;
        }));
    };
    ContentStorageHandler.prototype.getContentUsageSummary = function (paths) {
        return __awaiter(this, void 0, void 0, function () {
            var contentSpaceUsageSummaryList, _i, paths_1, path, size;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentSpaceUsageSummaryList = [];
                        _i = 0, paths_1 = paths;
                        _a.label = 1;
                    case 1:
                        if (!(_i < paths_1.length)) return [3 /*break*/, 4];
                        path = paths_1[_i];
                        return [4 /*yield*/, this.getUsgaeSpace(path).toPromise()];
                    case 2:
                        size = _a.sent();
                        contentSpaceUsageSummaryList.push({ path: path, sizeOnDevice: size });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, contentSpaceUsageSummaryList];
                }
            });
        });
    };
    return ContentStorageHandler;
}());
export { ContentStorageHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zdG9yYWdlLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9jb250ZW50LXN0b3JhZ2UtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBNkMsVUFBVSxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQztJQUNJLCtCQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQ3hDLENBQUM7SUFFTSw2Q0FBYSxHQUFwQixVQUFxQixJQUFZO1FBQzdCLElBQU0sS0FBSyxHQUFHLGdCQUFjLFlBQVksQ0FBQywwQkFBMEIsb0RBQzlDLFlBQVksQ0FBQyxVQUFVLHNDQUN0QixZQUFZLENBQUMsc0JBQXNCLFlBQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsc0NBQ3ZFLFlBQVksQ0FBQyxnQkFBZ0IsZUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsT0FBSSxDQUFDO1FBQzVGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsVUFBQyxNQUFNO1lBQ1AsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRVksc0RBQXNCLEdBQW5DLFVBQW9DLEtBQWU7Ozs7Ozt3QkFDekMsNEJBQTRCLEdBQXVDLEVBQUUsQ0FBQzs4QkFDcEQsRUFBTCxlQUFLOzs7NkJBQUwsQ0FBQSxtQkFBSyxDQUFBO3dCQUFiLElBQUk7d0JBQ0UscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWpELElBQUksR0FBRyxTQUEwQzt3QkFDdkQsNEJBQTRCLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7O3dCQUZyRCxJQUFLLENBQUE7OzRCQUl4QixzQkFBTyw0QkFBNEIsRUFBQzs7OztLQUN2QztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge0NvbnRlbnRFbnRyeX0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7Q29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5UmVzcG9uc2UsIE1pbWVUeXBlLCBWaXNpYmlsaXR5fSBmcm9tICcuLic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudFN0b3JhZ2VIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZ2FlU3BhY2UocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUIFNVTSgke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRX0pIGFzIHRvdGFsX3NpemVcbiAgICAgICAgICAgICAgICAgICAgICBGUk9NICR7Q29udGVudEVudHJ5LlRBQkxFX05BTUV9XG4gICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWX0gPSAnJHtWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpfSdcbiAgICAgICAgICAgICAgICAgICAgICBBTkQgICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BBVEh9IExJS0UgJyR7cGF0aC5yZXBsYWNlKCdmaWxlOi8vJywgJycpfSUnYDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRbMF1bJ3RvdGFsX3NpemUnXSB8fCAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q29udGVudFVzYWdlU3VtbWFyeShwYXRoczogc3RyaW5nW10pOiBQcm9taXNlPENvbnRlbnRTcGFjZVVzYWdlU3VtbWFyeVJlc3BvbnNlW10+IHtcbiAgICAgICAgY29uc3QgY29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5TGlzdDogQ29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5UmVzcG9uc2VbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCB0aGlzLmdldFVzZ2FlU3BhY2UocGF0aCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICBjb250ZW50U3BhY2VVc2FnZVN1bW1hcnlMaXN0LnB1c2goe3BhdGg6IHBhdGgsIHNpemVPbkRldmljZTogc2l6ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZW50U3BhY2VVc2FnZVN1bW1hcnlMaXN0O1xuICAgIH1cbn1cbiJdfQ==