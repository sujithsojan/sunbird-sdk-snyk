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
import { TelemetryProcessedEntry } from '../../db/schema';
import { Response } from '../../../api';
var TransportProcessedTelemetry = /** @class */ (function () {
    function TransportProcessedTelemetry(dbService) {
        this.dbService = dbService;
    }
    TransportProcessedTelemetry.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: TelemetryProcessedEntry.TABLE_NAME,
            useExternalDb: true
        }).toPromise().then(function (results) {
            return _this.saveProccessedTelemetryToDB(results);
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportProcessedTelemetry.prototype.saveProccessedTelemetryToDB = function (results) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                results.forEach(function (result) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.dbService.insert({
                                    table: TelemetryProcessedEntry.TABLE_NAME,
                                    modelJson: result
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return TransportProcessedTelemetry;
}());
export { TransportProcessedTelemetry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LXByb2Nlc3NlZC10ZWxlbWV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGVsZW1ldHJ5L2hhbmRsZXIvaW1wb3J0L3RyYW5zcG9ydC1wcm9jZXNzZWQtdGVsZW1ldHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdEM7SUFDSSxxQ0FBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBRU0sNkNBQU8sR0FBZCxVQUFlLGFBQXFDO1FBQXBELGlCQVdDO1FBVkcsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxVQUFVO1lBQ3pDLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUE0QztZQUM3RCxPQUFPLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztZQUM5QixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSxpRUFBMkIsR0FBekMsVUFBMEMsT0FBNEM7Ozs7Z0JBQ2xGLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBTyxNQUF5Qzs7O29DQUM1RCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQ0FDeEIsS0FBSyxFQUFFLHVCQUF1QixDQUFDLFVBQVU7b0NBQ3pDLFNBQVMsRUFBRSxNQUFNO2lDQUNwQixDQUFDLEVBQUE7O2dDQUhGLFNBR0UsQ0FBQzs7OztxQkFDTixDQUFDLENBQUM7Ozs7S0FDTjtJQUNMLGtDQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0ltcG9ydFRlbGVtZXRyeUNvbnRleHR9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7VGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNwb3J0UHJvY2Vzc2VkVGVsZW1ldHJ5IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWN1dGUoaW1wb3J0Q29udGV4dDogSW1wb3J0VGVsZW1ldHJ5Q29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgdXNlRXh0ZXJuYWxEYjogdHJ1ZVxuICAgICAgICB9KS50b1Byb21pc2UoKS50aGVuKChyZXN1bHRzOiBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZVByb2NjZXNzZWRUZWxlbWV0cnlUb0RCKHJlc3VsdHMpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBpbXBvcnRDb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHNhdmVQcm9jY2Vzc2VkVGVsZW1ldHJ5VG9EQihyZXN1bHRzOiBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5TY2hlbWFNYXBbXSkge1xuICAgICAgICByZXN1bHRzLmZvckVhY2goYXN5bmMgKHJlc3VsdDogVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuU2NoZW1hTWFwKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogcmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19