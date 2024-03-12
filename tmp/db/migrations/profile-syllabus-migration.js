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
import { ProfileEntry } from '../../profile/db/schema';
var ProfileSyllabusMigration = /** @class */ (function (_super) {
    __extends(ProfileSyllabusMigration, _super);
    function ProfileSyllabusMigration() {
        return _super.call(this, 2, 17) || this;
    }
    ProfileSyllabusMigration.prototype.apply = function (dbService) {
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
    ProfileSyllabusMigration.prototype.queries = function () {
        return [
            ProfileEntry.getAlterEntryForProfileSyllabus()
        ];
    };
    return ProfileSyllabusMigration;
}(Migration));
export { ProfileSyllabusMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1zeWxsYWJ1cy1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9wcm9maWxlLXN5bGxhYnVzLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN4QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFckQ7SUFBOEMsNENBQVM7SUFFbkQ7ZUFDSSxrQkFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFWSx3Q0FBSyxHQUFsQixVQUFtQixTQUFvQjs7OztnQkFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFPLEtBQUs7OztvQ0FDL0IscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0NBQTFDLFNBQTBDLENBQUM7Ozs7cUJBQzlDLENBQUMsQ0FBQztnQkFFSCxzQkFBTyxTQUFTLEVBQUM7OztLQUNwQjtJQUVELDBDQUFPLEdBQVA7UUFDSSxPQUFPO1lBQ0gsWUFBWSxDQUFDLCtCQUErQixFQUFFO1NBQ2pELENBQUM7SUFDTixDQUFDO0lBR0wsK0JBQUM7QUFBRCxDQUFDLEFBckJELENBQThDLFNBQVMsR0FxQnREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2UsIE1pZ3JhdGlvbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtQcm9maWxlRW50cnl9IGZyb20gJy4uLy4uL3Byb2ZpbGUvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVTeWxsYWJ1c01pZ3JhdGlvbiBleHRlbmRzIE1pZ3JhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoMiwgMTcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhcHBseShkYlNlcnZpY2U6IERiU2VydmljZSkge1xuICAgICAgICB0aGlzLnF1ZXJpZXMoKS5mb3JFYWNoKGFzeW5jIChxdWVyeSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHF1ZXJpZXMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBQcm9maWxlRW50cnkuZ2V0QWx0ZXJFbnRyeUZvclByb2ZpbGVTeWxsYWJ1cygpXG4gICAgICAgIF07XG4gICAgfVxuXG5cbn1cbiJdfQ==