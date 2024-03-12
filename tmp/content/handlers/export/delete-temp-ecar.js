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
var DeleteTempEcar = /** @class */ (function () {
    function DeleteTempEcar(fileService) {
        this.fileService = fileService;
    }
    DeleteTempEcar.prototype.execute = function (exportContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                response = new Response();
                return [2 /*return*/, this.fileService.removeRecursively(exportContentContext.tmpLocationPath)
                        .then(function () {
                        response.body = exportContentContext;
                        return response;
                    }).catch(function () {
                        response.errorMesg = ContentErrorCode.EXPORT_FAILED_DELETING_ECAR;
                        throw response;
                    })];
            });
        });
    };
    return DeleteTempEcar;
}());
export { DeleteTempEcar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXRlbXAtZWNhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2V4cG9ydC9kZWxldGUtdGVtcC1lY2FyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFOUQ7SUFFSSx3QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDNUMsQ0FBQztJQUVZLGdDQUFPLEdBQXBCLFVBQXFCLG9CQUEwQzs7OztnQkFDckQsUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzFDLHNCQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsZUFBZ0IsQ0FBQzt5QkFDM0UsSUFBSSxDQUFDO3dCQUNGLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUM7d0JBQ3JDLE9BQU8sUUFBUSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ0wsUUFBUSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQywyQkFBMkIsQ0FBQzt3QkFDbEUsTUFBTSxRQUFRLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxFQUFDOzs7S0FDVjtJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7RXhwb3J0Q29udGVudENvbnRleHR9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0NvbnRlbnRFcnJvckNvZGV9IGZyb20gJy4uLy4uL3V0aWwvY29udGVudC1jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlVGVtcEVjYXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlY3V0ZShleHBvcnRDb250ZW50Q29udGV4dDogRXhwb3J0Q29udGVudENvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5yZW1vdmVSZWN1cnNpdmVseShleHBvcnRDb250ZW50Q29udGV4dC50bXBMb2NhdGlvblBhdGghKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBleHBvcnRDb250ZW50Q29udGV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3JNZXNnID0gQ29udGVudEVycm9yQ29kZS5FWFBPUlRfRkFJTEVEX0RFTEVUSU5HX0VDQVI7XG4gICAgICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=