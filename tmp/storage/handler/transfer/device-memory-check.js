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
import { ContentStorageHandler } from '../../../content/handlers/content-storage-handler';
import { ContentUtil } from '../../../content/util/content-util';
import { LowMemoryError } from '../../errors/low-memory-error';
import { defer } from 'rxjs';
var DeviceMemoryCheck = /** @class */ (function () {
    function DeviceMemoryCheck(dbService) {
        this.dbService = dbService;
    }
    DeviceMemoryCheck.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var usableSpace, storageHandler, contentStorageResponse, spaceRequired;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFreeUsableSpace(context.destinationFolder)];
                    case 1:
                        usableSpace = _a.sent();
                        storageHandler = new ContentStorageHandler(this.dbService);
                        return [4 /*yield*/, storageHandler.getContentUsageSummary([context.sourceFolder])];
                    case 2:
                        contentStorageResponse = _a.sent();
                        spaceRequired = 0;
                        if (contentStorageResponse && contentStorageResponse.length) {
                            spaceRequired = contentStorageResponse[0].sizeOnDevice;
                        }
                        if (!ContentUtil.isFreeSpaceAvailable(usableSpace, spaceRequired, 0)) {
                            throw new LowMemoryError('Available memory not sufficient for transfer operation');
                        }
                        else {
                            return [2 /*return*/, context];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    DeviceMemoryCheck.prototype.getFreeUsableSpace = function (directory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.getFreeUsableSpace(directory, function (space) {
                            resolve(Number(space));
                        }, function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    return DeviceMemoryCheck;
}());
export { DeviceMemoryCheck };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLW1lbW9yeS1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdG9yYWdlL2hhbmRsZXIvdHJhbnNmZXIvZGV2aWNlLW1lbW9yeS1jaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUV4RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBQyxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFFdkM7SUFDSSwyQkFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLE9BQStCO1FBQXZDLGlCQWlCQztRQWhCRyxPQUFPLEtBQUssQ0FBQzs7Ozs0QkFDVyxxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGlCQUFrQixDQUFDLEVBQUE7O3dCQUF2RSxXQUFXLEdBQUcsU0FBeUQ7d0JBQ3ZFLGNBQWMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDRSxxQkFBTSxjQUFjLENBQUMsc0JBQXNCLENBQzFHLENBQUMsT0FBTyxDQUFDLFlBQWEsQ0FBQyxDQUFDLEVBQUE7O3dCQUR0QixzQkFBc0IsR0FBdUMsU0FDdkM7d0JBQ3hCLGFBQWEsR0FBRyxDQUFDLENBQUM7d0JBQ3RCLElBQUksc0JBQXNCLElBQUksc0JBQXNCLENBQUMsTUFBTSxFQUFFOzRCQUN6RCxhQUFhLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO3lCQUMxRDt3QkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NEJBQ2xFLE1BQU0sSUFBSSxjQUFjLENBQUMsd0RBQXdELENBQUMsQ0FBQzt5QkFDdEY7NkJBQU07NEJBQ0gsc0JBQU8sT0FBTyxFQUFDO3lCQUNsQjs7OzthQUVKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSw4Q0FBa0IsR0FBaEMsVUFBaUMsU0FBaUI7OztnQkFDOUMsc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDdkMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUs7NEJBQzFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxFQUFFLFVBQUMsQ0FBQzs0QkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUwsd0JBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUcmFuc2ZlckNvbnRlbnRDb250ZXh0fSBmcm9tICcuLi90cmFuc2Zlci1jb250ZW50LWhhbmRsZXInO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7Q29udGVudFN0b3JhZ2VIYW5kbGVyfSBmcm9tICcuLi8uLi8uLi9jb250ZW50L2hhbmRsZXJzL2NvbnRlbnQtc3RvcmFnZS1oYW5kbGVyJztcbmltcG9ydCB7Q29udGVudFNwYWNlVXNhZ2VTdW1tYXJ5UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQnO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vLi4vLi4vY29udGVudC91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge0xvd01lbW9yeUVycm9yfSBmcm9tICcuLi8uLi9lcnJvcnMvbG93LW1lbW9yeS1lcnJvcic7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIERldmljZU1lbW9yeUNoZWNrIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShjb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0KTogT2JzZXJ2YWJsZTxUcmFuc2ZlckNvbnRlbnRDb250ZXh0PiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1c2FibGVTcGFjZSA9IGF3YWl0IHRoaXMuZ2V0RnJlZVVzYWJsZVNwYWNlKGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhKTtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VIYW5kbGVyID0gbmV3IENvbnRlbnRTdG9yYWdlSGFuZGxlcih0aGlzLmRiU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50U3RvcmFnZVJlc3BvbnNlOiBDb250ZW50U3BhY2VVc2FnZVN1bW1hcnlSZXNwb25zZVtdID0gYXdhaXQgc3RvcmFnZUhhbmRsZXIuZ2V0Q29udGVudFVzYWdlU3VtbWFyeShcbiAgICAgICAgICAgICAgICBbY29udGV4dC5zb3VyY2VGb2xkZXIhXSk7XG4gICAgICAgICAgICBsZXQgc3BhY2VSZXF1aXJlZCA9IDA7XG4gICAgICAgICAgICBpZiAoY29udGVudFN0b3JhZ2VSZXNwb25zZSAmJiBjb250ZW50U3RvcmFnZVJlc3BvbnNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNwYWNlUmVxdWlyZWQgPSBjb250ZW50U3RvcmFnZVJlc3BvbnNlWzBdLnNpemVPbkRldmljZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghQ29udGVudFV0aWwuaXNGcmVlU3BhY2VBdmFpbGFibGUodXNhYmxlU3BhY2UsIHNwYWNlUmVxdWlyZWQsIDApKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IExvd01lbW9yeUVycm9yKCdBdmFpbGFibGUgbWVtb3J5IG5vdCBzdWZmaWNpZW50IGZvciB0cmFuc2ZlciBvcGVyYXRpb24nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRGcmVlVXNhYmxlU3BhY2UoZGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzYnV0aWxpdHkuZ2V0RnJlZVVzYWJsZVNwYWNlKGRpcmVjdG9yeSwgKHNwYWNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShOdW1iZXIoc3BhY2UpKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19