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
import { defer } from 'rxjs';
var ValidateDestinationFolder = /** @class */ (function () {
    function ValidateDestinationFolder(fileService) {
        this.fileService = fileService;
    }
    ValidateDestinationFolder.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = context;
                        return [4 /*yield*/, this.validate(context.destinationFolder).then(function (destination) {
                                return _this.createDirectory(destination);
                            })];
                    case 1:
                        _a.destinationFolder = _b.sent();
                        return [2 /*return*/, context];
                }
            });
        }); });
    };
    ValidateDestinationFolder.prototype.validate = function (destinationDirectory) {
        return this.canWrite(destinationDirectory).then(function () {
            if (!destinationDirectory.endsWith('content/')) {
                destinationDirectory = destinationDirectory.concat('content');
            }
            return destinationDirectory;
        }).catch(function () {
            throw Error('Destination is not writable');
        });
    };
    ValidateDestinationFolder.prototype.createDirectory = function (directory) {
        var _this = this;
        return this.fileService.exists(directory).then(function (entry) {
            return entry.nativeURL;
        }).catch(function () {
            return _this.fileService.createDir(directory, false).then(function (directoryEntry) {
                return directoryEntry.nativeURL;
            });
        });
    };
    ValidateDestinationFolder.prototype.canWrite = function (directory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.canWrite(directory, function () {
                            resolve();
                        }, function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    return ValidateDestinationFolder;
}());
export { ValidateDestinationFolder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZGVzdGluYXRpb24tZm9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0b3JhZ2UvaGFuZGxlci90cmFuc2Zlci92YWxpZGF0ZS1kZXN0aW5hdGlvbi1mb2xkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFDLEtBQUssRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUV2QztJQUNJLG1DQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUM1QyxDQUFDO0lBRUQsMkNBQU8sR0FBUCxVQUFRLE9BQStCO1FBQXZDLGlCQU9DO1FBTkcsT0FBTyxLQUFLLENBQUM7Ozs7Ozt3QkFDVCxLQUFBLE9BQU8sQ0FBQTt3QkFBcUIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxXQUFtQjtnQ0FDakcsT0FBTyxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUM3QyxDQUFDLENBQUMsRUFBQTs7d0JBRkYsR0FBUSxpQkFBaUIsR0FBRyxTQUUxQixDQUFDO3dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O2FBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyw0Q0FBUSxHQUFoQixVQUFpQixvQkFBNEI7UUFDekMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNqRTtZQUNELE9BQU8sb0JBQW9CLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ0wsTUFBTSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxtREFBZSxHQUF2QixVQUF3QixTQUFpQjtRQUF6QyxpQkFRQztRQVBHLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBWTtZQUN4RCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ0wsT0FBTyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsY0FBOEI7Z0JBQ3BGLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDRDQUFRLEdBQXRCLFVBQXVCLFNBQWlCOzs7Z0JBQ3BDLHNCQUFPLElBQUksT0FBTyxDQUFZLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQzFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOzRCQUMxQixPQUFPLEVBQUUsQ0FBQzt3QkFDZCxDQUFDLEVBQUUsVUFBQyxDQUFDOzRCQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFDTCxnQ0FBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RyYW5zZmVyQ29udGVudENvbnRleHR9IGZyb20gJy4uL3RyYW5zZmVyLWNvbnRlbnQtaGFuZGxlcic7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlRGVzdGluYXRpb25Gb2xkZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShjb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0KTogT2JzZXJ2YWJsZTxUcmFuc2ZlckNvbnRlbnRDb250ZXh0PiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyID0gYXdhaXQgdGhpcy52YWxpZGF0ZShjb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyISkudGhlbigoZGVzdGluYXRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURpcmVjdG9yeShkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlKGRlc3RpbmF0aW9uRGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Xcml0ZShkZXN0aW5hdGlvbkRpcmVjdG9yeSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRlc3RpbmF0aW9uRGlyZWN0b3J5LmVuZHNXaXRoKCdjb250ZW50LycpKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25EaXJlY3RvcnkgPSBkZXN0aW5hdGlvbkRpcmVjdG9yeS5jb25jYXQoJ2NvbnRlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbkRpcmVjdG9yeTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Rlc3RpbmF0aW9uIGlzIG5vdCB3cml0YWJsZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZURpcmVjdG9yeShkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmV4aXN0cyhkaXJlY3RvcnkpLnRoZW4oKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5Lm5hdGl2ZVVSTDtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuY3JlYXRlRGlyKGRpcmVjdG9yeSwgZmFsc2UpLnRoZW4oKGRpcmVjdG9yeUVudHJ5OiBEaXJlY3RvcnlFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3RvcnlFbnRyeS5uYXRpdmVVUkw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBjYW5Xcml0ZShkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5jYW5Xcml0ZShkaXJlY3RvcnksICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=