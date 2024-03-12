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
import { ContentEntry } from '../../../content/db/schema';
var COLUMN_NAME_PATH = ContentEntry.COLUMN_NAME_PATH;
var COLUMN_NAME_IDENTIFIER = ContentEntry.COLUMN_NAME_IDENTIFIER;
import { ContentUtil } from '../../../content/util/content-util';
import { defer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
var UpdateSourceContentPathInDb = /** @class */ (function () {
    function UpdateSourceContentPathInDb(dbService) {
        this.dbService = dbService;
    }
    UpdateSourceContentPathInDb.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, content, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dbService.beginTransaction();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        _i = 0, _a = context.contentsInSource;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        content = _a[_i];
                        content[COLUMN_NAME_PATH] = ContentUtil.getBasePath(context.destinationFolder.concat(content[COLUMN_NAME_IDENTIFIER], '/'));
                        return [4 /*yield*/, this.dbService.update({
                                table: ContentEntry.TABLE_NAME,
                                selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                                selectionArgs: [content[ContentEntry.COLUMN_NAME_IDENTIFIER]],
                                modelJson: content
                            }).toPromise()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.dbService.endTransaction(true);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        this.dbService.endTransaction(false);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); }).pipe(mapTo(context));
    };
    return UpdateSourceContentPathInDb;
}());
export { UpdateSourceContentPathInDb };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXNvdXJjZS1jb250ZW50LXBhdGgtaW4tZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvcmFnZS9oYW5kbGVyL3RyYW5zZmVyL3VwZGF0ZS1zb3VyY2UtY29udGVudC1wYXRoLWluLWRiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxJQUFPLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztBQUN4RCxJQUFPLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFDLEtBQUssRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckM7SUFDSSxxQ0FBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBRUQsNkNBQU8sR0FBUCxVQUFRLE9BQStCO1FBQXZDLGlCQXdCQztRQXZCRyxPQUFPLEtBQUssQ0FBQzs7Ozs7d0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzs7OzhCQUdpQixFQUF6QixLQUFBLE9BQU8sQ0FBQyxnQkFBaUI7Ozs2QkFBekIsQ0FBQSxjQUF5QixDQUFBO3dCQUFwQyxPQUFPO3dCQUNkLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFrQixDQUFDLE1BQU0sQ0FDakYsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFFM0MscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0NBQ3hCLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTtnQ0FDOUIsU0FBUyxFQUFLLFlBQVksQ0FBQyxzQkFBc0IsU0FBTTtnQ0FDdkQsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dDQUM3RCxTQUFTLEVBQUUsT0FBTzs2QkFDckIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFMZCxTQUtjLENBQUM7Ozt3QkFURyxJQUF5QixDQUFBOzs7d0JBWS9DLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O3dCQUVwQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7YUFFNUMsQ0FBQyxDQUFDLElBQUksQ0FDSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQ2pCLENBQUM7SUFDTixDQUFDO0lBQ0wsa0NBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUcmFuc2ZlckNvbnRlbnRDb250ZXh0fSBmcm9tICcuLi90cmFuc2Zlci1jb250ZW50LWhhbmRsZXInO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7Q29udGVudEVudHJ5fSBmcm9tICcuLi8uLi8uLi9jb250ZW50L2RiL3NjaGVtYSc7XG5pbXBvcnQgQ09MVU1OX05BTUVfUEFUSCA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QQVRIO1xuaW1wb3J0IENPTFVNTl9OQU1FX0lERU5USUZJRVIgPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUjtcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcFRvfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVTb3VyY2VDb250ZW50UGF0aEluRGIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQpOiBPYnNlcnZhYmxlPFRyYW5zZmVyQ29udGVudENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbnRlbnQgb2YgY29udGV4dC5jb250ZW50c0luU291cmNlISkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50W0NPTFVNTl9OQU1FX1BBVEhdID0gQ29udGVudFV0aWwuZ2V0QmFzZVBhdGgoY29udGV4dC5kZXN0aW5hdGlvbkZvbGRlciEuY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFtDT0xVTU5fTkFNRV9JREVOVElGSUVSXSwgJy8nKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbY29udGVudFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKHRydWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKGNvbnRleHQpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19