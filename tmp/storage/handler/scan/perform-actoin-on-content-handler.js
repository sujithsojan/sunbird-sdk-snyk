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
import { ContentUtil } from '../../../content/util/content-util';
import { defer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
var PerformActoinOnContentHandler = /** @class */ (function () {
    function PerformActoinOnContentHandler(storageHandler) {
        this.storageHandler = storageHandler;
    }
    PerformActoinOnContentHandler.prototype.exexute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!context.deletedIdentifiers.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storageHandler.deleteContentsFromDb(context.deletedIdentifiers)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!context.newlyAddedIdentifiers.length) return [3 /*break*/, 6];
                        _i = 0, _a = context.newlyAddedIdentifiers;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        element = _a[_i];
                        return [4 /*yield*/, this.storageHandler.addDestinationContentInDb(element, ContentUtil.getContentRootDir(context.currentStoragePath).concat('/'), false)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        }); }).pipe(mapTo(context));
    };
    return PerformActoinOnContentHandler;
}());
export { PerformActoinOnContentHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybS1hY3RvaW4tb24tY29udGVudC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0b3JhZ2UvaGFuZGxlci9zY2FuL3BlcmZvcm0tYWN0b2luLW9uLWNvbnRlbnQtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFDLEtBQUssRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckM7SUFDSSx1Q0FBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ2xELENBQUM7SUFFTSwrQ0FBTyxHQUFkLFVBQWUsT0FBMkI7UUFBMUMsaUJBZUM7UUFkRyxPQUFPLEtBQUssQ0FBQzs7Ozs7NkJBQ0wsT0FBTyxDQUFDLGtCQUFtQixDQUFDLE1BQU0sRUFBbEMsd0JBQWtDO3dCQUNsQyxxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxrQkFBbUIsQ0FBQyxFQUFBOzt3QkFBM0UsU0FBMkUsQ0FBQzs7OzZCQUc1RSxPQUFPLENBQUMscUJBQXNCLENBQUMsTUFBTSxFQUFyQyx3QkFBcUM7OEJBQ2UsRUFBOUIsS0FBQSxPQUFPLENBQUMscUJBQXNCOzs7NkJBQTlCLENBQUEsY0FBOEIsQ0FBQTt3QkFBekMsT0FBTzt3QkFDZCxxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFDdkQsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBRGpGLFNBQ2lGLENBQUM7Ozt3QkFGaEUsSUFBOEIsQ0FBQTs7Ozs7YUFLM0QsQ0FBQyxDQUFDLElBQUksQ0FDSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQ2pCLENBQUM7SUFDTixDQUFDO0lBQ0wsb0NBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTY2FuQ29udGVudENvbnRleHR9IGZyb20gJy4uLy4uL2RlZi9zY2FuLXJlcXVlc3RzJztcbmltcG9ydCB7U3RvcmFnZUhhbmRsZXJ9IGZyb20gJy4uL3N0b3JhZ2UtaGFuZGxlcic7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi8uLi8uLi9jb250ZW50L3V0aWwvY29udGVudC11dGlsJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXBUb30gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgUGVyZm9ybUFjdG9pbk9uQ29udGVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZUhhbmRsZXI6IFN0b3JhZ2VIYW5kbGVyKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZXh1dGUoY29udGV4dDogU2NhbkNvbnRlbnRDb250ZXh0KTogT2JzZXJ2YWJsZTxTY2FuQ29udGVudENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGV0ZWRJZGVudGlmaWVycyEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlSGFuZGxlci5kZWxldGVDb250ZW50c0Zyb21EYihjb250ZXh0LmRlbGV0ZWRJZGVudGlmaWVycyEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29udGV4dC5uZXdseUFkZGVkSWRlbnRpZmllcnMhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb250ZXh0Lm5ld2x5QWRkZWRJZGVudGlmaWVycyEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlSGFuZGxlci5hZGREZXN0aW5hdGlvbkNvbnRlbnRJbkRiKGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50VXRpbC5nZXRDb250ZW50Um9vdERpcihjb250ZXh0LmN1cnJlbnRTdG9yYWdlUGF0aCkuY29uY2F0KCcvJyksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXBUbyhjb250ZXh0KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==