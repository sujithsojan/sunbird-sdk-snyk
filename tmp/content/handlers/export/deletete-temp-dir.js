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
var DeleteTempDir = /** @class */ (function () {
    function DeleteTempDir() {
    }
    DeleteTempDir.prototype.execute = function (exportContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                response = new Response();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var tmpDirPath = exportContext.destinationFolder.concat('tmp/');
                        sbutility.rm(tmpDirPath, '', function () {
                            response.body = exportContext;
                            resolve(response);
                        }, function (e) {
                            response.body = exportContext;
                            resolve(response);
                        });
                    })];
            });
        });
    };
    return DeleteTempDir;
}());
export { DeleteTempDir };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRldGUtdGVtcC1kaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9leHBvcnQvZGVsZXRldGUtdGVtcC1kaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUd0QztJQUVJO0lBQ0EsQ0FBQztJQUVZLCtCQUFPLEdBQXBCLFVBQXFCLGFBQW1DOzs7O2dCQUM5QyxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsc0JBQU8sSUFBSSxPQUFPLENBQVcsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDekMsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLGlCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbkUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFOzRCQUN6QixRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzs0QkFDOUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QixDQUFDLEVBQUUsVUFBQyxDQUFDOzRCQUNELFFBQVEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDOzRCQUM5QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3RCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxFQUFDOzs7S0FDTjtJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0V4cG9ydENvbnRlbnRDb250ZXh0fSBmcm9tICcuLi8uLic7XG5cbmV4cG9ydCBjbGFzcyBEZWxldGVUZW1wRGlyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKGV4cG9ydENvbnRleHQ6IEV4cG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0bXBEaXJQYXRoID0gZXhwb3J0Q29udGV4dC5kZXN0aW5hdGlvbkZvbGRlciEuY29uY2F0KCd0bXAvJyk7XG4gICAgICAgICAgICBzYnV0aWxpdHkucm0odG1wRGlyUGF0aCwgJycsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gZXhwb3J0Q29udGV4dDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRleHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19