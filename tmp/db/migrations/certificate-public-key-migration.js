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
import { CertificatePublicKeyEntry } from '../../certificate/db/schema';
import { Migration } from '..';
var CertificatePublicKeyMigration = /** @class */ (function (_super) {
    __extends(CertificatePublicKeyMigration, _super);
    function CertificatePublicKeyMigration() {
        return _super.call(this, 17, 30) || this;
    }
    CertificatePublicKeyMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    CertificatePublicKeyMigration.prototype.queries = function () {
        return [
            CertificatePublicKeyEntry.getCreateEntry()
        ];
    };
    return CertificatePublicKeyMigration;
}(Migration));
export { CertificatePublicKeyMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUtcHVibGljLWtleS1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9jZXJ0aWZpY2F0ZS1wdWJsaWMta2V5LW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEUsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUV4QztJQUFtRCxpREFBUztJQUUxRDtlQUNFLGtCQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRVksNkNBQUssR0FBbEIsVUFBbUIsU0FBb0I7Ozs7NEJBQ3JDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxFQUFBOzt3QkFBdEYsU0FBc0YsQ0FBQzt3QkFDdkYsc0JBQU8sU0FBUyxFQUFDOzs7O0tBQ2xCO0lBRUQsK0NBQU8sR0FBUDtRQUNFLE9BQU87WUFDTCx5QkFBeUIsQ0FBQyxjQUFjLEVBQUU7U0FDM0MsQ0FBQztJQUNKLENBQUM7SUFDSCxvQ0FBQztBQUFELENBQUMsQUFoQkQsQ0FBbUQsU0FBUyxHQWdCM0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZXJ0aWZpY2F0ZVB1YmxpY0tleUVudHJ5IH0gZnJvbSAnLi4vLi4vY2VydGlmaWNhdGUvZGIvc2NoZW1hJztcbmltcG9ydCB7RGJTZXJ2aWNlLCBNaWdyYXRpb259IGZyb20gJy4uJztcblxuZXhwb3J0IGNsYXNzIENlcnRpZmljYXRlUHVibGljS2V5TWlncmF0aW9uIGV4dGVuZHMgTWlncmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigxNywgMzApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFwcGx5KGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5xdWVyaWVzKCkubWFwKChxdWVyeSkgPT4gZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpKSk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHF1ZXJpZXMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIENlcnRpZmljYXRlUHVibGljS2V5RW50cnkuZ2V0Q3JlYXRlRW50cnkoKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==