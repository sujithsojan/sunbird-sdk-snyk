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
import { CourseAssessmentEntry } from '../../summarizer/db/schema';
var CourseAssessmentMigration = /** @class */ (function (_super) {
    __extends(CourseAssessmentMigration, _super);
    function CourseAssessmentMigration() {
        return _super.call(this, 10, 25) || this;
    }
    CourseAssessmentMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, query;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.queries();
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        query = _a[_i];
                        return [4 /*yield*/, dbService.execute(query).toPromise()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, undefined];
                }
            });
        });
    };
    CourseAssessmentMigration.prototype.queries = function () {
        return [
            CourseAssessmentEntry.getCreateEntry()
        ];
    };
    return CourseAssessmentMigration;
}(Migration));
export { CourseAssessmentMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLWFzc2Vzc21lbnQtbWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL21pZ3JhdGlvbnMvY291cnNlLWFzc2Vzc21lbnQtbWlncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQVksU0FBUyxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWpFO0lBQStDLDZDQUFTO0lBRXBEO2VBQ0ksa0JBQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRVkseUNBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7Ozs4QkFDRCxFQUFkLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBRTs7OzZCQUFkLENBQUEsY0FBYyxDQUFBO3dCQUF2QixLQUFLO3dCQUNaLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUExQyxTQUEwQyxDQUFDOzs7d0JBRDNCLElBQWMsQ0FBQTs7NEJBSWxDLHNCQUFPLFNBQVMsRUFBQzs7OztLQUNwQjtJQUVELDJDQUFPLEdBQVA7UUFDSSxPQUFPO1lBQ0gscUJBQXFCLENBQUMsY0FBYyxFQUFFO1NBQ3pDLENBQUM7SUFDTixDQUFDO0lBQ0wsZ0NBQUM7QUFBRCxDQUFDLEFBbkJELENBQStDLFNBQVMsR0FtQnZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2UsIE1pZ3JhdGlvbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtDb3Vyc2VBc3Nlc3NtZW50RW50cnl9IGZyb20gJy4uLy4uL3N1bW1hcml6ZXIvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIENvdXJzZUFzc2Vzc21lbnRNaWdyYXRpb24gZXh0ZW5kcyBNaWdyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKDEwLCAyNSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgICAgIGZvciAoY29uc3QgcXVlcnkgb2YgdGhpcy5xdWVyaWVzKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IGRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS50b1Byb21pc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIENvdXJzZUFzc2Vzc21lbnRFbnRyeS5nZXRDcmVhdGVFbnRyeSgpXG4gICAgICAgIF07XG4gICAgfVxufVxuIl19