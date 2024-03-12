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
var DeviceMemoryCheck = /** @class */ (function () {
    function DeviceMemoryCheck(fileService) {
        this.fileService = fileService;
    }
    DeviceMemoryCheck.prototype.execute = function (exportContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                response = new Response();
                return [2 /*return*/, this.fileService.getFreeDiskSpace()
                        .then(function (freeSpace) {
                        var fileSize = _this.getFileSize(exportContentContext.items);
                        // if (!FileUtil.isFreeSpaceAvailable(freeSpace, fileSize, 0)) {
                        //     throw response;
                        // }
                        response.body = exportContentContext;
                        return response;
                    })];
            });
        });
    };
    DeviceMemoryCheck.prototype.getFileSize = function (items) {
        var fileSize = 0;
        if (items) {
            items.forEach(function (item) {
                if (item.size) {
                    fileSize = fileSize + Number(item.size);
                }
            });
        }
        return fileSize;
    };
    return DeviceMemoryCheck;
}());
export { DeviceMemoryCheck };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLW1lbW9yeS1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2V4cG9ydC9kZXZpY2UtbWVtb3J5LWNoZWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdEM7SUFDSSwyQkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDNUMsQ0FBQztJQUVZLG1DQUFPLEdBQXBCLFVBQXFCLG9CQUEwQzs7Ozs7Z0JBQ3JELFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxzQkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFO3lCQUNyQyxJQUFJLENBQUMsVUFBQyxTQUFTO3dCQUNaLElBQU0sUUFBUSxHQUFXLEtBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsS0FBTSxDQUFDLENBQUM7d0JBQ3ZFLGdFQUFnRTt3QkFDaEUsc0JBQXNCO3dCQUN0QixJQUFJO3dCQUNKLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUM7d0JBQ3JDLE9BQU8sUUFBUSxDQUFDO29CQUNwQixDQUFDLENBQUMsRUFBQzs7O0tBQ1Y7SUFFTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFZO1FBQzVCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUNmLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDWCxRQUFRLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge0V4cG9ydENvbnRlbnRDb250ZXh0fSBmcm9tICcuLi8uLic7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuXG5leHBvcnQgY2xhc3MgRGV2aWNlTWVtb3J5Q2hlY2sge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUoZXhwb3J0Q29udGVudENvbnRleHQ6IEV4cG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuZ2V0RnJlZURpc2tTcGFjZSgpXG4gICAgICAgICAgICAudGhlbigoZnJlZVNwYWNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVNpemU6IG51bWJlciA9IHRoaXMuZ2V0RmlsZVNpemUoZXhwb3J0Q29udGVudENvbnRleHQuaXRlbXMhKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUZpbGVVdGlsLmlzRnJlZVNwYWNlQXZhaWxhYmxlKGZyZWVTcGFjZSwgZmlsZVNpemUsIDApKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRocm93IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gZXhwb3J0Q29udGVudENvbnRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaWxlU2l6ZShpdGVtczogYW55W10pOiBudW1iZXIge1xuICAgICAgICBsZXQgZmlsZVNpemUgPSAwO1xuICAgICAgICBpZiAoaXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVTaXplID0gZmlsZVNpemUgKyBOdW1iZXIoaXRlbS5zaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZVNpemU7XG4gICAgfVxufVxuIl19