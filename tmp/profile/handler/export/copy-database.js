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
var CopyDatabase = /** @class */ (function () {
    function CopyDatabase(dbService) {
        this.dbService = dbService;
    }
    CopyDatabase.prototype.execute = function (exportContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                response = new Response();
                return [2 /*return*/, this.dbService.copyDatabase(exportContext.destinationDBFilePath).toPromise().then(function (success) {
                        response.body = exportContext;
                        return response;
                    }).then(function () {
                        response.body = exportContext;
                        return response;
                    })];
            });
        });
    };
    return CopyDatabase;
}());
export { CopyDatabase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1kYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9maWxlL2hhbmRsZXIvZXhwb3J0L2NvcHktZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUl0QztJQUNJLHNCQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQ3hDLENBQUM7SUFFWSw4QkFBTyxHQUFwQixVQUFxQixhQUFtQzs7OztnQkFDOUMsUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzFDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBc0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQWdCO3dCQUN2RyxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDOUIsT0FBTyxRQUFRLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSixRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDOUIsT0FBTyxRQUFRLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxFQUFDOzs7S0FHTjtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtFeHBvcnRQcm9maWxlQ29udGV4dH0gZnJvbSAnLi4vLi4vZGVmL2V4cG9ydC1wcm9maWxlLWNvbnRleHQnO1xuXG5leHBvcnQgY2xhc3MgQ29weURhdGFiYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUoZXhwb3J0Q29udGV4dDogRXhwb3J0UHJvZmlsZUNvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuY29weURhdGFiYXNlKGV4cG9ydENvbnRleHQuZGVzdGluYXRpb25EQkZpbGVQYXRoISkudG9Qcm9taXNlKCkudGhlbigoc3VjY2VzczogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG59XG4iXX0=