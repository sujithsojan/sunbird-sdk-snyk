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
import { NetworkQueueEntry } from '../../api/network-queue/db/schema';
import { map } from 'rxjs/operators';
import { TelemetryProcessedEntry } from '../../telemetry/db/schema';
import { NetworkQueueType } from '../../api/network-queue';
import { NetworkRequestHandler } from '../../api/network-queue/handlers/network-request-handler';
var NetworkQueueMigration = /** @class */ (function (_super) {
    __extends(NetworkQueueMigration, _super);
    function NetworkQueueMigration(sdkConfig, networkQueue) {
        var _this = _super.call(this, 14, 27) || this;
        _this.sdkConfig = sdkConfig;
        _this.networkQueue = networkQueue;
        return _this;
    }
    NetworkQueueMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, dbService.read({
                                table: TelemetryProcessedEntry.TABLE_NAME,
                                selection: '',
                                selectionArgs: []
                            }).pipe(map(function (rows) {
                                var networkRequestHandler = new NetworkRequestHandler(_this.sdkConfig);
                                rows.forEach(function (processedEventsBatchEntry) { return __awaiter(_this, void 0, void 0, function () {
                                    var messageId, data, eventsCount;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!processedEventsBatchEntry) return [3 /*break*/, 3];
                                                messageId = processedEventsBatchEntry[TelemetryProcessedEntry.COLUMN_NAME_MSG_ID];
                                                data = processedEventsBatchEntry[TelemetryProcessedEntry.COLUMN_NAME_DATA];
                                                eventsCount = processedEventsBatchEntry[TelemetryProcessedEntry.COLUMN_NAME_NUMBER_OF_EVENTS];
                                                return [4 /*yield*/, this.networkQueue.enqueue(networkRequestHandler.generateNetworkQueueRequest(NetworkQueueType.TELEMETRY, data, messageId, eventsCount, false), false).toPromise()];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, dbService.execute("DELETE FROM " + TelemetryProcessedEntry.TABLE_NAME + " WHERE " + TelemetryProcessedEntry.COLUMN_NAME_MSG_ID + "='" + messageId + "'")
                                                        .toPromise()];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })).toPromise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    NetworkQueueMigration.prototype.queries = function () {
        return [
            NetworkQueueEntry.getCreateEntry()
        ];
    };
    return NetworkQueueMigration;
}(Migration));
export { NetworkQueueMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1xdWV1ZS1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9uZXR3b3JrLXF1ZXVlLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN4QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFlLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMERBQTBELENBQUM7QUFHL0Y7SUFBMkMseUNBQVM7SUFFbEQsK0JBQW9CLFNBQW9CLEVBQ3BCLFlBQTBCO1FBRDlDLFlBRUUsa0JBQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUNkO1FBSG1CLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsa0JBQVksR0FBWixZQUFZLENBQWM7O0lBRTlDLENBQUM7SUFFWSxxQ0FBSyxHQUFsQixVQUFtQixTQUFvQjs7Ozs7NEJBQ3JDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxFQUFBOzt3QkFBdEYsU0FBc0YsQ0FBQzt3QkFDdkYscUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQztnQ0FDbkIsS0FBSyxFQUFFLHVCQUF1QixDQUFDLFVBQVU7Z0NBQ3pDLFNBQVMsRUFBRSxFQUFFO2dDQUNiLGFBQWEsRUFBRSxFQUFFOzZCQUNsQixDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxVQUFDLElBQXlDO2dDQUM1QyxJQUFNLHFCQUFxQixHQUFJLElBQUkscUJBQXFCLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQU8seUJBQTREOzs7OztxREFDMUUseUJBQXlCLEVBQXpCLHdCQUF5QjtnREFDckIsU0FBUyxHQUFHLHlCQUF5QixDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0RBQ2xGLElBQUksR0FBRyx5QkFBeUIsQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dEQUMzRSxXQUFXLEdBQUcseUJBQXlCLENBQUMsdUJBQXVCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnREFDcEcscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsMkJBQTJCLENBQy9FLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0RBRHRGLFNBQ3NGLENBQUM7Z0RBQ3ZGLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQ3JCLGlCQUFlLHVCQUF1QixDQUFDLFVBQVUsZUFBVSx1QkFBdUIsQ0FBQyxrQkFBa0IsVUFBSyxTQUFTLE1BQUcsQ0FBQzt5REFDdEgsU0FBUyxFQUFFLEVBQUE7O2dEQUZkLFNBRWMsQ0FBQzs7Ozs7cUNBRWxCLENBQUMsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFwQmIsU0FvQmEsQ0FBQzt3QkFDZCxzQkFBTyxTQUFTLEVBQUM7Ozs7S0FDbEI7SUFFRCx1Q0FBTyxHQUFQO1FBQ0UsT0FBTztZQUNMLGlCQUFpQixDQUFDLGNBQWMsRUFBRTtTQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUEyQyxTQUFTLEdBc0NuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlLCBNaWdyYXRpb259IGZyb20gJy4uJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlRW50cnl9IGZyb20gJy4uLy4uL2FwaS9uZXR3b3JrLXF1ZXVlL2RiL3NjaGVtYSc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeX0gZnJvbSAnLi4vLi4vdGVsZW1ldHJ5L2RiL3NjaGVtYSc7XG5pbXBvcnQge05ldHdvcmtRdWV1ZSwgTmV0d29ya1F1ZXVlVHlwZX0gZnJvbSAnLi4vLi4vYXBpL25ldHdvcmstcXVldWUnO1xuaW1wb3J0IHtOZXR3b3JrUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uLy4uL2FwaS9uZXR3b3JrLXF1ZXVlL2hhbmRsZXJzL25ldHdvcmstcmVxdWVzdC1oYW5kbGVyJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcblxuZXhwb3J0IGNsYXNzIE5ldHdvcmtRdWV1ZU1pZ3JhdGlvbiBleHRlbmRzIE1pZ3JhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZXR3b3JrUXVldWU6IE5ldHdvcmtRdWV1ZSkge1xuICAgIHN1cGVyKDE0LCAyNyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXBwbHkoZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLnF1ZXJpZXMoKS5tYXAoKHF1ZXJ5KSA9PiBkYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCkpKTtcbiAgICBhd2FpdCBkYlNlcnZpY2UucmVhZCh7XG4gICAgICB0YWJsZTogVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgIHNlbGVjdGlvbjogJycsXG4gICAgICBzZWxlY3Rpb25BcmdzOiBbXVxuICAgIH0pLnBpcGUoXG4gICAgICBtYXAoKHJvd3M6IFRlbGVtZXRyeVByb2Nlc3NlZEVudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ldHdvcmtSZXF1ZXN0SGFuZGxlciA9ICBuZXcgTmV0d29ya1JlcXVlc3RIYW5kbGVyKHRoaXMuc2RrQ29uZmlnKTtcbiAgICAgICAgcm93cy5mb3JFYWNoKGFzeW5jIChwcm9jZXNzZWRFdmVudHNCYXRjaEVudHJ5OiBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5TY2hlbWFNYXApID0+IHtcbiAgICAgICAgICBpZiAocHJvY2Vzc2VkRXZlbnRzQmF0Y2hFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUlkID0gcHJvY2Vzc2VkRXZlbnRzQmF0Y2hFbnRyeVtUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5DT0xVTU5fTkFNRV9NU0dfSURdO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHByb2Nlc3NlZEV2ZW50c0JhdGNoRW50cnlbVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuQ09MVU1OX05BTUVfREFUQV07XG4gICAgICAgICAgICBjb25zdCBldmVudHNDb3VudCA9IHByb2Nlc3NlZEV2ZW50c0JhdGNoRW50cnlbVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuQ09MVU1OX05BTUVfTlVNQkVSX09GX0VWRU5UU107XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm5ldHdvcmtRdWV1ZS5lbnF1ZXVlKG5ldHdvcmtSZXF1ZXN0SGFuZGxlci5nZW5lcmF0ZU5ldHdvcmtRdWV1ZVJlcXVlc3QoXG4gICAgICAgICAgICAgIE5ldHdvcmtRdWV1ZVR5cGUuVEVMRU1FVFJZLCBkYXRhLCBtZXNzYWdlSWQsIGV2ZW50c0NvdW50LCBmYWxzZSksIGZhbHNlKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGF3YWl0IGRiU2VydmljZS5leGVjdXRlKFxuICAgICAgICAgICAgICBgREVMRVRFIEZST00gJHtUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5UQUJMRV9OQU1FfSBXSEVSRSAke1RlbGVtZXRyeVByb2Nlc3NlZEVudHJ5LkNPTFVNTl9OQU1FX01TR19JRH09JyR7bWVzc2FnZUlkfSdgKVxuICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKS50b1Byb21pc2UoKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gW1xuICAgICAgTmV0d29ya1F1ZXVlRW50cnkuZ2V0Q3JlYXRlRW50cnkoKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==