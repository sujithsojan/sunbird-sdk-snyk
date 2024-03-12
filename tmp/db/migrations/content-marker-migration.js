var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Migration } from '..';
import { ContentMarkerEntry } from '../../content/db/schema';
var ContentMarkerMigration = /** @class */ (function (_super) {
    __extends(ContentMarkerMigration, _super);
    function ContentMarkerMigration() {
        return _super.call(this, 5, 20) || this;
    }
    ContentMarkerMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.queries().forEach(function (query) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, dbService.execute(query).toPromise()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, undefined];
            });
        });
    };
    ContentMarkerMigration.prototype.queries = function () {
        return [
            ContentMarkerEntry.getCreateEntry()
        ];
    };
    return ContentMarkerMigration;
}(Migration));
export { ContentMarkerMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1tYXJrZXItbWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL21pZ3JhdGlvbnMvY29udGVudC1tYXJrZXItbWlncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQVksU0FBUyxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTNEO0lBQTRDLDBDQUFTO0lBRWpEO2VBQ0ksa0JBQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVksc0NBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBTyxLQUFLOzs7b0NBQy9CLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dDQUExQyxTQUEwQyxDQUFDOzs7O3FCQUM5QyxDQUFDLENBQUM7Z0JBRUgsc0JBQU8sU0FBUyxFQUFDOzs7S0FDcEI7SUFFRCx3Q0FBTyxHQUFQO1FBQ0ksT0FBTztZQUNILGtCQUFrQixDQUFDLGNBQWMsRUFBRTtTQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUdMLDZCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUE0QyxTQUFTLEdBcUJwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlLCBNaWdyYXRpb259IGZyb20gJy4uJztcbmltcG9ydCB7Q29udGVudE1hcmtlckVudHJ5fSBmcm9tICcuLi8uLi9jb250ZW50L2RiL3NjaGVtYSc7XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50TWFya2VyTWlncmF0aW9uIGV4dGVuZHMgTWlncmF0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcig1LCAyMCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucXVlcmllcygpLmZvckVhY2goYXN5bmMgKHF1ZXJ5KSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBkYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIENvbnRlbnRNYXJrZXJFbnRyeS5nZXRDcmVhdGVFbnRyeSgpXG4gICAgICAgIF07XG4gICAgfVxuXG5cbn1cbiJdfQ==