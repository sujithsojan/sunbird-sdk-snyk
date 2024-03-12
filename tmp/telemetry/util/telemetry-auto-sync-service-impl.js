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
import { InteractSubType, InteractType } from '..';
import { TelemetryLogger } from './telemetry-logger';
import { interval, of } from 'rxjs';
import { catchError, filter, map, mapTo, tap } from 'rxjs/operators';
import { TelemetryKeys } from '../../preference-keys';
var TelemetryAutoSyncServiceImpl = /** @class */ (function () {
    function TelemetryAutoSyncServiceImpl(telemetryService, sharedPreferences) {
        this.telemetryService = telemetryService;
        this.sharedPreferences = sharedPreferences;
        this.shouldSync = false;
    }
    TelemetryAutoSyncServiceImpl.generateDownloadSpeedTelemetry = function (intervalTime) {
        return __awaiter(this, void 0, void 0, function () {
            var downloadSpeedLog, rangeMap, valueMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (downloadManager.fetchSpeedLog) {
                                downloadManager.fetchSpeedLog(function (_, r) { return resolve(r); }, reject);
                            }
                            else {
                                cordova['exec'](resolve, reject, 'DownloadManagerPlugin', 'fetchSpeedLog', []);
                            }
                        })];
                    case 1:
                        downloadSpeedLog = _a.sent();
                        rangeMap = {
                            '32': '0-32',
                            '64': '32-64',
                            '128': '64-128',
                            '256': '128-256',
                            '512': '256-512',
                            '1024': '512-1024',
                            '1536': '1024-1536',
                            '2048': '1536-2048',
                            '2560': '2048-2560',
                            '3072': '2560-3072',
                            '3584': '3072-3584',
                            '4096': '3584-above'
                        };
                        if (!Object.keys(downloadSpeedLog === null || downloadSpeedLog === void 0 ? void 0 : downloadSpeedLog.distributionInKBPS).length) {
                            return [2 /*return*/, undefined];
                        }
                        valueMap = {
                            duration: intervalTime / 1000,
                            totalKBDownloaded: downloadSpeedLog === null || downloadSpeedLog === void 0 ? void 0 : downloadSpeedLog.totalKBdownloaded,
                            distributionInKBPS: Object.keys(rangeMap).reduce(function (acc, key) {
                                if (downloadSpeedLog === null || downloadSpeedLog === void 0 ? void 0 : downloadSpeedLog.distributionInKBPS[key]) {
                                    acc[rangeMap[key]] = downloadSpeedLog.distributionInKBPS[key];
                                }
                                else {
                                    acc[rangeMap[key]] = 0;
                                }
                                return acc;
                            }, {})
                        };
                        return [2 /*return*/, TelemetryLogger.log.interact({
                                type: InteractType.OTHER,
                                subType: InteractSubType.NETWORK_SPEED,
                                env: 'sdk',
                                pageId: 'sdk',
                                id: 'sdk',
                                valueMap: valueMap
                            }).pipe(mapTo(undefined)).toPromise()];
                }
            });
        });
    };
    TelemetryAutoSyncServiceImpl.prototype.getSyncMode = function () {
        return this.sharedPreferences.getString(TelemetryKeys.KEY_AUTO_SYNC_MODE).pipe(map(function (v) { return v; }));
    };
    TelemetryAutoSyncServiceImpl.prototype.setSyncMode = function (mode) {
        return this.sharedPreferences.putString(TelemetryKeys.KEY_AUTO_SYNC_MODE, mode);
    };
    TelemetryAutoSyncServiceImpl.prototype.start = function (intervalTime) {
        var _this = this;
        this.shouldSync = true;
        return interval(intervalTime).pipe(tap(function (iteration) {
            var timeCovered = iteration * intervalTime;
            if (timeCovered % TelemetryAutoSyncServiceImpl.DOWNLOAD_SPEED_TELEMETRY_SYNC_INTERVAL === 0) {
                if (window.device.platform.toLowerCase() !== "ios") {
                    TelemetryAutoSyncServiceImpl.generateDownloadSpeedTelemetry(intervalTime);
                }
            }
        }), filter(function () { return _this.shouldSync; }), tap(function () { return _this.telemetryService.sync().pipe(tap(function (stat) {
            console.log('AUTO_SYNC_INVOKED_SYNC----------------------------------------------', stat);
        }), catchError(function (e) {
            console.error(e);
            return of(undefined);
        })).toPromise(); }), mapTo(undefined));
    };
    TelemetryAutoSyncServiceImpl.prototype.pause = function () {
        this.shouldSync = false;
    };
    TelemetryAutoSyncServiceImpl.prototype.continue = function () {
        this.shouldSync = true;
    };
    TelemetryAutoSyncServiceImpl.DOWNLOAD_SPEED_TELEMETRY_SYNC_INTERVAL = 60 * 1000;
    return TelemetryAutoSyncServiceImpl;
}());
export { TelemetryAutoSyncServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZW1ldHJ5LWF1dG8tc3luYy1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVsZW1ldHJ5L3V0aWwvdGVsZW1ldHJ5LWF1dG8tc3luYy1zZXJ2aWNlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxZQUFZLEVBQTJDLE1BQU0sSUFBSSxDQUFDO0FBQzNGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFjLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR25FLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUdwRDtJQTBESSxzQ0FDWSxnQkFBa0MsRUFDbEMsaUJBQW9DO1FBRHBDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTFEeEMsZUFBVSxHQUFHLEtBQUssQ0FBQztJQTREM0IsQ0FBQztJQTFEb0IsMkRBQThCLEdBQW5ELFVBQW9ELFlBQW9COzs7Ozs0QkFDekIscUJBQU0sSUFBSSxPQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDOUUsSUFBSSxlQUFlLENBQUMsYUFBYSxFQUFFO2dDQUMvQixlQUFlLENBQUMsYUFBYSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBVixDQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7NkJBQy9EO2lDQUFNO2dDQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUs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LEVBQUU7Z0JBQ3pGLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO29CQUMvQyw0QkFBNEIsQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDN0U7YUFDSjtRQUNMLENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBZixDQUFlLENBQUMsRUFDN0IsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUN2QyxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsVUFBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FDTCxDQUFDLFNBQVMsRUFBRSxFQVJILENBUUcsQ0FBQyxFQUNkLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDbkIsQ0FBQztJQUNOLENBQUM7SUFFRCw0Q0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBMUdjLG1FQUFzQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUEyR3RFLG1DQUFDO0NBQUEsQUE1R0QsSUE0R0M7U0E1R1ksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbnRlcmFjdFN1YlR5cGUsIEludGVyYWN0VHlwZSwgVGVsZW1ldHJ5QXV0b1N5bmNNb2RlcywgVGVsZW1ldHJ5U2VydmljZX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtUZWxlbWV0cnlMb2dnZXJ9IGZyb20gJy4vdGVsZW1ldHJ5LWxvZ2dlcic7XG5pbXBvcnQge2ludGVydmFsLCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGZpbHRlciwgbWFwLCBtYXBUbywgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1RlbGVtZXRyeUF1dG9TeW5jU2VydmljZX0gZnJvbSAnLi90ZWxlbWV0cnktYXV0by1zeW5jLXNlcnZpY2UnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHtUZWxlbWV0cnlLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuXG5cbmV4cG9ydCBjbGFzcyBUZWxlbWV0cnlBdXRvU3luY1NlcnZpY2VJbXBsIGltcGxlbWVudHMgVGVsZW1ldHJ5QXV0b1N5bmNTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBET1dOTE9BRF9TUEVFRF9URUxFTUVUUllfU1lOQ19JTlRFUlZBTCA9IDYwICogMTAwMDtcbiAgICBwcml2YXRlIHNob3VsZFN5bmMgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGdlbmVyYXRlRG93bmxvYWRTcGVlZFRlbGVtZXRyeShpbnRlcnZhbFRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBkb3dubG9hZFNwZWVkTG9nOiBEb3dubG9hZFNwZWVkTG9nID0gYXdhaXQgbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG93bmxvYWRNYW5hZ2VyLmZldGNoU3BlZWRMb2cpIHtcbiAgICAgICAgICAgICAgICBkb3dubG9hZE1hbmFnZXIuZmV0Y2hTcGVlZExvZygoXywgcikgPT4gcmVzb2x2ZShyKSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29yZG92YVsnZXhlYyddKHJlc29sdmUsIHJlamVjdCwgJ0Rvd25sb2FkTWFuYWdlclBsdWdpbicsICdmZXRjaFNwZWVkTG9nJywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByYW5nZU1hcCA9IHtcbiAgICAgICAgICAgICczMic6ICcwLTMyJyxcbiAgICAgICAgICAgICc2NCc6ICczMi02NCcsXG4gICAgICAgICAgICAnMTI4JzogJzY0LTEyOCcsXG4gICAgICAgICAgICAnMjU2JzogJzEyOC0yNTYnLFxuICAgICAgICAgICAgJzUxMic6ICcyNTYtNTEyJyxcbiAgICAgICAgICAgICcxMDI0JzogJzUxMi0xMDI0JyxcbiAgICAgICAgICAgICcxNTM2JzogJzEwMjQtMTUzNicsXG4gICAgICAgICAgICAnMjA0OCc6ICcxNTM2LTIwNDgnLFxuICAgICAgICAgICAgJzI1NjAnOiAnMjA0OC0yNTYwJyxcbiAgICAgICAgICAgICczMDcyJzogJzI1NjAtMzA3MicsXG4gICAgICAgICAgICAnMzU4NCc6ICczMDcyLTM1ODQnLFxuICAgICAgICAgICAgJzQwOTYnOiAnMzU4NC1hYm92ZSdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKGRvd25sb2FkU3BlZWRMb2c/LmRpc3RyaWJ1dGlvbkluS0JQUykubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWVNYXAgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogaW50ZXJ2YWxUaW1lIC8gMTAwMCxcbiAgICAgICAgICAgIHRvdGFsS0JEb3dubG9hZGVkOiBkb3dubG9hZFNwZWVkTG9nPy50b3RhbEtCZG93bmxvYWRlZCxcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvbkluS0JQUzogT2JqZWN0LmtleXMocmFuZ2VNYXApLnJlZHVjZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PigoYWNjLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG93bmxvYWRTcGVlZExvZz8uZGlzdHJpYnV0aW9uSW5LQlBTW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjW3JhbmdlTWFwW2tleV1dID0gZG93bmxvYWRTcGVlZExvZy5kaXN0cmlidXRpb25JbktCUFNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY2NbcmFuZ2VNYXBba2V5XV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gVGVsZW1ldHJ5TG9nZ2VyLmxvZy5pbnRlcmFjdCh7XG4gICAgICAgICAgICB0eXBlOiBJbnRlcmFjdFR5cGUuT1RIRVIsXG4gICAgICAgICAgICBzdWJUeXBlOiBJbnRlcmFjdFN1YlR5cGUuTkVUV09SS19TUEVFRCxcbiAgICAgICAgICAgIGVudjogJ3NkaycsXG4gICAgICAgICAgICBwYWdlSWQ6ICdzZGsnLFxuICAgICAgICAgICAgaWQ6ICdzZGsnLFxuICAgICAgICAgICAgdmFsdWVNYXBcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0ZWxlbWV0cnlTZXJ2aWNlOiBUZWxlbWV0cnlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlc1xuICAgICkge1xuICAgIH1cblxuICAgIGdldFN5bmNNb2RlKCk6IE9ic2VydmFibGU8VGVsZW1ldHJ5QXV0b1N5bmNNb2RlcyB8IHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoVGVsZW1ldHJ5S2V5cy5LRVlfQVVUT19TWU5DX01PREUpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHYpID0+IHYgYXMgVGVsZW1ldHJ5QXV0b1N5bmNNb2RlcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXRTeW5jTW9kZShtb2RlOiBUZWxlbWV0cnlBdXRvU3luY01vZGVzKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhUZWxlbWV0cnlLZXlzLktFWV9BVVRPX1NZTkNfTU9ERSwgbW9kZSk7XG4gICAgfVxuXG4gICAgc3RhcnQoaW50ZXJ2YWxUaW1lOiBudW1iZXIpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICB0aGlzLnNob3VsZFN5bmMgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBpbnRlcnZhbChpbnRlcnZhbFRpbWUpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKGl0ZXJhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZUNvdmVyZWQgPSBpdGVyYXRpb24gKiBpbnRlcnZhbFRpbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdmVyZWQgJSBUZWxlbWV0cnlBdXRvU3luY1NlcnZpY2VJbXBsLkRPV05MT0FEX1NQRUVEX1RFTEVNRVRSWV9TWU5DX0lOVEVSVkFMID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5kZXZpY2UucGxhdGZvcm0udG9Mb3dlckNhc2UoKSAhPT0gXCJpb3NcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgVGVsZW1ldHJ5QXV0b1N5bmNTZXJ2aWNlSW1wbC5nZW5lcmF0ZURvd25sb2FkU3BlZWRUZWxlbWV0cnkoaW50ZXJ2YWxUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuc2hvdWxkU3luYyksXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLnN5bmMoKS5waXBlKFxuICAgICAgICAgICAgICAgIHRhcCgoc3RhdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQVVUT19TWU5DX0lOVk9LRURfU1lOQy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLCBzdGF0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnRvUHJvbWlzZSgpKSxcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG91bGRTeW5jID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY29udGludWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvdWxkU3luYyA9IHRydWU7XG4gICAgfVxufVxuIl19